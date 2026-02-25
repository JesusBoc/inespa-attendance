import { View } from "../../dashboard/ui/views/View";
import { AssignmentTable } from "../components/AssignmentTable";
import type { Assignment } from "../domain/Assignment";
import type { AssignmentViewModel } from "../viewmodel/AssignmentViewModel";

export class AssignmentView extends View<AssignmentViewModel>{
    public onTeacherClick?: (assignmentId: string) => void
    public onButtonClick?: () => void
    private button: HTMLButtonElement

    render(model: AssignmentViewModel): void {
        const assignments = model.getAssignments()
        const courseAssignments = new Map<string, Assignment>()
        const selectedCourseId = model.getSelectedCourse()
        if(!selectedCourseId) throw new Error("There is not selected group");
        
        assignments.forEach(
            (a, id) => {
                if(a.groupId === selectedCourseId){
                    courseAssignments.set(id, a)
                }
            }
        )
        const tableModel = new AssignmentTable(courseAssignments)
        const table = tableModel.create()
        this.root.appendChild(table)
    }
    constructor(rootId: string, containerId: string, groupEntries: [string, string][]){
        super(rootId, containerId)
        this.button = document.createElement('button')
        this.button.className = "attendanceButton secondary inactivo"
        this.button.innerText = 'Agregar asignatura'
        const container = document.createElement('ul')
        container.className = 'mainSelector'
        for (const group of groupEntries) {
            const paragraph = document.createElement('li')
            paragraph.className = 'courseSelector'
            paragraph.innerText = group[1]
            paragraph.dataset.id = group[0]
            container.appendChild(paragraph)
        }
        this.container?.prepend(container)
        this.container?.append(this.button)
        this.root.addEventListener('click',
            (e) => {
                const target = e.target as HTMLElement
                if(target.classList.contains('specialCell')){
                    const id = target.dataset.assignmentId
                    if(!id) return
                    this.onTeacherClick?.(id)
                }
            }
        )
        this.button.addEventListener('click',
            (e) => {
                this.onButtonClick?.()
            }
        )
    }

    showButton(){
        this.button.className = "attendanceButton secondary activo"
    }

    hideButton(){
        this.button.className = "attendanceButton secondary inactivo"
    }

    getSelectors() {
        return this.container?.getElementsByClassName('courseSelector')
    }
}
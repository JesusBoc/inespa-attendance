import { View } from "../../dashboard/ui/views/View";
import { AssignmentTable } from "../components/AssignmentTable";
import { StudentTable } from "../components/StudentsTable";
import type { Assignment } from "../domain/Assignment";
import type { Student } from "../domain/Student";
import type { StudentViewModel } from "../viewmodel/StudentsViewModel";

export class StudentsView extends View<StudentViewModel>{
    public onNameClick?: (studentIdId: string) => void
    public onLastNameClick?: (studentIdId: string) => void
    public onButtonClick?: () => void
    public onDeleteClick?: (studentId: string) => void
    public onReassignClick?: (studentId: string) => void

    private button: HTMLButtonElement

    render(model: StudentViewModel): void {
        const students = model.getStudents()
        const courseStudents = new Map<string, Student>()
        const selectedCourseId = model.getSelectedCourse()
        if(!selectedCourseId) throw new Error("There is not selected group");
        
        students.forEach(
            (a, id) => {
                if(a.groupId === selectedCourseId){
                    courseStudents.set(id, a)
                }
            }
        )
        const tableModel = new StudentTable(courseStudents)
        if(!this.onDeleteClick) throw new Error('No se ha definido la funcion onDeleteClick')
        tableModel.onDeleteClick = this.onDeleteClick

        if(!this.onReassignClick) throw new Error('No se ha definido la funcion onDeleteClick')
        tableModel.onReassignClick = this.onReassignClick
        const table = tableModel.create()
        this.root.appendChild(table)
    }
    constructor(rootId: string, containerId: string, groupEntries: [string, string][]){
        super(rootId, containerId)
        this.button = document.createElement('button')
        this.button.className = "attendanceButton secondary inactivo"
        this.button.innerText = 'Agregar estudiante'
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
                
                if(target.classList.contains('studentName')){
                    const id = target.dataset.studentId
                    
                    if(!id) return
                    this.onNameClick?.(id)
                }
            }
        )
        this.root.addEventListener('click',
            (e) => {
                const target = e.target as HTMLElement
                if(target.classList.contains('studentLastName')){
                    const id = target.dataset.studentId
                    if(!id) return
                    this.onLastNameClick?.(id)
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
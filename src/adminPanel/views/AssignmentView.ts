import { View } from "../../dashboard/ui/views/View";
import type { AssignmentViewModel } from "../viewmodel/AssignmentViewModel";

export class AssignmentView extends View<AssignmentViewModel>{
    render(model: AssignmentViewModel): void {
        const selectedCourseId = model.getSelectedCourse()
        if(!selectedCourseId) throw new Error("There is not selected group");
        const courseAssignments = model.getAssignments().values().filter(
            (a) => a.groupId === selectedCourseId
        )
        const list = document.createElement('ol')
        for(const assignment of courseAssignments){
            const item = document.createElement('li')
            item.innerText = `${assignment.teacherName} dicta ${assignment.subjectName} en el curso ${assignment.groupName}`
            list.appendChild(item)
        }
        this.root.appendChild(list)
    }
    constructor(rootId: string, containerId: string, groupEntries: [string, string][]){
        super(rootId, containerId)
        const container = document.createElement('div')
        for (const group of groupEntries) {
            const paragraph = document.createElement('p')
            paragraph.className = 'courseSelector'
            paragraph.innerText = group[1]
            paragraph.dataset.id = group[0]
            container.appendChild(paragraph)
        }
        this.container?.prepend(container)
    }
}
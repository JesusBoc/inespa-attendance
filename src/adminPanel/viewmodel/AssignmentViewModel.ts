import { AssignmentService } from "../services/assignmentService";

export class AssignmentViewModel {
    private selectedCourseId?: string | undefined
    constructor(
        private service: AssignmentService
    ){}

    getAssignments(){
        return this.service.getAll()
    }

    async refreshData(){
        await this.service.reload()
    }

    setSelectedCourse(id: string | undefined){
        this.selectedCourseId = id
    }

    getSelectedCourse(){
        return this.selectedCourseId
    }

    async assignTeacher(assignmentId: string, teacherId: string){
        await this.service.updateAssignmentTeacher(assignmentId, teacherId)
    }

    async createAssignment(groupId: string, subjectId: string) {
        return await this.service.insert(
            {
                groupId,
                subjectId
            }
        )
    }
}
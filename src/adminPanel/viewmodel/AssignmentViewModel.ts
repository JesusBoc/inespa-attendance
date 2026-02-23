import { AssignmentService } from "../services/assignmentService";

export class AssignmentViewModel {
    private selectedCourseId?: string
    constructor(
        private service: AssignmentService
    ){}

    getAssignments(){
        return this.service.getAll()
    }

    async refreshData(){
        await this.service.reload()
    }

    setSelectedCourse(id: string){
        this.selectedCourseId = id
    }

    getSelectedCourse(){
        return this.selectedCourseId
    }
}
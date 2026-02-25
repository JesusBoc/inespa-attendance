import type { StudentService } from "../services/studentService";

export class StudentViewModel {
    private selectedCourseId?: string | undefined
    constructor(
        private service: StudentService
    ){}

    getStudents(){
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

    async changeStudentGroup(studentId: string, newGroupId: string){
        return await this.service.updateGroup(studentId, newGroupId)
    }

    async addStudent(groupId: string, name: string, lastName: string) {
        return await this.service.insert(
            {
                name,
                lastName,
                groupId,
                active: true
            }
        )
    }

    async rename(studentId: string, name: string){
        return await this.service.updateName(studentId, name)
    }

    async renameLastName(studentId: string, lastName: string){
        return await this.service.updateLastName(studentId, lastName)
    }

    async deleteStudent(studentId: string){
        return await this.service.delete(studentId)
    }
}
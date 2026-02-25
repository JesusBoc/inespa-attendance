import { subjectsStatic } from "../mock/mockData";
import { TeacherService } from "../services/TeacherService";
import type { AssignmentViewModel } from "../viewmodel/AssignmentViewModel";
import { AssignmentView } from "../views/AssignmentView";
import { TeacherModal, type ModalEntry } from "../views/TeacherModal";

export class AssignmentController {
    private view: AssignmentView
    private teacherService?: TeacherService

    constructor(
        private viewModel: AssignmentViewModel,
        groups: [string, string][]
    ) {
        this.view = new AssignmentView('assignmentsActions', 'assignmentsMenu', groups)
        this.bindCourseSelectors()
        this.bindModalAction()
        this.bindButtonAction()
    }

    private bindCourseSelectors() {
        const selectors = this.view.getSelectors()
        if (!selectors || selectors.length < 0) return
        for (const element of selectors) {
            element.addEventListener(
                'click',
                () => {
                    const currentId = this.viewModel.getSelectedCourse()
                    const activeBtn = document.querySelector(`[data-id='${currentId}']`)
                    if(activeBtn) activeBtn.classList.remove('selected')
                    const id = element.getAttribute('data-id')
                    if (!id) throw new Error(`id: ${id} not found`);
                    this.view.clear()
                    if (currentId == id) {
                        this.view.hideButton()
                        this.viewModel.setSelectedCourse(undefined)
                        return
                    }
                    this.viewModel.setSelectedCourse(id)
                    element.classList.add('selected')
                    this.view.render(this.viewModel)
                    this.view.showButton()
                }
            )
        }
    }

    private bindModalAction() {
        this.view.onTeacherClick = async (id) => {
            await this.openTeacherModal(id)
        }
    }

    private bindButtonAction() {
        this.view.onButtonClick = async () => {
            await this.openSubjectsModal()
        }
    }

    show() {
        this.view.render(this.viewModel)
    }

    hide() {
        this.view.clear()
    }

    async update() {
        await this.viewModel.refreshData()
    }

    private async openTeacherModal(assignmentId: string) {
        if(!this.teacherService){
            this.teacherService = await TeacherService.create()
        }
        const teachers: ModalEntry[] = this.teacherService.getAll().entries().toArray().map(
            ([id, teacher]) => {
                return{
                    id,
                    name: teacher.name + ' ' + teacher.lastName
                }
            }
        )
        
        const modal = new TeacherModal(teachers)

        modal.open(
            async (teacherId) => {
                await this.viewModel.assignTeacher(assignmentId, teacherId)
                this.view.clear()
                modal.close()
                this.view.render(this.viewModel)
            }
        )
    }
    private async openSubjectsModal() {
        const subjects = subjectsStatic
        const groupId = this.viewModel.getSelectedCourse()
        if(!groupId) return

        const modal = new TeacherModal(subjects)

        modal.open(
            async (subjectId) => {
                const newId = await this.viewModel.createAssignment(groupId, subjectId)
                console.log(newId)
                this.view.clear()
                modal.close()
                this.view.render(this.viewModel)
            }
        )
    }
}
import type { StudentViewModel } from "../viewmodel/StudentsViewModel"
import { StudentsView } from "../views/StudentsView"
import { TeacherModal, type ModalEntry } from "../views/TeacherModal"

export class StudentController {
    private view: StudentsView

    constructor(
        private viewModel: StudentViewModel,
        private groups: [string, string][]
    ) {
        this.view = new StudentsView('studentsActions', 'studentsMenu', groups)
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
                    const id = element.getAttribute('data-id')
                    if (!id) throw new Error(`id: ${id} not found`);
                    this.view.clear()
                    if (this.viewModel.getSelectedCourse() == id) {
                        this.view.hideButton()
                        this.viewModel.setSelectedCourse(undefined)
                        return
                    }
                    this.viewModel.setSelectedCourse(id)
                    this.view.render(this.viewModel)
                    this.view.showButton()
                }
            )
        }
    }

    private bindModalAction() {
        this.view.onNameClick = async (id) => {
            console.log('Estoy por aqui en onNameClick')
            const newName = prompt("Ingrese el nuevo nombre")
            if (!newName) return
            await this.viewModel.rename(id, newName)
            this.view.clear()
            this.view.render(this.viewModel)
        }

        this.view.onLastNameClick = async (id) => {
            const newLastName = prompt("Ingrese el nuevo apellido")
            if (!newLastName) return
            await this.viewModel.renameLastName(id, newLastName)
            this.view.clear()
            this.view.render(this.viewModel)
        }
    }

    private bindButtonAction() {
        this.view.onButtonClick = async () => {
            await this.addStudent()
            this.view.clear()
            this.view.render(this.viewModel)
        }

        this.view.onDeleteClick = async (studentId) => {
            await this.viewModel.deleteStudent(studentId)
            this.view.clear()
            this.view.render(this.viewModel)
        }

        this.view.onReassignClick = async (studentId) => {
            await this.openGroupsModal(studentId)
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

    private async addStudent() {
        const name = prompt("Ingrese el nombre") ?? ''
        const lastName = prompt("Ingrese el apellido") ?? ''

        const groupId = this.viewModel.getSelectedCourse()
        if (!groupId) return

        console.log(await this.viewModel.addStudent(groupId, name, lastName))
        this.view.clear()
        this.view.render(this.viewModel)
    }

    private async openGroupsModal(studentId: string) {

        const groups: ModalEntry[] = this.groups.map(
            ([id, name]) => ({id, name})
        )

        const groupId = this.viewModel.getSelectedCourse()
        if (!groupId) return

        const modal = new TeacherModal(groups)

        modal.open(
            async (groupId) => {
                const result = await this.viewModel.changeStudentGroup(studentId, groupId)
                if(!result) alert("No se pudo realizar esto")
                this.view.clear()
                modal.close()
                this.view.render(this.viewModel)
            }
        )
    }
}
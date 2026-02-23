import type { AssignmentViewModel } from "../viewmodel/AssignmentViewModel";
import { AssignmentView } from "../views/AssignmentView";

export class AssignmentController {
    private view: AssignmentView

    constructor(
        private viewModel: AssignmentViewModel,
        groups: [string, string][]
    ){
        this.view = new AssignmentView('assignmentsActions', 'assignmentsMenu',groups)
        this.bindCourseSelectors()
    }

    private bindCourseSelectors(){
        const selectors = document.getElementsByClassName('courseSelector')
        if(selectors.length < 0) return
        for(const element of selectors){
            element.addEventListener(
                'click',
                () => {
                    const id = element.getAttribute('data-id')
                    if(!id) throw new Error(`id: ${id} not found`);
                    this.view.clear()
                    this.viewModel.setSelectedCourse(id)
                    this.view.render(this.viewModel)
                }
            )
        }
    }

    // TODO! Bind buttons (Make the buttons on here fire the render action for the selected group)
    show(){
        this.view.render(this.viewModel)
    }

    hide(){
        this.view.clear()
    }

    async update(){
        await this.viewModel.refreshData()
    }
}
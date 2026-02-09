import { DashboardState } from "../state/DashboardState";
import { DashboardViewModel } from "../viewmodels/DashboardViewModel";
import { MateriaTabView } from "../views/MateriasTabView";
import { isDashboardTab } from "../state/DashboardState";

export class DashboardController {
    private state = new DashboardState()
    private materiasView = new MateriaTabView("tab-materias")

    constructor(
        private vm: DashboardViewModel
    ){}

    init(){
        this.bindTabs()
    }
    private bindTabs(){
        document.querySelectorAll('.tab').forEach(
            btn => {
                btn.addEventListener("click", () => {

                    const tab = btn.getAttribute('data-tab')
                    if(!isDashboardTab(tab)) throw new Error("This is not a tab")
        
                    this.state.setActiveTab(tab)
                    this.renderActiveTab()
                })
            }
        )
    }
    private renderActiveTab() {
        const active = this.state.getActiveTab()

        switch(active){
            case "materias": this.materiasView.render(this.vm)
            break;
            default: this.materiasView.clear()
        }
    }
}


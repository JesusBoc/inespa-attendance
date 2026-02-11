import { DashboardState, type DashboardTab } from "../state/DashboardState";
import { DashboardViewModel } from "../viewmodels/DashboardViewModel";
import { MateriaTabView } from "../views/MateriasTabView";
import { isDashboardTab } from "../state/DashboardState";
import { PorFechaTabView } from "../views/PorFechaTabView";
import type { View } from "../views/View";

export class DashboardController {
    private state = new DashboardState()
    private readonly tabViews: View<any>[] = [
        new MateriaTabView("tab-resumen"),
        new PorFechaTabView("tab-materias")
    ]

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
        this.clearAll()
        switch(active){
            case "resumen": 
                this.tabViews[0]!.render(this.vm)
            break;
            case "materias": this.tabViews[1]!.render(this.vm)
            break;
            default: 
        }
    }
    private clearAll() {
        this.tabViews.forEach(
            v => v.clear()
        )
    }
}


import { DASHBOARD_TABS, DashboardState, type DashboardTab } from "../state/DashboardState";
import { DashboardViewModel } from "../viewmodels/DashboardViewModel";
import { MateriaTabView } from "../views/MateriasTabView";
import { isDashboardTab } from "../state/DashboardState";
import { PorFechaTabView } from "../views/PorFechaTabView";
import type { View } from "../views/View";
import { AlertView } from "../views/AlertView";
import { InsightsView } from "../views/InsightsView";

export class DashboardController {
    private state = new DashboardState()
    private readonly tabViews: View<any>[] = [
        new MateriaTabView("tab-resumen", "sectionContainer"),
        new PorFechaTabView("tab-materias"),
        new AlertView('tab-alertas'),
        new InsightsView('tab-insights')
    ]

    constructor(
        private vm: DashboardViewModel
    ){}

    init(){
        this.bindTabs()
        this.renderActiveTab()
        this.bindButtons()
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
        const activeBtn = document.querySelector(`[data-tab='${active}']`)

        if(!activeBtn) throw new Error("Tab doesn't exist")
        this.clearAll()
        activeBtn.className = 'tab active'
        switch(active){
            case "resumen":
                this.tabViews[0]!.show()
                this.tabViews[0]!.render(this.vm)
            break;
            case "materias":
                this.tabViews[0]!.hide()
                this.tabViews[1]!.render(this.vm)
            break;
            case "alertas":
                this.tabViews[0]!.hide()
                this.tabViews[2]!.render(this.vm)
            break;
            case "insights":
                this.tabViews[0]!.hide()
                this.tabViews[3]!.render(this.vm)
            default: 
        }
    }
    private clearAll() {
        Object.values(DASHBOARD_TABS).forEach(
            s => {
                const btn = document.querySelector(`[data-tab='${s}']`)
                if(btn) btn.className = 'tab'
            }
        )
        this.tabViews.forEach(
            v => v.clear()
        )
    }
    private bindButtons(){
        const btn = document.getElementById("toggleReportBtn")

        btn?.addEventListener("click",
            () => {
                this.vm.toggleMode()
                this.renderActiveTab()
            }
        )
    }
}


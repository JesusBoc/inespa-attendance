import type { DashboardViewModel } from "../viewmodels/DashboardViewModel";
import { AlertContext, type AlertResult } from "../../domain/alerts/AlertRule";
import { View } from "./View";

const alertTypeNames: Record<string, string> = {
  bajo_porcentaje_de_asistencia: 'Bajo porcentaje de asistencia',
  inasistencia_consecutiva: 'Muchas inasistencias seguidas'
}

function typeName(type: string): string {
  return alertTypeNames[type] ?? type
}

export class AlertView extends View<DashboardViewModel>{
    render(model: DashboardViewModel): void {
        const aggregateReportsContext = new AlertContext(model.getAggregateReports())
        const temporalReportsContext = new AlertContext(model.getTemporalReports())

        const alertEngines = model.getAlertEngines()

        const alerts = [
            ...alertEngines.aggregate.evaluate(aggregateReportsContext).entries(),
            ...alertEngines.temporal.evaluate(temporalReportsContext).entries()
        ]
        
        alerts.forEach(
            ([type, alerts]) => {
                const section = this.createSection(typeName(type))
                section.appendChild(this.createAlertList(alerts))
                this.root.appendChild(section)
            }
        )
    }

    private createSection(title: string): HTMLElement {
        const section = document.createElement('section')

        const titleEl = document.createElement('h2')
        titleEl.innerText = title
        titleEl.className = "sectionTitle"

        section.appendChild(titleEl)

        return section
    }

    private createAlertList(alerts: AlertResult[]): HTMLElement {
        const alertList = document.createElement('ul')
        alertList.className = 'alertList'

        if(alerts.length === 0){
            const listElement = document.createElement('li')
            listElement.textContent = 'No hay alertas de este tipo'
            listElement.className = 'noAlerts'
            alertList.appendChild(listElement)
            return alertList
        }

        alerts.forEach(
            a => {
                const listElement = document.createElement('li')
                listElement.textContent = a.message
                listElement.className = a.severity

                alertList.appendChild(listElement)
            }
        )
        return alertList
    }
}
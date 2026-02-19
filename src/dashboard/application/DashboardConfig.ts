import type { AlertEngine } from "../domain/alerts/AlertEngine"
import type { InsightEngine } from "../domain/alerts/InsightEngine"

export interface DashboardConfig {
  alertEngines: {
    aggregate: AlertEngine<any>
    temporal: AlertEngine<any>
  }

  insightEngines: {
    temporal: InsightEngine<any, any>
  }
}

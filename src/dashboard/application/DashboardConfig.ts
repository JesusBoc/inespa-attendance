import type { AlertEngine } from "../domain/alerts/AlertEngine"
import type { InsightEngine } from "../domain/alerts/InsightEngine"
import type { DashboardStrategy } from "./DashboardStrategy"

export interface DashboardConfig {
  strategy: DashboardStrategy
}

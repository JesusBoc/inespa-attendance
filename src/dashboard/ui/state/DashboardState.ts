export const DASHBOARD_TABS = [
  "resumen",
  "materias",
  "alertas"
] as const

export type DashboardTab = typeof DASHBOARD_TABS[number]

export function isDashboardTab(
  value: string | null | undefined
): value is DashboardTab {
  return DASHBOARD_TABS.includes(value as DashboardTab)
}

export class DashboardState {
  private activeTab: DashboardTab = "resumen"

  setActiveTab(tab: DashboardTab) {
    this.activeTab = tab
  }

  getActiveTab(): DashboardTab {
    return this.activeTab
  }
}

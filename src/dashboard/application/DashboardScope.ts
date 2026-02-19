export type DashboardScope =
  | { type: "COURSE"; courseId: string }
  | { type: "MULTI_COURSE"; courseIds: string[] }
  | { type: "INSTITUTION" }

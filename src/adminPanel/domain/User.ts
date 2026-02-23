import type { UserRole } from "../../util/RoleUtils"

export type User = {
    name: string
    lastName: string
    role: UserRole
    active: boolean
}
import type { User } from "../domain/User";
import { BaseService } from "./BaseService";

export class UserService extends BaseService<string,User>{

    protected readonly tableName = 'perfiles_usuarios'
    protected fetchAll(): Promise<Map<string, User>> {
        throw new Error("Method not implemented.");
    }
    insert(data: Partial<User>): Promise<string> {
        throw new Error("Method not implemented.");
    }

}

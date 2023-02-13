import { User } from "./user";


export interface Session {
    isLogin: boolean,
    userActive?: User;
}

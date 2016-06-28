import {Account} from "../services/src/notif/model/Account";
/**
 * Created by rpourtier on 28/06/2016.
 */
export class User implements Account{

    id: string;

    email: string;

    password: string;

    getRev: string;

    constructor(id:string, email:string, password:string, getRev:string){
        this.id=id;
        this.email=email;
        this.password=password;
        this.getRev=getRev;
    }
}
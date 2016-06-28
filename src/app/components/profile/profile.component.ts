/**
 * Component ProfileComponent
 */

import {Component} from '@angular/core';
import {AccountApi} from "../../shared/services/src/notif/api/AccountApi";
import {Account} from "../../shared/services/src/notif/model/Account";
import {User} from "../../shared/models/user";

@Component({
    selector: 'profile',
    moduleId: module.id,
    templateUrl: './profile.component.html',
    styleUrls : ['./profile.component.css'],
    providers: [AccountApi]
})


export class ProfileComponent {

    public accounts: Array<User>;

    constructor(private accountService:AccountApi){
        this.accounts= new Array<User>();
        this.accounts.push(new User("-1","email", "p", "po"));
    }

    ngOnInit(){
        this.accountService.listAccount().subscribe(
            account=>this.accounts=account[0]
        );
    }
}
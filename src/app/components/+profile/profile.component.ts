/**
 * Component ProfileComponent
 */

import {Component} from "@angular/core";
import {AccountApi} from "../../shared/services/src/index";
import {Account} from "../../shared/models/index";

@Component({
    selector: 'profile',
    moduleId: module.id,
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css'],
    providers: [AccountApi]
})


export class ProfileComponent {

    public account:Account;

    constructor(private accountService:AccountApi) {
        this.account = new Account();
    }

    ngOnInit() {
        this.accountService.listAccount().subscribe(
            account=>this.account = account[0]
        );
    }
}
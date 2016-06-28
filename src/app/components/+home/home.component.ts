import {Component} from "@angular/core";
import {NotificationApi, AccountApi, LandApi} from "../../shared/services/src/notif/index";
import {Notification, Account, Plot} from "../../shared/services/src/notif/model/models";

@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers:[NotificationApi,
        AccountApi,
        LandApi
    ],
})
export class HomeComponent {
    public pathImage:string;
    public notifications: Array<Notification>;

    public accounts: Array<Account>;

    public plots: Array<Plot>;

    constructor(private notificationService:NotificationApi,
                private accountService:AccountApi, private landService:LandApi){
        this.pathImage="../../../../assets/home/picture.png";
    }

    ngOnInit(){
        this.notificationService.listAccount().subscribe(
            notifications=>this.notifications=notifications
        );
        this.accountService.listAccount().subscribe(
            account=>this.accounts=account
        );
        this.landService.findPlots().subscribe(
            plots=>this.plots=plots
        );
    }
}
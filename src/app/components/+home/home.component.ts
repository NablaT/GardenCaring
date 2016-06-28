import {Component} from "@angular/core";
import {NotificationApi, AccountApi, LandApi} from "../../shared/services/src/notif/index";
import {Notification, Account, Plot} from "../../shared/services/src/notif/model/models";
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';

@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers:[NotificationApi,
        AccountApi,
        LandApi
    ],
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class HomeComponent {
    public pathImage:string;
    public notifications: Array<Notification>;

    public accounts: Array<Account>;

    public plots: Array<Plot>;

    public barChartLabels:string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    public barChartType:string = 'bar';
    public barChartLegend:boolean = true;

    public barChartData:any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label:'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label:'Series B'}
    ];

    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true
    };


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

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

}
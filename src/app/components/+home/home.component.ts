import {Component} from "@angular/core";
import {NotificationApi, AccountApi, LandApi} from "../../shared/services/src/notif/index";
import {Notification, Account, Plot} from "../../shared/services/src/notif/model/models";
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {ManageDataService} from "../../shared/services/src/manage-data.service";
import {Metric} from "../../shared/models/metric";

@Component({
    selector: 'home',
    moduleId: module.id,
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    providers: [NotificationApi,
        AccountApi,
        LandApi,
        ManageDataService
    ],
    directives: [CHART_DIRECTIVES, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class HomeComponent {

    public data:Metric[];

    public pathImage:string;
    public notifications:Array<Notification>;

    public accounts:Array<Account>;

    public plots:Array<Plot>;
    ///////////////////////////////////////////// HUMIDITY/////////////////////////////////////////////
    public lineChartData:Array<any> = [
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Humidity'}
    ];
    public lineChartLabels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptions:any = {
        animation: false,
        responsive: true
    };
    public lineChartColours:Array<any> = [

        { // dark grey
            backgroundColor: 'rgba(21,99,163,0.2)',
            borderColor: 'rgba(21,99,163,1)',
            pointBackgroundColor: 'rgba(21,99,163,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(21,99,163,1)'
        }

    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';


    ///////////////////////////////////////////// LIGHT/////////////////////////////////////////////

    public lineChartDataL:Array<any> = [
        {data: [28, 48, 40, 19, 86, 19, 86], label: 'Light'}
    ];
    public lineChartLabelsL:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptionsL:any = {
        animation: false,
        responsive: true
    };
    public lineChartColoursL:Array<any> = [

        { // dark grey
            backgroundColor: 'rgba(177,155,97,0.2)',
            borderColor: 'rgba(177,155,97,1)',
            pointBackgroundColor: 'rgba(177,155,97,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(177,155,97,1)'
        }

    ];
    public lineChartLegendL:boolean = true;
    public lineChartTypeL:string = 'line';

    ///////////////////////////////////////////// Temperature /////////////////////////////////////////////

    public lineChartDataT:Array<any> = [
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Temperature'}
    ];
    public lineChartLabelsT:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    public lineChartOptionsT:any = {
        animation: false,
        responsive: true
    };
    public lineChartColoursT:Array<any> = [

        { // dark grey
            backgroundColor: 'rgba(255,102,0,0.2)',
            borderColor: 'rgba(255,102,0,1)',
            pointBackgroundColor: 'rgba(255,102,0,1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255,102,0,1)'
        }

    ];
    public lineChartLegendT:boolean = true;
    public lineChartTypeT:string = 'line';


    ///////////////////////////////////////////// DOUGHNUT/////////////////////////////////////////////
    public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData:number[] = [350, 450, 100];
    public doughnutChartType:string = 'doughnut';


    constructor(private notificationService:NotificationApi,
                private accountService:AccountApi,
                private landService:LandApi,
                private manageMetricService:ManageDataService) {
        this.pathImage = "../../../../assets/home/picture.png";
    }

    ngOnInit() {
        this.notificationService.listAccount().subscribe(
            notifications=>this.notifications = notifications
        );
        this.accountService.listAccount().subscribe(
            account=>this.accounts = account
        );
        this.landService.findPlots().subscribe(
            plots=>this.plots = plots
        );
        this.manageMetricService.getData().then(
            data => this.data = data
        );
    }

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    public updateContent() {
        this.doughnutChartData = [100, 450, 400];
    }

}
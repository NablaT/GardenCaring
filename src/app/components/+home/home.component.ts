import {Component} from "@angular/core";
import {NotificationApi, AccountApi, LandApi} from "../../shared/services/src/index";
import {Notification, Account, Plot} from "../../shared/models/index";
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
    public loading:boolean;

    public pathImage:string;
    public notifications:Array<Notification>;

    public accounts:Array<Account>;

    public plots:Array<Plot>;
    ///////////////////////////////////////////// HUMIDITY/////////////////////////////////////////////
    public lineChartData:Array<any> = [
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Humidity'}
    ];
    public lineChartLabels:Array<any> = ['', '', '', '', '', '', ''];
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
    public lineChartLabelsL:Array<any> = ['', '', '', '', '', '', ''];
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
    public lineChartLabelsT:Array<any> = ['', '', '', '', '', '', ''];
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

        this.loading=true;
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
            data => this.changeCharts(data,100)
        );
    }

    public changeCharts(data, dataSet:number){
        this.data = data;

        if(dataSet>data.length){
            dataSet=data.length;
        }
        this.extractTemperature(data, dataSet);
        this.extractLight(data, dataSet);
        this.extractHumidity(data, dataSet);
    }

    public extractTemperature(data, dataSet:number){
        let values=[];
        let yNames=[];
        for(var i=(data.length-dataSet);i<data.length;i++){
            values.push(data[i].temperature);
            yNames.push('');
        }
        this.lineChartDataT=[{data: values, label: 'Temperature'}];
        this.lineChartLabelsT=yNames;

        this.loading=false;
    }

    public extractLight(data, dataSet:number){
        let values=[];
        let yNames=[];
        let start=(data.length-dataSet);
        for(var i=(data.length-dataSet);i<data.length;i++){
            values.push(data[i].light);
            yNames.push('');
        }
        this.lineChartDataL=[{data: values, label: 'Light'}];
        this.lineChartLabelsL=yNames;
        this.loading=false;
    }

    public extractHumidity(data, dataSet:number){
        let values=[];
        let yNames=[];
        for(var i=(data.length-dataSet);i<data.length;i++){
            values.push(data[i].humidity);
            yNames.push('');
        }
        this.lineChartData=[{data: values, label: 'Humidity'}];
        this.lineChartLabels=yNames;
        this.loading=false;
    }

    public lastDay(){
        console.log("yes");
        this.loading=true;
        this.manageMetricService.getData().then(
            data => this.changeCharts(data, 10)
        );
    }

    public lastWeek(){
        console.log("week");
        this.loading=true;
        this.manageMetricService.getData().then(
            data => this.changeCharts(data, 40)
        );
    }

    public lastMonth(){
        console.log("month");
        this.loading=true;
        this.manageMetricService.getData().then(
            data => this.changeCharts(data, data.length)
        );

    }

    // events
    public chartClicked(e:any):void {
        //console.log(e);
    }

    public chartHovered(e:any):void {
        //console.log(e);
    }

    public updateContent() {
        this.doughnutChartData = [100, 450, 400];
    }

}
import {Component, EventEmitter, Output, Input} from "@angular/core";
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

    @Input('id') sensorSerial:string;
    @Input('name') plotName:string;

    @Output() closeComponent = new EventEmitter<boolean>();

    public day:number;
    public week:number;
    public month:number;

    public lastTemperature:number;
    public lastHumidity:number;
    public lastLight:number;

    public data:Metric[];
    public loading:boolean;

    public pathImage:string;
    public notifications:Array<Notification>;

    public accounts:Array<Account>;

    public plots:Array<Plot>;
    ///////////////////////////////////////////// HUMIDITY/////////////////////////////////////////////
    public lineChartData:Array<any> = [
        {data: [0, 0, 0, 0, 0, 0, 0], label: 'Humidity'}
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
        {data: [0, 0, 0, 0, 0, 0, 0], label: 'Light'}
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
        {data: [0, 0, 0, 0, 0, 0, 0], label: 'Temperature'}
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


    constructor(private notificationService:NotificationApi,
                private accountService:AccountApi,
                private landService:LandApi,
                private manageMetricService:ManageDataService) {

        this.loading = true;
        this.pathImage = "../../../../assets/home/picture.png";
        this.plotName = "";
        this.day = 40;
        this.week = 80;
        this.month = 150;
        this.lastHumidity = 0;
        this.lastLight = 0;
        this.lastTemperature = 0;
    }

    ngOnInit() {
        this.manageMetricService.getDataFromId(this.sensorSerial).then(
            data => this.changeCharts(data, this.day)
        );
    }

    public changeCharts(data, dataSet:number) {
        this.data = data;

        if (dataSet > data.length) {
            dataSet = data.length;
        }
        if(data.length>0){

            this.extractTemperature(data, dataSet);
            this.extractLight(data, dataSet);
            this.extractHumidity(data, dataSet);
        }
        else{
            this.loading = false;
        }
    }

    public extractTemperature(data, dataSet:number) {
        let values = [];
        let yNames = [];
        let modulo = Math.floor(dataSet/4);

        for (var i = (data.length - dataSet); i < data.length; i++) {
            values.push(data[i].temperature);
            if (i % modulo == 0) {

                let date = new Date(data[i].timestamp * 1000);
                let hour = date.getHours() + ":" + date.getMinutes();

                yNames.push(hour)
            }
            else {
                yNames.push('');
            }
        }
        this.lineChartDataT = [{data: values, label: 'Temperature | Last value: ' + data[data.length - 1].temperature}];
        this.lineChartLabelsT = yNames;
        this.lastTemperature = data[data.length - 1].temperature;
        this.loading = false;
    }

    public extractLight(data, dataSet:number) {
        let values = [];
        let yNames = [];
        let start = (data.length - dataSet);
        for (var i = (data.length - dataSet); i < data.length; i++) {
            values.push(data[i].light);
            yNames.push('');

        }
        this.lineChartDataL = [{data: values, label: 'Light | Last value: ' + data[data.length - 1].light}];
        this.lineChartLabelsL = yNames;
        this.lastLight = data[data.length - 1].light;
        this.loading = false;
    }

    public extractHumidity(data, dataSet:number) {
        let values = [];
        let yNames = [];
        for (var i = (data.length - dataSet); i < data.length; i++) {
            values.push(data[i].humidity);
            yNames.push('');
        }
        this.lineChartData = [{data: values, label: 'Humidity | Last value: ' + data[data.length - 1].humidity}];
        this.lineChartLabels = yNames;
        this.lastHumidity = data[data.length - 1].humidity;
        this.loading = false;
    }

    public lastDay() {
        this.loading = true;
        this.manageMetricService.getData().then(
            data => this.changeCharts(data, this.day)
        );
    }

    public lastWeek() {
        this.loading = true;
        this.manageMetricService.getData().then(
            data => this.changeCharts(data, this.week)
        );
    }

    public lastMonth() {
        this.loading = true;
        this.manageMetricService.getData().then(
            data => this.changeCharts(data, this.month)
        );

    }


    public closeComponentAfterClick() {
        this.closeComponent.emit(true);
    }

}
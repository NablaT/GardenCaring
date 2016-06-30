import {Component} from "@angular/core";
import {CardComponent} from "../core/card/card.component";
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {LandApi} from "../../shared/services/src/land-api.service";
import {Plot} from "../../shared/models/Plot";
import {PlotItemComponent} from "./plot-item/plot-item.component";
import {HomeComponent} from "../+home/home.component";

@Component({
    selector: 'about',
    moduleId: module.id,
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    providers: [LandApi],
    directives: [PlotItemComponent, HomeComponent]
})
export class AboutComponent {

    public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData:number[] = [350, 450, 100, 100];
    public doughnutChartType:string = 'doughnut';

    public plots:Array<Plot>;
    public currentSensorSerial:string;
    public currentPlotName:string;

    public showGraph:boolean;

    constructor(private landService:LandApi) {
        this.plots=[];
        this.currentSensorSerial="";
        this.showGraph=false;
    }

    ngOnInit(){
        this.landService.findPlots().subscribe(
            plots=>this.plots = plots
        );
    }

    public showGraphFromPlot(currPlot:Plot){
        this.currentSensorSerial=currPlot.sensorSerial;
        this.currentPlotName=currPlot.name;
        this.showGraph=true;
    }
    // events
    public chartClicked(e:any):void {

    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    public closeComponent(needToBeClose:boolean){
        this.showGraph=false;
    }
}
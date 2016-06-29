import {Component} from "@angular/core";
import {CardComponent} from "../core/card/card.component";
import {CHART_DIRECTIVES} from 'ng2-charts/ng2-charts';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {LandApi} from "../../shared/services/src/land-api.service";
import {Plot} from "../../shared/models/Plot";
import {PlotItemComponent} from "./plot-item/plot-item.component";

@Component({
    selector: 'about',
    moduleId: module.id,
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css'],
    providers: [LandApi],
    directives: [PlotItemComponent]
})
export class AboutComponent {

    public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    public doughnutChartData:number[] = [350, 450, 100, 100];
    public doughnutChartType:string = 'doughnut';

    public plots:Array<Plot>;

    constructor(private landService:LandApi) {
        this.plots=[];
    }

    ngOnInit(){
        this.landService.findPlots().subscribe(
            plots=>this.plots = plots
        );
    }

    // events
    public chartClicked(e:any):void {

    }

    public chartHovered(e:any):void {
        console.log(e);
    }
}
/**
 * Component AboutPlotItemComponent
 */

import {Component, Input} from '@angular/core';

@Component({
    selector: 'plot-item',
    moduleId: module.id,
    templateUrl: './plot-item.component.html',
    styleUrls : ['./plot-item.component.css']
})
export class PlotItemComponent {


    @Input('id') id:string;
    @Input('name') name:string;
    @Input('tenantId') tenantId:string;
    @Input('culture') culture:string;
    @Input('adviceLevel') adviceLevel:string;

    constructor(){
        this.id="";
        this.name="";
        this.tenantId="";
        this.culture="";
        this.adviceLevel="";
    }
}
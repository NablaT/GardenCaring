/**
 * Component ChatContactListComponent
 */

import {Component, Output, EventEmitter,
    trigger,
    state,
    style,
    animate,
    transition,
    group} from '@angular/core';
import {ContactItemComponent} from "../contact-item/contact-item.component";
import {NotificationApi} from "../../../../shared/services/src/notification-api.service";
import {Notification} from "../../../../shared/models/Notification";
import {CardComponent} from "../../card/card.component";
import {Plot} from "../../../../shared/models/Plot";
import {ManageDataService} from "../../../../../../dist/template/app/shared/services/src/manage-data.service";
import {LandApi} from "../../../../shared/services/src/land-api.service";

@Component({
    selector: 'contact-list',
    moduleId: module.id,
    templateUrl: 'contact-list.component.html',
    styleUrls : ['./contact-list.component.css'],
    directives: [ContactItemComponent,
        CardComponent
    ],
    providers: [NotificationApi, LandApi],
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateX(0)', opacity: 1})),
            transition('void => *', [
                style({transform: 'translateX(50px)', opacity: 0}),
                group([
                    animate('0.3s 0.1s ease', style({
                        transform: 'translateX(0)'
                    })),
                    animate('0.3s ease', style({
                        opacity: 1
                    }))
                ])
            ])
        ])
    ]
})
export class ContactListComponent {

    private notifications:Array<Notification>;
    private showNotification:boolean;
    private pathImage:string;
    private pathCardImage:string;

    private currentPlot:Plot;


    @Output() sendContact= new EventEmitter<Notification>();

    constructor(private notificationService:NotificationApi,
            private plotService:LandApi

        ){
        this.showNotification=false;
        this.notifications=[];
        this.pathImage="../../../../../assets/notification/logo2.png";
        this.pathCardImage="../../../../../assets/card/potager.png";
        this.currentPlot=new Plot();
        //this.contactList=[new ContactModelComponent("-1", "Pierre", "Marcousi", "Je te dirai ça demain")];
    }

    ngOnInit(){
        this.getNotifications();
    }

    emitContact(notification:Notification){
        this.plotService.findPlots().subscribe(
            plots=>this.getPlotInfo(plots, notification)
        );
    }

    getPlotInfo(plotList:Array<Plot>, notification:Notification){
        for(let i=0;i<plotList.length;i++){
            if(plotList[i].id===notification.plotId){
                this.currentPlot=plotList[i];
                break;
            }
        }
        console.log("Current plot: "+this.currentPlot.name);
        notification.showDescription=true;
    }

    showNotifList(notification:Notification){

        notification.showDescription=false;
    }

    getNotifications(){
        this.notificationService.listAccount().subscribe(
            notifications=> this.initialiseNotif(notifications)
        );
    }

    initialiseNotif(notifications:Array<Notification>){
        for(let i=0;i<notifications.length;i++){
            notifications[i].showDescription=false;
        }
        this.notifications = notifications


    }
}
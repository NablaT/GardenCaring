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

@Component({
    selector: 'contact-list',
    moduleId: module.id,
    templateUrl: 'contact-list.component.html',
    styleUrls : ['./contact-list.component.css'],
    directives: [ContactItemComponent,
        CardComponent
    ],
    providers: [NotificationApi],
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


    @Output() sendContact= new EventEmitter<Notification>();

    constructor(private notificationService:NotificationApi){
        this.showNotification=false;
        this.notifications=[];
        this.pathImage="../../../../../assets/notification/logo2.png";
        this.pathCardImage="../../../../../assets/card/potager.png";
        //this.contactList=[new ContactModelComponent("-1", "Pierre", "Marcousi", "Je te dirai ça demain")];
    }

    ngOnInit(){
        this.getNotifications();
    }

    emitContact(notifications:Notification){
        this.showNotification=true;
    }

    showNotifList(){

        this.showNotification=false;
    }

    getNotifications(){
        this.notificationService.listAccount().subscribe(
            notifications=>this.notifications = notifications
        );
    }
}
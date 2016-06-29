/**
 * Component ChatContactListComponent
 */

import {Component, Output, EventEmitter} from '@angular/core';
import {ContactItemComponent} from "../contact-item/contact-item.component";
import {NotificationApi} from "../../../../shared/services/src/notification-api.service";
import {Notification} from "../../../../shared/models/Notification";

@Component({
    selector: 'contact-list',
    moduleId: module.id,
    templateUrl: 'contact-list.component.html',
    styleUrls : ['./contact-list.component.css'],
    directives: [ContactItemComponent],
    providers: [NotificationApi]
})
export class ContactListComponent {

    private notifications:Array<Notification>;
    private pathImage:string;


    @Output() sendContact= new EventEmitter<Notification>();

    constructor(private notificationService:NotificationApi){
        this.notifications=[];
        this.pathImage="../../../../../assets/notification/logo2.png";
        //this.contactList=[new ContactModelComponent("-1", "Pierre", "Marcousi", "Je te dirai ça demain")];
    }

    ngOnInit(){
        this.getNotifications();
    }

    emitContact(notifications:Notification){
        this.sendContact.emit(contact);
    }

    getNotifications(){
        this.notificationService.listAccount().subscribe(
            notifications=>this.notifications = notifications
        );
    }
}
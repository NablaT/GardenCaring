/**
 * Component ChatContactListComponent
 */

import {Component, Output, EventEmitter} from '@angular/core';
import {ContactModel} from '../../../models/contact-model/contact.model';
import {ContactItemComponent} from "../contact-item/contact-item.component";
import {ManageChatService} from "../../../../shared/services/src/manage-chat.service";

@Component({
    selector: 'contact-list',
    moduleId: module.id,
    templateUrl: 'contact-list.component.html',
    styleUrls : ['./contact-list.component.css'],
    directives: [ContactItemComponent],
    providers: [ManageChatService]
})
export class ContactListComponent {

    private contactList:ContactModel[];


    @Output() sendContact= new EventEmitter<ContactModel>();

    constructor(private _manageChatService:ManageChatService){
        this.getContacts();
        //this.contactList=[new ContactModelComponent("-1", "Pierre", "Marcousi", "Je te dirai ça demain")];
    }

    emitContact(contact:ContactModel){
        this.sendContact.emit(contact);
    }

    getContacts(){
        this._manageChatService.getContacts().then(
            contacts => this.contactList=contacts
        )
    }
}
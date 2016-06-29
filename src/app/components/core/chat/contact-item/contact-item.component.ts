/**
 * Component ChatContactItemComponent
 */

import {Component, Output, Input, EventEmitter} from '@angular/core';
import {ContactModel} from "../../../models/contact-model/contact.model";
import {MessageModel} from "../../../models/message-model/message.model";
import {ManageChatService} from "../../../../shared/services/src/manage-chat.service";

@Component({
    selector: 'contact-item',
    moduleId: module.id,
    templateUrl: 'contact-item.component.html',
    styleUrls : ['./contact-item.component.css']
})
export class ContactItemComponent {

    @Input('id') id:string;
    private contact:ContactModel;
    private lastMessage:MessageModel;

    @Output() sendContact= new EventEmitter<ContactModel>();

    constructor(private _manageChatService: ManageChatService){
        this.contact=new ContactModel("","","","","");
        this.lastMessage= new MessageModel("","","","");
    }


    ngOnInit() {
        this.getContactFromID();
    }


    getContactFromID(){
        this._manageChatService.getContact(this.id).then(
            contact => { this.contact=contact}
        );
        this._manageChatService.getLastMessage(this.id).then(
            lastMessage =>  this.lastMessage=lastMessage
        );
    }


    emitContact(){
        this.sendContact.emit(new ContactModel("1", this.contact.firstName,
            this.contact.lastName, this.contact.lastMessage,""));
    }

}
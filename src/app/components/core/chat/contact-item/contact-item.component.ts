/**
 * Component ChatContactItemComponent
 */

import {Component, Output, Input, EventEmitter} from '@angular/core';
import {Notification} from "../../../../shared/models/Notification";

@Component({
    selector: 'contact-item',
    moduleId: module.id,
    templateUrl: 'contact-item.component.html',
    styleUrls : ['./contact-item.component.css']
})
export class ContactItemComponent {

    @Input('id') id:string;
    @Input('content') content:string;
    @Input('seen') seen:string;
    @Input('pathImage') pathImage:string;
    private notification:Notification;
    private lastMessage:Notification;

    @Output() sendContact= new EventEmitter<Notification>();



}
/**
 * Component NotificationComponent
 */

import {Component} from '@angular/core';
import {ContactListComponent} from "../core/chat/contact-list/contact-list.component";

@Component({
    selector: 'notification',
    moduleId: module.id,
    templateUrl: './notification.component.html',
    styleUrls : ['./notification.component.css'],
    directives:[ContactListComponent]
})
export class NotificationComponent { }
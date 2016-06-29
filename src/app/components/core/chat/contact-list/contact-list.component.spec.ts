/**
 * Test Component ChatContactList
 */
import {ContactListComponent} from "./contact-list.component.ts";
import {Component} from "@angular/core";
@Component({
    selector: 'test-contact-list',
    template: '<sd-contact-list></sd-contact-list>',
    directives: []
})
class TestContactListComponent {}
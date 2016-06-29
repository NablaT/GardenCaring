import {Component} from "@angular/core";
import {
    RouteConfig,
    ROUTER_DIRECTIVES
} from "@angular/router-deprecated";
import {HeaderComponent} from "./components/header/index";
import {AboutComponent} from "./components/+about/index";
import {HomeComponent} from "./components/+home/index";
import {ProfileComponent} from "./components/+profile/index";
import {NotificationComponent} from "./components/+notification/notification.component";

@Component({
    selector: 'app',
    moduleId: module.id,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    directives: [
        ROUTER_DIRECTIVES,
        HeaderComponent
    ]
})
@RouteConfig([

    {path: '/', name: 'About', component: AboutComponent},
    {path: '/home', name: 'Home', component: HomeComponent},
    {path: '/profile', name: 'Profile', component: ProfileComponent},
    {path: '/notification', name: 'Notification', component: NotificationComponent}
])
export class AppComponent {
}
import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {HeaderComponent} from './components/header/index';
import {AboutComponent} from './components/+about/index';
import {HomeComponent} from './components/+home/index';
import {ProfileComponent} from "./components/profile/profile.component";

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
    {path: '/', name: 'Home', component: HomeComponent},
    {path: '/about', name: 'About', component: AboutComponent},
    {path: '/profile', name: 'Profile', component: ProfileComponent}
])
export class AppComponent {
}
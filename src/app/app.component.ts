import { FileUploaderComponent } from './shared/fileuploader/file-uploader.component';
import { Component, OnInit, enableProdMode} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
@Component({
     selector: 'pm-app',
     templateUrl: './app.component.html',
     
})
// @RouteConfig([
//     { path: '/home', name: 'Home', component: PrivateComponent, useAsDefault:true },
//     { path: '/login', name: 'Login', component: LoginComponent }
// ])

export class AppComponent implements OnInit {
    constructor(private router: Router) { }
    
    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0)
        });
    }
}
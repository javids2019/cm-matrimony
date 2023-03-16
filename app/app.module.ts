import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { AppComponent }  from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Services } from './shared/services';
import {AccordionModule} from "ng2-accordion";
import { MyDatePickerModule } from 'mydatepicker';
import { FancyImageUploaderModule } from 'ng2-fancy-image-uploader';

import { CommonModule, APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common'; 
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterializeModule } from "angular2-materialize";


@NgModule({ 
    imports: [
        BrowserModule,
        HttpModule,
        BrowserAnimationsModule, MaterializeModule,
        AccordionModule,
        MyDatePickerModule,
        FancyImageUploaderModule,
        SimpleNotificationsModule.forRoot(),
        CommonModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', component: WelcomeComponent },
            { path: 'register', component: RegisterComponent },
            { path: '**', redirectTo: '' }
        ]),
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        AppComponent,
        WelcomeComponent,
        RegisterComponent],
 
   
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
        Services,  
    ],
    bootstrap: [
        AppComponent,
    ]
})
export class AppModule { }

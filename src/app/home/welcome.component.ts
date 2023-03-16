import { Component, ViewContainerRef } from '@angular/core';
import { OnInit }  from '@angular/core';
import { Services } from '../shared/services';
import { SelectItems, enqueryusermodel, IEmployee } from '../shared/interfaces';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

@Component({
    templateUrl: 'welcome.component.html',
    styleUrls: ['welcome.component.css'],
})

export class WelcomeComponent implements OnInit {
    pageTitle: string = 'Users List';
    public user = new enqueryusermodel('', '', '', '', '');
    isvalid: boolean = false;
    errorMessage: string;
    constructor(private _service: Services, private _notifyservice: NotificationsService) {

    }
    getUserModel = new enqueryusermodel('', '', '', '', '');
    SendMailToAdmin(getUserModel: enqueryusermodel): void {
        if (this.user.name != null && this.user.city != null && this.user.emailid != null && this.user.lookingfor != null && this.user.mobileno != null) {
            this._service.SendMailToAdmin(this.user)
                .then(output => this.shownotify(), error => this.errorMessage = <any>error);
        }
    }

    shownotify() {
        this._notifyservice.success(
            'Thanks you, You have successfully registered', '',
            //'One of our matchmakers will contact you !!!',
            {
                timeOut: 5000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: false,
            });
        this.user = new enqueryusermodel('', '', '', '', '');
    }

    public nfyoptions = {
        position: ["bottom", "right"],
        timeOut: 5000,
        lastOnBottom: true,
    }
    ngOnInit(): void {
        //this._welcomeService.SendMailToAdmin(this.user)
        //    .then(output => this.user = new enqueryusermodel('', '', '', '', ''), error => this.errorMessage = <any>error);        
    }

}



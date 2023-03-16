import { Component, ViewContainerRef } from '@angular/core';
import { OnInit, Pipe, PipeTransform }  from '@angular/core';
import { SelectItems, enqueryusermodel, IEmployee } from '../shared/interfaces';
import { Services } from '../shared/services';
import { usermodel }      from '../shared/usermodel';
import {IMyDpOptions, IMyDateModel} from 'mydatepicker';
import {AccordionModule} from "ng2-accordion";
import { FancyImageUploaderOptions, UploadedFile } from 'ng2-fancy-image-uploader';
import { FileUploaderComponent } from '../shared/fileuploader/file-uploader.component';
import { SimpleNotificationsModule, NotificationsService } from 'angular2-notifications';

@Component({
    templateUrl: 'Register.component.html'
})

export class RegisterComponent implements OnInit {
    pageTitle: string = 'Users List';
    public user = new enqueryusermodel('', '', '', '', '');
    isvalid: boolean = false;
    errorMessage: string;
    users: IEmployee[];
    heightList: SelectItems[];
    weightList: SelectItems[];
    dropdownList: {};
    motherToungeList: SelectItems[];
    userList: {};
    Divisionlist: SelectItems[];
    LanguagesList: SelectItems[];
    IncomeList: SelectItems[];
    CountryList: SelectItems[];
    CourceList: SelectItems[];
    AgeList: SelectItems[];
    StatesList: SelectItems[];
    CityList: SelectItems[];
    usermodel = new usermodel();
    data: any;
    fullImagePath: string;
    fileData: any;
    private isUploadBtn: boolean = true;
    formData = new FormData();
    selectedDateOfBirth: string = '';
    constructor(private _service: Services,
        private _notifyservice: NotificationsService) {
        this.data = {};
    }

    
    private myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
        todayBtnTxt: 'Today',
        firstDayOfWeek: 'mo',
        sunHighlight: true,
        inline: false,
        // disableUntil: { year: 2016, month: 8, day: 10 }
    };

    options: FancyImageUploaderOptions = {
        thumbnailHeight: 250,
        thumbnailWidth: 250,
        autoUpload: false,
        uploadUrl: '',
        allowedImageTypes: ['image/png', 'image/jpeg'],
        maxImageSize: 3
    };

    clicked(event: EventTarget) {
        let eventObj: MSInputMethodContext = <MSInputMethodContext>event;
        let target: HTMLInputElement = <HTMLInputElement>eventObj.target;
        let file = target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log('base64 do arquivo', reader.result);
            // this.fileData = reader.readAsText(reader.result);
            //console.log('base64 do arquivo codificado',midia.binario);
        };
        reader.onerror = function (error) {
            console.log('Erro ao ler a imagem : ', error);
        };
    }



    ngOnInit(): void {
        //this._welcomeService.SendMailToAdmin(this.user)
        //    .then(output => this.user = new enqueryusermodel('', '', '', '', ''), error => this.errorMessage = <any>error);      



        this._service.getHeightLookups()
            .subscribe(item => this.heightList = item, error => this.errorMessage = <any>error);

        this._service.getDivisionLookups()
            .subscribe(item => this.Divisionlist = item, error => this.errorMessage = <any>error);

        this._service.getLanguagesLookups()
            .subscribe(item => this.LanguagesList = item, error => this.errorMessage = <any>error);

        this._service.getWeightLookup()
            .subscribe(item => this.weightList = item, error => this.errorMessage = <any>error);

        this._service.getIncomeLookups()
            .subscribe(item => this.IncomeList = item, error => this.errorMessage = <any>error);

        this._service.getCountryLookups()
            .subscribe(item => this.CountryList = item, error => this.errorMessage = <any>error);

        this._service.getCourseLookups()
            .subscribe(item => this.CourceList = item, error => this.errorMessage = <any>error);

        this._service.getAgeLookup()
            .subscribe(item => this.AgeList = item, error => this.errorMessage = <any>error);

        this._service.getStatesLookups()
            .subscribe(item => this.StatesList = item, error => this.errorMessage = <any>error);

        this._service.getCourseLookups()
            .subscribe(item => this.CourceList = item, error => this.errorMessage = <any>error);

    }

    onStateChange(newValue: string) {
        console.log(newValue);
        this._service.getCitysLookups(newValue)
            .subscribe(item => this.CityList = item, error => this.errorMessage = <any>error);

    }

    public nfyoptions = {
        position: ["bottom", "right"],
        timeOut: 5000,
        lastOnBottom: true,   
    }


    manageUsers(model: usermodel): void {
        model.DateOfBirthstr = this.selectedDateOfBirth;
        this._service.manageUsers(model)
            .then(item => this.saveimagedata(item), error => this.errorMessage = <any>error);
    }

    saveimagedata(item: any) {
        this._service.fileUpload(this.formData, item.UserId);

        this._notifyservice.success(
            'Thanks you, You have successfully registered', '',
            //'One of our matchmakers will contact you !!!',
            {
                timeOut: 5000,
                showProgressBar: true,
                pauseOnHover: false,
                clickToClose: false,
            });
    };



    onDateChanged(event: IMyDateModel) {
        console.log(new Date(event.jsdate).toLocaleDateString());
        this.selectedDateOfBirth = new Date(event.jsdate).toLocaleDateString();
        console.log(this.selectedDateOfBirth);
    }
    fileChange(event) {

        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            let file: File = fileList[0];
            //this.formData = new FormData();
            this.formData.append('uploadFile', file, file.name);

        }
        // window.location.reload();
    }

    onRemoved1(event) {
        debugger;
    }
    onRemoved2(event) {

    }





}

@Pipe({
    name: 'decode64'
})
export class Decode64Pipe implements PipeTransform {
    transform(value: any, args?: any): any {
        let a = '';
        if (value) {
            a = atob(value);
        }
        return a;
    }
}



import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import { SelectItems, enqueryusermodel, IEmployee } from './interfaces';
import { usermodel }      from './usermodel';

@Injectable()
export class Services {
    private _baseUrl = '';
    private options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8' }, ) });

    constructor(private _http: Http) {

        if (window.location.hostname == "localhost")
            this._baseUrl = 'http://localhost:4398/';
        else
            this._baseUrl = 'http://api.classymatrimony.com/';

    }

    SendMailToAdmin(userModel: enqueryusermodel): Promise<boolean> {
        //alert(userModel.name);
        return this._http.post(this._baseUrl + 'api/ClassyMatriApi/SendMailToAdmin', JSON.stringify(userModel), { headers: this.options.headers })
            .map(this.extractData).toPromise()
            .catch(this.handleError);
    }


    private extractData(res: Response) {
        let body = res.json();
        console.log("Body Data = " + body.data);
        return body.data || [];
    }

    getHeightLookups(): Observable<SelectItems[]> {
        return this._http.get(this._baseUrl + 'api/LookupApi/GetHeightLookups')
            .map((response: Response) => <SelectItems[]>response.json())
            .catch(this.handleError);
    }

    getDivisionLookups(): Observable<SelectItems[]> {
        return this._http.get(this._baseUrl + 'api/LookupApi/GetDivisionLookups')
            .map((response: Response) => <SelectItems[]>response.json())
            .catch(this.handleError);
    }
    getLanguagesLookups(): Observable<SelectItems[]> {
        return this._http.get(this._baseUrl + 'api/LookupApi/GetLanguagesLookups')
            .map((response: Response) => <SelectItems[]>response.json())
            .catch(this.handleError);
    }

    getWeightLookup(): Observable<SelectItems[]> {
        return this._http.get(this._baseUrl + 'api/LookupApi/GetWeightLookup')
            .map((response: Response) => <SelectItems[]>response.json())
            .catch(this.handleError);
    }
    getIncomeLookups(): Observable<SelectItems[]> {
        return this._http.get(this._baseUrl + 'api/LookupApi/GetIncomeLookups')
            .map((response: Response) => <SelectItems[]>response.json())
            .catch(this.handleError);
    }


    getCountryLookups(): Observable<SelectItems[]> {
        return this._http.get(this._baseUrl + 'api/LookupApi/GetCountryLookups')
            .map((response: Response) => <SelectItems[]>response.json())
            .catch(this.handleError);
    }
    getCourseLookups(): Observable<SelectItems[]> {
        return this._http.get(this._baseUrl + 'api/LookupApi/GetCourseLookups')
            .map((response: Response) => <SelectItems[]>response.json())
            .catch(this.handleError);
    }

    getEmployedinLookups(): Observable<SelectItems[]> {
        return this._http.get(this._baseUrl + 'api/LookupApi/GetEmployedinLookups')
            .map((response: Response) => <SelectItems[]>response.json())
            .catch(this.handleError);
    }
    getAgeLookup(): Observable<SelectItems[]> {
        return this._http.get(this._baseUrl + 'api/LookupApi/GetAgeLookup')
            .map((response: Response) => <SelectItems[]>response.json())
            .catch(this.handleError);
    }
    getStatesLookups(): Observable<SelectItems[]> {
        return this._http.get(this._baseUrl + 'api/LookupApi/GetStatesLookups')
            .map((response: Response) => <SelectItems[]>response.json())
            .catch(this.handleError);
    }
    getCitysLookups(name: string): Observable<SelectItems[]> {
        return this._http.get(this._baseUrl + 'api/LookupApi/GetCitysLookups/' + name)
            .map((response: Response) => <SelectItems[]>response.json())
            // .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError);
    }

    manageUsers(emp: usermodel): Promise<usermodel[]> {
        return this._http.post(this._baseUrl + 'api/ClassyMatriApi/ManageUsers', JSON.stringify(emp),
            { headers: this.options.headers })
            .map((response: any) => <usermodel[]>response.json()).toPromise()
            .catch(this.handleError);
    }
 

    fileUpload(formData: any, id : number) {
         // var options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json; charset=utf-8' }, ) });
        let apiUrl1 = this._baseUrl + "api/ClassyMatriApi/UploadFileApi/" + id;

          let headers = new Headers();
          //headers.append('Content-Type', 'json');  
          //headers.append('Accept', 'application/json');  
          let options = new RequestOptions({ headers: headers });  


        this._http.post(apiUrl1, formData, options)
            .map(res => res.json())
            .catch(error => Observable.throw(error))
            .subscribe(
            data => console.log('success'),
            error => console.log(error)
            )
    }



    // getProduct(id: number): Observable<IEmployee> {
    //     return this.getProducts()
    //         .map((products: IEmployee[]) => products.find(p => p.empid === id));
    // }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

/**
 * Service ManageDataService
 */
import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Metric} from "../../models/index";


@Injectable()
export class ManageDataService {

    //private _serverLink ='http://gardenhubconnector-2.eu-gb.mybluemix.net/databyserial?serial=AE0X1234&from=1467133196277&metric=temperature';
    //private _serverLink ='http://gardencaring-services.eu-gb.mybluemix.net/rest/data?form=1467133789089?serial=';

    private _serverLink ='http://gardenhubconnector-2.eu-gb.mybluemix.net/databyserial?serial=';

    private extensionLink: string[];
    /**
     * Constructor
     * @param http
     */
    constructor(private http:Http) {
    }

    /**
     * Function getNews. This function makes a get HTTP request to the server
     * @returns {Promise<*>|Promise<T>}
     */
    getData() {
        return this.http.get(this._serverLink)
            .toPromise()
            .then(res => <Metric[]> res.json())
            .catch(this.handleError);
    }

    getDataFromId(id:string){
        this._serverLink=this._serverLink+""+id;
        return this.http.get(this._serverLink)
            .toPromise()
            .then(res => <Metric[]> res.json())
            .catch(this.handleError);
    }

    handleError() {

    }

}
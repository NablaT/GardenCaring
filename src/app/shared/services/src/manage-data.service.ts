/**
 * Service ManageDataService
 */
import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Metric} from "../../models/metric";


@Injectable()
export class ManageDataService {


    private _serverLink ='http://gardenhubconnector-2.eu-gb.mybluemix.net/databyserial?serial=AE0X1234&from=1467133196277&metric=temperature';
    private extensionLink: string[];

    /**
     * Constructor
     * @param http
     */
    constructor(private http:Http) {}

    /**
     * Function getNews. This function makes a get HTTP request to the server
     * @returns {Promise<*>|Promise<T>}
     */
    getData() {
        return this.http.get(this._serverLink)
            .toPromise()
            .then( res =>  <Metric[]> res.json() )
            .catch(this.handleError);
    }

    handleError(){

    }

}
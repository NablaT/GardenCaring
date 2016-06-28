/**
 * Created by Remi on 28/06/2016.
 */
export class Metric{

    public id:string;
    public name:string;
    public value:string;

    constructor(id:string, name:string, value:string){
        this.id=id;
        this.name=name;
        this.value=value;
    }
}
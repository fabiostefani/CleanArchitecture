export default class PlaceOrderOutput {
    code: string; 
    total: number;
    freight: number;
    constructor({code, total, freight} : {code: string, total: number, freight: number})
    {
        this.code = code;
        this.total = total;        
        this.freight = freight;
    }
}
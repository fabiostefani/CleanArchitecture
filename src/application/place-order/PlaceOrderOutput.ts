export default class PlaceOrderOutput {
    code: string; 
    total: number;
    freight: number;
    taxes: number;
    constructor({code, total, freight, taxes} : {code: string, total: number, freight: number, taxes: number})
    {
        this.code = code;
        this.total = total;        
        this.freight = freight;
        this.taxes = taxes;
    }
}
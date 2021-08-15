export default class PlaceOrderOutput {
    total: number;
    freight: number;
    constructor({total, freight} : {total: number, freight: number})
    {
        this.total = total;        
        this.freight = freight;
    }
}
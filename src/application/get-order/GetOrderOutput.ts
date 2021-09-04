export default class GetOrderOutput {
    code: string; 
    freight: number;
    taxes: number;
    total: number;
    orderItems: { itemDescription: string, price: number, quantity: number} [];
    constructor( { code, total, freight, taxes, orderItems } : {code: string, total: number, freight: number, taxes: number, orderItems: { itemDescription: string, price: number, quantity: number}[]})
    {
        this.code = code;
        this.total = total;        
        this.freight = freight;
        this.taxes = taxes;
        this.orderItems = orderItems;
    }
}
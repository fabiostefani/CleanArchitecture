export default class GetOrderOutput {
    code: string; 
    freight: number;
    total: number;
    orderItems: { itemDescription: string, price: number, quantity: number} [];
    constructor( { code, total, freight, orderItems } : {code: string, total: number, freight: number, orderItems: { itemDescription: string, price: number, quantity: number}[]})
    {
        this.code = code;
        this.total = total;        
        this.freight = freight;
        this.orderItems = orderItems;
    }
}
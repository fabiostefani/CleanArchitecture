export default class PlaceOrderInput {
    cpf: string;
    zipCode: string;
    items: any;
    coupon: string;
    issueDate: any;
    constructor({cpf, zipCode, items, coupon, issueDate = new Date()} : {cpf: string, zipCode: string, items: any, coupon: string, issueDate?: Date})
    {
        this.cpf = cpf;
        this.zipCode = zipCode;
        this.items = items;
        this.coupon = coupon;
        this.issueDate = issueDate;
    }
}
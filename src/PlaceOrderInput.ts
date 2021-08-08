export default class PlaceOrderInput {
    cpf: string;
    zipCode: string;
    items: any;
    coupon: string;
    constructor({cpf, zipCode, items, coupon} : {cpf: string, zipCode: string, items: any, coupon: string})
    {
        this.cpf = cpf;
        this.zipCode = zipCode;
        this.items = items;
        this.coupon = coupon;
    }
}
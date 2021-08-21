import Cpf from "./Cpf";
import OrderItem from "./OrderItem";
import Coupon from "./Coupon";
import OrderCode from "./OrderCode";

export default class Order {
    cpf: Cpf;
    items: OrderItem[];
    coupon: Coupon | undefined;
    freight: number;
    code: OrderCode;
    issueData: Date;
    sequence: number;
    constructor(cpf: string, issueDate: Date = new Date(), sequence: number = 1)
    {        
        this.cpf = new Cpf(cpf);
        this.items = [];
        this.freight = 0;
        this.issueData = issueDate;
        this.sequence = sequence;
        this.code = new OrderCode(issueDate, sequence);
    }

    addItem(id: string, price: number, quantity: number) {
        this.items.push(new OrderItem(id, price, quantity));
    }

    addCoupon(coupon: Coupon) {
        if (coupon.isExpired()) return;
        this.coupon = coupon;
    }

    getTotal() {
        let total = 0;
        for (const ordemItem of this.items) {
            total += ordemItem.getTotal();
        }

        if (this.coupon) {
            total -= (total * this.coupon.percentage)/100;
        }
        total += this.freight;
        return total;
    }   
}
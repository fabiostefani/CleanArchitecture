import Cpf from "./Cpf";
import OrderItem from "./OrderItem";
import Coupon from "./Coupon";

export default class Order {
    cpf: Cpf;
    items: OrderItem[];
    coupon: Coupon | undefined;
    freight: number;
    constructor(cpf: string)
    {        
        this.cpf = new Cpf(cpf);
        this.items = [];
        this.freight = 0;
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
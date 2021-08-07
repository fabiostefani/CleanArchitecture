import Coupon from "./Coupon";
import Cpf from "./Cpf";
import OrderItem from "./OrderItem";

export default class Order {
    cpf: Cpf;
    items: OrderItem[];
    coupon: Coupon | undefined;
    constructor(cpf: string)
    {        
        this.cpf = new Cpf(cpf);
        this.items = [];
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
        return total;
    }   
}
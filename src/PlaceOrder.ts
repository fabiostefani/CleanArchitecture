import Coupon from "./Coupon";
import Order from "./Order";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";
import Item from "./Item";
import FreightCalculator from "./FreightCalculator";
import ZipCodeCalculatorAPIMemory from "./ZipCodeCalculatorAPIMemory";

export default class PlaceOrder {
    coupons: Coupon[];
    orders: Order[];
    items: Item[];
    zipcodeCalculator: ZipCodeCalculatorAPIMemory;
    constructor() {
        this.coupons = [
            new Coupon("VALE20",20, new Date("2021-10-10")),
            new Coupon("VALE20_EXPIRED",20, new Date("2020-10-10"))
        ];
        this.items = [
            new Item("1", "Guitarra", 1000, 100, 50, 15, 3),
            new Item("2", "Amplificador", 5000, 50, 50, 50, 22),
            new Item("3", "Cabo", 30, 10, 10, 10, 1)
        ]
        this.orders = [];
        this.zipcodeCalculator = new ZipCodeCalculatorAPIMemory()
    }

    execute(input: PlaceOrderInput): PlaceOrderOutput {
        const order = new Order(input.cpf);
        const distance = this.zipcodeCalculator.calculate(input.zipCode, "99.999-999");
        for (const orderItem of input.items) {
            const item = this.items.find(item=>item.id==orderItem.id);
            if (!item) throw new Error("Item not found");            
            order.addItem(orderItem.id, item.price, orderItem.quantity);            
            order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
        }
        if (input.coupon) {
            const coupon = this.coupons.find(coupon => coupon.code == input.coupon);
            if (coupon) order.addCoupon(coupon);
        }

        const total = order.getTotal();
        this.orders.push(order);
        return new PlaceOrderOutput({            
            total: total,
            freight: order.freight
        });
    }
}
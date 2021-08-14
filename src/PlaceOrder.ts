import Order from "./Order";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";
import FreightCalculator from "./FreightCalculator";
import ZipCodeCalculatorAPIMemory from "./ZipCodeCalculatorAPIMemory";
import ItemRepository from "./ItemRepository";
import CouponRepository from "./CouponRepository";
import OrderRepository from "./OrderRepository";

export default class PlaceOrder {        
    zipcodeCalculator: ZipCodeCalculatorAPIMemory;
    itemRepositoy: ItemRepository;
    couponRepository: CouponRepository;
    orderRepository: OrderRepository;
    zipCodeCalculatorAPI: ZipCodeCalculatorAPIMemory;
    constructor(itemRepositoy: ItemRepository, couponRepository: CouponRepository, orderRepository: OrderRepository, zipCodeCalculatorAPI: ZipCodeCalculatorAPIMemory) {
        this.itemRepositoy = itemRepositoy;        
        this.couponRepository = couponRepository;        
        this.zipcodeCalculator = new ZipCodeCalculatorAPIMemory()
        this.orderRepository = orderRepository;
        this.zipCodeCalculatorAPI = zipCodeCalculatorAPI;
    }

    execute(input: PlaceOrderInput): PlaceOrderOutput {
        const order = new Order(input.cpf);
        const distance = this.zipcodeCalculator.calculate(input.zipCode, "99.999-999");
        for (const orderItem of input.items) {
            const item = this.itemRepositoy.getById(orderItem.id);
            if (!item) throw new Error("Item not found");            
            order.addItem(orderItem.id, item.price, orderItem.quantity);            
            order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
        }
        if (input.coupon) {
            const coupon = this.couponRepository.getByCode(input.coupon);
            if (coupon) order.addCoupon(coupon);
        }
        const total = order.getTotal();
        this.orderRepository.save(order);
        return new PlaceOrderOutput({            
            total: total,
            freight: order.freight
        });
    }
}
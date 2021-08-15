import Order from "../domain/entity/Order";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";
import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";
import CouponRepository from "../domain/repository/CouponRepository";
import FreightCalculator from "../domain/service/FreightCalculator";
import ZipCodeCalculatorAPI from "../domain/gateway/ZipCodeCalculatorAPI";

export default class PlaceOrder {            
    itemRepositoy: ItemRepository;
    couponRepository: CouponRepository;
    orderRepository: OrderRepository;    
    zipCodeCalculatorAPI: ZipCodeCalculatorAPI;
    constructor(itemRepositoy: ItemRepository, couponRepository: CouponRepository, orderRepository: OrderRepository, zipCodeCalculatorAPI: ZipCodeCalculatorAPI) {
        this.itemRepositoy = itemRepositoy;        
        this.couponRepository = couponRepository;                
        this.orderRepository = orderRepository;
        this.zipCodeCalculatorAPI = zipCodeCalculatorAPI;
    }

    execute(input: PlaceOrderInput): PlaceOrderOutput {
        const order = new Order(input.cpf);
        const distance = this.zipCodeCalculatorAPI.calculate(input.zipCode, "99.999-999");
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
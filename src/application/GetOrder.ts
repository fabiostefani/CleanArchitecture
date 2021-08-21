import Order from "../domain/entity/Order";
import PlaceOrderInput from "./PlaceOrderInput";
import PlaceOrderOutput from "./PlaceOrderOutput";
import ItemRepository from "../domain/repository/ItemRepository";
import OrderRepository from "../domain/repository/OrderRepository";
import CouponRepository from "../domain/repository/CouponRepository";
import FreightCalculator from "../domain/service/FreightCalculator";
import ZipCodeCalculatorAPI from "../domain/gateway/ZipCodeCalculatorAPI";
import GetOrderOutput from "./GetOrderOutput";

export default class GetOrder {            
    itemRepositoy: ItemRepository;
    couponRepository: CouponRepository;
    orderRepository: OrderRepository;        
    constructor(itemRepositoy: ItemRepository, couponRepository: CouponRepository, orderRepository: OrderRepository) {
        this.itemRepositoy = itemRepositoy;        
        this.couponRepository = couponRepository;                
        this.orderRepository = orderRepository;        
    }

    async execute(code: string): Promise<GetOrderOutput> {
        const order = this.orderRepository.get(code);
        const orderItems: any[] = [];
        for(const orderItem of order.items) {
            const item = await this.itemRepositoy.getById(orderItem.id);
            const orderItemOutput = {
                itemDescription: item?.description,
                price: orderItem.price,
                quantity: orderItem.quantity
            }
            orderItems.push(orderItemOutput);
        }
        return new GetOrderOutput({
            code: order.code.value,
            freight: order.freight,
            total: order.getTotal(),
            orderItems
        });
    }
}
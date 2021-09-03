import Order from "../../domain/entity/Order";
import PlaceOrderOutput from "./PlaceOrderOutput";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import CouponRepository from "../../domain/repository/CouponRepository";
import FreightCalculator from "../../domain/service/FreightCalculator";
import ZipCodeCalculatorAPI from "../../domain/gateway/ZipCodeCalculatorAPI";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import PlaceOrderInput from "./PlaceOrderInput";

export default class PlaceOrder {            
    itemRepositoy: ItemRepository;
    couponRepository: CouponRepository;
    orderRepository: OrderRepository;    
    zipCodeCalculatorAPI: ZipCodeCalculatorAPI;
    constructor(repositoryFactory: RepositoryFactory, zipCodeCalculatorAPI: ZipCodeCalculatorAPI) {
        this.itemRepositoy = repositoryFactory.createItemRepository();        
        this.couponRepository = repositoryFactory.createCuponRepository();                
        this.orderRepository = repositoryFactory.createOrderRepository();
        this.zipCodeCalculatorAPI = zipCodeCalculatorAPI;
    }

    async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        const sequence = await this.orderRepository.count() + 1;        
        const order = new Order(input.cpf, input.issueDate, sequence);
        const distance = this.zipCodeCalculatorAPI.calculate(input.zipCode, "99.999-999");
        for (const orderItem of input.items) {
            const item = await this.itemRepositoy.getById(orderItem.id);
            if (!item) throw new Error("Item not found");            
            order.addItem(orderItem.id, item.price, orderItem.quantity);            
            order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
        }
        if (input.coupon) {
            const coupon = await this.couponRepository.getByCode(input.coupon);
            if (coupon) order.addCoupon(coupon);
        }
        const total = order.getTotal();
        await this.orderRepository.save(order);
        return new PlaceOrderOutput({            
            code: order.code.value,
            total: total,
            freight: order.freight
        });
    }
}
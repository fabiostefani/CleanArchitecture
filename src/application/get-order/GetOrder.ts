import OrderRepository from "../../domain/repository/OrderRepository";
import CouponRepository from "../../domain/repository/CouponRepository";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import ItemRepository from "../../domain/repository/ItemRepository";
import GetOrderOutput from "./GetOrderOutput";

export default class GetOrder {            
    itemRepositoy: ItemRepository;
    couponRepository: CouponRepository;
    orderRepository: OrderRepository;        
    constructor(repositoryFactory: RepositoryFactory) {
        this.itemRepositoy = repositoryFactory.createItemRepository();        
        this.couponRepository = repositoryFactory.createCuponRepository();                
        this.orderRepository = repositoryFactory.createOrderRepository();        
    }

    async execute(code: string): Promise<GetOrderOutput> {
        const order = await this.orderRepository.get(code);
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
            taxes: order.taxes,
            total: order.getTotal(),
            orderItems
        });
    }
}
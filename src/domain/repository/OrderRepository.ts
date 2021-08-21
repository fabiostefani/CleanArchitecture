import Order from "../entity/Order";

interface OrderRepository {
    save(order: Order) : void;
    count(): number;
    get(code: string) : Order;
}

export default OrderRepository;
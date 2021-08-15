import Order from "../entity/Order";

interface OrderRepository {
    save(order: Order) : void;
}

export default OrderRepository;
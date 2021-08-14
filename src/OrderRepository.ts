import Order from "./Order";

interface OrderRepository {
    save(order: Order) : void;
}

export default OrderRepository;
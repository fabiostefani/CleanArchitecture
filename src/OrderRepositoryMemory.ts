import Order from "./Order";
import OrderRepository from "./OrderRepository";

class OrderRepositoryMemory implements OrderRepository {
    orders: Order[];
    constructor(){
        this.orders = [];
    }

    save(order: Order) {
        this.orders.push(order);
    }
}

export default OrderRepositoryMemory;
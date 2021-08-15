import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

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
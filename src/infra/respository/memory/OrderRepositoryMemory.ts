import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

class OrderRepositoryMemory implements OrderRepository {
    orders: Order[];
    constructor(){
        this.orders = [];
    }

    get(code: string): Order {
        const order = this.orders.find(order => order.code.value === code);
        if (!order) throw new Error("Order no found");
        return order;
    }

    count(): number {
        return this.orders.length;
    }

    save(order: Order) {
        this.orders.push(order);
    }
}

export default OrderRepositoryMemory;
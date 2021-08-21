import Coupon from "../../../domain/entity/Coupon";
import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Database from "../../database/database";

class OrderRepositoryDatabase implements OrderRepository {
    database: Database;
    constructor(database: Database)
    {
        this.database = database;
    }
    
    async save(order: Order): Promise<void> {
        const orderData  =await this.database.one("insert into ccca.order (code, cpf, issue_date, freight, serial, coupon_code) values ($1,$2,$3,$4,$5,$6) returning *", [order.code.value, order.cpf.value, order.issueData, order.freight, order.sequence, order.coupon?.code]);
        for (const orderItem of order.items ) {
            await this.database.one("insert into ccca.order_item (id_order, id_item, price, quantity) values ($1,$2,$3,$4)", [orderData.id, orderItem.id, orderItem.price, orderItem.quantity]);
        }
    }
    
    async get(code: string): Promise<Order> {
        const orderData = await this.database.one("select * from ccca.order where code = $1", [code]);
        const orderItemsData = await this.database.many("select * from ccca.order_item where id_order = $1", [orderData.id]);
        const order = new Order(orderData.cpf, new Date(orderData.issueDate), orderData.serial);
        for (const orderItemData of orderItemsData) {
            order.addItem(orderItemData.id_item, parseFloat(orderItemData.price), orderItemData.quantity);
        }
        if (orderData.coupon_code) {
            const couponData = await this.database.one("select * from ccca.coupon where code = $1", [orderData.coupon_code]);
            const coupon = new Coupon(couponData.code, couponData.percentage, new Date(couponData.expire_date));
            order.addCoupon(coupon);
        }
        order.freight = parseFloat(orderData.freight);
        return order;
    }

    async count(): Promise<number> {
        const countData = await this.database.one("select count(*)::int as count from ccca.order", []);
        return countData.count;
    }

    async clean() : Promise<void> {
        await this.database.none("truncate table ccca.order_item", []);
        await this.database.none("truncate table ccca.order", []);
    }
    

}

export default OrderRepositoryDatabase;
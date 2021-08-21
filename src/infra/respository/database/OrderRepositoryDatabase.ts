import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Database from "../../database/database";

class OrderRepositoryDatabase implements OrderRepository {
    database: Database;
    constructor(database: Database)
    {
        this.database = database;
    }
    
    save(order: Order): void {
        throw new Error("Method not implemented.");
    }

    get(code: string): Order {
        throw new Error("Method not implemented.");
    }

    count(): number {
        //const countData = this.database.one("select count(*)::int as count from ccca.order", []);
        return 0;
    }
    

}

export default OrderRepositoryDatabase;
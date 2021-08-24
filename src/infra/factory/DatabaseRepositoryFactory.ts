import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import PgPromiseDatabase from "../database/PgPromiseDatabase";
import CouponRepositoryDatabase from "../respository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../respository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../respository/database/OrderRepositoryDatabase";

export default class DatabaseRepositoryFactory implements RepositoryFactory {
    createItemRepository(): ItemRepository {
        return new ItemRepositoryDatabase(PgPromiseDatabase.getInstance());
    }
    createCuponRepository(): CouponRepository {
        return new CouponRepositoryDatabase(PgPromiseDatabase.getInstance());
    }
    createOrderRepository(): OrderRepository {
        return new OrderRepositoryDatabase(PgPromiseDatabase.getInstance());
    }

}
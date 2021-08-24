import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import CouponRepositoryMemory from "../respository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../respository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../respository/memory/OrderRepositoryMemory";

export default class MemoryRepositoryFactory implements RepositoryFactory {
    createItemRepository(): ItemRepository {
        return new ItemRepositoryMemory();
    }
    createCuponRepository(): CouponRepository {
        return new CouponRepositoryMemory();
    }
    createOrderRepository(): OrderRepository {
        return OrderRepositoryMemory.getInstance();
    }

}
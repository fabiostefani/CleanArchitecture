import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import TaxTableRepository from "../../domain/repository/TaxTableRepository";
import CouponRepositoryMemory from "../respository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../respository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../respository/memory/OrderRepositoryMemory";
import TaxTableRepositoryMemory from "../respository/memory/TaxTableRepositoryMemory";

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

    createTaxTableRepository(): TaxTableRepository {
        return new TaxTableRepositoryMemory();
    }

}
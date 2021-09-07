import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import StockEntryRepository from "../../domain/repository/StockEntryRepository";
import TaxTableRepository from "../../domain/repository/TaxTableRepository";
import StockEntryRepositoryDataBase from "../respository/database/StockEntryRepositoryDataBase";
import CouponRepositoryMemory from "../respository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../respository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../respository/memory/OrderRepositoryMemory";
import StockEntryRepositoryMemory from "../respository/memory/StockEntryRepositoryMemory";
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

    createStockEntryRepository(): StockEntryRepository {
        return new StockEntryRepositoryMemory();
    }
}
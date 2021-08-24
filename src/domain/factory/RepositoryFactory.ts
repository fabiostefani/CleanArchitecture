import CouponRepository from "../repository/CouponRepository";
import ItemRepository from "../repository/ItemRepository";
import OrderRepository from "../repository/OrderRepository";

export default interface RepositoryFactory {
    createItemRepository() : ItemRepository;
    createCuponRepository(): CouponRepository;
    createOrderRepository() : OrderRepository;
}
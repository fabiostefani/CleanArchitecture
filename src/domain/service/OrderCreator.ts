import PlaceOrderInput from "../../application/place-order/PlaceOrderInput";
import Order from "../entity/Order";
import StockEntry from "../entity/StockEntry";
import RepositoryFactory from "../factory/RepositoryFactory";
import TaxCalculatorFactory from "../factory/TaxCalculatorFactory";
import ZipCodeCalculatorAPI from "../gateway/ZipCodeCalculatorAPI";
import CouponRepository from "../repository/CouponRepository";
import ItemRepository from "../repository/ItemRepository";
import OrderRepository from "../repository/OrderRepository";
import StockEntryRepository from "../repository/StockEntryRepository";
import TaxTableRepository from "../repository/TaxTableRepository";
import FreightCalculator from "./FreightCalculator";
import StockCalculator from "./StockCalculator";

export default class OrderCreator {

    itemRepositoy: ItemRepository;
    couponRepository: CouponRepository;
    orderRepository: OrderRepository;    
    zipCodeCalculatorAPI: ZipCodeCalculatorAPI;
    taxTableRepository: TaxTableRepository;
    stockEntryRepository: StockEntryRepository;

    constructor (repositoryFactory: RepositoryFactory, zipcodeCalculator: ZipCodeCalculatorAPI) {
        this.itemRepositoy = repositoryFactory.createItemRepository();        
        this.couponRepository = repositoryFactory.createCuponRepository();                
        this.orderRepository = repositoryFactory.createOrderRepository();
        this.taxTableRepository= repositoryFactory.createTaxTableRepository()
        this.stockEntryRepository = repositoryFactory.createStockEntryRepository();
        this.zipCodeCalculatorAPI = zipcodeCalculator;
    }
    async create (input: PlaceOrderInput) {
        const sequence = await this.orderRepository.count() + 1;        
        const order = new Order(input.cpf, input.issueDate, sequence);
        const distance = this.zipCodeCalculatorAPI.calculate(input.zipCode, "99.999-999");
        const taxCalculator = TaxCalculatorFactory.create(input.issueDate);
        const stockCalculator = new StockCalculator();
        for (const orderItem of input.items) {
            const item = await this.itemRepositoy.getById(orderItem.id);
            if (!item) throw new Error("Item not found");            
            order.addItem(orderItem.id, item.price, orderItem.quantity);            
            order.freight += FreightCalculator.calculate(distance, item) * orderItem.quantity;
            const taxTables = await this.taxTableRepository.getByIdItem(parseInt(item.id));            
            const taxes = taxCalculator.calculate(item, taxTables);            
            order.taxes += taxes * orderItem.quantity;            
            const stockEntries = await this.stockEntryRepository.getByIdItem(parseInt(item.id));
            const quantity = stockCalculator.calculate(stockEntries);            
            if (quantity < orderItem.quantity) throw new Error("Out of stock");
            this.stockEntryRepository.save(new StockEntry(parseInt(item.id), "out", orderItem.quantity, new Date()));
        }
        if (input.coupon) {
            const coupon = await this.couponRepository.getByCode(input.coupon);
            if (coupon) order.addCoupon(coupon);
        }
        const total = order.getTotal();
        await this.orderRepository.save(order);
        return order;
    }
}
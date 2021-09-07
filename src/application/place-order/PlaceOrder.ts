import PlaceOrderOutput from "./PlaceOrderOutput";
import ZipCodeCalculatorAPI from "../../domain/gateway/ZipCodeCalculatorAPI";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import PlaceOrderInput from "./PlaceOrderInput";
import OrderCreator from "../../domain/service/OrderCreator";
import ZipCodeCalculatorAPIMemory from "../../infra/gateway/memory/ZipCodeCalculatorAPIMemory";

export default class PlaceOrder {            
    zipcodeCalculator: ZipCodeCalculatorAPIMemory;
    repositoryFactory: RepositoryFactory;

    constructor (repositoryFactory: RepositoryFactory, zipcodeCalculator: ZipCodeCalculatorAPI) {
        this.repositoryFactory = repositoryFactory;
        this.zipcodeCalculator = zipcodeCalculator;
    }
    async execute(input: PlaceOrderInput): Promise<PlaceOrderOutput> {
        const orderService = new OrderCreator(this.repositoryFactory, this.zipcodeCalculator);
        const order = await orderService.create(input);
        const total = order.getTotal();
        return new PlaceOrderOutput({            
            code: order.code.value,
            total: total,
            freight: order.freight,
            taxes: order.taxes
        });
    }
}
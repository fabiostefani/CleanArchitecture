import PlaceOrder from "../../src/application/place-order/PlaceOrder";
import PlaceOrderInput from "../../src/application/place-order/PlaceOrderInput";
import ZipCodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipCodeCalculatorAPIMemory";
import GetOrder from "../../src/application/get-order/GetOrder";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory";
import ZipCodeCalculatorAPI from "../../src/domain/gateway/ZipCodeCalculatorAPI";

let repositoryFactory: RepositoryFactory;
let zipCodeCalculatorAPI: ZipCodeCalculatorAPI;

beforeEach(async function() {
    repositoryFactory = new DatabaseRepositoryFactory();        
    zipCodeCalculatorAPI = new ZipCodeCalculatorAPIMemory();
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
})

test("Deve consultar um pedido", async function() {
    const input = new PlaceOrderInput( {
        cpf: "778.278.412-36",
        zipCode: "11.111-111",
        issueDate: new Date("2021-10-10"),
        items: [
            { id: "1", quantity: 2},
            { id: "2", quantity: 1},
            { id: "3", quantity: 3}
        ], 
        coupon: "VALE20"
    });
    
    const placeOrder = new PlaceOrder(repositoryFactory, zipCodeCalculatorAPI);
    const output = await placeOrder.execute(input);
    const getOrder = new GetOrder(repositoryFactory);
    const getOrderOutput = await getOrder.execute(output.code);        
    expect(getOrderOutput.total).toBe(5982);        
})
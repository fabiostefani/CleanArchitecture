import PlaceOrder from "../../src/application/PlaceOrder";
import PlaceOrderInput from "../../src/application/PlaceOrderInput";
import ZipCodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipCodeCalculatorAPIMemory";
import GetOrder from "../../src/application/GetOrder";
import DatabaseRepositoryFactory from "../../src/infra/factory/DatabaseRepositoryFactory";

test("Deve consultar um pedido", async function() {
    const input = new PlaceOrderInput( {
        cpf: "778.278.412-36",
        zipCode: "11.111-111",
        items: [
            { id: "1", quantity: 2},
            { id: "2", quantity: 1},
            { id: "3", quantity: 3}
        ], 
        coupon: "VALE20"
    });
    const repositoryFactory = new DatabaseRepositoryFactory();        
    const zipCodeCalculatorAPI = new ZipCodeCalculatorAPIMemory();
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
    const placeOrder = new PlaceOrder(repositoryFactory, zipCodeCalculatorAPI);
    const output = await placeOrder.execute(input);
    const getOrder = new GetOrder(repositoryFactory);
    const getOrderOutput = await getOrder.execute(output.code);        
    expect(getOrderOutput.total).toBe(5982);    
})
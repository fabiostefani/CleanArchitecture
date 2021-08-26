import PlaceOrder from "../../src/application/PlaceOrder";
import PlaceOrderInput from "../../src/application/PlaceOrderInput";
import ZipCodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipCodeCalculatorAPIMemory";
import MemoryRepositoryFactory from "../../src/infra/factory/MemoryRepositoryFactory";

test("Deve fazer um pedido", async function() {
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
    const repositoryFactory = new MemoryRepositoryFactory();        
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
    const zipCodeCalculatorAPI = new ZipCodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipCodeCalculatorAPI);
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(5982);    
})

test("Deve fazer um pedido com cupom de desconto expirado", async function() {
    const input = new PlaceOrderInput( {
        cpf: "778.278.412-36",
        zipCode: "11.111-111",
        issueDate: new Date("2021-10-10"),
        items: [
            { id: "1", quantity: 2},
            { id: "2", quantity: 1},
            { id: "3", quantity: 3}
        ],
        coupon: "VALE20_EXPIRED"
    });
    const repositoryFactory = new MemoryRepositoryFactory();        
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
    const zipCodeCalculatorAPI = new ZipCodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipCodeCalculatorAPI);
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(7400);    
})

test("Deve fazer um pedido com calculo de frete", async function() {
    const input = new PlaceOrderInput( {
        cpf: "778.278.412-36",
        zipCode: "11.111-111",
        issueDate: new Date("2021-10-10"),
        items: [
            { id: "1", quantity: 2},
            { id: "2", quantity: 1},
            { id: "3", quantity: 3}
        ],
        coupon: "VALE20_EXPIRED"
    });
    const repositoryFactory = new MemoryRepositoryFactory();    
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
    const zipCodeCalculatorAPI = new ZipCodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipCodeCalculatorAPI);
    const output = await placeOrder.execute(input);
    expect(output.freight).toBe(310);    
})

test("Deve fazer um pedido calculando o código", async function() {
    const input = new PlaceOrderInput( {
        cpf: "778.278.412-36",
        zipCode: "11.111-111",
        items: [
            { id: "1", quantity: 2},
            { id: "2", quantity: 1},
            { id: "3", quantity: 3}
        ],
        issueDate: new Date("2020-10-10"),
        coupon: "VALE20_EXPIRED"
    });
    const repositoryFactory = new MemoryRepositoryFactory();        
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.clean();
    const zipCodeCalculatorAPI = new ZipCodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(repositoryFactory, zipCodeCalculatorAPI);
    await placeOrder.execute(input);
    const output = await placeOrder.execute(input);
    expect(output.code).toBe("202000000002");    
})
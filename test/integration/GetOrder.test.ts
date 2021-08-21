import CouponRepositoryMemory from "../../src/infra/respository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../../src/infra/respository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../../src/infra/respository/memory/OrderRepositoryMemory";
import PlaceOrder from "../../src/application/PlaceOrder";
import PlaceOrderInput from "../../src/application/PlaceOrderInput";
import ZipCodeCalculatorAPIMemory from "../../src/infra/gateway/memory/ZipCodeCalculatorAPIMemory";
import ItemRepositoryDatabase from "../../src/infra/respository/database/ItemRepositoryDatabase";
import PgPromiseDatabase from "../../src/infra/database/PgPromiseDatabase";
import CouponRepositoryDatabase from "../../src/infra/respository/database/CouponRepositoryDatabase";
import GetOrder from "../../src/application/GetOrder";

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
    const itemRepository = new ItemRepositoryDatabase(PgPromiseDatabase.getInstance());
    const couponRepository = new CouponRepositoryDatabase(PgPromiseDatabase.getInstance());
    const orderRepository = new OrderRepositoryMemory();
    const zipCodeCalculatorAPI = new ZipCodeCalculatorAPIMemory();
    const placeOrder = new PlaceOrder(itemRepository, couponRepository, orderRepository, zipCodeCalculatorAPI);
    const output = await placeOrder.execute(input);
    const getOrder = new GetOrder(itemRepository, couponRepository, orderRepository);
    const getOrderOutput = await getOrder.execute(output.code);        
    expect(getOrderOutput.total).toBe(5982);    
})
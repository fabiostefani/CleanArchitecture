import FreightCalculator from "./FreightCalculator";
import Item from "./Item";

test("Deve calcular o Frete do Guitarra", function() {
    const item = new Item("1", "Guitarra", 1000, 100, 50, 15, 3);
    const distance = 1000;
    const price = FreightCalculator.calculate(distance, item);
    expect(price).toBe(30);
})

test("Deve calcular o Frete do Amplificador", function() {
    const item = new Item("1", "Amplificador", 5000, 50, 50, 50, 22);
    const distance = 1000;
    const price = FreightCalculator.calculate(distance, item);
    expect(price).toBe(220);
})
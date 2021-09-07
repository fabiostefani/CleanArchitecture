import StockEntry from "../../src/domain/entity/StockEntry";
import StockCalculator from "../../src/domain/service/StockCalculator";

test("Deve calcular o estoque de um item", function () {
    const stockEntries = [
        new StockEntry(1, "in", 3, new Date()),
        new StockEntry(1, "out", 2, new Date()),
        new StockEntry(1, "in", 2, new Date())
    ];
    const stockCalculator = new StockCalculator();
    const quantity = stockCalculator.calculate(stockEntries);
    expect(quantity).toBe(3);
});
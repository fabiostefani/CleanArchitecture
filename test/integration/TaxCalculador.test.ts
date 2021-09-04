import Item from "../../src/domain/entity/Item"
import TaxTable from "../../src/domain/entity/TaxTable";
import TaxCalculatorFactory from "../../src/domain/factory/TaxCalculatorFactory";
import DefaultTaxCalculador from "../../src/domain/service/DefaultTaxCalculator";
import NovemberTaxCalculador from "../../src/domain/service/NovemberTaxCalculator";
import TaxCalculator from "../../src/domain/service/TaxCalculator";

test("Deve calcular o imposto de um item Guitarra em meses normais", function () {
    const item = new Item("1", "Guitarra", 1000, 100, 50, 30, 8);
    const taxTable = [new TaxTable(1, "default", 15), new TaxTable(1, "november", 5)]
    const date = new Date("2021-10-10");
    const taxCalculator = TaxCalculatorFactory.create(date);
    const amount = taxCalculator.calculate(item, taxTable);
    expect(amount).toBe(150);
})

test("Deve calcular o imposto de um item Guitarra no mes de Novembro", function () {
    const item = new Item("1", "Guitarra", 1000, 100, 50, 30, 8);
    const taxTable = [new TaxTable(1, "default", 15), new TaxTable(1, "november", 5)]
    const date = new Date("2021-11-10");
    const taxCalculator = TaxCalculatorFactory.create(date);
    const amount = taxCalculator.calculate(item, taxTable);
    expect(amount).toBe(50);
})

test("Deve calcular o imposto de um item Cabo em meses normais", function () {
    const item = new Item("3", "Cabo", 30, 10, 10, 10, 1);
    const taxTable = [new TaxTable(3, "default", 5), new TaxTable(3, "november", 1)]
    const date = new Date("2021-10-10");
    const taxCalculator = TaxCalculatorFactory.create(date);
    const amount = taxCalculator.calculate(item, taxTable);
    expect(amount).toBe(1.5);
})

test("Deve calcular o imposto de um item Cabo no mes de Novembro", function () {
    const item = new Item("3", "Cabo", 30, 10, 10, 10, 1);
    const taxTable = [new TaxTable(3, "default", 5), new TaxTable(3, "november", 1)]
    const date = new Date("2021-11-10");
    const taxCalculator = TaxCalculatorFactory.create(date);
    const amount = taxCalculator.calculate(item, taxTable);
    expect(amount).toBe(0.3);
})
import ZipCodeCalculatorAPIMemory from "./ZipCodeCalculatorAPIMemory";

test("Deve calcular a distância entre dois CEPs", function()
{   
    const zipcodecalculator = new ZipCodeCalculatorAPIMemory(); 
    const distance = zipcodecalculator.calculate("11.111-111", "99.999-999");
    expect(distance).toBe(1000);
});
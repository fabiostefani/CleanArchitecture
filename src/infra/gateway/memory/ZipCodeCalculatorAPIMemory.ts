import ZipCodeCalculatorAPI from "../../../domain/gateway/ZipCodeCalculatorAPI";

export default class ZipCodeCalculatorAPIMemory implements ZipCodeCalculatorAPI {
    calculate(zipcodeA: string, zipcodeB: string): number {
        return 1000;
    }

}
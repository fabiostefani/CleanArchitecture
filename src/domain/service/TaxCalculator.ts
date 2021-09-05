import Item from "../entity/Item";
import TaxTable from "../entity/TaxTable";

export default abstract class TaxCalculator {    
    
    calculate(item: Item, taxTables: TaxTable[]) : number {
        const tables = this.getTax(taxTables);        
        return (item.price * this.getTax(taxTables)) / 100;
    }

    abstract getTax(taxTables: TaxTable[]): number;
}
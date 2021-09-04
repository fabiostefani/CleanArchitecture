import TaxTable from "../entity/TaxTable";

interface TaxTableRepository {
    getByIdItem(idItem: number) :Promise<TaxTable[]>
}

export default TaxTableRepository;
import Item from "../entity/Item";

interface ItemRepository {
    getById(id: string) : Promise<Item | undefined>;
}

export default ItemRepository;
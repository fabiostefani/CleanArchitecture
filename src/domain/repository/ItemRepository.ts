import Item from "../entity/Item";

interface ItemRepository {
    getById(id: string) : Item | undefined;
}

export default ItemRepository;
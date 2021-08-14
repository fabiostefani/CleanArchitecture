import Item from "./Item";

interface ItemRepository {
    getById(id: string) : Item | undefined;
}

export default ItemRepository;
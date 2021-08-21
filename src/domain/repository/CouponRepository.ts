import Coupon from "../entity/Coupon";

interface CouponRepository {
    getByCode(code: string) : Promise<Coupon | undefined>;
}

export default CouponRepository;
import Coupon from "../entity/Coupon";

interface CouponRepository {
    getByCode(code: string) : Coupon | undefined;
}

export default CouponRepository;
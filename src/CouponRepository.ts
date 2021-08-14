import Coupon from "./Coupon";

interface CouponRepository {
    getByCode(code: string) : Coupon | undefined;
}

export default CouponRepository;
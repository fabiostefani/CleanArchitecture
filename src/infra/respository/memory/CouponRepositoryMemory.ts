import CouponRepository from "../../../domain/repository/CouponRepository";
import Coupon from "../../../domain/entity/Coupon";

class CouponRepositoryMemory implements CouponRepository {
    coupons: Coupon[];
    constructor () {
        this.coupons = [
            new Coupon("VALE20",20, new Date("2021-10-10")),
            new Coupon("VALE20_EXPIRED",20, new Date("2020-10-10"))
        ];        
    }
    getByCode(code: string): Promise<Coupon | undefined> {
        return Promise.resolve(this.coupons.find(coupon => coupon.code == code));
    }
}

export default CouponRepositoryMemory;
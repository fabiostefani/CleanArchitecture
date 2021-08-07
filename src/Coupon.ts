export default class Coupon {
    code: string;
    percentage: number;
    expiredDate: Date;
    constructor(code: string, percentage: number, expiredDate: Date) {
        this.code = code;
        this.percentage = percentage;
        this.expiredDate = expiredDate;
    }

    isExpired() {
        const today = new Date();
        return (this.expiredDate.getTime() < today.getTime());
    }
}
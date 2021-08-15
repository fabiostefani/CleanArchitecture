export default class Cpf {
    value: string;
    constructor(value: string) {
        if (!this.validate(value)) throw new Error("Invalid CPF");
        this.value = value;
    }
    FACTOR_DIGIT_1 = 10;
    FACTOR_DIGIT_2 = 11;
    MAX_DIGITS_1 = 9;
    MAX_DIGITS_2 = 10;

    extractDigits(cpf)
    {
        return cpf.replace(/\D/g, "")  ;
    }

    isInvalidLenght(cpf)
    {
        return cpf.length !== 11
    }

    isBlocked(cpf)
    {
        const [digit1] = cpf;
        return cpf.split("").every(d => d === digit1);		
    }

    calculateDigit(cpf, factor, max)
    {	
        let total = 0;
        for (const digit of cpf.split("").slice(0, max))
        {
            total += parseInt(digit) * factor--;		
        }	
        const digit = (total % 11 < 2) ? 0 : (11 - total % 11);
        return digit;
    }

    extractCheckerDigit(cpf) {
        return cpf.slice(9);  
    }

    validate(str) {
        if (!str) return false;
        str = this.extractDigits(str);
        if (this.isInvalidLenght(str)) return false;  
        if (this.isBlocked(str)) return false;		
        const dg1 = this.calculateDigit(str, this.FACTOR_DIGIT_1, this.MAX_DIGITS_1);
        const dg2 = this.calculateDigit(str, this.FACTOR_DIGIT_2, this.MAX_DIGITS_2);
        let checkerDigit = this.extractCheckerDigit(str);  
        let calculatedDigit = `${dg1}${dg2}`;  
        return checkerDigit == calculatedDigit;	
    }
}
const FACTOR_DIGIT_1 = 10;
const FACTOR_DIGIT_2 = 11;
const MAX_DIGITS_1 = 9;
const MAX_DIGITS_2 = 10;

function extractDigits(cpf)
{
	return cpf.replace(/\D/g, "")  ;
}

function isInvalidLenght(cpf)
{
	return cpf.length !== 11
}

function isBlocked(cpf)
{
	const [digit1] = cpf;
	return cpf.split("").every(d => d === digit1);		
}

function calculateDigit(cpf, factor, max)
{	
	let total = 0;
	for (const digit of cpf.split("").slice(0, max))
	{
		total += parseInt(digit) * factor--;		
	}	
	const digit = (total % 11 < 2) ? 0 : (11 - total % 11);
	return digit;
}

function extractCheckerDigit(cpf) {
	return cpf.slice(9);  
}

function validate(str) {
	if (!str) return false;
	str = extractDigits(str);
	if (isInvalidLenght(str)) return false;  
	if (isBlocked(str)) return false;		
	const dg1 = calculateDigit(str, FACTOR_DIGIT_1, MAX_DIGITS_1);
	const dg2 = calculateDigit(str, FACTOR_DIGIT_2, MAX_DIGITS_2);
	let checkerDigit = extractCheckerDigit(str);  
	let calculatedDigit = `${dg1}${dg2}`;  
	return checkerDigit == calculatedDigit;	
}

module.exports = {
	validate
};
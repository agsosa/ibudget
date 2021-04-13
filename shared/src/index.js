exports.CategoryEnum = Object.freeze({
	FOOD_DRINKS: 0,
	SHOPPING: 1,
	HOUSING: 2,
	TRANSPORTATION: 3,
	VEHICLE: 4,
	LIFE_ENTERTAINMENT: 5,
	COMMUNICATION_PC: 6,
	FINANCIAL_EXPENSES: 7,
	INVESTMENTS: 8,
	INCOME: 9,
	OTHERS: 10,
});

exports.TransactionTypeEnum = Object.freeze({
	OUT: 0,
	IN: 1,
});

exports.LIMITS = {
	CONCEPT_MAX_CHARS: 25, // max TransactionModel's concept field length
	NOTES_MAX_CHARS: 100, // max TransactionModel's notes field length
	AMOUNT_MIN_NUMBER: 0.01,
	AMOUNT_MAX_NUMBER: 1000000000, // max TransactionModel's amount field number
	AMOUNT_MAX_DECIMALS: 2,
};
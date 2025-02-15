import bycrypt from 'bcryptjs';

export const hashPassword = async (password: string) => {
	const salt = await bycrypt.genSalt(10);
	const hashedPassword = await bycrypt.hash(password, salt);
	return hashedPassword;
};

export const comparePassword = async (
	enteredPassword: string,
	dbPassword: string
) => {
	const isMatched = await bycrypt.compare(enteredPassword, dbPassword);
	return isMatched;
};

export const randomChoice = <T,>(arr: T[]) => {
	const i = Math.floor(Math.random() * arr.length);
	return arr[i];
};

type SplitEquallyFunc = (amount: number, people: number) => number;
export const splitEqually: SplitEquallyFunc = (amount, people) => {
	return +(amount / people).toFixed(2);
};

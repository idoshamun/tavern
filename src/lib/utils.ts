export function groupBy<T, Key extends keyof T>(array: T[], key: Key): Record<string, T[]> {
	return array.reduce((acc, x) => {
		const val = x[key] as string;
		if (!acc[val]) {
			acc[val] = [];
		}
		acc[val].push(x);
		return acc;
	}, {} as Record<string, T[]>);
}

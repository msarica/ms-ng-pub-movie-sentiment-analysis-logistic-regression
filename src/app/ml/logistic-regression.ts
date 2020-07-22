import { ModelParams } from './model';

export class LogisticRegression {
	classes: number[];
	intercept: number[];
	values: number[][];

	// params object is the exported json from python notebook
	constructor(params: ModelParams) {
		this.classes = params.classes;
		this.intercept = params.intercept;
		this.values = params.values;
	}

	predict(vector: number[]): number {
		const probabilities = this.predict_proba(vector);
		const classes = this.classes;

		const sorted = classes
			.reduce((prev, class_, idx) => {
				prev.push({
					class_,
					probability: probabilities[idx],
				});
				return prev;
			}, [])
			.sort((a, b) => b.probability - a.probability);

		return sorted[0].class_;
	}

	predict_proba(vector: number[]) {
		// https://realpython.com/logistic-regression-python/
		// 𝑝(𝑥₁, 𝑥₂) = 1 / (1 + exp(−𝑓(𝑥₁, 𝑥₂)))
		const b = (idx: number) => 1 / (1 + Math.exp(-this.func(vector, idx)));

		// binary classification
		if (this.classes.length <= 2) {
			const result = b(0);
			return [1 - result, result];
		}

		// multi class
		const probabilities = this.classes.map((v, i) => {
			const val = b(i);
			return val;
		});

		// normalize
		const total = probabilities.reduce((p, c) => p + c, 0);
		return probabilities.map((v) => v / total);
	}

	// intercept + w1 * x1 + w2 * x2 + ...
	private func(vector: number[], forClass: number) {
		let sum = this.intercept[forClass];

		return vector.reduce((prev, vv, idx) => {
			const iv = vv * this.values[forClass][idx];
			return prev + iv;
		}, sum);
	}
}

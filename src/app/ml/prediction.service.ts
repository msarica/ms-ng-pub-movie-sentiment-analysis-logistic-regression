import { Injectable } from '@angular/core';
import { ModelParams } from './model';

import { LogisticRegression } from './logistic-regression';
import { Vectorizer } from './count-vectorizer';

// json file that we exported from python
import * as variables from './model_params.json';

@Injectable({
	providedIn: 'root',
})
export class PredictionService {
	model: ModelParams;
	vectorizer: Vectorizer;
	logReg: LogisticRegression;

	constructor() {
		this.model = (variables && variables['default']) || (variables as any);
		this.vectorizer = new Vectorizer(this.model);
		this.logReg = new LogisticRegression(this.model);
	}

	predict(sentence: string): boolean {
		const vector = this.vectorizer.transform(sentence);
		return this.logReg.predict(vector) === 1;
	}
}

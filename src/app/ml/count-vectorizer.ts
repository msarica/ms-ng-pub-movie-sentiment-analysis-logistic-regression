import { ModelParams } from './model';

/**
 * This is a class that imitates vectorizer class in
 * scikit-learn library.
 * It has only transform method that takes the sentence,
 * removes punctuation, tokenizes and returns a count vector.
 */
export class Vectorizer {
	private punctuationRegex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
	private words: string[];

	constructor(params: ModelParams) {
		this.words = params.words;
	}

	transform(sentence: string): number[] {
		sentence = sentence.replace(this.punctuationRegex, '');

		// tokenizes the sentence
		const words = sentence
			.split(' ')
			.map((i) => i.toLowerCase())
			.filter((i) => i.length);

		// creates a count vector eg: this movie is a good movie => [0, ..., 2, 1, 0 , 0, 0...]
		const vector = this.words.map(
			(word) => words.filter((ww) => ww === word).length
		);
		return vector;
	}
}

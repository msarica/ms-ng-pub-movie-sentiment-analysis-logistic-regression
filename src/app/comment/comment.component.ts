import {
	Component,
	OnInit,
	ViewChild,
	ElementRef,
	OnDestroy,
} from '@angular/core';
import { PredictionService } from './../ml/prediction.service';
import { Subject, fromEvent } from 'rxjs';
import { takeUntil, map, debounceTime, tap } from 'rxjs/operators';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
})
export class CommentComponent implements OnInit {
	@ViewChild('input', { static: true })
	input: ElementRef;

	comment: string;
	isPositive: boolean;

	destroy$ = new Subject();

	constructor(private predictionService: PredictionService) {}

	ngOnInit() {
		fromEvent(this.input.nativeElement, 'keyup')
			.pipe(
				debounceTime(500),
				map((val: any) => val.target.value),
				tap((val) => {
					// console.log(val);
					this.predictIfReviewIsPositive(val);
				}),
				takeUntil(this.destroy$)
			)
			.subscribe();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	predictIfReviewIsPositive(sentence: string) {
		const isPositive = this.predictionService.predict(sentence);
		this.comment = sentence;
		this.isPositive = isPositive;
		console.log(sentence, isPositive);
	}
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
	imports: [BrowserModule, FormsModule],
	declarations: [AppComponent, CommentComponent],
	bootstrap: [AppComponent],
})
export class AppModule {}

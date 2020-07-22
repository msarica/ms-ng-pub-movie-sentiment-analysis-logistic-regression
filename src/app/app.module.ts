import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MlModule } from './ml/ml.module';

import { AppComponent } from './app.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  imports: [ BrowserModule, FormsModule, MlModule
  ],
  declarations: [ AppComponent, CommentComponent, CommentComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { CardComponent } from './card/card.component';
import { ButtomComponent } from './buttom/buttom.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    CardComponent,
    ButtomComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

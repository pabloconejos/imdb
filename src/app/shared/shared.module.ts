import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarsRatingComponent } from './stars-rating/stars-rating.component';



@NgModule({
  declarations: [StarsRatingComponent],
  imports: [
    CommonModule
  ],
  exports: [StarsRatingComponent]
})
export class SharedModule { }

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrl: './stars-rating.component.scss'
})
export class StarsRatingComponent implements OnInit {

  @Input() maxstars: number = 5;
  @Input() rating: number = 0;

  @Output() score = new EventEmitter<number>();
  
  stars: number[] = [];
  isHover: boolean = false;
  valueHover: number = 0

  constructor() {

  }

  getValueHover(i: number) {
    this.isHover = true
    this.valueHover = i
  }

  mouseLeaveStar() {
    this.isHover = false
  }
  
  ngOnInit(): void {
    this.stars = Array(this.maxstars).fill(0)
  }

  onClick(index: number): void {
    const score = index
    this.score.emit(score);
  }
}
import { Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-favs',
  templateUrl: './favs.component.html',
  styleUrl: './favs.component.scss'
})
export class FavsComponent {
  name = signal('Pablo')

  constructor() {
    // Register a new effect.
    effect(() => {
      console.log(`The count is: ${this.name()}`);
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.name.set('Alberto');
    }, 2000);
  }
}

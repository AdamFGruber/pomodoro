import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { start, stop, swap } from '../mode.actions';

@Component({
  selector: 'app-my-counter',
  templateUrl: './my-counter.component.html',
  styleUrls: ['./my-counter.component.css']
})
export class ModeComponent {
  mode$: Observable<number>;

  constructor(private store: Store<{ count: number }>) {
    this.mode$ = store.pipe(select('count'));
  }

  start() {
    this.store.dispatch(start());
  }

  stop() {
    this.store.dispatch(stop());
  }

  swap() {
    this.store.dispatch(swap());
  }
}
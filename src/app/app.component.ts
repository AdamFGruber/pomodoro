import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { START, STOP, SWAP } from './mode.reducer';

interface AppState {
  mode: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string = 'pomodoro';
  mode$: Observable<number>
  worktime: number = 25
  breaktime: number = 5
  timeleft: number = 0
  interval
  timeString: string = ""
  alerts: string[] = []
  audio = new Audio("src/notify.mp3");

  constructor(private store: Store<AppState>) {
    this.mode$ = store.pipe(select('mode'));
    this.modeSubscribe()
    this.audio.load()
  }

  modeSubscribe() {
    this.mode$.subscribe({
      next: (value) => {
        this.timeleft = 0
        clearInterval(this.interval);

        if (value == 1) {
          this.startTimer(this.worktime)
        }
        else if (value == 2) {
          this.startTimer(this.breaktime)
        }
      }
    })
  }

  validateInput() {
    if (this.worktime > 0 && this.breaktime > 0) {
      return true
    }
    else {
      this.alerts.push("Invalid input, enter a number greater than 0.")
      return false
    }
  }

  start(worktime, breaktime) {
    this.worktime = worktime
    this.breaktime = breaktime

    if (this.validateInput()) {
      this.store.dispatch({ type: START })
    }
  }

  stop() {
    this.store.dispatch({ type: STOP })
  }

  startTimer(minutes: number) {
    this.timeleft = Math.floor(minutes * 60)
    this.setTimeString(this.timeleft)
    this.interval = setInterval(() => {
      if (this.timeleft > 1) {
        this.timeleft--;
        this.setTimeString(this.timeleft)
      }
      else {
        this.audio.play()
        this.store.dispatch({ type: SWAP })
      }
    }, 1000)
  }

  setTimeString(time) {
    let mins = Math.floor(time / 60)
    let secs = Math.floor(time % 60)
    this.timeString =
      mins + (mins == 1 ? " minute, " : " minutes, ") +
      secs + (secs == 1 ? " second" : " seconds")
  }
}

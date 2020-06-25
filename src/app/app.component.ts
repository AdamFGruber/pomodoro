import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { start, stop, swap } from './mode.actions';

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

  constructor(private store: Store<{ mode: number }>) {
    this.mode$ = store.pipe(select('mode'));
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
    this.audio.load()

    if (this.validateInput()) {
      this.store.dispatch(start());
      this.startTimer()
    }
  }

  stop() {
    clearInterval(this.interval);
    this.timeleft = 0
    this.store.dispatch(stop());
  }

  startTimer() {
    var minutes = this.worktime
    this.timeleft = Math.floor(minutes * 60)
    this.setTimeString(this.timeleft)
    this.interval = setInterval(() => {
      if (this.timeleft > 1) {
        this.timeleft--;
        this.setTimeString(this.timeleft)
      } else {
        clearInterval(this.interval);
        // this.playAudio();
        this.audio.play()
        this.store.dispatch(swap());
        this.startTimer()
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

  playAudio() {
    let audio = new Audio();
    audio.src = "src/notify.mp3";
    audio.load();
    audio.play();
  }
}

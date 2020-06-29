import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as ModeActions from './mode.actions';
import * as TimesActions from './times.actions';

interface AppState {
  mode: number,
  times: [number, number]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string = 'pomodoro'
  mode$: Observable<number>
  times$: Observable<[number, number]>
  worktime: number = 25
  breaktime: number = 5
  timeleft: number = 0
  interval
  timeString: string = ""
  alerts: string[] = []
  audio = new Audio("src/notify.mp3")

  constructor(private store: Store<AppState>) {
    this.mode$ = store.pipe(select('mode'))
    this.times$ = store.pipe(select('times'))
    this.modeSubscribe()
    this.timesSubscribe()
    this.audio.load()
  }

  modeSubscribe() {
    console.log("subscribing mode")
    this.mode$.subscribe({
      next: (value) => {
        console.log("mode value: " + value)
        this.timeleft = 0
        clearInterval(this.interval)

        if (value == 1) {
          this.startTimer(this.worktime)
        }
        else if (value == 2) {
          this.startTimer(this.breaktime)
        }
      }
    })
  }

  timesSubscribe() {
    console.log("subscribing times")
    this.times$.subscribe({
      next: (value) => {
        console.log("times value: " + value)
        this.worktime = value[0]
        this.breaktime = value[1]
      }
    })
  }

  validateInput(worktime: number, breaktime: number) {
    if (worktime > 0 && breaktime > 0) {
      return true
    }
    else {
      this.alerts.push("Invalid input, enter a number greater than 0.")
      return false
    }
  }

  start(worktime: number, breaktime: number) {

    if (this.validateInput(worktime, breaktime)) {
      // this.worktime = worktime
      // this.breaktime = breaktime



      this.store.dispatch(new TimesActions.Set([worktime, breaktime]))

      console.log(this.worktime)
      console.log(this.breaktime)

      this.store.dispatch(new ModeActions.Start())
    }
  }

  stop() {
    this.store.dispatch(new ModeActions.Stop())
  }

  startTimer(minutes: number) {
    this.timeleft = Math.floor(minutes * 60)
    this.setTimeString(this.timeleft)
    this.interval = setInterval(() => {
      if (this.timeleft > 1) {
        this.timeleft--
        this.setTimeString(this.timeleft)
      }
      else {
        this.audio.play()
        this.store.dispatch(new ModeActions.Swap())
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

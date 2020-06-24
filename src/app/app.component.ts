import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title: string = 'pomodoro';
  active: boolean = false
  worktime: number = 25
  breaktime: number = 5
  work: boolean = true
  timeleft: number = 0
  interval
  timeString: string = ""

  validateInput() {
    if (this.worktime > 0 && this.breaktime > 0) {
      return true
    }
    else {
      console.log("invalid input")
      return false
    }
  }

  start(worktime, breaktime) {
    this.worktime = worktime
    this.breaktime = breaktime

    if (this.validateInput()) {
      this.active = true
      this.work ? this.startTimer(this.worktime) : this.startTimer(this.breaktime)
    }
  }

  stop() {
    clearInterval(this.interval);
    this.timeleft = 0
    this.work = true
    this.active = false
  }

  startTimer(minutes) {
    this.timeleft = Math.floor(minutes * 60)
    this.setTimeString(this.timeleft)
    this.interval = setInterval(() => {
      if (this.timeleft > 1) {
        this.timeleft--;
        this.setTimeString(this.timeleft)
      } else {
        clearInterval(this.interval);
        this.work = !this.work
        this.work ? this.startTimer(this.worktime) : this.startTimer(this.breaktime)
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

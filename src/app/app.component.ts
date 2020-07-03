import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import * as ModeActions from './mode.actions';
import * as TimesActions from './times.actions';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const CountryQuery = gql`
  query Languages{
    country(code: "CH") {
      name
      languages{
        code
        name
      }
    }
  }
`;

interface AppState {
  mode: number,
  times: [number, number]
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {
  title: string = 'pomodoro'
  mode$: Observable<number>
  times$: Observable<[number, number]>
  worktime: number = 25
  breaktime: number = 5
  timeleft: number = 0
  interval
  timeString: string = ""
  alerts: string[] = []
  audio = new Audio("/assets/notify.mp3")
  countryName: any
  languages: String[] = []
  private querySubscription: Subscription
  data: Observable<any>;

  constructor(private store: Store<AppState>, private apollo: Apollo) {
    this.mode$ = store.pipe(select('mode'))
    this.times$ = store.pipe(select('times'))
    this.modeSubscribe()
    this.timesSubscribe()
    this.audio.load()
  }

  // ngOnInit() {
  //   this.querySubscription = this.apollo.watchQuery<any>({
  //     query: CountryQuery
  //   })
  //     .valueChanges
  //     .subscribe(({ data }) => {
  //       this.countryName = data.country.name;
  //       for (let i = 0; i < data.country.languages.length; i++) {
  //         this.languages.push(data.country.languages[i].name)
  //       }
  //     });
  // }

  ngOnInit() {
    this.data = this.apollo
      .watchQuery({ query: CountryQuery })
      //@ts-ignore
      .valueChanges.pipe(map(({ data }) => data.languages));
  }

  ngOnDestroy() {
    this.querySubscription.unsubscribe();
  }

  modeSubscribe() {
    this.mode$.subscribe({
      next: (value) => {
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
    this.times$.subscribe({
      next: (value) => {
        this.worktime = value[0]
        this.breaktime = value[1]
      }
    })
  }

  validateInput(worktime: number, breaktime: number) {
    if (worktime >= 0.1 && breaktime >= 0.1) {
      return true
    }
    else {
      this.alerts.push("Invalid input, enter a number greater than 0.")
      return false
    }
  }

  start(worktime: number, breaktime: number) {

    if (this.validateInput(worktime, breaktime)) {
      this.store.dispatch(new TimesActions.Set([worktime, breaktime]))
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

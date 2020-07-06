import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  getTitle() {
    return browser.getTitle()
  }

  getStartButton() {
    return element(by.id('startButton'))
  }

  getFormDiv() {
    return element(by.id('formDiv'))
  }

  getTimerDiv() {
    return element(by.id('timerDiv'))
  }

  getWorkInput() {
    return element(by.id('workInput'))
  }

  getBreakInput() {
    return element(by.id('breakInput'))
  }
}

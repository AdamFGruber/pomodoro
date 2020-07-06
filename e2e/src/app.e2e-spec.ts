import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to pomodoro!');
  });

  it('should have a title', function () {
    page.navigateTo();
    expect(page.getTitle()).toEqual('Pomodoro');
  });

  it('start button should have text', function () {
    page.navigateTo();
    expect(page.getStartButton().getText()).toEqual('START POMODORO!');
  });

  it('form is visible', function () {
    page.navigateTo();
    expect(page.getFormDiv().isDisplayed()).toBe(true);
  });

  // Fix Async error. Times out
  // it('timer is visible once started', function () {
  //   page.navigateTo();

  //   page.getWorkInput().sendKeys(2);
  //   page.getBreakInput().sendKeys(5);
  //   page.getStartButton().click();

  //   expect(page.getTimerDiv().isDisplayed()).toBe(true);
  // });
});
import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('site root should display "Tour of Heroes"', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Tour of Heroes');
  });


  it('dashboard url should put "Dashboard" into document title', () => {
    page.navigateTo('/dashboard')
      .then(_=>{
        expect(page.getDocumentTitle()).toContain('Dashboard');
      })
      .then(_=>{
        expect(page.getDocumentTitle()).toContain('Tour of Heroes');
      });

  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});

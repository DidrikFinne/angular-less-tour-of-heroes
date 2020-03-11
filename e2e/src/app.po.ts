import { browser, by, element } from 'protractor';
import { join } from 'path';

export class AppPage {
  navigateTo(path?): Promise<unknown> {
    const url = path
      ? join(path)
      : browser.baseUrl;
    return browser.get(url) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root h1:first-of-type')).getText() as Promise<string>;
  }

  getDocumentTitle(): Promise<string> {
    return browser.getTitle() as Promise<string>;
  }
}

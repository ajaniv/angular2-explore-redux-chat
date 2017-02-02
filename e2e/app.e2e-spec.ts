import { ReduxChatPage } from './app.po';

describe('redux-chat App', function() {
  let page: ReduxChatPage;

  beforeEach(() => {
    page = new ReduxChatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

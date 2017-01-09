import { CopenhagenAirportsPage } from './app.po';

describe('copenhagen-airports App', function() {
  let page: CopenhagenAirportsPage;

  beforeEach(() => {
    page = new CopenhagenAirportsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

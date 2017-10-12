import { Component } from '@angular/core';
import { RestaurantsPage } from '../Restaurants/Restaurants';
import { SeekerSettingsPage } from '../SeekerSettings/SeekerSettings';
//import { MapPage } from '../Map/map';
import { JavascriptMap } from '../MapJavascript/MapJavascript';
@Component({
  templateUrl: 'SeekerTabs.html'
})
export class SeekerTabsPage {

  tab1Root = RestaurantsPage;
  tab2Root = JavascriptMap;
  tab3Root = SeekerSettingsPage;
  //tab4Root = MapPage;

  constructor() {

  }
}

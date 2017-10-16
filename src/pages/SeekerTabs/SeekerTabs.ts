import { Component } from '@angular/core';
import { RestaurantsPage } from '../Restaurants/Restaurants';
import { SeekerSettingsPage } from '../SeekerSettings/SeekerSettings';
@Component({
  templateUrl: 'SeekerTabs.html'
})
export class SeekerTabsPage {

  tab1Root = RestaurantsPage;
  tab2Root = SeekerSettingsPage;

  constructor() {

  }
}

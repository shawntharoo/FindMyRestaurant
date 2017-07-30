import { Component } from '@angular/core';
import { RestaurantsPage } from '../Restaurants/Restaurants';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RestaurantsPage;

  constructor() {

  }
}

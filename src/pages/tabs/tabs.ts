import { Component } from '@angular/core';
import { RestaurantsPage } from '../Restaurants/Restaurants';
import { SeekerProfilePage } from '../SeekerProfile/SeekerProfile';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = RestaurantsPage;
  tab3Root = SeekerProfilePage;

  constructor() {

  }
}

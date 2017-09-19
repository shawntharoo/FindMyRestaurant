import { Component } from '@angular/core';
import { OwnerHotelsDisplayPage } from '../OwnerHotelsDisplay/OwnerHotelsDisplay';

@Component({
  templateUrl: 'OwnerTabs.html'
})
export class OwnerTabsPage {

  tab1Root = OwnerHotelsDisplayPage;

  constructor() {
  }
}

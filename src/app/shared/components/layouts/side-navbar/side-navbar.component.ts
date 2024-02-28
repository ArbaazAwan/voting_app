import { Component, OnInit } from '@angular/core';
import { RouteInfo } from '../../../models/model';

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/voter-list', title: 'Voter List',  icon: 'people', class: '' },
    { path: '/p-list', title: 'Province List',  icon: 'home', class: '' },
    { path: '/na-list', title: 'NA List',  icon: 'location_city', class: '' },
    { path: '/pa-list', title: 'PA List',  icon: 'home', class: '' },
    { path: '/uc-list', title: 'UC List',  icon: 'home', class: '' },
];

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss'
})
export class SideNavbarComponent implements OnInit {
  menuItems!: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
}

import { NgModule } from '@angular/core';
import { SideNavbarComponent } from './layouts/side-navbar/side-navbar.component';
import { TopNavbarComponent } from './layouts/top-navbar/top-navbar.component';
import { RouterModule } from '@angular/router';
import { CardComponent } from './layouts/card/card.component';

const components = [
  SideNavbarComponent,
  TopNavbarComponent,
  CardComponent,
];
@NgModule({
  imports: [
    RouterModule
  ],
  exports: components,
  declarations: components,
  providers: [],
})
export class ComponentsModule { }


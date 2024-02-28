import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  @Input() description:string = '';
  @Input() title:string = '';
  @Input() columnClass:string ='';

}

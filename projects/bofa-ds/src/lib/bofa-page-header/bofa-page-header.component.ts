/* <bofa-page-header> — the blue banner every product screen starts with. */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bofa-page-header',
  templateUrl: './bofa-page-header.component.html',
  styleUrls: ['./bofa-page-header.component.scss'],
})
export class BofaPageHeaderComponent {
  @Input() title = '';
  @Input() lineOfBusiness = '';
}

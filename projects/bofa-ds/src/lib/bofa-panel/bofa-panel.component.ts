/* <bofa-panel> — the brand content card used on every product dashboard. */
import { Component, Input } from '@angular/core';

@Component({
  selector: 'bofa-panel',
  templateUrl: './bofa-panel.component.html',
  styleUrls: ['./bofa-panel.component.scss'],
})
export class BofaPanelComponent {
  @Input() heading = '';
  @Input() subheading = '';
}

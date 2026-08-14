/* <bofa-button> — the brand button. Wraps Angular Material so product teams
 * never talk to Material directly. */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bofa-button',
  templateUrl: './bofa-button.component.html',
  styleUrls: ['./bofa-button.component.scss'],
})
export class BofaButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled = false;
  @Output() pressed = new EventEmitter<void>();

  get color(): 'primary' | 'accent' | 'warn' {
    if (this.variant === 'secondary') {
      return 'accent';
    }
    if (this.variant === 'danger') {
      return 'warn';
    }
    return 'primary';
  }
}

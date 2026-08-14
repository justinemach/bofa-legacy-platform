/* <bofa-field> — the brand text input. */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bofa-field',
  templateUrl: './bofa-field.component.html',
  styleUrls: ['./bofa-field.component.scss'],
})
export class BofaFieldComponent {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() value = '';
  @Input() hint = '';
  @Output() valueChange = new EventEmitter<string>();

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.valueChange.emit(this.value);
  }
}

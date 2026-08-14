/* <bofa-tag-list> — brand chips, used for product filters and account badges. */
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bofa-tag-list',
  templateUrl: './bofa-tag-list.component.html',
  styleUrls: ['./bofa-tag-list.component.scss'],
})
export class BofaTagListComponent {
  @Input() tags: string[] = [];
  @Input() selected: string | null = null;
  @Output() tagSelected = new EventEmitter<string>();

  select(tag: string): void {
    this.selected = tag;
    this.tagSelected.emit(tag);
  }
}

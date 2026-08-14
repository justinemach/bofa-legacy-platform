/*
 * The design-system module. Product apps get every branded component with a
 * single `imports: [BofaDsModule]`.
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { BofaButtonComponent } from './bofa-button/bofa-button.component';
import { BofaFieldComponent } from './bofa-field/bofa-field.component';
import { BofaPanelComponent } from './bofa-panel/bofa-panel.component';
import { BofaTagListComponent } from './bofa-tag-list/bofa-tag-list.component';
import { BofaPageHeaderComponent } from './bofa-page-header/bofa-page-header.component';

const COMPONENTS = [
  BofaButtonComponent,
  BofaFieldComponent,
  BofaPanelComponent,
  BofaTagListComponent,
  BofaPageHeaderComponent,
];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
  ],
  exports: COMPONENTS,
})
export class BofaDsModule {}

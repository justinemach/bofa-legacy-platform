import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { BofaDsModule } from 'bofa-ds';
import { BofaCoreModule } from 'bofa-core';
import { BofaComplianceModule } from 'bofa-compliance';

import { AppComponent } from './app.component';
import { ApplicationWizardComponent } from './wizard/application-wizard.component';

@NgModule({
  declarations: [AppComponent, ApplicationWizardComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    BofaDsModule,
    BofaCoreModule.forRoot({ lineOfBusiness: 'HOME_LOANS', apiBaseUrl: '/api/mortgage' }),
    BofaComplianceModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

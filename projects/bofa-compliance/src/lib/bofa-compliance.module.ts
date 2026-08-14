import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AuditLogService } from './audit-log.service';
import { FeatureFlagService } from './feature-flag.service';
import { DisclosureDialogComponent } from './disclosure-dialog/disclosure-dialog.component';

@NgModule({
  declarations: [DisclosureDialogComponent],
  imports: [CommonModule, MatButtonModule, MatDialogModule],
  exports: [DisclosureDialogComponent],
})
export class BofaComplianceModule {
  static forRoot(): ModuleWithProviders<BofaComplianceModule> {
    return {
      ngModule: BofaComplianceModule,
      providers: [AuditLogService, FeatureFlagService],
    };
  }
}

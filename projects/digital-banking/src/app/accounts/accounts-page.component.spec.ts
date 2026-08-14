import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BofaDsModule } from 'bofa-ds';
import { BofaCoreModule } from 'bofa-core';
import { BofaComplianceModule } from 'bofa-compliance';

import { AccountsPageComponent } from './accounts-page.component';

describe('AccountsPageComponent', () => {
  let fixture: ComponentFixture<AccountsPageComponent>;
  let component: AccountsPageComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountsPageComponent],
      imports: [
        NoopAnimationsModule,
        BofaDsModule,
        BofaCoreModule.forRoot(),
        BofaComplianceModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountsPageComponent);
    component = fixture.componentInstance;
  });

  it('loads accounts on init', async () => {
    await component.ngOnInit();
    fixture.detectChanges();
    expect(component.loading).toBe(false);
    expect(component.accounts.length).toBeGreaterThan(0);
  });

  it('filters accounts by search term', async () => {
    await component.ngOnInit();
    component.searchTerm = 'savings';
    component.onSearch();
    expect(component.accounts.length).toBe(1);
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BofaDsModule } from 'bofa-ds';
import { BofaCoreModule } from 'bofa-core';

import { HoldingsTableComponent } from './holdings-table.component';

describe('HoldingsTableComponent', () => {
  let fixture: ComponentFixture<HoldingsTableComponent>;
  let component: HoldingsTableComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HoldingsTableComponent],
      imports: [
        NoopAnimationsModule,
        MatTableModule,
        MatSortModule,
        MatProgressBarModule,
        BofaDsModule,
        BofaCoreModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HoldingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('loads holdings into the data source', (done) => {
    setTimeout(() => {
      expect(component.dataSource.data.length).toBe(6);
      expect(component.loading).toBe(false);
      done();
    }, 10);
  });

  it('totals the market value', (done) => {
    setTimeout(() => {
      expect(component.totalMarketValue).toBeGreaterThan(600000);
      done();
    }, 10);
  });
});

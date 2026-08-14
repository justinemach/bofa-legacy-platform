import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BofaDsModule } from 'bofa-ds';
import { BofaCoreModule } from 'bofa-core';
import { BofaComplianceModule } from 'bofa-compliance';

import { CardCatalogComponent } from './card-catalog.component';

describe('CardCatalogComponent', () => {
  let fixture: ComponentFixture<CardCatalogComponent>;
  let component: CardCatalogComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardCatalogComponent],
      imports: [
        NoopAnimationsModule,
        BofaDsModule,
        BofaCoreModule.forRoot(),
        BofaComplianceModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CardCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('shows the whole catalogue by default', () => {
    expect(component.visibleCards.length).toBe(6);
  });

  it('filters by segment', () => {
    component.onFilter('Travel');
    expect(component.visibleCards.length).toBe(2);
  });

  it('adds and removes cards from the compare tray', () => {
    const card = component.catalogue[0];
    component.toggleCompare(card);
    expect(component.compare.length).toBe(1);
    component.toggleCompare(card);
    expect(component.compare.length).toBe(0);
  });
});

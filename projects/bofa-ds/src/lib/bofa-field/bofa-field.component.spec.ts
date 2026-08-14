import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BofaDsModule } from '../bofa-ds.module';
import { BofaFieldComponent } from './bofa-field.component';

describe('BofaFieldComponent', () => {
  let fixture: ComponentFixture<BofaFieldComponent>;
  let component: BofaFieldComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BofaDsModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BofaFieldComponent);
    component = fixture.componentInstance;
    component.label = 'Account';
    fixture.detectChanges();
  });

  it('renders the label', () => {
    expect(fixture.nativeElement.textContent).toContain('Account');
  });

  it('emits typed values', () => {
    const emitted: string[] = [];
    component.valueChange.subscribe((v) => emitted.push(v));
    const input: HTMLInputElement = fixture.nativeElement.querySelector('input');
    input.value = 'checking';
    input.dispatchEvent(new Event('input'));
    expect(emitted).toEqual(['checking']);
  });
});

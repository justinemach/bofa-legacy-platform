import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BofaDsModule } from '../bofa-ds.module';
import { BofaButtonComponent } from './bofa-button.component';

describe('BofaButtonComponent', () => {
  let fixture: ComponentFixture<BofaButtonComponent>;
  let component: BofaButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BofaDsModule, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(BofaButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders a material button', () => {
    const button: HTMLButtonElement | null =
      fixture.nativeElement.querySelector('button.bofa-button');
    expect(button).not.toBeNull();
  });

  it('maps the variant onto a material colour', () => {
    component.variant = 'danger';
    expect(component.color).toBe('warn');
  });

  it('emits when pressed', () => {
    let pressed = false;
    component.pressed.subscribe(() => (pressed = true));
    fixture.nativeElement.querySelector('button').click();
    expect(pressed).toBe(true);
  });
});

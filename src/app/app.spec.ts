import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('renders the encyclopedia title and the initial campaign event', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement;
    expect(element.querySelector('h1')?.textContent).toContain('La guerra');
    expect(element.querySelector('.event-year')?.textContent).toBe('1932');
    expect(element.querySelector('.event-content h3')?.textContent).toContain(
      'La guerra comienza en los fortines',
    );
  });

  it('updates the event and the selected year when the timeline changes', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const yearButton = fixture.nativeElement.querySelectorAll(
      '.year-button',
    )[1] as HTMLButtonElement;
    yearButton.click();
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('.event-year')?.textContent,
    ).toBe('1933');
    expect(
      fixture.nativeElement.querySelector('.event-content h3')?.textContent,
    ).toContain('Campo Vía');
    expect(yearButton.getAttribute('aria-pressed')).toBe('true');
  });
});

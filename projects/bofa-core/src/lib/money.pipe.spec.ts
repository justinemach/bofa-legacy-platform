import { MoneyPipe } from './money.pipe';

describe('MoneyPipe', () => {
  const pipe = new MoneyPipe();

  it('formats positive amounts', () => {
    expect(pipe.transform(4210.5)).toBe('$4,210.50');
  });

  it('formats negative amounts', () => {
    expect(pipe.transform(-732.18)).toBe('-$732.18');
  });

  it('handles missing amounts', () => {
    expect(pipe.transform(null)).toBe('--');
  });
});

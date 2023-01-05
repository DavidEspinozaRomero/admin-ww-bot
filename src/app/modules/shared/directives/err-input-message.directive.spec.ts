import { ErrInputMessageDirective } from './err-input-message.directive';

describe('ErrInputMessageDirective', () => {
  const el: any = document.createElement('div');
  it('should create an instance', () => {
    const directive = new ErrInputMessageDirective(el);
    expect(directive).toBeTruthy();
  });
});

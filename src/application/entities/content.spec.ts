import { Content } from './content';

describe('Notification content', () => {
  it('should be able create a notification content', () => {
    const content = new Content('any content here');

    expect(content).toBeTruthy();
  });

  it('should not be able create a notification content with less than 5 characters', () => {
    expect(() => new Content('any')).toThrow();
  });

  it('should not be able create a notification content with more than 240 characters', () => {
    expect(() => new Content('*'.repeat(241))).toThrow();
  });
});

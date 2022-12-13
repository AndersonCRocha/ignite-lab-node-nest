import { randomUUID } from 'node:crypto';
import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able create a notification', () => {
    const notification = new Notification({
      content: new Content('any valid content'),
      category: 'any category',
      recipientId: randomUUID(),
    });

    expect(notification).toBeTruthy();
  });
});

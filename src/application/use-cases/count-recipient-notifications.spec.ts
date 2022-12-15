import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count recipient notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sut = new CountRecipientNotifications(notificationRepository);

    const recipientId = 'any recipient id';

    await notificationRepository.create(makeNotification({ recipientId }));
    await notificationRepository.create(makeNotification({ recipientId }));
    await notificationRepository.create(
      makeNotification({ recipientId: 'other recipient id' }),
    );

    const { count } = await sut.execute({
      recipientId,
    });

    expect(count).toEqual(2);
  });
});

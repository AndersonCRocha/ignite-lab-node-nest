import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sut = new GetRecipientNotifications(notificationRepository);

    const recipientId = 'any recipient id';

    await notificationRepository.create(makeNotification({ recipientId }));
    await notificationRepository.create(makeNotification({ recipientId }));
    await notificationRepository.create(
      makeNotification({ recipientId: 'other recipient id' }),
    );

    const { notifications } = await sut.execute({
      recipientId,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId,
        }),
        expect.objectContaining({ recipientId }),
      ]),
    );
  });
});

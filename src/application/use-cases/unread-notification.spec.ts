import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sut = new UnreadNotification(notificationRepository);

    const notification = makeNotification({ readAt: new Date() });

    await notificationRepository.create(notification);

    await sut.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to unread a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sut = new UnreadNotification(notificationRepository);

    expect(() => {
      return sut.execute({
        notificationId: 'any notification id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});

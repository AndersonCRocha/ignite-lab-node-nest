import { Content } from '@application/entities/content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/notification';

type Override = Partial<NotificationProps>;

export function makeNotification(notification?: Override) {
  return new Notification({
    category: 'any category',
    content: new Content('any content'),
    recipientId: 'any recipient id',
    ...notification,
  });
}

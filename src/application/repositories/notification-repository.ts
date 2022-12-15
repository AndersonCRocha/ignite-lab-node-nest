import { Notification } from '../entities/notification';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract save(notification: Notification): Promise<void>;
  abstract findById(id: string): Promise<Notification | null>;
  abstract countByRecipientId(recipientId: string): Promise<number>;
  abstract getByRecipientId(recipientId: string): Promise<Notification[]>;
}

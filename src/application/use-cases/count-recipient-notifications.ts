import { Injectable } from '@nestjs/common/decorators';
import { NotificationRepository } from '../repositories/notification-repository';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

interface CountRecipientNotificationsResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({
    recipientId,
  }: CountRecipientNotificationsRequest): Promise<CountRecipientNotificationsResponse> {
    const notificationsCount =
      await this.notificationRepository.countByRecipientId(recipientId);

    return {
      count: notificationsCount,
    };
  }
}

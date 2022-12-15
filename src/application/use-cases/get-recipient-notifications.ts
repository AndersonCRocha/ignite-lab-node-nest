import { Notification } from '@application/entities/notification';
import { Injectable } from '@nestjs/common/decorators';
import { NotificationRepository } from '../repositories/notification-repository';

interface GetRecipientNotificationsRequest {
  recipientId: string;
}

interface GetRecipientNotificationsResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(
    private readonly notificationRepository: NotificationRepository,
  ) {}

  async execute({
    recipientId,
  }: GetRecipientNotificationsRequest): Promise<GetRecipientNotificationsResponse> {
    const notifications = await this.notificationRepository.getByRecipientId(
      recipientId,
    );

    return {
      notifications,
    };
  }
}

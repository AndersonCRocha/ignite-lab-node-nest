import { CancelNotification } from '@application/use-cases/cancel-notification';
import { CountRecipientNotifications } from '@application/use-cases/count-recipient-notifications';
import { GetRecipientNotifications } from '@application/use-cases/get-recipient-notifications';
import { ReadNotification } from '@application/use-cases/read-notification';
import { SendNotification } from '@application/use-cases/send-notification';
import { UnreadNotification } from '@application/use-cases/unread-notification';
import { CreateNotificationBody } from '@infra/http/dtos/create-notification-body';
import { Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationController {
  constructor(
    private readonly sendNotification: SendNotification,
    private readonly readNotification: ReadNotification,
    private readonly unreadNotification: UnreadNotification,
    private readonly cancelNotification: CancelNotification,
    private readonly getRecipientNotifications: GetRecipientNotifications,
    private readonly countRecipientNotifications: CountRecipientNotifications,
  ) {}

  @Post()
  async send(@Body() request: CreateNotificationBody) {
    const { content, category, recipientId } = request;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return { notification: NotificationViewModel.toHttp(notification) };
  }

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Get('by-recipient/:recipientId/count')
  async countByRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return { count };
  }

  @Get('by-recipient/:recipientId')
  async getByRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return { notifications: notifications.map(NotificationViewModel.toHttp) };
  }
}

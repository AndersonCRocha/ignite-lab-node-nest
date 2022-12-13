import { Controller, Post } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { SendNotification } from 'src/application/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly sendNotification: SendNotification) {}

  @Post('send')
  async send(@Body() request: CreateNotificationBody) {
    const { content, category, recipientId } = request;

    const { notification } = await this.sendNotification.execute({
      content,
      category,
      recipientId,
    });

    return { notification };
  }
}

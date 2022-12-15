import { Replace } from '@helpers/replace';
import { randomUUID } from 'node:crypto';
import { Content } from './content';

export interface NotificationProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  canceledAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private props: NotificationProps;

  constructor(
    props: Replace<NotificationProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  get id() {
    return this._id;
  }

  set recipientId(recipientId: string) {
    this.props.recipientId = recipientId;
  }

  get recipientId() {
    return this.props.recipientId;
  }

  set content(content: string) {
    this.props.content = new Content(content);
  }

  get content() {
    return this.props.content.value;
  }

  set category(category: string) {
    this.props.category = category;
  }

  get category() {
    return this.props.category;
  }

  get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  cancel() {
    this.props.canceledAt = new Date();
  }

  read() {
    this.props.readAt = new Date();
  }

  unread() {
    this.props.readAt = null;
  }
}

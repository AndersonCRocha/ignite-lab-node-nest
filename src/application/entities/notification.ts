import { randomUUID } from 'node:crypto';
import { Replace } from 'src/helpers/replace';
import { Content } from './content';

export interface NotificatioProps {
  recipientId: string;
  content: Content;
  category: string;
  readAt?: Date | null;
  createdAt: Date;
}

export class Notification {
  private _id: string;
  private props: NotificatioProps;

  constructor(props: Replace<NotificatioProps, { createdAt?: Date }>) {
    this._id = randomUUID();
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

  set readAt(readAt: Date | null | undefined) {
    this.props.readAt = readAt;
  }

  get readAt(): Date | null | undefined {
    return this.props.readAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }
}

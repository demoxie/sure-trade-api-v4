class NotificationData {
  message?: string;
}

class DeviceNotificationProperties {
  title?: string;
  body?: string;
  badge?: number;
  sound?: string;
}

export class PushyMessage {
  to: string;
  data?: NotificationData;
  notification?: DeviceNotificationProperties;
}

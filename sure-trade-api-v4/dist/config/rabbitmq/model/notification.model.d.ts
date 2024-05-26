declare class NotificationData {
    message?: string;
}
declare class DeviceNotificationProperties {
    title?: string;
    body?: string;
    badge?: number;
    sound?: string;
}
export declare class PushyMessage {
    to: string;
    data?: NotificationData;
    notification?: DeviceNotificationProperties;
}
export {};

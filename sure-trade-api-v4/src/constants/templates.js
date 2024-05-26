export const GIFT_CARD_TRADE_EMAIL_TEMPLATE = {
  to: "",
  subject: "",
  body: {
    name: "",
    transactionReference: "",
    cardType: "",
    cardIssuer: "",
    quantity: "",
    pricePerUnit: "",
    total: "",
    cardCurrency: "",
    paymentCurrency: "",
    link: "",
  },
  template: "gift-card-transaction",
};

export const EMAIL_TEMPLATE = {
  to: "",
  subject: "",
  body: {
    name: "",
  },
  template: "gift-card-transaction",
};

export let PUSHY_NOTIFICATION_TEMPLATE = {
  to: "",
  data: {
    message: "",
  },
  notification: {
    title: "Test Notification",
    body: "Hello World \u270c",
    badge: 1,
    sound: "ping.aiff",
  },
};

export const NOTIFICATION_TEMPLATE = {
  notification: {
    title: "",
    body: "",
    sound: "default",
    color: "#c705be",
    priority: "HIGH",
  },
  data: {
    title: "",
    body: "",
    type: "",
    transactionId: "",
  },
  android: {
    notification: {
      title: "",
      body: "",
      sound: "default",
      color: "#c705be",
      priority: "HIGH",
    },
  },
  apns: {
    headers: {
      apnsPriority: "10",
    },
  },
  token: "",
};

// export let NOTIFICATION_TEMPLATE= {
//     name: "",
//     appId: "",
//     includeSubscriptionIds: [],
//     includePlayerIds: [],
//     includeSegments: [],
//     contents: {
//         en: "",
//         es: ""
//     },
// };

export const SMS_TEMPLATE = {
  to: "",
  message: ``,
};

export const TELEGRAM_TEMPLATE = {
  chatId: "",
  message: ``,
};

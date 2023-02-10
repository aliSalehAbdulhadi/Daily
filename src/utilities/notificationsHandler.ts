const checkNotificationPromise = () => {
  // check if the browser support the promise version
  try {
    Notification.requestPermission().then();
  } catch (e) {
    return false;
  }

  return true;
};

export function askNotificationPermission() {
  // function to actually ask the permissions

  // check if the browser supports notifications
  if (!('Notification' in window)) {
  } else if (checkNotificationPromise()) {
    // new browsers
    Notification.requestPermission().then((permission) => {});
  } else {
    // old browsers and safari
    Notification.requestPermission((permission) => {});
  }
}

export const notificationObject = (
  title: string,
  body: string,
  tag: string,
) => {
  return new Notification(title, {
    body: body,
    icon: '/icons/android-36x36.png',
    tag: tag,
  });
};

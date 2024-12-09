type Subscriber = () => any;

export const createDebouncer = (WAIT_TIME_IN_MILLISECONDS = 500) => {
  let lastResult: any;
  let subscriptions: Subscriber[] = [];

  const debounce = (fn: Subscriber) => {
    subscriptions.push(fn);

    return new Promise((resolve) => {
      setTimeout(() => {
        if (subscriptions.length > 0) {
          const fn = subscriptions.pop();
          if (fn) {
            subscriptions = [];
            lastResult = fn();
          }
        }
        resolve(lastResult);
      }, WAIT_TIME_IN_MILLISECONDS);
    });
  };

  return debounce;
};

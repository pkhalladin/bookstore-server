import { createDebouncer } from "./debouncer";

const stub1 = jest.fn(() => 1);
const stub2 = jest.fn(() => 2);
const stub3 = jest.fn(() => 3);

it("should subscribe a series of functions and return the results of the latest subscribed function to all subscribed functions", async () => {
  const debounce = createDebouncer();

  debounce(stub1).then((result) => expect(result).toBe(2));

  new Promise((resolve) =>
    setTimeout(() => {
      debounce(stub2).then((result) => expect(result).toBe(3));
      resolve(null);
    }, 100)
  );

  new Promise((resolve) =>
    setTimeout(() => {
      debounce(stub3).then((result) => expect(result).toBe(3));
      resolve(null);
    }, 501)
  );

  await new Promise((resolve) => setTimeout(resolve, 1100));

  expect(stub1).toHaveBeenCalledTimes(0);
  expect(stub2).toHaveBeenCalledTimes(1);
  expect(stub3).toHaveBeenCalledTimes(1);
});

const stub4 = jest.fn(() => {
  return new Promise((resolve) => setTimeout(() => resolve(4), 150));
});
const stub5 = jest.fn(() => {
  return new Promise((resolve) => setTimeout(() => resolve(5), 100));
});

it("should subscribe a series of asynchronous functions and return the results of the latest subscribed function to all subscribed functions", async () => {
  const debounce = createDebouncer(100);

  debounce(stub4);
  debounce(stub5);

  await new Promise((resolve) => setTimeout(resolve, 200));

  expect(stub4).toHaveBeenCalledTimes(0);
  expect(stub5).toHaveBeenCalledTimes(1);
});

// TODO test error handling

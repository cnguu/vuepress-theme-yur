let promise = null;
let promiseResolve = null;

export const useScrollPromise = () => ({
  wait: () => promise,
  pending: () => {
    promise = new Promise((resolve) => (promiseResolve = resolve));
  },
  resolve: () => {
    promiseResolve?.();
    promise = null;
    promiseResolve = null;
  },
});

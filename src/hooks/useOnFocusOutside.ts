import { RefObject, useEffect } from "react";
import throttle from "lodash/throttle";

const THROTTLE_TIME = 100;

const useOnFocusOutside = <T extends HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => unknown
) => {
  useEffect(() => {
    const listener = throttle((event: Event) => {
      if (!ref.current || ref.current?.contains(event.target as Node)) {
        return;
      }

      handler(event);
    }, THROTTLE_TIME);

    window.addEventListener("mousedown", listener);
    window.addEventListener("touchstart", listener);
    window.addEventListener("scroll", listener);

    return () => {
      window.removeEventListener("mousedown", listener);
      window.removeEventListener("touchstart", listener);
      window.removeEventListener("scroll", listener);
      listener.cancel();
    };
  }, [ref, handler]);
};

export default useOnFocusOutside;

import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(
    function (e) {
      document.addEventListener("keydown", function (e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          action();
        }
        return function () {
          document.removeEventListener();
        };
      });
    },
    [action, key]
  );
}
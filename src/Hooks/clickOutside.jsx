import { useEffect, useRef } from "react";

const useOutsideClick = (ref, callback) => {
  const isMounted = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMounted.current) {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      } else {
        isMounted.current = true;
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref, callback]);
};

// Example of use
// useOutsideClick(modal, () => setProjectOpen("none"));

export default useOutsideClick;

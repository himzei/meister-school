import { useEffect, useState, useRef } from "react";

export const useDetectClose = (initialState) => {
  const [isOpen, setIsOpen] = useState(initialState);
  const ref = useRef(null);

  const removeHandler = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const onClick = (e) => {
      if (ref.current !== null && !ref.current.contains(e.target)) {
        setIsOpen(!isOpen);
      }
    };

    if (isOpen) {
      window.addEventListener("mouseover", onClick);
    }

    return () => {
      window.removeEventListener("mouseover", onClick);
    };
  }, [isOpen]);

  return [isOpen, ref, removeHandler];
};

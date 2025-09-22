import { useEffect } from "react";

const useBodyFreeze = (isOpen) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // اسکرول صفحه غیرفعال می‌شود
    } else {
      document.body.style.overflow = ""; // اسکرول صفحه فعال می‌شود
    }

    // Clean-up: زمانی که کامپوننت حذف می‌شود، overflow به حالت اولیه باز می‌گردد.
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
};

export default useBodyFreeze;

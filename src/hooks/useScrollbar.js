import { OverlayScrollbars } from "overlayscrollbars";
import { useEffect } from "react";

const config = {
  scrollbars: {
    theme: "os-theme-dark",
  },
};

const useScrollbar = (root, hasScroll) => {
  let scrollbar;
  useEffect(() => {
    if (root.current && hasScroll) {
      scrollbar = OverlayScrollbars(root.current, config);
    }
    return () => {
      if (scrollbar) {
        scrollbar.destroy();
      }
    };
  }, [root, hasScroll]);

  return scrollbar;
};

export default useScrollbar;

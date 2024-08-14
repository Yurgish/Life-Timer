import { OverlayScrollbars } from "overlayscrollbars";
import { useEffect, useRef } from "react";

const config = {
    scrollbars: {
        theme: "os-theme-dark",
    },
};

const useScrollbar = (root, hasScroll) => {
    const scrollbarRef = useRef(null);

    useEffect(() => {
        if (root.current && hasScroll) {
            scrollbarRef.current = OverlayScrollbars(root.current, config);
        }

        return () => {
            if (scrollbarRef.current) {
                scrollbarRef.current.destroy();
            }
        };
    }, [root, hasScroll]);

    return scrollbarRef.current;
};

export default useScrollbar;

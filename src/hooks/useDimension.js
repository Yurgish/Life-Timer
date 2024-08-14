import { useLayoutEffect, useRef, useState } from "react";

const useDimension = () => {
    const ref = useRef();
    const [dimensions, setDimensions] = useState({});

    useLayoutEffect(() => {
        setDimensions(ref.current.getBoundingClientRect().toJSON());
    }, []);

    return [ref, dimensions];
};

export default useDimension;

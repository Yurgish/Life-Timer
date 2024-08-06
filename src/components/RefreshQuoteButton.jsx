import React from "react";
import { animated, useInView, useSpring } from "react-spring";
import { MdOutlineRefresh } from "react-icons/md";

const RefreshQuoteButton = ({ changeQuote }) => {
  const [ref, isInView] = useInView();
  const config = {
    tension: 530,
    friction: 30,
  };

  const [hoverProps, setHover] = useSpring(() => ({
    transform: "rotate(0deg)",
    config: config,
  }));
  const [pressProps, setPress] = useSpring(() => ({
    scale: 1,
    config: config,
  }));

  const buttonApear = useSpring({
    opacity: isInView ? 1 : 0,
    transform: isInView
      ? "translateY(0%)  rotate(0)"
      : "translateY(100%)  rotate(-0.5turn)",
    config: {
      tension: 330,
      friction: 20,
    },
  });

  return (
    <animated.div
      onClick={() => changeQuote()}
      className=" absolute bottom-20 cursor-pointer"
      ref={ref}
      style={buttonApear}
    >
      <animated.div
        style={{ ...hoverProps, ...pressProps }}
        onMouseEnter={() => setHover({ transform: "rotate(45deg)" })}
        onMouseLeave={() => setHover({ transform: "rotate(0deg)" })}
        onMouseDown={() => setPress({ scale: 0.8 })}
        onMouseUp={() => setPress({ scale: 1 })}
      >
        <MdOutlineRefresh />
      </animated.div>
    </animated.div>
  );
};

export default RefreshQuoteButton;

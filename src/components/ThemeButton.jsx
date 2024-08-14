import { useState } from "react";
import useTheme from "../hooks/useTheme";
import { PiMoonStarsLight, PiSunLight } from "react-icons/pi";
import { useSpring, animated } from "react-spring";

const ThemeButton = ({ position = "horizontal" }) => {
    const [theme, switchTheme] = useTheme();
    const [isHovered, setIsHovered] = useState(false);

    const switchHorizontalAnimation = useSpring({
        transform: `translateX(${theme === "light" ? "0px" : "40px"}) scaleX(${isHovered ? "1.2" : "1"})`,
        transformOrigin: theme === "light" ? "left" : "right",
        config: { tension: 200, friction: 20 },
    });

    const switchVerticalAnimation = useSpring({
        transform: `translateY(${theme === "light" ? "0px" : "40px"}) scaleY(${isHovered ? "1.2" : "1"})`,
        transformOrigin: theme === "light" ? "top" : "bottom",
        config: { tension: 200, friction: 15 },
    });

    return (
        <div
            className={`cursor-pointer rounded-lg text-primary-text-color bg-interface relative flex p-1 text-2xl gap-2 shadow-box w-auto ${
                position === "vertical" ? "flex-col" : "flex-row"
            }`}
            onClick={() => switchTheme()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button className="p-1 rounded-md z-10">
                <PiSunLight />
            </button>
            <button className="p-1 rounded-md z-10">
                <PiMoonStarsLight />
            </button>
            <animated.div
                style={position === "horizontal" ? switchHorizontalAnimation : switchVerticalAnimation}
                className="absolute bg-interface-hover w-[32px] h-[32px] rounded-md z-0 shadow-box"
            ></animated.div>
        </div>
    );
};

export default ThemeButton;

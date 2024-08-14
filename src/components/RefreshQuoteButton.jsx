import { animated, useInView, useSpring } from "react-spring";
import { MdOutlineRefresh } from "react-icons/md";
import useMediaQuery from "../hooks/useMediaQuery";

const RefreshQuoteButton = ({ changeQuote }) => {
    const [ref, isInView] = useInView();
    const isMobile = useMediaQuery("(max-width: 768px)");

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
        transform: isInView ? "translateY(0%)  rotate(0)" : "translateY(100%)  rotate(-0.5turn)",
        config: {
            tension: 330,
            friction: 20,
        },
    });

    const handlePressStart = () => {
        setPress({ scale: 0.8 });
    };

    const handlePressEnd = () => {
        setPress({ scale: 1 });
    };

    return (
        <animated.div
            onClick={() => changeQuote()}
            className="absolute bottom-20 cursor-pointer"
            ref={ref}
            style={buttonApear}
        >
            <animated.div
                style={{ ...hoverProps, ...pressProps }}
                onMouseEnter={() => !isMobile && setHover({ transform: "rotate(45deg)" })}
                onMouseLeave={() => !isMobile && setHover({ transform: "rotate(0deg)" })}
                onMouseDown={handlePressStart}
                onMouseUp={handlePressEnd}
                onTouchStart={handlePressStart} // Додаємо події для мобільних пристроїв
                onTouchEnd={handlePressEnd}
            >
                <MdOutlineRefresh className="text-3xl max-sm:text-2xl" />
            </animated.div>
        </animated.div>
    );
};

export default RefreshQuoteButton;

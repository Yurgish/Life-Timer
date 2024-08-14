import { MdOutlineKeyboardDoubleArrowDown } from "react-icons/md";
import { useSpring, animated } from "react-spring";

const ScrollDown = () => {
    // Анімація для іконки
    const props = useSpring({
        from: { transform: "translateY(0%)" },
        to: { transform: "translateY(20%)" },
        config: {
            tension: 500,
            friction: 100,
        },
        loop: { reverse: true }, // безкінечна анімація
    });

    // Обробник натискання для прокручування вниз на висоту екрану
    const handleScrollDown = () => {
        const container = document.getElementById("timer-section");
        if (container) {
            container.scrollIntoView({ behavior: "smooth", block: "end" });
        } else {
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
        }
    };

    return (
        <div className="absolute bottom-10 cursor-pointer" onClick={handleScrollDown}>
            <div className="flex flex-col items-center justify-center">
                <p className="text-xl max-sm:text-lg">Scroll Down</p>
                <animated.div style={props}>
                    <MdOutlineKeyboardDoubleArrowDown className="text-4xl max-sm:text-2xl" />
                </animated.div>
            </div>
        </div>
    );
};

export default ScrollDown;

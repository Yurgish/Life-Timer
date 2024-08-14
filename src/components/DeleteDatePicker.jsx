import { useState } from "react";
import { useLocalStorage } from "../hooks";
import { LiaCalendarTimesSolid } from "react-icons/lia";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";

const DeleteDateButton = () => {
    const [_, setSelectedDate] = useLocalStorage("selectedDate", null);
    const [isHovered, setIsHovered] = useState(false);

    const navigate = useNavigate();

    const handleDelete = () => {
        setSelectedDate(null);
        setTimeout(() => navigate("/"), 1);
    };

    const hoverAnimation = useSpring({
        config: { tension: 200, friction: 15 },
        transform: ` scale(${isHovered ? "1.2, 1.2" : "1, 1"})`,
    });

    return (
        <div
            className="relative cursor-pointer p-1 rounded-lg text-2xl bg-interface"
            onClick={() => handleDelete()}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="p-1 z-20 relative">
                <LiaCalendarTimesSolid />
            </div>
            <animated.div
                style={hoverAnimation}
                className="absolute bg-interface-hover w-[32px] h-[32px] rounded-md z-10 shadow-box top-1"
            ></animated.div>
        </div>
    );
};

export default DeleteDateButton;

import { useState, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import { useLocalStorage } from "../hooks";

function NextBirthYearBar() {
    const [percentage, setPercentage] = useState(0);
    const [selectedDate] = useLocalStorage("selectedDate", null);

    useEffect(() => {
        const calculateDaysSinceLastBirthday = (birthday) => {
            const now = new Date();
            const lastBirthday = new Date(now.getFullYear(), birthday.getMonth(), birthday.getDate());

            if (now < lastBirthday) {
                lastBirthday.setFullYear(now.getFullYear() - 1);
            }

            const oneDay = 24 * 60 * 60 * 1000;
            const daysInYear = 365;
            const diffDays = Math.round(Math.abs((now - lastBirthday) / oneDay));

            return (diffDays / daysInYear) * 100;
        };

        const interval = setInterval(() => {
            const birthdayDate = new Date(selectedDate);
            setPercentage(calculateDaysSinceLastBirthday(birthdayDate));
        }, 1000);

        return () => clearInterval(interval);
    }, [selectedDate]);

    const springProps = useSpring({ value: percentage });

    return (
        <div className="w-full h-2 bg-gray-200 rounded">
            <animated.div
                style={{
                    width: springProps.value.to((value) => `${value.toFixed(2)}%`),
                }}
                className="h-2 bg-blue-500 rounded"
            >
                {springProps.value.to((value) => `${value.toFixed(2)}%`)}
            </animated.div>
        </div>
    );
}

export default NextBirthYearBar;

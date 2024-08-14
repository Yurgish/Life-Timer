import { useState, useEffect } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AgeTimer = () => {
    const [selectedDate] = useLocalStorage("selectedDate", null);
    const [currentDate, setCurrentDate] = useState(Date.now() - Date.parse(selectedDate));

    const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25;

    useEffect(() => {
        const updateTimeToBirth = () => {
            if (!selectedDate) return;

            const timeToBirth = Date.now() - Date.parse(selectedDate);
            setCurrentDate(new Date(timeToBirth));
        };
        const intervalId = setInterval(updateTimeToBirth, 260);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <div>
            <p className="text-lg">Age</p>
            <div className="flex align-top">
                <p className="text-8xl leading-none">{Math.floor(currentDate / millisecondsPerYear)}</p>
                <p className="text-5xl pt-1">
                    {((currentDate % millisecondsPerYear) / millisecondsPerYear).toFixed(8).substring(1)}
                </p>
            </div>
        </div>
    );
};

export default AgeTimer;

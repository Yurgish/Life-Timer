import { useEffect, useState } from "react";

const CurrentDateTimer = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const updateDate = () => {
            const currentDate = new Date();
            setCurrentDate(currentDate);
        };

        const intervalId = setInterval(updateDate, 1000);

        return () => clearInterval(intervalId);
    }, []);
    return (
        <div className="flex flex-col">
            <p className="text-lg">{currentDate.toLocaleString("en", { weekday: "long" })}</p>
            <p className="text-4xl">
                {currentDate.toLocaleString("en", { day: "2-digit" })}.
                {currentDate.toLocaleString("en", { month: "2-digit" })}
            </p>
            <p className="text-6xl">{currentDate.toLocaleString("en", { month: "short" })}</p>
        </div>
    );
};

export default CurrentDateTimer;

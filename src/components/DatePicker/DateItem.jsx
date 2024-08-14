import { useHoverDateContext } from "../../contexts/hoverDateProvider";

const DayItem = ({ day, onClick, isOpen, isSelected, isToday, isCurrentMonth = false }) => {
    const { setHoveredDate } = useHoverDateContext();

    const handleMouseEnter = (value) => {
        if (!isOpen) return;
        setHoveredDate(value);
    };

    return (
        <div
            className={`grid-item`}
            onClick={() => {
                onClick(day);
            }}
            onMouseEnter={() => handleMouseEnter(day.dateShort)}
            data-date={day.dateShort}
        >
            <div
                className={`${isToday ? "text-calendar-red" : ""} ${
                    isSelected ? " border-second-text-color border" : ""
                } ${isCurrentMonth ? "" : "text-second-text-color"} `}
            >
                {day.date}
            </div>
        </div>
    );
};

export default DayItem;

import { useHoverDateContext } from "../../contexts/hoverDateProvider";
import { IoCalendarOutline } from "react-icons/io5";

const DatePickerInput = ({ selectedDate, onClick, isOpen }) => {
    const { hoveredDate } = useHoverDateContext();
    return (
        <div
            className="rounded-md bg-interface px-4 py-2 flex items-center cursor-pointer hover:bg-interface-hover shadow-box"
            onClick={() => onClick()}
        >
            {isOpen && selectedDate ? (
                <p className="text-second-text-color">{hoveredDate}</p>
            ) : selectedDate ? (
                <p className="text-primary-text-color">{selectedDate.dateShort}</p>
            ) : (
                <p className="text-second-text-color">{hoveredDate}</p>
            )}
            <IoCalendarOutline className="ml-3 text-primary-text-color" />
        </div>
    );
};

export default DatePickerInput;

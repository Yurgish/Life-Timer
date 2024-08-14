import { useState } from "react";
import DatePicker from "../DatePicker/DatePicker";
import useLocalStorage from "../../hooks/useLocalStorage";
import ThemeButton from "../ThemeButton";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";

const DatePickerPage = () => {
    const [day, setState] = useState(null);
    const [, setSelectedDate] = useLocalStorage("selectedDate", day);
    const navigate = useNavigate();

    const isSmallScreen = useMediaQuery("(max-width: 864px)");

    const handleButtonClick = () => {
        if (day) {
            setSelectedDate(day.Date.toISOString());
            setTimeout(() => navigate("/Timer"), 1);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen origin-bottom gap-2">
            <div className="relative">
                <p className="text-primary-text-color text-lg mb-1 max-[864px]:text-center">When were you born?</p>
                <div className="flex justify-center items-end ">
                    <DatePicker selectedOption={day} setSelectedOption={setState} />
                    <button
                        className="px-4 py-2 bg-interface ml-2 rounded-md text-primary-text-color hover:bg-interface-hover shadow-box"
                        onClick={() => handleButtonClick()}
                    >
                        Next
                    </button>
                </div>
                <div className="absolute bottom-0 left-full ml-2 max-[864px]:top-[110%] max-[864px]:left-1/2 max-[864px]:ml-0 max-[864px]:-translate-x-1/2 ">
                    <ThemeButton position={isSmallScreen ? "horizontal" : "vertical"} />
                </div>
            </div>
        </div>
    );
};

export default DatePickerPage;

import { useEffect, useState } from "react";
import DatePicker from "../DatePicker/DatePicker";
import useLocalStorage from "../../hooks/useLocalStorage";
import ThemeButton from "../ThemeButton";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../../hooks/useMediaQuery";

const isFutureDate = (date) => {
    const today = new Date();
    const selected = new Date(date.Date);
    return selected > today;
};

const DatePickerPage = () => {
    const [day, setState] = useState(null);
    const [selectedDate, setSelectedDate] = useLocalStorage("selectedDate", day);
    const [error, setError] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();
    const isSmallScreen = useMediaQuery("(max-width: 864px)");

    const handleButtonClick = () => {
        if (day) {
            setError("");
            setSelectedDate(day.Date.toISOString());
            setTimeout(() => navigate("/Timer"), 1);
        }
    };

    useEffect(() => {
        if (day) {
            if (isFutureDate(day)) {
                setError("Please select a valid birth date.");
            } else {
                setError("");
            }
            setIsButtonDisabled(isFutureDate(day));
        }
    }, [day]);

    useEffect(() => {
        if (selectedDate) {
            navigate("/Timer", { replace: true });
        }
    }, [selectedDate, navigate]);

    return (
        <div className="flex justify-center items-center h-screen origin-bottom gap-2 flex-col">
            <div className="flex items-end max-sm:flex-col max-sm:items-center">
                <div>
                    <p className="text-primary-text-color text-lg mb-1 max-[864px]:text-center">When were you born?</p>
                    <div className="flex">
                        <DatePicker selectedOption={day} setSelectedOption={setState} />
                        <button
                            className={`px-4 py-2 bg-interface ml-2 rounded-md text-primary-text-color  shadow-box ${
                                isButtonDisabled ? "cursor-not-allowed opacity-40" : "hover:bg-interface-hover"
                            }`}
                            onClick={handleButtonClick}
                            disabled={isButtonDisabled}
                        >
                            Next
                        </button>
                    </div>
                </div>
                <div className="ml-2 max-sm:mt-2 max-sm:ml-0">
                    <ThemeButton position={isSmallScreen ? "horizontal" : "vertical"} />
                </div>
            </div>
            {error && <p className="text-red-400 mt-1 text-wrap ">{error}</p>}
        </div>
    );
};

export default DatePickerPage;

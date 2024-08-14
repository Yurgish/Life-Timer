import TimerSection from "../sections/TimerSection";
import QuotesSection from "../sections/QuotesSection";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../../hooks";

const MainPage = () => {
    const [selectedDate] = useLocalStorage("selectedDate", null);

    const navigate = useNavigate();

    useEffect(() => {
        if (!selectedDate) {
            navigate("/", { replace: true }); // Use replace to avoid adding a new entry in the history stack
        }
    }, [selectedDate, navigate]);
    return (
        <div id="scroll-container" className="h-screen snap-mandatory snap-y overflow-y-scroll no-scrollbar">
            <TimerSection />
            <QuotesSection />
        </div>
    );
};

export default MainPage;

import TimerSection from "../sections/TimerSection";
import QuotesSection from "../sections/QuotesSection";

const MainPage = () => {
    return (
        <div id="scroll-container" className="h-screen snap-mandatory snap-y overflow-y-scroll no-scrollbar">
            <TimerSection />
            <QuotesSection />
        </div>
    );
};

export default MainPage;

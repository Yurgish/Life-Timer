import CurrentDateTimer from "../CurrentDateTimer";
import AgeTimer from "../AgeTimer";
import ThemeButton from "../ThemeButton";
import DeleteDateButton from "../DeleteDatePicker";
import useMediaQuery from "../../hooks/useMediaQuery";

const TimerSection = () => {
    const isSmallScreen = useMediaQuery("(max-width: 640px)");
    return (
        <section className="flex justify-center items-center text-primary-text-color h-screen snap-center gap-4 max-sm:flex-col">
            <div className="flex gap-4 max-sm:flex-col">
                <CurrentDateTimer />
                <AgeTimer />
            </div>
            <div className="flex flex-col gap-1 max-sm:flex-row">
                <ThemeButton position={isSmallScreen ? "horizontal" : "vertical"} />
                <DeleteDateButton />
            </div>
        </section>
    );
};

export default TimerSection;

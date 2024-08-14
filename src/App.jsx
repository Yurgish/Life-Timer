import { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import useLocalStorage from "./hooks/useLocalStorage";
import MainPage from "./components/pages/MainPage";
import DatePickerPage from "./components/pages/DatePickerPage";

function App() {
    const { selectedDate } = useLocalStorage("selectedDate", null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedDate) {
            navigate("/Timer", { replace: true }); // Use replace to avoid adding a new entry in the history stack
        }
    }, [selectedDate, navigate]);

    const transitions = useTransition(location, {
        from: { opacity: 0, transform: `translateY(40%) scaleY(0.9)` },
        enter: { opacity: 1, transform: "translateY(0%) scaleY(1)" },
        leave: { opacity: 0, transform: "translateY(-40%) scaleY(0.9)" },
        config: { tension: 230, friction: 30, mass: 2 },
        exitBeforeEnter: true,
    });

    return (
        <div className="bg-primary overflow-hidden font-mono">
            {transitions((styles, item) => (
                <animated.div style={styles} className=" h-screen overflow-auto w-full">
                    <Routes location={item}>
                        <Route path="/" element={<DatePickerPage />} />
                        <Route path="/Timer" element={<MainPage />} />
                    </Routes>
                </animated.div>
            ))}
        </div>
    );
}

export default App;

import { Route, Routes, useLocation } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import MainPage from "./components/pages/MainPage";
import DatePickerPage from "./components/pages/DatePickerPage";

function App() {
    const location = useLocation();

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

import { animated, useSpring } from "react-spring";
import { useEffect, useState } from "react";
import { useQuotes } from "../../hooks";
import RefreshQuoteButton from "../RefreshQuoteButton";
import useAudio from "../../hooks/useAudio";
import TypingText from "../TypingText";

const QuotesSection = () => {
    const [currentQuote, changeQuote, getText] = useQuotes();
    const [animateState, setAnimateState] = useState(true);
    const [key, setKey] = useState(0);
    const [, toggle, setAudio, getDuration] = useAudio("");

    const handleQuoteChange = () => {
        setAnimateState(false);
    };

    const fade = useSpring({
        clipPath: animateState
            ? "polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)"
            : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
        onRest: () => {
            setAnimateState(true);
            if (!animateState) {
                changeQuote();
                setKey((prev) => prev + 1);
            }
        },
    });

    useEffect(() => {
        if (currentQuote.audio) {
            setAudio(currentQuote.audio);
            toggle();
        } else {
            setAudio("");
        }
    }, [currentQuote, setAudio, toggle]);

    return (
        <section
            id="timer-section"
            className="flex justify-center items-center text-primary-text-color h-screen snap-center gap-4 text-4xl relative max-sm:text-lg max-lg:text-3xl"
        >
            <animated.div style={fade}>
                <TypingText
                    key={key}
                    text={getText()}
                    author={currentQuote.author}
                    animationDuration={currentQuote.audio ? getDuration() : null}
                />
            </animated.div>
            <RefreshQuoteButton changeQuote={handleQuoteChange} />
        </section>
    );
};

export default QuotesSection;

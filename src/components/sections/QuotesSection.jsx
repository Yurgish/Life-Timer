import {
  useTrail,
  animated,
  useInView,
  useSpring,
  useSpringRef,
} from "react-spring";
import React, { useEffect, useState } from "react";
import { useQuotes } from "../../hooks";
import RefreshQuoteButton from "../RefreshQuoteButton";
import useAudio from "../../hooks/useAudio";

const QuotesSection = () => {
  const [currentQuote, changeQuote, getText] = useQuotes();
  const [animateState, setAnimateState] = useState(true);
  const [key, setKey] = useState(0);
  const [playing, toggle, setAudio, getDuration] = useAudio('')

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
      setAudio(currentQuote.audio)
      toggle()
    } else {
      setAudio("")
    }
  }, [currentQuote])

  return (
    <section className="flex justify-center items-center text-primary-text-color h-screen snap-center gap-4 text-4xl relative">
      <RefreshQuoteButton changeQuote={handleQuoteChange} />
      <animated.div style={fade}>
        <TypingText key={key} text={getText()} author={currentQuote.author} animationDuration={currentQuote.audio ? getDuration() : null} />
      </animated.div>
    </section>
  );
};

export default QuotesSection;

function TypingText({ text, author, key, animationDuration = null }) {
  const [ref, isInView] = useInView();
  const clipPathAnimationRef = useSpringRef();

  // Розбиваємо кожен об'єкт на окремі символи
  const chars = text.flatMap((item) =>
    item.text
      .split("")
      .map((char) => ({ text: char, className: item.className }))
  );

  // Анімація фрази

  const trails = useTrail(chars.length, {
    opacity: isInView ? 1 : 0,
    config: {
      ...(animationDuration && { duration: animationDuration / chars.length * 1000 }),
      ...(animationDuration === null && {
        tension: 430,
        friction: 20,
        clamp: true,
      }),

    },
    delay: isInView ? 500 : 0,
    onRest: () => {
      clipPathAnimationRef.start();
    }
  });


  const autorQuoteAnimation = useSpring({
    ref: clipPathAnimationRef,
    config: { tension: 230, friction: 50 },
    delay: animationDuration ? animationDuration * 1000 : chars.length * 50,
    from: { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
    to: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
  });

  return (
    <div className="max-w-[65vw] whitespace-pre-wrap " ref={ref} >
      {
        trails.map((props, index) => (
          <animated.span
            key={index}
            style={props}
            className={
              chars[index].className ? chars[index].className : undefined
            }
          >
            {chars[index].text}
          </animated.span>
        ))
      }
      {author && (
        <animated.div
          style={autorQuoteAnimation}
          className=" text-2xl mt-2 opacity-50 text-right italic"
        >
          &mdash; {author}
        </animated.div>
      )}
    </div >
  );
}

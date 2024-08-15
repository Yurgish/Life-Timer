import { animated, useInView, useSpring, useSpringRef, useTrail } from "react-spring";

function TypingText({ text, author = "", key, animationDuration = null }) {
    const [ref, isInView] = useInView();
    const clipPathAnimationRef = useSpringRef();

    const chars = text.flatMap((item) =>
        item.text.split("").map((char) => ({ text: char, className: item.className }))
    );

    const trails = useTrail(chars.length, {
        opacity: isInView ? 1 : 0,
        config: {
            ...(animationDuration && { duration: (animationDuration / chars.length) * 1000 }),
            ...(animationDuration === null && {
                tension: 430,
                friction: 20,
                clamp: true,
            }),
        },
        delay: isInView ? 500 : 0,
        onRest: () => {
            clipPathAnimationRef.start();
        },
    });

    const autorQuoteAnimation = useSpring({
        ref: clipPathAnimationRef,
        config: { tension: 230, friction: 50 },
        delay: animationDuration ? animationDuration * 1000 : chars.length * 50,
        from: { clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" },
        to: { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
    });

    return (
        <div className="max-w-[65vw] whitespace-pre-wrap  max-sm:max-w-[86vw] max-lg:max-w-[78vw]" ref={ref}>
            {trails.map((props, index) => (
                <animated.span
                    key={index}
                    style={props}
                    className={chars[index].className ? chars[index].className : undefined}
                >
                    {chars[index].text}
                </animated.span>
            ))}
            {author && (
                <animated.div
                    style={autorQuoteAnimation}
                    className="text-2xl mt-2 opacity-50 text-right italic max-sm:text-base"
                >
                    &mdash; {author}
                </animated.div>
            )}
        </div>
    );
}

export default TypingText;

import { useCallback, useEffect, useState } from "react";
import { quotes } from "../utils/quotes";

const useQuotes = () => {
    const getRandomNum = (max) => {
        return Math.floor(Math.random() * max);
    };

    const [quoteIndex, setQuoteIndex] = useState(getRandomNum(quotes.length));
    const [currentQuote, setCurrentQuote] = useState(quotes[quoteIndex]);

    const changeQuote = () => {
        let newIndex;
        do {
            newIndex = getRandomNum(quotes.length);
        } while (newIndex === quoteIndex);

        setQuoteIndex(newIndex);
        setCurrentQuote(quotes[newIndex]);
    };

    const getText = useCallback(() => {
        return currentQuote.quote.flatMap((part) => part);
    }, [currentQuote.quote]);

    useEffect(() => {
        console.log(getText());
    }, [currentQuote, getText, quoteIndex]);

    return [currentQuote, changeQuote, getText];
};

export default useQuotes;

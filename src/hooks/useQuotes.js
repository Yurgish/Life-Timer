import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    console.log(getText());
  }, [currentQuote, quoteIndex]);

  const getText = () => {
    return currentQuote.quote.flatMap((part) => part);
  };

  return [currentQuote, changeQuote, getText];
};

export default useQuotes;

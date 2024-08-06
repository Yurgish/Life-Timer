import React, { useState } from "react";
import CurrentDateTimer from "../CurrentDateTimer";
import AgeTimer from "../AgeTimer";
import TimerSection from "../sections/TimerSection";
import QuotesSection from "../sections/QuotesSection";

const MainPage = () => {
  return (
    <div className="h-screen snap-mandatory snap-y overflow-y-scroll no-scrollbar">
      <TimerSection />
      <QuotesSection />
    </div>
  );
};

export default MainPage;

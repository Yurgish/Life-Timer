import React from "react";
import CurrentDateTimer from "../CurrentDateTimer";
import AgeTimer from "../AgeTimer";
import ThemeButton from "../ThemeButton";
import DeleteDateButton from "../DeleteDatePicker";

const TimerSection = () => {
  return (
    <section className="flex justify-center items-center text-primary-text-color h-screen snap-center gap-4">
      <div className="flex gap-4">
        <CurrentDateTimer />
        <AgeTimer />
      </div>
      <div className="flex flex-col gap-1">
        <ThemeButton position="vertical" />
        <DeleteDateButton />
      </div>
    </section>
  );
};

export default TimerSection;

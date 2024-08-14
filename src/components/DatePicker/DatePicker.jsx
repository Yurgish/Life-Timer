import { useRef, useState, useEffect } from "react";
import Select from "../Select";
import DayItem from "./DateItem";
import DatePickerInput from "./DatePickerInput";
import { useDatePicker } from "../../hooks";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { HoverDateProvider } from "../../contexts/hoverDateProvider";
import { useTransition, animated } from "react-spring";

function DatePicker({ selectedOption, setSelectedOption }) {
    const language = "en";

    const [isOpen, setIsOpen] = useState(false);
    const datePickerRef = useRef(null);

    const handleOpenDatePicker = () => {
        setIsOpen((prev) => !prev);
    };

    const handleCloseDatePicker = () => {
        setIsOpen(false);
    };

    const {
        currentMonth,
        avalibleDaysOfWeek,
        avalibleMonth,
        avalibleYears,
        goToDate,
        nextMonth,
        prevMonth,
        getPrevSlicedMonth,
        getNextSlicedMonth,
        goToToday,
    } = useDatePicker(language);

    const handleSelectDate = (value) => {
        setSelectedOption(value);
        handleOpenDatePicker();
    };

    const handleMonthSelect = (value) => {
        goToDate(currentMonth.year, value);
    };

    const handleYearSelect = (value) => {
        goToDate(value, currentMonth.number);
    };

    const handleTodayClick = () => {
        goToToday();
    };

    const handleClickOutside = (event) => {
        if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
            handleCloseDatePicker();
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const transitions = useTransition(isOpen, {
        from: { opacity: 0, transform: "scale(1, 0.9) translateY(-50%)" },
        enter: { opacity: 1, transform: "scale(1, 1) translateY(-50%)" },
        leave: { opacity: 0, transform: "scale(1, 0.9) translateY(-50%)" },
        config: { tension: 320, friction: 20 },
    });

    return (
        <HoverDateProvider>
            <div className="relative" ref={datePickerRef}>
                <DatePickerInput selectedDate={selectedOption} onClick={handleOpenDatePicker} isOpen={isOpen} />

                {transitions(
                    (props, item) =>
                        item && (
                            <animated.div
                                style={{ ...props }}
                                className="w-72 px-3 py-3 bg-interface rounded-md text-sm absolute mr-2 right-full top-1/2 origin-bottom text-primary-text-color shadow-box"
                            >
                                <div className="flex justify-between items-center mb-2 ">
                                    <IoIosArrowBack className="m-2 cursor-pointer" onClick={() => prevMonth()} />
                                    <div className="flex gap-1">
                                        <Select
                                            options={avalibleMonth}
                                            placeholder={currentMonth.monthShort}
                                            onSelectChange={handleMonthSelect}
                                        />
                                        <Select
                                            options={avalibleYears}
                                            placeholder={currentMonth.year}
                                            onSelectChange={handleYearSelect}
                                        />
                                    </div>
                                    <IoIosArrowForward className="m-2 cursor-pointer" onClick={() => nextMonth()} />
                                </div>
                                <div>
                                    <div className="grid grid-cols-7">
                                        {avalibleDaysOfWeek.map((name) => (
                                            <div className="grid-item" key={name}>
                                                {name}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-7 grid-rows-auto items-center justify-items-center">
                                        {getPrevSlicedMonth().map((day) => (
                                            <DayItem
                                                key={day.dateShort}
                                                day={day}
                                                onClick={handleSelectDate}
                                                isSelected={selectedOption && selectedOption.isEqualTo(day)}
                                                isToday={day.isToday}
                                                isOpen={isOpen}
                                            />
                                        ))}
                                        {currentMonth.getAllDays().map((day) => (
                                            <DayItem
                                                key={day.dateShort}
                                                day={day}
                                                onClick={handleSelectDate}
                                                isSelected={selectedOption && selectedOption.isEqualTo(day)}
                                                isToday={day.isToday}
                                                isCurrentMonth={true}
                                                isOpen={isOpen}
                                            />
                                        ))}
                                        {getNextSlicedMonth().map((day) => (
                                            <DayItem
                                                key={day.dateShort}
                                                day={day}
                                                onClick={handleSelectDate}
                                                isSelected={selectedOption && selectedOption.isEqualTo(day)}
                                                isToday={day.isToday}
                                                isOpen={isOpen}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <button
                                    className="w-full rounded-md py-1 hover:bg-interface-hover mt-2"
                                    onClick={() => handleTodayClick()}
                                >
                                    Today
                                </button>
                            </animated.div>
                        )
                )}
            </div>
        </HoverDateProvider>
    );
}

export default DatePicker;

import { useState, useEffect, useRef, useCallback } from "react";
import { useSpring, animated } from "react-spring";
import { useDimension, useScrollbar } from "../hooks";

function Select({ options, placeholder, onSelectChange }) {
    const [selectedOption, setSelectedOption] = useState(placeholder ?? options[0]);
    const [isOpen, setIsOpen] = useState(false);

    const selectRef = useRef(null);
    const dropdownRef = useRef(null);

    useScrollbar(dropdownRef, true);

    const maxVisibleElements = 6;

    const [dropdownItemRef, { height }] = useDimension();

    const handleSelectChange = (option) => {
        setSelectedOption(option);
        closeDropdown();
        onSelectChange(option);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const closeDropdown = () => {
        setIsOpen(false);
    };

    const handleClickOutside = useCallback((event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            closeDropdown();
        }
    }, []);

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [handleClickOutside]);

    useEffect(() => {
        setSelectedOption(placeholder ?? options[0]);
    }, [options, placeholder]);

    const dropdownAnimation = useSpring({
        opacity: isOpen ? 1 : 0,
        maxHeight: isOpen ? height * maxVisibleElements : 0,
        config: {
            duration: 100,
        },
    });

    return (
        <div className="relative" ref={selectRef}>
            <button
                onClick={toggleDropdown}
                className={`rounded-md px-3 py-2 leading-tight focus:outline-none focus:shadow-outline hover:bg-interface-hover  ${
                    isOpen ? "bg-interface" : "bg-transparent"
                }`}
            >
                {String(selectedOption)}
            </button>
            <animated.div
                style={{
                    ...dropdownAnimation,
                    pointerEvents: isOpen ? "auto" : "none",
                }}
                className="absolute z-10 top-full mt-1 bg-interface rounded-md overflow-hidden shadow-box"
                ref={dropdownRef}
            >
                <ul>
                    {options.map((option) => (
                        <li
                            key={option}
                            onClick={() => handleSelectChange(option)}
                            className="px-4 py-2 cursor-pointer hover:bg-interface-hover"
                            ref={dropdownItemRef}
                            data-option={option}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            </animated.div>
        </div>
    );
}

export default Select;

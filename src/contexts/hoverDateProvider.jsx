// hoverDateProvider.jsx
import { createContext, useContext, useReducer } from "react";
import { Day } from "../utils/date";

const HoverDateContext = createContext();

const useHoverDateContext = () => useContext(HoverDateContext);

const HoverDateProvider = ({ children }) => {
    const initialState = {
        hoveredDate: new Day().dateShort,
    };

    const reducer = (state, action) => {
        switch (action.type) {
            case "SET":
                return { hoveredDate: action.payload };
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const setHoveredDate = (date) => {
        if (date === null) {
            dispatch({ type: "SET", payload: initialState.hoveredDate });
        } else {
            dispatch({ type: "SET", payload: date });
        }
    };
    return (
        <HoverDateContext.Provider
            value={{
                hoveredDate: state.hoveredDate,
                setHoveredDate,
            }}
        >
            {children}
        </HoverDateContext.Provider>
    );
};

export { HoverDateProvider, useHoverDateContext };

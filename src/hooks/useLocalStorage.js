import { useEffect, useState } from "react";

export default function useLocalStorage(key, initValue) {
    const [state, setState] = useState(() => {
        try {
            const value = localStorage.getItem(key);
            if (value !== null) {
                return JSON.parse(value);
            } else {
                localStorage.setItem(key, JSON.stringify(initValue));
                window.dispatchEvent(new Event("storage"));
                return initValue;
            }
        } catch (error) {
            console.error("Error parsing JSON from localStorage:", error);
            return initValue;
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(state));
            window.dispatchEvent(new Event("storage"));
        } catch (error) {
            console.error("Error serializing state to JSON:", error);
        }
    }, [key, state]);

    useEffect(() => {
        const listenStorageChange = () => {
            try {
                const value = localStorage.getItem(key);
                if (value !== null) {
                    setState(JSON.parse(value));
                } else {
                    localStorage.setItem(key, JSON.stringify(initValue));
                    window.dispatchEvent(new Event("storage"));
                }
            } catch (error) {
                console.error("Error parsing JSON from localStorage:", error);
                setState(initValue);
            }
        };
        window.addEventListener("storage", listenStorageChange);
        return () => window.removeEventListener("storage", listenStorageChange);
    }, []);

    return [state, setState];
}

import { useState, useEffect, useCallback } from "react";

const useAudio = (url) => {
    const [audio, setNewAudio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = useCallback(() => {
        setPlaying((prev) => !prev);
    }, []);

    const setAudio = useCallback((newUrl) => {
        setNewAudio(new Audio(newUrl));
    }, []);

    const getDuration = useCallback(() => {
        return Math.floor(audio.duration);
    }, [audio.duration]);

    useEffect(() => {
        const playAudio = async () => {
            try {
                await audio.play();
                setPlaying(true);
            } catch (error) {
                // Autoplay was prevented
                // Handle the error or prompt the user to interact with the page
            }
        };

        playAudio();

        return () => {
            // Cleanup function
            audio.pause();
            setPlaying(false);
        };
    }, [audio]);

    useEffect(() => {
        audio.addEventListener("ended", () => setPlaying(false));
        return () => {
            audio.removeEventListener("ended", () => setPlaying(false));
        };
    }, [audio]);

    return [playing, toggle, setAudio, getDuration];
};

export default useAudio;

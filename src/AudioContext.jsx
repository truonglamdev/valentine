// AudioContext.js
import { createContext, useContext, useEffect, useRef } from "react";
import music from "./assets/music.mp3";
const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const audioRef = useRef(new Audio(music));

  useEffect(() => {
    audioRef.current.loop = true;
    return () => audioRef.current.pause();
  }, []);

  const play = () => audioRef.current.play();
  const pause = () => audioRef.current.pause();

  return (
    <AudioContext.Provider value={{ play, pause }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);

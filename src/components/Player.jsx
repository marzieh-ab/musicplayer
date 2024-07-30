import React, { useEffect, useState } from "react";
import {
  FaRegPauseCircle,
  FaAngleRight,
  FaAngleLeft,
  FaPlay,
} from "react-icons/fa";
import { playAudio } from "../utilities/playAudio";

const Player = ({
  isPlaying,
  setIsPlaying,
  currentSong,
  nextSong,
  prevSong,
  buttonStatus,
  audioRef,
  songState,
  setSongState,
}) => {
  const getNormalTime = (time) => {
    if (time) {
      return (
        Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
      );
    } else {
      return "0:00";
    }
  };

  const handlePlayPauseSong = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const handleSeekBarDrag = (event) => {
    audioRef.current.currentTime = event.target.value;
    setSongState({ ...songState, currentTime: event.target.value });
  };

  useEffect(() => {
    if (isPlaying) {
      playAudio(isPlaying, audioRef);
    }
  }, [currentSong, isPlaying, audioRef]);

  const defaultGradient = "linear-gradient(to right, #00c6ff, #0072ff)";

  const trackAnimation = {
    transform: `translateX(${songState.seekbarPercentage}%)`,
  };

  return (
    <div className="min-h-[10vh] flex flex-col items-center justify-around">
      <div className="w-[70%] flex justify-center items-center my-8">
        <p className="px-4">{getNormalTime(songState.currentTime)}</p>
        <div
          style={{ background: defaultGradient }}
          className="bg-lightblue w-full h-[1rem] relative rounded-full overflow-hidden"
        >
          <input
            type="range"
            min={0}
            max={songState.duration}
            value={songState.currentTime}
            onChange={handleSeekBarDrag}
            className="w-full bg-transparent cursor-pointer appearance-none"
          />
          <div
            style={trackAnimation}
            className="bg-gray-400 w-full h-full absolute top-0 left-0 pointer-events-none"
          />
        </div>
        <p className="px-4">{getNormalTime(songState.duration)}</p>
      </div>
      <div className="w-1/3 flex items-center justify-between mb-8">
        <button
          disabled={!buttonStatus.previous}
          className="border-0 bg-transparent disabled:text-gray-500"
          onClick={prevSong}
        >
          <FaAngleLeft
            className="text-primary-text-color hover:text-primary-light-color cursor-pointer"
            size={24}
          />
        </button>
        <button
          className="border-0 bg-transparent"
          onClick={handlePlayPauseSong}
        >
          {isPlaying ? (
            <FaRegPauseCircle
              className="text-primary-text-color hover:text-primary-light-color cursor-pointer"
              size={32}
            />
          ) : (
            <FaPlay
              className="text-primary-text-color hover:text-primary-light-color cursor-pointer"
              size={32}
            />
          )}
        </button>
        <button
          disabled={!buttonStatus.next}
          className="border-0 bg-transparent disabled:text-gray-500"
          onClick={nextSong}
        >
          <FaAngleRight
            className="text-primary-text-color hover:text-primary-light-color cursor-pointer"
            size={24}
          />
        </button>
      </div>
    </div>
  );
};

export default Player;

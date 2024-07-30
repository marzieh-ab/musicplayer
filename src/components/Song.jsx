import React from "react";

const Song = ({ currentSong }) => {
  if (!currentSong) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-[#718792]">No song selected</p>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <img
        src={currentSong.album.images[0].url}
        alt={currentSong.name || "No title"}
        className="w-1/5 rounded-full m-4"
      />
      <h2 className="pt-12 pl-4 text-[#718792]">
        {currentSong.name || "Unknown Title"}
      </h2>
      <h3 className="text-[#718792] text-base mb-5">
        {currentSong.artists[0].name || " Artist"}
      </h3>
    </div>
  );
};

export default Song;

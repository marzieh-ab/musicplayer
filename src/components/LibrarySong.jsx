import React from "react";

const LibrarySong = ({ song, currentSong, setCurrentSong }) => {
  console.log(song);

  const handleSelectSong = () => {
    setCurrentSong(song);
  };

  return (
    <div
      className={`flex flex-row items-center w-full mb-1 cursor-pointer rounded-lg bg-gray-200 overflow-hidden transition-colors duration-500 hover:bg-primary-light-color ${
        song.id === currentSong.id ? "bg-primary-color text-white" : ""
      }`}
      onClick={handleSelectSong}
    >
      <img
        src={song.album.images[0].url}
        alt={song.name}
        className="w-1/3 h-1/3"
      />
      <div className="flex flex-col justify-center items-start p-4">
        <h3 className="text-lg font-bold">{song.name}</h3>
        <h4 className="text-sm">{song.artist}</h4>
      </div>
    </div>
  );
};

export default LibrarySong;

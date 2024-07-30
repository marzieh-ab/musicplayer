import React from 'react';
import { FaTimes } from 'react-icons/fa'
import LibrarySong from './LibrarySong';

const Library = ({
  songs,
  currentSong,
  setCurrentSong,
  setIsPlaying,
  isLibOpen,
  setIsLibOpen,
}) => {
  const renderSongItems = () => {
    return songs.map((song) => (
      <LibrarySong
        key={song.id}
        song={song}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        setIsPlaying={setIsPlaying}
      />
    ));
  };

  return (
    <div className={`library fixed top-0 left-0 w-[20rem] h-full transform transition-all duration-500 ease-in-out bg-white shadow-lg overflow-scroll ${isLibOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'}`}>
      <div className="heading-container mt-1 flex justify-between items-center">
        <h2 className="pl-2">Library</h2>
        <button  onClick={() => setIsLibOpen(false)}

          className="bg-transparent w-[50px] h-[40px] rounded-[10%] m-1 cursor-pointer border-none p-0 transition-all duration-300 ease-in-out  hover:text-[#03a9f4]">
          <FaTimes />
        </button>
      </div>
      <div className="library-songs flex flex-col items-center p-1 w-full">
        {renderSongItems()}
      </div>
    </div>
  );
};

export default Library;

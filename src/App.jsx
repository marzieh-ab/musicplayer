import React, { useState, useRef, useEffect } from "react";
import Nav from "./components/Nav";
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";

function App() {
  const audioRef = useRef(null);

  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLibOpen, setIsLibOpen] = useState(false);
  const [isPlaylistRepeat, setIsPlaylistRepeat] = useState(false);
  const [songState, setSongState] = useState({
    currentTime: 0,
    duration: 0,
    seekbarPercentage: 0,
  });
  const [buttonStatus, setButtonStatus] = useState({
    next: true,
    previous: false,
  });

  const API_KEY = '50ca348efdmshc063fb21a448e6cp1d2290jsnfd129d6fb7b6';
  const API_HOST = 'spotify23.p.rapidapi.com';

  const fetchSongs = async () => {
    const url = 'https://spotify23.p.rapidapi.com/playlist_tracks/?id=37i9dQZF1DX4Wsb4d7NKfP&offset=0&limit=100';
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
      }
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      console.log(result,"resultttttt");

    
      const fetchedSongs = result.items.map(item => item.track);


      setSongs(fetchedSongs);
   
      if (fetchedSongs.length > 0) {
        setCurrentSong(fetchedSongs[0]);
      }
    } catch (error) {
      console.error('Fetching song details failed:', error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  const handleSongTimer = (event) => {
    const currentTime = event.target.currentTime;
    const duration = event.target.duration;
    const percentage = Math.round((100 * currentTime) / duration);

    setSongState({
      ...songState,
      currentTime: currentTime,
      duration: duration,
      seekbarPercentage: percentage,
    });
  };

  const handleChangeSong = (direction) => {
    let index = songs.findIndex((song) => song.id === currentSong.id);

    if (direction === "next") {
      if (isPlaylistRepeat && index === songs.length - 1) {
        setCurrentSong(songs[0]);
      } else if (index < songs.length - 1) {
        setCurrentSong(songs[index + 1]);
      }

      setButtonStatus({
        next: index < songs.length - 1 || isPlaylistRepeat,
        previous: true,
      });
    }

    if (direction === "previous") {
      if (isPlaylistRepeat && index === 0) {
        setCurrentSong(songs[songs.length - 1]);
      } else if (index > 0) {
        setCurrentSong(songs[index - 1]);
      }

      setButtonStatus({
        next: true,
        previous: index > 0 || isPlaylistRepeat,
      });
    }
  };

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isLibOpen ? "ml-80" : ""
      }`}
    >
      <Nav isLibOpen={isLibOpen} setIsLibOpen={setIsLibOpen} />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        songs={songs}
        currentSong={currentSong}
        songState={songState}
        setSongState={setSongState}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        nextSong={() => handleChangeSong("next")}
        prevSong={() => handleChangeSong("previous")}
        buttonStatus={buttonStatus}
        isPlaylistRepeat={isPlaylistRepeat}
        setIsPlaylistRepeat={setIsPlaylistRepeat}
      />
      <Library
        songs={songs}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        setIsPlaying={setIsPlaying}
        isLibOpen={isLibOpen}
        setIsLibOpen={setIsLibOpen}
      />
      <audio
        ref={audioRef}
        src={currentSong ? currentSong.preview_url : ""}
        onTimeUpdate={handleSongTimer}
        onLoadedMetadata={handleSongTimer}
        onEnded={() => handleChangeSong("next")}
      ></audio>
    </div>
  );
}

export default App;

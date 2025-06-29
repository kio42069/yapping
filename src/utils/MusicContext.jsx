import React, { createContext, useState, useContext } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [customTrack, setCustomTrack] = useState(null);

  return (
    <MusicContext.Provider value={{ customTrack, setCustomTrack }}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);

import React, { createContext, useState } from 'react';

const TitleContext = createContext();

const TitleProvider = ({ children }) => {
  const [title, setTitle] = useState("Title");

  const [searchTerm, setSearchTerm] = useState(""); //globalsearch

  return (
    <TitleContext.Provider value={{ title, setTitle,searchTerm, setSearchTerm }}>
      {children}
    </TitleContext.Provider>
  );
};

export { TitleContext, TitleProvider };

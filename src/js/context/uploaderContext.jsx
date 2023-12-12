import { createContext, useContext, useState } from 'react';

export const UploaderContext = createContext();

export const useUploaderContext = () => useContext(UploaderContext);

const UploaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const resetProgress = () => {
    setProgress(0);
  };

  return (
    <UploaderContext.Provider value={{ progress, setProgress, resetProgress, loading, setLoading }}>
      {children}
    </UploaderContext.Provider>
  );
};

export default UploaderProvider;

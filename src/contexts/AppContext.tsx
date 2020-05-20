import React, { createContext, useState } from 'react';

interface Repository {
  name: string;
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

interface AppProps {
  favorites: Repository[];
  setFavorites: React.Dispatch<React.SetStateAction<Repository[]>>;
}

const AppContext = createContext<AppProps>({
  favorites: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setFavorites: () => {},
});

function AppProvider(props: { children: React.ReactNode }): JSX.Element {
  const [favorites, setFavorites] = useState<Repository[]>(() => {
    const storagedRepositories = localStorage.getItem(
      '@Githubexplorer:repositories'
    );

    if (storagedRepositories) return JSON.parse(storagedRepositories);
    return [];
  });

  const providerValue = { favorites, setFavorites };

  return (
    <AppContext.Provider value={providerValue}>
      {props.children}
    </AppContext.Provider>
  );
}

export { AppProvider, AppContext };

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export type LocalUserContextValue =
  | { isLoading: true }
  | { isLoading: false; isError: true }
  | {
      isLoading: false;
      isError: false;
      id: null;
    }
  | {
      isLoading: false;
      isError: false;
      id: string;
    };

const LOCAL_USERID_KEY = "local_user_id";

const LocalUserContext = createContext<LocalUserContextValue>({
  isLoading: true,
});

let _setLocalUser: React.Dispatch<
  React.SetStateAction<LocalUserContextValue>
> | null = null;

export function setLocalUser(id: string) {
  void SecureStore.setItemAsync(LOCAL_USERID_KEY, id);
  _setLocalUser?.({ isLoading: false, isError: false, id });
}

export function clearLocalUser() {
  void SecureStore.deleteItemAsync(LOCAL_USERID_KEY);
  _setLocalUser?.({ isLoading: false, isError: false, id: null });
}

export function LocalUserContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [localUser, setLocalUserState] = useState<LocalUserContextValue>({
    isLoading: true,
  });

  useEffect(() => {
    _setLocalUser = setLocalUserState;
    void SecureStore.getItemAsync(LOCAL_USERID_KEY)
      .then((value) => {
        setLocalUserState({ isLoading: false, isError: false, id: value });
      })
      .catch((err) => {
        setLocalUserState({ isLoading: false, isError: true });
        console.error(err);
      })
      .finally(() => {
        SplashScreen.hideAsync();
      });
    return () => {
      _setLocalUser = null;
    };
  }, []);

  return (
    <LocalUserContext.Provider value={localUser}>
      {children}
    </LocalUserContext.Provider>
  );
}

export function useLocalUser() {
  const localUser = useContext(LocalUserContext);
  return localUser;
}

export function useLoadedLocalUser() {
  const localUser = useContext(LocalUserContext);
  if (localUser.isLoading || localUser.isError) {
    throw new Error("useLodedLocalUser once id is loaded");
  }
  return { id: localUser.id };
}

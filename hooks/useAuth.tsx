import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (user: string, pass: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const login = useCallback(
    async (user: string, pass: string): Promise<boolean> => {
      // Static credentials
      if (user === "anindoroy112@gmail.com" && pass === "123456") {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call
        localStorage.setItem("isLoggedIn", "true");
        setIsLoggedIn(true);
        return true;
      }
      return false;
    },
    []
  );

  const logout = useCallback(() => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

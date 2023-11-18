import { createContext, useContext, ReactNode, FC, useState } from "react";
import { registerRequest } from "../api/auth"; 
import { FieldValues } from "react-hook-form";
import { isAxiosError } from "axios";

interface AuthContextProps {
  user: FieldValues | null;
  signup: (user: FieldValues) => void;
  isAuthenticated: boolean,
  errors: []
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context) throw new Error("useAuth must be used within a AuthProvider")
  return context
}

export const AuthProvider: FC<{children: ReactNode}> = ({children})=>{
  const [user, setUser] = useState<FieldValues | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [errors, setError] = useState<[]>([])
  const signup = async (user: FieldValues) => {
    try {
      const res = await registerRequest(user);
        console.log(res.data)
        setUser(res.data);
        setIsAuthenticated(true)
    } catch (error: unknown ) {
      if(isAxiosError(error)){
        setError(error.response?.data)
      }
      console.log(error)
    }
  };

  const contextValue: AuthContextProps = {
    user, 
    signup,
    isAuthenticated,
    errors
  }

  return (
    <AuthContext.Provider 
    value={contextValue}>
      {children}
    </AuthContext.Provider>
  )

}




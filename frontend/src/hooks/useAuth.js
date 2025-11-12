import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Import the context object

/**
 * This file exports ONLY the custom hook.
 * All components will import this hook to get the auth state.
 */
export const useAuth = () => {
  return useContext(AuthContext);
};
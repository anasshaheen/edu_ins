import { verifyToken, decodeToken, getUser } from './';

interface AuthState {
  user: string | undefined;
  isLoggedIn: boolean;
}

async function validateToken(token: string): Promise<AuthState> {
  if (!verifyToken(token)) {
    return { user: undefined, isLoggedIn: false };
  }

  const {
    payload: { email },
  } = decodeToken(token);

  return await getUser(email);
}

export default validateToken;

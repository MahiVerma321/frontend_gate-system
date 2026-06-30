import jwt from 'jsonwebtoken';

export interface AuthData {
    userId:string;
    name:string;
    email:string;
}

export function verifyToken(token: string): AuthData | null {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as jwt.JwtPayload;

        return{
    userId:decoded.userId,
    name:decoded.name,
    email:decoded.email
}
    }
    catch (e) {
        console.log('Token verification failed', e);
        return null;
    }
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("securevision-user");

  sessionStorage.removeItem("token");
  sessionStorage.removeItem("securevision-user");
}
import { IUser } from "../api/models/user.model";

declare global {
  namespace Express {
    interface Request {
      user: IUser
    }

    interface Response {
      sendJSONResponse: (status: number, data?: object, message?: string) => void;
      ok: (data?: object) => void;
      created: (data?: object) => void;
      noContent: () => void;
      badRequest: (message?: string) => void;
      unauthorized: (message?: string) => void;
      forbidden: (message?: string) => void;
      notFound: (message?: string) => void;
      internalServerError: (message?: string) => void;
      redirectTo: (redirectTo: string, data?: object) => void;
    }
  }
}

declare module 'socket.io' {
  interface Socket {
    user?: IUser;
  }
}
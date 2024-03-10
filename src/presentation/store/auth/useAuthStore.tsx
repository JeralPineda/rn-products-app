import {create} from "zustand";
import {authLogin} from "../../../actions/auth";
import {User} from "../../../domain/entities/user";
import {AuthStatus} from "../../../infrastructure/interfaces/auth.status";

export interface LoginData {
  ok: boolean;
  message?: string[];
}

export interface Authstate {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<LoginData>;
}

export const useAuthStore = create<Authstate>()(set => ({
  status: "checking",
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);

    if (!resp.ok) {
      set({status: "checking", token: undefined, user: undefined});
      return {ok: resp.ok, message: resp?.message};
    }

    //TODO Save token and user in storage
    console.log(
      "🚀 useAuthStore.tsx -> #36 -> resp ~",
      JSON.stringify(resp, null, 2),
    );

    set({status: "authenticated", token: resp?.token, user: resp?.user});

    return {ok: resp.ok, message: resp?.message};
  },
}));

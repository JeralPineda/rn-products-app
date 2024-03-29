import {create} from "zustand";
import {authCheckStatus, authLogin, authRegister} from "../../../actions/auth";
import {User} from "../../../domain/entities/user";
import {AuthStatus} from "../../../infrastructure/interfaces/auth.status";
import {StorageAdapter} from "../../../config/adapters/async-storage";

export interface LoginData {
  ok: boolean;
  message?: string[];
}

export interface Authstate {
  status: AuthStatus;
  token?: string;
  user?: User;

  login: (email: string, password: string) => Promise<LoginData>;
  register: (
    email: string,
    password: string,
    fullName: string,
  ) => Promise<LoginData>;
  checkStatus: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<Authstate>()(set => ({
  status: "checking",
  token: undefined,
  user: undefined,

  login: async (email: string, password: string) => {
    const resp = await authLogin(email, password);

    if (!resp?.ok) {
      set({status: "unauthenticated", token: undefined, user: undefined});
      return {ok: resp.ok, message: resp?.message};
    }

    //* Save token and user in storage - async storage
    await StorageAdapter.setItem("token", resp?.token!);

    set({status: "authenticated", token: resp?.token, user: resp?.user});

    return {ok: resp.ok, message: resp?.message};
  },

  register: async (email: string, password: string, fullName: string) => {
    const resp = await authRegister(email, password, fullName);

    if (!resp?.ok) {
      set({status: "unauthenticated", token: undefined, user: undefined});
      return {ok: resp.ok, message: resp?.message};
    }

    //* Save token and user in storage - async storage
    await StorageAdapter.setItem("token", resp?.token!);

    set({status: "authenticated", token: resp?.token, user: resp?.user});

    return {ok: resp.ok, message: resp?.message};
  },

  checkStatus: async () => {
    const resp = await authCheckStatus();

    if (!resp?.ok) {
      set({status: "unauthenticated", token: undefined, user: undefined});
      return;
    }

    //* Save token and user in storage - async storage
    await StorageAdapter.setItem("token", resp?.token!);

    set({status: "authenticated", token: resp?.token, user: resp?.user});
  },

  logout: async () => {
    await StorageAdapter.removeItem("token");
    set({status: "unauthenticated", token: undefined, user: undefined});
  },
}));

import {tesloApi} from "../../config/api/tesloApi";
import {User} from "../../domain/entities/user";
import {
  AuthDataResult,
  AuthResponse,
} from "../../infrastructure/interfaces/auth.response";

const returnUserToken = (data: AuthResponse) => {
  const user: User = {
    id: data.id,
    email: data.email,
    fullName: data.fullName,
    isActive: data.isActive,
    roles: data.roles,
  };

  return {
    user: user,
    token: data.token,
  };
};

export const authLogin = async (
  email: string,
  password: string,
): Promise<AuthDataResult> => {
  email = email.toLocaleLowerCase();

  try {
    const {data} = await tesloApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    return {...returnUserToken(data), ok: true};
  } catch (error: any) {
    console.log(
      "🚀 index.ts -> #38 -> error ~",
      JSON.stringify(error, null, 2),
    );
    const message =
      error?.response?.data && Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message
        : [error?.response?.data?.message] || [
            "Las credenciales son invalidas",
          ];

    return {ok: false, message, user: undefined, token: undefined};
  }
};

export const authRegister = async (
  email: string,
  password: string,
  fullName: string,
): Promise<AuthDataResult> => {
  email = email.toLocaleLowerCase();

  try {
    const {data} = await tesloApi.post<AuthResponse>("/auth/register", {
      email,
      password,
      fullName,
    });

    return {...returnUserToken(data), ok: true};
  } catch (error: any) {
    console.log(
      "🚀 index.ts -> #69 -> error ~",
      JSON.stringify(error, null, 2),
    );
    const message =
      error?.response?.data && Array.isArray(error?.response?.data?.message)
        ? error?.response?.data?.message
        : [error?.response?.data?.message] || ["Error al crear el usuario"];

    return {ok: false, message, user: undefined, token: undefined};
  }
};

export const authCheckStatus = async () => {
  try {
    const {data} = await tesloApi.get<AuthResponse>("/auth/check-status");
    return {...returnUserToken(data), ok: true};
  } catch (error) {
    console.log(
      "🚀 index.ts -> #89 -> error ~",
      JSON.stringify(error, null, 2),
    );
    return null;
  }
};

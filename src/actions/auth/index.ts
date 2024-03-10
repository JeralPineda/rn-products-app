import {tesloApi} from "../../config/api/tesloApi";
import {User} from "../../domain/entities/user";
import {AuthResponse} from "../../infrastructure/interfaces/auth.response";

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

export const authLogin = async (email: string, password: string) => {
  email = email.toLocaleLowerCase();

  try {
    const {data} = await tesloApi.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    return returnUserToken(data);
  } catch (error) {
    console.log("🚀 index.ts -> #5 -> error ~", JSON.stringify(error, null, 2));
    return null;
  }
};

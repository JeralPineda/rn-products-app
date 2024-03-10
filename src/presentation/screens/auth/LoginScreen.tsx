import React, {useState} from "react";
import {Button, Layout, Text} from "@ui-kitten/components";
import {ScrollView, StyleSheet, useWindowDimensions} from "react-native";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Logo} from "../../components/ui/Logo";
import {LoginSchema} from "../../../utils/validators/login";
import LoginInput from "../../components/auth/InputLogin";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParams} from "../../navigation/StackNavigator";
import {useAuthStore, useUistore} from "../../store";

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginScreenProps
  extends StackScreenProps<RootStackParams, "LoginScreen"> {}

export const LoginScreen = ({navigation}: LoginScreenProps) => {
  const [isPosting, setIsPosting] = useState(false);
  const {height} = useWindowDimensions();
  const addNotification = useUistore(state => state.addNotification);
  const login = useAuthStore(state => state.login);

  const {control, handleSubmit, watch} = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
  });

  const {email} = watch();

  const onSubmit = async (data: LoginFormData) => {
    setIsPosting(true);
    const resp = await login(data.email, data.password);
    setIsPosting(false);
    if (!resp.ok) {
      return addNotification({
        message: resp?.message!,
        type: "error",
      });
    }
  };

  return (
    <Layout style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        <Logo styleContainer={{marginTop: height * 0.25}} />

        {/* LoginBox */}
        <Layout style={styles.loginBox}>
          <LoginInput
            //
            control={control}
            label="Correo"
            name="email"
            rules={{required: "Correo es requerido"}}
          />
          <LoginInput
            //
            control={control}
            label="Contraseña"
            name="password"
            type="password"
            rules={{required: "Usuario es requerido"}}
            username={email}
          />

          {/* Button */}
          <Layout style={styles.buttonContainer}>
            <Button
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
              disabled={isPosting}>
              Ingresar
            </Button>
          </Layout>

          {/* Crear cuenta */}
          <Layout style={styles.info}>
            <Text>¿No tienes una cuenta?</Text>
            <Text
              status="primary"
              category="s1"
              onPress={() => navigation.navigate("RegisterScreen")}>
              Regístrate
            </Text>
          </Layout>
        </Layout>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    marginHorizontal: 30,
  },
  loginBox: {
    marginTop: 10,
    gap: 10,
  },
  buttonContainer: {
    marginTop: 25,
  },
  button: {
    paddingVertical: 15,
  },
  info: {
    flex: 1,
    flexDirection: "row",
    gap: 10,
    marginTop: 10,
    justifyContent: "center",
  },
});

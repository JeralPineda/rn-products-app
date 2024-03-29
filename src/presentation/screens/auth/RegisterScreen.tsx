import React, {useState} from "react";
import {Button, Layout, Text} from "@ui-kitten/components";
import {ScrollView, StyleSheet, useWindowDimensions} from "react-native";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {RegisterSchema} from "../../../utils/validators/login";
import LoginInput from "../../components/auth/InputLogin";
import {StackScreenProps} from "@react-navigation/stack";
import {RootStackParams} from "../../navigation/StackNavigator";
import {Logo} from "../../components/ui/Logo";
import {useAuthStore, useUistore} from "../../store";

interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
}

interface LoginScreenProps
  extends StackScreenProps<RootStackParams, "RegisterScreen"> {}

export const RegisterScreen = ({navigation}: LoginScreenProps) => {
  const [isPosting, setIsPosting] = useState(false);
  const addNotification = useUistore(state => state.addNotification);
  const register = useAuthStore(state => state.register);
  const {height} = useWindowDimensions();

  const {control, handleSubmit, watch} = useForm<RegisterFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(RegisterSchema),
  });

  const {email} = watch();

  const onSubmit = async (data: RegisterFormData) => {
    setIsPosting(true);
    const resp = await register(data.email, data.password, data.fullName);
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
        <Logo styleContainer={{marginTop: height * 0.13}} />

        {/* LoginBox */}
        <Layout style={[styles.loginBox]}>
          <LoginInput
            //
            control={control}
            label="Nombre"
            name="fullName"
            rules={{required: "Correo es requerido"}}
          />
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
              disabled={isPosting}
              style={styles.button}
              onPress={handleSubmit(onSubmit)}>
              Crear cuenta
            </Button>
          </Layout>

          {/* Crear cuenta */}
          <Layout style={styles.info}>
            <Text>¿Ya tienes una cuenta?</Text>
            <Text
              status="primary"
              category="s1"
              onPress={() => navigation.goBack()}>
              Ingresar
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

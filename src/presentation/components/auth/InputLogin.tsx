/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Platform, TextInput, Keyboard} from "react-native";
import React, {useRef, useState} from "react";
import {Controller} from "react-hook-form";
import {LoginInputProps} from "../../../types/form";
import {Input, Layout, Text} from "@ui-kitten/components";
import {TouchableWithoutFeedback} from "@ui-kitten/components/devsupport";
import Icon from "../ui/Icon";

export default function LoginInput({
  control,
  label,
  name,
  type,
  rules,
  handleSubmit,
  username,
}: LoginInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const inputRef = useRef<Input | null>(null);

  const handleSubmitting = (text: string) => {
    if (username && text) {
      handleSubmit && handleSubmit();
    } else {
      Keyboard.dismiss();
    }
  };

  const renderInputIcon = (): React.ReactElement => (
    <TouchableWithoutFeedback onPress={() => setShowPassword(prev => !prev)}>
      <Icon name={showPassword ? "eye" : "eye-off"} />
    </TouchableWithoutFeedback>
  );

  return (
    <Controller
      rules={rules}
      control={control}
      name={name}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) =>
        type !== "password" ? (
          <Layout>
            <Input
              textStyle={styles.inputStyled}
              placeholder={label}
              status={error ? "danger" : "basic"}
              value={value}
              onChangeText={text => {
                onChange(text);
              }}
              onBlur={onBlur}
              keyboardType="email-address"
              spellCheck={false}
              autoCorrect={false}
              returnKeyType="done"
              autoCapitalize="none"
            />

            {error && <Text style={styles.errorMessage}>{error?.message}</Text>}
          </Layout>
        ) : (
          <Layout>
            <Input
              textStyle={styles.inputStyled}
              secureTextEntry={!showPassword}
              accessoryRight={renderInputIcon}
              placeholder={label}
              status={error ? "danger" : "basic"}
              value={value}
              onChangeText={text => {
                onChange(text);
              }}
              onBlur={onBlur}
              spellCheck={false}
              autoCorrect={false}
              returnKeyType="done"
              autoCapitalize="none"
              onSubmitEditing={event =>
                handleSubmitting(event.nativeEvent.text)
              }
              ref={inputRef}
            />

            {error && <Text style={styles.errorMessage}>{error?.message}</Text>}
          </Layout>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  inputStyled: {
    paddingVertical: Platform.OS === "ios" ? 10 : 6,
  },
  textLabel: {
    fontSize: 12,
    marginLeft: 10,
    color: "#919191",
  },
  errorMessage: {
    marginVertical: 10,
    color: "#CF3341",
    textAlign: "left",
    marginLeft: 20,
  },
});

/* eslint-disable @typescript-eslint/no-unused-vars */
import {StyleSheet, Platform, TextInput, Keyboard} from "react-native";
import React, {useRef, useState} from "react";
import {Controller} from "react-hook-form";
import {Input, Layout, Text} from "@ui-kitten/components";
import {ProductInputProps} from "../../../../types/form";

export default function FormInput({
  control,
  label,
  name,
  type,
  rules,
  defaultValue,
  multiline = false,
  numberOfLines = 0,
  styleInput,
}: ProductInputProps) {
  const inputRef = useRef(null);

  return (
    <Controller
      rules={rules}
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({
        field: {value, onChange, onBlur, ref},
        fieldState: {error},
      }) => (
        <Layout style={{...styleInput, marginVertical: 5}}>
          <Input
            label={label}
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
            ref={inputRef}
            multiline={multiline ?? undefined}
            numberOfLines={multiline ? numberOfLines : undefined}
          />

          {error && <Text style={styles.errorMessage}>{error?.message}</Text>}
        </Layout>
      )}
    />
  );
}

const styles = StyleSheet.create({
  inputStyled: {
    // paddingVertical: Platform.OS === "ios" ? 6 : 2,
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

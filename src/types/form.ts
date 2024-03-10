import { Control, FieldPath, FieldValues } from "react-hook-form";
import { KeyboardTypeOptions, StyleProp, ViewStyle } from "react-native";

export interface InputProps<T extends FieldValues> {
  title: string;
  subtitle?: string;
  type?: KeyboardTypeOptions;
  containerType?: "top" | "middle" | "bottom";
  control: Control<T>;
  disableMargin?: boolean;
  placeholder?: string;
  containerStyle?: StyleProp<ViewStyle>;
  name: FieldPath<T>;
  defaultValue?: any;
  autoFocus?: boolean;
  secureTextEntry?: boolean;
  disable?: boolean;
  selectTextOnFocus?: boolean;
  currency?: string;
  required?: boolean;
  output?: "string" | "number";
  trim?: boolean;
  mask?: string;
  onPress?: (value: string | number) => void;
  maxValue?: number;
  subtitle2?: string;
}

export interface LoginInputProps {
  control: Control<any>;
  label: string;
  name: string;
  type?: string;
  rules: { required: string };
  username?: string;
  handleSubmit?: () => void;
}


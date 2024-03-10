import "react-native";
import {ImageStyle, TextStyle, ViewStyle} from "react-native";

declare module "react-native" {
  namespace StyleSheet {
    type Style = ViewStyle | TextStyle | ImageStyle;
    type NamedStyless<T> = {[P in keyof T]: Style};

    /**
     * Creates a StyleSheet style reference from the given object.
     */
    export function create<T, S extends NamedStyless<S> | NamedStyless<any>>(
      styles: T | NamedStyless<S>,
    ): T & S;
  }
}

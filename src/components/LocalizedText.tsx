import React from 'react';
import { Text as NativeText, TextInput as NativeInput, TextProps, TextInputProps } from 'react-native';
import { useDisplayPreferences } from '../displayPreferences';
import { translate } from '../domain/translations';
export function Text({ children, localize = true, ...props }: TextProps & { localize?: boolean }) {
  const { language } = useDisplayPreferences();
  const map = (node: React.ReactNode): React.ReactNode => typeof node === 'string' ? translate(node, language) : Array.isArray(node) ? node.map(map) : node;
  return <NativeText {...props} accessibilityLabel={props.accessibilityLabel ? translate(props.accessibilityLabel, language) : undefined}>{localize ? map(children) : children}</NativeText>;
}
export type TextInput = NativeInput;
export const TextInput = React.forwardRef<NativeInput, TextInputProps>(function TextInput(props, ref) {
  const { language } = useDisplayPreferences();
  return <NativeInput ref={ref} {...props} placeholder={props.placeholder ? translate(props.placeholder, language) : undefined} accessibilityLabel={props.accessibilityLabel ? translate(props.accessibilityLabel, language) : undefined} />;
});

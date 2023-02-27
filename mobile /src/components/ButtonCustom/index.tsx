import React from 'react';

import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import {styles} from './styles';

interface Props {
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  buttonLoading?: boolean;
  indicatorColor?: string;
  onPress(): void;
  textButton?: string;
  opacity?: number;
  disabled?: boolean;
}

const ButtonCustom = (props: Props) => {
  const {
    buttonStyle,
    textStyle,
    buttonLoading,
    indicatorColor,
    onPress,
    textButton,
    opacity = 0.2,
    disabled = false,
  } = props;
  const RenderLoading = () => {
    return (
      <View style={{position: 'absolute', opacity: buttonLoading ? 0.8 : 1}}>
        <ActivityIndicator
          size="small"
          color={indicatorColor || '#fff'}
          animating
        />
      </View>
    );
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={[styles.button, buttonStyle, {opacity: buttonLoading ? 0 : 1}]}
      activeOpacity={opacity}
      onPress={() => !buttonLoading && onPress()}>
      {buttonLoading && RenderLoading()}
      <Text
        style={[
          styles.buttonText,
          textStyle,
          {opacity: buttonLoading ? 0.3 : 1},
        ]}
        allowFontScaling
        maxFontSizeMultiplier={1}>
        {textButton}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonCustom;

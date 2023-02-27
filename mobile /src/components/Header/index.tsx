import React from 'react';
import {View, Text} from 'react-native';

import {styles} from './styles';

type IHeader = {
  title: string;
};

export function Header({title}: IHeader) {
  return (
    <View style={styles.wrapper_header}>
      <Text style={styles.header_text}>{title}</Text>
    </View>
  );
}

import React from 'react';
import {Image, Text, TouchableOpacity, View, Modal} from 'react-native';

import {styles} from './styles';
import close from '../../../assets/fechar.png';
import {IUser} from '../../../pages/UsersList';

type IDetailsUser = {
  item: IUser;
  open: boolean;
  handleClose: () => void;
};

export function DetailsUser({open, item, handleClose}: IDetailsUser) {
  return (
    <Modal visibility animationType="slide" visible={open}>
      <View style={styles.container}>
        <View style={styles.header_wrapper}>
          <Text style={styles.header_text}>Detalhes do perfil</Text>
          <TouchableOpacity onPress={handleClose}>
            <Image source={close} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>Nome: {item?.name}</Text>
          <Text style={styles.subtitle}>E-mail: {item?.email}</Text>
          <Text style={styles.subtitle}>Telefone: {item?.phone}</Text>
          <Text style={styles.subtitle}>Website: {item?.website}</Text>
          <Text style={styles.subtitle}>Empresa: {item?.company.name}</Text>
          <Text style={styles.subtitle}>
            Endereço: {item?.address?.street}, {item?.address?.suite},
            {item?.address?.city}
          </Text>
        </View>
      </View>
    </Modal>
  );
}

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import {api} from '../../services/api';
import {Header} from '../../components/Header';
import ButtonCustom from '../../components/ButtonCustom';
import {DetailsUser} from '../../components/Modals/DetailsUser';

export type IUser = {
  email: string;
  username: string;
  name: string;
  website: string;
  phone: string;
  id: number;
  company: {
    name: string;
    bs: string;
    catchPhrase: string;
  };
  address: {
    street: string;
    suite: string;
    zipcode: string;
    city: string;
    geo: {
      lat: string;
      long: string;
    };
  };
};

export function UsersList() {
  const {goBack} = useNavigation();

  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectDetailsUser, setSelectDetailsUser] = useState<IUser>({});

  useEffect(() => {
    api
      .get('/users')
      .then(response => {
        setUsers(response.data);
      })
      .catch(() => {
        Alert.alert(
          'Ops...',
          'Houve um erro interno, tente novamente mais tarde',
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function RenderUsers({item, onPress}) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={styles.wrapper_user}>
          <Text style={styles.title}>Nome: {item.name}</Text>
          <Text style={styles.subtitle}>Username: {item.username}</Text>
          <Text style={styles.subtitle}>E-mail: {item.email}</Text>
          <Text style={styles.subtitle}>Telefone: {item.phone}</Text>
          <Text style={styles.subtitle}>Website: {item.website}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <Header title="Usuários" />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#fe4e28" />
        ) : (
          <FlatList
            data={users}
            renderItem={({item}) => (
              <RenderUsers
                item={item}
                onPress={() => {
                  setSelectDetailsUser(item);
                  setTimeout(() => {
                    setModalOpen(true);
                  }, 350);
                }}
              />
            )}
          />
        )}
      </View>

      <View style={styles.wrapper_button}>
        <ButtonCustom textButton="Posts" onPress={() => goBack()} />
        <ButtonCustom textButton="Usuários" onPress={() => {}} />
      </View>
      {selectDetailsUser.id && (
        <DetailsUser
          open={modalOpen}
          item={selectDetailsUser}
          handleClose={() => setModalOpen(false)}
        />
      )}
    </View>
  );
}

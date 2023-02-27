import React, {useState, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,
  Modal,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';

import {styles} from './styles';
import {api} from '../../../services/api';
import {IPost} from '../../../pages/PostList';
import close from '../../../assets/fechar.png';

type IRenderList = {
  item: IPost;
  open: boolean;
  handleClose: () => void;
};

type IComments = {
  body: string;
  name: string;
  email: string;
  id: number;
  userId: number;
};

export function Comments({open, item, handleClose}: IRenderList) {
  const [comments, setComments] = useState<IComments[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    callApi();
  }, [item?.id]);

  function callApi() {
    api
      .get(`/posts/${item?.id}/comments`)
      .then(response => {
        setComments(response.data);
      })
      .catch(err => {
        Alert.alert(
          'Ops...',
          'Houve um erro interno, tente novamente mais tarde',
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Modal visibility animationType="slide" visible={open}>
      <View style={styles.container}>
        <View style={styles.header_wrapper}>
          <Text style={styles.header_text}>Comentários</Text>
          <TouchableOpacity onPress={handleClose}>
            <Image source={close} />
          </TouchableOpacity>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#fe4e28" />
        ) : (
          <FlatList
            data={comments}
            renderItem={({item}) => (
              <>
                <View style={styles.comments_wrapper}>
                  <Text style={styles.title}>Nome: {item?.name}</Text>
                  <Text style={styles.subtitle}>E-mail: {item?.email}</Text>
                  <Text style={styles.subtitle}>{item?.body}</Text>
                </View>
              </>
            )}
          />
        )}
      </View>
    </Modal>
  );
}

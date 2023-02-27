import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';

import {useNavigation} from '@react-navigation/native';

import {styles} from './styles';
import {api} from '../../services/api';
import {Header} from '../../components/Header';
import ButtonCustom from '../../components/ButtonCustom';
import {Comments} from '../../components/Modals/Comments';

export type IPost = {
  body: string;
  title: string;
  id: number;
  userId: number;
};

type IRenderPosts = {
  item: IPost;
  onPress: () => void;
};

export function PostList() {
  const {navigate} = useNavigation();

  const [post, setPosts] = useState<IPost[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectComments, setSelectComments] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/posts')
      .then(response => {
        setPosts(response.data);
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

  function RenderPosts({item, onPress}: IRenderPosts) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View style={styles.wrapper_post}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.subtitle}>{item?.body}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <Header title="Posts" />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#fe4e28" />
        ) : (
          <FlatList
            data={post}
            renderItem={({item}) => (
              <RenderPosts
                item={item}
                onPress={() => {
                  setSelectComments(item);
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
        <ButtonCustom textButton="Posts" onPress={() => {}} />
        <ButtonCustom
          textButton="Usuários"
          onPress={() => navigate('UsersList')}
        />
      </View>
      <Comments
        open={modalOpen}
        item={selectComments}
        handleClose={() => setModalOpen(false)}
      />
    </View>
  );
}

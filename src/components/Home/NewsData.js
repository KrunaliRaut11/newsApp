import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

const VerticalScroll = ({item, index}) => {
  return (
    <>
      <View style={styles.newsCard}>
        <Image source={{uri: item.urlToImage}} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.title}</Text>
      </View>
    </>
  );
};
const HorizontalScroll = ({item, index}) => {
  return (
    <>
      <View style={styles.newsCardHorizontal}>
        <Image source={{uri: item.urlToImage}} style={styles.imageHorizontal} />
        <Text style={styles.titleHorizontal}>{item.title}</Text>
        <Text style={styles.descHorizontal}>{item.title}</Text>
      </View>
    </>
  );
};

const NewsData = () => {
  const [articles, setArticles] = useState();
  const [isLoaded, setIsLoaded] = useState(true);

  const getNewsData = async () => {
    try {
      const resp = await fetch(
        'https://newsapi.org/v2/everything?q=apple&from=2022-07-14&to=2022-07-14&sortBy=popularity&apiKey=3de0bc1610c142f1ac661a7d39006978',
      );
      const myData = await resp.json();
      setArticles(myData.articles);
      setIsLoaded(false);
      //   console.log(myData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getNewsData();
  }, []);

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.heading}>Horizontal FlatList</Text>
          <FlatList
            data={articles}
            renderItem={HorizontalScroll}
            keyExtractor={item => item.source.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
          <Text style={styles.heading}>Vertical FlatList</Text>
          <FlatList
            data={articles}
            renderItem={VerticalScroll}
            keyExtractor={item => item.source.id}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 26,
    marginTop: 18,
    fontWeight: '900',
    color: '#000',
    textAlign: 'center',
  },
  container: {
    backgroundColor: '#f4f4f4',
  },
  newsCard: {
    margin: 20,
    padding: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    // height: '100%',
  },
  title: {
    fontSize: 20,
    marginTop: 18,
    fontWeight: '600',
    color: '#000',
  },
  image: {
    width: 250,
    height: 250,
  },
  desc: {
    fontSize: 16,
    marginTop: 18,
    color: '#000',
  },
  newsCardHorizontal: {
    margin: 20,
    padding: 20,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 400,
    width: 360,
  },
  titleHorizontal: {
    fontSize: 20,
    marginTop: 18,
    fontWeight: '600',
    color: '#000',
  },
  imageHorizontal: {
    width: 150,
    height: 150,
  },
  descHorizontal: {
    fontSize: 16,
    marginTop: 18,
    color: '#000',
  },
});

export default NewsData;

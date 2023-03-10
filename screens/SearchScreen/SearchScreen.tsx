import { 
  ActivityIndicator,
  StyleSheet, 
  FlatList, 
  TextInput,
  Button,
  TouchableOpacity,
 } from 'react-native';

import { RootStackScreenProps } from '../../types';
import { Text, View } from '../../components/Themed';
import { useLazyQuery } from '@apollo/client';
import BookItem from '../../components/BookItem';
import { useState } from "react";
import { query } from './queries';


export default function SearchScreen({ navigation }: RootStackScreenProps<'Root'>) {
  const [search, setSearch] = useState("");
  const [provider, setProvider] = useState <
  "googleBooksSearch" | "openLibrarySearch"
  >("googleBooksSearch");

  const [runQuery ,{data, loading, error}] = useLazyQuery(query);


  const parseBook = (item: any): Book => {
    if (provider === "googleBooksSearch"){
      return {
        image: item.volumeInfo.imageLinks?.thumbnail, 
        title: item.volumeInfo.title, 
        authors: item.volumeInfo.authors, 
        isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier,
      };
    }
    return {
      image: `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
      title: item.title,
      authors: item.author_name,
      isbn: item.isbn?.[0],
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput 
          value={search}
          onChangeText={setSearch}
          placeholder="Search..." 
          style={styles.input} 
          />
        <Button title="Search" onPress={() => runQuery({ variables: { q: search } })}
        />
      </View>

      <View style={styles.tabs}>
        <Text 
        style={
          provider === "googleBooksSearch" 
          ? {fontWeight: "bold", color: "royalblue"} 
          : {} 
        }
        onPress={() => setProvider("googleBooksSearch")}
      >
        Google Books
      </Text>
        <Text 
        style={
          provider === "openLibrarySearch" 
          ? {fontWeight: "bold", color: "royalblue"} 
          : {} 
        }
        onPress={() => setProvider("openLibrarySearch")}
        >
          Open Library</Text>
      </View>

      {loading && <ActivityIndicator />}
      {error && (
        <>
        <Text>Error fetching books</Text>
        <Text>{error.message}</Text>
        </>
      )}
      <FlatList 
        data={
          provider === 'googleBooksSearch'
            ? data?.googleBooksSearch?.items
            : data?. openLibrarySearch?.docs || []
          }
        showsVerticalScrollIndicator = {false}
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => navigation.navigate("DetailsScreen")}> <BookItem  book = {parseBook(item)} /></TouchableOpacity>
        ) }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gainsboro",
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
  tabs:{
    flexDirection:"row",
    justifyContent: "space-around",
    height: 50,
    alignItems: "center",
  }
});

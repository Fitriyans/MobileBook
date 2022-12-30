import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import BookDetails from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useState } from "react";
import { query } from './SearchScreen/queries';

export default function DetailsScreen() {

  const [provider, setProvider] = useState <
  "googleBooksSearch" | "openLibrarySearch"
  >("googleBooksSearch");



  const parseDetailBook = (item: any): DetailBook => {
    if (provider === "googleBooksSearch"){
      return {
        image: item.volumeInfo.imageLinks?.thumbnail, 
        title: item.volumeInfo.title, 
        authors: item.volumeInfo.authors, 
        isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier,
        description: item.volumeInfo.description,
      };
    }
    return {
      image: `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
      title: item.title,
      authors: item.author_name,
      isbn: item.isbn?.[0],
      description: item.subject,
    };
  };

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

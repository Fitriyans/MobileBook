import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import MyBooksProvider from './context/MyBookProvider';

const API_KEY =
"nijlen::stepzen.net+1000::0f7a705089b352f58d08464c4cbd2640c3be473c33ecff6631b16d3f8b07b671";

const client = new ApolloClient ({
  uri: "https://nijlen.stepzen.net/api/mollified-mouse/__graphql",
  headers:{
    Authorization: `Apikey ${API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();


  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <MyBooksProvider>
            <Navigation colorScheme={colorScheme} />
          </MyBooksProvider>
        </ApolloProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }

  
}

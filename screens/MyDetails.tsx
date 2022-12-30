import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function MyDetails() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail my book.</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import Colors from "../constants/Colors";

type BookDetailsProps = {
  detail: DetailBook;
};

const BookDetails = ({ detail }: BookDetailsProps) => {


  return (
    <View style={styles.container}>
      <Image source={{ uri: detail.image }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{detail.title}</Text>
        <Text>By {detail.authors?.join(", ")}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    flexDirection: "row",
    marginVertical: 10,
  },
  image: {
    flex: 1,
    aspectRatio: 2 / 3,
    marginRight: 10,
  },
  contentContainer: {
    flex: 4,
    borderColor: "lightgray",
    borderBottomWidth: 0.5,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
  },

});

export default BookDetails;
import React from 'react';
import { View, Text, StyleSheet, ScrollView  } from 'react-native';

const SearchResultsScreen = ({ route }: { route: any }) => {
  const { filteredBooks } = route.params;

  return (
    <ScrollView style={styles.container}>
      {filteredBooks.map((book: any) => (
        <View key={book.id} style={styles.bookContainer}>
          <Text>ID: {book.id}</Text>
          <Text>Title: {book.title}</Text>
          <Text>Category: {book.category}</Text>
          <Text>Available: {book.available}</Text>
          <Text>Total: {book.total}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc', // Set background color to aqua
    paddingVertical: 10, // Add vertical padding
    paddingHorizontal: 20, // Add horizontal padding
  },
  bookContainer: {
    backgroundColor: 'aqua', // Set background color to aqua
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default SearchResultsScreen;

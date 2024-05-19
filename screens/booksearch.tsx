import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Book {
  id: string;
  title: string;
  category: string;
  available: number;
  total: number;
}

const BookSearchScreen = ({ navigation }: { navigation: any }) => {
  const [bookId, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [books, setBooks] = useState<Book[]>([]);

  // Fetch books data from AsyncStorage
  useEffect(() => {
    const fetchBooksData = async () => {
      try {
        const booksData = await AsyncStorage.getItem('booksData');
        if (booksData) {
          setBooks(JSON.parse(booksData));
        }
      } catch (error) {
        console.error('Error fetching books data:', error);
      }
    };

    fetchBooksData();
  }, []);

  const handleSearch = async () => {
    // Filter books based on search criteria
    const filteredBooks = books.filter(book => {
      return (
        book.category.toLowerCase().includes(category.toLowerCase()) &&
        book.title.toLowerCase().includes(title.toLowerCase())
      );
    });

    // Update available units in AsyncStorage for each filtered book
    try {
      const updatedBooks = await Promise.all(filteredBooks.map(async (book) => {
        // Check if the book is returned, decrement available units
        const issuedBooksString = await AsyncStorage.getItem('issuedBooks');
        if (issuedBooksString) {
          const issuedBooks = JSON.parse(issuedBooksString);
          const isBookReturned = issuedBooks.some((issuedBook: { bookId: string; }) => issuedBook.bookId === book.id);
          if (isBookReturned) {
            book.available--;
          }
        }
        return book;
      }));

      await AsyncStorage.setItem('filteredBooks', JSON.stringify(updatedBooks));
    } catch (error) {
      console.error('Error updating available units in search:', error);
    }

    // Navigate to the search results screen with filtered books
    navigation.navigate('SearchResults', { filteredBooks });
  };

  // Reset search fields when the screen gains focus
  useFocusEffect(
    React.useCallback(() => {
      setBookId('');
      setTitle('');
      setCategory('');
    }, [])
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Book ID"
        value={bookId}
        onChangeText={text => setBookId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={text => setTitle(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={category}
        onChangeText={text => setCategory(text)}
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default BookSearchScreen;

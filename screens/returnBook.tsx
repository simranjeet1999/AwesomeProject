import React, { useState,useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Book {
    id: string;
    title: string;
    category: string;
    available: number;
    total: number;
  }


const ReturnBookScreen = () => {
  const [bookId, setBookId] = useState('');
  const [userId, setUserId] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [books, setBooks] = useState<Book[]>([]);

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
  const handleReturnBook = async () => {
    try {
      // Retrieve issued books from AsyncStorage
      const issuedBooksString = await AsyncStorage.getItem('issuedBooks');
      if (!issuedBooksString) {
        setErrorMessage('No books have been issued.');
        return;
      }
      const issuedBooks = JSON.parse(issuedBooksString);

      // Find the book to return
      const bookIndex = issuedBooks.findIndex((book: { bookId: string; userId: string }) => book.bookId === bookId && book.userId === userId);
      if (bookIndex === -1) {
        setErrorMessage('Book not found or not issued to this user.');
        return;
      }

      // Remove the book from the list of issued books
      const returnedBook = issuedBooks.splice(bookIndex, 1)[0];

      // Find the book in booksData and increase available units
    //   const bookToUpdate = books.find((book: { id: string }) => book.id === returnedBook.bookId);
    //   if (bookToUpdate) {
    //     bookToUpdate.available++;
    //     // Save updated booksData to AsyncStorage
    //     await AsyncStorage.setItem('booksData', JSON.stringify(books));
    //   } else {
    //     console.warn('Book not found in books data.');
    //   }

      // Save updated issued books back to AsyncStorage
      await AsyncStorage.setItem('issuedBooks', JSON.stringify(issuedBooks));

      // Show success message
      setSuccessMessage('Book returned successfully');

      // Clear input fields
      setBookId('');
      setUserId('');
    } catch (error) {
      console.error('Error returning book:', error);
      setErrorMessage('An error occurred while returning the book.');
    }
  };

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
        placeholder="User ID"
        value={userId}
        onChangeText={text => setUserId(text)}
      />
      <Button title="Return Book" onPress={handleReturnBook} />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      {successMessage ? <Text style={styles.successMessage}>{successMessage}</Text> : null}
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
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
  successMessage: {
    color: 'green',
    marginBottom: 10,
  },
});

export default ReturnBookScreen;

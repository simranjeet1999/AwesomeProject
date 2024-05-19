import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the Book type
interface Book {
  bookId: string;
  title: string;
  category: string;
  issueDate: string;
}

const MyBooksScreen = () => {
  const [myBooks, setMyBooks] = useState<Book[]>([]); // Specify the type as Book[]

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        const storedBooks = await AsyncStorage.getItem('issuedBooks');
        if (storedBooks !== null) {
          setMyBooks(JSON.parse(storedBooks)); // Parse as array of Book objects
        }
      } catch (error) {
        console.error('Error fetching my books:', error);
      }
    };

    fetchMyBooks();
  }, []);

  // Function to calculate return date (7 days later)
  const calculateReturnDate = (issueDate: string) => {
    const currentDate = new Date(issueDate);
    const returnDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    return returnDate.toLocaleDateString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Issued Books</Text>
      {myBooks.map((book, index) => (
        <View key={index} style={styles.bookContainer}>
          <Text style={styles.text}>Book ID: {book.bookId}</Text>
          <Text style={styles.text}>Title: {book.title}</Text>
          <Text style={styles.text}>Category: {book.category}</Text>
          <Text style={styles.text}>Issue Date: {new Date(book.issueDate).toLocaleDateString()}</Text>
          <Text style={styles.text}>Return Date: {calculateReturnDate(book.issueDate)}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#f0f0f0', // Set background color
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333', // Set text color
  },
  bookContainer: {
    backgroundColor: 'aqua', // Set background color to aqua
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  text: {
    color: '#333', // Set text color
    marginBottom: 5,
  },
});

export default MyBooksScreen;

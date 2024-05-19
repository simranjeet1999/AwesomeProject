import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/registration';
import UserDashboardScreen from '../screens/dashboard_user';
import AdminDashboardScreen from '../screens/admindashboard';
import DashboardScreen from '../screens/dashboard_user';
import BookSearchScreen from '../screens/booksearch'; // Import the BookSearchScreen
import SearchResultsScreen from '../screens/search_results';
import IssueBookScreen from '../screens/issueBooksAdmin';
import MyBooksScreen from '../screens/seeMybooks';
import ReissueBookScreen from '../screens/ReIssueForAdmin';
import ReturnBookScreen from '../screens/returnBook';
import AddBookScreen from '../screens/addNewBook';
import RemoveBookScreen from '../screens/removeBook';
import UpdateBookScreen from '../screens/updatBook';

const Stack = createStackNavigator();

const StackNavigator = () => {
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const fetchUserType = async () => {
      const userTypeFromStorage = ''; // Fetch user type from storage
      setUserType(userTypeFromStorage);
    };

    fetchUserType();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            title: 'Register',
            headerStyle: { backgroundColor: '#1e90ff' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen} 
          options={{
            title: 'Dashboard',
            headerStyle: { backgroundColor: '#1e90ff' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="AdminDashboard"
          component={AdminDashboardScreen}
          options={{
            title: 'Admin Dashboard',
            headerStyle: { backgroundColor: '#1e90ff' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="BookSearch"
          component={BookSearchScreen}
          options={{
            title: 'Book Search',
            headerStyle: { backgroundColor: '#1e90ff' },
            headerTintColor: '#fff',
          }}
        />
         <Stack.Screen
          name="SearchResults"
          component={SearchResultsScreen}
          options={{
            title: 'Search Results',
            headerStyle: { backgroundColor: '#1e90ff' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen
          name="IssueBook"
          component={IssueBookScreen}
          options={{
            title: 'Issue Book',
            headerStyle: { backgroundColor: '#1e90ff' },
            headerTintColor: '#fff',
          }}
        />
          <Stack.Screen
          name="MyBooks"
          component={MyBooksScreen}
          options={{
            title: 'My Books',
            headerStyle: { backgroundColor: '#1e90ff' },
            headerTintColor: '#fff',
          }}
        />
          <Stack.Screen
          name="ReissueBook"
          component={ReissueBookScreen}
          options={{
            title: 'Reissue Book',
            headerStyle: { backgroundColor: '#1e90ff' },
            headerTintColor: '#fff',
          }}
        />
          <Stack.Screen
          name="ReturnBook"
          component={ReturnBookScreen}
          options={{
            title: 'Return Book',
            headerStyle: { backgroundColor: '#1e90ff' },
            headerTintColor: '#fff',
          }}
        />
          <Stack.Screen
            name="AddBook"
            component={AddBookScreen}
            options={{
              title: 'Add Book',
              headerStyle: { backgroundColor: '#1e90ff' },
              headerTintColor: '#fff',
            }}
          />
           <Stack.Screen
          name="RemoveBook"
          component={RemoveBookScreen} // Add the RemoveBookScreen component
          options={{
            title: 'Remove Book',
            headerStyle: { backgroundColor: '#1e90ff' },
            headerTintColor: '#fff',
          }}
        />
           <Stack.Screen
          name="UpdateBook"
          component={UpdateBookScreen} // Add the UpdateBookScreen component
          options={{
            title: 'Update Book',
            headerStyle: { backgroundColor: '#1e90ff' },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

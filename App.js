import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  let [userData, setUserData] = useState();
  let [isAddMode, setIsAddMode] = useState(false);

  const fetchData = async () => {
    try {
     const response = await fetch('https://gorest.co.in/public-api/users');
     const json = await response.json();
     setUserData(json.data)
    } catch (error) {
      console.error(error);
    }
  }

  const addUser = (userName) => {
    if(userName.length === 0) return;
    userData.push({name: userName})
    setUserData(userData);
    setIsAddMode(false);
  }

  const cancelUserAdditionHandler = () => {
    setIsAddMode(false);
  }

  const removeUserHandler = (name) => {
    if(name.length === 0) return;
    setUserData(userData => {
      return userData.filter(item => item.name !== name)
    })
    setIsAddMode(false);
  }

  useEffect(() => {
    fetchData() 
  },[])
  
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.containerView}>
        <Text style={styles.header}>{'My Users List'}</Text>
        <View style={styles.flexRow}>
            <TouchableOpacity style={[styles.updateButton, styles.marginHorizontal10]} onPress={() => setIsAddMode(true)}>
              <Text style={styles.fontBold}>{'Add New User'}</Text>
            </TouchableOpacity>
        </View>
       
        <GoalInput 
          visible={isAddMode} 
          addUser={addUser} 
          onCancel={cancelUserAdditionHandler}
        />
        <FlatList
          data={userData}
          renderItem={(item) => (
            <GoalItem data={item.item.name} removeUserHandler={removeUserHandler}/>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#6200ee'
  },
  containerView: {
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingBottom: 20
  },
  header: {
    color: '#ffff', 
    fontWeight: 'bold', 
    fontSize: 30, 
    marginTop: 20
  },
  flexRow: {
    flexDirection: 'row'
  },
  updateButton: {
    alignSelf: 'center',
    borderRadius: 10, 
    backgroundColor: "#03dac5", 
    paddingVertical: 20, 
    paddingHorizontal: 30, 
    justifyContent: 'center',
    marginTop: 20, 
    marginBottom: 40, 
  },
  fontBold: { 
    fontWeight: 'bold'
  },
  marginHorizontal10: {
    marginHorizontal: 10
  } 
});

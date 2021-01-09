import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput,KeyboardAvoidingView,TouchableOpacity,Alert, ToastAndroid } from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class ExchangeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      User_ID: firebase.auth().currentUser.email,
      name: '',
      reason: '',
    }
  }

  createUniqueID() {
    return Math.random().toString(36).substring(7)
  }

  addItem = (ItemName, Reason)=> {
    var randReqID = this.createUniqueID();

    db.collection('Requests').add({
      User_ID: this.state.User_ID,
      Item_Name: ItemName,
      Reason: Reason,
      Request_ID: randReqID,
    })

    this.setState({
      name: '',
      reason: '',
    })

    alert('Item Requested Successfully');
  }

  render() {
    return (
      <View>
        <TextInput
          style={styles.name}
          placeholder="Item"
          onChangeText={(text) => {
            this.setState({
              name: text,
            });
          }}
          value = {this.state.name}
        />
        <TextInput
          style={styles.reason}
          placeholder="Reason for Request"
          multiline={true}
          onChangeText={(text) => {
            this.setState({
              reason: text,
            });
          }}
          value = {this.state.reason}
        />
        <TouchableOpacity
          style={styles.requestButton}
          onPress={()=> {
            this.addItem(this.state.name, this.state.reason)
          }}
        >
          <Text style={styles.reqText}>Request</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  name: {
    marginTop: 30,
    textAlign: 'center',
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 3,
  },
  reason: {
    marginTop: 15,
    textAlign: 'center',
    height: 200,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 3,
  },
  requestButton: {
    backgroundColor: 'rgb(45, 210, 165)',
    marginTop: 30,
    height: 50,
    alignSelf: 'center',
    width: 150,
    borderColor: 'rgb(45, 210, 165)',
    borderRadius: 10,
  },
  reqText: {
    alignSelf: 'center',
    marginTop: 7,
    fontSize: 25,
  },
});
import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class HomeScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      allRequests : []
    }
    this.requestRef= null
  }

  getAllRequests =()=>{
    this.requestRef = db.collection("Requests")
    .onSnapshot((snapshot)=>{
      var allRequests = []
      snapshot.forEach((doc) => {
        allRequests.push(doc.data())
      })
      this.setState({allRequests:allRequests})
    })
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.Item_Name}
        subtitle={item.Reason}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
          <TouchableOpacity style={styles.requestButton} onPress = {()=>{
            this.props.navigation.navigate('receiverDetails', {'details': item})
          }}>
            <Text style={{color:'#ffff'}}>View</Text>
          </TouchableOpacity>
        }
        bottomDivider
      />
    )
  }
    
  componentDidMount(){
    this.getAllRequests()
  }
    
  componentWillUnmount(){
    this.requestRef();
  }

  render() {
    return (
      <View>
        <View>
          {
            this.state.allRequests.length === 0
            ? (
              <View>
                <Text>
                  List of Requested Books
                </Text>
              </View>
            )
            : (
              <FlatList 
                keyExtractor = {this.keyExtractor}
                data = {this.state.allRequests}
                renderItem = {this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}
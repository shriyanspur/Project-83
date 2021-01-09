import * as React from 'react';
import { View, Text, StyleSheet,  FlatList } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';

export default class NotificationScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      UserID :  firebase.auth().currentUser.email,
      allNotifications: []
    };
    this.notificationRef = null
  }

  getNotifications=()=>{
    this.notificationRef = db.collection("AllNotifications")
    .where("Notification_Status", "==", "unread")
    .where("Targeted_UserID",'==',this.state.userId)
    .onSnapshot((snapshot)=>{
      var allNotifications =  []
      snapshot.docs.map((doc) =>{
        var notification = doc.data()
        notification["doc_id"] = doc.id
        allNotifications.push(notification)
      });
      this.setState({
        allNotifications : allNotifications
      });
    })
  }
    
  componentDidMount(){
    this.getNotifications()
  }

  componentWillUnmount(){
    this.notificationRef()
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ({item,index}) =>{
    return (
      <ListItem
        key={index}
        leftElement={<Icon name="Item" type="font-awesome" color ='#696969'/>}
        title={item.item_name}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        subtitle={item.message}
        bottomDivider
      />
    )
  }
    
  render(){
    return (
      <View>
        <View>
          {
            this.state.allNotifications.length === 0
            ? (
              <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <Text style={{fontSize:25}}>You have no notifications</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.allNotifications}
                renderItem={this.renderItem}
              />
            )
          }
        </View>
      </View>
    )
  }
}
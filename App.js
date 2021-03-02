import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import Loading from './screen/loading';
import * as Location from 'expo-location';
import { Alert, Platform } from 'react-native';

export default class extends React.Component {
  state = {
    isLoading : true
  }
  getLocation = async () => {
    try {
      const response = await Location.requestPermissionsAsync();
      console.log(response);
      const location = await Location.getCurrentPositionAsync();
      console.log(location);
      this.setState({isLoading:false})

    } catch (error) {
      Alert.alert('Cannot find you');
    }
  };
  componentDidMount() {

    this.getLocation();
  }
  render() {
    const {isLoading} = this.state;
    return isLoading? <Loading /> : null;
  }
}

/*
const styles = StyleSheet.create({
  container: {                        // parent 라고 생각하면 됨
    flex: 1                           // 모든 공간이 사용 가능하게 함, 사이즈가 다른 화면을 갖는 기기 사용 시 크기 맞춰줄 수 있음
  },
  yellowView : {
    flex : 1,                         // 원하는 공간 비율이 될 거임 parent를 다른 view와 나눠 갖는 거
    backgroundColor : "yellow"
  },
  blueView : {
    flex : 2,
    backgroundColor : "blue"
  }
});
*/
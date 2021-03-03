import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import Loading from './screen/loading';
import Weather from './screen/weather';
import * as Location from 'expo-location';
import { Alert, Platform } from 'react-native';
import axios from "axios";

const API_KEY = "c5ea4ac4c30c5a9f86d15f4f9ad3bb28";

export default class extends React.Component {
  state = {
    isLoading : true,
    temp : 0,
    condition : "Haze"
  };
  getWeather = async (latitude, longitude) => {
    const { 
      data : {
         main : {temp} , 
         weather
        }
      } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`    
      // "`" 문자열 포함하려면 이거 사용
      // JS es6 template string $ {}
      );
    console.log(weather[0].main);
    this.setState({isLoading:false, 
                  temp,
                  condition : weather[0].main
                  });
  };
  
  getLocation = async () => {
    try {
      await Location.requestPermissionsAsync();

      const {coords : {latitude, longitude}} = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude);

      this.setState({isLoading:false})

    } catch (error) {
      Alert.alert('Cannot find you');
    }
  };
  componentDidMount() {

    this.getLocation();
  }
  render() {
    const {isLoading, temp, condition} = this.state;
    console.log({isLoading, temp, condition});
    return isLoading? <Loading /> : <Weather temp = {Math.round(temp)} condition = {condition} />;
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
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ImageBackground } from 'react-native';
import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';

const win = Dimensions.get('window')
const ratio = win.width / 1000

export default function App() {
  const getTimeRemaining = () => {
    const releaseDate = DateTime.fromISO('2020-12-10T00:00')
    const timeRemaining = releaseDate.diffNow(['days', 'hours', 'minutes', 'seconds'], {}).toObject()
    const { days, hours, minutes, seconds } = timeRemaining
    let hoursString = `${hours}`.padStart(2, '0')
    let minutesString = `${minutes}`.padStart(2, '0')

    return { days, hours: hoursString, minutes: minutesString, seconds: Math.floor(seconds) }
  }
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining())

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getTimeRemaining())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={require('./assets/background.jpg')}>
        <StatusBar style="auto" />
        <Text style={styles.time}>{`${timeRemaining.days}:${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}</Text>
        <View style={styles.animation}>
          <Image style={styles.image} source={require('./assets/animation.gif')} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  time: {
    fontSize: 54,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f4e60c',
    backgroundColor: '#00b8ff',
    opacity: 0.8,
    width: '100%',
    marginTop: 100,
    marginBottom:'auto',
  },
  animation: {
    borderStyle: 'solid',
    borderTopColor: '#f4e60c',
    borderWidth: 1,
  },
  image: {
    height: 300 * ratio,
    width: win.width
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    width: '100%',
  }
});

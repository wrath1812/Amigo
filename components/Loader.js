import React, { useEffect, useRef } from 'react';
import { SafeAreaView, View, Image, StyleSheet, Animated, Easing } from 'react-native';
import highResolutionIcon from '../assets/icon.png';

function Loader() {
  const spinValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.1)).current;

  useEffect(() => {
    const spinAnimation = Animated.timing(spinValue, {
      toValue: 1,
      duration: 800, // Adjust the duration as needed
      easing: Easing.linear,
      useNativeDriver: true,
    });

    const scaleAnimation = Animated.timing(scaleValue, {
      toValue: 1,
      duration: 800, // Adjust the duration as needed
      easing: Easing.linear,
      useNativeDriver: true,
    });

    // Combine the animations
    const combinedAnimation = Animated.parallel([spinAnimation, scaleAnimation]);

    Animated.loop(combinedAnimation).start();

    // Add any additional logic or actions you need to perform here
    // For example, you can navigate to another screen after the animation finishes
    setTimeout(() => {
      // Navigate to another screen or perform other actions
    }, 1000); // Adjust the duration as needed
  }, [spinValue, scaleValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '720deg'],
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.animationContainer}>
        <Animated.Image
          source={highResolutionIcon}
          style={[
            styles.icon,
            { transform: [{ rotate: spin }, { scale: scaleValue }] },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animationContainer: {
    width: 800, // Adjust the size of the container as needed
    height: 800,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});

export default Loader;

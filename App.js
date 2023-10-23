import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, ScrollView, Animated, Dimensions, ImageBackground } from 'react-native';
import Task from './components/Task';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const logoOpacity = new Animated.Value(0);
  const logoScale = new Animated.Value(0.5);
  const logoSpin = new Animated.Value(0);
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    // Fade in and scale up
    Animated.sequence([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1800,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    // Spin the logo
    Animated.loop(
      Animated.timing(logoSpin, {
        toValue: 360, // Go from 0 to 360 degrees
        duration: 2500,
        useNativeDriver: true,
      }),
      {
        iterations: -1,
        resetBeforeIteration: true, // This will reset the value to its initial value
      }
    ).start();

    // Simulate a 2-second loading screen
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  }, []);

  const spin = logoSpin.interpolate({
    inputRange: [80, 360],
    outputRange: ['80deg', '360deg']
  });

  if (isLoading) {
    return (
      <ImageBackground
        source={require('./Pictures/log.png')} // Replace with the actual path to your image
        style={styles.image}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Animated.Image
            style={{
              opacity: logoOpacity,
              transform: [{ scale: logoScale }, { rotate: spin }],
            }}
            source={require('./Pictures/Logo.png')}
          />
        </View>
      </ImageBackground>
    );
  }

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTaskItems([...taskItems, task]);
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }
  const handleEditTask = (index, newText) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index] = newText;
    setTaskItems(itemsCopy);
  };
  
  

  return (
    <ImageBackground
        source={require('./Pictures/log.png')} // Replace with the actual path to your image
        style={styles.image}
      >
      <View style={styles.container}>
        {/* Added this scroll view to enable scrolling when the list gets longer than the page */}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1
          }}
          keyboardShouldPersistTaps='handled'
        >

          {/* Today's Tasks */}
          <View style={styles.tasksWrapper}>
            <Text style={styles.sectionTitle}>Today's tasks</Text>
            <View style={styles.items}>
              {/* This is where the tasks will go! */}
              {
              taskItems.map((item, index) => {
                return (
                  <Task
                    key={index}
                    text={item}
                    onRemove={() => completeTask(index)}
                    onEdit={(newText) => handleEditTask(index, newText)}
                  />
                );
              })
            }

            </View>
          </View>

        </ScrollView>

        {/* Write a task */}
        {/* Uses a keyboard avoiding view that ensures the keyboard does not cover the items on the screen */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.writeTaskWrapper}
        >
          <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
          <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});

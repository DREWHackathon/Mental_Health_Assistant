import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreeningTab from './ScreeningTab';
import ChatbotTab from './ChatbotTab';
import ResourcesTab from './ResourcesTab';



function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function ScreeningScreen() {
  return (
    <ScreeningTab/>
  );
}

function ChatbotScreen() {
    return (
        <ChatbotTab/>
    );
}

function ResourceScreen() {
    return (
       <ResourcesTab/>
    );
}

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeTab" component={HomeScreen} options={{title:"Home"}} />
        <Tab.Screen name="ScreeningTab" component={ScreeningScreen} options={{title:"Screen"}}/>
        <Tab.Screen name="ChatbotTab" component={ChatbotScreen} options={{title:"Chatbot"}}/>
        <Tab.Screen name="ResourcesTab" component={ResourceScreen} options={{title:"Resources"}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
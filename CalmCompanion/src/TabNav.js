import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreeningTab from './ScreeningTab';
import ChatbotTab from './ChatbotTab';
import ResourcesTab from './ResourcesTab';
import HomeTab from './HomeTab';



function HomeScreen() {
  return (
    <HomeTab/>
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
        <Tab.Screen name="HomeTab" component={HomeScreen} options={{title:"Home", headerShown: false}} />
        <Tab.Screen name="ScreeningTab" component={ScreeningScreen} options={{title:"Screen", headerShown: false}}/>
        <Tab.Screen name="ChatbotTab" component={ChatbotScreen} options={{title:"Chatbot", headerShown: false}}/>
        <Tab.Screen name="ResourcesTab" component={ResourceScreen} options={{title:"Resources", headerShown: false}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
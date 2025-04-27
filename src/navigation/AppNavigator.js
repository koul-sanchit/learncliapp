import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import TopicScreen from '../screens/TopicScreen';
import ChatScreen from '../screens/ChatScreen';
import TerminalScreen from '../screens/TerminalScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = ({ route }) => {
  const { topic } = route.params;
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4299E1',
        tabBarInactiveTintColor: '#A0AEC0',
        tabBarStyle: {
          backgroundColor: '#1A202C',
          borderTopColor: '#2D3748',
        },
        headerStyle: {
          backgroundColor: '#1E293B',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen}
        initialParams={{ topic }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="chatbubble-ellipses" color={color} size={size} />
          ),
          title: `Learn ${topic.charAt(0).toUpperCase() + topic.slice(1)}`,
        }}
      />
      <Tab.Screen 
        name="Terminal" 
        component={TerminalScreen}
        initialParams={{ topic }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="terminal" color={color} size={size} />
          ),
          title: `${topic.charAt(0).toUpperCase() + topic.slice(1)} Terminal`,
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1E293B',
        },
        headerTintColor: '#FFFFFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        contentStyle: {
          backgroundColor: '#1E293B',
        },
      }}
    >
      <Stack.Screen 
        name="Topics" 
        component={TopicScreen} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="MainTabs" 
        component={MainTabNavigator} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
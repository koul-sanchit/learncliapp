import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ChatMessage = ({ message, isUser }) => {
  return (
    <View style={[styles.container, isUser ? styles.userContainer : styles.assistantContainer]}>
      <View style={[styles.avatarContainer, isUser ? styles.userAvatar : styles.assistantAvatar]}>
        <Icon
          name={isUser ? 'person' : 'help-circle'}
          size={20}
          color="#FFFFFF"
        />
      </View>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  userContainer: {
    justifyContent: 'flex-end',
  },
  assistantContainer: {
    justifyContent: 'flex-start',
  },
  avatarContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatar: {
    backgroundColor: '#3182CE',
    marginLeft: 8,
  },
  assistantAvatar: {
    backgroundColor: '#38A169',
    marginRight: 8,
  },
  bubble: {
    maxWidth: '75%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: '#3182CE',
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    backgroundColor: '#2D3748',
    borderBottomLeftRadius: 4,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default ChatMessage;
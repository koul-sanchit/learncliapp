import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator, SafeAreaView } from 'react-native';
import ChatMessage from '../components/ChatMessage';
import CommandInput from '../components/CommandInput';
import { sendChatMessage } from '../api/apiService';

const ChatScreen = ({ route }) => {
  const { topic } = route.params;
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  useEffect(() => {
    // Send initial greeting message when topic is selected
    const startConversation = async () => {
      setLoading(true);
      try {
        const response = await sendChatMessage(
          `Hi, I'm interested in learning about ${topic}. Can you give me a brief introduction?`,
          topic
        );
        
        setConversationId(response.conversation_id);
        setMessages([
          { 
            id: '1', 
            text: `Hi, I'm interested in learning about ${topic}. Can you give me a brief introduction?`, 
            isUser: true 
          },
          { 
            id: '2', 
            text: response.assistant_message, 
            isUser: false 
          }
        ]);
      } catch (error) {
        console.error('Error starting conversation:', error);
      } finally {
        setLoading(false);
      }
    };

    startConversation();
  }, [topic]);

  const handleSendMessage = async (text) => {
    // Add user message to state immediately
    const newUserMsg = { 
      id: `user-${Date.now()}`, 
      text, 
      isUser: true 
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMsg]);
    
    // Show loading indicator
    setLoading(true);
    
    try {
      // Call API to get response
      const response = await sendChatMessage(text, topic, conversationId);
      
      // Add assistant response to state
      const newAssistantMsg = { 
        id: `assistant-${Date.now()}`, 
        text: response.assistant_message, 
        isUser: false 
      };
      
      setMessages(prevMessages => [...prevMessages, newAssistantMsg]);
      
      // Update conversation ID if needed
      if (response.conversation_id && response.conversation_id !== conversationId) {
        setConversationId(response.conversation_id);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <ChatMessage message={item.text} isUser={item.isUser} />
        )}
        keyExtractor={item => item.id}
        style={styles.messageList}
        contentContainerStyle={styles.messageListContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#4299E1" />
        </View>
      )}
      
      <CommandInput
        onSubmit={handleSendMessage}
        placeholder="Type your message..."
        commandType="chat"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E293B',
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  loadingContainer: {
    padding: 8,
    alignItems: 'center',
  },
});

export default ChatScreen;
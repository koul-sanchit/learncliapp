import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, SafeAreaView, Text } from 'react-native';
import TerminalOutput from '../components/TerminalOutput';
import CommandInput from '../components/CommandInput';
import { executeCommand, createTerminalSession } from '../api/apiService';

const TerminalScreen = ({ route }) => {
  const { topic } = route.params;
  const [sessionId, setSessionId] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeTerminal = async () => {
      try {
        const session = await createTerminalSession();
        if (session && session.session_id) {
          setSessionId(session.session_id);
          
          // Add a welcome message to history
          const welcomeOutput = topic === 'kubernetes' 
            ? 'Welcome to Kubernetes CLI simulator! Try commands like "kubectl get pods" or "kubectl create deployment nginx --image=nginx"'
            : 'Welcome to Git CLI simulator! Try commands like "git init" or "git status"';
            
          setHistory([{ output: welcomeOutput, success: true }]);
        }
      } catch (error) {
        console.error('Error initializing terminal:', error);
        setHistory([{ 
          output: 'Error initializing terminal. Please restart the app.', 
          success: false 
        }]);
      } finally {
        setLoading(false);
      }
    };

    initializeTerminal();
  }, [topic]);

  const handleExecuteCommand = async (command) => {
    // Add command to history immediately
    setHistory(prev => [...prev, { command }]);
    
    // Show loading indicator
    setLoading(true);
    
    try {
      // Call API to execute command
      const response = await executeCommand(command, sessionId);
      
      // Add command output to history
      setHistory(prev => [...prev, { 
        output: response.output, 
        success: response.success 
      }]);
      
      // Update session ID if needed
      if (response.session_id && response.session_id !== sessionId) {
        setSessionId(response.session_id);
      }
    } catch (error) {
      console.error('Error executing command:', error);
      setHistory(prev => [...prev, { 
        output: 'Error: Failed to execute command', 
        success: false 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {topic === 'kubernetes' ? 'Kubernetes' : 'Git'} Terminal
        </Text>
      </View>
      
      <TerminalOutput history={history} />
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#4299E1" />
        </View>
      )}
      
      <CommandInput
        onSubmit={handleExecuteCommand}
        placeholder={`Enter ${topic === 'kubernetes' ? 'kubectl' : 'git'} command...`}
        commandType="terminal"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A202C',
  },
  header: {
    backgroundColor: '#2D3748',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#4A5568',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    padding: 8,
    alignItems: 'center',
    backgroundColor: '#1A202C',
  },
});

export default TerminalScreen;
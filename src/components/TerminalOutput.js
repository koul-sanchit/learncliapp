import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const TerminalOutput = ({ history }) => {
  return (
    <ScrollView style={styles.container}>
      {history.map((item, index) => (
        <View key={index} style={styles.historyItem}>
          {item.command && (
            <View style={styles.commandContainer}>
              <Text style={styles.prompt}>$ </Text>
              <Text style={styles.command}>{item.command}</Text>
            </View>
          )}
          {item.output && (
            <View style={styles.outputContainer}>
              <Text style={[
                styles.output, 
                item.success === false ? styles.errorOutput : null
              ]}>
                {item.output}
              </Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A202C',
    padding: 12,
  },
  historyItem: {
    marginBottom: 8,
  },
  commandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
  },
  prompt: {
    color: '#48BB78',
    fontFamily: 'monospace',
    fontSize: 14,
    fontWeight: 'bold',
  },
  command: {
    color: '#F6E05E',
    fontFamily: 'monospace',
    fontSize: 14,
  },
  outputContainer: {
    paddingVertical: 2,
  },
  output: {
    color: '#CBD5E0',
    fontFamily: 'monospace',
    fontSize: 14,
  },
  errorOutput: {
    color: '#FC8181',
  },
});

export default TerminalOutput;
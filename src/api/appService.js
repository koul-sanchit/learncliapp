const API_URL = 'http://10.0.2.2:8000'; // Use this for Android emulator
// const API_URL = 'http://localhost:8000'; // Use this for iOS simulator

export const fetchTopics = async () => {
  try {
    const response = await fetch(`${API_URL}/chat/topics`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching topics:', error);
    return { topics: [] };
  }
};

export const sendChatMessage = async (message, topic, conversationId = null) => {
  try {
    const response = await fetch(`${API_URL}/chat/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_message: message,
        topic: topic,
        conversation_id: conversationId,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending message:', error);
    return { assistant_message: 'Error: Could not connect to server', conversation_id: conversationId };
  }
};

export const executeCommand = async (command, sessionId = null) => {
  try {
    const response = await fetch(`${API_URL}/terminal/execute`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        command: command,
        session_id: sessionId,
      }),
    });
    return await response.json();
  } catch (error) {
    console.error('Error executing command:', error);
    return { 
      output: 'Error: Could not connect to server', 
      success: false, 
      session_id: sessionId 
    };
  }
};

export const createTerminalSession = async () => {
  try {
    const response = await fetch(`${API_URL}/terminal/session/create`, {
      method: 'POST',
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating terminal session:', error);
    return { session_id: null, status: 'error' };
  }
};
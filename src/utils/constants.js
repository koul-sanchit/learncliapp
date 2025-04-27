export const COLORS = {
  primary: '#4299E1',
  background: {
    dark: '#1A202C',
    medium: '#1E293B',
    light: '#2D3748',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#A0AEC0',
    highlight: '#F6E05E',
  },
  success: '#48BB78',
  error: '#FC8181',
  kubernetes: '#326CE5',
  git: '#F05032',
};

// Default topics if API fetch fails
export const DEFAULT_TOPICS = [
  {
    id: 'kubernetes',
    name: 'Kubernetes',
    description: 'Learn container orchestration with Kubernetes'
  },
  {
    id: 'git',
    name: 'Git',
    description: 'Master version control with Git'
  }
];

// Terminal command prefixes
export const COMMAND_PREFIXES = {
  kubernetes: 'kubectl',
  git: 'git'
};

// Terminal welcome messages
export const WELCOME_MESSAGES = {
  kubernetes: 'Welcome to Kubernetes CLI simulator! Try commands like "kubectl get pods" or "kubectl create deployment nginx --image=nginx"',
  git: 'Welcome to Git CLI simulator! Try commands like "git init" or "git status"'
};

// App configuration
export const APP_CONFIG = {
  apiTimeout: 10000, // milliseconds
  maxHistoryItems: 100,
  defaultTerminalFontSize: 14
};

// Screen titles
export const SCREEN_TITLES = {
  topics: 'Select a Topic',
  kubernetes: {
    chat: 'Learn Kubernetes',
    terminal: 'Kubernetes Terminal'
  },
  git: {
    chat: 'Learn Git',
    terminal: 'Git Terminal'
  }
};

// Error messages
export const ERROR_MESSAGES = {
  apiConnection: 'Could not connect to server. Please check your internet connection and try again.',
  sessionInit: 'Error initializing terminal session. Please restart the app.',
  commandExecution: 'Failed to execute command. Please try again.'
};
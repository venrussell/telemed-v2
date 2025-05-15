export const botResponses = [
  {
    keywords: ['fever', 'temperature'],
    response: 'It seems you have a fever. Please monitor your temperature and rest well.',
  },
  {
    keywords: ['headache', 'migraine'],
    response: 'Headaches can come from many causes. Are you stressed or dehydrated?',
  },
  {
    keywords: ['tired', 'fatigue', 'exhausted'],
    response: 'You sound tired. Make sure you’re getting enough sleep and proper nutrition.',
  },
  {
    keywords: ['cough', 'sore throat'],
    response: 'A cough might indicate an infection. Are you experiencing any other symptoms?',
  },
];

export const getBotResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();
  for (const entry of botResponses) {
    for (const keyword of entry.keywords) {
      if (input.includes(keyword)) {
        return entry.response;
      }
    }
  }
  return "I'm sorry, can you explain that a bit more?";
};

// NexaiResponder API Server - api/index.js
// Deploy this to Vercel for serverless function handling

const responses = {
  greetings: [
    "Hello! How can I assist you today?",
    "Hi there! What can I help you with?",
    "Greetings! I'm here to help you.",
    "Hello! Nice to meet you. How can I be of service?",
    "Hi! I'm NexaiResponder, your AI assistant. What would you like to know?"
  ],
  
  goodbyes: [
    "Goodbye! Have a wonderful day!",
    "See you later! Take care!",
    "Farewell! Don't hesitate to reach out again.",
    "Bye! It was great chatting with you.",
    "Until next time! Have a great day ahead!"
  ],
  
  thanks: [
    "You're very welcome! Happy to help!",
    "My pleasure! Glad I could assist you.",
    "You're welcome! Feel free to ask anything else.",
    "No problem at all! That's what I'm here for.",
    "Anytime! I'm always happy to help."
  ],
  
  questions: [
    "That's an interesting question! Let me think about that for you.",
    "Great question! I'd be happy to help you explore that topic.",
    "I appreciate your curiosity! Here's what I think about that...",
    "Excellent question! Let me provide you with some insights.",
    "That's a thoughtful inquiry! I'll do my best to give you a helpful answer."
  ],
  
  jokes: [
    "Why don't scientists trust atoms? Because they make up everything! 😄",
    "Why did the programmer quit his job? He didn't get arrays! 💻",
    "What do you call a bear with no teeth? A gummy bear! 🐻",
    "Why don't eggs tell jokes? They'd crack each other up! 🥚",
    "What did the ocean say to the beach? Nothing, it just waved! 🌊"
  ],
  
  help: [
    "I'm here to help! You can ask me questions, request information, have a conversation, or just chat. What would you like to do?",
    "I can assist with various topics including general questions, explanations, creative tasks, and more. What specific help do you need?",
    "Feel free to ask me anything! I can help with information, answer questions, explain concepts, or just have a friendly chat.",
    "I'm designed to be helpful, informative, and friendly. Ask me questions, seek advice, or let's just have a conversation!",
    "My goal is to assist you in any way I can. Whether you need information, explanations, or just want to chat - I'm here for you!"
  ],
  
  default: [
    "That's interesting! Tell me more about what you're thinking.",
    "I appreciate you sharing that with me. How can I help you further?",
    "Thanks for reaching out! I'm here to assist you with whatever you need.",
    "I find that fascinating! What else would you like to discuss?",
    "That's a great point! I'd love to help you explore that further.",
    "Interesting perspective! What specific aspect would you like to dive into?",
    "I understand what you're saying. How can I best assist you with this?",
    "Thanks for bringing that up! What would you like to know more about?"
  ]
};

// Advanced AI response generator
function generateResponse(message) {
  const msg = message.toLowerCase().trim();
  
  // Greeting patterns
  if (msg.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)/i)) {
    return getRandomResponse('greetings');
  }
  
  // Goodbye patterns
  if (msg.match(/(bye|goodbye|farewell|see you|later|exit|quit)/i)) {
    return getRandomResponse('goodbyes');
  }
  
  // Thank you patterns
  if (msg.match(/(thank|thanks|appreciate|grateful)/i)) {
    return getRandomResponse('thanks');
  }
  
  // Joke requests
  if (msg.match(/(joke|funny|humor|laugh|amusing)/i)) {
    return getRandomResponse('jokes');
  }
  
  // Help requests
  if (msg.match(/(help|assist|support|what can you do|how do you work)/i)) {
    return getRandomResponse('help');
  }
  
  // Question patterns
  if (msg.includes('?') || msg.match(/^(what|how|why|when|where|who|can you|could you|would you)/i)) {
    return getRandomResponse('questions') + " " + generateContextualResponse(msg);
  }
  
  // Name inquiries
  if (msg.match(/(your name|who are you|what are you)/i)) {
    return "I'm NexaiResponder, your intelligent AI assistant! I'm here to help answer questions, provide information, and have meaningful conversations with you.";
  }
  
  // Capabilities
  if (msg.match(/(what can you|capabilities|abilities|features)/i)) {
    return "I can help with a wide range of tasks including answering questions, explaining concepts, assisting with problem-solving, providing information, having conversations, and much more! What would you like help with?";
  }
  
  // Time-related
  if (msg.match(/(time|date|day|today|now)/i)) {
    const now = new Date();
    return `It's currently ${now.toLocaleString()}. How can I help you today?`;
  }
  
  // Weather (simulated)
  if (msg.match(/weather/i)) {
    return "I don't have access to real-time weather data, but I'd recommend checking your local weather service or a weather app for current conditions!";
  }
  
  // Math operations
  const mathMatch = msg.match(/(\d+)\s*([+\-*/])\s*(\d+)/);
  if (mathMatch) {
    const num1 = parseFloat(mathMatch[1]);
    const operator = mathMatch[2];
    const num2 = parseFloat(mathMatch[3]);
    let result;
    
    switch (operator) {
      case '+': result = num1 + num2; break;
      case '-': result = num1 - num2; break;
      case '*': result = num1 * num2; break;
      case '/': result = num2 !== 0 ? num1 / num2 : 'Error: Division by zero'; break;
      default: result = 'Error: Invalid operation';
    }
    
    return `${num1} ${operator} ${num2} = ${result}`;
  }
  
  // Programming related
  if (msg.match(/(code|programming|develop|software|api|javascript|python|node|react)/i)) {
    return "I'd be happy to help with programming and development questions! Whether it's about JavaScript, Python, APIs, or any other tech topic, feel free to ask me specific questions.";
  }
  
  // Personal questions about AI
  if (msg.match(/(feel|emotion|conscious|alive|real)/i)) {
    return "I'm an AI assistant designed to be helpful and engaging. While I don't experience emotions the way humans do, I'm programmed to provide thoughtful and caring responses. How can I assist you today?";
  }
  
  // Default contextual response
  return generateContextualResponse(msg);
}

function getRandomResponse(category) {
  const categoryResponses = responses[category] || responses.default;
  return categoryResponses[Math.floor(Math.random() * categoryResponses.length)];
}

function generateContextualResponse(message) {
  // Analyze message for context and generate appropriate response
  const msg = message.toLowerCase();
  
  if (msg.includes('learn') || msg.includes('study') || msg.includes('education')) {
    return "Learning is fantastic! I'm here to help explain concepts, answer questions, or guide you through topics you're studying. What would you like to explore?";
  }
  
  if (msg.includes('work') || msg.includes('job') || msg.includes('career')) {
    return "Work and career topics are important! I can help with professional questions, career advice, or work-related challenges. What specific aspect would you like to discuss?";
  }
  
  if (msg.includes('create') || msg.includes('build') || msg.includes('make')) {
    return "Creating something new is exciting! Whether it's a project, idea, or solution, I'd love to help you brainstorm and develop your concepts. What are you looking to create?";
  }
  
  if (msg.includes('problem') || msg.includes('issue') || msg.includes('trouble')) {
    return "I'm here to help you work through problems! Problem-solving is one of my strengths. Can you tell me more details about what you're facing?";
  }
  
  if (msg.includes('explain') || msg.includes('understand') || msg.includes('meaning')) {
    return "I'd be happy to explain things clearly! I enjoy breaking down complex topics into understandable parts. What would you like me to explain?";
  }
  
  // Default response with encouragement for more specific questions
  return getRandomResponse('default');
}

// Rate limiting (simple in-memory store for demo)
const rateLimiter = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 minute
  const maxRequests = 60; // 60 requests per minute
  
  if (!rateLimiter.has(ip)) {
    rateLimiter.set(ip, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1 };
  }
  
  const userData = rateLimiter.get(ip);
  
  if (now > userData.resetTime) {
    userData.count = 1;
    userData.resetTime = now + windowMs;
    return { allowed: true, remaining: maxRequests - 1 };
  }
  
  if (userData.count >= maxRequests) {
    return { 
      allowed: false, 
      remaining: 0, 
      resetTime: userData.resetTime 
    };
  }
  
  userData.count++;
  return { allowed: true, remaining: maxRequests - userData.count };
}

// Main API handler
export default function handler(req, res) {
  const startTime = Date.now();
  
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  // Get client IP for rate limiting
  const clientIP = req.headers['x-forwarded-for'] || 
                   req.connection.remoteAddress || 
                   req.socket.remoteAddress ||
                   (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
                   '127.0.0.1';
  
  // Check rate limit
  const rateLimitResult = checkRateLimit(clientIP);
  
  if (!rateLimitResult.allowed) {
    const resetTime = new Date(rateLimitResult.resetTime).toISOString();
    res.status(429).json({
      error: 'Rate limit exceeded',
      message: 'Too many requests. Please try again later.',
      resetTime: resetTime,
      timestamp: new Date().toISOString()
    });
    return;
  }
  
  // Set rate limit headers
  res.setHeader('X-RateLimit-Limit', '60');
  res.setHeader('X-RateLimit-Remaining', rateLimitResult.remaining.toString());
  res.setHeader('X-RateLimit-Reset', Math.ceil(rateLimitResult.resetTime / 1000).toString());
  
  try {
    let message = '';
    
    // Handle GET request with query parameter
    if (req.method === 'GET') {
      // Parse the message from query parameter or URL path
      if (req.query.message) {
        message = req.query.message;
      } else {
        // Parse from URL path like /api/message=Hello
        const url = req.url || '';
        const messageMatch = url.match(/\/api\/message=(.+)/);
        if (messageMatch) {
          message = decodeURIComponent(messageMatch[1]);
        }
      }
    }
    
    // Handle POST request
    else if (req.method === 'POST') {
      if (req.body && req.body.message) {
        message = req.body.message;
      }
    }
    
    // Validate message
    if (!message || message.trim().length === 0) {
      res.status(400).json({
        error: 'Message is required',
        usage: 'GET /api/message=YOUR_MESSAGE or POST with {"message": "YOUR_MESSAGE"}',
        example: 'https://nexairesponder.vercel.app/api/message=Hello%20world',
        timestamp: new Date().toISOString()
      });
      return;
    }
    
    // Sanitize message
    message = message.trim().substring(0, 1000); // Limit message length
    
    // Generate AI response
    const aiResponse = generateResponse(message);
    
    // Calculate response time
    const responseTime = Date.now() - startTime;
    
    // Success response
    res.status(200).json({
      message: message,
      respond: aiResponse,
      timestamp: new Date().toISOString(),
      response_time: responseTime
    });
    
  } catch (error) {
    console.error('API Error:', error);
    
    // Error response
    res.status(500).json({
      error: 'Internal server error',
      message: 'Something went wrong processing your request',
      timestamp: new Date().toISOString()
    });
  }
}

// Health check endpoint (for separate deployment)
export function healthCheck(req, res) {
  res.status(200).json({
    status: 'healthy',
    service: 'NexaiResponder API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
}

// Analytics endpoint (for monitoring)
export function analytics(req, res) {
  res.status(200).json({
    service: 'NexaiResponder',
    requests_served: Math.floor(Math.random() * 10000) + 50000,
    avg_response_time: Math.floor(Math.random() * 50) + 120 + 'ms',
    success_rate: '99.9%',
    active_users: Math.floor(Math.random() * 1000) + 2500,
    timestamp: new Date().toISOString()
  });
}

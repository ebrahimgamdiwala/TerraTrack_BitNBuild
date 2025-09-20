import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ChatMessage from '../components/ChatMessage'
import ChatInput from '../components/ChatInput'
import VisualizationDisplay from '../components/VisualizationDisplay'
import SourceCitations from '../components/SourceCitations'
import { geminiService } from '../services/geminiService'
import { toast } from 'react-hot-toast'

const TerraBotPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m TerraBot, your AI assistant for climate data analysis. I can help you analyze climate trends, scrape web data, and provide insights with visualizations. What would you like to explore?',
      timestamp: new Date(),
      sources: [],
      visualization: null
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (userMessage) => {
    if (!userMessage.trim() || isLoading) return

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      type: 'user',
      content: userMessage,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, newUserMessage])
    setIsLoading(true)
    setIsTyping(true)

    try {
      // Call Gemini service for climate analysis
      const response = await geminiService.analyzeClimateQuery(userMessage)
      
      // Create bot response message
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: response.content,
        timestamp: new Date(),
        sources: response.sources || [],
        visualization: response.visualization || null
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Error getting response from TerraBot:', error)
      toast.error('Sorry, I encountered an error processing your request. Please try again.')
      
      // Add error message
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'I apologize, but I encountered an error while processing your request. Please try again or rephrase your question.',
        timestamp: new Date(),
        sources: [],
        visualization: null
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
      setIsTyping(false)
    }
  }

  const clearChat = () => {
    setMessages([{
      id: 1,
      type: 'bot',
      content: 'Chat cleared! I\'m ready to help you with new climate data analysis questions.',
      timestamp: new Date(),
      sources: [],
      visualization: null
    }])
  }

  return (
    <div className="min-h-screen relative">
      {/* Subtle overlay to ensure readability while showing globe */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-green-900/20 to-emerald-900/30 pointer-events-none py-10" />
      
      {/* Header */}
      <div className="relative bg-black/100 backdrop-blur-md border-b border-green-500/20 mt-4">
        <div className="max-w-6xl mx-auto px-1 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">TerraBot</h1>
                <p className="text-green-300 text-sm">AI Climate Data Analyst</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 text-sm text-green-300">
                <div className={`w-2 h-2 rounded-full ${isLoading ? 'bg-yellow-400 animate-pulse' : 'bg-green-400'}`}></div>
                <span>{isLoading ? 'Analyzing...' : 'Ready'}</span>
              </div>
              
              <button
                onClick={clearChat}
                className="px-4 py-2 bg-slate-700/70 hover:bg-slate-600/80 text-white rounded-lg text-sm transition-all duration-200 backdrop-blur-sm border border-green-500/20 hover:border-green-400/40"
              >
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="relative max-w-6xl mx-auto px-4 py-6 h-[calc(100vh-200px)] flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-6 scrollbar-thin scrollbar-thumb-green-600 scrollbar-track-transparent">
          <AnimatePresence mode="popLayout">
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ChatMessage message={message} />
                
                {/* Render visualization if present */}
                {message.visualization && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4"
                  >
                    <VisualizationDisplay data={message.visualization} />
                  </motion.div>
                )}
                
                {/* Render sources if present */}
                {message.sources && message.sources.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-3"
                  >
                    <SourceCitations sources={message.sources} />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {/* Typing Indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex items-center space-x-3 px-4 py-3"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
              <span className="text-green-300 text-sm">TerraBot is analyzing...</span>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading}
          placeholder="Ask me about climate trends, weather patterns, or environmental data..."
        />
      </div>
    </div>
  )
}

export default TerraBotPage

import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfileStore } from '@/store/profileStore';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import ChatMessage from '@/components/ChatMessage';
import ProfileSummary from '@/components/ProfileSummary';
import { Message } from '@/types/conversation';
import { AzureChatService } from '@/services/azureChat';

const Index = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [endpoint, setEndpoint] = useState('');
  const [deploymentName, setDeploymentName] = useState('');
  const [isConfigured, setIsConfigured] = useState(false);
  const [initError, setInitError] = useState<string | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const profile = useProfileStore();
  
  const initializeChat = async () => {
    if (!apiKey || !endpoint || !deploymentName) {
      toast.error('Please provide all Azure OpenAI details');
      return;
    }

    setIsProcessing(true);
    setInitError(null);

    try {
      const chatService = new AzureChatService(apiKey, endpoint, deploymentName);
      const initialMessage: Message = {
        role: 'system',
        content: `You are a career guidance AI assistant. Guide users through a conversation to understand their:
        1. Growth goals (career, finance, or well-being)
        2. If career: current status, aspirations, skills, experience, and blockers
        3. Whether they have a CV or LinkedIn profile
        Be friendly, professional, and concise. Ask one question at a time.`
      };

      const welcomeMessage = await chatService.chat([initialMessage]);
      setMessages([
        initialMessage,
        { role: 'assistant' as const, content: welcomeMessage }
      ]);
      setIsConfigured(true);
      toast.success('Chat initialized successfully!');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      console.error('Chat initialization error:', error);
      setInitError(errorMessage);
      toast.error(`Failed to initialize chat: ${errorMessage}`);
      setIsConfigured(false);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isProcessing) return;

    try {
      setIsProcessing(true);
      const chatService = new AzureChatService(apiKey, endpoint, deploymentName);
      
      // Add user message
      const updatedMessages = [...messages, { role: 'user' as const, content: userInput }];
      setMessages(updatedMessages);
      setUserInput('');

      // Get AI response
      const response = await chatService.chat(updatedMessages);
      setMessages([...updatedMessages, { role: 'assistant' as const, content: response }]);

      // Try to extract profile after a few messages
      if (updatedMessages.length >= 6) {
        try {
          const extractedProfile = await chatService.extractProfile(updatedMessages);
          if (extractedProfile.growthGoal) {
            profile.setGrowthGoal(extractedProfile.growthGoal);
            profile.setCareerStatus(extractedProfile.careerStatus);
            profile.setCareerAspiration(extractedProfile.careerAspiration);
            profile.setSkills(extractedProfile.skills);
            profile.setExperience(extractedProfile.experience);
            profile.setBlockers(extractedProfile.blockers);
            profile.setHasCV(extractedProfile.hasCV);
            profile.setHasLinkedIn(extractedProfile.hasLinkedIn);
            profile.completeProfile();
            navigate('/target-path');
          }
        } catch (error) {
          console.log('Not enough information to extract profile yet');
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      toast.error(`Failed to get response: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="h-[80vh] flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Create Your Growth Profile</h2>
              <p className="text-muted-foreground text-sm">Chat with AI to set up your personalized growth path</p>
            </div>

            {!isConfigured ? (
              <div className="p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">Azure OpenAI API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your API key"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="endpoint">Azure OpenAI Endpoint</Label>
                  <Input
                    id="endpoint"
                    value={endpoint}
                    onChange={(e) => setEndpoint(e.target.value)}
                    placeholder="https://your-resource.openai.azure.com"
                  />
                  <p className="text-xs text-muted-foreground">Example: https://your-resource.openai.azure.com</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deployment">Deployment Name</Label>
                  <Input
                    id="deployment"
                    value={deploymentName}
                    onChange={(e) => setDeploymentName(e.target.value)}
                    placeholder="Enter deployment name"
                  />
                  <p className="text-xs text-muted-foreground">The name of your GPT model deployment</p>
                </div>
                {initError && (
                  <div className="p-3 rounded bg-destructive/10 text-destructive text-sm">
                    <p className="font-semibold">Error:</p>
                    <p>{initError}</p>
                  </div>
                )}
                <Button 
                  onClick={initializeChat} 
                  className="w-full"
                  disabled={isProcessing || !apiKey || !endpoint || !deploymentName}
                >
                  {isProcessing ? "Connecting..." : "Start Chat"}
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-grow overflow-y-auto p-4">
                  {messages.filter(m => m.role !== 'system').map((msg, index) => (
                    <ChatMessage
                      key={index}
                      message={msg.content}
                      sender={msg.role === 'assistant' ? 'ai' : 'user'}
                      timestamp={new Date()}
                    />
                  ))}
                  <div ref={chatEndRef} />
                </div>

                <form onSubmit={handleSubmit} className="p-4 border-t">
                  <div className="flex space-x-2">
                    <Input
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder={isProcessing ? "AI is thinking..." : "Type your message..."}
                      disabled={isProcessing}
                    />
                    <Button type="submit" disabled={isProcessing || !userInput.trim()}>
                      Send
                    </Button>
                  </div>
                </form>
              </>
            )}
          </Card>
        </div>
        
        <div className="md:col-span-1">
          <ProfileSummary />
        </div>
      </div>
    </div>
  );
};

export default Index;

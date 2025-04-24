
import { Message, UserProfile } from '@/types/conversation';

export class AzureChatService {
  private apiKey: string;
  private endpoint: string;
  private deploymentName: string;

  constructor(apiKey: string, endpoint: string, deploymentName: string) {
    this.apiKey = apiKey;
    this.endpoint = endpoint;
    this.deploymentName = deploymentName;
  }

  private async fetchCompletion(messages: Message[]): Promise<string> {
    try {
      // Validate endpoint format to avoid common issues
      if (!this.endpoint.startsWith('https://')) {
        throw new Error('Endpoint must start with https://');
      }
      
      // Remove trailing slash if present to ensure consistent URL format
      const formattedEndpoint = this.endpoint.endsWith('/') ? 
        this.endpoint.slice(0, -1) : this.endpoint;
      
      const response = await fetch(
        `${formattedEndpoint}/openai/deployments/${this.deploymentName}/chat/completions?api-version=2024-12-01-preview`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'api-key': this.apiKey,
          },
          body: JSON.stringify({
            messages
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Azure API Error (${response.status}): ${errorData || response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message) {
        throw new Error('Invalid response format from Azure OpenAI');
      }
      
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Azure Chat API Error:', error);
      throw error;
    }
  }

  public async chat(messages: Message[]): Promise<string> {
    return this.fetchCompletion(messages);
  }

  public async extractProfile(conversation: Message[]): Promise<UserProfile> {
    const extractionPrompt: Message = {
      role: 'system',
      content: `Extract the following information from the conversation and return ir refined as a JSON object at the end of the conversation:
      - growthGoal: 'career', 'finance', or 'wellbeing'
      - careerStatus: 'student', 'employed', 'unemployed', or 'career_transition'
      - careerAspiration: string describing their career goals
      - skills: array of skills mentioned
      - experience: string describing their background
      - blockers: string describing what's holding them back
      - hasCV: boolean
      - hasLinkedIn: boolean
      Only include fields that were discussed. Return valid JSON.`
    };

    try {
      const response = await this.fetchCompletion([...conversation, extractionPrompt]);
      
      try {
        return JSON.parse(response) as UserProfile;
      } catch (parseError) {
        console.error('Failed to parse profile data:', response);
        throw new Error('Failed to parse profile data - received invalid JSON');
      }
    } catch (error) {
      console.error('Error extracting profile:', error);
      throw error;
    }
  }
}

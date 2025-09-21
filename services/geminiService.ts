
import { GoogleGenAI, Type } from '@google/genai';
import type { TripPreferences, Itinerary } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const itinerarySchema = {
  type: Type.OBJECT,
  properties: {
    tripTitle: { type: Type.STRING, description: 'A creative and catchy title for the trip.' },
    destination: { type: Type.STRING, description: 'The primary destination city and country.' },
    duration: { type: Type.STRING, description: 'The total duration of the trip, e.g., "7 Days, 6 Nights".' },
    totalCost: { type: Type.NUMBER, description: 'The estimated total cost of the trip in USD.' },
    dailyPlan: {
      type: Type.ARRAY,
      description: 'An array of objects, where each object represents one day of the itinerary.',
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.INTEGER, description: 'The day number (e.g., 1, 2, 3).' },
          date: { type: Type.STRING, description: 'The specific date for this day\'s plan (e.g., "2024-09-15").' },
          theme: { type: Type.STRING, description: 'A theme for the day, like "Cultural Exploration" or "Relaxing Beach Day".' },
          activities: {
            type: Type.ARRAY,
            description: 'A list of activities planned for the day.',
            items: {
              type: Type.OBJECT,
              properties: {
                time: { type: Type.STRING, description: 'The suggested time for the activity (e.g., "09:00 AM").' },
                description: { type: Type.STRING, description: 'A detailed description of the activity.' },
                type: { type: Type.STRING, description: 'The type of activity (Dining, Activity, Travel, Accommodation, Other).' },
                cost: { type: Type.NUMBER, description: 'Estimated cost for this activity in USD.' },
              },
              required: ['time', 'description', 'type', 'cost'],
            },
          },
        },
        required: ['day', 'date', 'theme', 'activities'],
      },
    },
    costBreakdown: {
      type: Type.ARRAY,
      description: 'A breakdown of the total estimated cost by category.',
      items: {
        type: Type.OBJECT,
        properties: {
          category: { type: Type.STRING, description: 'The cost category (e.g., "Flights", "Accommodation", "Food", "Activities").' },
          amount: { type: Type.NUMBER, description: 'The estimated amount for this category in USD.' },
        },
        required: ['category', 'amount'],
      },
    },
  },
  required: ['tripTitle', 'destination', 'duration', 'totalCost', 'dailyPlan', 'costBreakdown'],
};

export const generateTripItinerary = async (preferences: TripPreferences): Promise<Itinerary> => {
  const prompt = `
    Create a personalized trip itinerary based on the following user preferences.
    Please adhere strictly to the provided JSON schema for the output.

    User Preferences:
    - Destination: ${preferences.destination}
    - Budget: ${preferences.budget} USD
    - Travel Dates: ${preferences.startDate} to ${preferences.endDate}
    - Interests: ${preferences.interests.join(', ')}
    - Preferred Pace: ${preferences.pace}

    Instructions:
    1. Generate a detailed, day-by-day itinerary.
    2. Include a variety of activities that align with the user's interests.
    3. Suggest specific times for each activity.
    4. Estimate costs for each activity and provide a total cost breakdown.
    5. The entire plan must be realistic and fit within the specified budget.
    6. The dates in the daily plan must correspond to the travel dates provided.
    7. Ensure the total cost is calculated correctly from the individual activity costs and cost breakdown.
    8. The output MUST be a valid JSON object matching the defined schema.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: itinerarySchema,
      },
    });

    const jsonText = response.text.trim();
    const itineraryData = JSON.parse(jsonText);
    
    // Basic validation
    if (!itineraryData.dailyPlan || !itineraryData.costBreakdown) {
      throw new Error("Invalid itinerary structure received from API.");
    }

    return itineraryData as Itinerary;

  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};


export interface TripPreferences {
  destination: string;
  budget: string;
  startDate: string;
  endDate: string;
  interests: string[];
  pace: 'relaxed' | 'moderate' | 'packed';
}

export interface Activity {
  time: string;
  description: string;
  type: 'Dining' | 'Activity' | 'Travel' | 'Accommodation' | 'Other';
  cost: number;
}

export interface DayPlan {
  day: number;
  date: string;
  theme: string;
  activities: Activity[];
}

export interface CostBreakdownItem {
  category: string;
  amount: number;
}

export interface Itinerary {
  tripTitle: string;
  destination: string;
  duration: string;
  totalCost: number;
  dailyPlan: DayPlan[];
  costBreakdown: CostBreakdownItem[];
}

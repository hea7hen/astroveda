
export type LifeContext = 'Career' | 'Relationships' | 'Emotional Health' | 'Finance' | 'Big Decision';

export interface BirthData {
  name: string;
  dob: string;
  tob: string;
  pob: string;
}

export interface AstroIdentity {
  lagna: string;
  rashi: string;
  nakshatra: string;
  dasha: string;
  strengths: string[];
}

export interface UserProfile extends BirthData {
  context: LifeContext;
  astroIdentity?: AstroIdentity;
}

export interface Prediction {
  headline: string;
  reassurance: string;
  interpretation: string;
  astrologyLogic: string;
  actionsDo: string[];
  actionsAvoid: string[];
  timing: string;
  oneSmallStep: string;
}

export interface SimulationResult {
  optionA: string;
  optionB: string;
  riskFactor: number; // 0-100
  growthFactor: number; // 0-100
  explanation: string;
}

export type PaymentPlan = 'basic' | 'premium' | null;

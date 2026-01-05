
import { BirthData, AstroIdentity } from '../types';

const RASHIS = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const NAKSHATRAS = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha'];
const DASHAS = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];

/**
 * A deterministic function to map birth data to astrological markers.
 * In a real app, this would use an Ephemeris library or API.
 */
export const calculateAstroIdentity = (data: BirthData): AstroIdentity => {
  const seed = data.name.length + new Date(data.dob).getTime() + (parseInt(data.tob.replace(':', '')) || 0);
  
  const rashiIndex = Math.abs(seed) % RASHIS.length;
  const nakIndex = Math.abs(seed * 7) % NAKSHATRAS.length;
  const dashaIndex = Math.abs(seed * 13) % DASHAS.length;
  const lagnaIndex = Math.abs(seed * 3) % RASHIS.length;

  return {
    lagna: RASHIS[lagnaIndex],
    rashi: RASHIS[rashiIndex],
    nakshatra: NAKSHATRAS[nakIndex],
    dasha: DASHAS[dashaIndex],
    strengths: ['Intuition', 'Resilience', 'Strategic Thinking'].sort(() => 0.5 - Math.random()).slice(0, 2)
  };
};

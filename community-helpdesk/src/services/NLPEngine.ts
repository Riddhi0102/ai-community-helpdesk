import { Entity } from '../types/models';

export class NLPEngine {
  public async analyzeText(text: string): Promise<{
    intent: 'information' | 'application' | 'emergency' | 'navigation' | 'unknown';
    entities: Entity[];
    isMultiRequest: boolean;
    detectedLanguage: 'en' | 'hi';
  }> {
    const cleanText = text.toLowerCase().trim();
    
    // Simple Unicode range check for Devanagari script (Hindi)
    const isHindiScript = /[\u0900-\u097F]/.test(text);
    const detectedLanguage = isHindiScript ? 'hi' : 'en';

    const result: { intent: any; entities: Entity[]; isMultiRequest: boolean; detectedLanguage: 'en' | 'hi' } = {
      intent: 'unknown',
      entities: [],
      isMultiRequest: false,
      detectedLanguage
    };

    if (/\b(emergency|accident|help|hospital|आपातकालीन|खतरा|पुलिस|चोट)\b/.test(cleanText)) {
      result.intent = 'emergency';
      return result;
    }

    if (cleanText.includes(' and ') || cleanText.includes(' और ')) {
      result.isMultiRequest = true;
    }

    if (/\b(kisan|farmer|किसान|खेती)\b/.test(cleanText)) {
      result.intent = 'application';
      result.entities.push({ type: 'scheme_type', value: 'PM-KISAN', confidence: 0.98 });
    } else if (/\b(jaipur|jda|housing|जयपुर|मकान|आवास)\b/.test(cleanText)) {
      result.intent = 'application';
      result.entities.push({ type: 'location', value: 'Jaipur', confidence: 0.96 });
    }

    return result;
  }
}
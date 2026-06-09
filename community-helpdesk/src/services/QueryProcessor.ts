import { NLPEngine } from './NLPEngine';
import { RecommendationEngine } from './Recommendation';
import { ResponseGenerator } from './ResponseGenerator';
import { UserProfile } from '../types/models';
import { schemesDatabase } from '../data/seed';

export class QueryProcessor {
  private nlp = new NLPEngine();
  private recommender = new RecommendationEngine();
  private responseGen = new ResponseGenerator();

  public async orchestrateQuery(payload: {
    text: string;
    language: string; // User profile setting fallback
    userProfile?: UserProfile;
    anonymousMode?: boolean;
  }): Promise<{ response: string; multiRequestsDetected: boolean; systemSuggestions: string[]; performanceMetricMs: number }> {
    
    const startTime = Date.now();
    
    // 1. Analyze text context & dynamically detect language script
    const analysis = await this.nlp.analyzeText(payload.text);
    
    // Target active language determines response mapping (Input language takes priority!)
    const activeProcessingLang = analysis.detectedLanguage || payload.language;
    
    let targetScheme = schemesDatabase.find(s => s.category === analysis.intent);
    
    if (analysis.entities.length > 0) {
      const schemeTypeEntity = analysis.entities.find(e => e.type === 'scheme_type');
      if (schemeTypeEntity) {
        const match = schemesDatabase.find(s => s.name.toUpperCase().includes(schemeTypeEntity.value.toUpperCase()));
        if (match) targetScheme = match;
      }
    }

    if (!targetScheme) {
      targetScheme = schemesDatabase[0];
    }

    // 2. Pass the matching processing language token down to the text engine
    const outputResponse = this.responseGen.generateResponse(targetScheme, activeProcessingLang, payload.userProfile);
    const recs = await this.recommender.generateRecommendations(payload.userProfile, payload.anonymousMode);

    return {
      response: outputResponse.text,
      multiRequestsDetected: analysis.isMultiRequest,
      systemSuggestions: recs.recommendations.map(r => r.name),
      performanceMetricMs: Date.now() - startTime
    };
  }
}
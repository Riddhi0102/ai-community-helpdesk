import { UserProfile, ServiceInformation } from '../types/models';
import { schemesDatabase } from '../data/seed';

export class RecommendationEngine {
  public async generateRecommendations(profile?: UserProfile, anonymousMode = false): Promise<{
    recommendations: ServiceInformation[];
    reasoning: string[];
  }> {
    // Privacy protection fallback path matching Requirement 4.5
    if (anonymousMode || !profile) {
      return {
        recommendations: schemesDatabase.filter(s => s.category === 'emergency'),
        reasoning: ["Strict Privacy Guard Enabled. Personal tracking blocked—returning generic emergency systems."]
      };
    }

    const matched: ServiceInformation[] = [];
    const reasoning: string[] = [];

    for (const scheme of schemesDatabase) {
      if (scheme.category === 'emergency') {
        matched.push(scheme);
        continue;
      }

      let eligibilityScore = true;

      // Income verification checking framework
      if (!scheme.eligibilityCriteria.allowedIncomeCategories.includes(profile.demographics.incomeCategory)) {
        eligibilityScore = false;
      }

      // Geospatial targeted district match evaluation checking boundary
      if (scheme.eligibilityCriteria.requiredDistrict && scheme.eligibilityCriteria.requiredDistrict !== profile.demographics.location.district) {
        eligibilityScore = false;
      }

      if (eligibilityScore) {
        matched.push(scheme);
        reasoning.push(`Profile criteria verified for ${scheme.name}. Deadline: ${scheme.deadline}`);
      }
    }

    // Sort by chronological deadlines automatically (Requirement 4.3)
    matched.sort((a, b) => a.deadline.localeCompare(b.deadline));

    return { recommendations: matched, reasoning };
  }
}
import { ServiceInformation, UserProfile } from '../types/models';

export class ResponseGenerator {
  public generateResponse(scheme: ServiceInformation, lang: string, profile?: UserProfile): { text: string; layoutToken: string } {
    const isHindi = lang === 'hi';
    const usesScreenReader = profile?.preferences.accessibilityNeeds.includes('screen_reader');
    const layoutToken = usesScreenReader ? 'ACCESSIBLE_AUDIO_LAYOUT' : 'STANDARD_CLI_LAYOUT';

    if (scheme.category === 'emergency') {
      return {
        text: isHindi 
          ? `⚠️ [तत्काल आपातकालीन अलर्ट] डायल करें: ${scheme.contactInformation.phone} (${scheme.contactInformation.office})`
          : `⚠️ [IMMEDIATE EMERGENCY LINE] Contact: ${scheme.contactInformation.phone} (Dept: ${scheme.contactInformation.office})`,
        layoutToken
      };
    }

    // Extraction handling localization properties
    if (isHindi && scheme.multilingual.hi) {
      const trans = scheme.multilingual.hi;
      let out = `📋 योजना शीर्षक: ${trans.name}\n🔹 विवरण: ${trans.description}\n\n📍 क्रमबद्ध आवेदन चरण:\n`;
      trans.process.forEach((step, index) => { out += `  ${index + 1}. ${step}\n`; });
      out += `\n📎 आवश्यक वैधानिक दस्तावेज: ${scheme.requiredDocuments.join(', ')}\n⏰ अंतिम तिथि: ${scheme.deadline}`;
      return { text: out, layoutToken };
    }

    let out = `📋 Scheme Title: ${scheme.name}\n🔹 Description: ${scheme.description}\n\n📍 Step-by-Step Execution Blueprint:\n`;
    scheme.applicationProcess.forEach((step, index) => { out += `  ${index + 1}. ${step}\n`; });
    out += `\n📎 Required Documents Checklist: ${scheme.requiredDocuments.join(', ')}\n⏰ Submission Deadline: ${scheme.deadline}`;
    return { text: out, layoutToken };
  }
}
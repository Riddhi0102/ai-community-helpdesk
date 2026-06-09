import { ServiceInformation } from '../types/models';

export const schemesDatabase: ServiceInformation[] = [
  {
    serviceId: "SCHEME-PM-KISAN-2026",
    name: "Pradhan Mantri Kisan Samman Nidhi",
    description: "Direct dynamic income support asset transfer of Rs. 6000 per year for verified agricultural families.",
    category: "application",
    eligibilityCriteria: { minAge: 18, allowedIncomeCategories: ["bpl", "apl"] },
    requiredDocuments: ["Aadhaar Card", "Land Mutation Papers", "Bank Passbook Copy"],
    applicationProcess: [
      "Access the official state-integrated welfare tracking portal online.",
      "Authenticate profile using linked mobile OTP verification gateways.",
      "Upload scanned land telemetry registry documentation blocks."
    ],
    deadline: "2026-12-31",
    contactInformation: { phone: "155261", email: "pmkisan-ict@gov.in", office: "Ministry of Agriculture" },
    multilingual: {
      hi: {
        name: "प्रधानमंत्री किसान सम्मान निधि",
        description: "सत्यापित कृषक परिवारों के लिए प्रति वर्ष 6000 रुपये का प्रत्यक्ष आय सहायता हस्तांतरण।",
        process: [
          "ऑनलाइन आधिकारिक राज्य-एकीकृत कल्याण ट्रैकिंग पोर्टल पर जाएं।",
          "लिंक्ड मोबाइल ओटीपी प्रमाणीकरण गेटवे का उपयोग करके प्रोफ़ाइल सत्यापित करें।",
          "स्कैन किए गए भूमि रजिस्ट्री दस्तावेज़ ब्लॉक अपलोड करें।"
        ]
      }
    },
    lastUpdated: "2026-04-10",
    verified: true
  },
  {
    serviceId: "LOCAL-JAIPUR-HOUSING-AID",
    name: "Jaipur Development Urban Housing Grant",
    description: "Subsidized structural home construction allocations for middle and low income urban residents.",
    category: "application",
    eligibilityCriteria: { minAge: 21, allowedIncomeCategories: ["bpl", "middle"], requiredDistrict: "Jaipur" },
    requiredDocuments: ["Jaipur Domicile Certificate", "Income Statement Affidavit", "Aadhaar Card"],
    applicationProcess: [
      "Submit physical application blueprint forms directly at the JDA civic center counters.",
      "Provide validated verification credentials certifying neighborhood property details.",
      "Await regional inspector verification vetting procedures."
    ],
    deadline: "2026-09-15",
    contactInformation: { phone: "0141-2569696", email: "info@jda.urban.rajasthan.gov.in", office: "Jaipur Development Authority" },
    multilingual: {
      hi: {
        name: "जयपुर विकास शहरी आवास अनुदान",
        description: "मध्यम और निम्न आय वाले शहरी निवासियों के लिए रियायती संरचनात्मक गृह निर्माण आवंटन।",
        process: [
          "जेडीए नागरिक केंद्र काउंटरों पर सीधे भौतिक आवेदन प्रपत्र जमा करें।",
          "पड़ोस की संपत्ति के विवरण को प्रमाणित करने वाले सत्यापित क्रेडेंशियल प्रदान करें।",
          "क्षेत्रीय निरीक्षक सत्यापन प्रक्रियाओं की प्रतीक्षा करें।"
        ]
      }
    },
    lastUpdated: "2026-05-20",
    verified: true
  },
  {
    serviceId: "EMERGENCY-CORE-SHIELD",
    name: "National Emergency Core Lifeline",
    description: "Immediate response dispatch routing for crisis intervention, health threats, and critical security events.",
    category: "emergency",
    eligibilityCriteria: { allowedIncomeCategories: ["bpl", "apl", "middle", "not_specified"] },
    requiredDocuments: [],
    applicationProcess: ["Initiate cellular transmission dialing directly to core framework line 112."],
    deadline: "Continuous",
    contactInformation: { phone: "112", email: "emergency-ops@gov.in", office: "Unified Crisis Dispatch Command" },
    multilingual: {
      hi: {
        name: "राष्ट्रीय आपातकालीन कोर लाइफलाइन",
        description: "संकट हस्तक्षेप, स्वास्थ्य खतरों और महत्वपूर्ण सुरक्षा घटनाओं के लिए तत्काल प्रतिक्रिया प्रेषण रूटिंग।",
        process: ["सीधे कोर फ्रेमवर्क लाइन 112 पर कॉल करें।"]
      }
    },
    lastUpdated: "2026-06-01",
    verified: true
  }
];
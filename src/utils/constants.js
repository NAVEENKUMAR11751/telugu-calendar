export const DEFAULT_TITHIS = [
  "Pratipada","Dvitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami",
  "Ashtami","Navami","Dashami","Ekadashi","Dvadashi","Trayodashi","Chaturdashi","Pournami",
  "Pratipada","Dvitiya","Tritiya","Chaturthi","Panchami","Shashthi","Saptami",
  "Ashtami","Navami","Dashami","Ekadashi","Dvadashi","Trayodashi","Chaturdashi","Amavasya"
];

export const DEFAULT_TITHIS_TEL = [
  "పాడ్యమి","విదియ","తదియ","చవితి","పంచమి","షష్టి","సప్తమి",
  "అష్టమి","నవమి","దశమి","ఏకాదశి","ద్వాదశి","త్రయోదశి","చతుర్దశి","పౌర్ణమి",
  "పాడ్యమి","విదియ","తదియ","చవితి","పంచమి","షష్టి","సప్తమి",
  "అష్టమి","నవమి","దశమి","ఏకాదశి","ద్వాదశి","త్రయోదశి","చతుర్దశి","అమావాస్య"
];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const MONTHS_TEL = [
  "జనవరి", "ఫిబ్రవరి", "మార్చి", "ఏప్రిల్", "మే", "జూన్",
  "జూలై", "ఆగస్టు", "సెప్టెంబర్", "అక్టోబర్", "నవంబర్", "డిసెంబర్"
];

export const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export const WEEKDAYS_TEL = ["ఆది", "సోమ", "మంగళ", "బుధ", "గురు", "శుక్ర", "శని"];

export const TELUGU_MONTHS = [
  "పుష్యమి", "మాఘమి", "ఫాల్గుణి", "చైత్రమి", "వైశాఖమి", "జ్యేష్ఠమి",
  "ఆషాఢమి", "శ్రావణమి", "భాద్రపదమి", "ఆశ్వయుజమి", "కార్తీకమి", "మార్గశీర్షమి"
];

export const YEARS = Array.from({ length: 11 }, (_, i) => 2025 + i);

// Bilingual label maps used across all components
export const LABELS = {
  eng: {
    festivals: "Festivals", holidays: "Holidays", sundays: "Sundays",
    teluguMonth: "Telugu Month", paksham: "Paksham", nextFestival: "Next Festival",
    tithi: "Tithi", nakshatra: "Nakshatra", yoga: "Yoga", paksha: "Paksha",
    sunrise: "Sunrise", sunset: "Sunset", eventsLabel: "Events & Festivals",
    noEvents: "No special events today",
    clickHint: "Click any date to view full Panchang details",
    keysHint: "← → keys to navigate", todayBtn: "Today",
    legend: {
      festival: "Festival", ekadashi: "Ekadashi", pournami: "Pournami",
      amavasya: "Amavasya", holiday: "Holiday", sunday: "Sunday", saturday: "Saturday", today: "Today"
    }
  },
  tel: {
    festivals: "పండుగలు", holidays: "సెలవులు", sundays: "ఆదివారాలు",
    teluguMonth: "తెలుగు మాసం", paksham: "పక్షం", nextFestival: "తదుపరి పండుగ",
    tithi: "తిథి", nakshatra: "నక్షత్రం", yoga: "యోగం", paksha: "పక్షం",
    sunrise: "సూర్యోదయం", sunset: "సూర్యాస్తమయం", eventsLabel: "పండుగలు & ఉత్సవాలు",
    noEvents: "ఈ రోజు ప్రత్యేక కార్యక్రమాలు లేవు",
    clickHint: "పూర్తి పంచాంగ వివరాల కొరకు తేదీని నొక్కండి",
    keysHint: "← → నావిగేట్ చేయడానికి", todayBtn: "నేడు",
    legend: {
      festival: "పండుగ", ekadashi: "ఏకాదశి", pournami: "పౌర్ణమి",
      amavasya: "అమావాస్య", holiday: "సెలవు", sunday: "ఆదివారం", saturday: "శనివారం", today: "నేడు"
    }
  }
};

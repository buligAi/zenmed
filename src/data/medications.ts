export interface Medication {
  id: string;
  name: string;
  defaultDosage: string;
  defaultFrequency: string;
  defaultDuration: string;
}

export const medications: Medication[] = [
  {
    id: "1",
    name: "Amoxicillin",
    defaultDosage: "500mg",
    defaultFrequency: "Every 8 hours",
    defaultDuration: "7 days"
  },
  {
    id: "2",
    name: "Metformin",
    defaultDosage: "850mg",
    defaultFrequency: "Twice daily with meals",
    defaultDuration: "30 days"
  },
  {
    id: "3",
    name: "Lisinopril",
    defaultDosage: "10mg",
    defaultFrequency: "Once daily",
    defaultDuration: "30 days"
  },
  {
    id: "4",
    name: "Omeprazole",
    defaultDosage: "20mg",
    defaultFrequency: "Once daily before breakfast",
    defaultDuration: "14 days"
  },
  {
    id: "5",
    name: "Atorvastatin",
    defaultDosage: "40mg",
    defaultFrequency: "Once daily at bedtime",
    defaultDuration: "30 days"
  },
  {
    id: "6",
    name: "Sertraline",
    defaultDosage: "50mg",
    defaultFrequency: "Once daily",
    defaultDuration: "30 days"
  },
  {
    id: "7",
    name: "Levothyroxine",
    defaultDosage: "100mcg",
    defaultFrequency: "Once daily on empty stomach",
    defaultDuration: "30 days"
  },
  {
    id: "8",
    name: "Amlodipine",
    defaultDosage: "5mg",
    defaultFrequency: "Once daily",
    defaultDuration: "30 days"
  },
  {
    id: "9",
    name: "Gabapentin",
    defaultDosage: "300mg",
    defaultFrequency: "Three times daily",
    defaultDuration: "30 days"
  },
  {
    id: "10",
    name: "Azithromycin",
    defaultDosage: "500mg",
    defaultFrequency: "Once daily",
    defaultDuration: "5 days"
  }
];
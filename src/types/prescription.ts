export interface Prescription {
  id: string;
  patientName: string;
  patientId: string;
  patientAge: number;
  patientGender: 'Male' | 'Female' | 'Other';
  patientAddress: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  doctorId: string;
  dispensedBy?: {
    pharmacyId: string;
    pharmacyName: string;
    dispensedAt: string;
  };
  refills?: number;
  refillsRemaining?: number;
}
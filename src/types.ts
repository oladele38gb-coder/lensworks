export interface ServiceItem {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  typicalTurnaround: string;
  commonIssues: string[];
}

export interface RepairFormState {
  equipmentType: string;
  brand: string;
  model: string;
  issueDescription: string;
  urgency: 'standard' | 'priority' | 'rush';
  customerName: string;
  contactMethod: 'whatsapp' | 'email' | 'phone';
  contactValue: string;
  serviceType: 'dropoff' | 'courier';
}

export interface StudioInfo {
  location: string;
  address: string;
  hours: string;
  whatsapp: string;
  email: string;
  instagram: string;
}

export interface EnergyRecord {
  id?: string;
  record_date: string;
  energy_source: string;
  quantity: number;
  unit: string;
  renewable_percentage?: number;
  notes?: string;
}

export interface MaterialRecord {
  id?: string;
  record_date: string;
  material_name: string;
  category: string;
  quantity: number;
  unit: string;
  recycled_content_percentage?: number;
  supplier?: string;
  notes?: string;
}

export interface ProductionRecord {
  id?: string;
  record_date: string;
  product_name: string;
  quantity: number;
  unit: string;
  operating_hours?: number;
  process_name?: string;
  notes?: string;
}

export interface WasteRecord {
  id?: string;
  record_date: string;
  waste_type: string;
  quantity: number;
  unit: string;
  treatment_method: string;
  recovered_quantity?: number;
  disposal_quantity?: number;
  notes?: string;
}
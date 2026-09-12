export interface Facility {
  id: string;
  user_id: string;
  name: string;
  facility_type: string;
  industry_type: string;
  location: string;
  country: string;
  production_unit?: string;
  annual_production?: number;
  production_unit_name?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface FacilityCreateRequest {
  name: string;
  facility_type: string;
  industry_type: string;
  location: string;
  country: string;
  production_unit?: string;
  annual_production?: number;
  production_unit_name?: string;
  description?: string;
}
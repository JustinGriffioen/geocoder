export interface DataRow {
  [key: string]: any;
}

export interface ColumnAnalysis {
  name: string;
  type: 'address' | 'coordinates' | 'postal_code' | 'place_name' | 'admin_boundary' | 'other';
  confidence: number;
  statistics?: {
    min?: number;
    max?: number;
    mean?: number;
    missing?: number;
  };
}

export interface GeocodingResult {
  original: string;
  matched: string;
  coordinates: [number, number];
  confidence: number;
  type: string;
  components: {
    house_number?: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postal_code?: string;
  };
}
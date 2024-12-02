import { ColumnAnalysis, DataRow } from '@/types';
import * as tf from '@tensorflow/tfjs';

export function analyzeColumns(data: DataRow[], columns: string[]): ColumnAnalysis[] {
  return columns.map((column) => analyzeColumn(data, column));
}

function analyzeColumn(data: DataRow[], column: string): ColumnAnalysis {
  const values = data.map((row) => row[column]);
  const nonNullValues = values.filter((value) => value !== null && value !== undefined && value !== '');
  
  // Calculate missing percentage
  const missingPercentage = ((values.length - nonNullValues.length) / values.length) * 100;

  // Try to detect column type
  const { type, confidence } = detectColumnType(nonNullValues);

  // Calculate statistics for numeric columns
  let statistics = {
    missing: Math.round(missingPercentage * 100) / 100
  };

  if (type === 'coordinates') {
    const numericValues = nonNullValues.map((v) => parseFloat(v));
    const tensor = tf.tensor1d(numericValues);
    statistics = {
      ...statistics,
      mean: tensor.mean().dataSync()[0],
      min: tensor.min().dataSync()[0],
      max: tensor.max().dataSync()[0]
    };
  }

  return {
    name: column,
    type,
    confidence,
    statistics
  };
}

function detectColumnType(values: any[]): { type: ColumnAnalysis['type']; confidence: number } {
  if (values.length === 0) return { type: 'other', confidence: 0 };

  const sample = values.slice(0, Math.min(100, values.length));
  let matches = {
    coordinates: 0,
    address: 0,
    postal_code: 0,
    place_name: 0,
    admin_boundary: 0
  };

  for (const value of sample) {
    const strValue = String(value).trim().toLowerCase();

    // Coordinates pattern (lat,lon or lat lon)
    if (/^-?\d+\.?\d*[,\s]+-?\d+\.?\d*$/.test(strValue)) {
      matches.coordinates++;
      continue;
    }

    // Address pattern
    if (/\d+.*(?:street|st|avenue|ave|road|rd|lane|ln|drive|dr|way|court|ct|boulevard|blvd)/i.test(strValue)) {
      matches.address++;
      continue;
    }

    // Postal code pattern
    if (/^\d{5}(?:-\d{4})?$/.test(strValue)) { // US format
      matches.postal_code++;
      continue;
    }

    // Place name pattern
    if (/(?:city|town|village|municipality)/i.test(strValue)) {
      matches.place_name++;
      continue;
    }

    // Administrative boundary pattern
    if (/(?:state|province|region|county|district)/i.test(strValue)) {
      matches.admin_boundary++;
      continue;
    }
  }

  const maxMatches = Math.max(...Object.values(matches));
  const matchType = Object.entries(matches).find(([_, count]) => count === maxMatches)?.[0] as ColumnAnalysis['type'] || 'other';
  const confidence = maxMatches / sample.length;

  return {
    type: matchType,
    confidence
  };
}
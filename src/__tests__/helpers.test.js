import { describe, it, expect } from 'vitest';
import { 
  getAQIInfo, 
  getHealthTip, 
  getPollutantStatus, 
  validateStationForm, 
  calculateEstimatedAQI 
} from '../utils/helpers';

describe('Pollution Visualizer Helpers & Logic Test Suite (FA-2)', () => {
  describe('getAQIInfo US EPA Scale Mapping', () => {
    it('should classify AQI <= 50 as Good', () => {
      const res = getAQIInfo(35);
      expect(res.label).toBe('Good');
      expect(res.level).toBe(1);
      expect(res.colorHex).toBe('#10b981');
    });

    it('should classify AQI 51-100 as Moderate', () => {
      const res = getAQIInfo(85);
      expect(res.label).toBe('Moderate');
      expect(res.level).toBe(2);
    });

    it('should classify AQI 101-150 as Unhealthy for Sensitive Groups', () => {
      const res = getAQIInfo(132);
      expect(res.label).toBe('Unhealthy for Sensitive Groups');
      expect(res.level).toBe(3);
    });

    it('should classify AQI 151-200 as Unhealthy', () => {
      const res = getAQIInfo(185);
      expect(res.label).toBe('Unhealthy');
      expect(res.level).toBe(4);
    });

    it('should classify AQI 201-300 as Very Unhealthy', () => {
      const res = getAQIInfo(265);
      expect(res.label).toBe('Very Unhealthy');
      expect(res.level).toBe(5);
    });

    it('should classify AQI > 300 as Hazardous', () => {
      const res = getAQIInfo(420);
      expect(res.label).toBe('Hazardous');
      expect(res.level).toBe(6);
    });
  });

  describe('getHealthTip Recommendations', () => {
    it('should recommend outdoor activities when air is Good', () => {
      const tip = getHealthTip(25);
      expect(tip).toContain('outdoor');
    });

    it('should recommend N95 mask or precautions when air is Unhealthy', () => {
      const tip = getHealthTip(190);
      expect(tip).toContain('N95');
    });
  });

  describe('getPollutantStatus WHO Benchmarking', () => {
    it('should mark PM2.5 below 15 µg/m³ as Within WHO Limit', () => {
      const status = getPollutantStatus('pm25', 12);
      expect(status.status).toBe('Within WHO Limit');
      expect(status.color).toBe('#10b981');
    });

    it('should detect when PM2.5 exceeds WHO Limit', () => {
      const status = getPollutantStatus('pm25', 45);
      expect(status.status).toContain('WHO Guideline');
      expect(Number(status.ratio)).toBeGreaterThan(2);
    });
  });

  describe('calculateEstimatedAQI EPA Breakpoints', () => {
    it('should calculate valid AQI number from PM2.5 and PM10', () => {
      const aqi = calculateEstimatedAQI(35, 70);
      expect(aqi).toBeGreaterThan(0);
      expect(aqi).toBeLessThanOrEqual(500);
    });

    it('should return higher index when PM concentrations are elevated', () => {
      const low = calculateEstimatedAQI(10, 20);
      const high = calculateEstimatedAQI(180, 250);
      expect(high).toBeGreaterThan(low);
    });
  });

  describe('validateStationForm Form Validation Rules', () => {
    it('should return errors when mandatory fields are missing', () => {
      const invalidData = {
        name: '',
        location: '',
        reportedBy: '',
        contact: 'not-an-email',
        pm25: '-5',
        pm10: '',
        notes: 'short'
      };
      const result = validateStationForm(invalidData);
      expect(result.isValid).toBe(false);
      expect(result.errors.name).toBeDefined();
      expect(result.errors.location).toBeDefined();
      expect(result.errors.contact).toBeDefined();
      expect(result.errors.pm25).toBeDefined();
      expect(result.errors.notes).toBeDefined();
    });

    it('should pass validation when all fields are compliant', () => {
      const validData = {
        name: 'Akurdi Junction Sensor',
        location: 'Sector 26, Nigdi, PCMC',
        reportedBy: 'Ladane Jagannath',
        contact: 'student@pccoepune.org',
        pm25: '34.5',
        pm10: '68.0',
        notes: 'Real-time calibration sensor for vehicle particulate testing.'
      };
      const result = validateStationForm(validData);
      expect(result.isValid).toBe(true);
      expect(Object.keys(result.errors).length).toBe(0);
    });
  });
});

import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const root = new URL('../', import.meta.url);
const elements = JSON.parse(await readFile(new URL('elements.json', root), 'utf8')).elements;
const context = { window: {} };
vm.runInNewContext(await readFile(new URL('phase-data.js', root), 'utf8'), context);
const phaseData = context.window.SCHOLA_PSE_PHASE_DATA;
const standardPhaseConditions = { temperatureC: 25, pressureHpa: 1000 };
const adjustedBoilingPoint = (boilingK, pressureHpa) => {
  if (!Number.isFinite(boilingK) || !Number.isFinite(pressureHpa) || pressureHpa <= 0) return null;
  const denominator = (1 / boilingK) - (8.314 / 85000) * Math.log(pressureHpa / phaseData.referencePressureHpa);
  return denominator > 0 ? 1 / denominator : null;
};
const phaseAt = (element, temperatureC, pressureHpa) => {
  const values = phaseData.elements[element.number];
  if (!values) return 'unbekannt';
  const temperatureK = Math.max(0, temperatureC + 273.15);
  if (Number.isFinite(values.criticalK) && Number.isFinite(values.criticalPressureHpa) && temperatureK > values.criticalK && pressureHpa > values.criticalPressureHpa) return 'überkritisch';
  if (element.number === 2 && pressureHpa < 25300) {
    if (pressureHpa === 0) return temperatureK === 0 ? 'flüssig' : 'gasförmig';
    const heliumBoiling = adjustedBoilingPoint(values.boilingK, pressureHpa);
    return Number.isFinite(heliumBoiling) && temperatureK >= heliumBoiling ? 'gasförmig' : 'flüssig';
  }
  const melting = values.meltingK;
  if (pressureHpa === 0) {
    if (temperatureK === 0) return Number.isFinite(melting) ? 'fest' : 'unbekannt';
    if (Number.isFinite(melting) && temperatureK < melting) return 'sublimierend';
    return Number.isFinite(melting) || Number.isFinite(values.boilingK) ? 'gasförmig' : 'unbekannt';
  }
  const triplePointPressure = { 6: 108000, 33: 36300 }[element.number];
  if (triplePointPressure && pressureHpa < triplePointPressure) {
    const sublimation = adjustedBoilingPoint(values.boilingK, pressureHpa) ?? values.boilingK;
    return Number.isFinite(sublimation) ? (temperatureK < sublimation ? 'fest' : 'gasförmig') : 'unbekannt';
  }
  const boiling = adjustedBoilingPoint(values.boilingK, pressureHpa);
  if (Number.isFinite(melting) && Number.isFinite(boiling) && boiling <= melting) return temperatureK < boiling ? 'fest' : 'gasförmig';
  if (Number.isFinite(melting) && temperatureK < melting) return 'fest';
  if (Number.isFinite(boiling) && temperatureK >= boiling) return 'gasförmig';
  if (Number.isFinite(melting) && Number.isFinite(boiling) && temperatureK >= melting && temperatureK < boiling) return 'flüssig';
  return 'unbekannt';
};

const mismatches = elements.filter(element => element.state !== 'unbekannt' && phaseAt(element, standardPhaseConditions.temperatureC, standardPhaseConditions.pressureHpa) !== element.state).map(element => ({ number: element.number, symbol: element.symbol, stored: element.state, calculated: phaseAt(element, standardPhaseConditions.temperatureC, standardPhaseConditions.pressureHpa) }));
const reversed = elements.filter(element => { const value = phaseData.elements[element.number]; return Number.isFinite(value?.meltingK) && Number.isFinite(value?.boilingK) && value.boilingK <= value.meltingK; }).map(element => ({ number: element.number, symbol: element.symbol, meltingK: phaseData.elements[element.number].meltingK, boilingK: phaseData.elements[element.number].boilingK }));
const zeroKelvin = elements.map(element => ({ number: element.number, symbol: element.symbol, phase: phaseAt(element, -273.15, 0) }));
const vacuumRoomTemperature = elements.map(element => ({ number: element.number, symbol: element.symbol, phase: phaseAt(element, 25, 0) }));
console.log(JSON.stringify({ mismatches, reversed, zeroKelvinSummary: Object.groupBy(zeroKelvin, item => item.phase), vacuumRoomTemperatureSummary: Object.groupBy(vacuumRoomTemperature, item => item.phase), missingMelting: elements.filter(element => !Number.isFinite(phaseData.elements[element.number]?.meltingK)).map(element => element.symbol), missingBoiling: elements.filter(element => !Number.isFinite(phaseData.elements[element.number]?.boilingK)).map(element => element.symbol) }, null, 2));

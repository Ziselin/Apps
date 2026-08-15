import { writeFile } from 'node:fs/promises';

const sourceUrl = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON';
const response = await fetch(sourceUrl);
if (!response.ok) throw new Error(`PubChem antwortet mit ${response.status}.`);
const data = await response.json();
const columns = data.Table.Columns.Column;
const index = Object.fromEntries(columns.map((name, position) => [name, position]));
const numeric = value => /^\d+(\.\d+)?$/.test(value ?? '') ? Number(value) : null;
const elements = Object.fromEntries(data.Table.Row.map(({ Cell: cell }) => [
  Number(cell[index.AtomicNumber]),
  {
    meltingK: numeric(cell[index.MeltingPoint]),
    boilingK: numeric(cell[index.BoilingPoint])
  }
]));
const payload = {
  format: 'schola-pse-phase-data',
  version: 1,
  source: { name: 'PubChem Periodic Table', url: sourceUrl, retrieved: new Date().toISOString().slice(0, 10) },
  referencePressureHpa: 1013.25,
  elements
};
await writeFile(new URL('../phase-data.js', import.meta.url), `window.SCHOLA_PSE_PHASE_DATA = ${JSON.stringify(payload, null, 2)};\n`, 'utf8');

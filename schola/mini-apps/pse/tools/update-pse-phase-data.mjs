import { writeFile } from 'node:fs/promises';

const sourceUrl = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/periodictable/JSON';
const response = await fetch(sourceUrl);
if (!response.ok) throw new Error(`PubChem antwortet mit ${response.status}.`);
const data = await response.json();
const columns = data.Table.Columns.Column;
const index = Object.fromEntries(columns.map((name, position) => [name, position]));
const numeric = value => /^\d+(\.\d+)?$/.test(value ?? '') ? Number(value) : null;
const criticalPoints = {
  1: { criticalK: 33.18, criticalPressureHpa: 13000 },
  2: { criticalK: 5.2, criticalPressureHpa: 2274 },
  7: { criticalK: 126.19, criticalPressureHpa: 33978 },
  8: { criticalK: 154.58, criticalPressureHpa: 50430 },
  17: { criticalK: 416.956, criticalPressureHpa: 79914 },
  18: { criticalK: 150.86, criticalPressureHpa: 48980.5 },
  36: { criticalK: 209.46, criticalPressureHpa: 55201.9 },
  54: { criticalK: 289.74, criticalPressureHpa: 58400 }
};
const elements = Object.fromEntries(data.Table.Row.map(({ Cell: cell }) => [
  Number(cell[index.AtomicNumber]),
  {
    meltingK: numeric(cell[index.MeltingPoint]),
    boilingK: numeric(cell[index.BoilingPoint]),
    ...(criticalPoints[Number(cell[index.AtomicNumber])] ?? {})
  }
]));
const payload = {
  format: 'schola-pse-phase-data',
  version: 1,
  source: { name: 'PubChem Periodic Table', url: sourceUrl, retrieved: new Date().toISOString().slice(0, 10) },
  criticalSource: { name: 'NIST Chemistry WebBook, SRD 69 und NIST SRD/JPCRD', url: 'https://webbook.nist.gov/chemistry/', retrieved: '2026-08-29', note: 'Kritische Punkte werden nur für elementare Stoffe mit dokumentierter kritischer Temperatur und dokumentiertem kritischen Druck geführt.', references: { 1: 'https://webbook.nist.gov/cgi/cbook.cgi?ID=C1333740&Mask=4&Units=SI', 2: 'https://webbook.nist.gov/cgi/cbook.cgi?ID=C7440597&Mask=4&Units=SI', 7: 'https://webbook.nist.gov/cgi/cbook.cgi?ID=C7727379&Mask=4&Units=SI', 8: 'https://webbook.nist.gov/cgi/cbook.cgi?ID=C7782447&Mask=4&Units=SI', 17: 'https://webbook.nist.gov/cgi/cbook.cgi?ID=C7782505&Mask=1C&Units=SI', 18: 'https://webbook.nist.gov/cgi/cbook.cgi?ID=C7440371&Mask=7&Units=SI', 36: 'https://webbook.nist.gov/cgi/cbook.cgi?ID=C7439909&Mask=407&Units=SI', 54: 'https://srd.nist.gov/JPCRD/jpcrd73.pdf' } },
  referencePressureHpa: 1013.25,
  elements
};
await writeFile(new URL('../phase-data.js', import.meta.url), `window.SCHOLA_PSE_PHASE_DATA = ${JSON.stringify(payload, null, 2)};\n`, 'utf8');

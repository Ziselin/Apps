import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const sources={A:'adenine.sdf',T:'thymine.sdf',G:'guanine.sdf',C:'cytosine.sdf'};
const structures={};

for(const [base,file] of Object.entries(sources)){
  const lines=fs.readFileSync(path.join(root,'assets','base-structures',file),'utf8').split(/\r?\n/);
  const counts=lines[3],atomCount=Number(counts.slice(0,3)),bondCount=Number(counts.slice(3,6));
  const atoms=lines.slice(4,4+atomCount).map(line=>({x:Number(line.slice(0,10)),y:Number(line.slice(10,20)),z:Number(line.slice(20,30)),e:line.slice(31,34).trim()}));
  const center=atoms.reduce((sum,a)=>({x:sum.x+a.x,y:sum.y+a.y,z:sum.z+a.z}),{x:0,y:0,z:0});
  center.x/=atoms.length;center.y/=atoms.length;center.z/=atoms.length;
  for(const atom of atoms){atom.x=Number((atom.x-center.x).toFixed(4));atom.y=Number((atom.y-center.y).toFixed(4));atom.z=Number((atom.z-center.z).toFixed(4))}
  const bonds=lines.slice(4+atomCount,4+atomCount+bondCount).map(line=>[Number(line.slice(0,3))-1,Number(line.slice(3,6))-1,Number(line.slice(6,9))]);
  structures[base]={atoms,bonds};
}

fs.writeFileSync(path.join(root,'base-structure-data.js'),`window.DNA_BASE_STRUCTURES=${JSON.stringify(structures)};\n`);

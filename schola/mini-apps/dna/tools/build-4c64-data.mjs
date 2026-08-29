import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(import.meta.dirname,'..');
const pdb=fs.readFileSync(path.join(root,'4C64.pdb'),'utf8');
const atoms=pdb.split(/\r?\n/).filter(line=>line.startsWith('ATOM  ')).map(line=>({
  name:line.slice(12,16).trim(),
  residue:line.slice(17,20).trim(),
  chain:line.slice(21,22),
  residueNumber:Number(line.slice(22,26)),
  x:Number(line.slice(30,38)),y:Number(line.slice(38,46)),z:Number(line.slice(46,54)),
  element:line.slice(76,78).trim()||line.slice(12,16).trim().replace(/[^A-Za-z]/g,'')[0]
})).filter(atom=>['C','N','O','P'].includes(atom.element));

const center=atoms.reduce((sum,a)=>[sum[0]+a.x,sum[1]+a.y,sum[2]+a.z],[0,0,0]).map(v=>v/atoms.length);
const covariance=[[0,0,0],[0,0,0],[0,0,0]];
for(const a of atoms){const d=[a.x-center[0],a.y-center[1],a.z-center[2]];for(let i=0;i<3;i++)for(let j=0;j<3;j++)covariance[i][j]+=d[i]*d[j]}
const normalize=v=>{const length=Math.hypot(...v)||1;return v.map(n=>n/length)},cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],dot=(a,b)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
let axis=normalize([1,1,1]);for(let i=0;i<40;i++)axis=normalize(covariance.map(row=>dot(row,axis)));if(axis[2]<0)axis=axis.map(v=>-v);
const reference=Math.abs(axis[2])<.9?[0,0,1]:[1,0,0],horizontal=normalize(cross(reference,axis)),depth=normalize(cross(axis,horizontal)),scale=14;
const transform=(a,extra={})=>{const d=[a.x-center[0],a.y-center[1],a.z-center[2]];return{x:+(dot(d,horizontal)*scale).toFixed(3),y:+(-dot(d,axis)*scale).toFixed(3),z:+(dot(d,depth)*scale).toFixed(3),...extra}};
const points=atoms.map(a=>transform(a,{e:a.element,n:a.name,r:a.residue,c:a.chain,i:a.residueNumber}));
const radii={C:.76,N:.71,O:.66,P:1.07},bonds=[];
for(let i=0;i<atoms.length;i++)for(let j=i+1;j<atoms.length;j++){
  const a=atoms[i],b=atoms[j];
  if(a.chain!==b.chain||Math.abs(a.residueNumber-b.residueNumber)>1)continue;
  const distance=Math.hypot(a.x-b.x,a.y-b.y,a.z-b.z),limit=radii[a.element]+radii[b.element]+.45;
  if(distance>.4&&distance<=limit)bonds.push([i,j]);
}
const neighbours=Array.from({length:atoms.length},()=>[]);for(const [a,b] of bonds){neighbours[a].push(b);neighbours[b].push(a)}
const hCount=(a,index)=>{
  if(a.name==="C5'"||a.name==="C2'")return 2;
  if(a.name==="C4'"||a.name==="C3'"||a.name==="C1'")return 1;
  if((a.name==="O5'"||a.name==="O3'")&&neighbours[index].length===1)return 1;
  if(a.residue==='DA')return a.name==='N6'?2:['C2','C8'].includes(a.name)?1:0;
  if(a.residue==='DG')return a.name==='N2'?2:['C8','N1'].includes(a.name)?1:0;
  if(a.residue==='DC')return a.name==='N4'?2:['C5','C6'].includes(a.name)?1:0;
  if(a.residue==='DT')return a.name==='C7'?3:['C6','N3'].includes(a.name)?1:0;
  return 0;
};
const unit=v=>{const n=Math.hypot(...v)||1;return v.map(x=>x/n)},add=(a,b)=>a.map((x,i)=>x+b[i]),mul=(v,s)=>v.map(x=>x*s);
const hydrogens=[];
for(let index=0;index<atoms.length;index++){
  const parent=atoms[index],count=hCount(parent,index);if(!count)continue;
  const origin=[parent.x,parent.y,parent.z],directions=neighbours[index].map(j=>unit([atoms[j].x-parent.x,atoms[j].y-parent.y,atoms[j].z-parent.z]));
  let away=unit(mul(directions.reduce((sum,v)=>add(sum,v),[0,0,0]),-1));
  if(!away.every(Number.isFinite)||Math.hypot(...away)<.5)away=[1,0,0];
  let reference=directions[0]||[0,1,0],side=unit(cross(away,reference));if(Math.hypot(...side)<.5)side=unit(cross(away,Math.abs(away[2])<.8?[0,0,1]:[0,1,0]));
  const other=unit(cross(away,side)),vectors=[];
  if(count===1)vectors.push(away);
  if(count===2){vectors.push(unit(add(mul(away,.58),mul(side,.82))),unit(add(mul(away,.58),mul(side,-.82))));}
  if(count===3)for(let k=0;k<3;k++){const angle=k*2*Math.PI/3,radial=add(mul(side,Math.cos(angle)),mul(other,Math.sin(angle)));vectors.push(unit(add(mul(away,.333),mul(radial,.943))))}
  const length=parent.element==='O'?.96:parent.element==='N'?1.01:1.09;
  for(const vector of vectors){const position=add(origin,mul(vector,length));hydrogens.push(transform({x:position[0],y:position[1],z:position[2]},{e:'H',parent:index}))}
}
const data={pdb:'4C64',method:'X-RAY DIFFRACTION',resolutionAngstrom:1.32,sequence:"CGCGAATTCGCG",atoms:points,bonds,hydrogens};
fs.writeFileSync(path.join(root,'structure-data.js'),`window.DNA_STRUCTURE_4C64=${JSON.stringify(data)};\n`);
console.log(`4C64: ${points.length} experimentelle Schweratome, ${bonds.length} kovalente Bindungen, ${hydrogens.length} modellierte H-Atome.`);

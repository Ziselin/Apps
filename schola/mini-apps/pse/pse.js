const table=document.getElementById('periodicTable');
const legend=document.getElementById('legend');
const tableView=document.getElementById('tableView');
const detailView=document.getElementById('detailView');
const detail=document.getElementById('elementDetail');
const categories=['alkali','alkaline','transition','post-transition','metalloid','nonmetal','halogen','noble','lanthanide','actinide'];
let elements=[];

function categoryClass(element){return `category-${element.category}`}
function tileMass(value,atomicNumber){const parsed=Number(value);if(!Number.isFinite(parsed))return value;return atomicNumber>=100?Math.round(parsed).toLocaleString('de-DE'):parsed.toLocaleString('de-DE',{maximumFractionDigits:2})}
function showTable(){document.querySelector('.app-head').hidden=false;detailView.hidden=true;tableView.hidden=false;history.replaceState(null,'',location.pathname);document.querySelector(`[data-number="${detail.dataset.number}"]`)?.focus()}
function showElement(element,updateUrl=true){
  document.querySelector('.app-head').hidden=true;
  tableView.hidden=true;detailView.hidden=false;detail.dataset.number=element.number;
  const group=element.group??'–';
  detail.innerHTML=`<div class="detail-tile ${categoryClass(element)}"><span class="detail-number">${element.number}</span><strong class="detail-symbol">${element.symbol}</strong><span class="detail-name">${element.name}</span></div><div class="detail-info"><span class="eyebrow">Element ${element.number}</span><h2>${element.name}</h2><p class="detail-mass">${element.mass} u</p><dl class="facts"><div><dt>Symbol</dt><dd>${element.symbol}</dd></div><div><dt>Ordnungszahl</dt><dd>${element.number}</dd></div><div><dt>Gruppe</dt><dd>${group}</dd></div><div><dt>Periode</dt><dd>${element.period}</dd></div><div><dt>Elementgruppe</dt><dd>${element.categoryName}</dd></div><div><dt>Aggregatzustand</dt><dd>${element.state}</dd></div></dl></div>`;
  if(updateUrl)history.replaceState(null,'',`?element=${encodeURIComponent(element.symbol)}`);
}
function render(){
  for(let group=1;group<=18;group++){const label=document.createElement('span');label.className='group-number';label.style.gridColumn=group;label.style.gridRow=1;label.textContent=group;table.append(label)}
  const labels=[{row:7,text:'57–71',category:'lanthanide'},{row:8,text:'89–103',category:'actinide'}];
  labels.forEach(item=>{const node=document.createElement('span');node.className=`series-label category-${item.category}`;node.style.gridColumn='3';node.style.gridRow=item.row;node.textContent=item.text;table.append(node)});
  elements.forEach(element=>{const button=document.createElement('button');button.type='button';button.className=`element ${categoryClass(element)}`;button.dataset.number=element.number;button.style.gridColumn=element.gridColumn;button.style.gridRow=element.gridRow;button.setAttribute('aria-label',`${element.name}, Ordnungszahl ${element.number}`);button.innerHTML=`<span class="element-number">${element.number}</span><span class="element-mass">${tileMass(element.mass,element.number)}</span><strong class="element-symbol">${element.symbol}</strong><span class="element-name">${element.name}</span>`;button.onclick=()=>showElement(element);table.append(button)});
  categories.forEach(category=>{const element=elements.find(item=>item.category===category);if(!element)return;const item=document.createElement('span');item.className=`category-${category}`;item.innerHTML=`<i aria-hidden="true"></i>${element.categoryName}`;legend.append(item)});
  const requested=new URLSearchParams(location.search).get('element');if(requested){const found=elements.find(item=>item.symbol.toLowerCase()===requested.toLowerCase()||String(item.number)===requested);if(found)showElement(found,false)}
}
document.getElementById('backButton').onclick=showTable;
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!detailView.hidden)showTable()});
try{
  const data=window.SCHOLA_PSE_DATA;
  if(!data||!Array.isArray(data.elements)||data.elements.length!==118)throw new Error('Elementdaten sind unvollständig.');
  elements=data.elements;
  render();
}catch(error){
  console.error('PSE-Daten konnten nicht geladen werden.',error);
  document.getElementById('loadError').hidden=false;
  tableView.hidden=true;
}

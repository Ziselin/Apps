const table=document.getElementById('periodicTable');
const legend=document.getElementById('legend');
const tableView=document.getElementById('tableView');
const detailView=document.getElementById('detailView');
const detail=document.getElementById('elementDetail');
const categories=['alkali','alkaline','transition','post-transition','metalloid','nonmetal','halogen','noble','lanthanide','actinide'];
let elements=[];

function categoryClass(element){return `category-${element.category}`}
function tileMass(value){const parsed=Number(value);return Number.isFinite(parsed)?parsed.toLocaleString('de-DE',{maximumFractionDigits:2}):value}
function roundedTileMass(value){const parsed=Number(value);return Number.isFinite(parsed)?Math.ceil(parsed).toLocaleString('de-DE'):value}
function massCollides(button){const number=button.querySelector('.element-number'),mass=button.querySelector('.element-mass');if(getComputedStyle(number).display==='none'||getComputedStyle(mass).display==='none')return false;return number.getBoundingClientRect().right+2>mass.getBoundingClientRect().left}
function fitTileMasses(){document.querySelectorAll('.element').forEach(button=>{const mass=button.querySelector('.element-mass'),raw=mass.dataset.mass;mass.style.display='';mass.textContent=tileMass(raw);mass.classList.remove('is-rounded');if(!massCollides(button))return;mass.textContent=roundedTileMass(raw);mass.classList.add('is-rounded');if(massCollides(button))mass.style.display='none'})}
function hasSymbolNameCollision(){return[...document.querySelectorAll('.element')].some(button=>{const symbol=button.querySelector('.element-symbol'),name=button.querySelector('.element-name');if(getComputedStyle(name).display==='none')return false;return symbol.getBoundingClientRect().bottom+1>name.getBoundingClientRect().top})}
function hasMetaSymbolCollision(){return[...document.querySelectorAll('.element')].some(button=>{const number=button.querySelector('.element-number'),mass=button.querySelector('.element-mass'),symbol=button.querySelector('.element-symbol');if(getComputedStyle(number).display==='none')return false;const metaBottom=Math.max(number.getBoundingClientRect().bottom,getComputedStyle(mass).display==='none'?0:mass.getBoundingClientRect().bottom);return metaBottom+2>symbol.getBoundingClientRect().top})}
function fitTileContent(){table.classList.remove('pse-hide-names','pse-hide-meta');fitTileMasses();if(hasSymbolNameCollision())table.classList.add('pse-hide-names');if(hasMetaSymbolCollision())table.classList.add('pse-hide-meta')}
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
  elements.forEach(element=>{const button=document.createElement('button');button.type='button';button.className=`element ${categoryClass(element)}`;button.dataset.number=element.number;button.style.gridColumn=element.gridColumn;button.style.gridRow=element.gridRow;button.setAttribute('aria-label',`${element.name}, Ordnungszahl ${element.number}`);button.innerHTML=`<span class="element-number">${element.number}</span><span class="element-mass" data-mass="${element.mass}">${tileMass(element.mass)}</span><strong class="element-symbol">${element.symbol}</strong><span class="element-name">${element.name}</span>`;button.onclick=()=>showElement(element);table.append(button)});
  categories.forEach(category=>{const element=elements.find(item=>item.category===category);if(!element)return;const item=document.createElement('span');item.className=`category-${category}`;item.innerHTML=`<i aria-hidden="true"></i>${element.categoryName}`;legend.append(item)});
  requestAnimationFrame(fitTileContent);
  const requested=new URLSearchParams(location.search).get('element');if(requested){const found=elements.find(item=>item.symbol.toLowerCase()===requested.toLowerCase()||String(item.number)===requested);if(found)showElement(found,false)}
}
document.getElementById('backButton').onclick=showTable;
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!detailView.hidden)showTable()});
let resizeFrame=0;window.addEventListener('resize',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(fitTileContent)});
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

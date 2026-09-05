// Run with NODE_PATH pointing to the bundled Playwright package directory.
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const {pathToFileURL}=require('node:url');
const path=require('node:path');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
 await page.locator('.palette-item').first().click();
 assert.equal(await page.locator('.node').count(),0,'Palette click must not create a node');
 await page.locator('#frameworkButton').click();
 assert.equal(await page.locator('.group').count(),12);
 await page.locator('#undoButton').click();assert.equal(await page.locator('.group').count(),0);
 await page.locator('#redoButton').click();assert.equal(await page.locator('.group').count(),12);
 // Independent persisted fixture exercises nesting, links and exact outline anchors.
 const model={version:1,title:'Beispiel: Institutionen und Beziehungen',mode:'basic',view:{zoom:1},groups:[],elements:[
  {id:'people',type:'people',label:'Bevölkerung',visual:{x:200,y:500,width:260},properties:{}},
  {id:'parliament',type:'parliament',label:'Parlament',visual:{x:200,y:200},properties:{}},
  {id:'chamber',type:'parliament',label:'Erste Kammer',parentId:'parliament',visual:{x:0,y:0},properties:{}},
  {id:'government',type:'government',label:'Regierung',visual:{x:620,y:200},properties:{}}
 ],relations:[{id:'r1',source:'people',target:'parliament',type:'wählt',properties:{source:'Art. 20 Abs. 2 GG: Staatsgewalt geht vom Volke aus'},visual:{sourcePort:{side:'top',t:.25},targetPort:{side:'bottom',t:.75}}}]};
 await page.evaluate(m=>localStorage.setItem('schola-staatsbaukasten-v1',JSON.stringify(m)),model);await page.reload();
 const from=await page.locator('.node[data-id="people"]').boundingBox(),to=await page.locator('.node[data-id="government"]').boundingBox();
 assert.equal(await page.locator('.port-marker').count(),0,'No ports without hover or selected edge');
 await page.mouse.move(from.x+from.width*.7,from.y+1);await page.waitForTimeout(50);
 assert.ok(await page.locator('.port-markers[data-node="people"] .port-marker').count()>0,'Hovered node shows its ports');
 assert.equal(await page.locator('.port-markers[data-node="government"] .port-marker').count(),0,'Other ports stay hidden before connection starts');
 await page.locator('.port-markers[data-node="people"] .port-marker.is-hot').click();
 assert.ok(await page.locator('.port-markers[data-node="government"] .port-marker').count()>0,'All ports show after selecting start');
 await page.mouse.move(to.x+to.width*.6,to.y+to.height-1);
 const hotTarget=await page.locator('.port-markers[data-node="government"] .port-marker.is-hot').boundingBox();
 await page.mouse.click(hotTarget.x+hotTarget.width/2,hotTarget.y+hotTarget.height/2);
 await page.locator('#confirmRelation').click();
 await page.waitForTimeout(350);
 const created=await page.evaluate(()=>JSON.parse(localStorage.getItem('schola-staatsbaukasten-v1')).relations.at(-1));
 assert.equal(created.visual.sourcePort.side,'top');
 assert.ok(Math.abs(created.visual.sourcePort.t-.7)<.05);
 assert.equal(created.visual.targetPort.side,'bottom');
 assert.ok(Math.abs(created.visual.targetPort.t-.6)<.06);
 await page.locator('#undoButton').click();
 await page.locator('.edge-label').click();
 assert.equal(await page.locator('.edge-source-mark').count(),1,'Source marker appears above labelled relation');
 assert.match(await page.locator('#edgeInspector input[name="source"]').inputValue(),/Art\. 20/);
 assert.equal(await page.locator('.port-markers').count(),2,'Selected edge shows ports only on its two connected nodes');
 await page.locator('#sourceSide').selectOption('right');
 await page.locator('#sourceOffset').fill('31');await page.locator('#sourceOffset').dispatchEvent('input');
 await page.waitForTimeout(350);
 const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('schola-staatsbaukasten-v1')));
 assert.equal(saved.relations[0].visual.sourcePort.side,'right');assert.ok(Math.abs(saved.relations[0].visual.sourcePort.t-.31)<.2);
 assert.equal(await page.locator('.endpoint-handle').count(),2);
 const handle=await page.locator('.endpoint-handle[data-end="source"]').boundingBox();
 await page.mouse.move(handle.x+handle.width/2,handle.y+handle.height/2);await page.mouse.down();
 await page.mouse.move(from.x+from.width,from.y+from.height*.8,{steps:6});await page.mouse.up();
 await page.waitForTimeout(350);
 const dragged=await page.evaluate(()=>JSON.parse(localStorage.getItem('schola-staatsbaukasten-v1')).relations[0].visual.sourcePort);
 assert.equal(dragged.side,'right');assert.ok(Math.abs(dragged.t-.8)<.2);
 assert.ok(await page.locator('.port-marker').count()>10);
 const segment=page.locator('.segment-handle').nth(1),coords=await segment.evaluate(el=>{const p=el.ownerSVGElement.createSVGPoint();p.x=(+el.getAttribute('x1') + +el.getAttribute('x2'))/2;p.y=(+el.getAttribute('y1') + +el.getAttribute('y2'))/2;const q=p.matrixTransform(el.getScreenCTM());return{x:q.x,y:q.y,horizontal:el.getAttribute('y1')===el.getAttribute('y2')}});
 await page.mouse.move(coords.x,coords.y);await page.mouse.down();await page.mouse.move(coords.x+(coords.horizontal?0:35),coords.y+(coords.horizontal?35:0),{steps:5});await page.mouse.up();await page.waitForTimeout(350);
 const manual=await page.evaluate(()=>JSON.parse(localStorage.getItem('schola-staatsbaukasten-v1')).relations[0].visual.manualRoute);assert.ok(manual?.length>=3,'Segment dragging persists a manual route');
 for(let i=1;i<manual.length;i++)assert.ok(manual[i].x===manual[i-1].x||manual[i].y===manual[i-1].y,'Manual route stays orthogonal');
 const corner=page.locator('.corner-handle').first(),cb=await corner.boundingBox();assert.ok(cb);
 await page.mouse.move(cb.x+cb.width/2,cb.y+cb.height/2);await page.mouse.down();await page.mouse.move(cb.x+cb.width/2+27,cb.y+cb.height/2+29,{steps:6});await page.mouse.up();await page.waitForTimeout(350);
 const beforeDelete=await page.locator('.corner-handle').count();
 await page.locator('.corner-handle').first().click({button:'right'});assert.equal(await page.locator('.corner-handle').count(),beforeDelete-1);
 await page.locator('#undoButton').click();await page.locator('.edge-label').click();assert.equal(await page.locator('.corner-handle').count(),beforeDelete);
 assert.equal(await page.locator('#connectionHint').isVisible(),false);
 // Fit must not move semantic objects.
 await page.locator('#fitButton').click();await page.locator('#viewButton').click();
 assert.equal(await page.locator('#diagramPreview svg').count(),1);
 await page.locator('#exportButton').click();const download=page.waitForEvent('download');await page.locator('#exportSvgButton').click();await download;
 const popupEvent=page.waitForEvent('popup');await page.locator('#printPdfButton').click();const printPage=await popupEvent;await printPage.waitForLoadState();
 assert.equal(await printPage.locator('svg').count(),1);await printPage.pdf({path:path.join(__dirname,'preview-verified.pdf'),preferCSSPageSize:true});await printPage.close();
 await page.locator('#exportDialog button[value="cancel"]').click();
 await page.screenshot({path:path.join(__dirname,'preview-verified.png'),fullPage:true});
 assert.deepEqual(errors,[],'No browser runtime errors');
 await browser.close();console.log('UI: palette, framework, undo/redo, ports, diagram and SVG download passed.');
})().catch(e=>{console.error(e);process.exit(1)});

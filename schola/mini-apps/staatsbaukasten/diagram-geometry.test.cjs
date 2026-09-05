const assert=require('node:assert/strict');
const G=require('./diagram-geometry.js');
const source={l:0,r:180,t:100,b:160},target={l:600,r:780,t:100,b:160};
for(const side of ['top','bottom','left','right']){
  const port={side,t:.27},p=G.anchor(source,port);
  assert.equal(G.nearestPort(source,p).side,side);
  assert.ok(Math.abs(G.nearestPort(source,p).t-port.t)<1e-9);
  const obstacle={l:290,r:460,t:60,b:200};
  const result=G.route(source,target,port,{side:'left',t:.73},[obstacle]);
  assert.equal(result.blocked,false);
  assert.deepEqual(result.points[0],p);
  assert.deepEqual(result.points.at(-1),G.anchor(target,{side:'left',t:.73}));
  for(let i=1;i<result.points.length;i++){
    const a=result.points[i-1],b=result.points[i];
    assert.ok(a.x===b.x||a.y===b.y,'Every segment is orthogonal');
    assert.equal(G.blocked(a,b,[obstacle]),false,'Route avoids obstacle');
  }
}
assert.equal(G.project([{x:0,y:0},{x:100,y:0},{x:100,y:100}],{x:100,y:50}),.75);
console.log('Geometry: precise ports, obstacle routing and label projection passed.');
// Every side uses the same canvas-space spacing, regardless of element size.
const gridGeometry=require('./diagram-geometry.js');
for(const width of [150,180,260,700]){const box={l:0,r:width,t:0,b:54},ports=gridGeometry.ports(box).filter(p=>p.side==='top');for(let i=1;i<ports.length;i++)require('node:assert/strict').ok(Math.abs(gridGeometry.anchor(box,ports[i]).x-gridGeometry.anchor(box,ports[i-1]).x-20)<1e-8);}
for(const index of [0,1,2]){const points=[{x:0,y:0},{x:0,y:50},{x:100,y:50},{x:100,y:100}],moved=gridGeometry.moveSegment(points,index,25);require('node:assert/strict').deepEqual(moved[0],points[0]);require('node:assert/strict').deepEqual(moved.at(-1),points.at(-1));for(let i=1;i<moved.length;i++)require('node:assert/strict').ok(moved[i].x===moved[i-1].x||moved[i].y===moved[i-1].y);}
const magneticGeometry=require('./diagram-geometry.js'),magneticAssert=require('node:assert/strict');
magneticAssert.deepEqual(magneticGeometry.magneticPoint({x:8,y:50},[{x:0,y:0}]),{x:0,y:50});
const diagonalSnap=magneticGeometry.magneticPoint({x:50,y:54},[{x:0,y:0}]);magneticAssert.ok(Math.abs(diagonalSnap.x-diagonalSnap.y)<1e-8);
magneticAssert.deepEqual(magneticGeometry.magneticPoint({x:30,y:70},[{x:0,y:0}]),{x:30,y:70});

// The arrowhead always receives a perpendicular lead at least one arrow length long.
const targetBox={l:100,r:200,t:100,b:160};
for(const port of [{side:'left',t:.5},{side:'right',t:.5},{side:'top',t:.5},{side:'bottom',t:.5}]){
 const routed=magneticGeometry.ensureTargetLead([{x:20,y:20},{x:130,y:130}],targetBox,port),tip=routed.at(-1),back=routed.at(-2);
 const normal={left:{x:-1,y:0},right:{x:1,y:0},top:{x:0,y:-1},bottom:{x:0,y:1}}[port.side];
 magneticAssert.ok(Math.abs((back.x-tip.x)*normal.y-(back.y-tip.y)*normal.x)<1e-8,'Terminal segment is perpendicular to outline');
 magneticAssert.ok((back.x-tip.x)*normal.x+(back.y-tip.y)*normal.y>=magneticGeometry.TARGET_LEAD,'Terminal segment is at least one arrow length');
 const sourced=magneticGeometry.ensureSourceLead([{x:130,y:130},{x:230,y:130}],targetBox,port),start=sourced[0],after=sourced[1];
 magneticAssert.ok(Math.abs((after.x-start.x)*normal.y-(after.y-start.y)*normal.x)<1e-8,'Source segment leaves outline perpendicularly');
 magneticAssert.ok((after.x-start.x)*normal.x+(after.y-start.y)*normal.y>=magneticGeometry.SOURCE_LEAD,'First bend stays at least one arrow length away');
}

const clearBox={l:20,r:80,t:20,b:70},cleared=magneticGeometry.clearSegment([{x:0,y:20},{x:100,y:20},{x:100,y:100}],0,[clearBox]);
magneticAssert.ok(Math.abs(cleared[0].y-clearBox.t)>=magneticGeometry.ARROW_LENGTH,'Parallel segment is pushed away from outline');
magneticAssert.equal(magneticGeometry.pathBlocked([{x:0,y:0},{x:100,y:100}],[{l:35,r:65,t:35,b:65}]),true,'Diagonal routes cannot pass through an element');
magneticAssert.equal(magneticGeometry.pathBlocked([{x:0,y:20},{x:100,y:20}],[{l:35,r:65,t:35,b:65}]),false,'A route outside an element remains valid');
const inserted=magneticGeometry.insertPoint([{x:0,y:0},{x:100,y:0}],{x:42,y:9});
magneticAssert.equal(inserted.index,1);magneticAssert.deepEqual(inserted.point,{x:42,y:0});magneticAssert.equal(inserted.points.length,3);
magneticAssert.deepEqual(magneticGeometry.simplify([{x:0,y:0},{x:20,y:0},{x:50,y:0},{x:50,y:30},{x:50,y:60}]),[{x:0,y:0},{x:50,y:0},{x:50,y:60}],'Collinear runs keep only start and end points');

// Moving either connected element preserves its adjacent segment and adds only orthogonal bridges.
const attachedBase=[{x:0,y:0},{x:0,y:30},{x:80,y:30},{x:80,y:100}];
for(const end of ['source','target']){
 const moved=magneticGeometry.moveAttached(attachedBase,end,17,23),baseVector=end==='source'?{x:0,y:30}:{x:0,y:70},a=end==='source'?moved[0]:moved.at(-2),b=end==='source'?moved[1]:moved.at(-1);
 magneticAssert.deepEqual({x:b.x-a.x,y:b.y-a.y},baseVector,'Adjacent segment keeps direction and length');
 for(let i=1;i<moved.length;i++)magneticAssert.ok(moved[i].x===moved[i-1].x||moved[i].y===moved[i-1].y,'Moving an element creates orthogonal bridges only');
}

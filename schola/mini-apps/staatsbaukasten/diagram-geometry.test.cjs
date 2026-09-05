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

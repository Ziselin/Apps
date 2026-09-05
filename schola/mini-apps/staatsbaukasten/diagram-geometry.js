/* Shared, DOM-independent geometry for editor, routing and export. */
(function(root){
  'use strict';
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const normals={left:{x:-1,y:0},right:{x:1,y:0},top:{x:0,y:-1},bottom:{x:0,y:1}};
  function anchor(box,port){const side=normals[port?.side]?port.side:'right',t=clamp(Number(port?.t??.5),0,1);return side==='left'||side==='right'?{x:side==='left'?box.l:box.r,y:box.t+(box.b-box.t)*t}:{x:box.l+(box.r-box.l)*t,y:side==='top'?box.t:box.b}}
  function nearestPort(box,p){const choices=[['left',Math.abs(p.x-box.l)],['right',Math.abs(p.x-box.r)],['top',Math.abs(p.y-box.t)],['bottom',Math.abs(p.y-box.b)]].sort((a,b)=>a[1]-b[1]);const side=choices[0][0];return{side,t:clamp(side==='left'||side==='right'?(p.y-box.t)/(box.b-box.t):(p.x-box.l)/(box.r-box.l),.02,.98)}}
  function blocked(a,b,boxes){return boxes.some(r=>a.x===b.x?a.x>r.l+.01&&a.x<r.r-.01&&Math.max(a.y,b.y)>r.t+.01&&Math.min(a.y,b.y)<r.b-.01:a.y>r.t+.01&&a.y<r.b-.01&&Math.max(a.x,b.x)>r.l+.01&&Math.min(a.x,b.x)<r.r-.01)}
  const length=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
  function simplify(p){return p.filter((v,i)=>!i||v.x!==p[i-1].x||v.y!==p[i-1].y).filter((v,i,a)=>!i||i===a.length-1||!((a[i-1].x===v.x&&v.x===a[i+1].x)||(a[i-1].y===v.y&&v.y===a[i+1].y)))}
  function route(source,target,sourcePort,targetPort,obstacles=[]){
    const a=anchor(source,sourcePort),b=anchor(target,targetPort),na=normals[sourcePort.side],nb=normals[targetPort.side],start={x:a.x+na.x*18,y:a.y+na.y*18},end={x:b.x+nb.x*18,y:b.y+nb.y*18};
    const boxes=obstacles.concat([source,target]);
    const xs=[...new Set([start.x,end.x,...boxes.flatMap(r=>[r.l-18,r.r+18])])].sort((a,b)=>a-b),ys=[...new Set([start.y,end.y,...boxes.flatMap(r=>[r.t-18,r.b+18])])].sort((a,b)=>a-b);
    const nx=xs.length,ny=ys.length,idx=(x,y)=>y*nx+x,si=idx(xs.indexOf(start.x),ys.indexOf(start.y)),ei=idx(xs.indexOf(end.x),ys.indexOf(end.y));
    const points=ys.flatMap(y=>xs.map(x=>({x,y}))),dist=new Map([[si*3,0]]),prev=new Map(),open=[{id:si*3,cost:0}];let goal=null;
    // Direction is part of the state, so bend penalties do not discard valid routes.
    while(open.length){open.sort((a,b)=>b.cost-a.cost);const cur=open.pop();if(cur.cost!==dist.get(cur.id))continue;const cell=Math.floor(cur.id/3),dir=cur.id%3;if(cell===ei){goal=cur.id;break}const x=cell%nx,y=Math.floor(cell/nx);for(const [xx,yy,nd] of [[x-1,y,1],[x+1,y,1],[x,y-1,2],[x,y+1,2]]){if(xx<0||yy<0||xx>=nx||yy>=ny)continue;const ni=idx(xx,yy),p=points[cell],q=points[ni];if(blocked(p,q,boxes))continue;const id=ni*3+nd,cost=cur.cost+length(p,q)+(dir&&dir!==nd?22:0);if(cost<(dist.get(id)??Infinity)){dist.set(id,cost);prev.set(id,cur.id);open.push({id,cost})}}}
    if(goal===null){return {points:simplify([a,start,{x:end.x,y:start.y},end,b]),blocked:true}}
    const path=[];for(let id=goal;id!==undefined;id=prev.get(id))path.push(points[Math.floor(id/3)]);
    return {points:simplify([a,...path.reverse(),b]),blocked:false};
  }
  function project(points,p){let total=0,best={distance:Infinity,t:.5};const sizes=points.slice(1).map((b,i)=>length(points[i],b)),sum=sizes.reduce((a,b)=>a+b,0);for(let i=0;i<sizes.length;i++){const a=points[i],b=points[i+1],dx=b.x-a.x,dy=b.y-a.y,u=clamp(((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1),0,1),q={x:a.x+u*dx,y:a.y+u*dy},d=Math.hypot(p.x-q.x,p.y-q.y);if(d<best.distance)best={distance:d,t:(total+u*sizes[i])/(sum||1)};total+=sizes[i]}return best.t}
  function magneticPoint(p,neighbors,zoom=1){const lines=neighbors.flatMap(n=>[0,Math.PI/2,Math.PI/4,-Math.PI/4].map((angle,i)=>{const d={x:i===1?0:Math.cos(angle),y:i===0?0:Math.sin(angle)},u=(p.x-n.x)*d.x+(p.y-n.y)*d.y,q={x:n.x+u*d.x,y:n.y+u*d.y},distance=Math.hypot(p.x-q.x,p.y-q.y);return{n,d,q,distance,limit:(i<2?12:6)/zoom,rank:i<2?0:1}})).filter(l=>l.distance<=l.limit).sort((a,b)=>a.rank-b.rank||a.distance-b.distance);if(!lines.length)return p;const first=lines[0];for(const other of lines.slice(1)){const cross=first.d.x*other.d.y-first.d.y*other.d.x;if(Math.abs(cross)<.001)continue;const dx=other.n.x-first.n.x,dy=other.n.y-first.n.y,u=(dx*other.d.y-dy*other.d.x)/cross,q={x:first.n.x+u*first.d.x,y:first.n.y+u*first.d.y};if(Math.hypot(q.x-p.x,q.y-p.y)<=first.limit)return q}return first.q}
  const PORT_STEP=20;
  function ports(box){return Object.keys(normals).flatMap(side=>{const size=side==='left'||side==='right'?box.b-box.t:box.r-box.l,count=Math.max(1,Math.floor((size-12)/PORT_STEP)+1),start=(size-(count-1)*PORT_STEP)/2;return Array.from({length:count},(_,i)=>({side,t:(start+i*PORT_STEP)/size}))})}
  function snapPort(box,port){return ports(box).filter(p=>p.side===port.side).sort((a,b)=>Math.abs(a.t-port.t)-Math.abs(b.t-port.t))[0]}
  function moveSegment(points,index,delta){const p=points.map(v=>({...v})),a=p[index],b=p[index+1],horizontal=Math.abs(a.y-b.y)<.001,key=horizontal?'y':'x';a[key]+=delta;b[key]+=delta;if(index===0)p.unshift({...points[0]});if(index===points.length-2)p.push({...points.at(-1)});return p}
  function attachRoute(points,a,b){const p=points.map(v=>({...v}));if(p.length<3)return null;const first=p[0],last=p.at(-1);if(Math.abs(first.x-p[1].x)<.001)p[1].x=a.x;else p[1].y=a.y;if(Math.abs(last.x-p.at(-2).x)<.001)p.at(-2).x=b.x;else p.at(-2).y=b.y;p[0]=a;p[p.length-1]=b;return p}
  const api={anchor,nearestPort,route,project,simplify,blocked,ports,snapPort,moveSegment,attachRoute,magneticPoint,PORT_STEP};if(typeof module!=='undefined')module.exports=api;root.DiagramGeometry=api;
})(typeof globalThis!=='undefined'?globalThis:this);

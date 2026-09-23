(function(){var e=Object.defineProperty,t=(e,t,n)=>()=>{if(n)throw n[0];try{return e&&(t=e(e=0)),t}catch(e){throw n=[e],e}},n=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};function r(e){let[t,n]=e.centerMm??[-36,8];return(e.diameterMm===10||e.diameterMm===15)&&t===-36&&n===8}let i={10:3,15:4,20:4},a=()=>({stage:`open`,elapsed:0,paused:!1,assistance:!1,startLengths:[],biteStarted:[]});function o(e,t){let n=[0,0,0];for(let r=0;r<t.vertices.length;r++)for(let i=0;i<3;i++)n[i]=n[i]+e[t.vertices[r]*3+i]*t.weights[r];return n}function s(e,t,n){let r=o(e,t),i=o(e,n);return Math.hypot(r[0]-i[0],r[1]-i[1],r[2]-i[2])}function c(e,t){return t.route.reduce((n,r,i)=>i===t.route.length-1&&!t.closedRoute?n:n+s(e,r,t.route[(i+1)%t.route.length]),0)}function l(e,t){if(t!==`open`){let n=t===`deep`?e.deeps:e.running,r=t===`deep`?12:6;if(n.some(e=>e.startStep!==void 0))return Math.max(...n.map(e=>(e.startStep??e.order*r)+r))+16}return t===`open`?0:(t===`deep`?e.deeps.length*12:e.running.length*6)+16}function u(e,t){let n=e.edits?.[t.id];return n?n.removed?0:n.placement:d(e,t)}function d(e,t){if(e.stage===`open`)return 0;if(!t.chainId&&e.stage===`surface`)return 1;if(t.chainId&&e.stage===`deep`)return 0;let n=t.chainId?6:12;return Math.max(0,Math.min(1,(e.elapsed-(t.startStep??t.order*n))/n))}function f(e,t,n,r=2,a=4,l=`legacy`){if(!Number.isFinite(r)||r<0||r>2)throw Error(`Unsupported deep bite span.`);if(!Number.isFinite(a)||a<2||a>4)throw Error(`Unsupported running bite spacing.`);let u=e.size.degrees*Math.PI/180,d=Math.cos(u),f=Math.sin(u),m=e.surface.chart,h=e=>(m[e*2]-n[0])*d+(m[e*2+1]-n[1])*f,g=e=>-(m[e*2]-n[0])*f+(m[e*2+1]-n[1])*d,_=[...e.wound].sort((e,t)=>h(e)-h(t)||e-t),v=_[0],y=_[_.length-1],b=[_.filter(e=>g(e)>=0),_.filter(e=>g(e)<0)];for(let e of b)e.includes(v)||e.push(v),e.includes(y)||e.push(y),e.sort((e,t)=>h(e)-h(t)||e-t);let x=h(v),S=h(y)-x,C=(e,t)=>{let n=x+S*t,r=0;for(;r<e.length-2&&h(e[r+1])<n;)r++;let i=e[r],a=e[r+1],o=Math.max(0,Math.min(1,(n-h(i))/Math.max(1e-9,h(a)-h(i))));return{vertices:[i,a],weights:[1-o,o]}},w=(t,n,r)=>{let i=o(e.rest,t),a=[0,0,0];t.vertices.forEach((n,r)=>{for(let i=0;i<3;i++)a[i]=a[i]+e.surface.normals[n*3+i]*t.weights[r]});let s=Math.hypot(f,d,(f*a[0]-d*a[1])/Math.max(.2,a[2])),c=i[0]-f*n*r/s,l=i[1]+d*n*r/s;for(let t=0;t<e.surface.triangles.length;t+=3){let n=Array.from(e.surface.triangles.slice(t,t+3)),[r,i,a]=n,o=m[r*2],s=m[r*2+1],u=m[i*2],d=m[i*2+1],f=m[a*2],p=m[a*2+1],h=(d-p)*(o-f)+(f-u)*(s-p);if(Math.abs(h)<1e-9)continue;let g=((d-p)*(c-f)+(f-u)*(l-p))/h,_=((p-s)*(c-f)+(o-f)*(l-p))/h;if(Math.min(g,_,1-g-_)>=-1e-7)return{vertices:n,weights:[g,_,1-g-_]}}throw Error(`A suture bite leaves the supported skin.`)},T=(n,r)=>{let i=r<=.5?r*2:(r-.5)*2,a=r<=.5?n.vertices:n.vertices.map(t=>e.dermalMiddle[t]),o=n.vertices.map(n=>r<=.5?e.dermalMiddle[n]:t[n]);return{vertices:[...a,...o],weights:[...n.weights.map(e=>e*(1-i)),...n.weights.map(e=>e*i)]}},E=[0],D=null;for(let t=0;t<=200;t++){let n=o(e.rest,C(b[0],t/200)),r=o(e.rest,C(b[1],t/200)),i=n.map((e,t)=>(e+r[t])*.5);D&&E.push(E[E.length-1]+Math.hypot(i[0]-D[0],i[1]-D[1],i[2]-D[2])),D=i}let O=E[E.length-1],k=e=>{let t=e*O,n=1;for(;n<E.length-1&&E[n]<t;)n++;return(n-1+(t-E[n-1])/Math.max(1e-9,E[n]-E[n-1]))/200},A=(e,t)=>{let n=e*200,r=Math.floor(n),i=E[r]+(E[Math.min(200,r+1)]-E[r])*(n-r);return k(Math.max(0,Math.min(1,(i+t)/O)))},j=(t,n,i)=>{let a=C(b[0],t),o=C(b[1],t),l=w(a,1,2),u=w(o,-1,2),d=A(t,-r/2),f=A(t,r/2),p=i?l:T(C(b[0],d),.9),m=i?u:T(C(b[1],d),.9),h=T(i?a:C(b[0],f),i?.6:.65),g=T(i?o:C(b[1],f),i?.6:.65),_=i?[p,T(w(a,1,2.35),.35),h,g,T(w(o,-1,2.35),.35),m]:[p,T(l,.1),h,g,T(u,.1),m],v=_.slice(0,-1).map((t,n)=>t===h?.12:s(e.rest,t,_[n+1])*(i?1:.85));i||v.push(.12);let y=v.reduce((e,t)=>e+t,0),x={id:`${i?`running`:`deep`}-${n}`,a:p,b:m,surfaceA:l,surfaceB:u,edgeA:a,edgeB:o,route:_,segmentTargets:v,closedRoute:!i,restMm:0,targetMm:y,order:n,chainId:i?`surface-1`:null,chainIndex:i?n:null};return x.restMm=c(e.rest,x),x},M=l===`symmetric-three`?3:i[e.size.diameterMm],N=[],P=[[0,1]],F=t=>s(e.rest,C(b[0],k(t)),C(b[1],k(t)));for(;N.length<M;){P.sort((e,t)=>t[1]-t[0]-(e[1]-e[0])||F((t[0]+t[1])*.5)-F((e[0]+e[1])*.5)||e[0]-t[0]);let[e,t]=P.shift(),n=(e+t)*.5;N.push(n),P.push([e,n],[n,t])}let I=Math.ceil(O/a),L=Array.from({length:I},(e,t)=>j(k((t+.5)/I),t,!0)),R=(t,n)=>{let r=o(e.rest,t.edgeA),i=o(e.rest,t.edgeB),a=o(e.rest,t[n]),s=n===`a`?r:i;return a.map((e,t)=>e-s[t]+(r[t]+i[t])*.5)};for(let t=1;t<L.length;t++){let n=L[t-1],r=L[t],i=R(n,`b`),a=R(r,`a`);r.route.unshift(n.b);let o=Math.hypot(a[0]-i[0],a[1]-i[1],a[2]-i[2]);r.targetMm+=o,r.segmentTargets.unshift(o),r.restMm=c(e.rest,r)}let z=[];for(let t=3;t<=O-3;t+=1)for(let n=0;n<2;n++){let r=C(b[n],k(t/O)),i=w(r,n?-1:1,2.5);z.push({edge:r,shoulder:i,restHeightMm:p(e.rest,r,i)})}return{deeps:N.map((e,t)=>j(k(e),t,!1)),running:L,seamLengthMm:O,eversion:z,gaps:Array.from({length:Math.ceil(O*4)+1},(e,t)=>{let n=k(t/Math.ceil(O*4));return{a:C(b[0],n),b:C(b[1],n)}})}}function p(e,t,n){let[r,i,a]=n.vertices;if(r===void 0||i===void 0||a===void 0)throw Error(`An eversion shoulder requires a surface triangle.`);let s=[0,1,2].map(t=>e[i*3+t]-e[r*3+t]),c=[0,1,2].map(t=>e[a*3+t]-e[r*3+t]),l=[s[1]*c[2]-s[2]*c[1],s[2]*c[0]-s[0]*c[2],s[0]*c[1]-s[1]*c[0]],u=Math.hypot(...l);if(u<1e-10)return NaN;let d=o(e,t),f=o(e,n);return l.reduce((e,t,n)=>e+t/u*(d[n]-f[n]),0)}function m(e,t){let n=t.map(t=>p(e,t.edge,t.shoulder)-t.restHeightMm);return{meanEversionMm:n.reduce((e,t)=>e+t,0)/Math.max(1,n.length),minimumEversionMm:n.length?Math.min(...n):0,maximumEversionMm:n.length?Math.max(...n):0,evertedFraction:n.filter(e=>e>.05).length/Math.max(1,n.length)}}let h=(e,t)=>e<t?`${e},${t}`:`${t},${e}`;function g(e){let t=new Map;for(let n=0;n<e.length;n+=3)for(let r=0;r<3;r+=1){let i=e[n+r],a=e[n+(r+1)%3],o=h(i,a),s=t.get(o);s?s[2]+=1:t.set(o,[Math.min(i,a),Math.max(i,a),1])}let n=[];for(let[e,r,i]of t.values())i===1&&n.push(e,r);return Uint32Array.from(n)}function _(e,t){let n=new Uint8Array(t);for(let t=0;t<e.length;t+=1)n[e[t]]=1;return n}function v(e,t,n,r,i=!1){let a=Array.from(e),o=Array.from(t),s=i?1e-5:.02,c=i?.01:.1,l=1e-9,u=new Map,d=(e,t)=>{let n=u.get(e);n||(n=new Set,u.set(e,n)),n.add(t)};for(let e=0;e<o.length/3;e+=1)d(o[e*3],e),d(o[e*3+1],e),d(o[e*3+2],e);let f=(e,t,n,r)=>{for(let t=0;t<3;t+=1)u.get(o[e*3+t])?.delete(e);o[e*3]=t,o[e*3+1]=n,o[e*3+2]=r,d(t,e),d(n,e),d(r,e)},p=(e,t,n)=>{let r=o.length/3;o.push(e,t,n),d(e,r),d(t,r),d(n,r)},m=(e,t)=>{let n=a.length/2;return a.push(e,t),u.set(n,new Set),n},h=(e,t,n,r)=>e*r-t*n,g=(e,t,n)=>.5*h(a[t*2]-a[e*2],a[t*2+1]-a[e*2+1],a[n*2]-a[e*2],a[n*2+1]-a[e*2+1]),_=(e,t,n)=>{let r=o[e*3],i=o[e*3+1],s=o[e*3+2],c=1e-7,l=h(a[i*2]-a[r*2],a[i*2+1]-a[r*2+1],t-a[r*2],n-a[r*2+1]),u=h(a[s*2]-a[i*2],a[s*2+1]-a[i*2+1],t-a[i*2],n-a[i*2+1]),d=h(a[r*2]-a[s*2],a[r*2+1]-a[s*2+1],t-a[s*2],n-a[s*2+1]);return l>c&&u>c&&d>c},v=(e,t,n)=>{let r=a[e*2],i=a[e*2+1];a[e*2]=t,a[e*2+1]=n;for(let t of u.get(e)??[])if(g(o[t*3],o[t*3+1],o[t*3+2])<=s)return a[e*2]=r,a[e*2+1]=i,!1;return!0},y=(e,t,n,r)=>{let i=m(n,r),a=[];for(let n of u.get(e)??[])u.get(t)?.has(n)&&a.push(n);for(let n of a){let r=o[n*3],a=o[n*3+1],s=o[n*3+2],c=r===e?a:a===e?s:r,l=r===e?s:a===e?r:a;c===t?(f(n,e,i,l),p(i,t,l)):(f(n,e,c,i),p(i,c,t))}return i},b=(e,t,n)=>{let r=m(t,n),i=o[e*3],a=o[e*3+1],s=o[e*3+2];return f(e,i,a,r),p(a,s,r),p(s,i,r),r},x=(e,t)=>{let n=-1,i=1/0;for(let r=0;r<a.length/2;r+=1){if(!u.get(r)?.size)continue;let o=Math.hypot(a[r*2]-e,a[r*2+1]-t);o<i&&(i=o,n=r)}if(n>=0&&i<=r&&v(n,e,t))return n;let s=1/0,d=-1,f=-1,p=0,m=0;for(let n=0;n<o.length/3;n+=1){if(_(n,e,t))return b(n,e,t);for(let r=0;r<3;r+=1){let i=o[n*3+r],c=o[n*3+(r+1)%3],u=a[i*2],h=a[i*2+1],g=a[c*2]-u,_=a[c*2+1]-h,v=g*g+_*_;if(v<l)continue;let y=Math.max(0,Math.min(1,((e-u)*g+(t-h)*_)/v)),b=u+g*y,x=h+_*y,S=Math.hypot(b-e,x-t);S<s&&(s=S,d=i,f=c,p=b,m=x)}}return d>=0&&s<=r?Math.hypot(p-a[d*2],m-a[d*2+1])<c?d:Math.hypot(p-a[f*2],m-a[f*2+1])<c?f:y(d,f,p,m):-1},S=[],C=new Set,w=[],T=e=>{S.push(e),C.add(e)},E=()=>{let e=new Map,t=t=>{for(;e.has(t);)t=e.get(t);return t},n=(e,t,n)=>.5*h(a[t*2]-a[e*2],a[t*2+1]-a[e*2+1],a[n*2]-a[e*2],a[n*2+1]-a[e*2+1]);for(let r=0;r<6;r+=1){let r=!1;for(let s=0;s<o.length;s+=3)for(let u=0;u<3;u+=1){let d=t(o[s+u]),f=t(o[s+(u+1)%3]);if(d===f)continue;let p=i&&!C.has(d)&&!C.has(f)?.1:c;if(Math.hypot(a[d*2]-a[f*2],a[d*2+1]-a[f*2+1])>=p)continue;let m=d,h=f,g=C.has(d),_=C.has(f);(_&&!g||g===_&&f<d)&&(m=f,h=d);let v=!0;for(let e=0;e<o.length&&v;e+=3){let r=t(o[e]),i=t(o[e+1]),a=t(o[e+2]);(r===h||i===h||a===h)&&r!==m&&i!==m&&a!==m&&n(r===h?m:r,i===h?m:i,a===h?m:a)<=l&&(v=!1)}v&&(e.set(h,m),r=!0)}if(!r)break}if(e.size===0)return;let r=[];for(let e=0;e<o.length;e+=3){let n=t(o[e]),i=t(o[e+1]),a=t(o[e+2]);n!==i&&i!==a&&n!==a&&r.push(n,i,a)}o.length=0;for(let e of r)o.push(e);let s=new Set(w),u=[];S.forEach((e,n)=>{let r=t(e),i=u[u.length-1];i&&i.v===r?i.brk=i.brk||s.has(n):u.push({v:r,brk:s.has(n)})}),S.length=0,w.length=0,u.forEach((e,t)=>{S.push(e.v),e.brk&&t<u.length-1&&w.push(t)})},D=()=>(E(),{positions:Float32Array.from(a),triangles:Uint32Array.from(o),chain:S,breaks:w});if(n.length<2)return D();let O=x(n[0],n[1]);if(O<0)return D();T(O);let k=new Set,A=()=>{let e=new Map,t=new Map;for(let n=0;n<o.length;n+=3)for(let r=0;r<3;r+=1){let i=o[n+r],a=o[n+(r+1)%3],s=Math.min(i,a)*1048576+Math.max(i,a);e.set(s,(e.get(s)??0)+1),t.has(s)||t.set(s,[i,a])}let n=[];for(let[r,i]of e)i===1&&n.push(t.get(r));return n},j=e=>{let t=A(),r=a[O*2],i=a[O*2+1];for(let o=e;o+1<n.length;o+=2){let s=n[o],u=n[o+1],d=s-r,f=u-i,p=Math.hypot(d,f);if(p>l){let n=null;for(let[s,c]of t){if(o===e&&(s===O||c===O))continue;let t=a[s*2],u=a[s*2+1],m=a[c*2]-t,g=a[c*2+1]-u,_=h(d,f,m,g);if(Math.abs(_)<l)continue;let v=t-r,y=u-i,b=h(v,y,m,g)/_,x=h(v,y,d,f)/_;b*p>.001&&b<=1.000000001&&x>=-1e-9&&x<=1.000000001&&(!n||b<n.s)&&(n={s:b,p:s,q:c,r:x})}if(n){let e=a[n.p*2],t=a[n.p*2+1],r=a[n.q*2]-e,i=a[n.q*2+1]-t,s=Math.hypot(r,i),l=C.has(n.p)&&C.has(n.q);return n.r*s<c||l&&n.r<=.5?{k:o,v:n.p}:(1-n.r)*s<c||l?{k:o,v:n.q}:{k:o,v:y(n.p,n.q,e+r*n.r,t+i*n.r)}}}r=s,i=u}return null},M=2;segments:for(;M+1<n.length;){let e=n[M],t=n[M+1];for(let n=0;n<4096;n+=1){let n=a[O*2],i=a[O*2+1],s=e-n,d=t-i,f=Math.hypot(s,d);if(f<=r){let n=-1,r=f;for(let i of u.get(O)??[])for(let s=0;s<3;s+=1){let c=o[i*3+s];if(c===O||k.has(c))continue;let l=Math.hypot(a[c*2]-e,a[c*2+1]-t);l<r&&(r=l,n=c)}if(f<c)break;if(n>=0&&v(n,e,t))T(n),O=n;else if(!v(O,e,t)){for(let n of u.get(O)??[])if(_(n,e,t)){let r=b(n,e,t);T(r),O=r;break}}break}let p=s/f,m=d/f,g={best:null},x=e=>{(!g.best||e.score<g.best.score)&&(g.best=e)},E=new Set([O]);for(let g of u.get(O)??[]){let u=o[g*3],v=o[g*3+1],y=o[g*3+2],b=u===O?v:v===O?y:u,S=u===O?y:v===O?u:v;_(g,e,t)&&x({kind:`inside`,score:1,t:g});for(let o of[b,S]){if(E.has(o))continue;E.add(o);let u=a[o*2]-n,g=a[o*2+1]-i,_=Math.hypot(u,g),v=(s*u+d*g)/(_*_);if(!C.has(o)&&v>l&&v<.999999999&&Math.abs(h(s,d,u,g))<=1e-7*_&&((1-v)*_<c?x({kind:`snap`,score:1,v:o,x:a[o*2],y:a[o*2+1]}):x({kind:`edge`,score:1,p:O,q:o,x:n+u*v,y:i+g*v})),k.has(o))continue;let y=u*p+g*m,b=Math.abs(h(u,g,p,m));Math.hypot(a[o*2]-e,a[o*2+1]-t)<=r?x({kind:`snap`,score:1-r/f,v:o,x:e,y:t}):y>l&&y<f&&b<=r&&x({kind:`snap`,score:(y-r)/f,v:o,x:n+p*y,y:i+m*y})}let w=a[b*2],T=a[b*2+1],D=a[S*2]-w,A=a[S*2+1]-T,j=h(s,d,D,A);if(Math.abs(j)<l)continue;let M=w-n,N=T-i,P=h(M,N,D,A)/j,F=h(M,N,s,d)/j;if(P>l&&P<=1.000000001&&F>=-1e-9&&F<=1.000000001){let e=Math.hypot(D,A),t=C.has(b)&&C.has(S);F*e<c||t&&F<=.5?x({kind:`snap`,score:P,v:b,x:w,y:T}):(1-F)*e<c||t?x({kind:`snap`,score:P,v:S,x:a[S*2],y:a[S*2+1]}):x({kind:`edge`,score:P,p:b,q:S,x:w+D*F,y:T+A*F})}}let A=g.best;if(!A){let e=j(M);if(!e)return D();if(e.v!==O&&(w.push(S.length-1),T(e.v),O=e.v),e.k!==M){M=e.k;continue segments}continue}let N;if(A.kind===`snap`){if((a[A.v*2]!==A.x||a[A.v*2+1]!==A.y)&&!v(A.v,A.x,A.y)){k.add(A.v);continue}N=A.v}else if(A.kind===`edge`)N=y(A.p,A.q,A.x,A.y);else{let n=A.t,i=1/0,s=-1,u=-1,d=0,f=0;for(let r=0;r<3;r+=1){let c=o[n*3+r],p=o[n*3+(r+1)%3],m=a[c*2],h=a[c*2+1],g=a[p*2]-m,_=a[p*2+1]-h,v=g*g+_*_;if(v<l)continue;let y=Math.max(.02,Math.min(.98,((e-m)*g+(t-h)*_)/v)),b=Math.hypot(m+g*y-e,h+_*y-t);b<i&&(i=b,s=c,u=p,d=m+g*y,f=h+_*y)}if(i<=r){let r=Math.hypot(d-a[s*2],f-a[s*2+1]),i=Math.hypot(d-a[u*2],f-a[u*2+1]),o=C.has(s)&&C.has(u),l=r<c||o&&r<=i?s:i<c||o?u:-1;N=l>=0&&l!==O?l:l===O?b(n,e,t):y(s,u,d,f)}else N=b(n,e,t)}T(N),O=N}M+=2}return D()}function y(e,t){let n=t.length/3;if(n===0)return 1;let r=Math.max(1,Math.floor(n/256)),i=[];for(let a=0;a<n;a+=r){let n=t[a*3],r=t[a*3+1];i.push(Math.hypot(e[r*2]-e[n*2],e[r*2+1]-e[n*2+1]))}i.sort((e,t)=>e-t);let a=i[Math.floor(i.length/2)];return a>0?a:1}function b(e,t,n,r,i={}){let a=i.splitEnd??!0,{positions:o,triangles:s,chain:c}=v(e,t,n,r??.3*y(e,t),i.precise),l=o.length/2,u=new Set(g(s));if(c.length<2)return{positions:o,triangles:s,seam:[],chain:c};let d=new Map;c.forEach((e,t)=>d.set(e,t));let f=c.filter((e,t)=>t>0&&t<c.length-1||u.has(e)&&(t===0||a));if(f.length===0)return{positions:o,triangles:s,seam:[],chain:c};let p=e=>{let t=c[Math.max(0,e-1)],n=c[Math.min(c.length-1,e+1)];return[o[n*2]-o[t*2],o[n*2+1]-o[t*2+1]]},m=new Float32Array(o.length+f.length*2);m.set(o);let h=new Map;f.forEach((e,t)=>{let n=l+t;h.set(e,n),m[n*2]=o[e*2],m[n*2+1]=o[e*2+1]});let _=s.slice();for(let e=0;e<_.length;e+=3){let t=(m[_[e]*2]+m[_[e+1]*2]+m[_[e+2]*2])/3,n=(m[_[e]*2+1]+m[_[e+1]*2+1]+m[_[e+2]*2+1])/3;for(let r=0;r<3;r+=1){let i=_[e+r],a=h.get(i);if(a===void 0)continue;let[o,s]=p(d.get(i));o*(n-m[i*2+1])-s*(t-m[i*2])>0&&(_[e+r]=a)}}let b=new Uint32Array(m.length/2);for(let e=0;e<_.length;e+=1){let t=_[e];b[t]=b[t]+1}let x=[];for(let e of f){let t=h.get(e);if(b[t]!==0){if(b[e]===0){for(let n=0;n<_.length;n+=1)_[n]===t&&(_[n]=e);continue}x.push([e,t])}}return{positions:m,triangles:_,seam:x,chain:c}}function x(e,t,n,r,i){let a=e[n*3]-e[t*3],o=e[n*3+1]-e[t*3+1],s=e[n*3+2]-e[t*3+2],c=e[r*3]-e[t*3],l=e[r*3+1]-e[t*3+1],u=e[r*3+2]-e[t*3+2],d=e[i*3]-e[t*3],f=e[i*3+1]-e[t*3+1],p=e[i*3+2]-e[t*3+2];return(a*(l*p-u*f)+o*(u*d-c*p)+s*(c*f-l*d))/6}function S(e,t,n,r,i,a,o=.2){let s=n.vertices,c=s[0]*3,l=s[1]*3,u=s[2]*3,d=s[3]*3,f=e[l]-e[c],p=e[l+1]-e[c+1],m=e[l+2]-e[c+2],h=e[u]-e[c],g=e[u+1]-e[c+1],_=e[u+2]-e[c+2],v=e[d]-e[c],y=e[d+1]-e[c+1],b=e[d+2]-e[c+2],x=(f*(g*b-_*y)+p*(_*v-h*b)+m*(h*y-g*v))/6,S=n.rest*(i?o:1);if(i&&x>=S)return;let C=(g*b-_*y)/6,w=(_*v-h*b)/6,T=(h*y-g*v)/6,E=(y*m-b*p)/6,D=(b*f-v*m)/6,O=(v*p-y*f)/6,k=(p*_-m*g)/6,A=(m*h-f*_)/6,j=(f*g-p*h)/6,M=-C-E-k,N=-w-D-A,P=-T-O-j,F=t[s[0]],I=t[s[1]],L=t[s[2]],R=t[s[3]],z=0;if(z+=F*M**2,z+=F*N**2,z+=F*P**2,z+=I*C**2,z+=I*w**2,z+=I*T**2,z+=L*E**2,z+=L*D**2,z+=L*O**2,z+=R*k**2,z+=R*A**2,z+=R*j**2,z<1e-14)return;let B=i?0:a*n.rest/r,V=(-(x-S)-(i?0:B*n.lambda))/(z+B);i||(n.lambda+=V),e[c]=e[c]+F*M*V,e[c+1]=e[c+1]+F*N*V,e[c+2]=e[c+2]+F*P*V,e[l]=e[l]+I*C*V,e[l+1]=e[l+1]+I*w*V,e[l+2]=e[l+2]+I*T*V,e[u]=e[u]+L*E*V,e[u+1]=e[u+1]+L*D*V,e[u+2]=e[u+2]+L*O*V,e[d]=e[d]+R*k*V,e[d+1]=e[d+1]+R*A*V,e[d+2]=e[d+2]+R*j*V}function C(e,t,n,r){let i=e.slice(),a=new Set(g(Uint32Array.from(t)));for(let t of n){if(!a.has(t))continue;let n=e[t*2],o=e[t*2+1],s=1/0,c=n,l=o;for(let e=2;e<r.length;e+=2){let t=r[e-2],i=r[e-1],a=r[e]-t,u=r[e+1]-i,d=Math.max(0,Math.min(1,((n-t)*a+(o-i)*u)/Math.max(1e-15,a*a+u*u))),f=t+d*a,p=i+d*u,m=Math.hypot(n-f,o-p);m<s&&(s=m,c=f,l=p)}if(s>.25)throw Error(`Incision cleanup exceeded its supported rest-geometry tolerance.`);i[t*2]=c,i[t*2+1]=l}for(let n=0;n<t.length;n+=3){let[r,a,o]=t.slice(n,n+3);if([r,a,o].every(t=>i[t*2]===e[t*2]&&i[t*2+1]===e[t*2+1]))continue;let s=e=>(e[a*2]-e[r*2])*(e[o*2+1]-e[r*2+1])-(e[a*2+1]-e[r*2+1])*(e[o*2]-e[r*2]);if(s(i)*Math.sign(s(e))<=Math.max(1e-12,Math.abs(s(e))*.05))throw Error(`The exact incision needs local remeshing near triangle ${n/3}.`)}return i}function w(e,t,n,r=new Set){let i=[...t],a=(t,n,r)=>(e[n*2]-e[t*2])*(e[r*2+1]-e[t*2+1])-(e[n*2+1]-e[t*2+1])*(e[r*2]-e[t*2]),o=(e,t)=>e<t?`${e}/${t}`:`${t}/${e}`,s=new Map;for(let t=0;t<4;t++){let t=g(Uint32Array.from(i)),c=new Set(t),l=new Map;for(let e=0;e<t.length;e+=2)for(let[n,r]of[[t[e],t[e+1]],[t[e+1],t[e]]]){let e=l.get(n)??[];e.push(r),l.set(n,e)}let u=new Map,d=new Map;for(let e=0;e<i.length;e+=3)for(let t=0;t<3;t++){let n=i[e+t],r=u.get(n)??[],a=d.get(n)??new Set;r.push(e),u.set(n,r),a.add(i[e+(t+1)%3]),a.add(i[e+(t+2)%3]),d.set(n,a)}let f=[...u.keys()].filter(e=>!c.has(e)||n.has(e)).flatMap(t=>[...d.get(t)].filter(e=>n.has(e)).map(n=>({drop:t,keep:n,d:Math.hypot(e[t*2]-e[n*2],e[t*2+1]-e[n*2+1])}))).filter(e=>e.d<.8).sort((e,t)=>e.d-t.d||e.drop-t.drop||e.keep-t.keep),p=new Set,m=!1;for(let{drop:t,keep:h}of f){if(r.has(t)||p.has(t)||p.has(h))continue;let f=d.get(t);if([...f].filter(e=>d.get(h).has(e)).length!==(c.has(t)?1:2))continue;let g=null;if(c.has(t)){let r=l.get(t);if(r.length!==2||!r.includes(h)||r.some(e=>!n.has(e)))continue;let i=r.find(e=>e!==h),a=e[i*2]-e[h*2],c=e[i*2+1]-e[h*2+1],u=[...s.get(o(h,t))??[h,t],...s.get(o(t,i))??[t,i]];if(u.some(t=>{let n=e[t*2]-e[h*2],r=e[t*2+1]-e[h*2+1],i=Math.max(0,Math.min(1,(n*a+r*c)/Math.max(1e-12,a*a+c*c)));return Math.hypot(n-i*a,r-i*c)>.1}))continue;g={other:i,original:u}}let _=u.get(t);if(!_.some(e=>{let n=i.slice(e,e+3);if(n.includes(h))return!1;let[r,o,s]=n.map(e=>e===t?h:e);return a(r,o,s)<.001})){g&&(s.delete(o(h,t)),s.delete(o(t,g.other)),s.set(o(h,g.other),g.original));for(let e of _)for(let n=0;n<3;n++)i[e+n]===t&&(i[e+n]=h);for(let e of f)p.add(e);p.add(t),p.add(h),m=!0}}if(!m)break;i=i.filter((e,t)=>{let n=Math.floor(t/3)*3,r=i[n],a=i[n+1],o=i[n+2];return r!==a&&a!==o&&o!==r})}return i}function T(e,t,n,r=new Set){let i=[...t],a=(t,n,r)=>(e[n*2]-e[t*2])*(e[r*2+1]-e[t*2+1])-(e[n*2+1]-e[t*2+1])*(e[r*2]-e[t*2]),o=(t,n,r)=>{let i=[[t,n],[n,r],[r,t]].reduce((t,[n,r])=>t+(e[n*2]-e[r*2])**2+(e[n*2+1]-e[r*2+1])**2,0);return 2*Math.sqrt(3)*a(t,n,r)/Math.max(1e-12,i)};for(let e=0;e<12;e++){let e=new Map,t=new Set,s=!1;for(let c=0;c<i.length;c+=3)for(let l=0;l<3;l++){let u=i[c+l],d=i[c+(l+1)%3],f=i[c+(l+2)%3],p=u<d?`${u}/${d}`:`${d}/${u}`,m=e.get(p);if(!m){e.set(p,{a:u,b:d,c:f,index:c});continue}if(t.has(c)||t.has(m.index)||![u,d,f,m.c].some(e=>n.has(e))||r.has(u)&&r.has(d)||m.a!==d||m.b!==u)continue;let h=m.c;if(!(a(f,u,h)<=1e-8||a(f,h,d)<=1e-8)&&!(Math.min(o(f,u,h),o(f,h,d))<=Math.min(o(u,d,f),o(d,u,h))+1e-5)){i.splice(c,3,f,u,h),i.splice(m.index,3,f,h,d),t.add(c),t.add(m.index),s=!0;break}}if(!s)break}return i}let E={dermis:1,fat:.9,muscle:1,tarsus:1};function D(e,t){let n=new Float64Array(e);for(let e of t){if(!(e.rest>0)||!Number.isFinite(e.rest))throw Error(`Invalid rest volume for tissue mass.`);let t=E[e.material]*e.rest/4;for(let r of e.vertices)n[r]=n[r]+t}return n}function O(e,t){let n=new Float64Array(e.length/3);for(let r=0;r<t.length;r+=3){let i=t[r],a=t[r+1],o=t[r+2],s=e[a*3]-e[i*3],c=e[a*3+1]-e[i*3+1],l=e[a*3+2]-e[i*3+2],u=e[o*3]-e[i*3],d=e[o*3+1]-e[i*3+1],f=e[o*3+2]-e[i*3+2],p=Math.hypot(c*f-l*d,l*u-s*f,s*d-c*u)/6;for(let e of[i,a,o])n[e]=n[e]+p}return n}function k(e,t){if(!(t>0)||!Number.isFinite(t))throw Error(`Attachment has no finite footprint.`);return e/t}function A(e,t,n,r){if(!(r>=0)||!Number.isFinite(r))throw Error(`Invalid release distance.`);if(r===0)return O(e,t);let i=new Float64Array(e.length/3);for(let a=0;a<t.length;a+=3){let o=[t[a],t[a+1],t[a+2]],s=o.map((e,t)=>({bary:[+(t===0),+(t===1),+(t===2)],distance:n[e]}));if(s.some(e=>!Number.isFinite(e.distance)||e.distance<0))throw Error(`Invalid interface distance field.`);let c=[];for(let e=0;e<3;e++){let t=s[e],n=s[(e+1)%3],i=t.distance>=r,a=n.distance>=r;if(i&&c.push(t),i!==a){let e=(r-t.distance)/(n.distance-t.distance);c.push({bary:t.bary.map((t,r)=>t+e*(n.bary[r]-t)),distance:r})}}let l=t=>[0,1,2].map(n=>o.reduce((r,i,a)=>r+e[i*3+n]*t.bary[a],0));for(let e=1;e+1<c.length;e++){let t=[c[0],c[e],c[e+1]],[n,r,a]=t.map(l),s=r.map((e,t)=>e-n[t]),u=a.map((e,t)=>e-n[t]),d=Math.hypot(s[1]*u[2]-s[2]*u[1],s[2]*u[0]-s[0]*u[2],s[0]*u[1]-s[1]*u[0])/2;for(let e=0;e<3;e++)i[o[e]]=i[o[e]]+d*t.reduce((t,n)=>t+n.bary[e],0)/3}}return i}function j(e,t){if(t.length<2)throw Error(`An incision needs at least one segment.`);let n=1/0;for(let r=1;r<t.length;r++){let i=t[r-1],a=t[r].map((e,t)=>e-i[t]),o=e.map((e,t)=>e-i[t]),s=a.reduce((e,t)=>e+t*t,0),c=s>0?Math.max(0,Math.min(1,o.reduce((e,t,n)=>e+t*a[n],0)/s)):0;n=Math.min(n,Math.hypot(...o.map((e,t)=>e-c*a[t])))}return n}function M(e,t){let n=new Map,r={fat:3e-4,muscle:8e-5,tarsus:15e-7};for(let i of t)if(i.material!==`dermis`)for(let t=0;t<4;t++)for(let a=t+1;a<4;a++){let o=Math.min(i.vertices[t],i.vertices[a]),s=Math.max(i.vertices[t],i.vertices[a]),c=`${o}/${s}`,l=Math.hypot(e[s*3]-e[o*3],e[s*3+1]-e[o*3+1],e[s*3+2]-e[o*3+2]),u=i.rest/(6*r[i.material]*l*l),d=n.get(c);d?d.compliance=1/(1/d.compliance+u):n.set(c,{a:o,b:s,rest:l,compliance:1/u})}return[...n.values()]}let N=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],P=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]];function F(e,t,n){let[r,i,a]=n.map(e=>[t[e*3],t[e*3+1],t[e*3+2]]),o=P(i,r),s=P(a,r),c=P(e,r),l=N(o,c),u=N(s,c),d;if(l<=0&&u<=0)d=[1,0,0];else{let t=P(e,i),n=N(o,t),r=N(s,t),c=l*r-n*u;if(n>=0&&r<=n)d=[0,1,0];else if(c<=0&&l>=0&&n<=0){let e=l/(l-n);d=[1-e,e,0]}else{let t=P(e,a),i=N(o,t),f=N(s,t),p=i*u-l*f,m=n*f-i*r;if(f>=0&&i<=f)d=[0,0,1];else if(p<=0&&u>=0&&f<=0){let e=u/(u-f);d=[1-e,0,e]}else if(m<=0&&r-n>=0&&i-f>=0){let e=(r-n)/(r-n+(i-f));d=[0,1-e,e]}else{let e=m+p+c;d=Math.abs(e)<1e-18?[1,0,0]:[m/e,p/e,c/e]}}}let f=[0,0,0];for(let e=0;e<3;e++)f[e]=r[e]*d[0]+i[e]*d[1]+a[e]*d[2];let p=[o[1]*s[2]-o[2]*s[1],o[2]*s[0]-o[0]*s[2],o[0]*s[1]-o[1]*s[0]],m=Math.hypot(...p);for(let e=0;e<3;e++)p[e]=m>1e-12?p[e]/m:0;return{point:f,normal:p,weights:d,vertices:n,distance:Math.hypot(...P(e,f))}}function I(e,t,n){let r=null;for(let i=0;i<n.length;i+=3){let a=F(e,t,[n[i],n[i+1],n[i+2]]);(!r||a.distance<r.distance)&&(r=a)}return r}var L=class{cells=new Map;cellBounds=[1/0,1/0,1/0,-1/0,-1/0,-1/0];cellY=0;cellZ=0;denseCells;bounds=[];prepared=[];positions=[];triangles=[];constructor(e){for(let t of e){let e=this.positions.length/3;this.positions.push(...t.positions),this.triangles.push(...t.triangles.map(t=>t+e))}for(let e=0;e<this.triangles.length;e+=3){let t=this.triangles.slice(e,e+3),n=[0,1,2].map(e=>Math.min(...t.map(t=>this.positions[t*3+e]))),r=[0,1,2].map(e=>Math.max(...t.map(t=>this.positions[t*3+e])));this.bounds.push(...n,...r),this.prepared.push(R(this.positions,t));let i=n.map(e=>Math.floor((e-1)/5)),a=r.map(e=>Math.floor((e+1)/5));for(let t=i[0];t<=a[0];t++)for(let n=i[1];n<=a[1];n++)for(let r=i[2];r<=a[2];r++){let i=`${t}/${n}/${r}`,a=this.cells.get(i)??[];a.push(e),this.cells.set(i,a)}}if(!this.cells.size)return;for(let e of this.cells.keys()){let t=e.split(`/`).map(Number);for(let e=0;e<3;e++)this.cellBounds[e]=Math.min(this.cellBounds[e],t[e]),this.cellBounds[3+e]=Math.max(this.cellBounds[3+e],t[e])}this.cellY=this.cellBounds[4]-this.cellBounds[1]+1,this.cellZ=this.cellBounds[5]-this.cellBounds[2]+1;let t=(this.cellBounds[3]-this.cellBounds[0]+1)*this.cellY*this.cellZ;if(t>0&&t<=262144){this.denseCells=Array(t);for(let[e,t]of this.cells){let[n,r,i]=e.split(`/`).map(Number);this.denseCells[((n-this.cellBounds[0])*this.cellY+r-this.cellBounds[1])*this.cellZ+i-this.cellBounds[2]]=t}this.cells.clear()}}closest(e){let t=Math.floor(e[0]/5),n=Math.floor(e[1]/5),r=Math.floor(e[2]/5);if(t<this.cellBounds[0]||n<this.cellBounds[1]||r<this.cellBounds[2]||t>this.cellBounds[3]||n>this.cellBounds[4]||r>this.cellBounds[5])return null;let i=this.denseCells?this.denseCells[((t-this.cellBounds[0])*this.cellY+n-this.cellBounds[1])*this.cellZ+r-this.cellBounds[2]]:this.cells.get(`${t}/${n}/${r}`),a=null,o=1/0,s=0,c=0;for(let t of i??[]){let n=t*2,r=0;for(let t=0;t<3;t++){let i=Math.max(0,this.bounds[n+t]-e[t],e[t]-this.bounds[n+3+t]);r+=i*i}if(r>o)continue;let i=this.prepared[t/3],l=e[0]-i.ax,u=e[1]-i.ay,d=e[2]-i.az,f=i.bx*l+i.by*u+i.bz*d,p=i.cx*l+i.cy*u+i.cz*d,m=0,h=0;if(!(f<=0&&p<=0)){let e=l-i.bx,t=u-i.by,n=d-i.bz,r=i.bx*e+i.by*t+i.bz*n,a=i.cx*e+i.cy*t+i.cz*n,o=f*a-r*p;if(r>=0&&a<=r)m=1;else if(o<=0&&f>=0&&r<=0)m=f/(f-r);else{let e=l-i.cx,t=u-i.cy,n=d-i.cz,s=i.bx*e+i.by*t+i.bz*n,c=i.cx*e+i.cy*t+i.cz*n,g=s*p-f*c,_=r*c-s*a;if(c>=0&&s<=c)h=1;else if(g<=0&&p>=0&&c<=0)h=p/(p-c);else if(_<=0&&a-r>=0&&s-c>=0)h=(a-r)/(a-r+(s-c)),m=1-h;else{let e=_+g+o;Math.abs(e)>=1e-18&&(m=g/e,h=o/e)}}}let g=l-i.bx*m-i.cx*h,_=u-i.by*m-i.cy*h,v=d-i.bz*m-i.cz*h,y=g*g+_*_+v*v;y<o&&(a=i,o=y,s=m,c=h)}return a?{point:[a.ax+a.bx*s+a.cx*c,a.ay+a.by*s+a.cy*c,a.az+a.bz*s+a.cz*c],weights:[1-s-c,s,c],normal:a.normal,vertices:a.vertices,distance:Math.sqrt(o)}:null}};function R(e,t){let[n,r,i]=t,a=e[n*3],o=e[n*3+1],s=e[n*3+2],c=e[r*3]-a,l=e[r*3+1]-o,u=e[r*3+2]-s,d=e[i*3]-a,f=e[i*3+1]-o,p=e[i*3+2]-s,m=l*p-u*f,h=u*d-c*p,g=c*f-l*d,_=Math.hypot(m,h,g);return{ax:a,ay:o,az:s,bx:c,by:l,bz:u,cx:d,cy:f,cz:p,vertices:t,normal:_>1e-12?[m/_,h/_,g/_]:[0,0,0]}}var z=class{source;bins=new Map;constructor(e){if(this.source=e,e.version!==1||e.units!==`mm`)throw Error(`Unsupported cheek source units.`);let t=e.chart,n=e.triangles;for(let e=0;e<n.length;e+=3){let r=[t[n[e]*2],t[n[e+1]*2],t[n[e+2]*2]],i=[t[n[e]*2+1],t[n[e+1]*2+1],t[n[e+2]*2+1]];for(let t=Math.floor(Math.min(...r)/4);t<=Math.floor(Math.max(...r)/4);t++)for(let n=Math.floor(Math.min(...i)/4);n<=Math.floor(Math.max(...i)/4);n++){let r=`${t}/${n}`,i=this.bins.get(r)??[];i.push(e),this.bins.set(r,i)}}}sample(e,t){let n=this.source,r=null,i=1/0;for(let a of this.bins.get(`${Math.floor(e/4)}/${Math.floor(t/4)}`)??[]){let o=[n.triangles[a],n.triangles[a+1],n.triangles[a+2]],s=n.chart[o[0]*2],c=n.chart[o[0]*2+1],l=n.chart[o[1]*2],u=n.chart[o[1]*2+1],d=n.chart[o[2]*2],f=n.chart[o[2]*2+1],p=(u-f)*(s-d)+(d-l)*(c-f);if(Math.abs(p)<1e-9)continue;let m=((u-f)*(e-d)+(d-l)*(t-f))/p,h=((f-c)*(e-d)+(s-d)*(t-f))/p,g=[m,h,1-m-h],_=Math.max(0,-Math.min(...g));if(_>=i||_>.003)continue;let v=[0,0,0],y=[0,0,0],b=[0,0];for(let e=0;e<3;e++){for(let t=0;t<3;t++)v[t]=v[t]+n.positions[o[e]*3+t]*g[e],y[t]=y[t]+n.normals[o[e]*3+t]*g[e];for(let t=0;t<2;t++)b[t]=b[t]+n.uv[o[e]*2+t]*g[e]}let x=Math.hypot(...y);if(!(x<.2)){for(let e=0;e<3;e++)y[e]=y[e]/x;if(r={point:v,normal:y,uv:b,vertices:o,weights:g},i=_,_===0)break}}if(!r)throw Error(`The design leaves the supported anterior cheek at ${e.toFixed(1)}, ${t.toFixed(1)} mm.`);return r}};let B=(e,t,n)=>{let r=Math.max(0,Math.min(1,(n-e)/(t-e)));return r*r*(3-2*r)},V=e=>1.3-.5*B(18,40,e),ee=e=>3*(1-B(22,35,e)),te=(e,t)=>e.point.map((n,r)=>n-t*e.normal[r]);function ne(e,t,n=new z(e)){if(![10,15,20].includes(t.diameterMm)||!Number.isFinite(t.degrees))throw Error(`Unsupported cheek case.`);if(t.centerMm&&(t.centerMm.length!==2||!t.centerMm.every(Number.isFinite)))throw Error(`Unsupported cheek location.`);let r=t.centerMm?[...t.centerMm,n.sample(...t.centerMm).point[2]]:e.caseCenter,i=t.degrees*Math.PI/180,a=Math.cos(i),o=Math.sin(i),s=n.sample(r[0],r[1]),c=Math.max(.2,s.normal[2]),l=(e,t)=>Math.sqrt(e*e+t*t+((s.normal[0]*e+s.normal[1]*t)/c)**2),u=t.diameterMm*3,d=u/2,f=t.diameterMm/2,p=(e,t,i)=>{let a=l(e,t)*.45,o=l(e,t)*4;for(let s=0;s<22;s++){let s=(a+o)/2,c=0,l=null;try{for(let a=0;a<=100;a++){let o=(-i/2+i*a/100)/s,u=n.sample(r[0]+e*o,r[1]+t*o).point;l&&(c+=Math.hypot(u[0]-l[0],u[1]-l[1],u[2]-l[2])),l=u}}catch{c=1/0}c>i?a=s:o=s}return(a+o)/2},m=p(a,o,u),h=p(-o,a,t.diameterMm),g=[],_=Math.ceil(u/.5),v=(e,t)=>[r[0]+e/m*a-t/h*o,r[1]+e/m*o+t/h*a];for(let e of[1,-1])for(let t=0;t<_;t++){let n=(e===1?-1+2*t/_:1-2*t/_)*d,r=e*f*(1-(n/d)**2);g.push(...v(n,r))}g.push(g[0],g[1]);for(let e=0;e<g.length;e+=2)n.sample(g[e],g[e+1]);return{center:r,rotation:i,cos:a,sin:o,length:u,half:d,width:f,sx:m,sy:h,path:g,local:v,fitAxis:p}}function H(e,t,n=`unit-node`,r,i=!1,a=!1,o){if(![`unit-node`,`integrated`].includes(n))throw Error(`Unsupported tissue discretization.`);let s=n===`integrated`;if(a&&r)throw Error(`The circular domain has a separately reviewed layer construction.`);let c=t=>a?t<=34:s&&e.materialInterfaces?t<=e.materialInterfaces.carriedFatLimitYmm+1e-4:ee(t)>1.2,l=e=>a?Math.min(1,ee(e)/2):1,u=new z(e),{center:d,cos:p,sin:m,length:h,half:y,width:b,sx:S,sy:E,path:N,local:P}=ne(e,t,u),F=v(Float32Array.from(e.chart),Uint32Array.from(e.triangles),N,i?.02:.12,i);if(F.breaks.length||F.chain.length<30)throw Error(`The incision crosses an unsupported opening.`);let R=(e,t)=>{let n=e-d[0],r=t-d[1],i=(n*p+r*m)*S,a=(-n*m+r*p)*E;return Math.abs(i)<y-1e-6&&Math.abs(a)<b*(1-(i/y)**2)-1e-5},B=[],H=F.positions,re=(e,t)=>{let n=!1;for(let r=0,i=F.chain.length-1;r<F.chain.length;i=r++){let a=F.chain[r],o=F.chain[i],s=H[a*2],c=H[a*2+1],l=H[o*2],u=H[o*2+1];c>t!=u>t&&e<(l-s)*(t-c)/(u-c)+s&&(n=!n)}return n};for(let e=0;e<F.triangles.length;e+=3){let t=Array.from(F.triangles.slice(e,e+3)),n=t.reduce((e,t)=>e+H[t*2],0)/3,r=t.reduce((e,t)=>e+H[t*2+1],0)/3;(i?re(n,r):R(n,r))||B.push(...t)}let ie=new Set;if(s&&e.materialInterfaces)for(let t=0;t<H.length/2;t++)Math.abs(H[t*2+1]-e.materialInterfaces.carriedFatLimitYmm)<1e-4&&ie.add(t);if((s||i)&&(B=w(H,B,new Set(F.chain),ie)),B=T(H,B,new Set(F.chain),ie),(s||i)&&(H=C(H,B,new Set(F.chain),N)),r){let e=r.geometry,t=Math.max(...e.sourceIndices)+1;H=new Float32Array(t*2),e.sourceIndices.forEach((t,n)=>H.set(e.chart.slice(n*2,n*2+2),t*2)),B=Array.from(e.triangles,t=>e.sourceIndices[t]),F.chain=Array.from(e.rim,t=>e.sourceIndices[t])}if(o){if(r)throw Error(`Choose one rest-surface construction.`);H=o.chart,B=Array.from(o.triangles),F.chain=o.rim}let ae=_(Uint32Array.from(B),H.length/2),oe=Array.from({length:ae.length},(e,t)=>t).filter(e=>ae[e]),U=new Map(oe.map((e,t)=>[e,t])),se=Uint32Array.from(B.map(e=>U.get(e))),ce=oe.length,W=[],G=[],K=[],le=[],ue=[],de=new Set(g(se)),fe=new Set(e.pinned),pe=[],me=g(Uint32Array.from(e.triangles)),q=[];for(let e=0;e<me.length;e+=2)fe.has(me[e])&&fe.has(me[e+1])&&q.push([me[e],me[e+1]]);let he=new Set(e.lid);for(let t=0;t<e.positions.length/3;t++)if(!(fe.has(t)||he.has(t)))for(let[n,r]of q){let i=[0,1,2].map(t=>e.positions[r*3+t]-e.positions[n*3+t]),a=[0,1,2].map(r=>e.positions[t*3+r]-e.positions[n*3+r]),o=Math.max(0,Math.min(1,a.reduce((e,t,n)=>e+t*i[n],0)/Math.max(1e-12,i.reduce((e,t)=>e+t*t,0))));if(Math.hypot(...a.map((e,t)=>e-o*i[t]))<.25){fe.add(t);break}}let ge=oe.map(e=>u.sample(H[e*2],H[e*2+1]));function _e(e,t=!1){let n=W.length/3;return W.push(...e),G.push(+!t),n}ge.forEach((e,t)=>{let n=fe.has(oe[t]);_e(e.point,n),n&&pe.push(t),K.push(H[oe[t]*2],H[oe[t]*2+1]),le.push(...e.normal),ue.push(...e.uv)});let ve=(e,t,n,i)=>r?Array.from(r.geometry.positions.slice((t+n*ce)*3,(t+n*ce+1)*3)):te(e,i),J=ge.map((e,t)=>_e(ve(e,t,1,V(e.point[1])),!G[t])),ye=ge.map((e,t)=>_e(ve(e,t,2,V(e.point[1])*.5),!G[t])),Y={id:`cheek-xyz-${s?`v7-integrated`:`v4`}/${e.geometrySha256.slice(0,12)}/${t.diameterMm}/${t.degrees}${d[0]===e.caseCenter[0]&&d[1]===e.caseCenter[1]?``:`/at-${d[0]},${d[1]}`}${i?`/precise-cut-v1`:``}${a?`/tapered-fat-v1`:``}`,discretization:n,...a?{fatModel:`tapered-v1`}:{},rest:new Float64Array,massMg:new Float64Array,inverseMass:new Float64Array,attachmentAreaMm2:new Float64Array,springs:[],tets:[],anchors:[],links:[],bed:[],banks:[],rigid:{surfaces:e.supports,vertices:[]},globe:{...e.globe,vertices:[]},surface:{count:ce,triangles:se,uv:Float32Array.from(ue),normals:Float32Array.from(le),chart:Float32Array.from(K)},dermalMiddle:ye,walls:{dermis:new Uint32Array,fat:new Uint32Array},fatSurface:new Uint32Array,tarsus:{triangles:new Uint32Array,vertices:[]},muscle:{triangles:new Uint32Array,vertices:[]},closure:{deeps:[],running:[],gaps:[],eversion:[],seamLengthMm:0},wound:[],lid:[],pinned:pe,size:{diameterMm:t.diameterMm,degrees:t.degrees,plannedLengthMm:h,surfaceLengthMm:0}},be=(e,t)=>Math.hypot(W[e*3]-W[t*3],W[e*3+1]-W[t*3+1],W[e*3+2]-W[t*3+2]),xe=new Set;function Se(e,t,n){let r=e<t?`${e}/${t}`:`${t}/${e}`;e===t||xe.has(r)||(xe.add(r),Y.springs.push({a:e,b:t,rest:be(e,t),compliance:n}))}function Ce(e,t,n){let[r,i,a]=e.map((e,n)=>({t:e,b:t[n]})).sort((e,t)=>e.t-t.t);for(let e of[[r.t,i.t,a.t,a.b],[r.t,i.t,i.b,a.b],[r.t,r.b,i.b,a.b]]){let t=x(W,...e);if(Math.abs(t)<1e-7)throw Error(`Collapsed cell: `+JSON.stringify({rest:t,material:n,v:e,points:e.map(e=>W.slice(e*3,e*3+3))}));if(t<0&&([e[1],e[2]]=[e[2],e[1]],t=-t),Y.tets.push({vertices:e,rest:t,material:n}),!s&&n!==`dermis`)for(let t=0;t<4;t++)for(let r=t+1;r<4;r++)Se(e[t],e[r],(n===`fat`?3e-4:n===`muscle`?8e-5:15e-7)*Math.max(.2,be(e[t],e[r])))}}let X=[];for(let e=0;e<se.length;e+=3){let t=Array.from(se.slice(e,e+3)),n=t.map(e=>ye[e]);Ce(t,n,`dermis`),Ce(n,t.map(e=>J[e]),`dermis`),X.push(...t.map(e=>J[e]))}let Z=new Set(F.chain.map(e=>U.get(e)).filter(e=>e!==void 0&&de.has(e)));Y.wound=[...Z],Y.lid=e.lid.map(e=>U.get(e)).filter(e=>e!==void 0);let we=new Set(Y.lid);for(let e of de)!Z.has(e)&&!we.has(e)&&(G[e]=0,G[J[e]]=0,G[ye[e]]=0,pe.includes(e)||pe.push(e));let Te=[],Ee=[],De=g(se);for(let e=0;e<De.length;e+=2){let t=De[e],n=De[e+1];if(Z.has(t)&&Z.has(n)){let e=ye[t],r=ye[n];Te.push(t,e,n,n,e,r,e,J[t],r,r,J[t],J[n])}}Y.walls.dermis=Uint32Array.from(Te);let Q=new Map,Oe=[];for(let e=0;e<ce;e++)c(K[e*2+1])&&Q.set(e,_e(ve(ge[e],e,3,V(K[e*2+1])+l(K[e*2+1])),!G[e]));for(let e=0;e<se.length;e+=3){let t=Array.from(se.slice(e,e+3));if(t.every(e=>Q.has(e))){let e=t.map(e=>Q.get(e));Ce(t.map(e=>J[e]),e,`fat`),X.push(...e),Oe.push(...e)}}for(let e=0;e<De.length;e+=2){let t=De[e],n=De[e+1];Z.has(t)&&Z.has(n)&&Q.has(t)&&Q.has(n)&&Ee.push(J[t],Q.get(t),J[n],J[n],Q.get(t),Q.get(n))}Y.walls.fat=Uint32Array.from(Ee);let ke={upper:[],lower:[]},Ae=e=>(K[e*2]-d[0])*p+(K[e*2+1]-d[1])*m;for(let e of Y.wound)(-(K[e*2]-d[0])*m+(K[e*2+1]-d[1])*p>0?ke.upper:ke.lower).push(e);let je=new Set;for(let[e,t]of[[ke.lower,ke.upper],[ke.upper,ke.lower]])for(let n of e){let e=-1,r=1/0;for(let i of t){let t=Math.abs(Ae(n)-Ae(i));t<r&&(r=t,e=i)}if(e<0||n===e||r>1.5)continue;let i=n<e?`${n}/${e}`:`${e}/${n}`;if(je.has(i)||be(n,e)<.4)continue;je.add(i);let a=be(n,e),o=[0,1,2].map(t=>(W[e*3+t]-W[n*3+t])/a);Y.banks.push({a:n,b:e,normal:o},{a:ye[n],b:ye[e],normal:o},{a:J[n],b:J[e],normal:o}),Q.has(n)&&Q.has(e)&&Y.banks.push({a:Q.get(n),b:Q.get(e),normal:o})}let Me=new Map,Ne=new Map,Pe=[];for(let t=0;t<e.positions.length/3;t++){let n=e.chart[t*2+1];if(!c(n))continue;let r=u.sample(e.chart[t*2],n),i=fe.has(t),a=_e(te(r,V(n)+l(n)),i),o=_e(te(r,V(n)+ee(n)),i);Me.set(t,a),Ne.set(t,o);let s=W.slice(o*3,o*3+3);Y.anchors.push({p:o,target:s,compliance:8e-4,kind:n>22?`retaining`:`bed`}),Y.bed.push({p:o,point:s,normal:r.normal})}for(let t=0;t<e.triangles.length;t+=3){let n=e.triangles.slice(t,t+3);if(!n.every(e=>Me.has(e)))continue;let r=n.map(e=>Me.get(e));Ce(r,n.map(e=>Ne.get(e)),`fat`),Pe.push(...r),X.push(...n.map(e=>Ne.get(e)))}Y.fatSurface=Uint32Array.from(Pe),o?.releaseAt&&(Y.slidingInterface={upper:Uint32Array.from(se,e=>Q.get(e)??J[e]),lower:Y.fatSurface});let Fe=s?Array.from({length:N.length/2},(e,t)=>u.sample(N[t*2],N[t*2+1]).point):[],Ie=new Float64Array(W.length/3);for(let[e,t]of Q){let n=ge[e];if(!n.vertices.every(e=>Me.has(e)))continue;let r=n.vertices.map(e=>Me.get(e)),i=[0,0,0];for(let e=0;e<3;e++)i[e]=W[t*3+e]-r.reduce((t,r,i)=>t+W[r*3+e]*n.weights[i],0);let a=s?j(n.point,Fe):Math.min(...Y.wound.map(e=>Math.hypot(...[0,1,2].map(t=>n.point[t]-W[e*3+t]))));Ie[t]=a,Y.links.push({p:t,vertices:r,weights:n.weights,offset:i,normal:n.normal,compliance:1e-6,releasable:a<=6&&!!G[t],releaseDistanceMm:a,kind:`fat-interface`,...G[t]&&o?.releaseAt?.(K[e*2],K[e*2+1])?{preparedRelease:!0}:{}})}if(s){for(let[e,t]of Q)Ie[t]=j(ge[e].point,Fe);let e=O(W,Oe),t=[3,6].map(e=>A(W,Oe,Ie,e));for(let n of Y.links)n.kind===`fat-interface`&&G[n.p]&&e[n.p]>0&&(n.retainedFraction=t.map(t=>Math.max(0,Math.min(1,t[n.p]/e[n.p]))),n.releasable=n.retainedFraction[1]<1)}for(let e=0;e<ce;e++)Q.has(e)||Y.anchors.push({p:J[e],target:te(ge[e],V(K[e*2+1])),compliance:.008,kind:`retaining`});function Le(e,t){let n=[],r=[],i=e.top.length/3;for(let t=0;t<i;t++)n.push(_e(e.top.slice(t*3,t*3+3)));for(let t=0;t<i;t++)r.push(_e(e.bottom.slice(t*3,t*3+3)));for(let i=0;i<e.triangles.length;i+=3){let a=e.triangles.slice(i,i+3),o=a.map(e=>r[e]);Ce(a.map(e=>n[e]),o,t),X.push(...o)}return{top:n,bottom:r,triangles:Uint32Array.from(e.triangles.map(e=>n[e]))}}let Re=Le(e.muscle,`muscle`),ze=Le(e.deepFat,`fat`);Y.muscle={triangles:Re.triangles,vertices:[...Re.top,...Re.bottom]};function Be(e,t,n,r,i){let a=I(W.slice(e*3,e*3+3),W,t);return!a||a.distance>n?!1:(Y.links.push({p:e,vertices:a.vertices,weights:a.weights,offset:[0,1,2].map(t=>W[e*3+t]-a.point[t]),normal:a.normal[2]<0?a.normal.map(e=>-e):a.normal,compliance:i,releasable:!1,kind:r}),!0)}let Ve=new Set;for(let e of Ne.values())Be(e,Re.triangles,3.5,`muscle-interface`,3e-5)&&Ve.add(e);for(let e=0;e<ce;e++)!Q.has(e)&&Be(J[e],Re.triangles,2.5,`muscle-interface`,4e-5)&&Ve.add(J[e]);Y.anchors=Y.anchors.filter(e=>!Ve.has(e.p)),Y.bed=Y.bed.filter(e=>!Ve.has(e.p));for(let e of Re.bottom)Be(e,ze.triangles,3,`muscle-interface`,8e-5)||Y.anchors.push({p:e,target:W.slice(e*3,e*3+3),compliance:.004,kind:`retaining`});for(let e of ze.bottom)Y.anchors.push({p:e,target:W.slice(e*3,e*3+3),compliance:.002,kind:`bed`});let He=e.tarsus.top.length/3,Ue=[],We=[];for(let t=0;t<He;t++)Ue.push(_e(e.tarsus.top.slice(t*3,t*3+3)));for(let t=0;t<He;t++)We.push(_e(e.tarsus.bottom.slice(t*3,t*3+3)));for(let t=0;t<e.tarsus.triangles.length;t+=3){let n=e.tarsus.triangles.slice(t,t+3);Ce(n.map(e=>Ue[e]),n.map(e=>We[e]),`tarsus`)}Y.tarsus={triangles:Uint32Array.from(e.tarsus.triangles.map(e=>Ue[e])),vertices:[...Ue,...We]};for(let[t,n]of[[`lateral`,0],[`medial`,16]]){let r=e.attachments.find(e=>e.id===`canthal-${t}`)?.fixedSiteMm;if(!r)throw Error(`Missing canthal attachment site.`);let i=[];for(let e=0;e<5;e++){let t=e*17+n,r=(e+1)*17+n;i.push(Ue[t],We[t],Ue[r],Ue[r],We[t],We[r])}let a=O(W,i),o=[[0,0,0],[0,.6,0],[.6,0,0],[0,0,.6]].map(e=>_e(r.map((t,n)=>t+e[n]),!0));for(let e=0;e<6;e++)for(let t of[Ue[e*17+n],We[e*17+n]])for(let e of o)Se(t,e,s?k(5e-6,a[t]/o.length):5e-6)}for(let e of Re.bottom)Be(e,Y.tarsus.triangles,2.5,`tarsal-interface`,2e-5);for(let e=0;e<ce;e++)!Ve.has(J[e])&&Be(J[e],Y.tarsus.triangles,2.2,`tarsal-interface`,2e-5)&&Ve.add(J[e]);Y.anchors=Y.anchors.filter(e=>!Ve.has(e.p));let Ge=new L(e.supports);for(let e=0;e<W.length/3;e++){if(!G[e])continue;let t=W.slice(e*3,e*3+3),n=Ge.closest(t);if(n&&n.distance<1&&t.reduce((e,t,r)=>e+(t-n.point[r])*n.normal[r],0)<-.05)throw Error(`Rest tissue intersects rigid support at ${e}.`);Y.rigid.vertices.push(e)}for(let t=0;t<W.length/3;t++){let n=Math.hypot(W[t*3]-e.globe.center[0],W[t*3+1]-e.globe.center[1],W[t*3+2]-e.globe.center[2]);if(n<e.globe.radius+5&&W[t*3+2]>e.globe.center[2]){if(n<e.globe.radius-.03)throw Error(`Rest tissue intersects the globe at node ${t} (${W.slice(t*3,t*3+3).join(`,`)}) by ${(e.globe.radius-n).toFixed(2)} mm.`);Y.globe.vertices.push(t)}}if(Y.rest=Float64Array.from(W),Y.massMg=D(G.length,Y.tets),Y.inverseMass=s?Float64Array.from(G,(e,t)=>e&&Y.massMg[t]>0?1/Y.massMg[t]:0):Float64Array.from(G),Y.attachmentAreaMm2=O(W,X),s){Y.springs.unshift(...M(W,Y.tets)),Y.links=Y.links.filter(e=>Y.attachmentAreaMm2[e.p]>0),Y.anchors=Y.anchors.filter(e=>Y.attachmentAreaMm2[e.p]>0);for(let e of Y.links)e.compliance=k(e.compliance,Y.attachmentAreaMm2[e.p]);for(let e of Y.anchors)e.compliance=k(e.compliance,Y.attachmentAreaMm2[e.p])}let Ke=null;for(let e=0;e<=100;e++){let t=P(-y+h*e/100,0),n=u.sample(t[0],t[1]).point;Ke&&(Y.size.surfaceLengthMm+=Math.hypot(n[0]-Ke[0],n[1]-Ke[1],n[2]-Ke[2])),Ke=n}if(Math.abs(Y.size.surfaceLengthMm-h)>.02)throw Error(`The requested length does not fit the supported cheek surface.`);let qe=new Set(Y.tets.flatMap(e=>e.vertices));for(let e=0;e<G.length;e++)qe.has(e)||(Y.inverseMass[e]=0);return r?(Y.id+=`/circular-bevel-v1`,Y.size.plannedLengthMm=0,Y.size.surfaceLengthMm=0,Y.banks=[]):o?(Y.id+=`/${o.identity}`,Y.banks=[]):Y.closure=f(Y,J,d),Y}function re(e,t){let n=new z(e),r=n.sample(...t).point,i=n.sample(t[0]-12,t[1]).normal,a=Math.hypot(i[0],i[2]),o=i[2]/a,s=-i[0]/a,c=e=>[(e[0]-r[0])*o+(e[2]-r[2])*s,e[1]-r[1]],l=[];for(let t=0;t<e.positions.length;t+=3)l.push(...c(e.positions.slice(t,t+3)));let u=new z({...e,chart:l});return{local:(t,n)=>{let r=u.sample(t,n);return[0,1].map(t=>r.vertices.reduce((n,i,a)=>n+e.chart[i*2+t]*r.weights[a],0))},inverse:(e,t)=>{try{return c(n.sample(e,t).point)}catch{return[1/0,1/0]}}}}function ie(e,t){if(![10,15].includes(t.diameterMm)||t.degrees!==0||t.centerMm&&(t.centerMm[0]!==-36||t.centerMm[1]!==8))throw Error(`The advancement comparison uses a 10 or 15 mm defect at the starting cheek position.`);let{local:n,inverse:r}=re(e,[-36,8]),i=t.diameterMm*.55,a=-i-t.diameterMm*2,o=2*i,s=Math.sqrt(3)/2*o;return{local:n,inverse:r,s:i,tail:a,A:o,H:s,excisions:[[[-i,-i],[i,-i],[i,i],[-i,i]],[[a,i],[a+o,i],[a+o/2,i+s]],[[a,-i],[a+o,-i],[a+o/2,-i-s]]].map(e=>{let t=e.flatMap(([t,r],i)=>{let[a,o]=e[(i+1)%e.length],s=Math.ceil(Math.hypot(a-t,o-r)/.5);return Array.from({length:s},(e,i)=>n(t+(a-t)*i/s,r+(o-r)*i/s)).flat()});return t.push(...n(e[0][0],e[0][1])),t}),releases:[-1,1].map(e=>{let t=[];for(let r=0;r<=24;r++)t.push(...n(-i+(a+o+i)*r/24,e*i));return t})}}function ae(e,t,n,r,i){if(!/^manual-[a-zA-Z0-9-]+$/.test(t))throw Error(`Invalid stitch identifier.`);let a=new Set(e.wound);for(let t of[n,r])ce(e,t,a);if(s(e.rest,n,r)<1)throw Error(`Choose two distinct wound locations at least 1 mm apart.`);let o=oe(e),l=t=>{let n=e.surface.chart,r=[0,0,0];t.vertices.forEach((e,i)=>{r[0]+=n[e*2]*t.weights[i],r[1]+=n[e*2+1]*t.weights[i]});let a=[...new Set(t.vertices.filter((e,n)=>t.weights[n]>0))];if(a.length>2||a.length===2&&!o.neighbours.get(a[0])?.includes(a[1]))throw Error(`Choose a point on one connected wound edge.`);let c=0,l=0;t.vertices.forEach((e,n)=>{let r=o.inward.get(e);c+=r[0]*t.weights[n],l+=r[1]*t.weights[n]});let u=Math.hypot(c,l);if(u<1e-8)throw Error(`This rim location has no supported tissue behind it.`);c/=u,l/=u;let d=2,f=null;for(let n=0;n<5;n++){f=G(e,r[0]+c*d,r[1]+l*d);let n=s(e.rest,t,f);if(n<1e-6)throw Error(`The stitch bite could not be constructed.`);d*=2/n}if(!f||Math.abs(s(e.rest,t,f)-2)>.1)throw Error(`The stitch bite leaves the supported skin.`);return{deep:W(e,K(e,o.ring,t,-1,i),.9),inner:W(e,K(e,o.ring,t,1,i),.65),shoulder:W(e,f,.1),surface:f}},u=l(n),d=l(r),f=[u.deep,u.shoulder,u.inner,d.inner,d.shoulder,d.deep],p=f.map((t,n)=>n===2||n===5?.12:s(e.rest,t,f[(n+1)%f.length])*.85),m={id:t,a:u.deep,b:d.deep,surfaceA:u.surface,surfaceB:d.surface,edgeA:U(n),edgeB:U(r),route:f,segmentTargets:p,closedRoute:!0,targetMm:p.reduce((e,t)=>e+t,0),restMm:0,order:0,chainId:null,chainIndex:null};return m.restMm=c(e.rest,m),m}function oe(e){let t=new Map,n=new Set(e.wound);for(let n=0;n<e.surface.triangles.length;n+=3)for(let r=0;r<3;r++){let i=e.surface.triangles[n+r],a=e.surface.triangles[n+(r+1)%3],o=e.surface.triangles[n+(r+2)%3],s=i<a?`${i}/${a}`:`${a}/${i}`,c=t.get(s);c?c.count++:t.set(s,{a:i,b:a,third:o,count:1})}let r=new Map,i=new Map;for(let{a,b:o,third:s,count:c}of t.values()){if(c!==1||!n.has(a)||!n.has(o))continue;let t=[0,1,2].map(t=>e.rest[o*3+t]-e.rest[a*3+t]),l=[0,1,2].map(t=>e.surface.normals[a*3+t]+e.surface.normals[o*3+t]),u=[l[1]*t[2]-l[2]*t[1],l[2]*t[0]-l[0]*t[2],l[0]*t[1]-l[1]*t[0]],d=u.reduce((t,n,r)=>t+n*(e.rest[s*3+r]-e.rest[a*3+r]),0)>=0?1:-1,f=Math.hypot(...u);if(f<1e-10)throw Error(`This wound edge has no supported tissue direction.`);for(let[e,t]of[[a,o],[o,a]]){let n=r.get(e)??[];n.push(t),r.set(e,n);let a=i.get(e)??[0,0,0];for(let e=0;e<3;e++)a[e]=a[e]+d*u[e]/f;i.set(e,a)}}for(let t of n){if(r.get(t)?.length!==2)throw Error(`The wound rim is not a connected closed boundary at ${t} (${e.surface.chart[t*2]}, ${e.surface.chart[t*2+1]}; ${r.get(t)?.length} neighbours).`);let n=i.get(t),a=Math.hypot(...n);if(a<1e-10){let i=r.get(t);n=[0,1,2].map(n=>e.rest[t*3+n]-i.reduce((t,r)=>t+e.rest[r*3+n],0)/i.length),a=Math.hypot(...n)}if(a<1e-10)throw Error(`This wound edge has no supported tissue direction.`);i.set(t,n.map(e=>e/a))}let a=[Math.min(...n)];for(;a.length<=n.size;){let e=a.at(-1),t=a.at(-2),n=r.get(e).filter(e=>e!==t).sort((e,t)=>e-t)[0];if(n===a[0])break;if(a.includes(n))throw Error(`The wound rim is not a connected closed boundary.`);a.push(n)}if(a.length!==n.size)throw Error(`The wound rim is not a connected closed boundary.`);return a.reduce((t,n,r)=>{let i=a[(r+1)%a.length];return t+e.rest[n*3]*e.rest[i*3+1]-e.rest[i*3]*e.rest[n*3+1]},0)<0&&a.reverse(),{neighbours:r,inward:i,ring:a}}function U(e){return{vertices:[...e.vertices],weights:[...e.weights]}}function se(e){return{...e,startLengths:[...e.startLengths],bite:{...e.bite,a:U(e.bite.a),b:U(e.bite.b),surfaceA:U(e.bite.surfaceA),surfaceB:U(e.bite.surfaceB),edgeA:U(e.bite.edgeA),edgeB:U(e.bite.edgeB),route:e.bite.route.map(U),segmentTargets:[...e.bite.segmentTargets]}}}function ce(e,t,n){if(!t||!Array.isArray(t.vertices)||!Array.isArray(t.weights)||!t.vertices.length||t.vertices.length!==t.weights.length||t.vertices.some(t=>!Number.isInteger(t)||t<0||t>=e.rest.length/3||n&&!n.has(t))||t.weights.some(e=>!Number.isFinite(e)||e<0)||Math.abs(t.weights.reduce((e,t)=>e+t,0)-1)>1e-7)throw Error(`Invalid material bite point.`)}function W(e,t,n){let r=n<=.5?n*2:(n-.5)*2,i=n<=.5?t.vertices:t.vertices.map(t=>e.dermalMiddle[t]),a=t.vertices.map(t=>n<=.5?e.dermalMiddle[t]:t+e.surface.count);return{vertices:[...i,...a],weights:[...t.weights.map(e=>e*(1-r)),...t.weights.map(e=>e*r)]}}function G(e,t,n){let r=e.surface.chart;for(let i=0;i<e.surface.triangles.length;i+=3){let a=Array.from(e.surface.triangles.slice(i,i+3)),[o,s,c]=a,l=r[o*2],u=r[o*2+1],d=r[s*2],f=r[s*2+1],p=r[c*2],m=r[c*2+1],h=(f-m)*(l-p)+(p-d)*(u-m);if(Math.abs(h)<1e-12)continue;let g=((f-m)*(t-p)+(p-d)*(n-m))/h,_=((m-u)*(t-p)+(l-p)*(n-m))/h;if(Math.min(g,_,1-g-_)>=-1e-8)return{vertices:a,weights:[Math.max(0,g),Math.max(0,_),Math.max(0,1-g-_)]}}throw Error(`The stitch bite leaves the supported skin. Choose another location.`)}function K(e,t,n,r,i){let a=[0],s=o(e.rest,n),c=0,l=1/0,u=1;for(let n=0;n<t.length;n++){let r=Array.from(e.rest.slice(t[n]*3,t[n]*3+3)),o=Array.from(e.rest.slice(t[(n+1)%t.length]*3,t[(n+1)%t.length]*3+3)).map((e,t)=>e-r[t]),d=Math.hypot(...o),f=Math.max(0,Math.min(1,o.reduce((e,t,n)=>e+t*(s[n]-r[n]),0)/Math.max(1e-12,d*d))),p=Math.hypot(...r.map((e,t)=>e+o[t]*f-s[t]));p<l&&(l=p,c=a[n]+f*d,u=i?o.reduce((e,t,n)=>e+t*i[n],0)>=0?1:-1:Math.abs(o[0])>.1?o[0]>0?1:-1:o[1]>0?1:-1),a.push(a[n]+d)}let d=a.at(-1),f=((c+r*u)%d+d)%d,p=0;for(;p<t.length-1&&a[p+1]<f;)p++;let m=(f-a[p])/Math.max(1e-12,a[p+1]-a[p]);return{vertices:[t[p],t[(p+1)%t.length]],weights:[1-m,m]}}function le(e,t){let{local:n,inverse:r,s:i,tail:a,A:l,H:u,excisions:d,releases:f}=ie(e,t),m=Float32Array.from(e.chart),h=Uint32Array.from(e.triangles),_=new Set;for(let e of d){let t=v(m,h,e,.04,!0);if(t.breaks.length)throw Error(`The advancement leaves the supported cheek surface.`);let n=(e,n)=>{let r=!1;for(let i=0,a=t.chain.length-1;i<t.chain.length;a=i++){let o=t.chain[i],s=t.chain[a],c=t.positions[o*2],l=t.positions[o*2+1],u=t.positions[s*2],d=t.positions[s*2+1];l>n!=d>n&&e<(u-c)*(n-l)/(d-l)+c&&(r=!r)}return r},r=[];for(let e=0;e<t.triangles.length;e+=3){let i=Array.from(t.triangles.slice(e,e+3));n(i.reduce((e,n)=>e+t.positions[n*2],0)/3,i.reduce((e,n)=>e+t.positions[n*2+1],0)/3)||r.push(...i)}t.chain.forEach(e=>_.add(e)),r=T(t.positions,w(t.positions,r,_),_),m=t.positions,h=Uint32Array.from(r)}for(let e of f){let t=b(m,h,e,.02,{precise:!0});if(m=t.positions,h=t.triangles,t.seam.length<4)throw Error(`The advancement release incision could not be constructed.`)}let y=Array.from(m),x=Array.from(h),S=new Map;for(let e=0;e<x.length;e+=3)for(let t of x.slice(e,e+3)){let n=S.get(t)??[];n.push(e),S.set(t,n)}for(let[e,t]of S){let n=new Set(t),r=!0;for(;n.size;){let t=[n.values().next().value],i=[];for(;t.length;){let r=t.pop();if(!n.delete(r))continue;i.push(r);let a=x.slice(r,r+3).filter(t=>t!==e);for(let r of n)x.slice(r,r+3).some(t=>t!==e&&a.includes(t))&&t.push(r)}if(r){r=!1;continue}let a=y.length/2;y.push(m[e*2],m[e*2+1]);for(let t of i)for(let n=0;n<3;n++)x[t+n]===e&&(x[t+n]=a)}}m=Float32Array.from(y),h=Uint32Array.from(x);let C=g(Uint32Array.from(e.triangles)),E=t=>{let n=m[t*2],r=m[t*2+1];for(let t=0;t<C.length;t+=2){let i=C[t],a=C[t+1],o=e.chart[i*2],s=e.chart[i*2+1],c=e.chart[a*2]-o,l=e.chart[a*2+1]-s,u=Math.max(0,Math.min(1,((n-o)*c+(r-s)*l)/(c*c+l*l)));if(Math.hypot(n-o-u*c,r-s-u*l)<.15)return!0}return!1},D=[...new Set(g(h))].filter(e=>!E(e)),O=H(e,t,`unit-node`,void 0,!0,!0,{chart:m,triangles:h,rim:D,identity:`advancement-burow-orthogonal-v4`,releaseAt:(e,t)=>{let[n,o]=r(e,t);return n>a-4&&n<i+3&&Math.abs(o)<i+u+3}});O.repair={kind:`advancement`,label:`Cheek advancement`};let k=g(O.surface.triangles),A=new Set(O.wound),j=new Map;for(let e=0;e<O.surface.triangles.length;e+=3)for(let t=0;t<3;t++){let n=O.surface.triangles[e+t],r=O.surface.triangles[e+(t+1)%3];j.set(n<r?`${n}/${r}`:`${r}/${n}`,O.surface.triangles[e+(t+2)%3])}let M=(e,t,i)=>{let[a,o]=n(e,t),s=null,c=1/0;for(let e=0;e<k.length;e+=2){let t=k[e],n=k[e+1];if(!A.has(t)||!A.has(n))continue;let l=j.get(t<n?`${t}/${n}`:`${n}/${t}`),[u,d]=r(O.surface.chart[l*2],O.surface.chart[l*2+1]);if(!i(u,d))continue;let f=O.surface.chart[t*2],p=O.surface.chart[t*2+1],m=O.surface.chart[n*2]-f,h=O.surface.chart[n*2+1]-p,g=Math.max(0,Math.min(1,((a-f)*m+(o-p)*h)/(m*m+h*h))),_=Math.hypot(a-f-g*m,o-p-g*h);_<c&&(c=_,s={vertices:[t,n],weights:[1-g,g]})}if(!s||c>.3)throw Error(`Unsupported advancement bite at ${e.toFixed(2)},${t.toFixed(2)} (${c.toFixed(2)}).`);return s},N=[{name:`primary`,length:2*i,pair:e=>[M(-i,-i+2*i*e,e=>e<-i+.2),M(i,-i+2*i*e,e=>e>i-.2)]},...[-1,1].map(e=>({name:e===1?`upper`:`lower`,length:-i-a,pair:t=>[M(a+(-i-a)*t,e*i,(e,t)=>e<-i+.3&&Math.abs(t)<i),M(a+l+(-i-a)*t,e*i,(t,n)=>e*n>i)]})),...[-1,1].map(e=>({name:e===1?`upper-Burow`:`lower-Burow`,length:Math.hypot(l/2,u),pair:t=>[M(a+l/2-l/2*t,e*(i+u-u*t),e=>e<a+l/2),M(a+l/2+l/2*t,e*(i+u-u*t),e=>e>a+l/2)]}))],P=(e,t)=>({vertices:[...e.vertices,...e.vertices.map(e=>e+O.surface.count)],weights:[...e.weights.map(e=>e*(1-t)),...e.weights.map(e=>e*t)]}),F=[],I=[],L=[];for(let e of N){let t=e.name===`primary`||e.name.endsWith(`Burow`)?[0,1,0]:[1,0,0];for(let n of e.name===`primary`?[.5,.25,.75]:[.5]){let[r,i]=e.pair(n),a=ae(O,`manual-${e.name}-${F.length}`,r,i,t);a.id=`deep-${F.length}`,a.order=F.length,F.push(a)}let n=null,r=Math.ceil(e.length/2.5);for(let t=0;t<r;t++){let i=e.name.endsWith(`Burow`)?Math.max(.8/e.length,1.2/l):.8/e.length,a=1-.8/e.length,[u,d]=e.pair(i+(a-i)*t/(r-1)),f=ae(O,`manual-${e.name}-${t}`,u,d),p=f.surfaceA,m=f.surfaceB,h=[p,P(p,.35),P(u,.6),P(d,.6),P(m,.35),m],g=h.slice(0,-1).map((e,t)=>t===2?.12:s(O.rest,e,h[t+1]));if(n){let e=o(O.rest,n.edgeB),t=o(O.rest,u),r=o(O.rest,n.b),i=o(O.rest,p),a=r.map((n,r)=>n-e[r]-(i[r]-t[r])),c=(s(O.rest,n.edgeA,u)+s(O.rest,n.edgeB,d))/2;g.unshift(Math.hypot(...a)+c),h.unshift(n.b)}let _={id:`running-${I.length}`,a:p,b:m,surfaceA:p,surfaceB:m,edgeA:u,edgeB:d,route:h,segmentTargets:g,closedRoute:!1,targetMm:g.reduce((e,t)=>e+t,0),restMm:0,order:I.length,chainId:e.name,chainIndex:t};_.restMm=c(O.rest,_),I.push(_),n=_}for(let t=1;t<Math.ceil(e.length*2);t++){let[n,r]=e.pair(t/Math.ceil(e.length*2));L.push({a:n,b:r})}}let R=F.flatMap(e=>[{edge:e.edgeA,shoulder:e.surfaceA},{edge:e.edgeB,shoulder:e.surfaceB}]).map(e=>({...e,restHeightMm:p(O.rest,e.edge,e.shoulder)}));F.forEach((e,t)=>{e.startStep=(t<3?t:t<5?3:4)*12});let z=I.filter(e=>e.chainId===`primary`).length*6;I.forEach(e=>{e.startStep=(e.chainId===`primary`?0:z)+e.chainIndex*6});let B=0;for(let e of N){let t=Math.ceil(e.length*2),n=e.pair(1e-4);for(let r=1;r<=t;r++){let i=e.pair(Math.min(.9999,r/t));B+=(s(O.rest,n[0],i[0])+s(O.rest,n[1],i[1]))/2,n=i}}return O.closure={deeps:F,running:I,gaps:L,eversion:R,seamLengthMm:B},O.size.plannedLengthMm=O.closure.seamLengthMm,O.size.surfaceLengthMm=O.closure.seamLengthMm,O}function ue(e){return{...e,startLengths:[...e.startLengths],biteStarted:[...e.biteStarted],...e.edits?{edits:Object.fromEntries(Object.entries(e.edits).map(([e,t])=>[e,{...t}]))}:{}}}function de(e,t){if(!e.edits)return;let n=new Set([...t.deeps,...t.running].map(e=>e.id));for(let[t,r]of Object.entries(e.edits))if(!n.has(t)||!r||typeof r.removed!=`boolean`||![r.tightening,r.applied,r.placement].every(e=>Number.isFinite(e)&&e>=0&&e<=1)||r.placement<=0)throw Error(`Invalid preset stitch edit checkpoint.`)}function fe(e,t,n){let r=[...t.deeps,...t.running],i=r.find(e=>e.id===n);if(!i||!u(e,i))throw Error(`This preset thread is not present at this point in the rehearsal.`);return i.chainId?r.filter(t=>t.chainId===i.chainId&&u(e,t)>0):[i]}function pe(e,t,n,r){if(r!==`remove`&&(!Number.isFinite(r)||r<0||r>1))throw Error(`Tightening must be between zero and one.`);let i=fe(e,t,n);e.edits??={};for(let t of i){let n=u(e,t),i=e.edits[t.id]??{tightening:n,applied:n,placement:n,removed:!1};e.edits[t.id]={...i,...r===`remove`?{removed:!0}:{tightening:r}}}e.paused=!0}function me(e,t){let n=new Set,r=[],i=0;for(let a of[...t.deeps,...t.running]){let t=u(e,a),o=e.startLengths.slice(i,i+a.segmentTargets.length);if(i+=a.segmentTargets.length,!t||a.chainId&&n.has(a.chainId))continue;a.chainId&&n.add(a.chainId);let s=e.edits?.[a.id];r.push({bite:a,insertionSteps:12,tightening:s?.tightening??t,appliedTightening:s?.applied??t,startLengths:o})}return r}let q=(e,t)=>[e[t*3],e[t*3+1],e[t*3+2]];function he(e,t,n){let r=new Set(t.wound),i=g(t.surface.triangles),a=[];for(let e=0;e<i.length;e+=2)r.has(i[e])&&r.has(i[e+1])&&a.push([i[e],i[e+1]]);if(!a.length)throw Error(`The prepared domain has no wound boundary.`);let o=new Map;for(let e=0;e<t.walls.fat.length;e+=6)o.set(t.walls.fat[e]-t.surface.count,t.walls.fat[e+1]),o.set(t.walls.fat[e+2]-t.surface.count,t.walls.fat[e+5]);if(n){let i=Math.max(...e.geometry.rim.map(t=>e.geometry.positions[(t+3*e.geometry.count)*3+1]));for(let e of r)if(!o.has(e)){let r=t.surface.chart[e*2+1],a=Math.max(0,Math.min(1,(r-22)/13));if((t.discretization===`integrated`&&n.materialInterfaces?r<=n.materialInterfaces.carriedFatLimitYmm+1e-4:3*(1-a*a*(3-2*a))>1.2)||r<=i+.25)throw Error(`The cut extends beyond the constructed wound-depth layers.`);o.set(e,e+t.surface.count)}}let s=0,c=1/0;for(let[n,r]of[[0,0],[2,2],[1,1],[3,3]])for(let i of e.geometry.rim){let l=q(e.geometry.positions,i+n*e.geometry.count),u=!1,d=1/0;for(let e of a){let[n,i]=e.map(e=>q(t.rest,r===3?o.get(e):r===2?t.dermalMiddle[e]:e+r*t.surface.count)),a=i[0]-n[0],s=i[1]-n[1],c=Math.max(0,Math.min(1,((l[0]-n[0])*a+(l[1]-n[1])*s)/(a*a+s*s)));d=Math.min(d,Math.hypot(l[0]-n[0]-c*a,l[1]-n[1]-c*s)),n[1]>l[1]!=i[1]>l[1]&&l[0]<n[0]+(l[1]-n[1])*a/s&&(u=!u)}n===0?s=Math.max(s,u?0:d):c=Math.min(c,u?d:-d)}if(s>.12||c<=0)throw Error(`The prepared cut does not contain the original defect within its incision tolerance.`);return{surfaceOutsideMm:s,minimumDeepInsetMm:c}}function ge(e,t,n){let r=he(e,t,n);if(!Number.isFinite(r.surfaceOutsideMm)||!Number.isFinite(r.minimumDeepInsetMm))throw Error(`The cut extends beyond the constructed wound-depth layers. Change its direction or position.`);let i=new Set(t.wound),a=new Map,o=new Set,s=(e,t)=>`${Math.min(e,t)}/${Math.max(e,t)}`;for(let e=0;e<t.walls.fat.length;e+=6)o.add(s(t.walls.fat[e]-t.surface.count,t.walls.fat[e+2]-t.surface.count));let c=e=>{let r=t.surface.chart[e*2+1],i=Math.max(0,Math.min(1,(r-22)/13));return t.fatModel===`tapered-v1`?r<=34:t.discretization===`integrated`&&n?.materialInterfaces?r<=n.materialInterfaces.carriedFatLimitYmm+1e-4:3*(1-i*i*(3-2*i))>1.2},l=g(t.surface.triangles);for(let e=0;e<l.length;e+=2){let t=l[e],r=l[e+1];if(!(!i.has(t)&&!i.has(r))){if(!i.has(t)||!i.has(r))throw Error(`The cut has an incomplete wound edge. Change its direction or position.`);if(n&&c(t)&&c(r)&&!o.has(s(t,r)))throw Error(`The cut has an incomplete fat wall. Change its direction or position.`);a.set(t,[...a.get(t)??[],r]),a.set(r,[...a.get(r)??[],t])}}if(t.wound.some(e=>a.get(e)?.length!==2||t.inverseMass[e]===0))throw Error(`The cut reaches a fixed or incomplete tissue boundary. Change its direction or position.`);let u=new Set,d=t.wound.slice(0,1);for(;d.length;){let e=d.pop();u.has(e)||(u.add(e),d.push(...a.get(e).filter(e=>!u.has(e))))}if(!i.size||u.size!==i.size||t.walls.dermis.length!==i.size*12)throw Error(`The cut does not form a continuous wound wall. Change its direction or position.`)}function _e(e,t,n,r=!1){if(!r)try{let r=H(e,t);return ge(n,r,e),{domain:r,refined:!1}}catch{}let i=H(e,t,`unit-node`,void 0,!0);return ge(n,i,e),{domain:i,refined:!0}}function ve(e,t,n){let r=H(e,t,`unit-node`,void 0,!0,!0),{center:i}=ne(e,t);return r.closure=f(r,Array.from({length:r.surface.count},(e,t)=>t+r.surface.count),i,2,3,`symmetric-three`),r.id+=`/running-3mm-symmetric-deeps-v2`,ge(n,r,e),r}function J(e,t){let n=e.wound.reduce((t,n)=>[t[0]+e.rest[n*3],t[1]+e.rest[n*3+1],t[2]+e.rest[n*3+2]],[0,0,0]).map(t=>t/e.wound.length),r=[...e.wound].sort((t,r)=>Math.atan2(e.rest[t*3+1]-n[1],e.rest[t*3]-n[0])-Math.atan2(e.rest[r*3+1]-n[1],e.rest[r*3]-n[0])),i=e.wound.reduce((t,n)=>[t[0]+e.surface.normals[n*3],t[1]+e.surface.normals[n*3+1],t[2]+e.surface.normals[n*3+2]],[0,0,0]),a=Math.hypot(...i);if(a<1e-8)return null;i=i.map(e=>e/a);let o=[1-i[0]**2,-i[0]*i[1],-i[0]*i[2]],s=Math.hypot(...o);if(s<1e-8)return null;o=o.map(e=>e/s);let c=[i[1]*o[2]-i[2]*o[1],i[2]*o[0]-i[0]*o[2],i[0]*o[1]-i[1]*o[0]],l=r.map(e=>[o.reduce((r,i,a)=>r+i*(t[e*3+a]-n[a]),0),c.reduce((r,i,a)=>r+i*(t[e*3+a]-n[a]),0)]),u=(e,t,n)=>(t[0]-e[0])*(n[1]-e[1])-(t[1]-e[1])*(n[0]-e[0]);for(let e=0;e<l.length;e++)for(let t=e+2;t<l.length;t++){if(e===0&&t===l.length-1)continue;let n=l[e],r=l[(e+1)%l.length],i=l[t],a=l[(t+1)%l.length];if(u(n,r,i)*u(n,r,a)<-1e-8&&u(i,a,n)*u(i,a,r)<-1e-8)return null}return Math.abs(l.reduce((e,t,n)=>{let r=l[(n+1)%l.length];return e+t[0]*r[1]-r[0]*t[1]},0))/2}let ye=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]],Y=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],be=e=>Math.max(0,Math.min(1,e));function xe(e,t,n,r){let i=ye(t,e),a=ye(r,n),o=ye(e,n),s=Y(i,i),c=Y(i,a),l=Y(a,a),u=Y(i,o),d=Y(a,o),f=0,p=0;if(s<1e-15)p=be(d/Math.max(1e-15,l));else if(l<1e-15)f=be(-u/s);else{let e=s*l-c*c;f=e>1e-15?be((c*d-l*u)/e):0,p=(c*f+d)/l,p<0?(p=0,f=be(-u/s)):p>1&&(p=1,f=be((c-u)/s))}let m=e.map((e,t)=>e+i[t]*f-n[t]-a[t]*p);return{s:f,t:p,delta:m,distance:Math.hypot(...m)}}var Se=class{before=[[0,0,0],[0,0,0],[0,0,0],[0,0,0]];motion=[[0,0,0],[0,0,0],[0,0,0],[0,0,0]];points=[[0,0,0],[0,0,0],[0,0,0],[0,0,0]];weights=[0,0,0,0];normal=[0,0,0];delta=[0,0,0];s=0;t=0;distance=0;closest(e,t,n,r){let i=t[0]-e[0],a=t[1]-e[1],o=t[2]-e[2],s=r[0]-n[0],c=r[1]-n[1],l=r[2]-n[2],u=e[0]-n[0],d=e[1]-n[1],f=e[2]-n[2],p=i*i+a*a+o*o,m=i*s+a*c+o*l,h=s*s+c*c+l*l,g=i*u+a*d+o*f,_=s*u+c*d+l*f,v=0,y=0;if(p<1e-15)y=be(_/Math.max(1e-15,h));else if(h<1e-15)v=be(-g/p);else{let e=p*h-m*m;v=e>1e-15?be((m*_-h*g)/e):0,y=(m*v+_)/h,y<0?(y=0,v=be(-g/p)):y>1&&(y=1,v=be((m-g)/p))}this.delta[0]=e[0]+i*v-n[0]-s*y,this.delta[1]=e[1]+a*v-n[1]-c*y,this.delta[2]=e[2]+o*v-n[2]-l*y,this.s=v,this.t=y,this.distance=Math.hypot(...this.delta)}project(e,t,n,r,i){let{before:a,motion:o,points:s,weights:c,normal:l}=this;for(let n=0;n<4;n++)for(let i=0;i<3;i++)a[n][i]=t[r[n]*3+i],o[n][i]=e[r[n]*3+i]-a[n][i];let u=Math.max(Math.hypot(...o[0]),Math.hypot(...o[1]))+Math.max(Math.hypot(...o[2]),Math.hypot(...o[3])),d=0,f=!1;this.closest(a[0],a[1],a[2],a[3]);for(let e=0;e<24;e++){if(this.distance<=i+1e-6){f=!0;break}if(u<1e-12||d>=1)break;d=Math.min(1,d+(this.distance-i)/u);for(let e=0;e<4;e++)for(let t=0;t<3;t++)s[e][t]=a[e][t]+o[e][t]*d;this.closest(s[0],s[1],s[2],s[3])}if(!f||this.distance<1e-12)return!1;c[0]=1-this.s,c[1]=this.s,c[2]=-(1-this.t),c[3]=-this.t;for(let e=0;e<3;e++)l[e]=this.delta[e]/this.distance;let p=0,m=0;for(let t=0;t<4;t++){let i=r[t];m+=n[i]*c[t]**2;for(let n=0;n<3;n++)p+=e[i*3+n]*c[t]*l[n]}if(i-p<1e-7||m<1e-12)return!1;let h=(i-p)/m;for(let t=0;t<4;t++){let i=r[t];for(let r=0;r<3;r++)e[i*3+r]=e[i*3+r]+n[i]*c[t]*l[r]*h}return!0}},Ce=class{primitives;nodes=[];order=[];bounds;constructor(e,t){this.primitives=e;let n=e.map(e=>[0,1,2].map(n=>e.reduce((e,r)=>e+t[r*3+n],0)/e.length)),r=e=>{let t=this.nodes.length,i={left:-1,right:-1,start:0,count:0};if(this.nodes.push(i),e.length<=4)i.start=this.order.length,i.count=e.length,this.order.push(...e);else{let t=[0,1,2].map(t=>Math.max(...e.map(e=>n[e][t]))-Math.min(...e.map(e=>n[e][t]))),a=t.indexOf(Math.max(...t));e.sort((e,t)=>n[e][a]-n[t][a]||e-t);let o=Math.floor(e.length/2);i.left=r(e.slice(0,o)),i.right=r(e.slice(o))}return t};r(e.map((e,t)=>t)),this.bounds=new Float64Array(this.nodes.length*6),this.refit(t,t,0)}refit(e,t,n){let r=this.bounds;for(let i=this.nodes.length-1;i>=0;i--){let a=this.nodes[i],o=i*6;for(let e=0;e<3;e++)r[o+e]=1/0,r[o+e+3]=-1/0;if(a.left>=0)for(let e=0;e<3;e++)r[o+e]=Math.min(r[a.left*6+e],r[a.right*6+e]),r[o+e+3]=Math.max(r[a.left*6+e+3],r[a.right*6+e+3]);else for(let i=0;i<a.count;i++)for(let s of this.primitives[this.order[a.start+i]])for(let i=0;i<3;i++)r[o+i]=Math.min(r[o+i],e[s*3+i]-n,t[s*3+i]-n),r[o+i+3]=Math.max(r[o+i+3],e[s*3+i]+n,t[s*3+i]+n)}}query(e,t){let n=[],r=[0],i=this.bounds;for(;r.length;){let a=r.pop(),o=a*6;if(e[0]>i[o+3]||t[0]<i[o]||e[1]>i[o+4]||t[1]<i[o+1]||e[2]>i[o+5]||t[2]<i[o+2])continue;let s=this.nodes[a];if(s.left>=0)r.push(s.right,s.left);else for(let e=0;e<s.count;e++)n.push(this.order[s.start+e])}return n}};let X=.12,Z=(e,t)=>[e[t*3],e[t*3+1],e[t*3+2]],we=(e,t)=>e[0]*t[0]+e[1]*t[1]+e[2]*t[2],Te=(e,t)=>[e[0]-t[0],e[1]-t[1],e[2]-t[2]];var Ee=class{domain;edgeProjector=new Se;faces=[];vertices;edges=[];excluded=new Map;previous;faceBounds;edgeBounds;candidateReference=null;candidatePrevious=null;candidateFaces=new Map;candidateEdges=[];incidentEdges=new Map;incidentFaces=new Map;sweptFaces;sweptEdges;edgePairEligibility;constructor(e){this.domain=e;let t=[...e.surface.triangles,...e.walls.dermis,...e.walls.fat],n=new Map;for(let t=0;t<e.surface.count;t++)n.set(t,t),n.set(t+e.surface.count,t),e.dermalMiddle?.[t]!==void 0&&n.set(e.dermalMiddle[t],t);for(let t=0;t<e.walls.fat.length;t+=6)n.set(e.walls.fat[t+1],e.walls.fat[t]-e.surface.count),n.set(e.walls.fat[t+5],e.walls.fat[t+2]-e.surface.count);let r=new Set;for(let t=0;t<e.surface.count;t++)e.wound.some(n=>Math.hypot(e.rest[t*3]-e.rest[n*3],e.rest[t*3+1]-e.rest[n*3+1],e.rest[t*3+2]-e.rest[n*3+2])<8)&&r.add(t);for(let e=0;e<t.length;e+=3){let i=t.slice(e,e+3);i.some(e=>r.has(n.get(e)??e))&&this.faces.push(i)}let i=new Map;for(let e of this.faces)for(let t of e){let n=i.get(t)??new Set;e.forEach(e=>n.add(e)),i.set(t,n)}this.vertices=[...new Set(this.faces.flat())].sort((e,t)=>e-t);let a=new Float64Array(this.faces.length*6);this.faces.forEach((t,n)=>{for(let r=0;r<3;r++)a[n*6+r]=Math.min(e.rest[t[0]*3+r],e.rest[t[1]*3+r],e.rest[t[2]*3+r]),a[n*6+r+3]=Math.max(e.rest[t[0]*3+r],e.rest[t[1]*3+r],e.rest[t[2]*3+r])});let o=this.faces.map(e=>e.map(e=>n.get(e)??e));for(let t of this.vertices){let r=new Set,s=i.get(t),c=n.get(t)??t;this.faces.forEach((n,i)=>{if(n.some((e,t)=>s?.has(e)||o[i][t]===c)){r.add(i);return}let l=!1;for(let n=0;n<3;n++){let r=e.rest[t*3+n];if(r<a[i*6+n]-X*2||r>a[i*6+n+3]+X*2){l=!0;break}}!l&&F(Z(e.rest,t),e.rest,n).distance<X*2&&r.add(i)}),this.excluded.set(t,r)}let s=new Map;this.faces.forEach((e,t)=>{for(let n=0;n<3;n++){let r=e[n],i=e[(n+1)%3],a=r<i?`${r}/${i}`:`${i}/${r}`,o=s.get(a);o===void 0?(s.set(a,this.edges.length),this.edges.push([r,i,[t]])):this.edges[o][2].push(t)}}),this.sweptFaces=new Float64Array(this.faces.length*6),this.faces.forEach((e,t)=>{for(let n of e){let e=this.incidentFaces.get(n)??[];e.push(t),this.incidentFaces.set(n,e)}}),this.sweptEdges=new Float64Array(this.edges.length*6),this.edges.forEach(([e,t],n)=>{for(let r of[e,t]){let e=this.incidentEdges.get(r)??[];e.push(n),this.incidentEdges.set(r,e)}});let c=this.edges.length*(this.edges.length-1)/2;this.edgePairEligibility=new Uint8Array(Math.min(16777216,Math.ceil(c/4))),this.faceBounds=new Ce(this.faces,e.rest),this.edgeBounds=new Ce(this.edges.map(([e,t])=>[e,t]),e.rest),this.previous=e.rest.slice()}intersections(e,t){this.faceBounds.refit(e,e,0);let n=0,r=[];for(let[i,a]of this.edges){let o=Z(e,i),s=Z(e,a),c=o.map((e,t)=>Math.min(e,s[t])),l=o.map((e,t)=>Math.max(e,s[t]));for(let u of this.faceBounds.query(c,l)){if(this.excluded.get(i).has(u)||this.excluded.get(a).has(u))continue;let c=this.faces[u],l=r[u]??(r[u]=F(o,e,c).normal),d=Z(e,c[0]),f=we(Te(o,d),l),p=we(Te(s,d),l);if(f*p>=-1e-10)continue;let m=f/(f-p),h=F(o.map((e,t)=>e+(s[t]-e)*m),e,c);h.distance<1e-6&&h.weights.every(e=>e>1e-6)&&(n++,t?.([i,a],c))}}return n}restore(e){this.previous.set(e)}beginStep(){this.candidateReference=null}project(e){let t=!1;this.prepareCandidates(e);let n=this.sweptFaces,r=t=>{let r=this.faces[t];for(let i=0;i<3;i++)n[t*6+i]=Math.min(e[r[0]*3+i],e[r[1]*3+i],e[r[2]*3+i],this.previous[r[0]*3+i],this.previous[r[1]*3+i],this.previous[r[2]*3+i])-X,n[t*6+i+3]=Math.max(e[r[0]*3+i],e[r[1]*3+i],e[r[2]*3+i],this.previous[r[0]*3+i],this.previous[r[1]*3+i],this.previous[r[2]*3+i])+X};for(let e=0;e<this.faces.length;e++)r(e);for(let i of this.vertices){let a=Z(this.previous,i);for(let o of this.candidateFaces.get(i)??[]){if(this.excluded.get(i).has(o))continue;let s=this.faces[o],c=!1;for(let t=0;t<3;t++){let r=n[o*6+t],s=n[o*6+t+3];if(Math.min(e[i*3+t],a[t])>s||Math.max(e[i*3+t],a[t])<r){c=!0;break}}if(c)continue;let l=Z(e,i),u=F(l,e,s),d=F(a,this.previous,s),f=we(Te(a,d.point),d.normal)>=0?1:-1,p=u.weights.every(e=>e>1e-6),m=we(Te(l,u.point),u.normal)*f,h=!1;if(u.distance>=X&&m<0&&p){let t=Math.hypot(...Te(l,a))+Math.max(...s.map(t=>Math.hypot(...Te(Z(e,t),Z(this.previous,t)))));h=Math.abs(m)<t+.25}if(u.distance>=X&&!h)continue;let g=u.normal.map(e=>e*f);if(!p){m=u.distance;let e=u.distance>1e-10?Te(l,u.point):Te(a,d.point),t=Math.hypot(...e);t>1e-10&&(g=e.map(e=>e/t))}let _=this.domain.inverseMass[i];if(s.forEach((e,t)=>_+=this.domain.inverseMass[e]*u.weights[t]**2),_<1e-12||X-m<1e-7)continue;t=!0;let v=(X-m)/_;for(let t=0;t<3;t++){let n=g[t]*v;e[i*3+t]=e[i*3+t]+this.domain.inverseMass[i]*n,s.forEach((r,i)=>{e[r*3+t]=e[r*3+t]-this.domain.inverseMass[r]*u.weights[i]*n})}for(let e of[i,...s])for(let t of this.incidentFaces.get(e))r(t)}}return this.projectEdges(e)||t}prepareCandidates(e){if(this.candidateReference&&this.candidatePrevious&&this.vertices.every(t=>Math.hypot(e[t*3]-this.candidateReference[t*3],e[t*3+1]-this.candidateReference[t*3+1],e[t*3+2]-this.candidateReference[t*3+2])<=.4&&Math.hypot(this.previous[t*3]-this.candidatePrevious[t*3],this.previous[t*3+1]-this.candidatePrevious[t*3+1],this.previous[t*3+2]-this.candidatePrevious[t*3+2])<=.4))return;this.faceBounds.refit(e,this.previous,1),this.edgeBounds.refit(e,this.previous,1);let t=t=>{let n=[1/0,1/0,1/0],r=[-1/0,-1/0,-1/0];for(let i of t)for(let t=0;t<3;t++)n[t]=Math.min(n[t],e[i*3+t],this.previous[i*3+t]),r[t]=Math.max(r[t],e[i*3+t],this.previous[i*3+t]);return{lo:n,hi:r}},n=(e,t)=>e.lo.every((n,r)=>n<=t.hi[r]+1&&e.hi[r]>=t.lo[r]-1),r=this.faces.map(t),i=this.edges.map(([e,n])=>t([e,n]));this.candidateFaces.clear();for(let e of this.vertices){let i=t([e]);this.candidateFaces.set(e,this.faceBounds.query(i.lo,i.hi).filter(t=>!this.excluded.get(e).has(t)&&n(i,r[t])).sort((e,t)=>e-t))}this.candidateEdges=[],this.edges.forEach(([e,t,r],a)=>{let o=i[a],s=this.edgeBounds.query(o.lo,o.hi).filter(e=>e>a&&n(o,i[e])).sort((e,t)=>e-t);for(let n of s){let[i,o,s]=this.edges[n],c=n*(n-1)/2+a,l=Math.floor(c/4),u=c%4*2,d=l<this.edgePairEligibility.length?this.edgePairEligibility[l]>>u&3:0;if(!d){let n=s.some(n=>!this.excluded.get(e).has(n)&&!this.excluded.get(t).has(n)),a=r.some(e=>!this.excluded.get(i).has(e)&&!this.excluded.get(o).has(e));d=!n&&!a||xe(Z(this.domain.rest,e),Z(this.domain.rest,t),Z(this.domain.rest,i),Z(this.domain.rest,o)).distance<X*2?1:2,l<this.edgePairEligibility.length&&(this.edgePairEligibility[l]=this.edgePairEligibility[l]|d<<u)}d!==1&&this.candidateEdges.push(a,n)}}),this.candidateReference=e.slice(),this.candidatePrevious=this.previous.slice()}projectEdges(e){let t=!1,n=this.sweptEdges,r=t=>{let[r,i]=this.edges[t];for(let a=0;a<3;a++)n[t*6+a]=Math.min(e[r*3+a],e[i*3+a],this.previous[r*3+a],this.previous[i*3+a]),n[t*6+a+3]=Math.max(e[r*3+a],e[i*3+a],this.previous[r*3+a],this.previous[i*3+a])};for(let e=0;e<this.edges.length;e++)r(e);let i=this.candidateEdges,a=[0,0,0,0];for(let o=0;o<i.length;o+=2){let s=i[o],c=i[o+1],l=s*6,u=c*6;if(n[u]>n[l+3]+X||n[u+3]<n[l]-X||n[u+1]>n[l+4]+X||n[u+4]<n[l+1]-X||n[u+2]>n[l+5]+X||n[u+5]<n[l+2]-X)continue;let[d,f]=this.edges[s],[p,m]=this.edges[c];if(a[0]=d,a[1]=f,a[2]=p,a[3]=m,this.edgeProjector.project(e,this.previous,this.domain.inverseMass,a,X)){t=!0;for(let e of[d,f,p,m])for(let t of this.incidentEdges.get(e))r(t)}}return t}},De=class{domain;upper;lower;constructor(e){this.domain=e;let t=t=>{let n=[];for(let e=0;e<t.length;e+=3)n.push(Array.from(t.slice(e,e+3)));return{faces:n,signs:n.map(t=>F([0,0,0],e.rest,t).normal[2]>=0?1:-1),vertices:[...new Set(t)].sort((e,t)=>e-t),bounds:new Ce(n,e.rest)}};this.upper=t(e.slidingInterface.upper),this.lower=t(e.slidingInterface.lower)}project(e){for(let t=0;t<8;t++){let t=this.visit(e,this.upper.vertices,this.lower,1,!0),n=this.visit(e,this.lower.vertices,this.upper,-1,!0);if(Math.max(t,n)<.005)break}}maximumPenetration(e){return Math.max(this.visit(e,this.upper.vertices,this.lower,1,!1),this.visit(e,this.lower.vertices,this.upper,-1,!1))}visit(e,t,n,r,i){n.bounds.refit(e,e,3);let a=this.domain.inverseMass,o=0;for(let s of t){let t=Array.from(e.subarray(s*3,s*3+3)),c=null,l=1;for(let r of n.bounds.query(t,t)){let i=F(t,e,n.faces[r]);i.distance<=3&&(!c||i.distance<c.distance)&&(c=i,l=n.signs[r])}if(!c)continue;let u=c,d=u.normal.map(e=>e*l*r),f=d.reduce((e,n,r)=>e+n*(t[r]-u.point[r]),0);if(f>=0||u.distance*u.distance-f*f>1e-8||(o=Math.max(o,-f),!i))continue;let p=a[s]+u.vertices.reduce((e,t,n)=>e+a[t]*u.weights[n]**2,0);if(!(p<1e-12))for(let t=0;t<3;t++){let n=-f*d[t]/p;e[s*3+t]=e[s*3+t]+a[s]*n,u.vertices.forEach((r,i)=>{e[r*3+t]=e[r*3+t]-a[r]*u.weights[i]*n})}}return o}},Q=class{domain;stitches=[];multipliers=[];constructor(e){this.domain=e}get count(){return this.stitches.length}snapshot(){return this.stitches.map(se)}restore(e){if(!Array.isArray(e)||e.length>32)throw Error(`Invalid editable stitch checkpoint size.`);let t=new Set;for(let n of e){if(!n?.bite||!Number.isInteger(n.insertionSteps)||n.insertionSteps<0||n.insertionSteps>12||t.has(n.bite.id)||![n.tightening,n.appliedTightening].every(e=>Number.isFinite(e)&&e>=0&&e<=1))throw Error(`Invalid editable stitch checkpoint.`);let e=ae(this.domain,n.bite.id,n.bite.edgeA,n.bite.edgeB);if(JSON.stringify(e)!==JSON.stringify(n.bite)||n.startLengths.length!==e.route.length||!n.startLengths.every(e=>Number.isFinite(e)&&e>=0))throw Error(`Stitch checkpoint does not match its material path.`);n.bite.route.forEach(e=>ce(this.domain,e)),t.add(n.bite.id)}this.stitches=e.map(se),this.multipliers=e.map(e=>e.startLengths.map(()=>0))}add(e,t,n,r){if(this.stitches.length>=32)throw Error(`This experiment supports up to 32 manual stitches. Remove a stitch before adding another.`);if(this.stitches.some(t=>t.bite.id===e))throw Error(`This stitch already exists.`);let i=ae(this.domain,e,t,n);this.stitches.push({bite:i,insertionSteps:0,tightening:0,appliedTightening:0,startLengths:i.route.map((e,t)=>s(r,e,i.route[(t+1)%i.route.length]))}),this.multipliers.push(i.route.map(()=>0))}replace(e,t,n,r){let i=this.stitches.findIndex(t=>t.bite.id===e);if(i<0)throw Error(`This stitch no longer exists.`);let a=ae(this.domain,e,t,n);this.stitches[i]={bite:a,insertionSteps:0,tightening:0,appliedTightening:0,startLengths:a.route.map((e,t)=>s(r,e,a.route[(t+1)%a.route.length]))},this.multipliers[i]=a.route.map(()=>0)}tighten(e,t){if(!Number.isFinite(t)||t<0||t>1)throw Error(`Tightening must be between zero and one.`);let n=this.stitches.find(t=>t.bite.id===e);if(!n)throw Error(`This stitch no longer exists.`);n.tightening=t}tightenMany(e,t){if(!Array.isArray(e)||!e.length||e.length>32||new Set(e).size!==e.length)throw Error(`Select distinct stitches to tighten together.`);if(!Number.isFinite(t)||t<0||t>1)throw Error(`Tightening must be between zero and one.`);let n=e.map(e=>{let t=this.stitches.find(t=>t.bite.id===e);if(!t)throw Error(`A selected stitch no longer exists. Select the remaining stitches again.`);return t});for(let e of n)e.tightening=t}remove(e){let t=this.stitches.findIndex(t=>t.bite.id===e);if(t<0)throw Error(`This stitch no longer exists.`);this.stitches.splice(t,1),this.multipliers.splice(t,1)}clear(){this.stitches=[],this.multipliers=[]}beginStep(){for(let e of this.stitches)e.insertionSteps=Math.min(12,e.insertionSteps+1),e.appliedTightening+=Math.max(-1/12,Math.min(1/12,e.tightening-e.appliedTightening))}project(e,t){for(let n=0;n<this.stitches.length;n++){let r=this.stitches[n],i=r.appliedTightening*r.appliedTightening*(3-2*r.appliedTightening);this.multipliers[n].fill(0);for(let n=0;n<r.bite.route.length;n++){let a=r.bite.route[n],o=r.bite.route[(n+1)%r.bite.route.length],s=[0,0,0];a.vertices.forEach((t,n)=>{for(let r=0;r<3;r++)s[r]=s[r]-e[t*3+r]*a.weights[n]}),o.vertices.forEach((t,n)=>{for(let r=0;r<3;r++)s[r]=s[r]+e[t*3+r]*o.weights[n]});let c=Math.hypot(...s);if(c<1e-9)continue;let l=new Map;a.vertices.forEach((e,t)=>l.set(e,(l.get(e)??0)-a.weights[t])),o.vertices.forEach((e,t)=>l.set(e,(l.get(e)??0)+o.weights[t]));let u=0;for(let[e,t]of l)u+=this.domain.inverseMass[e]*t*t;if(u<1e-12)continue;let d=r.startLengths[n]+(r.bite.segmentTargets[n]-r.startLengths[n])*i,f=Math.min(0,-(c-d)/(u+2e-9/t));for(let[t,n]of l)for(let r=0;r<3;r++)e[t*3+r]=e[t*3+r]+this.domain.inverseMass[t]*n*s[r]/c*f}}}};function Oe(e){return e.size.diameterMm+6}function ke(e,t){let n=new Map,r=e.surface.triangles,i=e.rest,a=1.5;for(let e=0;e<r.length;e+=3)for(let t=0;t<3;t++){let i=r[e+t],a=r[e+(t+1)%3];n.has(i)||n.set(i,new Set),n.has(a)||n.set(a,new Set),n.get(i).add(a),n.get(a).add(i)}let o=new Map([[t,0]]),s=new Set;for(;;){let e=-1,t=1/0;for(let[n,r]of o)!s.has(n)&&(r<t||r===t&&n<e)&&(e=n,t=r);if(e<0)break;s.add(e);for(let r of n.get(e)??[]){let n=t+Math.hypot(i[r*3]-i[e*3],i[r*3+1]-i[e*3+1],i[r*3+2]-i[e*3+2]);n<a&&n<(o.get(r)??1/0)&&o.set(r,n)}}let c=[],l=[];for(let[t,n]of o){if(!e.inverseMass[t])continue;let r=(1-(n/a)**2)**2;for(let[n,i]of[[t,.25],[e.dermalMiddle[t],.5],[t+e.surface.count,.25]])e.inverseMass[n]&&(c.push(n),l.push(r*i))}let u=l.reduce((e,t)=>e+t,0);return{vertices:c,weights:l.map(e=>e/u)}}function Ae(e,t,n=1e-5){let[r,i,a,o]=t.vertices,s=e[i*3]-e[r*3],c=e[a*3]-e[r*3],l=e[o*3]-e[r*3],u=e[i*3+1]-e[r*3+1],d=e[a*3+1]-e[r*3+1],f=e[o*3+1]-e[r*3+1],p=e[i*3+2]-e[r*3+2],m=e[a*3+2]-e[r*3+2],h=e[o*3+2]-e[r*3+2],g=s*(d*h-f*m)-c*(u*h-f*p)+l*(u*m-d*p);if(Math.abs(g)<1e-10)throw Error(`Degenerate strain element.`);return{vertices:t.vertices,volume:t.rest,compliance:n,inverse:[d*h-f*m,l*m-c*h,c*f-l*d,f*p-u*h,s*h-l*p,l*u-s*f,u*m-d*p,c*p-s*m,s*d-c*u].map(e=>e/g),lambda:0}}function je(e,t,n,r){let i=n.inverse,[a,o,s,c]=n.vertices,l=e[o*3]-e[a*3],u=e[o*3+1]-e[a*3+1],d=e[o*3+2]-e[a*3+2],f=e[s*3]-e[a*3],p=e[s*3+1]-e[a*3+1],m=e[s*3+2]-e[a*3+2],h=e[c*3]-e[a*3],g=e[c*3+1]-e[a*3+1],_=e[c*3+2]-e[a*3+2],v=l*i[0]+f*i[3]+h*i[6],y=l*i[1]+f*i[4]+h*i[7],b=l*i[2]+f*i[5]+h*i[8],x=u*i[0]+p*i[3]+g*i[6],S=u*i[1]+p*i[4]+g*i[7],C=u*i[2]+p*i[5]+g*i[8],w=d*i[0]+m*i[3]+_*i[6],T=d*i[1]+m*i[4]+_*i[7],E=d*i[2]+m*i[5]+_*i[8],D=v*v+x*x+w*w-1,O=y*y+S*S+T*T-1,k=b*b+C*C+E*E-1,A=v*y+x*S+w*T,j=v*b+x*C+w*E,M=y*b+S*C+T*E,N=(D+O+k)/3;D-=N,O-=N,k-=N;let P=Math.sqrt(D*D+O*O+k*k+2*(A*A+j*j+M*M));if(P<1e-9)return;let F=(v*D+y*A+b*j)/P,I=(v*A+y*O+b*M)/P,L=(v*j+y*M+b*k)/P,R=(x*D+S*A+C*j)/P,z=(x*A+S*O+C*M)/P,B=(x*j+S*M+C*k)/P,V=(w*D+T*A+E*j)/P,ee=(w*A+T*O+E*M)/P,te=(w*j+T*M+E*k)/P,ne=F*i[0]+I*i[1]+L*i[2],H=R*i[0]+z*i[1]+B*i[2],re=V*i[0]+ee*i[1]+te*i[2],ie=F*i[3]+I*i[4]+L*i[5],ae=R*i[3]+z*i[4]+B*i[5],oe=V*i[3]+ee*i[4]+te*i[5],U=F*i[6]+I*i[7]+L*i[8],se=R*i[6]+z*i[7]+B*i[8],ce=V*i[6]+ee*i[7]+te*i[8],W=-ne-ie-U,G=-H-ae-se,K=-re-oe-ce,le=t[a],ue=t[o],de=t[s],fe=t[c],pe=n.compliance/(n.volume*r),me=pe+le*(W*W+G*G+K*K)+ue*(ne*ne+H*H+re*re)+de*(ie*ie+ae*ae+oe*oe)+fe*(U*U+se*se+ce*ce),q=(-.5*P-pe*n.lambda)/me;n.lambda+=q,e[a*3]=e[a*3]+le*W*q,e[a*3+1]=e[a*3+1]+le*G*q,e[a*3+2]=e[a*3+2]+le*K*q,e[o*3]=e[o*3]+ue*ne*q,e[o*3+1]=e[o*3+1]+ue*H*q,e[o*3+2]=e[o*3+2]+ue*re*q,e[s*3]=e[s*3]+de*ie*q,e[s*3+1]=e[s*3+1]+de*ae*q,e[s*3+2]=e[s*3+2]+de*oe*q,e[c*3]=e[c*3]+fe*U*q,e[c*3+1]=e[c*3+1]+fe*se*q,e[c*3+2]=e[c*3+2]+fe*ce*q}function Me(e,t,n){let r=new Map;e.vertices.forEach((t,n)=>r.set(t,(r.get(t)??0)-e.weights[n])),t.vertices.forEach((e,n)=>r.set(e,(r.get(e)??0)+t.weights[n]));let i=[],a=[],o=0;for(let[e,t]of r)i.push(e),a.push(n[e]*t),o+=n[e]*t*t;return{a:e,b:t,vertices:i,weightedMass:a,denominator:o}}let Ne={dermis:{bulkCompliance:2e-7},fat:{bulkCompliance:12e-7},muscle:{bulkCompliance:5e-7},tarsus:{bulkCompliance:5e-8}};var Pe=class{domain;projector;substeps;positions;velocity;previous;tets;springLambda;linkLambda;anchorLambda;sutureLambda;sutureBindings;rigid;strain;checkpointId;strainEdges=[];manualMode=!1;contactStepScale=1;selfContact=null;slidingContact;manual;closure=a();grabLambda=new Float64Array;gripTipLambda=[0,0,0];grabPoint=null;grabReference=null;grabTarget=null;gripCache=new Map;stepIndex=0;underminingMm=0;get release(){return this.underminingMm>0}set release(e){this.underminingMm=e?3:0}grab=null;constructor(e,t,n=12){if(this.domain=e,this.projector=t,this.substeps=n,this.manual=new Q(e),this.slidingContact=e.slidingInterface?new De(e):null,![12,24,48].includes(n))throw Error(`Unsupported tissue time-step profile.`);let r=`${e.id}/support-coupling-1`;this.checkpointId=n===12?r:`${r}/substeps-${n}`,this.positions=t?.positions??e.rest.slice(),this.previous=e.rest.slice(),this.velocity=new Float64Array(e.rest.length),this.tets=e.tets.map(e=>({...e,lambda:0,compliance:Ne[e.material].bulkCompliance})),this.springLambda=new Float64Array(e.springs.length),this.linkLambda=new Float64Array(e.links.length*3),this.anchorLambda=new Float64Array(e.anchors.length*3),this.sutureLambda=new Float64Array([...e.closure.deeps,...e.closure.running].reduce((e,t)=>e+t.segmentTargets.length,0)),this.sutureBindings=[...e.closure.deeps,...e.closure.running].map(t=>({bite:t,segments:t.segmentTargets.map((n,r)=>Me(t.route[r],t.route[(r+1)%t.route.length],e.inverseMass))})),this.rigid=new L(e.rigid.surfaces),this.strain=e.tets.filter(e=>e.material===`dermis`).map(t=>Ae(e.rest,t));let i=new Set;for(let t of this.strain)for(let n=0;n<4;n++)for(let r=n+1;r<4;r++){let a=t.vertices[n],o=t.vertices[r],s=a<o?`${a}/${o}`:`${o}/${a}`;i.has(s)||(i.add(s),this.strainEdges.push({a,b:o,rest:Math.hypot(e.rest[a*3]-e.rest[o*3],e.rest[a*3+1]-e.rest[o*3+1],e.rest[a*3+2]-e.rest[o*3+2])}))}}checkpoint(){return{...this.manualMode||this.manual.count?{manualModelVersion:2}:{},contactStepScale:this.contactStepScale,manualMode:this.manualMode,manualStitches:this.manual.snapshot(),domainId:this.checkpointId,step:this.stepIndex,positions:this.positions.slice(),velocity:this.velocity.slice(),release:this.release,underminingMm:this.underminingMm,grab:this.grab?{vertex:this.grab.vertex,target:[...this.grab.target]}:null,grabReference:this.grabReference?.slice()??null,grabTarget:this.grabTarget?[...this.grabTarget]:null,closure:ue(this.closure)}}restore(e){if((e.manualMode||e.manualStitches?.length)&&e.manualModelVersion!==2)throw Error(`Manual checkpoint uses an incompatible tissue model.`);if(e.domainId!==this.checkpointId||!Number.isSafeInteger(e.step)||e.step<0||[e.positions,e.velocity].some(e=>e.length!==this.positions.length||!e.every(Number.isFinite)))throw Error(`Checkpoint does not match this tissue domain.`);if(e.grab&&this.validateGrab(e.grab),e.grab?!e.grabReference||e.grabReference.length!==this.gripFor(e.grab.vertex).vertices.length*3||!e.grabReference.every(Number.isFinite)||!e.grabTarget||e.grabTarget.length!==3||!e.grabTarget.every(Number.isFinite):e.grabReference!==null||e.grabTarget!==null)throw Error(`Invalid grip checkpoint.`);if(![0,3,6].includes(e.underminingMm)||e.release!==e.underminingMm>0)throw Error(`Invalid release checkpoint.`);de(e.closure,this.domain.closure);let t=e.closure.stage===`open`?0:this.sutureLambda.length;if(![`open`,`deep`,`surface`].includes(e.closure.stage)||!Number.isSafeInteger(e.closure.elapsed)||e.closure.elapsed<0||e.closure.elapsed>l(this.domain.closure,e.closure.stage)||e.closure.startLengths.length!==t||!e.closure.startLengths.every(e=>Number.isFinite(e)&&e>=0)||typeof e.closure.paused!=`boolean`||typeof e.closure.assistance!=`boolean`)throw Error(`Invalid closure checkpoint.`);let n=e.closure.stage===`open`?0:this.sutureBindings.length;if(!Array.isArray(e.closure.biteStarted)||e.closure.biteStarted.length!==n||e.closure.biteStarted.some((t,n)=>{let r=this.sutureBindings[n].bite,i=d(e.closure,r),a=1/(r.chainId?6:12);return typeof t!=`boolean`||t&&i===0||!t&&i>a}))throw Error(`Invalid suture engagement checkpoint.`);if(typeof e.manualMode!=`boolean`||!Number.isFinite(e.contactStepScale)||e.contactStepScale<0||e.contactStepScale>1)throw Error(`Invalid experiment checkpoint.`);this.manual.restore(e.manualStitches),this.manualMode=e.manualMode,this.contactStepScale=e.contactStepScale,e.manualMode||this.domain.repair?this.selfContact??=new Ee(this.domain):this.selfContact=null,this.selfContact?.restore(e.positions),this.positions.set(e.positions),this.previous.set(e.positions),this.velocity.set(e.velocity),this.stepIndex=e.step,this.underminingMm=e.underminingMm,this.grab=e.grab?{vertex:e.grab.vertex,target:[...e.grab.target]}:null,this.grabPoint=e.grab?this.gripFor(e.grab.vertex):null,this.grabReference=e.grabReference?.slice()??null,this.grabLambda=new Float64Array(this.grabReference?.length??0),this.grabTarget=e.grabTarget?[...e.grabTarget]:null,this.closure=ue(e.closure)}enableManual(){this.manualMode=!0,this.selfContact||=new Ee(this.domain),this.selfContact.restore(this.positions)}validateGrab(e){if(!Number.isInteger(e.vertex)||e.vertex<0||e.vertex>=this.domain.surface.count||!this.domain.inverseMass[e.vertex]||e.target.length!==3||!e.target.every(Number.isFinite))throw Error(`Invalid tissue grab.`);if(Math.hypot(...e.target.map((t,n)=>t-this.domain.rest[e.vertex*3+n]))>Oe(this.domain))throw Error(`Pull exceeds the supported manipulation envelope.`)}gripFor(e){let t=this.gripCache.get(e);return t||(t=ke(this.domain,e),this.gripCache.set(e,t)),t}setGrab(e){e?(this.validateGrab(e),this.closure.paused=!0,this.closure.assistance=!1,(!this.grab||this.grab.vertex!==e.vertex)&&(this.grabPoint=this.gripFor(e.vertex),this.grabReference=Float64Array.from(this.grabPoint.vertices.flatMap(t=>[0,1,2].map(n=>this.positions[t*3+n]-this.positions[e.vertex*3+n]))),this.grabLambda=new Float64Array(this.grabReference.length),this.grabTarget=Array.from(this.positions.slice(e.vertex*3,e.vertex*3+3)))):(this.grabPoint=null,this.grabReference=null,this.grabLambda=new Float64Array,this.grabTarget=null),this.grab=e?{vertex:e.vertex,target:[...e.target]}:null}startClosure(e){if(!this.domain.closure.deeps.length)throw Error(`This shape uses manually placed stitches.`);if(e!==this.closure.stage){if(e===`surface`&&(this.closure.stage!==`deep`||this.closure.elapsed<l(this.domain.closure,`deep`)))throw Error(`Finish the deep closure before adding the running thread.`);if(e===`deep`&&this.closure.stage!==`open`)throw Error(`The deep sutures are already present. Rewind or reset to start again.`);this.setGrab(null),this.closure={stage:e,elapsed:0,paused:!1,assistance:!1,...this.closure.edits?{edits:ue(this.closure).edits}:{},startLengths:e===`deep`?Array(this.sutureLambda.length).fill(0):[...this.closure.startLengths],biteStarted:e===`deep`?Array(this.sutureBindings.length).fill(!1):[...this.closure.biteStarted]}}}advance(){this.manual.beginStep();for(let e of Object.values(this.closure.edits??{}))e.applied+=Math.max(-1/12,Math.min(1/12,e.tightening-e.applied));this.manual.count&&(this.manualMode=!0),(this.manualMode||this.domain.repair)&&!this.selfContact&&(this.selfContact=new Ee(this.domain)),this.selfContact?.beginStep();let e=this.positions,t=this.domain.inverseMass,n=1/(60*this.substeps),r=n*n,i=this.selfContact?e.slice():null,a=this.selfContact?this.velocity.slice():null;this.contactStepScale=1;let o=.82**(2/this.substeps),s=3.6/this.substeps;for(let i=0;i<this.substeps;i++){if(this.selfContact?.restore(e),this.grab&&this.grabTarget){let e=this.grab.target[0]-this.grabTarget[0],t=this.grab.target[1]-this.grabTarget[1],n=this.grab.target[2]-this.grabTarget[2],r=Math.min(1,s/Math.max(1e-9,Math.hypot(e,t,n)));this.grabTarget[0]+=e*r,this.grabTarget[1]+=t*r,this.grabTarget[2]+=n*r}this.previous.set(e);for(let r=0;r<t.length;r++)if(t[r])for(let t=0;t<3;t++)e[r*3+t]=e[r*3+t]+this.velocity[r*3+t]*n;if(this.springLambda.fill(0),this.linkLambda.fill(0),this.anchorLambda.fill(0),this.grabLambda.fill(0),this.gripTipLambda.fill(0),this.sutureLambda.fill(0),!this.projector){for(let e of this.tets)e.lambda=0;for(let e of this.strain)e.lambda=0}this.projectSubstep(r);for(let t=0;t<e.length;t++){if(!Number.isFinite(e[t]))throw Error(`Non-finite tissue state.`);this.velocity[t]=Math.max(-100,Math.min(100,(e[t]-this.previous[t])/n))*o}}if(this.selfContact&&i&&a){let t=()=>this.tets.every(t=>x(e,...t.vertices)>0)&&this.selfContact.intersections(e)===0;if(!t()){let n=e.slice(),r=this.velocity.slice();for(let o=0;o<12;o++){this.contactStepScale=o===11?0:2**(-o-1);for(let t=0;t<e.length;t++)e[t]=i[t]+this.contactStepScale*(n[t]-i[t]),this.velocity[t]=a[t]+this.contactStepScale*(r[t]-a[t]);if(t())break}this.selfContact.restore(e)}}this.stepIndex++,!this.closure.paused&&this.closure.elapsed<l(this.domain.closure,this.closure.stage)&&this.closure.elapsed++}projectSubstep(e){let t=this.positions,n=this.domain.inverseMass;if(this.projectSprings(e),this.projector)this.projector.strain(e);else for(let r of this.strain)je(t,n,r,e);if(this.projectLinks(e),this.projectAnchors(e),this.grab&&this.grabTarget&&this.grabPoint&&this.grabReference){let r=this.grabPoint,i=Math.max(...r.weights);for(let a=0;a<r.vertices.length;a++){let o=r.vertices[a],s=8e-7/(e*Math.max(.05,r.weights[a]/i));for(let e=0;e<3;e++){let r=a*3+e,i=(this.grabTarget[e]+this.grabReference[r]-t[o*3+e]-s*this.grabLambda[r])/(n[o]+s);this.grabLambda[r]=this.grabLambda[r]+i,t[o*3+e]=t[o*3+e]+n[o]*i}}let a=this.grab.vertex,o=4e-8/e;for(let e=0;e<3;e++){let r=(this.grabTarget[e]-t[a*3+e]-o*this.gripTipLambda[e])/(n[a]+o);this.gripTipLambda[e]=this.gripTipLambda[e]+r,t[a*3+e]=t[a*3+e]+n[a]*r}}if(this.projectSutures(e),this.manual.project(t,e),this.projector)this.projector.volume(e,!1);else for(let r of this.tets)S(t,n,r,e,!1,r.compliance);for(let r=0;r<4;r++){if(this.projector)this.projector.volume(e,!0);else for(let r of this.tets)S(t,n,r,e,!0,r.compliance,.5);this.projectContacts()}if(this.projectRigidContacts(),this.selfContact)for(let e=0;e<3&&this.selfContact.project(t);e++);this.slidingContact?.project(t);for(let r=0;r<16&&this.hasCompressedElements();r++){if(this.projector)this.projector.volume(e,!0);else for(let r of this.tets)S(t,n,r,e,!0,r.compliance,.5);if(this.projectContacts(),this.projectRigidContacts(),this.selfContact)for(let e=0;e<3&&this.selfContact.project(t);e++);this.slidingContact?.project(t)}}projectSprings(e){let t=this.positions,n=this.domain.inverseMass;for(let r=0;r<this.domain.springs.length;r++){let i=this.domain.springs[r],a=i.a*3,o=i.b*3,s=n[i.a]+n[i.b];if(!s)continue;let c=t[o]-t[a],l=t[o+1]-t[a+1],u=t[o+2]-t[a+2],d=Math.sqrt(c*c+l*l+u*u);if(d<1e-10)continue;let f=i.compliance/e,p=(-(d-i.rest)-f*this.springLambda[r])/(s+f);this.springLambda[r]=this.springLambda[r]+p,t[a]=t[a]-n[i.a]*c/d*p,t[o]=t[o]+n[i.b]*c/d*p,t[a+1]=t[a+1]-n[i.a]*l/d*p,t[o+1]=t[o+1]+n[i.b]*l/d*p,t[a+2]=t[a+2]-n[i.a]*u/d*p,t[o+2]=t[o+2]+n[i.b]*u/d*p}}projectLinks(e){let t=this.positions,n=this.domain.inverseMass;for(let r=0;r<this.domain.links.length;r++){let i=this.domain.links[r],a=this.release&&i.releasable&&(i.releaseDistanceMm??0)<=this.underminingMm,o=i.preparedRelease?0:i.retainedFraction&&this.underminingMm>0?i.retainedFraction[this.underminingMm===3?0:1]:+!a,s=n[i.p];for(let e=0;e<3;e++)s+=n[i.vertices[e]]*i.weights[e]**2;if(s<1e-12)continue;if(o>1e-12){let a=i.compliance/(e*o);for(let e=0;e<3;e++){let o=t[i.p*3+e]-i.offset[e];for(let n=0;n<3;n++)o-=t[i.vertices[n]*3+e]*i.weights[n];let c=r*3+e,l=(-o-a*this.linkLambda[c])/(s+a);this.linkLambda[c]=this.linkLambda[c]+l,t[i.p*3+e]=t[i.p*3+e]+n[i.p]*l;for(let r=0;r<3;r++){let a=i.vertices[r],o=a*3+e;t[o]=t[o]-n[a]*i.weights[r]*l}}}if(i.preparedRelease&&this.slidingContact)continue;let c=0;for(let e=0;e<3;e++){let n=t[i.p*3+e]-i.offset[e];for(let r=0;r<3;r++)n-=t[i.vertices[r]*3+e]*i.weights[r];c+=n*i.normal[e]}if(c<-1e-9)for(let e=0;e<3;e++){let r=-c/s*i.normal[e];t[i.p*3+e]=t[i.p*3+e]+n[i.p]*r;for(let a=0;a<3;a++){let o=i.vertices[a],s=o*3+e;t[s]=t[s]-n[o]*i.weights[a]*r}}}}projectAnchors(e){let t=this.positions,n=this.domain.inverseMass;for(let r=0;r<this.domain.anchors.length;r++){let i=this.domain.anchors[r],a=n[i.p],o=i.compliance/e;if(a)for(let e=0;e<3;e++){let n=r*3+e,s=i.p*3+e,c=(i.target[e]-t[s]-o*this.anchorLambda[n])/(a+o);this.anchorLambda[n]=this.anchorLambda[n]+c,t[s]=t[s]+a*c}}}hasCompressedElements(){if(this.projector?.hasCompressedElements)return this.projector.hasCompressedElements();let e=this.positions,t=!1;for(let n of this.tets){let r=n.vertices;if(!(x(e,r[0],r[1],r[2],r[3])/n.rest>.25)){t=!0;break}}return t}projectContacts(){let e=this.positions,t=this.domain.inverseMass;for(let n of this.domain.bed){let r=0;for(let t=0;t<3;t++)r+=(e[n.p*3+t]-n.point[t])*n.normal[t];if(r<0&&t[n.p])for(let t=0;t<3;t++)e[n.p*3+t]=e[n.p*3+t]-r*n.normal[t]}for(let n of this.domain.banks){let r=n.a*3,i=n.b*3,a=t[n.a]+t[n.b];if(!a)continue;let o=[e[i]-e[r],e[i+1]-e[r+1],e[i+2]-e[r+2]],s=o.reduce((e,t,r)=>e+t*n.normal[r],0),c=o.reduce((e,t)=>e+t*t,0)-s*s;if(!(s>=.12||c>9))for(let o=0;o<3;o++){let c=(.12-s)/a*n.normal[o];e[r+o]=e[r+o]-t[n.a]*c,e[i+o]=e[i+o]+t[n.b]*c}}let n=this.domain.globe;for(let r of n.vertices)if(t[r]){let t=e[r*3]-n.center[0],i=e[r*3+1]-n.center[1],a=e[r*3+2]-n.center[2],o=Math.sqrt(t*t+i*i+a*a);if(o<n.radius&&o>1e-8){let s=n.radius/o;e[r*3]=n.center[0]+t*s,e[r*3+1]=n.center[1]+i*s,e[r*3+2]=n.center[2]+a*s}}}projectRigidContacts(){let e=this.positions,t=this.domain.inverseMass;for(let n of this.domain.rigid.vertices)if(t[n])for(let t=0;t<3;t++){let t=this.rigid.closest([e[n*3],e[n*3+1],e[n*3+2]]);if(!t||t.distance>1.5)break;let r=t.normal.reduce((r,i,a)=>r+i*(e[n*3+a]-t.point[a]),0);if(r>=-1e-8)break;for(let i=0;i<3;i++)e[n*3+i]=e[n*3+i]-r*t.normal[i]}}projectSutures(e){let t=this.positions,n=0;for(let r=0;r<this.sutureBindings.length;r++){let{bite:i,segments:a}=this.sutureBindings[r],o=u(this.closure,i);if(o>0&&!this.closure.biteStarted[r]){for(let e=0;e<a.length;e++)this.closure.startLengths[n+e]=s(t,a[e].a,a[e].b);this.closure.biteStarted[r]=!0}for(let r=0;r<i.segmentTargets.length;r++,n++){if(!o)continue;let{a:s,b:c,vertices:l,weightedMass:u,denominator:d}=a[r],f=0,p=0,m=0,h=0,g=0,_=0;for(let e=0;e<s.vertices.length;e++){let n=s.vertices[e]*3,r=s.weights[e];f+=t[n]*r,p+=t[n+1]*r,m+=t[n+2]*r}for(let e=0;e<c.vertices.length;e++){let n=c.vertices[e]*3,r=c.weights[e];h+=t[n]*r,g+=t[n+1]*r,_+=t[n+2]*r}let v=h-f,y=g-p,b=_-m,x=Math.hypot(v,y,b);if(x<1e-9)continue;let S=this.closure.startLengths[n],C=this.closure.edits?.[i.id]?.applied??o,w=C*C*(3-2*C),T=S+(i.segmentTargets[r]-S)*w;if(d<1e-12)continue;let E=2e-9/e,D=this.sutureLambda[n],O=Math.min(0,D+(-(x-T)-E*D)/(d+E)),k=O-D;this.sutureLambda[n]=O;for(let e=0;e<l.length;e++){let n=l[e]*3,r=u[e];t[n]=t[n]+r*v/x*k,t[n+1]=t[n+1]+r*y/x*k,t[n+2]=t[n+2]+r*b/x*k}}}}metrics(){let e=this.positions,t=this.domain.rest,n=0,r=0,i=0,a=1/0,o=0,c=0,d=0,f=n=>Math.hypot(e[n*3]-t[n*3],e[n*3+1]-t[n*3+1],e[n*3+2]-t[n*3+2]);for(let e=0;e<this.domain.surface.count;e++)n=Math.max(n,f(e));for(let n of this.domain.lid)r=Math.max(r,f(n)),i=Math.max(i,t[n*3+1]-e[n*3+1]);for(let t of this.tets){let n=x(e,...t.vertices)/t.rest;a=Math.min(a,n),n<=0&&o++}for(let t of this.domain.springs)t.rest>.1&&(c=Math.max(c,Math.abs(Math.hypot(e[t.a*3]-e[t.b*3],e[t.a*3+1]-e[t.b*3+1],e[t.a*3+2]-e[t.b*3+2])/t.rest-1)));for(let t of this.strainEdges)t.rest>.1&&(c=Math.max(c,Math.abs(Math.hypot(e[t.a*3]-e[t.b*3],e[t.a*3+1]-e[t.b*3+1],e[t.a*3+2]-e[t.b*3+2])/t.rest-1)));let h=this.domain.globe;for(let t of h.vertices)d=Math.max(d,h.radius-Math.hypot(e[t*3]-h.center[0],e[t*3+1]-h.center[1],e[t*3+2]-h.center[2]));let g=0,_=0;for(let t of this.domain.closure.gaps){let n=s(e,t.a,t.b);g+=n,_=Math.max(_,n)}g/=Math.max(1,this.domain.closure.gaps.length);let v=0;for(let t of this.domain.rigid.vertices){let n=this.rigid.closest([e[t*3],e[t*3+1],e[t*3+2]]);n&&n.distance<1.5&&(v=Math.max(v,-n.normal.reduce((r,i,a)=>r+i*(e[t*3+a]-n.point[a]),0)))}return{...this.slidingContact?{interfacePenetrationMm:this.slidingContact.maximumPenetration(e)}:{},...this.manualMode||this.domain.repair?{contactStepScale:this.contactStepScale,selfIntersections:this.selfContact?.intersections(e)??0,projectedOpeningMm2:J(this.domain,e),manualGaps:[...me(this.closure,this.domain.closure),...this.manual.snapshot()].map(n=>({id:n.bite.id,separationMm:s(e,n.bite.edgeA,n.bite.edgeB),eversionMm:[p(e,n.bite.edgeA,n.bite.surfaceA)-p(t,n.bite.edgeA,n.bite.surfaceA),p(e,n.bite.edgeB,n.bite.surfaceB)-p(t,n.bite.edgeB,n.bite.surfaceB)]}))}:{},step:this.stepIndex,maxDisplacementMm:n,lowerLidDisplacementMm:r,lowerLidInferiorMm:i,minimumVolumeRatio:a,invertedElements:o,maximumStrain:c,globePenetrationMm:d,meanGapMm:g,maximumGapMm:_,deepCount:this.domain.closure.deeps.filter(e=>u(this.closure,e)>0).length,runningBites:this.domain.closure.running.filter(e=>u(this.closure,e)>0).length,closureBusy:this.closure.elapsed<l(this.domain.closure,this.closure.stage),assistanceActive:this.closure.assistance,gripActive:this.grab!==null,supportPenetrationMm:v,...m(e,this.domain.closure.eversion)}}},Fe=class{solver;referenceStep;commands=[];checkpoints=[];lastStep=0;commandCursor=0;undoStates=[];redoStates=[];lastEdit;constructor(e,t){this.solver=e,this.referenceStep=t,this.save()}save(){this.checkpoints.push({state:this.solver.checkpoint(),commandCursor:this.commandCursor}),this.checkpoints.length>65&&this.checkpoints.splice(1,this.checkpoints.length-65)}archive(){return{version:2,domainId:this.solver.domain.id,commands:this.commands.map(e=>({...e,command:Ie(e.command)})),state:this.solver.checkpoint(),lastStep:this.lastStep,commandCursor:this.commandCursor}}exportArchive(){return{...this.archive(),undo:structuredClone(this.undoStates),redo:structuredClone(this.redoStates)}}restoreExperiment(e){if((e.undo?.length??0)>16||(e.redo?.length??0)>16)throw Error(`Invalid experiment edit history.`);this.restoreArchive(e),this.undoStates=structuredClone(e.undo??[]),this.redoStates=structuredClone(e.redo??[]),this.lastEdit=void 0}restoreArchive(e){if(e.version!==2||e.domainId!==this.solver.domain.id||e.commandCursor<0||e.commandCursor>e.commands.length||e.lastStep<e.state.step||e.lastStep>(e.state.manualMode?36e3:1800)||e.commands.some((t,n)=>!Number.isInteger(t.step)||t.step<0||t.step>e.lastStep||n>0&&t.step<e.commands[n-1].step))throw Error(`The saved experiment is incompatible.`);this.solver.restore(e.state),this.commands.splice(0,this.commands.length,...e.commands.map(e=>({...e,command:Ie(e.command)}))),this.commandCursor=e.commandCursor,this.lastStep=e.lastStep,this.checkpoints.splice(1),this.save()}get canUndo(){return this.undoStates.length>0}get canRedo(){return this.redoStates.length>0}undo(){let e=this.undoStates.pop();e&&(this.redoStates.push(this.archive()),this.restoreArchive(e),this.lastEdit=void 0)}redo(){let e=this.redoStates.pop();e&&(this.undoStates.push(this.archive()),this.restoreArchive(e),this.lastEdit=void 0)}apply(e,t,n){if(e!==this.solver.stepIndex)throw Error(`Command step does not match the current case.`);if(!t.length)return;if(this.commands.length+t.length>2e4)throw Error(`This experiment has reached its recording limit. Your work is preserved; start a new rehearsal to continue.`);if(t.some(e=>e.editId!==void 0&&(!Number.isSafeInteger(e.editId)||e.editId<0)))throw Error(`Invalid edit identifier.`);let r=t.some(e=>e.kind.startsWith(`stitch-`))?this.archive():null,i=r?[...this.checkpoints]:null,a=r?[...this.undoStates]:null,o=r?[...this.redoStates]:null,s=this.lastEdit,c=!1;try{for(let r of t){let t=Ie(r),i=r.editId??n,a=(r.kind.startsWith(`stitch-`)||this.solver.manualMode&&(r.kind===`grab`||r.kind===`release`))&&(i===void 0?!c:this.lastEdit!==i)?this.archive():null;if(this.execute(t),a&&!this.undoStates.includes(a)&&(this.undoStates.push(a),this.undoStates.length>16&&this.undoStates.shift(),this.redoStates=[],this.lastEdit=i,c=!0),e<this.lastStep){this.commands.splice(this.commandCursor);for(let t=this.checkpoints.length-1;t>0;t--)this.checkpoints[t].state.step>e&&this.checkpoints.splice(t,1);this.lastStep=e}let o=this.commands[this.commands.length-1];o?.step===e&&Le(o.command,t)?o.command=t:(this.commands.push({step:e,command:t}),this.commandCursor++)}}catch(e){throw r&&(this.restoreArchive(r),this.checkpoints.splice(0,this.checkpoints.length,...i),this.undoStates=a,this.redoStates=o,this.lastEdit=s),e}}execute(e){if(e.kind===`stitch-add`||e.kind===`stitch-replace`)this.solver.closure.paused=!0,e.kind===`stitch-add`?this.solver.manual.add(e.id,e.a,e.b,this.solver.positions):e.id.startsWith(`manual-`)?this.solver.manual.replace(e.id,e.a,e.b,this.solver.positions):(this.solver.manual.add(`manual-replacement-${e.id}`,e.a,e.b,this.solver.positions),pe(this.solver.closure,this.solver.domain.closure,e.id,`remove`)),this.solver.enableManual();else if(e.kind===`stitch-tighten`)this.editStitch(e.id,e.value);else if(e.kind===`stitch-tighten-many`){if(!e.ids.length||new Set(e.ids).size!==e.ids.length)throw Error(`Select distinct stitches.`);for(let t of e.ids)this.editStitch(t,e.value)}else if(e.kind===`stitch-remove`)this.editStitch(e.id,`remove`);else if(e.kind===`stitch-clear`){for(let{bite:e}of me(this.solver.closure,this.solver.domain.closure))this.editStitch(e.id,`remove`);this.solver.manual.clear()}else if(e.kind===`grab`)this.solver.setGrab(e.grab);else if(e.kind===`release`){let t=e.mm??(e.released?3:0);if(![0,3,6].includes(t))throw Error(`Unsupported release distance.`);this.solver.underminingMm=t}else if(e.kind===`closure`)this.solver.startClosure(e.stage);else if(e.kind===`pause`)this.solver.closure.paused=e.paused;else throw Error(`Unsupported experiment command.`)}editStitch(e,t){e.startsWith(`manual-`)?t===`remove`?this.solver.manual.remove(e):this.solver.manual.tighten(e,t):pe(this.solver.closure,this.solver.domain.closure,e,t),this.solver.closure.paused=!0,this.solver.enableManual()}synchronizeCommands(){for(;this.commandCursor<this.commands.length&&this.commands[this.commandCursor].step===this.solver.stepIndex;)this.execute(this.commands[this.commandCursor++].command)}advance(){if(this.solver.stepIndex>=(this.solver.manualMode?36e3:1800))throw Error(`This experiment has reached its recording limit. Your work is preserved; rewind or reset the rehearsal.`);this.synchronizeCommands(),this.referenceStep?.(this.solver)||this.solver.advance(),this.solver.stepIndex>this.lastStep&&(this.lastStep=this.solver.stepIndex,this.lastStep%8==0&&this.save())}startSeek(e){if(!Number.isInteger(e)||e<0||e>this.lastStep)throw Error(`Invalid timeline position.`);let t=this.checkpoints[0];for(let n of this.checkpoints)n.state.step<=e&&n.state.step>=t.state.step&&(t=n);return this.solver.restore(t.state),this.commandCursor=t.commandCursor,e}seek(e){for(this.startSeek(e);this.solver.stepIndex<e;)this.advance();this.synchronizeCommands()}};function Ie(e){return e.kind===`stitch-tighten-many`?{...e,ids:[...e.ids]}:e.kind===`stitch-add`||e.kind===`stitch-replace`?{...e,a:{vertices:[...e.a.vertices],weights:[...e.a.weights]},b:{vertices:[...e.b.vertices],weights:[...e.b.weights]}}:e.kind===`grab`?{...e,kind:`grab`,grab:e.grab?{vertex:e.grab.vertex,target:[...e.grab.target]}:null}:{...e}}function Le(e,t){return e.kind!==t.kind||e.editId!==t.editId?!1:e.kind===`stitch-tighten-many`&&t.kind===`stitch-tighten-many`?e.ids.length===t.ids.length&&e.ids.every((e,n)=>e===t.ids[n]):e.kind===`stitch-tighten`&&t.kind===`stitch-tighten`?e.id===t.id:e.kind===`release`||e.kind===`pause`?!0:e.kind===`closure`&&t.kind===`closure`?e.stage===t.stage:e.kind===`grab`&&t.kind===`grab`&&e.grab?.vertex===t.grab?.vertex}var Re,ze=t((()=>{Re=``+new URL(`cheek-B_nsSwWV.wasm`,self.location.href).href}));ze();async function Be(e,t){let n=t?Uint8Array.from(t).buffer:await fetch(Re).then(e=>{if(!e.ok)throw Error(`Numerical accelerator unavailable.`);return e.arrayBuffer()}),{instance:r}=await WebAssembly.instantiate(n),i=r.exports,a=e.tets.filter(e=>e.material===`dermis`).map(t=>Ae(e.rest,t)),o=65536,s=o+e.rest.byteLength,c=s+e.inverseMass.byteLength,l=c+e.tets.length*48,u=l+a.length*120,d=Math.ceil(u/65536)-i.memory.buffer.byteLength/65536;d>0&&i.memory.grow(d);let f=new Float64Array(i.memory.buffer,o,e.rest.length);f.set(e.rest),new Float64Array(i.memory.buffer,s,e.inverseMass.length).set(e.inverseMass);let p=new Float64Array(i.memory.buffer,c,e.tets.length*6);e.tets.forEach((e,t)=>p.set([...e.vertices,e.rest,Ne[e.material].bulkCompliance],t*6));let m=new Float64Array(i.memory.buffer,l,a.length*15);return a.forEach((e,t)=>m.set([...e.vertices,...e.inverse,e.volume,e.compliance],t*15)),{positions:f,hasCompressedElements:()=>!!i.compressed(o,c,e.tets.length,.25),strain:e=>i.strains(o,s,l,a.length,e),volume:(t,n)=>i.volumes(o,s,c,e.tets.length,t,Number(n))}}var Ve,He=t((()=>{Ve=`import type { TissueDomain3D } from '../engine/surface/domain'
import type { DomainProjector } from '../engine/surface/projector'
import { DOMAIN_MATERIALS } from '../engine/surface/solver'
import { strainTet } from '../engine/surface/strain'
import kernelUrl from './numerics/cheek.wasm?url'

interface KernelExports extends WebAssembly.Exports {
  memory: WebAssembly.Memory
  volumes(p: number, w: number, rows: number, count: number, h2: number, barrier: number): void
  compressed(p: number, rows: number, count: number, threshold: number): number
  strains(p: number, w: number, rows: number, count: number, h2: number): void
}

/** Allocate one private worker memory. No copies per step, shared-memory
 * headers, platform imports in the engine, or change to mesh resolution. */
export async function createCheekKernel(domain: TissueDomain3D, bytes?: Uint8Array): Promise<DomainProjector> {
  const buffer = bytes ? Uint8Array.from(bytes).buffer : await fetch(kernelUrl).then(r => { if (!r.ok) throw new Error('Numerical accelerator unavailable.'); return r.arrayBuffer() })
  const { instance } = await WebAssembly.instantiate(buffer)
  const wasm = instance.exports as KernelExports, strains = domain.tets.filter(t => t.material === 'dermis').map(t => strainTet(domain.rest,t))
  const p = 65536, w = p + domain.rest.byteLength, volumes = w + domain.inverseMass.byteLength, deviatoric = volumes + domain.tets.length*48, end = deviatoric + strains.length*120
  const additional = Math.ceil(end/65536) - wasm.memory.buffer.byteLength/65536
  if(additional>0)wasm.memory.grow(additional)
  const positions = new Float64Array(wasm.memory.buffer,p,domain.rest.length)
  positions.set(domain.rest)
  new Float64Array(wasm.memory.buffer,w,domain.inverseMass.length).set(domain.inverseMass)
  const volumeRows = new Float64Array(wasm.memory.buffer,volumes,domain.tets.length*6)
  domain.tets.forEach((t,i) => volumeRows.set([...t.vertices,t.rest,DOMAIN_MATERIALS[t.material].bulkCompliance],i*6))
  const strainRows = new Float64Array(wasm.memory.buffer,deviatoric,strains.length*15)
  strains.forEach((t,i) => strainRows.set([...t.vertices,...t.inverse,t.volume,t.compliance],i*15))
  return { positions, hasCompressedElements: () => Boolean(wasm.compressed(p,volumes,domain.tets.length,.25)), strain: h2 => wasm.strains(p,w,deviatoric,strains.length,h2), volume: (h2,barrier) => wasm.volumes(p,w,volumes,domain.tets.length,h2,Number(barrier)) }
}
`})),Ue,We=t((()=>{Ue=`import type { SkinModel } from './skin'

/**
 * Attach polylines (landmark curves, danger structures) to the skin mesh so
 * they deform with it. Each sample is located once in the REST layout: inside
 * an active triangle it rides on barycentric weights; otherwise (over the
 * wound bed, or a hair outside the panel) it follows the nearest active
 * vertex with a fixed rest offset. Pure geometry — deterministic, no time.
 */
export interface CurveAttachment {
  /** Sample count. */
  readonly count: number
  /** Containing triangle index per sample, or -1 when riding a vertex. */
  readonly tri: Int32Array
  /** Barycentric weights, 3 per sample (unused when tri is -1). */
  readonly bary: Float32Array
  /** Nearest active vertex per sample (fallback carrier), or -1. */
  readonly vertex: Int32Array
  /** Rest offset from the carrier vertex, 2 per sample. */
  readonly offset: Float32Array
  /** Rest positions, 2 per sample (the last-resort fallback). */
  readonly rest: Float32Array
}

/**
 * Rest-layout spatial index: which triangles and active vertices fall in each
 * cell of a coarse grid. Built once per model (cached), so attaching hundreds
 * of curves costs a handful of triangle tests per sample instead of a sweep
 * over the whole mesh.
 */
interface SpatialIndex {
  cell: number
  minX: number
  minY: number
  cols: number
  rows: number
  triCells: Int32Array[]
  vertCells: Int32Array[]
}

const INDEX_CACHE = new WeakMap<SkinModel, SpatialIndex>()

function spatialIndex(model: SkinModel): SpatialIndex {
  const cached = INDEX_CACHE.get(model)
  if (cached) return cached
  const layout = model.mesh.positions
  const tris = model.triangles
  const active = model.active
  const cell = Math.max(1e-3, (model.params.widthMm / model.params.cols) * 2)
  const minX = -model.params.widthMm / 2 - cell
  const minY = -model.params.heightMm / 2 - cell
  const cols = Math.ceil((model.params.widthMm + 2 * cell) / cell) + 1
  const rows = Math.ceil((model.params.heightMm + 2 * cell) / cell) + 1
  const triLists: number[][] = Array.from({ length: cols * rows }, () => [])
  const vertLists: number[][] = Array.from({ length: cols * rows }, () => [])
  const clampI = (i: number): number => Math.min(cols - 1, Math.max(0, i))
  const clampJ = (j: number): number => Math.min(rows - 1, Math.max(0, j))
  for (let t = 0; t < tris.length; t += 3) {
    let x0 = Infinity
    let x1 = -Infinity
    let y0 = Infinity
    let y1 = -Infinity
    for (let k = 0; k < 3; k += 1) {
      const v = tris[t + k]!
      const x = layout[v * 2]!
      const y = layout[v * 2 + 1]!
      x0 = Math.min(x0, x)
      x1 = Math.max(x1, x)
      y0 = Math.min(y0, y)
      y1 = Math.max(y1, y)
    }
    const i0 = clampI(Math.floor((x0 - minX) / cell))
    const i1 = clampI(Math.floor((x1 - minX) / cell))
    const j0 = clampJ(Math.floor((y0 - minY) / cell))
    const j1 = clampJ(Math.floor((y1 - minY) / cell))
    for (let j = j0; j <= j1; j += 1) {
      for (let i = i0; i <= i1; i += 1) triLists[j * cols + i]!.push(t / 3)
    }
  }
  for (let v = 0; v < active.length; v += 1) {
    if (!active[v]) continue
    const i = clampI(Math.floor((layout[v * 2]! - minX) / cell))
    const j = clampJ(Math.floor((layout[v * 2 + 1]! - minY) / cell))
    vertLists[j * cols + i]!.push(v)
  }
  const index: SpatialIndex = {
    cell,
    minX,
    minY,
    cols,
    rows,
    triCells: triLists.map((l) => Int32Array.from(l)),
    vertCells: vertLists.map((l) => Int32Array.from(l)),
  }
  INDEX_CACHE.set(model, index)
  return index
}

export function attachPolyline(model: SkinModel, points: ArrayLike<number>): CurveAttachment {
  const count = Math.floor(points.length / 2)
  const tri = new Int32Array(count).fill(-1)
  const bary = new Float32Array(count * 3)
  const vertex = new Int32Array(count).fill(-1)
  const offset = new Float32Array(count * 2)
  const rest = new Float32Array(count * 2)
  const layout = model.mesh.positions
  const tris = model.triangles
  const index = spatialIndex(model)
  const cellOf = (x: number, y: number): [number, number] => [
    Math.min(index.cols - 1, Math.max(0, Math.floor((x - index.minX) / index.cell))),
    Math.min(index.rows - 1, Math.max(0, Math.floor((y - index.minY) / index.cell))),
  ]
  for (let s = 0; s < count; s += 1) {
    const px = points[s * 2]!
    const py = points[s * 2 + 1]!
    rest[s * 2] = px
    rest[s * 2 + 1] = py
    const [ci, cj] = cellOf(px, py)

    // Containing triangle among the cell's candidates.
    const candidates = index.triCells[cj * index.cols + ci]!
    for (let n = 0; n < candidates.length; n += 1) {
      const t = candidates[n]! * 3
      const a = tris[t]!
      const b = tris[t + 1]!
      const c = tris[t + 2]!
      const ax = layout[a * 2]!
      const ay = layout[a * 2 + 1]!
      const bx = layout[b * 2]!
      const by = layout[b * 2 + 1]!
      const cx = layout[c * 2]!
      const cy = layout[c * 2 + 1]!
      const det = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy)
      if (Math.abs(det) < 1e-12) continue
      const l1 = ((by - cy) * (px - cx) + (cx - bx) * (py - cy)) / det
      const l2 = ((cy - ay) * (px - cx) + (ax - cx) * (py - cy)) / det
      const l3 = 1 - l1 - l2
      const eps = -1e-6
      if (l1 >= eps && l2 >= eps && l3 >= eps) {
        tri[s] = t / 3
        bary[s * 3] = l1
        bary[s * 3 + 1] = l2
        bary[s * 3 + 2] = l3
        break
      }
    }

    // Nearest active vertex: widen rings of cells until one is found and the
    // ring is farther than the best candidate.
    let best = -1
    let bestD = Infinity
    for (let ring = 0; ring < Math.max(index.cols, index.rows); ring += 1) {
      if (best >= 0 && (ring - 1) * index.cell > Math.sqrt(bestD)) break
      for (let j = cj - ring; j <= cj + ring; j += 1) {
        if (j < 0 || j >= index.rows) continue
        for (let i = ci - ring; i <= ci + ring; i += 1) {
          if (i < 0 || i >= index.cols) continue
          if (Math.abs(i - ci) !== ring && Math.abs(j - cj) !== ring) continue
          const verts = index.vertCells[j * index.cols + i]!
          for (let n = 0; n < verts.length; n += 1) {
            const v = verts[n]!
            const dx = layout[v * 2]! - px
            const dy = layout[v * 2 + 1]! - py
            const d = dx * dx + dy * dy
            if (d < bestD) {
              bestD = d
              best = v
            }
          }
        }
      }
    }
    vertex[s] = best
    if (best >= 0) {
      offset[s * 2] = px - layout[best * 2]!
      offset[s * 2 + 1] = py - layout[best * 2 + 1]!
    }
  }
  return { count, tri, bary, vertex, offset, rest }
}

/** Current (deformed) sample positions, flat [x0,y0,x1,y1,...] in mm. */
export function deformedPolyline(
  model: SkinModel,
  att: CurveAttachment,
  out?: Float32Array,
): Float32Array {
  const result = out && out.length >= att.count * 2 ? out : new Float32Array(att.count * 2)
  const pos = model.ps.pos
  const tris = model.triangles
  for (let s = 0; s < att.count; s += 1) {
    const t = att.tri[s]!
    let x: number
    let y: number
    if (t >= 0) {
      const a = tris[t * 3]!
      const b = tris[t * 3 + 1]!
      const c = tris[t * 3 + 2]!
      const l1 = att.bary[s * 3]!
      const l2 = att.bary[s * 3 + 1]!
      const l3 = att.bary[s * 3 + 2]!
      x = l1 * pos[a * 2]! + l2 * pos[b * 2]! + l3 * pos[c * 2]!
      y = l1 * pos[a * 2 + 1]! + l2 * pos[b * 2 + 1]! + l3 * pos[c * 2 + 1]!
    } else {
      const v = att.vertex[s]!
      if (v >= 0) {
        x = pos[v * 2]! + att.offset[s * 2]!
        y = pos[v * 2 + 1]! + att.offset[s * 2 + 1]!
      } else {
        x = att.rest[s * 2]!
        y = att.rest[s * 2 + 1]!
      }
    }
    result[s * 2] = Number.isFinite(x) ? x : att.rest[s * 2]!
    result[s * 2 + 1] = Number.isFinite(y) ? y : att.rest[s * 2 + 1]!
  }
  return result
}

/**
 * How far an attached polyline has moved from rest, in mm: the largest
 * sample displacement (any direction). The readout for "how much did the
 * brow / lid margin / hairline move".
 */
export function polylineDisplacementMm(model: SkinModel, att: CurveAttachment): number {
  const now = deformedPolyline(model, att)
  let peak = 0
  for (let s = 0; s < att.count; s += 1) {
    const dx = now[s * 2]! - att.rest[s * 2]!
    const dy = now[s * 2 + 1]! - att.rest[s * 2 + 1]!
    const d = Math.hypot(dx, dy)
    if (d > peak) peak = d
  }
  return peak
}
`})),Ge,Ke=t((()=>{Ge=`import { defectAxisRad } from './defect'
import type { SkinModel } from './skin'

export interface PlannedSuture {
  a: number
  b: number
  /** Normalized position along the wound's long axis, 0..1. */
  t: number
}

/** Halving sequence: midpoint first, then quarters, then eighths. */
const HALVING_ORDER = [
  1 / 2, 1 / 4, 3 / 4, 1 / 8, 3 / 8, 5 / 8, 7 / 8,
  1 / 16, 3 / 16, 5 / 16, 7 / 16, 9 / 16, 11 / 16, 13 / 16, 15 / 16,
]

/**
 * Rule-of-halves suture plan: pairs of opposing wound-rim vertices, midpoint
 * first, then successive halves. Pure layout-space geometry — deterministic,
 * independent of the current deformation.
 *
 * Rim vertices are split into the two wound edges by which side of the long
 * axis they lie on; each planned t picks the nearest rim vertex on each side.
 * Already-sutured pairs and near-tip duplicates are skipped.
 */
export function planHalvingSutures(model: SkinModel, count = 15): PlannedSuture[] {
  const defect = model.params.defect
  if (!defect || model.woundVerts.length < 4) return []

  const axis = defectAxisRad(defect, model.params.rstlAngleRad)
  const cos = Math.cos(axis)
  const sin = Math.sin(axis)
  const layout = model.mesh.positions

  interface RimPoint {
    v: number
    u: number
    w: number
  }
  const upper: RimPoint[] = []
  const lower: RimPoint[] = []
  for (const v of model.woundVerts) {
    const px = layout[v * 2]! - defect.x
    const py = layout[v * 2 + 1]! - defect.y
    const u = px * cos + py * sin
    const w = -px * sin + py * cos
    ;(w >= 0 ? upper : lower).push({ v, u, w })
  }
  if (upper.length === 0 || lower.length === 0) return []

  let uMin = Infinity
  let uMax = -Infinity
  for (const p of [...upper, ...lower]) {
    if (p.u < uMin) uMin = p.u
    if (p.u > uMax) uMax = p.u
  }
  const span = uMax - uMin
  if (span < 1e-6) return []

  const already = new Set<string>()
  for (const s of model.sutures) {
    already.add(s.a < s.b ? \`\${s.a},\${s.b}\` : \`\${s.b},\${s.a}\`)
  }

  const nearest = (chain: RimPoint[], t: number): RimPoint => {
    let best = chain[0]!
    let bestDist = Infinity
    for (const p of chain) {
      const dist = Math.abs((p.u - uMin) / span - t)
      if (dist < bestDist) {
        bestDist = dist
        best = p
      }
    }
    return best
  }

  const plan: PlannedSuture[] = []
  const used = new Set<number>()
  for (const t of HALVING_ORDER) {
    if (plan.length >= count) break
    const top = nearest(upper, t)
    const bottom = nearest(lower, t)
    if (top.v === bottom.v || used.has(top.v) || used.has(bottom.v)) continue
    const key = top.v < bottom.v ? \`\${top.v},\${bottom.v}\` : \`\${bottom.v},\${top.v}\`
    if (already.has(key)) continue
    used.add(top.v)
    used.add(bottom.v)
    plan.push({ a: top.v, b: bottom.v, t })
  }
  return plan
}

/**
 * Deep (dermal) suture plan: the rule-of-halves positions, with each bite set
 * back \`biteMm\` from the wound edge into the tissue — deeps grab the dermis
 * behind the edge and bear the closure tension, so the epidermal edges meet
 * with almost none left.
 */
export function planDeepBites(model: SkinModel, biteMm = 2, count = 15): PlannedSuture[] {
  const defect = model.params.defect
  if (!defect) return []
  const rimPlan = planHalvingSutures(model, count + model.sutures.length)
  const layout = model.mesh.positions
  const rimSet = new Set(model.woundVerts)

  // Nearest movable NON-RIM vertex to a point: the rim vertex itself is
  // usually closest to the bite target, so it must be excluded, not filtered
  // after the fact.
  const nearestBite = (tx: number, ty: number, maxDistMm: number): number => {
    let best = -1
    let bestDist = maxDistMm * maxDistMm
    for (let v = 0; v < model.ps.count; v += 1) {
      if (!model.active[v] || model.ps.invMass[v] === 0 || rimSet.has(v)) continue
      const dx = layout[v * 2]! - tx
      const dy = layout[v * 2 + 1]! - ty
      const d = dx * dx + dy * dy
      if (d < bestDist) {
        bestDist = d
        best = v
      }
    }
    return best
  }

  const biteVertex = (rim: number): number => {
    const x = layout[rim * 2]!
    const y = layout[rim * 2 + 1]!
    const dx = x - defect.x
    const dy = y - defect.y
    const len = Math.hypot(dx, dy)
    if (len < 1e-6) return rim
    const targetX = x + (dx / len) * biteMm
    const targetY = y + (dy / len) * biteMm
    const found = nearestBite(targetX, targetY, biteMm + 4.5)
    return found >= 0 ? found : rim
  }

  const already = new Set<string>()
  for (const s of model.sutures) {
    already.add(s.a < s.b ? \`\${s.a},\${s.b}\` : \`\${s.b},\${s.a}\`)
  }
  const plan: PlannedSuture[] = []
  const used = new Set<number>()
  for (const pair of rimPlan) {
    if (plan.length >= count) break
    const a = biteVertex(pair.a)
    const b = biteVertex(pair.b)
    if (a === b || used.has(a) || used.has(b)) continue
    const key = a < b ? \`\${a},\${b}\` : \`\${b},\${a}\`
    if (already.has(key)) continue
    used.add(a)
    used.add(b)
    plan.push({ a, b, t: pair.t })
  }
  return plan
}

/**
 * Approximating ties for the rim points the halving plan leaves between its
 * stitches: each still-free vertex on one edge meets the nearest free vertex
 * on the other along the wound's axis, so the edges — poles included — meet
 * along their whole length. Mechanics only; a caller places them hidden.
 */
export function planEdgeTies(model: SkinModel, maxOffsetMm = 1.5): PlannedSuture[] {
  const defect = model.params.defect
  if (!defect || model.woundVerts.length < 4) return []
  const axis = defectAxisRad(defect, model.params.rstlAngleRad)
  const cos = Math.cos(axis)
  const sin = Math.sin(axis)
  const layout = model.mesh.positions
  const used = new Set<number>()
  for (const s of model.sutures) {
    used.add(s.a)
    used.add(s.b)
  }
  const upper: Array<{ v: number; u: number }> = []
  const lower: Array<{ v: number; u: number }> = []
  let uMin = Infinity
  let uMax = -Infinity
  for (const v of model.woundVerts) {
    const px = layout[v * 2]! - defect.x
    const py = layout[v * 2 + 1]! - defect.y
    const u = px * cos + py * sin
    const w = -px * sin + py * cos
    uMin = Math.min(uMin, u)
    uMax = Math.max(uMax, u)
    if (used.has(v)) continue
    ;(w >= 0 ? upper : lower).push({ v, u })
  }
  const span = uMax - uMin
  const taken = new Set<number>()
  const plan: PlannedSuture[] = []
  for (const p of upper) {
    let best = -1
    let bestErr = maxOffsetMm
    for (const q of lower) {
      if (taken.has(q.v)) continue
      const err = Math.abs(q.u - p.u)
      if (err < bestErr) {
        bestErr = err
        best = q.v
      }
    }
    if (best < 0) continue
    taken.add(best)
    plan.push({ a: p.v, b: best, t: span > 1e-6 ? (p.u - uMin) / span : 0 })
  }
  return plan
}
`})),qe,Je=t((()=>{qe=`import type { DefectSpec, FusiformDefect } from './types'

/**
 * Fusiform (lens) geometry: the intersection of two circles of radius r whose
 * centers sit at ±d along the short axis. Tips lie at ±length/2 on the long
 * axis; half-width at the center is width/2.
 */
export function lensGeometry(lengthMm: number, widthMm: number): { r: number; d: number } {
  const d = (lengthMm * lengthMm - widthMm * widthMm) / (4 * widthMm)
  return { r: d + widthMm / 2, d }
}

/** Standard planned excision for a circular defect: width = diameter, 3:1 length. */
export function fusiformForDiameter(
  diameterMm: number,
  ratio = 3,
): { lengthMm: number; widthMm: number } {
  return { lengthMm: diameterMm * ratio, widthMm: diameterMm }
}

/**
 * Point-in-defect test, optionally inflated outward by \`inflateMm\` (used for
 * the undermining region). For the fusiform, inflating both generating circles
 * approximates the outward offset (tips stay slightly pointier than a true
 * Minkowski offset — fine for teaching visuals).
 */
export function insideDefect(
  defect: DefectSpec,
  x: number,
  y: number,
  inflateMm = 0,
): boolean {
  if (defect.kind === 'fusiform') {
    const { r, d } = lensGeometry(defect.lengthMm, defect.widthMm)
    const cos = Math.cos(defect.angleRad)
    const sin = Math.sin(defect.angleRad)
    const px = x - defect.x
    const py = y - defect.y
    // Local frame: u along the long axis, w along the short axis.
    const u = px * cos + py * sin
    const w = -px * sin + py * cos
    const limit = r + inflateMm
    const upper = u * u + (w - d) * (w - d) <= limit * limit
    const lower = u * u + (w + d) * (w + d) <= limit * limit
    return upper && lower
  }
  const dx = x - defect.x
  const dy = y - defect.y
  const limit = defect.radiusMm + inflateMm
  return dx * dx + dy * dy <= limit * limit
}

/** Long-axis direction of a defect; circles fall back to the given default. */
export function defectAxisRad(defect: DefectSpec, fallbackRad: number): number {
  return defect.kind === 'fusiform' ? defect.angleRad : fallbackRad
}

/**
 * Closed outline polyline of a fusiform defect as flat [x0,y0,x1,y1,...]
 * world coordinates, for rendering a planned-excision preview. \`inflateMm\`
 * outlines the inflated lens (matching insideDefect's inflation).
 *
 * Every sample is distinct: the ring holds 2 * segmentsPerArc points, each
 * tip exactly once (the return arc omits its endpoints), and the ring is
 * implicitly closed — the first point is not repeated at the end.
 */
export function fusiformOutline(
  defect: FusiformDefect,
  segmentsPerArc = 32,
  inflateMm = 0,
): number[] {
  const { r, d } = lensGeometry(defect.lengthMm, defect.widthMm)
  const radius = r + inflateMm
  const half = Math.sqrt(Math.max(0, radius * radius - d * d))
  const cos = Math.cos(defect.angleRad)
  const sin = Math.sin(defect.angleRad)
  const points: number[] = []
  const push = (u: number, w: number): void => {
    points.push(defect.x + u * cos - w * sin, defect.y + u * sin + w * cos)
  }
  // Upper arc tip-to-tip (both tips included), then the lower arc back
  // between the tips (both excluded) so no sample is emitted twice.
  for (let k = 0; k <= segmentsPerArc; k += 1) {
    const u = -half + (k / segmentsPerArc) * 2 * half
    push(u, Math.sqrt(Math.max(0, radius * radius - u * u)) - d)
  }
  for (let k = segmentsPerArc - 1; k >= 1; k -= 1) {
    const u = -half + (k / segmentsPerArc) * 2 * half
    push(u, d - Math.sqrt(Math.max(0, radius * radius - u * u)))
  }
  return points
}

/** Even-odd point-in-polygon test on a flat [x0,y0,...] ring. */
export function inPolygon(polygon: number[], x: number, y: number): boolean {
  let inside = false
  const n = polygon.length / 2
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = polygon[i * 2]!
    const yi = polygon[i * 2 + 1]!
    const xj = polygon[j * 2]!
    const yj = polygon[j * 2 + 1]!
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
      inside = !inside
    }
  }
  return inside
}

/** Outline of any defect (optionally inflated), for rings and previews. */
export function defectOutline(defect: DefectSpec, inflateMm = 0, segments = 48): number[] {
  if (defect.kind === 'fusiform') return fusiformOutline(defect, segments, inflateMm)
  const radius = defect.radiusMm + inflateMm
  const points: number[] = []
  for (let k = 0; k < segments; k += 1) {
    const a = (k / segments) * Math.PI * 2
    points.push(defect.x + Math.cos(a) * radius, defect.y + Math.sin(a) * radius)
  }
  return points
}
`})),Ye,Xe=t((()=>{Ye=`/** Triangulated grid mesh utilities. Pure functions, no side effects. */

export interface TriangleMesh {
  cols: number
  rows: number
  /** Layout (rest) coordinates in mm, centered on the origin. xy pairs. */
  positions: Float32Array
  /** Vertex index triples. */
  triangles: Uint32Array
}

export function vertexIndex(cols: number, i: number, j: number): number {
  return j * (cols + 1) + i
}

/**
 * Regular grid of (cols x rows) cells triangulated with alternating diagonals
 * so the mesh has no global directional bias of its own — anisotropy must come
 * from the constraints, not the topology.
 */
export function createGrid(
  widthMm: number,
  heightMm: number,
  cols: number,
  rows: number,
): TriangleMesh {
  const vertexCount = (cols + 1) * (rows + 1)
  const positions = new Float32Array(vertexCount * 2)
  for (let j = 0; j <= rows; j += 1) {
    for (let i = 0; i <= cols; i += 1) {
      const v = vertexIndex(cols, i, j)
      positions[v * 2] = (i / cols - 0.5) * widthMm
      positions[v * 2 + 1] = (j / rows - 0.5) * heightMm
    }
  }

  const triangles = new Uint32Array(cols * rows * 6)
  let t = 0
  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      const v00 = vertexIndex(cols, i, j)
      const v10 = vertexIndex(cols, i + 1, j)
      const v01 = vertexIndex(cols, i, j + 1)
      const v11 = vertexIndex(cols, i + 1, j + 1)
      if ((i + j) % 2 === 0) {
        triangles[t++] = v00
        triangles[t++] = v10
        triangles[t++] = v11
        triangles[t++] = v00
        triangles[t++] = v11
        triangles[t++] = v01
      } else {
        triangles[t++] = v00
        triangles[t++] = v10
        triangles[t++] = v01
        triangles[t++] = v10
        triangles[t++] = v11
        triangles[t++] = v01
      }
    }
  }
  return { cols, rows, positions, triangles }
}

/** Triangles whose centroid falls outside a region — i.e. the mesh after excising it. */
export function trianglesOutside(
  mesh: TriangleMesh,
  insideRegion: (x: number, y: number) => boolean,
): Uint32Array {
  const { positions, triangles } = mesh
  const kept: number[] = []
  for (let t = 0; t < triangles.length; t += 3) {
    const a = triangles[t]! * 2
    const b = triangles[t + 1]! * 2
    const c = triangles[t + 2]! * 2
    const mx = (positions[a]! + positions[b]! + positions[c]!) / 3
    const my = (positions[a + 1]! + positions[b + 1]! + positions[c + 1]!) / 3
    if (!insideRegion(mx, my)) {
      kept.push(triangles[t]!, triangles[t + 1]!, triangles[t + 2]!)
    }
  }
  return Uint32Array.from(kept)
}

/** Convenience wrapper for the common circular defect. */
export function trianglesOutsideCircle(
  mesh: TriangleMesh,
  cx: number,
  cy: number,
  radiusMm: number,
): Uint32Array {
  const r2 = radiusMm * radiusMm
  return trianglesOutside(mesh, (x, y) => {
    const dx = x - cx
    const dy = y - cy
    return dx * dx + dy * dy <= r2
  })
}

// String keys stay injective for any Uint32 index (numeric packing would
// collide beyond 2^20 vertices); both callers run once at construction.
const edgeKey = (a: number, b: number): string =>
  a < b ? \`\${a},\${b}\` : \`\${b},\${a}\`

/** Undirected unique edges of a triangle list, as flat [a0,b0,a1,b1,...] pairs. */
export function uniqueEdges(triangles: Uint32Array): Uint32Array {
  const seen = new Set<string>()
  const edges: number[] = []
  for (let t = 0; t < triangles.length; t += 3) {
    for (let e = 0; e < 3; e += 1) {
      const a = triangles[t + e]!
      const b = triangles[t + ((e + 1) % 3)]!
      const key = edgeKey(a, b)
      if (!seen.has(key)) {
        seen.add(key)
        edges.push(Math.min(a, b), Math.max(a, b))
      }
    }
  }
  return Uint32Array.from(edges)
}

/** Edges that belong to exactly one triangle: the mesh boundary (outer border plus any hole rims). */
export function boundaryEdges(triangles: Uint32Array): Uint32Array {
  const count = new Map<string, [number, number, number]>()
  for (let t = 0; t < triangles.length; t += 3) {
    for (let e = 0; e < 3; e += 1) {
      const a = triangles[t + e]!
      const b = triangles[t + ((e + 1) % 3)]!
      const key = edgeKey(a, b)
      const entry = count.get(key)
      if (entry) entry[2] += 1
      else count.set(key, [Math.min(a, b), Math.max(a, b), 1])
    }
  }
  const edges: number[] = []
  for (const [a, b, n] of count.values()) {
    if (n === 1) edges.push(a, b)
  }
  return Uint32Array.from(edges)
}

/** Mask of vertices referenced by at least one triangle. */
export function activeVertices(triangles: Uint32Array, vertexCount: number): Uint8Array {
  const active = new Uint8Array(vertexCount)
  for (let t = 0; t < triangles.length; t += 1) {
    active[triangles[t]!] = 1
  }
  return active
}

/**
 * Signed area of triangle (a, b, c) in mm². Sign convention: positive for
 * counter-clockwise winding in the engine's layout frame (x right, y up).
 * createGrid emits every triangle CCW — e.g. (v00, v10, v11) sweeps right
 * then up — so a non-positive value marks a degenerate or inverted
 * (folded-over) triangle.
 */
export function signedArea(
  positions: ArrayLike<number>,
  a: number,
  b: number,
  c: number,
): number {
  const ax = positions[a * 2]!
  const ay = positions[a * 2 + 1]!
  const bx = positions[b * 2]!
  const by = positions[b * 2 + 1]!
  const cx = positions[c * 2]!
  const cy = positions[c * 2 + 1]!
  return 0.5 * ((bx - ax) * (cy - ay) - (by - ay) * (cx - ax))
}

/**
 * Number of triangles whose signed area is at or below \`minAreaMm2\`
 * (default 0: inverted or exactly degenerate). A positive threshold also
 * counts near-degenerate slivers.
 */
export function countInvertedTriangles(
  positions: ArrayLike<number>,
  triangles: Uint32Array,
  minAreaMm2 = 0,
): number {
  let count = 0
  for (let t = 0; t < triangles.length; t += 3) {
    if (signedArea(positions, triangles[t]!, triangles[t + 1]!, triangles[t + 2]!) <= minAreaMm2) {
      count += 1
    }
  }
  return count
}

export interface ConformResult {
  positions: Float32Array
  triangles: Uint32Array
  /**
   * Vertex chain lying on the path, in path order. Edge-connected except
   * across \`breaks\`: where the path crossed a hole in the mesh, the chain
   * jumps from the vertex where it left to the vertex where it came back.
   */
  chain: number[]
  /** Chain indices i such that chain[i] → chain[i + 1] crosses a hole. */
  breaks: number[]
}

type ConformCandidate =
  | { kind: 'snap'; score: number; v: number; x: number; y: number }
  | { kind: 'edge'; score: number; p: number; q: number; x: number; y: number }
  | { kind: 'inside'; score: number; t: number }

/**
 * Make the mesh conform to a polyline, so it can be cut or tagged exactly
 * along it. The path is walked triangle by triangle from its first point:
 * a vertex within \`snapMm\` of the path is moved onto it (never so far that
 * a triangle around it folds), and where the path crosses an edge between
 * two vertices that stay put, a vertex is inserted at the crossing and the
 * triangles sharing that edge are split. The chain returned is
 * edge-connected and lies on the path in path order — straight on any
 * grid, where a nearest-vertex chain stair-steps whenever the path runs
 * between rows. Where the path leaves the mesh (across a hole, or past the
 * border) the walk resumes at the first boundary edge the rest of the path
 * crosses, so a polygon drawn over an existing opening still conforms the
 * tissue on both sides of it; the jump is recorded in \`breaks\`.
 */
export function conformToPolyline(
  basePositions: Float32Array,
  baseTriangles: Uint32Array,
  path: number[],
  snapMm: number,
  fine = false,
): ConformResult {
  const pos: number[] = Array.from(basePositions)
  const tris: number[] = Array.from(baseTriangles)
  const MIN_AREA = fine ? 0.00001 : 0.02
  /** No inserted vertex sits closer than this to an existing one: the existing one is used instead (a hair off the path). */
  const MIN_EDGE = fine ? 0.01 : 0.1
  const EPS = 1e-9

  // Vertex → incident triangles, kept current through every split.
  const fans = new Map<number, Set<number>>()
  const link = (v: number, t: number): void => {
    let fan = fans.get(v)
    if (!fan) {
      fan = new Set<number>()
      fans.set(v, fan)
    }
    fan.add(t)
  }
  for (let t = 0; t < tris.length / 3; t += 1) {
    link(tris[t * 3]!, t)
    link(tris[t * 3 + 1]!, t)
    link(tris[t * 3 + 2]!, t)
  }
  const setTri = (t: number, a: number, b: number, c: number): void => {
    for (let k = 0; k < 3; k += 1) fans.get(tris[t * 3 + k]!)?.delete(t)
    tris[t * 3] = a
    tris[t * 3 + 1] = b
    tris[t * 3 + 2] = c
    link(a, t)
    link(b, t)
    link(c, t)
  }
  const addTri = (a: number, b: number, c: number): void => {
    const t = tris.length / 3
    tris.push(a, b, c)
    link(a, t)
    link(b, t)
    link(c, t)
  }
  const addVertex = (x: number, y: number): number => {
    const v = pos.length / 2
    pos.push(x, y)
    fans.set(v, new Set<number>())
    return v
  }
  const cross = (ax: number, ay: number, bx: number, by: number): number => ax * by - ay * bx
  const triArea = (a: number, b: number, c: number): number =>
    0.5 *
    cross(
      pos[b * 2]! - pos[a * 2]!,
      pos[b * 2 + 1]! - pos[a * 2 + 1]!,
      pos[c * 2]! - pos[a * 2]!,
      pos[c * 2 + 1]! - pos[a * 2 + 1]!,
    )
  /** Strictly inside triangle t (positive orientation), clear of its edges. */
  const inside = (t: number, x: number, y: number): boolean => {
    const a = tris[t * 3]!
    const b = tris[t * 3 + 1]!
    const c = tris[t * 3 + 2]!
    const tol = 1e-7
    const s1 = cross(pos[b * 2]! - pos[a * 2]!, pos[b * 2 + 1]! - pos[a * 2 + 1]!, x - pos[a * 2]!, y - pos[a * 2 + 1]!)
    const s2 = cross(pos[c * 2]! - pos[b * 2]!, pos[c * 2 + 1]! - pos[b * 2 + 1]!, x - pos[b * 2]!, y - pos[b * 2 + 1]!)
    const s3 = cross(pos[a * 2]! - pos[c * 2]!, pos[a * 2 + 1]! - pos[c * 2 + 1]!, x - pos[c * 2]!, y - pos[c * 2 + 1]!)
    return s1 > tol && s2 > tol && s3 > tol
  }
  /** Move v onto (x, y) unless a triangle around it would fold or thin out. */
  const tryMove = (v: number, x: number, y: number): boolean => {
    const x0 = pos[v * 2]!
    const y0 = pos[v * 2 + 1]!
    pos[v * 2] = x
    pos[v * 2 + 1] = y
    for (const t of fans.get(v) ?? []) {
      if (triArea(tris[t * 3]!, tris[t * 3 + 1]!, tris[t * 3 + 2]!) <= MIN_AREA) {
        pos[v * 2] = x0
        pos[v * 2 + 1] = y0
        return false
      }
    }
    return true
  }
  /** Insert a vertex at (x, y) on edge (u, w), splitting the triangles that share it. */
  const splitEdge = (u: number, w: number, x: number, y: number): number => {
    const n = addVertex(x, y)
    const shared: number[] = []
    for (const t of fans.get(u) ?? []) if (fans.get(w)?.has(t)) shared.push(t)
    for (const t of shared) {
      const a = tris[t * 3]!
      const b = tris[t * 3 + 1]!
      const c = tris[t * 3 + 2]!
      // Read the triangle cyclically from u: (u, p, q).
      const p = a === u ? b : b === u ? c : a
      const q = a === u ? c : b === u ? a : b
      if (p === w) {
        setTri(t, u, n, q)
        addTri(n, w, q)
      } else {
        setTri(t, u, p, n)
        addTri(n, p, w)
      }
    }
    return n
  }
  /** Insert a vertex at (x, y) inside triangle t, splitting it in three. */
  const splitTriangle = (t: number, x: number, y: number): number => {
    const n = addVertex(x, y)
    const a = tris[t * 3]!
    const b = tris[t * 3 + 1]!
    const c = tris[t * 3 + 2]!
    setTri(t, a, b, n)
    addTri(b, c, n)
    addTri(c, a, n)
    return n
  }
  /** A vertex at the path's first point: snapped, or inserted in a triangle or on the nearest edge. */
  const place = (x: number, y: number): number => {
    let bestV = -1
    let bestD = Infinity
    for (let v = 0; v < pos.length / 2; v += 1) {
      if (!fans.get(v)?.size) continue
      const d = Math.hypot(pos[v * 2]! - x, pos[v * 2 + 1]! - y)
      if (d < bestD) {
        bestD = d
        bestV = v
      }
    }
    if (bestV >= 0 && bestD <= snapMm && tryMove(bestV, x, y)) return bestV
    let edgeD = Infinity
    let edgeP = -1
    let edgeQ = -1
    let edgeX = 0
    let edgeY = 0
    for (let t = 0; t < tris.length / 3; t += 1) {
      if (inside(t, x, y)) return splitTriangle(t, x, y)
      for (let e = 0; e < 3; e += 1) {
        const p = tris[t * 3 + e]!
        const q = tris[t * 3 + ((e + 1) % 3)]!
        const px = pos[p * 2]!
        const py = pos[p * 2 + 1]!
        const ex = pos[q * 2]! - px
        const ey = pos[q * 2 + 1]! - py
        const len2 = ex * ex + ey * ey
        if (len2 < EPS) continue
        const r = Math.max(0, Math.min(1, ((x - px) * ex + (y - py) * ey) / len2))
        const qx = px + ex * r
        const qy = py + ey * r
        const d = Math.hypot(qx - x, qy - y)
        if (d < edgeD) {
          edgeD = d
          edgeP = p
          edgeQ = q
          edgeX = qx
          edgeY = qy
        }
      }
    }
    if (edgeP >= 0 && edgeD <= snapMm) {
      if (Math.hypot(edgeX - pos[edgeP * 2]!, edgeY - pos[edgeP * 2 + 1]!) < MIN_EDGE) return edgeP
      if (Math.hypot(edgeX - pos[edgeQ * 2]!, edgeY - pos[edgeQ * 2 + 1]!) < MIN_EDGE) return edgeQ
      return splitEdge(edgeP, edgeQ, edgeX, edgeY)
    }
    return -1
  }

  const chain: number[] = []
  const chainSet = new Set<number>()
  const breaks: number[] = []
  const pushChain = (v: number): void => {
    chain.push(v)
    chainSet.add(v)
  }
  /**
   * Collapse every edge shorter than MIN_EDGE: an inserted vertex that ended
   * up a hair from a neighbour (the cascade a vertex that would not move
   * can start) merges into it, never folding a triangle. Chain vertices
   * are kept over others, originals over inserted ones.
   */
  const collapseShortEdges = (): void => {
    const alias = new Map<number, number>()
    const resolve = (v: number): number => {
      while (alias.has(v)) v = alias.get(v)!
      return v
    }
    const area = (a: number, b: number, c: number): number =>
      0.5 *
      cross(
        pos[b * 2]! - pos[a * 2]!,
        pos[b * 2 + 1]! - pos[a * 2 + 1]!,
        pos[c * 2]! - pos[a * 2]!,
        pos[c * 2 + 1]! - pos[a * 2 + 1]!,
      )
    for (let round = 0; round < 6; round += 1) {
      let merged = false
      for (let t = 0; t < tris.length; t += 3) {
        for (let e = 0; e < 3; e += 1) {
          const a = resolve(tris[t + e]!)
          const b = resolve(tris[t + ((e + 1) % 3)]!)
          if (a === b) continue
          // Fine incision samples must survive until the local quality pass.
          // Keep the original cleanup for pre-existing remote source slivers.
          const minimum = fine && !chainSet.has(a) && !chainSet.has(b) ? .1 : MIN_EDGE
          if (Math.hypot(pos[a * 2]! - pos[b * 2]!, pos[a * 2 + 1]! - pos[b * 2 + 1]!) >= minimum) continue
          let keep = a
          let drop = b
          const aChain = chainSet.has(a)
          const bChain = chainSet.has(b)
          if ((bChain && !aChain) || (aChain === bChain && b < a)) {
            keep = b
            drop = a
          }
          // Only when every triangle that loses \`drop\` for \`keep\` stays open.
          let safe = true
          for (let u = 0; u < tris.length && safe; u += 3) {
            const va = resolve(tris[u]!)
            const vb = resolve(tris[u + 1]!)
            const vc = resolve(tris[u + 2]!)
            if (va !== drop && vb !== drop && vc !== drop) continue
            if (va === keep || vb === keep || vc === keep) continue // collapses away
            const na = va === drop ? keep : va
            const nb = vb === drop ? keep : vb
            const nc = vc === drop ? keep : vc
            if (area(na, nb, nc) <= EPS) safe = false
          }
          if (!safe) continue
          alias.set(drop, keep)
          merged = true
        }
      }
      if (!merged) break
    }
    if (alias.size === 0) return
    const kept: number[] = []
    for (let t = 0; t < tris.length; t += 3) {
      const a = resolve(tris[t]!)
      const b = resolve(tris[t + 1]!)
      const c = resolve(tris[t + 2]!)
      if (a !== b && b !== c && a !== c) kept.push(a, b, c)
    }
    tris.length = 0
    for (const v of kept) tris.push(v)
    // The chain follows the merges; a break stays with the vertex it follows.
    const breakAfter = new Set(breaks)
    const merged: Array<{ v: number; brk: boolean }> = []
    chain.forEach((v, i) => {
      const r = resolve(v)
      const last = merged[merged.length - 1]
      if (last && last.v === r) last.brk = last.brk || breakAfter.has(i)
      else merged.push({ v: r, brk: breakAfter.has(i) })
    })
    chain.length = 0
    breaks.length = 0
    merged.forEach((m, i) => {
      chain.push(m.v)
      if (m.brk && i < merged.length - 1) breaks.push(i)
    })
  }
  const finish = (): ConformResult => {
    collapseShortEdges()
    return {
      positions: Float32Array.from(pos),
      triangles: Uint32Array.from(tris),
      chain,
      breaks,
    }
  }
  if (path.length < 2) return finish()
  let cur = place(path[0]!, path[1]!)
  if (cur < 0) return finish()
  pushChain(cur)
  // Vertices a move would fold: left in place, the path inserts beside them.
  const unsnappable = new Set<number>()

  /** Boundary edges of the current triangulation (each once, either order). */
  const boundaryList = (): Array<[number, number]> => {
    const count = new Map<number, number>()
    const pair = new Map<number, [number, number]>()
    for (let t = 0; t < tris.length; t += 3) {
      for (let e = 0; e < 3; e += 1) {
        const a = tris[t + e]!
        const b = tris[t + ((e + 1) % 3)]!
        const key = Math.min(a, b) * 1048576 + Math.max(a, b)
        count.set(key, (count.get(key) ?? 0) + 1)
        if (!pair.has(key)) pair.set(key, [a, b])
      }
    }
    const out: Array<[number, number]> = []
    for (const [key, n] of count) if (n === 1) out.push(pair.get(key)!)
    return out
  }
  /**
   * The path has left the mesh at \`cur\`. Find where it comes back: the
   * first boundary edge crossed by the rest of the path — what remains of
   * segment kFrom, then the segments after it. A vertex is inserted at the
   * crossing; returns it with the index of the path point its segment runs
   * to, or null when the path never returns.
   */
  const reenter = (kFrom: number): { k: number; v: number } | null => {
    const boundary = boundaryList()
    let sx = pos[cur * 2]!
    let sy = pos[cur * 2 + 1]!
    for (let k = kFrom; k + 1 < path.length; k += 2) {
      const tx = path[k]!
      const ty = path[k + 1]!
      const dx = tx - sx
      const dy = ty - sy
      const len = Math.hypot(dx, dy)
      if (len > EPS) {
        let best: { s: number; p: number; q: number; r: number } | null = null
        for (const [p, q] of boundary) {
          if (k === kFrom && (p === cur || q === cur)) continue
          const px = pos[p * 2]!
          const py = pos[p * 2 + 1]!
          const ex = pos[q * 2]! - px
          const ey = pos[q * 2 + 1]! - py
          const den = cross(dx, dy, ex, ey)
          if (Math.abs(den) < EPS) continue
          const wx = px - sx
          const wy = py - sy
          const s = cross(wx, wy, ex, ey) / den
          const r = cross(wx, wy, dx, dy) / den
          if (s * len > 1e-3 && s <= 1 + EPS && r >= -EPS && r <= 1 + EPS) {
            if (!best || s < best.s) best = { s, p, q, r }
          }
        }
        if (best) {
          const px = pos[best.p * 2]!
          const py = pos[best.p * 2 + 1]!
          const ex = pos[best.q * 2]! - px
          const ey = pos[best.q * 2 + 1]! - py
          const edgeLen = Math.hypot(ex, ey)
          const onChain = chainSet.has(best.p) && chainSet.has(best.q)
          if (best.r * edgeLen < MIN_EDGE || (onChain && best.r <= 0.5)) return { k, v: best.p }
          if ((1 - best.r) * edgeLen < MIN_EDGE || onChain) return { k, v: best.q }
          return { k, v: splitEdge(best.p, best.q, px + ex * best.r, py + ey * best.r) }
        }
      }
      sx = tx
      sy = ty
    }
    return null
  }

  let k = 2
  segments: while (k + 1 < path.length) {
    const tx = path[k]!
    const ty = path[k + 1]!
    for (let guard = 0; guard < 4096; guard += 1) {
      const cx = pos[cur * 2]!
      const cy = pos[cur * 2 + 1]!
      const dx = tx - cx
      const dy = ty - cy
      const len = Math.hypot(dx, dy)
      if (len <= snapMm) {
        // The corner (or the end) is at hand. A neighbor already closer to it
        // takes it (a conformed corner shared with an excision, say);
        // otherwise cur lands on it if the mesh allows.
        let there = -1
        let thereD = len
        for (const t of fans.get(cur) ?? []) {
          for (let k = 0; k < 3; k += 1) {
            const v = tris[t * 3 + k]!
            if (v === cur || unsnappable.has(v)) continue
            const d = Math.hypot(pos[v * 2]! - tx, pos[v * 2 + 1]! - ty)
            if (d < thereD) {
              thereD = d
              there = v
            }
          }
        }
        if (len < MIN_EDGE) break // cur is the corner, within a hair
        if (there >= 0 && tryMove(there, tx, ty)) {
          pushChain(there)
          cur = there
        } else if (!tryMove(cur, tx, ty)) {
          // Neither can move onto the corner without folding: put a vertex
          // exactly on it, inside whichever fan triangle holds it.
          for (const t of fans.get(cur) ?? []) {
            if (inside(t, tx, ty)) {
              const n = splitTriangle(t, tx, ty)
              pushChain(n)
              cur = n
              break
            }
          }
        }
        break
      }
      const ux = dx / len
      const uy = dy / len
      const pick: { best: ConformCandidate | null } = { best: null }
      const consider = (c: ConformCandidate): void => {
        if (!pick.best || c.score < pick.best.score) pick.best = c
      }
      const seen = new Set<number>([cur])
      for (const t of fans.get(cur) ?? []) {
        const a = tris[t * 3]!
        const b = tris[t * 3 + 1]!
        const c = tris[t * 3 + 2]!
        // Read the triangle cyclically from cur: (cur, p, q); (p, q) is the far edge.
        const p = a === cur ? b : b === cur ? c : a
        const q = a === cur ? c : b === cur ? a : b
        if (inside(t, tx, ty)) consider({ kind: 'inside', score: 1, t })
        for (const v of [p, q]) {
          if (seen.has(v)) continue
          seen.add(v)
          // A corner can lie partway along an edge incident to cur. It is
          // neither strictly inside a fan triangle nor on its far edge.
          // Without this case the walker mistakes an ordinary grid-aligned
          // turn for leaving the mesh and truncates the remaining incision.
          const vx = pos[v * 2]! - cx
          const vy = pos[v * 2 + 1]! - cy
          const edgeLen = Math.hypot(vx, vy)
          const fraction = (dx * vx + dy * vy) / (edgeLen * edgeLen)
          if (!chainSet.has(v) && fraction > EPS && fraction < 1 - EPS
            && Math.abs(cross(dx, dy, vx, vy)) <= 1e-7 * edgeLen) {
            if ((1 - fraction) * edgeLen < MIN_EDGE) {
              consider({ kind: 'snap', score: 1, v, x: pos[v * 2]!, y: pos[v * 2 + 1]! })
            } else {
              consider({ kind: 'edge', score: 1, p: cur, q: v, x: cx + vx * fraction, y: cy + vy * fraction })
            }
          }
          if (unsnappable.has(v)) continue
          const along = vx * ux + vy * uy
          const off = Math.abs(cross(vx, vy, ux, uy))
          if (Math.hypot(pos[v * 2]! - tx, pos[v * 2 + 1]! - ty) <= snapMm) {
            consider({ kind: 'snap', score: 1 - snapMm / len, v, x: tx, y: ty })
          } else if (along > EPS && along < len && off <= snapMm) {
            consider({
              kind: 'snap',
              score: (along - snapMm) / len,
              v,
              x: cx + ux * along,
              y: cy + uy * along,
            })
          }
        }
        // Where the segment crosses the far edge.
        const px = pos[p * 2]!
        const py = pos[p * 2 + 1]!
        const ex = pos[q * 2]! - px
        const ey = pos[q * 2 + 1]! - py
        const den = cross(dx, dy, ex, ey)
        if (Math.abs(den) < EPS) continue
        const wx = px - cx
        const wy = py - cy
        const s = cross(wx, wy, ex, ey) / den
        const r = cross(wx, wy, dx, dy) / den
        if (s > EPS && s <= 1 + EPS && r >= -EPS && r <= 1 + EPS) {
          // A crossing within a hair of an endpoint takes that endpoint as it
          // stands (even one that declined to move): no sliver edge, and the
          // chain stays within MIN_EDGE of the path.
          const edgeLen = Math.hypot(ex, ey)
          // An edge joining two chain vertices is never split (the chain
          // must stay edge-connected, and the path is doubling back on
          // itself here, as in a narrow notch): the nearer end stands in.
          const onChain = chainSet.has(p) && chainSet.has(q)
          if (r * edgeLen < MIN_EDGE || (onChain && r <= 0.5)) consider({ kind: 'snap', score: s, v: p, x: px, y: py })
          else if ((1 - r) * edgeLen < MIN_EDGE || onChain) consider({ kind: 'snap', score: s, v: q, x: pos[q * 2]!, y: pos[q * 2 + 1]! })
          else consider({ kind: 'edge', score: s, p, q, x: px + ex * r, y: py + ey * r })
        }
      }
      const chosen = pick.best
      if (!chosen) {
        // The path leaves the mesh here: pick it up where it comes back.
        const back = reenter(k)
        if (!back) return finish()
        if (back.v !== cur) {
          breaks.push(chain.length - 1)
          pushChain(back.v)
          cur = back.v
        }
        if (back.k !== k) {
          k = back.k
          continue segments
        }
        continue
      }
      let next: number
      if (chosen.kind === 'snap') {
        const stays = pos[chosen.v * 2] === chosen.x && pos[chosen.v * 2 + 1] === chosen.y
        if (!stays && !tryMove(chosen.v, chosen.x, chosen.y)) {
          unsnappable.add(chosen.v)
          continue
        }
        next = chosen.v
      } else if (chosen.kind === 'edge') {
        next = splitEdge(chosen.p, chosen.q, chosen.x, chosen.y)
      } else {
        // The corner lies inside a triangle: split the nearest edge instead
        // when it is within reach, so no sliver is left beside the corner.
        const t = chosen.t
        let nearD = Infinity
        let nearP = -1
        let nearQ = -1
        let nearX = 0
        let nearY = 0
        for (let e = 0; e < 3; e += 1) {
          const p = tris[t * 3 + e]!
          const q = tris[t * 3 + ((e + 1) % 3)]!
          const px = pos[p * 2]!
          const py = pos[p * 2 + 1]!
          const ex = pos[q * 2]! - px
          const ey = pos[q * 2 + 1]! - py
          const len2 = ex * ex + ey * ey
          if (len2 < EPS) continue
          const r = Math.max(0.02, Math.min(0.98, ((tx - px) * ex + (ty - py) * ey) / len2))
          const d = Math.hypot(px + ex * r - tx, py + ey * r - ty)
          if (d < nearD) {
            nearD = d
            nearP = p
            nearQ = q
            nearX = px + ex * r
            nearY = py + ey * r
          }
        }
        if (nearD <= snapMm) {
          const dP = Math.hypot(nearX - pos[nearP * 2]!, nearY - pos[nearP * 2 + 1]!)
          const dQ = Math.hypot(nearX - pos[nearQ * 2]!, nearY - pos[nearQ * 2 + 1]!)
          const onChain = chainSet.has(nearP) && chainSet.has(nearQ)
          const pick = dP < MIN_EDGE || (onChain && dP <= dQ) ? nearP : dQ < MIN_EDGE || onChain ? nearQ : -1
          // The chosen end must be a step forward: never cur itself.
          if (pick >= 0 && pick !== cur) next = pick
          else if (pick === cur) next = splitTriangle(t, tx, ty)
          else next = splitEdge(nearP, nearQ, nearX, nearY)
        } else {
          next = splitTriangle(t, tx, ty)
        }
      }
      pushChain(next)
      cur = next
    }
    k += 2
  }
  return finish()
}

export interface IncisionResult {
  positions: Float32Array
  triangles: Uint32Array
  /** [original, duplicate] vertex pairs along the cut, in path order. */
  seam: Array<[number, number]>
  /**
   * The edge-connected vertex chain the mesh was cut along (vertex ids in
   * path order, before duplication); consecutive entries share a mesh edge.
   */
  chain: number[]
}

/**
 * Median edge length over a spread of triangles: the mesh's working scale,
 * robust to a few stretched or collapsed triangles along a snapped outline.
 */
export function typicalEdgeLength(positions: Float32Array, triangles: Uint32Array): number {
  const count = triangles.length / 3
  if (count === 0) return 1
  const stride = Math.max(1, Math.floor(count / 256))
  const lengths: number[] = []
  for (let t = 0; t < count; t += stride) {
    const a = triangles[t * 3]!
    const b = triangles[t * 3 + 1]!
    lengths.push(
      Math.hypot(positions[b * 2]! - positions[a * 2]!, positions[b * 2 + 1]! - positions[a * 2 + 1]!),
    )
  }
  lengths.sort((p, q) => p - q)
  const median = lengths[Math.floor(lengths.length / 2)]!
  return median > 0 ? median : 1
}

/**
 * Cut the mesh along a polyline: an INCISION, not an excision. The mesh is
 * first made to conform to the path (see conformToPolyline), so the cut runs
 * exactly along it; chain vertices are then duplicated and incident
 * triangles assigned to one lip or the other, so the tissue can separate
 * along the cut while staying connected everywhere else. Path endpoints stay
 * welded (the crack tip) unless they lie on an existing boundary — a cut
 * that reaches a free edge opens it — unless \`splitEnd\` is false, for a cut
 * whose far end lands on the corner of an excision and must stop there
 * rather than crack on into the tissue beyond. \`snapMm\` (default: 0.3 of
 * the mesh's typical edge length) is how far a vertex may be pulled onto
 * the path rather than inserting a new one beside it.
 */
export function cutIncision(
  basePositions: Float32Array,
  baseTriangles: Uint32Array,
  path: number[],
  snapMm?: number,
  options: { splitEnd?: boolean; precise?: boolean } = {},
): IncisionResult {
  const splitEnd = options.splitEnd ?? true
  const { positions, triangles, chain } = conformToPolyline(
    basePositions,
    baseTriangles,
    path,
    snapMm ?? 0.3 * typicalEdgeLength(basePositions, baseTriangles),
    options.precise,
  )
  const vertexCount = positions.length / 2
  const boundarySet = new Set<number>(boundaryEdges(triangles))
  if (chain.length < 2) {
    return { positions, triangles, seam: [], chain }
  }

  // Which chain vertices split: interiors always; endpoints only on boundary.
  const chainIndex = new Map<number, number>()
  chain.forEach((v, i) => chainIndex.set(v, i))
  const splits = chain.filter(
    (v, i) =>
      (i > 0 && i < chain.length - 1) || (boundarySet.has(v) && (i === 0 || splitEnd)),
  )
  if (splits.length === 0) return { positions, triangles, seam: [], chain }

  // Local tangent per chain vertex, for side classification.
  const tangent = (i: number): [number, number] => {
    const a = chain[Math.max(0, i - 1)]!
    const b = chain[Math.min(chain.length - 1, i + 1)]!
    return [
      positions[b * 2]! - positions[a * 2]!,
      positions[b * 2 + 1]! - positions[a * 2 + 1]!,
    ]
  }

  const grown = new Float32Array(positions.length + splits.length * 2)
  grown.set(positions)
  const duplicateOf = new Map<number, number>()
  splits.forEach((v, k) => {
    const dup = vertexCount + k
    duplicateOf.set(v, dup)
    grown[dup * 2] = positions[v * 2]!
    grown[dup * 2 + 1] = positions[v * 2 + 1]!
  })

  const newTriangles = triangles.slice()
  for (let t = 0; t < newTriangles.length; t += 3) {
    // Centroid from grown positions (valid for originals and duplicates).
    const cx =
      (grown[newTriangles[t]! * 2]! +
        grown[newTriangles[t + 1]! * 2]! +
        grown[newTriangles[t + 2]! * 2]!) /
      3
    const cy =
      (grown[newTriangles[t]! * 2 + 1]! +
        grown[newTriangles[t + 1]! * 2 + 1]! +
        grown[newTriangles[t + 2]! * 2 + 1]!) /
      3
    for (let e = 0; e < 3; e += 1) {
      const v = newTriangles[t + e]!
      const dup = duplicateOf.get(v)
      if (dup === undefined) continue
      const [tx, ty] = tangent(chainIndex.get(v)!)
      const side = tx * (cy - grown[v * 2 + 1]!) - ty * (cx - grown[v * 2]!)
      if (side > 0) newTriangles[t + e] = dup
    }
  }

  // A lip no triangle references would be an inactive vertex the seam still
  // points at (a phantom stitch target). An unused duplicate is simply
  // dropped from the seam; an unused original takes its duplicate's
  // triangles back, since nothing actually split there.
  const refs = new Uint32Array(grown.length / 2)
  for (let t = 0; t < newTriangles.length; t += 1) {
    const v = newTriangles[t]!
    refs[v] = refs[v]! + 1
  }
  const seam: Array<[number, number]> = []
  for (const v of splits) {
    const dup = duplicateOf.get(v)!
    if (refs[dup] === 0) continue
    if (refs[v] === 0) {
      for (let t = 0; t < newTriangles.length; t += 1) {
        if (newTriangles[t] === dup) newTriangles[t] = v
      }
      continue
    }
    seam.push([v, dup])
  }

  return { positions: grown, triangles: newTriangles, seam, chain }
}
`})),Ze,Qe=t((()=>{Ze=`import { createParticleSystem, DEFAULT_STEP, Solver } from './solver'
import type {
  AnchorConstraint,
  AreaConstraint,
  DistanceConstraint,
  ParticleSystem,
  StepOptions,
} from './types'

/**
 * Cross-section simulation: a transverse cut through the wound showing the
 * two tissue faces in depth — epidermis, dermis, subcutis — closed by a
 * suture whose thread path is modeled as constraints through the bites it
 * actually takes. Eversion and inversion EMERGE from where the path crosses
 * relative to the tissue's neutral axis, not from canned animation.
 *
 * Coordinates: x lateral (0 = wound center), z depth (0 = surface, positive
 * DOWN). Pure TypeScript; rendering exaggerates depth, physics does not.
 */

export type SectionTechnique =
  | 'simple'
  | 'buried-deep'
  | 'vertical-mattress'
  | 'subcuticular'
  | 'pulley'

export interface SectionParams {
  /** Lateral width of each tissue block. */
  blockWidthMm: number
  epidermisMm: number
  dermisMm: number
  subcutisMm: number
  cols: number
  rows: number
  /** Surface gap between the wound faces at build time. */
  gapMm: number
  /** Undermining extent at this station: releases base attachment near the faces. */
  underminedMm: number
}

export const DEFAULT_SECTION_PARAMS: SectionParams = {
  blockWidthMm: 16,
  epidermisMm: 0.5,
  dermisMm: 2.6,
  subcutisMm: 3,
  cols: 20,
  rows: 8,
  gapMm: 6,
  underminedMm: 0,
}

interface ThreadSegment extends DistanceConstraint {
  /** For rendering: whether this segment is part of the buried portion. */
  buried: boolean
}

/** A bite point in a technique path: lateral setback from the wound face and depth. */
interface Bite {
  side: 'L' | 'R'
  setbackMm: number
  depthMm: number
}

/** Thread paths per technique. \`loops\` are chained; each loop is tied end-to-end. */
function techniquePath(
  technique: SectionTechnique,
  biteMm: number,
  dermisDeep: number,
): { loops: Bite[][]; complianceScale: number } {
  const near = Math.max(0.8, biteMm * 0.5)
  const far = biteMm * 1.6
  switch (technique) {
    case 'simple':
    case 'pulley':
      return {
        loops: [
          [
            { side: 'L', setbackMm: biteMm, depthMm: 0.2 },
            { side: 'L', setbackMm: biteMm * 0.45, depthMm: dermisDeep },
            { side: 'R', setbackMm: biteMm * 0.45, depthMm: dermisDeep },
            { side: 'R', setbackMm: biteMm, depthMm: 0.2 },
          ],
        ],
        complianceScale: technique === 'pulley' ? 0.45 : 1,
      }
    case 'buried-deep':
      // Set-back buried dermal: heel deep, tip superficial, knot stays deep.
      return {
        loops: [
          [
            { side: 'L', setbackMm: biteMm, depthMm: dermisDeep },
            { side: 'L', setbackMm: 0.7, depthMm: 0.9 },
            { side: 'R', setbackMm: 0.7, depthMm: 0.9 },
            { side: 'R', setbackMm: biteMm, depthMm: dermisDeep },
          ],
        ],
        complianceScale: 1,
      }
    case 'vertical-mattress':
      // One continuous thread, the true needle path: far-far deep pass, back
      // through near-near superficial, tied on the SAME side — the wound is
      // never bridged across the surface, which is exactly why it everts.
      return {
        loops: [
          [
            { side: 'L', setbackMm: far, depthMm: 0.2 },
            { side: 'L', setbackMm: far * 0.55, depthMm: dermisDeep },
            { side: 'R', setbackMm: far * 0.55, depthMm: dermisDeep },
            { side: 'R', setbackMm: far, depthMm: 0.2 },
            { side: 'R', setbackMm: near, depthMm: 0.15 },
            { side: 'R', setbackMm: near * 0.8, depthMm: 0.9 },
            { side: 'L', setbackMm: near * 0.8, depthMm: 0.9 },
            { side: 'L', setbackMm: near, depthMm: 0.15 },
          ],
        ],
        complianceScale: 1,
      }
    case 'subcuticular':
      // Running intradermal thread crosses this section once, at mid-dermis.
      return {
        loops: [
          [
            { side: 'L', setbackMm: 0.8, depthMm: 1.4 },
            { side: 'R', setbackMm: 0.8, depthMm: 1.4 },
          ],
        ],
        complianceScale: 1,
      }
  }
}

export class SectionModel {
  readonly params: SectionParams
  readonly ps: ParticleSystem
  readonly triangles: Uint32Array
  /** Depth zone per vertex: 0 epidermis, 1 dermis, 2 subcutis. */
  readonly zones: Uint8Array
  /** Wound-face vertex indices (left block inner column, right block inner column). */
  readonly leftFace: Uint32Array
  readonly rightFace: Uint32Array

  private readonly edgeCons: DistanceConstraint[] = []
  private readonly areaCons: AreaConstraint[] = []
  private readonly anchorCons: AnchorConstraint[] = []
  private threadCons: ThreadSegment[] = []
  private threadPathVerts: number[][] = []
  private readonly solver = new Solver()
  /**
   * Coupling to the plan view: the deeps placed top-down pull the wound faces
   * together, modeled as tension-only links between the faces whose rest
   * length IS the live top-down gap. They pull, never push, so a section
   * stitch may close tighter than the gross closure.
   */
  private readonly grossClosure: DistanceConstraint[] = []
  private currentGapMm: number
  /** Bumped when the thrown stitch changes, for renderers. */
  threadVersion = 0

  constructor(params: SectionParams) {
    this.params = params
    this.currentGapMm = params.gapMm
    const { blockWidthMm, cols, rows, gapMm } = params
    const depthMm = params.epidermisMm + params.dermisMm + params.subcutisMm
    const perBlock = (cols + 1) * (rows + 1)

    const positions = new Float32Array(perBlock * 2 * 2)
    const zones = new Uint8Array(perBlock * 2)
    const write = (block: 0 | 1, i: number, j: number): number => {
      const v = block * perBlock + j * (cols + 1) + i
      const z = (j / rows) * depthMm
      // Inner column (i = cols for left, i = 0 mirrored for right) sits at the face.
      const lateral = (i / cols) * blockWidthMm
      const x =
        block === 0
          ? -(gapMm / 2) - (blockWidthMm - lateral)
          : gapMm / 2 + lateral
      positions[v * 2] = x
      positions[v * 2 + 1] = z
      zones[v] =
        z <= params.epidermisMm ? 0 : z <= params.epidermisMm + params.dermisMm ? 1 : 2
      return v
    }
    for (let block = 0 as 0 | 1; block <= 1; block = (block + 1) as 0 | 1) {
      for (let j = 0; j <= rows; j += 1) {
        for (let i = 0; i <= cols; i += 1) write(block, i, j)
      }
    }
    this.zones = zones

    // Triangles per block (alternating diagonals).
    const tris: number[] = []
    for (let block = 0; block <= 1; block += 1) {
      const base = block * perBlock
      for (let j = 0; j < rows; j += 1) {
        for (let i = 0; i < cols; i += 1) {
          const v00 = base + j * (cols + 1) + i
          const v10 = v00 + 1
          const v01 = v00 + (cols + 1)
          const v11 = v01 + 1
          if ((i + j) % 2 === 0) tris.push(v00, v10, v11, v00, v11, v01)
          else tris.push(v00, v10, v01, v10, v11, v01)
        }
      }
    }
    this.triangles = Uint32Array.from(tris)
    this.ps = createParticleSystem(positions)

    // Edges with zone stiffness and horizontal resting pre-strain (skin is
    // under lateral tension; that is what holds the wound faces apart).
    const compliancePerZone = [5e-6, 1.2e-5, 9e-5]
    const prePerZone = [0.05, 0.05, 0.005]
    const seen = new Set<string>()
    for (let t = 0; t < this.triangles.length; t += 3) {
      for (let e = 0; e < 3; e += 1) {
        const a = this.triangles[t + e]!
        const b = this.triangles[t + ((e + 1) % 3)]!
        const key = a < b ? \`\${a},\${b}\` : \`\${b},\${a}\`
        if (seen.has(key)) continue
        seen.add(key)
        const dx = positions[b * 2]! - positions[a * 2]!
        const dz = positions[b * 2 + 1]! - positions[a * 2 + 1]!
        const len = Math.hypot(dx, dz)
        const zone = Math.max(zones[a]!, zones[b]!)
        const horizontal = (dx * dx) / (len * len)
        const pre = prePerZone[zone]! * horizontal
        this.edgeCons.push({
          a,
          b,
          rest: len * (1 - pre),
          compliance: compliancePerZone[zone]!,
        })
      }
    }

    // Tissue is (nearly) incompressible — fat included, it is mostly water.
    // Squeezed tissue must extrude, the mechanism that makes correct bites
    // EVERT the wound edges.
    const areaCompliancePerZone = [5e-7, 5e-7, 5e-7]
    for (let t = 0; t < this.triangles.length; t += 3) {
      const a = this.triangles[t]!
      const b = this.triangles[t + 1]!
      const c = this.triangles[t + 2]!
      const area =
        0.5 *
        ((positions[b * 2]! - positions[a * 2]!) * (positions[c * 2 + 1]! - positions[a * 2 + 1]!) -
          (positions[b * 2 + 1]! - positions[a * 2 + 1]!) * (positions[c * 2]! - positions[a * 2]!))
      const zone = Math.max(zones[a]!, zones[b]!, zones[c]!)
      this.areaCons.push({ a, b, c, restArea: area, compliance: areaCompliancePerZone[zone]! })
    }

    // Pins and anchors: outer columns pinned (tissue continues), base rows
    // softly anchored to fascia unless undermined near the face.
    const facesL: number[] = []
    const facesR: number[] = []
    for (let block = 0; block <= 1; block += 1) {
      const base = block * perBlock
      for (let j = 0; j <= rows; j += 1) {
        const outerV = base + j * (cols + 1) + (block === 0 ? 0 : cols)
        this.ps.invMass[outerV] = 0
        const faceV = base + j * (cols + 1) + (block === 0 ? cols : 0)
        ;(block === 0 ? facesL : facesR).push(faceV)
      }
      for (let i = 0; i <= cols; i += 1) {
        const v = base + rows * (cols + 1) + i
        if (this.ps.invMass[v] === 0) continue
        const x = positions[v * 2]!
        const faceX = block === 0 ? -gapMm / 2 : gapMm / 2
        const fromFace = Math.abs(x - faceX)
        this.anchorCons.push({
          p: v,
          x,
          y: positions[v * 2 + 1]!,
          compliance: 6e-4,
          enabled: fromFace > params.underminedMm,
        })
      }
    }
    this.leftFace = Uint32Array.from(facesL)
    this.rightFace = Uint32Array.from(facesR)

    // Face contact: the wound faces may touch but never interpenetrate.
    // Without this, a strong stitch pulls the faces through each other and
    // vents the very compression that should evert the edges.
    for (let j = 0; j <= rows; j += 1) {
      this.grossClosure.push({
        a: this.leftFace[j]!,
        b: this.rightFace[j]!,
        rest: 0.35,
        compliance: 5e-7,
        pushOnly: true,
      })
    }

    // Gross-closure links spanning the dermis thickness.
    const dz = depthMm / rows
    const usedRows = new Set<number>()
    for (const fraction of [0.3, 0.6, 0.9]) {
      const z = params.epidermisMm + params.dermisMm * fraction
      const row = Math.min(rows - 1, Math.max(1, Math.round(z / dz)))
      if (usedRows.has(row)) continue
      usedRows.add(row)
      this.grossClosure.push({
        a: this.leftFace[row]!,
        b: this.rightFace[row]!,
        rest: params.gapMm,
        compliance: 8e-6,
        unilateral: true,
      })
    }
  }

  /** Track the live top-down gap by retargeting the gross-closure links. */
  setGap(gapMm: number): void {
    const clamped = Math.max(0.5, gapMm)
    if (Math.abs(clamped - this.currentGapMm) < 0.05) return
    for (const link of this.grossClosure) link.rest = clamped
    this.currentGapMm = clamped
  }

  /** Throw (or re-throw) the section's stitch. Replaces any existing one. */
  throwStitch(technique: SectionTechnique, biteMm: number, tightness: number): void {
    this.threadCons = []
    this.threadPathVerts = []
    const dermisDeep = this.params.epidermisMm + this.params.dermisMm * 0.75
    const { loops, complianceScale } = techniquePath(technique, biteMm, dermisDeep)
    for (const loop of loops) {
      const verts = loop.map((bite) => this.biteVertex(bite))
      this.threadPathVerts.push(verts)
      const links: Array<[number, number]> = []
      for (let k = 0; k + 1 < verts.length; k += 1) links.push([verts[k]!, verts[k + 1]!])
      // Tie the loop closed (the knot) unless it is a single crossing thread.
      if (verts.length > 2) links.push([verts[0]!, verts[verts.length - 1]!])
      for (const [a, b] of links) {
        if (a === b) continue
        const dx = this.ps.pos[b * 2]! - this.ps.pos[a * 2]!
        const dz = this.ps.pos[b * 2 + 1]! - this.ps.pos[a * 2 + 1]!
        const len = Math.hypot(dx, dz)
        const buried =
          this.ps.pos[a * 2 + 1]! > this.params.epidermisMm &&
          this.ps.pos[b * 2 + 1]! > this.params.epidermisMm
        this.threadCons.push({
          a,
          b,
          rest: len * Math.max(0.1, Math.min(1, tightness)) * 0.4,
          compliance: 3e-6 * complianceScale,
          unilateral: true,
          buried,
        })
      }
    }
    this.threadVersion += 1
  }

  removeStitch(): void {
    if (this.threadCons.length === 0) return
    this.threadCons = []
    this.threadPathVerts = []
    this.threadVersion += 1
  }

  /** Vertex nearest a bite point, chosen in CURRENT coordinates. */
  private biteVertex(bite: Bite): number {
    const faceX = (bite.side === 'L' ? -1 : 1) * (this.currentGapMm / 2)
    const targetX = faceX + (bite.side === 'L' ? -bite.setbackMm : bite.setbackMm)
    const targetZ = bite.depthMm
    const { cols, rows } = this.params
    const perBlock = (cols + 1) * (rows + 1)
    const from = bite.side === 'L' ? 0 : perBlock
    const to = bite.side === 'L' ? perBlock : perBlock * 2
    let best = from
    let bestDist = Infinity
    for (let v = from; v < to; v += 1) {
      if (this.ps.invMass[v] === 0) continue
      const dx = this.ps.pos[v * 2]! - targetX
      const dz = this.ps.pos[v * 2 + 1]! - targetZ
      const d = dx * dx + dz * dz
      if (d < bestDist) {
        bestDist = d
        best = v
      }
    }
    return best
  }

  step(opts: StepOptions = DEFAULT_STEP): void {
    this.solver.step(
      this.ps,
      [this.edgeCons, this.grossClosure, this.threadCons],
      this.anchorCons,
      opts,
      this.areaCons,
    )
  }

  relax(frames: number, opts: StepOptions = DEFAULT_STEP): void {
    for (let f = 0; f < frames; f += 1) this.step(opts)
  }

  /** Thread polyline(s) in current coordinates, for rendering. */
  threadPaths(): Array<{ points: number[]; buried: boolean }> {
    return this.threadPathVerts.map((verts) => {
      const points: number[] = []
      let anyBuried = false
      for (const v of verts) {
        points.push(this.ps.pos[v * 2]!, this.ps.pos[v * 2 + 1]!)
        if (this.ps.pos[v * 2 + 1]! > this.params.epidermisMm + 0.4) anyBuried = true
      }
      return { points, buried: anyBuried }
    })
  }

  /**
   * Eversion in mm: the height of the wound-edge RIDGE — the raised (or
   * sunken) lip a surgeon actually sees — measured as the peak surface rise
   * within the periwound zone relative to the far-field surface plane.
   * Positive = everted, negative = the wound zone sits in a groove (inverted).
   */
  eversionMm(): number {
    const { cols, rows } = this.params
    const perBlock = (cols + 1) * (rows + 1)
    let ridge = -Infinity
    for (let block = 0; block <= 1; block += 1) {
      for (let i = 0; i <= cols; i += 1) {
        const v = block * perBlock + i
        if (this.ps.invMass[v] === 0) continue
        const x = this.ps.pos[v * 2]!
        if (Math.abs(x) >= 8) continue
        const rise = 0 - this.ps.pos[v * 2 + 1]!
        if (rise > ridge) ridge = rise
      }
    }
    return Number.isFinite(ridge) ? ridge : 0
  }

  /** Distance between the wound faces at the surface and at deep dermis. */
  apposition(): { surfaceMm: number; dermisMm: number } {
    const { rows } = this.params
    const gapAtRow = (row: number): number => {
      const l = this.leftFace[row]!
      const r = this.rightFace[row]!
      return this.ps.pos[r * 2]! - this.ps.pos[l * 2]!
    }
    const deepRow = Math.min(rows, Math.round(rows * 0.5))
    return { surfaceMm: gapAtRow(0), dermisMm: gapAtRow(deepRow) }
  }
}
`})),$e,et=t((()=>{$e=`import { defectOutline, inPolygon, insideDefect } from './defect'
import { activeVertices, boundaryEdges, conformToPolyline, createGrid, cutIncision, uniqueEdges, vertexIndex, type TriangleMesh } from './mesh'
import { createParticleSystem, DEFAULT_STEP, Solver } from './solver'
import { TissueVolume, type TissueVolumeOptions } from './tissueVolume'
import type {
  AnchorConstraint,
  AreaConstraint,
  DefectSpec,
  DistanceConstraint,
  ParticleSystem,
  SkinParams,
  StepOptions,
  SutureInfo,
  SutureKind,
} from './types'

// Anisotropy ratio (complianceAcross/complianceAlong = 3) and pre-strain
// ratio (3:1) follow published ranges: stiffness along vs across Langer
// lines ≈2.3–5.1 (Ottenio PMID 25455608; Khatyr PMID 15059176), excised-skin
// retraction ratio ≈2.3–3 (Deroy PMID 27868283). Absolute scales remain
// illustrative pending faculty review (docs/research/calibration-sources.md).
export const DEFAULT_SKIN_PARAMS: Omit<SkinParams, 'rstlAngleRad' | 'defect'> = {
  widthMm: 160,
  heightMm: 120,
  cols: 96,
  rows: 72,
  complianceAlong: 8e-6,
  complianceAcross: 2.4e-5,
  preStrainAlong: 0.06,
  preStrainAcross: 0.02,
  anchorCompliance: 6e-4,
  // Sutures are far stiffer than skin; a soft suture reads as falsely tense.
  sutureCompliance: 4e-6,
  underminedBeyondMm: 0,
}

/** A tied stitch approximates to near-contact; deeps sit slightly apart (dermal bulk). */
const DEEP_REST_MM = 0.8
const TOP_REST_MM = 0.3

interface SutureConstraint extends DistanceConstraint {
  id: number
  kind: SutureKind
  /** Part of a continuous run (running/subcuticular) — drawn as one thread. */
  chained: boolean
  /** Rest length once tied (the closed state). */
  restFull: number
  /** Gap between the bites when placed (the open state); closure progress lerps between the two. */
  restOpen: number
  /** An approximating tie between visible stitches: mechanics only, never drawn or listed. */
  hidden: boolean
}

/** In-memory display pose for a recorded rehearsal, not a saved patient case. */
export interface SkinPose {
  positions: Float64Array
  volumePositions?: Float64Array
  sutures: SutureConstraint[]
  underminingMm: number
  flapReleased: boolean
}

interface GrabState {
  /** Temporary pointer anchors: one per grabbed vertex, offsets preserved. */
  anchors: AnchorConstraint[]
  offsets: Float64Array
}

/** Outline samples for a defect: finer than the mesh, never fewer than a smooth circle needs. */
function defectSegments(defect: DefectSpec, spacingMm: number): number {
  const perimeter =
    defect.kind === 'fusiform'
      ? 2 * Math.hypot(defect.lengthMm, defect.widthMm)
      : 2 * Math.PI * defect.radiusMm
  return Math.max(32, Math.min(160, Math.round(perimeter / (0.5 * spacingMm))))
}

export class SkinModel {
  /** Opt-in volumetric mechanics; existing planar cases retain their solver. */
  tissueVolume: TissueVolume | null = null
  readonly params: SkinParams
  readonly mesh: TriangleMesh
  readonly triangles: Uint32Array
  readonly edges: Uint32Array
  readonly boundary: Uint32Array
  /** Vertices on the wound rim (hole boundary + incision lips, excluding the outer border). */
  readonly woundVerts: Uint32Array
  /**
   * Vertices on the ORIGINAL defect rim only, in cyclic order: the
   * pre-incision rim minus every vertex an incision split (no incision lips).
   */
  readonly defectRimVerts: Uint32Array
  /**
   * Rim vertices backed partly off the analytic outline so that no triangle
   * folds over after snapping (diagnostic; normally empty or a handful).
   */
  readonly rimRepairedVerts: Uint32Array
  /** [original, duplicate] lip pairs of every incision, in path order. */
  readonly seams: Array<[number, number]> = []
  /** The same pairs grouped per incision, in incision order. */
  readonly seamsByIncision: Array<Array<[number, number]>> = []
  /**
   * Every incision's whole chain as [lip, lip] pairs in path order — split
   * vertices as [original, duplicate], welded ones (the crack tip) as
   * [v, v] — so a renderer can floor the entire cut, tip included.
   */
  readonly lipsByIncision: Array<Array<[number, number]>> = []
  /** Free-margin vertices in left-to-right order (empty when no free margin). */
  readonly marginVerts: Uint32Array
  /** Each extra excision's rim in order around its polygon (pre-cut vertex ids). */
  readonly excisionRims: number[][] = []
  readonly active: Uint8Array
  readonly underminedMask: Uint8Array
  readonly ps: ParticleSystem

  /** Bumped whenever the suture set changes, so renderers can rebuild lazily. */
  sutureVersion = 0

  private readonly edgeCons: DistanceConstraint[] = []
  private readonly anchorCons: AnchorConstraint[] = []
  private readonly sutureCons: SutureConstraint[] = []
  /** Temporary assisted apposition of wound edges, separate from placed sutures. */
  private readonly approximationCons: Array<DistanceConstraint & { open: number; closed: number }> = []
  private readonly orientationCons: AreaConstraint[] = []
  private readonly solver = new Solver()
  private readonly grabs = new Map<number, GrabState>()
  private nextGrabId = 1
  /** anchorCons plus any live grab anchors; rebuilt when grabs change. */
  private combinedAnchors: AnchorConstraint[] | null = null
  private nextSutureId = 1
  /** 0 = sutures placed but slack at their open gap, 1 = tied down to their rest length. */
  private closureProgress = 1
  private flapReleased = true
  /** Live undermining extent (changeable without rebuilding the model). */
  private underminingLiveMm: number
  /** Bumped when undermining changes, so renderers can rebuild the ring. */
  undermineVersion = 0
  /** Incident-edge counts per vertex, built lazily for tension averaging. */
  private edgeDegree: Float32Array | null = null
  /** Periwound collar (within ~4mm of the rim), built lazily for the peak cue. */
  private periwoundVerts: Uint32Array | null = null
  /** Per-edge resting strain from pre-tension, aligned with edgeCons order. */
  private edgeBaselineStrain: Float32Array
  /** Per-edge stress weight (stiff fibers carry more force per unit strain). */
  private edgeStressWeight: Float32Array

  constructor(params: SkinParams) {
    this.params = params
    this.underminingLiveMm = params.underminedBeyondMm
    const { widthMm, heightMm, cols, rows, defect } = params
    const grid = createGrid(widthMm, heightMm, cols, rows)
    const gridVertexCount = (cols + 1) * (rows + 1)
    const holes = params.holes ?? []
    const excisions = params.excisions ?? []
    const outline = params.outline
    const spacingMm = widthMm / cols
    let workingPositions: Float32Array = grid.positions
    let workingTriangles: Uint32Array = grid.triangles

    /**
     * Make the mesh conform to a closed polygon and drop the triangles on
     * one side of it, so the edge is the drawn curve rather than stair-steps
     * of the grid. Returns the rim in order around the polygon (the closing
     * step returns to the first vertex, listed once).
     */
    const carve = (polygon: number[], dropInside: boolean): number[] => {
      const closed = [...polygon, polygon[0]!, polygon[1]!]
      const conformed = conformToPolyline(workingPositions, workingTriangles, closed, 0.3 * spacingMm)
      workingPositions = conformed.positions
      const kept: number[] = []
      for (let t = 0; t < conformed.triangles.length; t += 3) {
        const a = conformed.triangles[t]!
        const b = conformed.triangles[t + 1]!
        const c = conformed.triangles[t + 2]!
        const mx = (workingPositions[a * 2]! + workingPositions[b * 2]! + workingPositions[c * 2]!) / 3
        const my =
          (workingPositions[a * 2 + 1]! + workingPositions[b * 2 + 1]! + workingPositions[c * 2 + 1]!) / 3
        if (inPolygon(polygon, mx, my) !== dropInside) kept.push(a, b, c)
      }
      workingTriangles = Uint32Array.from(kept)
      return conformed.chain.filter((v, k) => k === 0 || v !== conformed.chain[0])
    }

    const isGridBorder = (v: number): boolean => {
      if (v >= gridVertexCount) return false // inserted and duplicated vertices are never border
      const i = v % (cols + 1)
      const j = Math.floor(v / (cols + 1))
      return i === 0 || j === 0 || i === cols || j === rows
    }

    // The sheet's outline (a face's head contour): exact, and its cut edge
    // is the pinned border.
    const outerSet = new Set<number>()
    if (outline && outline.length >= 6) {
      for (const v of carve(outline, false)) outerSet.add(v)
    }
    const isBorder = (v: number): boolean => isGridBorder(v) || outerSet.has(v)

    // Openings (eyes, mouth): exact holes whose rims are free margins, held
    // at the pinned points (canthi, commissures).
    const holeMarginSet = new Set<number>()
    const pinnedSet = new Set<number>()
    for (const hole of holes) {
      if (hole.points.length < 6) continue
      const rim = carve(hole.points, true)
      const pinRadius = hole.pinRadiusMm ?? 2.5
      const pinned = hole.pinned ?? []
      for (const v of rim) {
        const x = workingPositions[v * 2]!
        const y = workingPositions[v * 2 + 1]!
        let pin = false
        for (let k = 0; k + 1 < pinned.length; k += 2) {
          if (Math.hypot(pinned[k]! - x, pinned[k + 1]! - y) <= pinRadius) pin = true
        }
        if (pin) pinnedSet.add(v)
        else holeMarginSet.add(v)
      }
    }

    // The defect: the mesh conforms to its outline (sampled finer than the
    // mesh) and the inside is carved out, so the rim IS the drawn curve —
    // the same exact cut as the head outline and the openings — and a flap
    // incision that starts on the rim starts exactly on it.
    let rimOrder: number[] = []
    const rimRepaired = new Set<number>()
    if (defect) {
      const outlinePolygon = defectOutline(defect, 0, defectSegments(defect, spacingMm))
      rimOrder = carve(outlinePolygon, true).filter(
        (v) => !isBorder(v) && !holeMarginSet.has(v) && !pinnedSet.has(v),
      )
    }
    this.rimRepairedVerts = Uint32Array.from(rimRepaired)

    // Extra excisions (Burow's triangles): exact holes whose rims stay
    // stitchable wound edges, so an incision that ends on one of their
    // corners ends exactly there.
    for (const polygon of excisions) {
      if (polygon.length < 6) continue
      this.excisionRims.push(carve(polygon, true))
    }

    // Flap design lines: split the mesh along each incision. A cut starts on
    // the defect rim and opens it; its far end is the crack tip (or an
    // excision's corner) and stays welded to the tissue beyond.
    for (const incision of params.incisions ?? []) {
      const cut = cutIncision(workingPositions, workingTriangles, incision.points, 0.3 * spacingMm, {
        splitEnd: false,
      })
      workingPositions = cut.positions
      workingTriangles = cut.triangles
      this.seams.push(...cut.seam)
      this.seamsByIncision.push(cut.seam)
      const dupOf = new Map<number, number>(cut.seam)
      this.lipsByIncision.push(cut.chain.map((v) => [v, dupOf.get(v) ?? v] as [number, number]))
    }

    this.mesh = { cols, rows, positions: workingPositions, triangles: workingTriangles }
    this.triangles = workingTriangles
    this.edges = uniqueEdges(this.triangles)
    this.boundary = boundaryEdges(this.triangles)
    this.active = activeVertices(this.triangles, workingPositions.length / 2)

    // Wound rim = boundary vertices that are not on the outer border (defect
    // rim, every extra excision's rim, every incision lip — all stitchable).
    const woundSet = new Set<number>()
    if (defect || this.seams.length > 0 || this.excisionRims.length > 0) {
      for (let e = 0; e < this.boundary.length; e += 1) {
        const v = this.boundary[e]!
        if (!isBorder(v) && !holeMarginSet.has(v) && !pinnedSet.has(v)) woundSet.add(v)
      }
    }
    this.woundVerts = Uint32Array.from(woundSet)

    // The original defect rim alone (for the wound-bed fill and templates):
    // the pre-incision rim minus every vertex an incision split — a lip
    // belongs to the incision, not the defect, and duplicates never qualify.
    const seamVerts = new Set<number>()
    for (const [orig, dup] of this.seams) {
      seamVerts.add(orig)
      seamVerts.add(dup)
    }
    const rimOnly: number[] = []
    for (const v of rimOrder) {
      if (v < gridVertexCount && !seamVerts.has(v) && this.active[v]) rimOnly.push(v)
    }
    this.defectRimVerts = Uint32Array.from(rimOnly)

    this.ps = createParticleSystem(this.mesh.positions)
    this.underminedMask = new Uint8Array(this.ps.count)

    // Free-margin vertices: the top or bottom border minus its (pinned)
    // corners — a lid margin above the cheek held at the canthi, or a brow /
    // alar rim / vermilion below the panel, distortable in between.
    const marginSet = new Set<number>()
    if (params.freeMargin === 'top' || params.freeMargin === 'bottom') {
      const j = params.freeMargin === 'top' ? rows : 0
      for (let i = 1; i < cols; i += 1) {
        const v = vertexIndex(cols, i, j)
        if (this.active[v]) marginSet.add(v)
      }
    }
    for (const v of holeMarginSet) if (this.active[v]) marginSet.add(v)
    this.marginVerts = Uint32Array.from(marginSet)

    // The patch continues beyond the simulated window: pin the border —
    // except free-margin vertices, which stay movable on support anchors.
    for (let v = 0; v < this.ps.count; v += 1) {
      if (!this.active[v] || pinnedSet.has(v) || (isBorder(v) && !marginSet.has(v))) {
        this.ps.invMass[v] = 0
      }
    }

    // Edge constraints with direction-dependent stiffness and pre-strain.
    const cosR = Math.cos(params.rstlAngleRad)
    const sinR = Math.sin(params.rstlAngleRad)
    const layout = this.mesh.positions
    const edgeCount = this.edges.length / 2
    this.edgeBaselineStrain = new Float32Array(edgeCount)
    this.edgeStressWeight = new Float32Array(edgeCount)
    for (let e = 0; e < this.edges.length; e += 2) {
      const a = this.edges[e]!
      const b = this.edges[e + 1]!
      const dx = layout[b * 2]! - layout[a * 2]!
      const dy = layout[b * 2 + 1]! - layout[a * 2 + 1]!
      const len = Math.sqrt(dx * dx + dy * dy)
      // cos^2 of the angle between the edge and the RSTL direction — the
      // panel's, or the field's at the edge midpoint.
      let cR = cosR
      let sR = sinR
      if (params.fieldAt) {
        const f = params.fieldAt(
          (layout[a * 2]! + layout[b * 2]!) / 2,
          (layout[a * 2 + 1]! + layout[b * 2 + 1]!) / 2,
        )
        cR = Math.cos(f.rstlAngleRad)
        sR = Math.sin(f.rstlAngleRad)
      }
      const along = (dx * cR + dy * sR) / len
      const c2 = along * along
      const compliance =
        params.complianceAcross + (params.complianceAlong - params.complianceAcross) * c2
      const preStrain = params.preStrainAcross + (params.preStrainAlong - params.preStrainAcross) * c2
      // Resting strain the pre-tension holds this edge at, and how much a
      // unit of extra strain costs relative to the soft (across-RSTL) axis:
      // strain in a stiff fiber carries proportionally more force.
      this.edgeBaselineStrain[e / 2] = preStrain / (1 - preStrain)
      this.edgeStressWeight[e / 2] = params.complianceAcross / compliance
      this.edgeCons.push({ a, b, rest: len * (1 - preStrain), compliance })
    }

    // Deep-tissue anchors; undermining releases them around the defect.
    // Free-margin vertices instead get stiffer structural-support anchors
    // (tarsus/canthal analog) that undermining never releases.
    const marginCompliance = params.marginAnchorCompliance ?? params.anchorCompliance / 8
    for (let v = 0; v < this.ps.count; v += 1) {
      if (!this.active[v] || this.ps.invMass[v] === 0) continue
      const x = layout[v * 2]!
      const y = layout[v * 2 + 1]!
      const isMargin = marginSet.has(v)
      let undermined = false
      if (!isMargin) {
        if (defect && params.underminedBeyondMm > 0) {
          undermined = insideDefect(defect, x, y, params.underminedBeyondMm)
        }
        // Flap elevation: the template's undermining polygon is always released.
        if (!undermined && params.underminePolygon) {
          undermined = inPolygon(params.underminePolygon, x, y)
        }
      }
      this.underminedMask[v] = undermined ? 1 : 0
      this.anchorCons.push({
        p: v,
        x,
        y,
        throughThickness: isMargin,
        compliance: isMargin
          ? marginCompliance
          : params.anchorCompliance * (params.fieldAt ? params.fieldAt(x, y).laxity : 1),
        enabled: !undermined,
      })
    }
  }

  /**
   * Peak pull of the free margin toward the wound vs. rest, in mm (0 with no
   * free margin): downward for a margin on top (the ectropion signal), upward
   * for one on the bottom (brow lift, alar-rim or vermilion retraction).
   */
  marginDisplacementMm(): number {
    if (this.marginVerts.length === 0) return 0
    const layout = this.mesh.positions
    const side = this.params.freeMargin
    let peak = 0
    for (const v of this.marginVerts) {
      const dx = this.ps.pos[v * 2]! - layout[v * 2]!
      const dy = this.ps.pos[v * 2 + 1]! - layout[v * 2 + 1]!
      // Toward the wound for a top/bottom margin; any direction for an opening's rim.
      const pull = side === 'top' ? -dy : side === 'bottom' ? dy : Math.hypot(dx, dy)
      if (pull > peak) peak = pull
    }
    return peak
  }

  step(opts: StepOptions = DEFAULT_STEP): void {
    if (this.tissueVolume) {
      this.tissueVolume.step(this.anchorCons, [...this.grabs.values()].flatMap((g) => g.anchors), this.approximationCons, this.sutureCons, opts)
      const xyz = this.tissueVolume.positions
      for (let v = 0; v < this.ps.count; v++) {
        this.ps.pos[v * 2] = xyz[v * 3]!
        this.ps.pos[v * 2 + 1] = xyz[v * 3 + 1]!
      }
      return
    }
    if (!this.combinedAnchors) {
      this.combinedAnchors = [...this.anchorCons]
      for (const grab of this.grabs.values()) this.combinedAnchors.push(...grab.anchors)
    }
    this.solver.step(this.ps, [this.edgeCons, this.approximationCons, this.sutureCons], this.combinedAnchors, opts, this.orientationCons)
  }

  enableTissueVolume(options: TissueVolumeOptions): void {
    if (this.tissueVolume) return
    this.tissueVolume = new TissueVolume(this.mesh.positions, this.triangles, this.ps.invMass, this.edgeCons, options)
  }

  /** Run whole frames synchronously (tests, warm-up). */
  relax(frames: number, opts: StepOptions = DEFAULT_STEP): void {
    for (let f = 0; f < frames; f += 1) this.step(opts)
  }

  get sutures(): readonly SutureConstraint[] {
    return this.sutureCons
  }

  /** Skin-fiber constraints in \`edges\` order (read-only view for diagnostics and tests). */
  get edgeConstraints(): readonly DistanceConstraint[] {
    return this.edgeCons
  }

  /** Assisted positioning across every paired cut; both banks remain free to move. */
  beginEdgeApproximation(pairs: readonly (readonly [number, number])[], gapMm = 0.6): void {
    this.tissueVolume?.setBankContacts(pairs)
    this.approximationCons.length = 0
    const seen = new Set<string>()
    for (const [a, b] of pairs) {
      const key = a < b ? \`\${a}/\${b}\` : \`\${b}/\${a}\`
      if (a === b || !this.active[a] || !this.active[b] || seen.has(key)) continue
      seen.add(key)
      const open = Math.hypot(this.ps.pos[b * 2]! - this.ps.pos[a * 2]!, this.ps.pos[b * 2 + 1]! - this.ps.pos[a * 2 + 1]!)
      this.approximationCons.push({ a, b, open, closed: Math.min(open, gapMm), rest: open,
        compliance: this.params.sutureCompliance, unilateral: true })
    }
  }

  setEdgeApproximation(progress: number): void {
    const t = Math.min(1, Math.max(0, progress))
    for (const con of this.approximationCons) con.rest = con.open + (con.closed - con.open) * t
  }

  endEdgeApproximation(): void {
    this.approximationCons.length = 0
  }

  /** A numerical orientation guard for planar rehearsals, not a skin-volume model. */
  enableOrientationGuard(): void {
    if (this.orientationCons.length) return
    const p = this.mesh.positions
    for (let k = 0; k < this.triangles.length; k += 3) {
      const a = this.triangles[k]!, b = this.triangles[k + 1]!, c = this.triangles[k + 2]!
      const area = ((p[b * 2]! - p[a * 2]!) * (p[c * 2 + 1]! - p[a * 2 + 1]!) -
        (p[b * 2 + 1]! - p[a * 2 + 1]!) * (p[c * 2]! - p[a * 2]!)) / 2
      if (Math.abs(area) < 1e-9) continue
      this.orientationCons.push({ a, b: area > 0 ? b : c, c: area > 0 ? c : b,
        restArea: Math.abs(area) * 0.05, compliance: 0, minimum: true })
    }
  }

  addSuture(
    a: number,
    b: number,
    kind: SutureKind = 'top',
    options: { complianceScale?: number; chained?: boolean; hidden?: boolean } = {},
  ): number | null {
    if (a === b || !this.active[a] || !this.active[b]) return null
    // A suture between two pinned vertices could never move anything.
    if (this.ps.invMass[a] === 0 && this.ps.invMass[b] === 0) return null
    for (const s of this.sutureCons) {
      if ((s.a === a && s.b === b) || (s.a === b && s.b === a)) return null
    }
    const id = this.nextSutureId
    this.nextSutureId += 1
    const restFull = kind === 'deep' ? DEEP_REST_MM : TOP_REST_MM
    const gap = Math.hypot(
      this.ps.pos[b * 2]! - this.ps.pos[a * 2]!,
      this.ps.pos[b * 2 + 1]! - this.ps.pos[a * 2 + 1]!,
    )
    const restOpen = Math.max(restFull, gap)
    this.sutureCons.push({
      id,
      kind,
      chained: options.chained ?? false,
      hidden: options.hidden ?? false,
      a,
      b,
      rest: restOpen + (restFull - restOpen) * this.closureProgress,
      restFull,
      restOpen,
      // e.g. a pulley stitch multiplies mechanical advantage: lower compliance.
      compliance: this.params.sutureCompliance * (options.complianceScale ?? 1),
      unilateral: true,
    })
    this.sutureVersion += 1
    return id
  }

  /** Layout-space distance from a vertex to the nearest wound-rim vertex. */
  rimDistanceMm(v: number): number {
    if (this.woundVerts.length === 0) return Infinity
    const layout = this.mesh.positions
    const x = layout[v * 2]!
    const y = layout[v * 2 + 1]!
    let best = Infinity
    for (const rim of this.woundVerts) {
      const dx = layout[rim * 2]! - x
      const dy = layout[rim * 2 + 1]! - y
      const d = dx * dx + dy * dy
      if (d < best) best = d
    }
    return Math.sqrt(best)
  }

  removeSuture(id: number): void {
    const index = this.sutureCons.findIndex((s) => s.id === id)
    if (index >= 0) {
      this.sutureCons.splice(index, 1)
      this.sutureVersion += 1
    }
  }

  clearSutures(): void {
    if (this.sutureCons.length === 0) return
    this.sutureCons.length = 0
    this.sutureVersion += 1
  }

  sutureInfo(): SutureInfo[] {
    const { pos } = this.ps
    const tension = this.sutureCons.length > 0 ? this.vertexTension() : null
    return this.sutureCons.map((s) => {
      const dx = pos[s.b * 2]! - pos[s.a * 2]!
      const dy = pos[s.b * 2 + 1]! - pos[s.a * 2 + 1]!
      const len = Math.sqrt(dx * dx + dy * dy)
      // Peak strain within a small disc around the stitch: the rim itself goes
      // slack once approximated, while the surrounding sheet takes the load.
      let tissueTension = 0
      if (tension) {
        const mx = (pos[s.a * 2]! + pos[s.b * 2]!) / 2
        const my = (pos[s.a * 2 + 1]! + pos[s.b * 2 + 1]!) / 2
        const radius2 = 4 * 4
        for (let v = 0; v < this.ps.count; v += 1) {
          if (!this.active[v]) continue
          const vx = pos[v * 2]! - mx
          const vy = pos[v * 2 + 1]! - my
          if (vx * vx + vy * vy <= radius2 && tension[v]! > tissueTension) {
            tissueTension = tension[v]!
          }
        }
      }
      return {
        id: s.id,
        kind: s.kind,
        a: s.a,
        b: s.b,
        elongationMm: Math.max(0, len - s.rest),
        tissueTension,
        hidden: s.hidden,
      }
    })
  }

  /**
   * Residual epidermal gap: mean distance from each wound-rim vertex to the
   * nearest rim vertex across the wound (on the other side of the defect's
   * long axis). Near zero once the edges are approximated.
   */
  woundGapMm(axisRad: number): number {
    if (this.woundVerts.length < 4) return 0
    const cos = Math.cos(axisRad)
    const sin = Math.sin(axisRad)
    const layout = this.mesh.positions
    const defect = this.params.defect
    if (!defect) return 0
    const upper: number[] = []
    const lower: number[] = []
    for (const v of this.woundVerts) {
      const w =
        -(layout[v * 2]! - defect.x) * sin + (layout[v * 2 + 1]! - defect.y) * cos
      ;(w >= 0 ? upper : lower).push(v)
    }
    if (upper.length === 0 || lower.length === 0) return 0
    const { pos } = this.ps
    let sum = 0
    for (const v of upper) {
      let best = Infinity
      for (const u of lower) {
        const dx = pos[u * 2]! - pos[v * 2]!
        const dy = pos[u * 2 + 1]! - pos[v * 2 + 1]!
        const d = dx * dx + dy * dy
        if (d < best) best = d
      }
      sum += Math.sqrt(best)
    }
    return sum / upper.length
  }

  /**
   * Tension per vertex as EXCESS STRESS over the resting pre-tension: each
   * incident edge contributes its strain beyond baseline, weighted by fiber
   * stiffness (a stiff along-RSTL fiber carries far more force per unit
   * stretch than a lax across-RSTL one — closing against the lines must read
   * hot even though the stiff fibers barely elongate). Intact resting skin
   * reads ~0 by construction. Mean over incident edges keeps the field smooth.
   */
  vertexTension(out?: Float32Array): Float32Array {
    const tension = out ?? new Float32Array(this.ps.count)
    tension.fill(0)
    if (!this.edgeDegree) {
      this.edgeDegree = new Float32Array(this.ps.count)
      for (const con of this.edgeCons) {
        this.edgeDegree[con.a] = this.edgeDegree[con.a]! + 1
        this.edgeDegree[con.b] = this.edgeDegree[con.b]! + 1
      }
    }
    const { pos } = this.ps
    for (let k = 0; k < this.edgeCons.length; k += 1) {
      const con = this.edgeCons[k]!
      if (con.rest < 1e-6) continue
      const dx = pos[con.b * 2]! - pos[con.a * 2]!
      const dy = pos[con.b * 2 + 1]! - pos[con.a * 2 + 1]!
      const dz = this.tissueVolume ? this.tissueVolume.positions[con.b * 3 + 2]! - this.tissueVolume.positions[con.a * 3 + 2]! : 0
      const strain = (Math.sqrt(dx * dx + dy * dy + dz * dz) - con.rest) / con.rest
      const excess = (strain - this.edgeBaselineStrain[k]!) * this.edgeStressWeight[k]!
      if (excess <= 0) continue
      tension[con.a] = tension[con.a]! + excess
      tension[con.b] = tension[con.b]! + excess
    }
    for (let v = 0; v < this.ps.count; v += 1) {
      const degree = this.edgeDegree[v]!
      if (degree > 0) tension[v] = tension[v]! / degree
    }
    return tension
  }

  /**
   * Peak tension in the periwound collar (within ~4 mm of the rim in layout
   * space). Closure hotspots live in that sheet, not on the rim itself, which
   * goes slack as the edges approximate.
   */
  /**
   * Peak COMPRESSION excess in the periwound collar: tissue squeezed below
   * its resting strain, weighted by fiber stiffness. This is the standing-
   * cone (dog-ear) signal — bunched tissue at the wound poles.
   */
  peakWoundCompression(): number {
    if (this.woundVerts.length === 0) return 0
    this.peakWoundTension() // ensures the collar cache exists
    const compression = new Float32Array(this.ps.count)
    const { pos } = this.ps
    for (let k = 0; k < this.edgeCons.length; k += 1) {
      const con = this.edgeCons[k]!
      if (con.rest < 1e-6) continue
      const dx = pos[con.b * 2]! - pos[con.a * 2]!
      const dy = pos[con.b * 2 + 1]! - pos[con.a * 2 + 1]!
      const strain = (Math.sqrt(dx * dx + dy * dy) - con.rest) / con.rest
      const excess = (this.edgeBaselineStrain[k]! - strain) * this.edgeStressWeight[k]!
      if (excess <= 0) continue
      compression[con.a] = compression[con.a]! + excess
      compression[con.b] = compression[con.b]! + excess
    }
    let peak = 0
    for (const v of this.periwoundVerts ?? []) {
      const degree = this.edgeDegree?.[v] ?? 0
      if (degree > 0 && compression[v]! / degree > peak) peak = compression[v]! / degree
    }
    return peak
  }

  peakWoundTension(): number {
    if (this.woundVerts.length === 0) return 0
    if (!this.periwoundVerts) {
      const layout = this.mesh.positions
      const collarRadius2 = 4 * 4
      const collar: number[] = []
      for (let v = 0; v < this.ps.count; v += 1) {
        if (!this.active[v]) continue
        for (const rim of this.woundVerts) {
          const dx = layout[v * 2]! - layout[rim * 2]!
          const dy = layout[v * 2 + 1]! - layout[rim * 2 + 1]!
          if (dx * dx + dy * dy <= collarRadius2) {
            collar.push(v)
            break
          }
        }
      }
      this.periwoundVerts = Uint32Array.from(collar)
    }
    const tension = this.vertexTension()
    let peak = 0
    for (const v of this.periwoundVerts) {
      if (tension[v]! > peak) peak = tension[v]!
    }
    return peak
  }

  /**
   * Nearest pickable vertex within maxDistMm of (x, y), or -1.
   * woundOnly restricts to the wound rim (suture placement); otherwise any
   * active, movable vertex qualifies (tissue grabbing).
   */
  nearestVertex(x: number, y: number, maxDistMm: number, woundOnly = false): number {
    const { pos, invMass } = this.ps
    let best = -1
    let bestDist = maxDistMm * maxDistMm
    const consider = (v: number): void => {
      const dx = pos[v * 2]! - x
      const dy = pos[v * 2 + 1]! - y
      const d2 = dx * dx + dy * dy
      if (d2 < bestDist) {
        bestDist = d2
        best = v
      }
    }
    if (woundOnly) {
      for (const v of this.woundVerts) consider(v)
    } else {
      for (let v = 0; v < this.ps.count; v += 1) {
        if (this.active[v] && invMass[v] !== 0) consider(v)
      }
    }
    return best
  }

  /**
   * Start a soft area grab: every movable vertex within radiusMm is tethered
   * to the pointer through an anchor whose stiffness falls off toward the
   * rim of the contact patch — skin deforms as a smooth dome, not a spike.
   * Returns a grab id, or -1 if nothing grabbable was in reach.
   */
  beginGrab(x: number, y: number, radiusMm = 6): number {
    const { pos, invMass } = this.ps
    const anchors: AnchorConstraint[] = []
    const offsets: number[] = []
    const r2 = radiusMm * radiusMm
    for (let v = 0; v < this.ps.count; v += 1) {
      if (!this.active[v] || invMass[v] === 0) continue
      const dx = pos[v * 2]! - x
      const dy = pos[v * 2 + 1]! - y
      const d2 = dx * dx + dy * dy
      if (d2 > r2) continue
      // Raised-cosine falloff: firm at the center, gentle at the edge.
      const weight = 0.5 * (1 + Math.cos((Math.sqrt(d2) / radiusMm) * Math.PI))
      if (weight < 0.12) continue
      anchors.push({
        p: v,
        x: pos[v * 2]!,
        y: pos[v * 2 + 1]!,
        compliance: 2e-6 / weight,
        enabled: true,
      })
      offsets.push(dx, dy)
    }
    if (anchors.length === 0) return -1
    const id = this.nextGrabId
    this.nextGrabId += 1
    this.grabs.set(id, { anchors, offsets: Float64Array.from(offsets) })
    this.combinedAnchors = null
    return id
  }

  moveGrab(id: number, x: number, y: number, z?: number): void {
    const grab = this.grabs.get(id)
    if (!grab) return
    for (let k = 0; k < grab.anchors.length; k += 1) {
      grab.anchors[k]!.x = x + grab.offsets[k * 2]!
      grab.anchors[k]!.y = y + grab.offsets[k * 2 + 1]!
      if (z !== undefined) grab.anchors[k]!.z = z
    }
  }

  endGrab(id: number): void {
    if (this.grabs.delete(id)) this.combinedAnchors = null
  }

  /** Change undermining live — sutures and the current deformation survive. */
  setUndermining(mm: number): void {
    if (mm === this.underminingLiveMm) return
    this.underminingLiveMm = mm
    this.updateUndermining()
  }

  /** Separate making the cuts from releasing the template's deep attachments. */
  setFlapReleased(released: boolean): void {
    if (released === this.flapReleased) return
    this.flapReleased = released
    this.updateUndermining()
  }

  private updateUndermining(): void {
    const mm = this.underminingLiveMm
    this.undermineVersion += 1
    const defect = this.params.defect
    const marginSet = new Set(this.marginVerts)
    for (const anchor of this.anchorCons) {
      let undermined = false
      if (!marginSet.has(anchor.p)) {
        if (defect && mm > 0) {
          undermined = insideDefect(defect, anchor.x, anchor.y, mm)
        }
        if (!undermined && this.flapReleased && this.params.underminePolygon) {
          undermined = inPolygon(this.params.underminePolygon, anchor.x, anchor.y)
        }
      }
      this.underminedMask[anchor.p] = undermined ? 1 : 0
      anchor.enabled = !undermined
    }
  }

  get underminingMm(): number {
    return this.underminingLiveMm
  }

  /**
   * Scrub the closure: every suture's rest length runs from the gap it was
   * placed across (0) to its tied length (1), so the skin can be watched
   * moving into place — and back.
   */
  setClosureProgress(t: number): void {
    const clamped = Math.min(1, Math.max(0, t))
    if (clamped === this.closureProgress) return
    this.closureProgress = clamped
    for (const s of this.sutureCons) s.rest = s.restOpen + (s.restFull - s.restOpen) * clamped
  }

  /** Tighten one group while previously placed stitches keep carrying their load. */
  setSutureProgress(ids: readonly number[], progress: number): void {
    const t = Math.min(1, Math.max(0, progress))
    const selected = new Set(ids)
    for (const s of this.sutureCons) {
      if (selected.has(s.id)) s.rest = s.restOpen + (s.restFull - s.restOpen) * t
    }
  }

  capturePose(): SkinPose {
    return {
      positions: this.ps.pos.slice(),
      ...(this.tissueVolume ? { volumePositions: this.tissueVolume.positions.slice() } : {}),
      sutures: this.sutureCons.map((s) => ({ ...s })),
      underminingMm: this.underminingLiveMm,
      flapReleased: this.flapReleased,
    }
  }

  /** Display a recorded pose with simulation paused; no integration on a scrub. */
  applyPose(pose: SkinPose): void {
    if (pose.positions.length !== this.ps.pos.length) throw new Error('Pose belongs to a different mesh')
    if (this.tissueVolume && !pose.volumePositions) throw new Error('A volume pose is required for this tissue model')
    if (this.tissueVolume && pose.volumePositions) this.tissueVolume.restore(pose.volumePositions)
    const topologyChanged = pose.sutures.length !== this.sutureCons.length ||
      pose.sutures.some((s, i) => s.id !== this.sutureCons[i]?.id)
    this.ps.pos.set(pose.positions)
    this.ps.prev.set(pose.positions)
    this.ps.vel.fill(0)
    this.sutureCons.length = 0
    this.sutureCons.push(...pose.sutures.map((s) => ({ ...s })))
    this.nextSutureId = Math.max(0, ...pose.sutures.map((s) => s.id)) + 1
    if (topologyChanged) this.sutureVersion += 1
    this.setUndermining(pose.underminingMm)
    this.setFlapReleased(pose.flapReleased)
  }

  get closure(): number {
    return this.closureProgress
  }

  /**
   * Wound gap at a station along the long axis (t in 0..1 tip-to-tip):
   * the closest upper-to-lower rim distance within a small band around the
   * station. Feeds the cross-section view's gross-closure coupling.
   */
  gapAtStation(t: number): number {
    const defect = this.params.defect
    if (!defect || this.woundVerts.length < 4) return 0
    const axis = this.params.defect!.kind === 'fusiform'
      ? (this.params.defect as { angleRad: number }).angleRad
      : this.params.rstlAngleRad
    const cos = Math.cos(axis)
    const sin = Math.sin(axis)
    const layout = this.mesh.positions
    interface RimPoint {
      v: number
      s: number
      w: number
    }
    const rim: RimPoint[] = []
    let sMin = Infinity
    let sMax = -Infinity
    for (const v of this.woundVerts) {
      const px = layout[v * 2]! - defect.x
      const py = layout[v * 2 + 1]! - defect.y
      const s = px * cos + py * sin
      const w = -px * sin + py * cos
      rim.push({ v, s, w })
      if (s < sMin) sMin = s
      if (s > sMax) sMax = s
    }
    const sT = sMin + Math.min(1, Math.max(0, t)) * (sMax - sMin)
    const { pos } = this.ps
    for (const band of [3, 6, 12]) {
      const upper = rim.filter((p) => p.w >= 0 && Math.abs(p.s - sT) <= band)
      const lower = rim.filter((p) => p.w < 0 && Math.abs(p.s - sT) <= band)
      if (upper.length === 0 || lower.length === 0) continue
      let best = Infinity
      for (const u of upper) {
        for (const l of lower) {
          const dx = pos[u.v * 2]! - pos[l.v * 2]!
          const dy = pos[u.v * 2 + 1]! - pos[l.v * 2 + 1]!
          const d = dx * dx + dy * dy
          if (d < best) best = d
        }
      }
      return Math.sqrt(best)
    }
    return this.woundGapMm(axis)
  }

  /** Extent of the wound rim along an axis given by angle (radians), in mm. */
  woundExtent(angleRad: number): number {
    if (this.woundVerts.length === 0) return 0
    const c = Math.cos(angleRad)
    const s = Math.sin(angleRad)
    let min = Infinity
    let max = -Infinity
    const { pos } = this.ps
    for (const v of this.woundVerts) {
      const proj = pos[v * 2]! * c + pos[v * 2 + 1]! * s
      if (proj < min) min = proj
      if (proj > max) max = proj
    }
    return max - min
  }
}

/** Index helper re-exported for callers that need grid coordinates. */
export { vertexIndex }
`})),tt,nt=t((()=>{tt=`import { defectOutline, inPolygon } from './defect'
import type { SkinParams } from './types'

export interface SkinDomainIssue {
  kind: 'invalid-geometry' | 'outside-skin' | 'opening'
  path: string
  openingIndex?: number
}
export interface SkinDomainFit { fits: boolean; issues: SkinDomainIssue[] }
type Point = readonly [number, number]
const TOLERANCE = 1e-7

function edges(points: number[], closed: boolean): Array<[Point, Point]> {
  const result: Array<[Point, Point]> = []
  for (let i = 0; i < points.length - (closed ? 0 : 2); i += 2) {
    const j = (i + 2) % points.length
    result.push([[points[i]!, points[i + 1]!], [points[j]!, points[j + 1]!]])
  }
  return result
}
function distance(p: Point, a: Point, b: Point): number {
  const dx = b[0] - a[0], dy = b[1] - a[1]
  const t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1)))
  return Math.hypot(p[0] - a[0] - dx * t, p[1] - a[1] - dy * t)
}
function intersects(a: Point, b: Point, c: Point, d: Point): boolean {
  const side = (p: Point, q: Point, r: Point): number => (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])
  return (side(a, b, c) * side(a, b, d) < 0 && side(c, d, a) * side(c, d, b) < 0)
    || distance(a, c, d) <= TOLERANCE || distance(b, c, d) <= TOLERANCE
    || distance(c, a, b) <= TOLERANCE || distance(d, a, b) <= TOLERANCE
}

/** Geometric admission only: these boundaries describe this model, not clinical suitability. */
export function assessSkinDomain(params: SkinParams): SkinDomainFit {
  const issues: SkinDomainIssue[] = []
  const defect = params.defect
  const validDefect = !defect || (Number.isFinite(defect.x) && Number.isFinite(defect.y)
    && (defect.kind === 'fusiform'
      ? Number.isFinite(defect.lengthMm) && Number.isFinite(defect.widthMm) && Number.isFinite(defect.angleRad)
        && defect.lengthMm >= defect.widthMm && defect.widthMm > 0
      : Number.isFinite(defect.radiusMm) && defect.radiusMm > 0))
  if (!validDefect || !(params.widthMm > 0 && params.heightMm > 0) || !Number.isFinite(params.widthMm + params.heightMm)) {
    return { fits: false, issues: [{ kind: 'invalid-geometry', path: 'defect' }] }
  }
  const box = [-params.widthMm / 2, -params.heightMm / 2, params.widthMm / 2, -params.heightMm / 2,
    params.widthMm / 2, params.heightMm / 2, -params.widthMm / 2, params.heightMm / 2]
  const domains = [box, ...(params.outline ? [params.outline] : [])].map((points) => ({ points, edges: edges(points, true) }))
  const holes = (params.holes ?? []).map((hole) => ({ points: hole.points, edges: edges(hole.points, true) }))
  const paths = [
    ...(defect ? [{ name: 'defect', points: defectOutline(defect), closed: true }] : []),
    ...(params.incisions ?? []).map((cut, i) => ({ name: \`incision-\${i}\`, points: cut.points, closed: false })),
    ...(params.excisions ?? []).map((points, i) => ({ name: \`excision-\${i}\`, points, closed: true })),
  ]
  for (const path of paths) {
    if (path.points.length < (path.closed ? 6 : 4) || path.points.length % 2 || path.points.some((v) => !Number.isFinite(v))) {
      issues.push({ kind: 'invalid-geometry', path: path.name }); continue
    }
    const segments = edges(path.points, path.closed)
    // Test a circular defect analytically, including intersections between outline samples.
    const circle = path.name === 'defect' && defect && defect.kind !== 'fusiform' ? defect : null
    const center: Point = circle ? [circle.x, circle.y] : [path.points[0]!, path.points[1]!]
    const outside = domains.some((domain) => !inPolygon(domain.points, ...center)
      || (circle ? domain.edges.some(([a, b]) => distance(center, a, b) <= circle.radiusMm + TOLERANCE)
        : segments.some(([a, b]) => !inPolygon(domain.points, ...a) || domain.edges.some(([c, d]) => intersects(a, b, c, d)))))
    if (outside) issues.push({ kind: 'outside-skin', path: path.name })
    holes.forEach((hole, openingIndex) => {
      const overlap = circle
        ? inPolygon(hole.points, ...center) || hole.edges.some(([a, b]) => distance(center, a, b) <= circle.radiusMm + TOLERANCE)
        : segments.some(([a, b]) => inPolygon(hole.points, ...a) || hole.edges.some(([c, d]) => intersects(a, b, c, d)))
          || (path.closed && inPolygon(path.points, hole.points[0]!, hole.points[1]!))
      if (overlap) issues.push({ kind: 'opening', path: path.name, openingIndex })
    })
  }
  return { fits: issues.length === 0, issues }
}
`})),rt,it=t((()=>{rt=`import type {
  AnchorConstraint,
  AreaConstraint,
  DistanceConstraint,
  ParticleSystem,
  StepOptions,
} from './types'

export function createParticleSystem(positions: ArrayLike<number>): ParticleSystem {
  const count = positions.length / 2
  const pos = Float64Array.from(positions as ArrayLike<number>)
  return {
    count,
    pos,
    prev: pos.slice(),
    vel: new Float64Array(count * 2),
    invMass: new Float64Array(count).fill(1),
  }
}

export const DEFAULT_STEP: StepOptions = {
  dt: 1 / 60,
  substeps: 5,
  iterations: 8,
  damping: 0.9,
  maxSpeed: 400,
}

/**
 * XPBD (extended position-based dynamics) solver specialized for 2D
 * quasi-static tissue: no gravity, heavy velocity damping, and a speed clamp
 * so topology changes settle instead of ringing. Deterministic: fixed
 * iteration order, no randomness, no wall-clock dependence.
 */
export class Solver {
  private lambdas: Float64Array[] = []
  private anchorLambda = new Float64Array(0)
  private areaLambda = new Float64Array(0)

  step(
    ps: ParticleSystem,
    distanceGroups: readonly (readonly DistanceConstraint[])[],
    anchors: readonly AnchorConstraint[],
    opts: StepOptions = DEFAULT_STEP,
    areas: readonly AreaConstraint[] = [],
  ): void {
    const { pos, prev, vel, invMass, count } = ps
    const h = opts.dt / opts.substeps
    const invH = 1 / h
    const h2 = h * h

    while (this.lambdas.length < distanceGroups.length) {
      this.lambdas.push(new Float64Array(0))
    }
    for (let g = 0; g < distanceGroups.length; g += 1) {
      if (this.lambdas[g]!.length < distanceGroups[g]!.length) {
        this.lambdas[g] = new Float64Array(distanceGroups[g]!.length)
      }
    }
    if (this.anchorLambda.length < anchors.length) {
      this.anchorLambda = new Float64Array(anchors.length)
    }
    if (this.areaLambda.length < areas.length) {
      this.areaLambda = new Float64Array(areas.length)
    }

    for (let s = 0; s < opts.substeps; s += 1) {
      // Integrate.
      for (let p = 0; p < count; p += 1) {
        const px = p * 2
        // A non-finite position (leaked in from outside between steps) is
        // restored to its last finite one and brought to rest — prev starts
        // finite and must stay finite forever, it is the recovery point.
        if (!Number.isFinite(pos[px]!) || !Number.isFinite(pos[px + 1]!)) {
          pos[px] = prev[px]!
          pos[px + 1] = prev[px + 1]!
          vel[px] = 0
          vel[px + 1] = 0
        }
        prev[px] = pos[px]!
        prev[px + 1] = pos[px + 1]!
        if (invMass[p] === 0) continue
        pos[px] = pos[px]! + vel[px]! * h
        pos[px + 1] = pos[px + 1]! + vel[px + 1]! * h
      }

      for (let g = 0; g < distanceGroups.length; g += 1) {
        this.lambdas[g]!.fill(0, 0, distanceGroups[g]!.length)
      }
      this.anchorLambda.fill(0, 0, anchors.length)
      this.areaLambda.fill(0, 0, areas.length)

      // Solve.
      for (let iter = 0; iter < opts.iterations; iter += 1) {
        for (let g = 0; g < distanceGroups.length; g += 1) {
          const group = distanceGroups[g]!
          const lambda = this.lambdas[g]!
          for (let k = 0; k < group.length; k += 1) {
            const con = group[k]!
            const wa = invMass[con.a]!
            const wb = invMass[con.b]!
            const w = wa + wb
            if (w === 0) continue
            const ax = con.a * 2
            const bx = con.b * 2
            const dx = pos[bx]! - pos[ax]!
            const dy = pos[bx + 1]! - pos[ax + 1]!
            const len = Math.sqrt(dx * dx + dy * dy)
            // Negated form also skips a NaN length, so a poisoned particle
            // cannot spread through the constraints that touch it.
            if (!(len >= 1e-9)) continue
            const c = len - con.rest
            if (con.unilateral && c <= 0) continue
            if (con.pushOnly && c >= 0) continue
            const alpha = con.compliance / h2
            const dLambda = (-c - alpha * lambda[k]!) / (w + alpha)
            lambda[k] = lambda[k]! + dLambda
            const nx = (dx / len) * dLambda
            const ny = (dy / len) * dLambda
            pos[ax] = pos[ax]! - wa * nx
            pos[ax + 1] = pos[ax + 1]! - wa * ny
            pos[bx] = pos[bx]! + wb * nx
            pos[bx + 1] = pos[bx + 1]! + wb * ny
          }
        }

        for (let k = 0; k < anchors.length; k += 1) {
          const con = anchors[k]!
          if (!con.enabled) continue
          const w = invMass[con.p]!
          if (w === 0) continue
          const px = con.p * 2
          const dx = pos[px]! - con.x
          const dy = pos[px + 1]! - con.y
          const len = Math.sqrt(dx * dx + dy * dy)
          if (!(len >= 1e-9)) continue
          const alpha = con.compliance / h2
          const dLambda = (-len - alpha * this.anchorLambda[k]!) / (w + alpha)
          this.anchorLambda[k] = this.anchorLambda[k]! + dLambda
          pos[px] = pos[px]! + ((dx / len) * dLambda) * w
          pos[px + 1] = pos[px + 1]! + ((dy / len) * dLambda) * w
        }

        // Neighboring area projections can disturb one another. A few
        // local correction passes resolve the lower bounds before advancing.
        for (let areaPass = 0; areaPass < 6; areaPass += 1) {
          let violated = false
          for (let k = 0; k < areas.length; k += 1) {
            const con = areas[k]!
            if (areaPass > 0 && !con.minimum) continue
            const wa = invMass[con.a]!
            const wb = invMass[con.b]!
            const wc = invMass[con.c]!
            if (wa + wb + wc === 0) continue
            const ax = pos[con.a * 2]!
            const ay = pos[con.a * 2 + 1]!
            const bx = pos[con.b * 2]!
            const by = pos[con.b * 2 + 1]!
            const cx = pos[con.c * 2]!
            const cy = pos[con.c * 2 + 1]!
            const area = 0.5 * ((bx - ax) * (cy - ay) - (by - ay) * (cx - ax))
            const c = area - con.restArea
            if (con.minimum && c >= -1e-9) continue
            if (con.minimum) violated = true
            // Gradients of the signed area wrt each vertex.
            const gax = 0.5 * (by - cy)
            const gay = 0.5 * (cx - bx)
            const gbx = 0.5 * (cy - ay)
            const gby = 0.5 * (ax - cx)
            const gcx = 0.5 * (ay - by)
            const gcy = 0.5 * (bx - ax)
            const wSum =
              wa * (gax * gax + gay * gay) +
              wb * (gbx * gbx + gby * gby) +
              wc * (gcx * gcx + gcy * gcy)
            if (!(wSum >= 1e-12)) continue
            const alpha = con.compliance / h2
            const dLambda = (-c - alpha * this.areaLambda[k]!) / (wSum + alpha)
            this.areaLambda[k] = this.areaLambda[k]! + dLambda
            pos[con.a * 2] = ax + wa * gax * dLambda
            pos[con.a * 2 + 1] = ay + wa * gay * dLambda
            pos[con.b * 2] = bx + wb * gbx * dLambda
            pos[con.b * 2 + 1] = by + wb * gby * dLambda
            pos[con.c * 2] = cx + wc * gcx * dLambda
            pos[con.c * 2 + 1] = cy + wc * gcy * dLambda
          }
          if (!violated) break
        }
      }

      // Clamp the substep DISPLACEMENT itself (not just the derived velocity):
      // stiff, chattering constraint stacks can otherwise pump energy through
      // unbounded projection jumps until positions overflow to NaN.
      const maxStep = opts.maxSpeed * h
      for (let p = 0; p < count; p += 1) {
        if (invMass[p] === 0) continue
        const px = p * 2
        let dx = pos[px]! - prev[px]!
        let dy = pos[px + 1]! - prev[px + 1]!
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (!Number.isFinite(dist)) {
          // A non-finite projection (NaN/Infinity) cannot be rescaled —
          // NaN * 0 is still NaN — so hold the particle at its last finite
          // position this substep, with no carried velocity.
          pos[px] = prev[px]!
          pos[px + 1] = prev[px + 1]!
          dx = 0
          dy = 0
        } else if (dist > maxStep) {
          const scale = maxStep / dist
          dx *= scale
          dy *= scale
          pos[px] = prev[px]! + dx
          pos[px + 1] = prev[px + 1]! + dy
        }
        vel[px] = dx * invH * opts.damping
        vel[px + 1] = dy * invH * opts.damping
      }
    }
  }
}
`})),at,ot=t((()=>{at=`import { SurfaceSampler, type CheekSurfaceSource } from './buildCheek'

/** One orthogonal rest-surface authoring frame for the whole flap. The previous
 * independently scaled columns bent parallel cuts and sheared the two triangles.
 * This plane follows the lateral cheek's horizontal normal, independent of the
 * camera. Coordinates are projected mm; final seam lengths use physical 3D arcs.
 * It constructs cuts only and never maps live tissue deformation. */
export function advancementChart(source: CheekSurfaceSource, center: [number, number]) {
  const sampler = new SurfaceSampler(source), origin = sampler.sample(...center).point
  // Authoring reference within the prepared lateral donor field, shared by both
  // demo sizes. Keep the vertical axis cranio-caudal rather than tilting the flap
  // with the local downward cheek slope.
  const normal = sampler.sample(center[0] - 12, center[1]).normal
  const horizontalLength = Math.hypot(normal[0], normal[2])
  const ux = normal[2] / horizontalLength, uz = -normal[0] / horizontalLength
  const project = (point: ArrayLike<number>): [number, number] => [
    (point[0]! - origin[0]) * ux + (point[2]! - origin[2]) * uz,
    point[1]! - origin[1],
  ]
  const chart: number[] = []
  for (let i = 0; i < source.positions.length; i += 3) chart.push(...project(source.positions.slice(i, i + 3)))
  const plane = new SurfaceSampler({ ...source, chart })
  return {
    local: (u: number, v: number): [number, number] => {
      const sample = plane.sample(u, v)
      return [0, 1].map(axis => sample.vertices.reduce((sum, vertex, i) =>
        sum + source.chart[vertex * 2 + axis]! * sample.weights[i]!, 0)) as [number, number]
    },
    inverse: (x: number, y: number): [number, number] => {
      try { return project(sampler.sample(x, y).point) }
      // Deeper anatomical supports can extend outside the cut authoring chart.
      catch { return [Infinity, Infinity] }
    },
  }
}
`})),st,ct=t((()=>{st=`import { advancementChart } from './advancementChart'
import { SurfaceSampler, type CheekCase, type CheekSurfaceSource } from './buildCheek'

export const ADVANCEMENT_VERSION = 'advancement-burow-orthogonal-v4'

/** Shared rest-surface cuts for inspection and the actual advancement builder.
 * Creating this outline never builds tissue elements or starts the solver. */
export function planAdvancement(source: CheekSurfaceSource, config: CheekCase) {
  if (![10, 15].includes(config.diameterMm) || config.degrees !== 0 ||
      config.centerMm && (config.centerMm[0] !== -36 || config.centerMm[1] !== 8)) {
    throw new Error('The advancement comparison uses a 10 or 15 mm defect at the starting cheek position.')
  }
  const { local, inverse } = advancementChart(source, [-36, 8])
  const s = config.diameterMm * .55, tail = -s - config.diameterMm * 2, A = 2 * s, H = Math.sqrt(3) / 2 * A
  const polygons = [
    [[-s, -s], [s, -s], [s, s], [-s, s]],
    [[tail, s], [tail + A, s], [tail + A / 2, s + H]],
    [[tail, -s], [tail + A, -s], [tail + A / 2, -s - H]],
  ]
  const excisions = polygons.map(polygon => {
    // Both sizes use identical sampling and the same orthogonal frame for the
    // actual mesh, preview and material-bound stitch locations.
    const path = polygon.flatMap(([u, v], i) => {
      const [a, b] = polygon[(i + 1) % polygon.length]!, n = Math.ceil(Math.hypot(a! - u!, b! - v!) / .5)
      return Array.from({ length: n }, (_, j) => local(u! + (a! - u!) * j / n, v! + (b! - v!) * j / n)).flat()
    })
    path.push(...local(polygon[0]![0]!, polygon[0]![1]!))
    return path
  })
  const releases = [-1, 1].map(side => {
    const path: number[] = []
    for (let i = 0; i <= 24; i++) path.push(...local(-s + (tail + A + s) * i / 24, side * s))
    return path
  })
  return { local, inverse, s, tail, A, H, excisions, releases }
}

export function advancementPreview(source: CheekSurfaceSource, config: CheekCase) {
  const plan = planAdvancement(source, config), sampler = new SurfaceSampler(source)
  const surfacePath = (path: number[]) => {
    const result: number[] = []
    for (let i = 0; i < path.length - 2; i += 2) {
      const x = path[i]!, y = path[i + 1]!, dx = path[i + 2]! - x, dy = path[i + 3]! - y
      const count = Math.max(1, Math.ceil(Math.hypot(dx, dy) / .4))
      for (let j = 0; j < count; j++) {
        const sample = sampler.sample(x + dx * j / count, y + dy * j / count)
        result.push(...sample.point.map((v, axis) => v + sample.normal[axis]! * .15))
      }
    }
    const sample = sampler.sample(path.at(-2)!, path.at(-1)!)
    result.push(...sample.point.map((v, axis) => v + sample.normal[axis]! * .15))
    return result
  }
  const { local, s, tail, A, H } = plan
  const arrow = [local(tail + A, 0), local(-s - 1, 0), local(-s - 3, 1.5), local(-s - 1, 0), local(-s - 3, -1.5)].flat()
  // Measure both corresponding banks in 3D. A projected authoring length is
  // not the length of a curved incision, especially at the donor triangles.
  const pairs = [
    (t: number) => [[-s, -s + 2 * s * t], [s, -s + 2 * s * t]],
    ...[-1, 1].map(side => (t: number) => [[tail + (-s - tail) * t, side * s], [tail + A + (-s - tail) * t, side * s]]),
    ...[-1, 1].map(side => (t: number) => [[tail + A / 2 - A / 2 * t, side * (s + H - H * t)], [tail + A / 2 + A / 2 * t, side * (s + H - H * t)]]),
  ]
  let seamLengthMm = 0
  for (const pair of pairs) {
    const points = (t: number) => pair(t).map(([u, v]) => sampler.sample(...local(u!, v!)).point)
    let previous = points(0)
    for (let i = 1; i <= 100; i++) {
      const next = points(i / 100)
      for (let bank = 0; bank < 2; bank++) seamLengthMm += Math.hypot(...next[bank]!.map((value, axis) => value - previous[bank]![axis]!)) / 2
      previous = next
    }
  }
  return {
    cuts: [...plan.excisions, ...plan.releases].map(surfacePath),
    arrow: surfacePath(arrow),
    seamLengthMm,
  }
}
`})),lt,ut=t((()=>{lt=`import { edgeHeight } from './eversion'
import { ADVANCEMENT_VERSION, planAdvancement } from './advancementPlan'
import { boundaryEdges, conformToPolyline, cutIncision } from '../mesh'
import { buildCheekDomain, type CheekCase, type CheekSurfaceSource } from './buildCheek'
import { collapseCutSlivers, conditionCutMesh } from './conditionMesh'
import { DEEP_TIGHTEN_STEPS, RUNNING_TIGHTEN_STEPS, pointAt, pointDistance, threadLength } from './closure'
import { manualDeepBite } from './manualStitch'
import type { TissueDomain3D, TissuePoint, SutureBite3D, Vec3 } from './domain'

/** One unipedicle advancement teaching case. The base is continuous tissue.
 * No translations of the flap, edge ties or closure masks are applied. */
export function buildAdvancementRepair(source:CheekSurfaceSource, config:CheekCase):TissueDomain3D {
  const {local,inverse:toLocal,s,tail,A,H,excisions,releases}=planAdvancement(source,config)
  let chart:Float32Array=Float32Array.from(source.chart),tris:Uint32Array=Uint32Array.from(source.triangles)
  const cutRim=new Set<number>()
  for(const path of excisions){
    const cut=conformToPolyline(chart,tris,path,.04,true)
    if(cut.breaks.length)throw new Error('The advancement leaves the supported cheek surface.')
    const inside=(x:number,y:number)=>{
      let hit=false
      for(let i=0,j=cut.chain.length-1;i<cut.chain.length;j=i++){
        const a=cut.chain[i]!,b=cut.chain[j]!,ax=cut.positions[a*2]!,ay=cut.positions[a*2+1]!,bx=cut.positions[b*2]!,by=cut.positions[b*2+1]!
        if((ay>y)!==(by>y)&&x<(bx-ax)*(y-ay)/(by-ay)+ax)hit=!hit
      }
      return hit
    }
    let triangles:number[]=[]
    for(let i=0;i<cut.triangles.length;i+=3){const ids=Array.from(cut.triangles.slice(i,i+3));if(!inside(ids.reduce((n,v)=>n+cut.positions[v*2]!,0)/3,ids.reduce((n,v)=>n+cut.positions[v*2+1]!,0)/3))triangles.push(...ids)}
    cut.chain.forEach(v=>cutRim.add(v))
    triangles=conditionCutMesh(cut.positions,collapseCutSlivers(cut.positions,triangles,cutRim),cutRim)
    chart=cut.positions;tris=Uint32Array.from(triangles)
  }
  for(const line of releases){
    const incision=cutIncision(chart,tris,line,.02,{precise:true})
    chart=incision.positions;tris=incision.triangles
    if(incision.seam.length<4)throw new Error('The advancement release incision could not be constructed.')
  }
  // A release ending at an excision corner can leave two disconnected fans
  // sharing one vertex. Split that topological hinge, not its 3D position.
  const grown=Array.from(chart),fanTriangles=Array.from(tris)
  const incident=new Map<number,number[]>()
  for(let i=0;i<fanTriangles.length;i+=3)for(const v of fanTriangles.slice(i,i+3)){const list=incident.get(v)??[];list.push(i);incident.set(v,list)}
  for(const [v,list] of incident){
    const pending=new Set(list);let first=true
    while(pending.size){
      const queue=[pending.values().next().value!],group:number[]=[]
      while(queue.length){const i=queue.pop()!;if(!pending.delete(i))continue;group.push(i);const others=fanTriangles.slice(i,i+3).filter(w=>w!==v)
        for(const j of pending)if(fanTriangles.slice(j,j+3).some(w=>w!==v&&others.includes(w)))queue.push(j)
      }
      if(first){first=false;continue}
      const duplicate=grown.length/2;grown.push(chart[v*2]!,chart[v*2+1]!)
      for(const i of group)for(let k=0;k<3;k++)if(fanTriangles[i+k]===v)fanTriangles[i+k]=duplicate
    }
  }
  chart=Float32Array.from(grown);tris=Uint32Array.from(fanTriangles)
  // Distinguish the new wound boundary from the unchanged outer domain seam.
  const outer=boundaryEdges(Uint32Array.from(source.triangles)),nearOuter=(v:number)=>{
    const x=chart[v*2]!,y=chart[v*2+1]!
    for(let i=0;i<outer.length;i+=2){const a=outer[i]!,b=outer[i+1]!,ax=source.chart[a*2]!,ay=source.chart[a*2+1]!,dx=source.chart[b*2]!-ax,dy=source.chart[b*2+1]!-ay,t=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy)));if(Math.hypot(x-ax-t*dx,y-ay-t*dy)<.15)return true}
    return false
  }
  const rim=[...new Set(boundaryEdges(tris))].filter(v=>!nearOuter(v))
  // The release field is evaluated on the material surface column, before
  // offsetting through the dermis/fat. Deeper supports and contact stay active.
  const releaseAt=(x:number,y:number)=>{const [u,v]=toLocal(x,y);return u>tail-4&&u<s+3&&Math.abs(v)<s+H+3}
  const d=buildCheekDomain(source,config,'unit-node',undefined,true,true,{chart,triangles:tris,rim,identity:ADVANCEMENT_VERSION,releaseAt})
  d.repair={kind:'advancement',label:'Cheek advancement'}
  const edges=boundaryEdges(d.surface.triangles),wound=new Set(d.wound)
  const third=new Map<string,number>()
  for(let i=0;i<d.surface.triangles.length;i+=3)for(let j=0;j<3;j++){const a=d.surface.triangles[i+j]!,b=d.surface.triangles[i+(j+1)%3]!;third.set(a<b?\`\${a}/\${b}\`:\`\${b}/\${a}\`,d.surface.triangles[i+(j+2)%3]!)}
  const edgeAt=(u:number,v:number,keep:(u:number,v:number)=>boolean):TissuePoint=>{
    const [x,y]=local(u,v);let result:TissuePoint|null=null,best=Infinity
    for(let i=0;i<edges.length;i+=2){const a=edges[i]!,b=edges[i+1]!;if(!wound.has(a)||!wound.has(b))continue
      const c=third.get(a<b?\`\${a}/\${b}\`:\`\${b}/\${a}\`)!,[cu,cv]=toLocal(d.surface.chart[c*2]!,d.surface.chart[c*2+1]!);if(!keep(cu!,cv!))continue
      const ax=d.surface.chart[a*2]!,ay=d.surface.chart[a*2+1]!,dx=d.surface.chart[b*2]!-ax,dy=d.surface.chart[b*2+1]!-ay,t=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/(dx*dx+dy*dy))),dist=Math.hypot(x-ax-t*dx,y-ay-t*dy)
      if(dist<best){best=dist;result={vertices:[a,b],weights:[1-t,t]}}
    }
    if(!result||best>.3)throw new Error(\`Unsupported advancement bite at \${u.toFixed(2)},\${v.toFixed(2)} (\${best.toFixed(2)}).\`)
    return result
  }
  const groups=[
    {name:'primary',length:2*s,pair:(t:number)=>[edgeAt(-s,-s+2*s*t,u=>u<-s+.2),edgeAt(s,-s+2*s*t,u=>u>s-.2)] as const},
    ...[-1,1].map(side=>({name:side===1?'upper':'lower',length:-s-tail,pair:(t:number)=>[edgeAt(tail+(-s-tail)*t,side*s,(u,v)=>u<-s+.3&&Math.abs(v)<s),edgeAt(tail+A+(-s-tail)*t,side*s,(_,v)=>side*v>s)] as const})),
    ...[-1,1].map(side=>({name:side===1?'upper-Burow':'lower-Burow',length:Math.hypot(A/2,H),pair:(t:number)=>[edgeAt(tail+A/2-A/2*t,side*(s+H-H*t),u=>u<tail+A/2),edgeAt(tail+A/2+A/2*t,side*(s+H-H*t),u=>u>tail+A/2)] as const})),

  ]
  const depth=(p:TissuePoint,f:number):TissuePoint=>({vertices:[...p.vertices,...p.vertices.map(v=>v+d.surface.count)],weights:[...p.weights.map(w=>w*(1-f)),...p.weights.map(w=>w*f)]})
  const deeps:SutureBite3D[]=[],running:SutureBite3D[]=[],gaps:{a:TissuePoint;b:TissuePoint}[]=[]
  for(const group of groups){
    // Match longitudinal entry/return points on BOTH banks. Small opposite X
    // slopes on a vertical seam must not turn a buried loop into a crossed
    // stitch that drags the two banks in opposite longitudinal directions.
    const along:Vec3=group.name==='primary'||group.name.endsWith('Burow')?[0,1,0]:[1,0,0]
    for(const t of group.name==='primary'?[.5,.25,.75]:[.5]){const [a,b]=group.pair(t),bite=manualDeepBite(d,\`manual-\${group.name}-\${deeps.length}\`,a,b,along);bite.id=\`deep-\${deeps.length}\`;bite.order=deeps.length;deeps.push(bite)}
    let previous:SutureBite3D|null=null
    const count=Math.ceil(group.length/2.5)
    for(let i=0;i<count;i++){
      // Include the junctions: midpoint-only sampling left the last bite nearly
      // 2 mm away from a triangle base. Distribute the same bite count between
      // supported endpoints, staying beyond the narrow triangle apex.
      const from=group.name.endsWith('Burow')?Math.max(.8/group.length,1.2/A):.8/group.length,to=1-.8/group.length
      const [edgeA,edgeB]=group.pair(from+(to-from)*i/(count-1)),deep=manualDeepBite(d,\`manual-\${group.name}-\${i}\`,edgeA,edgeB)
      const a=deep.surfaceA,b=deep.surfaceB,route=[a,depth(a,.35),depth(edgeA,.6),depth(edgeB,.6),depth(b,.35),b]
      const segmentTargets=route.slice(0,-1).map((p,k)=>k===2?.12:pointDistance(d.rest,p,route[k+1]!))
      if(previous){
        const previousEdge=pointAt(d.rest,previous.edgeB),currentEdge=pointAt(d.rest,edgeA),pa=pointAt(d.rest,previous.b),pb=pointAt(d.rest,a)
        const delta=pa.map((x,k)=>x-previousEdge[k]!-(pb[k]!-currentEdge[k]!))
        const interval=(pointDistance(d.rest,previous.edgeA,edgeA)+pointDistance(d.rest,previous.edgeB,edgeB))/2
        segmentTargets.unshift(Math.hypot(...delta)+interval);route.unshift(previous.b)
      }
      const bite:SutureBite3D={id:\`running-\${running.length}\`,a,b,surfaceA:a,surfaceB:b,edgeA,edgeB,route,segmentTargets,closedRoute:false,targetMm:segmentTargets.reduce((n,x)=>n+x,0),restMm:0,order:running.length,chainId:group.name,chainIndex:i}
      bite.restMm=threadLength(d.rest,bite);running.push(bite);previous=bite
    }
    for(let i=1;i<Math.ceil(group.length*2);i++){const [a,b]=group.pair(i/Math.ceil(group.length*2));gaps.push({a,b})}
  }
  const eversion=deeps.flatMap(b=>[{edge:b.edgeA,shoulder:b.surfaceA},{edge:b.edgeB,shoulder:b.surfaceB}]).map(q=>({...q,restHeightMm:edgeHeight(d.rest,q.edge,q.shoulder)}))
  // Show primary approximation first, then paired donor-site work. Separate
  // side incisions do not need to wait for one another's presentation clock.
  // Every active thread still tightens through all physical substeps.
  deeps.forEach((bite,i)=>{bite.startStep=(i<3?i:i<5?3:4)*DEEP_TIGHTEN_STEPS})
  const primarySteps=running.filter(b=>b.chainId==='primary').length*RUNNING_TIGHTEN_STEPS
  running.forEach(b=>{b.startStep=(b.chainId==='primary'?0:primarySteps)+b.chainIndex!*RUNNING_TIGHTEN_STEPS})
  // Estimate each future seam by the mean rest arc of its two material banks.
  // This is planned geometry, not a prediction of the healed scar.
  let seamLengthMm=0
  for(const group of groups){
    const count=Math.ceil(group.length*2),epsilon=1e-4
    let previous=group.pair(epsilon)
    for(let i=1;i<=count;i++){
      const next=group.pair(Math.min(1-epsilon,i/count))
      seamLengthMm+=(pointDistance(d.rest,previous[0],next[0])+pointDistance(d.rest,previous[1],next[1]))/2;previous=next
    }
  }
  d.closure={deeps,running,gaps,eversion,seamLengthMm}
  d.size.plannedLengthMm=d.closure.seamLengthMm;d.size.surfaceLengthMm=d.closure.seamLengthMm
  return d
}
`})),dt,ft=t((()=>{dt=`import type { DefectInspection } from './defectTypes'
import { activeVertices, boundaryEdges, conformToPolyline } from '../mesh'
import { tetrahedronVolume } from '../tissueVolume'
import { planCheekClosure } from './closure'
import { collapseCutSlivers, conditionCutMesh, conformCutBoundary } from './conditionMesh'
import { areaCompliance, incisionDistance, integratedSprings, lumpedArea, lumpedMass, retainedArea } from './integration'
import { closestSurface, RigidContactIndex, type RigidSurface } from './contact'
import type { DomainLink, Material3D, TissueDomain3D, Vec3 } from './domain'

interface SourceLayer { top: number[]; bottom: number[]; triangles: number[]; columns?: number; rows?: number }
export interface CheekSurfaceSource {
  version: number; units: string; sourceSha256: string; geometrySha256: string
  chart: number[]; positions: number[]; normals: number[]; uv: number[]; triangles: number[]; pinned: number[]; lid: number[]
  tarsus: SourceLayer; muscle: SourceLayer; deepFat: SourceLayer; supports: RigidSurface[]
  globe: { center: Vec3; radius: number }; caseCenter: Vec3
  attachments: { id: string; fixedSiteMm?: Vec3 }[]
  materialInterfaces?: { carriedFatLimitYmm: number }
}
export interface CheekCase {
  diameterMm: 10 | 15 | 20; degrees: number
  /** Rest-chart location for constructing a new cut, never a live displacement. */
  centerMm?: [number, number]
}
export interface SurfaceSample { point: Vec3; normal: Vec3; uv: [number, number]; vertices: [number, number, number]; weights: Vec3 }
/** A cut in the intact rest surface. Layer construction and anatomical support
 * stay shared with the ellipse; this contains no displacement or closure force. */
export interface CheekCutSurface { chart: Float32Array; triangles: Uint32Array; rim: number[]; identity: string; releaseAt?: (x: number, y: number) => boolean }

/** Rest chart lookup only. This mapping is never used for live strain or gaps. */
export class SurfaceSampler {
  private readonly bins = new Map<string, number[]>()
  constructor(private readonly source: CheekSurfaceSource) {
    if (source.version !== 1 || source.units !== 'mm') throw new Error('Unsupported cheek source units.')
    const p = source.chart, t = source.triangles
    for (let i = 0; i < t.length; i += 3) {
      const xs = [p[t[i]! * 2]!, p[t[i + 1]! * 2]!, p[t[i + 2]! * 2]!], ys = [p[t[i]! * 2 + 1]!, p[t[i + 1]! * 2 + 1]!, p[t[i + 2]! * 2 + 1]!]
      for (let x = Math.floor(Math.min(...xs) / 4); x <= Math.floor(Math.max(...xs) / 4); x++) for (let y = Math.floor(Math.min(...ys) / 4); y <= Math.floor(Math.max(...ys) / 4); y++) {
        const key = \`\${x}/\${y}\`, values = this.bins.get(key) ?? []; values.push(i); this.bins.set(key, values)
      }
    }
  }
  sample(x: number, y: number): SurfaceSample {
    const s = this.source
    let best: SurfaceSample | null = null, bestOutside = Infinity
    for (const i of this.bins.get(\`\${Math.floor(x / 4)}/\${Math.floor(y / 4)}\`) ?? []) {
      const v = [s.triangles[i]!, s.triangles[i + 1]!, s.triangles[i + 2]!] as [number, number, number]
      const ax = s.chart[v[0] * 2]!, ay = s.chart[v[0] * 2 + 1]!, bx = s.chart[v[1] * 2]!, by = s.chart[v[1] * 2 + 1]!, cx = s.chart[v[2] * 2]!, cy = s.chart[v[2] * 2 + 1]!
      const det = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy)
      if (Math.abs(det) < 1e-9) continue
      const a = ((by - cy) * (x - cx) + (cx - bx) * (y - cy)) / det, b = ((cy - ay) * (x - cx) + (ax - cx) * (y - cy)) / det, weights: Vec3 = [a, b, 1 - a - b]
      const outside = Math.max(0, -Math.min(...weights))
      if (outside >= bestOutside || outside > .003) continue
      const point: Vec3 = [0, 0, 0], normal: Vec3 = [0, 0, 0], uv: [number, number] = [0, 0]
      for (let k = 0; k < 3; k++) {
        for (let axis = 0; axis < 3; axis++) { point[axis] = point[axis]! + s.positions[v[k]! * 3 + axis]! * weights[k]!; normal[axis] = normal[axis]! + s.normals[v[k]! * 3 + axis]! * weights[k]! }
        for (let axis = 0; axis < 2; axis++) uv[axis] = uv[axis]! + s.uv[v[k]! * 2 + axis]! * weights[k]!
      }
      const length = Math.hypot(...normal)
      if (length < .2) continue
      for (let axis = 0; axis < 3; axis++) normal[axis] = normal[axis]! / length
      best = { point, normal, uv, vertices: v, weights }; bestOutside = outside
      if (outside === 0) break
    }
    if (!best) throw new Error(\`The design leaves the supported anterior cheek at \${x.toFixed(1)}, \${y.toFixed(1)} mm.\`)
    return best
  }
}

const smooth = (a: number, b: number, x: number) => { const t = Math.max(0, Math.min(1, (x - a) / (b - a))); return t * t * (3 - 2 * t) }
export const skinDepth = (y: number) => 1.3 - .5 * smooth(18, 40, y)
export const fatDepth = (y: number) => 3 * (1 - smooth(22, 35, y))
const offset = (s: SurfaceSample, d: number): Vec3 => s.point.map((v, a) => v - d * s.normal[a]!) as Vec3

/** Shared rest-surface cut plan for the placement outline and actual excision.
 * It contains no live deformation or closure approximation. */
export function planCheekIncision(source: CheekSurfaceSource, config: CheekCase, sampler = new SurfaceSampler(source)) {
  if (![10, 15, 20].includes(config.diameterMm) || !Number.isFinite(config.degrees)) throw new Error('Unsupported cheek case.')
  if (config.centerMm && (config.centerMm.length !== 2 || !config.centerMm.every(Number.isFinite))) throw new Error('Unsupported cheek location.')
  const center: Vec3 = config.centerMm ? [...config.centerMm, sampler.sample(...config.centerMm).point[2]] : source.caseCenter, rotation = config.degrees * Math.PI / 180, cos = Math.cos(rotation), sin = Math.sin(rotation)
  // Metric correction at the seed. The chart constructs cuts only; actual
  // surface-axis length is measured and exposed rather than called exact mm.
  const seed = sampler.sample(center[0], center[1]), nz = Math.max(.2, seed.normal[2])
  const metric = (dx: number, dy: number) => Math.sqrt(dx * dx + dy * dy + ((seed.normal[0] * dx + seed.normal[1] * dy) / nz) ** 2)
  const length = config.diameterMm * 3, half = length / 2, width = config.diameterMm / 2
  const fitAxis = (dx: number, dy: number, span: number): number => {
    let low = metric(dx, dy) * .45, high = metric(dx, dy) * 4
    for (let iteration = 0; iteration < 22; iteration++) {
      const scale = (low + high) / 2
      let arc = 0, previous: Vec3 | null = null
      try {
        for (let i = 0; i <= 100; i++) {
          const d = (-span / 2 + span * i / 100) / scale, p = sampler.sample(center[0] + dx * d, center[1] + dy * d).point
          if (previous) arc += Math.hypot(p[0] - previous[0], p[1] - previous[1], p[2] - previous[2])
          previous = p
        }
      } catch { arc = Infinity }
      if (arc > span) low = scale; else high = scale
    }
    return (low + high) / 2
  }
  const sx = fitAxis(cos, sin, length), sy = fitAxis(-sin, cos, config.diameterMm)
  const path: number[] = []
  // Pointed fusiform outline, 0.5 mm nominal edge subdivisions.
  const steps = Math.ceil(length / .5)
  const local = (u: number, v: number) => [center[0] + u / sx * cos - v / sy * sin, center[1] + u / sx * sin + v / sy * cos]
  for (const side of [1, -1]) for (let i = 0; i < steps; i++) {
    const u = (side === 1 ? -1 + 2 * i / steps : 1 - 2 * i / steps) * half, v = side * width * (1 - (u / half) ** 2)
    path.push(...local(u, v))
  }
  path.push(path[0]!, path[1]!)
  for (let i = 0; i < path.length; i += 2) sampler.sample(path[i]!, path[i + 1]!)
  return { center, rotation, cos, sin, length, half, width, sx, sy, path, local, fitAxis }
}

export function buildCheekDomain(source: CheekSurfaceSource, config: CheekCase, discretization: TissueDomain3D['discretization'] = 'unit-node', circular?: DefectInspection, preciseCut = false, taperedFat = false, cut?: CheekCutSurface): TissueDomain3D {
  if (!['unit-node', 'integrated'].includes(discretization)) throw new Error('Unsupported tissue discretization.')
  const integrated = discretization === 'integrated'
  if (taperedFat && circular) throw new Error('The circular domain has a separately reviewed layer construction.')
  // Follow the authored fat shell to y=34, sharing its smoothly thinning
  // thickness between carried tissue and bed. The legacy 1 mm column stopped
  // abruptly when less than 1.2 mm remained, exposing muscle too early.
  const hasCarriedFat = (y: number) => taperedFat ? y <= 34 : integrated && source.materialInterfaces ? y <= source.materialInterfaces.carriedFatLimitYmm + 1e-4 : fatDepth(y) > 1.2
  const carriedDepth = (y: number) => taperedFat ? Math.min(1, fatDepth(y) / 2) : 1
  const sampler = new SurfaceSampler(source)
  const { center, cos, sin, length, half, width, sx, sy, path, local } = planCheekIncision(source, config, sampler)
  const conformed = conformToPolyline(Float32Array.from(source.chart), Uint32Array.from(source.triangles), path, preciseCut ? .02 : .12, preciseCut)
  if (conformed.breaks.length || conformed.chain.length < 30) throw new Error('The incision crosses an unsupported opening.')
  const inside = (x: number, y: number) => {
    const dx = x - center[0], dy = y - center[1], u = (dx * cos + dy * sin) * sx, v = (-dx * sin + dy * cos) * sy
    return Math.abs(u) < half - 1e-6 && Math.abs(v) < width * (1 - (u / half) ** 2) - 1e-5
  }
  let tris: number[] = []
  let xy = conformed.positions
  // Classify against the actual edge-connected incision when refining. An
  // analytic-centroid test can leave a triangle attached across a snapped cut.
  const insideCut = (x: number, y: number) => {
    let contained = false
    for (let k = 0, j = conformed.chain.length - 1; k < conformed.chain.length; j = k++) {
      const a = conformed.chain[k]!, b = conformed.chain[j]!, ax = xy[a*2]!, ay = xy[a*2+1]!, bx = xy[b*2]!, by = xy[b*2+1]!
      if ((ay > y) !== (by > y) && x < (bx-ax)*(y-ay)/(by-ay)+ax) contained = !contained
    }
    return contained
  }
  for (let i = 0; i < conformed.triangles.length; i += 3) {
    const ids = Array.from(conformed.triangles.slice(i, i + 3)), x = ids.reduce((s, v) => s + xy[v * 2]!, 0) / 3, y = ids.reduce((s, v) => s + xy[v * 2 + 1]!, 0) / 3
    if (!(preciseCut ? insideCut(x,y) : inside(x,y))) tris.push(...ids)
  }
  const materialBoundary = new Set<number>()
  if (integrated && source.materialInterfaces) for (let v=0;v<xy.length/2;v++) if(Math.abs(xy[v*2+1]!-source.materialInterfaces.carriedFatLimitYmm)<1e-4) materialBoundary.add(v)
  if (integrated || preciseCut) tris = collapseCutSlivers(xy, tris, new Set(conformed.chain), materialBoundary)
  tris = conditionCutMesh(xy, tris, new Set(conformed.chain), materialBoundary)
  if(integrated || preciseCut)xy=conformCutBoundary(xy,tris,new Set(conformed.chain),path)
  if(circular) {
    const g=circular.geometry, size=Math.max(...g.sourceIndices)+1
    xy=new Float32Array(size*2)
    g.sourceIndices.forEach((v,i)=>xy.set(g.chart.slice(i*2,i*2+2),v*2))
    tris=Array.from(g.triangles,v=>g.sourceIndices[v]!)
    conformed.chain=Array.from(g.rim,v=>g.sourceIndices[v]!)
  }
  if(cut) {
    if(circular)throw new Error('Choose one rest-surface construction.')
    xy=cut.chart;tris=Array.from(cut.triangles);conformed.chain=cut.rim
  }
  const active = activeVertices(Uint32Array.from(tris), xy.length / 2), original = Array.from({ length: active.length }, (_, i) => i).filter(i => active[i]), remap = new Map(original.map((v, i) => [v, i]))
  const triangles = Uint32Array.from(tris.map(v => remap.get(v)!)), count = original.length, positions: number[] = [], inv: number[] = [], chart: number[] = [], normals: number[] = [], uv: number[] = []
  const boundary = new Set(boundaryEdges(triangles)), sourcePinned = new Set(source.pinned), pinned: number[] = []
  // A quarter-millimetre numerical collar around the artificial fixed seam.
  // Sub-0.1 mm sliver cells next to that seam must not have one free corner
  // while their other corners are fixed. This is not an anatomical ligament.
  const sourceEdges = boundaryEdges(Uint32Array.from(source.triangles)), fixedEdges: [number,number][] = []
  for(let i=0;i<sourceEdges.length;i+=2)if(sourcePinned.has(sourceEdges[i]!)&&sourcePinned.has(sourceEdges[i+1]!))fixedEdges.push([sourceEdges[i]!,sourceEdges[i+1]!])
  const sourceLid = new Set(source.lid)
  for(let v=0;v<source.positions.length/3;v++) {
    if(sourcePinned.has(v)||sourceLid.has(v))continue
    for(const [a,b]of fixedEdges) {
      const delta=[0,1,2].map(k=>source.positions[b*3+k]!-source.positions[a*3+k]!) as Vec3
      const relative=[0,1,2].map(k=>source.positions[v*3+k]!-source.positions[a*3+k]!) as Vec3
      const t=Math.max(0,Math.min(1,relative.reduce((s,x,k)=>s+x*delta[k]!,0)/Math.max(1e-12,delta.reduce((s,x)=>s+x*x,0))))
      if(Math.hypot(...relative.map((x,k)=>x-t*delta[k]!))<.25){sourcePinned.add(v);break}
    }
  }
  const samples = original.map(v => sampler.sample(xy[v * 2]!, xy[v * 2 + 1]!))
  function node(point: Vec3, fixed = false): number { const id = positions.length / 3; positions.push(...point); inv.push(fixed ? 0 : 1); return id }
  samples.forEach((s, i) => { const fixed = sourcePinned.has(original[i]!); node(s.point, fixed); if (fixed) pinned.push(i); chart.push(xy[original[i]! * 2]!, xy[original[i]! * 2 + 1]!); normals.push(...s.normal); uv.push(...s.uv) })
  const layerPoint=(s:SurfaceSample,i:number,layer:number,depth:number):Vec3=>circular?Array.from(circular.geometry.positions.slice((i+layer*count)*3,(i+layer*count+1)*3)) as Vec3:offset(s,depth)
  const dermalBottom = samples.map((s, i) => node(layerPoint(s,i,1,skinDepth(s.point[1])), !inv[i]))
  const dermalMiddle = samples.map((s, i) => node(layerPoint(s,i,2,skinDepth(s.point[1]) * .5), !inv[i]))
  const domain: TissueDomain3D = {
    id: \`cheek-xyz-\${integrated ? 'v7-integrated' : 'v4'}/\${source.geometrySha256.slice(0, 12)}/\${config.diameterMm}/\${config.degrees}\${center[0] === source.caseCenter[0] && center[1] === source.caseCenter[1] ? '' : \`/at-\${center[0]},\${center[1]}\`}\${preciseCut ? '/precise-cut-v1' : ''}\${taperedFat ? '/tapered-fat-v1' : ''}\`, discretization,
    ...(taperedFat ? { fatModel: 'tapered-v1' as const } : {}),
    rest: new Float64Array(), massMg: new Float64Array(), inverseMass: new Float64Array(), attachmentAreaMm2: new Float64Array(), springs: [], tets: [], anchors: [], links: [], bed: [], banks: [], rigid: { surfaces: source.supports, vertices: [] },
    globe: { ...source.globe, vertices: [] }, surface: { count, triangles, uv: Float32Array.from(uv), normals: Float32Array.from(normals), chart: Float32Array.from(chart) },
    dermalMiddle,
    walls: { dermis: new Uint32Array(), fat: new Uint32Array() }, fatSurface: new Uint32Array(),
    tarsus: { triangles: new Uint32Array(), vertices: [] }, muscle: { triangles: new Uint32Array(), vertices: [] }, closure: { deeps: [], running: [], gaps: [], eversion: [], seamLengthMm: 0 }, wound: [], lid: [], pinned,
    size: { diameterMm: config.diameterMm, degrees: config.degrees, plannedLengthMm: length, surfaceLengthMm: 0 },
  }
  const distance = (a: number, b: number) => Math.hypot(positions[a * 3]! - positions[b * 3]!, positions[a * 3 + 1]! - positions[b * 3 + 1]!, positions[a * 3 + 2]! - positions[b * 3 + 2]!)
  const springKeys = new Set<string>()
  function spring(a: number, b: number, compliance: number): void {
    const key = a < b ? \`\${a}/\${b}\` : \`\${b}/\${a}\`
    if (a === b || springKeys.has(key)) return
    springKeys.add(key); domain.springs.push({ a, b, rest: distance(a, b), compliance })
  }
  function prism(top: [number, number, number], bottom: [number, number, number], material: Material3D): void {
    const ids = top.map((v, i) => ({ t: v, b: bottom[i]! })).sort((a, b) => a.t - b.t), [a, b, c] = ids as [typeof ids[number], typeof ids[number], typeof ids[number]]
    for (const v of [[a.t, b.t, c.t, c.b], [a.t, b.t, b.b, c.b], [a.t, a.b, b.b, c.b]] as [number, number, number, number][]) {
      let rest = tetrahedronVolume(positions, ...v)
      if (Math.abs(rest) < 1e-7) throw new Error('Collapsed cell: '+JSON.stringify({rest, material, v, points:v.map(i=>positions.slice(i*3,i*3+3))}))
      if (rest < 0) { [v[1], v[2]] = [v[2], v[1]]; rest = -rest }
      domain.tets.push({ vertices: v, rest, material })
      // Preserve the existing rehearsal while the integrated candidate goes
      // through closure, manipulation and convergence acceptance separately.
      if (!integrated && material !== 'dermis') for (let j = 0; j < 4; j++) for (let k = j + 1; k < 4; k++) spring(v[j]!, v[k]!, (material === 'fat' ? 3e-4 : material === 'muscle' ? 8e-5 : 1.5e-6) * Math.max(.2, distance(v[j]!, v[k]!)))
    }
  }
  const interfaces: number[] = []
  for (let k = 0; k < triangles.length; k += 3) {
    const top = Array.from(triangles.slice(k, k + 3)) as Vec3, mid = top.map(v => dermalMiddle[v]!) as Vec3
    prism(top, mid, 'dermis'); prism(mid, top.map(v => dermalBottom[v]!) as Vec3, 'dermis')
    interfaces.push(...top.map(v => dermalBottom[v]!))
  }
  const woundSet = new Set(conformed.chain.map(v => remap.get(v)).filter((v): v is number => v !== undefined && boundary.has(v)))
  domain.wound = [...woundSet]
  domain.lid = source.lid.map(v => remap.get(v)).filter((v): v is number => v !== undefined)
  // Incision conformation can split an existing artificial boundary edge.
  // Those inserted boundary vertices inherit its fixation, too.
  const lidSet = new Set(domain.lid)
  for(const v of boundary) if(!woundSet.has(v)&&!lidSet.has(v)) {
    inv[v]=0; inv[dermalBottom[v]!]=0; inv[dermalMiddle[v]!]=0
    if(!pinned.includes(v))pinned.push(v)
  }
  const dermisWalls: number[] = [], fatWalls: number[] = [], edges = boundaryEdges(triangles)
  for (let k = 0; k < edges.length; k += 2) {
    const a = edges[k]!, b = edges[k + 1]!
    if (woundSet.has(a) && woundSet.has(b)) {
      const ma = dermalMiddle[a]!, mb = dermalMiddle[b]!
      dermisWalls.push(a,ma,b, b,ma,mb, ma,dermalBottom[a]!,mb, mb,dermalBottom[a]!,dermalBottom[b]!)
    }
  }
  domain.walls.dermis = Uint32Array.from(dermisWalls)

  // One millimetre of carried superficial fat beneath the dermis; taper to
  // zero before the pretarsal lid. The release plane is at its lower surface.
  const carried = new Map<number, number>(), carriedInterface: number[] = []
  for (let v = 0; v < count; v++) if (hasCarriedFat(chart[v * 2 + 1]!)) carried.set(v, node(layerPoint(samples[v]!,v,3,skinDepth(chart[v * 2 + 1]!) + carriedDepth(chart[v * 2 + 1]!)), !inv[v]))
  for (let k = 0; k < triangles.length; k += 3) {
    const top = Array.from(triangles.slice(k, k + 3)) as Vec3
    if (top.every(v => carried.has(v))) {
      const bottom = top.map(v => carried.get(v)!) as Vec3
      prism(top.map(v => dermalBottom[v]!) as Vec3, bottom, 'fat'); interfaces.push(...bottom); carriedInterface.push(...bottom)
    }
  }
  for (let k = 0; k < edges.length; k += 2) { const a = edges[k]!, b = edges[k + 1]!; if (woundSet.has(a) && woundSet.has(b) && carried.has(a) && carried.has(b)) fatWalls.push(dermalBottom[a]!, carried.get(a)!, dermalBottom[b]!, dermalBottom[b]!, carried.get(a)!, carried.get(b)!) }
  domain.walls.fat = Uint32Array.from(fatWalls)
  // Paired cut-bank contact in the local wound frame. Separation is measured
  // in XYZ; the contact is repulsive, with a proximity gate for lifted banks.
  const banks = { upper: [] as number[], lower: [] as number[] }
  const along = (v: number) => (chart[v*2]! - center[0])*cos + (chart[v*2+1]! - center[1])*sin
  for (const v of domain.wound) (-(chart[v*2]! - center[0])*sin + (chart[v*2+1]! - center[1])*cos > 0 ? banks.upper : banks.lower).push(v)
  const bankKeys = new Set<string>()
  for (const [from,to] of [[banks.lower,banks.upper],[banks.upper,banks.lower]]) for (const a of from!) {
    let b = -1, nearest = Infinity
    for (const v of to!) { const d = Math.abs(along(a)-along(v)); if (d < nearest) { nearest=d; b=v } }
    if (b < 0 || a === b || nearest > 1.5) continue
    const key = a<b ? \`\${a}/\${b}\` : \`\${b}/\${a}\`
    if (bankKeys.has(key) || distance(a,b)<.4) continue
    bankKeys.add(key)
    const length = distance(a,b), normal = [0,1,2].map(axis=>(positions[b*3+axis]!-positions[a*3+axis]!)/length) as Vec3
    domain.banks.push({a,b,normal},{a:dermalMiddle[a]!,b:dermalMiddle[b]!,normal},{a:dermalBottom[a]!,b:dermalBottom[b]!,normal})
    if(carried.has(a)&&carried.has(b)) domain.banks.push({a:carried.get(a)!,b:carried.get(b)!,normal})
  }

  // The deeper fat bed remains present under the excision and has its own
  // deformable volume. It is attached to the passive deep support at its base.
  const bedTop = new Map<number, number>(), bedBottom = new Map<number, number>(), fatSurface: number[] = []
  for (let v = 0; v < source.positions.length / 3; v++) {
    const y = source.chart[v * 2 + 1]!
    if (!hasCarriedFat(y)) continue
    const s = sampler.sample(source.chart[v * 2]!, y), fixed = sourcePinned.has(v)
    const top = node(offset(s, skinDepth(y) + carriedDepth(y)), fixed), bottom = node(offset(s, skinDepth(y) + fatDepth(y)), fixed)
    bedTop.set(v, top); bedBottom.set(v, bottom)
    const point = positions.slice(bottom * 3, bottom * 3 + 3) as Vec3
    domain.anchors.push({ p: bottom, target: point, compliance: .0008, kind: y > 22 ? 'retaining' : 'bed' })
    domain.bed.push({ p: bottom, point, normal: s.normal })
  }
  for (let k = 0; k < source.triangles.length; k += 3) {
    const ids = source.triangles.slice(k, k + 3) as Vec3
    if (!ids.every(v => bedTop.has(v))) continue
    const top = ids.map(v => bedTop.get(v)!) as Vec3
    prism(top, ids.map(v => bedBottom.get(v)!) as Vec3, 'fat'); fatSurface.push(...top)
    interfaces.push(...ids.map(v => bedBottom.get(v)!))
  }
  domain.fatSurface = Uint32Array.from(fatSurface)
  if (cut?.releaseAt) domain.slidingInterface = {
    upper: Uint32Array.from(triangles, v => carried.get(v) ?? dermalBottom[v]!),
    lower: domain.fatSurface,
  }
  const releasePath = integrated ? Array.from({length:path.length/2},(_,i) => sampler.sample(path[i*2]!,path[i*2+1]!).point) : []
  const releaseDistances = new Float64Array(positions.length / 3)
  for (const [v, p] of carried) {
    const s = samples[v]!
    if (!s.vertices.every(v => bedTop.has(v))) continue
    const vertices = s.vertices.map(v => bedTop.get(v)!) as Vec3
    const offset: Vec3 = [0, 0, 0]
    for (let a = 0; a < 3; a++) offset[a] = positions[p * 3 + a]! - vertices.reduce((sum, v, j) => sum + positions[v * 3 + a]! * s.weights[j]!, 0)
    const releaseDistanceMm = integrated ? incisionDistance(s.point, releasePath) : Math.min(...domain.wound.map(w => Math.hypot(...[0,1,2].map(a=>s.point[a]!-positions[w*3+a]!))))
    releaseDistances[p] = releaseDistanceMm
    domain.links.push({ p, vertices, weights: s.weights, offset, normal: s.normal, compliance: 1e-6, releasable: releaseDistanceMm <= 6 && !!inv[p], releaseDistanceMm, kind: 'fat-interface', ...(inv[p] && cut?.releaseAt?.(chart[v*2]!, chart[v*2+1]!) ? {preparedRelease:true} : {}) })
  }
  if (integrated) {
    // Include every interface corner in the field, even if that corner has
    // no matching bed triangle. Otherwise it invents a zero-distance sample.
    for (const [v,p] of carried) releaseDistances[p] = incisionDistance(samples[v]!.point, releasePath)
    const full = lumpedArea(positions, carriedInterface), remaining = [3,6].map(r => retainedArea(positions,carriedInterface,releaseDistances,r))
    for (const link of domain.links) if (link.kind === 'fat-interface' && inv[link.p] && full[link.p]! > 0) {
      link.retainedFraction = remaining.map(a => Math.max(0,Math.min(1,a[link.p]!/full[link.p]!))) as [number,number]
      link.releasable = link.retainedFraction[1] < 1
    }
  }
  // The taper and passive upper-lid tissue retain their deep attachments.
  for (let v = 0; v < count; v++) if (!carried.has(v)) domain.anchors.push({ p: dermalBottom[v]!, target: offset(samples[v]!, skinDepth(chart[v * 2 + 1]!)), compliance: .008, kind: 'retaining' })

  // Preserve separate passive muscle and deep fat volumes from the reviewed
  // Blender geometry. Transfer loads through material-point attachments.
  function layer(src: SourceLayer, material: Material3D) {
    const top: number[] = [], bottom: number[] = [], count = src.top.length / 3
    for (let i = 0; i < count; i++) top.push(node(src.top.slice(i * 3, i * 3 + 3) as Vec3))
    for (let i = 0; i < count; i++) bottom.push(node(src.bottom.slice(i * 3, i * 3 + 3) as Vec3))
    for (let k = 0; k < src.triangles.length; k += 3) {
      const ids = src.triangles.slice(k, k + 3), lower = ids.map(v => bottom[v]!) as Vec3
      prism(ids.map(v => top[v]!) as Vec3, lower, material); interfaces.push(...lower)
    }
    return { top, bottom, triangles: Uint32Array.from(src.triangles.map(v => top[v]!)) }
  }
  const muscle = layer(source.muscle, 'muscle'), deepFat = layer(source.deepFat, 'fat')
  domain.muscle = { triangles: muscle.triangles, vertices: [...muscle.top, ...muscle.bottom] }
  function attachToSurface(p: number, triangles: ArrayLike<number>, maxDistance: number, kind: DomainLink['kind'], compliance: number): boolean {
    const q = closestSurface(positions.slice(p * 3, p * 3 + 3) as Vec3, positions, triangles)
    if (!q || q.distance > maxDistance) return false
    domain.links.push({ p, vertices: q.vertices, weights: q.weights, offset: [0,1,2].map(a => positions[p*3+a]! - q.point[a]!) as Vec3, normal: q.normal[2] < 0 ? q.normal.map(n => -n) as Vec3 : q.normal, compliance, releasable: false, kind })
    return true
  }
  // Replace the old flat passive foundation where muscle actually exists.
  const coupled = new Set<number>()
  for (const p of bedBottom.values()) if (attachToSurface(p, muscle.triangles, 3.5, 'muscle-interface', 3e-5)) coupled.add(p)
  for (let v = 0; v < count; v++) if (!carried.has(v) && attachToSurface(dermalBottom[v]!, muscle.triangles, 2.5, 'muscle-interface', 4e-5)) coupled.add(dermalBottom[v]!)
  domain.anchors = domain.anchors.filter(a => !coupled.has(a.p))
  domain.bed = domain.bed.filter(a => !coupled.has(a.p))
  for (const p of muscle.bottom) {
    if (!attachToSurface(p, deepFat.triangles, 3, 'muscle-interface', 8e-5)) domain.anchors.push({ p, target: positions.slice(p*3,p*3+3) as Vec3, compliance: .004, kind: 'retaining' })
  }
  // The deep-fat foundation and the rim-retaining band use independent named
  // fixed support sites, with rest offsets, not a bed plane that pulls skin shut.
  for (const p of deepFat.bottom) domain.anchors.push({p,target:positions.slice(p*3,p*3+3) as Vec3,compliance:.002,kind:'bed'})
  const nt = source.tarsus.top.length / 3, tt: number[] = [], tb: number[] = []
  for (let v = 0; v < nt; v++) tt.push(node(source.tarsus.top.slice(v * 3, v * 3 + 3) as Vec3))
  for (let v = 0; v < nt; v++) tb.push(node(source.tarsus.bottom.slice(v * 3, v * 3 + 3) as Vec3))
  for (let k = 0; k < source.tarsus.triangles.length; k += 3) { const ids = source.tarsus.triangles.slice(k, k + 3); prism(ids.map(v => tt[v]!) as Vec3, ids.map(v => tb[v]!) as Vec3, 'tarsus') }
  domain.tarsus = { triangles: Uint32Array.from(source.tarsus.triangles.map(v => tt[v]!)), vertices: [...tt, ...tb] }
  // Named canthal sites remain fixed; terminal plate nodes connect by their
  // actual rest lengths to a small attachment cross-section at each site.
  for (const [side, column] of [['lateral', 0], ['medial', 16]] as const) {
    const site = source.attachments.find(a => a.id === \`canthal-\${side}\`)?.fixedSiteMm
    if (!site) throw new Error('Missing canthal attachment site.')
    const endFace: number[] = []
    for (let row = 0; row < 5; row++) {
      const a = row*17 + column, b = (row+1)*17 + column
      endFace.push(tt[a]!, tb[a]!, tt[b]!, tt[b]!, tb[a]!, tb[b]!)
    }
    const endArea = lumpedArea(positions, endFace)
    const anchors = [[0, 0, 0], [0, .6, 0], [.6, 0, 0], [0, 0, .6]].map(o => node(site.map((p, a) => p + o[a]!) as Vec3, true))
    // Four fixed directions share each terminal point's attachment area.
    for (let row = 0; row < 6; row++) for (const v of [tt[row * 17 + column]!, tb[row * 17 + column]!]) for (const anchor of anchors) spring(v, anchor, integrated ? areaCompliance(5e-6, endArea[v]! / anchors.length) : 5e-6)
  }
  for (const p of muscle.bottom) attachToSurface(p, domain.tarsus.triangles, 2.5, 'tarsal-interface', 2e-5)
  // Tissue directly at the rim beyond the muscle footprint retains its own
  // connection to the plate; it does not acquire a second fixed bed anchor.
  for (let v = 0; v < count; v++) if (!coupled.has(dermalBottom[v]!) && attachToSurface(dermalBottom[v]!, domain.tarsus.triangles, 2.2, 'tarsal-interface', 2e-5)) coupled.add(dermalBottom[v]!)
  domain.anchors = domain.anchors.filter(a => !coupled.has(a.p))
  // Unilateral collision with the exported orbital/maxillary surfaces. The
  // source is checked before any force can disguise a penetrating rest pose.
  const rigid = new RigidContactIndex(source.supports)
  for (let v = 0; v < positions.length / 3; v++) {
    if (!inv[v]) continue
    const point = positions.slice(v*3,v*3+3) as Vec3, q = rigid.closest(point)
    if (q && q.distance < 1 && point.reduce((sum,x,a) => sum + (x-q.point[a]!)*q.normal[a]!,0) < -.05) throw new Error(\`Rest tissue intersects rigid support at \${v}.\`)
    domain.rigid.vertices.push(v)
  }
  // Exclude any node already inside the fitted sphere from pretending to have
  // valid contact rest geometry. Reject, never push it into a new rest pose.
  for (let v = 0; v < positions.length / 3; v++) {
    const radius = Math.hypot(positions[v * 3]! - source.globe.center[0], positions[v * 3 + 1]! - source.globe.center[1], positions[v * 3 + 2]! - source.globe.center[2])
    if (radius < source.globe.radius + 5 && positions[v * 3 + 2]! > source.globe.center[2]) {
      if (radius < source.globe.radius - .03) throw new Error(\`Rest tissue intersects the globe at node \${v} (\${positions.slice(v*3,v*3+3).join(",")}) by \${(source.globe.radius - radius).toFixed(2)} mm.\`)
      domain.globe.vertices.push(v)
    }
  }
  domain.rest = Float64Array.from(positions)
  domain.massMg = lumpedMass(inv.length, domain.tets)
  domain.inverseMass = integrated ? Float64Array.from(inv, (free, v) => free && domain.massMg[v]! > 0 ? 1 / domain.massMg[v]! : 0) : Float64Array.from(inv)
  domain.attachmentAreaMm2 = lumpedArea(positions, interfaces)
  // An orphaned taper vertex has neither volume nor interface area; it must
  // not add a point attachment to tissue that is actually simulated.
  if (integrated) {
    domain.springs.unshift(...integratedSprings(positions, domain.tets))
    domain.links = domain.links.filter(l => domain.attachmentAreaMm2[l.p]! > 0)
    domain.anchors = domain.anchors.filter(a => domain.attachmentAreaMm2[a.p]! > 0)
    for (const link of domain.links) link.compliance = areaCompliance(link.compliance, domain.attachmentAreaMm2[link.p]!)
    for (const anchor of domain.anchors) anchor.compliance = areaCompliance(anchor.compliance, domain.attachmentAreaMm2[anchor.p]!)
  }
  // Arc length on the curved source through the planned major axis.
  let prev: Vec3 | null = null
  for (let i = 0; i <= 100; i++) { const xy = local(-half + length * i / 100, 0), p = sampler.sample(xy[0]!, xy[1]!).point; if (prev) domain.size.surfaceLengthMm += Math.hypot(p[0] - prev[0], p[1] - prev[1], p[2] - prev[2]); prev = p }
  if (Math.abs(domain.size.surfaceLengthMm - length) > .02) throw new Error('The requested length does not fit the supported cheek surface.')
  // Every movable node must belong to an element or an explicit support.
  const occupied = new Set(domain.tets.flatMap(t => t.vertices))
  for (let v = 0; v < inv.length; v++) if (!occupied.has(v)) domain.inverseMass[v] = 0
  if(circular) { domain.id += '/circular-bevel-v1'; domain.size.plannedLengthMm=0;domain.size.surfaceLengthMm=0;domain.banks=[] }
  else if(cut) { domain.id += \`/\${cut.identity}\`; domain.banks=[] }
  else domain.closure = planCheekClosure(domain, dermalBottom, center)
  return domain
}
`})),pt,mt=t((()=>{pt=`import type { ClosurePlan3D, ClosureState3D, SutureBite3D, TissueDomain3D, TissuePoint, Vec3 } from './domain'
import { edgeHeight } from './eversion'

export const DEEP_PRESET = { 10: 3, 15: 4, 20: 4 } as const
export const RUNNING_SPACING_MM = 4
// Provisional buried dermal loop: its entry and exit straddle the placement
// point along the incision. The continuous thread carries load through this
// short piece of dermis; it is still one loop and one knot, not extra stitches.
// This oblique path and its dimensions require clinical review.
export const DEEP_BITE_SPAN_MM = 2
// Presentation tempo, not surgical time: retain every small physics substep
// while shortening placement and the redundant tail of the settled sequence.
// Intermediate rebound and post-completion settling are checked at each release.
export const DEEP_TIGHTEN_STEPS = 12
export const RUNNING_TIGHTEN_STEPS = 6
export const CLOSURE_SETTLE_STEPS = 16
export const emptyClosureState = (): ClosureState3D => ({ stage: 'open', elapsed: 0, paused: false, assistance: false, startLengths: [], biteStarted: [] })
export function pointAt(p: ArrayLike<number>, point: TissuePoint): Vec3 {
  const out: Vec3 = [0, 0, 0]
  for (let i = 0; i < point.vertices.length; i++) for (let a = 0; a < 3; a++) out[a] = out[a]! + p[point.vertices[i]! * 3 + a]! * point.weights[i]!
  return out
}
export function pointDistance(p: ArrayLike<number>, a: TissuePoint, b: TissuePoint): number {
  const x = pointAt(p, a), y = pointAt(p, b)
  return Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2])
}
export function threadLength(p: ArrayLike<number>, bite: SutureBite3D): number {
  return bite.route.reduce((sum, point, i) => i === bite.route.length - 1 && !bite.closedRoute ? sum : sum + pointDistance(p, point, bite.route[(i+1)%bite.route.length]!), 0)
}
export function closureDuration(plan: ClosurePlan3D, stage: ClosureState3D['stage']): number {
  if(stage!=='open'){
    const bites=stage==='deep'?plan.deeps:plan.running,duration=stage==='deep'?DEEP_TIGHTEN_STEPS:RUNNING_TIGHTEN_STEPS
    if(bites.some(b=>b.startStep!==undefined))return Math.max(...bites.map(b=>(b.startStep??b.order*duration)+duration))+CLOSURE_SETTLE_STEPS
  }
  return stage === 'open' ? 0 : (stage === 'deep' ? plan.deeps.length * DEEP_TIGHTEN_STEPS : plan.running.length * RUNNING_TIGHTEN_STEPS) + CLOSURE_SETTLE_STEPS
}
export function biteProgress(state: ClosureState3D, bite: SutureBite3D): number {
  const edit=state.edits?.[bite.id]
  return edit ? edit.removed ? 0 : edit.placement : scheduledBiteProgress(state,bite)
}
export function scheduledBiteProgress(state: ClosureState3D, bite: SutureBite3D): number {
  if (state.stage === 'open') return 0
  if (!bite.chainId && state.stage === 'surface') return 1
  if (bite.chainId && state.stage === 'deep') return 0
  const duration = bite.chainId ? RUNNING_TIGHTEN_STEPS : DEEP_TIGHTEN_STEPS
  return Math.max(0, Math.min(1, (state.elapsed - (bite.startStep ?? bite.order * duration)) / duration))
}

/** Match actual cut edges using their rest-chart coordinate. Distances and
 * material bites are subsequently evaluated only in XYZ. No rim attraction
 * constraints are emitted: gaps are observations, not hidden closure ties. */
export function planCheekClosure(d: TissueDomain3D, dermalBottom: number[], center: Vec3, deepSpanMm = DEEP_BITE_SPAN_MM, runningSpacingMm = RUNNING_SPACING_MM, deepPattern: 'legacy' | 'symmetric-three' = 'legacy'): ClosurePlan3D {
  if (!Number.isFinite(deepSpanMm) || deepSpanMm < 0 || deepSpanMm > DEEP_BITE_SPAN_MM) throw new Error('Unsupported deep bite span.')
  if (!Number.isFinite(runningSpacingMm) || runningSpacingMm < 2 || runningSpacingMm > 4) throw new Error('Unsupported running bite spacing.')
  const angle = d.size.degrees * Math.PI / 180, c = Math.cos(angle), s = Math.sin(angle), xy = d.surface.chart
  const along = (v: number) => (xy[v * 2]! - center[0]) * c + (xy[v * 2 + 1]! - center[1]) * s
  const across = (v: number) => -(xy[v * 2]! - center[0]) * s + (xy[v * 2 + 1]! - center[1]) * c
  const all = [...d.wound].sort((a, b) => along(a) - along(b) || a - b), first = all[0]!, last = all[all.length - 1]!
  const sides = [all.filter(v => across(v) >= 0), all.filter(v => across(v) < 0)]
  for (const side of sides) { if (!side.includes(first)) side.push(first); if (!side.includes(last)) side.push(last); side.sort((a, b) => along(a) - along(b) || a - b) }
  const min = along(first), span = along(last) - min
  const edge = (side: number[], fraction: number): TissuePoint => {
    const u = min + span * fraction
    let k = 0
    while (k < side.length - 2 && along(side[k + 1]!) < u) k++
    const a = side[k]!, b = side[k + 1]!, t = Math.max(0, Math.min(1, (u - along(a)) / Math.max(1e-9, along(b) - along(a))))
    return { vertices: [a, b], weights: [1 - t, t] }
  }
  const inset = (e: TissuePoint, sign: number, mm: number): TissuePoint => {
    const p = pointAt(d.rest, e), n: Vec3 = [0, 0, 0]
    e.vertices.forEach((v, i) => { for (let a = 0; a < 3; a++) n[a] = n[a]! + d.surface.normals[v * 3 + a]! * e.weights[i]! })
    const metric = Math.hypot(s, c, (s * n[0] - c * n[1]) / Math.max(.2, n[2]))
    const x = p[0] - s * sign * mm / metric, y = p[1] + c * sign * mm / metric
    for (let k = 0; k < d.surface.triangles.length; k += 3) {
      const ids = Array.from(d.surface.triangles.slice(k, k + 3)), [a, b, cc] = ids as Vec3
      const ax = xy[a * 2]!, ay = xy[a * 2 + 1]!, bx = xy[b * 2]!, by = xy[b * 2 + 1]!, cx = xy[cc * 2]!, cy = xy[cc * 2 + 1]!
      const det = (by - cy) * (ax - cx) + (cx - bx) * (ay - cy)
      if (Math.abs(det) < 1e-9) continue
      const u = ((by - cy) * (x - cx) + (cx - bx) * (y - cy)) / det, v = ((cy - ay) * (x - cx) + (ax - cx) * (y - cy)) / det
      if (Math.min(u, v, 1 - u - v) >= -1e-7) return { vertices: ids, weights: [u, v, 1 - u - v] }
    }
    throw new Error('A suture bite leaves the supported skin.')
  }
  const depth = (p: TissuePoint, fraction: number): TissuePoint => {
    const t=fraction<=.5?fraction*2:(fraction-.5)*2
    const from=fraction<=.5?p.vertices:p.vertices.map(v=>d.dermalMiddle[v]!)
    const to=p.vertices.map(v=>fraction<=.5?d.dermalMiddle[v]!:dermalBottom[v]!)
    return { vertices:[...from,...to], weights:[...p.weights.map(w=>w*(1-t)),...p.weights.map(w=>w*t)] }
  }
  // Uniform chart intervals become uneven physical bites on the curved lateral
  // cheek. Space by the XYZ rest seam, independently of rendering subdivisions.
  const arc = [0]
  let previous: Vec3 | null = null
  for(let i=0;i<=200;i++) {
    const a=pointAt(d.rest,edge(sides[0]!,i/200)),b=pointAt(d.rest,edge(sides[1]!,i/200)),mid=a.map((p,k)=>(p+b[k]!)*.5) as Vec3
    if(previous)arc.push(arc[arc.length-1]!+Math.hypot(mid[0]-previous[0],mid[1]-previous[1],mid[2]-previous[2]))
    previous=mid
  }
  const seamLengthMm=arc[arc.length-1]!
  const atArc=(t:number)=>{const length=t*seamLengthMm;let i=1;while(i<arc.length-1&&arc[i]!<length)i++;return(i-1+(length-arc[i-1]!)/Math.max(1e-9,arc[i]!-arc[i-1]!))/200}
  const alongSeam = (fraction: number, offsetMm: number): number => {
    const index = fraction * 200, lower = Math.floor(index)
    const length = arc[lower]! + (arc[Math.min(200, lower + 1)]! - arc[lower]!) * (index - lower)
    return atArc(Math.max(0, Math.min(1, (length + offsetMm) / seamLengthMm)))
  }
  const bite = (fraction: number, order: number, running: boolean): SutureBite3D => {
    const edgeA = edge(sides[0]!, fraction), edgeB = edge(sides[1]!, fraction), setback = 2
    const surfaceA = inset(edgeA, 1, setback), surfaceB = inset(edgeB, -1, setback)
    const entry = alongSeam(fraction, -deepSpanMm / 2), exit = alongSeam(fraction, deepSpanMm / 2)
    const a = running ? surfaceA : depth(edge(sides[0]!, entry), .9), b = running ? surfaceB : depth(edge(sides[1]!, entry), .9)
    const innerA = depth(running ? edgeA : edge(sides[0]!, exit), running ? .6 : .65), innerB = depth(running ? edgeB : edge(sides[1]!, exit), running ? .6 : .65)
    // A buried bite rises into the dermis away from the incision, then exits
    // lower on the cut wall. This positive height differential supplies the
    // everting moment. The previous inverted V did the opposite. These are
    // provisional needle-path proportions, not calibrated clinical constants.
    // Dunn et al., JAAD 2024, doi:10.1016/j.jaad.2023.12.013.
    const route = running ? [a, depth(inset(edgeA,1,setback+.35),.35), innerA, innerB, depth(inset(edgeB,-1,setback+.35),.35), b] : [a, depth(surfaceA, .1), innerA, innerB, depth(surfaceB, .1), b]
    const segmentTargets = route.slice(0, -1).map((p, i) => p === innerA ? .12 : pointDistance(d.rest, p, route[i+1]!) * (running ? 1 : .85))
    if(!running)segmentTargets.push(.12)
    const targetMm = segmentTargets.reduce((sum,n)=>sum+n,0)
    const result: SutureBite3D = { id: \`\${running ? 'running' : 'deep'}-\${order}\`, a, b, surfaceA, surfaceB, edgeA, edgeB, route, segmentTargets, closedRoute: !running, restMm: 0, targetMm, order, chainId: running ? 'surface-1' : null, chainIndex: running ? order : null }
    result.restMm = threadLength(d.rest,result)
    return result
  }
  const n = deepPattern === 'symmetric-three' ? 3 : DEEP_PRESET[d.size.diameterMm as keyof typeof DEEP_PRESET]
  // Start at the actual midpoint, then halve the remaining intervals. Uniform
  // (i+1)/(n+1) placement put no deep at the midpoint for the four-bite preset,
  // leaving the widest part of the defect between both central deeps.
  const fractions: number[] = [], intervals: [number,number][] = [[0,1]]
  const opening = (t:number) => pointDistance(d.rest,edge(sides[0]!,atArc(t)),edge(sides[1]!,atArc(t)))
  while (fractions.length < n) {
    intervals.sort((a,b)=>(b[1]-b[0])-(a[1]-a[0]) || opening((b[0]+b[1])*.5)-opening((a[0]+a[1])*.5) || a[0]-b[0])
    const [from,to]=intervals.shift()!,mid=(from+to)*.5
    fractions.push(mid);intervals.push([from,mid],[mid,to])
  }
  const count = Math.ceil(seamLengthMm / runningSpacingMm)
  const running = Array.from({ length: count }, (_, i) => bite(atArc((i + .5) / count), i, true))
  const placed = (b: SutureBite3D, side: 'a' | 'b'): Vec3 => {
    const a = pointAt(d.rest,b.edgeA), bb = pointAt(d.rest,b.edgeB), entry = pointAt(d.rest,b[side]), origin = side === 'a' ? a : bb
    return entry.map((p,i)=>p-origin[i]!+(a[i]!+bb[i]!)*.5) as Vec3
  }
  for(let i=1;i<running.length;i++) {
    const previous = running[i-1]!, current = running[i]!, from=placed(previous,'b'),to=placed(current,'a')
    // Each grip interval begins at the previous exit: one connected open chain,
    // not a row of independent loops. Fixed grip at penetrations is idealized.
    current.route.unshift(previous.b)
    const diagonal = Math.hypot(to[0]-from[0],to[1]-from[1],to[2]-from[2])
    current.targetMm += diagonal; current.segmentTargets.unshift(diagonal)
    current.restMm = threadLength(d.rest,current)
  }
  const eversion: ClosurePlan3D['eversion'] = []
  // Observe both banks between bites, excluding the terminal 3 mm where the
  // cut ends in intact tissue. These probes exert no force on the solver.
  for (let mm = 3; mm <= seamLengthMm - 3; mm += 1) for (let side = 0; side < 2; side++) {
    const e = edge(sides[side]!, atArc(mm / seamLengthMm)), shoulder = inset(e, side ? -1 : 1, 2.5)
    eversion.push({ edge: e, shoulder, restHeightMm: edgeHeight(d.rest, e, shoulder) })
  }
  return {
    deeps: fractions.map((t, i) => bite(atArc(t), i, false)),
    running, seamLengthMm, eversion,
    gaps: Array.from({ length: Math.ceil(seamLengthMm * 4) + 1 }, (_, i) => { const t = atArc(i / Math.ceil(seamLengthMm * 4)); return { a: edge(sides[0]!, t), b: edge(sides[1]!, t) } }),
  }
}
`})),ht,gt=t((()=>{ht=`import { boundaryEdges } from '../mesh'

/** Restore the intended incision after topology cleanup. The legacy cutter
 * permits short edges to sit slightly off its polyline; those offsets must
 * not become different wound walls in a spatial-refinement comparison.
 * This changes rest geometry only. Never warp a simulated/closed surface. */
export function conformCutBoundary(xy: Float32Array, triangles: number[], cut: ReadonlySet<number>, path: readonly number[]): Float32Array {
  const projected = xy.slice(), boundary = new Set(boundaryEdges(Uint32Array.from(triangles)))
  for (const v of cut) {
    if (!boundary.has(v)) continue
    const x = xy[v*2]!, y = xy[v*2+1]!
    let nearest = Infinity, qx = x, qy = y
    for (let k=2;k<path.length;k+=2) {
      const ax=path[k-2]!,ay=path[k-1]!,dx=path[k]!-ax,dy=path[k+1]!-ay
      const t=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy)/Math.max(1e-15,dx*dx+dy*dy)))
      const px=ax+t*dx,py=ay+t*dy,d=Math.hypot(x-px,y-py)
      if(d<nearest){nearest=d;qx=px;qy=py}
    }
    if(nearest>.25)throw new Error('Incision cleanup exceeded its supported rest-geometry tolerance.')
    projected[v*2]=qx;projected[v*2+1]=qy
  }
  for(let k=0;k<triangles.length;k+=3) {
    const [a,b,c]=triangles.slice(k,k+3) as [number,number,number]
    if([a,b,c].every(v=>projected[v*2]===xy[v*2]&&projected[v*2+1]===xy[v*2+1]))continue
    const area=(p:Float32Array)=>(p[b*2]!-p[a*2]!)*(p[c*2+1]!-p[a*2+1]!)-(p[b*2+1]!-p[a*2+1]!)*(p[c*2]!-p[a*2]!)
    if(area(projected)*Math.sign(area(xy))<=Math.max(1e-12,Math.abs(area(xy))*.05))throw new Error(\`The exact incision needs local remeshing near triangle \${k/3}.\`)
  }
  return projected
}

/** Remove slivers formed when a cut passes close to a grid node. An interior
 * node can merge into the cut; nearby cut samples can merge with at most
 * 0.1 mm deviation from the original cut samples. Lid and outer-boundary nodes stay fixed.
 * Retriangulating material replaces an artificial minimum particle mass. */
export function collapseCutSlivers(xy: ArrayLike<number>, triangles: number[], cut: Set<number>, materialBoundary: ReadonlySet<number> = new Set()): number[] {
  let t = [...triangles]
  const area = (a:number,b:number,c:number) => (xy[b*2]! - xy[a*2]!) * (xy[c*2+1]! - xy[a*2+1]!) - (xy[b*2+1]! - xy[a*2+1]!) * (xy[c*2]! - xy[a*2]!)
  const key = (a:number,b:number) => a < b ? \`\${a}/\${b}\` : \`\${b}/\${a}\`
  // Retain original samples so successive collapses cannot accumulate several
  // independent 0.1 mm errors along the same part of the incision.
  const samples = new Map<string,number[]>()
  for(let sweep=0;sweep<4;sweep++) {
    const boundaryList = boundaryEdges(Uint32Array.from(t)), boundary = new Set(boundaryList), rim = new Map<number,number[]>()
    for(let k=0;k<boundaryList.length;k+=2)for(const [a,b] of [[boundaryList[k]!,boundaryList[k+1]!],[boundaryList[k+1]!,boundaryList[k]!]]) {
      const near=rim.get(a!)??[];near.push(b!);rim.set(a!,near)
    }
    const fans = new Map<number,number[]>(), neighbours = new Map<number,Set<number>>()
    for(let i=0;i<t.length;i+=3)for(let j=0;j<3;j++) {
      const v=t[i+j]!,fan=fans.get(v)??[],near=neighbours.get(v)??new Set<number>()
      fan.push(i);fans.set(v,fan);near.add(t[i+(j+1)%3]!);near.add(t[i+(j+2)%3]!);neighbours.set(v,near)
    }
    const candidates=[...fans.keys()].filter(v=>!boundary.has(v)||cut.has(v)).flatMap(drop=>[...neighbours.get(drop)!].filter(keep=>cut.has(keep)).map(keep=>({drop,keep,d:Math.hypot(xy[drop*2]!-xy[keep*2]!,xy[drop*2+1]!-xy[keep*2+1]!)}))).filter(c=>c.d<.8).sort((a,b)=>a.d-b.d||a.drop-b.drop||a.keep-b.keep)
    const touched=new Set<number>();let changed=false
    for(const {drop,keep} of candidates) {
      if(materialBoundary.has(drop))continue
      if(touched.has(drop)||touched.has(keep))continue
      const near=neighbours.get(drop)!
      if([...near].filter(v=>neighbours.get(keep)!.has(v)).length!==(boundary.has(drop)?1:2))continue
      let boundaryMerge: { other:number; original:number[] } | null = null
      if(boundary.has(drop)) {
        const edge=rim.get(drop)!
        if(edge.length!==2||!edge.includes(keep)||edge.some(v=>!cut.has(v)))continue
        const other=edge.find(v=>v!==keep)!,dx=xy[other*2]!-xy[keep*2]!,dy=xy[other*2+1]!-xy[keep*2+1]!
        const original = [...(samples.get(key(keep,drop)) ?? [keep,drop]), ...(samples.get(key(drop,other)) ?? [drop,other])]
        if(original.some(v=>{
          const rx=xy[v*2]!-xy[keep*2]!,ry=xy[v*2+1]!-xy[keep*2+1]!
          const along=Math.max(0,Math.min(1,(rx*dx+ry*dy)/Math.max(1e-12,dx*dx+dy*dy)))
          return Math.hypot(rx-along*dx,ry-along*dy)>.1
        }))continue
        boundaryMerge = { other, original }
      }
      const fan=fans.get(drop)!
      if(fan.some(i=>{
        const ids=t.slice(i,i+3)
        if(ids.includes(keep))return false
        const [a,b,c]=ids.map(v=>v===drop?keep:v)
        return area(a!,b!,c!)<.001
      }))continue
      if(boundaryMerge) {
        samples.delete(key(keep,drop));samples.delete(key(drop,boundaryMerge.other))
        samples.set(key(keep,boundaryMerge.other),boundaryMerge.original)
      }
      for(const i of fan)for(let j=0;j<3;j++)if(t[i+j]===drop)t[i+j]=keep
      for(const v of near)touched.add(v)
      touched.add(drop);touched.add(keep);changed=true
    }
    if(!changed)break
    t=t.filter((_,i)=>{
      const first=Math.floor(i/3)*3,a=t[first]!,b=t[first+1]!,c=t[first+2]!
      return a!==b&&b!==c&&c!==a
    })
  }
  return t
}

/** Improve incision-adjacent triangles without moving a vertex or changing an
 * edge on the cut/outer boundary. A flip is accepted only in a convex quad and
 * only when it improves the worse triangle's dimensionless shape quality. */
export function conditionCutMesh(xy: ArrayLike<number>, triangles: number[], cut: Set<number>, materialBoundary: ReadonlySet<number> = new Set()): number[] {
  const t = [...triangles]
  const area = (a: number, b: number, c: number) => (xy[b*2]! - xy[a*2]!) * (xy[c*2+1]! - xy[a*2+1]!) - (xy[b*2+1]! - xy[a*2+1]!) * (xy[c*2]! - xy[a*2]!)
  const quality = (a: number, b: number, c: number) => {
    const sum = [[a,b],[b,c],[c,a]].reduce((s, [v,w]) => s + (xy[v!*2]! - xy[w!*2]!)**2 + (xy[v!*2+1]! - xy[w!*2+1]!)**2, 0)
    return 2 * Math.sqrt(3) * area(a,b,c) / Math.max(1e-12, sum)
  }
  for (let sweep = 0; sweep < 12; sweep++) {
    const edges = new Map<string, { a: number; b: number; c: number; index: number }>()
    const touched = new Set<number>(); let changed = false
    for (let index = 0; index < t.length; index += 3) for (let j = 0; j < 3; j++) {
      const a = t[index+j]!, b = t[index+(j+1)%3]!, c = t[index+(j+2)%3]!
      const key = a < b ? \`\${a}/\${b}\` : \`\${b}/\${a}\`, other = edges.get(key)
      if (!other) { edges.set(key, { a,b,c,index }); continue }
      if (touched.has(index) || touched.has(other.index) || ![a,b,c,other.c].some(v => cut.has(v))) continue
      if (materialBoundary.has(a) && materialBoundary.has(b)) continue
      if (other.a !== b || other.b !== a) continue
      const d = other.c
      if (area(c,a,d) <= 1e-8 || area(c,d,b) <= 1e-8) continue
      if (Math.min(quality(c,a,d), quality(c,d,b)) <= Math.min(quality(a,b,c), quality(b,a,d)) + 1e-5) continue
      t.splice(index, 3, c,a,d); t.splice(other.index, 3, c,d,b)
      touched.add(index); touched.add(other.index); changed = true; break
    }
    if (!changed) break
  }
  return t
}
`})),_t,vt=t((()=>{_t=`import type { Vec3 } from './domain'
export interface RigidSurface { id: string; positions: number[]; triangles: number[] }
export interface TrianglePoint { point: Vec3; weights: Vec3; normal: Vec3; distance: number; vertices: Vec3 }
const dot = (a: Vec3, b: Vec3) => a[0]*b[0]+a[1]*b[1]+a[2]*b[2]
const sub = (a: Vec3,b: Vec3):Vec3 => [a[0]-b[0],a[1]-b[1],a[2]-b[2]]
/** Closest point on a triangle, including edges and vertices (Ericson regions). */
export function trianglePoint(p: Vec3, positions: ArrayLike<number>, vertices: Vec3): TrianglePoint {
 const [a,b,c] = vertices.map(v=>[positions[v*3]!,positions[v*3+1]!,positions[v*3+2]!] as Vec3) as [Vec3,Vec3,Vec3]
 const ab=sub(b,a),ac=sub(c,a),ap=sub(p,a),d1=dot(ab,ap),d2=dot(ac,ap)
 let weights:Vec3
 if(d1<=0&&d2<=0)weights=[1,0,0]
 else {
  const bp=sub(p,b),d3=dot(ab,bp),d4=dot(ac,bp),vc=d1*d4-d3*d2
  if(d3>=0&&d4<=d3)weights=[0,1,0]
  else if(vc<=0&&d1>=0&&d3<=0){const v=d1/(d1-d3);weights=[1-v,v,0]}
  else {
   const cp=sub(p,c),d5=dot(ab,cp),d6=dot(ac,cp),vb=d5*d2-d1*d6,va=d3*d6-d5*d4
   if(d6>=0&&d5<=d6)weights=[0,0,1]
   else if(vb<=0&&d2>=0&&d6<=0){const v=d2/(d2-d6);weights=[1-v,0,v]}
   else if(va<=0&&(d4-d3)>=0&&(d5-d6)>=0){const v=(d4-d3)/((d4-d3)+(d5-d6));weights=[0,1-v,v]}
   else {const denom=va+vb+vc;weights=Math.abs(denom)<1e-18?[1,0,0]:[va/denom,vb/denom,vc/denom]}
  }
 }
 const point:Vec3=[0,0,0]
 for(let j=0;j<3;j++)point[j]=a[j]!*weights[0]+b[j]!*weights[1]+c[j]!*weights[2]
 const normal:Vec3=[ab[1]*ac[2]-ab[2]*ac[1],ab[2]*ac[0]-ab[0]*ac[2],ab[0]*ac[1]-ab[1]*ac[0]],length=Math.hypot(...normal)
 for(let j=0;j<3;j++)normal[j]=length>1e-12?normal[j]!/length:0
 return {point,normal,weights,vertices,distance:Math.hypot(...sub(p,point))}
}
export function closestSurface(p:Vec3, positions:ArrayLike<number>,triangles:ArrayLike<number>):TrianglePoint|null {
 let best:TrianglePoint|null=null
 for(let i=0;i<triangles.length;i+=3){const q=trianglePoint(p,positions,[triangles[i]!,triangles[i+1]!,triangles[i+2]!]);if(!best||q.distance<best.distance)best=q}
 return best
}
/** Static broad phase. One-sided closed-support contact has no attraction. */
export class RigidContactIndex {
 private readonly cells=new Map<string,number[]>()
 private readonly cellBounds=[Infinity,Infinity,Infinity,-Infinity,-Infinity,-Infinity]
 private cellY=0
 private cellZ=0
 private denseCells:(number[]|undefined)[]|undefined
 private readonly bounds:number[]=[]
 private readonly prepared: PreparedTriangle[]=[]
 readonly positions:number[]=[];readonly triangles:number[]=[]
 constructor(surfaces:RigidSurface[]) {
  for(const surface of surfaces){const offset=this.positions.length/3;this.positions.push(...surface.positions);this.triangles.push(...surface.triangles.map(v=>v+offset))}
  for(let i=0;i<this.triangles.length;i+=3){
   const ids=this.triangles.slice(i,i+3),minimum=[0,1,2].map(a=>Math.min(...ids.map(v=>this.positions[v*3+a]!))),maximum=[0,1,2].map(a=>Math.max(...ids.map(v=>this.positions[v*3+a]!)))
   this.bounds.push(...minimum,...maximum)
   this.prepared.push(prepareTriangle(this.positions,ids as Vec3))
   const lo=minimum.map(x=>Math.floor((x-1)/5)),hi=maximum.map(x=>Math.floor((x+1)/5))
   for(let x=lo[0]!;x<=hi[0]!;x++)for(let y=lo[1]!;y<=hi[1]!;y++)for(let z=lo[2]!;z<=hi[2]!;z++){const key=\`\${x}/\${y}/\${z}\`,values=this.cells.get(key)??[];values.push(i);this.cells.set(key,values)}
  }
  if(!this.cells.size)return
  for(const key of this.cells.keys()) {
   const cell=key.split('/').map(Number)
   for(let a=0;a<3;a++){this.cellBounds[a]=Math.min(this.cellBounds[a]!,cell[a]!);this.cellBounds[3+a]=Math.max(this.cellBounds[3+a]!,cell[a]!)}
  }
  this.cellY=this.cellBounds[4]!-this.cellBounds[1]!+1
  this.cellZ=this.cellBounds[5]!-this.cellBounds[2]!+1
  const count=(this.cellBounds[3]!-this.cellBounds[0]!+1)*this.cellY*this.cellZ
  // Static supports occupy a small bounded grid (1,001 cells for the cheek).
  // Preserve each cell's candidate order while removing per-query string keys.
  // Widely separated future supports retain the sparse map instead of making
  // an array proportional to the empty space between them.
  if(count>0&&count<=262144) {
   this.denseCells=new Array(count)
   for(const [key,ids] of this.cells) {
    const [x,y,z]=key.split('/').map(Number)
    this.denseCells[((x!-this.cellBounds[0]!)*this.cellY+y!-this.cellBounds[1]!)*this.cellZ+z!-this.cellBounds[2]!]=ids
   }
   this.cells.clear()
  }
 }
 closest(p:Vec3):TrianglePoint|null {
  const x=Math.floor(p[0]/5),y=Math.floor(p[1]/5),z=Math.floor(p[2]/5)
  if(x<this.cellBounds[0]!||y<this.cellBounds[1]!||z<this.cellBounds[2]!||x>this.cellBounds[3]!||y>this.cellBounds[4]!||z>this.cellBounds[5]!)return null
  const ids=this.denseCells
   ?this.denseCells[((x-this.cellBounds[0]!)*this.cellY+y-this.cellBounds[1]!)*this.cellZ+z-this.cellBounds[2]!]
   :this.cells.get(\`\${x}/\${y}/\${z}\`)
  let best:PreparedTriangle|null=null,bestSquared=Infinity,bestV=0,bestW=0
  for(const i of ids??[]){
   const index=i*2
   let lowerBound=0
   for(let a=0;a<3;a++){const delta=Math.max(0,this.bounds[index+a]!-p[a]!,p[a]!-this.bounds[index+3+a]!);lowerBound+=delta*delta}
   if(lowerBound>bestSquared)continue
   const t=this.prepared[i/3]!,apx=p[0]-t.ax,apy=p[1]-t.ay,apz=p[2]-t.az
   const d1=t.bx*apx+t.by*apy+t.bz*apz,d2=t.cx*apx+t.cy*apy+t.cz*apz
   let v=0,w=0
   if(!(d1<=0&&d2<=0)) {
    const bpx=apx-t.bx,bpy=apy-t.by,bpz=apz-t.bz,d3=t.bx*bpx+t.by*bpy+t.bz*bpz,d4=t.cx*bpx+t.cy*bpy+t.cz*bpz,vc=d1*d4-d3*d2
    if(d3>=0&&d4<=d3)v=1
    else if(vc<=0&&d1>=0&&d3<=0)v=d1/(d1-d3)
    else {
     const cpx=apx-t.cx,cpy=apy-t.cy,cpz=apz-t.cz,d5=t.bx*cpx+t.by*cpy+t.bz*cpz,d6=t.cx*cpx+t.cy*cpy+t.cz*cpz,vb=d5*d2-d1*d6,va=d3*d6-d5*d4
     if(d6>=0&&d5<=d6)w=1
     else if(vb<=0&&d2>=0&&d6<=0)w=d2/(d2-d6)
     else if(va<=0&&(d4-d3)>=0&&(d5-d6)>=0){w=(d4-d3)/((d4-d3)+(d5-d6));v=1-w}
     else {const denominator=va+vb+vc;if(Math.abs(denominator)>=1e-18){v=vb/denominator;w=vc/denominator}}
    }
   }
   const dx=apx-t.bx*v-t.cx*w,dy=apy-t.by*v-t.cy*w,dz=apz-t.bz*v-t.cz*w,squared=dx*dx+dy*dy+dz*dz
   if(squared<bestSquared){best=t;bestSquared=squared;bestV=v;bestW=w}
  }
  if(!best)return null
  return {point:[best.ax+best.bx*bestV+best.cx*bestW,best.ay+best.by*bestV+best.cy*bestW,best.az+best.bz*bestV+best.cz*bestW],weights:[1-bestV-bestW,bestV,bestW],normal:best.normal,vertices:best.vertices,distance:Math.sqrt(bestSquared)}
 }
}

interface PreparedTriangle { ax:number;ay:number;az:number;bx:number;by:number;bz:number;cx:number;cy:number;cz:number;normal:Vec3;vertices:Vec3 }
/** The rigid support never moves: compute its edges and normal once, and
 * allocate a contact result only for the nearest triangle, not every candidate. */
function prepareTriangle(p:ArrayLike<number>,vertices:Vec3):PreparedTriangle {
 const [a,b,c]=vertices,ax=p[a*3]!,ay=p[a*3+1]!,az=p[a*3+2]!,bx=p[b*3]!-ax,by=p[b*3+1]!-ay,bz=p[b*3+2]!-az,cx=p[c*3]!-ax,cy=p[c*3+1]!-ay,cz=p[c*3+2]!-az
 const nx=by*cz-bz*cy,ny=bz*cx-bx*cz,nz=bx*cy-by*cx,length=Math.hypot(nx,ny,nz)
 return {ax,ay,az,bx,by,bz,cx,cy,cz,vertices,normal:length>1e-12?[nx/length,ny/length,nz/length]:[0,0,0]}
}
`})),yt,bt=t((()=>{yt=`import { activeVertices, boundaryEdges, conformToPolyline } from '../mesh'
import { tetrahedronVolume } from '../tissueVolume'
import { collapseCutSlivers, conditionCutMesh } from './conditionMesh'
import { RigidContactIndex } from './contact'
import { planCheekIncision, skinDepth, SurfaceSampler, type CheekSurfaceSource } from './buildCheek'
import type { TissueDomain3D, Vec3 } from './domain'

import type { CircularDefect, DefectInspection } from './defectTypes'
export type { CircularDefect, DefectInspection, InspectionMesh } from './defectTypes'

const dot = (a: Vec3, b: Vec3) => a[0]*b[0]+a[1]*b[1]+a[2]*b[2]
const sub = (a: Vec3, b: Vec3): Vec3 => [a[0]-b[0],a[1]-b[1],a[2]-b[2]]
const unit = (v: Vec3): Vec3 => { const l = Math.hypot(...v); if(l < 1e-8) throw new Error('Degenerate bevel direction.'); return v.map(x=>x/l) as Vec3 }
const at = (p: ArrayLike<number>, v: number): Vec3 => [p[v*3]!,p[v*3+1]!,p[v*3+2]!]

/** Both outlines share the same surface lookup/axis-fit algorithm. A 15 mm
 * circle fits every radial direction to 15 mm; reusing the ellipse's long-axis
 * scale would distort the defect. Opposite rays share a fitted diameter. */
export function planCircularDefect(source: CheekSurfaceSource, centerMm: [number, number], sampler = new SurfaceSampler(source), diameterMm: 10 | 15 | 20 = 15) {
  const ellipse = planCheekIncision(source, { diameterMm, degrees: 0, centerMm }, sampler)
  const sx = ellipse.fitAxis(1, 0, diameterMm), sy = ellipse.sy, radius = diameterMm / 2
  const scales = Array.from({length:48},(_,i)=>ellipse.fitAxis(Math.cos(i*Math.PI/48),Math.sin(i*Math.PI/48),diameterMm))
  const scaleAt = (x:number,y:number) => {const f=((Math.atan2(y,x)/Math.PI*48)%48+48)%48,i=Math.floor(f);return scales[i]!*(1-(f-i))+scales[(i+1)%48]!*(f-i)}
  const local = (u:number,v:number):[number,number] => {const scale=scaleAt(u,v);return [centerMm[0]+u/scale,centerMm[1]+v/scale]}
  const radiusAt = (x:number,y:number) => Math.hypot(x-centerMm[0],y-centerMm[1])*scaleAt(x-centerMm[0],y-centerMm[1])
  const path: number[] = []
  for(let i=0;i<=96;i++)path.push(...local(radius*Math.cos(i*Math.PI/48),radius*Math.sin(i*Math.PI/48)))
  return { ellipse, sx, sy, radius, local, path, radiusAt }
}

export function buildCircularDefect(source: CheekSurfaceSource, defect: CircularDefect, degrees = 0): DefectInspection {
  if(defect.shape!=='circle'||![10,15,20].includes(defect.diameterMm)||!Number.isFinite(degrees)||defect.bevelDegrees!==45||defect.depth!=='superficial-fat-interface'||defect.geometrySha256!==source.geometrySha256)throw new Error('Unsupported defect definition.')
  const sampler = new SurfaceSampler(source), plan = planCircularDefect(source,defect.centerMm,sampler,defect.diameterMm), [cx,cy]=defect.centerMm
  const radius = defect.diameterMm / 2, half = radius * 3
  const repair = degrees === 0 ? plan.ellipse : planCheekIncision(source, {diameterMm:defect.diameterMm, degrees, centerMm:defect.centerMm}, sampler)
  const radial = plan.radiusAt
  const conformed=conformToPolyline(Float32Array.from(source.chart),Uint32Array.from(source.triangles),plan.path,.12)
  if(conformed.breaks.length)throw new Error('The defect crosses an unsupported opening.')
  const xy=conformed.positions, boundary=new Set(conformed.chain)
  // Keep the original measured diameter; put rim nodes on the analytic circle.
  for(const v of boundary){const x=xy[v*2]!-cx,y=xy[v*2+1]!-cy,r=radial(x+cx,y+cy);xy[v*2]=cx+x*radius/r;xy[v*2+1]=cy+y*radius/r}
  let faces:number[]=[]
  for(let i=0;i<conformed.triangles.length;i+=3){const ids=Array.from(conformed.triangles.slice(i,i+3));const x=ids.reduce((s,v)=>s+xy[v*2]!,0)/3,y=ids.reduce((s,v)=>s+xy[v*2+1]!,0)/3;if(radial(x,y)>=radius-1e-5)faces.push(...ids)}
  faces=conditionCutMesh(xy,collapseCutSlivers(xy,faces,boundary),boundary)
  const active=activeVertices(Uint32Array.from(faces),xy.length/2), original=Array.from(active.keys()).filter(v=>active[v]), remap=new Map(original.map((v,i)=>[v,i]))
  const triangles=Uint32Array.from(faces.map(v=>remap.get(v)!)),count=original.length,samples=original.map(v=>sampler.sample(xy[v*2]!,xy[v*2+1]!))
  const edges=boundaryEdges(triangles), rim=[...boundary].map(v=>remap.get(v)).filter((v):v is number=>v!==undefined), rimSet=new Set(rim)
  const positions=new Float64Array(count*12),flat=new Float64Array(count*12),uv=new Float32Array(count*2),normals=new Float32Array(count*3)
  const pinned=source.pinned.map(v=>remap.get(v)).filter((v):v is number=>v!==undefined)
  const layerDepth=[(y:number)=>skinDepth(y),(y:number)=>skinDepth(y)*.5,(y:number)=>skinDepth(y)+1]
  const layerMeshes=layerDepth.map((depth,i)=>({id:\`inspection-layer-\${i}\`,positions:source.positions.map((n,j)=>n-source.normals[j]!*depth(source.chart[Math.floor(j/3)*2+1]!)),triangles:source.triangles}))
  const layers=layerMeshes.map(mesh=>new RigidContactIndex([mesh]))
  let minimumDepthMm=Infinity,maximumDepthMm=0,minimumBevelDegrees=Infinity,maximumBevelDegrees=0,maximumBedMismatchMm=0
  const inward = (x:number,y:number,n:Vec3):Vec3 => {const dx=cx-x,dy=cy-y;return unit([dx,dy,-(dx*n[0]+dy*n[1])/n[2]])}
  const intersectLayer=(top:Vec3,direction:Vec3,index:number,nominal:number):Vec3=>{
    let lo=0,hi=nominal*2.5
    for(let k=0;k<20;k++){
      const d=(lo+hi)/2,p=top.map((v,a)=>v+direction[a]!*d) as Vec3,q=layers[index]!.closest(p)
      if(!q)throw new Error('The bevel leaves its tissue interface.')
      const normal=q.normal[2]<0?q.normal.map(n=>-n) as Vec3:q.normal
      if(dot(sub(p,q.point),normal)>0)lo=d;else hi=d
    }
    return top.map((v,a)=>v+direction[a]!*(lo+hi)/2) as Vec3
  }
  for(let v=0;v<count;v++){
    const s=samples[v]!,r=radial(xy[original[v]!*2]!,xy[original[v]!*2+1]!),t=Math.max(0,1-(r-radius)/4),weight=rimSet.has(v)?1:t*t
    positions.set(s.point,v*3);flat.set(s.point,v*3);uv.set(s.uv,v*2);normals.set(s.normal,v*3)
    const direction=weight>0?inward(s.point[0],s.point[1],s.normal).map((n,a)=>n*weight-s.normal[a]!) as Vec3:s.normal.map(n=>-n) as Vec3
    for(let layer=0;layer<3;layer++){
      const d=layerDepth[layer]!(s.point[1]),base=s.point.map((n,a)=>n-s.normal[a]!*d) as Vec3
      const p=weight>0?intersectLayer(s.point,direction,layer,d):base
      positions.set(p,(v+(layer+1)*count)*3);flat.set(base,(v+(layer+1)*count)*3)
    }
    if(rimSet.has(v)){
      const delta=sub(at(positions,v+3*count),s.point),depth=-dot(delta,s.normal),tangent=Math.sqrt(Math.max(0,dot(delta,delta)-depth*depth)),angle=Math.atan2(depth,tangent)*180/Math.PI
      minimumDepthMm=Math.min(minimumDepthMm,depth);maximumDepthMm=Math.max(maximumDepthMm,depth);minimumBevelDegrees=Math.min(minimumBevelDegrees,angle);maximumBevelDegrees=Math.max(maximumBevelDegrees,angle)
      maximumBedMismatchMm=Math.max(maximumBedMismatchMm,layers[2]!.closest(at(positions,v+3*count))!.distance)
    }
  }
  let minimumCellRatio=Infinity
  // Compare signed cells BEFORE any winding correction. Reversing indices is
  // not permitted to disguise a folded sheared column. Check each layer's XY
  // orientation as well as the three tetrahedra in every affected prism.
  for(let i=0;i<triangles.length;i+=3){
    const ids=Array.from(triangles.slice(i,i+3)).sort((a,b)=>a-b) as Vec3
    if(!ids.some(v=>radial(samples[v]!.point[0],samples[v]!.point[1])<(radius+4.1)))continue
    for(const [upper,lower] of [[0,2],[2,1],[1,3]]){
      const [a,b,c]=ids.map(v=>v+upper!*count),[aa,bb,cc]=ids.map(v=>v+lower!*count)
      for(const cell of [[a,b,c,cc],[a,b,bb,cc],[a,aa,bb,cc]] as [number,number,number,number][]){const before=tetrahedronVolume(flat,...cell),after=tetrahedronVolume(positions,...cell),ratio=after/before;if(!Number.isFinite(ratio)||ratio<=.05||Math.abs(after)<1e-8)throw Object.assign(new Error('The beveled defect folds a tissue cell.'), { cell, before, after, points: cell.map(v=>at(positions,v)), original:cell.map(v=>at(flat,v)) });minimumCellRatio=Math.min(minimumCellRatio,ratio)}
    }
    for(const layer of [0,1,2,3]){const [a,b,c]=ids.map(v=>at(positions,v+layer*count)),[fa,fb,fc]=ids.map(v=>at(flat,v+layer*count));const area=(b![0]-a![0])*(c![1]-a![1])-(c![0]-a![0])*(b![1]-a![1]),before=(fb![0]-fa![0])*(fc![1]-fa![1])-(fc![0]-fa![0])*(fb![1]-fa![1]);if(area*before<=0)throw new Error('A beveled layer overlaps its neighbour.')}
  }
  const dermis:number[]=[],fat:number[]=[]
  for(let i=0;i<edges.length;i+=2){const a=edges[i]!,b=edges[i+1]!;if(!rimSet.has(a)||!rimSet.has(b))continue;for(const [upper,lower,target] of [[0,2,dermis],[2,1,dermis],[1,3,fat]] as [number,number,number[]][]){target.push(a+upper*count,a+lower*count,b+upper*count,b+upper*count,a+lower*count,b+lower*count)}}
  if(dermis.length!==rim.length*12||fat.length!==rim.length*6)throw new Error('The beveled wound wall is not continuous.')
  let minimumWallAngleDegrees=Infinity,maximumWallAngleDegrees=0
  for(const wall of [dermis,fat])for(let i=0;i<wall.length;i+=3){
    const ids=wall.slice(i,i+3),a=at(positions,ids[0]!),ab=sub(at(positions,ids[1]!),a),ac=sub(at(positions,ids[2]!),a)
    const normal=unit([ab[1]*ac[2]-ab[2]*ac[1],ab[2]*ac[0]-ab[0]*ac[2],ab[0]*ac[1]-ab[1]*ac[0]])
    const restNormal=unit(ids.reduce<Vec3>((sum,v)=>sum.map((value,k)=>value+normals[(v%count)*3+k]!) as Vec3,[0,0,0]))
    const angle=Math.acos(Math.min(1,Math.abs(dot(normal,restNormal))))*180/Math.PI
    minimumWallAngleDegrees=Math.min(minimumWallAngleDegrees,angle);maximumWallAngleDegrees=Math.max(maximumWallAngleDegrees,angle)
  }
  // Non-neighbour rim segments cannot cross on any depth section. Together
  // with positive layer orientation/cell volumes this guards the local shell.
  const rimEdges: [number,number][]=[]
  for(let i=0;i<edges.length;i+=2)if(rimSet.has(edges[i]!)&&rimSet.has(edges[i+1]!))rimEdges.push([edges[i]!,edges[i+1]!])
  const orient=(a:Vec3,b:Vec3,c:Vec3)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0])
  for(let layer=0;layer<4;layer++)for(let i=0;i<rimEdges.length;i++)for(let j=i+1;j<rimEdges.length;j++){
    const first=rimEdges[i]!,second=rimEdges[j]!
    if(first.some(v=>second.includes(v)))continue
    const [a,b]=first.map(v=>at(positions,v+layer*count)),[c,d]=second.map(v=>at(positions,v+layer*count))
    if(orient(a!,b!,c!)*orient(a!,b!,d!)<-1e-10&&orient(c!,d!,a!)*orient(c!,d!,b!)<-1e-10)throw new Error('The beveled wall overlaps itself.')
  }
  const support=new RigidContactIndex(source.supports)
  for(let v=0;v<count;v++)if(radial(samples[v]!.point[0],samples[v]!.point[1])<(radius+4))for(let layer=0;layer<4;layer++){const p=at(positions,v+layer*count),q=support.closest(p);if(q&&q.distance<1&&dot(sub(p,q.point),q.normal)<-.001)throw new Error('The bevel intersects deeper support.');if(Math.hypot(...sub(p,source.globe.center))<source.globe.radius)throw new Error('The bevel intersects the globe.')}
  // Ray-aligned closed boundary of (ellipse removal minus circular removal).
  // Its skin crescents and beveled inner wall show exactly what preparation
  // removes; this mesh is displayed ONLY before preparing the rehearsal.
  const removal:number[]=[],removalTriangles:number[]=[],ellipse:number[]=[]
  let maximumSurfaceOutsideMm=0,minimumDeepInsetMm=Infinity
  for(let i=0;i<96;i++){
    const theta=i*Math.PI/48,[x,y]=plan.local(radius*Math.cos(theta),radius*Math.sin(theta)),s=sampler.sample(x,y),u=((x-cx)*repair.cos+(y-cy)*repair.sin)*repair.sx,v=(-(x-cx)*repair.sin+(y-cy)*repair.cos)*repair.sy,q=radius*u*u/(half*half),scale=defect.diameterMm/(Math.abs(v)+Math.sqrt(v*v+2*defect.diameterMm*q)),e=sampler.sample(cx+(x-cx)*scale,cy+(y-cy)*scale)
    const bottom=intersectLayer(s.point,inward(x,y,s.normal).map((n,a)=>n-s.normal[a]!) as Vec3,2,skinDepth(y)+1)
    const eb=e.point.map((n,a)=>n-e.normal[a]!*(skinDepth(e.point[1])+1)) as Vec3
    removal.push(...s.point,...(scale<1?s.point:e.point),...eb,...bottom);ellipse.push(...e.point)
  }
  ellipse.push(...ellipse.slice(0,3))
  const margin=(p:Vec3)=>{const u=((p[0]-cx)*repair.cos+(p[1]-cy)*repair.sin)*repair.sx,v=(-(p[0]-cx)*repair.sin+(p[1]-cy)*repair.cos)*repair.sy;return Math.min(half-Math.abs(u),radius*(1-(u/half)**2)-Math.abs(v))}
  for(const v of rim){maximumSurfaceOutsideMm=Math.max(maximumSurfaceOutsideMm,-margin(at(positions,v)));for(const layer of [1,2,3])minimumDeepInsetMm=Math.min(minimumDeepInsetMm,margin(at(positions,v+layer*count)))}
  if(maximumSurfaceOutsideMm>.12||minimumDeepInsetMm<=0)throw new Error('The prepared ellipse does not contain the complete defect.')
  for(let i=0;i<96;i++)for(let k=1;k<4;k++){const j=(i+1)%96,a=i*4+k,b=j*4+k,c=i*4+(k+1)%4,d=j*4+(k+1)%4;removalTriangles.push(a,c,b,b,c,d)}
  // Drape the skin crescents on the source surface rather than spanning a
  // curved cheek with a single chord (which would disappear below the skin).
  const bands:number[][]=[]
  for(let i=0;i<96;i++){
    const a=at(removal,i*4),b=at(removal,i*4+1),row=[i*4]
    for(let j=1;j<32;j++){row.push(removal.length/3);removal.push(...sampler.sample(a[0]+(b[0]-a[0])*j/32,a[1]+(b[1]-a[1])*j/32).point)}
    row.push(i*4+1);bands.push(row)
  }
  for(let i=0;i<96;i++)for(let j=0;j<32;j++){const a=bands[i]![j]!,b=bands[(i+1)%96]![j]!,c=bands[i]![j+1]!,d=bands[(i+1)%96]![j+1]!;removalTriangles.push(a,c,b,b,c,d)}
  const axisLength=(dx:number,dy:number)=>{let length=0,previous:Vec3|null=null;for(let i=0;i<=100;i++){const r=-radius+i*defect.diameterMm/100,p=sampler.sample(...plan.local(dx*r,dy*r)).point;if(previous)length+=Math.hypot(...sub(p,previous));previous=p}return length}
  const diameters=Array.from({length:12},(_,i)=>axisLength(Math.cos(i*Math.PI/12),Math.sin(i*Math.PI/12)))
  // Independently measure the tessellated rim, not just the fitted design.
  const rimDiameters=Array.from({length:24},(_,i)=>{
    const dx=Math.cos(i*Math.PI/24),dy=Math.sin(i*Math.PI/24),crossings:number[]=[]
    for(const edge of rimEdges){const [a,b]=edge.map(v=>at(positions,v)),sa=(a![0]-cx)*dy-(a![1]-cy)*dx,sb=(b![0]-cx)*dy-(b![1]-cy)*dx
      if(sa*sb>0||Math.abs(sa-sb)<1e-12)continue
      const t=sa/(sa-sb);crossings.push((a![0]+(b![0]-a![0])*t-cx)*dx+(a![1]+(b![1]-a![1])*t-cy)*dy)
    }
    if(crossings.length<2)throw new Error('The circular rim is incomplete.')
    const lo=Math.min(...crossings),hi=Math.max(...crossings);let length=0,previous:Vec3|null=null
    for(let k=0;k<=100;k++){const d=lo+(hi-lo)*k/100,p=sampler.sample(cx+dx*d,cy+dy*d).point;if(previous)length+=Math.hypot(...sub(p,previous));previous=p}
    return length
  })
  const minimumRimDiameterMm=Math.min(...rimDiameters),maximumRimDiameterMm=Math.max(...rimDiameters)
  if(minimumRimDiameterMm<defect.diameterMm-.24||maximumRimDiameterMm>defect.diameterMm+.24)throw new Error('The circular rim exceeds the incision-conformance tolerance.')
  const measurements={minimumRimDiameterMm,maximumRimDiameterMm,minimumDiameterMm:Math.min(...diameters),maximumDiameterMm:Math.max(...diameters),diameterXmm:axisLength(1,0),diameterYmm:axisLength(0,1),minimumDepthMm,maximumDepthMm,minimumBevelDegrees,maximumBevelDegrees,minimumCellRatio,maximumBedMismatchMm,minimumWallAngleDegrees,maximumWallAngleDegrees,maximumSurfaceOutsideMm,minimumDeepInsetMm}
  if(Math.max(Math.abs(measurements.minimumDiameterMm-defect.diameterMm),Math.abs(measurements.maximumDiameterMm-defect.diameterMm))>.02||minimumBevelDegrees<44.5||maximumBevelDegrees>45.5||maximumBedMismatchMm>.02||minimumWallAngleDegrees<42||maximumWallAngleDegrees>48)throw new Error('The defect misses its measured geometry limits.')
  return {stage:'defect-inspection',defect,...(degrees ? {repairDegrees:degrees} : {}),geometry:{sourceIndices:Uint32Array.from(original),chart:Float32Array.from(original.flatMap(v=>[xy[v*2]!,xy[v*2+1]!])),positions,triangles,count,uv,normals,pinned,rim,dermis:Uint32Array.from(dermis),fat:Uint32Array.from(fat)},bed:{positions:Float64Array.from(layerMeshes[2]!.positions),triangles:Uint32Array.from(source.triangles.filter((_,i)=>{const k=Math.floor(i/3)*3;return source.triangles.slice(k,k+3).some(v=>radial(source.chart[v*2]!,source.chart[v*2+1]!)<(radius+4))}))},preparation:{positions:Float64Array.from(removal),triangles:Uint32Array.from(removalTriangles)},ellipse:Float64Array.from(ellipse),measurements}
}

/** Compare with the actual prepared cut, not only its analytic design outline.
 * The supported cheek is a single-valued chart. Cross-sections of its wall at
 * surface and dermal depths must enclose the original rim, including its bevel. */
export function verifyPreparationContainsDefect(inspection: DefectInspection, domain: TissueDomain3D, source?: CheekSurfaceSource): { surfaceOutsideMm: number; minimumDeepInsetMm: number } {
  const rim = new Set(domain.wound), edges = boundaryEdges(domain.surface.triangles), pairs: [number, number][] = []
  for (let i=0;i<edges.length;i+=2) if(rim.has(edges[i]!) && rim.has(edges[i+1]!)) pairs.push([edges[i]!,edges[i+1]!])
  if (!pairs.length) throw new Error('The prepared domain has no wound boundary.')
  const carried = new Map<number,number>()
  for(let i=0;i<domain.walls.fat.length;i+=6){carried.set(domain.walls.fat[i]!-domain.surface.count,domain.walls.fat[i+1]!);carried.set(domain.walls.fat[i+2]!-domain.surface.count,domain.walls.fat[i+5]!)}
  // An oblique/vertical repair may end above the carried-fat layer. Close its
  // lower footprint at the actual dermal bottom there, only if that entire
  // transition is superior to the original defect. Never invent fat beneath
  // a missing wound wall or accept a defect which crosses the transition.
  if (source) {
    const highestDefect = Math.max(...inspection.geometry.rim.map(v => inspection.geometry.positions[(v + 3 * inspection.geometry.count) * 3 + 1]!))
    for (const v of rim) if (!carried.has(v)) {
      const y = domain.surface.chart[v * 2 + 1]!, t = Math.max(0,Math.min(1,(y-22)/13))
      const hasFat = domain.discretization === 'integrated' && source.materialInterfaces
        ? y <= source.materialInterfaces.carriedFatLimitYmm + 1e-4 : 3 * (1-t*t*(3-2*t)) > 1.2
      if (hasFat || y <= highestDefect + .25) throw new Error('The cut extends beyond the constructed wound-depth layers.')
      carried.set(v, v + domain.surface.count)
    }
  }
  let surfaceOutsideMm=0,minimumDeepInsetMm=Infinity
  for(const [inspectionLayer,preparedLayer] of [[0,0],[2,2],[1,1],[3,3]]) for(const vertex of inspection.geometry.rim) {
    const p=at(inspection.geometry.positions,vertex+inspectionLayer!*inspection.geometry.count)
    let inside=false,distance=Infinity
    for(const pair of pairs){
      const [a,b]=pair.map(v=>at(domain.rest, preparedLayer===3 ? carried.get(v)! : preparedLayer===2 ? domain.dermalMiddle[v]! : v+preparedLayer!*domain.surface.count))
      const dx=b![0]-a![0],dy=b![1]-a![1],t=Math.max(0,Math.min(1,((p[0]-a![0])*dx+(p[1]-a![1])*dy)/(dx*dx+dy*dy)))
      distance=Math.min(distance,Math.hypot(p[0]-a![0]-t*dx,p[1]-a![1]-t*dy))
      if ((a![1]>p[1])!==(b![1]>p[1]) && p[0]<a![0]+(p[1]-a![1])*dx/dy) inside=!inside
    }
    if(inspectionLayer===0)surfaceOutsideMm=Math.max(surfaceOutsideMm,inside?0:distance)
    else minimumDeepInsetMm=Math.min(minimumDeepInsetMm,inside?distance:-distance)
  }
  if(surfaceOutsideMm>.12||minimumDeepInsetMm<=0)throw new Error('The prepared cut does not contain the original defect within its incision tolerance.')
  return {surfaceOutsideMm,minimumDeepInsetMm}
}
`})),xt,St=t((()=>{xt=`export interface CircularDefect {
  shape: 'circle'; diameterMm: 10 | 15 | 20; bevelDegrees: 45; centerMm: [number, number]
  depth: 'superficial-fat-interface'; geometrySha256: string
}
export interface InspectionMesh { positions: Float64Array; triangles: Uint32Array }
/** Inspection geometry has no solver, bank pairing, sutures, or gap metrics. */
export interface DefectInspection {
  stage: 'defect-inspection'; defect: CircularDefect
  /** Repair orientation is separate from the original circular wound. */
  repairDegrees?: number
  geometry: InspectionMesh & { sourceIndices: Uint32Array; chart: Float32Array; count: number; uv: Float32Array; normals: Float32Array; pinned: number[]; rim: number[]; dermis: Uint32Array; fat: Uint32Array }
  bed: InspectionMesh; preparation: InspectionMesh; ellipse: Float64Array
  measurements: { diameterXmm: number; diameterYmm: number; minimumDiameterMm: number; maximumDiameterMm: number; minimumRimDiameterMm: number; maximumRimDiameterMm: number; minimumDepthMm: number; maximumDepthMm: number; minimumBevelDegrees: number; maximumBevelDegrees: number; minimumCellRatio: number; maximumBedMismatchMm: number; minimumWallAngleDegrees: number; maximumWallAngleDegrees: number; maximumSurfaceOutsideMm: number; minimumDeepInsetMm: number }
}
`})),Ct,wt=t((()=>{Ct=`import { buildCheekDomain, planCheekIncision, type CheekCase, type CheekSurfaceSource } from './buildCheek'
import { planCheekClosure } from './closure'
import type { DefectInspection } from './defectTypes'
import { verifyPreparedCut } from './preparedRepair'

/** Free-direction rehearsal has its own numerical identity. Keep the original
 * accepted preset builder unchanged for regression and old experiments.
 * Three-millimetre spacing is a provisional running-thread assumption, not
 * additional deep sutures or a clinically calibrated spacing recommendation.
 * The three deep loops halve the seam: midpoint, then matching quarter points. */
export function buildDirectionalRepair(source: CheekSurfaceSource, config: CheekCase, inspection: DefectInspection) {
  const domain = buildCheekDomain(source, config, 'unit-node', undefined, true, true)
  const { center } = planCheekIncision(source, config)
  domain.closure = planCheekClosure(domain, Array.from({length: domain.surface.count}, (_,v) => v + domain.surface.count), center, 2, 3, 'symmetric-three')
  domain.id += '/running-3mm-symmetric-deeps-v2'
  verifyPreparedCut(inspection, domain, source)
  return domain
}
`})),Tt,Et=t((()=>{Tt=`/** Executable mechanics contract. Every coordinate and distance is 3D mm. */
export type Vec3 = [number, number, number]
export type Material3D = 'dermis' | 'fat' | 'muscle' | 'tarsus'
export interface DomainSpring { a: number; b: number; rest: number; compliance: number }
export interface DomainTet { vertices: [number, number, number, number]; rest: number; material: Material3D }
export interface DomainAnchor { p: number; target: Vec3; compliance: number; kind: 'bed' | 'retaining' }
export interface DomainLink {
  p: number; vertices: [number, number, number]; weights: Vec3; offset: Vec3
  normal: Vec3; compliance: number; releasable: boolean
  kind?: 'fat-interface' | 'muscle-interface' | 'tarsal-interface'
  releaseDistanceMm?: number
  /** Released by the preparation cuts; unilateral bed contact is retained. */
  preparedRelease?: boolean
  /** Area remaining attached at 3 and 6 mm release, as fractions of the full
   * footprint. Present only on the integrated candidate. */
  retainedFraction?: [number, number]
}
export interface DomainContact { p: number; point: Vec3; normal: Vec3 }
/** Material points are bound to volume vertices, never to a moving picture. */
export interface TissuePoint { vertices: number[]; weights: number[] }
export interface SutureBite3D {
  id: string; a: TissuePoint; b: TissuePoint; surfaceA: TissuePoint; surfaceB: TissuePoint
  edgeA: TissuePoint; edgeB: TissuePoint; targetMm: number; restMm: number
  route: TissuePoint[]; closedRoute: boolean
  segmentTargets: number[]
  order: number; chainId: string | null; chainIndex: number | null
  /** Optional presentation schedule; independent seams may tighten together. */
  startStep?: number
}
export interface EditableStitch3D {
  insertionSteps: number
  bite: SutureBite3D
  tightening: number
  appliedTightening: number
  startLengths: number[]
}
export interface ClosurePlan3D {
  deeps: SutureBite3D[]; running: SutureBite3D[]
  gaps: { a: TissuePoint; b: TissuePoint }[]
  eversion: { edge: TissuePoint; shoulder: TissuePoint; restHeightMm: number }[]
  seamLengthMm: number
}
export interface ClosureState3D {
  stage: 'open' | 'deep' | 'surface'; elapsed: number; paused: boolean
  assistance: boolean
  /** Tightening start lengths are captured from the live tissue, not rest. */
  startLengths: number[]
  /** Per deep/running bite, captured once at its first actual projection. */
  biteStarted: boolean[]
  /** Optional edits retain the original projection order and captured lengths.
   * No edits means the historical preset trajectory is unchanged. */
  edits?: Record<string, { tightening: number; applied: number; removed: boolean; placement: number }>
}
export interface TissueDomain3D {
  id: string
  repair?: { kind: 'advancement'; label: string }
  fatModel?: 'tapered-v1'
  /** The volume/area-integrated candidate is opt-in until closure acceptance. */
  discretization: 'unit-node' | 'integrated'
  rest: Float64Array
  /** Nominal volume-lumped mass in mg; used by the integrated candidate only. */
  massMg: Float64Array
  inverseMass: Float64Array
  /** Rest-area integration weights for distributed attachments, in mm². */
  attachmentAreaMm2: Float64Array
  springs: DomainSpring[]
  tets: DomainTet[]
  anchors: DomainAnchor[]
  links: DomainLink[]
  bed: DomainContact[]
  rigid: { surfaces: { id: string; positions: number[]; triangles: number[] }[]; vertices: number[] }
  banks: { a: number; b: number; normal: Vec3 }[]
  globe: { center: Vec3; radius: number; vertices: number[] }
  surface: { triangles: Uint32Array; uv: Float32Array; normals: Float32Array; count: number; chart: Float32Array }
  /** Numerical mid-dermal nodes; the dermis remains one material. */
  dermalMiddle: number[]
  walls: { dermis: Uint32Array; fat: Uint32Array }
  fatSurface: Uint32Array
  /** Sliding contact across the prepared flap's released fat interface. */
  slidingInterface?: { upper: Uint32Array; lower: Uint32Array }
  tarsus: { triangles: Uint32Array; vertices: number[] }
  muscle: { triangles: Uint32Array; vertices: number[] }
  closure: ClosurePlan3D
  wound: number[]
  lid: number[]
  pinned: number[]
  size: { diameterMm: number; plannedLengthMm: number; surfaceLengthMm: number; degrees: number }
}
export interface Grab3D { vertex: number; target: Vec3 }
export interface DomainCheckpoint {
  /** Manual needle/contact trajectories are versioned separately from presets. */
  manualModelVersion?: number
  domainId: string; step: number; positions: Float64Array; velocity: Float64Array
  release: boolean; grab: Grab3D | null
  underminingMm: 0 | 3 | 6
  closure: ClosureState3D
  grabReference: Float64Array | null
  grabTarget: Vec3 | null
  manualMode: boolean
  contactStepScale: number
  manualStitches: EditableStitch3D[]
}
export interface DomainMetrics {
  interfacePenetrationMm?: number
  contactStepScale?: number
  selfIntersections?: number
  projectedOpeningMm2?: number | null
  manualGaps?: { id:string; separationMm:number; eversionMm:[number,number] }[]
  step: number; maxDisplacementMm: number; lowerLidDisplacementMm: number; lowerLidInferiorMm: number
  minimumVolumeRatio: number; invertedElements: number; maximumStrain: number; globePenetrationMm: number
  meanGapMm: number; maximumGapMm: number; deepCount: number; runningBites: number
  closureBusy: boolean; assistanceActive: boolean; gripActive: boolean
  supportPenetrationMm: number
  meanEversionMm: number; minimumEversionMm: number; maximumEversionMm: number
  evertedFraction: number
}
`})),Dt,Ot=t((()=>{Dt=`import type {Vec3} from './domain'
const sub=(a:Vec3,b:Vec3):Vec3=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]]
const dot=(a:Vec3,b:Vec3)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2]
const clamp=(n:number)=>Math.max(0,Math.min(1,n))
const point=(p:ArrayLike<number>,v:number):Vec3=>[p[v*3]!,p[v*3+1]!,p[v*3+2]!]
/** Closest material coordinates on two finite segments, including parallel edges. */
export function segmentPair(a:Vec3,b:Vec3,c:Vec3,d:Vec3){
 const u=sub(b,a),v=sub(d,c),r=sub(a,c),aa=dot(u,u),bb=dot(u,v),cc=dot(v,v),dd=dot(u,r),ee=dot(v,r)
 let s=0,t=0
 if(aa<1e-15)t=clamp(ee/Math.max(1e-15,cc))
 else if(cc<1e-15)s=clamp(-dd/aa)
 else{const denominator=aa*cc-bb*bb;s=denominator>1e-15?clamp((bb*ee-cc*dd)/denominator):0;t=(bb*s+ee)/cc;if(t<0){t=0;s=clamp(-dd/aa)}else if(t>1){t=1;s=clamp((bb-dd)/aa)}}
 const delta=a.map((x,k)=>x+u[k]!*s-c[k]!-v[k]!*t) as Vec3
 return {s,t,delta,distance:Math.hypot(...delta)}
}
/** Conservative advancement over the swept edges. Both surfaces may move.
 * Returns a separating constraint at contact, never an attractive constraint. */
export function projectEdgePair(p:Float64Array,old:Float64Array,w:Float64Array,ids:[number,number,number,number],thickness:number):boolean {
 const before=ids.map(v=>point(old,v)),after=ids.map(v=>point(p,v)),motion=after.map((v,i)=>sub(v,before[i]!))
 const speed=Math.max(Math.hypot(...motion[0]!),Math.hypot(...motion[1]!))+Math.max(Math.hypot(...motion[2]!),Math.hypot(...motion[3]!))
 let time=0,q=segmentPair(before[0]!,before[1]!,before[2]!,before[3]!),contact=false
 for(let iteration=0;iteration<24;iteration++){
  if(q.distance<=thickness+1e-6){contact=true;break}
  if(speed<1e-12||time>=1)break
  time=Math.min(1,time+(q.distance-thickness)/speed)
  const points=before.map((v,i)=>v.map((x,k)=>x+motion[i]![k]!*time) as Vec3)
  q=segmentPair(points[0]!,points[1]!,points[2]!,points[3]!)
 }
 if(!contact||q.distance<1e-12)return false
 const weights=[1-q.s,q.s,-(1-q.t),-q.t],normal=q.delta.map(x=>x/q.distance)
 let separation=0,mass=0
 ids.forEach((v,i)=>{mass+=w[v]!*weights[i]!**2;for(let k=0;k<3;k++)separation+=p[v*3+k]!*weights[i]!*normal[k]!})
 if(thickness-separation<1e-7||mass<1e-12)return false
 const correction=(thickness-separation)/mass
 ids.forEach((v,i)=>{for(let k=0;k<3;k++)p[v*3+k]=p[v*3+k]!+w[v]!*weights[i]!*normal[k]!*correction})
 return true
}

/** Reusable scratch for the same swept-edge calculation. Contact invokes this
 * thousands of times per substep; allocating vectors in its 24-iteration loop
 * dominates WebKit's collector. Arithmetic and projection order stay unchanged. */
export class SweptEdgeProjector {
 private readonly before:Vec3[]=[[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
 private readonly motion:Vec3[]=[[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
 private readonly points:Vec3[]=[[0,0,0],[0,0,0],[0,0,0],[0,0,0]]
 private readonly weights=[0,0,0,0]
 private readonly normal:Vec3=[0,0,0]
 private readonly delta:Vec3=[0,0,0]
 private s=0
 private t=0
 private distance=0
 private closest(a:Vec3,b:Vec3,c:Vec3,d:Vec3):void {
  const ux=b[0]-a[0],uy=b[1]-a[1],uz=b[2]-a[2],vx=d[0]-c[0],vy=d[1]-c[1],vz=d[2]-c[2],rx=a[0]-c[0],ry=a[1]-c[1],rz=a[2]-c[2]
  const aa=ux*ux+uy*uy+uz*uz,bb=ux*vx+uy*vy+uz*vz,cc=vx*vx+vy*vy+vz*vz,dd=ux*rx+uy*ry+uz*rz,ee=vx*rx+vy*ry+vz*rz
  let s=0,t=0
  if(aa<1e-15)t=clamp(ee/Math.max(1e-15,cc))
  else if(cc<1e-15)s=clamp(-dd/aa)
  else{const denominator=aa*cc-bb*bb;s=denominator>1e-15?clamp((bb*ee-cc*dd)/denominator):0;t=(bb*s+ee)/cc;if(t<0){t=0;s=clamp(-dd/aa)}else if(t>1){t=1;s=clamp((bb-dd)/aa)}}
  this.delta[0]=a[0]+ux*s-c[0]-vx*t;this.delta[1]=a[1]+uy*s-c[1]-vy*t;this.delta[2]=a[2]+uz*s-c[2]-vz*t
  this.s=s;this.t=t;this.distance=Math.hypot(...this.delta)
 }
 project(p:Float64Array,old:Float64Array,w:Float64Array,ids:[number,number,number,number],thickness:number):boolean {
  const {before,motion,points,weights,normal}=this
  for(let i=0;i<4;i++)for(let k=0;k<3;k++){before[i]![k]=old[ids[i]!*3+k]!;motion[i]![k]=p[ids[i]!*3+k]!-before[i]![k]!}
  const speed=Math.max(Math.hypot(...motion[0]!),Math.hypot(...motion[1]!))+Math.max(Math.hypot(...motion[2]!),Math.hypot(...motion[3]!))
  let time=0,contact=false
  this.closest(before[0]!,before[1]!,before[2]!,before[3]!)
  for(let iteration=0;iteration<24;iteration++){
   if(this.distance<=thickness+1e-6){contact=true;break}
   if(speed<1e-12||time>=1)break
   time=Math.min(1,time+(this.distance-thickness)/speed)
   for(let i=0;i<4;i++)for(let k=0;k<3;k++)points[i]![k]=before[i]![k]!+motion[i]![k]!*time
   this.closest(points[0]!,points[1]!,points[2]!,points[3]!)
  }
  if(!contact||this.distance<1e-12)return false
  weights[0]=1-this.s;weights[1]=this.s;weights[2]=-(1-this.t);weights[3]=-this.t
  for(let k=0;k<3;k++)normal[k]=this.delta[k]!/this.distance
  let separation=0,mass=0
  for(let i=0;i<4;i++){const v=ids[i]!;mass+=w[v]!*weights[i]!**2;for(let k=0;k<3;k++)separation+=p[v*3+k]!*weights[i]!*normal[k]!}
  if(thickness-separation<1e-7||mass<1e-12)return false
  const correction=(thickness-separation)/mass
  for(let i=0;i<4;i++){const v=ids[i]!;for(let k=0;k<3;k++)p[v*3+k]=p[v*3+k]!+w[v]!*weights[i]!*normal[k]!*correction}
  return true
 }
}
`})),kt,At=t((()=>{kt=`import type { EditableStitch3D, TissueDomain3D, TissuePoint } from './domain'
import { pointDistance } from './closure'
import { cloneStitch, manualDeepBite, validatePoint } from './manualStitch'

/** Dynamic deep stitches. The preset uses its original projection order until
 * the editable path has independently passed the same trajectory checks. */
export class EditableStitches {
  private stitches:EditableStitch3D[]=[]
  private multipliers:number[][]=[]
  constructor(private readonly domain:TissueDomain3D){}
  get count():number{return this.stitches.length}
  snapshot():EditableStitch3D[]{return this.stitches.map(cloneStitch)}
  restore(items:EditableStitch3D[]):void {
    if(!Array.isArray(items)||items.length>32)throw new Error('Invalid editable stitch checkpoint size.')
    const ids=new Set<string>()
    for(const item of items){
      if(!item?.bite||!Number.isInteger(item.insertionSteps)||item.insertionSteps<0||item.insertionSteps>12||ids.has(item.bite.id)||![item.tightening,item.appliedTightening].every(v=>Number.isFinite(v)&&v>=0&&v<=1))throw new Error('Invalid editable stitch checkpoint.')
      const expected=manualDeepBite(this.domain,item.bite.id,item.bite.edgeA,item.bite.edgeB)
      if(JSON.stringify(expected)!==JSON.stringify(item.bite)||item.startLengths.length!==expected.route.length||!item.startLengths.every(n=>Number.isFinite(n)&&n>=0))throw new Error('Stitch checkpoint does not match its material path.')
      item.bite.route.forEach(p=>validatePoint(this.domain,p));ids.add(item.bite.id)
    }
    this.stitches=items.map(cloneStitch);this.multipliers=items.map(s=>s.startLengths.map(()=>0))
  }
  add(id:string,a:TissuePoint,b:TissuePoint,positions:Float64Array):void {
    if(this.stitches.length>=32)throw new Error('This experiment supports up to 32 manual stitches. Remove a stitch before adding another.')
    if(this.stitches.some(s=>s.bite.id===id))throw new Error('This stitch already exists.')
    const bite=manualDeepBite(this.domain,id,a,b)
    this.stitches.push({bite,insertionSteps:0,tightening:0,appliedTightening:0,startLengths:bite.route.map((p,i)=>pointDistance(positions,p,bite.route[(i+1)%bite.route.length]!))})
    this.multipliers.push(bite.route.map(()=>0))
  }
  replace(id:string,a:TissuePoint,b:TissuePoint,positions:Float64Array):void {
    const index=this.stitches.findIndex(s=>s.bite.id===id)
    if(index<0)throw new Error('This stitch no longer exists.')
    const bite=manualDeepBite(this.domain,id,a,b)
    this.stitches[index]={bite,insertionSteps:0,tightening:0,appliedTightening:0,startLengths:bite.route.map((p,i)=>pointDistance(positions,p,bite.route[(i+1)%bite.route.length]!))}
    this.multipliers[index]=bite.route.map(()=>0)
  }
  tighten(id:string,value:number):void {
    if(!Number.isFinite(value)||value<0||value>1)throw new Error('Tightening must be between zero and one.')
    const s=this.stitches.find(s=>s.bite.id===id);if(!s)throw new Error('This stitch no longer exists.')
    s.tightening=value
  }
  tightenMany(ids:readonly string[],value:number):void {
    if(!Array.isArray(ids)||!ids.length||ids.length>32||new Set(ids).size!==ids.length)throw new Error('Select distinct stitches to tighten together.')
    if(!Number.isFinite(value)||value<0||value>1)throw new Error('Tightening must be between zero and one.')
    // Resolve the whole selection before changing any constraint. A stale
    // member must not leave a partially tightened group.
    const selected=ids.map(id=>{const stitch=this.stitches.find(s=>s.bite.id===id);if(!stitch)throw new Error('A selected stitch no longer exists. Select the remaining stitches again.');return stitch})
    for(const stitch of selected)stitch.tightening=value
  }
  remove(id:string):void {
    const i=this.stitches.findIndex(s=>s.bite.id===id);if(i<0)throw new Error('This stitch no longer exists.')
    this.stitches.splice(i,1);this.multipliers.splice(i,1)
  }
  clear():void { this.stitches=[];this.multipliers=[] }
  beginStep():void {
    for(const s of this.stitches){s.insertionSteps=Math.min(12,s.insertionSteps+1);s.appliedTightening+=Math.max(-1/12,Math.min(1/12,s.tightening-s.appliedTightening))}
  }
  project(p:Float64Array,h2:number):void {
    for(let k=0;k<this.stitches.length;k++){
      const s=this.stitches[k]!,t=s.appliedTightening*s.appliedTightening*(3-2*s.appliedTightening)
      // Zero tightening retains the captured slack; the loop still resists
      // stretching beyond that length, exactly as a loose physical thread.
      const multipliers=this.multipliers[k]!;multipliers.fill(0)
      for(let i=0;i<s.bite.route.length;i++){
        const a=s.bite.route[i]!,b=s.bite.route[(i+1)%s.bite.route.length]!,delta=[0,0,0]
        a.vertices.forEach((v,j)=>{for(let axis=0;axis<3;axis++)delta[axis]=delta[axis]!-p[v*3+axis]!*a.weights[j]!})
        b.vertices.forEach((v,j)=>{for(let axis=0;axis<3;axis++)delta[axis]=delta[axis]!+p[v*3+axis]!*b.weights[j]!})
        const length=Math.hypot(...delta);if(length<1e-9)continue
        const weights=new Map<number,number>()
        a.vertices.forEach((v,j)=>weights.set(v,(weights.get(v)??0)-a.weights[j]!))
        b.vertices.forEach((v,j)=>weights.set(v,(weights.get(v)??0)+b.weights[j]!))
        let denominator=0;for(const [v,w] of weights)denominator+=this.domain.inverseMass[v]!*w*w
        if(denominator<1e-12)continue
        const target=s.startLengths[i]!+(s.bite.segmentTargets[i]!-s.startLengths[i]!)*t
        const dl=Math.min(0,-(length-target)/(denominator+2e-9/h2))
        for(const [v,w] of weights)for(let axis=0;axis<3;axis++)p[v*3+axis]=p[v*3+axis]!+this.domain.inverseMass[v]!*w*delta[axis]!/length*dl
      }
    }
  }
}
`})),jt,Mt=t((()=>{jt=`import type { ClosurePlan3D, TissuePoint, Vec3 } from './domain'
import { pointAt } from './closure'

/** Height above the moving shoulder's actual triangle. Invariant under rigid
 * translation and rotation, unlike world-Z displacement or rest-normal lift.
 * The undeformed curved surface's height is subtracted by measureEversion. */
export function edgeHeight(p: ArrayLike<number>, edge: TissuePoint, shoulder: TissuePoint): number {
  const [a, b, c] = shoulder.vertices
  if (a === undefined || b === undefined || c === undefined) throw new Error('An eversion shoulder requires a surface triangle.')
  const ab = [0, 1, 2].map(k => p[b*3+k]! - p[a*3+k]!) as Vec3
  const ac = [0, 1, 2].map(k => p[c*3+k]! - p[a*3+k]!) as Vec3
  const n: Vec3 = [ab[1]*ac[2]-ab[2]*ac[1], ab[2]*ac[0]-ab[0]*ac[2], ab[0]*ac[1]-ab[1]*ac[0]]
  const length = Math.hypot(...n)
  if (length < 1e-10) return NaN
  const e = pointAt(p, edge), s = pointAt(p, shoulder)
  return n.reduce((sum, v, k) => sum + v / length * (e[k]! - s[k]!), 0)
}

export function measureEversion(p: ArrayLike<number>, probes: ClosurePlan3D['eversion']) {
  const heights = probes.map(q => edgeHeight(p, q.edge, q.shoulder) - q.restHeightMm)
  return {
    meanEversionMm: heights.reduce((s, h) => s + h, 0) / Math.max(1, heights.length),
    minimumEversionMm: heights.length ? Math.min(...heights) : 0,
    maximumEversionMm: heights.length ? Math.max(...heights) : 0,
    // 0.05 mm is a numerical reporting tolerance, not a clinical threshold.
    evertedFraction: heights.filter(h => h > .05).length / Math.max(1, heights.length),
  }
}
`})),Nt,Pt=t((()=>{Nt=`import type { TissueDomain3D, TissuePoint } from './domain'

/** Allow the target to traverse the opening; strain is checked separately. */
export function grabTravelLimit(d: TissueDomain3D): number { return d.size.diameterMm + 6 }

/** A small dermal grip following connected material. A Euclidean neighbourhood
 * would also grab the opposite bank once the wound closes. */
export function gripPoint(d: TissueDomain3D, vertex: number): TissuePoint {
  const neighbours = new Map<number, Set<number>>()
  const t = d.surface.triangles, p = d.rest, radius = 1.5
  for (let i = 0; i < t.length; i += 3) for (let j = 0; j < 3; j++) {
    const a = t[i+j]!, b = t[i+(j+1)%3]!
    if (!neighbours.has(a)) neighbours.set(a, new Set())
    if (!neighbours.has(b)) neighbours.set(b, new Set())
    neighbours.get(a)!.add(b); neighbours.get(b)!.add(a)
  }
  const distances = new Map([[vertex, 0]]), visited = new Set<number>()
  while (true) {
    let next = -1, distance = Infinity
    for (const [v, r] of distances) if (!visited.has(v) && (r < distance || r === distance && v < next)) { next = v; distance = r }
    if (next < 0) break
    visited.add(next)
    for (const v of neighbours.get(next) ?? []) {
      const r = distance + Math.hypot(p[v*3]! - p[next*3]!, p[v*3+1]! - p[next*3+1]!, p[v*3+2]! - p[next*3+2]!)
      if (r < radius && r < (distances.get(v) ?? Infinity)) distances.set(v, r)
    }
  }
  const vertices: number[] = [], weights: number[] = []
  for (const [v, r] of distances) {
    if (!d.inverseMass[v]) continue
    const weight = (1 - (r/radius)**2)**2
    // Hold a small piece of dermis, not one infinitely sharp surface corner.
    for (const [node,share] of [[v,.25],[d.dermalMiddle[v]!,.5],[v+d.surface.count,.25]]) if (d.inverseMass[node!]) { vertices.push(node!); weights.push(weight*share!) }
  }
  const total = weights.reduce((s, w) => s + w, 0)
  return { vertices, weights: weights.map(w => w / total) }
}
`})),Ft,It=t((()=>{Ft=`import type { DomainSpring, DomainTet, Material3D } from './domain'

/** Nominal engineering densities in mg/mm³ (numerically equal to g/cm³).
 * Water-like soft tissue and lighter fat; not patient or eyelid calibration. */
export const TISSUE_DENSITY: Record<Material3D, number> = { dermis: 1, fat: .9, muscle: 1, tarsus: 1 }

/** Linear tetrahedral lumped mass. Fixed nodes retain their material mass;
 * fixation changes inverse mass only. Never clamp tiny cells to unit mass. */
export function lumpedMass(nodeCount: number, tets: readonly DomainTet[]): Float64Array {
  const mass = new Float64Array(nodeCount)
  for (const t of tets) {
    if (!(t.rest > 0) || !Number.isFinite(t.rest)) throw new Error('Invalid rest volume for tissue mass.')
    const share = TISSUE_DENSITY[t.material] * t.rest / 4
    for (const v of t.vertices) mass[v] = mass[v]! + share
  }
  return mass
}

/** Integrate the rest-space attachment footprint, one third per triangle
 * corner. Call on the actual interface, excluding wound side walls. */
export function lumpedArea(positions: ArrayLike<number>, triangles: ArrayLike<number>): Float64Array {
  const area = new Float64Array(positions.length / 3)
  for (let k = 0; k < triangles.length; k += 3) {
    const a = triangles[k]!, b = triangles[k + 1]!, c = triangles[k + 2]!
    const ux = positions[b*3]! - positions[a*3]!, uy = positions[b*3+1]! - positions[a*3+1]!, uz = positions[b*3+2]! - positions[a*3+2]!
    const vx = positions[c*3]! - positions[a*3]!, vy = positions[c*3+1]! - positions[a*3+1]!, vz = positions[c*3+2]! - positions[a*3+2]!
    const share = Math.hypot(uy*vz - uz*vy, uz*vx - ux*vz, ux*vy - uy*vx) / 6
    for (const v of [a,b,c]) area[v] = area[v]! + share
  }
  return area
}

/** Attachment energy = area * displacement² / (2 * compliancePerArea).
 * More samples share the same total stiffness instead of adding springs. */
export function areaCompliance(compliancePerArea: number, areaMm2: number): number {
  if (!(areaMm2 > 0) || !Number.isFinite(areaMm2)) throw new Error('Attachment has no finite footprint.')
  return compliancePerArea / areaMm2
}

/** Integrate shape-function weights over the part of an interface that is
 * still attached. Clip each rest triangle at the release-distance contour;
 * a contour through a cell releases part of its area, not a whole vertex.
 * The distance field is piecewise linear on this mesh. */
export function retainedArea(positions: ArrayLike<number>, triangles: ArrayLike<number>, distances: ArrayLike<number>, releaseMm: number): Float64Array {
  if (!(releaseMm >= 0) || !Number.isFinite(releaseMm)) throw new Error('Invalid release distance.')
  if (releaseMm === 0) return lumpedArea(positions, triangles)
  const area = new Float64Array(positions.length / 3)
  type Corner = { bary: [number, number, number]; distance: number }
  for (let k = 0; k < triangles.length; k += 3) {
    const ids = [triangles[k]!, triangles[k+1]!, triangles[k+2]!]
    const corners: Corner[] = ids.map((v,i) => ({ bary: [i===0?1:0,i===1?1:0,i===2?1:0], distance: distances[v]! }))
    if (corners.some(c => !Number.isFinite(c.distance) || c.distance < 0)) throw new Error('Invalid interface distance field.')
    const clipped: Corner[] = []
    for (let i = 0; i < 3; i++) {
      const a = corners[i]!, b = corners[(i+1)%3]!, keepA = a.distance >= releaseMm, keepB = b.distance >= releaseMm
      if (keepA) clipped.push(a)
      if (keepA !== keepB) {
        const t = (releaseMm-a.distance)/(b.distance-a.distance)
        clipped.push({ bary: a.bary.map((v,j) => v+t*(b.bary[j]!-v)) as Corner['bary'], distance: releaseMm })
      }
    }
    const point = (c: Corner) => [0,1,2].map(axis => ids.reduce((sum,v,i) => sum+positions[v*3+axis]!*c.bary[i]!,0))
    for (let j = 1; j+1 < clipped.length; j++) {
      const cut = [clipped[0]!,clipped[j]!,clipped[j+1]!], [a,b,c] = cut.map(point)
      const u = b!.map((v,i) => v-a![i]!), v = c!.map((n,i) => n-a![i]!)
      const size = Math.hypot(u[1]!*v[2]!-u[2]!*v[1]!,u[2]!*v[0]!-u[0]!*v[2]!,u[0]!*v[1]!-u[1]!*v[0]!)/2
      for (let i = 0; i < 3; i++) area[ids[i]!] = area[ids[i]!]! + size*cut.reduce((sum,c) => sum+c.bary[i]!,0)/3
    }
  }
  return area
}

/** Distance to an incision polyline, including its segments. Adding samples
 * along a straight segment must not change the release footprint. */
export function incisionDistance(point: readonly number[], path: readonly (readonly number[])[]): number {
  if (path.length < 2) throw new Error('An incision needs at least one segment.')
  let nearest = Infinity
  for (let i = 1; i < path.length; i++) {
    const a = path[i-1]!, b = path[i]!, delta = b.map((v,k) => v-a[k]!)
    const relative = point.map((v,k) => v-a[k]!), length2 = delta.reduce((sum,v) => sum+v*v,0)
    const t = length2 > 0 ? Math.max(0,Math.min(1,relative.reduce((sum,v,k) => sum+v*delta[k]!,0)/length2)) : 0
    nearest = Math.min(nearest,Math.hypot(...relative.map((v,k) => v-t*delta[k]!)))
  }
  return nearest
}

/** Edge strain energy is integrated over supporting tetrahedral volume.
 * Each element contributes six directions; shared edges accumulate stiffness.
 * This preserves energy under uniform dilation when a mesh is subdivided. */
export function integratedSprings(positions: ArrayLike<number>, tets: readonly DomainTet[]): DomainSpring[] {
  const edges = new Map<string, DomainSpring>()
  const compliance = { fat: 3e-4, muscle: 8e-5, tarsus: 1.5e-6 }
  for (const t of tets) {
    if (t.material === 'dermis') continue
    for (let j = 0; j < 4; j++) for (let k = j+1; k < 4; k++) {
      const a = Math.min(t.vertices[j]!,t.vertices[k]!), b = Math.max(t.vertices[j]!,t.vertices[k]!), key = \`\${a}/\${b}\`
      const length = Math.hypot(positions[b*3]! - positions[a*3]!,positions[b*3+1]! - positions[a*3+1]!,positions[b*3+2]! - positions[a*3+2]!)
      const stiffness = t.rest / (6 * compliance[t.material] * length * length)
      const existing = edges.get(key)
      if (existing) existing.compliance = 1 / (1 / existing.compliance + stiffness)
      else edges.set(key, { a,b,rest:length,compliance:1/stiffness })
    }
  }
  return [...edges.values()]
}
`})),Lt,Rt=t((()=>{Lt=`import type { EditableStitch3D, SutureBite3D, TissueDomain3D, TissuePoint, Vec3 } from './domain'
import { pointAt, pointDistance, threadLength } from './closure'

/** Construct a buried loop from two independently selected material rim points.
 * No deformed-space nearest-neighbour binding: the thread stays in its tissue. */
export function manualDeepBite(d: TissueDomain3D, id: string, a: TissuePoint, b: TissuePoint, rimDirection?: Vec3): SutureBite3D {
  if (!/^manual-[a-zA-Z0-9-]+$/.test(id)) throw new Error('Invalid stitch identifier.')
  const rim = new Set(d.wound)
  for (const p of [a,b]) validatePoint(d,p,rim)
  if (pointDistance(d.rest,a,b)<1) throw new Error('Choose two distinct wound locations at least 1 mm apart.')
  const boundary = woundBoundary(d)
  const side = (edge:TissuePoint) => {
    const xy=d.surface.chart
    const chart:Vec3=[0,0,0]
    edge.vertices.forEach((v,i)=>{chart[0]+=xy[v*2]!*edge.weights[i]!;chart[1]+=xy[v*2+1]!*edge.weights[i]!})
    // The connected cut edge determines the needle direction. An average of
    // incident triangle centroids changes when the same skin is retessellated,
    // rotating the needle shoulder even though the selected bite did not move.
    const selected = [...new Set(edge.vertices.filter((_,i)=>edge.weights[i]!>0))]
    if(selected.length>2 || selected.length===2 && !boundary.neighbours.get(selected[0]!)?.includes(selected[1]!))throw new Error('Choose a point on one connected wound edge.')
    let dx=0,dy=0
    edge.vertices.forEach((v,i)=>{const inward=boundary.inward.get(v)!;dx+=inward[0]*edge.weights[i]!;dy+=inward[1]*edge.weights[i]!})
    const length=Math.hypot(dx,dy)
    if(length<1e-8)throw new Error('This rim location has no supported tissue behind it.')
    dx/=length;dy/=length
    // Solve physical setback on the same material surface, not chart millimetres.
    let travel=2, surface:TissuePoint|null=null
    for(let i=0;i<5;i++){
      surface=surfacePoint(d,chart[0]+dx*travel,chart[1]+dy*travel)
      const actual=pointDistance(d.rest,edge,surface)
      if(actual<1e-6)throw new Error('The stitch bite could not be constructed.')
      travel*=2/actual
    }
    if(!surface || Math.abs(pointDistance(d.rest,edge,surface)-2)>.1)throw new Error('The stitch bite leaves the supported skin.')
    // Retain the existing provisional buried-loop depths. Entry/return use
    // distinct depths, with an outward dermal shoulder to transmit an everting moment.
    return {deep:depthPoint(d,rimOffset(d,boundary.ring,edge,-1,rimDirection),.9),inner:depthPoint(d,rimOffset(d,boundary.ring,edge,1,rimDirection),.65),shoulder:depthPoint(d,surface,.1),surface}
  }
  const left=side(a),right=side(b)
  const route=[left.deep,left.shoulder,left.inner,right.inner,right.shoulder,right.deep]
  const segmentTargets=route.map((p,i)=>i===2||i===5?.12:pointDistance(d.rest,p,route[(i+1)%route.length]!)*.85)
  const bite:SutureBite3D={id,a:left.deep,b:right.deep,surfaceA:left.surface,surfaceB:right.surface,edgeA:copyPoint(a),edgeB:copyPoint(b),route,segmentTargets,closedRoute:true,targetMm:segmentTargets.reduce((s,v)=>s+v,0),restMm:0,order:0,chainId:null,chainIndex:null}
  bite.restMm=threadLength(d.rest,bite)
  return bite
}

/** Rest-space conormals point into the retained skin. Only true wound edges
 * contribute, so adding/reorienting triangles inside the skin changes neither
 * the selected material location nor its needle direction. Vertex directions
 * interpolate along an edge, including when a vertex is represented by a
 * two-node material point with a zero endpoint weight. */
function woundBoundary(d:TissueDomain3D) {
  const edges=new Map<string,{a:number;b:number;third:number;count:number}>(),rim=new Set(d.wound)
  for(let i=0;i<d.surface.triangles.length;i+=3)for(let j=0;j<3;j++){
    const a=d.surface.triangles[i+j]!,b=d.surface.triangles[i+(j+1)%3]!,third=d.surface.triangles[i+(j+2)%3]!,key=a<b?\`\${a}/\${b}\`:\`\${b}/\${a}\`
    const edge=edges.get(key)
    if(edge)edge.count++
    else edges.set(key,{a,b,third,count:1})
  }
  const neighbours=new Map<number,number[]>(),inward=new Map<number,Vec3>()
  for(const {a,b,third,count} of edges.values()){
    if(count!==1||!rim.has(a)||!rim.has(b))continue
    const tangent=[0,1,2].map(axis=>d.rest[b*3+axis]!-d.rest[a*3+axis]!) as Vec3
    const normal=[0,1,2].map(axis=>d.surface.normals[a*3+axis]!+d.surface.normals[b*3+axis]!) as Vec3
    const conormal:Vec3=[normal[1]*tangent[2]-normal[2]*tangent[1],normal[2]*tangent[0]-normal[0]*tangent[2],normal[0]*tangent[1]-normal[1]*tangent[0]]
    const direction=conormal.reduce((sum,x,axis)=>sum+x*(d.rest[third*3+axis]!-d.rest[a*3+axis]!),0)>=0?1:-1
    const length=Math.hypot(...conormal)
    if(length<1e-10)throw new Error('This wound edge has no supported tissue direction.')
    for(const [v,other] of [[a,b],[b,a]]){
      const adjacent=neighbours.get(v!)??[];adjacent.push(other!);neighbours.set(v!,adjacent)
      const sum=inward.get(v!)??[0,0,0]
      for(let axis=0;axis<3;axis++)sum[axis]=sum[axis]!+direction*conormal[axis]!/length
      inward.set(v!,sum)
    }
  }
  for(const v of rim){
    if(neighbours.get(v)?.length!==2)throw new Error(\`The wound rim is not a connected closed boundary at \${v} (\${d.surface.chart[v*2]}, \${d.surface.chart[v*2+1]}; \${neighbours.get(v)?.length} neighbours).\`)
    let n=inward.get(v)!,length=Math.hypot(...n)
    // At a welded slit tip the two bank conormals cancel. The retained tissue
    // is ahead of the tip, opposite the coincident lip neighbours.
    if(length<1e-10){
      const adjacent=neighbours.get(v)!
      n=[0,1,2].map(axis=>d.rest[v*3+axis]!-adjacent.reduce((sum,w)=>sum+d.rest[w*3+axis]!,0)/adjacent.length) as Vec3
      length=Math.hypot(...n)
    }
    if(length<1e-10)throw new Error('This wound edge has no supported tissue direction.')
    inward.set(v,n.map(x=>x/length) as Vec3)
  }
  const ring=[Math.min(...rim)]
  while(ring.length<=rim.size){
    const current=ring.at(-1)!,previous=ring.at(-2),next=neighbours.get(current)!.filter(v=>v!==previous).sort((a,b)=>a-b)[0]!
    if(next===ring[0])break
    if(ring.includes(next))throw new Error('The wound rim is not a connected closed boundary.')
    ring.push(next)
  }
  if(ring.length!==rim.size)throw new Error('The wound rim is not a connected closed boundary.')
  const area=ring.reduce((sum,v,i)=>{const next=ring[(i+1)%ring.length]!;return sum+d.rest[v*3]!*d.rest[next*3+1]!-d.rest[next*3]!*d.rest[v*3+1]!},0)
  if(area<0)ring.reverse()
  return {neighbours,inward,ring}
}
export function copyPoint(p:TissuePoint):TissuePoint{return {vertices:[...p.vertices],weights:[...p.weights]}}
export function cloneStitch(s:EditableStitch3D):EditableStitch3D {
  return {...s,startLengths:[...s.startLengths],bite:{...s.bite,a:copyPoint(s.bite.a),b:copyPoint(s.bite.b),surfaceA:copyPoint(s.bite.surfaceA),surfaceB:copyPoint(s.bite.surfaceB),edgeA:copyPoint(s.bite.edgeA),edgeB:copyPoint(s.bite.edgeB),route:s.bite.route.map(copyPoint),segmentTargets:[...s.bite.segmentTargets]}}
}
export function validatePoint(d:TissueDomain3D,p:TissuePoint,allowed?:Set<number>):void {
  if(!p || !Array.isArray(p.vertices)||!Array.isArray(p.weights)||!p.vertices.length||p.vertices.length!==p.weights.length||p.vertices.some(v=>!Number.isInteger(v)||v<0||v>=d.rest.length/3||allowed&&!allowed.has(v))||p.weights.some(w=>!Number.isFinite(w)||w<0)||Math.abs(p.weights.reduce((a,b)=>a+b,0)-1)>1e-7)throw new Error('Invalid material bite point.')
}
function depthPoint(d:TissueDomain3D,p:TissuePoint,fraction:number):TissuePoint {
  const t=fraction<=.5?fraction*2:(fraction-.5)*2
  const from=fraction<=.5?p.vertices:p.vertices.map(v=>d.dermalMiddle[v]!)
  const to=p.vertices.map(v=>fraction<=.5?d.dermalMiddle[v]!:v+d.surface.count)
  return {vertices:[...from,...to],weights:[...p.weights.map(w=>w*(1-t)),...p.weights.map(w=>w*t)]}
}
function surfacePoint(d:TissueDomain3D,x:number,y:number):TissuePoint {
  const xy=d.surface.chart
  for(let i=0;i<d.surface.triangles.length;i+=3){
    const ids=Array.from(d.surface.triangles.slice(i,i+3)),[a,b,c]=ids as Vec3
    const ax=xy[a*2]!,ay=xy[a*2+1]!,bx=xy[b*2]!,by=xy[b*2+1]!,cx=xy[c*2]!,cy=xy[c*2+1]!
    const det=(by-cy)*(ax-cx)+(cx-bx)*(ay-cy)
    if(Math.abs(det)<1e-12)continue
    const u=((by-cy)*(x-cx)+(cx-bx)*(y-cy))/det,v=((cy-ay)*(x-cx)+(ax-cx)*(y-cy))/det
    if(Math.min(u,v,1-u-v)>=-1e-8)return {vertices:ids,weights:[Math.max(0,u),Math.max(0,v),Math.max(0,1-u-v)]}
  }
  throw new Error('The stitch bite leaves the supported skin. Choose another location.')
}

/** Two millimetres of real rim arc distribute the buried bite along the bank.
 * Canonical tangent orientation keeps entry/return consistent across banks. */
function rimOffset(d:TissueDomain3D,ring:number[],point:TissuePoint,mm:number,rimDirection?:Vec3):TissuePoint {
 const arc=[0],p=pointAt(d.rest,point);let location=0,best=Infinity,direction=1
 for(let i=0;i<ring.length;i++){
  const a=Array.from(d.rest.slice(ring[i]!*3,ring[i]!*3+3)),b=Array.from(d.rest.slice(ring[(i+1)%ring.length]!*3,ring[(i+1)%ring.length]!*3+3)),delta=b.map((x,k)=>x-a[k]!),length=Math.hypot(...delta)
  const t=Math.max(0,Math.min(1,delta.reduce((s,x,k)=>s+x*(p[k]!-a[k]!),0)/Math.max(1e-12,length*length))),distance=Math.hypot(...a.map((x,k)=>x+delta[k]!*t-p[k]!))
  if(distance<best){best=distance;location=arc[i]!+t*length;direction=rimDirection?(delta.reduce((sum,value,axis)=>sum+value*rimDirection[axis]!,0)>=0?1:-1):Math.abs(delta[0]!)>.1?(delta[0]!>0?1:-1):(delta[1]!>0?1:-1)}
  arc.push(arc[i]!+length)
 }
 const total=arc.at(-1)!,target=((location+mm*direction)%total+total)%total
 let i=0;while(i<ring.length-1&&arc[i+1]!<target)i++
 const t=(target-arc[i]!)/Math.max(1e-12,arc[i+1]!-arc[i]!)
 return {vertices:[ring[i]!,ring[(i+1)%ring.length]!],weights:[1-t,t]}
}
`})),zt,Bt=t((()=>{zt=`/** Refit-only AABB hierarchy for moving triangles or edges. Primitive order
 * and tree construction are deterministic; queries return each primitive once. */
export class MovingBounds {
 private readonly nodes:{left:number;right:number;start:number;count:number}[]=[]
 private readonly order:number[]=[]
 private bounds:Float64Array
 constructor(private readonly primitives:readonly (readonly number[])[],rest:Float64Array){
  const center=primitives.map(ids=>[0,1,2].map(k=>ids.reduce((s,v)=>s+rest[v*3+k]!,0)/ids.length))
  const build=(ids:number[]):number=>{
   const index=this.nodes.length,node={left:-1,right:-1,start:0,count:0};this.nodes.push(node)
   if(ids.length<=4){node.start=this.order.length;node.count=ids.length;this.order.push(...ids)}
   else{const ranges=[0,1,2].map(k=>Math.max(...ids.map(i=>center[i]![k]!))-Math.min(...ids.map(i=>center[i]![k]!))),axis=ranges.indexOf(Math.max(...ranges));ids.sort((a,b)=>center[a]![axis]!-center[b]![axis]!||a-b);const middle=Math.floor(ids.length/2);node.left=build(ids.slice(0,middle));node.right=build(ids.slice(middle))}
   return index
  }
  build(primitives.map((_,i)=>i));this.bounds=new Float64Array(this.nodes.length*6);this.refit(rest,rest,0)
 }
 refit(p:Float64Array,old:Float64Array,margin:number):void {
  const b=this.bounds
  for(let i=this.nodes.length-1;i>=0;i--){
   const node=this.nodes[i]!,offset=i*6
   for(let k=0;k<3;k++){b[offset+k]=Infinity;b[offset+k+3]=-Infinity}
   if(node.left>=0){for(let k=0;k<3;k++){b[offset+k]=Math.min(b[node.left*6+k]!,b[node.right*6+k]!);b[offset+k+3]=Math.max(b[node.left*6+k+3]!,b[node.right*6+k+3]!)}}
   else for(let j=0;j<node.count;j++)for(const v of this.primitives[this.order[node.start+j]!]!)for(let k=0;k<3;k++){b[offset+k]=Math.min(b[offset+k]!,p[v*3+k]!-margin,old[v*3+k]!-margin);b[offset+k+3]=Math.max(b[offset+k+3]!,p[v*3+k]!+margin,old[v*3+k]!+margin)}
  }
 }
 query(lo:readonly number[],hi:readonly number[]):number[]{
  const result:number[]=[],stack=[0],b=this.bounds
  while(stack.length){const i=stack.pop()!,o=i*6;if(lo[0]!>b[o+3]!||hi[0]!<b[o]!||lo[1]!>b[o+4]!||hi[1]!<b[o+1]!||lo[2]!>b[o+5]!||hi[2]!<b[o+2]!)continue;const n=this.nodes[i]!;if(n.left>=0)stack.push(n.right,n.left);else for(let j=0;j<n.count;j++)result.push(this.order[n.start+j]!)}
  return result
 }
}
`})),Vt,Ht=t((()=>{Vt=`import type {TissueDomain3D,Vec3} from './domain'
/** Projected aperture, not a wound-closure score. Folded/self-overlapping
 * projections are deliberately unmeasurable rather than cancelling to zero. */
export function projectedOpeningMm2(d:TissueDomain3D,p:ArrayLike<number>):number|null {
 const center=d.wound.reduce<Vec3>((c,v)=>[c[0]+d.rest[v*3]!,c[1]+d.rest[v*3+1]!,c[2]+d.rest[v*3+2]!],[0,0,0]).map(x=>x/d.wound.length) as Vec3
 const rim=[...d.wound].sort((a,b)=>Math.atan2(d.rest[a*3+1]!-center[1],d.rest[a*3]!-center[0])-Math.atan2(d.rest[b*3+1]!-center[1],d.rest[b*3]!-center[0]))
 let normal=d.wound.reduce<Vec3>((n,v)=>[n[0]+d.surface.normals[v*3]!,n[1]+d.surface.normals[v*3+1]!,n[2]+d.surface.normals[v*3+2]!],[0,0,0])
 const length=Math.hypot(...normal);if(length<1e-8)return null
 normal=normal.map(x=>x/length) as Vec3
 let u:Vec3=[1-normal[0]**2,-normal[0]*normal[1],-normal[0]*normal[2]];const ul=Math.hypot(...u);if(ul<1e-8)return null;u=u.map(x=>x/ul) as Vec3
 const v:Vec3=[normal[1]*u[2]-normal[2]*u[1],normal[2]*u[0]-normal[0]*u[2],normal[0]*u[1]-normal[1]*u[0]]
 const points=rim.map(i=>[u.reduce((s,x,a)=>s+x*(p[i*3+a]!-center[a]!),0),v.reduce((s,x,a)=>s+x*(p[i*3+a]!-center[a]!),0)] as [number,number])
 const orient=(a:number[],b:number[],c:number[])=>(b[0]!-a[0]!)*(c[1]!-a[1]!)-(b[1]!-a[1]!)*(c[0]!-a[0]!)
 for(let i=0;i<points.length;i++)for(let j=i+2;j<points.length;j++){
  if(i===0&&j===points.length-1)continue
  const a=points[i]!,b=points[(i+1)%points.length]!,c=points[j]!,e=points[(j+1)%points.length]!
  if(orient(a,b,c)*orient(a,b,e)<-1e-8&&orient(c,e,a)*orient(c,e,b)<-1e-8)return null
 }
 return Math.abs(points.reduce((sum,a,i)=>{const b=points[(i+1)%points.length]!;return sum+a[0]*b[1]-b[0]*a[1]},0))/2
}
`})),Ut,Wt=t((()=>{Ut=`import { boundaryEdges } from '../mesh'
import type { TissueDomain3D } from './domain'
import { buildCheekDomain, type CheekCase, type CheekSurfaceSource } from './buildCheek'
import { verifyPreparationContainsDefect, type DefectInspection } from './defect'

/** Construction acceptance is separate from preset closure evidence. Never
 * expose a cut whose wound loop is incomplete or attached to the fixed border. */
export function verifyPreparedCut(inspection: DefectInspection, domain: TissueDomain3D, source?: CheekSurfaceSource): void {
  const containment = verifyPreparationContainsDefect(inspection, domain, source)
  if (!Number.isFinite(containment.surfaceOutsideMm) || !Number.isFinite(containment.minimumDeepInsetMm))
    throw new Error('The cut extends beyond the constructed wound-depth layers. Change its direction or position.')
  const rim = new Set(domain.wound), adjacency = new Map<number, number[]>()
  const fatEdges = new Set<string>()
  const key = (a: number, b: number) => \`\${Math.min(a,b)}/\${Math.max(a,b)}\`
  for(let i=0;i<domain.walls.fat.length;i+=6)fatEdges.add(key(domain.walls.fat[i]!-domain.surface.count,domain.walls.fat[i+2]!-domain.surface.count))
  const carriesFat = (v: number) => {
    const y=domain.surface.chart[v*2+1]!,t=Math.max(0,Math.min(1,(y-22)/13))
    return domain.fatModel==='tapered-v1' ? y<=34 : domain.discretization==='integrated'&&source?.materialInterfaces
      ? y<=source.materialInterfaces.carriedFatLimitYmm+1e-4 : 3*(1-t*t*(3-2*t))>1.2
  }
  const edges = boundaryEdges(domain.surface.triangles)
  for (let i = 0; i < edges.length; i += 2) {
    const a = edges[i]!, b = edges[i + 1]!
    if (!rim.has(a) && !rim.has(b)) continue
    if (!rim.has(a) || !rim.has(b)) throw new Error('The cut has an incomplete wound edge. Change its direction or position.')
    if(source&&carriesFat(a)&&carriesFat(b)&&!fatEdges.has(key(a,b)))throw new Error('The cut has an incomplete fat wall. Change its direction or position.')
    adjacency.set(a, [...(adjacency.get(a) ?? []), b])
    adjacency.set(b, [...(adjacency.get(b) ?? []), a])
  }
  if (domain.wound.some(v => adjacency.get(v)?.length !== 2 || domain.inverseMass[v] === 0))
    throw new Error('The cut reaches a fixed or incomplete tissue boundary. Change its direction or position.')
  const seen = new Set<number>(), queue = domain.wound.slice(0, 1)
  while (queue.length) {
    const v = queue.pop()!
    if (seen.has(v)) continue
    seen.add(v); queue.push(...adjacency.get(v)!.filter(next => !seen.has(next)))
  }
  if (!rim.size || seen.size !== rim.size || domain.walls.dermis.length !== rim.size * 12)
    throw new Error('The cut does not form a continuous wound wall. Change its direction or position.')
}

/** Preserve existing domains exactly; reconstruct a failed cut at finer local
 * precision before any solver starts. Refinement changes numerical identity. */
export function buildPreparedRepair(source: CheekSurfaceSource, config: CheekCase, inspection: DefectInspection, requirePrecise = false): { domain: TissueDomain3D; refined: boolean } {
  if (!requirePrecise) try {
    const domain = buildCheekDomain(source, config)
    verifyPreparedCut(inspection, domain, source)
    return { domain, refined: false }
  } catch { /* Retry construction at finer precision, never an invalid pose. */ }
  const domain = buildCheekDomain(source, config, 'unit-node', undefined, true)
  verifyPreparedCut(inspection, domain, source)
  return { domain, refined: true }
}
`})),Gt,Kt=t((()=>{Gt=`import { biteProgress } from './closure'
import type { ClosurePlan3D, ClosureState3D, EditableStitch3D, SutureBite3D } from './domain'

export function cloneClosure(state:ClosureState3D):ClosureState3D {
 return {...state,startLengths:[...state.startLengths],biteStarted:[...state.biteStarted],...(state.edits?{edits:Object.fromEntries(Object.entries(state.edits).map(([id,value])=>[id,{...value}]))}:{})}
}
export function validatePresetEdits(state:ClosureState3D,plan:ClosurePlan3D):void {
 if(!state.edits)return
 const bites=new Set([...plan.deeps,...plan.running].map(b=>b.id))
 for(const [id,e] of Object.entries(state.edits))if(!bites.has(id)||!e||typeof e.removed!=='boolean'||![e.tightening,e.applied,e.placement].every(n=>Number.isFinite(n)&&n>=0&&n<=1)||e.placement<=0)throw new Error('Invalid preset stitch edit checkpoint.')
}
/** A running chain is one selectable thread, including all its engaged bites. */
export function presetSelection(state:ClosureState3D,plan:ClosurePlan3D,id:string):SutureBite3D[] {
 const all=[...plan.deeps,...plan.running],bite=all.find(b=>b.id===id)
 if(!bite||!biteProgress(state,bite))throw new Error('This preset thread is not present at this point in the rehearsal.')
 return bite.chainId?all.filter(b=>b.chainId===bite.chainId&&biteProgress(state,b)>0):[bite]
}
export function editPreset(state:ClosureState3D,plan:ClosurePlan3D,id:string,value:number|'remove'):void {
 if(value!=='remove'&&(!Number.isFinite(value)||value<0||value>1))throw new Error('Tightening must be between zero and one.')
 const selected=presetSelection(state,plan,id)
 state.edits??={}
 for(const b of selected){
  const progress=biteProgress(state,b),edit=state.edits[b.id]??{tightening:progress,applied:progress,placement:progress,removed:false}
  state.edits[b.id]={...edit,...(value==='remove'?{removed:true}:{tightening:value})}
 }
 state.paused=true
}
export function presetSnapshot(state:ClosureState3D,plan:ClosurePlan3D):EditableStitch3D[] {
 const seen=new Set<string>(),result:EditableStitch3D[]=[]
 let slot=0
 for(const bite of [...plan.deeps,...plan.running]){
  const progress=biteProgress(state,bite),startLengths=state.startLengths.slice(slot,slot+bite.segmentTargets.length);slot+=bite.segmentTargets.length
  if(!progress||bite.chainId&&seen.has(bite.chainId))continue
  if(bite.chainId)seen.add(bite.chainId)
  const edit=state.edits?.[bite.id]
  result.push({bite,insertionSteps:12,tightening:edit?.tightening??progress,appliedTightening:edit?.applied??progress,startLengths})
 }
 return result
}
`})),qt,Jt=t((()=>{qt=`/** Optional accelerator for this solver's one-sweep substeps. All positions
 * and calculations remain f64. Platform loading belongs outside the engine. */
export interface DomainProjector {
  readonly positions: Float64Array
  /** Same volume predicate as the TS fallback, including NaN rejection. */
  hasCompressedElements?(): boolean
  strain(h2: number): void
  volume(h2: number, barrier: boolean): void
}
`})),Yt,Xt=t((()=>{Yt=`import type { DomainCheckpoint } from './domain'
import type { DomainSolver3D } from './solver'

type Metadata = Omit<DomainCheckpoint, 'positions' | 'velocity' | 'grabReference'> & { grabReference: null }
interface Header { version: 1; width: number; frames: Metadata[] }
const encoder = new TextEncoder()
const decoder = new TextDecoder()

function metadata(state: DomainCheckpoint): Metadata {
  if (state.grabReference !== null || state.grab !== null || state.manualMode || state.manualStitches.length)
    throw new Error('Only untouched reference closures can be cached.')
  const { positions: _p, velocity: _v, grabReference: _g, ...rest } = state
  return { ...rest, grabReference: null }
}

/** Lossless IEEE-754 bytes, XORed against the previous frame and byte-shuffled
 * for compression. Neither geometry nor velocities are rounded. The caller
 * handles compression, fetching and provenance outside the engine. */
export function encodeReferenceSteps(frames: DomainCheckpoint[]): Uint8Array {
  const width = frames[0]?.positions.length ?? 0
  if (!width || !frames.length || frames.some(s => s.positions.length !== width || s.velocity.length !== width))
    throw new Error('Invalid reference checkpoint dimensions.')
  const header = encoder.encode(JSON.stringify({ version: 1, width, frames: frames.map(metadata) } satisfies Header))
  const size = width * 16, bytes = new Uint8Array(4 + header.length + frames.length * size)
  new DataView(bytes.buffer).setUint32(0, header.length, true)
  bytes.set(header, 4)
  let previous = new Uint8Array(size)
  for (let f = 0; f < frames.length; f++) {
    const values = new Float64Array(width * 2)
    values.set(frames[f]!.positions); values.set(frames[f]!.velocity, width)
    const raw = new Uint8Array(values.buffer), offset = 4 + header.length + f * size
    for (let b = 0; b < 8; b++) for (let i = 0; i < width * 2; i++)
      bytes[offset + b * width * 2 + i] = raw[i * 8 + b]! ^ previous[i * 8 + b]!
    previous = raw
  }
  return bytes
}

export function decodeReferenceSteps(bytes: Uint8Array): DomainCheckpoint[] {
  if (bytes.length < 4) throw new Error('Incomplete reference data.')
  const length = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength).getUint32(0, true)
  if (length > bytes.length - 4 || length > 4_000_000) throw new Error('Invalid reference header.')
  const header = JSON.parse(decoder.decode(bytes.subarray(4, 4 + length))) as Header
  if (header.version !== 1 || !Number.isSafeInteger(header.width) || header.width <= 0 || header.width > 100_000 || !Array.isArray(header.frames) || !header.frames.length || header.frames.length > 1000)
    throw new Error('Unsupported reference data.')
  const { width } = header, size = width * 16
  if (bytes.length !== 4 + length + header.frames.length * size) throw new Error('Incomplete reference checkpoints.')
  const values = new Float64Array(header.frames.length * width * 2), raw = new Uint8Array(values.buffer)
  return header.frames.map((state, f) => {
    const input = 4 + length + f * size, output = f * size
    for (let b = 0; b < 8; b++) for (let i = 0; i < width * 2; i++) {
      const index = output + i * 8 + b
      raw[index] = bytes[input + b * width * 2 + i]! ^ (f ? raw[index - size]! : 0)
    }
    const result = { ...state, positions: values.subarray(f * width * 2, f * width * 2 + width), velocity: values.subarray(f * width * 2 + width, (f + 1) * width * 2), grabReference: null }
    metadata(result)
    if (!result.positions.every(Number.isFinite) || !result.velocity.every(Number.isFinite)) throw new Error('Invalid reference coordinates.')
    return result
  })
}

/** Reuse a calculated step only when its COMPLETE physical input matches.
 * A pull, edit, release change or divergent state immediately uses the live
 * solver. Restoring a canonical checkpoint can safely reuse the cache again. */
export function referenceStepper(frames: DomainCheckpoint[]): (solver: DomainSolver3D) => boolean {
  const key = (s: DomainCheckpoint) => \`\${s.domainId}/\${s.step}/\${s.closure.stage}/\${s.closure.elapsed}\`
  const transitions = new Map<string, { before: DomainCheckpoint; after: DomainCheckpoint; meta: string }>()
  for (let i = 0; i < frames.length - 1; i++) {
    const before = frames[i]!, after = frames[i + 1]!
    if (after.step === before.step + 1 && after.domainId === before.domainId && after.closure.stage === before.closure.stage)
      transitions.set(key(before), { before, after, meta: JSON.stringify(metadata(before)) })
  }
  return solver => {
    if (solver.grab || solver.manualMode || solver.manual.count || solver.closure.edits) return false
    const state = solver.checkpoint(), transition = transitions.get(key(state))
    if (!transition || JSON.stringify(metadata(state)) !== transition.meta) return false
    if (!state.positions.every((value, i) => Object.is(value, transition.before.positions[i])) || !state.velocity.every((value, i) => Object.is(value, transition.before.velocity[i]))) return false
    solver.restore(transition.after)
    return true
  }
}
`})),Zt,Qt=t((()=>{Zt=`import type { TissueDomain3D, Vec3 } from './domain'
import { trianglePoint } from './contact'
import {SweptEdgeProjector,segmentPair} from './edgeContact'
import {MovingBounds} from './movingBounds'

const THICKNESS=.12
const at=(p:ArrayLike<number>,v:number):Vec3=>[p[v*3]!,p[v*3+1]!,p[v*3+2]!]
const dot=(a:Vec3,b:Vec3)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2]
const sub=(a:Vec3,b:Vec3):Vec3=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]]
/** Local deformable surface contact. Candidates are rebuilt from moving
 * triangles, rather than paired by the original ellipse axis. */
export class TissueSelfContact {
 private readonly edgeProjector=new SweptEdgeProjector()
 private readonly faces:Vec3[]=[]
 private readonly vertices:number[]
 private readonly edges:[number,number,number[]][]=[]
 private readonly excluded=new Map<number,Set<number>>()
 private previous:Float64Array
 private readonly faceBounds:MovingBounds
 private readonly edgeBounds:MovingBounds
 private candidateReference:Float64Array|null=null
 private candidatePrevious:Float64Array|null=null
 private candidateFaces=new Map<number,number[]>()
 private candidateEdges:number[]=[]
 private readonly incidentEdges=new Map<number,number[]>()
 private readonly incidentFaces=new Map<number,number[]>()
 private readonly sweptFaces:Float64Array
 private readonly sweptEdges:Float64Array
 private readonly edgePairEligibility:Uint8Array
 constructor(private readonly domain:TissueDomain3D){
  const all=[...domain.surface.triangles,...domain.walls.dermis,...domain.walls.fat]
  // Carried-fat nodes are compacted near the lid; modulo indexing would
  // associate some wall nodes with unrelated columns.
  const column=new Map<number,number>()
  for(let v=0;v<domain.surface.count;v++){column.set(v,v);column.set(v+domain.surface.count,v);if(domain.dermalMiddle?.[v]!==undefined)column.set(domain.dermalMiddle[v]!,v)}
  for(let i=0;i<domain.walls.fat.length;i+=6){column.set(domain.walls.fat[i+1]!,domain.walls.fat[i]!-domain.surface.count);column.set(domain.walls.fat[i+5]!,domain.walls.fat[i+2]!-domain.surface.count)}
  const near=new Set<number>()
  for(let v=0;v<domain.surface.count;v++)if(domain.wound.some(w=>Math.hypot(domain.rest[v*3]!-domain.rest[w*3]!,domain.rest[v*3+1]!-domain.rest[w*3+1]!,domain.rest[v*3+2]!-domain.rest[w*3+2]!)<8))near.add(v)
  for(let i=0;i<all.length;i+=3){const ids=all.slice(i,i+3) as Vec3;if(ids.some(v=>near.has(column.get(v)??v)))this.faces.push(ids)}
  const adjacent=new Map<number,Set<number>>()
  for(const face of this.faces)for(const v of face){const set=adjacent.get(v)??new Set<number>();face.forEach(x=>set.add(x));adjacent.set(v,set)}
  this.vertices=[...new Set(this.faces.flat())].sort((a,b)=>a-b)
  // Rest-face extents are identical for every tested vertex. Preserve the
  // three-node Math.min/max order while calculating each extent only once.
  const restFaceBounds=new Float64Array(this.faces.length*6)
  this.faces.forEach((f,i)=>{for(let a=0;a<3;a++){
    restFaceBounds[i*6+a]=Math.min(domain.rest[f[0]*3+a]!,domain.rest[f[1]*3+a]!,domain.rest[f[2]*3+a]!)
    restFaceBounds[i*6+a+3]=Math.max(domain.rest[f[0]*3+a]!,domain.rest[f[1]*3+a]!,domain.rest[f[2]*3+a]!)
  }})
  const faceColumns=this.faces.map(f=>f.map(x=>column.get(x)??x))
  for(const v of this.vertices){
    const set=new Set<number>(),neighbours=adjacent.get(v),materialColumn=column.get(v)??v
    this.faces.forEach((f,i)=>{
      if(f.some((x,j)=>neighbours?.has(x)||faceColumns[i]![j]===materialColumn)){set.add(i);return}
      let separated=false
      for(let a=0;a<3;a++){const value=domain.rest[v*3+a]!;if(value<restFaceBounds[i*6+a]!-THICKNESS*2||value>restFaceBounds[i*6+a+3]!+THICKNESS*2){separated=true;break}}
      if(!separated&&trianglePoint(at(domain.rest,v),domain.rest,f).distance<THICKNESS*2)set.add(i)
    })
    this.excluded.set(v,set)
  }
  const keys=new Map<string,number>()
  this.faces.forEach((f,i)=>{for(let j=0;j<3;j++){
   const a=f[j]!,b=f[(j+1)%3]!,key=a<b?\`\${a}/\${b}\`:\`\${b}/\${a}\`,existing=keys.get(key)
   if(existing===undefined){keys.set(key,this.edges.length);this.edges.push([a,b,[i]])}
   else this.edges[existing]![2].push(i)
  }})
  this.sweptFaces=new Float64Array(this.faces.length*6)
  this.faces.forEach((face,i)=>{for(const v of face){const list=this.incidentFaces.get(v)??[];list.push(i);this.incidentFaces.set(v,list)}})
  this.sweptEdges=new Float64Array(this.edges.length*6)
  this.edges.forEach(([a,b],i)=>{for(const v of [a,b]){const list=this.incidentEdges.get(v)??[];list.push(i);this.incidentEdges.set(v,list)}})
  // Two bits per unordered edge pair: 0 unknown, 1 excluded, 2 eligible.
  // Rest geometry and topological exclusions are fixed for this contact object.
  // Limit memory to 16 MiB; pairs outside the cache use the identical predicate.
  const pairs=this.edges.length*(this.edges.length-1)/2
  this.edgePairEligibility=new Uint8Array(Math.min(16*1024*1024,Math.ceil(pairs/4)))
  this.faceBounds=new MovingBounds(this.faces,domain.rest);this.edgeBounds=new MovingBounds(this.edges.map(([a,b])=>[a,b]),domain.rest)
  this.previous=domain.rest.slice()
 }
 intersections(p:Float64Array,report?:(edge:[number,number],face:Vec3)=>void):number {
  this.faceBounds.refit(p,p,0)
  let crossings=0
  const normals:(Vec3|undefined)[]=[]
  // Edges retain their original first-seen orientation and traversal order.
  for(const [a,b] of this.edges){
   const start=at(p,a),end=at(p,b),lo=start.map((v,i)=>Math.min(v,end[i]!)),hi=start.map((v,i)=>Math.max(v,end[i]!))
   for(const i of this.faceBounds.query(lo,hi)){
    if(this.excluded.get(a)!.has(i)||this.excluded.get(b)!.has(i))continue
    const triangle=this.faces[i]!,normal=normals[i]??(normals[i]=trianglePoint(start,p,triangle).normal),origin=at(p,triangle[0]),da=dot(sub(start,origin),normal),db=dot(sub(end,origin),normal)
    if(da*db>=-1e-10)continue
    const t=da/(da-db),hit=start.map((v,i)=>v+(end[i]!-v)*t) as Vec3,q=trianglePoint(hit,p,triangle)
    if(q.distance<1e-6&&q.weights.every(w=>w>1e-6)){crossings++;report?.([a,b],triangle)}
   }
  }
  return crossings
 }
 restore(p:Float64Array):void {this.previous.set(p)}
 beginStep():void {this.candidateReference=null}
 project(p:Float64Array):boolean {
  let changed=false
  this.prepareCandidates(p)
  // Cache swept primitive boxes, refreshing incident faces immediately after
  // a correction. This changes allocation/work only, not projection order.
  const boxes=this.sweptFaces
  const refitFace=(i:number)=>{const f=this.faces[i]!;for(let a=0;a<3;a++){boxes[i*6+a]=Math.min(p[f[0]*3+a]!,p[f[1]*3+a]!,p[f[2]*3+a]!,this.previous[f[0]*3+a]!,this.previous[f[1]*3+a]!,this.previous[f[2]*3+a]!)-THICKNESS;boxes[i*6+a+3]=Math.max(p[f[0]*3+a]!,p[f[1]*3+a]!,p[f[2]*3+a]!,this.previous[f[0]*3+a]!,this.previous[f[1]*3+a]!,this.previous[f[2]*3+a]!)+THICKNESS}}
  for(let i=0;i<this.faces.length;i++)refitFace(i)
  for(const v of this.vertices){
   const old=at(this.previous,v)
   for(const i of this.candidateFaces.get(v)??[]){
    if(this.excluded.get(v)!.has(i))continue
    const face=this.faces[i]!
    let outside=false
    for(let a=0;a<3;a++){
      const low=boxes[i*6+a]!,high=boxes[i*6+a+3]!
      if(Math.min(p[v*3+a]!,old[a]!)>high||Math.max(p[v*3+a]!,old[a]!)<low){outside=true;break}
    }
    if(outside)continue
    const current=at(p,v),q=trianglePoint(current,p,face),prior=trianglePoint(old,this.previous,face)
    const sign=dot(sub(old,prior.point),prior.normal)>=0?1:-1
    const interior=q.weights.every(w=>w>1e-6)
    let signed=dot(sub(current,q.point),q.normal)*sign
    // A swept point crossing the interior of a moving surface must not tunnel
    // through merely because its final position is farther than the thickness.
    // Both sides move: measuring the old vertex against the *new* face loses
    // a crossing when the face passes a stationary vertex.
    let crossed=false
    if(q.distance>=THICKNESS&&signed<0&&interior){
     const relativeMotion=Math.hypot(...sub(current,old))+Math.max(...face.map(n=>Math.hypot(...sub(at(p,n),at(this.previous,n)))))
     crossed=Math.abs(signed)<relativeMotion+.25
    }
    if(q.distance>=THICKNESS&&!crossed)continue
    let normal=q.normal.map(n=>n*sign) as Vec3
    if(!interior){
     // An edge/corner proximity constraint uses the gradient of its actual
     // closest-feature distance. A face normal here would push tangentially
     // to the separation or into the adjacent surface instead of repelling it.
     signed=q.distance
     const direction=q.distance>1e-10?sub(current,q.point):sub(old,prior.point),length=Math.hypot(...direction)
     if(length>1e-10)normal=direction.map(n=>n/length) as Vec3
    }
    // For an interior penetration, retain the signed distance even if the
    // swept heuristic did not fire. Replacing it with abs(distance) would
    // under-correct an already penetrated point and let the next step adopt
    // the wrong contact side.
    let mass=this.domain.inverseMass[v]!
    face.forEach((n,j)=>mass+=this.domain.inverseMass[n]!*q.weights[j]!**2)
    if(mass<1e-12)continue
    if(THICKNESS-signed<1e-7)continue
    changed=true
    const correction=(THICKNESS-signed)/mass
    for(let a=0;a<3;a++){
     const n=normal[a]!*correction
     p[v*3+a]=p[v*3+a]!+this.domain.inverseMass[v]!*n
     face.forEach((w,j)=>{p[w*3+a]=p[w*3+a]!-this.domain.inverseMass[w]!*q.weights[j]!*n})
    }
    for(const node of [v,...face])for(const affected of this.incidentFaces.get(node)!)refitFace(affected)
   }
  }
  return this.projectEdges(p)||changed
 }
 private prepareCandidates(p:Float64Array):void {
  // Reuse a 1 mm padded broad phase while each endpoint of the swept
  // interval stays within .4 mm of its reference. Relative movement plus
  // contact thickness remains below the padding (.8 + .12 < 1 mm).
  // Test both current and previous positions: restoration can change either.
  if(this.candidateReference&&this.candidatePrevious&&this.vertices.every(v=>
   Math.hypot(p[v*3]!-this.candidateReference![v*3]!,p[v*3+1]!-this.candidateReference![v*3+1]!,p[v*3+2]!-this.candidateReference![v*3+2]!)<=.4&&
   Math.hypot(this.previous[v*3]!-this.candidatePrevious![v*3]!,this.previous[v*3+1]!-this.candidatePrevious![v*3+1]!,this.previous[v*3+2]!-this.candidatePrevious![v*3+2]!)<=.4))return
  this.faceBounds.refit(p,this.previous,1);this.edgeBounds.refit(p,this.previous,1)
  const bounds=(ids:readonly number[])=>{const lo=[Infinity,Infinity,Infinity],hi=[-Infinity,-Infinity,-Infinity];for(const v of ids)for(let k=0;k<3;k++){lo[k]=Math.min(lo[k]!,p[v*3+k]!,this.previous[v*3+k]!);hi[k]=Math.max(hi[k]!,p[v*3+k]!,this.previous[v*3+k]!)}return {lo,hi}}
  const near=(a:{lo:number[];hi:number[]},b:{lo:number[];hi:number[]})=>a.lo.every((x,k)=>x<=b.hi[k]!+1&&a.hi[k]!>=b.lo[k]!-1)
  const faces=this.faces.map(bounds),edges=this.edges.map(([a,b])=>bounds([a,b]))
  this.candidateFaces.clear()
  for(const v of this.vertices){const box=bounds([v]);this.candidateFaces.set(v,this.faceBounds.query(box.lo,box.hi).filter(i=>!this.excluded.get(v)!.has(i)&&near(box,faces[i]!)).sort((a,b)=>a-b))}
  this.candidateEdges=[]
  this.edges.forEach(([a,b,faces],i)=>{
   const box=edges[i]!
   // Filtering immutable candidates before sorting preserves the exact
   // projection order while avoiding a sort of discarded neighbouring edges.
   const nearby=this.edgeBounds.query(box.lo,box.hi).filter(j=>j>i&&near(box,edges[j]!)).sort((a,b)=>a-b)
   for(const j of nearby){
    const [c,d,others]=this.edges[j]!
    // A shared edge has multiple incident faces. Using only its first face
    // can suppress contact because that face's unrelated third vertex is a
    // material neighbour, while the edge crosses another eligible face.
    // Match the intersection detector in either direction; triangle ordering
    // must not decide whether a physical edge pair receives contact.
    const pair=j*(j-1)/2+i,byte=Math.floor(pair/4),shift=(pair%4)*2
    let eligible=byte<this.edgePairEligibility.length?(this.edgePairEligibility[byte]!>>shift)&3:0
    if(!eligible){
     const firstCanCross=others.some(face=>!this.excluded.get(a)!.has(face)&&!this.excluded.get(b)!.has(face))
     const secondCanCross=faces.some(face=>!this.excluded.get(c)!.has(face)&&!this.excluded.get(d)!.has(face))
     eligible=(!firstCanCross&&!secondCanCross)||segmentPair(at(this.domain.rest,a),at(this.domain.rest,b),at(this.domain.rest,c),at(this.domain.rest,d)).distance<THICKNESS*2?1:2
     if(byte<this.edgePairEligibility.length)this.edgePairEligibility[byte]=this.edgePairEligibility[byte]!|(eligible<<shift)
    }
    if(eligible===1)continue
    this.candidateEdges.push(i,j)
   }
  })
  this.candidateReference=p.slice();this.candidatePrevious=this.previous.slice()
 }
 private projectEdges(p:Float64Array):boolean {
  let changed=false
  const bounds=this.sweptEdges
  const refit=(i:number)=>{
   const [a,b]=this.edges[i]!
   for(let k=0;k<3;k++){
    bounds[i*6+k]=Math.min(p[a*3+k]!,p[b*3+k]!,this.previous[a*3+k]!,this.previous[b*3+k]!)
    bounds[i*6+k+3]=Math.max(p[a*3+k]!,p[b*3+k]!,this.previous[a*3+k]!,this.previous[b*3+k]!)
   }
  }
  for(let i=0;i<this.edges.length;i++)refit(i)
  const pairs=this.candidateEdges,ids:[number,number,number,number]=[0,0,0,0]
  for(let pair=0;pair<pairs.length;pair+=2){
   const i=pairs[pair]!,j=pairs[pair+1]!,aBox=i*6,bBox=j*6
   // Reject the same swept boxes in the same axis order without allocating
   // iterator objects for every candidate on each contact sweep.
   if(bounds[bBox]!>bounds[aBox+3]!+THICKNESS||bounds[bBox+3]!<bounds[aBox]!-THICKNESS||
      bounds[bBox+1]!>bounds[aBox+4]!+THICKNESS||bounds[bBox+4]!<bounds[aBox+1]!-THICKNESS||
      bounds[bBox+2]!>bounds[aBox+5]!+THICKNESS||bounds[bBox+5]!<bounds[aBox+2]!-THICKNESS)continue
   const [a,b]=this.edges[i]!,[c,d]=this.edges[j]!
   ids[0]=a;ids[1]=b;ids[2]=c;ids[3]=d
   if(this.edgeProjector.project(p,this.previous,this.domain.inverseMass,ids,THICKNESS)){
    changed=true
    // Projection moves both banks. Refresh every incident edge immediately;
    // stale cached boxes must never suppress the next contact candidate.
    for(const v of [a,b,c,d])for(const edge of this.incidentEdges.get(v)!)refit(edge)
   }
  }
  return changed
 }
}
`})),$t,en=t((()=>{$t=`import { editPreset, presetSnapshot } from './presetEdits'
import type { DomainCheckpoint, Grab3D, TissuePoint } from './domain'
import type { DomainSolver3D } from './solver'

export type TissueCommand = ({ kind: 'stitch-add'; id: string; a: TissuePoint; b: TissuePoint } | { kind: 'stitch-replace'; id: string; a: TissuePoint; b: TissuePoint } | { kind: 'stitch-tighten'; id: string; value: number } | { kind: 'stitch-tighten-many'; ids: string[]; value: number } | { kind: 'stitch-remove'; id: string } | { kind: 'stitch-clear' } | { kind: 'grab'; grab: Grab3D | null } | { kind: 'release'; released: boolean; mm?: 0 | 3 | 6 } | { kind: 'closure'; stage: 'deep' | 'surface' } | { kind: 'pause'; paused: boolean }) & { editId?: number }
export interface RecordedTissueCommand { step: number; command: TissueCommand }
export interface SessionArchive { undo?: SessionArchive[]; redo?: SessionArchive[]; version: 2; domainId: string; commands: RecordedTissueCommand[]; state: DomainCheckpoint; lastStep: number; commandCursor: number }
interface SessionCheckpoint { state: DomainCheckpoint; commandCursor: number }
export const MAX_HISTORY_STEPS = 1800
export const MAX_MANUAL_HISTORY_STEPS = 36000
export const CHECKPOINT_INTERVAL = 8
/** In-memory deterministic history with bounded full checkpoints and 16 undo edits. */
export class TissueSession {
  readonly commands: RecordedTissueCommand[] = []
  readonly checkpoints: SessionCheckpoint[] = []
  lastStep = 0
  private commandCursor = 0
  private undoStates: SessionArchive[] = []
  private redoStates: SessionArchive[] = []
  private lastEdit: number | undefined
  constructor(readonly solver: DomainSolver3D, private readonly referenceStep?: (solver: DomainSolver3D) => boolean) { this.save() }
  private save(): void {
    this.checkpoints.push({ state: this.solver.checkpoint(), commandCursor: this.commandCursor })
    // Keep the initial state for older replay and 64 recent full checkpoints.
    if(this.checkpoints.length>65)this.checkpoints.splice(1,this.checkpoints.length-65)
  }
  archive():SessionArchive{return {version:2,domainId:this.solver.domain.id,commands:this.commands.map(c=>({...c,command:structuredCommand(c.command)})),state:this.solver.checkpoint(),lastStep:this.lastStep,commandCursor:this.commandCursor}}
  exportArchive():SessionArchive {return {...this.archive(),undo:structuredClone(this.undoStates),redo:structuredClone(this.redoStates)}}
  restoreExperiment(value:SessionArchive):void {
    if((value.undo?.length??0)>16||(value.redo?.length??0)>16)throw new Error('Invalid experiment edit history.')
    this.restoreArchive(value)
    this.undoStates=structuredClone(value.undo??[]);this.redoStates=structuredClone(value.redo??[]);this.lastEdit=undefined
  }
  restoreArchive(value:SessionArchive):void {
    if(value.version!==2||value.domainId!==this.solver.domain.id||value.commandCursor<0||value.commandCursor>value.commands.length||value.lastStep<value.state.step||value.lastStep>(value.state.manualMode?MAX_MANUAL_HISTORY_STEPS:MAX_HISTORY_STEPS)||value.commands.some((c,i)=>!Number.isInteger(c.step)||c.step<0||c.step>value.lastStep||(i>0&&c.step<value.commands[i-1]!.step)))throw new Error('The saved experiment is incompatible.')
    this.solver.restore(value.state);this.commands.splice(0,this.commands.length,...value.commands.map(c=>({...c,command:structuredCommand(c.command)})));this.commandCursor=value.commandCursor;this.lastStep=value.lastStep
    this.checkpoints.splice(1);this.save()
  }
  get canUndo():boolean{return this.undoStates.length>0}
  get canRedo():boolean{return this.redoStates.length>0}
  undo():void {const previous=this.undoStates.pop();if(!previous)return;this.redoStates.push(this.archive());this.restoreArchive(previous);this.lastEdit=undefined}
  redo():void {const next=this.redoStates.pop();if(!next)return;this.undoStates.push(this.archive());this.restoreArchive(next);this.lastEdit=undefined}
  apply(step: number, commands: TissueCommand[], editId?: number): void {
    if (step !== this.solver.stepIndex) throw new Error('Command step does not match the current case.')
    if (!commands.length) return
    if(this.commands.length+commands.length>20000)throw new Error('This experiment has reached its recording limit. Your work is preserved; start a new rehearsal to continue.')
    if(commands.some(c=>c.editId!==undefined&&(!Number.isSafeInteger(c.editId)||c.editId<0)))throw new Error('Invalid edit identifier.')
    const transaction=commands.some(c=>c.kind.startsWith('stitch-'))?this.archive():null, checkpoints=transaction?[...this.checkpoints]:null
    const undo=transaction?[...this.undoStates]:null,redo=transaction?[...this.redoStates]:null,lastEdit=this.lastEdit
    let capturedAnonymousBatch=false
    try { for (const command of commands) {
      const copy = structuredCommand(command), groupId=command.editId??editId
      const edited=command.kind.startsWith('stitch-')||this.solver.manualMode&&(command.kind==='grab'||command.kind==='release')
      const before=edited&&(groupId===undefined?!capturedAnonymousBatch:this.lastEdit!==groupId)?this.archive():null
      this.execute(copy)
      if(before && !this.undoStates.includes(before)){this.undoStates.push(before);if(this.undoStates.length>16)this.undoStates.shift();this.redoStates=[];this.lastEdit=groupId;capturedAnonymousBatch=true}
      // An invalid edit must not discard the recorded future. Branch only
      // after the solver has accepted the first command at this position.
      if (step < this.lastStep) {
        this.commands.splice(this.commandCursor)
        for (let i = this.checkpoints.length - 1; i > 0; i--) if (this.checkpoints[i]!.state.step > step) this.checkpoints.splice(i, 1)
        this.lastStep = step
      }
      // Preserve order: a grab pauses closure, and starting closure releases
      // a grab. Replacing an earlier command across either operation changes
      // replay, even if no simulation step happened between those inputs.
      const previous = this.commands[this.commands.length - 1]
      if (previous?.step === step && canReplaceAdjacentTissueCommand(previous.command, copy)) previous.command = copy
      else { this.commands.push({ step, command: copy }); this.commandCursor++ }
    } } catch(error) {
      // An invalid second command must not leave a half-applied edit or erase
      // the recorded future. Continuous grip-only input avoids this copy.
      if(transaction){this.restoreArchive(transaction);this.checkpoints.splice(0,this.checkpoints.length,...checkpoints!);this.undoStates=undo!;this.redoStates=redo!;this.lastEdit=lastEdit}
      throw error
    }
  }
  private execute(command: TissueCommand): void {
    if(command.kind === 'stitch-add'||command.kind==='stitch-replace') {
      this.solver.closure.paused=true
      if(command.kind==='stitch-add')this.solver.manual.add(command.id,command.a,command.b,this.solver.positions)
      else if(command.id.startsWith('manual-'))this.solver.manual.replace(command.id,command.a,command.b,this.solver.positions)
      else {this.solver.manual.add(\`manual-replacement-\${command.id}\`,command.a,command.b,this.solver.positions);editPreset(this.solver.closure,this.solver.domain.closure,command.id,'remove')}
      this.solver.enableManual()
    }
    else if(command.kind === 'stitch-tighten')this.editStitch(command.id,command.value)
    else if(command.kind === 'stitch-tighten-many'){
      if(!command.ids.length||new Set(command.ids).size!==command.ids.length)throw new Error('Select distinct stitches.')
      for(const id of command.ids)this.editStitch(id,command.value)
    }
    else if(command.kind === 'stitch-remove')this.editStitch(command.id,'remove')
    else if(command.kind==='stitch-clear'){
      for(const {bite} of presetSnapshot(this.solver.closure,this.solver.domain.closure))this.editStitch(bite.id,'remove')
      this.solver.manual.clear()
    }
    else if (command.kind === 'grab') this.solver.setGrab(command.grab)
    else if (command.kind === 'release') { const mm=command.mm??(command.released?3:0); if(![0,3,6].includes(mm))throw new Error('Unsupported release distance.'); this.solver.underminingMm=mm }
    else if (command.kind === 'closure') this.solver.startClosure(command.stage)
    else if(command.kind==='pause')this.solver.closure.paused = command.paused
    else throw new Error('Unsupported experiment command.')
  }
  private editStitch(id:string,value:number|'remove'):void {
    if(id.startsWith('manual-')){if(value==='remove')this.solver.manual.remove(id);else this.solver.manual.tighten(id,value)}
    else editPreset(this.solver.closure,this.solver.domain.closure,id,value)
    this.solver.closure.paused=true;this.solver.enableManual()
  }
  synchronizeCommands(): void {
    while (this.commandCursor < this.commands.length && this.commands[this.commandCursor]!.step === this.solver.stepIndex) this.execute(this.commands[this.commandCursor++]!.command)
  }
  advance(): void {
    if (this.solver.stepIndex >= (this.solver.manualMode?MAX_MANUAL_HISTORY_STEPS:MAX_HISTORY_STEPS)) throw new Error('This experiment has reached its recording limit. Your work is preserved; rewind or reset the rehearsal.')
    this.synchronizeCommands()
    if (!this.referenceStep?.(this.solver)) this.solver.advance()
    if (this.solver.stepIndex > this.lastStep) { this.lastStep = this.solver.stepIndex; if (this.lastStep % CHECKPOINT_INTERVAL === 0) this.save() }
  }
  /** Restore state AND the command cursor, then replay fixed steps. */
  startSeek(target: number): number {
    if (!Number.isInteger(target) || target < 0 || target > this.lastStep) throw new Error('Invalid timeline position.')
    let checkpoint = this.checkpoints[0]!
    for (const c of this.checkpoints) if (c.state.step <= target && c.state.step >= checkpoint.state.step) checkpoint = c
    this.solver.restore(checkpoint.state); this.commandCursor = checkpoint.commandCursor
    return target
  }
  seek(target: number): void { this.startSeek(target); while (this.solver.stepIndex < target) this.advance(); this.synchronizeCommands() }
}
function structuredCommand(command: TissueCommand): TissueCommand {
  if(command.kind==='stitch-tighten-many')return {...command,ids:[...command.ids]}
  if(command.kind==='stitch-add'||command.kind==='stitch-replace')return {...command,a:{vertices:[...command.a.vertices],weights:[...command.a.weights]},b:{vertices:[...command.b.vertices],weights:[...command.b.weights]}}
  return command.kind !== 'grab' ? { ...command } : { ...command, kind: 'grab', grab: command.grab ? { vertex: command.grab.vertex, target: [...command.grab.target] } : null }
}

export function canReplaceAdjacentTissueCommand(previous: TissueCommand, next: TissueCommand): boolean {
  if (previous.kind !== next.kind || previous.editId !== next.editId) return false
  if(previous.kind==='stitch-tighten-many'&&next.kind==='stitch-tighten-many')return previous.ids.length===next.ids.length&&previous.ids.every((id,i)=>id===next.ids[i])
  if(previous.kind==='stitch-tighten'&&next.kind==='stitch-tighten')return previous.id===next.id
  if (previous.kind === 'release' || previous.kind === 'pause') return true
  if (previous.kind === 'closure' && next.kind === 'closure') return previous.stage === next.stage
  if (previous.kind === 'grab' && next.kind === 'grab') {
    // Letting go does not undo the pause introduced by grasping. Keep those
    // transitions, while coalescing target updates for one continuous grip.
    return previous.grab?.vertex === next.grab?.vertex
  }
  return false
}
`})),tn,nn=t((()=>{tn=`import { trianglePoint, type TrianglePoint } from './contact'
import type { TissueDomain3D, Vec3 } from './domain'
import { MovingBounds } from './movingBounds'

interface Layer {
  faces: Vec3[]
  vertices: number[]
  signs: number[]
  bounds: MovingBounds
}
const SEARCH_MM = 3

/** Contact between the underside of a sliding flap and the deformable fat bed.
 * Attachments keep their material identities; contact follows CURRENT spatial
 * neighbours. A released column's old barycentric footpoint is no longer the
 * tissue beneath it after advancement. No attraction or tangential friction. */
export class SlidingInterfaceContact {
  private readonly upper: Layer
  private readonly lower: Layer
  constructor(private readonly domain: TissueDomain3D) {
    const make = (triangles: Uint32Array): Layer => {
      const faces: Vec3[] = []
      for (let i = 0; i < triangles.length; i += 3) faces.push(Array.from(triangles.slice(i, i + 3)) as Vec3)
      // Both surfaces use outward (towards skin) normals. The current cheek
      // patch faces anteriorly; retain that rest winding during deformation.
      const signs = faces.map(face => trianglePoint([0, 0, 0], domain.rest, face).normal[2] >= 0 ? 1 : -1)
      return { faces, signs, vertices: [...new Set(triangles)].sort((a, b) => a - b), bounds: new MovingBounds(faces, domain.rest) }
    }
    this.upper = make(domain.slidingInterface!.upper)
    this.lower = make(domain.slidingInterface!.lower)
  }

  project(p: Float64Array): void {
    // A correction can bring a neighbouring bed point under a newly moved
    // triangle. Refit and sweep again rather than leaving it penetrated until
    // the next displayed frame.
    for (let pass = 0; pass < 8; pass++) {
      const upper = this.visit(p, this.upper.vertices, this.lower, 1, true)
      const lower = this.visit(p, this.lower.vertices, this.upper, -1, true)
      // Usually one sweep suffices; compressed junctions need additional
      // reconciliation. This tolerance controls numerical contact, not the
      // displayed seam or a calibrated tissue property.
      if (Math.max(upper, lower) < .005) break
    }
  }

  maximumPenetration(p: Float64Array): number {
    return Math.max(this.visit(p, this.upper.vertices, this.lower, 1, false), this.visit(p, this.lower.vertices, this.upper, -1, false))
  }

  private visit(p: Float64Array, vertices: number[], layer: Layer, side: number, correct: boolean): number {
    // The sweep moves both surfaces. Padding bounds by the search radius
    // keeps candidates conservative within this substep; exact triangle
    // positions and normals are read again for every constraint.
    layer.bounds.refit(p, p, SEARCH_MM)
    const mass = this.domain.inverseMass
    let maximum = 0
    for (const v of vertices) {
      const point = Array.from(p.subarray(v * 3, v * 3 + 3)) as Vec3
      let closest: TrianglePoint | null = null, sign = 1
      for (const i of layer.bounds.query(point, point)) {
        const q = trianglePoint(point, p, layer.faces[i]!)
        if (q.distance <= SEARCH_MM && (!closest || q.distance < closest.distance)) { closest = q; sign = layer.signs[i]! }
      }
      if (!closest) continue
      const q = closest, normal = q.normal.map(n => n * sign * side) as Vec3
      const gap = normal.reduce((n, x, a) => n + x * (point[a]! - q.point[a]!), 0)
      // At an open wound edge, a nearest point beside the triangle is not an
      // overlying layer. Enforce only an interior projection (including a
      // shared edge), not a plane that extends across the exposed wound.
      if (gap >= 0 || q.distance * q.distance - gap * gap > 1e-8) continue
      maximum = Math.max(maximum, -gap)
      if (!correct) continue
      const denominator = mass[v]! + q.vertices.reduce((n, node, j) => n + mass[node]! * q.weights[j]! ** 2, 0)
      if (denominator < 1e-12) continue
      for (let a = 0; a < 3; a++) {
        const correction = -gap * normal[a]! / denominator
        p[v * 3 + a] = p[v * 3 + a]! + mass[v]! * correction
        q.vertices.forEach((node, j) => { p[node * 3 + a] = p[node * 3 + a]! - mass[node]! * q.weights[j]! * correction })
      }
    }
    return maximum
  }
}
`})),rn,an=t((()=>{rn=`import { cloneClosure, validatePresetEdits, presetSnapshot } from './presetEdits'
import { projectedOpeningMm2 } from './opening'
import { TissueSelfContact } from './selfContact'
import { SlidingInterfaceContact } from './slidingContact'
import { EditableStitches } from './editableStitches'
import { projectTetVolume, tetrahedronVolume, type VolumeTet } from '../tissueVolume'
import { biteProgress, closureDuration, DEEP_TIGHTEN_STEPS, emptyClosureState, pointDistance, RUNNING_TIGHTEN_STEPS, scheduledBiteProgress } from './closure'
import { RigidContactIndex } from './contact'
import { grabTravelLimit, gripPoint } from './grip'
import { edgeHeight, measureEversion } from './eversion'
import { projectStrain, strainTet, type StrainTet } from './strain'
import type { DomainProjector } from './projector'
import type { DomainCheckpoint, DomainMetrics, Grab3D, SutureBite3D, TissueDomain3D, TissuePoint, Vec3 } from './domain'

interface SutureSegmentBinding {
  a: TissuePoint
  b: TissuePoint
  vertices: number[]
  weightedMass: number[]
  denominator: number
}

/** Needle grips are fixed material points. Their gradients and mass terms do
 * not depend on the deformed position; assemble them once for the case. */
function bindSutureSegment(a: TissuePoint, b: TissuePoint, mass: Float64Array): SutureSegmentBinding {
  const weights = new Map<number, number>()
  a.vertices.forEach((v, j) => weights.set(v, (weights.get(v) ?? 0) - a.weights[j]!))
  b.vertices.forEach((v, j) => weights.set(v, (weights.get(v) ?? 0) + b.weights[j]!))
  const vertices: number[] = [], weightedMass: number[] = []
  let denominator = 0
  for (const [v, weight] of weights) {
    vertices.push(v); weightedMass.push(mass[v]! * weight)
    denominator += mass[v]! * weight * weight
  }
  return { a, b, vertices, weightedMass, denominator }
}

/** Passive engineering parameters, not fitted clinical material constants. */
export const DOMAIN_MATERIALS = {
  dermis: { bulkCompliance: 2e-7 }, fat: { bulkCompliance: 1.2e-6 }, muscle: { bulkCompliance: 5e-7 }, tarsus: { bulkCompliance: 5e-8 },
} as const

/** Fixed-duration accuracy profiles for offline sensitivity checks. The app
 * uses 12; higher values change only temporal resolution, not tissue settings. */
export type DomainSubsteps = 12 | 24 | 48

const MANUAL_MODEL_VERSION = 2

export class DomainSolver3D {
  readonly positions: Float64Array
  readonly velocity: Float64Array
  private readonly previous: Float64Array
  private readonly tets: (VolumeTet & { compliance: number })[]
  private readonly springLambda: Float64Array
  private readonly linkLambda: Float64Array
  private readonly anchorLambda: Float64Array
  private readonly sutureLambda: Float64Array
  private readonly sutureBindings: { bite: SutureBite3D; segments: SutureSegmentBinding[] }[]
  private readonly rigid: RigidContactIndex
  private readonly strain: StrainTet[]
  private readonly checkpointId: string
  private readonly strainEdges: { a:number;b:number;rest:number }[] = []
  manualMode = false
  private contactStepScale=1
  private selfContact: TissueSelfContact | null = null
  private readonly slidingContact: SlidingInterfaceContact | null
  readonly manual: EditableStitches
  closure = emptyClosureState()
  private grabLambda = new Float64Array(0)
  private gripTipLambda = [0, 0, 0]
  private grabPoint: TissuePoint | null = null
  private grabReference: Float64Array | null = null
  private grabTarget: Vec3 | null = null
  private readonly gripCache = new Map<number, TissuePoint>()
  stepIndex = 0
  underminingMm: 0 | 3 | 6 = 0
  get release(): boolean { return this.underminingMm > 0 }
  set release(value: boolean) { this.underminingMm = value ? 3 : 0 }
  grab: Grab3D | null = null

  constructor(readonly domain: TissueDomain3D, private readonly projector?: DomainProjector, readonly substeps: DomainSubsteps = 12) {
    this.manual = new EditableStitches(domain)
    this.slidingContact = domain.slidingInterface ? new SlidingInterfaceContact(domain) : null
    if (![12, 24, 48].includes(substeps)) throw new Error('Unsupported tissue time-step profile.')
    // A checkpoint from another numerical trajectory must never replay as if
    // it were generated with this accuracy profile or contact coupling.
    const trajectory = \`\${domain.id}/support-coupling-1\`
    this.checkpointId = substeps === 12 ? trajectory : \`\${trajectory}/substeps-\${substeps}\`
    this.positions = projector?.positions ?? domain.rest.slice(); this.previous = domain.rest.slice(); this.velocity = new Float64Array(domain.rest.length)
    this.tets = domain.tets.map(t => ({ ...t, lambda: 0, compliance: DOMAIN_MATERIALS[t.material].bulkCompliance }))
    this.springLambda = new Float64Array(domain.springs.length)
    this.linkLambda = new Float64Array(domain.links.length * 3)
    this.anchorLambda = new Float64Array(domain.anchors.length * 3)
    this.sutureLambda = new Float64Array([...domain.closure.deeps,...domain.closure.running].reduce((n,b)=>n+b.segmentTargets.length,0))
    this.sutureBindings = [...domain.closure.deeps, ...domain.closure.running].map(bite => ({ bite, segments: bite.segmentTargets.map((_, i) => bindSutureSegment(bite.route[i]!, bite.route[(i + 1) % bite.route.length]!, domain.inverseMass)) }))
    this.rigid = new RigidContactIndex(domain.rigid.surfaces)
    this.strain = domain.tets.filter(t=>t.material==='dermis').map(t=>strainTet(domain.rest,t))
    const seen=new Set<string>()
    for(const t of this.strain)for(let i=0;i<4;i++)for(let j=i+1;j<4;j++){
      const a=t.vertices[i]!,b=t.vertices[j]!,key=a<b?\`\${a}/\${b}\`:\`\${b}/\${a}\`
      if(seen.has(key))continue
      seen.add(key);this.strainEdges.push({a,b,rest:Math.hypot(domain.rest[a*3]!-domain.rest[b*3]!,domain.rest[a*3+1]!-domain.rest[b*3+1]!,domain.rest[a*3+2]!-domain.rest[b*3+2]!)})
    }
  }

  /** Checkpoints occur at step boundaries. Previous positions and multipliers
   * are scratch buffers overwritten before use, not additional physical state. */
  checkpoint(): DomainCheckpoint {
    return { ...(this.manualMode || this.manual.count ? { manualModelVersion: MANUAL_MODEL_VERSION } : {}), contactStepScale:this.contactStepScale,manualMode: this.manualMode, manualStitches: this.manual.snapshot(), domainId: this.checkpointId, step: this.stepIndex, positions: this.positions.slice(), velocity: this.velocity.slice(), release: this.release, underminingMm: this.underminingMm, grab: this.grab ? { vertex: this.grab.vertex, target: [...this.grab.target] } : null, grabReference: this.grabReference?.slice() ?? null, grabTarget: this.grabTarget ? [...this.grabTarget] : null, closure: cloneClosure(this.closure) }
  }
  restore(s: DomainCheckpoint): void {
    if ((s.manualMode || s.manualStitches?.length) && s.manualModelVersion !== MANUAL_MODEL_VERSION) throw new Error('Manual checkpoint uses an incompatible tissue model.')
    if (s.domainId !== this.checkpointId || !Number.isSafeInteger(s.step) || s.step < 0 || [s.positions, s.velocity].some(a => a.length !== this.positions.length || !a.every(Number.isFinite))) throw new Error('Checkpoint does not match this tissue domain.')
    if (s.grab) this.validateGrab(s.grab)
    if (s.grab ? !s.grabReference || s.grabReference.length !== this.gripFor(s.grab.vertex).vertices.length*3 || !s.grabReference.every(Number.isFinite) || !s.grabTarget || s.grabTarget.length !== 3 || !s.grabTarget.every(Number.isFinite) : s.grabReference !== null || s.grabTarget !== null) throw new Error('Invalid grip checkpoint.')
    if(![0,3,6].includes(s.underminingMm)||s.release!==(s.underminingMm>0))throw new Error('Invalid release checkpoint.')
    validatePresetEdits(s.closure,this.domain.closure)
    const expectedLengths = s.closure.stage === 'open' ? 0 : this.sutureLambda.length
    if (!['open', 'deep', 'surface'].includes(s.closure.stage) || !Number.isSafeInteger(s.closure.elapsed) || s.closure.elapsed < 0 || s.closure.elapsed > closureDuration(this.domain.closure,s.closure.stage) || s.closure.startLengths.length !== expectedLengths || !s.closure.startLengths.every(n=>Number.isFinite(n)&&n>=0) || typeof s.closure.paused !== 'boolean' || typeof s.closure.assistance !== 'boolean') throw new Error('Invalid closure checkpoint.')
    const expectedBites = s.closure.stage === 'open' ? 0 : this.sutureBindings.length
    if (!Array.isArray(s.closure.biteStarted) || s.closure.biteStarted.length !== expectedBites || s.closure.biteStarted.some((started, i) => {
      const bite = this.sutureBindings[i]!.bite, progress = scheduledBiteProgress(s.closure, bite)
      const firstProgress = 1 / (bite.chainId ? RUNNING_TIGHTEN_STEPS : DEEP_TIGHTEN_STEPS)
      // Immediately after advancing the clock, the next bite may be pending
      // its first projection. A later/complete bite must already be captured.
      return typeof started !== 'boolean' || started && progress === 0 || !started && progress > firstProgress
    })) throw new Error('Invalid suture engagement checkpoint.')
    if(typeof s.manualMode!=='boolean'||!Number.isFinite(s.contactStepScale)||s.contactStepScale<0||s.contactStepScale>1)throw new Error('Invalid experiment checkpoint.')
    this.manual.restore(s.manualStitches)
    this.manualMode=s.manualMode;this.contactStepScale=s.contactStepScale
    if(s.manualMode||this.domain.repair)this.selfContact??=new TissueSelfContact(this.domain)
    else this.selfContact=null
    this.selfContact?.restore(s.positions)
    this.positions.set(s.positions); this.previous.set(s.positions); this.velocity.set(s.velocity)
    this.stepIndex = s.step; this.underminingMm = s.underminingMm; this.grab = s.grab ? { vertex: s.grab.vertex, target: [...s.grab.target] } : null
    this.grabPoint = s.grab ? this.gripFor(s.grab.vertex) : null; this.grabReference = s.grabReference?.slice() ?? null; this.grabLambda = new Float64Array(this.grabReference?.length ?? 0)
    this.grabTarget = s.grabTarget ? [...s.grabTarget] : null
    this.closure = cloneClosure(s.closure)
  }
  enableManual():void {this.manualMode=true;if(!this.selfContact)this.selfContact=new TissueSelfContact(this.domain);this.selfContact.restore(this.positions)}
  private validateGrab(g: Grab3D): void {
    if (!Number.isInteger(g.vertex) || g.vertex < 0 || g.vertex >= this.domain.surface.count || !this.domain.inverseMass[g.vertex] || g.target.length !== 3 || !g.target.every(Number.isFinite)) throw new Error('Invalid tissue grab.')
    const d = Math.hypot(...g.target.map((p, i) => p - this.domain.rest[g.vertex * 3 + i]!) as Vec3)
    if (d > grabTravelLimit(this.domain)) throw new Error('Pull exceeds the supported manipulation envelope.')
  }
  private gripFor(vertex: number): TissuePoint {
    let point = this.gripCache.get(vertex)
    if (!point) { point = gripPoint(this.domain, vertex); this.gripCache.set(vertex, point) }
    return point
  }
  setGrab(g: Grab3D | null): void {
    if (g) {
      this.validateGrab(g); this.closure.paused = true; this.closure.assistance = false
      if (!this.grab || this.grab.vertex !== g.vertex) {
        this.grabPoint = this.gripFor(g.vertex)
        this.grabReference = Float64Array.from(this.grabPoint.vertices.flatMap(v=>[0,1,2].map(a=>this.positions[v*3+a]!-this.positions[g.vertex*3+a]!)))
        this.grabLambda = new Float64Array(this.grabReference.length)
        this.grabTarget = Array.from(this.positions.slice(g.vertex*3,g.vertex*3+3)) as Vec3
      }
    } else { this.grabPoint = null; this.grabReference = null; this.grabLambda = new Float64Array(0); this.grabTarget = null }
    this.grab = g ? { vertex: g.vertex, target: [...g.target] } : null
  }
  startClosure(stage: 'deep' | 'surface'): void {
    if(!this.domain.closure.deeps.length)throw new Error('This shape uses manually placed stitches.')
    if (stage === this.closure.stage) return
    if (stage === 'surface' && (this.closure.stage !== 'deep' || this.closure.elapsed < closureDuration(this.domain.closure, 'deep'))) throw new Error('Finish the deep closure before adding the running thread.')
    if (stage === 'deep' && this.closure.stage !== 'open') throw new Error('The deep sutures are already present. Rewind or reset to start again.')
    this.setGrab(null)
    // Only the actual needle paths approximate the wound. Distributed temporary
    // wall ties previously over-closed the intervals between deep sutures, then
    // released that stored strain abruptly. There is no helper to hand off now.
    this.closure = {
      stage, elapsed: 0, paused: false, assistance: false,
      ...(this.closure.edits ? {edits:cloneClosure(this.closure).edits} : {}),
      // Pending lengths are placeholders until the corresponding needle grip
      // first engages. Earlier sutures can substantially deform a later bite.
      startLengths: stage === 'deep' ? new Array(this.sutureLambda.length).fill(0) : [...this.closure.startLengths],
      biteStarted: stage === 'deep' ? new Array(this.sutureBindings.length).fill(false) : [...this.closure.biteStarted],
    }
  }

  advance(): void {
    this.manual.beginStep()
    for(const edit of Object.values(this.closure.edits??{}))edit.applied+=Math.max(-1/12,Math.min(1/12,edit.tightening-edit.applied))
    if(this.manual.count)this.manualMode=true
    if((this.manualMode||this.domain.repair) && !this.selfContact){this.selfContact=new TissueSelfContact(this.domain)}
    // Broad-phase reuse is confined to this step; no cache state is needed
    // to reproduce a checkpoint or a reconstructed experiment.
    this.selfContact?.beginStep()
    const p = this.positions, w = this.domain.inverseMass, h = 1 / (60 * this.substeps), h2 = h * h
    const stepStart=this.selfContact?p.slice():null,velocityStart=this.selfContact?this.velocity.slice():null
    this.contactStepScale=1
    const damping = .82 ** (2 / this.substeps), grabTravel = 3.6 / this.substeps
    // One coupled projection sweep per small substep (Macklin et al., Small
    // Steps in Physics Simulation, SCA 2019). Every profile advances 1/60 s;
    // damping, handle speed and outer-step closure timing stay constant.
    // No external gravity or prestress is invented. Attachments retain rest offsets.
    for (let sub = 0; sub < this.substeps; sub++) {
      this.selfContact?.restore(p)
      // Advance the handle within the small physics steps, rather than holding
      // it back by .35 mm for an entire worker round trip. A sudden large input
      // is still bounded (3.6 mm/outer step); there is no visual mesh warp.
      if (this.grab && this.grabTarget) {
        const dx=this.grab.target[0]-this.grabTarget[0],dy=this.grab.target[1]-this.grabTarget[1],dz=this.grab.target[2]-this.grabTarget[2]
        const scale=Math.min(1,grabTravel/Math.max(1e-9,Math.hypot(dx,dy,dz)))
        this.grabTarget[0]+=dx*scale;this.grabTarget[1]+=dy*scale;this.grabTarget[2]+=dz*scale
      }
      this.previous.set(p)
      for (let v = 0; v < w.length; v++) if (w[v]) for (let a = 0; a < 3; a++) p[v * 3 + a] = p[v * 3 + a]! + this.velocity[v * 3 + a]! * h
      this.springLambda.fill(0); this.linkLambda.fill(0); this.anchorLambda.fill(0); this.grabLambda.fill(0); this.gripTipLambda.fill(0)
      this.sutureLambda.fill(0)
      if(!this.projector){
        for (const t of this.tets) t.lambda = 0
        for (const t of this.strain) t.lambda=0
      }
      this.projectSubstep(h2)
      for (let i = 0; i < p.length; i++) {
        if (!Number.isFinite(p[i])) throw new Error('Non-finite tissue state.')
        this.velocity[i] = Math.max(-100, Math.min(100, (p[i]! - this.previous[i]!) / h)) * damping
      }
    }
    if(this.selfContact&&stepStart&&velocityStart){
      const admissible=()=>this.tets.every(t=>tetrahedronVolume(p,...t.vertices)>0)&&this.selfContact!.intersections(p)===0
      if(!admissible()){
        const proposal=p.slice(),proposedVelocity=this.velocity.slice()
        // Backtrack the numerical update, not the displayed mesh. This is a
        // conservative feasibility safeguard, not a calibrated contact force.
        // Keep shortening/remaining gap honest when contact blocks movement.
        for(let attempt=0;attempt<12;attempt++){
          this.contactStepScale=attempt===11?0:2**(-attempt-1)
          for(let i=0;i<p.length;i++){p[i]=stepStart[i]!+this.contactStepScale*(proposal[i]!-stepStart[i]!);this.velocity[i]=velocityStart[i]!+this.contactStepScale*(proposedVelocity[i]!-velocityStart[i]!)}
          if(admissible())break
        }
        this.selfContact.restore(p)
      }
    }
    this.stepIndex++
    if (!this.closure.paused && this.closure.elapsed < closureDuration(this.domain.closure, this.closure.stage)) this.closure.elapsed++
  }

  private projectSubstep(h2: number): void {
    const p=this.positions,w=this.domain.inverseMass
    this.projectSprings(h2)
    if(this.projector)this.projector.strain(h2)
    else for (const t of this.strain) projectStrain(p,w,t,h2)
    this.projectLinks(h2)
    this.projectAnchors(h2)
    if (this.grab && this.grabTarget && this.grabPoint && this.grabReference) {
      const grip=this.grabPoint, strongest=Math.max(...grip.weights)
      // A small forceps footprint retains the shape it had when grasped.
      // The outer falloff shares load; it never grips the opposite bank.
      for(let i=0;i<grip.vertices.length;i++) {
        const v=grip.vertices[i]!,alpha=8e-7/(h2*Math.max(.05,grip.weights[i]!/strongest))
        for(let a=0;a<3;a++){
          const index=i*3+a,dl=(this.grabTarget[a]!+this.grabReference[index]!-p[v*3+a]!-alpha*this.grabLambda[index]!)/(w[v]!+alpha)
          this.grabLambda[index]=this.grabLambda[index]!+dl;p[v*3+a]=p[v*3+a]!+w[v]!*dl
        }
      }
      // The selected tip follows the handle; the soft dermal footprint
      // spreads its load without allowing the tip to drift off the cursor.
      const v=this.grab.vertex, tipAlpha=4e-8/h2
      for(let a=0;a<3;a++){
        const dl=(this.grabTarget[a]!-p[v*3+a]!-tipAlpha*this.gripTipLambda[a]!)/(w[v]!+tipAlpha)
        this.gripTipLambda[a]=this.gripTipLambda[a]!+dl;p[v*3+a]=p[v*3+a]!+w[v]!*dl
      }
    }
    this.projectSutures(h2); this.manual.project(p,h2)
    if(this.projector)this.projector.volume(h2,false)
    else for (const t of this.tets) projectTetVolume(p, w, t, h2, false, t.compliance)
    for (let barrier = 0; barrier < 4; barrier++) {
      if(this.projector)this.projector.volume(h2,true)
      else for (const t of this.tets) projectTetVolume(p, w, t, h2, true, t.compliance, .5)
      this.projectContacts()
    }
    this.projectRigidContacts()
    // Project deformable contact after volume/support corrections, which
    // can otherwise put the two wound walls back through one another.
    if(this.selfContact)for(let contact=0;contact<3;contact++)if(!this.selfContact.project(p))break
    this.slidingContact?.project(p)
    // Contact can push a node back through an already-projected adjacent
    // tet. Reconcile the constraints across all layers near compression;
    // the usual four sweeps and the passive material parameters are intact.
    // The .25 trigger is a numerical margin below the existing .5 barrier,
    // not a tissue-compression claim. Keep the invalid-state guard if this
    // bounded repair cannot converge; never replace the displayed pose.
    for (let repair = 0; repair < 16; repair++) {
      const compressed = this.hasCompressedElements()
      if (!compressed) break
      if (this.projector) this.projector.volume(h2, true)
      else for (const t of this.tets) projectTetVolume(p, w, t, h2, true, t.compliance, .5)
      this.projectContacts()
      this.projectRigidContacts()
      if(this.selfContact)for(let contact=0;contact<3;contact++)if(!this.selfContact.project(p))break
      this.slidingContact?.project(p)
    }
  }

  // Keep hot sweeps small enough for browser JIT optimization, especially
  // JavaScriptCore. Extraction preserves equation and iteration order.
  private projectSprings(h2: number): void {
    const p = this.positions, w = this.domain.inverseMass
    for (let k = 0; k < this.domain.springs.length; k++) {
      const s = this.domain.springs[k]!, a = s.a * 3, b = s.b * 3, sum = w[s.a]! + w[s.b]!
      if (!sum) continue
      const dx = p[b]! - p[a]!, dy = p[b + 1]! - p[a + 1]!, dz = p[b + 2]! - p[a + 2]!, length = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (length < 1e-10) continue
      const alpha = s.compliance / h2, dl = (-(length - s.rest) - alpha * this.springLambda[k]!) / (sum + alpha)
      this.springLambda[k] = this.springLambda[k]! + dl
      p[a] = p[a]! - w[s.a]! * dx / length * dl; p[b] = p[b]! + w[s.b]! * dx / length * dl
      p[a + 1] = p[a + 1]! - w[s.a]! * dy / length * dl; p[b + 1] = p[b + 1]! + w[s.b]! * dy / length * dl
      p[a + 2] = p[a + 2]! - w[s.a]! * dz / length * dl; p[b + 2] = p[b + 2]! + w[s.b]! * dz / length * dl
    }
  }

  private projectLinks(h2: number): void {
    const p = this.positions, w = this.domain.inverseMass
    for (let k = 0; k < this.domain.links.length; k++) {
      const link = this.domain.links[k]!, released = this.release && link.releasable && (link.releaseDistanceMm ?? 0) <= this.underminingMm
      const retained = link.preparedRelease ? 0 : link.retainedFraction && this.underminingMm > 0 ? link.retainedFraction[this.underminingMm === 3 ? 0 : 1] : released ? 0 : 1
      let denominator = w[link.p]!
      for (let j = 0; j < 3; j++) denominator += w[link.vertices[j]!]! * link.weights[j]! ** 2
      if (denominator < 1e-12) continue
      if (retained > 1e-12) {
        const alpha = link.compliance / (h2 * retained)
        for (let a = 0; a < 3; a++) {
          let delta = p[link.p * 3 + a]! - link.offset[a]!
          for (let j = 0; j < 3; j++) delta -= p[link.vertices[j]! * 3 + a]! * link.weights[j]!
          const idx = k * 3 + a, dl = (-delta - alpha * this.linkLambda[idx]!) / (denominator + alpha)
          this.linkLambda[idx] = this.linkLambda[idx]! + dl
          p[link.p * 3 + a] = p[link.p * 3 + a]! + w[link.p]! * dl
          for (let j = 0; j < 3; j++) {
            const v = link.vertices[j]!, vi = v * 3 + a
            p[vi] = p[vi]! - w[v]! * link.weights[j]! * dl
          }
        }
      }
      // Unilateral interface contact. Removing a connection never removes
      // contact, and contact never attracts a separated bank to its bed.
      // A prepared flap slides to new bed triangles. Its released material
      // links no longer define the spatial contact pair.
      if (link.preparedRelease && this.slidingContact) continue
      let gap = 0
      for (let a = 0; a < 3; a++) {
        let d = p[link.p * 3 + a]! - link.offset[a]!
        for (let j = 0; j < 3; j++) d -= p[link.vertices[j]! * 3 + a]! * link.weights[j]!
        gap += d * link.normal[a]!
      }
      if (gap < -1e-9) for (let a = 0; a < 3; a++) {
        const correction = -gap / denominator * link.normal[a]!
        p[link.p * 3 + a] = p[link.p * 3 + a]! + w[link.p]! * correction
        for (let j = 0; j < 3; j++) { const v = link.vertices[j]!, vi = v * 3 + a; p[vi] = p[vi]! - w[v]! * link.weights[j]! * correction }
      }
    }
  }

  private projectAnchors(h2: number): void {
    const p = this.positions, w = this.domain.inverseMass
    for (let k = 0; k < this.domain.anchors.length; k++) {
      const anchor = this.domain.anchors[k]!, weight = w[anchor.p]!, alpha = anchor.compliance / h2
      if (!weight) continue
      for (let a = 0; a < 3; a++) {
        const idx = k * 3 + a, vi = anchor.p * 3 + a, dl = (anchor.target[a]! - p[vi]! - alpha * this.anchorLambda[idx]!) / (weight + alpha)
        this.anchorLambda[idx] = this.anchorLambda[idx]! + dl; p[vi] = p[vi]! + weight * dl
      }
    }
  }

  private hasCompressedElements(): boolean {
    if (this.projector?.hasCompressedElements) return this.projector.hasCompressedElements()
    const p = this.positions
    let compressed = false
    for (const t of this.tets) {
      const v = t.vertices
      if (!(tetrahedronVolume(p, v[0], v[1], v[2], v[3]) / t.rest > .25)) { compressed = true; break }
    }
    return compressed
  }

  private projectContacts(): void {
    const p = this.positions, w = this.domain.inverseMass
    for (const contact of this.domain.bed) {
      let gap = 0
      for (let a = 0; a < 3; a++) gap += (p[contact.p * 3 + a]! - contact.point[a]!) * contact.normal[a]!
      if (gap < 0 && w[contact.p]) for (let a = 0; a < 3; a++) p[contact.p * 3 + a] = p[contact.p * 3 + a]! - gap * contact.normal[a]!
    }
    for (const contact of this.domain.banks) {
      const a=contact.a*3,b=contact.b*3,sum=w[contact.a]!+w[contact.b]!
      if(!sum)continue
      const delta=[p[b]!-p[a]!,p[b+1]!-p[a+1]!,p[b+2]!-p[a+2]!]
      const gap=delta.reduce((s,d,i)=>s+d*contact.normal[i]!,0)
      const tangentSq=delta.reduce((s,d)=>s+d*d,0)-gap*gap
      if(gap>=.12||tangentSq>9)continue
      for(let axis=0;axis<3;axis++) {
        const correction=(.12-gap)/sum*contact.normal[axis]!
        p[a+axis]=p[a+axis]!-w[contact.a]!*correction;p[b+axis]=p[b+axis]!+w[contact.b]!*correction
      }
    }
    const globe = this.domain.globe
    for (const v of globe.vertices) if (w[v]) {
      const dx = p[v * 3]! - globe.center[0], dy = p[v * 3 + 1]! - globe.center[1], dz = p[v * 3 + 2]! - globe.center[2], r = Math.sqrt(dx * dx + dy * dy + dz * dz)
      if (r < globe.radius && r > 1e-8) {
        const scale = globe.radius / r
        p[v * 3] = globe.center[0] + dx * scale; p[v * 3 + 1] = globe.center[1] + dy * scale; p[v * 3 + 2] = globe.center[2] + dz * scale
      }
    }
  }

  private projectRigidContacts(): void {
    const p = this.positions, w = this.domain.inverseMass
    // Bone contact is unilateral; a separated tissue point receives no
    // force. It is deliberately independent of wound approximation.
    for (const v of this.domain.rigid.vertices) if (w[v]) {
      // A projection can change the closest triangle near a support edge.
      // Re-query only penetrating points instead of leaving that residual.
      for (let contactPass=0;contactPass<3;contactPass++) {
        const q = this.rigid.closest([p[v*3]!,p[v*3+1]!,p[v*3+2]!])
        if (!q || q.distance > 1.5) break
        const gap = q.normal.reduce((sum,n,a) => sum + n*(p[v*3+a]!-q.point[a]!),0)
        if (gap >= -1e-8) break
        for(let a=0;a<3;a++)p[v*3+a]=p[v*3+a]!-gap*q.normal[a]!
      }
    }
  }

  private projectSutures(h2: number): void {
    const p = this.positions
    let slot = 0
    for (let biteIndex = 0; biteIndex < this.sutureBindings.length; biteIndex++) {
      const { bite, segments } = this.sutureBindings[biteIndex]!
      const progress = biteProgress(this.closure,bite)
      if (progress > 0 && !this.closure.biteStarted[biteIndex]) {
        // Capture after this substep's tissue/grab updates, immediately before
        // this real thread applies force. Never recapture an engaged stitch
        // during pause, pulling, replay or the transition to surface closure.
        for (let i = 0; i < segments.length; i++) this.closure.startLengths[slot + i] = pointDistance(p, segments[i]!.a, segments[i]!.b)
        this.closure.biteStarted[biteIndex] = true
      }
      for(let i=0;i<bite.segmentTargets.length;i++,slot++) {
        if(!progress)continue
        const { a, b, vertices, weightedMass, denominator } = segments[i]!
        let ax=0,ay=0,az=0,bx=0,by=0,bz=0
        for(let j=0;j<a.vertices.length;j++) {
          const v=a.vertices[j]!*3,weight=a.weights[j]!
          ax+=p[v]!*weight;ay+=p[v+1]!*weight;az+=p[v+2]!*weight
        }
        for(let j=0;j<b.vertices.length;j++) {
          const v=b.vertices[j]!*3,weight=b.weights[j]!
          bx+=p[v]!*weight;by+=p[v+1]!*weight;bz+=p[v+2]!*weight
        }
        const dx=bx-ax,dy=by-ay,dz=bz-az,length=Math.hypot(dx,dy,dz)
        if(length<1e-9)continue
        const start=this.closure.startLengths[slot]!,tightness=this.closure.edits?.[bite.id]?.applied??progress,t=tightness*tightness*(3-2*tightness),target=start+(bite.segmentTargets[i]!-start)*t
        // Fixed grip at entry, dermal penetration and exit. Each segment is part
        // of the same physical thread; tissue-side slack cannot migrate across
        // a grip and disguise a gap in its crossing segment.
        if(denominator<1e-12)continue
        const alpha=2e-9/h2,old=this.sutureLambda[slot]!,next=Math.min(0,old+(-(length-target)-alpha*old)/(denominator+alpha)),dl=next-old
        this.sutureLambda[slot]=next
        for(let j=0;j<vertices.length;j++) {
          const v=vertices[j]!*3,weight=weightedMass[j]!
          p[v]=p[v]!+weight*dx/length*dl
          p[v+1]=p[v+1]!+weight*dy/length*dl
          p[v+2]=p[v+2]!+weight*dz/length*dl
        }
      }
    }
  }

  metrics(): DomainMetrics {
    const p = this.positions, rest = this.domain.rest
    let maxDisplacementMm = 0, lowerLidDisplacementMm = 0, lowerLidInferiorMm = 0, minimumVolumeRatio = Infinity, invertedElements = 0, maximumStrain = 0, globePenetrationMm = 0
    const displacement = (v: number) => Math.hypot(p[v * 3]! - rest[v * 3]!, p[v * 3 + 1]! - rest[v * 3 + 1]!, p[v * 3 + 2]! - rest[v * 3 + 2]!)
    for (let v = 0; v < this.domain.surface.count; v++) maxDisplacementMm = Math.max(maxDisplacementMm, displacement(v))
    for (const v of this.domain.lid) { lowerLidDisplacementMm = Math.max(lowerLidDisplacementMm, displacement(v)); lowerLidInferiorMm = Math.max(lowerLidInferiorMm, rest[v * 3 + 1]! - p[v * 3 + 1]!) }
    for (const t of this.tets) { const ratio = tetrahedronVolume(p, ...t.vertices) / t.rest; minimumVolumeRatio = Math.min(minimumVolumeRatio, ratio); if (ratio <= 0) invertedElements++ }
    for (const s of this.domain.springs) if (s.rest > .1) maximumStrain = Math.max(maximumStrain, Math.abs(Math.hypot(p[s.a * 3]! - p[s.b * 3]!, p[s.a * 3 + 1]! - p[s.b * 3 + 1]!, p[s.a * 3 + 2]! - p[s.b * 3 + 2]!) / s.rest - 1))
    for (const s of this.strainEdges) if (s.rest > .1) maximumStrain = Math.max(maximumStrain, Math.abs(Math.hypot(p[s.a*3]!-p[s.b*3]!,p[s.a*3+1]!-p[s.b*3+1]!,p[s.a*3+2]!-p[s.b*3+2]!) / s.rest - 1))
    const globe = this.domain.globe
    for (const v of globe.vertices) globePenetrationMm = Math.max(globePenetrationMm, globe.radius - Math.hypot(p[v * 3]! - globe.center[0], p[v * 3 + 1]! - globe.center[1], p[v * 3 + 2]! - globe.center[2]))
    let meanGapMm = 0, maximumGapMm = 0
    for (const gap of this.domain.closure.gaps) { const d = pointDistance(p, gap.a, gap.b); meanGapMm += d; maximumGapMm = Math.max(maximumGapMm, d) }
    meanGapMm /= Math.max(1, this.domain.closure.gaps.length)
    let supportPenetrationMm = 0
    for (const v of this.domain.rigid.vertices) { const q = this.rigid.closest([p[v*3]!,p[v*3+1]!,p[v*3+2]!]); if(q&&q.distance<1.5) supportPenetrationMm=Math.max(supportPenetrationMm,-q.normal.reduce((sum,n,a)=>sum+n*(p[v*3+a]!-q.point[a]!),0)) }
    return { ...(this.slidingContact?{interfacePenetrationMm:this.slidingContact.maximumPenetration(p)}:{}), ...(this.manualMode||this.domain.repair?{contactStepScale:this.contactStepScale,selfIntersections:this.selfContact?.intersections(p)??0,projectedOpeningMm2:projectedOpeningMm2(this.domain,p),manualGaps:[...presetSnapshot(this.closure,this.domain.closure),...this.manual.snapshot()].map(s=>({id:s.bite.id,separationMm:pointDistance(p,s.bite.edgeA,s.bite.edgeB),eversionMm:[edgeHeight(p,s.bite.edgeA,s.bite.surfaceA)-edgeHeight(rest,s.bite.edgeA,s.bite.surfaceA),edgeHeight(p,s.bite.edgeB,s.bite.surfaceB)-edgeHeight(rest,s.bite.edgeB,s.bite.surfaceB)] as [number,number]}))}:{}), step: this.stepIndex, maxDisplacementMm, lowerLidDisplacementMm, lowerLidInferiorMm, minimumVolumeRatio, invertedElements, maximumStrain, globePenetrationMm, meanGapMm, maximumGapMm, deepCount: this.domain.closure.deeps.filter(b => biteProgress(this.closure, b) > 0).length, runningBites: this.domain.closure.running.filter(b => biteProgress(this.closure, b) > 0).length, closureBusy: this.closure.elapsed < closureDuration(this.domain.closure, this.closure.stage), assistanceActive: this.closure.assistance, gripActive: this.grab !== null, supportPenetrationMm, ...measureEversion(p, this.domain.closure.eversion) }
  }
}
`})),on,sn=t((()=>{on=`import type { DomainTet } from './domain'

export interface StrainTet { vertices: DomainTet['vertices']; inverse: number[]; volume: number; compliance: number; lambda: number }
/** Rest-space deformation gradients. Unlike independent edge springs, these
 * retain the dermis's shear response when incision triangles are subdivided. */
export function strainTet(p: ArrayLike<number>, t: DomainTet, compliance = 1e-5): StrainTet {
  const [a,b,c,d]=t.vertices
  const x=p[b*3]!-p[a*3]!,y=p[c*3]!-p[a*3]!,z=p[d*3]!-p[a*3]!
  const u=p[b*3+1]!-p[a*3+1]!,v=p[c*3+1]!-p[a*3+1]!,w=p[d*3+1]!-p[a*3+1]!
  const l=p[b*3+2]!-p[a*3+2]!,m=p[c*3+2]!-p[a*3+2]!,n=p[d*3+2]!-p[a*3+2]!
  const det=x*(v*n-w*m)-y*(u*n-w*l)+z*(u*m-v*l)
  if(Math.abs(det)<1e-10)throw new Error('Degenerate strain element.')
  return { vertices:t.vertices, volume:t.rest, compliance, inverse:[v*n-w*m,z*m-y*n,y*w-z*v,w*l-u*n,x*n-z*l,z*u-x*w,u*m-v*l,y*l-x*m,x*v-y*u].map(x=>x/det),lambda:0 }
}

/** One frame-invariant deviatoric Green-strain energy constraint. The internal dermal
 * layer resolves bending; no additional surface springs or ridge forces are
 * needed. Large-strain tissue calibration remains outside this numerical law. */
export function projectStrain(p: Float64Array, weights: Float64Array, tet: StrainTet, h2: number): void {
  const m=tet.inverse,[a,b,c,d]=tet.vertices
  const x1=p[b*3]!-p[a*3]!,y1=p[b*3+1]!-p[a*3+1]!,z1=p[b*3+2]!-p[a*3+2]!
  const x2=p[c*3]!-p[a*3]!,y2=p[c*3+1]!-p[a*3+1]!,z2=p[c*3+2]!-p[a*3+2]!
  const x3=p[d*3]!-p[a*3]!,y3=p[d*3+1]!-p[a*3+1]!,z3=p[d*3+2]!-p[a*3+2]!
  const f00=x1*m[0]!+x2*m[3]!+x3*m[6]!,f01=x1*m[1]!+x2*m[4]!+x3*m[7]!,f02=x1*m[2]!+x2*m[5]!+x3*m[8]!
  const f10=y1*m[0]!+y2*m[3]!+y3*m[6]!,f11=y1*m[1]!+y2*m[4]!+y3*m[7]!,f12=y1*m[2]!+y2*m[5]!+y3*m[8]!
  const f20=z1*m[0]!+z2*m[3]!+z3*m[6]!,f21=z1*m[1]!+z2*m[4]!+z3*m[7]!,f22=z1*m[2]!+z2*m[5]!+z3*m[8]!
  let e00=f00*f00+f10*f10+f20*f20-1,e11=f01*f01+f11*f11+f21*f21-1,e22=f02*f02+f12*f12+f22*f22-1
  const e01=f00*f01+f10*f11+f20*f21,e02=f00*f02+f10*f12+f20*f22,e12=f01*f02+f11*f12+f21*f22
  const mean=(e00+e11+e22)/3
  e00-=mean;e11-=mean;e22-=mean
  const norm=Math.sqrt(e00*e00+e11*e11+e22*e22+2*(e01*e01+e02*e02+e12*e12))
  if(norm<1e-9)return
  const g00=(f00*e00+f01*e01+f02*e02)/norm,g01=(f00*e01+f01*e11+f02*e12)/norm,g02=(f00*e02+f01*e12+f02*e22)/norm
  const g10=(f10*e00+f11*e01+f12*e02)/norm,g11=(f10*e01+f11*e11+f12*e12)/norm,g12=(f10*e02+f11*e12+f12*e22)/norm
  const g20=(f20*e00+f21*e01+f22*e02)/norm,g21=(f20*e01+f21*e11+f22*e12)/norm,g22=(f20*e02+f21*e12+f22*e22)/norm
  const q1x=g00*m[0]!+g01*m[1]!+g02*m[2]!,q1y=g10*m[0]!+g11*m[1]!+g12*m[2]!,q1z=g20*m[0]!+g21*m[1]!+g22*m[2]!
  const q2x=g00*m[3]!+g01*m[4]!+g02*m[5]!,q2y=g10*m[3]!+g11*m[4]!+g12*m[5]!,q2z=g20*m[3]!+g21*m[4]!+g22*m[5]!
  const q3x=g00*m[6]!+g01*m[7]!+g02*m[8]!,q3y=g10*m[6]!+g11*m[7]!+g12*m[8]!,q3z=g20*m[6]!+g21*m[7]!+g22*m[8]!
  const q0x=-q1x-q2x-q3x,q0y=-q1y-q2y-q3y,q0z=-q1z-q2z-q3z
  const wa=weights[a]!,wb=weights[b]!,wc=weights[c]!,wd=weights[d]!,alpha=tet.compliance/(tet.volume*h2)
  const denominator=alpha+wa*(q0x*q0x+q0y*q0y+q0z*q0z)+wb*(q1x*q1x+q1y*q1y+q1z*q1z)+wc*(q2x*q2x+q2y*q2y+q2z*q2z)+wd*(q3x*q3x+q3y*q3y+q3z*q3z)
  const dl=(-.5*norm-alpha*tet.lambda)/denominator;tet.lambda+=dl
  p[a*3]=p[a*3]!+wa*q0x*dl;p[a*3+1]=p[a*3+1]!+wa*q0y*dl;p[a*3+2]=p[a*3+2]!+wa*q0z*dl
  p[b*3]=p[b*3]!+wb*q1x*dl;p[b*3+1]=p[b*3+1]!+wb*q1y*dl;p[b*3+2]=p[b*3+2]!+wb*q1z*dl
  p[c*3]=p[c*3]!+wc*q2x*dl;p[c*3+1]=p[c*3+1]!+wc*q2y*dl;p[c*3+2]=p[c*3+2]!+wc*q2z*dl
  p[d*3]=p[d*3]!+wd*q3x*dl;p[d*3+1]=p[d*3+1]!+wd*q3y*dl;p[d*3+2]=p[d*3+2]!+wd*q3z*dl
}
`})),cn,ln=t((()=>{cn=`import type { AnchorConstraint, DistanceConstraint, StepOptions } from './types'

export interface TissueVolumeOptions {
  thicknessMm: number
  volumeCompliance?: number
  bendingCompliance?: number
  settlingAcceleration?: number
}

interface Spring extends DistanceConstraint { lambda: number }
export interface VolumeTet { vertices: [number, number, number, number]; rest: number; lambda: number }
type Tet = VolumeTet
interface BankContact { a: number; b: number; nx: number; ny: number; nz: number }

/** Fast norm for model-scale coordinates; retain hypot's range for extreme inputs. */
function constraintLength(x: number, y: number, z: number): number {
  const squared = x * x + y * y + z * z
  return squared > 1e-200 && squared < 1e200 ? Math.sqrt(squared) : Math.hypot(x, y, z)
}

/** Signed tetrahedron volume, in model mm³. */
export function tetrahedronVolume(p: ArrayLike<number>, a: number, b: number, c: number, d: number): number {
  const bx = p[b * 3]! - p[a * 3]!, by = p[b * 3 + 1]! - p[a * 3 + 1]!, bz = p[b * 3 + 2]! - p[a * 3 + 2]!
  const cx = p[c * 3]! - p[a * 3]!, cy = p[c * 3 + 1]! - p[a * 3 + 1]!, cz = p[c * 3 + 2]! - p[a * 3 + 2]!
  const dx = p[d * 3]! - p[a * 3]!, dy = p[d * 3 + 1]! - p[a * 3 + 1]!, dz = p[d * 3 + 2]! - p[a * 3 + 2]!
  return (bx * (cy * dz - cz * dy) + by * (cz * dx - cx * dz) + bz * (cx * dy - cy * dx)) / 6
}

/**
 * A deterministic XPBD volume made from a cut surface mesh. Every triangle
 * becomes a prism split consistently into three tetrahedra. Both surfaces move
 * in xyz; xy is not prescribed by the old planar simulation. Parameters are
 * illustrative, not calibrated skin properties. Contact covers the support
 * bed and explicitly paired wound banks, not arbitrary whole-body self-contact.
 */
export class TissueVolume {
  readonly positions: Float64Array
  readonly restPositions: Float64Array
  readonly velocity: Float64Array
  readonly sideTriangles: Uint32Array
  readonly thicknessMm: number
  readonly count: number
  readonly tetrahedra: readonly Tet[]
  private readonly previous: Float64Array
  private readonly inverseMass: Float64Array
  private readonly springs: Spring[] = []
  private readonly contacts: BankContact[] = []
  private readonly volumeCompliance: number
  private readonly settlingAcceleration: number

  constructor(xy: ArrayLike<number>, triangles: Uint32Array, inverseMass: ArrayLike<number>, fibers: readonly DistanceConstraint[], options: TissueVolumeOptions) {
    if (!(options.thicknessMm > 0) || !Number.isFinite(options.thicknessMm)) throw new Error('Tissue thickness must be positive.')
    this.thicknessMm = options.thicknessMm
    this.volumeCompliance = options.volumeCompliance ?? 2e-7
    this.settlingAcceleration = options.settlingAcceleration ?? -60
    this.count = xy.length / 2
    const n = this.count
    this.positions = new Float64Array(n * 6)
    this.inverseMass = new Float64Array(n * 2)
    for (let v = 0; v < n; v++) for (let layer = 0; layer < 2; layer++) {
      const i = (v + n * layer) * 3
      this.positions[i] = xy[v * 2]!
      this.positions[i + 1] = xy[v * 2 + 1]!
      this.positions[i + 2] = layer === 0 ? 0 : -this.thicknessMm
      this.inverseMass[v + n * layer] = inverseMass[v]! * 2
    }
    this.restPositions = this.positions.slice()
    this.previous = this.positions.slice()
    this.velocity = new Float64Array(this.positions.length)
    const tets: Tet[] = []
    const incident = new Map<string, Array<[number, number, number]>>()
    const edgeKey = (a: number, b: number): string => a < b ? \`\${a}/\${b}\` : \`\${b}/\${a}\`
    for (let k = 0; k < triangles.length; k += 3) {
      const ids = [triangles[k]!, triangles[k + 1]!, triangles[k + 2]!]
      for (let e = 0; e < 3; e++) {
        const a = ids[e]!, b = ids[(e + 1) % 3]!, c = ids[(e + 2) % 3]!, key = edgeKey(a, b)
        const entry = incident.get(key) ?? []
        entry.push([a, b, c]); incident.set(key, entry)
      }
      const [a, b, c] = ids.sort((u, v) => u - v) as [number, number, number]
      for (const vertices of [[a, b, c, c + n], [a, b, b + n, c + n], [a, a + n, b + n, c + n]] as Tet['vertices'][]) {
        let rest = tetrahedronVolume(this.positions, ...vertices)
        if (Math.abs(rest) < 1e-8) continue
        if (rest < 0) { [vertices[1], vertices[2]] = [vertices[2], vertices[1]]; rest = -rest }
        tets.push({ vertices, rest, lambda: 0 })
      }
    }
    this.tetrahedra = tets
    const sides: number[] = []
    const addSpring = (a: number, b: number, compliance: number, rest?: number): void => {
      const p = this.positions
      this.springs.push({ a, b, compliance, rest: rest ?? Math.hypot(p[a * 3]! - p[b * 3]!, p[a * 3 + 1]! - p[b * 3 + 1]!, p[a * 3 + 2]! - p[b * 3 + 2]!), lambda: 0 })
    }
    for (const fiber of fibers) for (let layer = 0; layer < 2; layer++) {
      addSpring(fiber.a + n * layer, fiber.b + n * layer, fiber.compliance * 2, fiber.rest)
    }
    for (let v = 0; v < n; v++) if (inverseMass[v]! > 0) addSpring(v, v + n, 1e-4)
    for (const around of incident.values()) {
      const [a, b, opposite] = around[0]!
      // Shear coupling between the upper and lower surfaces gives the sheet
      // thickness-dependent resistance to bending, in addition to soft hinges.
      addSpring(a, b + n, 2e-4)
      addSpring(b, a + n, 2e-4)
      if (around.length === 1) sides.push(a, a + n, b, b, a + n, b + n)
      else {
        const other = around[1]![2]
        addSpring(opposite, other, options.bendingCompliance ?? 3e-3)
        addSpring(opposite + n, other + n, options.bendingCompliance ?? 3e-3)
      }
    }
    this.sideTriangles = Uint32Array.from(sides)
  }

  /** Keep opposing paired banks on their respective sides during this inset. */
  setBankContacts(pairs: readonly (readonly [number, number])[]): void {
    this.contacts.length = 0
    const p = this.positions, seen = new Set<string>()
    for (const [a, b] of pairs) {
      const key = a < b ? \`\${a}/\${b}\` : \`\${b}/\${a}\`
      if (a === b || seen.has(key)) continue
      seen.add(key)
      const dx = p[b * 3]! - p[a * 3]!, dy = p[b * 3 + 1]! - p[a * 3 + 1]!, dz = p[b * 3 + 2]! - p[a * 3 + 2]!
      const length = Math.hypot(dx, dy, dz)
      if (length < 0.2) continue
      this.contacts.push({ a, b, nx: dx / length, ny: dy / length, nz: dz / length })
    }
  }

  restore(pose: ArrayLike<number>): void {
    if (pose.length !== this.positions.length) throw new Error('Volume pose does not match this mesh.')
    this.positions.set(pose); this.previous.set(pose); this.velocity.fill(0)
  }

  private distance(con: Spring, h2: number): void {
    const p = this.positions, a = con.a * 3, b = con.b * 3
    const wa = this.inverseMass[con.a]!, wb = this.inverseMass[con.b]!
    if (wa + wb === 0) return
    const dx = p[b]! - p[a]!, dy = p[b + 1]! - p[a + 1]!, dz = p[b + 2]! - p[a + 2]!, length = constraintLength(dx, dy, dz)
    if (length < 1e-10 || (con.unilateral && length <= con.rest)) return
    const alpha = con.compliance / h2
    const dl = (-(length - con.rest) - alpha * con.lambda) / (wa + wb + alpha)
    con.lambda += dl
    const sx = dx / length * dl, sy = dy / length * dl, sz = dz / length * dl
    p[a] = p[a]! - wa * sx; p[b] = p[b]! + wb * sx
    p[a + 1] = p[a + 1]! - wa * sy; p[b + 1] = p[b + 1]! + wb * sy
    p[a + 2] = p[a + 2]! - wa * sz; p[b + 2] = p[b + 2]! + wb * sz
  }

  private volume(tet: Tet, h2: number, barrier: boolean): void {
    projectTetVolume(this.positions, this.inverseMass, tet, h2, barrier, this.volumeCompliance)
  }

  step(anchors: readonly AnchorConstraint[], grabs: readonly AnchorConstraint[], approximation: readonly DistanceConstraint[], sutures: readonly (DistanceConstraint & { kind?: string })[], opts: StepOptions): void {
    const n = this.count, p = this.positions, h = opts.dt / opts.substeps, h2 = h * h
    const dynamic: Spring[] = []
    for (const con of approximation) for (let layer = 0; layer < 2; layer++) dynamic.push({ ...con, a: con.a + n * layer, b: con.b + n * layer, compliance: con.compliance * 2, lambda: 0 })
    for (const con of sutures) {
      const offset = con.kind === 'deep' ? n : 0
      dynamic.push({ ...con, a: con.a + offset, b: con.b + offset, lambda: 0 })
    }
    const targets = [
      ...anchors.filter((a) => a.enabled).map((a) => ({ ...a, p: a.p + n, z: -this.thicknessMm, lambda: 0 })),
      ...anchors.filter((a) => a.enabled && a.throughThickness).map((a) => ({ ...a, z: 0, lambda: 0 })),
      ...grabs.filter((a) => a.enabled).map((a) => ({ ...a, z: a.z ?? 0, lambda: 0 })),
    ]
    for (let substep = 0; substep < opts.substeps; substep++) {
      this.previous.set(p)
      for (let v = 0; v < n * 2; v++) {
        if (this.inverseMass[v] === 0) continue
        this.velocity[v * 3 + 2] = this.velocity[v * 3 + 2]! + this.settlingAcceleration * h
        for (let axis = 0; axis < 3; axis++) p[v * 3 + axis] = p[v * 3 + axis]! + this.velocity[v * 3 + axis]! * h
      }
      for (const con of this.springs) con.lambda = 0
      for (const con of dynamic) con.lambda = 0
      for (const con of targets) con.lambda = 0
      for (const tet of this.tetrahedra) tet.lambda = 0
      for (let iteration = 0; iteration < opts.iterations; iteration++) {
        for (const con of this.springs) this.distance(con, h2)
        for (const con of dynamic) this.distance(con, h2)
        for (const target of targets) {
          const v = target.p, w = this.inverseMass[v]!, i = v * 3
          if (w === 0) continue
          const dx = p[i]! - target.x, dy = p[i + 1]! - target.y, dz = p[i + 2]! - target.z, length = constraintLength(dx, dy, dz)
          if (length < 1e-10) continue
          const alpha = target.compliance / h2, dl = (-length - alpha * target.lambda) / (w + alpha)
          target.lambda += dl
          p[i] = p[i]! + w * dx / length * dl; p[i + 1] = p[i + 1]! + w * dy / length * dl; p[i + 2] = p[i + 2]! + w * dz / length * dl
        }
        for (const tet of this.tetrahedra) this.volume(tet, h2, false)
        for (const contact of this.contacts) for (let layer = 0; layer < 2; layer++) {
          const a = contact.a + layer * n, b = contact.b + layer * n, wa = this.inverseMass[a]!, wb = this.inverseMass[b]!
          const separation = (p[b * 3]! - p[a * 3]!) * contact.nx + (p[b * 3 + 1]! - p[a * 3 + 1]!) * contact.ny + (p[b * 3 + 2]! - p[a * 3 + 2]!) * contact.nz
          if (separation >= 0.12 || wa + wb === 0) continue
          const correction = (0.12 - separation) / (wa + wb)
          for (let axis = 0; axis < 3; axis++) {
            const normal = axis === 0 ? contact.nx : axis === 1 ? contact.ny : contact.nz
            p[a * 3 + axis] = p[a * 3 + axis]! - wa * normal * correction
            p[b * 3 + axis] = p[b * 3 + axis]! + wb * normal * correction
          }
        }
        for (let pass = 0; pass < 2; pass++) {
          for (const tet of this.tetrahedra) this.volume(tet, h2, true)
          for (let v = 0; v < n * 2; v++) if (this.inverseMass[v]! > 0) p[v * 3 + 2] = Math.max(-this.thicknessMm, p[v * 3 + 2]!)
        }
      }
      for (let v = 0; v < n * 2; v++) {
        for (let axis = 0; axis < 3; axis++) {
          const i = v * 3 + axis
          if (!Number.isFinite(p[i]!)) throw new Error('The volumetric tissue solver produced a non-finite position.')
          this.velocity[i] = Math.max(-opts.maxSpeed, Math.min(opts.maxSpeed, (p[i]! - this.previous[i]!) / h)) * opts.damping
        }
      }
    }
  }
}

/** Shared XPBD bulk/inversion projection for the flat and curved domains. */
export function projectTetVolume(p: Float64Array, mass: Float64Array, tet: VolumeTet, h2: number, barrier: boolean, compliance: number, minimumRatio = .2): void {
  const ids = tet.vertices
  const a = ids[0] * 3, b = ids[1] * 3, c = ids[2] * 3, d = ids[3] * 3
  const bx = p[b]! - p[a]!, by = p[b + 1]! - p[a + 1]!, bz = p[b + 2]! - p[a + 2]!
  const cx = p[c]! - p[a]!, cy = p[c + 1]! - p[a + 1]!, cz = p[c + 2]! - p[a + 2]!
  const dx = p[d]! - p[a]!, dy = p[d + 1]! - p[a + 1]!, dz = p[d + 2]! - p[a + 2]!
  const volume = (bx * (cy * dz - cz * dy) + by * (cz * dx - cx * dz) + bz * (cx * dy - cy * dx)) / 6
  const target = tet.rest * (barrier ? minimumRatio : 1)
  if (barrier && volume >= target) return
  // Fixed-size scalar projection avoids repeated indexed loops in the hot
  // path. Accumulation order matches the original four-node formulation.
  const gbx = (cy * dz - cz * dy) / 6, gby = (cz * dx - cx * dz) / 6, gbz = (cx * dy - cy * dx) / 6
  const gcx = (dy * bz - dz * by) / 6, gcy = (dz * bx - dx * bz) / 6, gcz = (dx * by - dy * bx) / 6
  const gdx = (by * cz - bz * cy) / 6, gdy = (bz * cx - bx * cz) / 6, gdz = (bx * cy - by * cx) / 6
  const gax = -gbx - gcx - gdx, gay = -gby - gcy - gdy, gaz = -gbz - gcz - gdz
  const wa = mass[ids[0]]!, wb = mass[ids[1]]!, wc = mass[ids[2]]!, wd = mass[ids[3]]!
  let denominator = 0
  denominator += wa * gax ** 2; denominator += wa * gay ** 2; denominator += wa * gaz ** 2
  denominator += wb * gbx ** 2; denominator += wb * gby ** 2; denominator += wb * gbz ** 2
  denominator += wc * gcx ** 2; denominator += wc * gcy ** 2; denominator += wc * gcz ** 2
  denominator += wd * gdx ** 2; denominator += wd * gdy ** 2; denominator += wd * gdz ** 2
  if (denominator < 1e-14) return
  // Bulk energy scales with rest volume: a tiny cut-cell must not be
  // proportionally more compressible just because its absolute volume is small.
  const alpha = barrier ? 0 : compliance * tet.rest / h2
  const dl = (-(volume - target) - (barrier ? 0 : alpha * tet.lambda)) / (denominator + alpha)
  if (!barrier) tet.lambda += dl
  p[a] = p[a]! + wa * gax * dl; p[a + 1] = p[a + 1]! + wa * gay * dl; p[a + 2] = p[a + 2]! + wa * gaz * dl
  p[b] = p[b]! + wb * gbx * dl; p[b + 1] = p[b + 1]! + wb * gby * dl; p[b + 2] = p[b + 2]! + wb * gbz * dl
  p[c] = p[c]! + wc * gcx * dl; p[c + 1] = p[c + 1]! + wc * gcy * dl; p[c + 2] = p[c + 2]! + wc * gcz * dl
  p[d] = p[d]! + wd * gdx * dl; p[d + 1] = p[d + 1]! + wd * gdy * dl; p[d + 2] = p[d + 2]! + wd * gdz * dl
}
`})),un,dn=t((()=>{un=`/**
 * Core engine types. This module (and everything under src/engine/) must stay
 * free of DOM, React, and Three.js imports so the simulation stays a pure,
 * portable, testable library.
 */

/** Circular defect (e.g. a fresh post-Mohs wound). \`kind\` may be omitted. */
export interface CircleDefect {
  kind?: 'circle'
  /** Center in patch coordinates (mm, origin at patch center). */
  x: number
  y: number
  radiusMm: number
}

/**
 * Fusiform (lens-shaped) excision: the intersection of two circular arcs,
 * length along \`angleRad\`, the classic elliptical-excision silhouette.
 */
export interface FusiformDefect {
  kind: 'fusiform'
  x: number
  y: number
  lengthMm: number
  widthMm: number
  /** Long-axis direction, radians from +x. */
  angleRad: number
}

export type DefectSpec = CircleDefect | FusiformDefect

export interface SkinParams {
  /** Physical size of the simulated skin patch. */
  widthMm: number
  heightMm: number
  /** Grid resolution (cells, not vertices). */
  cols: number
  rows: number
  /** Direction of the relaxed skin tension lines, radians from +x axis. */
  rstlAngleRad: number
  /**
   * XPBD compliance (inverse stiffness) for skin fibers aligned with the
   * RSTLs vs. perpendicular to them. Skin is stiffer (lower compliance) and
   * carries more resting tension along the RSTLs, and is more extensible
   * across them — which is why elliptical excisions are oriented along the
   * lines.
   */
  complianceAlong: number
  complianceAcross: number
  /** Fractional resting pre-strain carried along / across the RSTLs. */
  preStrainAlong: number
  preStrainAcross: number
  /**
   * Compliance of each vertex's attachment to the underlying tissue
   * (subcutis/fascia). Undermining disables these attachments locally.
   */
  anchorCompliance: number
  /** Compliance of a placed suture. */
  sutureCompliance: number
  /** Defect to excise, or null for intact skin. */
  defect: DefectSpec | null
  /** How far past the wound edge the tissue is undermined (0 = none). */
  underminedBeyondMm: number
  /**
   * Incision paths (flap design lines): the mesh splits along each polyline
   * but stays hinged at interior endpoints. Flat [x0,y0,x1,y1,...] per path.
   */
  incisions?: Array<{ points: number[] }>
  /**
   * Additional undermining region as a polygon (flap elevation): deep anchors
   * inside it are released. Flat [x0,y0,...]. Combines with underminedBeyondMm.
   */
  underminePolygon?: number[]
  /**
   * Free-margin edge: that border is not pinned; its non-corner vertices get
   * soft support anchors instead (e.g. the lower-lid margin on a cheek panel,
   * held by tarsus/canthi but distortable — the ectropion mechanism).
   */
  freeMargin?: 'top' | 'bottom' | null
  /** Support-anchor compliance for free-margin vertices (default anchorCompliance / 8). */
  marginAnchorCompliance?: number
  /**
   * Outline of the sheet as a closed polygon, flat [x0,y0,...] in panel mm
   * (a window cut from a face): triangles outside it are removed and the
   * resulting edge is pinned like the border (the skin continues beyond).
   */
  outline?: number[]
  /** Openings in the sheet (eyes, mouth) whose rims are free margins. */
  holes?: SheetHole[]
  /**
   * Further excised polygons — Burow's triangles, dog-ear takes — flat
   * [x0,y0,...] each. The mesh is made to conform to each before it is cut
   * out, so the hole is exact; its rim is a wound edge (stitchable).
   */
  excisions?: number[][]
  /**
   * Spatially varying properties (region-dependent skin lines and laxity).
   * When present it overrides rstlAngleRad per edge and scales the deep
   * anchors per vertex. Must be a pure function of position.
   */
  fieldAt?: (x: number, y: number) => SkinField
}

/** Skin properties at a point of the panel. */
export interface SkinField {
  /** Relaxed skin tension line direction, radians from +x. */
  rstlAngleRad: number
  /** Deep-attachment laxity multiplier (1 = the panel's anchorCompliance). */
  laxity: number
}

/**
 * An opening in the sheet. Its rim is a free margin on support anchors
 * (a lid margin, the vermilion), except near the pinned points — canthal
 * tendons, the modiolus at the commissures — where the rim is fixed.
 */
export interface SheetHole {
  /** Closed polygon, flat [x0,y0,...] in panel mm. */
  points: number[]
  /** Points whose nearby rim vertices are pinned, flat [x,y,...]. */
  pinned?: number[]
  /** Pin radius in mm (default 2.5). */
  pinRadiusMm?: number
}

export interface ParticleSystem {
  count: number
  /** xy pairs, layout: [x0, y0, x1, y1, ...] */
  pos: Float64Array
  prev: Float64Array
  vel: Float64Array
  invMass: Float64Array
}

export interface DistanceConstraint {
  a: number
  b: number
  rest: number
  compliance: number
  /** Tension-only: applies no force when shorter than rest (a suture loop cannot push). */
  unilateral?: boolean
  /** Compression-only: applies no force when longer than rest (contact — tissue cannot interpenetrate). */
  pushOnly?: boolean
}

export interface AnchorConstraint {
  p: number
  x: number
  y: number
  /** Optional height for a volumetric traction handle; planar solvers ignore it. */
  z?: number
  /** Structural margin support acts on both surfaces of a tissue volume. */
  throughThickness?: boolean
  compliance: number
  enabled: boolean
}

/**
 * Triangle area-preservation constraint: models tissue incompressibility.
 * Compressed tissue must extrude somewhere — the mechanism behind wound-edge
 * eversion when deep bites squeeze the dermis.
 */
export interface AreaConstraint {
  a: number
  b: number
  c: number
  restArea: number
  compliance: number
  /** Enforce a lower signed-area bound only, allowing normal expansion. */
  minimum?: boolean
}

export interface StepOptions {
  dt: number
  substeps: number
  iterations: number
  /** Per-substep velocity retention factor in [0,1]; low values approach quasi-statics. */
  damping: number
  /** Speed clamp in mm/s to keep rebuild/cut transients from exploding. */
  maxSpeed: number
}

/**
 * Layered closure: DEEP (dermal) sutures bite set back from the wound edge and
 * bear the closure tension; TOP (epidermal) sutures join the edges themselves
 * and should only fine-approximate — a top under load is a technique error.
 */
export type SutureKind = 'deep' | 'top'

export interface SutureInfo {
  id: number
  kind: SutureKind
  a: number
  b: number
  /** How far the suture is stretched beyond its rest length, in mm. */
  elongationMm: number
  /** Peak tissue strain in the suture's neighborhood — what the stitch costs the skin. */
  tissueTension: number
  /** An approximating tie between visible stitches: mechanics only, never drawn or listed. */
  hidden: boolean
}
`}));function fn(e){if(e.grabReference!==null||e.grab!==null||e.manualMode||e.manualStitches.length)throw Error(`Only untouched reference closures can be cached.`);let{positions:t,velocity:n,grabReference:r,...i}=e;return{...i,grabReference:null}}function pn(e){if(e.length<4)throw Error(`Incomplete reference data.`);let t=new DataView(e.buffer,e.byteOffset,e.byteLength).getUint32(0,!0);if(t>e.length-4||t>4e6)throw Error(`Invalid reference header.`);let n=JSON.parse(hn.decode(e.subarray(4,4+t)));if(n.version!==1||!Number.isSafeInteger(n.width)||n.width<=0||n.width>1e5||!Array.isArray(n.frames)||!n.frames.length||n.frames.length>1e3)throw Error(`Unsupported reference data.`);let{width:r}=n,i=r*16;if(e.length!==4+t+n.frames.length*i)throw Error(`Incomplete reference checkpoints.`);let a=new Float64Array(n.frames.length*r*2),o=new Uint8Array(a.buffer);return n.frames.map((n,s)=>{let c=4+t+s*i,l=s*i;for(let t=0;t<8;t++)for(let n=0;n<r*2;n++){let a=l+n*8+t;o[a]=e[c+t*r*2+n]^(s?o[a-i]:0)}let u={...n,positions:a.subarray(s*r*2,s*r*2+r),velocity:a.subarray(s*r*2+r,(s+1)*r*2),grabReference:null};if(fn(u),!u.positions.every(Number.isFinite)||!u.velocity.every(Number.isFinite))throw Error(`Invalid reference coordinates.`);return u})}function mn(e){let t=e=>`${e.domainId}/${e.step}/${e.closure.stage}/${e.closure.elapsed}`,n=new Map;for(let r=0;r<e.length-1;r++){let i=e[r],a=e[r+1];a.step===i.step+1&&a.domainId===i.domainId&&a.closure.stage===i.closure.stage&&n.set(t(i),{before:i,after:a,meta:JSON.stringify(fn(i))})}return e=>{if(e.grab||e.manualMode||e.manual.count||e.closure.edits)return!1;let r=e.checkpoint(),i=n.get(t(r));return!i||JSON.stringify(fn(r))!==i.meta||!r.positions.every((e,t)=>Object.is(e,i.before.positions[t]))||!r.velocity.every((e,t)=>Object.is(e,i.before.velocity[t]))?!1:(e.restore(i.after),!0)}}var hn,gn=t((()=>{new TextEncoder,hn=new TextDecoder})),_n=n({loadReferenceRehearsal:()=>vn});async function vn(e,t){if(!e.repair)return;let n=new URL(`../rehearsals/`,self.location.href).href,r=await fetch(n+`advancement.json`,{cache:`no-cache`});if(!r.ok)return;let i=await r.json(),a=i.cases?.find(t=>t.domainId===e.id);if(i.version!==1||!a||!/^advancement-(10|15)\.bin\.gz$/.test(a.file)||a.uncompressedBytes>2e8)return;let o=new TextEncoder;if(await bn(o.encode(JSON.stringify(t)))!==i.sourceSha256)return;let s=await Promise.all(Object.entries(yn).map(async([e,t])=>[e.replace(/^\.\.\//,`src/`).replace(/^\.\//,`src/content/`),await bn(o.encode(t))])),c=await fetch(Re).then(e=>{if(!e.ok)throw Error(`Kernel unavailable.`);return e.arrayBuffer()});if(s.push([`src/content/numerics/cheek.wasm`,await bn(new Uint8Array(c))]),s.length!==Object.keys(i.fingerprints).length||s.some(([e,t])=>i.fingerprints[e]!==t))return;let l=await fetch(n+a.file+`?v=`+a.sha256);if(!l.ok)return;let u=new Uint8Array(await l.arrayBuffer()),d;if(u.length===a.uncompressedBytes)d=u;else{if(u.length!==a.bytes||await bn(u)!==a.sha256||typeof DecompressionStream>`u`)return;d=new Uint8Array(await new Response(new Blob([u]).stream().pipeThrough(new DecompressionStream(`gzip`))).arrayBuffer())}if(d.length!==a.uncompressedBytes||await bn(d)!==a.uncompressedSha256)return;let f=pn(d);if(f.length!==a.frames||f.some(t=>t.positions.length!==e.rest.length||!t.domainId.startsWith(e.id+`/`)))return;let p=mn(f);return e=>p(e)}var yn,bn,xn=t((()=>{He(),We(),Ke(),Je(),Xe(),Qe(),et(),nt(),it(),ot(),ct(),ut(),ft(),mt(),gt(),vt(),bt(),St(),wt(),Et(),Ot(),At(),Mt(),Pt(),It(),Rt(),Bt(),Ht(),Wt(),Kt(),Jt(),Xt(),Qt(),en(),nn(),an(),sn(),ln(),dn(),gn(),ze(),yn=Object.assign({"./cheekKernel.ts":Ve,"../engine/attach.ts":Ue,"../engine/closure.ts":Ge,"../engine/defect.ts":qe,"../engine/mesh.ts":Ye,"../engine/section.ts":Ze,"../engine/skin.ts":$e,"../engine/skinDomain.ts":tt,"../engine/solver.ts":rt,"../engine/surface/advancementChart.ts":at,"../engine/surface/advancementPlan.ts":st,"../engine/surface/advancementRepair.ts":lt,"../engine/surface/buildCheek.ts":dt,"../engine/surface/closure.ts":pt,"../engine/surface/conditionMesh.ts":ht,"../engine/surface/contact.ts":_t,"../engine/surface/defect.ts":yt,"../engine/surface/defectTypes.ts":xt,"../engine/surface/directionalRepair.ts":Ct,"../engine/surface/domain.ts":Tt,"../engine/surface/edgeContact.ts":Dt,"../engine/surface/editableStitches.ts":kt,"../engine/surface/eversion.ts":jt,"../engine/surface/grip.ts":Nt,"../engine/surface/integration.ts":Ft,"../engine/surface/manualStitch.ts":Lt,"../engine/surface/movingBounds.ts":zt,"../engine/surface/opening.ts":Vt,"../engine/surface/preparedRepair.ts":Ut,"../engine/surface/presetEdits.ts":Gt,"../engine/surface/projector.ts":qt,"../engine/surface/referenceSteps.ts":Yt,"../engine/surface/selfContact.ts":Zt,"../engine/surface/session.ts":$t,"../engine/surface/slidingContact.ts":tn,"../engine/surface/solver.ts":rn,"../engine/surface/strain.ts":on,"../engine/tissueVolume.ts":cn,"../engine/types.ts":un}),bn=async e=>Array.from(new Uint8Array(await crypto.subtle.digest(`SHA-256`,Uint8Array.from(e).buffer)),e=>e.toString(16).padStart(2,`0`)).join(``)}));let $=null,Sn=``,Cn=0,wn=0,Tn=(e,t=[])=>self.postMessage(e,{transfer:t});function En(e,t){if(!$)return;let n=Float32Array.from($.solver.positions);Tn({type:`pose`,caseId:Sn,revision:e,positions:n,metrics:$.solver.metrics(),lastStep:$.lastStep,historyLimit:$.solver.manualMode?36e3:1800,release:$.solver.release,underminingMm:$.solver.underminingMm,closure:$.solver.closure,manualStitches:$.solver.manual.snapshot(),presetStitches:me($.solver.closure,$.solver.domain.closure),grabVertex:$.solver.grab?.vertex??null,canUndo:$.canUndo,canRedo:$.canRedo,stepMs:t},[n.buffer])}self.onmessage=async e=>{let t=e.data;try{if(t.type===`init`){wn++,Sn=t.caseId,Cn=0,$=null;let e=performance.now(),n=t.advancement?{domain:le(t.source,t.config),refined:!1}:t.repair?t.directionalRepair?{domain:ve(t.source,t.config,t.repair),refined:!1}:_e(t.source,t.config,t.repair,t.preciseRepair):null,i=n?.domain??H(t.source,t.config,`unit-node`,t.circular),a=await Be(i).catch(()=>void 0);if(Sn!==t.caseId)return;let o=new Pe(i,a);(t.manual||n?.refined||t.repair&&r(t.config))&&o.enableManual();let s=t.advancement&&a?await Promise.resolve().then(()=>(xn(),_n)).then(e=>e.loadReferenceRehearsal(i,t.source)).catch(()=>void 0):void 0;if(Sn!==t.caseId)return;$=new Fe(o,s);let c=n?.refined?t.refinedArchive??t.archive:t.archive;c&&$.restoreExperiment(c),Tn({type:`ready`,caseId:Sn,domain:i,preparationMs:performance.now()-e,backend:a?`wasm`:`typescript`,...n?.refined?{refinedCut:!0}:{}}),En(0,0);return}if(!$||t.caseId!==Sn||t.revision<Cn)return;if(Cn=t.revision,t.type===`archive`){Tn({type:`archive`,caseId:Sn,revision:t.revision,archive:$.exportArchive()});return}if(t.type===`undo`||t.type===`redo`||t.type===`restore`){wn++,t.type===`undo`?$.undo():t.type===`redo`?$.redo():$.restoreExperiment(t.archive),En(t.revision,0);return}if(t.type===`seek`){let e=++wn,n=Sn,r=performance.now(),i=$.startSeek(t.target);for(;$.solver.stepIndex<i;)if($.advance(),await new Promise(e=>setTimeout(e,0)),e!==wn||n!==Sn)return;$.synchronizeCommands(),En(t.revision,performance.now()-r)}else{wn++;let e=performance.now();try{$.apply(t.step,t.commands,t.editId)}catch(e){Tn({type:`error`,caseId:Sn,revision:t.revision,recoverable:!0,message:e instanceof Error?e.message:`The edit could not be applied.`});return}t.advance&&$.advance(),En(t.revision,performance.now()-e)}}catch(e){Tn({type:`error`,caseId:t.caseId,...`revision`in t?{revision:t.revision}:{},message:e instanceof Error?e.message:`The tissue simulation could not continue.`})}}})();
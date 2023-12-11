!function(_){var $=_.noise={};function o(_,$,o){this.x=_,this.y=$,this.z=o}o.prototype.dot2=function(_,$){return this.x*_+this.y*$},o.prototype.dot3=function(_,$,o){return this.x*_+this.y*$+this.z*o};var t=[new o(1,1,0),new o(-1,1,0),new o(1,-1,0),new o(-1,-1,0),new o(1,0,1),new o(-1,0,1),new o(1,0,-1),new o(-1,0,-1),new o(0,1,1),new o(0,-1,1),new o(0,1,-1),new o(0,-1,-1)],r=[151,160,137,91,90,15,131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,190,6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,88,237,149,56,87,174,20,125,136,171,168,68,175,74,165,71,134,139,48,27,166,77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,102,143,54,65,25,63,161,1,216,80,73,209,76,132,187,208,89,18,169,200,196,135,130,116,188,159,86,164,100,109,198,173,186,3,64,52,217,226,250,124,123,5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,223,183,170,213,119,248,152,2,44,154,163,70,221,153,101,155,167,43,172,9,129,22,39,253,19,98,108,110,79,113,224,232,178,185,112,104,218,246,97,228,251,34,242,193,238,210,144,12,191,179,162,241,81,51,145,235,249,14,239,107,49,192,214,31,181,199,106,157,184,84,204,176,115,121,50,45,127,4,150,254,138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180],n=Array(512),e=Array(512);$.seed=function(_){_>0&&_<1&&(_*=65536),(_=Math.floor(_))<256&&(_|=_<<8);for(var $,o=0;o<256;o++)$=1&o?r[o]^255&_:r[o]^_>>8&255,n[o]=n[o+256]=$,e[o]=e[o+256]=t[$%12]},$.seed(0);var i=.5*(Math.sqrt(3)-1),d=(3-Math.sqrt(3))/6,f=1/3,u=1/6;function a(_){return _*_*_*(_*(6*_-15)+10)}function v(_,$,o){return(1-o)*_+o*$}$.simplex2=function(_,$){var o,t,r,f,u,a=(_+$)*i,v=Math.floor(_+a),s=Math.floor($+a),l=(v+s)*d,w=_-v+l,c=$-s+l;w>c?(f=1,u=0):(f=0,u=1);var h=w-f+d,p=c-u+d,x=w-1+2*d,y=c-1+2*d,m=e[(v&=255)+n[s&=255]],q=e[v+f+n[s+u]],z=e[v+1+n[s+1]],b=.5-w*w-c*c;b<0?o=0:(b*=b,o=b*b*m.dot2(w,c));var g=.5-h*h-p*p;g<0?t=0:(g*=g,t=g*g*q.dot2(h,p));var j=.5-x*x-y*y;return j<0?r=0:(j*=j,r=j*j*z.dot2(x,y)),70*(o+t+r)},$.simplex3=function(_,$,o){var t,r,i,d,a,v,s,l,w,c,h=(_+$+o)*f,p=Math.floor(_+h),x=Math.floor($+h),y=Math.floor(o+h),m=(p+x+y)*u,q=_-p+m,z=$-x+m,b=o-y+m;q>=z?z>=b?(a=1,v=0,s=0,l=1,w=1,c=0):q>=b?(a=1,v=0,s=0,l=1,w=0,c=1):(a=0,v=0,s=1,l=1,w=0,c=1):z<b?(a=0,v=0,s=1,l=0,w=1,c=1):q<b?(a=0,v=1,s=0,l=0,w=1,c=1):(a=0,v=1,s=0,l=1,w=1,c=0);var g=q-a+u,j=z-v+u,k=b-s+u,A=q-l+2*u,B=z-w+2*u,C=b-c+2*u,D=q-1+3*u,E=z-1+3*u,F=b-1+3*u,G=e[(p&=255)+n[(x&=255)+n[y&=255]]],H=e[p+a+n[x+v+n[y+s]]],I=e[p+l+n[x+w+n[y+c]]],J=e[p+1+n[x+1+n[y+1]]],K=.6-q*q-z*z-b*b;K<0?t=0:(K*=K,t=K*K*G.dot3(q,z,b));var L=.6-g*g-j*j-k*k;L<0?r=0:(L*=L,r=L*L*H.dot3(g,j,k));var M=.6-A*A-B*B-C*C;M<0?i=0:(M*=M,i=M*M*I.dot3(A,B,C));var N=.6-D*D-E*E-F*F;return N<0?d=0:(N*=N,d=N*N*J.dot3(D,E,F)),32*(t+r+i+d)},$.perlin2=function(_,$){var o=Math.floor(_),t=Math.floor($);_-=o,$-=t;var r=e[(o&=255)+n[t&=255]].dot2(_,$),i=e[o+n[t+1]].dot2(_,$-1),d=e[o+1+n[t]].dot2(_-1,$),f=e[o+1+n[t+1]].dot2(_-1,$-1),u=a(_);return v(v(r,d,u),v(i,f,u),a($))},$.perlin3=function(_,$,o){var t=Math.floor(_),r=Math.floor($),i=Math.floor(o);_-=t,$-=r,o-=i;var d=e[(t&=255)+n[(r&=255)+n[i&=255]]].dot3(_,$,o),f=e[t+n[r+n[i+1]]].dot3(_,$,o-1),u=e[t+n[r+1+n[i]]].dot3(_,$-1,o),s=e[t+n[r+1+n[i+1]]].dot3(_,$-1,o-1),l=e[t+1+n[r+n[i]]].dot3(_-1,$,o),w=e[t+1+n[r+n[i+1]]].dot3(_-1,$,o-1),c=e[t+1+n[r+1+n[i]]].dot3(_-1,$-1,o),h=e[t+1+n[r+1+n[i+1]]].dot3(_-1,$-1,o-1),p=a(_),x=a($),y=a(o);return v(v(v(d,l,p),v(f,w,p),y),v(v(u,c,p),v(s,h,p),y),x)}}(this);
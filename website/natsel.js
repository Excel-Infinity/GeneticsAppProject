(()=>{"use strict";function e(e,t){return Math.floor(Math.random()*(t-e+1))+e}const t=document.querySelector(".theme-button");t.addEventListener("click",(function(){document.body.classList.toggle("light-theme"),document.body.classList.toggle("dark-theme"),document.body.classList.contains("light-theme")?t.textContent="Dark Theme":t.textContent="Light Theme",console.log("Theme switched")}));const n=document.getElementById("run-button"),a=document.getElementById("ind"),o=document.getElementById("p"),r=document.getElementById("hr-chance"),l=document.getElementById("he-chance"),u=document.getElementById("hd-chance"),d=document.getElementById("num-gens"),c=document.getElementById("end-graph"),s=document.getElementById("start-graph");n.addEventListener("click",(()=>{if(!function(){for(var e=arguments,t=0;t<e.length;t++)if(parseFloat(e[t].value)<parseFloat(e[t].min)||parseFloat(e[t].value)>parseFloat(e[t].max))return!1;return!0}(a,o,r,l,u))return void alert(":( Invalid inputs");const t=parseInt(a.value),n=parseFloat(o.value),m=parseFloat(r.value)/100,h=parseFloat(l.value)/100,i=parseFloat(u.value)/100,g=function(t,n,a,o){for(var r=t,l=n*r,u=(1-n)*r,d=[[0,0,0]],c=a,s=[100*o[0],100*o[1],100*o[2]],m=!0,h=1;h<c;h++){for(var i=l,g=u,v=0,p=0,y=0,E=0;E<r;E++){var I=(e(0,i+g-1)<i?1:0)+(e(0,i+g-1)<i?1:0);0==I?(e(0,100)>s[2]&&y++,m&&d[0][0]++):1==I?(e(0,100)>s[1]&&p++,m&&d[0][1]++):2==I&&(e(0,100)>s[0]&&v++,m&&d[0][2]++),i-=I,g-=2-I}m=!1,l=2*v+p,u=2*y+p,u=r-(l=Math.round(r*l/(l+u)));var f=y+p+v;v=r-(y=Math.round(r*y/f))-(p=Math.round(r*p/f)),d[h]=[y,p,v]}return d}(t,n,parseFloat(d.value),[m,h,i]),v=g[g.length-1];s.values=g[0],c.values=v}))})();
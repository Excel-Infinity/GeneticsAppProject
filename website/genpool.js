(()=>{"use strict";Object.freeze({has_dominant:!1,has_recessive:!0}),Object.freeze({has_dominant:!0,has_recessive:!0}),Object.freeze({has_dominant:!0,has_recessive:!1});const e=document.querySelector(".theme-button");e.addEventListener("click",(function(){document.body.classList.toggle("light-theme"),document.body.classList.toggle("dark-theme"),document.body.classList.contains("light-theme")?e.textContent="Dark Theme":e.textContent="Light Theme",console.log("Theme switched")}));const t=document.getElementById("pool-button"),n=document.getElementById("ind"),o=document.getElementById("p"),a=document.getElementById("bar-graph"),s=document.getElementById("predictive-graph");t.addEventListener("click",(()=>{if(!function(){for(var e=arguments,t=0;t<e.length;t++)if(parseFloat(e[t].value)<parseFloat(e[t].min)||parseFloat(e[t].value)>parseFloat(e[t].max))return!1;return!0}(n,o))return void alert(":( Invalid inputs");const e=parseInt(n.value),t=parseFloat(o.value),r=1-t,m=function(e,t){const n={num_recessive:0,num_heterozygous:0,num_dominant:0};for(var o=0;o<t;++o){const t=Math.random()<e;t===Math.random()<e?t?++n.num_dominant:++n.num_recessive:++n.num_heterozygous}return n}(t,e);a.values=[m.num_recessive,m.num_heterozygous,m.num_dominant],s.values=[r*r*e,2*t*r*e,t*t*e].map(Math.round)}))})();
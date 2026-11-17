/* Ambumaps — GPS intégré : guidage, signalements et alertes de l'équipe.
   Carte : MapLibre + OpenFreeMap (© OpenMapTiles, données © contributeurs OpenStreetMap).
   Itinéraires et consignes : Valhalla (serveur public OpenStreetMap). Adresses : IGN Géoplateforme. */
(function(){
"use strict";
var A=window.AMB;
var ML_JS="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js",ML_CSS="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css";
var STYLE_URL="https://tiles.openfreemap.org/styles/dark";
var ICONS={"GLY":{"bump":"<path d=\"M2 18.6h2.6c2.6 0 3.4-7.1 7.4-7.1s4.8 7.1 7.4 7.1H22a.9.9 0 0 1 .9.9v.9a.9.9 0 0 1-.9.9H2a.9.9 0 0 1-.9-.9v-.9a.9.9 0 0 1 .9-.9z\" fill=\"{fg}\"></path><path d=\"M8.1 18.6v-2.4a.7.7 0 0 1 .7-.7h.6a.7.7 0 0 1 .7.7v2.4z M11.1 18.6v-4.6a.7.7 0 0 1 .7-.7h.4a.7.7 0 0 1 .7.7v4.6z M13.9 18.6v-2.4a.7.7 0 0 1 .7-.7h.6a.7.7 0 0 1 .7.7v2.4z\" fill=\"{bg}\"></path><path d=\"M12 2.6v5.2 M9.6 5.2L12 2.6l2.4 2.6\" fill=\"none\" stroke=\"{fg}\" stroke-width=\"2.1\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>","pothole":"<path d=\"M2.5 9.5h7.8l-1.6 3.2 2.2 2.4-1.5 3.9H2.5a1 1 0 0 1-1-1V10.5a1 1 0 0 1 1-1z\" fill=\"{fg}\"></path><g transform=\"translate(0.8 1.2) rotate(5 17 14)\"><path d=\"M13 9.5h8.5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-9.7l1.5-3.9-2.2-2.4z\" fill=\"{fg}\"></path><path d=\"M16.2 14h3.4\" stroke=\"{bg}\" stroke-width=\"1.2\" stroke-linecap=\"round\"></path></g><path d=\"M4 14h3.4\" stroke=\"{bg}\" stroke-width=\"1.2\" stroke-linecap=\"round\"></path><path d=\"M11 6.2l.8-1.6 M13.6 6.6l1.2-1.2 M9 6.8l-.6-1.4\" stroke=\"{fg}\" stroke-width=\"1.6\" stroke-linecap=\"round\"></path>","slow":"<g transform=\"translate(5.2 -3.2) rotate(0 12 13) scale(0.72)\"><path d=\"M6.2 11L7.6 6.9A2 2 0 0 1 9.5 5.5h5a2 2 0 0 1 1.9 1.4L17.8 11h.7a2 2 0 0 1 2 2v4a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17v-4a2 2 0 0 1 2-2z\" fill=\"{fg}\"></path><path d=\"M5 18.4h3v1.9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z M16 18.4h3v1.9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z\" fill=\"{fg}\"></path><path d=\"M8.5 10.6l.9-2.7a.8.8 0 0 1 .8-.6h3.6a.8.8 0 0 1 .8.6l.9 2.7z\" fill=\"{bg}\"></path><circle cx=\"7.3\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><circle cx=\"16.7\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><path d=\"M10.3 15.6h3.4\" stroke=\"{bg}\" stroke-width=\"1.3\" stroke-linecap=\"round\"></path></g><g transform=\"translate(-1.2 1.6) rotate(0 12 13) scale(0.9)\"><path d=\"M6.2 11L7.6 6.9A2 2 0 0 1 9.5 5.5h5a2 2 0 0 1 1.9 1.4L17.8 11h.7a2 2 0 0 1 2 2v4a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17v-4a2 2 0 0 1 2-2z\" fill=\"{fg}\" stroke=\"{bg}\" stroke-width=\"2.2\" paint-order=\"stroke\"></path><path d=\"M5 18.4h3v1.9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z M16 18.4h3v1.9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z\" fill=\"{fg}\"></path><path d=\"M8.5 10.6l.9-2.7a.8.8 0 0 1 .8-.6h3.6a.8.8 0 0 1 .8.6l.9 2.7z\" fill=\"{bg}\"></path><circle cx=\"7.3\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><circle cx=\"16.7\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><path d=\"M10.3 15.6h3.4\" stroke=\"{bg}\" stroke-width=\"1.3\" stroke-linecap=\"round\"></path></g>","jam":"<g transform=\"translate(5.2 -3.2) rotate(0 12 13) scale(0.72)\"><path d=\"M6.2 11L7.6 6.9A2 2 0 0 1 9.5 5.5h5a2 2 0 0 1 1.9 1.4L17.8 11h.7a2 2 0 0 1 2 2v4a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17v-4a2 2 0 0 1 2-2z\" fill=\"{fg}\"></path><path d=\"M5 18.4h3v1.9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z M16 18.4h3v1.9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z\" fill=\"{fg}\"></path><path d=\"M8.5 10.6l.9-2.7a.8.8 0 0 1 .8-.6h3.6a.8.8 0 0 1 .8.6l.9 2.7z\" fill=\"{bg}\"></path><circle cx=\"7.3\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><circle cx=\"16.7\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><path d=\"M10.3 15.6h3.4\" stroke=\"{bg}\" stroke-width=\"1.3\" stroke-linecap=\"round\"></path></g><g transform=\"translate(-1.2 1.6) rotate(0 12 13) scale(0.9)\"><path d=\"M6.2 11L7.6 6.9A2 2 0 0 1 9.5 5.5h5a2 2 0 0 1 1.9 1.4L17.8 11h.7a2 2 0 0 1 2 2v4a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17v-4a2 2 0 0 1 2-2z\" fill=\"{fg}\" stroke=\"{bg}\" stroke-width=\"2.2\" paint-order=\"stroke\"></path><path d=\"M5 18.4h3v1.9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z M16 18.4h3v1.9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z\" fill=\"{fg}\"></path><path d=\"M8.5 10.6l.9-2.7a.8.8 0 0 1 .8-.6h3.6a.8.8 0 0 1 .8.6l.9 2.7z\" fill=\"{bg}\"></path><circle cx=\"7.3\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><circle cx=\"16.7\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><path d=\"M10.3 15.6h3.4\" stroke=\"{bg}\" stroke-width=\"1.3\" stroke-linecap=\"round\"></path></g>","crash":"<g transform=\"translate(-1.6 2.2) rotate(-14 12 13) scale(0.86)\"><path d=\"M6.2 11L7.6 6.9A2 2 0 0 1 9.5 5.5h5a2 2 0 0 1 1.9 1.4L17.8 11h.7a2 2 0 0 1 2 2v4a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17v-4a2 2 0 0 1 2-2z\" fill=\"{fg}\"></path><path d=\"M5 18.4h3v1.9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z M16 18.4h3v1.9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z\" fill=\"{fg}\"></path><path d=\"M8.5 10.6l.9-2.7a.8.8 0 0 1 .8-.6h3.6a.8.8 0 0 1 .8.6l.9 2.7z\" fill=\"{bg}\"></path><circle cx=\"7.3\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><circle cx=\"16.7\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><path d=\"M10.3 15.6h3.4\" stroke=\"{bg}\" stroke-width=\"1.3\" stroke-linecap=\"round\"></path></g><path d=\"M18.4 1.6l.9 2.6 2.6-.9-1.3 2.4 2.5 1.2-2.7.6.3 2.7-2-1.8-1.9 2-.1-2.7-2.7.1 2.1-1.7-1.5-2.3 2.7.6z\" fill=\"{fg}\"></path>","cone":"<path d=\"M10.2 3h3.6l4.6 15.4H5.6z\" fill=\"{fg}\" stroke=\"{fg}\" stroke-width=\"1.2\" stroke-linejoin=\"round\"></path><path d=\"M8.75 8h6.5l.62 2.2H8.13z M7.25 13h9.5l.6 2.2H6.65z\" fill=\"{bg}\"></path><rect x=\"3\" y=\"18.6\" width=\"18\" height=\"2.6\" rx=\"1.2\" fill=\"{fg}\"></rect>","danger":"<path d=\"M10.3 3.9a2 2 0 0 1 3.4 0l8.2 14.2a2 2 0 0 1-1.7 3H3.8a2 2 0 0 1-1.7-3z\" fill=\"{fg}\"></path><rect x=\"10.9\" y=\"8.4\" width=\"2.2\" height=\"6.8\" rx=\"1.1\" fill=\"{bg}\"></rect><circle cx=\"12\" cy=\"17.8\" r=\"1.3\" fill=\"{bg}\"></circle>"},"COL":{"bump":["#f59f00","#ffffff"],"pothole":["#f2c200","#2b2300"],"slow":["#f76707","#ffffff"],"jam":["#e03131","#ffffff"],"crash":["#a61e4d","#ffffff"],"cone":["#5c6370","#ffffff"],"danger":["#7048e8","#ffffff"]}};
var GLY=ICONS.GLY,COL=ICONS.COL;
var KIND={ralentisseur:"bump",degradee:"pothole",ralentissement:"slow",arret:"jam",accident:"crash",travaux:"cone",danger:"danger"};
var NOM={ralentisseur:"Ralentisseur",degradee:"Route dégradée",ralentissement:"Ralentissement",arret:"Circulation à l'arrêt",accident:"Accident",travaux:"Travaux",danger:"Danger"};
var DIT={ralentisseur:"Ralentisseur",degradee:"Route dégradée",ralentissement:"Ralentissement signalé",arret:"Circulation à l'arrêt signalée",accident:"Accident signalé",travaux:"Travaux signalés",danger:"Danger signalé"};
var TEMP={ralentissement:1,arret:1,accident:1,travaux:1,danger:1};
var G=null;

/* ---------- petits outils ---------- */
function esc(s){return A.esc(s);}
function $(s){return G&&G.root?G.root.querySelector(s):null;}
function now(){return Date.now();}
function r6(x){return Math.round(x*1e6)/1e6;}
function r5(p){return[Math.round(p[0]*1e5)/1e5,Math.round(p[1]*1e5)/1e5];}
function roundD(m){return m<100?Math.max(10,Math.round(m/10)*10):Math.round(m/50)*50;}
function fmtDist(m){if(m<950)return roundD(m)+" m";var k=m/1000;return(k<10?k.toFixed(1).replace(".",","):String(Math.round(k)))+" km";}
function sayDist(m){if(m<950)return roundD(m)+" mètres";var k=Math.round(m/100)/10;return String(k).replace(".",",")+" kilomètre"+(k>=2?"s":"");}
function hhmm(t){var d=new Date(t);return(d.getHours()<10?"0":"")+d.getHours()+":"+(d.getMinutes()<10?"0":"")+d.getMinutes();}
function lcFirst(s){s=String(s||"");return s.charAt(0).toLowerCase()+s.slice(1);}
function ago(t){var m=Math.max(0,Math.round((now()-t)/60000));return m<1?"à l'instant":(m<60?"il y a "+m+" min":"il y a "+Math.floor(m/60)+" h "+(m%60?(m%60<10?"0":"")+(m%60):""));}
function svgI(d,size,color,sw){return'<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" fill="none" stroke="'+color+'" stroke-width="'+(sw||2.2)+'" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="'+d+'"></path></svg>';}
function glyph(k,size,fg,bg){var c=COL[k];return'<svg width="'+size+'" height="'+size+'" viewBox="0 0 24 24" aria-hidden="true">'+GLY[k].split("{fg}").join(fg||c[1]).split("{bg}").join(bg||c[0])+'</svg>';}
function pinSvg(k){var c=COL[k];return'<svg width="40" height="50" viewBox="-20 -47 40 50" aria-hidden="true"><ellipse cx="0" cy="0" rx="7" ry="2.6" fill="#000" opacity=".45"></ellipse><path d="M-6.5 -14.5 L0 -2.5 L6.5 -14.5z" fill="#fff" stroke="#fff" stroke-width="4" stroke-linejoin="round"></path><circle cx="0" cy="-27" r="18.5" fill="#fff"></circle><path d="M-4.8 -13.5 L0 -5.2 L4.8 -13.5z" fill="'+c[0]+'"></path><circle cx="0" cy="-27" r="15.5" fill="'+c[0]+'"></circle><g transform="translate(-11.5 -38.5) scale(0.96)">'+GLY[k].split("{fg}").join(c[1]).split("{bg}").join(c[0])+'</g></svg>';}
var ARROW='<svg width="54" height="54" viewBox="-27 -27 54 54" aria-hidden="true"><clipPath id="gArrowR"><rect x="0" y="-30" width="30" height="50"></rect></clipPath><ellipse cx="0" cy="11" rx="17" ry="6" fill="#000" opacity=".38"></ellipse><path d="M1.6 -17.12 L12.63 9.67 Q14 13 10.78 11.39 L2.15 7.07 Q0 6 -2.15 7.07 L-10.78 11.39 Q-14 13 -12.63 9.67 L-1.6 -17.12 Q0 -21 1.6 -17.12 Z" transform="translate(0 4)" fill="#123a8f" stroke="#123a8f" stroke-width="3" stroke-linejoin="round"></path><path d="M1.6 -17.12 L12.63 9.67 Q14 13 10.78 11.39 L2.15 7.07 Q0 6 -2.15 7.07 L-10.78 11.39 Q-14 13 -12.63 9.67 L-1.6 -17.12 Q0 -21 1.6 -17.12 Z" fill="#fff"></path><path d="M1.6 -17.12 L12.63 9.67 Q14 13 10.78 11.39 L2.15 7.07 Q0 6 -2.15 7.07 L-10.78 11.39 Q-14 13 -12.63 9.67 L-1.6 -17.12 Q0 -21 1.6 -17.12 Z" fill="#d3dae6" clip-path="url(#gArrowR)"></path><path d="M1.6 -17.12 L12.63 9.67 Q14 13 10.78 11.39 L2.15 7.07 Q0 6 -2.15 7.07 L-10.78 11.39 Q-14 13 -12.63 9.67 L-1.6 -17.12 Q0 -21 1.6 -17.12 Z" fill="none" stroke="#1e5bd6" stroke-width="3" stroke-linejoin="round"></path></svg>';
var IC={straight:"M12 21V4 M6.5 9.5L12 4l5.5 5.5",right:"M6 21V11a4 4 0 0 1 4-4h9 M15 3l4 4-4 4",left:"M18 21V11a4 4 0 0 0-4-4H5 M9 3L5 7l4 4",
 sright:"M8 21v-6.5a4 4 0 0 1 1.2-2.8L17 4 M11.5 4H17v5.5",sleft:"M16 21v-6.5a4 4 0 0 0-1.2-2.8L7 4 M12.5 4H7v5.5",
 uturn:"M9 21V10a5 5 0 0 1 10 0v6 M15.5 13l3.5 3.5 3.5-3.5",round:"M12 21v-4.5 M12 16.5a4.5 4.5 0 1 1 4.5-4.5 M16.5 12V6.5 M14 9l2.5-2.5L19 9",
 flag:"M6 21V4 M6 4h11l-2.5 4 2.5 4H6",vol:"M4 9v6h4l5 4V5L8 9H4z M16.5 8.5a5 5 0 0 1 0 7 M19 6a8.5 8.5 0 0 1 0 12",mute:"M4 9v6h4l5 4V5L8 9H4z M17 9l5 6 M22 9l-5 6",
 target:"M12 5a7 7 0 1 0 0 14a7 7 0 1 0 0-14z M12 9.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5z M12 2v3 M12 19v3 M2 12h3 M19 12h3",chev:"M6 15l6-6 6 6",
 home:"M3.5 11L12 4l8.5 7 M5.5 9.5V20h13V9.5 M10 20v-5.5h4V20",pin:"M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11z M12 7.6a2.4 2.4 0 1 0 0 4.8a2.4 2.4 0 1 0 0-4.8",
 back:"M15 5l-7 7 7 7",search:"M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 1 0 0-13z M15.3 15.3L20 20",stop:"M7 7h10v10H7z"};
function manIcon(t){if(t>=4&&t<=6)return"flag";if(t===10||t===11)return"right";if(t===14||t===15)return"left";if(t===12||t===13)return"uturn";if(t===26||t===27)return"round";
 if(t===9||t===18||t===20||t===23||t===37)return"sright";if(t===16||t===19||t===21||t===24||t===38)return"sleft";return"straight";}
var LBL={0:"Continue",1:"Pars",2:"Pars à droite",3:"Pars à gauche",4:"Tu es arrivé",5:"Arrivée sur ta droite",6:"Arrivée sur ta gauche",7:"Continue",8:"Continue tout droit",9:"Serre à droite",10:"Tourne à droite",11:"Tourne franchement à droite",12:"Fais demi-tour",13:"Fais demi-tour",14:"Tourne franchement à gauche",15:"Tourne à gauche",16:"Serre à gauche",17:"Prends la bretelle",18:"Prends la bretelle à droite",19:"Prends la bretelle à gauche",20:"Prends la sortie à droite",21:"Prends la sortie à gauche",22:"Continue tout droit",23:"Reste à droite",24:"Reste à gauche",25:"Insère-toi",26:"Au rond-point",27:"Sors du rond-point",28:"Prends le bac",29:"Quitte le bac",37:"Insère-toi à droite",38:"Insère-toi à gauche"};
var ORD=["","1re","2e","3e","4e","5e","6e","7e","8e"];
function manLabel(m){if(m.type===26&&m.roundabout_exit_count)return"Au rond-point, prends la "+(ORD[m.roundabout_exit_count]||m.roundabout_exit_count+"e")+" sortie";return LBL[m.type]||"Continue";}
function manStreet(R,k){var m=R.man[k];if(!m)return"";var s=(m.street_names&&m.street_names[0])||"";
 if(m.type===26&&R.man[k+1])s=(R.man[k+1].street_names&&R.man[k+1].street_names[0])||s;
 if(m.type>=4&&m.type<=6)s=G.dest.nom||"";return s;}

/* ---------- géométrie ---------- */
function mkProj(lat0){var kx=111320*Math.cos(lat0*Math.PI/180),ky=110540;return{xy:function(p){return[p[1]*kx,p[0]*ky];}};}
function buildRoute(pts,man,summary,shape){
 var P=mkProj(pts[0][0]),xy=pts.map(P.xy),cum=[0];
 for(var i=1;i<xy.length;i++){var dx=xy[i][0]-xy[i-1][0],dy=xy[i][1]-xy[i-1][1];cum.push(cum[i-1]+Math.sqrt(dx*dx+dy*dy));}
 var L=cum.length-1;
 man.forEach(function(m){m.d=cum[Math.min(m.begin_shape_index||0,L)];m.e=cum[Math.min(m.end_shape_index==null?L:m.end_shape_index,L)];m.lenM=Math.max(1,m.e-m.d);});
 return{pts:pts,xy:xy,cum:cum,P:P,man:man,total:cum[L],time:(summary&&summary.time)||0,shape:shape,edges:null};
}
function project(R,p,hint){
 var q=R.P.xy(p),best=null,n=R.xy.length;
 function scan(lo,hi){for(var i=lo;i<hi;i++){var a=R.xy[i],b=R.xy[i+1],dx=b[0]-a[0],dy=b[1]-a[1],l=dx*dx+dy*dy,t=l?((q[0]-a[0])*dx+(q[1]-a[1])*dy)/l:0;t=Math.max(0,Math.min(1,t));
  var x=a[0]+t*dx-q[0],y=a[1]+t*dy-q[1],d=Math.sqrt(x*x+y*y);if(!best||d<best.off)best={i:i,t:t,off:d,along:R.cum[i]+t*(R.cum[i+1]-R.cum[i])};}}
 if(n<2)return{i:0,t:0,off:R.pts.length?A.distM(p,R.pts[0]):0,along:0,q:R.pts[0]||p};
 if(hint!=null){scan(Math.max(0,hint-8),Math.min(n-1,hint+80));if(!best||best.off>30){best=null;scan(0,n-1);}}else scan(0,n-1);
 var a=R.pts[best.i],b=R.pts[best.i+1];best.q=[a[0]+(b[0]-a[0])*best.t,a[1]+(b[1]-a[1])*best.t];return best;
}
function idxAt(R,d){var lo=0,hi=R.cum.length-1;while(lo<hi){var m=(lo+hi+1)>>1;if(R.cum[m]<=d)lo=m;else hi=m-1;}return lo;}
function pointAt(R,d){if(R.pts.length<2)return R.pts[0];d=Math.max(0,Math.min(R.total,d));var i=Math.min(idxAt(R,d),R.pts.length-2),seg=R.cum[i+1]-R.cum[i],t=seg?(d-R.cum[i])/seg:0,a=R.pts[i],b=R.pts[i+1];return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];}
function slice(R,a,b){a=Math.max(0,a);b=Math.min(R.total,b);if(b<=a)return[pointAt(R,a),pointAt(R,a)];var out=[pointAt(R,a)],i=idxAt(R,a)+1;while(i<R.pts.length&&R.cum[i]<b){out.push(R.pts[i]);i++;}out.push(pointAt(R,b));return out;}
function brg(a,b){var la1=a[0]*Math.PI/180,la2=b[0]*Math.PI/180,dl=(b[1]-a[1])*Math.PI/180,y=Math.sin(dl)*Math.cos(la2),x=Math.cos(la1)*Math.sin(la2)-Math.sin(la1)*Math.cos(la2)*Math.cos(dl);return(Math.atan2(y,x)*180/Math.PI+360)%360;}
function bearingAt(R,d){return brg(pointAt(R,Math.max(0,d-4)),pointAt(R,Math.min(R.total,d+16)));}
function lenM(c){var t=0;for(var i=1;i<c.length;i++)t+=A.distM(c[i-1],c[i]);return t;}
function nearTrace(tr,p,m){for(var i=0;i<tr.length;i++)if(A.distM(tr[i],p)<m)return true;return false;}
function simplify(c,tol){if(c.length<3)return c.slice();var P=mkProj(c[0][0]),xy=c.map(P.xy),keep=new Array(c.length);keep[0]=keep[c.length-1]=1;
 (function dp(a,b){var mx=0,ix=-1,A0=xy[a],B0=xy[b],dx=B0[0]-A0[0],dy=B0[1]-A0[1],l=Math.sqrt(dx*dx+dy*dy)||1;
  for(var i=a+1;i<b;i++){var d=Math.abs(dy*xy[i][0]-dx*xy[i][1]+B0[0]*A0[1]-B0[1]*A0[0])/l;if(d>mx){mx=d;ix=i;}}
  if(mx>tol){keep[ix]=1;dp(a,ix);dp(ix,b);}})(0,c.length-1);
 return c.filter(function(_,i){return keep[i];});}
function angDiff(a,b){var d=((b-a)%360+540)%360-180;return d;}

/* ---------- chargement de la carte ---------- */
var mlP=null;
function loadML(){
 if(window.maplibregl)return Promise.resolve(window.maplibregl);if(mlP)return mlP;
 mlP=new Promise(function(res,rej){var l=document.createElement("link");l.rel="stylesheet";l.href=ML_CSS;document.head.appendChild(l);
  var s=document.createElement("script");s.src=ML_JS;s.onload=function(){window.maplibregl?res(window.maplibregl):rej(new Error("Carte indisponible."));};
  s.onerror=function(){mlP=null;s.remove();rej(new Error("Carte indisponible : pas de connexion internet ?"));};document.head.appendChild(s);});
 return mlP;}
function prepStyle(s){
 s.layers=(s.layers||[]).filter(function(l){return l.type!=="fill-extrusion";});
 s.layers.forEach(function(l){var sl=l["source-layer"];l.paint=l.paint||{};
  if(l.type==="background")l.paint["background-color"]="#1c1f25";
  else if(sl==="building"&&l.type==="fill"){l.paint["fill-color"]="#262b33";l.paint["fill-outline-color"]="#2f3540";l.paint["fill-opacity"]=1;}
  else if(sl==="water"&&l.type==="fill")l.paint["fill-color"]="#15263a";
  else if((sl==="park"||sl==="landcover")&&l.type==="fill")l.paint["fill-color"]="#1b2a22";
  else if(sl==="transportation"&&l.type==="line"){if(/casing/.test(l.id))l.paint["line-color"]="#101216";else l.paint["line-color"]=["match",["get","class"],["motorway","trunk","primary"],"#5a6170",["secondary","tertiary"],"#4b525f","#3a404b"];}
  else if(l.type==="symbol"&&sl==="transportation_name"){l.paint["text-color"]="#dfe3ea";l.paint["text-halo-color"]="#14171c";l.paint["text-halo-width"]=1.6;}
 });
 return s;}

/* ---------- interface ---------- */
var CSS='#gps{position:fixed;inset:0;z-index:3000;background:#1c1f25;color:#f1f3f6;font:16px/1.3 Roboto,system-ui,-apple-system,"Segoe UI",sans-serif;overflow:hidden;-webkit-user-select:none;user-select:none}'+
'#gps button{font:inherit;color:inherit;cursor:pointer}#gps .gmap{position:absolute;inset:0}'+
'#gps .gtop{position:absolute;left:0;right:0;top:0;display:flex;flex-direction:column;z-index:5;pointer-events:none}#gps .gtop>*{pointer-events:auto}'+
'#gps .gban{display:flex;flex-direction:column;backdrop-filter:blur(1.5px);-webkit-backdrop-filter:blur(1.5px);text-shadow:0 1px 2px rgba(0,0,0,.35)}'+
'#gps .gb1{background:rgba(0,56,123,.72);padding:12px 18px 12px;padding-top:max(12px,env(safe-area-inset-top));display:flex;align-items:center;gap:16px;min-height:70px}'+
'#gps .gb1 .d{font-size:36px;font-weight:900;line-height:1}#gps .gb1 .l{font-size:17px;font-weight:500}#gps .gb1 .s{font-size:18px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'#gps .gb2{background:rgba(0,36,82,.8);padding:7px 18px;display:flex;align-items:center;gap:10px;font-size:15px}#gps .gb2 span:last-child{font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'#gps .gchip{display:flex;justify-content:center;padding:10px 12px 0}#gps .gchip>div{display:flex;align-items:center;gap:12px;background:rgba(18,20,25,.55);backdrop-filter:blur(1.5px);-webkit-backdrop-filter:blur(1.5px);border:1px solid rgba(255,255,255,.25);padding:7px 16px 7px 7px;border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35);text-shadow:0 1px 2px rgba(0,0,0,.35)}'+
'#gps .gchip .ci{width:36px;height:36px;border-radius:50%;border:2px solid #fff;box-sizing:border-box;display:flex;align-items:center;justify-content:center}#gps .gchip b{display:block;font-size:16px}#gps .gchip small{display:block;font-size:13px;color:#d5d9e0}'+
'#gps .gbot{position:absolute;left:0;right:0;bottom:0;display:flex;flex-direction:column;z-index:5}'+
'#gps .grow{display:grid;grid-template-columns:58px minmax(0,1fr) 58px;gap:10px;align-items:center;padding:0 14px 12px;position:relative}'+
'#gps .gspd{position:relative;width:58px;height:58px;border-radius:14px;background:rgba(24,27,34,.76);backdrop-filter:blur(1.5px);-webkit-backdrop-filter:blur(1.5px);border:1px solid #2c313c;box-sizing:border-box;box-shadow:0 6px 16px rgba(0,0,0,.45);display:flex;flex-direction:column;align-items:center;justify-content:center}'+
'#gps .gspd b{font-size:24px;font-weight:900;line-height:1}#gps .gspd small{font-size:10px;color:#9aa3b2;margin-top:2px}#gps .gspd.dim b{color:#6f7785}'+
'#gps .glim{position:absolute;top:-9px;right:-9px;width:26px;height:26px;border-radius:50%;background:#fff;border:3px solid #e5484d;box-sizing:border-box;display:flex;align-items:center;justify-content:center;color:#111;font-size:11px;font-weight:900}'+
'#gps .gpill{justify-self:center;max-width:100%;min-height:44px;border:1px solid #2c313c;background:rgba(24,27,34,.76);backdrop-filter:blur(1.5px);-webkit-backdrop-filter:blur(1.5px);border-radius:16px;padding:7px 14px;box-shadow:0 6px 16px rgba(0,0,0,.45);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}'+
'#gps .gpill b{font-size:15px;font-weight:700;line-height:1.25}#gps .gpill small{font-size:12.5px;color:#9aa3b2}'+
'#gps .grnd{position:absolute;right:14px;bottom:calc(100% + 12px);display:flex;flex-direction:column;gap:10px}'+
'#gps .grnd button{width:50px;height:50px;border-radius:50%;border:1px solid #2c313c;background:rgba(24,27,34,.76);display:flex;align-items:center;justify-content:center;box-shadow:0 6px 16px rgba(0,0,0,.45)}#gps .grnd button.on{border-color:#4f8cff;background:rgba(0,56,123,.85)}'+
'#gps .gpan{background:rgba(20,23,29,.76);backdrop-filter:blur(1.5px);-webkit-backdrop-filter:blur(1.5px);border-top:1px solid #2c313c;padding:12px 16px 14px;padding-bottom:max(14px,env(safe-area-inset-bottom));display:flex;flex-direction:column;gap:10px}'+
'#gps .geta{display:flex;align-items:flex-end;justify-content:space-between;gap:12px}#gps .geta .t{font-size:28px;font-weight:900;line-height:1}#gps .geta .m{font-size:14px;color:#9aa3b2}'+
'#gps .gdest{display:flex;flex-direction:column;align-items:flex-end;gap:6px;min-width:0}#gps .gdest b{font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:210px}'+
'#gps .gprof{display:flex;align-items:center;gap:6px;background:#13281d;color:#6fe0a3;border:1px solid #1f5a3a;padding:3px 10px;border-radius:999px;font-size:12.5px;font-weight:500;max-width:210px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#gps .gprof i{width:8px;height:8px;border-radius:50%;background:#2fbf71;flex:0 0 auto}'+
'#gps .gbtns{display:grid;grid-template-columns:2fr 1fr;gap:10px}#gps .gsig{min-height:56px;border-radius:14px;border:0;background:#f5a524;color:#17130a;display:flex;align-items:center;justify-content:center;gap:8px;font-size:19px;font-weight:900}'+
'#gps .gstop{min-height:56px;border-radius:14px;border:1px solid #5a2a2d;background:#2a1719;color:#ff9a9d;font-size:16px;font-weight:700}'+
'#gps .gbig{min-height:64px;border-radius:16px;border:0;display:flex;align-items:center;justify-content:center;gap:10px;font-size:19px;font-weight:900}'+
'#gps .gsec{min-height:48px;border-radius:14px;border:1px solid #2c313c;background:#0e1014;color:#f1f3f6;font-size:15px;font-weight:700}'+
'#gps .gattr{font-size:10.5px;color:#6f7785;text-align:center}'+
'#gps .gscrim{position:absolute;inset:0;z-index:20;background:rgba(5,6,8,.62);display:flex;flex-direction:column;justify-content:flex-end}'+
'#gps .gsheet{background:#181b22;border-top:1px solid #2c313c;border-radius:22px 22px 0 0;padding:10px 16px 16px;padding-bottom:max(16px,env(safe-area-inset-bottom));display:flex;flex-direction:column;gap:12px;box-shadow:0 -12px 34px rgba(0,0,0,.55);max-height:92%;overflow:auto}'+
'#gps .ghandle{width:44px;height:5px;border-radius:3px;background:#3a404c;align-self:center}#gps .gsheet h3{margin:0;font-size:23px;font-weight:900}#gps .gsheet p{margin:0;color:#9aa3b2;font-size:13.5px}'+
'#gps .ggrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}#gps .gtile{min-height:84px;border-radius:14px;background:#20242d;border:1px solid #2c313c;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;padding:10px 12px;gap:6px;text-align:left}'+
'#gps .gtile.w{grid-column:span 2;min-height:58px;flex-direction:row;align-items:center;justify-content:flex-start;gap:12px}#gps .gtile .ti{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:0 0 auto}#gps .gtile b{font-size:16px}#gps .gtile small{display:block;font-size:12.5px;color:#9aa3b2;font-weight:400}'+
'#gps .gopt{min-height:60px;border-radius:16px;border:1px solid #2c313c;background:#20242d;display:flex;align-items:center;gap:14px;padding:10px 16px;font-size:18px;font-weight:900;text-align:left}#gps .gopt.pri{background:#00387B;border-color:#00387B;color:#fff}'+
'#gps .gcard{position:absolute;left:0;right:0;bottom:0;z-index:15;background:rgba(24,27,34,.97);border-top:1px solid #2c313c;border-radius:22px 22px 0 0;padding:16px;padding-bottom:max(18px,env(safe-area-inset-bottom));display:flex;flex-direction:column;gap:12px;box-shadow:0 -12px 34px rgba(0,0,0,.55)}'+
'#gps .gcard .hd{display:flex;align-items:center;gap:12px}#gps .gcard .hd .ci{width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:0 0 auto}#gps .gcard .hd b{display:block;font-size:18px;font-weight:900}#gps .gcard .hd small{display:block;font-size:13.5px;color:#9aa3b2}'+
'#gps .gq{font-size:21px;font-weight:900;text-align:center}#gps .g3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}#gps .g2{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}#gps .g3 button,#gps .g2 button{min-height:64px;border-radius:14px;border:0;font-size:15px;font-weight:900;padding:0 6px}'+
'#gps .gbar{height:4px;border-radius:2px;background:#2c313c;overflow:hidden}#gps .gbar i{display:block;height:4px;background:#9aa3b2;transition:width 1s linear}'+
'#gps .gtoast{position:absolute;left:50%;top:40%;transform:translateX(-50%);z-index:18;background:rgba(14,16,20,.92);border:1px solid #2c313c;border-radius:14px;padding:12px 16px;font-size:15px;font-weight:600;max-width:86%;text-align:center;box-shadow:0 8px 24px rgba(0,0,0,.5)}'+
'#gps .gfull{position:absolute;inset:0;z-index:25;background:#121418;display:flex;flex-direction:column}'+
'#gps .gfh{background:rgba(0,56,123,.95);padding:12px;padding-top:max(12px,env(safe-area-inset-top));display:flex;flex-direction:column;gap:12px}#gps .gfh .r{display:flex;align-items:center;gap:6px}#gps .gfh .r button{width:44px;height:44px;border-radius:50%;border:0;background:none;display:flex;align-items:center;justify-content:center}'+
'#gps .gfh b{display:block;font-size:20px;font-weight:900}#gps .gfh small{display:block;font-size:13px;color:#c9d6ee}#gps .gfh label{display:flex;align-items:center;gap:10px;background:#fff;border-radius:14px;padding:0 14px;min-height:52px}'+
'#gps .gfh input{flex:1 1 auto;min-width:0;border:0;outline:none;background:transparent;font:inherit;font-size:17px;color:#111;padding:0;-webkit-user-select:text;user-select:text}'+
'#gps .gfl{flex:1 1 auto;overflow:auto;padding:8px 16px 20px}#gps .gfl h4{margin:14px 0 2px;font-size:12px;font-weight:700;color:#9aa3b2;letter-spacing:.6px;text-transform:uppercase}'+
'#gps .growd{display:flex;align-items:center;gap:12px;width:100%;min-height:62px;padding:8px 4px;border:0;border-bottom:1px solid #23272f;background:none;text-align:left}#gps .growd .pi{width:40px;height:40px;border-radius:50%;background:#20242d;display:flex;align-items:center;justify-content:center;flex:0 0 auto}'+
'#gps .growd b{display:block;font-size:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#gps .growd small{display:block;font-size:13px;color:#9aa3b2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#gps .growd .k{flex:1 1 auto;min-width:0}#gps .growd.cur{opacity:.5}'+
'#gps .gwait{color:#9aa3b2;font-size:14.5px;padding:14px 4px}'+
'#gps .gerr{position:absolute;inset:0;z-index:40;background:#121418;display:flex;flex-direction:column;justify-content:center;gap:12px;padding:24px}#gps .gerr h3{margin:0;font-size:22px}#gps .gerr p{margin:0;color:#9aa3b2}#gps .gerr a,#gps .gerr button{min-height:54px;border-radius:14px;border:1px solid #2c313c;background:#20242d;display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;color:#f1f3f6;text-decoration:none}#gps .gerr .pri{background:#00387B;border-color:#00387B}'+
'#gps .gload{position:absolute;inset:0;z-index:35;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;background:#1c1f25;color:#9aa3b2}#gps .gload i{width:38px;height:38px;border:4px solid #2c313c;border-top-color:#4f8cff;border-radius:50%;animation:gsp 1s linear infinite}@keyframes gsp{to{transform:rotate(360deg)}}'+
'#gps .gvfix{position:absolute;z-index:4;width:54px;height:54px;line-height:0;pointer-events:none}#gps .gvfix[hidden]{display:none}#gps .gveh{line-height:0;pointer-events:none}#gps .maplibregl-ctrl-bottom-left,#gps .maplibregl-ctrl-bottom-right{display:none}';

function el(html){var d=document.createElement("div");d.innerHTML=html;return d.firstElementChild;}
function toast(t,ms){var o=$(".gtoast");if(o)o.remove();var d=el('<div class="gtoast" role="status">'+esc(t)+'</div>');G.root.appendChild(d);setTimeout(function(){if(d.parentNode)d.remove();},ms||2800);}

function buildUi(){
 if(!document.getElementById("gpsCss")){var s=document.createElement("style");s.id="gpsCss";s.textContent=CSS;document.head.appendChild(s);}
 var r=el('<div id="gps" role="application" aria-label="Guidage GPS">'+
  '<div class="gmap" id="gmap"></div><div class="gvfix" id="gVeh" hidden>'+ARROW+'</div>'+
  '<div class="gtop"><div class="gban" id="gBan"></div><div id="gChip"></div></div>'+
  '<div class="gbot"><div class="grow"><div class="grnd"><button type="button" data-g="mute" aria-label="Couper ou remettre la voix" id="gMute"></button><button type="button" data-g="recenter" aria-label="Recentrer sur ma position" id="gRec">'+svgI(IC.target,22,"#f1f3f6")+'</button></div>'+
  '<div class="gspd" id="gSpd"><b>--</b><small>km/h</small><span class="glim">--</span></div><button type="button" class="gpill" data-g="addr" id="gPill"><b>…</b></button><div></div></div>'+
  '<div class="gpan" id="gPan"></div></div>'+
  '<div class="gload" id="gLoad"><i></i><span id="gLoadT">Ouverture du GPS…</span></div></div>');
 document.body.appendChild(r);G.root=r;paintMute();
 r.addEventListener("click",onClick);
 r.addEventListener("input",function(ev){if(ev.target&&ev.target.id==="gDestQ")destSearch(ev.target.value);});
}
function setLoad(t){var l=$("#gLoad");if(t===null){if(l)l.remove();return;}if(!l){l=el('<div class="gload" id="gLoad"><i></i><span id="gLoadT"></span></div>');G.root.appendChild(l);}var s=$("#gLoadT");if(s)s.textContent=t;}
var RASTER={version:8,sources:{osm:{type:"raster",tiles:["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],tileSize:256,maxzoom:19}},layers:[{id:"bg",type:"background",paint:{"background-color":"#1c1f25"}},{id:"osm",type:"raster",source:"osm",paint:{"raster-brightness-max":0.5,"raster-saturation":-0.7,"raster-contrast":0.1}}]};
function showErr(msg){
 var L=G.opts.links||{};var d=el('<div class="gerr"><h3>GPS indisponible</h3><p>'+esc(msg)+'</p><button type="button" class="pri" data-g="retry">Réessayer</button>'+
  (L.waze?'<a href="'+L.waze+'"'+(L.app?'':' target="_blank" rel="noopener"')+'>Ouvrir dans Waze</a>':'')+(L.gmaps?'<a href="'+L.gmaps+'"'+(L.app?'':' target="_blank" rel="noopener"')+'>Ouvrir dans Google Maps</a>':'')+
  '<button type="button" data-g="close">Fermer</button></div>');
 var o=$(".gerr");if(o)o.remove();setLoad(null);G.root.appendChild(d);
}
function paintMute(){var b=$("#gMute");if(b){b.innerHTML=svgI(G.mute?IC.mute:IC.vol,22,G.mute?"#ff9a9d":"#f1f3f6");b.classList.toggle("on",!!G.mute);}}
function paintRec(){var b=$("#gRec");if(b)b.classList.toggle("on",!G.follow);vehMode();}
function vehMode(){var fx=$("#gVeh"),on=!!(G.follow&&G.mapReady&&G.R);if(fx)fx.hidden=!on;if(G.veh){if(!on&&G.disp){G.veh.setLngLat([G.disp[1],G.disp[0]]);G.veh.setRotation(G.dispH||0);}var e=G.veh.getElement();if(e)e.style.visibility=on||!G.R?"hidden":"visible";}}

function paintBanner(){
 var b=$("#gBan");if(!b||!G.R)return;var R=G.R,k=G.next,h;
 if(G.arrived){h='<div class="gb1">'+svgI(IC.flag,56,"#fff",2.7)+'<div style="min-width:0"><div class="d" style="font-size:30px">Arrivé</div><div class="s">'+esc(G.dest.nom||"Destination")+'</div></div></div>';b.innerHTML=h;return;}
 if(G.rerouting){b.innerHTML='<div class="gb1">'+svgI(IC.straight,56,"#fff",2.7)+'<div><div class="d" style="font-size:26px">Recalcul…</div><div class="l">Nouvel itinéraire en cours</div></div></div>';return;}
 if(k<0||!R.man[k]){b.innerHTML='<div class="gb1">'+svgI(IC.straight,56,"#fff",2.7)+'<div><div class="d">'+fmtDist(R.total-G.along)+'</div><div class="l">Continue</div></div></div>';return;}
 var m=R.man[k],d=Math.max(0,m.d-G.along),st=manStreet(R,k);
 h='<div class="gb1">'+svgI(IC[manIcon(m.type)],56,"#fff",2.7)+'<div style="display:flex;flex-direction:column;gap:1px;min-width:0"><div class="d">'+fmtDist(d)+'</div><div class="l">'+esc(manLabel(m))+'</div>'+(st?'<div class="s">'+esc(st)+'</div>':'')+'</div></div>';
 var k2=m.type===26?k+2:k+1,m2=R.man[k2];
 if(m2&&m2.d-m.d<150&&!(m2.type>=4&&m2.type<=6&&m2.d-m.d<20)){var s2=manStreet(R,k2);h+='<div class="gb2"><span>Puis</span>'+svgI(IC[manIcon(m2.type)],20,"#fff",2.4)+'<span>'+esc(lcFirst(manLabel(m2)).replace(/^tourne /,"").replace(/^serre /,"légèrement ")+(s2?" · "+s2:""))+'</span></div>';}
 b.innerHTML=h;
}
function chipHtml(k,t1,t2,border){return'<div class="gchip"><div style="border-color:'+border+'"><div class="ci" style="background:'+COL[k][0]+'">'+glyph(k,22)+'</div><div><b>'+esc(t1)+'</b><small>'+esc(t2)+'</small></div></div></div>';}
function paintChip(){
 var c=$("#gChip");if(!c)return;
 if(G.rec){c.innerHTML=chipHtml("pothole","Enregistrement en cours","Route dégradée · "+fmtDist(lenM(G.rec.pts)),"rgba(242,194,0,.55)");return;}
 var hz=upcoming();if(!hz){c.innerHTML="";return;}
 var d=hz.along-G.along;c.innerHTML=chipHtml(KIND[hz.t],NOM[hz.t],(d<15?"maintenant":"dans "+fmtDist(d))+(hz.t==="ralentisseur"?" · ralentis":""),"rgba(255,255,255,.28)");
}
function curEdge(){var E=G.R&&G.R.edges;if(!E)return null;for(var i=0;i<E.length;i++)if(E[i].a<=G.along+0.5&&G.along<E[i].b)return E[i];return E.length&&G.along>=E[E.length-1].a?E[E.length-1]:null;}
function roadName(along){var E=G.R&&G.R.edges;if(E){for(var i=0;i<E.length;i++)if(E[i].a<=along+0.5&&along<E[i].b&&E[i].name)return E[i].name;}
 var R=G.R;if(R){for(var j=R.man.length-1;j>=0;j--)if(R.man[j].d<=along+1){var s=(R.man[j].street_names&&R.man[j].street_names[0])||(R.man[j].begin_street_names&&R.man[j].begin_street_names[0]);if(s)return s;break;}}
 return"";}
function paintSpeed(){
 var s=$("#gSpd");if(!s)return;var stale=!G.lastFixT||now()-G.lastFixT>5000||(G.acc&&G.acc>60);
 var v=G.speed==null?"--":String(Math.max(0,Math.round(G.speed)));var e=curEdge(),lim=e&&e.lim?String(e.lim):"--";
 s.className="gspd"+(stale?" dim":"");s.innerHTML='<b>'+v+'</b><small>km/h</small><span class="glim">'+lim+'</span>';
}
function paintPill(){
 var p=$("#gPill");if(!p)return;var html;
 if(G.addr&&now()-G.addr.t<9000)html='<b>'+esc(G.addr.l1)+'</b>'+(G.addr.l2?'<small>'+esc(G.addr.l2)+'</small>':'');
 else{G.addr=null;var n=roadName(G.along)||"Route sans nom",w=n.lastIndexOf(" ");
 html='<b>'+(w>0?esc(n.slice(0,w))+' <span style="white-space:nowrap">'+esc(n.slice(w+1))+' '+svgI(IC.chev,15,"#9aa3b2",2.6).replace('<svg ','<svg style="vertical-align:-2px" ')+'</span>':esc(n)+' '+svgI(IC.chev,15,"#9aa3b2",2.6).replace('<svg ','<svg style="vertical-align:-2px" '))+'</b>';}
 if(html!==G._pill){G._pill=html;p.innerHTML=html;}
}
function remTime(){var R=G.R,a=G.along,t=0;R.man.forEach(function(m){if(m.e<=a)return;if(m.d>=a)t+=m.time||0;else t+=(m.time||0)*(m.e-a)/m.lenM;});return t;}
function paintPanel(force){
 var p=$("#gPan");if(!p)return;var mode=G.rec?"rec":(G.arrived?"arr":"nav"),h;
 var rt=G.R?remTime():0,rd=G.R?Math.max(0,G.R.total-G.along):0,t1=G.R?hhmm(now()+rt*1000):"--:--",t2=G.R?Math.max(1,Math.round(rt/60))+" min · "+fmtDist(rd):"Calcul…";
 if(mode===G.panMode&&!force){var a=$("#gEtaT"),b=$("#gEtaM"),c=$("#gDestN");if(a&&a.textContent!==t1)a.textContent=t1;if(b&&b.textContent!==t2)b.textContent=t2;if(c&&c.textContent!==(G.dest.nom||"Destination"))c.textContent=G.dest.nom||"Destination";return;}
 G.panMode=mode;var attr='<div class="gattr">© OpenStreetMap · OpenFreeMap · Valhalla</div>';
 var sig='<div class="gbtns"><button type="button" class="gsig" data-g="sig">'+glyph("danger",22,"#17130a","#f5a524")+'<span>Signaler</span></button><button type="button" class="gstop" data-g="stop">Arrêter</button></div>';
 if(mode==="rec")h='<div style="font-size:14.5px;color:#9aa3b2;text-align:center">Touche quand la route redevient correcte.</div><button type="button" class="gbig" style="background:#f2c200;color:#2b2300" data-g="recEnd">'+svgI(IC.stop,22,"#2b2300",2.6)+'<span>Fin de la route dégradée</span></button><button type="button" class="gsec" data-g="recCancel">Annuler le signalement</button>';
 else if(mode==="arr")h='<button type="button" class="gbig" style="background:#00387B;color:#fff" data-g="finish">Terminer le guidage</button>'+sig;
 else h='<div class="geta"><div><div class="t" id="gEtaT">'+t1+'</div><div class="m" id="gEtaM">'+esc(t2)+'</div></div><div class="gdest"><b id="gDestN">'+esc(G.dest.nom||"Destination")+'</b>'+(G.opts.label?'<span class="gprof"><i></i><span>'+esc(G.opts.label)+'</span></span>':'')+'</div></div>'+sig;
 p.innerHTML=h+attr;
}

/* ---------- voix ---------- */
var voiceFr=null;
function pickVoice(){try{var v=speechSynthesis.getVoices();voiceFr=v.filter(function(x){return/^fr(-|_)FR/i.test(x.lang);})[0]||v.filter(function(x){return/^fr/i.test(x.lang);})[0]||null;}catch(e){}}
if(window.speechSynthesis){pickVoice();try{speechSynthesis.onvoiceschanged=pickVoice;}catch(e){}}
function say(t,prio){if(!G||G.mute||!t||!window.speechSynthesis)return;try{if(prio)speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(String(t));u.lang="fr-FR";if(voiceFr)u.voice=voiceFr;u.rate=1;speechSynthesis.speak(u);}catch(e){}}
function voice(){
 var R=G.R;if(!R||G.arrived||G.rerouting||G.quiet)return;var v=Math.max(G.speed||0,30)/3.6;
 var k=G.next,m=R.man[k];
 if(m){var d=m.d-G.along,farD=v>19?800:(v>13?400:250),nearD=Math.max(45,v*5.5);
  if(!m._far&&d<=farD&&d>nearD*1.8&&d>120){m._far=1;say("Dans "+sayDist(d)+", "+lcFirst(m.verbal_transition_alert_instruction||m.verbal_pre_transition_instruction||m.instruction));}
  if(!m._near&&d<=nearD){m._near=1;m._far=1;say(m.verbal_pre_transition_instruction||m.instruction,true);}}
 var hz=upcoming();if(hz&&!hz.said){var dh=hz.along-G.along,lim=v>19?400:220;if(dh<=lim&&dh>25){hz.said=1;say(DIT[hz.t]+" dans "+sayDist(dh)+".");}}
}

/* ---------- dangers sur le trajet ---------- */
function upcoming(){var L=G.haz||[],v=Math.max(G.speed||0,30)/3.6,win=v>19?700:400;
 for(var i=0;i<L.length;i++){var d=L[i].along-G.along;if(d<-8)continue;if(d>win)return null;if(L[i].t==="degradee"&&L[i].end<G.along)continue;return L[i];}return null;}
function teamZones(){return(A.state.zones||[]).filter(function(z){return z.type==="ralentisseurs"||z.type==="degradee";});}
function computeHazards(){
 var R=G.R;if(!R)return;var H=[],seen={};
 function onR(p,tol){var pr=project(R,p,null);return pr.off<=(tol||14)?pr:null;}
 (G.bumps||[]).forEach(function(q){var pr=onR(q,12);if(pr)H.push({t:"ralentisseur",along:pr.along,p:q,id:"b"+q[0]+"_"+q[1]});});
 teamZones().forEach(function(z){var g=A.zGeom(z);if(!g)return;
  if(g.k==="pts")g.c.forEach(function(q,ix){if((G.bumps||[]).some(function(o){return A.distM(o,q)<8;}))return;var pr=onR(q,14);if(pr)H.push({t:"ralentisseur",along:pr.along,p:q,id:"z"+z.id+"_"+ix,z:z});});
  else if(g.k==="line"&&g.c.length>1){var a=onR(g.c[0],20),b=onR(g.c[g.c.length-1],20);if(a&&b){var s=Math.min(a.along,b.along),e=Math.max(a.along,b.along);if(e-s>8)H.push({t:"degradee",along:s,end:e,id:"z"+z.id,z:z});}}});
 (G.alerts||[]).forEach(function(al){var p=al.trace&&al.trace.length?al.trace[0]:[al.lat,al.lon],pr=onR(p,al.trace?20:25);if(pr)H.push({t:al.type,along:pr.along,id:"a"+al.id,al:al});});
 H.sort(function(x,y){return x.along-y.along;});
 var old={};(G.haz||[]).forEach(function(h){if(h.said)old[h.id]=1;});H.forEach(function(h){if(old[h.id])h.said=1;});
 G.haz=H;
}

/* ---------- carte : couches et repères ---------- */
var W_CAS=["interpolate",["exponential",1.5],["zoom"],12,8,15,13,17,21,19,38],W_FIL=["interpolate",["exponential",1.5],["zoom"],12,4.5,15,8,17,13,19,24],
 W_OC=["interpolate",["exponential",1.5],["zoom"],12,4,15,6.5,17,10,19,16],W_OF=["interpolate",["exponential",1.5],["zoom"],12,2,15,4,17,6.5,19,10],
 W_DOT=["interpolate",["exponential",1.5],["zoom"],12,2.5,15,4.2,17,6.8,19,12.5],W_DOTE=["interpolate",["exponential",1.5],["zoom"],12,3.8,15,6,17,9,19,15.5],W_ODOT=["interpolate",["exponential",1.5],["zoom"],12,1.5,15,2.6,17,4.2,19,6.8];
var KCOL=["match",["get","k"],"ralentissement","#ff8a1f","arret","#f03e3e","#8b95a6"];
function fc(f){return{type:"FeatureCollection",features:f||[]};}
function line(c,props){return{type:"Feature",properties:props||{},geometry:{type:"LineString",coordinates:c.map(function(p){return[p[1],p[0]];})}};}
function addLayers(){
 var m=G.map,ly=m.getStyle().layers||[],before,last=-1;ly.forEach(function(l,i){if(l.type!=="symbol")last=i;});
 for(var i=last+1;i<ly.length;i++){if(ly[i].type==="symbol"){before=ly[i].id;break;}}
 ["gRoute","gOnA","gOffA","gOnD","gOffD","gRecD"].forEach(function(id){m.addSource(id,{type:"geojson",data:fc()});});
 function L(o){m.addLayer(o,before);}
 var round={"line-cap":"round","line-join":"round"};
 L({id:"gOffAc",type:"line",source:"gOffA",layout:round,paint:{"line-color":"#121418","line-width":W_OC}});
 L({id:"gOffDc",type:"line",source:"gOffD",layout:round,paint:{"line-color":"#121418","line-width":W_OC}});
 L({id:"gOffAf",type:"line",source:"gOffA",layout:round,paint:{"line-color":KCOL,"line-width":W_OF}});
 L({id:"gOffDf",type:"line",source:"gOffD",layout:round,paint:{"line-color":"#4b525f","line-width":W_OF}});
 L({id:"gOffDd",type:"line",source:"gOffD",layout:round,paint:{"line-color":"#ffd43b","line-width":W_ODOT,"line-dasharray":[0,2.4]}});
 L({id:"gRc",type:"line",source:"gRoute",layout:round,paint:{"line-color":"#0c2f73","line-width":W_CAS}});
 L({id:"gRf",type:"line",source:"gRoute",layout:round,paint:{"line-color":"#4c8dff","line-width":W_FIL}});
 L({id:"gOnAf",type:"line",source:"gOnA",layout:{"line-cap":"butt","line-join":"round"},paint:{"line-color":KCOL,"line-width":W_FIL}});
 L({id:"gOnDe",type:"line",source:"gOnD",layout:round,paint:{"line-color":"#2b2300","line-width":W_DOTE,"line-dasharray":[0,1.6]}});
 L({id:"gOnDd",type:"line",source:"gOnD",layout:round,paint:{"line-color":"#ffd43b","line-width":W_DOT,"line-dasharray":[0,2.2]}});
 L({id:"gRecE",type:"line",source:"gRecD",layout:round,paint:{"line-color":"#2b2300","line-width":W_DOTE,"line-dasharray":[0,1.6]}});
 L({id:"gRecDd",type:"line",source:"gRecD",layout:round,paint:{"line-color":"#ffd43b","line-width":W_DOT,"line-dasharray":[0,2.2]}});
 m.addSource("gPins",{type:"geojson",data:fc()});
 m.addLayer({id:"gPinsL",type:"symbol",source:"gPins",layout:{"icon-image":["get","img"],"icon-anchor":"bottom","icon-allow-overlap":true,"icon-ignore-placement":true,"icon-pitch-alignment":"viewport","icon-rotation-alignment":"viewport","icon-size":["interpolate",["linear"],["zoom"],13,0.7,16,0.9,18,1]}});
 m.on("click","gPinsL",function(e){var f=e.features&&e.features[0],x=f&&G.pinData&&G.pinData[f.properties.id];if(x)infoCard(x);});
 m.on("mouseenter","gPinsL",function(){m.getCanvas().style.cursor="pointer";});m.on("mouseleave","gPinsL",function(){m.getCanvas().style.cursor="";});
}
function src(id,data){if(!G.map||!G.mapReady)return;var s=G.map.getSource(id);if(s)s.setData(data);}
function setRouteData(){var R=G.R;if(!R)return;src("gRoute",fc([line(slice(R,Math.max(0,G.along-25),R.total))]));}
function refreshFeatures(){
 if(!G.mapReady)return;var R=G.R,onA=[],offA=[],onD=[],offD=[];
 (G.alerts||[]).forEach(function(al){if(!al.trace||al.trace.length<2||(al.type!=="arret"&&al.type!=="ralentissement"))return;
  var a=R&&project(R,al.trace[0],null),b=R&&project(R,al.trace[al.trace.length-1],null);
  if(a&&b&&a.off<20&&b.off<20&&Math.abs(b.along-a.along)>5)onA.push(line(slice(R,Math.min(a.along,b.along),Math.max(a.along,b.along)),{k:al.type}));else offA.push(line(al.trace,{k:al.type}));});
 teamZones().forEach(function(z){var g=A.zGeom(z);if(!g||g.k!=="line"||g.c.length<2)return;
  var a=R&&project(R,g.c[0],null),b=R&&project(R,g.c[g.c.length-1],null);
  if(a&&b&&a.off<20&&b.off<20&&Math.abs(b.along-a.along)>5)onD.push(line(slice(R,Math.min(a.along,b.along),Math.max(a.along,b.along))));else offD.push(line(g.c));});
 src("gOnA",fc(onA));src("gOffA",fc(offA));src("gOnD",fc(onD));src("gOffD",fc(offD));
 refreshMarkers();
}
function loadPins(){
 return Promise.all(Object.keys(COL).map(function(k){return new Promise(function(res){
  var img=new Image(80,100);img.onload=function(){try{if(G&&G.map&&!G.map.hasImage("pin-"+k))G.map.addImage("pin-"+k,img,{pixelRatio:2});}catch(e){}res();};img.onerror=function(){res();};
  img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(pinSvg(k).replace('<svg width="40" height="50"','<svg xmlns="http://www.w3.org/2000/svg" width="80" height="100"'));});}));}
function refreshMarkers(){
 if(!G.mapReady)return;var F=[];G.pinData={};
 function add(id,k,p,x){G.pinData[id]=x;F.push({type:"Feature",properties:{id:id,img:"pin-"+k},geometry:{type:"Point",coordinates:[p[1],p[0]]}});}
 (G.haz||[]).forEach(function(h){if(h.t==="degradee"||h.al)return;add(h.id,"bump",h.p,{k:"bump",h:h,z:h.z});});
 teamZones().forEach(function(z){var g=A.zGeom(z);if(g&&g.k==="line"&&g.c.length>1)add("zl"+z.id,"pothole",g.c[Math.floor(g.c.length/2)],{k:"pothole",z:z});});
 (G.alerts||[]).forEach(function(al){var p=al.trace&&al.trace.length>1?al.trace[Math.floor(al.trace.length/2)]:[al.lat,al.lon];add("a"+al.id,KIND[al.type],p,{k:KIND[al.type],al:al});});
 src("gPins",fc(F));
}
function setRecData(){src("gRecD",fc(G.rec&&G.rec.pts.length>1?[line(G.rec.pts)]:[]));}

/* ---------- caméra et position ---------- */
function zoomFor(kmh){kmh=kmh||0;return kmh<30?17.6:(kmh<60?17:(kmh<90?16.2:15.5));}
function setPad(){if(!G||!G.map)return;var h=G.root.clientHeight||window.innerHeight,gb=G.root.querySelector(".gbot"),bh=gb?gb.offsetHeight:230,target=Math.max(h*0.45,h-bh-60),top=Math.max(0,Math.round(2*target-h));
 var w=G.root.clientWidth||window.innerWidth,fx=$("#gVeh");if(fx){fx.style.left=Math.round(w/2-27)+"px";fx.style.top=Math.round(target-27)+"px";}
 if(top===G._padTop)return;G._padTop=top;try{G.map.setPadding({top:top,bottom:0,left:0,right:0});}catch(e){}}
function animateTo(p,h){var t=now(),cur=G.disp||p,ch=G.dispH==null?h:G.dispH;G.anim={f:cur,t:p,hf:ch,ht:h,t0:t,dur:G.lastAnimT?Math.min(1600,Math.max(500,(t-G.lastAnimT)*1.1)):700};G.lastAnimT=t;if(!G.raf)G.raf=requestAnimationFrame(frame);}
function frame(){
 if(!G){return;}G.raf=null;var a=G.anim;if(!a)return;var k=Math.min(1,(now()-a.t0)/a.dur);
 var p=[a.f[0]+(a.t[0]-a.f[0])*k,a.f[1]+(a.t[1]-a.f[1])*k],h=(a.hf+angDiff(a.hf,a.ht)*k+360)%360;G.disp=p;G.dispH=h;
 G.zoom=G.zoom==null?zoomFor(G.speed):G.zoom+(zoomFor(G.speed)-G.zoom)*0.03;
 if(G.follow&&G.map){try{G.map.jumpTo({center:[p[1],p[0]],bearing:h,zoom:G.zoom,pitch:50});}catch(e){}}
 else if(G.veh){G.veh.setLngLat([p[1],p[0]]);G.veh.setRotation(h);}
 if(k<1)G.raf=requestAnimationFrame(frame);
}
function recenter(){G.follow=true;paintRec();if(G.anim)G.anim.t0=now()-G.anim.dur;if(!G.raf)G.raf=requestAnimationFrame(frame);}

function onFix(c){
 if(!G)return;var p=[c.lat,c.lon],t=c.t||now();
 var sp=(c.speed!=null&&!isNaN(c.speed)&&c.speed>=0)?c.speed:null;
 if(sp==null&&G.last){var dt=(t-G.last.t)/1000;if(dt>0.4&&dt<6)sp=A.distM(G.last.p,p)/dt;}
 if(sp!=null)G.speed=G.speed==null?sp*3.6:G.speed*0.35+sp*3.6*0.65;
 G.acc=c.acc||0;G.lastFixT=now();G.last={p:p,t:t};G.pos=p;try{A.ui.lastPos=p;}catch(e){}
 if(!G.R){G.disp=G.disp||p;return;}
 var R=G.R,pr=project(R,p,G.prj?G.prj.i:null),tol=Math.max(30,Math.min(60,(c.acc||0)*1.3)),on=pr.off<=tol;G.prj=pr;
 if(on){G.offCount=0;var na=pr.along;if(na<G.along&&G.along-na<15)na=G.along;if((sp==null||sp<0.8)&&Math.abs(na-G.along)<10)na=G.along;G.along=na;}
 else{G.offCount=(G.offCount||0)+1;if(G.offCount>=3&&!G.rerouting&&now()-(G.lastReroute||0)>12000&&!G.arrived)reroute("off");}
 var gh=(c.heading!=null&&!isNaN(c.heading)&&(sp||0)>3)?c.heading:null,hd;
 if(on)hd=bearingAt(R,G.along);else if(gh!=null)hd=G.heading==null?gh:(G.heading+angDiff(G.heading,gh)*0.5+360)%360;else hd=G.heading||0;G.heading=hd;
 if(!on&&(sp==null||sp<0.8)&&G.disp&&A.distM(G.disp,p)<10)p=G.disp;
 animateTo(on?pointAt(R,G.along):p,hd);
 if(G.rec){var lp=G.rec.pts[G.rec.pts.length-1],q=on?pr.q:p;if(!lp||A.distM(lp,q)>5){G.rec.pts.push(q);setRecData();}}
 update();
}
function update(){
 var R=G.R;if(!R)return;
 if(!G.arrived&&!G.rerouting){var rem=R.total-G.along,dd=G.pos?A.distM(G.pos,[G.dest.lat,G.dest.lon]):1e9;if((rem<25&&(G.prj&&G.prj.off<40))||dd<30){arrive();return;}}
 var k=-1;for(var i=0;i<R.man.length;i++){var t=R.man[i].type;if(t>=1&&t<=3)continue;if(R.man[i].d>G.along+2){k=i;break;}}G.next=k;
 paintBanner();paintChip();paintSpeed();paintPill();paintPanel();setPad();setRouteData();voice();checkConfirm();
}
function arrive(){G.arrived=true;say("Vous êtes arrivé à destination.",true);paintBanner();paintChip();paintPanel();}

/* ---------- itinéraires ---------- */
function vBody(x){return Object.assign({costing:"auto",language:"fr-FR",units:"kilometers",directions_options:{language:"fr-FR",units:"kilometers"}},x);}
function tripToRoute(j){var leg=j&&j.trip&&j.trip.legs&&j.trip.legs[0];if(!leg||!leg.shape)throw new Error("Aucun itinéraire trouvé.");var pts=A.decode6(leg.shape);if(pts.length<2)throw new Error("Itinéraire vide.");return buildRoute(pts,leg.maneuvers||[],leg.summary||j.trip.summary,leg.shape);}
function exclusions(){var polys=[],o=G.opts;
 (A.state.zones||[]).forEach(function(z){var g=A.zGeom(z);if(!g||g.k==="pts"||(o.zoneTypes||[]).indexOf(z.type)<0)return;if(z.etab&&z.etab!==o.destEtab)return;
  if(G.pos&&(g.k==="line"?nearTrace(g.c,G.pos,60):A.distM([g.lat,g.lon],G.pos)<g.r+40))return;
  if(g.k==="line")polys=polys.concat(A.linePolys(g.c,10));else polys.push(A.circlePoly(g.lat,g.lon,g.r));});
 (G.alerts||[]).forEach(function(al){if(al.type!=="arret"||!al.trace||al.trace.length<2)return;if(G.pos&&nearTrace(al.trace,G.pos,60))return;polys=polys.concat(A.linePolys(al.trace,12));});
 return polys.slice(0,60);}
function routeFrom(start){
 var base=vBody({locations:[{lat:r6(start[0]),lon:r6(start[1])},{lat:G.dest.lat,lon:G.dest.lon}]});
 if(G.heading!=null&&(G.speed||0)>8){base.locations[0].heading=Math.round(G.heading);base.locations[0].heading_tolerance=60;}
 var ex=exclusions();
 var p=ex.length?A.valhalla("route",Object.assign({},base,{exclude_polygons:ex})).catch(function(){return A.valhalla("route",base);}):A.valhalla("route",base);
 return p.then(tripToRoute);}
function traceRoute(shape){return A.valhalla("trace_route",vBody({encoded_polyline:shape,shape_match:"edge_walk"})).then(tripToRoute);}
function setRoute(R){
 G.R=R;G.prj=null;G.next=-1;G.offCount=0;
 if(G.pos){var pr=project(R,G.pos,null);G.prj=pr;G.along=pr.along;}else G.along=0;
 if(G.sim)G.simAlong=G.along;
 computeHazards();refreshFeatures();setRouteData();update();vehMode();loadEdges(R);loadBumps(R);
}
function reroute(why){
 if(!G||!G.pos||G.rerouting)return;G.rerouting=true;G.lastReroute=now();paintBanner();
 if(why==="off")say("Recalcul de l'itinéraire.",true);
 routeFrom(G.pos).then(function(R){if(!G)return;G.rerouting=false;setRoute(R);if(why==="jam")say("Bouchon signalé sur le trajet : nouvel itinéraire.",true);if(why==="dest")say("Nouvelle destination : "+(G.dest.nom||"")+".",true);},
  function(){if(!G)return;G.rerouting=false;G.offCount=0;paintBanner();toast("Recalcul impossible pour l'instant : réseau ou serveur indisponible.");});
}
function loadEdges(R){
 A.valhalla("trace_attributes",{encoded_polyline:R.shape,shape_match:"edge_walk",costing:"auto",filters:{attributes:["edge.speed_limit","edge.names","edge.begin_shape_index","edge.end_shape_index","shape"],action:"include"}}).then(function(t){
  if(!G||G.R!==R)return;var sp=A.decode6(t.shape||""),out=[],hint=null;if(!sp.length)sp=R.pts;
  (t.edges||[]).forEach(function(e){var pa=sp[e.begin_shape_index],pb=sp[e.end_shape_index];if(!pa||!pb)return;var a=project(R,pa,hint);hint=a.i;var b=project(R,pb,hint);hint=b.i;
   var l=(typeof e.speed_limit==="number"&&e.speed_limit>=5&&e.speed_limit<=150)?Math.round(e.speed_limit):null;
   out.push({a:a.along,b:Math.max(b.along,a.along+0.1),lim:l,name:(e.names&&e.names[0])||""});});
  R.edges=out;paintSpeed();paintPill();
 }).catch(function(){});
}
function loadBumps(R){
 var so=90,we=180,no=-90,ea=-180;R.pts.forEach(function(q){if(q[0]<so)so=q[0];if(q[0]>no)no=q[0];if(q[1]<we)we=q[1];if(q[1]>ea)ea=q[1];});
 A.getBumps(so-0.002,we-0.002,no+0.002,ea+0.002).then(function(b){if(!G||G.R!==R)return;G.bumps=(b&&b.pts)||[];computeHazards();refreshMarkers();}).catch(function(){});
}
function nextNode(a){var E=G.R&&G.R.edges,end=null;
 if(E){for(var i=0;i<E.length;i++){if(E[i].b>a+30){end=E[i].b;break;}}}
 if(end==null){end=a+200;var m=G.R.man;for(var j=0;j<m.length;j++)if(m[j].d>a+30){end=Math.min(end,m[j].d);break;}}
 return Math.min(end,a+600,G.R.total);}

/* ---------- alertes de l'équipe ---------- */
function normAlert(r){var tr=Array.isArray(r.trace)&&r.trace.length>1?r.trace:null;return{id:r.id,type:r.type,lat:r.lat,lon:r.lon,trace:tr,cree:Date.parse(r.cree_le)||now(),par:r.cree_par||"",exp:Date.parse(r.expire_le)||now()+3600e3};}
function pollAlerts(){
 if(!G||!A.isCloud())return;var iso=new Date().toISOString();
 A.api("GET","alertes?select=*&expire_le=gt."+encodeURIComponent(iso)+"&order=cree_le.desc&limit=300").then(function(rows){if(!G)return;
  var loc=(G.alerts||[]).filter(function(a){return a._local;}),ids={};var L=(rows||[]).map(normAlert);L.forEach(function(a){ids[a.id]=1;});
  loc.forEach(function(a){if(!ids[a.id])L.push(a);});
  var before=(G.alerts||[]).map(function(a){return a.id;}).join(",");G.alerts=L;onAlerts(before);
 }).catch(function(){});
 if(!G.cleaned){G.cleaned=1;A.api("DELETE","alertes?expire_le=lt."+encodeURIComponent(new Date(now()-864e5).toISOString())).catch(function(){});}
}
function onAlerts(before){
 G.alerts=G.alerts.filter(function(a){return a.exp>now();});
 computeHazards();refreshFeatures();paintChip();
 if(G.R&&!G.rerouting&&!G.arrived&&now()-(G.lastReroute||0)>20000){
  var known=","+(before||"")+",",hit=G.haz.filter(function(h){return h.al&&h.al.type==="arret"&&known.indexOf(","+h.al.id+",")<0&&h.along-G.along>200&&h.al.par!==A.me();})[0];
  if(hit)reroute("jam");}
}
function reportPos(){var pr=G.prj,on=pr&&pr.off<20;return{p:on?pr.q:(G.pos||G.disp),along:on?G.along:null};}
function reportAlert(type,rp){
 var p=rp.p;if(!p){toast("Position GPS pas encore trouvée.");return;}
 var row={id:A.uid(),type:type,lat:r6(p[0]),lon:r6(p[1]),trace:null,expire_le:new Date(now()+3600e3).toISOString()};
 if((type==="arret"||type==="ralentissement")&&G.R&&rp.along!=null){var a=rp.along,b=nextNode(a);if(b-a>10)row.trace=simplify(slice(G.R,a,b),2).map(r5);}
 var al=normAlert(Object.assign({},row,{cree_le:new Date().toISOString(),cree_par:A.me()}));al._local=true;al.asked=1;G.alerts.push(al);computeHazards();refreshFeatures();
 if(!A.isCloud()){toast("Signalé sur ce téléphone seulement (connecte-toi à l'équipe pour le partager).",3500);return;}
 A.api("POST","alertes",row,"return=minimal").then(function(){al._local=false;toast(NOM[type]+" : signalé à l'équipe pour 1 h.");},function(e){toast(A.netErr(e)?"Pas de réseau : signalement non envoyé.":"Envoi impossible : "+e.message,3500);});
}
function alertAct(al,act){
 closeCard();if(!al)return;al.asked=1;var jam=al.type==="arret"||al.type==="ralentissement";
 if(act==="gone"){G.alerts=G.alerts.filter(function(x){return x!==al;});computeHazards();refreshFeatures();
  if(A.isCloud()&&!al._local)A.api("DELETE","alertes?id=eq."+encodeURIComponent(al.id)).then(function(){toast("Merci : alerte retirée pour toute l'équipe.");},function(){toast("Pas de réseau : alerte retirée sur ce téléphone seulement.");});else toast("Alerte retirée.");return;}
 var patch={expire_le:new Date(now()+3600e3).toISOString()};
 if(jam&&act==="still"){patch.type="arret";al.type="arret";}else if(jam&&act==="slow"){patch.type="ralentissement";al.type="ralentissement";}
 al.exp=now()+3600e3;computeHazards();refreshFeatures();
 if(A.isCloud()&&!al._local)A.api("PATCH","alertes?id=eq."+encodeURIComponent(al.id),patch,"return=minimal").then(function(){toast("Merci : alerte mise à jour pour 1 h.");},function(){});
}
function checkConfirm(){
 if(G.card||G.rec||!G.haz)return;var me=A.me();
 for(var i=0;i<G.haz.length;i++){var h=G.haz[i];if(!h.al||h.al.asked||h.al.par===me)continue;var d=h.along-G.along;if(d<=70&&d>=-10){h.al.asked=1;confirmCard(h.al,d);return;}}
}

/* ---------- fenêtres ---------- */
function closeCard(){var c=$(".gcard");if(c)c.remove();G.card=null;if(G.cardT){clearInterval(G.cardT);G.cardT=null;}}
function cardHead(k,t1,t2){return'<div class="hd"><div class="ci" style="background:'+COL[k][0]+'">'+glyph(k,30)+'</div><div style="min-width:0"><b>'+esc(t1)+'</b><small>'+esc(t2)+'</small></div></div>';}
function who(al){return(al.par?(al.par===A.me()?"toi":A.nameOf(al.par)):"l'équipe")+", "+ago(al.cree);}
function confirmCard(al,d,tap){
 closeCard();var jam=al.type==="arret"||al.type==="ralentissement";
 var h=cardHead(KIND[al.type],NOM[al.type]+(d>15?" dans "+fmtDist(d):""),"Signalé par "+who(al))+'<div class="gq">Et maintenant ?</div>'+
  (jam?'<div class="g3"><button type="button" style="background:#e03131;color:#fff" data-g="cStill">Toujours à l\'arrêt</button><button type="button" style="background:#f08c00;color:#1b1405" data-g="cSlow">Roule au pas</button><button type="button" style="background:#173225;border:2px solid #2fbf71;color:#c8f5dc" data-g="cGone">Dégagé</button></div>'
   :'<div class="g2"><button type="button" style="background:'+COL[KIND[al.type]][0]+';color:#fff" data-g="cStill">Toujours là</button><button type="button" style="background:#173225;border:2px solid #2fbf71;color:#c8f5dc" data-g="cGone">Plus là</button></div>')+
  (tap?'<button type="button" class="gsec" data-g="cClose">Fermer</button>':'<div style="display:flex;flex-direction:column;gap:6px"><div class="gbar"><i style="width:100%"></i></div><div style="font-size:12.5px;color:#9aa3b2;text-align:center" id="gCardT">Se ferme tout seul dans 8 s</div></div>');
 var c=el('<div class="gcard" role="dialog" aria-label="Alerte toujours là ?">'+h+'</div>');G.root.appendChild(c);G.card={al:al};
 if(tap)return;var left=8;setTimeout(function(){var bi=c.querySelector(".gbar i");if(bi){bi.style.transition="width 8s linear";bi.style.width="0%";}},30);
 G.cardT=setInterval(function(){left--;var t=document.getElementById("gCardT");if(t)t.textContent="Se ferme tout seul dans "+left+" s";if(left<=0)closeCard();},1000);
}
function infoCard(x){
 closeCard();var h,al=x.al;
 if(al){confirmCard(al,0,true);return;}
 {var z=x.z||(x.h&&x.h.z);h=cardHead(x.k,x.k==="bump"?"Ralentisseur":"Route dégradée",z?(z.nom+(z.majPar?" · enregistré par "+A.nameOf(z.majPar):"")):"Données OpenStreetMap")+'<button type="button" class="gsec" data-g="cClose">Fermer</button>';}
 var c=el('<div class="gcard" role="dialog">'+h+'</div>');G.root.appendChild(c);G.card={al:al};
}
function closeScrim(){var s=$(".gscrim");if(s)s.remove();}
function tile(g,k,label,sub,wide){return'<button type="button" class="gtile'+(wide?" w":"")+'" data-g="rep" data-k="'+g+'"><span class="ti" style="background:'+COL[k][0]+'">'+glyph(k,26)+'</span><span><b>'+esc(label)+'</b>'+(sub?'<small>'+esc(sub)+'</small>':'')+'</span></button>';}
function openSignal(){
 closeCard();closeScrim();G.rp=reportPos();
 var s=el('<div class="gscrim" data-g="scrim"><div class="gsheet" role="dialog" aria-label="Signaler"><div class="ghandle"></div><div><h3>Signaler</h3><p>Position enregistrée au moment de l\'appui.</p></div><div class="ggrid">'+
  tile("ralentisseur","bump","Ralentisseur")+tile("degradee","pothole","Route dégradée")+tile("ralentissement","slow","Ralentissement")+tile("arret","jam","À l'arrêt")+tile("accident","crash","Accident")+tile("travaux","cone","Travaux")+tile("danger","danger","Danger","objet, animal, obstacle…",true)+
  '</div><button type="button" class="gsec" data-g="scrimClose">Annuler</button></div></div>');
 G.root.appendChild(s);
}
function openStop(){
 closeCard();closeScrim();
 var s=el('<div class="gscrim" data-g="scrim"><div class="gsheet" role="dialog" aria-label="Arrêter le guidage"><div class="ghandle"></div><h3>Arrêter le guidage</h3>'+
  '<button type="button" class="gopt pri" data-g="newMission">'+svgI(IC.home,26,"#fff",2.3)+'<span>Nouvelle mission</span></button>'+
  '<button type="button" class="gopt" data-g="changeDest">'+svgI(IC.pin,26,"#f1f3f6",2.3)+'<span>Changer de destination</span></button>'+
  '<button type="button" class="gsec" data-g="scrimClose" style="min-height:52px">Annuler, continuer le guidage</button></div></div>');
 G.root.appendChild(s);
}
function report(type){
 closeScrim();var rp=G.rp||reportPos();G.rp=null;
 if(type==="ralentisseur"){var p=rp.p;if(!p){toast("Position GPS pas encore trouvée.");return;}
  var dup=teamZones().some(function(z){var g=A.zGeom(z);return g&&g.k==="pts"&&g.c.some(function(q){return A.distM(q,p)<15;});});
  if(dup){toast("Ce ralentisseur est déjà enregistré.");return;}
  var q=r5(p);addZone({id:A.uid(),nom:roadName(rp.along!=null?rp.along:G.along)||"Ralentisseur",type:"ralentisseurs",etab:"",note:"Signalé depuis le GPS",trace:[q],lat:q[0],lon:q[1],rayon:15});
  toast(A.isCloud()?"Ralentisseur enregistré pour l'équipe.":"Ralentisseur enregistré sur ce téléphone.");return;}
 if(type==="degradee"){var p0=rp.p||G.pos;if(!p0){toast("Position GPS pas encore trouvée.");return;}G.rec={pts:[p0],name:roadName(rp.along!=null?rp.along:G.along)};setRecData();paintChip();paintPanel();say("Enregistrement de la route dégradée. Touchez fin quand la route redevient correcte.");return;}
 reportAlert(type,rp);
}
function addZone(z){var st=A.state;st.zones=st.zones||[];st.zones.push(z);A.save();A.enqueue({t:"putZ",rows:[A.zoneRow(z)]});computeHazards();refreshFeatures();}
function recEnd(save){
 var r=G.rec;G.rec=null;setRecData();paintChip();paintPanel();if(!save||!r)return;
 var L=lenM(r.pts);if(L<25){toast("Portion trop courte : rien n'a été enregistré.");return;}
 var tr=simplify(r.pts,3).map(r5);if(tr.length>60){var st=Math.ceil(tr.length/60),t2=[];for(var i=0;i<tr.length;i+=st)t2.push(tr[i]);t2.push(tr[tr.length-1]);tr=t2;}
 var mid=tr[Math.floor(tr.length/2)];
 addZone({id:A.uid(),nom:r.name||"Route dégradée",type:"degradee",etab:"",note:"Signalé depuis le GPS",trace:tr,lat:mid[0],lon:mid[1],rayon:Math.min(500,Math.round(L/2)+15)});
 toast("Route dégradée enregistrée "+(A.isCloud()?"pour l'équipe":"sur ce téléphone")+" ("+fmtDist(L)+").");
}

/* ---------- changer de destination ---------- */
function rowBtn(i,t1,t2,cur){return'<button type="button" class="growd'+(cur?" cur":"")+'" data-g="pickDest" data-i="'+i+'"'+(cur?' disabled':'')+'><span class="pi">'+svgI(IC.pin,22,"#9aa3b2",2.2)+'</span><span class="k"><b>'+esc(t1)+'</b>'+(t2?'<small>'+esc(t2)+'</small>':'')+'</span>'+(cur?'<small style="border:1px solid #2c313c;border-radius:999px;padding:2px 8px;color:#9aa3b2">actuelle</small>':'')+'</button>';}
function openDest(){
 closeScrim();closeCard();
 var d=el('<div class="gfull" role="dialog" aria-label="Changer de destination"><div class="gfh"><div class="r"><button type="button" data-g="destClose" aria-label="Retour au guidage">'+svgI(IC.back,26,"#fff",2.6)+'</button><div><b>Changer de destination</b><small>Actuelle : '+esc(G.dest.nom||"")+'</small></div></div>'+
  '<label>'+svgI(IC.search,22,"#5f6672",2.4)+'<input id="gDestQ" type="text" placeholder="Lieu enregistré ou adresse" autocomplete="off" enterkeyhint="search" aria-label="Nouvelle destination"></label></div><div class="gfl" id="gDestL"></div></div>');
 G.root.appendChild(d);destSearch("");
}
function destSearch(q){
 var box=document.getElementById("gDestL");if(!box)return;q=String(q||"").trim();var my=G.dseq=(G.dseq||0)+1,items=[],h="";
 function saved(x){return{etab:x.id,main:x.nom,sub:x.type+(x.adresse?" · "+x.adresse:""),label:x.nom,x:x};}
 if(q.length<2){var st=A.state.etabs||[],fav=st.filter(function(x){return A.isFav(x.id);}),rest=st.filter(function(x){return !A.isFav(x.id);});
  if(fav.length){h+='<h4>Favoris</h4>';fav.forEach(function(x){items.push(saved(x));h+=rowBtn(items.length-1,x.nom,x.type,x.id===G.opts.destEtab);});}
  if(rest.length){h+='<h4>Lieux enregistrés</h4>';rest.slice(0,40).forEach(function(x){items.push(saved(x));h+=rowBtn(items.length-1,x.nom,x.type,x.id===G.opts.destEtab);});}
  if(!st.length)h+='<div class="gwait">Tape une adresse ou le nom d\'un lieu.</div>';
  G.ditems=items;box.innerHTML=h;return;}
 A.matchEtabs(q,5).forEach(function(x){items.push(saved(x));});
 function paint(list,msg){if(my!==G.dseq)return;var all=items.concat(list||[]),hh="";all.forEach(function(it,i){hh+=rowBtn(i,it.main,it.etab?"Lieu enregistré · "+it.sub:it.sub,it.etab&&it.etab===G.opts.destEtab);});if(msg)hh+='<div class="gwait">'+esc(msg)+'</div>';G.ditems=all;box.innerHTML=hh;}
 paint([],q.length<3?"":"Recherche…");if(q.length<3)return;
 clearTimeout(G.dT);G.dT=setTimeout(function(){A.acFetch(q,function(list,fin,fail){if(!list.length&&!fin)return;paint(list.slice(0,6),list.length||items.length?"":(fail?"Suggestions indisponibles (réseau ?).":"Aucun lieu trouvé."));});},350);
}
function pickDest(i){
 var it=G.ditems&&G.ditems[i];if(!it)return;var x=it.x;
 var p=(x&&typeof x.lat==="number")?Promise.resolve({lat:x.lat,lon:x.lon}):(it.lat!=null?Promise.resolve({lat:it.lat,lon:it.lon}):A.geocode(x?x.adresse:it.label));
 var box=document.getElementById("gDestL");if(box)box.innerHTML='<div class="gwait">Recherche de l\'adresse…</div>';
 p.then(function(g){if(!G)return;G.dest={lat:g.lat,lon:g.lon,nom:it.main||it.label,addr:x?x.adresse:it.label};G.opts.destEtab=it.etab||"";G.arrived=false;
  try{A.setDest(it.etab?{etab:it.etab}:{label:it.label,lat:g.lat,lon:g.lon},G.opts.pickup);}catch(e){}
  var d=$(".gfull");if(d)d.remove();paintPanel();reroute("dest");},
  function(e){if(box)box.innerHTML='<div class="gwait">'+esc(e.message||"Adresse introuvable.")+'</div>';});
}

/* ---------- clics ---------- */
function onClick(ev){
 var b=ev.target.closest("[data-g]");if(!b||!G)return;var g=b.getAttribute("data-g");
 if(g==="scrim"){if(ev.target===b)closeScrim();return;}
 if(g==="scrimClose")closeScrim();
 else if(g==="sig")openSignal();
 else if(g==="rep")report(b.getAttribute("data-k"));
 else if(g==="stop")openStop();
 else if(g==="newMission"){stop();A.onEnd("nouvelle");}
 else if(g==="changeDest")openDest();
 else if(g==="destClose"){var d=$(".gfull");if(d)d.remove();}
 else if(g==="pickDest")pickDest(+b.getAttribute("data-i"));
 else if(g==="finish"){stop();A.onEnd("fin");}
 else if(g==="mute"){G.mute=!G.mute;try{localStorage.setItem("ambumaps-gps-muet",G.mute?"1":"");if(G.mute)speechSynthesis.cancel();}catch(e){}paintMute();}
 else if(g==="recenter")recenter();
 else if(g==="addr")showAddr();
 else if(g==="recEnd")recEnd(true);
 else if(g==="recCancel"){recEnd(false);toast("Signalement annulé.");}
 else if(g==="cStill"||g==="cSlow"||g==="cGone"){var al=G.card&&G.card.al;if(al)alertAct(al,g==="cStill"?"still":(g==="cSlow"?"slow":"gone"));else closeCard();}
 else if(g==="cClose")closeCard();
 else if(g==="retry"){var e=$(".gerr");if(e)e.remove();boot();}
 else if(g==="close"){stop();A.onEnd("fin");}
}
function showAddr(){
 var p=G.pos||G.disp;if(!p)return;if(G.addr&&now()-G.addr.t<9000){G.addr=null;paintPill();return;}var pill=$("#gPill");if(pill){pill.innerHTML='<b>Adresse…</b>';G._pill="";}
 fetch(A.GEO+"reverse?lat="+p[0].toFixed(6)+"&lon="+p[1].toFixed(6)+"&index=address&limit=1").then(function(r){return r.json();}).then(function(j){
  var f=j.features&&j.features[0],pr=f&&f.properties;if(!pr)throw 0;
  G.addr={l1:pr.name||pr.label||"",l2:[pr.postcode,pr.city].filter(Boolean).join(" "),t:now()};paintPill();
 }).catch(function(){G.addr={l1:"Adresse introuvable",l2:"",t:now()-6000};paintPill();});
}

/* ---------- démarrage / arrêt ---------- */
function waitPos(ms){if(G.sim&&!G.pos)return Promise.resolve(G.opts.start||[G.dest.lat+0.011,G.dest.lon-0.012]);
 return new Promise(function(res,rej){if(G.pos){res(G.pos);return;}var t0=now();(function w(){if(!G){rej(new Error("arrêt"));return;}if(G.pos){res(G.pos);return;}if(now()-t0>ms){G.opts.start?res(G.opts.start):rej(new Error("Position GPS introuvable : active la localisation du téléphone."));return;}setTimeout(w,250);})();});}
function startGeo(){
 if(G.sim)return;
 if(!navigator.geolocation){toast("Localisation indisponible sur ce téléphone.");return;}
 G.watch=navigator.geolocation.watchPosition(function(q){onFix({lat:q.coords.latitude,lon:q.coords.longitude,acc:q.coords.accuracy,speed:q.coords.speed,heading:q.coords.heading,t:q.timestamp});},
  function(e){if(e&&e.code===1)showErr("Localisation refusée : autorise-la pour Ambumaps dans les réglages du navigateur.");},{enableHighAccuracy:true,maximumAge:0,timeout:20000});
}
function simTick(){
 if(!G||!G.R)return;var R=G.R,m=R.man[G.next],dn=m?m.d-G.simAlong:1e9,v=dn<45?6:12;
 G.simAlong=Math.min(R.total,(G.simAlong||0)+v);var p=pointAt(R,G.simAlong);onFix({lat:p[0],lon:p[1],acc:5,speed:v,heading:bearingAt(R,G.simAlong),t:now()});
}
function lockScreen(){try{if(navigator.wakeLock&&document.visibilityState==="visible")navigator.wakeLock.request("screen").then(function(l){if(G)G.lock=l;else l.release();}).catch(function(){});}catch(e){}}
function onVis(){if(!G)return;if(document.visibilityState==="visible"){lockScreen();pollAlerts();}}
function onPop(){if(!G)return;try{history.pushState({gps:1},"");}catch(e){}openStop();}
function onResize(){setPad();}
function boot(){
 setLoad("Ouverture du GPS…");
 loadML().then(function(ml){setLoad("Chargement de la carte…");return fetch(STYLE_URL).then(function(r){if(!r.ok)throw new Error("style "+r.status);return r.json();}).then(function(s){return[ml,prepStyle(s)];},function(){return[ml,JSON.parse(JSON.stringify(RASTER))];});}).then(function(x){
  if(!G)return;var ml=x[0],c=G.pos||G.opts.start||[G.dest.lat,G.dest.lon];
  if(!G.map){
   G.map=new ml.Map({container:"gmap",style:x[1],center:[c[1],c[0]],zoom:17,pitch:50,bearing:0,attributionControl:false,dragRotate:false,touchPitch:false,pitchWithRotate:false,maxPitch:60});
   G.map.touchZoomRotate.disableRotation();
   G.map.on("dragstart",function(e){if(e.originalEvent){G.follow=false;paintRec();}});
   G.map.on("zoomstart",function(e){if(e.originalEvent){G.follow=false;paintRec();}});
   G.map.on("load",function(){if(!G)return;G.mapReady=true;addLayers();G._padTop=null;setPad();
    var ve=el('<div class="gveh">'+ARROW+'</div>');G.veh=new ml.Marker({element:ve,anchor:"center",rotationAlignment:"map",pitchAlignment:"viewport"}).setLngLat([c[1],c[0]]).addTo(G.map);
    vehMode();loadPins().then(function(){if(G)refreshMarkers();});refreshFeatures();setRouteData();});
  }
  setLoad("Calcul de l'itinéraire…");
  var p=G.opts.shape?traceRoute(G.opts.shape).catch(function(){return waitPos(12000).then(routeFrom);}):waitPos(12000).then(routeFrom);
  return p.then(function(R){if(!G)return;setLoad(null);
   if(G.sim&&!G.pos){G.pos=R.pts[0];}
   G.quiet=true;setRoute(R);G.quiet=false;var m0=R.man.filter(function(m){return m.type<1||m.type>3;})[0];
   var d0=m0?m0.d-G.along:1e9;say("Guidage démarré."+(d0>=200&&d0<1500?" Dans "+sayDist(d0)+", "+lcFirst(m0.verbal_transition_alert_instruction||m0.instruction):""),true);
   if(m0&&d0<1500)m0._far=1;voice();
   if(G.sim&&!G.simT)G.simT=setInterval(simTick,1000);
  });
 }).catch(function(e){if(!G)return;showErr(A.netErr(e)?"Pas de connexion internet, ou serveur de calcul indisponible.":(e.message||"Erreur inconnue."));});
}
function stop(){
 if(!G)return;var g=G;G=null;
 try{if(g.watch!=null)navigator.geolocation.clearWatch(g.watch);}catch(e){}
 clearInterval(g.simT);clearInterval(g.pollT);clearInterval(g.tickT);clearInterval(g.cardT);if(g.raf)cancelAnimationFrame(g.raf);
 try{if(g.lock)g.lock.release();}catch(e){}try{speechSynthesis.cancel();}catch(e){}
 try{if(g.map)g.map.remove();}catch(e){}
 if(g.root)g.root.remove();document.body.style.overflow="";
 document.removeEventListener("visibilitychange",onVis);window.removeEventListener("popstate",onPop);window.removeEventListener("resize",onResize);
 try{if(history.state&&history.state.gps)history.back();}catch(e){}
}
function start(opts){
 if(G)stop();
 var mute=false;try{mute=localStorage.getItem("ambumaps-gps-muet")==="1";}catch(e){}
 G={opts:opts||{},dest:opts.dest,sim:!!opts.sim,follow:true,mute:mute,alerts:[],haz:[],bumps:[],mk:{},along:0,next:-1};
 document.body.style.overflow="hidden";buildUi();paintPanel();
 startGeo();lockScreen();boot();pollAlerts();
 G.pollT=setInterval(pollAlerts,30000);
 G.tickT=setInterval(function(){if(!G)return;paintSpeed();if(G.addr&&now()-G.addr.t>=9000)paintPill();if(G.alerts.some(function(a){return a.exp<=now();})){G.alerts=G.alerts.filter(function(a){return a.exp>now();});computeHazards();refreshFeatures();}},2000);
 document.addEventListener("visibilitychange",onVis);window.addEventListener("resize",onResize);
 try{history.pushState({gps:1},"");}catch(e){}window.addEventListener("popstate",onPop);
 if(G.sim)toast("Mode simulation : le trajet défile tout seul.",3500);
}
window.AmbuGPS={start:start,stop:stop,active:function(){return!!G;},_t:{buildRoute:buildRoute,project:project,slice:slice,simplify:simplify,fmtDist:fmtDist,sayDist:sayDist}};
})();

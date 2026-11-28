/* Ambumaps — GPS intégré : guidage, signalements et alertes de l'équipe.
   Carte : MapLibre + OpenFreeMap (© OpenMapTiles, données © contributeurs OpenStreetMap).
   Itinéraires et consignes : Valhalla (serveur public OpenStreetMap). Adresses : IGN Géoplateforme. */
(function(){
"use strict";
var A=window.AMB;
var ML_JS="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js",ML_CSS="https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.css",ML_SRI="sha384-SYKAG6cglRMN0RVvhNeBY0r3FYKNOJtznwA0v7B5Vp9tr31xAHsZC0DqkQ/pZDmj",ML_CSS_SRI="sha384-MinO0mNliZ3vwppuPOUnGa+iq619pfMhLVUXfC4LHwSCvF9H+6P/KO4Q7qBOYV5V";
var STYLE_URL="https://tiles.openfreemap.org/styles/dark",STYLE_URL_L="https://tiles.openfreemap.org/styles/positron";
function LT(){return !!(G&&G.light);}
function C(d,l){return LT()?l:d;}
var ICONS={"GLY": {"bump": "<path d=\"M2 18.6h2.6c2.6 0 3.4-7.1 7.4-7.1s4.8 7.1 7.4 7.1H22a.9.9 0 0 1 .9.9v.9a.9.9 0 0 1-.9.9H2a.9.9 0 0 1-.9-.9v-.9a.9.9 0 0 1 .9-.9z\" fill=\"{fg}\"></path><path d=\"M8.1 18.6v-2.4a.7.7 0 0 1 .7-.7h.6a.7.7 0 0 1 .7.7v2.4z M11.1 18.6v-4.6a.7.7 0 0 1 .7-.7h.4a.7.7 0 0 1 .7.7v4.6z M13.9 18.6v-2.4a.7.7 0 0 1 .7-.7h.6a.7.7 0 0 1 .7.7v2.4z\" fill=\"{bg}\"></path><path d=\"M12 2.6v5.2 M9.6 5.2L12 2.6l2.4 2.6\" fill=\"none\" stroke=\"{fg}\" stroke-width=\"2.1\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>", "pothole": "<path d=\"M2.5 9.5h7.8l-1.6 3.2 2.2 2.4-1.5 3.9H2.5a1 1 0 0 1-1-1V10.5a1 1 0 0 1 1-1z\" fill=\"{fg}\"></path><g transform=\"translate(0.8 1.2) rotate(5 17 14)\"><path d=\"M13 9.5h8.5a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-9.7l1.5-3.9-2.2-2.4z\" fill=\"{fg}\"></path><path d=\"M16.2 14h3.4\" stroke=\"{bg}\" stroke-width=\"1.2\" stroke-linecap=\"round\"></path></g><path d=\"M4 14h3.4\" stroke=\"{bg}\" stroke-width=\"1.2\" stroke-linecap=\"round\"></path><path d=\"M11 6.2l.8-1.6 M13.6 6.6l1.2-1.2 M9 6.8l-.6-1.4\" stroke=\"{fg}\" stroke-width=\"1.6\" stroke-linecap=\"round\"></path>", "slow": "<g transform=\"translate(5.2 -3.2) rotate(0 12 13) scale(0.72)\"><path d=\"M6.2 11L7.6 6.9A2 2 0 0 1 9.5 5.5h5a2 2 0 0 1 1.9 1.4L17.8 11h.7a2 2 0 0 1 2 2v4a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17v-4a2 2 0 0 1 2-2z\" fill=\"{fg}\"></path><path d=\"M5 18.4h3v1.9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z M16 18.4h3v1.9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z\" fill=\"{fg}\"></path><path d=\"M8.5 10.6l.9-2.7a.8.8 0 0 1 .8-.6h3.6a.8.8 0 0 1 .8.6l.9 2.7z\" fill=\"{bg}\"></path><circle cx=\"7.3\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><circle cx=\"16.7\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><path d=\"M10.3 15.6h3.4\" stroke=\"{bg}\" stroke-width=\"1.3\" stroke-linecap=\"round\"></path></g><g transform=\"translate(-1.2 1.6) rotate(0 12 13) scale(0.9)\"><path d=\"M6.2 11L7.6 6.9A2 2 0 0 1 9.5 5.5h5a2 2 0 0 1 1.9 1.4L17.8 11h.7a2 2 0 0 1 2 2v4a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17v-4a2 2 0 0 1 2-2z\" fill=\"{fg}\" stroke=\"{bg}\" stroke-width=\"2.2\" paint-order=\"stroke\"></path><path d=\"M5 18.4h3v1.9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z M16 18.4h3v1.9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z\" fill=\"{fg}\"></path><path d=\"M8.5 10.6l.9-2.7a.8.8 0 0 1 .8-.6h3.6a.8.8 0 0 1 .8.6l.9 2.7z\" fill=\"{bg}\"></path><circle cx=\"7.3\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><circle cx=\"16.7\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><path d=\"M10.3 15.6h3.4\" stroke=\"{bg}\" stroke-width=\"1.3\" stroke-linecap=\"round\"></path></g>", "jam": "<g transform=\"translate(5.2 -3.2) rotate(0 12 13) scale(0.72)\"><path d=\"M6.2 11L7.6 6.9A2 2 0 0 1 9.5 5.5h5a2 2 0 0 1 1.9 1.4L17.8 11h.7a2 2 0 0 1 2 2v4a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17v-4a2 2 0 0 1 2-2z\" fill=\"{fg}\"></path><path d=\"M5 18.4h3v1.9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z M16 18.4h3v1.9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z\" fill=\"{fg}\"></path><path d=\"M8.5 10.6l.9-2.7a.8.8 0 0 1 .8-.6h3.6a.8.8 0 0 1 .8.6l.9 2.7z\" fill=\"{bg}\"></path><circle cx=\"7.3\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><circle cx=\"16.7\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><path d=\"M10.3 15.6h3.4\" stroke=\"{bg}\" stroke-width=\"1.3\" stroke-linecap=\"round\"></path></g><g transform=\"translate(-1.2 1.6) rotate(0 12 13) scale(0.9)\"><path d=\"M6.2 11L7.6 6.9A2 2 0 0 1 9.5 5.5h5a2 2 0 0 1 1.9 1.4L17.8 11h.7a2 2 0 0 1 2 2v4a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17v-4a2 2 0 0 1 2-2z\" fill=\"{fg}\" stroke=\"{bg}\" stroke-width=\"2.2\" paint-order=\"stroke\"></path><path d=\"M5 18.4h3v1.9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z M16 18.4h3v1.9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z\" fill=\"{fg}\"></path><path d=\"M8.5 10.6l.9-2.7a.8.8 0 0 1 .8-.6h3.6a.8.8 0 0 1 .8.6l.9 2.7z\" fill=\"{bg}\"></path><circle cx=\"7.3\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><circle cx=\"16.7\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><path d=\"M10.3 15.6h3.4\" stroke=\"{bg}\" stroke-width=\"1.3\" stroke-linecap=\"round\"></path></g>", "crash": "<g transform=\"translate(-1.6 2.2) rotate(-14 12 13) scale(0.86)\"><path d=\"M6.2 11L7.6 6.9A2 2 0 0 1 9.5 5.5h5a2 2 0 0 1 1.9 1.4L17.8 11h.7a2 2 0 0 1 2 2v4a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 17v-4a2 2 0 0 1 2-2z\" fill=\"{fg}\"></path><path d=\"M5 18.4h3v1.9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1z M16 18.4h3v1.9a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1z\" fill=\"{fg}\"></path><path d=\"M8.5 10.6l.9-2.7a.8.8 0 0 1 .8-.6h3.6a.8.8 0 0 1 .8.6l.9 2.7z\" fill=\"{bg}\"></path><circle cx=\"7.3\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><circle cx=\"16.7\" cy=\"14.4\" r=\"1.35\" fill=\"{bg}\"></circle><path d=\"M10.3 15.6h3.4\" stroke=\"{bg}\" stroke-width=\"1.3\" stroke-linecap=\"round\"></path></g><path d=\"M18.4 1.6l.9 2.6 2.6-.9-1.3 2.4 2.5 1.2-2.7.6.3 2.7-2-1.8-1.9 2-.1-2.7-2.7.1 2.1-1.7-1.5-2.3 2.7.6z\" fill=\"{fg}\"></path>", "cone": "<path d=\"M10.2 3h3.6l4.6 15.4H5.6z\" fill=\"{fg}\" stroke=\"{fg}\" stroke-width=\"1.2\" stroke-linejoin=\"round\"></path><path d=\"M8.75 8h6.5l.62 2.2H8.13z M7.25 13h9.5l.6 2.2H6.65z\" fill=\"{bg}\"></path><rect x=\"3\" y=\"18.6\" width=\"18\" height=\"2.6\" rx=\"1.2\" fill=\"{fg}\"></rect>", "danger": "<path d=\"M10.3 3.9a2 2 0 0 1 3.4 0l8.2 14.2a2 2 0 0 1-1.7 3H3.8a2 2 0 0 1-1.7-3z\" fill=\"{fg}\"></path><rect x=\"10.9\" y=\"8.4\" width=\"2.2\" height=\"6.8\" rx=\"1.1\" fill=\"{bg}\"></rect><circle cx=\"12\" cy=\"17.8\" r=\"1.3\" fill=\"{bg}\"></circle>"}, "COL": {"bump": ["#f59f00", "#ffffff"], "pothole": ["#f2c200", "#2b2300"], "slow": ["#f76707", "#ffffff"], "jam": ["#e03131", "#ffffff"], "crash": ["#a61e4d", "#ffffff"], "cone": ["#5c6370", "#ffffff"], "danger": ["#7048e8", "#ffffff"]}};
var GLY=ICONS.GLY,COL=ICONS.COL;
/* bulle d'arrivée : drapeau à damier */
COL.dest=["#00387B","#ffffff"];GLY.dest='<rect x="3.6" y="2.6" width="2.6" height="19" rx="1.3" fill="{fg}"></rect><path d="M6.9 3.6h13.8v10.2H6.9z" fill="none" stroke="{fg}" stroke-width="1.2" stroke-linejoin="round"></path><rect x="6.90" y="3.60" width="3.45" height="3.4" fill="{fg}"></rect><rect x="13.80" y="3.60" width="3.45" height="3.4" fill="{fg}"></rect><rect x="10.35" y="7.00" width="3.45" height="3.4" fill="{fg}"></rect><rect x="17.25" y="7.00" width="3.45" height="3.4" fill="{fg}"></rect><rect x="6.90" y="10.40" width="3.45" height="3.4" fill="{fg}"></rect><rect x="13.80" y="10.40" width="3.45" height="3.4" fill="{fg}"></rect>';
/* police : casquette à visière et écusson, sur fond bleu */
COL.police=["#1864ab","#ffffff"];GLY.police='<path d="M3.4 9.5C3.4 6.8 7.4 4.8 12 4.8s8.6 2 8.6 4.7l-2.1 3.7H5.5z" fill="{fg}"></path><rect x="5.5" y="14" width="13" height="2.3" rx=".4" fill="{fg}"></rect><path d="M5 17.1c2.6 2.1 11.4 2.1 14 0l-.7-.8H5.7z" fill="{fg}"></path><path d="M12 6.4l2.1.9v1.7c0 1.3-.9 2.3-2.1 2.7-1.2-.4-2.1-1.4-2.1-2.7V7.3z" fill="{bg}"></path>';
var KIND={ralentisseur:"bump",degradee:"pothole",ralentissement:"slow",arret:"jam",accident:"crash",travaux:"cone",danger:"danger",police:"police"};
var NOM={ralentisseur:"Ralentisseur",degradee:"Route dégradée",ralentissement:"Ralentissement",arret:"Circulation à l'arrêt",accident:"Accident",travaux:"Travaux",danger:"Danger",police:"Police"};
var DIT={ralentisseur:"Ralentisseur",degradee:"Route dégradée",ralentissement:"Ralentissement signalé",arret:"Circulation à l'arrêt signalée",accident:"Accident signalé",travaux:"Travaux signalés",danger:"Danger signalé",police:"Police signalée"};
var TEMP={ralentissement:1,arret:1,accident:1,travaux:1,danger:1,police:1};
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
function posMark(){try{if(A&&A.posSvg){var x=A.posSvg(!!(G&&G.opts&&G.opts.vitale));if(x)return x;}}catch(e){}return ARROW;}
/* véhicules : inclinés en relief (aussi longs que larges à l'écran) ; flèches et points : couchés sur la route */
function posRelief(){try{var k=A&&A.posKind?A.posKind():"";return k==="amb"||k==="vsl";}catch(e){return false;}}
var IC={straight:"M12 21V4 M6.5 9.5L12 4l5.5 5.5",right:"M6 21V11a4 4 0 0 1 4-4h9 M15 3l4 4-4 4",left:"M18 21V11a4 4 0 0 0-4-4H5 M9 3L5 7l4 4",
 sright:"M8 21v-6.5a4 4 0 0 1 1.2-2.8L17 4 M11.5 4H17v5.5",sleft:"M16 21v-6.5a4 4 0 0 0-1.2-2.8L7 4 M12.5 4H7v5.5",
 uturn:"M9 21V10a5 5 0 0 1 10 0v6 M15.5 13l3.5 3.5 3.5-3.5",round:"M12 21v-4.5 M12 16.5a4.5 4.5 0 1 1 4.5-4.5 M16.5 12V6.5 M14 9l2.5-2.5L19 9",
 flag:"M6 21V4 M6 4h11l-2.5 4 2.5 4H6",vol:"M4 9v6h4l5 4V5L8 9H4z M16.5 8.5a5 5 0 0 1 0 7 M19 6a8.5 8.5 0 0 1 0 12",mute:"M4 9v6h4l5 4V5L8 9H4z M17 9l5 6 M22 9l-5 6",
 target:"M12 5a7 7 0 1 0 0 14a7 7 0 1 0 0-14z M12 9.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 1 0 0-5z M12 2v3 M12 19v3 M2 12h3 M19 12h3",chev:"M6 15l6-6 6 6",
 home:"M3.5 11L12 4l8.5 7 M5.5 9.5V20h13V9.5 M10 20v-5.5h4V20",pin:"M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11z M12 7.6a2.4 2.4 0 1 0 0 4.8a2.4 2.4 0 1 0 0-4.8",
 back:"M15 5l-7 7 7 7",search:"M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 1 0 0-13z M15.3 15.3L20 20",stop:"M7 7h10v10H7z",
 x:"M6.5 6.5l11 11 M17.5 6.5l-11 11",alt:"M12 21v-5.5 M12 15.5c0-4.2-6-5-6-10 M12 15.5c0-4.2 6-5 6-10 M3.6 7.6L6 5.2l2.4 2.4 M15.6 7.6L18 5.2l2.4 2.4"};
function manIcon(t){if(t>=4&&t<=6)return"flag";if(t===10||t===11)return"right";if(t===14||t===15)return"left";if(t===12||t===13)return"uturn";if(t===26||t===27)return"round";
 if(t===9||t===18||t===20||t===23||t===37)return"sright";if(t===16||t===19||t===21||t===24||t===38)return"sleft";return"straight";}
var LBL={0:"Continue",1:"Pars",2:"Pars à droite",3:"Pars à gauche",4:"Tu es arrivé",5:"Arrivée sur ta droite",6:"Arrivée sur ta gauche",7:"Continue",8:"Continue tout droit",9:"Serre à droite",10:"Tourne à droite",11:"Tourne franchement à droite",12:"Fais demi-tour",13:"Fais demi-tour",14:"Tourne franchement à gauche",15:"Tourne à gauche",16:"Serre à gauche",17:"Prends la bretelle",18:"Prends la bretelle à droite",19:"Prends la bretelle à gauche",20:"Prends la sortie à droite",21:"Prends la sortie à gauche",22:"Continue tout droit",23:"Reste à droite",24:"Reste à gauche",25:"Insère-toi",26:"Au rond-point",27:"Sors du rond-point",28:"Prends le bac",29:"Quitte le bac",37:"Insère-toi à droite",38:"Insère-toi à gauche"};
var ORD=["","1re","2e","3e","4e","5e","6e","7e","8e"];
function roundSvg(n,size){
 /* trois flèches qui tournent (sens antihoraire, comme en France), numéro de sortie au centre */
 var c=28,r=17,h="",i,dg=Math.PI/180;
 for(i=0;i<3;i++){var t1=(100+i*120)*dg,t2=t1+84*dg,x1=c+r*Math.cos(t1),y1=c-r*Math.sin(t1),x2=c+r*Math.cos(t2),y2=c-r*Math.sin(t2),tx=-Math.sin(t2),ty=-Math.cos(t2),nx=Math.cos(t2),ny=-Math.sin(t2);
  h+='<path d="M'+x1.toFixed(2)+' '+y1.toFixed(2)+'A'+r+' '+r+' 0 0 0 '+x2.toFixed(2)+' '+y2.toFixed(2)+'" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round"></path>'+
   '<path d="M'+(x2+tx*6).toFixed(2)+' '+(y2+ty*6).toFixed(2)+'L'+(x2-tx*1.2+nx*5).toFixed(2)+' '+(y2-ty*1.2+ny*5).toFixed(2)+'L'+(x2-tx*1.2-nx*5).toFixed(2)+' '+(y2-ty*1.2-ny*5).toFixed(2)+'Z" fill="#fff" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"></path>';}
 if(n)h+='<text x="28" y="29" text-anchor="middle" dominant-baseline="central" fill="#fff" font-size="'+(String(n).length>1?16:20)+'" font-weight="900" font-family="Roboto,system-ui,sans-serif">'+n+'</text>';
 return'<svg width="'+size+'" height="'+size+'" viewBox="0 0 56 56" aria-hidden="true" style="flex:none">'+h+'</svg>';}
function manSvg(R,k,size,sw){var m=R.man[k];if(!m)return svgI(IC.straight,size,"#fff",sw);
 if(manIcon(m.type)==="round"){var n=m.type===26?m.roundabout_exit_count:(R.man[k-1]&&R.man[k-1].type===26?R.man[k-1].roundabout_exit_count:0);return roundSvg(size>=40?n:0,size);}
 return svgI(IC[manIcon(m.type)],size,"#fff",sw);}
function manLabel(m){if(m.type===26&&m.roundabout_exit_count)return"Au rond-point, prends la "+(ORD[m.roundabout_exit_count]||m.roundabout_exit_count+"e")+" sortie";return LBL[m.type]||"Continue";}
function manStreet(R,k){var m=R.man[k];if(!m)return"";var s=(m.street_names&&m.street_names[0])||"";
 if(m.type===26&&R.man[k+1])s=(R.man[k+1].street_names&&R.man[k+1].street_names[0])||s;
 if(m.type>=4&&m.type<=6)s=G.dest.nom||"";return s;}

/* ---------- géométrie ---------- */
function mkProj(lat0){var kx=111320*Math.cos(lat0*Math.PI/180),ky=110540;return{xy:function(p){return[p[1]*kx,p[0]*ky];},ll:function(x,y){return[y/ky,x/kx];}};}
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
/* projection en continuité : on cherche seulement sur la portion du tracé autour de la position actuelle (60 m derrière, « ahead » m devant),
   en écartant les segments orientés à l'inverse du sens de la marche : pas de saut vers une autre partie du trajet ou une route voisine */
function projectNear(R,p,al,hd,ahead){
 var n=R.xy.length;if(n<2)return project(R,p,null);
 var q=R.P.xy(p),best=null,lo=idxAt(R,Math.max(0,al-60)),hi=Math.min(n-1,idxAt(R,Math.min(R.total,al+ahead))+1);
 for(var i=lo;i<hi;i++){var a=R.xy[i],b=R.xy[i+1],dx=b[0]-a[0],dy=b[1]-a[1],l=dx*dx+dy*dy,t=l?((q[0]-a[0])*dx+(q[1]-a[1])*dy)/l:0;t=Math.max(0,Math.min(1,t));
  var x=a[0]+t*dx-q[0],y=a[1]+t*dy-q[1],d=Math.sqrt(x*x+y*y),along=R.cum[i]+t*(R.cum[i+1]-R.cum[i]),cost=d;
  if(hd!=null&&l>1){var df=Math.abs(angDiff((Math.atan2(dx,dy)*180/Math.PI+360)%360,hd));if(df>110)cost+=60;else if(df>60)cost+=20;}
  if(along<al)cost+=(al-along)*0.4;
  if(!best||cost<best.cost)best={i:i,t:t,off:d,along:along,cost:cost};}
 var pa=R.pts[best.i],pb=R.pts[best.i+1];best.q=[pa[0]+(pb[0]-pa[0])*best.t,pa[1]+(pb[1]-pa[1])*best.t];return best;
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
 mlP=new Promise(function(res,rej){var l=document.createElement("link");l.rel="stylesheet";l.href=ML_CSS;if(ML_CSS_SRI){l.integrity=ML_CSS_SRI;l.crossOrigin="anonymous";}document.head.appendChild(l);
  var s=document.createElement("script");s.src=ML_JS;if(ML_SRI){s.integrity=ML_SRI;s.crossOrigin="anonymous";}s.onload=function(){window.maplibregl?res(window.maplibregl):rej(new Error("Carte indisponible."));};
  s.onerror=function(){mlP=null;s.remove();rej(new Error("Carte indisponible : pas de connexion internet ?"));};document.head.appendChild(s);});
 return mlP;}
function prepStyle(s){
 var lt=LT();
 s.layers=(s.layers||[]).filter(function(l){return l.type!=="fill-extrusion";});
 s.layers.forEach(function(l){var sl=l["source-layer"];l.paint=l.paint||{};
  if(l.type==="background")l.paint["background-color"]=lt?"#e5e8ec":"#1c1f25";
  else if(sl==="building"&&l.type==="fill"){l.paint["fill-color"]=lt?"#d5d9e0":"#262b33";l.paint["fill-outline-color"]=lt?"#c8cdd5":"#2f3540";l.paint["fill-opacity"]=1;}
  else if(lt&&sl==="landuse"&&l.type==="fill")l.paint["fill-color"]="#e5e8ec";
  else if(sl==="water"&&l.type==="fill")l.paint["fill-color"]=lt?"#a9d4f5":"#15263a";
  else if((sl==="park"||sl==="landcover")&&l.type==="fill")l.paint["fill-color"]=lt?"#cfe8c6":"#1b2a22";
  else if(sl==="transportation"&&l.type==="line"){
   if(lt){if(/rail/.test(l.id))l.paint["line-color"]="#c5cad2";else if(/casing/.test(l.id))l.paint["line-color"]=["match",["get","class"],["motorway","trunk","primary"],"#e2bd5c","#c9ced6"];else l.paint["line-color"]=["match",["get","class"],["motorway","trunk","primary"],"#ffe08a",["secondary","tertiary"],"#ffffff",["path","track"],"#e6e9ee","#ffffff"];}
   else{if(/casing/.test(l.id))l.paint["line-color"]="#101216";else l.paint["line-color"]=["match",["get","class"],["motorway","trunk","primary"],"#5a6170",["secondary","tertiary"],"#4b525f","#3a404b"];}}
  else if(l.type==="symbol"&&sl==="transportation_name"){l.paint["text-color"]=lt?"#3b4250":"#dfe3ea";l.paint["text-halo-color"]=lt?"#ffffff":"#14171c";l.paint["text-halo-width"]=1.6;}
 });
 return s;}

/* ---------- interface ---------- */
var CSSL='#gps.light{background:#e5e8ec;color:#1b2330}#gps.light .gban,#gps.light .gfh{color:#fff}#gps.light .gwz{background:rgba(255,255,255,.95);border-color:rgba(11,132,198,.45);box-shadow:0 6px 18px rgba(20,30,50,.18)}#gps.light .gwz small{color:#0b7fc0}#gps.light .gchip>div{background:rgba(255,255,255,.95);border-color:rgba(20,30,50,.12);box-shadow:0 6px 18px rgba(20,30,50,.18)}#gps.light .gchip small{color:#5d6777}#gps.light .gspd,#gps.light .gpill,#gps.light .grnd button{background:rgba(255,255,255,.96);border-color:#dde2e9;box-shadow:0 4px 14px rgba(20,30,50,.18)}#gps.light .gspd small,#gps.light .gpill small{color:#5d6777}#gps.light .gspd.dim b{color:#a3abb8}#gps.light .gspd.over{background:#fde8e8;border-color:#e5484d}#gps.light .gspd.over b{color:#e0262c}#gps.light .grnd button.on{border-color:#4f8cff;background:#e7efff}#gps.light .gv3{color:#1b2330}#gps.light .gpan{background:rgba(255,255,255,.96);border-top-color:#dde2e9;box-shadow:0 -6px 18px rgba(20,30,50,.08)}#gps.light .geta .m{color:#5d6777}#gps.light .gprof{background:#e4f6ec;color:#11633a;border-color:#bfe6cf}#gps.light .galtbtn{background:#e7efff;border-color:#b9cff7;color:#1d4bb0}#gps.light .gstop{background:#fdeeee;border-color:#f2c4c6;color:#c4262c}#gps.light .galt,#gps.light .gsheet{background:#fff;border-top-color:#dde2e9;box-shadow:0 -12px 34px rgba(20,30,50,.18)}#gps.light .galtx{background:#eef1f5}#gps.light .galtc{border-color:#dde2e9;background:#f6f7f9;color:#1b2330}#gps.light .galtc.sel{border-color:#4c8dff;background:#e7efff}#gps.light .galtc .ln{background:#b9c1ce}#gps.light .galtc.sel .ln{background:#4c8dff}#gps.light .galtc .via{color:#5d6777}#gps.light .gtag.fast{background:#e4f6ec;color:#11633a}#gps.light .gtag.slow{background:#fff0d4;color:#8f5400}#gps.light .gtag.same{background:#eef1f5;color:#4a5363}#gps.light .gtag.cur{background:#e7efff;color:#1d4bb0}#gps.light .galtw,#gps.light .galtn,#gps.light .gsheet p,#gps.light .gtile small,#gps.light .gcard .hd small,#gps.light .gfl h4,#gps.light .growd small,#gps.light .gwait,#gps.light .gerr p{color:#5d6777}#gps.light .galtw i,#gps.light .gload i{border-color:#dde2e9;border-top-color:#4f8cff}#gps.light .galtgo.keep,#gps.light .gsec{background:#eef1f5;border-color:#dde2e9;color:#1b2330}#gps.light .galtb{background:#fff;box-shadow:0 3px 12px rgba(20,30,50,.3)}#gps.light .galtb:after{border-top-color:#fff}#gps.light .galtb.sel{background:#2f6fe4}#gps.light .galtb.sel:after{border-top-color:#2f6fe4}#gps.light .gattr{color:#7b8493}#gps.light .gscrim{background:rgba(20,28,40,.38)}#gps.light .ghandle{background:#cfd5de}#gps.light .gtile,#gps.light .gopt{background:#f3f5f8;border-color:#dde2e9}#gps.light .gopt.pri{background:#00387B;border-color:#00387B}#gps.light .gopt.ok{background:#1f9d5a;border-color:#1f9d5a}#gps.light .gcard{background:rgba(255,255,255,.98);border-top-color:#dde2e9;box-shadow:0 -12px 34px rgba(20,30,50,.18)}#gps.light .gbar{background:#e3e7ec}#gps.light .gbar i{background:#8a93a3}#gps.light .gtoast{background:rgba(255,255,255,.97);border-color:#dde2e9;color:#1b2330;box-shadow:0 8px 24px rgba(20,30,50,.2)}#gps.light .gfull,#gps.light .gerr{background:#f2f4f7}#gps.light .growd{border-bottom-color:#e6e9ee}#gps.light .growd .pi{background:#eef1f5}#gps.light .gerr a,#gps.light .gerr button{background:#fff;border-color:#dde2e9;color:#1b2330}#gps.light .gerr .pri{background:#00387B;border-color:#00387B;color:#fff}#gps.light .gload{background:#e5e8ec;color:#5d6777}';
var CSS='#gps{position:fixed;inset:0;z-index:3000;background:#1c1f25;color:#f1f3f6;font:16px/1.3 Roboto,system-ui,-apple-system,"Segoe UI",sans-serif;overflow:hidden;-webkit-user-select:none;user-select:none}'+
'#gps button{font:inherit;color:inherit;cursor:pointer}#gps .gmap{position:absolute;inset:0}'+
'#gps .gtop{position:absolute;left:0;right:0;top:0;display:flex;flex-direction:column;z-index:5;pointer-events:none}#gps .gtop>*{pointer-events:auto}'+
'#gps .gban{display:flex;flex-direction:column;backdrop-filter:blur(1.5px);-webkit-backdrop-filter:blur(1.5px);text-shadow:0 1px 2px rgba(0,0,0,.35)}'+
'#gps .gb1{background:rgba(0,56,123,.72);padding:12px 18px 12px;padding-top:max(12px,env(safe-area-inset-top));display:flex;align-items:center;gap:16px;min-height:70px}'+
'#gps .gb1 .d{font-size:36px;font-weight:900;line-height:1}#gps .gb1 .l{font-size:17px;font-weight:500}#gps .gb1 .s{font-size:18px;font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'#gps .gb2{background:rgba(0,36,82,.8);padding:7px 18px;display:flex;align-items:center;gap:10px;font-size:15px}#gps .gb2 span:last-child{font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'#gps .gwzw{display:flex;justify-content:center;padding:10px 12px 0}#gps .gwz{pointer-events:auto;display:flex;align-items:center;gap:12px;min-height:56px;background:rgba(18,20,25,.82);backdrop-filter:blur(1.5px);-webkit-backdrop-filter:blur(1.5px);border:1px solid rgba(51,204,255,.45);border-radius:16px;padding:8px 18px 8px 14px;color:#f1f3f6;text-decoration:none;box-shadow:0 6px 16px rgba(0,0,0,.45)}#gps .gwz b{display:block;font-size:17px;font-weight:800}#gps .gwz small{display:block;font-size:14px;color:#33ccff;font-weight:600}#gps .gwz{transition:transform .5s cubic-bezier(.32,.72,0,1),opacity .3s ease}#gps .gwz:active{transform:scale(.96);opacity:.82;transition-duration:.12s,.08s}'+
'#gps .gchip{display:flex;justify-content:center;padding:10px 12px 0}#gps .gchip>div{display:flex;align-items:center;gap:12px;background:rgba(18,20,25,.55);backdrop-filter:blur(1.5px);-webkit-backdrop-filter:blur(1.5px);border:1px solid rgba(255,255,255,.25);padding:7px 16px 7px 7px;border-radius:14px;box-shadow:0 6px 18px rgba(0,0,0,.35);text-shadow:0 1px 2px rgba(0,0,0,.35)}'+
'#gps .gchip .ci{width:36px;height:36px;border-radius:50%;border:2px solid #fff;box-sizing:border-box;display:flex;align-items:center;justify-content:center}#gps .gchip b{display:block;font-size:16px}#gps .gchip small{display:block;font-size:13px;color:#d5d9e0}'+
'#gps .gbot{position:absolute;left:0;right:0;bottom:0;display:flex;flex-direction:column;z-index:5}'+
'#gps .grow{display:grid;grid-template-columns:72px minmax(0,1fr) 72px;gap:18px;align-items:center;padding:0 14px 12px;position:relative}'+
'#gps .gspd{position:relative;width:72px;height:72px;border-radius:16px;background:rgba(24,27,34,.76);backdrop-filter:blur(1.5px);-webkit-backdrop-filter:blur(1.5px);border:1px solid #2c313c;box-sizing:border-box;box-shadow:0 6px 16px rgba(0,0,0,.45);display:flex;flex-direction:column;align-items:center;justify-content:center}'+
'#gps .gspd b{font-size:32px;font-weight:900;line-height:1;transition:color .3s ease}#gps .gspd{transition:background-color .35s ease,border-color .35s ease}#gps .gspd:after{content:"";position:absolute;inset:-1px;border-radius:16px;pointer-events:none}#gps .gspd .glim{z-index:2}#gps .gspd.over{background:rgba(229,72,77,.26);border-color:#e5484d}#gps .gspd.over b{color:#ff4d52;animation:gOverPop .55s cubic-bezier(.3,1.7,.5,1)}#gps .gspd.over:after{animation:gOverRing 1.6s ease-out .2s infinite}@keyframes gOverPop{0%{transform:scale(1)}35%{transform:scale(1.2)}100%{transform:scale(1)}}@keyframes gOverRing{0%{box-shadow:0 0 0 0 rgba(229,72,77,.6)}100%{box-shadow:0 0 0 13px rgba(229,72,77,0)}}@media (prefers-reduced-motion:reduce){#gps .gspd.over b,#gps .gspd.over:after{animation:none}}#gps .gspd small{font-size:12px;color:#9aa3b2;margin-top:3px}#gps .gspd.dim b{color:#6f7785}'+
'#gps .glim{position:absolute;top:-13px;right:-13px;width:38px;height:38px;border-radius:50%;background:#fff;border:4px solid #e5484d;box-sizing:border-box;display:flex;align-items:center;justify-content:center;color:#111;font-size:15px;font-weight:900;letter-spacing:-.3px}'+
'#gps .gpill{justify-self:center;max-width:100%;min-height:44px;border:1px solid #2c313c;background:rgba(24,27,34,.76);backdrop-filter:blur(1.5px);-webkit-backdrop-filter:blur(1.5px);border-radius:16px;padding:7px 14px;box-shadow:0 6px 16px rgba(0,0,0,.45);display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}'+
'#gps .gpill b{font-size:15px;font-weight:700;line-height:1.25}#gps .gpill small{font-size:12.5px;color:#9aa3b2}'+
'#gps .grnd{position:absolute;right:14px;bottom:calc(100% + 12px);display:flex;flex-direction:column;gap:10px}'+
'#gps .grnd button{width:50px;height:50px;border-radius:50%;border:1px solid #2c313c;background:rgba(24,27,34,.76);display:flex;align-items:center;justify-content:center;box-shadow:0 6px 16px rgba(0,0,0,.45)}#gps .grnd button.on{border-color:#4f8cff;background:rgba(0,56,123,.85)}#gps .grnd button[hidden]{display:none}#gps .gv3{font-size:16.5px;font-weight:800;color:#f1f3f6;letter-spacing:.2px;line-height:1}'+
'#gps .gpan{background:rgba(20,23,29,.76);backdrop-filter:blur(1.5px);-webkit-backdrop-filter:blur(1.5px);border-top:1px solid #2c313c;padding:12px 16px 14px;padding-bottom:max(14px,env(safe-area-inset-bottom));display:flex;flex-direction:column;gap:10px}'+
'#gps .geta{display:flex;align-items:flex-end;justify-content:space-between;gap:12px}#gps .geta .t{font-size:28px;font-weight:900;line-height:1}#gps .geta .m{font-size:14px;color:#9aa3b2}'+
'#gps .gdest{display:flex;flex-direction:column;align-items:flex-end;gap:6px;min-width:0}#gps .gdest b{font-size:15px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:210px}'+
'#gps .gprof{display:flex;align-items:center;gap:6px;background:#13281d;color:#6fe0a3;border:1px solid #1f5a3a;padding:3px 10px;border-radius:999px;font-size:12.5px;font-weight:500;max-width:210px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}#gps .gprof i{width:8px;height:8px;border-radius:50%;background:#2fbf71;flex:0 0 auto}'+
'#gps .gbtns{display:grid;grid-template-columns:2fr 1fr;gap:10px}#gps .gsig{min-height:56px;border-radius:14px;border:0;background:#f5a524;color:#17130a;display:flex;align-items:center;justify-content:center;gap:8px;font-size:19px;font-weight:900}'+
'#gps .gabord{min-height:56px;border-radius:14px;border:0;background:#1f9d5a;color:#fff;display:flex;align-items:center;justify-content:center;gap:10px;padding:0 16px;font-size:17px;font-weight:900;box-shadow:0 4px 14px rgba(0,0,0,.35)}#gps .gabord i{width:26px;height:26px;border:2.5px solid #fff;border-radius:7px;display:flex;align-items:center;justify-content:center;flex:0 0 auto}#gps .gabord:disabled{opacity:.6}'+
'#gps .gbtns.g3{grid-template-columns:1.12fr 1.28fr .9fr;gap:8px}#gps .gbtns.g3 .gsig{font-size:16.5px;gap:6px}#gps .gbtns.g3 .gstop{font-size:15.5px}'+
'#gps .galtbtn{min-height:56px;border-radius:14px;border:1px solid #2f4b7a;background:#17243b;color:#d6e4ff;display:flex;align-items:center;justify-content:center;gap:6px;font-size:16px;font-weight:800;padding:0 6px;white-space:nowrap}'+
'#gps .gstop{min-height:56px;border-radius:14px;border:1px solid #5a2a2d;background:#2a1719;color:#ff9a9d;font-size:16px;font-weight:700}'+
'#gps .gbot{transition:transform .5s cubic-bezier(.32,.72,0,1),opacity .3s ease}#gps.galton .gbot{transform:translateY(105%);opacity:0;pointer-events:none}'+
'#gps .galt{position:absolute;left:0;right:0;bottom:0;z-index:16;background:#181b22;border-top:1px solid #2c313c;border-radius:22px 22px 0 0;padding:10px 14px 14px;padding-bottom:max(14px,env(safe-area-inset-bottom));display:flex;flex-direction:column;gap:10px;box-shadow:0 -12px 34px rgba(0,0,0,.55);max-height:64%;box-sizing:border-box;animation:gup .52s cubic-bezier(.32,.72,0,1)}#gps .galt.gout{animation:gdown .34s cubic-bezier(.32,.72,0,1) forwards}'+
'#gps .galth{display:flex;align-items:center;justify-content:space-between;gap:10px}#gps .galth h3{margin:0;font-size:22px;font-weight:900}#gps .galtx{width:40px;height:40px;border-radius:50%;border:0;background:#262a33;display:flex;align-items:center;justify-content:center;flex:0 0 auto}'+
'#gps .galtl{display:flex;flex-direction:column;gap:8px;overflow:auto;min-height:0;-webkit-overflow-scrolling:touch}'+
'#gps .galtc{display:flex;align-items:center;gap:12px;padding:9px 13px 10px;border-radius:16px;border:1.5px solid #2c313c;background:#20242d;text-align:left;color:#f1f3f6;flex:0 0 auto;transition:transform .5s cubic-bezier(.32,.72,0,1),border-color .25s ease,background-color .25s ease}#gps .galtc.sel{border-color:#4c8dff;background:#172540}'+
'#gps .galtc .ln{width:6px;align-self:stretch;border-radius:3px;background:#5b6474;flex:0 0 auto;transition:background-color .25s ease}#gps .galtc.sel .ln{background:#4c8dff}#gps .galtc .mid{flex:1;min-width:0}#gps .galtc .r1{display:flex;align-items:center;justify-content:space-between;gap:8px}#gps .galtc b{display:block;font-size:22px;font-weight:900;line-height:1.15;white-space:nowrap}'+
'#gps .galtc .via{display:block;font-size:14px;color:#aeb6c3;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-top:2px}#gps .galtc .tg{display:flex;flex-wrap:wrap;justify-content:flex-end;gap:5px;min-width:0}#gps.galton .gchip{display:none}'+
'#gps .gtag{font-size:12px;font-weight:800;padding:3px 9px;border-radius:999px;white-space:nowrap}#gps .gtag.fast{background:#163a28;color:#5fe39a}#gps .gtag.slow{background:#3a2a14;color:#ffc061}#gps .gtag.same{background:#2a2f39;color:#c9d0db}#gps .gtag.cur{background:#24324d;color:#9cc0ff}'+
'#gps .galtw{display:flex;align-items:center;gap:12px;color:#9aa3b2;font-size:14.5px;padding:8px 4px}#gps .galtw i{width:20px;height:20px;border:3px solid #2c313c;border-top-color:#4f8cff;border-radius:50%;animation:gsp 1s linear infinite;flex:0 0 auto}#gps .galtn{color:#9aa3b2;font-size:14.5px;padding:4px 4px 2px;text-align:center}'+
'#gps .galtgo{background:#00387B;color:#fff;min-height:58px}#gps .galtgo.keep{background:#20242d;border:1px solid #2c313c;color:#f1f3f6}'+
'#gps .galtm{cursor:pointer}#gps .galtb{position:relative;background:#f1f3f6;color:#14171d;font-size:14.5px;font-weight:900;padding:6px 10px;border-radius:12px;box-shadow:0 3px 12px rgba(0,0,0,.5);white-space:nowrap;margin-bottom:8px;transition:background-color .25s ease,color .25s ease;animation:gbub .45s cubic-bezier(.32,.72,0,1)}'+
'#gps .galtb:after{content:"";position:absolute;left:50%;bottom:-7px;margin-left:-7px;border-style:solid;border-width:7px 7px 0;border-color:#f1f3f6 transparent transparent;transition:border-color .25s ease}#gps .galtb.sel{background:#2f6fe4;color:#fff}#gps .galtb.sel:after{border-top-color:#2f6fe4}'+
'@keyframes gbub{from{opacity:0;transform:translateY(6px) scale(.8)}to{opacity:1;transform:none}}'+
'#gps .gbig{min-height:64px;border-radius:16px;border:0;display:flex;align-items:center;justify-content:center;gap:10px;font-size:19px;font-weight:900}'+
'#gps .gsec{min-height:48px;border-radius:14px;border:1px solid #2c313c;background:#0e1014;color:#f1f3f6;font-size:15px;font-weight:700}'+
'#gps .gattr{font-size:10.5px;color:#6f7785;text-align:center}'+
'#gps .gscrim{position:absolute;inset:0;z-index:20;background:rgba(5,6,8,.62);display:flex;flex-direction:column;justify-content:flex-end}'+
'#gps .gsheet{background:#181b22;border-top:1px solid #2c313c;border-radius:22px 22px 0 0;padding:10px 16px 16px;padding-bottom:max(16px,env(safe-area-inset-bottom));display:flex;flex-direction:column;gap:12px;box-shadow:0 -12px 34px rgba(0,0,0,.55);max-height:92%;overflow:auto}'+
'#gps .ghandle{width:44px;height:5px;border-radius:3px;background:#3a404c;align-self:center}#gps .gsheet h3{margin:0;font-size:23px;font-weight:900}#gps .gsheet p{margin:0;color:#9aa3b2;font-size:13.5px}'+
'#gps .ggrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}#gps .gtile{min-height:84px;border-radius:14px;background:#20242d;border:1px solid #2c313c;display:flex;flex-direction:column;justify-content:space-between;align-items:flex-start;padding:10px 12px;gap:6px;text-align:left}'+
'#gps .gtile.w{grid-column:span 2;min-height:58px;flex-direction:row;align-items:center;justify-content:flex-start;gap:12px}#gps .gtile .ti{width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex:0 0 auto}#gps .gtile b{font-size:16px}#gps .gtile small{display:block;font-size:12.5px;color:#9aa3b2;font-weight:400}'+
'#gps .gopt{min-height:60px;border-radius:16px;border:1px solid #2c313c;background:#20242d;display:flex;align-items:center;gap:14px;padding:10px 16px;font-size:18px;font-weight:900;text-align:left}#gps .gopt.pri{background:#00387B;border-color:#00387B;color:#fff}#gps .gopt.ok{background:#1f9d5a;border-color:#1f9d5a;color:#fff}#gps .gopt.ok i{width:26px;height:26px;border:2.5px solid #fff;border-radius:7px;display:flex;align-items:center;justify-content:center;flex:0 0 auto}#gps .gopt small{display:block;font-size:13.5px;font-weight:700;opacity:.85;margin-top:1px}'+
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
/* transitions façon iOS : courbe ressort, feuilles qui montent, écrans poussés depuis la droite */
'#gps{animation:gopen .42s cubic-bezier(.32,.72,0,1)}#gps.gout{animation:gclose .3s cubic-bezier(.32,.72,0,1) forwards}'+
'#gps button{transition:transform .5s cubic-bezier(.32,.72,0,1),opacity .3s ease,background-color .25s ease;-webkit-tap-highlight-color:transparent}#gps button:active{transform:scale(.96);opacity:.82;transition-duration:.12s,.08s,.25s}'+
'#gps .gscrim{animation:gfade .38s ease-out}#gps .gscrim .gsheet{animation:gup .52s cubic-bezier(.32,.72,0,1)}#gps .gscrim.gout{animation:gfadeo .3s ease-out forwards}#gps .gscrim.gout .gsheet{animation:gdown .34s cubic-bezier(.32,.72,0,1) forwards}'+
'#gps .gcard{animation:gcard .5s cubic-bezier(.32,.72,0,1)}#gps .gcard.gout{animation:gcardo .3s cubic-bezier(.32,.72,0,1) forwards}'+
'#gps .gfull{animation:gpush .5s cubic-bezier(.32,.72,0,1)}#gps .gfull.gout{animation:gpop .34s cubic-bezier(.32,.72,0,1) forwards}'+
'#gps .gtoast{animation:gtoast .45s cubic-bezier(.32,.72,0,1)}#gps .gchip>div,#gps .gwzw{animation:gdrop .48s cubic-bezier(.32,.72,0,1)}'+
'@keyframes gfade{from{opacity:0}to{opacity:1}}@keyframes gfadeo{from{opacity:1}to{opacity:0}}'+
'@keyframes gopen{from{opacity:0;transform:scale(1.03)}to{opacity:1;transform:none}}@keyframes gclose{from{opacity:1;transform:none}to{opacity:0;transform:scale(1.03)}}'+
'@keyframes gup{from{transform:translateY(100%)}to{transform:none}}@keyframes gdown{from{transform:none}to{transform:translateY(100%)}}'+
'@keyframes gcard{from{opacity:0;transform:translateY(28px) scale(.97)}to{opacity:1;transform:none}}@keyframes gcardo{from{opacity:1;transform:none}to{opacity:0;transform:translateY(20px) scale(.97)}}'+
'@keyframes gpush{from{transform:translateX(100%)}to{transform:none}}@keyframes gpop{from{transform:none}to{transform:translateX(100%)}}'+
'@keyframes gtoast{from{opacity:0;transform:translate(-50%,10px) scale(.95)}to{opacity:1;transform:translate(-50%,0)}}'+
'@keyframes gdrop{from{opacity:0;transform:translateY(-10px) scale(.97)}to{opacity:1;transform:none}}'+
'@media (prefers-reduced-motion:reduce){#gps *,#gps{animation:none!important;transition:none!important}}'+
'#gps .gvfix{position:absolute;z-index:4;width:64px;height:64px;line-height:0;pointer-events:none;display:flex;align-items:center;justify-content:center}#gps .gvfix svg{transform-origin:50% 50%}#gps .gyroA{animation:gGyro 1s ease-in-out infinite}#gps .gyroB{animation:gGyro 1s ease-in-out -.5s infinite}@keyframes gGyro{0%,100%{opacity:1}50%{opacity:.35}}#gps .gfA{animation:gFlare 1s ease-in-out infinite}#gps .gfB{animation:gFlare 1s ease-in-out -.5s infinite}@keyframes gFlare{0%,100%{opacity:1}50%{opacity:0}}@media (prefers-reduced-motion:reduce){#gps .gyroA,#gps .gyroB,#gps .gfA,#gps .gfB{animation:none}}#gps .gvfix[hidden]{display:none}#gps .gveh{line-height:0;pointer-events:none}#gps .maplibregl-ctrl-bottom-left,#gps .maplibregl-ctrl-bottom-right{display:none}';

function el(html){var d=document.createElement("div");d.innerHTML=html;return d.firstElementChild;}
function toast(t,ms){var o=$(".gtoast");if(o)o.remove();var d=el('<div class="gtoast" role="status">'+esc(t)+'</div>');G.root.appendChild(d);setTimeout(function(){if(d.parentNode)d.remove();},ms||2800);}

function buildUi(){
 if(!document.getElementById("gpsCss")){var s=document.createElement("style");s.id="gpsCss";s.textContent=CSS+CSSL;document.head.appendChild(s);}
 var r=el('<div id="gps"'+(LT()?' class="light"':'')+' role="application" aria-label="Guidage GPS">'+
  '<div class="gmap" id="gmap"></div><div class="gvfix" id="gVeh" hidden>'+posMark()+'</div>'+
  '<div class="gtop"><div class="gban" id="gBan"></div><div id="gWz"></div><div id="gChip"></div></div>'+
  '<div class="gbot"><div class="grow"><div class="grnd"><button type="button" data-g="mute" aria-label="Couper ou remettre la voix" id="gMute"></button><button type="button" data-g="recenter" aria-label="Recentrer sur ma position" id="gRec" hidden>'+svgI(IC.target,22,"currentColor")+'</button><button type="button" data-g="view" id="gView" aria-label="Changer de vue"></button></div>'+
  '<div class="gspd" id="gSpd"><b>--</b><small>km/h</small><span class="glim">--</span></div><button type="button" class="gpill" data-g="addr" id="gPill"><b>…</b></button><div></div></div>'+
  '<div class="gpan" id="gPan"></div></div>'+
  '<div class="gload" id="gLoad"><i></i><span id="gLoadT">Ouverture du GPS…</span></div></div>');
 document.body.appendChild(r);G.root=r;paintMute();paintRec();
 r.addEventListener("click",onClick);
 r.addEventListener("input",function(ev){if(ev.target&&ev.target.id==="gDestQ")destSearch(ev.target.value);});
}
function setLoad(t){var l=$("#gLoad");if(t===null){if(l)l.remove();return;}if(!l){l=el('<div class="gload" id="gLoad"><i></i><span id="gLoadT"></span></div>');G.root.appendChild(l);}var s=$("#gLoadT");if(s)s.textContent=t;}
var RASTER={version:8,sources:{osm:{type:"raster",tiles:["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],tileSize:256,maxzoom:19}},layers:[{id:"bg",type:"background",paint:{"background-color":"#1c1f25"}},{id:"osm",type:"raster",source:"osm",paint:{"raster-brightness-max":0.5,"raster-saturation":-0.7,"raster-contrast":0.1}}]};
function rasterStyle(){var r=JSON.parse(JSON.stringify(RASTER));if(LT()){r.layers[0].paint["background-color"]="#e5e8ec";r.layers[1].paint={};}return r;}
function showErr(msg){
 var L=G.opts.links||{};var d=el('<div class="gerr"><h3>GPS indisponible</h3><p>'+esc(msg)+'</p><button type="button" class="pri" data-g="retry">Réessayer</button>'+
  (L.waze?'<a href="'+L.waze+'"'+(L.app?'':' target="_blank" rel="noopener"')+'>Ouvrir dans Waze</a>':'')+(L.gmaps?'<a href="'+L.gmaps+'"'+(L.app?'':' target="_blank" rel="noopener"')+'>Ouvrir dans Google Maps</a>':'')+
  '<button type="button" data-g="close">Fermer</button></div>');
 var o=$(".gerr");if(o)o.remove();setLoad(null);G.root.appendChild(d);
}
function paintMute(){var b=$("#gMute");if(b){b.innerHTML=svgI(G.mute?IC.mute:IC.vol,22,G.mute?C("#ff9a9d","#d93a3f"):"currentColor");b.classList.toggle("on",!!G.mute);}}
function paintRec(){var b=$("#gRec"),v=$("#gView"),off=!G.follow,sw=!!(b&&b.hidden===off);
 if(b){b.hidden=!off;b.classList.toggle("on",off);}if(v){v.hidden=off;paintView();}
 if(sw)swapIn(off?b:v);vehMode();}
function swapIn(x){if(!x||!x.animate||rm())return;try{x.animate([{opacity:0,transform:"scale(.55)"},{opacity:1,transform:"none"}],{duration:300,easing:SPR});}catch(e){}}
/* ---------- types de vue : 3D (suivi incliné), 2D (suivi vu du dessus), trajet entier nord en haut ---------- */
var VORD=["3d","2d","nord"],VNOM={"3d":"3D","2d":"2D, vue du dessus","nord":"trajet entier, nord en haut"};
var NLOGO='<svg width="32" height="32" viewBox="0 0 30 30" aria-hidden="true"><path d="M11 11.6V3.6l8 8v-8" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M15 13.4l5.8 12.9-5.8-3.2-5.8 3.2z" fill="#ff5a5f" stroke="#ff5a5f" stroke-width="1.4" stroke-linejoin="round"/></svg>';
function nextView(k){return VORD[(VORD.indexOf(k)+1)%VORD.length];}
function paintView(){var v=$("#gView");if(!v)return;var k=G.view||"3d";if(v._k===k)return;var re=v._k!=null;v._k=k;
 v.innerHTML=k==="nord"?NLOGO:'<b class="gv3">'+(k==="2d"?"2D":"3D")+'</b>';
 v.setAttribute("aria-label","Vue "+VNOM[k]+". Toucher pour passer à la vue "+VNOM[nextView(k)]+".");if(re&&!v.hidden)swapIn(v.firstElementChild);}
function setView(k){if(!G||G.alt)return;G.view=k;if(k!=="nord")try{localStorage.setItem("ambumaps-gps-vue",k);}catch(e){}
 if(k==="nord"){G._rc=null;G.follow=true;paintRec();fitNord();}else recenter(true);
 paintView();toast(k==="3d"?"Vue 3D":(k==="2d"?"Vue du dessus (2D)":"Trajet entier, nord en haut"),1600);}
function nordPad(){var H=G.root.clientHeight||innerHeight,W=G.root.clientWidth||innerWidth,tp=$(".gtop"),gb=$(".gbot"),
 pad={top:Math.round((tp?tp.offsetHeight:90)+34),bottom:Math.round((gb?gb.offsetHeight:200)+28),left:34,right:78};
 if(H-pad.top-pad.bottom<160)pad.top=Math.max(24,H-pad.bottom-160);return{pad:pad,W:W,H:H};}
function fitNord(){
 if(!G||!G.map||!G.map.easeTo||G.alt)return;G._nf=now();var b=[90,180,-90,-180];
 function add(p){if(!p)return;if(p[0]<b[0])b[0]=p[0];if(p[0]>b[2])b[2]=p[0];if(p[1]<b[1])b[1]=p[1];if(p[1]>b[3])b[3]=p[1];}
 if(G.R)slice(G.R,cutAt(),G.R.total).forEach(add);add(G.disp||G.pos);if(G.dest)add([G.dest.lat,G.dest.lon]);if(b[0]>b[2])return;
 var o=nordPad(),cam=camFit(b,o.pad,o.W,o.H);
 try{G.map.easeTo({center:cam.center,zoom:cam.zoom,bearing:0,pitch:0,padding:o.pad,duration:rm()?0:900,easing:function(t){return 1-Math.pow(1-t,4);}});}catch(e){}
 vehMode();if(G.disp&&G.veh){try{G.veh.setLngLat([G.disp[1],G.disp[0]]);G.veh.setRotation(G.dispH||0);}catch(e){}}}
/* vue d'ensemble : on recadre si la flèche sort de l'écran, et toutes les minutes pour suivre la partie qui reste */
function nordCheck(){var t=now();if(!G.map||G.alt||t-(G._nf||0)<3000)return;var p=G.disp||G.pos;if(!p)return;var out=t-(G._nf||0)>60000;
 if(!out&&G.map.project){try{var s=G.map.project([p[1],p[0]]),o=nordPad();out=s.x<o.pad.left*0.5||s.x>o.W-o.pad.right*0.5||s.y<o.pad.top*0.6||s.y>o.H-o.pad.bottom*0.6;}catch(e){}}
 if(out)fitNord();}
/* repère couché sur la route en vue 3D (même inclinaison que la carte) */
function vehTilt(){var fx=$("#gVeh"),s=fx&&fx.firstElementChild;if(!s||!G||!G.map)return;var pt=0;try{pt=G.map.getPitch()||0;}catch(e){}if(s._rl==null)s._rl=posRelief();var v=pt>0.5?(s._rl?"perspective(300px) rotateX("+pt.toFixed(1)+"deg) scaleY("+(1/Math.cos(pt*Math.PI/180)).toFixed(3)+")":"perspective(1200px) rotateX("+pt.toFixed(1)+"deg)"):"";if(s._tl!==v){s._tl=v;s.style.transform=v;}}
function vehMode(){vehTilt();var fx=$("#gVeh"),on=!!(G.follow&&G.view!=="nord"&&G.mapReady&&G.R&&!G._rc);if(fx)fx.hidden=!on;if(G.veh){if(!on&&G.disp){G.veh.setLngLat([G.disp[1],G.disp[0]]);G.veh.setRotation(G.dispH||0);}var e=G.veh.getElement();if(e)e.style.visibility=on||!G.R?"hidden":"visible";}}

function paintBanner(){
 var b=$("#gBan");if(!b||!G.R)return;var R=G.R,k=G.next,h,bk=(G.arrived?"a":G.rerouting?"r":"m"+k)+"|"+R.total;
 paintWz();
 var nw=b._bk!=null&&b._bk!==bk;b._bk=bk;if(nw)setTimeout(function(){popIn(b.firstElementChild,12);},0);
 if(G.arrived){h='<div class="gb1">'+svgI(IC.flag,56,"#fff",2.7)+'<div style="min-width:0"><div class="d" style="font-size:30px">Arrivé</div><div class="s">'+esc(G.dest.nom||"Destination")+'</div></div></div>';b.innerHTML=h;return;}
 if(G.rerouting){b.innerHTML='<div class="gb1">'+svgI(IC.straight,56,"#fff",2.7)+'<div><div class="d" style="font-size:26px">Recalcul…</div><div class="l">Nouvel itinéraire en cours</div></div></div>';return;}
 if(k<0||!R.man[k]){b.innerHTML='<div class="gb1">'+svgI(IC.straight,56,"#fff",2.7)+'<div><div class="d">'+fmtDist(R.total-G.along)+'</div><div class="l">Continue</div></div></div>';return;}
 var m=R.man[k],d=Math.max(0,m.d-G.along),st=manStreet(R,k);
 h='<div class="gb1">'+manSvg(R,k,56,2.7)+'<div style="display:flex;flex-direction:column;gap:1px;min-width:0"><div class="d">'+fmtDist(d)+'</div><div class="l">'+esc(manLabel(m))+'</div>'+(st?'<div class="s">'+esc(st)+'</div>':'')+'</div></div>';
 var k2=m.type===26?k+2:k+1,m2=R.man[k2];
 if(m2&&m2.d-m.d<150&&!(m2.type>=4&&m2.type<=6&&m2.d-m.d<20)){var s2=manStreet(R,k2);h+='<div class="gb2"><span>Puis</span>'+manSvg(R,k2,20,2.4)+'<span>'+esc(lcFirst(manLabel(m2)).replace(/^tourne /,"").replace(/^serre /,"légèrement ")+(s2?" · "+s2:""))+'</span></div>';}
 b.innerHTML=h;
}
function paintWz(){var w=$("#gWz");if(!w)return;var on=!!(G.arrived&&G.dest&&G.dest.lat!=null);if(on===!!w._on)return;w._on=on;
 w.innerHTML=on?'<div class="gwzw"><a class="gwz" href="https://waze.com/ul?ll='+(+G.dest.lat).toFixed(6)+","+(+G.dest.lon).toFixed(6)+'&navigate=yes" target="_blank" rel="noopener">'+
  svgI("M4 12a8 8 0 0 1 13.7-5.6 M20 4v4.5h-4.5 M20 12a8 8 0 0 1-13.7 5.6 M4 20v-4.5h4.5",26,"#33ccff",2.4)+'<span><b>Pas au bon endroit ?</b><small>Basculer sur Waze</small></span></a></div>':"";}
function chipHtml(k,t1,t2,border){return'<div class="gchip"><div style="border-color:'+border+'"><div class="ci" style="background:'+COL[k][0]+'">'+glyph(k,22)+'</div><div><b>'+esc(t1)+'</b><small>'+esc(t2)+'</small></div></div></div>';}
function paintChip(){
 var c=$("#gChip");if(!c)return;
 /* On ne recrée la pastille que si l'alerte change : sinon on met juste la distance à jour (pas de clignement) */
 var set=function(key,k,t1,t2,border){if(c._k===key){var sm=c.querySelector("small");if(sm&&sm.textContent!==t2)sm.textContent=t2;return;}c._k=key;c.innerHTML=chipHtml(k,t1,t2,border);};
 if(G.rec){set("rec","pothole","Enregistrement en cours","Route dégradée · "+fmtDist(lenM(G.rec.pts)),"rgba(242,194,0,.55)");return;}
 var hz=upcoming();if(!hz){if(c._k){c._k="";c.innerHTML="";}return;}
 var d=hz.along-G.along;set(hz.t+"|"+Math.round(hz.along/25),KIND[hz.t],NOM[hz.t],(d<15?"maintenant":"dans "+fmtDist(d))+(hz.t==="ralentisseur"?" · ralentis":""),"rgba(255,255,255,.28)");
}
/* limitation : celle de la carte si elle est connue ; sinon 50 km/h en agglomération et 80 km/h hors agglomération
   (zone urbaine ou non d'après la BD TOPO de l'IGN), 130 sur autoroute */
var URB_W="https://data.geopf.fr/wfs/ows?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&TYPENAMES=BDTOPO_V3:troncon_de_route&OUTPUTFORMAT=application/json&SRSNAME=EPSG:4326&COUNT=60&PROPERTYNAME=geometrie,nature,urbain&BBOX=",URB_NO=/^(chemin|sentier|escalier|piste cyclable|bac|liaison|passerelle)/i;
function edgeLim(e){if(!e)return null;if(e.lim)return e.lim;if(e.rc==="motorway")return 130;if(e.urb===true)return 50;if(e.urb===false)return 80;return null;}
function urbNeed(e){var E=G.R&&G.R.edges;if(!E)return;var n=0;
 for(var i=0;i<E.length&&n<3;i++){var x=E[i];if(x.b<G.along-5)continue;if(x.a>G.along+700)break;n++;if(!x.lim&&x.rc!=="motorway"&&x.urb===undefined&&!x.urbP&&now()-(x.urbT||0)>60000)urbFetch(x);}}
function urbFetch(x){var m=x.mid;if(!m)return;x.urbP=true;var d=0.00035,bb=[m[0]-d,m[1]-d*1.4,m[0]+d,m[1]+d*1.4].map(function(v){return v.toFixed(6);}).join(",");
 var ac=window.AbortController?new AbortController():null,to=setTimeout(function(){if(ac)ac.abort();},7000);
 fetch(URB_W+bb+",urn:ogc:def:crs:EPSG::4326",ac?{signal:ac.signal}:{}).then(function(r){if(!r.ok)throw new Error("ign");return r.json();}).then(function(j){clearTimeout(to);x.urbP=false;
  var P=A.distM,best=null;((j&&j.features)||[]).forEach(function(f){var pr=f.properties||{},g=f.geometry;if(!g||URB_NO.test(pr.nature||"")||typeof pr.urbain!=="boolean")return;var c=g.type==="MultiLineString"?g.coordinates[0]:g.coordinates;if(!c||c.length<2)return;
   for(var k=0;k<c.length;k++){var dd=P(m,[c[k][1],c[k][0]]);if(k){var a=[c[k-1][1],c[k-1][0]],b=[c[k][1],c[k][0]],q=[(a[0]+b[0])/2,(a[1]+b[1])/2];dd=Math.min(dd,P(m,q));}if(!best||dd<best.d)best={d:dd,u:pr.urbain};}});
  x.urb=best&&best.d<45?best.u:null;if(G)paintSpeed();},function(){clearTimeout(to);x.urbP=false;x.urbT=now();});}
function curEdge(){var E=G.R&&G.R.edges;if(!E)return null;for(var i=0;i<E.length;i++)if(E[i].a<=G.along+0.5&&G.along<E[i].b)return E[i];return E.length&&G.along>=E[E.length-1].a?E[E.length-1]:null;}
function roadName(along){var E=G.R&&G.R.edges;if(E){for(var i=0;i<E.length;i++)if(E[i].a<=along+0.5&&along<E[i].b&&E[i].name)return E[i].name;}
 var R=G.R;if(R){for(var j=R.man.length-1;j>=0;j--)if(R.man[j].d<=along+1){var s=(R.man[j].street_names&&R.man[j].street_names[0])||(R.man[j].begin_street_names&&R.man[j].begin_street_names[0]);if(s)return s;break;}}
 return"";}
function paintSpeed(){
 var s=$("#gSpd");if(!s)return;var stale=!G.lastFixT||now()-G.lastFixT>5000||(G.acc&&G.acc>60);
 var v=G.speed==null?"--":String(Math.max(0,Math.round(G.speed)));var e=curEdge(),el=edgeLim(e),lim=el?String(el):"--";urbNeed(e);
 var over=!stale&&G.speed!=null&&el&&Math.round(G.speed)>el,cn="gspd"+(stale?" dim":"")+(over?" over":"");
 /* on garde les mêmes éléments : l'animation de dépassement ne repart pas à chaque position reçue */
 if(!s._b||!s._b.parentNode){s.innerHTML='<b></b><small>km/h</small><span class="glim"></span>';s._b=s.firstChild;s._l=s.lastChild;}
 if(s._b.textContent!==v)s._b.textContent=v;if(s._l.textContent!==lim)s._l.textContent=lim;if(s.className!==cn)s.className=cn;
}
function paintPill(){
 var p=$("#gPill");if(!p)return;var html;
 if(G.addr&&now()-G.addr.t<9000)html='<b>'+esc(G.addr.l1)+'</b>'+(G.addr.l2?'<small>'+esc(G.addr.l2)+'</small>':'');
 else{G.addr=null;var n=roadName(G.along)||"Route sans nom",w=n.lastIndexOf(" ");
 html='<b>'+(w>0?esc(n.slice(0,w))+' <span style="white-space:nowrap">'+esc(n.slice(w+1))+' '+svgI(IC.chev,15,C("#9aa3b2","#6b7484"),2.6).replace('<svg ','<svg style="vertical-align:-2px" ')+'</span>':esc(n)+' '+svgI(IC.chev,15,C("#9aa3b2","#6b7484"),2.6).replace('<svg ','<svg style="vertical-align:-2px" '))+'</b>';}
 if(html!==G._pill){G._pill=html;p.innerHTML=html;}
}
/* heure d'arrivée : les temps de Valhalla (trop lents) sont corrigés par tronçon selon leur vitesse (A.etaFac),
   puis par le réglage appris sur les vrais trajets du téléphone et par l'écart mesuré pendant ce trajet-ci. */
function manK(m){var v=m.time>0?(m.lenM/1000)/(m.time/3600):0;return A.etaFac?A.etaFac(v):1;}
function etaUrg(){return!!(G.opts&&(G.opts.urg||G.opts.vitale));}
function etaMul(){var L=A.etaLearned?A.etaLearned(etaUrg()):1,e=G.eta,w=0,f=1;if(e&&e.p>=90){f=Math.max(0.6,Math.min(1.5,e.a/(e.p*L)));w=Math.min(0.7,e.p/900);}return L*((1-w)+w*f);}
function remTime(raw){var R=G.R,a=G.along,t=0;R.man.forEach(function(m){if(m.e<=a)return;t+=(m.time||0)*(raw?1:manK(m))*(m.d>=a?1:(m.e-a)/m.lenM);});return raw?t:t*etaMul();}
function routeEta(R){var t=0;R.man.forEach(function(m){t+=(m.time||0)*manK(m);});return t*etaMul();}
function predBetween(R,a0,a1){var t=0;R.man.forEach(function(m){var s=Math.max(m.d,a0),f=Math.min(m.e,a1);if(f>s)t+=(m.time||0)*manK(m)*(f-s)/m.lenM;});return t;}
/* temps réellement mis contre temps prévu, sur la partie déjà roulée (sur le trajet, sans les longs arrêts) */
function etaTrack(a0,on){var e=G.eta||(G.eta={a:0,p:0,t:now(),still:0,r:G.R}),t=now(),dt=(t-e.t)/1000;e.t=t;
 if(e.r!==G.R){e.r=G.R;return;}if(G.arrived||G.rerouting||!on||!(dt>0)||dt>30)return;
 var da=G.along-a0;if(da<0||da>600)return;if(da<1){e.still+=dt;if(e.still>120)return;}else e.still=0;
 e.a+=dt;e.p+=predBetween(G.R,a0,G.along);}
function etaLearnNow(g){var e=g&&g.eta;if(e&&!g.sim&&e.p>=240&&A.etaLearn){try{A.etaLearn(!!(g.opts&&(g.opts.urg||g.opts.vitale)),e.a/e.p);}catch(x){}}if(g)g.eta=null;}
function paintPanel(force){
 var p=$("#gPan");if(!p)return;var mode=G.rec?"rec":(G.arrived?(G.opts.pickup?"arrP":"arr"):"nav"),h;
 var rt=G.R?remTime():0,rd=G.R?Math.max(0,G.R.total-G.along):0,t1=G.R?hhmm(now()+rt*1000):"--:--",t2=G.R?Math.max(1,Math.round(rt/60))+" min · "+fmtDist(rd):"Calcul…";
 if(mode===G.panMode&&!force){var a=$("#gEtaT"),b=$("#gEtaM"),c=$("#gDestN");if(a&&a.textContent!==t1)a.textContent=t1;if(b&&b.textContent!==t2)b.textContent=t2;if(c&&c.textContent!==(G.dest.nom||"Destination"))c.textContent=G.dest.nom||"Destination";return;}
 G.panMode=mode;var attr='<div class="gattr">© OpenStreetMap · OpenFreeMap · Valhalla</div>';
 var sig='<div class="gbtns"><button type="button" class="gsig" data-g="sig">'+glyph("danger",22,"#17130a","#f5a524")+'<span>Signaler</span></button><button type="button" class="gstop" data-g="stop">Arrêter</button></div>';
 var sig3=sig.replace('class="gbtns"','class="gbtns g3"').replace('<button type="button" class="gstop"','<button type="button" class="galtbtn" data-g="alt" aria-label="Itinéraires alternatifs">'+svgI(IC.alt,21,C("#9cc0ff","#2353b5"),2.3)+'<span>Itinéraires</span></button><button type="button" class="gstop"');
 if(mode==="rec")h='<div style="font-size:14.5px;color:'+C("#9aa3b2","#5d6777")+';text-align:center">Touche quand la route redevient correcte.</div><button type="button" class="gbig" style="background:#f2c200;color:#2b2300" data-g="recEnd">'+svgI(IC.stop,22,"#2b2300",2.6)+'<span>Fin de la route dégradée</span></button><button type="button" class="gsec" data-g="recCancel">Annuler le signalement</button>';
 else if(mode==="arr")h='<button type="button" class="gbig" style="background:#00387B;color:#fff" data-g="finish">Terminer le guidage</button>'+sig;
 else if(mode==="arrP")h='<div class="geta"><div><div class="t">Arrivé</div><div class="m">'+(G.opts.urg?"Chez le patient":"Prise en charge")+'</div></div><button type="button" class="gabord" id="gAbord" data-g="abord"><i>'+svgI("M5 12.5l4.5 4.5L19 7.5",18,"#fff",3)+'</i><span>Patient à bord</span></button></div>'+sig;
 else h='<div class="geta"><div><div class="t" id="gEtaT">'+t1+'</div><div class="m" id="gEtaM">'+esc(t2)+'</div></div><div class="gdest"><b id="gDestN">'+esc(G.dest.nom||"Destination")+'</b>'+(G.opts.label?'<span class="gprof"><i></i><span>'+esc(G.opts.label)+'</span></span>':'')+'</div></div>'+sig3;
 var chg=p._pm!=null&&p._pm!==mode;p._pm=mode;
 p.innerHTML=h+attr;if(chg)popIn(p.firstElementChild,14);
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
 /* les ralentisseurs restent affichés mais ne sont plus annoncés à voix haute */
 var hz=upcoming(function(h){return h.t!=="ralentisseur";});if(hz&&!hz.said){var dh=hz.along-G.along,lim=v>19?400:220;if(dh<=lim&&dh>25){hz.said=1;say(DIT[hz.t]+" dans "+sayDist(dh)+".");}}
}

/* ---------- dangers sur le trajet ---------- */
function upcoming(f){var L=G.haz||[],v=Math.max(G.speed||0,30)/3.6,win=v>19?700:400;
 for(var i=0;i<L.length;i++){var d=L[i].along-G.along;if(d<-8)continue;if(d>win)return null;if(L[i].t==="degradee"&&L[i].end<G.along)continue;if(f&&!f(L[i]))continue;return L[i];}return null;}
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
var W_ARR=["interpolate",["exponential",1.5],["zoom"],12,2.6,15,4.8,17,7.8,19,14.4],W_ARRO=["interpolate",["exponential",1.5],["zoom"],12,2.2,15,3.2,17,5.2,19,9.6];
var TURN={2:1,3:1,9:1,10:1,11:1,12:1,13:1,14:1,15:1,16:1,18:1,19:1,20:1,21:1,23:1,24:1,26:1,27:1,37:1,38:1};
function roundRing(P,pts,rs,n){var out=[];
 for(var i=0;i<pts.length;i++){var p=pts[i],p0=pts[(i+pts.length-1)%pts.length],p1=pts[(i+1)%pts.length];
  function tw(q,d){var dx=q[0]-p[0],dy=q[1]-p[1],l=Math.sqrt(dx*dx+dy*dy)||1;d=Math.min(d,l*0.45);return[p[0]+dx/l*d,p[1]+dy/l*d];}
  var a=tw(p0,rs[i]),b=tw(p1,rs[i]);for(var j=0;j<=n;j++){var t=j/n,u=1-t;out.push([u*u*a[0]+2*u*t*p[0]+t*t*b[0],u*u*a[1]+2*u*t*p[1]+t*t*b[1]]);}}
 out.push(out[0]);return out.map(function(q){var g=P.ll(q[0],q[1]);return[g[1],g[0]];});}
function manArrow(){
 if(!G.mapReady)return;var R=G.R,k=G.next,m=R&&R.man[k],zb=Math.round((G.zoom||17)*4)/4,a=0,b=0;
 if(m&&TURN[m.type]){var pv=R.man[k-1];
  if(m.type===26&&m.e-m.d>3&&m.e-m.d<700){a=m.d-4;b=m.e+12;}
  else if(m.type===27&&pv&&pv.type===26&&m.d-pv.d<700){a=pv.d-4;b=m.d+12;}
  else{a=m.d-25;b=m.d+((m.type===26||m.type===27)?28:14);}
  a=Math.max(0,a,cutAt());b=Math.min(R.total,b);}
 var key=(R?R.total:0)+"|"+k+"|"+!!G.arrived+"|"+!!G.rerouting+"|"+zb+"|"+Math.round(a*2);if(key===G._manKey)return;G._manKey=key;
 var Lf=[],Hf=[];
 if(m&&!G.arrived&&!G.rerouting&&TURN[m.type]){
  if(b-a>6){var sh=slice(R,a,b),P=mkProj(sh[0][0]),e=P.xy(pointAt(R,b)),f=P.xy(pointAt(R,Math.max(a,b-5))),dx=e[0]-f[0],dy=e[1]-f[1],L=Math.sqrt(dx*dx+dy*dy)||1,ux=dx/L,uy=dy/L,nx=-uy,ny=ux;
   /* tête aussi large à l'écran que la flèche de position (≈30 px), coins arrondis */
   var mpp=40075016*Math.cos(sh[0][0]*Math.PI/180)/(512*Math.pow(2,zb)),hw=Math.max(2,15*mpp),hl=hw*1.6;
   Lf.push(line(sh));
   var ring=roundRing(P,[[e[0]+nx*hw,e[1]+ny*hw],[e[0]+ux*hl,e[1]+uy*hl],[e[0]-nx*hw,e[1]-ny*hw]],[hw*0.45,hw*0.55,hw*0.45],6);
   Hf.push({type:"Feature",properties:{},geometry:{type:"Polygon",coordinates:[ring]}});}}
 src("gManL",fc(Lf));src("gManH",fc(Hf));
}
var KCOL=["match",["get","k"],"ralentissement","#ff8a1f","arret","#f03e3e","#8b95a6"];
function fc(f){return{type:"FeatureCollection",features:f||[]};}
function line(c,props){return{type:"Feature",properties:props||{},geometry:{type:"LineString",coordinates:c.map(function(p){return[p[1],p[0]];})}};}
function addLayers(){
 var m=G.map,ly=m.getStyle().layers||[],before,last=-1;ly.forEach(function(l,i){if(l.type!=="symbol")last=i;});
 for(var i=last+1;i<ly.length;i++){if(ly[i].type==="symbol"){before=ly[i].id;break;}}
 ["gRoute","gRouteN","gOnA","gOffA","gOnD","gOffD","gRecD","gManL","gManH"].forEach(function(id){m.addSource(id,{type:"geojson",data:fc()});});
 function L(o){m.addLayer(o,before);}
 var round={"line-cap":"round","line-join":"round"};
 L({id:"gOffAc",type:"line",source:"gOffA",layout:round,paint:{"line-color":C("#121418","#ffffff"),"line-width":W_OC}});
 L({id:"gOffDc",type:"line",source:"gOffD",layout:round,paint:{"line-color":C("#121418","#ffffff"),"line-width":W_OC}});
 L({id:"gOffAf",type:"line",source:"gOffA",layout:round,paint:{"line-color":KCOL,"line-width":W_OF}});
 L({id:"gOffDf",type:"line",source:"gOffD",layout:round,paint:{"line-color":C("#4b525f","#8a93a3"),"line-width":W_OF}});
 L({id:"gOffDd",type:"line",source:"gOffD",layout:round,paint:{"line-color":"#ffd43b","line-width":W_ODOT,"line-dasharray":[0,2.4]}});
 L({id:"gRc",type:"line",source:"gRoute",layout:round,paint:{"line-color":"#0c2f73","line-width":W_CAS}});
 L({id:"gRcN",type:"line",source:"gRouteN",layout:round,paint:{"line-color":"#0c2f73","line-width":W_CAS}});
 L({id:"gRf",type:"line",source:"gRoute",layout:round,paint:{"line-color":"#4c8dff","line-width":W_FIL}});
 L({id:"gRfN",type:"line",source:"gRouteN",layout:round,paint:{"line-color":"#4c8dff","line-width":W_FIL}});
 L({id:"gOnAf",type:"line",source:"gOnA",layout:{"line-cap":"butt","line-join":"round"},paint:{"line-color":KCOL,"line-width":W_FIL}});
 L({id:"gOnDe",type:"line",source:"gOnD",layout:round,paint:{"line-color":"#2b2300","line-width":W_DOTE,"line-dasharray":[0,1.6]}});
 L({id:"gOnDd",type:"line",source:"gOnD",layout:round,paint:{"line-color":"#ffd43b","line-width":W_DOT,"line-dasharray":[0,2.2]}});
 L({id:"gRecE",type:"line",source:"gRecD",layout:round,paint:{"line-color":"#2b2300","line-width":W_DOTE,"line-dasharray":[0,1.6]}});
 L({id:"gRecDd",type:"line",source:"gRecD",layout:round,paint:{"line-color":"#ffd43b","line-width":W_DOT,"line-dasharray":[0,2.2]}});
 L({id:"gManLc",type:"line",source:"gManL",layout:round,paint:{"line-color":"#0c2f73","line-width":W_FIL}});
 L({id:"gManHo",type:"line",source:"gManH",layout:{"line-join":"round"},paint:{"line-color":"#0c2f73","line-width":W_ARRO}});
 L({id:"gManLf",type:"line",source:"gManL",layout:round,paint:{"line-color":"#ffffff","line-width":W_ARR}});
 L({id:"gManHf",type:"fill",source:"gManH",paint:{"fill-color":"#ffffff"}});
 m.addSource("gAlt",{type:"geojson",data:fc()});
 L({id:"gAltC",type:"line",source:"gAlt",layout:round,paint:{"line-color":["case",["==",["get","sel"],1],"#0c2f73",C("#2b3039","#7d8799")],"line-width":W_CAS}});
 L({id:"gAltL",type:"line",source:"gAlt",layout:round,paint:{"line-color":["case",["==",["get","sel"],1],"#4c8dff",C("#8f9ab0","#b9c1ce")],"line-width":W_FIL}});
 m.on("click","gAltC",function(e){var f=e.features&&e.features[0];if(f&&G&&G.alt)selectAlt(+f.properties.i);});
 m.addSource("gPins",{type:"geojson",data:fc()});
 m.addLayer({id:"gPinsL",type:"symbol",source:"gPins",layout:{"icon-image":["get","img"],"icon-anchor":"bottom","icon-allow-overlap":true,"icon-ignore-placement":true,"icon-pitch-alignment":"viewport","icon-rotation-alignment":"viewport","icon-size":["interpolate",["linear"],["zoom"],13,0.7,16,0.9,18,1]}});
 m.on("click","gPinsL",function(e){var f=e.features&&e.features[0],x=f&&G.pinData&&G.pinData[f.properties.id];if(x)infoCard(x);});
 m.on("mouseenter","gPinsL",function(){m.getCanvas().style.cursor="pointer";});m.on("mouseleave","gPinsL",function(){m.getCanvas().style.cursor="";});
 m.addSource("gDots",{type:"geojson",data:fc()});
 m.addLayer({id:"gDotsHit",type:"circle",source:"gDots",paint:{"circle-radius":18,"circle-opacity":0,"circle-stroke-opacity":0}});
 m.addLayer({id:"gDotsL",type:"symbol",source:"gDots",layout:{"icon-image":"dot-bump","icon-anchor":"center","icon-allow-overlap":true,"icon-ignore-placement":true,"icon-pitch-alignment":"viewport","icon-rotation-alignment":"viewport","icon-size":["interpolate",["linear"],["zoom"],13,0.8,16,1.1,18,1.25]}});
 m.on("click","gDotsHit",function(e){var f=e.features&&e.features[0],x=f&&G.pinData&&G.pinData[f.properties.id];if(x)infoCard(x);});
 m.addSource("gFeux",{type:"geojson",data:fc()});
 m.addLayer({id:"gFeuxL",type:"symbol",source:"gFeux",layout:{"icon-image":"feu","icon-anchor":"bottom","icon-allow-overlap":true,"icon-ignore-placement":true,"icon-pitch-alignment":"viewport","icon-rotation-alignment":"viewport","icon-size":["interpolate",["linear"],["zoom"],13,0.7,16,1.1,18,1.35]}});
}
function src(id,data){if(!G.map||!G.mapReady)return;var s=G.map.getSource(id);if(s)s.setData(data);}
function cutAt(){var R=G.R,c=G.dispAlong!=null?G.dispAlong:G.along;return Math.max(0,Math.min(R?R.total:0,c||0));}
function setRouteData(force){
 var R=G.R;if(!R||!G.mapReady)return;var c=cutAt();G._cutT=now();
 if(!force&&G._cut!=null&&Math.abs(c-G._cut)<0.5)return;G._cut=c;
 if(force||G._farA==null||c>G._farA-120||c<G._farA-560){G._farA=Math.min(R.total,c+450);src("gRoute",fc(G._farA<R.total-0.5?[line(slice(R,G._farA,R.total))]:[]));}
 src("gRouteN",fc([line(slice(R,c,Math.min(R.total,G._farA+3)))]));
 paintOn(c,false);paintFeux(c,false);manArrow();
}
function paintOn(c,force){
 var aff=false,pc=G._onC==null?-1e9:G._onC;(G._onA||[]).concat(G._onD||[]).forEach(function(x){if(x.a<c+0.5&&x.b>pc-0.5)aff=true;});
 if(!force&&!aff)return;G._onC=c;var R=G.R;
 src("gOnA",fc((G._onA||[]).filter(function(x){return x.b>c+0.5;}).map(function(x){return line(slice(R,Math.max(x.a,c),x.b),{k:x.k});})));
 src("gOnD",fc((G._onD||[]).filter(function(x){return x.b>c+0.5;}).map(function(x){return line(slice(R,Math.max(x.a,c),x.b));})));
}
function refreshFeatures(){
 if(!G.mapReady)return;var R=G.R,onA=[],offA=[],onD=[],offD=[];
 (G.alerts||[]).forEach(function(al){if(!al.trace||al.trace.length<2||(al.type!=="arret"&&al.type!=="ralentissement"))return;
  var a=R&&project(R,al.trace[0],null),b=R&&project(R,al.trace[al.trace.length-1],null);
  if(a&&b&&a.off<20&&b.off<20&&Math.abs(b.along-a.along)>5)onA.push({a:Math.min(a.along,b.along),b:Math.max(a.along,b.along),k:al.type});else offA.push(line(al.trace,{k:al.type}));});
 teamZones().forEach(function(z){var g=A.zGeom(z);if(!g||g.k!=="line"||g.c.length<2)return;
  var a=R&&project(R,g.c[0],null),b=R&&project(R,g.c[g.c.length-1],null);
  if(a&&b&&a.off<20&&b.off<20&&Math.abs(b.along-a.along)>5)onD.push({a:Math.min(a.along,b.along),b:Math.max(a.along,b.along)});else offD.push(line(g.c));});
 G._onA=onA;G._onD=onD;if(R)paintOn(cutAt(),true);else{src("gOnA",fc());src("gOnD",fc());}src("gOffA",fc(offA));src("gOffD",fc(offD));
 refreshMarkers();
}
/* feu tricolore debout (posé au bord droit de la route) et pastille de ralentisseur (posée sur le trajet) */
var FEU_SVG='<svg xmlns="http://www.w3.org/2000/svg" width="40" height="76" viewBox="0 0 20 38"><rect x="9" y="25" width="2" height="12" rx="1" fill="#aab2c0"/><ellipse cx="10" cy="37" rx="4" ry="1.2" fill="#000" opacity=".35"/><rect x="3" y="1" width="14" height="26" rx="4.5" fill="#15181d" stroke="#ffffff" stroke-width="1.6"/><circle cx="10" cy="7.3" r="3.1" fill="#ff3b30"/><circle cx="10" cy="14" r="3.1" fill="#ffb020"/><circle cx="10" cy="20.7" r="3.1" fill="#2fcf5a"/></svg>';
var DOT_SVG='<svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="-11 -11 22 22"><circle r="10" fill="#fff"/><circle r="8.3" fill="#f59f00"/><g transform="translate(-6.6 -7.4) scale(0.55)"><path d="M2 18.6h2.6c2.6 0 3.4-7.1 7.4-7.1s4.8 7.1 7.4 7.1H22a.9.9 0 0 1 .9.9v.9a.9.9 0 0 1-.9.9H2a.9.9 0 0 1-.9-.9v-.9a.9.9 0 0 1 .9-.9z" fill="#fff"/><path d="M12 2.6v5.2 M9.6 5.2L12 2.6l2.4 2.6" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></g></svg>';
function loadImg(id,svg,w,h){return new Promise(function(res){var img=new Image(w,h);img.onload=function(){try{if(G&&G.map&&!G.map.hasImage(id))G.map.addImage(id,img,{pixelRatio:2});}catch(e){}res();};img.onerror=function(){res();};img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(svg);});}
function loadPins(){
 return Promise.all([loadImg("feu",FEU_SVG,40,76),loadImg("dot-bump",DOT_SVG,44,44)].concat(Object.keys(COL).map(function(k){return new Promise(function(res){
  var img=new Image(80,100);img.onload=function(){try{if(G&&G.map&&!G.map.hasImage("pin-"+k))G.map.addImage("pin-"+k,img,{pixelRatio:2});}catch(e){}res();};img.onerror=function(){res();};
  img.src="data:image/svg+xml;charset=utf-8,"+encodeURIComponent(pinSvg(k).replace('<svg width="40" height="50"','<svg xmlns="http://www.w3.org/2000/svg" width="80" height="100"'));});})));}
function destPin(){
 var R=G.R;if(!R||R.pts.length<2)return G.dest&&G.dest.lat!=null?[+G.dest.lat,+G.dest.lon]:null;
 var end=R.pts[R.pts.length-1],P=mkProj(end[0]),e=P.xy(end),f=P.xy(pointAt(R,Math.max(0,R.total-10))),dx=e[0]-f[0],dy=e[1]-f[1],L=Math.sqrt(dx*dx+dy*dy);if(L<0.5)return end;
 var rx=dy/L,ry=-dx/L,side=0,lm=R.man[R.man.length-1],t=lm&&lm.type;
 if(t===5)side=1;else if(t===6)side=-1;
 else if(G.dest&&G.dest.lat!=null){var q=P.xy([+G.dest.lat,+G.dest.lon]),v=(q[0]-e[0])*rx+(q[1]-e[1])*ry;side=v>2?1:(v<-2?-1:0);}
 var g=P.ll(e[0]+rx*side*7,e[1]+ry*side*7);return[g[0],g[1]];}
function refreshMarkers(){
 if(!G.mapReady)return;var F=[],D=[];G.pinData={};
 function add(id,k,p,x){G.pinData[id]=x;F.push({type:"Feature",properties:{id:id,img:"pin-"+k},geometry:{type:"Point",coordinates:[p[1],p[0]]}});}
 var dp=destPin();if(dp)add("dest","dest",dp,null);
 (G.haz||[]).forEach(function(h){if(h.t==="degradee"||h.al)return;G.pinData[h.id]={k:"bump",h:h,z:h.z};D.push({type:"Feature",properties:{id:h.id},geometry:{type:"Point",coordinates:[h.p[1],h.p[0]]}});});
 src("gDots",fc(D));
 teamZones().forEach(function(z){var g=A.zGeom(z);if(g&&g.k==="line"&&g.c.length>1)add("zl"+z.id,"pothole",g.c[Math.floor(g.c.length/2)],{k:"pothole",z:z});});
 (G.alerts||[]).forEach(function(al){var p=al.trace&&al.trace.length>1?al.trace[Math.floor(al.trace.length/2)]:[al.lat,al.lon];add("a"+al.id,KIND[al.type],p,{k:KIND[al.type],al:al});});
 src("gPins",fc(F));
}
function setRecData(){src("gRecD",fc(G.rec&&G.rec.pts.length>1?[line(G.rec.pts)]:[]));}

/* ---------- caméra et position ---------- */
function zoomFor(kmh){kmh=kmh||0;return kmh<30?17.6:(kmh<60?17:(kmh<90?16.2:15.5));}
function setPad(){if(!G||!G.map)return;var h=G.root.clientHeight||window.innerHeight,gb=G.root.querySelector(".gbot"),bh=gb?gb.offsetHeight:230,target=Math.max(h*0.45,h-bh-60),top=Math.max(0,Math.round(2*target-h));
 var w=G.root.clientWidth||window.innerWidth,fx=$("#gVeh");if(fx){fx.style.left=Math.round(w/2-32)+"px";fx.style.top=Math.round(target-32)+"px";}
 if(top===G._padTop)return;G._padTop=top;if(G.alt||G._rc||G.view==="nord")return;try{G.map.setPadding({top:top,bottom:0,left:0,right:0});}catch(e){}}
function animateTo(p,h,al){var t=now(),cur=G.disp||p,ch=G.dispH==null?h:G.dispH,onPrev=!!(G.anim&&G.anim.at!=null)||!!G._onRt;
 /* sur l'itinéraire : on avance le long du tracé (pas en ligne droite) ; au retour sur le tracé, une transition en ligne droite d'abord */
 var alEnd=null;if(al!=null&&!(onPrev&&G.dispAlong!=null)){G._onRt=true;alEnd=al;al=null;}else if(al==null)G._onRt=false;
 G.anim={f:cur,t:p,hf:ch,ht:h,af:al==null?null:G.dispAlong,at:al,alEnd:alEnd,t0:t,dur:G.lastAnimT?Math.min(1600,Math.max(500,(t-G.lastAnimT)*1.1)):700};G.lastAnimT=t;if(!G.raf)G.raf=requestAnimationFrame(frame);}
var TIP_PX=20;
function tipM(){if(G._tipM)return G._tipM;var lat=G.disp?G.disp[0]:43.3,z=G.zoom||17;return TIP_PX*40075016*Math.cos(lat*Math.PI/180)/(512*Math.pow(2,z))/Math.cos(50*Math.PI/180);}
/* cap visé : la pointe de la flèche sur le tracé (premier point du tracé, en avançant, à la distance de la pointe) */
function tipHeading(R,d){
 var t=tipM(),xy=R.xy,cum=R.cum,L=xy.length-1;if(L<1)return 0;
 var i=Math.min(idxAt(R,d),L-1),sg=cum[i+1]-cum[i],f=sg?(d-cum[i])/sg:0,cx=xy[i][0]+(xy[i+1][0]-xy[i][0])*f,cy=xy[i][1]+(xy[i+1][1]-xy[i][1])*f,ax=0,ay=0,lx=0,ly=0;
 for(var j=i+1;j<=L&&cum[j]-d<t*8+30;j++){
  var bx=xy[j][0]-cx,by=xy[j][1]-cy;
  if(bx*bx+by*by>=t*t){var dx=bx-ax,dy=by-ay,A2=dx*dx+dy*dy,B=ax*dx+ay*dy,C=ax*ax+ay*ay-t*t,u=A2?(-B+Math.sqrt(Math.max(0,B*B-A2*C)))/A2:1;
   u=Math.max(0,Math.min(1,u));return(Math.atan2(ax+dx*u,ay+dy*u)*180/Math.PI+360)%360;}
  ax=bx;ay=by;if(bx*bx+by*by>0.25){lx=bx;ly=by;}}
 return(lx||ly)?(Math.atan2(lx,ly)*180/Math.PI+360)%360:bearingAt(R,d);}
/* rotation adoucie : dans les virages serrés la pointe peut quitter le tracé un instant, mais le virage ne saute pas */
var H_TAU=0.22,H_MAX=80;
function smoothHeading(cur,target,dt){if(cur==null)return target;var df=angDiff(cur,target),st=df*(1-Math.exp(-dt/H_TAU)),lim=H_MAX*dt;st=Math.max(-lim,Math.min(lim,st));return(cur+st+360)%360;}
function frame(){
 if(!G){return;}G.raf=null;var a=G.anim;if(!a)return;var tn=now(),k=Math.min(1,(tn-a.t0)/a.dur),dt=Math.min(0.1,Math.max(0,(tn-(G._fT||tn))/1000)),more=false;G._fT=tn;
 var p=[a.f[0]+(a.t[0]-a.f[0])*k,a.f[1]+(a.t[1]-a.f[1])*k],h=(a.hf+angDiff(a.hf,a.ht)*k+360)%360;
 if(a.at!=null&&G.R){G.dispAlong=a.af+(a.at-a.af)*k;p=pointAt(G.R,G.dispAlong);var ht=tipHeading(G.R,G.dispAlong);h=smoothHeading(G.dispH,ht,dt);more=Math.abs(angDiff(h,ht))>0.3;}
 G.disp=p;G.dispH=h;
 if(k>=1&&a.alEnd!=null&&G.R){G.dispAlong=a.alEnd;a.alEnd=null;setRouteData();}
 if(a.at!=null&&(k>=1||now()-(G._cutT||0)>120))setRouteData();
 G.zoom=G.zoom==null?zoomFor(G.speed):G.zoom+(zoomFor(G.speed)-G.zoom)*0.03;
 var vw=G.view||"3d";
 if(G.follow&&!G._hold&&G.map&&vw!=="nord"){try{var tpi=vw==="2d"?0:50,tz=G.zoom-(vw==="2d"?1.1:0),cam={center:[p[1],p[0]],bearing:h,zoom:tz,pitch:tpi},rc=G._rc;
  /* retour en douceur vers la vue de guidage (après un déplacement, une rotation à deux doigts ou la vue des itinéraires) */
  if(rc){var k2=Math.min(1,(tn-rc.t0)/RC_DUR),e2=1-Math.pow(1-k2,4),pt=G._padTop||0;
   if(k2<1){more=true;cam={center:[rc.c[1]+(p[1]-rc.c[1])*e2,rc.c[0]+(p[0]-rc.c[0])*e2],bearing:(rc.b+angDiff(rc.b,h)*e2+360)%360,zoom:rc.z+(tz-rc.z)*e2,pitch:rc.p+(tpi-rc.p)*e2,padding:{top:rc.pd.top+(pt-rc.pd.top)*e2,bottom:rc.pd.bottom*(1-e2),left:rc.pd.left*(1-e2),right:rc.pd.right*(1-e2)}};}
   else{cam.padding={top:pt,bottom:0,left:0,right:0};G._rc=null;}}
  G.map.jumpTo(cam);vehTilt();if(rc&&G.veh){G.veh.setLngLat([p[1],p[0]]);G.veh.setRotation(h);}if(rc&&!G._rc)vehMode();
  /* distance au sol entre le centre de la flèche et sa pointe (20 px plus haut à l'écran) */
  if(G.map.project&&G.map.unproject&&now()-(G._tipT||0)>400){G._tipT=now();var sp=G.map.project([p[1],p[0]]),u=G.map.unproject([sp.x,sp.y-TIP_PX]),tm=A.distM(p,[u.lat,u.lng]);if(tm>0.3&&tm<150)G._tipM=tm;}}catch(e){}}
 else if(G.veh){G.veh.setLngLat([p[1],p[0]]);G.veh.setRotation(h);}
 if(k<1||more)G.raf=requestAnimationFrame(frame);else G._fT=0;
}
var RC_DUR=750;
function autoBack(){clearTimeout(G._autoT);if(G.follow||!G._userCam)return;G._autoT=setTimeout(function(){if(!G||G.follow||G._hold||G.alt||!G._userCam)return;G._userCam=false;recenter(true);},5000);}
function recenter(force){G._rc=null;G._userCam=false;clearTimeout(G._autoT);
 if(G.view==="nord"){G.follow=true;paintRec();fitNord();if(!G.raf&&G.anim)G.raf=requestAnimationFrame(frame);return;}
 if(G.map&&G.map.getCenter&&(force||!G.follow)&&G.anim){try{var c=G.map.getCenter(),pd=G.map.getPadding?G.map.getPadding():null;pd=pd||{top:G._padTop||0,bottom:0,left:0,right:0};
  if(!rm())G._rc={t0:now(),c:[c.lat,c.lng],b:G.map.getBearing(),z:G.map.getZoom(),p:G.map.getPitch(),pd:{top:pd.top||0,bottom:pd.bottom||0,left:pd.left||0,right:pd.right||0}};
  else G.map.setPadding({top:G._padTop||0,bottom:0,left:0,right:0});}catch(e){G._rc=null;}}
 G.follow=true;paintRec();if(G.anim)G.anim.t0=now()-G.anim.dur;if(!G.raf)G.raf=requestAnimationFrame(frame);}

function onFix(c){
 if(!G)return;var p=[c.lat,c.lon],t=c.t||now();
 var sp=(c.speed!=null&&!isNaN(c.speed)&&c.speed>=0)?c.speed:null;
 if(sp==null&&G.last){var dt=(t-G.last.t)/1000;if(dt>0.4&&dt<6)sp=A.distM(G.last.p,p)/dt;}
 if(sp!=null)G.speed=G.speed==null?sp*3.6:G.speed*0.35+sp*3.6*0.65;
 G.acc=c.acc||0;G.lastFixT=now();G.last={p:p,t:t};G.pos=p;try{A.ui.lastPos=p;if(!G.sim&&now()-(G._lpT||0)>20000){G._lpT=now();localStorage.setItem("ambumaps-pos",JSON.stringify({p:p,t:Date.now()}));}}catch(e){}
 if(G.st){if(!G.stLive&&G.R){G.stLive=true;G.st.t0=G.st.t1=Date.now();statSave();}statMove(c,p);}
 var tr=G.trail||(G.trail=[]),lt=tr[tr.length-1];if(!lt||A.distM(lt.p,p)>=5){tr.push({p:p,w:now(),a:c.acc||0});if(tr.length>30)tr.shift();}
 if(c.heading!=null&&!isNaN(c.heading)&&(sp||0)>3){G.gh=c.heading;G.ghT=now();}
 if(!G.R){G.disp=G.disp||p;return;}
 /* l'itinéraire en cours reste prioritaire : une route parallèle toute proche ou un GPS imprécis ne le changent pas.
    On ne recalcule que si l'écart devient vraiment grand, si l'on roule nettement dans une autre direction,
    ou si l'écart dure longtemps. */
 var R=G.R,acc=c.acc||0,hv=moveHd(),vs=sp!=null?sp:(G.speed||0)/3.6,gap=G._fixT?Math.min(30,(now()-G._fixT)/1000):1;G._fixT=now();
 var pr=G.prj?projectNear(R,p,G.along,hv,Math.max(250,vs*gap*1.5+vs*8+120)):project(R,p,null);
 var tolS=Math.max(35,Math.min(70,30+acc*0.8)),tolH=tolS+45;
 if(pr.off>tolH){var gp=project(R,p,null);if(gp.off<pr.off-30&&(hv==null||Math.abs(angDiff(bearingAt(R,gp.along),hv))<60))pr=gp;}
 G.prj=pr;
 var hdOff=hv!=null&&Math.abs(angDiff(bearingAt(R,pr.along),hv))>45,on=pr.off<=tolS,keep=!on&&pr.off<=tolH&&!hdOff;
 var a0=G.along;
 if(on||keep){var na=pr.along;if(na<G.along&&G.along-na<15)na=G.along;if((sp==null||sp<0.8)&&Math.abs(na-G.along)<10)na=G.along;G.along=na;}
 etaTrack(a0,on||keep);
 if(on)G.dev=null;
 else{var dv=G.dev||(G.dev={n:0,t0:now(),trav:0,last:p});dv.n++;dv.trav+=Math.min(A.distM(dv.last,p),vs*gap*1.5+3);dv.last=p;var el=now()-dv.t0;
  var conf=pr.off>tolH?(dv.n>=2&&el>=1500):(hdOff?(dv.n>=3&&el>=3000&&dv.trav>=30):(el>=20000&&dv.trav>=250));
  if(conf&&!G.rerouting&&!G.arrived&&now()-(G.lastReroute||0)>12000)reroute("off");}
 var snap=on||keep,gh=(c.heading!=null&&!isNaN(c.heading)&&(sp||0)>3)?c.heading:null,hd;
 if(snap)hd=bearingAt(R,G.along);else if(gh!=null)hd=G.heading==null?gh:(G.heading+angDiff(G.heading,gh)*0.5+360)%360;else hd=G.heading||0;G.heading=hd;
 if(!snap&&(sp==null||sp<0.8)&&G.disp&&A.distM(G.disp,p)<10)p=G.disp;
 animateTo(snap?pointAt(R,G.along):p,hd,snap?G.along:null);
 if(G.rec){var lp=G.rec.pts[G.rec.pts.length-1],q=on?pr.q:p;if(!lp||A.distM(lp,q)>5){G.rec.pts.push(q);setRecData();}}
 update();
 if(G.view==="nord"&&G.follow)nordCheck();
}
function update(){
 var R=G.R;if(!R)return;
 if(!G.arrived&&!G.rerouting){var rem=R.total-G.along,dd=G.pos?A.distM(G.pos,[G.dest.lat,G.dest.lon]):1e9,pk=!!G.opts.pickup;if((rem<(pk?40:25)&&(G.prj&&G.prj.off<40))||dd<(pk?60:30)){arrive();return;}}
 var k=-1;for(var i=0;i<R.man.length;i++){var t=R.man[i].type;if(t>=1&&t<=3)continue;if(R.man[i].d>G.along+2){k=i;break;}}G.next=k;
 paintBanner();paintChip();paintSpeed();paintPill();paintPanel();setPad();setRouteData();manArrow();voice();checkConfirm();
}
function arrive(){if(G.alt)closeAlt();G.arrived=true;etaLearnNow(G);if(G.st){G.st.ar=true;statSave();}say(G.opts.pickup?(G.opts.urg?"Vous êtes arrivé chez le patient. Touchez Patient à bord pour choisir l'état du patient et la destination.":"Vous êtes arrivé à la prise en charge. Touchez Patient à bord pour partir vers le rendez-vous."):"Vous êtes arrivé à destination.",true);paintBanner();paintChip();paintPanel();manArrow();}
function patientAbord(){
 if(G.opts.urg){stop();A.onEnd("abord");return;}
 if(!G.opts.pickup)return;if(G.alt)closeAlt();
 var b=$("#gAbord");if(b){b.disabled=true;b.querySelector("span").textContent="Calcul du trajet…";}else toast("Calcul du trajet vers le rendez-vous…");
 A.nextLeg().then(function(t){if(!G)return;G.dest={lat:t.lat,lon:t.lon,nom:t.nom,addr:t.addr};G.opts.pickup=false;G.opts.destEtab=t.id;G.opts.label=t.label;G.opts.links=t.links;G.arrived=false;G.panMode=null;
  say("Patient à bord. En route vers "+t.nom+".",true);paintPanel(true);if(G.st){statSave();statOpen("p2",t.id||"");}if(G.rerouting)G._redo=true;else reroute("leg2");},
  function(e){if(!G)return;toast("Rendez-vous introuvable : "+(e&&e.message?e.message:"vérifie l'adresse."),3500);G.panMode=null;paintPanel(true);});
}

/* ---------- itinéraires ---------- */
var NOUNPAVED={auto:{exclude_unpaved:true,use_tracks:0}};
/* hauteur du véhicule choisi sur l'accueil (Ambulance 2,12 m, ASSU 2,60 m) : le calcul évite les passages plus bas */
function vehOpts(o){var r=Object.assign({},o||{}),h=A.vehH?A.vehH():0;if(h)r.height=h;return{auto:r};}
function vBody(x){return Object.assign({costing:"auto",language:"fr-FR",units:"kilometers",directions_options:{language:"fr-FR",units:"kilometers"}},x);}
function tripToRoute(j){var leg=j&&j.trip&&j.trip.legs&&j.trip.legs[0];if(!leg||!leg.shape)throw new Error("Aucun itinéraire trouvé.");var pts=A.decode6(leg.shape);if(pts.length<2)throw new Error("Itinéraire vide.");return buildRoute(pts,leg.maneuvers||[],leg.summary||j.trip.summary,leg.shape);}
function exclusions(){var polys=[],o=G.opts;G._dirZ=[];
 (A.state.zones||[]).forEach(function(z){var g=A.zGeom(z);if(!g||g.k==="pts"||(o.zoneTypes||[]).indexOf(z.type)<0)return;if(z.etab&&z.etab!==o.destEtab)return;
  if(G.pos&&(g.k==="line"?nearTrace(g.c,G.pos,60):A.distM([g.lat,g.lon],G.pos)<g.r+40))return;
  /* travaux dans un seul sens : évités seulement si le trajet les prend dans ce sens (vérifié après le calcul) */
  if(g.k==="line"&&A.zSens&&A.zSens(z)){G._dirZ.push(z);return;}
  if(g.k==="line")polys=polys.concat(A.linePolys(g.c,10));else polys.push(A.circlePoly(g.lat,g.lon,g.r));});
 (G.alerts||[]).forEach(function(al){if(al.type!=="arret"||!al.trace||al.trace.length<2)return;if(G.pos&&nearTrace(al.trace,G.pos,60))return;polys=polys.concat(A.linePolys(al.trace,12));});
 return polys.slice(0,60);}
/* routes fermées / impraticables signalées par l'équipe : jamais empruntées (sauf si on est déjà dessus) */
function hardEx(){var polys=[];if(!A.ZHARD||!A.blockPolys)return polys;
 (A.state.zones||[]).forEach(function(z){if(!A.ZHARD[z.type])return;var g=A.zGeom(z);if(!g||g.k!=="line")return;if(G.pos&&nearTrace(g.c,G.pos,40))return;polys=polys.concat(A.blockPolys(g.c));});
 return polys.slice(0,60);}
/* sens de la marche réel : cap GPS si on roule, sinon la trace des dernières positions, sinon le sens de l'itinéraire suivi */
function travelHeading(){
 var tn=now();if(G.gh!=null&&tn-G.ghT<4000&&(G.speed||0)>10)return G.gh;
 var tr=G.trail||[],n=tr.length,c=tr[n-1];
 if(c&&tn-c.w<45000)for(var i=n-2;i>=0;i--){if(c.w-tr[i].w>45000)break;if(A.distM(tr[i].p,c.p)>=Math.max(15,Math.min(40,(c.a||0)*1.5)))return brg(tr[i].p,c.p);}
 if(G.gh!=null&&tn-G.ghT<4000)return G.gh;
 if(G.R&&G.prj&&G.prj.off<=30&&(G.speed||0)>3)return bearingAt(G.R,G.along);
 return null;}
function moveHd(){var tn=now();if((G.speed||0)<7)return null;if(G.gh!=null&&tn-G.ghT<3000&&(G.speed||0)>12)return G.gh;
 var tr=G.trail||[],n=tr.length,c=tr[n-1];if(c&&tn-c.w<8000)for(var i=n-2;i>=0;i--){if(c.w-tr[i].w>15000)break;if(A.distM(tr[i].p,c.p)>=25)return brg(tr[i].p,c.p);}return null;}
function noHead(b){var c=JSON.parse(JSON.stringify(b));delete c.locations[0].heading;delete c.locations[0].heading_tolerance;return c;}
function routeTries(start,extra){
 var base=vBody(Object.assign({locations:[{lat:r6(start[0]),lon:r6(start[1])},{lat:G.dest.lat,lon:G.dest.lon}]},extra||{}));
 /* départ toujours dans le sens où roule l'ambulance : pas de demi-tour */
 var hd=travelHeading();if(hd!=null){base.locations[0].heading=Math.round((hd+360)%360);base.locations[0].heading_tolerance=50;}
 var noh=Object.assign({},base),hh=!!(A.vehH&&A.vehH());base.costing_options=vehOpts();
 var ex=exclusions(),H=hardEx(),np={costing_options:vehOpts(NOUNPAVED.auto)};G._hardN=H.length;G._vehH=hh?A.vehH():0;
 function W(b,l){var all=(l||[]).concat(H);return all.length?Object.assign({},b,{exclude_polygons:all}):b;}
 /* ordre : zones évitées + routes goudronnées, puis goudronnées seules, puis (vraiment aucun autre choix) chemins autorisés ;
    les routes fermées / impraticables restent exclues partout, sauf en tout dernier recours */
 /* tout dernier recours : sans la hauteur du véhicule (avec un avertissement) */
 return(ex.length?[W(Object.assign({},base,np),ex)]:[]).concat([W(Object.assign({},base,np))],ex.length?[W(base,ex)]:[],[W(base)],H.length?[base]:[],hh?[W(noh)]:[],hh&&H.length?[noh]:[]);}
function routeFrom(start,ref){
 var tries=routeTries(start),hd=tries[0].locations[0].heading!=null;
 if(hd)tries=tries.concat([noHead(tries[tries.length-1])]);
 function tryAt(L,i){return A.valhalla("route",L[i]).then(function(j){return{R:tripToRoute(j),b:L[i]};}).catch(function(e){
   if(L[i].locations[0].heading!=null&&/suitable edges/i.test((e&&e.message)||""))return tryAt(L.slice(i).map(noHead),0);
   if(i+1<L.length)return tryAt(L,i+1);throw e;});}
 return tryAt(tries,0).then(function(o){
  /* le trajet prend une rue en travaux dans le sens concerné : on en cherche un autre (sinon on garde celui-ci) */
  var dz=(G._dirZ||[]).filter(function(z){return A.zoneDir(z,o.R.pts)===A.zSens(z);});if(!dz.length)return o;
  var pol=[];dz.forEach(function(z){pol=pol.concat(A.linePolys(A.zGeom(z).c,10));});
  var b2=Object.assign({},o.b,{exclude_polygons:(o.b.exclude_polygons||[]).concat(pol).slice(0,70)});
  return A.valhalla("route",b2).then(function(j){var R2=tripToRoute(j);return(G._dirZ||[]).some(function(z){return A.zoneDir(z,R2.pts)===A.zSens(z);})?o:{R:R2,b:b2};},function(){return o;});
 }).then(function(o){
  /* demi-tour seulement s'il n'y a pas le choix : le trajet sans demi-tour rallonge de plus de 10 min et le demi-tour fait gagner plus de 5 min */
  if(o.b.locations[0].heading==null||ref==null||!(o.R.time>ref+Math.max(600,ref*0.5)))return o;
  var nb=noHead(o.b);return A.valhalla("route",nb).then(function(j){var R2=tripToRoute(j);return R2.time+300<o.R.time?{R:R2,b:nb}:o;},function(){return o;});
 }).then(function(o){if(G&&G._hardN&&!o.b.exclude_polygons)toast("Aucun trajet n'évite les routes signalées fermées : passage par l'une d'elles.");
  if(G&&G._vehH&&!(o.b.costing_options&&o.b.costing_options.auto&&o.b.costing_options.auto.height))toast("Aucun trajet ne respecte la hauteur du véhicule ("+G._vehH.toFixed(2).replace(".",",")+" m) : attention aux passages bas.");
  return avoidChemins(o.R,o.b,0);});}
/* même règle pour les chemins (pistes, accès privés, ruelles, allées de parking) : évités au milieu du trajet, sauf s'il n'y a aucun autre choix */
function edgeAttrs(R){if(!R._attrP)R._attrP=A.valhalla("trace_attributes",{encoded_polyline:R.shape,shape_match:"edge_walk",costing:"auto",filters:{attributes:["edge.speed_limit","edge.names","edge.begin_shape_index","edge.end_shape_index","edge.use","edge.length","edge.road_class","shape"],action:"include"}});return R._attrP;}
function avoidChemins(R,body,depth){
 if(!A.midChemins)return Promise.resolve(R);
 return edgeAttrs(R).then(function(t){
  var mc=A.midChemins(t);R._chem=mc.reduce(function(s,e){return s+(e.length||0)*1000;},0);
  if(!mc.length||depth>=2)return R;
  var sp=A.decode6(t.shape||"");if(!sp.length)sp=R.pts;
  var polys=(body.exclude_polygons||[]).concat(mc.map(function(e){return A.edgeMid(sp,e);}).filter(Boolean).slice(0,60).map(function(q){return A.circlePoly(q[0],q[1],4);}));
  var b2=Object.assign({},body,{exclude_polygons:polys});
  return A.valhalla("route",b2).then(tripToRoute).then(function(R2){return avoidChemins(R2,b2,depth+1).then(function(R3){return(R3._chem||0)<R._chem?R3:R;});},function(){return R;});
 },function(){return R;});}
function traceRoute(shape){return A.valhalla("trace_route",vBody({encoded_polyline:shape,shape_match:"edge_walk"})).then(tripToRoute);}
function setRoute(R){
 if(G.alt)closeAlt();
 G.R=R;G.prj=null;G.next=-1;G.dev=null;G._farA=null;G._cut=null;G._onC=null;
 if(G.pos){var pr=project(R,G.pos,null);G.prj=pr;G.along=pr.along;}else G.along=0;
 G.dispAlong=G.along;G._onRt=false;if(G.anim){G.anim.af=G.anim.at=G.anim.alEnd=null;}
 if(G.sim)G.simAlong=G.along;
 computeHazards();computeFeux();refreshFeatures();setRouteData(true);paintFeux(cutAt(),true);update();vehMode();loadEdges(R);loadBumps(R);
 if(G.view==="nord"&&G.follow)fitNord();
}
function reroute(why){
 if(!G||!G.pos||G.rerouting)return;G.rerouting=true;G.lastReroute=now();paintBanner();manArrow();
 if(why==="off")say("Recalcul de l'itinéraire.",true);
 routeFrom(G.pos,why==="off"&&G.R?remTime(true):null).then(function(R){if(!G)return;G.rerouting=false;if(G._redo){G._redo=false;reroute("leg2");return;}setRoute(R);if(why==="jam")say("Bouchon signalé sur le trajet : nouvel itinéraire.",true);if(why==="dest")say("Nouvelle destination : "+(G.dest.nom||"")+".",true);},
  function(){if(!G)return;G.rerouting=false;if(G._redo){G._redo=false;reroute("leg2");return;}G.dev=null;paintBanner();toast("Recalcul impossible pour l'instant : réseau ou serveur indisponible.");});
}
function loadEdges(R){
 edgeAttrs(R).then(function(t){
  if(!G||G.R!==R)return;var sp=A.decode6(t.shape||""),out=[],hint=null;if(!sp.length)sp=R.pts;
  (t.edges||[]).forEach(function(e){var pa=sp[e.begin_shape_index],pb=sp[e.end_shape_index];if(!pa||!pb)return;var a=project(R,pa,hint);hint=a.i;var b=project(R,pb,hint);hint=b.i;
   var l=(typeof e.speed_limit==="number"&&e.speed_limit>=5&&e.speed_limit<=150)?Math.round(e.speed_limit):null;
   out.push({a:a.along,b:Math.max(b.along,a.along+0.1),lim:l,rc:e.road_class||"",mid:pointAt(R,(a.along+Math.max(b.along,a.along+0.1))/2),name:(e.names&&e.names[0])||""});});
  R.edges=out;paintSpeed();paintPill();
 }).catch(function(){});
}
function computeFeux(){
 var R=G.R;G._feux=[];G._feuxN=-1;if(!R||!G.feux||!G.feux.length)return;var L=[];
 G.feux.forEach(function(q){var pr=project(R,q,null);if(pr&&pr.off<=15)L.push(pr.along);});
 L.sort(function(a,b){return a-b;});var C=[];L.forEach(function(a){var l=C[C.length-1];if(l!=null&&a-l<30)return;C.push(a);});
 G._feux=C.map(function(a){var p=pointAt(R,a),b=bearingAt(R,a)*Math.PI/180,P=mkProj(p[0]),xy=P.xy(p);return{along:a,p:P.ll(xy[0]+13*Math.cos(b),xy[1]-13*Math.sin(b))};});}
function paintFeux(c,force){
 if(!G.mapReady)return;var L=(G._feux||[]).filter(function(f){return f.along>c-5;});if(!force&&L.length===G._feuxN)return;G._feuxN=L.length;
 src("gFeux",fc(L.map(function(f){return{type:"Feature",properties:{},geometry:{type:"Point",coordinates:[f.p[1],f.p[0]]}};})));}
function loadBumps(R){
 var so=90,we=180,no=-90,ea=-180;R.pts.forEach(function(q){if(q[0]<so)so=q[0];if(q[0]>no)no=q[0];if(q[1]<we)we=q[1];if(q[1]>ea)ea=q[1];});
 var bb=[so-0.002,we-0.002,no+0.002,ea+0.002];
 A.getBumps(bb[0],bb[1],bb[2],bb[3]).then(function(b){if(!G||G.R!==R)return;G.bumps=(b&&b.pts)||[];computeHazards();refreshMarkers();}).catch(function(){})
 /* feux tricolores (OpenStreetMap) : après les ralentisseurs, pour ne pas charger le serveur deux fois à la fois */
 .then(function(){if(!G||G.R!==R||!A.getFeux)return;return A.getFeux(bb[0],bb[1],bb[2],bb[3]).then(function(f){if(!G||G.R!==R)return;G.feux=(f&&f.pts)||[];computeFeux();paintFeux(cutAt(),true);});}).catch(function(){});
}
function nextNode(a){var E=G.R&&G.R.edges,end=null;
 if(E){for(var i=0;i<E.length;i++){if(E[i].b>a+30){end=E[i].b;break;}}}
 if(end==null){end=a+200;var m=G.R.man;for(var j=0;j<m.length;j++)if(m[j].d>a+30){end=Math.min(end,m[j].d);break;}}
 return Math.min(end,a+600,G.R.total);}

/* ---------- alertes de l'équipe ---------- */
function normAlert(r){if(!r||!KIND[r.type]||typeof r.lat!=="number"||typeof r.lon!=="number"||!isFinite(r.lat)||!isFinite(r.lon))return null;var tc=A.cleanPts?A.cleanPts(r.trace):r.trace,tr=Array.isArray(tc)&&tc.length>1?tc:null;return{id:r.id,type:r.type,lat:r.lat,lon:r.lon,trace:tr,cree:Date.parse(r.cree_le)||now(),par:r.cree_par||"",exp:Date.parse(r.expire_le)||now()+3600e3};}
function pollAlerts(){
 if(!G||!A.isCloud())return;var iso=new Date().toISOString();
 A.api("GET","alertes?select=*&expire_le=gt."+encodeURIComponent(iso)+"&order=cree_le.desc&limit=300").then(function(rows){if(!G)return;
  var loc=(G.alerts||[]).filter(function(a){return a._local;}),ids={};var L=(rows||[]).map(normAlert).filter(Boolean);L.forEach(function(a){ids[a.id]=1;});
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
 if(!G.sim&&A.statSig)try{A.statSig(type);}catch(e){}
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
function fadeOut(e){if(!e)return;e.classList.add("gout");setTimeout(function(){if(e.parentNode)e.remove();},350);}
/* contenu qui change (nouvelle manœuvre, arrivée…) : il remonte doucement en fondu */
var SPR="cubic-bezier(.32,.72,0,1)";
function popIn(x,dy){if(!x||!x.animate)return;try{if(matchMedia("(prefers-reduced-motion: reduce)").matches)return;}catch(e){}x.animate([{opacity:0,transform:"translateY("+(dy||10)+"px)"},{opacity:1,transform:"none"}],{duration:420,easing:SPR});}
function closeCard(){fadeOut($(".gcard:not(.gout)"));G.card=null;if(G.cardT){clearInterval(G.cardT);G.cardT=null;}}
function cardHead(k,t1,t2){return'<div class="hd"><div class="ci" style="background:'+COL[k][0]+'">'+glyph(k,30)+'</div><div style="min-width:0"><b>'+esc(t1)+'</b><small>'+esc(t2)+'</small></div></div>';}
function who(al){return(al.par?(al.par===A.me()?"toi":A.nameOf(al.par)):"l'équipe")+", "+ago(al.cree);}
function confirmCard(al,d,tap){
 closeCard();var jam=al.type==="arret"||al.type==="ralentissement";
 var h=cardHead(KIND[al.type],NOM[al.type]+(d>15?" dans "+fmtDist(d):""),"Signalé par "+who(al))+'<div class="gq">Et maintenant ?</div>'+
  (jam?'<div class="g3"><button type="button" style="background:#e03131;color:#fff" data-g="cStill">Toujours à l\'arrêt</button><button type="button" style="background:#f08c00;color:#1b1405" data-g="cSlow">Roule au pas</button><button type="button" style="background:'+C("#173225","#e4f6ec")+';border:2px solid #2fbf71;color:'+C("#c8f5dc","#11633a")+'" data-g="cGone">Dégagé</button></div>'
   :'<div class="g2"><button type="button" style="background:'+COL[KIND[al.type]][0]+';color:#fff" data-g="cStill">Toujours là</button><button type="button" style="background:'+C("#173225","#e4f6ec")+';border:2px solid #2fbf71;color:'+C("#c8f5dc","#11633a")+'" data-g="cGone">Plus là</button></div>')+
  (tap?'<button type="button" class="gsec" data-g="cClose">Fermer</button>':'<div style="display:flex;flex-direction:column;gap:6px"><div class="gbar"><i style="width:100%"></i></div><div style="font-size:12.5px;color:'+C("#9aa3b2","#5d6777")+';text-align:center" id="gCardT">Se ferme tout seul dans 8 s</div></div>');
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
function closeScrim(){fadeOut($(".gscrim:not(.gout)"));}
function tile(g,k,label,sub,wide){return'<button type="button" class="gtile'+(wide?" w":"")+'" data-g="rep" data-k="'+g+'"><span class="ti" style="background:'+COL[k][0]+'">'+glyph(k,26)+'</span><span><b>'+esc(label)+'</b>'+(sub?'<small>'+esc(sub)+'</small>':'')+'</span></button>';}
function openSignal(){
 closeCard();closeScrim();G.rp=reportPos();
 var s=el('<div class="gscrim" data-g="scrim"><div class="gsheet" role="dialog" aria-label="Signaler"><div class="ghandle"></div><div><h3>Signaler</h3><p>Position enregistrée au moment de l\'appui.</p></div><div class="ggrid">'+
  tile("ralentisseur","bump","Ralentisseur")+tile("degradee","pothole","Route dégradée")+tile("ralentissement","slow","Ralentissement")+tile("arret","jam","À l'arrêt")+tile("accident","crash","Accident")+tile("travaux","cone","Travaux")+tile("police","police","Police")+tile("danger","danger","Danger","objet, animal, obstacle…")+
  '</div><button type="button" class="gsec" data-g="scrimClose">Annuler</button></div></div>');
 G.root.appendChild(s);
}
function openStop(){
 closeCard();closeScrim();
 var s=el('<div class="gscrim" data-g="scrim"><div class="gsheet" role="dialog" aria-label="Arrêter le guidage"><div class="ghandle"></div><h3>Arrêter le guidage</h3>'+
  (G.opts.pickup&&!G.opts.urg&&!G.arrived?'<button type="button" class="gopt ok" data-g="abordGo"><i>'+svgI("M5 12.5l4.5 4.5L19 7.5",17,"#fff",3.2)+'</i><span>Patient à bord<small>Passer au rendez-vous</small></span></button>':'')+
  '<button type="button" class="gopt pri" data-g="newMission">'+svgI(IC.home,26,"#fff",2.3)+'<span>Nouvelle mission</span></button>'+
  '<button type="button" class="gopt" data-g="changeDest">'+svgI(IC.pin,26,"currentColor",2.3)+'<span>Changer de destination</span></button>'+
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
function rowBtn(i,t1,t2,cur){return'<button type="button" class="growd'+(cur?" cur":"")+'" data-g="pickDest" data-i="'+i+'"'+(cur?' disabled':'')+'><span class="pi">'+svgI(IC.pin,22,C("#9aa3b2","#6b7484"),2.2)+'</span><span class="k"><b>'+esc(t1)+'</b>'+(t2?'<small>'+esc(t2)+'</small>':'')+'</span>'+(cur?'<small style="border:1px solid '+C("#2c313c","#dde2e9")+';border-radius:999px;padding:2px 8px;color:'+C("#9aa3b2","#5d6777")+'">actuelle</small>':'')+'</button>';}
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
 p.then(function(g){if(!G)return;G.dest={lat:g.lat,lon:g.lon,nom:it.gps?it.label:(it.main||it.label),addr:x?x.adresse:(it.q||it.label)};G.opts.destEtab=it.etab||"";G.arrived=false;if(G.st)G.st.e=it.etab||"";
  try{A.setDest(it.etab?{etab:it.etab}:{label:it.label,q:it.q,lat:g.lat,lon:g.lon},G.opts.pickup);}catch(e){}
  fadeOut($(".gfull:not(.gout)"));paintPanel();reroute("dest");},
  function(e){if(box)box.innerHTML='<div class="gwait">'+esc(e.message||"Adresse introuvable.")+'</div>';});
}

/* ---------- clics ---------- */
/* ---------- itinéraires alternatifs (façon Waze) ---------- */
function rm(){try{return matchMedia("(prefers-reduced-motion: reduce)").matches;}catch(e){return false;}}
function fmtDur(s){var m=Math.max(1,Math.round(s/60));if(m<60)return m+" min";var h=Math.floor(m/60),r=m%60;return h+" h "+(r<10?"0":"")+r;}
function curAlt(){var R=G.R,a=cutAt();return{R:R,a0:a,a1:R.total,time:remTime(),total:Math.max(0,R.total-G.along),cur:true};}
function altPts(x){return slice(x.R,x.a0,x.a1);}
/* part des points de x situés sur l'itinéraire y */
function nearFrac(x,y){var n=24,k=0;for(var i=0;i<=n;i++){var p=pointAt(x.R,x.a0+(x.a1-x.a0)*i/n);if(project(y.R,p,null).off<18)k++;}return k/(n+1);}
function sameRoute(x,y){return Math.abs(x.total-y.total)<Math.max(80,0.03*Math.max(x.total,y.total))&&nearFrac(x,y)>0.9&&nearFrac(y,x)>0.9;}
/* même règle que pour le guidage : pas de chemin au milieu du trajet si l'itinéraire actuel n'en prend pas */
function chemOk(R){if(!A.midChemins)return Promise.resolve(true);var lim=(G.R&&G.R._chem)||0;
 return edgeAttrs(R).then(function(t){R._chem=A.midChemins(t).reduce(function(s,e){return s+(e.length||0)*1000;},0);return R._chem<=lim+1;},function(){return true;});}
function fetchAlts(){
 var tries=routeTries(G.pos,{alternates:3});
 function at(i){return A.valhalla("route",tries[i]).then(function(j){
   return[j.trip].concat((j.alternates||[]).map(function(a){return a&&a.trip;})).map(function(t){try{return tripToRoute({trip:t});}catch(e){return null;}}).filter(Boolean);
  }).catch(function(e){if(i+1<tries.length)return at(i+1);throw e;});}
 return at(0);}
/* un itinéraire alternatif doit rester rapide : au plus 3 min de plus que le plus rapide (15 % sur les longs trajets, 8 min maximum) */
function altMax(best){return Math.min(480,Math.max(180,best*0.15));}
function quick(L,cur){var best=Math.min.apply(null,L.map(function(x){return x.time;}));return L.filter(function(x){return x===cur||x.time-best<=altMax(best);});}
function findAlts(cur){
 return fetchAlts().then(function(Rs){
  var c=[];Rs.forEach(function(R){var x={R:R,a0:0,a1:R.total,time:routeEta(R),total:R.total};
   if(sameRoute(x,cur)||c.some(function(y){return sameRoute(x,y);}))return;
   /* pas d'alternative qui prend une rue en travaux dans le sens concerné */
   if((G._dirZ||[]).some(function(z){return A.zoneDir(z,R.pts)===A.zSens(z);}))return;c.push(x);});
  c=quick([cur].concat(c),cur).filter(function(x){return x!==cur;});
  return Promise.all(c.slice(0,3).map(function(x){return chemOk(x.R).then(function(ok){return ok?x:null;});}));
 }).then(function(r){var L=quick([cur].concat(r.filter(Boolean)),cur);L.sort(function(a,b){return a.time-b.time;});assignVia(L);return L;});}
/* « via … » : la rue la plus propre à chaque itinéraire */
function streets(x){var s={};x.R.man.forEach(function(m){var n=m.street_names&&m.street_names[0];if(!n)return;var a=Math.max(m.d,x.a0),b=Math.min(m.e,x.a1);if(b>a)s[n]=(s[n]||0)+(b-a);});return s;}
function assignVia(L){var S=L.map(streets);L.forEach(function(x,i){var best="",bv=-1e18,lg="",ll=0;
 Object.keys(S[i]).forEach(function(n){var o=0;S.forEach(function(s,j){if(j!==i&&(s[n]||0)>o)o=s[n];});var v=S[i][n]-o;if(v>bv||(v===bv&&S[i][n]>S[i][best])){bv=v;best=n;}if(S[i][n]>ll){ll=S[i][n];lg=n;}});
 x.via=bv>50?best:lg;});}
/* bulle de durée : au milieu de la portion propre à l'itinéraire */
function bubbleAt(x,others){var n=Math.max(10,Math.min(90,Math.round((x.a1-x.a0)/50))),rs=-1,bs=-1,bl=0;
 for(var k=0;k<=n;k++){var p=pointAt(x.R,x.a0+(x.a1-x.a0)*k/n),u=others.every(function(o){return project(o.R,p,null).off>25;});
  if(u){if(rs<0)rs=k;if(k-rs+1>bl){bl=k-rs+1;bs=rs;}}else rs=-1;}
 var kk=bl?bs+(bl-1)/2:n*0.55;return pointAt(x.R,x.a0+(x.a1-x.a0)*kk/n);}
var ALT_HIDE=["gRc","gRcN","gRf","gRfN","gOnAf","gOnDe","gOnDd","gManLc","gManHo","gManLf","gManHf"];
function showMainRoute(on){if(!G.map||!G.mapReady||!G.map.setLayoutProperty)return;ALT_HIDE.forEach(function(id){try{G.map.setLayoutProperty(id,"visibility",on?"visible":"none");}catch(e){}});}
function openAlt(){
 if(!G.R||!G.pos||G.arrived||G.alt)return;
 if(G.rerouting){toast("Recalcul de l'itinéraire en cours…");return;}
 closeCard();closeScrim();
 var my=G.altSeq=(G.altSeq||0)+1,cur=curAlt();
 assignVia([cur]);
 G.alt={seq:my,sel:0,list:[cur],mk:[],loading:true};
 G.follow=false;G._rc=null;paintRec();G.root.classList.add("galton");
 G.root.appendChild(el('<div class="galt" role="dialog" aria-label="Itinéraires"><div class="ghandle"></div><div class="galth"><h3>Itinéraires</h3><button type="button" class="galtx" data-g="altClose" aria-label="Fermer">'+svgI(IC.x,20,"currentColor",2.6)+'</button></div><div class="galtl" id="gAltL"></div><button type="button" class="gbig galtgo" data-g="altGo" id="gAltGo"></button></div>'));
 paintAltList();paintAltMap();fitAlt();
 findAlts(cur).then(function(L){if(!G||!G.alt||G.alt.seq!==my)return;var a=G.alt;a.loading=false;a.list=L;a.sel=L.indexOf(cur);paintAltList(true);paintAltMap();fitAlt();},
  function(e){if(!G||!G.alt||G.alt.seq!==my)return;G.alt.loading=false;G.alt.err=A.netErr&&A.netErr(e)?"Pas de connexion : impossible de chercher d'autres itinéraires.":"Recherche impossible pour l'instant, réessaie dans un moment.";paintAltList();});
}
function paintAltList(fresh){
 var a=G.alt,box=$("#gAltL");if(!a||!box)return;var L=a.list,best=L[0].time,h="";
 L.forEach(function(x,i){var d=Math.round((x.time-best)/60),tag=L.length<2?"":(i===0?'<span class="gtag fast">Le plus rapide</span>':(d<1?'<span class="gtag same">Même durée</span>':'<span class="gtag slow">+'+d+' min</span>'));
  h+='<button type="button" class="galtc'+(i===a.sel?" sel":"")+'" data-g="altPick" data-i="'+i+'"><span class="ln"></span><span class="mid"><span class="r1"><b>'+fmtDur(x.time)+'</b><span class="tg">'+tag+(x.cur?'<span class="gtag cur">Actuel</span>':'')+'</span></span>'+
   '<span class="via">'+fmtDist(x.total)+' · '+(x.via?'via '+esc(x.via):'arrivée '+hhmm(now()+x.time*1000))+'</span></span></button>';});
 if(a.loading)h+='<div class="galtw"><i></i><span>Recherche d\'autres itinéraires…</span></div>';
 else if(a.err)h+='<div class="galtn">'+esc(a.err)+'</div>';
 else if(L.length<2)h+='<div class="galtn">Pas d\'autre itinéraire rapide pour l\'instant.</div>';
 box.innerHTML=h;
 if(fresh)Array.prototype.forEach.call(box.querySelectorAll(".galtc"),function(c,i){if(!L[i].cur)popIn(c,12);});
 paintAltBtn();}
function paintAltBtn(){var a=G.alt,b=$("#gAltGo");if(!a||!b)return;var x=a.list[a.sel],keep=!x||x.cur;
 b.classList.toggle("keep",keep);b.textContent=keep?"Garder l'itinéraire actuel":"Prendre cet itinéraire";}
function paintAltMap(){
 var a=G.alt;if(!a||!G.mapReady)return;var L=a.list,F=[];
 L.forEach(function(x,i){if(i!==a.sel)F.push(line(altPts(x),{i:i,sel:0}));});if(L[a.sel])F.push(line(altPts(L[a.sel]),{i:a.sel,sel:1}));
 src("gAlt",fc(F));showMainRoute(false);
 if(a._mkFor!==L){a.mk.forEach(function(m){try{m.remove();}catch(e){}});a.mk=[];a._mkFor=L;
  if(G.ml&&G.ml.Marker)L.forEach(function(x,i){var p=bubbleAt(x,L.filter(function(y){return y!==x;}));
   var e=el('<div class="galtm" data-g="altPick" data-i="'+i+'"><div class="galtb">'+fmtDur(x.time)+'</div></div>');
   try{a.mk.push(new G.ml.Marker({element:e,anchor:"bottom"}).setLngLat([p[1],p[0]]).addTo(G.map));}catch(err){}});}
 a.mk.forEach(function(m,i){var e=m.getElement();if(!e)return;e.style.zIndex=i===a.sel?"3":"2";if(e.firstChild)e.firstChild.classList.toggle("sel",i===a.sel);});}
function selectAlt(i){var a=G.alt;if(!a||!a.list[i]||a.sel===i)return;a.sel=i;
 Array.prototype.forEach.call(G.root.querySelectorAll(".galtc"),function(c,k){c.classList.toggle("sel",k===i);});
 var c=G.root.querySelector('.galtc[data-i="'+i+'"]');if(c&&c.scrollIntoView)try{c.scrollIntoView({block:"nearest",behavior:"smooth"});}catch(e){}
 paintAltBtn();paintAltMap();}
/* vue d'ensemble : tous les itinéraires entre le bandeau du haut et la feuille du bas */
function camFit(b,pad,W,H){
 function mx(lon){return(lon+180)/360;}function my(lat){var s=Math.sin(lat*Math.PI/180);return 0.5-Math.log((1+s)/(1-s))/(4*Math.PI);}
 var x0=mx(b[1]),x1=mx(b[3]),y0=my(b[2]),y1=my(b[0]),aw=Math.max(60,W-pad.left-pad.right),ah=Math.max(60,H-pad.top-pad.bottom);
 var z=Math.min(Math.log(aw/(512*Math.max(1e-9,x1-x0)))/Math.LN2,Math.log(ah/(512*Math.max(1e-9,y1-y0)))/Math.LN2,16.5),cx=(x0+x1)/2,cy=(y0+y1)/2;
 return{center:[cx*360-180,Math.atan(Math.sinh(Math.PI*(1-2*cy)))*180/Math.PI],zoom:z};}
function fitAlt(){
 var a=G.alt;if(!a||!G.map||!G.map.easeTo)return;var b=[90,180,-90,-180];
 function add(p){if(p[0]<b[0])b[0]=p[0];if(p[0]>b[2])b[2]=p[0];if(p[1]<b[1])b[1]=p[1];if(p[1]>b[3])b[3]=p[1];}
 a.list.forEach(function(x){altPts(x).forEach(add);});if(G.disp)add(G.disp);
 var H=G.root.clientHeight||innerHeight,W=G.root.clientWidth||innerWidth,tp=$(".gtop"),sh=$(".galt"),pad={top:Math.round((tp?tp.offsetHeight:90)+50),bottom:Math.round((sh?sh.offsetHeight:300)+18),left:38,right:38};
 if(H-pad.top-pad.bottom<160)pad.top=Math.max(24,H-pad.bottom-160);
 var cam=camFit(b,pad,W,H);
 try{G.map.easeTo({center:cam.center,zoom:cam.zoom,bearing:0,pitch:0,padding:pad,duration:rm()?0:900,easing:function(t){return 1-Math.pow(1-t,4);}});}catch(e){}}
function closeAlt(){
 var a=G.alt;if(!a)return;G.alt=null;
 a.mk.forEach(function(m){var e=m.getElement&&m.getElement();if(e&&e.firstChild&&e.animate&&!rm()){try{e.firstChild.animate([{opacity:1},{opacity:0,transform:"scale(.85)"}],{duration:220,easing:"ease-out",fill:"forwards"});}catch(x){}setTimeout(function(){try{m.remove();}catch(x){}},220);}else try{m.remove();}catch(x){}});
 fadeOut($(".galt:not(.gout)"));G.root.classList.remove("galton");
 src("gAlt",fc());showMainRoute(true);recenter();}
function altGo(){
 var a=G.alt;if(!a)return;var x=a.list[a.sel];
 if(!x||x.cur){closeAlt();return;}
 closeAlt();say("Nouvel itinéraire.",true);setRoute(x.R);toast("Nouvel itinéraire : "+fmtDur(x.time)+(x.via?" via "+x.via:"")+".");}
function onClick(ev){
 var b=ev.target.closest("[data-g]");if(!b||!G)return;var g=b.getAttribute("data-g");
 if(g==="scrim"){if(ev.target===b&&!b.classList.contains("gout"))closeScrim();return;}
 if(g==="scrimClose")closeScrim();
 else if(g==="sig")openSignal();
 else if(g==="rep")report(b.getAttribute("data-k"));
 else if(g==="stop")openStop();
 else if(g==="newMission"){stop();A.onEnd("nouvelle");}
 else if(g==="changeDest")openDest();
 else if(g==="destClose")fadeOut($(".gfull:not(.gout)"));
 else if(g==="pickDest")pickDest(+b.getAttribute("data-i"));
 else if(g==="finish"){stop();A.onEnd("termine");}
 else if(g==="abord")patientAbord();
 else if(g==="abordGo"){closeScrim();patientAbord();}
 else if(g==="mute"){G.mute=!G.mute;try{localStorage.setItem("ambumaps-gps-muet",G.mute?"1":"");if(G.mute)speechSynthesis.cancel();}catch(e){}paintMute();}
 else if(g==="recenter")recenter();
 else if(g==="view")setView(nextView(G.view||"3d"));
 else if(g==="alt")openAlt();
 else if(g==="altPick")selectAlt(+b.getAttribute("data-i"));
 else if(g==="altGo")altGo();
 else if(g==="altClose")closeAlt();
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
function onPop(){if(!G)return;try{history.pushState({gps:1},"");}catch(e){}if(G.alt){closeAlt();return;}openStop();}
function onResize(){setPad();if(G&&G.alt)fitAlt();else if(G&&G.view==="nord"&&G.follow)fitNord();}
/* dernière position connue (sur ce téléphone seulement) : la carte s'ouvre là, pas sur la destination */
function lastPos(){try{var o=JSON.parse(localStorage.getItem("ambumaps-pos")||"null");if(o&&o.p&&Date.now()-o.t<864e5)return o.p;}catch(e){}return(A.ui&&A.ui.lastPos)||null;}
function camOnUser(){if(!G||!G.map||!G.pos||G.alt)return;var R=G.R,p=(R&&G.prj&&G.prj.off<=40)?pointAt(R,G.along):G.pos,h=R?bearingAt(R,G.along):(G.heading||0);
 G.disp=p;G.dispH=h;G.dispAlong=G.along;if(G.anim){G.anim.f=p;G.anim.t=p;G.anim.hf=G.anim.ht=h;}
 if(G.view==="nord"){fitNord();return;}
 try{G.map.jumpTo({center:[p[1],p[0]],bearing:h,zoom:G.zoom!=null?G.zoom:zoomFor(G.speed),pitch:G.view==="2d"?0:50});if(G.veh){G.veh.setLngLat([p[1],p[0]]);G.veh.setRotation(h);}}catch(e){}}
function boot(){
 setLoad("Ouverture du GPS…");
 loadML().then(function(ml){setLoad("Chargement de la carte…");return fetch(LT()?STYLE_URL_L:STYLE_URL).then(function(r){if(!r.ok)throw new Error("style "+r.status);return r.json();}).then(function(s){return[ml,prepStyle(s)];},function(){return[ml,rasterStyle()];});}).then(function(x){
  if(!G)return;var ml=x[0],c=G.pos||G.opts.start||lastPos()||[G.dest.lat,G.dest.lon];
  if(!G.map){
   G.map=new ml.Map({container:G.root.querySelector(".gmap"),style:x[1],center:[c[1],c[0]],zoom:17,pitch:G.view==="2d"?0:50,bearing:0,attributionControl:false,dragRotate:false,touchPitch:false,pitchWithRotate:false,maxPitch:60});
   G.ml=ml;try{G.map.touchZoomRotate.enableRotation();}catch(e){}
   /* le doigt posé sur la carte met le suivi en pause tout de suite : le premier glissé déplace la carte
      (sinon le suivi repositionnait la caméra et annulait le geste) ; 5 s après le dernier geste, retour sur l'ambulance */
   var mc=G.root.querySelector(".gmap");
   mc.addEventListener("pointerdown",function(){if(!G)return;G._hold=true;clearTimeout(G._autoT);},{passive:true});
   ["pointerup","pointercancel","pointerleave"].forEach(function(ev){mc.addEventListener(ev,function(){if(!G||!G._hold)return;G._hold=false;autoBack();},{passive:true});});
   G.map.on("moveend",function(){if(G&&G._userCam&&!G._hold)autoBack();});
   G.map.on("dragstart",function(e){if(e.originalEvent){G.follow=false;G._rc=null;G._userCam=true;clearTimeout(G._autoT);paintRec();}});
   G.map.on("zoomstart",function(e){if(e.originalEvent){G.follow=false;G._rc=null;G._userCam=true;clearTimeout(G._autoT);paintRec();}});
   /* rotation de la carte à deux doigts : on quitte le suivi, le bouton « recentrer » remet la carte dans le sens de la marche */
   G.map.on("rotatestart",function(e){if(e.originalEvent){G.follow=false;G._rc=null;G._userCam=true;clearTimeout(G._autoT);paintRec();}});
   G.map.on("load",function(){if(!G)return;G.mapReady=true;addLayers();G._padTop=null;setPad();
    var ve=el('<div class="gveh">'+posMark()+'</div>');G.veh=new ml.Marker({element:ve,anchor:"center",rotationAlignment:"map",pitchAlignment:"map"}).setLngLat([c[1],c[0]]).addTo(G.map);
    vehMode();loadPins().then(function(){if(G)refreshMarkers();});refreshFeatures();setRouteData();if(G.R)paintFeux(cutAt(),true);G._manKey=null;manArrow();if(G.alt){paintAltMap();fitAlt();}});
  }
  setLoad("Calcul de l'itinéraire…");
  var p=G.opts.shape?traceRoute(G.opts.shape).catch(function(){return waitPos(12000).then(routeFrom);}):waitPos(12000).then(routeFrom);
  return p.then(function(R){if(!G)return;setLoad(null);
   if(G.sim&&!G.pos){G.pos=R.pts[0];}
   G.quiet=true;setRoute(R);G.quiet=false;camOnUser();var m0=R.man.filter(function(m){return m.type<1||m.type>3;})[0];
   var d0=m0?m0.d-G.along:1e9;if(!G.arrived)say("Guidage démarré."+(d0>=200&&d0<1500?" Dans "+sayDist(d0)+", "+lcFirst(m0.verbal_transition_alert_instruction||m0.instruction):""),true);
   if(m0&&d0<1500)m0._far=1;voice();
   if(G.sim&&!G.simT)G.simT=setInterval(simTick,1000);
  });
 }).catch(function(e){if(!G)return;showErr(A.netErr(e)?"Pas de connexion internet, ou serveur de calcul indisponible.":(e.message||"Erreur inconnue."));});
}
/* ---------- statistiques (sur ce téléphone, sans aucune adresse) ---------- */
function statOpen(k,e){var s=G.opts.stat;if(!s||G.sim||!A.statTrip){G.st=null;return;}var t=Date.now();
 G.st={id:A.uid(),t0:t,t1:t,km:0,k:k||s.k,m:s.m||"",e:e!=null?e:(s.e||""),ar:false,cf:!!(s.cf&&!k)};G.stLast=null;G.stLive=false;}
function statSave(){if(G&&G.st&&G.stLive){G.st.t1=Date.now();try{A.statTrip(G.st);}catch(e){}G.stSaved=now();}}
/* distance roulée : points GPS précis, au moins 20 m d'écart, sans sauts impossibles */
function statMove(c,p){var s=G.st;if(!s)return;if((c.acc||0)>35)return;var lp=G.stLast;if(!lp){G.stLast={p:p,t:now()};return;}
 var d=A.distM(lp.p,p),dt=Math.max(.5,(now()-lp.t)/1000);if(d<20)return;G.stLast={p:p,t:now()};if(d/dt>70)return;s.km+=d/1000;}
function stop(){
 if(!G)return;var g=G;G=null;
 if(!g.arrived)etaLearnNow(g);
 if(g.st&&g.stLive){g.st.t1=Date.now();try{A.statTrip(g.st);}catch(e){}}
 try{if(g.watch!=null)navigator.geolocation.clearWatch(g.watch);}catch(e){}
 clearInterval(g.simT);clearInterval(g.pollT);clearInterval(g.tickT);clearInterval(g.cardT);if(g.raf)cancelAnimationFrame(g.raf);
 try{if(g.lock)g.lock.release();}catch(e){}try{speechSynthesis.cancel();}catch(e){}
 try{if(g.map)g.map.remove();}catch(e){}
 if(g.root){var rt=g.root;rt.classList.add("gout");setTimeout(function(){rt.remove();},310);}document.body.style.overflow="";
 document.removeEventListener("visibilitychange",onVis);window.removeEventListener("popstate",onPop);window.removeEventListener("resize",onResize);
 try{if(history.state&&history.state.gps)history.back();}catch(e){}
}
function start(opts){
 if(G)stop();
 var mute=false,vw="3d";try{mute=localStorage.getItem("ambumaps-gps-muet")==="1";vw=localStorage.getItem("ambumaps-gps-vue")==="2d"?"2d":"3d";}catch(e){}
 G={opts:opts||{},dest:opts.dest,sim:!!opts.sim,follow:true,view:vw,mute:mute,alerts:[],haz:[],bumps:[],mk:{},along:0,next:-1,light:opts.theme?opts.theme==="light":document.documentElement.getAttribute("data-theme")==="light"};
 document.body.style.overflow="hidden";buildUi();paintPanel();
 startGeo();lockScreen();boot();pollAlerts();statOpen();
 G.pollT=setInterval(pollAlerts,30000);
 G.tickT=setInterval(function(){if(!G)return;paintSpeed();if(G.st&&now()-(G.stSaved||0)>15000)statSave();if(G.addr&&now()-G.addr.t>=9000)paintPill();if(G.alerts.some(function(a){return a.exp<=now();})){G.alerts=G.alerts.filter(function(a){return a.exp>now();});computeHazards();refreshFeatures();}},2000);
 document.addEventListener("visibilitychange",onVis);window.addEventListener("resize",onResize);
 try{history.pushState({gps:1},"");}catch(e){}window.addEventListener("popstate",onPop);
 if(G.sim)toast("Mode simulation : le trajet défile tout seul.",3500);
}
window.AmbuGPS={start:start,stop:stop,active:function(){return!!G;},_t:{buildRoute:buildRoute,project:project,slice:slice,simplify:simplify,fmtDist:fmtDist,sayDist:sayDist}};
})();

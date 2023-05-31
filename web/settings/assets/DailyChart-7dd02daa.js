import{l as L,J as B,K as A,L as E,M,F as I}from"./vendor-fortawesome-221885f6.js";import{C as P}from"./index-3e64063a.js";import{C as $,p as z,a as T,L as H,b as V,P as F,c as R,T as N,i as J,d as Z,e as G}from"./vendor-chartjs-e4b5eddf.js";import{_ as U,p as y,l as c,q as S,A as h,L as m,y as b,k as u,u as D,G as C,I as _,x as W}from"./vendor-93bd3532.js";import"./vendor-bootstrap-9ea1ec57.js";import"./vendor-jquery-15a435dc.js";import"./vendor-axios-51187820.js";import"./vendor-sortablejs-b80cade1.js";import"./vendor-luxon-1af9332f.js";L.add(B,A,E,M);$.register(z,T,H,V,F,R,N,J,Z);const Y={name:"OpenwbDailyChart",components:{ChartjsLine:G,FontAwesomeIcon:I},mixins:[P],emits:["sendCommand"],data(){return{mqttTopicsToSubscribe:["openWB/general/extern","openWB/log/daily/#","openWB/system/device/+/component/+/config","openWB/chargepoint/+/config","openWB/vehicle/+/name"],currentDay:"",dailyChartRequestData:{day:"",month:"",year:""},datasetTemplates:{"counter-power":{label:"Zähler",unit:"kW",jsonKey:null,borderColor:"rgba(255, 0, 0, 0.7)",backgroundColor:"rgba(255, 10, 13, 0.3)",fill:!0,pointStyle:"circle",pointRadius:0,pointHoverRadius:4,cubicInterpolationMode:"monotone",hidden:!1,borderWidth:1,data:null,yAxisID:"y",parsing:{xAxisKey:"timestamp",yAxisKey:null}},"pv-power":{label:"PV",unit:"kW",jsonKey:null,borderColor:"rgba(0, 255, 0, 0.7)",backgroundColor:"rgba(10, 255, 13, 0.3)",fill:!0,pointStyle:"circle",pointRadius:0,pointHoverRadius:4,cubicInterpolationMode:"monotone",hidden:!1,borderWidth:1,data:null,yAxisID:"y",parsing:{xAxisKey:"timestamp",yAxisKey:null}},"bat-power":{label:"Speicher",unit:"kW",jsonKey:null,borderColor:"rgba(255, 153, 13, 0.7)",backgroundColor:"rgba(200, 255, 13, 0.3)",fill:!0,pointStyle:"circle",pointRadius:0,pointHoverRadius:4,cubicInterpolationMode:"monotone",hidden:!1,borderWidth:1,data:null,yAxisID:"y",parsing:{xAxisKey:"timestamp",yAxisKey:null}},"bat-soc":{label:"Speicher SoC",unit:"%",jsonKey:null,borderColor:"rgba(255, 153, 13, 0.7)",backgroundColor:"rgba(200, 255, 13, 0.3)",borderDash:[10,5],hidden:!1,fill:!1,pointStyle:"circle",pointRadius:0,pointHoverRadius:4,cubicInterpolationMode:"monotone",borderWidth:2,data:null,yAxisID:"y2",parsing:{xAxisKey:"timestamp",yAxisKey:null}},"cp-power":{label:"Ladepunkt",unit:"kW",jsonKey:null,borderColor:"rgba(0, 0, 255, 0.7)",backgroundColor:"rgba(0, 0, 255, 0.3)",fill:!0,pointStyle:"circle",pointRadius:0,pointHoverRadius:4,cubicInterpolationMode:"monotone",hidden:!0,borderWidth:1,data:null,yAxisID:"y",parsing:{xAxisKey:"timestamp",yAxisKey:null}},"ev-soc":{label:"Fahrzeug SoC",unit:"%",jsonKey:null,borderColor:"rgba(0, 0, 255, 0.7)",backgroundColor:"rgba(0, 0, 255, 0.3)",borderDash:[10,5],hidden:!0,fill:!1,pointStyle:"circle",pointRadius:0,pointHoverRadius:4,cubicInterpolationMode:"monotone",borderWidth:2,data:null,yAxisID:"y2",parsing:{xAxisKey:"timestamp",yAxisKey:null}}},chartOptions:{plugins:{title:{display:!1},tooltip:{enabled:!0,callbacks:{label:t=>`${t.dataset.label}: ${t.formattedValue} ${t.dataset.unit}`}},legend:{display:!0},zoom:{pan:{enabled:!0,mode:"x",threshold:5},zoom:{wheel:{enabled:!0},pinch:{enabled:!0},mode:"x"}}},elements:{point:{radius:2}},responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},scales:{x:{type:"time",time:{unit:"minute",tooltipFormat:"DD T"},display:!0,title:{display:!0,text:"Zeit"},ticks:{source:"timestamp",font:{size:12},maxTicksLimit:24},grid:{}},y:{position:"left",type:"linear",display:"auto",suggestedMin:0,suggestedMax:0,title:{font:{size:12},display:!0,text:"Leistung [kW]"},grid:{},ticks:{font:{size:12},stepSize:.2,maxTicksLimit:11}},y2:{position:"right",type:"linear",display:"auto",suggestedMin:0,suggestedMax:100,title:{font:{size:12},display:!0,text:"SoC [%]"},grid:{display:!1},ticks:{font:{size:12},stepSize:10,maxTicksLimit:11}}}},chartDatasets:{datasets:[]}}},computed:{dailyChartDate:{get(){return this.dailyChartRequestData.year+"-"+this.dailyChartRequestData.month+"-"+this.dailyChartRequestData.day},set(t){let e=t.split("-");this.dailyChartRequestData.year=e[0],this.dailyChartRequestData.month=e[1],this.dailyChartRequestData.day=e[2]}},commandData(){return{day:this.dailyChartRequestData.year+this.dailyChartRequestData.month+this.dailyChartRequestData.day}},chartDataRead(){return this.chartDataObject!=null},chartDataHasEntries(){return this.chartDataObject?this.chartDataObject.length>0:!1},chartTotals(){if(this.$store.state.mqtt["openWB/log/daily/"+this.commandData.day]){if(Object.prototype.hasOwnProperty.call(this.$store.state.mqtt["openWB/log/daily/"+this.commandData.day],"totals"))return this.$store.state.mqtt["openWB/log/daily/"+this.commandData.day].totals;{var t={bat:{},counter:{},pv:{},cp:{}};const o=["imported","exported"],s=(r,d,f)=>{const l=f.split(".");o.includes(l[l.length-1])&&(Object.prototype.hasOwnProperty.call(t[l[0]],[l[1]])||(t[l[0]][l[1]]={}),t[l[0]][l[1]][l[2]]=Math.floor(d-r))},n=(r,d,f,l="")=>{for(var p in d)d[p]!==null&&typeof d[p]=="object"?n(r[p],d[p],f,l?l+"."+p:p):f.apply(this,[r[p],d[p],l?l+"."+p:p])};var e=this.$store.state.mqtt["openWB/log/daily/"+this.commandData.day];const i=e[0],a=e[e.length-1];return n(i,a,s),t}}},chartDataObject(){if(this.$store.state.mqtt["openWB/log/daily/"+this.commandData.day]){var t=this.$store.state.mqtt["openWB/log/daily/"+this.commandData.day];Object.prototype.hasOwnProperty.call(t,"entries")&&(console.debug("upgraded chart data received"),t=t.entries);var e=void 0,o=JSON.parse(JSON.stringify(t)).map(s=>{if(s.timestamp=s.timestamp*1e3,e!==void 0){const i=s.timestamp-e.timestamp;var n=["pv","counter","bat","cp"];return n.forEach(a=>{Object.entries(s[a]).forEach(([r,d])=>{e[a][r]&&Object.keys(d).forEach(()=>{switch(a){case"pv":Object.prototype.hasOwnProperty.call(s[a][r],"exported")&&Object.prototype.hasOwnProperty.call(e[a][r],"exported")&&(s[a][r].power=Math.floor((s[a][r].exported-e[a][r].exported)/(i/1e3/3600))/1e3);break;case"counter":Object.prototype.hasOwnProperty.call(s[a][r],"imported")&&Object.prototype.hasOwnProperty.call(e[a][r],"imported")&&Object.prototype.hasOwnProperty.call(s[a][r],"exported")&&Object.prototype.hasOwnProperty.call(e[a][r],"exported")&&(s[a][r].power=Math.floor((s[a][r].imported-e[a][r].imported-(s[a][r].exported-e[a][r].exported))/(i/1e3/3600))/1e3,s[a][r].powerImport=Math.max(0,s[a][r].power),s[a][r].powerExport=Math.min(0,s[a][r].power));break;case"bat":Object.prototype.hasOwnProperty.call(s[a][r],"imported")&&Object.prototype.hasOwnProperty.call(e[a][r],"imported")&&Object.prototype.hasOwnProperty.call(s[a][r],"exported")&&Object.prototype.hasOwnProperty.call(e[a][r],"exported")&&(s[a][r].power=Math.floor((s[a][r].imported-e[a][r].imported-(s[a][r].exported-e[a][r].exported))/(i/1e3/3600))/1e3,s[a][r].powerImport=Math.max(0,s[a][r].power),s[a][r].powerExport=Math.min(0,s[a][r].power));break;case"cp":Object.prototype.hasOwnProperty.call(s[a][r],"imported")&&Object.prototype.hasOwnProperty.call(e[a][r],"imported")&&(s[a][r].power=Math.floor((s[a][r].imported-e[a][r].imported)/(i/1e3/3600))/1e3);break}})})}),e=s,s}else{e=s;return}});return o.shift(),o}},chartData(){if(this.chartDataObject){var t=["pv","counter","bat","cp","ev"];const e=this.chartDataObject[this.chartDataObject.length-1];return e&&t.forEach(o=>{Object.entries(e[o]).forEach(([s,n])=>{Object.keys(n).forEach(i=>{this.initDataset(o,s,i)})})}),this.chartDatasets}}},methods:{getCardSubtype(t){switch(t){case"bat":return"warning";case"counter":return"danger";case"cp":return"primary";case"pv":return"success";default:return"secondary"}},getCardIcon(t){switch(t){case"bat":return["fas","car-battery"];case"counter":return["fas","gauge-high"];case"cp":return["fas","charging-station"];case"pv":return["fas","solar-panel"];default:return}},getDatasetHidden(t,e){return console.debug("getDatasetHidden",t,e),!1},getTotalsLabel(t,e=void 0,o=void 0){var s="*test*";if(!e&&!o){switch(t){case"bat":return"Speicher";case"counter":return"Zähler";case"pv":return"Wechselrichter";case"cp":return"Ladepunkte";default:console.warn("unknown group key:",t)}return"*"+t+"*"}if(e&&!o){if(e=="all")return"Summe";var n=e.match(/\d+$/),i="";switch(t){case"cp":i="openWB/chargepoint/"+n+"/config";break;case"ev":i="openWB/vehicle/"+n+"/name";break;default:i="openWB/system/device/+/component/"+n+"/config"}var a=Object.keys(this.getWildcardTopics(i))[0];if(a)switch(t){case"pv":return this.$store.state.mqtt[a].name;case"counter":return this.$store.state.mqtt[a].name;case"bat":return this.$store.state.mqtt[a].name;case"cp":return this.$store.state.mqtt[a].name;case"ev":return this.$store.state.mqtt[a];default:console.warn("unknown group key:",t)}else console.warn("topic not found for:",t,e);return"+"+t+"+"+e+"+"}if(e&&o){switch(t){case"bat":case"cp":switch(o){case"imported":return"Ladung";case"exported":return"Entladung";default:console.warn("unknown measurement key:",t,o)}break;case"counter":switch(o){case"imported":return"Bezug/Verbrauch";case"exported":return"Einspeisung/Erzeugung";default:console.warn("unknown measurement key:",t,o)}break;case"pv":switch(o){case"exported":return"Erzeugung";default:console.warn("unknown measurement key:",t,o)}break;default:console.warn("unknown group key:",t)}return"*"+t+"+"+e+"+"+o+"*"}return s},getDatasetLabel(t,e,o,s){var n="*"+s;if(e=="all")switch(t){case"pv":n="PV (Summe)";break;case"bat":switch(n="Speicher",o){case"imported":n+=" (Ladung, Summe)";break;case"exported":n+=" (Entladung, Summe)";break;case"soc":n+=" SoC (Summe)";break;default:n+=" (Summe)"}break;case"cp":switch(n="Ladepunkte",o){case"imported":n+=" (Ladung, Summe)";break;case"exported":n+=" (Entladung, Summe)";break;case"soc":n+=" SoC (Summe)";break;default:n+=" (Summe)"}break}else{var i=e.match(/\d+$/),a="";switch(t){case"cp":a="openWB/chargepoint/"+i+"/config";break;case"ev":a="openWB/vehicle/"+i+"/name";break;default:a="openWB/system/device/+/component/"+i+"/config"}var r=Object.keys(this.getWildcardTopics(a))[0];if(r in this.$store.state.mqtt)switch(t){case"pv":n=this.$store.state.mqtt[r].name;break;case"counter":switch(n=this.$store.state.mqtt[r].name,o){case"imported":n+=" (Bezug)";break;case"exported":n+=" (Einspeisung)";break}break;case"bat":switch(n=this.$store.state.mqtt[r].name,o){case"imported":n+=" (Ladung)";break;case"exported":n+=" (Entladung)";break;case"soc":n+=" SoC";break}break;case"cp":switch(n=this.$store.state.mqtt[r].name,o){case"imported":n+=" (Ladung)";break;case"exported":n+=" (Entladung)";break;case"soc":n+=" SoC";break}break;case"ev":n=this.$store.state.mqtt[r];break}else console.warn("could not get name for dataset",s)}return n},getDatasetIndex(t){let e=this.chartDatasets.datasets.findIndex(o=>o.jsonKey==t);if(e!=-1)return e},addDataset(t,e,o,s){console.debug("adding new dataset",t,e,o,s);var n=t+"-"+o;if(this.datasetTemplates[n]){var i=JSON.parse(JSON.stringify(this.datasetTemplates[n]));return i.parsing.yAxisKey=s,i.jsonKey=s,i.data=this.chartDataObject,i.label=this.getDatasetLabel(t,e,o,s),i.labelSuffix!=null&&(i.label=i.label+i.labelSuffix),e=="all"&&(i.hidden=!1),this.chartDatasets.datasets.push(i)-1}else console.warn("no matching template found for: "+s+" with template: "+n)},initDataset(t,e,o){const s=["power","soc"],n=t+"."+e+"."+o;if(s.includes(o)){var i=this.getDatasetIndex(n);const a=this.getDatasetHidden(t,e);i==null&&!a&&(i=this.addDataset(t,e,o,n)),i!=null&&a&&(console.info("component hidden:",t,e,o,i),this.chartDatasets.datasets.splice(i,1))}},requestDailyChart(){if(document.forms.dailyChartForm.reportValidity())this.chartDatasets.datasets=[],this.$emit("sendCommand",{command:"getDailyLog",data:this.commandData});else{console.log("form invalid");return}},clearChartData(){this.getWildcardIndexList("openWB/log/daily/+").forEach(t=>{this.$store.commit("removeTopic",`openWB/log/daily/${t}`)})},updateChart(){this.clearChartData(),this.requestDailyChart()}},mounted(){const t=new Date;this.currentDay=this.dailyChartDate=t.getFullYear()+"-"+String(t.getMonth()+1).padStart(2,"0")+"-"+String(t.getDate()).padStart(2,"0"),this.requestDailyChart()}},O={class:"dailyChart"},Q={name:"dailyChartForm"},X={key:1},j={key:1},K={class:"openwb-chart"};function tt(t,e,o,s,n,i){const a=y("openwb-base-text-input"),r=y("openwb-base-card"),d=y("openwb-base-alert"),f=y("chartjs-line"),l=y("font-awesome-icon"),p=y("openwb-base-heading");return u(),c("div",O,[S("form",Q,[h(r,{title:"Filter",collapsible:!0,collapsed:!1},{default:m(()=>[h(a,{title:"Datum",subtype:"date",min:"2018-01-01",max:n.currentDay,modelValue:i.dailyChartDate,"onUpdate:modelValue":[e[0]||(e[0]=x=>i.dailyChartDate=x),e[1]||(e[1]=x=>i.updateChart())]},null,8,["max","modelValue"])]),_:1}),i.chartDataRead?(u(),c("div",X,[i.chartDataHasEntries?(u(),c("div",j,[h(r,{title:"Diagramm",collapsible:!0,collapsed:!1},{default:m(()=>[S("div",K,[h(f,{data:i.chartData,options:n.chartOptions},null,8,["data","options"])])]),_:1}),h(r,{title:"Summen",collapsible:!0,collapsed:!0},{default:m(()=>[(u(!0),c(C,null,_(i.chartTotals,(x,g)=>(u(),b(r,{key:g,collapsible:!0,collapsed:!0,subtype:i.getCardSubtype(g)},{header:m(()=>[h(l,{"fixed-width":"",icon:i.getCardIcon(g)},null,8,["icon"]),D(" "+W(i.getTotalsLabel(g)),1)]),default:m(()=>[(u(!0),c(C,null,_(x,(w,v)=>(u(),c("div",{key:v},[h(p,null,{default:m(()=>[D(W(i.getTotalsLabel(g,v)),1)]),_:2},1024),(u(!0),c(C,null,_(w,(q,k)=>(u(),c("div",{key:k},[h(a,{title:i.getTotalsLabel(g,v,k),readonly:"",class:"text-right",unit:"kWh","model-value":t.formatNumber(q/1e3,3)},null,8,["title","model-value"])]))),128))]))),128))]),_:2},1032,["subtype"]))),128))]),_:1})])):(u(),b(d,{key:0,subtype:"info"},{default:m(()=>[D(" Es konnten keine Daten für diesen Zeitraum gefunden werden. ")]),_:1}))])):(u(),b(d,{key:0,subtype:"info"},{default:m(()=>[D(" Es wurden noch keine Daten abgerufen. ")]),_:1}))])])}const pt=U(Y,[["render",tt],["__scopeId","data-v-cea01f9f"],["__file","/opt/openWB-dev/openwb-ui-settings/src/views/DailyChart.vue"]]);export{pt as default};

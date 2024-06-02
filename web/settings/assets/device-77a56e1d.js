import{_ as m,q as o,k as _,l as f,B as t,M as r,x as u,u as b,y as g}from"./vendor-f0f38b48.js";import"./vendor-sortablejs-cbf37f8f.js";const v={name:"DeviceKostalPlenticore",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},deviceId:{default:void 0}},methods:{updateConfiguration(a,e=void 0){this.$emit("update:configuration",{value:a,object:e})}}},w={class:"device-kostalplenticore"},h={class:"small"};function x(a,e,i,y,C,s){const d=o("openwb-base-heading"),p=o("openwb-base-alert"),c=o("openwb-base-text-input"),l=o("openwb-base-number-input");return _(),f("div",w,[t(d,null,{default:r(()=>[u(" Einstellungen für Kostal Plenticore "),b("span",h,"(Modul: "+g(a.$options.name)+")",1)]),_:1}),t(p,{subtype:"info"},{default:r(()=>[u(" Wenn am Kostal Plenticore-Wechselrichter ein EM300 oder Kostal Energy Smart Meter (KSEM) angeschlossen ist, muss eine Zähler-und eine Wechselrichter-Komponente angelegt werden. ")]),_:1}),t(c,{title:"IP oder Hostname",subtype:"host",required:"","model-value":i.configuration.ip_address,"onUpdate:modelValue":e[0]||(e[0]=n=>s.updateConfiguration(n,"configuration.ip_address"))},null,8,["model-value"]),t(l,{title:"Port",required:"",min:1,max:65535,"model-value":i.configuration.port,"onUpdate:modelValue":e[1]||(e[1]=n=>s.updateConfiguration(n,"configuration.port"))},null,8,["model-value"]),t(l,{title:"Modbus ID",required:"","model-value":i.configuration.modbus_id,min:"1",max:"255","onUpdate:modelValue":e[2]||(e[2]=n=>s.updateConfiguration(n,"configuration.modbus_id"))},null,8,["model-value"])])}const V=m(v,[["render",x],["__file","/opt/openWB-dev/openwb-ui-settings/src/components/devices/kostal_plenticore/device.vue"]]);export{V as default};

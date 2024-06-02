import{_ as l,q as u,k as p,l as m,B as t,M as c,x as _,u as f,y as b}from"./vendor-f0f38b48.js";import"./vendor-sortablejs-cbf37f8f.js";const g={name:"DeviceE3dc",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},componentId:{required:!0}},methods:{updateConfiguration(n,e=void 0){this.$emit("update:configuration",{value:n,object:e})}}},v={class:"device-e3dc"},x={class:"small"};function w(n,e,a,C,q,i){const s=u("openwb-base-heading"),r=u("openwb-base-text-input"),d=u("openwb-base-number-input");return p(),m("div",v,[t(s,null,{default:c(()=>[_(" Einstellungen für E3DC "),f("span",x,"(Modul: "+b(n.$options.name)+")",1)]),_:1}),t(r,{title:"IP oder Hostname",subtype:"host",required:"","model-value":a.configuration.address,"onUpdate:modelValue":e[0]||(e[0]=o=>i.updateConfiguration(o,"configuration.address"))},null,8,["model-value"]),t(d,{title:"Port",required:"",min:1,max:65535,"model-value":a.configuration.port,"onUpdate:modelValue":e[1]||(e[1]=o=>i.updateConfiguration(o,"configuration.port"))},null,8,["model-value"]),t(d,{title:"Modbus ID",required:"","model-value":a.configuration.modbus_id,min:"1",max:"255","onUpdate:modelValue":e[2]||(e[2]=o=>i.updateConfiguration(o,"configuration.modbus_id"))},null,8,["model-value"])])}const y=l(g,[["render",w],["__file","/opt/openWB-dev/openwb-ui-settings/src/components/devices/e3dc/device.vue"]]);export{y as default};

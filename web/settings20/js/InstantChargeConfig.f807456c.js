(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["InstantChargeConfig"],{"65fa":function(e,t,n){"use strict";n.r(t);var o=n("7a23"),a={class:"instantChargeConfig"},r={id:"myForm"},u=Object(o["createTextVNode"])("Hilfetext");function c(e,t,n,c,i,s){var l=Object(o["resolveComponent"])("button-group-input"),m=Object(o["resolveComponent"])("card"),d=Object(o["resolveComponent"])("submit-buttons");return Object(o["openBlock"])(),Object(o["createElementBlock"])("div",a,[Object(o["createElementVNode"])("form",r,[Object(o["createVNode"])(m,{title:"Phasenumschaltung"},{default:Object(o["withCtx"])((function(){return[Object(o["createVNode"])(l,{title:"Anzahl Phasen",buttons:[{buttonValue:1,text:"1"},{buttonValue:3,text:"Maximum"}],"model-value":e.$store.state.mqtt["openWB/general/chargemode_config/instant_charging/phases_to_use"],"onUpdate:modelValue":t[0]||(t[0]=function(t){return e.updateState("openWB/general/chargemode_config/instant_charging/phases_to_use",t)})},{help:Object(o["withCtx"])((function(){return[u]})),_:1},8,["model-value"])]})),_:1}),Object(o["createVNode"])(d,{onSave:t[1]||(t[1]=function(t){return e.$emit("save")}),onReset:t[2]||(t[2]=function(t){return e.$emit("reset")}),onDefaults:t[3]||(t[3]=function(t){return e.$emit("defaults")})})])])}var i=n("118d"),s=n("ae8d"),l=n("2804"),m=n("4492"),d={name:"InstantChargeConfig",mixins:[i["a"]],components:{Card:s["a"],ButtonGroupInput:l["a"],SubmitButtons:m["a"]},data:function(){return{mqttTopicsToSubscribe:["openWB/general/chargemode_config/instant_charging/phases_to_use"]}}};d.render=c;t["default"]=d}}]);
//# sourceMappingURL=InstantChargeConfig.f807456c.js.map
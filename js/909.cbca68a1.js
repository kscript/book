"use strict";(self["webpackChunkbook"]=self["webpackChunkbook"]||[]).push([[909],{909:function(e,t,n){n.r(t),n.d(t,{default:function(){return v}});var o=n(311);const r={class:"article-container"};function a(e,t,n,a,l,c){const s=(0,o.resolveComponent)("vue-markdown");return(0,o.openBlock)(),(0,o.createElementBlock)("div",r,[(0,o.createElementVNode)("h1",null,(0,o.toDisplayString)(e.id),1),(0,o.createVNode)(s,{md:e.md,html:e.html,id:e.id},null,8,["md","html","id"])])}var l=n(253),c=n.n(l),s=n(234),d=n.n(s),i=(0,o.defineComponent)({props:{id:{type:String,default:""},md:{type:Object,default:()=>({})},html:{type:String,default:""}},setup(e){return()=>(0,o.createVNode)("div",{class:"markdown-container markdown-body",innerHTML:e.html},null)}});const h={docsPath:"docs/book/",docsExt:".md",baseUrl:"/"};var u=h;const p=(e,t)=>fetch(/^(http(s|):|\/\/)/.test(e)?e:`${u.baseUrl}${e}`,Object.assign({mode:"cors"},t));var m=p;const g=e=>{const t="\x3c!--",n="--\x3e",o=new RegExp(t,"g"),r=new RegExp(n,"g"),a={"{{":"\\{\\{","}}":"\\}\\}","<":"&lt;","`":"\\`"};let l=o.exec(e);try{while(l){const c=l.index+t.length,s=e.slice(c),d=r.exec(s);if(!d)break;e=`${e.slice(0,l.index)}${e.slice(c,c+d.index).replace(/(\{\{|\}\}|`|<)/g,(e=>a[e]||""))}${e.slice(c+d.index+n.length)}`,o.lastIndex=r.lastIndex=0,l=o.exec(e)}}catch(c){console.log(c)}return e},f=e=>m(e);var x=(0,o.defineComponent)({components:{VueMarkdown:i},props:{path:{type:String,default:""},name:{type:String,default:""}},setup(e){const t=(0,o.reactive)({id:e.name||e.path,html:"",md:{}});try{f(`${u.docsPath}${e.path}${e.name?"/"+e.name:""}${u.docsExt}`).then((e=>e.text())).then((e=>d()({html:!0,linkify:!0,typographer:!0,langPrefix:"hljs language-",highlight(e,t){if(t&&c().getLanguage(t))try{return c().highlight(t,e).value}catch(n){}return""}}).render(g(e)))).then((e=>{Object.assign(t,{html:e})}))}catch(n){console.log(n)}return{...(0,o.toRefs)(t)}}}),k=n(89);const b=(0,k.Z)(x,[["render",a]]);var v=b}}]);
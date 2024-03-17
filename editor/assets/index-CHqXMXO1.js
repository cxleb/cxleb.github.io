(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const Ce=`
struct PreviewUniform {
    canvas_size: vec2<f32>, 
    image_size: vec2<f32>,
    image_position: vec2<f32>,
    image_scale: vec2<f32>,
}

struct Interpolators 
{
    @builtin(position) position: vec4<f32>,
    @location(0) texcoord: vec2<f32>,
};

@group(0) @binding(1) var<uniform> preview_uniform : PreviewUniform;
//@group(0) @binding(0) var inImage : texture_2d<f32>;

@vertex
fn vertex_main(@builtin(vertex_index) vertexId: u32) -> Interpolators
{
    var vertices = array<vec2<f32>, 6> (
        vec2(-0.5, -0.5), 
        vec2(0.5, -0.5), 
        vec2(-0.5,  0.5),
        vec2(0.5, -0.5), 
        vec2(0.5,  0.5),
        vec2(-0.5,  0.5)
    );

    var texcoords = array<vec2<f32>, 6> (
        vec2(0.0, 1.0),
        vec2(1.0, 1.0),
        vec2(0.0, 0.0),
        vec2(1.0, 1.0),
        vec2(1.0, 0.0),
        vec2(0.0, 0.0)
    );
    let in_uv = texcoords[vertexId];

    // position is -0.5..0.5
    var position = vertices[vertexId] * (preview_uniform.image_size / preview_uniform.canvas_size);
    
    // move position
    position = position + (preview_uniform.image_position / preview_uniform.canvas_size);

    // scale  
    position = position * preview_uniform.image_scale;

    // adjust position 
    position = position * 2.0;// + 1.0;

    return Interpolators(vec4(position, 0.0, 1.0), in_uv); //  * preview_uniform.image_size
}

@fragment
fn fragment_main(@location(0) texcoord: vec2<f32>) -> @location(0) vec4<f32> 
{
    //let dims = textureDimensions(inImage);
    //let col = textureLoad(inImage, vec2<u32>(texcoord), 0);
    let col = vec3(texcoord, 0.5);
    return vec4(col.rgb, 1.0);
}
`;class D{constructor(e,t){this.x=e,this.y=t}}class ze{constructor(e){this.device=e;const t=this.device.createShaderModule({code:Ce});this.pipeline=this.device.createRenderPipeline({layout:"auto",vertex:{module:t,entryPoint:"vertex_main"},fragment:{module:t,entryPoint:"fragment_main",targets:[{format:navigator.gpu.getPreferredCanvasFormat()}]},primitive:{topology:"triangle-list"}}),this.uniform=new Float32Array(8),this.uniformGpuBuffer=e.createBuffer({size:32,usage:GPUBufferUsage.UNIFORM|GPUBufferUsage.COPY_DST}),this.uniformBindGroup=e.createBindGroup({layout:this.pipeline.getBindGroupLayout(0),entries:[{binding:1,resource:{buffer:this.uniformGpuBuffer}}]}),this.canvasSize=new D(0,0),this.imageSize=new D(800,600),this.imagePosition=new D(0,0),this.imageScale=1,this.mouseDown=!1,this.lastMousePosition=new D(0,0)}resizeCanvas(e,t){this.canvasSize.x=e,this.canvasSize.y=t}draw(e,t){this.uniform[0]=this.canvasSize.x,this.uniform[1]=this.canvasSize.y,this.uniform[2]=this.imageSize.x,this.uniform[3]=this.imageSize.y,this.uniform[4]=this.imagePosition.x,this.uniform[5]=this.imagePosition.y,this.uniform[6]=this.imageScale,this.uniform[7]=this.imageScale,this.device.queue.writeBuffer(this.uniformGpuBuffer,0,this.uniform);const i=e.beginRenderPass({colorAttachments:[{view:t,clearValue:{r:1,g:1,b:1,a:1},loadOp:"clear",storeOp:"store"}]});i.setPipeline(this.pipeline),i.setBindGroup(0,this.uniformBindGroup),i.draw(6,1,0,0),i.end()}scale(e){e=e/100;const t=.1;this.imageScale+=this.imageScale*t*e}translate(e,t){this.imagePosition.x-=e/this.imageScale,this.imagePosition.y+=t/this.imageScale}}class Me{constructor(e,t,i){this._device=t,this._adapter=e,this._context=i,this._preview=new ze(t)}processChanges(){const e=this._device.createCommandEncoder(),t=this._context.getCurrentTexture().createView();this._preview.draw(e,t),this._device.queue.submit([e.finish()])}preview(){return this._preview}}let Z;function C(){if(!Z)throw new Error("Attempting to get editor without being initialised!");return Z}function Te(r,e,t){Z=new Me(r,e,t)}window.onload=async()=>{if(console.info("Editor v. indev"),!navigator.gpu)throw new Error("WebGPU not found!!");const r=await navigator.gpu.requestAdapter();if(!r)throw new Error("Could not get WebGPU adapter");const e=await(r==null?void 0:r.requestDevice());if(!e)throw new Error("Could not get WebGPU device");const t=document.createElement("gz-app"),i=document.createElement("canvas");i.classList.add("preview"),document.body.appendChild(t),document.body.appendChild(i);const s=i.getContext("webgpu");if(!s)throw new Error("Could not get WebGPU canvas context");s.configure({device:e,format:navigator.gpu.getPreferredCanvasFormat(),colorSpace:"display-p3"}),Te(r,e,s);function o(){i.width=window.innerWidth,i.height=window.innerHeight,C().preview().resizeCanvas(i.width,i.height),C().processChanges()}o(),window.addEventListener("resize",o)};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const G=globalThis,re=G.ShadowRoot&&(G.ShadyCSS===void 0||G.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,oe=Symbol(),le=new WeakMap;let be=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==oe)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(re&&e===void 0){const i=t!==void 0&&t.length===1;i&&(e=le.get(t)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&le.set(t,e))}return e}toString(){return this.cssText}};const Ue=r=>new be(typeof r=="string"?r:r+"",void 0,oe),P=(r,...e)=>{const t=r.length===1?r[0]:e.reduce((i,s,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[o+1],r[0]);return new be(t,r,oe)},Oe=(r,e)=>{if(re)r.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const t of e){const i=document.createElement("style"),s=G.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=t.cssText,r.appendChild(i)}},ae=re?r=>r:r=>r instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return Ue(t)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:He,defineProperty:Ne,getOwnPropertyDescriptor:Be,getOwnPropertyNames:Le,getOwnPropertySymbols:Re,getPrototypeOf:Ie}=Object,w=globalThis,ce=w.trustedTypes,De=ce?ce.emptyScript:"",F=w.reactiveElementPolyfillSupport,O=(r,e)=>r,j={toAttribute(r,e){switch(e){case Boolean:r=r?De:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,e){let t=r;switch(e){case Boolean:t=r!==null;break;case Number:t=r===null?null:Number(r);break;case Object:case Array:try{t=JSON.parse(r)}catch{t=null}}return t}},ne=(r,e)=>!He(r,e),he={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:ne};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),w.litPropertyMetadata??(w.litPropertyMetadata=new WeakMap);class k extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=he){if(t.state&&(t.attribute=!1),this._$Ei(),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);s!==void 0&&Ne(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=Be(this.prototype,e)??{get(){return this[t]},set(n){this[t]=n}};return{get(){return s==null?void 0:s.call(this)},set(n){const a=s==null?void 0:s.call(this);o.call(this,n),this.requestUpdate(e,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??he}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;const e=Ie(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){const t=this.properties,i=[...Le(t),...Re(t)];for(const s of i)this.createProperty(s,t[s])}const e=this[Symbol.metadata];if(e!==null){const t=litPropertyMetadata.get(e);if(t!==void 0)for(const[i,s]of t)this.elementProperties.set(i,s)}this._$Eh=new Map;for(const[t,i]of this.elementProperties){const s=this._$Eu(t,i);s!==void 0&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const s of i)t.unshift(ae(s))}else e!==void 0&&t.push(ae(e));return t}static _$Eu(e,t){const i=t.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(t=>t(this))}addController(e){var t;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((t=e.hostConnected)==null||t.call(e))}removeController(e){var t;(t=this._$EO)==null||t.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Oe(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostConnected)==null?void 0:i.call(t)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(t=>{var i;return(i=t.hostDisconnected)==null?void 0:i.call(t)})}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$EC(e,t){var o;const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(s!==void 0&&i.reflect===!0){const n=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:j).toAttribute(t,i.type);this._$Em=e,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(e,t){var o;const i=this.constructor,s=i._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const n=i.getPropertyOptions(s),a=typeof n.converter=="function"?{fromAttribute:n.converter}:((o=n.converter)==null?void 0:o.fromAttribute)!==void 0?n.converter:j;this._$Em=s,this[s]=a.fromAttribute(t,n.type),this._$Em=null}}requestUpdate(e,t,i){if(e!==void 0){if(i??(i=this.constructor.getPropertyOptions(e)),!(i.hasChanged??ne)(this[e],t))return;this.P(e,t,i)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(e,t,i){this._$AL.has(e)||this._$AL.set(e,t),i.reflect===!0&&this._$Em!==e&&(this._$Ej??(this._$Ej=new Set)).add(e)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[o,n]of s)n.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.P(o,this[o],n)}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),(i=this._$EO)==null||i.forEach(s=>{var o;return(o=s.hostUpdate)==null?void 0:o.call(s)}),this.update(t)):this._$EU()}catch(s){throw e=!1,this._$EU(),s}e&&this._$AE(t)}willUpdate(e){}_$AE(e){var t;(t=this._$EO)==null||t.forEach(i=>{var s;return(s=i.hostUpdated)==null?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Ej&&(this._$Ej=this._$Ej.forEach(t=>this._$EC(t,this[t]))),this._$EU()}updated(e){}firstUpdated(e){}}k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[O("elementProperties")]=new Map,k[O("finalized")]=new Map,F==null||F({ReactiveElement:k}),(w.reactiveElementVersions??(w.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const H=globalThis,V=H.trustedTypes,de=V?V.createPolicy("lit-html",{createHTML:r=>r}):void 0,we="$lit$",b=`lit$${(Math.random()+"").slice(9)}$`,ye="?"+b,Ge=`<${ye}>`,S=document,N=()=>S.createComment(""),B=r=>r===null||typeof r!="object"&&typeof r!="function",xe=Array.isArray,je=r=>xe(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",X=`[ 	
\f\r]`,U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,pe=/-->/g,ue=/>/g,x=RegExp(`>|${X}(?:([^\\s"'>=/]+)(${X}*=${X}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ge=/'/g,ve=/"/g,Ae=/^(?:script|style|textarea|title)$/i,Ve=r=>(e,...t)=>({_$litType$:r,strings:e,values:t}),f=Ve(1),E=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),fe=new WeakMap,A=S.createTreeWalker(S,129);function Se(r,e){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return de!==void 0?de.createHTML(e):e}const We=(r,e)=>{const t=r.length-1,i=[];let s,o=e===2?"<svg>":"",n=U;for(let a=0;a<t;a++){const l=r[a];let d,u,c=-1,m=0;for(;m<l.length&&(n.lastIndex=m,u=n.exec(l),u!==null);)m=n.lastIndex,n===U?u[1]==="!--"?n=pe:u[1]!==void 0?n=ue:u[2]!==void 0?(Ae.test(u[2])&&(s=RegExp("</"+u[2],"g")),n=x):u[3]!==void 0&&(n=x):n===x?u[0]===">"?(n=s??U,c=-1):u[1]===void 0?c=-2:(c=n.lastIndex-u[2].length,d=u[1],n=u[3]===void 0?x:u[3]==='"'?ve:ge):n===ve||n===ge?n=x:n===pe||n===ue?n=U:(n=x,s=void 0);const _=n===x&&r[a+1].startsWith("/>")?" ":"";o+=n===U?l+Ge:c>=0?(i.push(d),l.slice(0,c)+we+l.slice(c)+b+_):l+b+(c===-2?a:_)}return[Se(r,o+(r[t]||"<?>")+(e===2?"</svg>":"")),i]};class L{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const a=e.length-1,l=this.parts,[d,u]=We(e,t);if(this.el=L.createElement(d,i),A.currentNode=this.el.content,t===2){const c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=A.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const c of s.getAttributeNames())if(c.endsWith(we)){const m=u[n++],_=s.getAttribute(c).split(b),I=/([.?@])?(.*)/.exec(m);l.push({type:1,index:o,name:I[2],strings:_,ctor:I[1]==="."?Ye:I[1]==="?"?Fe:I[1]==="@"?Xe:Y}),s.removeAttribute(c)}else c.startsWith(b)&&(l.push({type:6,index:o}),s.removeAttribute(c));if(Ae.test(s.tagName)){const c=s.textContent.split(b),m=c.length-1;if(m>0){s.textContent=V?V.emptyScript:"";for(let _=0;_<m;_++)s.append(c[_],N()),A.nextNode(),l.push({type:2,index:++o});s.append(c[m],N())}}}else if(s.nodeType===8)if(s.data===ye)l.push({type:2,index:o});else{let c=-1;for(;(c=s.data.indexOf(b,c+1))!==-1;)l.push({type:7,index:o}),c+=b.length-1}o++}}static createElement(e,t){const i=S.createElement("template");return i.innerHTML=e,i}}function z(r,e,t=r,i){var n,a;if(e===E)return e;let s=i!==void 0?(n=t._$Co)==null?void 0:n[i]:t._$Cl;const o=B(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==o&&((a=s==null?void 0:s._$AO)==null||a.call(s,!1),o===void 0?s=void 0:(s=new o(r),s._$AT(r,t,i)),i!==void 0?(t._$Co??(t._$Co=[]))[i]=s:t._$Cl=s),s!==void 0&&(e=z(r,s._$AS(r,e.values),s,i)),e}class qe{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=((e==null?void 0:e.creationScope)??S).importNode(t,!0);A.currentNode=s;let o=A.nextNode(),n=0,a=0,l=i[0];for(;l!==void 0;){if(n===l.index){let d;l.type===2?d=new R(o,o.nextSibling,this,e):l.type===1?d=new l.ctor(o,l.name,l.strings,this,e):l.type===6&&(d=new Ke(o,this,e)),this._$AV.push(d),l=i[++a]}n!==(l==null?void 0:l.index)&&(o=A.nextNode(),n++)}return A.currentNode=S,s}p(e){let t=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class R{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return t!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=z(this,e,t),B(e)?e===h||e==null||e===""?(this._$AH!==h&&this._$AR(),this._$AH=h):e!==this._$AH&&e!==E&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):je(e)?this.k(e):this._(e)}S(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.S(e))}_(e){this._$AH!==h&&B(this._$AH)?this._$AA.nextSibling.data=e:this.T(S.createTextNode(e)),this._$AH=e}$(e){var o;const{values:t,_$litType$:i}=e,s=typeof i=="number"?this._$AC(e):(i.el===void 0&&(i.el=L.createElement(Se(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===s)this._$AH.p(t);else{const n=new qe(s,this),a=n.u(this.options);n.p(t),this.T(a),this._$AH=n}}_$AC(e){let t=fe.get(e.strings);return t===void 0&&fe.set(e.strings,t=new L(e)),t}k(e){xe(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new R(this.S(N()),this.S(N()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,t);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var t;this._$AM===void 0&&(this._$Cv=e,(t=this._$AP)==null||t.call(this,e))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=h,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=h}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(o===void 0)e=z(this,e,t,0),n=!B(e)||e!==this._$AH&&e!==E,n&&(this._$AH=e);else{const a=e;let l,d;for(e=o[0],l=0;l<o.length-1;l++)d=z(this,a[i+l],t,l),d===E&&(d=this._$AH[l]),n||(n=!B(d)||d!==this._$AH[l]),d===h?e=h:e!==h&&(e+=(d??"")+o[l+1]),this._$AH[l]=d}n&&!s&&this.j(e)}j(e){e===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Ye extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===h?void 0:e}}class Fe extends Y{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==h)}}class Xe extends Y{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=z(this,e,t,0)??h)===E)return;const i=this._$AH,s=e===h&&i!==h||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==h&&(i===h||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var t;typeof this._$AH=="function"?this._$AH.call(((t=this.options)==null?void 0:t.host)??this.element,e):this._$AH.handleEvent(e)}}class Ke{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){z(this,e)}}const K=H.litHtmlPolyfillSupport;K==null||K(L,R),(H.litHtmlVersions??(H.litHtmlVersions=[])).push("3.1.2");const Je=(r,e,t)=>{const i=(t==null?void 0:t.renderBefore)??e;let s=i._$litPart$;if(s===void 0){const o=(t==null?void 0:t.renderBefore)??null;i._$litPart$=s=new R(e.insertBefore(N(),o),o,void 0,t??{})}return s._$AI(r),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class g extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t;const e=super.createRenderRoot();return(t=this.renderOptions).renderBefore??(t.renderBefore=e.firstChild),e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=Je(t,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return E}}var _e;g._$litElement$=!0,g.finalized=!0,(_e=globalThis.litElementHydrateSupport)==null||_e.call(globalThis,{LitElement:g});const J=globalThis.litElementPolyfillSupport;J==null||J({LitElement:g});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $=r=>(e,t)=>{t!==void 0?t.addInitializer(()=>{customElements.define(r,e)}):customElements.define(r,e)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ze={attribute:!0,type:String,converter:j,reflect:!1,hasChanged:ne},Qe=(r=Ze,e,t)=>{const{kind:i,metadata:s}=t;let o=globalThis.litPropertyMetadata.get(s);if(o===void 0&&globalThis.litPropertyMetadata.set(s,o=new Map),o.set(t.name,r),i==="accessor"){const{name:n}=t;return{set(a){const l=e.get.call(this);e.set.call(this,a),this.requestUpdate(n,l,r)},init(a){return a!==void 0&&this.P(n,void 0,r),a}}}if(i==="setter"){const{name:n}=t;return function(a){const l=this[n];e.call(this,a),this.requestUpdate(n,l,r)}}throw Error("Unsupported decorator location: "+i)};function y(r){return(e,t)=>typeof t=="object"?Qe(r,e,t):((i,s,o)=>{const n=s.hasOwnProperty(o);return s.constructor.createProperty(o,n?{...i,wrapped:!0}:i),n?Object.getOwnPropertyDescriptor(s,o):void 0})(r,e,t)}const Ee='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0"/><path d="M10 11l0 6"/><path d="M14 11l0 6"/><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"/><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"/></svg>',et='<svg  xmlns="http://www.w3.org/2000/svg" width="20"  height="20"  viewBox="0 0 24 24"  fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-pointer"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7.904 17.563a1.2 1.2 0 0 0 2.228 .308l2.09 -3.093l4.907 4.907a1.067 1.067 0 0 0 1.509 0l1.047 -1.047a1.067 1.067 0 0 0 0 -1.509l-4.907 -4.907l3.113 -2.09a1.2 1.2 0 0 0 -.309 -2.228l-13.582 -3.904l3.904 13.563z" /></svg>',tt='<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-typography"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 20l3 0" /><path d="M14 20l7 0" /><path d="M6.9 15l6.9 0" /><path d="M10.2 6.3l5.8 13.7" /><path d="M5 20l6 -16l2 0l7 16" /></svg>',it='<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-photo"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8h.01" /><path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12z" /><path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" /><path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" /></svg>',st='<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-triangle-square-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3l-4 7h8z" /><path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /></svg>',rt='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>',ot='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>',Pe='<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></svg>',ke='<svg  xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="1.5"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-eye"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>';/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},lt=r=>(...e)=>({_$litDirective$:r,values:e});class at{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Q extends at{constructor(e){if(super(e),this.it=h,e.type!==nt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===h||e==null)return this._t=void 0,this.it=e;if(e===E)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.it)return this._t;this.it=e;const t=[e];return t.raw=t,this._t={_$litType$:this.constructor.resultType,strings:t,values:[]}}}Q.directiveName="unsafeHTML",Q.resultType=1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ee extends Q{}ee.directiveName="unsafeSVG",ee.resultType=2;const v=lt(ee);var ct=Object.defineProperty,ht=Object.getOwnPropertyDescriptor,p=(r,e,t,i)=>{for(var s=i>1?void 0:i?ht(e,t):e,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(e,t,s):n(s))||s);return i&&s&&ct(e,t,s),s};let W=class extends g{constructor(){super(),this.divider=void 0}render(){const r=this.divider===""||this.divider==="true";return f`<h4 class="${r?"title divider":"title"}"><slot></slot></h4>`}};W.styles=P`
  .title {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-left: 5px;
    padding-bottom: 1em;
    padding-top: 1em;
  }
  .divider {
    border-top: 2px solid lightgray;
  }
`;p([y()],W.prototype,"divider",2);W=p([$("gz-panel-title")],W);let me=class extends g{render(){return f`<gz-panel-title>Prop list</gz-panel-title>`}};me=p([$("gz-prop-list")],me);let M=class extends g{constructor(){super(),this.visible=!0,this.selected=!1,this.name="this is the name"}render(){return f`
      <div class="${this.selected?"item selected":"item hoverable"}">
        <button @click="${this.select}" class="name">
          ${this.name}
        </button>
        <div class="btncontainer">
          <button @click="${this.visibleClick}" class="btn">
            ${this.visible?v(Pe):v(ke)}
          </button>
        </div>
        <div class="btncontainer">
          <button @click="${this.btnClick}" class="btn">
            ${v(Ee)}
          </button>
        </div>
      </div>
    `}btnClick(){console.log("Gooba 1")}visibleClick(){this.visible=!this.visible}select(){this.selected=!0}};M.styles=P`
    .item {
      display: flex;
      height: 48px;
      line-height: 48px;
      padding-left: 5px;
      vertical-align: middle;
      margin: 1px;
      border-radius: 10px;
    }
    .hoverable:hover {
      background-color: #f0f8ff;
    }
    .selected {
      background-color: #c1e3eb;
    }
    .name {
      flex: 1 0 0;
      background-color: transparent;
      border: 0;
      text-align: left;
    }
    .item:hover > .btncontainer {
      display: block;
    }
    .btncontainer {
      flex: 0 0 36px;
      display: none;
    }
    .btn {
      padding: 0px;
      background-color: white;
      border: 0;
      vertical-align: middle;
    }
  `;p([y()],M.prototype,"name",2);p([y()],M.prototype,"visible",2);p([y()],M.prototype,"selected",2);M=p([$("gz-layer")],M);let T=class extends g{constructor(){super(),this.name="",this.visible=!0,this.drawerOpen=!1}render(){return f`
      <div class="item">
        <button @click="${this.toggleDrawer}" class="btn">${this.drawerOpen?v(ot):v(rt)}</button>
        <span class="name">${this.name}</span>
        <div class="btncontainer">
          <button @click="${this.visibleClick}" class="btn">
            ${this.visible?v(Pe):v(ke)}
          </button>
        </div>
        <div class="btncontainer">
          <button @click="${this.delete}" class="btn">
            ${v(Ee)}
          </button>
        </div>
      </div>
      ${this.drawerOpen?f`
      <div class="drawer">
        <slot></slot>
      </div>
      `:f``}
    `}toggleDrawer(){this.drawerOpen=!this.drawerOpen}delete(){}visibleClick(){this.visible=!this.visible}};T.styles=P`
    :host {
      display: flex;
      flex-direction: column;
    }
    .item {
      padding-left: 10px;
      display: flex;
      line-height: 48px;
      vertical-align: middle;
      margin: 1px;
    }
    :host:hover {
      outline: 1px solid black;
    }
    .name {
      flex: 1 0 0;
    }
    .item:hover > .btncontainer {
      display: block;
    }
    .btncontainer {
      flex: 0 0 36px;
      display: none;
    }
    .btn {
      padding: 0px;
      background-color: white;
      border: 0;
      vertical-align: middle;
    }
    .drawer {
      padding-left: 24px;
    }
  `;p([y()],T.prototype,"name",2);p([y()],T.prototype,"visible",2);p([y()],T.prototype,"drawerOpen",2);T=p([$("gz-group-layer")],T);let q=class extends g{constructor(){super(),this.list=["This is the one","This is the two","This is the three","This is the four","This is the five","This is the six","This is the seven","This is the eight","This is the nine","This is the ten","This is the eleven","This is the twelve","This is the thirteen","This is the fourteen","This is the fifteen"]}render(){return f`
      <gz-panel-title divider>Layers</gz-panel-title>
      <div class="overflow">
        <gz-group-layer name="Group Layer 1">
          <gz-layer name="Group item 1"></gz-layer>
          <gz-layer name="Group item 2"></gz-layer>
          <gz-layer name="Group item 3"></gz-layer>
        </gz-group-layer>
        ${this.list.map(r=>f`
            <gz-layer name=${r}></gz-layer>
          `)}
      </div>
    `}};q.styles=P`
    :host {
      display: flex;
      flex-direction: column;
    }
    .overflow {
      overflow: auto;
      min-height: 0;
      padding: 5px;
    }
    .overflow::-webkit-scrollbar {
      width: 10px;
    }
    .overflow::-webkit-scrollbar-thumb {
      border-radius: 10px;
      border: 3px solid transparent;
      background-clip: padding-box;
      background-color: #b1b1b1;
    }
  `;p([y()],q.prototype,"list",2);q=p([$("gz-layer-list")],q);let te=class extends g{render(){return f`
      <div class="container">
        <slot></slot>
      </div>
    `}};te.styles=P`
    :host {
      display: flex;
    } 
    .container{
      background-color: white;
      width:360px; 
      flex: 1 0 0;
      display:flex;
      flex-direction: column;
      margin: 16px;
      border-radius: 10px;
      box-shadow: 0px 0px 5px 0px #00000033;
    }
  `;te=p([$("gz-panel")],te);let ie=class extends g{render(){return f`
      <div class="spacer"></div>
      <div class="container">
        <button class="button" @click="${this.clickSelect}">${v(et)}</button>
        <button class="button" @click="${this.clickText}">${v(tt)}</button>
        <button class="button" @click="${this.clickImage}">${v(it)}</button>
        <button class="button" @click="${this.clickBox}">${v(st)}</button>
      </div>
      <div class="spacer"></div>
    `}clickSelect(){console.log("Select!")}clickText(){console.log("Text?")}clickImage(){console.log("Image #")}clickBox(){console.log("Box []")}};ie.styles=P`
    :host {
      display: flex;
      flex-direction: column;
    } 
    .spacer {
      flex: 1 0 0;
    }
    .container{
      width:48px;
      display:flex;
      flex-direction: column;
      margin: 16px;
      border-radius: 10px;
      box-shadow: 0px 0px 5px 0px #00000033;
      background-color: white;
    }
    .button {
      height: 48px;
      border: 0;
      background-color: #00000000;
    }
  `;ie=p([$("gz-toolbar")],ie);let $e=class extends g{constructor(){super(),this.addEventListener("mousemove",this.mousemove),this.addEventListener("wheel",this.wheel),this.lastMouseX=0,this.lastMouseY=0,this.isMouseDown=!1}mousemove(r){if(r.buttons===1){const e=this.lastMouseX-r.screenX,t=this.lastMouseY-r.screenY;C().preview().translate(e,t),C().processChanges()}this.lastMouseX=r.screenX,this.lastMouseY=r.screenY}wheel(r){r.preventDefault();const e=r.ctrlKey?-10:-1;C().preview().scale(r.deltaY*e),C().processChanges()}render(){return f``}};$e=p([$("gz-canvas-spacer")],$e);let se=class extends g{render(){return f`
      <gz-toolbar></gz-toolbar>
      <gz-canvas-spacer class="flex1"></gz-canvas-spacer>
      <gz-panel>
        <gz-prop-list class="flex1">  
        </gz-prop-list>
        <gz-layer-list class="flex1">
        </gz-layer-list>
      </gz-panel>
    `}};se.styles=P`
    :host {
      display: flex;
      flex-direction: row;
      height: 100vh;
    } 
    .flex1 {
      flex: 1 0 0;
      min-height: 0;
    }
  `;se=p([$("gz-app")],se);

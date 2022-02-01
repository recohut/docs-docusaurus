"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3621],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return u}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),p=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),m=p(n),u=a,f=m["".concat(c,".").concat(u)]||m[u]||l[u]||o;return n?r.createElement(f,s(s({ref:t},d),{},{components:n})):r.createElement(f,s({ref:t},d))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,s=new Array(o);s[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,s[1]=i;for(var p=2;p<o;p++)s[p]=n[p];return r.createElement.apply(null,s)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1385:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return p},toc:function(){return d},default:function(){return m}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),s=["components"],i={},c="TAGNN",p={unversionedId:"models/tagnn",id:"models/tagnn",title:"TAGNN",description:"TAGNN stands for Target Attentive Graph Neural Network. Session-based recommendations are challenging due to limited user-item interactions. Typical sequential models are not able to capture complex patterns from all previous interactions. SessionGraph (a graph representation of sessions) can capture the complex patterns from all previous interactions.",source:"@site/docs/models/tagnn.md",sourceDirName:"models",slug:"/models/tagnn",permalink:"/docs/models/tagnn",editUrl:"https://github.com/recohut/docs/docs/docs/models/tagnn.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"TAGNN-PP",permalink:"/docs/models/tagnn-pp"},next:{title:"VNCF",permalink:"/docs/models/vncf"}},d=[],l={toc:d};function m(e){var t=e.components,i=(0,a.Z)(e,s);return(0,o.kt)("wrapper",(0,r.Z)({},l,i,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"tagnn"},"TAGNN"),(0,o.kt)("p",null,"TAGNN stands for Target Attentive Graph Neural Network. Session-based recommendations are challenging due to limited user-item interactions. Typical sequential models are not able to capture complex patterns from all previous interactions. SessionGraph (a graph representation of sessions) can capture the complex patterns from all previous interactions."),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"research paper")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},(0,o.kt)("a",{parentName:"p",href:"https://arxiv.org/abs/2005.02844"},"Yu et. al., \u201c",(0,o.kt)("em",{parentName:"a"},"Target Attentive Graph Neural Networks for Session-based Recommendation"),"\u201d. SIGIR, 2020.")),(0,o.kt)("blockquote",{parentName:"div"},(0,o.kt)("p",{parentName:"blockquote"},"Session-based recommendation nowadays plays a vital role in many websites, which aims to predict users' actions based on anonymous sessions. There have emerged many studies that model a session as a sequence or a graph via investigating temporal transitions of items in a session. However, these methods compress a session into one fixed representation vector without considering the target items to be predicted. The fixed vector will restrict the representation ability of the recommender model, considering the diversity of target items and users' interests. In this paper, we propose a novel target attentive graph neural network (TAGNN) model for session-based recommendation. In TAGNN, target-aware attention adaptively activates different user interests with respect to varied target items. The learned interest representation vector varies with different target items, greatly improving the expressiveness of the model. Moreover, TAGNN harnesses the power of graph neural networks to capture rich item transitions in sessions. Comprehensive experiments conducted on real-world datasets demonstrate its superiority over state-of-the-art methods.")))),(0,o.kt)("p",null,"In TAGNN, we first construct session graphs using items in historical sessions. After that, we obtain corresponding embeddings using graph neural networks to capture complex item transitions based on session graphs. Given the item embeddings, we employ a target-aware attentive network to activate specific user interests with respect to a target item. Following that, we construct session embeddings. At last, for each session, we can infer the user\u2019s next action based on item embeddings and the session embedding."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"An overview of the proposed TAGNN method. Session graphs are constructed based on sessions at first. Then, graph neural networks capture rich item transitions in sessions. Last, from one session embedding vector, target-aware attention adaptively activates different user interests concerning varied target items to be predicted.",src:n(3591).Z})),(0,o.kt)("p",null,"An overview of the proposed TAGNN method. Session graphs are constructed based on sessions at first. Then, graph neural networks capture rich item transitions in sessions. Last, from one session embedding vector, target-aware attention adaptively activates different user interests concerning varied target items to be predicted."))}m.isMDXComponent=!0},3591:function(e,t,n){t.Z=n.p+"assets/images/content-models-raw-mp2-tagnn-untitled-5d582d3b4583da152ed6a3e79e974725.png"}}]);
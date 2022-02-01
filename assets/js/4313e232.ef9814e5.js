"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[288],{3905:function(e,t,r){r.d(t,{Zo:function(){return d},kt:function(){return u}});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var c=n.createContext({}),l=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},d=function(e){var t=l(e.components);return n.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),m=l(r),u=a,h=m["".concat(c,".").concat(u)]||m[u]||p[u]||o;return r?n.createElement(h,i(i({ref:t},d),{},{components:r})):n.createElement(h,i({ref:t},d))}));function u(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=r[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},2061:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return d},default:function(){return m}});var n=r(7462),a=r(3366),o=(r(7294),r(3905)),i=["components"],s={},c="xDeepFM",l={unversionedId:"models/xdeepfm",id:"models/xdeepfm",title:"xDeepFM",description:"xDeepFM stands for Extreme Deep Factorization Machines.",source:"@site/docs/models/xdeepfm.md",sourceDirName:"models",slug:"/models/xdeepfm",permalink:"/docs/models/xdeepfm",editUrl:"https://github.com/recohut/docs/docs/docs/models/xdeepfm.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Word2vec",permalink:"/docs/models/word2vec"},next:{title:"Addressing the Cold-Start Problem",permalink:"/docs/tutorials/addressing-the-cold-start-problem"}},d=[{value:"Architecture",id:"architecture",children:[],level:2},{value:"Compressed Interaction Network (CIN)",id:"compressed-interaction-network-cin",children:[],level:2},{value:"Links",id:"links",children:[],level:2}],p={toc:d};function m(e){var t=e.components,s=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},p,s,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"xdeepfm"},"xDeepFM"),(0,o.kt)("p",null,"xDeepFM stands for Extreme Deep Factorization Machines."),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"research paper")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},(0,o.kt)("a",{parentName:"p",href:"https://arxiv.org/abs/1803.05170"},"Jianxun Lian at al. \u201c",(0,o.kt)("em",{parentName:"a"},"xDeepFM: Combining Explicit and Implicit Feature Interactions for Recommender Systems"),"\u201d in SIGKDD 2018.")),(0,o.kt)("blockquote",{parentName:"div"},(0,o.kt)("p",{parentName:"blockquote"},"Combinatorial features are essential for the success of many commercial models. Manually crafting these features usually comes with high cost due to the variety, volume and velocity of raw data in web-scale systems. Factorization based models, which measure interactions in terms of vector product, can learn patterns of combinatorial features automatically and generalize to unseen features as well. With the great success of deep neural networks (DNNs) in various fields, recently researchers have proposed several DNN-based factorization model to learn both low- and high-order feature interactions. Despite the powerful ability of learning an arbitrary function from data, plain DNNs generate feature interactions implicitly and at the bit-wise level. In this paper, we propose a novel Compressed Interaction Network (CIN), which aims to generate feature interactions in an explicit fashion and at the vector-wise level. We show that the CIN share some functionalities with convolutional neural networks (CNNs) and recurrent neural networks (RNNs). We further combine a CIN and a classical DNN into one unified model, and named this new model eXtreme Deep Factorization Machine (xDeepFM). On one hand, the xDeepFM is able to learn certain bounded-degree feature interactions explicitly; on the other hand, it can learn arbitrary low- and high-order feature interactions implicitly. We conduct comprehensive experiments on three real-world datasets. Our results demonstrate that xDeepFM outperforms state-of-the-art models.")))),(0,o.kt)("h2",{id:"architecture"},"Architecture"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"The architecture of xDeepFM.",src:r(5216).Z})),(0,o.kt)("p",null,"The architecture of xDeepFM."),(0,o.kt)("h2",{id:"compressed-interaction-network-cin"},"Compressed Interaction Network (CIN)"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Components and architecture of the Compressed Interaction Network (CIN).",src:r(2454).Z})),(0,o.kt)("p",null,"Components and architecture of the Compressed Interaction Network (CIN)."),(0,o.kt)("h2",{id:"links"},"Links"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://arxiv.org/abs/1803.05170"},"https://arxiv.org/abs/1803.05170")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://dl.acm.org/doi/pdf/10.1145/3219819.3220023"},"https://dl.acm.org/doi/pdf/10.1145/3219819.3220023")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/Leavingseason/xDeepFM"},"https://github.com/Leavingseason/xDeepFM")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/shenweichen/DeepCTR-Torch"},"https://github.com/shenweichen/DeepCTR-Torch")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://deepctr-doc.readthedocs.io/en/latest/deepctr.models.xdeepfm.html"},"https://deepctr-doc.readthedocs.io/en/latest/deepctr.models.xdeepfm.html")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://deepctr-torch.readthedocs.io/en/latest/deepctr_torch.models.xdeepfm.html"},"https://deepctr-torch.readthedocs.io/en/latest/deepctr_torch.models.xdeepfm.html")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/PaddlePaddle/PaddleRec/blob/release/2.1.0/models/rank/xdeepfm"},"https://github.com/PaddlePaddle/PaddleRec/blob/release/2.1.0/models/rank/xdeepfm")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://towardsdatascience.com/extreme-deep-factorization-machine-xdeepfm-1ba180a6de78"},"https://towardsdatascience.com/extreme-deep-factorization-machine-xdeepfm-1ba180a6de78"))))}m.isMDXComponent=!0},2454:function(e,t,r){t.Z=r.p+"assets/images/content-models-raw-mp1-xdeepfm-untitled-1-2790798f8f173cc8b927bd37b7222664.png"},5216:function(e,t,r){t.Z=r.p+"assets/images/content-models-raw-mp1-xdeepfm-untitled-5ab30d99f8a78e9ea2425eecc103c9e1.png"}}]);
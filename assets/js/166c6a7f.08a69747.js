"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[820],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),s=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=s(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),d=s(n),m=a,h=d["".concat(l,".").concat(m)]||d[m]||p[m]||o;return n?r.createElement(h,i(i({ref:t},u),{},{components:n})):r.createElement(h,i({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},998:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return u},default:function(){return d}});var r=n(87462),a=n(63366),o=(n(67294),n(3905)),i=["components"],c={},l="AutoInt",s={unversionedId:"models/autoint",id:"models/autoint",title:"AutoInt",description:"Song et. al., \u201cAutomatic Feature Interaction Learning via Self-Attentive Neural Networks\u201d. CIKM, 2018.",source:"@site/docs/models/autoint.md",sourceDirName:"models",slug:"/models/autoint",permalink:"/docs/models/autoint",editUrl:"https://github.com/recohut/docs/docs/docs/models/autoint.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"AUSH",permalink:"/docs/models/aush"},next:{title:"BASR",permalink:"/docs/models/basr"}},u=[{value:"Architecture",id:"architecture",children:[],level:2},{value:"Links",id:"links",children:[],level:2}],p={toc:u};function d(e){var t=e.components,c=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},p,c,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"autoint"},"AutoInt"),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"research paper")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},(0,o.kt)("a",{parentName:"p",href:"https://arxiv.org/abs/1810.11921"},"Song et. al., \u201c",(0,o.kt)("em",{parentName:"a"},"Automatic Feature Interaction Learning via Self-Attentive Neural Networks"),"\u201d. CIKM, 2018.")),(0,o.kt)("blockquote",{parentName:"div"},(0,o.kt)("p",{parentName:"blockquote"},"Click-through rate (CTR) prediction, which aims to predict the probability of a user clicking on an ad or an item, is critical to many online applications such as online advertising and recommender systems. The problem is very challenging since (1) the input features (e.g., the user id, user age, item id, item category) are usually sparse and high-dimensional, and (2) an effective prediction relies on high-order combinatorial features (\\textit{a.k.a.} cross features), which are very time-consuming to hand-craft by domain experts and are impossible to be enumerated. Therefore, there have been efforts in finding low-dimensional representations of the sparse and high-dimensional raw features and their meaningful combinations. In this paper, we propose an effective and efficient method called the \\emph{AutoInt} to automatically learn the high-order feature interactions of input features. Our proposed algorithm is very general, which can be applied to both numerical and categorical input features. Specifically, we map both the numerical and categorical features into the same low-dimensional space. Afterwards, a multi-head self-attentive neural network with residual connections is proposed to explicitly model the feature interactions in the low-dimensional space. With different layers of the multi-head self-attentive neural networks, different orders of feature combinations of input features can be modeled. The whole model can be efficiently fit on large-scale raw data in an end-to-end fashion. Experimental results on four real-world datasets show that our proposed approach not only outperforms existing state-of-the-art approaches for prediction but also offers good explainability. Code is available at: \\url{",(0,o.kt)("a",{parentName:"p",href:"https://github.com/DeepGraphLearning/RecommenderSystems"},"this https URL"),"}.")))),(0,o.kt)("h2",{id:"architecture"},"Architecture"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Untitled",src:n(10312).Z})),(0,o.kt)("h2",{id:"links"},"Links"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/DaPenggg/AutoInt"},"https://github.com/DaPenggg/AutoInt")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/shichence/AutoInt"},"https://github.com/shichence/AutoInt")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://recbole.io/docs/recbole/recbole.model.context_aware_recommender.autoint.html"},"https://recbole.io/docs/recbole/recbole.model.context_aware_recommender.autoint.html")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://deepctr-doc.readthedocs.io/en/latest/deepctr.models.autoint.html"},"https://deepctr-doc.readthedocs.io/en/latest/deepctr.models.autoint.html")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://deepctr-torch.readthedocs.io/en/latest/deepctr_torch.models.autoint.html"},"https://deepctr-torch.readthedocs.io/en/latest/deepctr_torch.models.autoint.html"))))}d.isMDXComponent=!0},10312:function(e,t,n){t.Z=n.p+"assets/images/content-models-raw-mp1-autoint-untitled-ab34f8f16f8e82a303549b13d476e43c.png"}}]);
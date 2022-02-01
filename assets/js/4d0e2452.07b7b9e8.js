"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8839],{3905:function(e,a,t){t.d(a,{Zo:function(){return o},kt:function(){return h}});var n=t(7294);function s(e,a,t){return a in e?Object.defineProperty(e,a,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[a]=t,e}function r(e,a){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);a&&(n=n.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),t.push.apply(t,n)}return t}function m(e){for(var a=1;a<arguments.length;a++){var t=null!=arguments[a]?arguments[a]:{};a%2?r(Object(t),!0).forEach((function(a){s(e,a,t[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(t,a))}))}return e}function p(e,a){if(null==e)return{};var t,n,s=function(e,a){if(null==e)return{};var t,n,s={},r=Object.keys(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||(s[t]=e[t]);return s}(e,a);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)t=r[n],a.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(s[t]=e[t])}return s}var i=n.createContext({}),l=function(e){var a=n.useContext(i),t=a;return e&&(t="function"==typeof e?e(a):m(m({},a),e)),t},o=function(e){var a=l(e.components);return n.createElement(i.Provider,{value:a},e.children)},c={inlineCode:"code",wrapper:function(e){var a=e.children;return n.createElement(n.Fragment,{},a)}},N=n.forwardRef((function(e,a){var t=e.components,s=e.mdxType,r=e.originalType,i=e.parentName,o=p(e,["components","mdxType","originalType","parentName"]),N=l(t),h=s,d=N["".concat(i,".").concat(h)]||N[h]||c[h]||r;return t?n.createElement(d,m(m({ref:a},o),{},{components:t})):n.createElement(d,m({ref:a},o))}));function h(e,a){var t=arguments,s=a&&a.mdxType;if("string"==typeof e||s){var r=t.length,m=new Array(r);m[0]=N;var p={};for(var i in a)hasOwnProperty.call(a,i)&&(p[i]=a[i]);p.originalType=e,p.mdxType="string"==typeof e?e:s,m[1]=p;for(var l=2;l<r;l++)m[l]=t[l];return n.createElement.apply(null,m)}return n.createElement.apply(null,t)}N.displayName="MDXCreateElement"},9697:function(e,a,t){t.r(a),t.d(a,{frontMatter:function(){return p},contentTitle:function(){return i},metadata:function(){return l},toc:function(){return o},default:function(){return N}});var n=t(7462),s=t(3366),r=(t(7294),t(3905)),m=["components"],p={},i="MIAN",l={unversionedId:"models/mian",id:"models/mian",title:"MIAN",description:"MIAN stands for Multi-Interactive Attention Network. It aggregate multiple information, and gain latent representations through interactions between candidate items and other fine-grained features.",source:"@site/docs/models/mian.md",sourceDirName:"models",slug:"/models/mian",permalink:"/docs/models/mian",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/models/mian.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"MF",permalink:"/docs/models/mf"},next:{title:"NeuMF",permalink:"/docs/models/neumf"}},o=[{value:"Architecture",id:"architecture",children:[{value:"Loss Function",id:"loss-function",children:[],level:3}],level:2}],c={toc:o};function N(e){var a=e.components,p=(0,s.Z)(e,m);return(0,r.kt)("wrapper",(0,n.Z)({},c,p,{components:a,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"mian"},"MIAN"),(0,r.kt)("p",null,"MIAN stands for Multi-Interactive Attention Network. It aggregate multiple information, and gain latent representations through interactions between candidate items and other fine-grained features."),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"research paper")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},(0,r.kt)("a",{parentName:"p",href:"https://arxiv.org/abs/2012.06968"},"Zhang et. al., \u201c",(0,r.kt)("em",{parentName:"a"},"Multi-Interactive Attention Network for Fine-grained Feature Learning in CTR Prediction"),"\u201d. WSDM, 2021.")),(0,r.kt)("blockquote",{parentName:"div"},(0,r.kt)("p",{parentName:"blockquote"},"In the Click-Through Rate (CTR) prediction scenario, user's sequential behaviors are well utilized to capture the user interest in the recent literature. However, despite being extensively studied, these sequential methods still suffer from three limitations. First, existing methods mostly utilize attention on the behavior of users, which is not always suitable for CTR prediction, because users often click on new products that are irrelevant to any historical behaviors. Second, in the real scenario, there exist numerous users that have operations a long time ago, but turn relatively inactive in recent times. Thus, it is hard to precisely capture user's current preferences through early behaviors. Third, multiple representations of user's historical behaviors in different feature subspaces are largely ignored. To remedy these issues, we propose a Multi-Interactive Attention Network (MIAN) to comprehensively extract the latent relationship among all kinds of fine-grained features (e.g., gender, age and occupation in user-profile). Specifically, MIAN contains a Multi-Interactive Layer (MIL) that integrates three local interaction modules to capture multiple representations of user preference through sequential behaviors and simultaneously utilize the fine-grained user-specific as well as context information. In addition, we design a Global Interaction Module (GIM) to learn the high-order interactions and balance the different impacts of multiple features. Finally, Offline experiment results from three datasets, together with an Online A/B test in a large-scale recommendation system, demonstrate the effectiveness of our proposed approach.")))),(0,r.kt)("h2",{id:"architecture"},"Architecture"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"The architecture of MIAN. Overall, from the bottom up, it can be divided into three layers: 1. Embedding Layer, which projects sparse heterogeneous features into low-dimensional vectors. 2. Multi-Interactive Layer, which contains three local modules, i.e., (a), (b), (c), and a global module, i.e., (d), to learn multiple fine-grained feature interactions. 3. Prediction Layer, which contains DNN to do CTR prediction.",src:t(1589).Z})),(0,r.kt)("p",null,"The architecture of MIAN. Overall, from the bottom up, it can be divided into three layers: 1. Embedding Layer, which projects sparse heterogeneous features into low-dimensional vectors. 2. Multi-Interactive Layer, which contains three local modules, i.e., (a), (b), (c), and a global module, i.e., (d), to learn multiple fine-grained feature interactions. 3. Prediction Layer, which contains DNN to do CTR prediction."),(0,r.kt)("p",null,"The network consists of a Multi-Interactive Layer (MIL) which includes three local interaction modules and a global interaction module. The first local module is Item-Behaviors Interaction Module (IBIM) that uses Pre-LN Transformer to adaptively explore the user preferences of sequential behaviors at different subspaces. The second is Item-User Interaction Module (IUIM) which aims to capture the knowledge between candidate items and the fine-grained user-specific information. Similarly, the third named Item-Context Interaction Module (ICIM) is devised to mine relations between candidate items and context-aware information. Besides, the Global Interaction Module (GIM) is designed to study and weigh the influence between the loworder features after the embedding layer and high-order features generated from three local interaction modules."),(0,r.kt)("h3",{id:"loss-function"},"Loss Function"),(0,r.kt)("p",null,"To estimate parameters of a model, we need to specify an objective function to optimize. For better comparison, we specify a traditional loss function for model training. The goal of the objective function is to minimize the cross-entropy of the predicted values and the real labels, which is defined as:"),(0,r.kt)("div",{className:"math math-display"},(0,r.kt)("span",{parentName:"div",className:"katex-display"},(0,r.kt)("span",{parentName:"span",className:"katex"},(0,r.kt)("span",{parentName:"span",className:"katex-mathml"},(0,r.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML",display:"block"},(0,r.kt)("semantics",{parentName:"math"},(0,r.kt)("mrow",{parentName:"semantics"},(0,r.kt)("mi",{parentName:"mrow",mathvariant:"script"},"L"),(0,r.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,r.kt)("mi",{parentName:"mrow"},"y"),(0,r.kt)("mo",{parentName:"mrow",separator:"true"},","),(0,r.kt)("mover",{parentName:"mrow",accent:"true"},(0,r.kt)("mi",{parentName:"mover"},"y"),(0,r.kt)("mo",{parentName:"mover"},"^")),(0,r.kt)("mo",{parentName:"mrow",stretchy:"false"},")"),(0,r.kt)("mo",{parentName:"mrow"},"="),(0,r.kt)("mo",{parentName:"mrow"},"\u2212"),(0,r.kt)("mi",{parentName:"mrow"},"y"),(0,r.kt)("mi",{parentName:"mrow"},"log"),(0,r.kt)("mo",{parentName:"mrow"},"\u2061"),(0,r.kt)("mover",{parentName:"mrow",accent:"true"},(0,r.kt)("mi",{parentName:"mover"},"y"),(0,r.kt)("mo",{parentName:"mover"},"^")),(0,r.kt)("mo",{parentName:"mrow"},"\u2212"),(0,r.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,r.kt)("mn",{parentName:"mrow"},"1"),(0,r.kt)("mo",{parentName:"mrow"},"\u2212"),(0,r.kt)("mi",{parentName:"mrow"},"y"),(0,r.kt)("mo",{parentName:"mrow",stretchy:"false"},")"),(0,r.kt)("mi",{parentName:"mrow"},"log"),(0,r.kt)("mo",{parentName:"mrow"},"\u2061"),(0,r.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,r.kt)("mn",{parentName:"mrow"},"1"),(0,r.kt)("mo",{parentName:"mrow"},"\u2212"),(0,r.kt)("mover",{parentName:"mrow",accent:"true"},(0,r.kt)("mi",{parentName:"mover"},"y"),(0,r.kt)("mo",{parentName:"mover"},"^")),(0,r.kt)("mo",{parentName:"mrow",stretchy:"false"},")")),(0,r.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\mathcal{L}(y,\\hat{y}) = -y\\log \\hat{y} - (1-y)\\log(1-\\hat{y})")))),(0,r.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,r.kt)("span",{parentName:"span",className:"mord mathcal"},"L"),(0,r.kt)("span",{parentName:"span",className:"mopen"},"("),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"y"),(0,r.kt)("span",{parentName:"span",className:"mpunct"},","),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,r.kt)("span",{parentName:"span",className:"mord accent"},(0,r.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,r.kt)("span",{parentName:"span",className:"vlist-r"},(0,r.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.6944em"}},(0,r.kt)("span",{parentName:"span",style:{top:"-3em"}},(0,r.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"y")),(0,r.kt)("span",{parentName:"span",style:{top:"-3em"}},(0,r.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,r.kt)("span",{parentName:"span",className:"accent-body",style:{left:"-0.1944em"}},(0,r.kt)("span",{parentName:"span",className:"mord"},"^")))),(0,r.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,r.kt)("span",{parentName:"span",className:"vlist-r"},(0,r.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.1944em"}},(0,r.kt)("span",{parentName:"span"}))))),(0,r.kt)("span",{parentName:"span",className:"mclose"},")"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}}),(0,r.kt)("span",{parentName:"span",className:"mrel"},"="),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2778em"}})),(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"0.8889em",verticalAlign:"-0.1944em"}}),(0,r.kt)("span",{parentName:"span",className:"mord"},"\u2212"),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"y"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,r.kt)("span",{parentName:"span",className:"mop"},"lo",(0,r.kt)("span",{parentName:"span",style:{marginRight:"0.01389em"}},"g")),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,r.kt)("span",{parentName:"span",className:"mord accent"},(0,r.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,r.kt)("span",{parentName:"span",className:"vlist-r"},(0,r.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.6944em"}},(0,r.kt)("span",{parentName:"span",style:{top:"-3em"}},(0,r.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"y")),(0,r.kt)("span",{parentName:"span",style:{top:"-3em"}},(0,r.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,r.kt)("span",{parentName:"span",className:"accent-body",style:{left:"-0.1944em"}},(0,r.kt)("span",{parentName:"span",className:"mord"},"^")))),(0,r.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,r.kt)("span",{parentName:"span",className:"vlist-r"},(0,r.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.1944em"}},(0,r.kt)("span",{parentName:"span"}))))),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222em"}}),(0,r.kt)("span",{parentName:"span",className:"mbin"},"\u2212"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222em"}})),(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,r.kt)("span",{parentName:"span",className:"mopen"},"("),(0,r.kt)("span",{parentName:"span",className:"mord"},"1"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222em"}}),(0,r.kt)("span",{parentName:"span",className:"mbin"},"\u2212"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222em"}})),(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"y"),(0,r.kt)("span",{parentName:"span",className:"mclose"},")"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,r.kt)("span",{parentName:"span",className:"mop"},"lo",(0,r.kt)("span",{parentName:"span",style:{marginRight:"0.01389em"}},"g")),(0,r.kt)("span",{parentName:"span",className:"mopen"},"("),(0,r.kt)("span",{parentName:"span",className:"mord"},"1"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222em"}}),(0,r.kt)("span",{parentName:"span",className:"mbin"},"\u2212"),(0,r.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.2222em"}})),(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,r.kt)("span",{parentName:"span",className:"mord accent"},(0,r.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,r.kt)("span",{parentName:"span",className:"vlist-r"},(0,r.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.6944em"}},(0,r.kt)("span",{parentName:"span",style:{top:"-3em"}},(0,r.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"y")),(0,r.kt)("span",{parentName:"span",style:{top:"-3em"}},(0,r.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,r.kt)("span",{parentName:"span",className:"accent-body",style:{left:"-0.1944em"}},(0,r.kt)("span",{parentName:"span",className:"mord"},"^")))),(0,r.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,r.kt)("span",{parentName:"span",className:"vlist-r"},(0,r.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.1944em"}},(0,r.kt)("span",{parentName:"span"}))))),(0,r.kt)("span",{parentName:"span",className:"mclose"},")")))))),(0,r.kt)("p",null,"where ",(0,r.kt)("span",{parentName:"p",className:"math math-inline"},(0,r.kt)("span",{parentName:"span",className:"katex"},(0,r.kt)("span",{parentName:"span",className:"katex-mathml"},(0,r.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,r.kt)("semantics",{parentName:"math"},(0,r.kt)("mrow",{parentName:"semantics"},(0,r.kt)("mi",{parentName:"mrow"},"\ud835\udc66")),(0,r.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\ud835\udc66")))),(0,r.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"0.625em",verticalAlign:"-0.1944em"}}),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"y")))))," \u2208 {0, 1} is the ground truth and ",(0,r.kt)("span",{parentName:"p",className:"math math-inline"},(0,r.kt)("span",{parentName:"span",className:"katex"},(0,r.kt)("span",{parentName:"span",className:"katex-mathml"},(0,r.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,r.kt)("semantics",{parentName:"math"},(0,r.kt)("mrow",{parentName:"semantics"},(0,r.kt)("mover",{parentName:"mrow",accent:"true"},(0,r.kt)("mi",{parentName:"mover"},"\ud835\udc66"),(0,r.kt)("mo",{parentName:"mover"},"^"))),(0,r.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\hat{\ud835\udc66}")))),(0,r.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"0.8889em",verticalAlign:"-0.1944em"}}),(0,r.kt)("span",{parentName:"span",className:"mord accent"},(0,r.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,r.kt)("span",{parentName:"span",className:"vlist-r"},(0,r.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.6944em"}},(0,r.kt)("span",{parentName:"span",style:{top:"-3em"}},(0,r.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"y")),(0,r.kt)("span",{parentName:"span",style:{top:"-3em"}},(0,r.kt)("span",{parentName:"span",className:"pstrut",style:{height:"3em"}}),(0,r.kt)("span",{parentName:"span",className:"accent-body",style:{left:"-0.1944em"}},(0,r.kt)("span",{parentName:"span",className:"mord"},"^")))),(0,r.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,r.kt)("span",{parentName:"span",className:"vlist-r"},(0,r.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.1944em"}},(0,r.kt)("span",{parentName:"span"})))))))))," \u2208 (0, 1) is the predicted probability of ",(0,r.kt)("span",{parentName:"p",className:"math math-inline"},(0,r.kt)("span",{parentName:"span",className:"katex"},(0,r.kt)("span",{parentName:"span",className:"katex-mathml"},(0,r.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,r.kt)("semantics",{parentName:"math"},(0,r.kt)("mrow",{parentName:"semantics"},(0,r.kt)("mi",{parentName:"mrow"},"y")),(0,r.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"y")))),(0,r.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"0.625em",verticalAlign:"-0.1944em"}}),(0,r.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"y"))))),". Additionally, all the parameters are optimized by the standard back-propagation algorithm."))}N.isMDXComponent=!0},1589:function(e,a,t){a.Z=t.p+"assets/images/content-models-raw-mp1-mian-untitled-a7e159e87c10bb247a768bef0923715e.png"}}]);
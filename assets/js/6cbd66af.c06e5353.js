"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9057],{3905:function(e,t,a){a.d(t,{Zo:function(){return c},kt:function(){return u}});var n=a(67294);function s(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){s(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function o(e,t){if(null==e)return{};var a,n,s=function(e,t){if(null==e)return{};var a,n,s={},r=Object.keys(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||(s[a]=e[a]);return s}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(n=0;n<r.length;n++)a=r[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(s[a]=e[a])}return s}var m=n.createContext({}),l=function(e){var t=n.useContext(m),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},c=function(e){var t=l(e.components);return n.createElement(m.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var a=e.components,s=e.mdxType,r=e.originalType,m=e.parentName,c=o(e,["components","mdxType","originalType","parentName"]),d=l(a),u=s,h=d["".concat(m,".").concat(u)]||d[u]||p[u]||r;return a?n.createElement(h,i(i({ref:t},c),{},{components:a})):n.createElement(h,i({ref:t},c))}));function u(e,t){var a=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var r=a.length,i=new Array(r);i[0]=d;var o={};for(var m in t)hasOwnProperty.call(t,m)&&(o[m]=t[m]);o.originalType=e,o.mdxType="string"==typeof e?e:s,i[1]=o;for(var l=2;l<r;l++)i[l]=a[l];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}d.displayName="MDXCreateElement"},619:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return o},contentTitle:function(){return m},metadata:function(){return l},toc:function(){return c},default:function(){return d}});var n=a(87462),s=a(63366),r=(a(67294),a(3905)),i=["components"],o={},m="BASR",l={unversionedId:"models/basr",id:"models/basr",title:"BASR",description:"Black-Box Attacks on Sequential Recommenders via Data-Free Model Extraction",source:"@site/docs/models/basr.mdx",sourceDirName:"models",slug:"/models/basr",permalink:"/docs/models/basr",editUrl:"https://github.com/sparsh-ai/ml-utils/docs/models/basr.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"AutoInt",permalink:"/docs/models/autoint"},next:{title:"BCQ",permalink:"/docs/models/bcq"}},c=[{value:"Abstract",id:"abstract",children:[{value:"Profile Pollution Attack",id:"profile-pollution-attack",children:[],level:3},{value:"Data Poisoning Attack",id:"data-poisoning-attack",children:[],level:3}],level:2}],p={toc:c};function d(e){var t=e.components,a=(0,s.Z)(e,i);return(0,r.kt)("wrapper",(0,n.Z)({},p,a,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"basr"},"BASR"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Black-Box Attacks on Sequential Recommenders via Data-Free Model Extraction")),(0,r.kt)("h2",{id:"abstract"},"Abstract"),(0,r.kt)("p",null,(0,r.kt)("em",{parentName:"p"},'We investigate whether model extraction can be used to "steal" the weights of sequential recommender systems, and the potential threats posed to victims of such attacks. This type of risk has attracted attention in image and text classification, but to our knowledge not in recommender systems. We argue that sequential recommender systems are subject to unique vulnerabilities due to the specific autoregressive regimes used to train them. Unlike many existing recommender attackers, which assume the dataset used to train the victim model is exposed to attackers, we consider a data-free setting, where training data are not accessible. Under this setting, we propose an API-based model extraction method via limited-budget synthetic data generation and knowledge distillation. We investigate state-of-the-art models for sequential recommendation and show their vulnerability under model extraction and downstream attacks. We perform attacks in two stages. (1) Model extraction: given different types of synthetic data and their labels retrieved from a black-box recommender, we extract the black-box model to a white-box model via distillation. (2) Downstream attacks: we attack the black-box model with adversarial samples generated by the white-box recommender. Experiments show the effectiveness of our data-free model extraction and downstream attacks on sequential recommenders in both profile pollution and data poisoning settings.')),(0,r.kt)("p",null,(0,r.kt)("center",null,(0,r.kt)("img",{src:"https://github.com/recohut/recsys-attacks/raw/d7472b7296515249c1bd1bbb8ea0afa9b07f6d9d/docs/_images/C999743_1.png"}))),(0,r.kt)("p",null,"Model extraction attacks try to make a local copy of a machine learning model given only access to a query API. Our framework has two stages: (1) Model extraction: we generate informative synthetic data to train our white-box recommender that can rapidly close the gap between the victim recommender and ours via knowledge distillation; (2) Downstream attacks: we propose gradient-based adversarial sample generation algorithms, which allows us to find effective adversarial sequences in the discrete item space from the white-box recommender and achieve successful profile pollution or data poisoning attacks against the victim recommender. "),(0,r.kt)("h3",{id:"profile-pollution-attack"},"Profile Pollution Attack"),(0,r.kt)("p",null,"We define profile pollution attacks formally as the problem of finding the optimum injection items ",(0,r.kt)("span",{parentName:"p",className:"math math-inline"},(0,r.kt)("span",{parentName:"span",className:"katex"},(0,r.kt)("span",{parentName:"span",className:"katex-mathml"},(0,r.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,r.kt)("semantics",{parentName:"math"},(0,r.kt)("mrow",{parentName:"semantics"},(0,r.kt)("msup",{parentName:"mrow"},(0,r.kt)("mi",{parentName:"msup"},"\ud835\udc9b"),(0,r.kt)("mo",{parentName:"msup"},"\u2217"))),(0,r.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\ud835\udc9b^\u2217")))),(0,r.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6887em"}}),(0,r.kt)("span",{parentName:"span",className:"mord"},(0,r.kt)("span",{parentName:"span",className:"mord boldsymbol",style:{marginRight:"0.13889em"}},"z"),(0,r.kt)("span",{parentName:"span",className:"msupsub"},(0,r.kt)("span",{parentName:"span",className:"vlist-t"},(0,r.kt)("span",{parentName:"span",className:"vlist-r"},(0,r.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.6887em"}},(0,r.kt)("span",{parentName:"span",style:{top:"-3.063em",marginRight:"0.05em"}},(0,r.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,r.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,r.kt)("span",{parentName:"span",className:"mbin mtight"},"\u2217"))))))))))))," (that should be items appended after the original sequence \ud835\udc99) that maximize the target item exposure ",(0,r.kt)("span",{parentName:"p",className:"math math-inline"},(0,r.kt)("span",{parentName:"span",className:"katex"},(0,r.kt)("span",{parentName:"span",className:"katex-mathml"},(0,r.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,r.kt)("semantics",{parentName:"math"},(0,r.kt)("mrow",{parentName:"semantics"},(0,r.kt)("msub",{parentName:"mrow"},(0,r.kt)("mi",{parentName:"msub"},"\ud835\udc6c"),(0,r.kt)("mi",{parentName:"msub"},"\ud835\udc61"))),(0,r.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\ud835\udc6c_\ud835\udc61")))),(0,r.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"0.8361em",verticalAlign:"-0.15em"}}),(0,r.kt)("span",{parentName:"span",className:"mord"},(0,r.kt)("span",{parentName:"span",className:"mord boldsymbol",style:{marginRight:"0.11431em"}},"E"),(0,r.kt)("span",{parentName:"span",className:"msupsub"},(0,r.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,r.kt)("span",{parentName:"span",className:"vlist-r"},(0,r.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.2806em"}},(0,r.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"-0.1143em",marginRight:"0.05em"}},(0,r.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,r.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,r.kt)("span",{parentName:"span",className:"mord mathnormal mtight"},"t")))),(0,r.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,r.kt)("span",{parentName:"span",className:"vlist-r"},(0,r.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.15em"}},(0,r.kt)("span",{parentName:"span"}))))))))))," , which can be characterized with common ranking measures like Recall or NDCG."),(0,r.kt)("p",null,(0,r.kt)("center",null,(0,r.kt)("img",{src:"https://github.com/recohut/recsys-attacks/raw/d7472b7296515249c1bd1bbb8ea0afa9b07f6d9d/docs/_images/C999743_2.png"}))),(0,r.kt)("h3",{id:"data-poisoning-attack"},"Data Poisoning Attack"),(0,r.kt)("p",null,"Similarly, poisoning attacks can be viewed as finding biased injection profiles Z, such that after retraining, the recommender propagates the bias and is more likely to recommend the target."),(0,r.kt)("p",null,(0,r.kt)("center",null,(0,r.kt)("img",{src:"https://github.com/recohut/recsys-attacks/raw/d7472b7296515249c1bd1bbb8ea0afa9b07f6d9d/docs/_images/C999743_3.png"}))))}d.isMDXComponent=!0}}]);
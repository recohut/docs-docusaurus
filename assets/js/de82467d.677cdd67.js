"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4304],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return h}});var a=n(67294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,s=function(e,t){if(null==e)return{};var n,a,s={},r=Object.keys(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(a=0;a<r.length;a++)n=r[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var p=a.createContext({}),c=function(e){var t=a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},m=function(e){var t=c(e.components);return a.createElement(p.Provider,{value:t},e.children)},l={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,s=e.mdxType,r=e.originalType,p=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),d=c(n),h=s,u=d["".concat(p,".").concat(h)]||d[h]||l[h]||r;return n?a.createElement(u,o(o({ref:t},m),{},{components:n})):a.createElement(u,o({ref:t},m))}));function h(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var r=n.length,o=new Array(r);o[0]=d;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:s,o[1]=i;for(var c=2;c<r;c++)o[c]=n[c];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},77367:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return p},metadata:function(){return c},toc:function(){return m},default:function(){return d}});var a=n(87462),s=n(63366),r=(n(67294),n(3905)),o=["components"],i={},p="SR-GNN",c={unversionedId:"models/sr-gnn",id:"models/sr-gnn",title:"SR-GNN",description:"SR-GNN stands for Session-based Recommendation with Graph Neural Networks.",source:"@site/docs/models/sr-gnn.md",sourceDirName:"models",slug:"/models/sr-gnn",permalink:"/docs/models/sr-gnn",editUrl:"https://github.com/sparsh-ai/ml-utils/docs/models/sr-gnn.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"SPop",permalink:"/docs/models/spop"},next:{title:"SR-SAN",permalink:"/docs/models/sr-san"}},m=[{value:"Architecture",id:"architecture",children:[],level:2},{value:"Links",id:"links",children:[],level:2}],l={toc:m};function d(e){var t=e.components,i=(0,s.Z)(e,o);return(0,r.kt)("wrapper",(0,a.Z)({},l,i,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"sr-gnn"},"SR-GNN"),(0,r.kt)("p",null,"SR-GNN stands for Session-based Recommendation with Graph Neural Networks."),(0,r.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"research paper")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},(0,r.kt)("a",{parentName:"p",href:"https://arxiv.org/abs/1811.00855"},"Wu et. al., \u201c",(0,r.kt)("em",{parentName:"a"},"Session-based Recommendation with Graph Neural Networks"),"\u201d. AAAI, 2019.")),(0,r.kt)("blockquote",{parentName:"div"},(0,r.kt)("p",{parentName:"blockquote"},"The problem of session-based recommendation aims to predict user actions based on anonymous sessions. Previous methods model a session as a sequence and estimate user representations besides item representations to make recommendations. Though achieved promising results, they are insufficient to obtain accurate user vectors in sessions and neglect complex transitions of items. To obtain accurate item embedding and take complex transitions of items into account, we propose a novel method, i.e. Session-based Recommendation with Graph Neural Networks, SR-GNN for brevity. In the proposed method, session sequences are modeled as graph-structured data. Based on the session graph, GNN can capture complex transitions of items, which are difficult to be revealed by previous conventional sequential methods. Each session is then represented as the composition of the global preference and the current interest of that session using an attention network. Extensive experiments conducted on two real datasets show that SR-GNN evidently outperforms the state-of-the-art session-based recommendation methods consistently.")))),(0,r.kt)("h2",{id:"architecture"},"Architecture"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"The workflow of the proposed SR-GNN method. We model all session sequences as session graphs. Then, each session graph is proceeded one by one and the resulting node vectors can be obtained through a gated graph neural network. After that, each session is represented as the combination of the global preference and current interests of this session using an attention net. Finally, we predict the probability of each item that will appear to be the next-click one for each session.",src:n(81790).Z})),(0,r.kt)("p",null,"The workflow of the proposed SR-GNN method. We model all session sequences as session graphs. Then, each session graph is proceeded one by one and the resulting node vectors can be obtained through a gated graph neural network. After that, each session is represented as the combination of the global preference and current interests of this session using an attention net. Finally, we predict the probability of each item that will appear to be the next-click one for each session."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"An example of a session graph and the connection matrix $A_s$.",src:n(21094).Z})),(0,r.kt)("p",null,"An example of a session graph and the connection matrix ",(0,r.kt)("span",{parentName:"p",className:"math math-inline"},(0,r.kt)("span",{parentName:"span",className:"katex"},(0,r.kt)("span",{parentName:"span",className:"katex-mathml"},(0,r.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,r.kt)("semantics",{parentName:"math"},(0,r.kt)("mrow",{parentName:"semantics"},(0,r.kt)("msub",{parentName:"mrow"},(0,r.kt)("mi",{parentName:"msub"},"A"),(0,r.kt)("mi",{parentName:"msub"},"s"))),(0,r.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"A_s")))),(0,r.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,r.kt)("span",{parentName:"span",className:"base"},(0,r.kt)("span",{parentName:"span",className:"strut",style:{height:"0.8333em",verticalAlign:"-0.15em"}}),(0,r.kt)("span",{parentName:"span",className:"mord"},(0,r.kt)("span",{parentName:"span",className:"mord mathnormal"},"A"),(0,r.kt)("span",{parentName:"span",className:"msupsub"},(0,r.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,r.kt)("span",{parentName:"span",className:"vlist-r"},(0,r.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.1514em"}},(0,r.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"}},(0,r.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,r.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,r.kt)("span",{parentName:"span",className:"mord mathnormal mtight"},"s")))),(0,r.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,r.kt)("span",{parentName:"span",className:"vlist-r"},(0,r.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.15em"}},(0,r.kt)("span",{parentName:"span"})))))))))),"."),(0,r.kt)("p",null,"SR-GNN with normalized global connections (",(0,r.kt)("strong",{parentName:"p"},"SR-GNN-NGC"),") replaces the connection matrix with\xa0",(0,r.kt)("strong",{parentName:"p"},"edge weights"),"\xa0extracted from the global graph on the basis of SR-GNN."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Untitled",src:n(9374).Z})),(0,r.kt)("p",null,"Compared with SR-GNN, SR-GNN-NGC reduces the influence of edges that are connected to nodes. Such a fusion method notably affects the integrity of the current session, especially when the weight of the edge in the graph varies, leading to performance downgrade."),(0,r.kt)("p",null,"SR-GNN with full connections (",(0,r.kt)("strong",{parentName:"p"},"SR-GNN-FC"),") represents all higher-order relationships using boolean weights and appends its corresponding connection matrix to that of SR-GNN."),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Untitled",src:n(88261).Z})),(0,r.kt)("p",null,"Similarly, it is reported that SR-GNN-FC performs worse than SR-GNN, though the experimental results of the two methods are not of many differences. Such a\xa0",(0,r.kt)("strong",{parentName:"p"},"small difference"),"\xa0suggests that in most recommendation scenarios, not every high-order transitions can be directly converted to straight connections and intermediate stages between high-order items are\xa0",(0,r.kt)("strong",{parentName:"p"},"still"),"\xa0necessities."),(0,r.kt)("h2",{id:"links"},"Links"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/mmaher22/iCV-SBR/tree/master/Source%20Codes/SRGNN_Pytorch"},"https://github.com/mmaher22/iCV-SBR/tree/master/Source Codes/SRGNN_Pytorch")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://github.com/CRIPAC-DIG/SR-GNN"},"https://github.com/CRIPAC-DIG/SR-GNN"))))}d.isMDXComponent=!0},21094:function(e,t,n){t.Z=n.p+"assets/images/content-models-raw-mp2-sr-gnn-untitled-1-39b1da2f831f6de2f48c98eec62f98ff.png"},9374:function(e,t,n){t.Z=n.p+"assets/images/content-models-raw-mp2-sr-gnn-untitled-2-12ad9c9dd69d0fafe3ebee7bb396c0e1.png"},88261:function(e,t,n){t.Z=n.p+"assets/images/content-models-raw-mp2-sr-gnn-untitled-3-939c247efc0a6b6539ccd30de0265b2f.png"},81790:function(e,t,n){t.Z=n.p+"assets/images/content-models-raw-mp2-sr-gnn-untitled-e5da1eacdb289e26c020cbbf88223f8c.png"}}]);
"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3584],{3905:function(a,e,t){t.d(e,{Zo:function(){return o},kt:function(){return h}});var s=t(67294);function n(a,e,t){return e in a?Object.defineProperty(a,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):a[e]=t,a}function m(a,e){var t=Object.keys(a);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(a);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),t.push.apply(t,s)}return t}function r(a){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?m(Object(t),!0).forEach((function(e){n(a,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(t)):m(Object(t)).forEach((function(e){Object.defineProperty(a,e,Object.getOwnPropertyDescriptor(t,e))}))}return a}function p(a,e){if(null==a)return{};var t,s,n=function(a,e){if(null==a)return{};var t,s,n={},m=Object.keys(a);for(s=0;s<m.length;s++)t=m[s],e.indexOf(t)>=0||(n[t]=a[t]);return n}(a,e);if(Object.getOwnPropertySymbols){var m=Object.getOwnPropertySymbols(a);for(s=0;s<m.length;s++)t=m[s],e.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(a,t)&&(n[t]=a[t])}return n}var i=s.createContext({}),l=function(a){var e=s.useContext(i),t=e;return a&&(t="function"==typeof a?a(e):r(r({},e),a)),t},o=function(a){var e=l(a.components);return s.createElement(i.Provider,{value:e},a.children)},c={inlineCode:"code",wrapper:function(a){var e=a.children;return s.createElement(s.Fragment,{},e)}},N=s.forwardRef((function(a,e){var t=a.components,n=a.mdxType,m=a.originalType,i=a.parentName,o=p(a,["components","mdxType","originalType","parentName"]),N=l(t),h=n,k=N["".concat(i,".").concat(h)]||N[h]||c[h]||m;return t?s.createElement(k,r(r({ref:e},o),{},{components:t})):s.createElement(k,r({ref:e},o))}));function h(a,e){var t=arguments,n=e&&e.mdxType;if("string"==typeof a||n){var m=t.length,r=new Array(m);r[0]=N;var p={};for(var i in e)hasOwnProperty.call(e,i)&&(p[i]=e[i]);p.originalType=a,p.mdxType="string"==typeof a?a:n,r[1]=p;for(var l=2;l<m;l++)r[l]=t[l];return s.createElement.apply(null,r)}return s.createElement.apply(null,t)}N.displayName="MDXCreateElement"},41305:function(a,e,t){t.r(e),t.d(e,{frontMatter:function(){return p},contentTitle:function(){return i},metadata:function(){return l},toc:function(){return o},default:function(){return N}});var s=t(87462),n=t(63366),m=(t(67294),t(3905)),r=["components"],p={},i="MATN",l={unversionedId:"models/matn",id:"models/matn",title:"MATN",description:"Multiplex Behavioral Relation Learning for Recommendation via Memory Augmented Transformer Network.",source:"@site/docs/models/matn.mdx",sourceDirName:"models",slug:"/models/matn",permalink:"/docs/models/matn",editUrl:"https://github.com/recohut/docs/docs/docs/models/matn.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Markov Chains",permalink:"/docs/models/markov-chains"},next:{title:"MB-GMN",permalink:"/docs/models/mb-gmn"}},o=[{value:"Multi-Behavior Tensor X",id:"multi-behavior-tensor-x",children:[],level:2},{value:"Architecture",id:"architecture",children:[],level:2},{value:"Algorithm",id:"algorithm",children:[],level:2},{value:"Performance",id:"performance",children:[],level:2}],c={toc:o};function N(a){var e=a.components,t=(0,n.Z)(a,r);return(0,m.kt)("wrapper",(0,s.Z)({},c,t,{components:e,mdxType:"MDXLayout"}),(0,m.kt)("h1",{id:"matn"},"MATN"),(0,m.kt)("blockquote",null,(0,m.kt)("p",{parentName:"blockquote"},"Multiplex Behavioral Relation Learning for Recommendation via Memory Augmented Transformer Network.")),(0,m.kt)("p",null,"Capturing users' precise preferences is of great importance in various recommender systems (eg., e-commerce platforms), which is the basis of how to present personalized interesting product lists to individual users. In spite of significant progress has been made to consider relations between users and items, most of the existing recommendation techniques solely focus on singular type of user-item interactions. However, user-item interactive behavior is often exhibited with multi-type (e.g., page view, add-to-favorite and purchase) and interdependent in nature. The overlook of multiplex behavior relations can hardly recognize the multi-modal contextual signals across different types of interactions, which limit the feasibility of current recommendation methods. To tackle the above challenge, this work proposes a Memory-Augmented Transformer Networks (MATN), to enable the recommendation with multiplex behavioral relational information, and joint modeling of type-specific behavioral context and type-wise behavior inter-dependencies, in a fully automatic manner. In MATN framework, we first develop a transformer-based multi-behavior relation encoder, to make the learned interaction representations be reflective of the cross-type behavior relations. Furthermore, a memory attention network is proposed to supercharge MATN capturing the contextual signals of different types of behavior into the category-specific latent embedding space. Finally, a cross-behavior aggregation component is introduced to promote the comprehensive collaboration across type-aware interaction behavior representations, and discriminate their inherent contributions in assisting recommendations."),(0,m.kt)("h2",{id:"multi-behavior-tensor-x"},"Multi-Behavior Tensor X"),(0,m.kt)("p",null,"In tensor ",(0,m.kt)("span",{parentName:"p",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("mi",{parentName:"mrow",mathvariant:"script"},"X")),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\mathcal{X}")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6833em"}}),(0,m.kt)("span",{parentName:"span",className:"mord mathcal",style:{marginRight:"0.14643em"}},"X"))))),", each entry ",(0,m.kt)("span",{parentName:"p",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("msub",{parentName:"mrow"},(0,m.kt)("mi",{parentName:"msub",mathvariant:"script"},"x"),(0,m.kt)("mrow",{parentName:"msub"},(0,m.kt)("mi",{parentName:"mrow"},"\ud835\udc56"),(0,m.kt)("mo",{parentName:"mrow",separator:"true"},","),(0,m.kt)("mi",{parentName:"mrow"},"\ud835\udc57"),(0,m.kt)("mo",{parentName:"mrow",separator:"true"},","),(0,m.kt)("mi",{parentName:"mrow"},"\ud835\udc59")))),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\mathcal{x}_{\ud835\udc56,\ud835\udc57,\ud835\udc59}")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.7167em",verticalAlign:"-0.2861em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"x"),(0,m.kt)("span",{parentName:"span",className:"msupsub"},(0,m.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.3361em"}},(0,m.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,m.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,m.kt)("span",{parentName:"span",className:"mord mtight"},(0,m.kt)("span",{parentName:"span",className:"mord mathnormal mtight"},"i"),(0,m.kt)("span",{parentName:"span",className:"mpunct mtight"},","),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal mtight",style:{marginRight:"0.05724em"}},"j"),(0,m.kt)("span",{parentName:"span",className:"mpunct mtight"},","),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal mtight",style:{marginRight:"0.01968em"}},"l"))))),(0,m.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.2861em"}},(0,m.kt)("span",{parentName:"span"}))))))))))," = 1 if user ",(0,m.kt)("span",{parentName:"p",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("msub",{parentName:"mrow"},(0,m.kt)("mi",{parentName:"msub"},"\ud835\udc62"),(0,m.kt)("mi",{parentName:"msub"},"\ud835\udc56"))),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\ud835\udc62_\ud835\udc56")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.5806em",verticalAlign:"-0.15em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"u"),(0,m.kt)("span",{parentName:"span",className:"msupsub"},(0,m.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.3117em"}},(0,m.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,m.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,m.kt)("span",{parentName:"span",className:"mord mathnormal mtight"},"i")))),(0,m.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.15em"}},(0,m.kt)("span",{parentName:"span"}))))))))))," is interacted with item ",(0,m.kt)("span",{parentName:"p",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("msub",{parentName:"mrow"},(0,m.kt)("mi",{parentName:"msub"},"\ud835\udc61"),(0,m.kt)("mi",{parentName:"msub"},"\ud835\udc57"))),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\ud835\udc61_\ud835\udc57")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.9012em",verticalAlign:"-0.2861em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"t"),(0,m.kt)("span",{parentName:"span",className:"msupsub"},(0,m.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.3117em"}},(0,m.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,m.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,m.kt)("span",{parentName:"span",className:"mord mathnormal mtight",style:{marginRight:"0.05724em"}},"j")))),(0,m.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.2861em"}},(0,m.kt)("span",{parentName:"span"}))))))))))," given the \ud835\udc59-th behavior type. For example, if user ",(0,m.kt)("span",{parentName:"p",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("msub",{parentName:"mrow"},(0,m.kt)("mi",{parentName:"msub"},"\ud835\udc62"),(0,m.kt)("mi",{parentName:"msub"},"\ud835\udc56"))),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\ud835\udc62_\ud835\udc56")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.5806em",verticalAlign:"-0.15em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"u"),(0,m.kt)("span",{parentName:"span",className:"msupsub"},(0,m.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.3117em"}},(0,m.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,m.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,m.kt)("span",{parentName:"span",className:"mord mathnormal mtight"},"i")))),(0,m.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.15em"}},(0,m.kt)("span",{parentName:"span"}))))))))))," purchases item ",(0,m.kt)("span",{parentName:"p",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("msub",{parentName:"mrow"},(0,m.kt)("mi",{parentName:"msub"},"\ud835\udc61"),(0,m.kt)("mi",{parentName:"msub"},"\ud835\udc57"))),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\ud835\udc61_\ud835\udc57")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.9012em",verticalAlign:"-0.2861em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"t"),(0,m.kt)("span",{parentName:"span",className:"msupsub"},(0,m.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.3117em"}},(0,m.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,m.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,m.kt)("span",{parentName:"span",className:"mord mathnormal mtight",style:{marginRight:"0.05724em"}},"j")))),(0,m.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.2861em"}},(0,m.kt)("span",{parentName:"span"}))))))))))," , the corresponding element ",(0,m.kt)("span",{parentName:"p",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("msub",{parentName:"mrow"},(0,m.kt)("mi",{parentName:"msub",mathvariant:"script"},"x"),(0,m.kt)("mrow",{parentName:"msub"},(0,m.kt)("mi",{parentName:"mrow"},"\ud835\udc56"),(0,m.kt)("mo",{parentName:"mrow",separator:"true"},","),(0,m.kt)("mi",{parentName:"mrow"},"\ud835\udc57"),(0,m.kt)("mo",{parentName:"mrow",separator:"true"},","),(0,m.kt)("mi",{parentName:"mrow"},"\ud835\udc59")))),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\mathcal{x}_{\ud835\udc56,\ud835\udc57,\ud835\udc59}")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.7167em",verticalAlign:"-0.2861em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"x"),(0,m.kt)("span",{parentName:"span",className:"msupsub"},(0,m.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.3361em"}},(0,m.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,m.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,m.kt)("span",{parentName:"span",className:"mord mtight"},(0,m.kt)("span",{parentName:"span",className:"mord mathnormal mtight"},"i"),(0,m.kt)("span",{parentName:"span",className:"mpunct mtight"},","),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal mtight",style:{marginRight:"0.05724em"}},"j"),(0,m.kt)("span",{parentName:"span",className:"mpunct mtight"},","),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal mtight",style:{marginRight:"0.01968em"}},"l"))))),(0,m.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.2861em"}},(0,m.kt)("span",{parentName:"span"}))))))))))," will be set as 1 in the purchase behavior matrix ",(0,m.kt)("span",{parentName:"p",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("msub",{parentName:"mrow"},(0,m.kt)("mi",{parentName:"msub",mathvariant:"script"},"X"),(0,m.kt)("mi",{parentName:"msub"},"l"))),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\mathcal{X}_l")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.8333em",verticalAlign:"-0.15em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord mathcal",style:{marginRight:"0.14643em"}},"X"),(0,m.kt)("span",{parentName:"span",className:"msupsub"},(0,m.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.3361em"}},(0,m.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"-0.1464em",marginRight:"0.05em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,m.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,m.kt)("span",{parentName:"span",className:"mord mathnormal mtight",style:{marginRight:"0.01968em"}},"l")))),(0,m.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.15em"}},(0,m.kt)("span",{parentName:"span"})))))))))),"."),(0,m.kt)("h2",{id:"architecture"},"Architecture"),(0,m.kt)("figure",null,(0,m.kt)("p",null,(0,m.kt)("center",null,(0,m.kt)("img",{src:"https://github.com/recohut/transformer-rec/raw/132decd8b7004cd43163b71d70a501bc150fd5f2/docs/_images/C879945_1.png"}),(0,m.kt)("figcaption",null,"The model architecture of the proposed MATN framework.")))),(0,m.kt)("h2",{id:"algorithm"},"Algorithm"),(0,m.kt)("p",null,(0,m.kt)("center",null,(0,m.kt)("img",{src:"https://github.com/recohut/transformer-rec/raw/132decd8b7004cd43163b71d70a501bc150fd5f2/docs/_images/C879945_2.png"}))),(0,m.kt)("h2",{id:"performance"},"Performance"),(0,m.kt)("p",null,(0,m.kt)("center",null,(0,m.kt)("img",{src:"https://github.com/recohut/transformer-rec/raw/132decd8b7004cd43163b71d70a501bc150fd5f2/docs/_images/C879945_3.png"}))))}N.isMDXComponent=!0}}]);
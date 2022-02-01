"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5874],{3905:function(e,t,r){r.d(t,{Zo:function(){return m},kt:function(){return u}});var n=r(7294);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,i=function(e,t){if(null==e)return{};var r,n,i={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(i[r]=e[r]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(i[r]=e[r])}return i}var s=n.createContext({}),p=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},m=function(e){var t=p(e.components);return n.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},d=n.forwardRef((function(e,t){var r=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,m=l(e,["components","mdxType","originalType","parentName"]),d=p(r),u=i,h=d["".concat(s,".").concat(u)]||d[u]||c[u]||a;return r?n.createElement(h,o(o({ref:t},m),{},{components:r})):n.createElement(h,o({ref:t},m))}));function u(e,t){var r=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=r.length,o=new Array(a);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var p=2;p<a;p++)o[p]=r[p];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}d.displayName="MDXCreateElement"},9894:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return p},toc:function(){return m},default:function(){return d}});var n=r(7462),i=r(3366),a=(r(7294),r(3905)),o=["components"],l={},s="LightFM WARP",p={unversionedId:"models/lightfm-warp",id:"models/lightfm-warp",title:"LightFM WARP",description:"LightFM is probably the only recommender package implementing the WARP (Weighted Approximate-Rank Pairwise) loss for implicit feedback learning-to-rank. Generally, it performs better than the more popular BPR (Bayesian Personalised Ranking) loss --- often by a large margin.",source:"@site/docs/models/lightfm-warp.md",sourceDirName:"models",slug:"/models/lightfm-warp",permalink:"/docs/models/lightfm-warp",editUrl:"https://github.com/recohut/docs/docs/docs/models/lightfm-warp.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"LESSR",permalink:"/docs/models/lessr"},next:{title:"LightGCN",permalink:"/docs/models/lightgcn"}},m=[],c={toc:m};function d(e){var t=e.components,r=(0,i.Z)(e,o);return(0,a.kt)("wrapper",(0,n.Z)({},c,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"lightfm-warp"},"LightFM WARP"),(0,a.kt)("p",null,"LightFM is probably the only recommender package implementing the WARP (Weighted Approximate-Rank Pairwise) loss for implicit feedback learning-to-rank. Generally, it performs better than the more popular BPR (Bayesian Personalised Ranking) loss --- often by a large margin."),(0,a.kt)("p",null,"It was originally applied to image annotations in the Weston et al.\xa0",(0,a.kt)("a",{parentName:"p",href:"http://www.thespermwhale.com/jaseweston/papers/wsabie-ijcai.pdf"},"WSABIE paper"),", but has been extended to apply to recommendation settings in the\xa0",(0,a.kt)("a",{parentName:"p",href:"http://www.ee.columbia.edu/~ronw/pubs/recsys2013-kaos.pdf"},"2013 k-order statistic loss paper"),"\xa0in the form of the k-OS WARP loss, also implemented in LightFM."),(0,a.kt)("p",null,"Like the BPR model, WARP deals with (user, positive item, negative item) triplets. Unlike BPR, the negative items in the triplet are not chosen by random sampling: they are chosen from among those negative items which would violate the desired item ranking given the state of the model. This approximates a form of active learning where the model selects those triplets that it cannot currently rank correctly."),(0,a.kt)("p",null,"This procedure yields roughly the following algorithm:"),(0,a.kt)("ol",null,(0,a.kt)("li",{parentName:"ol"},"For a given (user, positive item pair), sample a negative item at random from all the remaining items. Compute predictions for both items; if the negative item's prediction exceeds that of the positive item plus a margin, perform a gradient update to rank the positive item higher and the negative item lower. If there is no rank violation, continue sampling negative items until a violation is found."),(0,a.kt)("li",{parentName:"ol"},"If you found a violating negative example at the first try, make a large gradient update: this indicates that a lot of negative items are ranked higher than positives items given the current state of the model, and the model must be updated by a large amount. If it took a lot of sampling to find a violating example, perform a small update: the model is likely close to the optimum and should be updated at a low rate.")),(0,a.kt)("p",null,"While this is fairly hand-wavy, it should give the correct intuition. For more details, read the paper itself or a more in-depth blog post\xa0",(0,a.kt)("a",{parentName:"p",href:"https://building-babylon.net/2016/03/18/warp-loss-for-implicit-feedback-recommendation/"},"here"),". A similar approach for BPR is described in Rendle's 2014\xa0",(0,a.kt)("a",{parentName:"p",href:"http://webia.lip6.fr/~gallinar/gallinari/uploads/Teaching/WSDM2014-rendle.pdf"},"WSDM 2014 paper"),"."))}d.isMDXComponent=!0}}]);
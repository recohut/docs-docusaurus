"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4446],{3905:function(e,n,t){t.d(n,{Zo:function(){return d},kt:function(){return u}});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=r.createContext({}),s=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},d=function(e){var n=s(e.components);return r.createElement(c.Provider,{value:n},e.children)},p={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},m=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),m=s(t),u=i,h=m["".concat(c,".").concat(u)]||m[u]||p[u]||o;return t?r.createElement(h,a(a({ref:n},d),{},{components:t})):r.createElement(h,a({ref:n},d))}));function u(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var o=t.length,a=new Array(o);a[0]=m;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l.mdxType="string"==typeof e?e:i,a[1]=l;for(var s=2;s<o;s++)a[s]=t[s];return r.createElement.apply(null,a)}return r.createElement.apply(null,t)}m.displayName="MDXCreateElement"},6226:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return d},default:function(){return m}});var r=t(7462),i=t(3366),o=(t(7294),t(3905)),a=["components"],l={},c="DQN",s={unversionedId:"models/dqn",id:"models/dqn",title:"DQN",description:"The\xa0Q-learning component of DQN was invented in 1989 by Christopher Watkins in his PhD thesis titled \u201cLearning from Delayed Rewards\u201d. Experience replay quickly followed, invented by Long-Ji Lin in 1992. This played a major role in improving the efficiency of\xa0Q-learning. In the years that followed, however, there were no major success stories involving deep\xa0Q-learning. This is perhaps not surprising given the combination of limited computational power in the 1990s and early 2000s, data-hungry deep learning architectures, and the sparse, noisy, and delayed feedback signals experienced in RL. Progress had to wait for the emergence of general-purpose GPU programming, for example with the launch of CUDA in 2006, and the reignition of interest in deep learning within the machine learning community that began in the mid-2000s and rapidly accelerated after 2012.",source:"@site/docs/models/dqn.md",sourceDirName:"models",slug:"/models/dqn",permalink:"/docs/models/dqn",editUrl:"https://github.com/recohut/docs/docs/docs/models/dqn.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"DGTN",permalink:"/docs/models/dgtn"},next:{title:"DRQN",permalink:"/docs/models/drqn"}},d=[{value:"Architecture",id:"architecture",children:[],level:2},{value:"Algorithm",id:"algorithm",children:[],level:2}],p={toc:d};function m(e){var n=e.components,l=(0,i.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},p,l,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"dqn"},"DQN"),(0,o.kt)("p",null,"The\xa0",(0,o.kt)("em",{parentName:"p"},"Q"),"-learning component of DQN was invented in 1989 by Christopher Watkins in his PhD thesis titled \u201cLearning from Delayed Rewards\u201d. Experience replay quickly followed, invented by Long-Ji Lin in 1992. This played a major role in improving the efficiency of\xa0",(0,o.kt)("em",{parentName:"p"},"Q"),"-learning. In the years that followed, however, there were no major success stories involving deep\xa0",(0,o.kt)("em",{parentName:"p"},"Q"),"-learning. This is perhaps not surprising given the combination of limited computational power in the 1990s and early 2000s, data-hungry deep learning architectures, and the sparse, noisy, and delayed feedback signals experienced in RL. Progress had to wait for the emergence of general-purpose GPU programming, for example with the launch of CUDA in 2006, and the reignition of interest in deep learning within the machine learning community that began in the mid-2000s and rapidly accelerated after 2012."),(0,o.kt)("p",null,"2013 saw a major breakthrough with the paper from DeepMind, \u201cPlaying Atari with Deep Reinforcement Learning\u201d. The authors coined the term DQN or \u201cDeep Q-Networks\u201d and demonstrated the first example of learning a control policy directly from high-dimensional image data using RL. Improvements quickly followed; Double DQN and Prioritized Experience Replay were both developed in 2015. However, the fundamental breakthrough was the algorithm presented in this chapter combined with a simple convolutional neural network, state processing, and GPU training."),(0,o.kt)("h2",{id:"architecture"},"Architecture"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Untitled",src:t(4322).Z})),(0,o.kt)("h2",{id:"algorithm"},"Algorithm"),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"/img/content-models-raw-mp2-dqn-untitled-1.png",src:t(3593).Z})))}m.isMDXComponent=!0},3593:function(e,n,t){n.Z=t.p+"assets/images/content-models-raw-mp2-dqn-untitled-1-1a23e009d87cdfba778216d162582602.png"},4322:function(e,n,t){n.Z=t.p+"assets/images/content-models-raw-mp2-dqn-untitled-8f04a4040208e1844842e8268630c795.png"}}]);
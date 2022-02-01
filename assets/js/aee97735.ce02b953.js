"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6431],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),f=l(n),m=o,d=f["".concat(c,".").concat(m)]||f[m]||p[m]||i;return n?r.createElement(d,a(a({ref:t},u),{},{components:n})):r.createElement(d,a({ref:t},u))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=f;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var l=2;l<i;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},5539:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return u},default:function(){return f}});var r=n(7462),o=n(3366),i=(n(7294),n(3905)),a=["components"],s={},c="SAC",l={unversionedId:"models/sac",id:"models/sac",title:"SAC",description:"SAS stands for Soft Actor-Critic. It not only boasts of being more sample efficient than traditional RL algorithms but also promises to be robust to brittleness in convergence.",source:"@site/docs/models/sac.md",sourceDirName:"models",slug:"/models/sac",permalink:"/docs/models/sac",editUrl:"https://github.com/recohut/docs/docs/docs/models/sac.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Q-learning",permalink:"/docs/models/q-learning"},next:{title:"SARSA",permalink:"/docs/models/sarsa"}},u=[],p={toc:u};function f(e){var t=e.components,n=(0,o.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"sac"},"SAC"),(0,i.kt)("p",null,"SAS stands for Soft Actor-Critic. It not only boasts of being more sample efficient than traditional RL algorithms but also promises to be robust to brittleness in convergence."),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://youtu.be/FmMPHL3TcrE"},"https://youtu.be/FmMPHL3TcrE")),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://youtu.be/KOObeIjzXTY"},"https://youtu.be/KOObeIjzXTY")),(0,i.kt)("p",null,"Not only does the Minotaur Robot learn in a really short time duration but it also learns to generalize to conditions that it hasn\u2019t seen during training! SAC thus brings us ever so close to using Reinforcement Learning in non-simulation environments for applications in robotics and other domains."))}f.isMDXComponent=!0}}]);
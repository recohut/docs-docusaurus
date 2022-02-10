"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[9525],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return u}});var r=n(67294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=l(n),u=a,f=d["".concat(c,".").concat(u)]||d[u]||m[u]||o;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},44761:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return p},default:function(){return d}});var r=n(87462),a=n(63366),o=(n(67294),n(3905)),i=["components"],s={},c="Meta Learning",l={unversionedId:"concept-extras/meta-learning",id:"concept-extras/meta-learning",title:"Meta Learning",description:"Meta learning covers a wide range of topics and has contributed to a booming study trend. Few-shot learning is one of successful branches of meta learning. We retrospect some representative meta-learning models with strong connections to our work.",source:"@site/docs/concept-extras/meta-learning.mdx",sourceDirName:"concept-extras",slug:"/concept-extras/meta-learning",permalink:"/docs/concept-extras/meta-learning",editUrl:"https://github.com/recohut/docs/docs/docs/concept-extras/meta-learning.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Jensen\u2013Shannon divergence",permalink:"/docs/concept-extras/jensen-shannon-divergence"},next:{title:"MLOps",permalink:"/docs/concept-extras/mlops"}},p=[],m={toc:p};function d(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"meta-learning"},"Meta Learning"),(0,o.kt)("p",null,"Meta learning covers a wide range of topics and has contributed to a booming study trend. Few-shot learning is one of successful branches of meta learning. We retrospect some representative meta-learning models with strong connections to our work."),(0,o.kt)("p",null,"They can be divided into the following common types."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Memory-based approaches: combining deep neural networks (DNNs) with the memory mechanism to enhance the capability of storing and querying meta-knowledge."),(0,o.kt)("li",{parentName:"ol"},"Optimization-based approaches: a meta-learner, e.g. recurrent neural networks (RNNs) is trained to optimize target models."),(0,o.kt)("li",{parentName:"ol"},"Metric-based approaches: learning an effective similarity metric between new examples and other examples in the training set."),(0,o.kt)("li",{parentName:"ol"},"Gradient-based approaches: learning an shared initialization where the model parameters can be trained via a few gradient updates on new tasks. Most meta-learning models follow an episodic learning manner. Among them, MAML is one of the most popular frameworks, which falls into the fourth type. Some MAML-based works consider that the sequence of tasks may originate from different task distributions, and try various task-specific adaptations to improve model capability.")),(0,o.kt)("p",null,"It is also named learning to learn, aiming to improve novel tasks\u2019 performance by training on similar tasks. There are various meta learning methods, e.g., metric-based methods, gradient-based methods, and parameter-generating based methods."),(0,o.kt)("p",null,"This line of research aims to learn a model which can adapt and generalize to new tasks and new environments with a few training samples. To achieve the goal of \u201clearning-to-learn\u201d, there are three types of different approaches. Metric-based methods are based on a similar idea to the nearest neighbors algorithm with a well-designed metric or distance function, prototypical networks or Siamese Neural Network. Model-based methods usually perform a rapid parameter update with an internal architecture or are controlled by another meta-learner model. As for the optimization-based approaches, by adjusting the optimization algorithm, the models can be efficiently updated with a few examples."))}d.isMDXComponent=!0}}]);
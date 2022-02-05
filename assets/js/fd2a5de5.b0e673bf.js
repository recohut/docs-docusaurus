"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7451],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var o=n(67294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,i=function(e,t){if(null==e)return{};var n,o,i={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=o.createContext({}),s=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=s(e.components);return o.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=s(n),m=i,g=u["".concat(l,".").concat(m)]||u[m]||d[m]||r;return n?o.createElement(g,a(a({ref:t},p),{},{components:n})):o.createElement(g,a({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,a=new Array(r);a[0]=u;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:i,a[1]=c;for(var s=2;s<r;s++)a[s]=n[s];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},22746:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return p},default:function(){return u}});var o=n(87462),i=n(63366),r=(n(67294),n(3905)),a=["components"],c={},l="Video Action Recognition",s={unversionedId:"concept-extras/vision/video-action-recognition",id:"concept-extras/vision/video-action-recognition",title:"Video Action Recognition",description:"/img/content-concepts-raw-computer-vision-video-action-recognition-img.png",source:"@site/docs/concept-extras/vision/video-action-recognition.mdx",sourceDirName:"concept-extras/vision",slug:"/concept-extras/vision/video-action-recognition",permalink:"/docs/concept-extras/vision/video-action-recognition",editUrl:"https://github.com/recohut/docs/docs/docs/concept-extras/vision/video-action-recognition.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Scene Text Recognition",permalink:"/docs/concept-extras/vision/scene-text-recognition"},next:{title:"Models",permalink:"/docs/models/"}},p=[{value:"<strong>Introduction</strong>",id:"introduction",children:[],level:2},{value:"<strong>Models</strong>",id:"models",children:[{value:"3D-ResNet",id:"3d-resnet",children:[],level:3},{value:"R(2+1)D",id:"r21d",children:[],level:3}],level:2},{value:"Process flow",id:"process-flow",children:[],level:2},{value:"Use Cases",id:"use-cases",children:[{value:"Kinetics 3D CNN Human Activity Recognition",id:"kinetics-3d-cnn-human-activity-recognition",children:[],level:3},{value:"Action Recognition using R(2+1)D Model",id:"action-recognition-using-r21d-model",children:[],level:3}],level:2}],d={toc:p};function u(e){var t=e.components,c=(0,i.Z)(e,a);return(0,r.kt)("wrapper",(0,o.Z)({},d,c,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"video-action-recognition"},"Video Action Recognition"),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"/img/content-concepts-raw-computer-vision-video-action-recognition-img.png",src:n(94725).Z})),(0,r.kt)("h2",{id:"introduction"},(0,r.kt)("strong",{parentName:"h2"},"Introduction")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Definition:")," This is the task of identifying human activities/actions (e.g. eating, playing) in videos. In other words, this task classifies segments of videos into a set of pre-defined categories."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Applications:")," Automated surveillance, elderly behavior monitoring, human-computer interaction, content-based video retrieval, and video summarization."),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Scope:")," Human Action only"),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("strong",{parentName:"li"},"Tools:")," OpenCV")),(0,r.kt)("h2",{id:"models"},(0,r.kt)("strong",{parentName:"h2"},"Models")),(0,r.kt)("h3",{id:"3d-resnet"},"3D-ResNet"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},(0,r.kt)("em",{parentName:"strong"},(0,r.kt)("a",{parentName:"em",href:"https://arxiv.org/abs/1711.09577"},"Can Spatiotemporal 3D CNNs Retrace the History of 2D CNNs and ImageNet?")))),(0,r.kt)("p",null,"the authors explore how existing state-of-the-art 2D architectures (such as ResNet, ResNeXt, DenseNet, etc.) can be extended to video classification via 3D kernels."),(0,r.kt)("h3",{id:"r21d"},"R(2+1)D"),(0,r.kt)("p",null,"This model was pre-trained on 65 million social media videos and fine-tuned on Kinetics400. "),(0,r.kt)("h2",{id:"process-flow"},"Process flow"),(0,r.kt)("p",null,"Step 1: Collect videos"),(0,r.kt)("p",null,"Capture via camera, scrap from the internet or use public datasets"),(0,r.kt)("p",null,"Step 2: Create Labels"),(0,r.kt)("p",null,"Use open-source tools like VGA Video Annotator for video annotation"),(0,r.kt)("p",null,"Step 3: Data Acquisition"),(0,r.kt)("p",null,"Setup the database connection and fetch the data into python environment"),(0,r.kt)("p",null,"Step 4: Data Exploration"),(0,r.kt)("p",null,"Explore the data, validate it and create preprocessing strategy"),(0,r.kt)("p",null,"Step 5: Data Preparation"),(0,r.kt)("p",null,"Clean the data and make it ready for modeling"),(0,r.kt)("p",null,"Step 6: Model Building"),(0,r.kt)("p",null,"Create the model architecture in python and perform a sanity check"),(0,r.kt)("p",null,"Step 7: Model Training"),(0,r.kt)("p",null,"Start the training process and track the progress and experiments"),(0,r.kt)("p",null,"Step 8: Model Validation"),(0,r.kt)("p",null,"Validate the final set of models and select/assemble the final model"),(0,r.kt)("p",null,"Step 9: UAT Testing"),(0,r.kt)("p",null,"Wrap the model inference engine in API for client testing"),(0,r.kt)("p",null,"Step 10: Deployment"),(0,r.kt)("p",null,"Deploy the model on cloud or edge as per the requirement"),(0,r.kt)("p",null,"Step 11: Documentation"),(0,r.kt)("p",null,"Prepare the documentation and transfer all assets to the client  "),(0,r.kt)("h2",{id:"use-cases"},"Use Cases"),(0,r.kt)("h3",{id:"kinetics-3d-cnn-human-activity-recognition"},"Kinetics 3D CNN Human Activity Recognition"),(0,r.kt)("p",null,"This dataset consists of 400 human activity recognition classes, at least 400 video clips per class\xa0(downloaded via YouTube) and a total of 300,000 videos. Check out ",(0,r.kt)("a",{parentName:"p",href:"https://www.notion.so/Kinetics-3D-CNN-Human-Activity-Recognition-fd10fd7b5858459cba65dc4a6cb73630"},"this")," notion."),(0,r.kt)("h3",{id:"action-recognition-using-r21d-model"},"Action Recognition using R(2+1)D Model"),(0,r.kt)("p",null,"VGA Annotator was used for creating the video annotation for training. Check out ",(0,r.kt)("a",{parentName:"p",href:"https://www.notion.so/Action-Recognition-using-R-2-1-D-Model-4c796f308aed40f29fc230a757af98e8"},"this")," notion."))}u.isMDXComponent=!0},94725:function(e,t,n){t.Z=n.p+"assets/images/content-concepts-raw-computer-vision-video-action-recognition-img-1c1d0fc0b9089f8aa642144bea8bab0a.png"}}]);
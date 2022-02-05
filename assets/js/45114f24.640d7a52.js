"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7926],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return k}});var i=n(67294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,i)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,i,r=function(e,t){if(null==e)return{};var n,i,r={},a=Object.keys(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(i=0;i<a.length;i++)n=a[i],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=i.createContext({}),s=function(e){var t=i.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return i.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return i.createElement(i.Fragment,{},t)}},d=i.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),d=s(n),k=r,m=d["".concat(l,".").concat(k)]||d[k]||u[k]||a;return n?i.createElement(m,o(o({ref:t},p),{},{components:n})):i.createElement(m,o({ref:t},p))}));function k(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,o=new Array(a);o[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var s=2;s<a;s++)o[s]=n[s];return i.createElement.apply(null,o)}return i.createElement.apply(null,n)}d.displayName="MDXCreateElement"},46814:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return p},default:function(){return d}});var i=n(87462),r=n(63366),a=(n(67294),n(3905)),o=["components"],c={},l="Object Tracking",s={unversionedId:"concept-extras/vision/object-tracking",id:"concept-extras/vision/object-tracking",title:"Object Tracking",description:"/img/content-concepts-raw-computer-vision-object-tracking-img.png",source:"@site/docs/concept-extras/vision/object-tracking.mdx",sourceDirName:"concept-extras/vision",slug:"/concept-extras/vision/object-tracking",permalink:"/docs/concept-extras/vision/object-tracking",editUrl:"https://github.com/recohut/docs/docs/docs/concept-extras/vision/object-tracking.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Object Detection",permalink:"/docs/concept-extras/vision/object-detection"},next:{title:"Pose Estimation",permalink:"/docs/concept-extras/vision/pose-estimation"}},p=[{value:"Introduction",id:"introduction",children:[],level:2},{value:"Models",id:"models",children:[{value:"FairMOT",id:"fairmot",children:[],level:3},{value:"DeepSORT",id:"deepsort",children:[],level:3},{value:"GOTURN",id:"goturn",children:[],level:3},{value:"MDNet",id:"mdnet",children:[],level:3},{value:"ROLO",id:"rolo",children:[],level:3}],level:2},{value:"Process flow",id:"process-flow",children:[],level:2},{value:"Use Cases",id:"use-cases",children:[{value:"Pedestrian Tracking",id:"pedestrian-tracking",children:[],level:3},{value:"Object Tracking",id:"object-tracking-1",children:[],level:3},{value:"Object Tracking",id:"object-tracking-2",children:[],level:3},{value:"Social Distancing Violation Detection",id:"social-distancing-violation-detection",children:[],level:3},{value:"People and Vehicle Counter Detection",id:"people-and-vehicle-counter-detection",children:[],level:3}],level:2}],u={toc:p};function d(e){var t=e.components,c=(0,r.Z)(e,o);return(0,a.kt)("wrapper",(0,i.Z)({},u,c,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"object-tracking"},"Object Tracking"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"/img/content-concepts-raw-computer-vision-object-tracking-img.png",src:n(95345).Z})),(0,a.kt)("h2",{id:"introduction"},"Introduction"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Definition: Object tracking is the process of 1)")," Taking an initial set of object detections (such as an input set of bounding box coordinates, 2) Creating a unique ID for each of the initial detections, and then 3) tracking each of the objects as they move around frames in a video, maintaining the assignment of unique IDs."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Applications:")," In-store consumer behavior tracking, Apply security policies like crowd management, traffic management, vision-based control, human-computer interface, medical imaging, augmented reality, robotics."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Scope:")," Track objects in images and videos, 2-dimensional tracking, Bounding boxes and pixel masks, Single and Multiple Object Tracking"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Tools:")," Detectron2, OpenCV")),(0,a.kt)("h2",{id:"models"},"Models"),(0,a.kt)("h3",{id:"fairmot"},"FairMOT"),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},(0,a.kt)("a",{parentName:"em",href:"https://arxiv.org/abs/2004.01888"},"On the Fairness of Detection and Re-Identification in Multiple Object Tracking. arXiv, 2020."))),(0,a.kt)("h3",{id:"deepsort"},"DeepSORT"),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},(0,a.kt)("a",{parentName:"em",href:"https://arxiv.org/abs/1703.07402"},"Simple Online and Realtime Tracking with a Deep Association Metric. arXiv, 2017."))),(0,a.kt)("p",null,"Detect object with models like YOLO or Mask R-CNN and then track using DeepSORT."),(0,a.kt)("h3",{id:"goturn"},"GOTURN"),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},(0,a.kt)("a",{parentName:"em",href:"https://arxiv.org/abs/1604.01802"},"Learning to Track at 100 FPS with Deep Regression Networks. arXiv, 2016."))),(0,a.kt)("p",null,"CNN offline learning tracker."),(0,a.kt)("h3",{id:"mdnet"},"MDNet"),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},(0,a.kt)("a",{parentName:"em",href:"https://arxiv.org/abs/1808.08834"},"Real-Time MDNet. arXiv, 2018."))),(0,a.kt)("p",null,"CNN online learning tracker."),(0,a.kt)("h3",{id:"rolo"},"ROLO"),(0,a.kt)("p",null,(0,a.kt)("em",{parentName:"p"},(0,a.kt)("a",{parentName:"em",href:"https://arxiv.org/abs/1607.05781"},"Spatially Supervised Recurrent Convolutional Neural Networks for Visual Object Tracking. arXiv, 2016."))),(0,a.kt)("p",null,"CNN + LSTM tracker."),(0,a.kt)("h2",{id:"process-flow"},"Process flow"),(0,a.kt)("p",null,"Step 1: Collect the data"),(0,a.kt)("p",null,"Capture via camera, scrap from the internet or use public datasets"),(0,a.kt)("p",null,"Step 2: Train Object Detection Model"),(0,a.kt)("p",null,"Train an object detector model (or use existing one if available in open-source domain)"),(0,a.kt)("p",null,"Step 3: Annotate the data"),(0,a.kt)("p",null,"Apply object detector on the images to create a training set for object tracking"),(0,a.kt)("p",null,"Step 4: Data Preparation"),(0,a.kt)("p",null,"Clean the data and make it ready for modeling"),(0,a.kt)("p",null,"Step 5: Train the Tracker"),(0,a.kt)("p",null,"Build and train an object tracking model (e.g. DeepSORT, FairMOT) to accurately track the target object in images/videos. Track the progress and experiments"),(0,a.kt)("p",null,"Step 6: Model Validation"),(0,a.kt)("p",null,"Validate the final set of models and select/assemble the final model"),(0,a.kt)("p",null,"Step 7: UAT Testing"),(0,a.kt)("p",null,"Wrap the model inference engine in API for client testing"),(0,a.kt)("p",null,"Step 8: Deployment"),(0,a.kt)("p",null,"Deploy the model on cloud or edge as per the requirement"),(0,a.kt)("p",null,"Step 9: Documentation"),(0,a.kt)("p",null,"Prepare the documentation and transfer all assets to the client  "),(0,a.kt)("h2",{id:"use-cases"},"Use Cases"),(0,a.kt)("h3",{id:"pedestrian-tracking"},"Pedestrian Tracking"),(0,a.kt)("p",null,"Pedestrian Tracking with YOLOv3 and DeepSORT. Check out ",(0,a.kt)("a",{parentName:"p",href:"https://www.notion.so/Pedestrian-Tracking-with-YOLOv3-and-DeepSORT-a38ea37a2abf4755aacc691bd6b859a1"},"this")," notion."),(0,a.kt)("h3",{id:"object-tracking-1"},"Object Tracking"),(0,a.kt)("p",null,"Object tracking with FRCNN and SORT. Check out ",(0,a.kt)("a",{parentName:"p",href:"https://www.notion.so/Object-tracking-with-FRCNN-and-SORT-e555d6174d2e4c1e993526c89555f96b"},"this")," notion."),(0,a.kt)("h3",{id:"object-tracking-2"},"Object Tracking"),(0,a.kt)("p",null,"Tested out 5 algorithms on videos - OpticalFlow, DenseFlow, Camshift, MeanShift and Single Object Tracking with OpenCV. Check out ",(0,a.kt)("a",{parentName:"p",href:"https://www.notion.so/Object-Tracking-with-OpenCV-and-Python-2bf91e9f6f49405ca40409c392a2d429"},"this")," notion."),(0,a.kt)("h3",{id:"social-distancing-violation-detection"},"Social Distancing Violation Detection"),(0,a.kt)("h3",{id:"people-and-vehicle-counter-detection"},"People and Vehicle Counter Detection"))}d.isMDXComponent=!0},95345:function(e,t,n){t.Z=n.p+"assets/images/content-concepts-raw-computer-vision-object-tracking-img-546d364c1e15e0249a9ca0b634c140d0.png"}}]);
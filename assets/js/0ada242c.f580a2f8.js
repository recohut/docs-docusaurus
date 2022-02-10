"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6678],{3905:function(e,t,r){r.d(t,{Zo:function(){return m},kt:function(){return p}});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=n.createContext({}),d=function(e){var t=n.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},m=function(e){var t=d(e.components);return n.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,m=s(e,["components","mdxType","originalType","parentName"]),u=d(r),p=a,h=u["".concat(l,".").concat(p)]||u[p]||c[p]||o;return r?n.createElement(h,i(i({ref:t},m),{},{components:r})):n.createElement(h,i({ref:t},m))}));function p(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=r.length,i=new Array(o);i[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var d=2;d<o;d++)i[d]=r[d];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},18900:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return d},assets:function(){return m},toc:function(){return c},default:function(){return p}});var n=r(87462),a=r(63366),o=(r(67294),r(3905)),i=["components"],s={title:"Distributed Training of Recommender Systems",authors:"sparsh",tags:["distributed","recsys"]},l=void 0,d={permalink:"/blog/2021/10/01/distributed-training-of-recommender-systems",editUrl:"https://github.com/recohut/docs/blog/blog/2021-10-01-distributed-training-of-recommender-systems.mdx",source:"@site/blog/2021-10-01-distributed-training-of-recommender-systems.mdx",title:"Distributed Training of Recommender Systems",description:"The usage and importance of recommender systems are increasing at a fast pace. And deep learning is gaining traction as the preferred choice for model architecture. Giants like Google and Facebook are already using recommenders to earn billions of dollars.",date:"2021-10-01T00:00:00.000Z",formattedDate:"October 1, 2021",tags:[{label:"distributed",permalink:"/blog/tags/distributed"},{label:"recsys",permalink:"/blog/tags/recsys"}],readingTime:5.85,truncated:!1,authors:[{name:"Sparsh Agarwal",title:"Principal Developer",url:"https://github.com/sparsh-ai",imageURL:"https://avatars.githubusercontent.com/u/62965911?v=4",key:"sparsh"}],prevItem:{title:"Detectron 2",permalink:"/blog/2021/10/01/detectron-2"},nextItem:{title:"Document Recommendation",permalink:"/blog/2021/10/01/document-recommendation"}},m={authorsImageUrls:[void 0]},c=[{value:"Parameter Server Framework",id:"parameter-server-framework",children:[],level:3},{value:"PERSIA",id:"persia",children:[],level:3}],u={toc:c};function p(e){var t=e.components,s=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,n.Z)({},u,s,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"The usage and importance of recommender systems are increasing at a fast pace. And deep learning is gaining traction as the preferred choice for model architecture. Giants like Google and Facebook are already using recommenders to earn billions of dollars."),(0,o.kt)("p",null,"Recently, Facebook shared its approach to maintain its 12 trillion parameter recommender. Building these large systems is challenging because it requires huge computation and memory resources. And we will soon enter into 100 trillion range. And SMEs will not be left behind due to open-source environment of software architectures and the decreasing cost of hardware, especially on the cloud infrastructure."),(0,o.kt)("p",null,"As per one estimate, a model with 100 trillion parameters would require at least 200TB just to store the model, even at 16-bit floating-point accuracy. So we need architectures that can support efficient and distributed training of recommendation models."),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},(0,o.kt)("em",{parentName:"strong"},"Memory-intensive vs Computation-intensive")),": The increasing parameter comes mostly from the embedding layer which maps each entrance of an ID type feature (such as an user ID and a session ID) into a fixed length low-dimensional embedding vector. Consider the billion scale of entrances for the ID type features in a production recommender system and the wide utilization of feature crosses, the embedding layer usually domains the parameter space, which makes this component extremely ",(0,o.kt)("strong",{parentName:"p"},"memory-intensive"),". On the other hand, these low-dimensional embedding vectors are concatenated with diversified Non-ID type features (e.g., image, audio, video, social network, etc.) to feed a group of increasingly sophisticated neural networks (e.g., convolution, LSTM, multi-head attention) for prediction(s). Furthermore, in practice, multiple objectives can also be combined and optimized simultaneously for multiple tasks. These mechanisms make the rest neural network increasingly ",(0,o.kt)("strong",{parentName:"p"},"computation-intensive"),"."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"An example of a recommender models with 100+ trillions of parameter in the embedding layer and 50+ TFLOP computation in the neural network.",src:r(60987).Z})),(0,o.kt)("p",null,"An example of a recommender models with 100+ trillions of parameter in the embedding layer and 50+ TFLOP computation in the neural network."),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://github.com/alibaba/x-deeplearning"},"Alibaba's XDL"),", ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/PaddlePaddle/PaddleRec"},"Baidu's PaddleRec"),", and ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/persiaml/persia"},"Kwai's Persia")," are some open-source frameworks for this large-scale distributed training of recommender systems."),(0,o.kt)("aside",null,"\ud83d\udccc ***Synchronous vs Asynchronous Algorithms***: Synchronous algorithms always use the up-to-date gradient to update the model to ensure the model accuracy. However, the overhead of communications for synchronous algorithms starts to become too expensive to scale out the training procedure, causing inefficiency in running time. While asynchronous algorithm have better hardware efficiency, it often leads to a \u201csignificant\u201d loss in model accuracy at this scale\u2014for production recommender systems (e.g., Baidu\u2019s search engine). Recall that even 0.1% drop of accuracy would lead to a noticeable loss in revenue."),(0,o.kt)("h3",{id:"parameter-server-framework"},"Parameter Server Framework"),(0,o.kt)("p",null,"Existing distributed systems for deep learning based recommender models are usually built on top of the parameter server (PS) framework, where one can add elastic distributed storage to hold the increasingly large amount of parameters of the embedding layer. On the other hand, the computation workload does not scale linearly with the increasing parameter scale of the embedding layer\u2014in fact, with an efficient implementation, a lookup operation over a larger embedding table would introduce almost no additional computations."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Left: deep learning based recommender model training workflow over a heterogeneous cluster. Right: Gantt charts to compare fully synchronous, fully asynchronous, raw hybrid and optimized hybrid modes of distributed training of the deep learning recommender model. [Source](https://arxiv.org/pdf/2111.05897v1.pdf).",src:r(52540).Z})),(0,o.kt)("p",null,"Left: deep learning based recommender model training workflow over a heterogeneous cluster. Right: Gantt charts to compare fully synchronous, fully asynchronous, raw hybrid and optimized hybrid modes of distributed training of the deep learning recommender model. ",(0,o.kt)("a",{parentName:"p",href:"https://arxiv.org/pdf/2111.05897v1.pdf"},"Source"),"."),(0,o.kt)("h3",{id:"persia"},"PERSIA"),(0,o.kt)("p",null,(0,o.kt)("strong",{parentName:"p"},"PERSIA"),"\xa0(",(0,o.kt)("strong",{parentName:"p"},"P"),"arallel r",(0,o.kt)("strong",{parentName:"p"},"E"),"commendation t",(0,o.kt)("strong",{parentName:"p"},"R"),"aining\xa0",(0,o.kt)("strong",{parentName:"p"},"S"),"ystem with hybr",(0,o.kt)("strong",{parentName:"p"},"I"),"d\xa0",(0,o.kt)("strong",{parentName:"p"},"A"),"cceleration) is a PyTorch-based system for training deep learning recommendation models on commodity hardware. It supports models containing more than 100 trillion parameters."),(0,o.kt)("p",null,"It uses a hybrid training algorithm to tackle the embedding layer and dense neural network modules differently\u2014the embedding layer is trained in an asynchronous fashion to improve the throughput of training samples, while the rest neural network is trained in a synchronous fashion to preserve the statistical efficiency."),(0,o.kt)("p",null,"It also uses a distributed system to manage the hybrid computation resources (CPUs and GPUs) to optimize the co-existence of asynchronicity and synchronicity in the training algorithm."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Untitled",src:r(33952).Z})),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Untitled",src:r(53543).Z})),(0,o.kt)("p",null,"Persia includes a data loader module, a embedding PS (Parameter Server) module, a group of embedding workers over CPU nodes, and a group of NN workers over GPU instances. Each module can be dynamically scaled for different model scales and desired training throughput:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"A data loader that fetches training data from distributed storages such as Hadoop, Kafka, etc;"),(0,o.kt)("li",{parentName:"ul"},"A embedding parameter server (embedding PS for short) manages the storage and update of the parameters in the embedding layer $\\mathrm{w}^{emb}$;"),(0,o.kt)("li",{parentName:"ul"},"A group of embedding workers that runs Algorithm 1 for getting the embedding parameters from the embedding PS; aggregating embedding vectors (potentially) and putting embedding gradients back to embedding PS;"),(0,o.kt)("li",{parentName:"ul"},"A group of NN workers that runs the forward-/backward- propagation of the neural network $\\mathrm{NN_{w^{nn}}(\xb7)}$.")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"The architecture of Persia.",src:r(34230).Z})),(0,o.kt)("p",null,"The architecture of Persia."),(0,o.kt)("p",null,"Logically, the training procedure is conducted by Persia in a data dispatching based paradigm as below:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"The data loader will dispatch the ID type feature $\\mathrm{x^{ID}}$ to an embedding worker\u2014the embedding worker will generate an unique sample ID \ud835\udf09 for this sample, buffer this sample ID with the ID type feature $\\mathrm{x_\\xi^{ID}}$ locally, and returns this ID \ud835\udf09 back the data loader; the data loader will associate this sample\u2019s Non-ID type features and labels with this unique ID."),(0,o.kt)("li",{parentName:"ol"},"Next, the data loader will dispatch the Non-ID type feature and label(s) $\\mathrm{(x",(0,o.kt)("em",{parentName:"li"},"\\xi^{NID},y"),"\\xi)}$ to a NN worker."),(0,o.kt)("li",{parentName:"ol"},"Once a NN worker receives this incomplete training sample, it will issue a request to pull the ID type features\u2019 $\\mathrm{(x",(0,o.kt)("em",{parentName:"li"},"\\xi^{ID})}$ embedding $\\mathrm{w"),"\\xi^{emb}}$ from some embedding worker according to the sample ID \ud835\udf09\u2014this would trigger the forward propagation in Algorithm 1, where the embedding worker will use the buffered ID type feature $\\mathrm{x",(0,o.kt)("em",{parentName:"li"},"\\xi^{ID}}$ to get the corresponding $\\mathrm{w"),"\\xi^{emb}}$ from the embedding PS."),(0,o.kt)("li",{parentName:"ol"},"Then the embedding worker performs some potential aggregation of original embedding vectors. When this computation finishes, the aggregated embedding vector $\\mathrm{w_\\xi^{emb}}$ will be transmitted to the NN worker that issues the pull request."),(0,o.kt)("li",{parentName:"ol"},"Once the NN worker gets a group of complete inputs for the dense module, it will create a mini-batch and conduct the training computation of the NN according to Algorithm 2. Note that the parameter of the NN always locates in the device RAM of the NN worker, where the NN workers synchronize the gradients by the AllReduce Paradigm."),(0,o.kt)("li",{parentName:"ol"},"When the iteration of Algorithm 2 is finished, the NN worker will send the gradients of the embedding ($\\mathrm{F_\\xi^{emb'}}$) back to the embedding worker (also along with the sample ID \ud835\udf09)."),(0,o.kt)("li",{parentName:"ol"},"The embedding worker will query the buffered ID type feature $\\mathrm{x",(0,o.kt)("em",{parentName:"li"},"\\xi^{ID}}$ according to the sample ID \ud835\udf09; compute gradients $\\mathrm{F"),"\\xi^{emb'}}$ of the embedding parameters and send the gradients to the embedding PS, so that the embedding PS can finally compute the updates according the embedding parameter\u2019s gradients by its SGD optimizer and update the embedding parameters.")))}p.isMDXComponent=!0},52540:function(e,t,r){t.Z=r.p+"assets/images/content-blog-raw-blog-distributed-training-of-recommender-systems-untitled-1-64afd6c4cb479b89e18f624461bb9641.png"},33952:function(e,t,r){t.Z=r.p+"assets/images/content-blog-raw-blog-distributed-training-of-recommender-systems-untitled-2-f8f92456dbc99598ab43bdb238450ac0.png"},53543:function(e,t,r){t.Z=r.p+"assets/images/content-blog-raw-blog-distributed-training-of-recommender-systems-untitled-3-c4a1ad9cdcc4ab78213fff42a2bf2d18.png"},34230:function(e,t,r){t.Z=r.p+"assets/images/content-blog-raw-blog-distributed-training-of-recommender-systems-untitled-4-717546b660d1b2fcaff856bf274d18e2.png"},60987:function(e,t,r){t.Z=r.p+"assets/images/content-blog-raw-blog-distributed-training-of-recommender-systems-untitled-76057748d7f785bcb03bc9fae4560fc3.png"}}]);
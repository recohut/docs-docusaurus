"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7572],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return h}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=a.createContext({}),p=function(e){var t=a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},d=function(e){var t=p(e.components);return a.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,l=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),m=p(n),h=r,u=m["".concat(l,".").concat(h)]||m[h]||c[h]||o;return n?a.createElement(u,s(s({ref:t},d),{},{components:n})):a.createElement(u,s({ref:t},d))}));function h(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=m;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:r,s[1]=i;for(var p=2;p<o;p++)s[p]=n[p];return a.createElement.apply(null,s)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9313:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return l},metadata:function(){return p},toc:function(){return d},default:function(){return m}});var a=n(7462),r=n(3366),o=(n(7294),n(3905)),s=["components"],i={},l="DeepWalk",p={unversionedId:"models/deepwalk",id:"models/deepwalk",title:"DeepWalk",description:"DeepWalk learns representations of online social networks graphs. By performing random walks to generate sequences, the paper demonstrated that it was able to learn vector representations of nodes (e.g., profiles, content) in the graph.",source:"@site/docs/models/deepwalk.md",sourceDirName:"models",slug:"/models/deepwalk",permalink:"/docs/models/deepwalk",editUrl:"https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/docs/models/deepwalk.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"DeepFM",permalink:"/docs/models/deepfm"},next:{title:"DGTN",permalink:"/docs/models/dgtn"}},d=[{value:"<strong>The DeepWalk process operates in a few steps</strong>",id:"the-deepwalk-process-operates-in-a-few-steps",children:[],level:3},{value:"Let&#39;s see how it works in depth",id:"lets-see-how-it-works-in-depth",children:[],level:3},{value:"What does it look like in code?",id:"what-does-it-look-like-in-code",children:[],level:3},{value:"Links",id:"links",children:[],level:2}],c={toc:d};function m(e){var t=e.components,i=(0,r.Z)(e,s);return(0,o.kt)("wrapper",(0,a.Z)({},c,i,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"deepwalk"},"DeepWalk"),(0,o.kt)("p",null,(0,o.kt)("a",{parentName:"p",href:"https://arxiv.org/abs/1403.6652"},"DeepWalk")," learns representations of online social networks graphs. By performing random walks to generate sequences, the paper demonstrated that it was able to learn vector representations of nodes (e.g., profiles, content) in the graph."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"/img/content-models-raw-mp2-deepwalk-untitled.png",src:n(6237).Z})),(0,o.kt)("h3",{id:"the-deepwalk-process-operates-in-a-few-steps"},(0,o.kt)("strong",{parentName:"h3"},"The DeepWalk process operates in a few steps")),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"For each node, perform N \u201crandom steps\u201d starting from that node"),(0,o.kt)("li",{parentName:"ol"},"Treat each walk as a sequence of node-id strings"),(0,o.kt)("li",{parentName:"ol"},"Given a list of these sequences, train a word2vec model using the Skip-Gram algorithm on these string sequences")),(0,o.kt)("h3",{id:"lets-see-how-it-works-in-depth"},"Let's see how it works in depth"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"node embedding learned in an unsupervised manner")),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"/img/content-models-raw-mp2-deepwalk-untitled-1.png",src:n(7368).Z})),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"highly resembles word embedding in terms of the training process"),(0,o.kt)("li",{parentName:"ul"},"motivation is that the distribution of both nodes in a graph and words in a corpus follow a power law","  ",(0,o.kt)("img",{alt:"/img/content-models-raw-mp2-deepwalk-untitled-2.png",src:n(2247).Z})),(0,o.kt)("li",{parentName:"ul"},"The algorithm contains ",(0,o.kt)("strong",{parentName:"li"},"two steps"),": 1) Perform random walks on nodes in a graph to generate node sequences, 2) Run skip-gram to learn the embedding of each node based on the node sequences generated in step 1","  ",(0,o.kt)("img",{alt:"Different colors indicate different labels",src:n(2364).Z}),"  Different colors indicate different labels\n"),(0,o.kt)("li",{parentName:"ul"},"However, the main issue with DeepWalk is that it lacks the ability to generalize. Whenever a new node comes in, it has to re-train the model in order to represent this node (transductive). Thus, such GNN is not suitable for dynamic graphs where the nodes in the graphs are ever-changing.")),(0,o.kt)("h3",{id:"what-does-it-look-like-in-code"},"What does it look like in code?"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},'# Instantiate a undirected Networkx graph\nG = nx.Graph()\nG.add_edges_from(list_of_product_copurchase_edges)\n\ndef get_random_walk(graph:nx.Graph, node:int, n_steps:int = 4)->List[str]:\n   """ Given a graph and a node, \n       return a random walk starting from the node \n   """\n   local_path = [str(node),]\n   target_node = node\n   for _ in range(n_steps):\n      neighbors = list(nx.all_neighbors(graph, target_node))\n      target_node = random.choice(neighbors)\n      local_path.append(str(target_node))\n   return local_path\n\nwalk_paths = []\n\nfor node in G.nodes():\n   for _ in range(10):\n      walk_paths.append(get_random_walk(G, node))\n \nwalk_paths[0]\n>>> [\u201810001\u2019, \u201810205\u2019, \u201811845\u2019, \u201810205\u2019, \u201810059\u2019]\n')),(0,o.kt)("p",null,"What these random walks provide to us is a series of strings that act as a path from the start node \u2014 randomly walking from one node to the next down the list. What we do next is we treat this list of strings as a sentence, then utilize these series of strings to train a Word2Vec model:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"# Instantiate word2vec model\nembedder = Word2Vec(\n   window=4, sg=1, hs=0, negative=10, alpha=0.03, min_alpha=0.0001,    \n   seed=42\n)\n\n# Build Vocabulary\nembedder.build_vocab(walk_paths, progress_per=2)\n\n# Train\nembedder.train(\n   walk_paths, total_examples=embedder.corpus_count, epochs=20, \n   report_delay=1\n)\n")),(0,o.kt)("p",null,"It\u2019s a slight stretch, but here\u2019s the gist of it from the recommendations perspective:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Use the product pairs and associated relationships to create a graph"),(0,o.kt)("li",{parentName:"ul"},"Generate sequences from the graph (via\xa0",(0,o.kt)("em",{parentName:"li"},"random walk"),")"),(0,o.kt)("li",{parentName:"ul"},"Learn product embeddings based on the sequences (via\xa0",(0,o.kt)("em",{parentName:"li"},"word2vec"),")"),(0,o.kt)("li",{parentName:"ul"},"Recommend products based on embedding similarity (e.g., cosine similarity, dot product)")),(0,o.kt)("h2",{id:"links"},"Links"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://arxiv.org/abs/1403.6652"},"DeepWalk: Online Learning of Social Representations. arXiv, Jun 2014")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/phanein/deepwalk"},"https://github.com/phanein/deepwalk")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://towardsdatascience.com/deepwalk-its-behavior-and-how-to-implement-it-b5aac0290a15"},"https://towardsdatascience.com/deepwalk-its-behavior-and-how-to-implement-it-b5aac0290a15")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://towardsdatascience.com/introduction-to-graph-neural-networks-with-deepwalk-f5ac25900772"},"https://towardsdatascience.com/introduction-to-graph-neural-networks-with-deepwalk-f5ac25900772")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://www.analyticsvidhya.com/blog/2019/11/graph-feature-extraction-deepwalk/"},"https://www.analyticsvidhya.com/blog/2019/11/graph-feature-extraction-deepwalk/"))))}m.isMDXComponent=!0},7368:function(e,t,n){t.Z=n.p+"assets/images/content-models-raw-mp2-deepwalk-untitled-1-d559a029ca3abfbf32ca607332d1a0f4.png"},2247:function(e,t,n){t.Z=n.p+"assets/images/content-models-raw-mp2-deepwalk-untitled-2-5475e0a1cfe6e108abe6bf2f444281ee.png"},2364:function(e,t,n){t.Z=n.p+"assets/images/content-models-raw-mp2-deepwalk-untitled-3-05a6b382c653cfba3ca1c70e4755d38a.png"},6237:function(e,t,n){t.Z=n.p+"assets/images/content-models-raw-mp2-deepwalk-untitled-c75ae28900bb4b9be0d4ee72419711db.png"}}]);
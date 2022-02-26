"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[3624],{3905:function(a,t,e){e.d(t,{Zo:function(){return o},kt:function(){return N}});var n=e(67294);function r(a,t,e){return t in a?Object.defineProperty(a,t,{value:e,enumerable:!0,configurable:!0,writable:!0}):a[t]=e,a}function m(a,t){var e=Object.keys(a);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(a);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(a,t).enumerable}))),e.push.apply(e,n)}return e}function p(a){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?m(Object(e),!0).forEach((function(t){r(a,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(a,Object.getOwnPropertyDescriptors(e)):m(Object(e)).forEach((function(t){Object.defineProperty(a,t,Object.getOwnPropertyDescriptor(e,t))}))}return a}function l(a,t){if(null==a)return{};var e,n,r=function(a,t){if(null==a)return{};var e,n,r={},m=Object.keys(a);for(n=0;n<m.length;n++)e=m[n],t.indexOf(e)>=0||(r[e]=a[e]);return r}(a,t);if(Object.getOwnPropertySymbols){var m=Object.getOwnPropertySymbols(a);for(n=0;n<m.length;n++)e=m[n],t.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(a,e)&&(r[e]=a[e])}return r}var s=n.createContext({}),i=function(a){var t=n.useContext(s),e=t;return a&&(e="function"==typeof a?a(t):p(p({},t),a)),e},o=function(a){var t=i(a.components);return n.createElement(s.Provider,{value:t},a.children)},c={inlineCode:"code",wrapper:function(a){var t=a.children;return n.createElement(n.Fragment,{},t)}},k=n.forwardRef((function(a,t){var e=a.components,r=a.mdxType,m=a.originalType,s=a.parentName,o=l(a,["components","mdxType","originalType","parentName"]),k=i(e),N=r,u=k["".concat(s,".").concat(N)]||k[N]||c[N]||m;return e?n.createElement(u,p(p({ref:t},o),{},{components:e})):n.createElement(u,p({ref:t},o))}));function N(a,t){var e=arguments,r=t&&t.mdxType;if("string"==typeof a||r){var m=e.length,p=new Array(m);p[0]=k;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=a,l.mdxType="string"==typeof a?a:r,p[1]=l;for(var i=2;i<m;i++)p[i]=e[i];return n.createElement.apply(null,p)}return n.createElement.apply(null,e)}k.displayName="MDXCreateElement"},65689:function(a,t,e){e.r(t),e.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return i},toc:function(){return o},default:function(){return k}});var n=e(87462),r=e(63366),m=(e(67294),e(3905)),p=["components"],l={},s="Collaborative Filtering",i={unversionedId:"concept-basics/collaborative-filtering",id:"concept-basics/collaborative-filtering",title:"Collaborative Filtering",description:"Similarity methods",source:"@site/docs/concept-basics/collaborative-filtering.mdx",sourceDirName:"concept-basics",slug:"/concept-basics/collaborative-filtering",permalink:"/docs/concept-basics/collaborative-filtering",editUrl:"https://github.com/recohut/docs/docs/docs/concept-basics/collaborative-filtering.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Challenges",permalink:"/docs/concept-basics/challenges"},next:{title:"Evaluation",permalink:"/docs/concept-basics/evaluation"}},o=[{value:"Similarity methods",id:"similarity-methods",children:[{value:"User-based similarity",id:"user-based-similarity",children:[],level:3},{value:"Item-based similarity",id:"item-based-similarity",children:[],level:3}],level:2}],c={toc:o};function k(a){var t=a.components,e=(0,r.Z)(a,p);return(0,m.kt)("wrapper",(0,n.Z)({},c,e,{components:t,mdxType:"MDXLayout"}),(0,m.kt)("h1",{id:"collaborative-filtering"},"Collaborative Filtering"),(0,m.kt)("h2",{id:"similarity-methods"},"Similarity methods"),(0,m.kt)("h3",{id:"user-based-similarity"},"User-based similarity"),(0,m.kt)("p",null,"Let's take the following user-item rating matrix as an example:"),(0,m.kt)("table",null,(0,m.kt)("thead",{parentName:"table"},(0,m.kt)("tr",{parentName:"thead"},(0,m.kt)("th",{parentName:"tr",align:null},"UserID/ItemID"),(0,m.kt)("th",{parentName:"tr",align:null},"1"),(0,m.kt)("th",{parentName:"tr",align:null},"2"),(0,m.kt)("th",{parentName:"tr",align:null},"3"),(0,m.kt)("th",{parentName:"tr",align:null},"4"),(0,m.kt)("th",{parentName:"tr",align:null},"5"),(0,m.kt)("th",{parentName:"tr",align:null},"6"),(0,m.kt)("th",{parentName:"tr",align:null},"Mean Rating"))),(0,m.kt)("tbody",{parentName:"table"},(0,m.kt)("tr",{parentName:"tbody"},(0,m.kt)("td",{parentName:"tr",align:null},"1"),(0,m.kt)("td",{parentName:"tr",align:null},"7"),(0,m.kt)("td",{parentName:"tr",align:null},"6"),(0,m.kt)("td",{parentName:"tr",align:null},"7"),(0,m.kt)("td",{parentName:"tr",align:null},"4"),(0,m.kt)("td",{parentName:"tr",align:null},"5"),(0,m.kt)("td",{parentName:"tr",align:null},"4"),(0,m.kt)("td",{parentName:"tr",align:null},"5.5")),(0,m.kt)("tr",{parentName:"tbody"},(0,m.kt)("td",{parentName:"tr",align:null},"2"),(0,m.kt)("td",{parentName:"tr",align:null},"6"),(0,m.kt)("td",{parentName:"tr",align:null},"7"),(0,m.kt)("td",{parentName:"tr",align:null},"NaN"),(0,m.kt)("td",{parentName:"tr",align:null},"4"),(0,m.kt)("td",{parentName:"tr",align:null},"3"),(0,m.kt)("td",{parentName:"tr",align:null},"4"),(0,m.kt)("td",{parentName:"tr",align:null},"4.8")),(0,m.kt)("tr",{parentName:"tbody"},(0,m.kt)("td",{parentName:"tr",align:null},"3"),(0,m.kt)("td",{parentName:"tr",align:null},"NaN"),(0,m.kt)("td",{parentName:"tr",align:null},"3"),(0,m.kt)("td",{parentName:"tr",align:null},"3"),(0,m.kt)("td",{parentName:"tr",align:null},"1"),(0,m.kt)("td",{parentName:"tr",align:null},"1"),(0,m.kt)("td",{parentName:"tr",align:null},"NaN"),(0,m.kt)("td",{parentName:"tr",align:null},"2")),(0,m.kt)("tr",{parentName:"tbody"},(0,m.kt)("td",{parentName:"tr",align:null},"4"),(0,m.kt)("td",{parentName:"tr",align:null},"1"),(0,m.kt)("td",{parentName:"tr",align:null},"2"),(0,m.kt)("td",{parentName:"tr",align:null},"2"),(0,m.kt)("td",{parentName:"tr",align:null},"3"),(0,m.kt)("td",{parentName:"tr",align:null},"3"),(0,m.kt)("td",{parentName:"tr",align:null},"4"),(0,m.kt)("td",{parentName:"tr",align:null},"2.5")),(0,m.kt)("tr",{parentName:"tbody"},(0,m.kt)("td",{parentName:"tr",align:null},"5"),(0,m.kt)("td",{parentName:"tr",align:null},"1"),(0,m.kt)("td",{parentName:"tr",align:null},"NaN"),(0,m.kt)("td",{parentName:"tr",align:null},"1"),(0,m.kt)("td",{parentName:"tr",align:null},"2"),(0,m.kt)("td",{parentName:"tr",align:null},"3"),(0,m.kt)("td",{parentName:"tr",align:null},"3"),(0,m.kt)("td",{parentName:"tr",align:null},"2")))),(0,m.kt)("p",null,"For each user, mean rating is calculated as follows:"),(0,m.kt)("p",null,"$$ \\mu",(0,m.kt)("em",{parentName:"p"},"u = \\frac{\\Sigma"),"{k \\in \\mathcal{I}",(0,m.kt)("em",{parentName:"p"},"u} r"),"{uk}}{|\\mathcal{I}_u|} \\ \\ \\forall u \\in ","{","1 \\dots m","}"," $$"),(0,m.kt)("p",null,"Two common approaches to measure similarity between two users ",(0,m.kt)("span",{parentName:"p",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("mrow",{parentName:"mrow"},(0,m.kt)("mi",{parentName:"mrow",mathvariant:"normal"},"S"),(0,m.kt)("mi",{parentName:"mrow",mathvariant:"normal"},"i"),(0,m.kt)("mi",{parentName:"mrow",mathvariant:"normal"},"m")),(0,m.kt)("mo",{parentName:"mrow",stretchy:"false"},"("),(0,m.kt)("mi",{parentName:"mrow"},"u"),(0,m.kt)("mo",{parentName:"mrow",separator:"true"},","),(0,m.kt)("mi",{parentName:"mrow"},"v"),(0,m.kt)("mo",{parentName:"mrow",stretchy:"false"},")")),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"\\mathrm{Sim}(u, v)")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"1em",verticalAlign:"-0.25em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord mathrm"},"Sim")),(0,m.kt)("span",{parentName:"span",className:"mopen"},"("),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"u"),(0,m.kt)("span",{parentName:"span",className:"mpunct"},","),(0,m.kt)("span",{parentName:"span",className:"mspace",style:{marginRight:"0.1667em"}}),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal",style:{marginRight:"0.03588em"}},"v"),(0,m.kt)("span",{parentName:"span",className:"mclose"},")")))))," are ",(0,m.kt)("em",{parentName:"p"},"Cosine similarity")," and ",(0,m.kt)("em",{parentName:"p"},"Pearson correlation coefficient"),":"),(0,m.kt)("p",null,"\\begin{align",(0,m.kt)("em",{parentName:"p"},"}\n\\mathrm{Cosine}(u,v) &= \\frac{\\Sigma",(0,m.kt)("em",{parentName:"em"},"{k \\in \\mathcal{I}_u \\cap \\mathcal{I}_v} r"),"{uk} ")," r",(0,m.kt)("em",{parentName:"p"},"{vk}}{\\sqrt{\\Sigma"),"{k \\in \\mathcal{I}",(0,m.kt)("em",{parentName:"p"},"u \\cap \\mathcal{I}_v} r"),"{uk}^2} ",(0,m.kt)("em",{parentName:"p"}," \\sqrt{\\Sigma",(0,m.kt)("em",{parentName:"em"},"{k \\in \\mathcal{I}_u \\cap \\mathcal{I}_v} r"),"{vk}^2}} ","\\","\n\\mathrm{Pearson}(u,v) &= \\frac{\\Sigma",(0,m.kt)("em",{parentName:"em"},"{k \\in \\mathcal{I}_u \\cap \\mathcal{I}_v} (r"),"{uk} - \\mu_u) ")," (r",(0,m.kt)("em",{parentName:"p"},"{vk} - \\mu_v)}{\\sqrt{\\Sigma"),"{k \\in \\mathcal{I}",(0,m.kt)("em",{parentName:"p"},"u \\cap \\mathcal{I}_v} (r"),"{uk} - \\mu",(0,m.kt)("em",{parentName:"p"},"u)^2} * \\sqrt{\\Sigma"),"{k \\in \\mathcal{I}",(0,m.kt)("em",{parentName:"p"},"u \\cap \\mathcal{I}_v} (r"),"{vk} - \\mu_v)^2}}\n\\end{align*}"),(0,m.kt)("p",null,"For example, given the original rating matrix, between ",(0,m.kt)("em",{parentName:"p"},"User 1")," and ",(0,m.kt)("em",{parentName:"p"},"User 3")," we have their similarities as:"),(0,m.kt)("p",null,"\\begin{align",(0,m.kt)("em",{parentName:"p"},"}\n\\mathrm{Cosine}(1,3) &= \\frac{6"),"3+7",(0,m.kt)("em",{parentName:"p"},"3+4"),"1+5",(0,m.kt)("em",{parentName:"p"},"1}{\\sqrt{6^2+7^2+4^2+5^2} ")," \\sqrt{3^2+3^2+1^2+1^2}} = 0.956 ","\\","\n\\mathrm{Pearson}(1,3) &= \\frac{(6 - 5.5) ",(0,m.kt)("em",{parentName:"p"}," (3 - 2) + (7 - 5.5) ")," (3 - 2) + (4 - 5.5) ",(0,m.kt)("em",{parentName:"p"}," (1 - 2) + (5 - 5.5) ")," (1 - 2)}{\\sqrt{0.5^2 + 1.5^2 + (-1.5)^2 + (-0.5)^2} ",(0,m.kt)("em",{parentName:"p"}," \\sqrt{1^2 + 1^2 + (-1)^2 + (-1)^2}} = 0.894\n\\end{align"),"}"),(0,m.kt)("p",null,"The overall neighborhood-based ",(0,m.kt)("em",{parentName:"p"},"prediction function")," is as follows:"),(0,m.kt)("p",null,"$$ \\hat{r}",(0,m.kt)("em",{parentName:"p"},"{uj} = \\mu_u + \\frac{\\Sigma"),"{v \\in P",(0,m.kt)("em",{parentName:"p"},"u(j)} \\mathrm{Sim}(u,v) * (r"),"{vj} - \\mu",(0,m.kt)("em",{parentName:"p"},"v)}{\\Sigma"),"{v \\in P_u(j)} |\\mathrm{Sim}(u,v)|} $$"),(0,m.kt)("p",null,"For example, to calculate the predicted rating given by ",(0,m.kt)("em",{parentName:"p"},"User 3")," to ",(0,m.kt)("em",{parentName:"p"},"Item 1")," and ",(0,m.kt)("em",{parentName:"p"},"Item 6"),", where the ratings are based on the two nearest neighbors (",(0,m.kt)("em",{parentName:"p"},"User 1")," and ",(0,m.kt)("em",{parentName:"p"},"User 2"),"):"),(0,m.kt)("p",null,"\\begin{align",(0,m.kt)("em",{parentName:"p"},"}\n\\hat{r}_{31} &= 2 + \\frac{1.5"),"0.894+1.2",(0,m.kt)("em",{parentName:"p"},"0.939}{0.894 + 0.939} = 3.35 ","\\","\n\\hat{r}_{36} &= 2 + \\frac{-1.5"),"0.894-0.8",(0,m.kt)("em",{parentName:"p"},"0.939}{0.894 + 0.939} = 0.86\n\\end{align"),"}"),(0,m.kt)("h3",{id:"item-based-similarity"},"Item-based similarity"),(0,m.kt)("p",null,"The ",(0,m.kt)("em",{parentName:"p"},"Cosine")," and ",(0,m.kt)("em",{parentName:"p"},"Pearson")," similarities can be applied for item-based methods as well, except that the feature vectors are now columns instead of rows as we measure similarity between items. "),(0,m.kt)("p",null,"If ",(0,m.kt)("em",{parentName:"p"},"Cosine")," similarity is based on the mean-centered rating matrix, we have a variant called ",(0,m.kt)("em",{parentName:"p"},"AdjustedCosine"),".  The ",(0,m.kt)("em",{parentName:"p"},"adjusted")," cosine similarity between the items (columns) ",(0,m.kt)("em",{parentName:"p"},"i")," and ",(0,m.kt)("em",{parentName:"p"},"j")," is defined as follows:"),(0,m.kt)("p",null,"$$ \\mathrm{AdjustedCosine}(i,j) = \\frac{\\Sigma",(0,m.kt)("em",{parentName:"p"},"{u \\in \\mathcal{U}_i \\cap \\mathcal{U}_j} s"),"{ui} ",(0,m.kt)("em",{parentName:"p"}," s",(0,m.kt)("em",{parentName:"em"},"{uj}}{\\sqrt{\\Sigma"),"{u \\in \\mathcal{U}",(0,m.kt)("em",{parentName:"em"},"i \\cap \\mathcal{U}_j} s"),"{ui}^2} ")," \\sqrt{\\Sigma",(0,m.kt)("em",{parentName:"p"},"{u \\in \\mathcal{U}_i \\cap \\mathcal{U}_j} s"),"{uj}^2}} $$"),(0,m.kt)("p",null,"where ",(0,m.kt)("span",{parentName:"p",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("msub",{parentName:"mrow"},(0,m.kt)("mi",{parentName:"msub"},"s"),(0,m.kt)("mrow",{parentName:"msub"},(0,m.kt)("mi",{parentName:"mrow"},"u"),(0,m.kt)("mi",{parentName:"mrow"},"i")))),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"s_{ui}")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.5806em",verticalAlign:"-0.15em"}}),(0,m.kt)("span",{parentName:"span",className:"mord"},(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"s"),(0,m.kt)("span",{parentName:"span",className:"msupsub"},(0,m.kt)("span",{parentName:"span",className:"vlist-t vlist-t2"},(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.3117em"}},(0,m.kt)("span",{parentName:"span",style:{top:"-2.55em",marginLeft:"0em",marginRight:"0.05em"}},(0,m.kt)("span",{parentName:"span",className:"pstrut",style:{height:"2.7em"}}),(0,m.kt)("span",{parentName:"span",className:"sizing reset-size6 size3 mtight"},(0,m.kt)("span",{parentName:"span",className:"mord mtight"},(0,m.kt)("span",{parentName:"span",className:"mord mathnormal mtight"},"u"),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal mtight"},"i"))))),(0,m.kt)("span",{parentName:"span",className:"vlist-s"},"\u200b")),(0,m.kt)("span",{parentName:"span",className:"vlist-r"},(0,m.kt)("span",{parentName:"span",className:"vlist",style:{height:"0.15em"}},(0,m.kt)("span",{parentName:"span"}))))))))))," is the mean-centered rating that user ",(0,m.kt)("span",{parentName:"p",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("mi",{parentName:"mrow"},"u")),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"u")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.4306em"}}),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"u")))))," gives to item ",(0,m.kt)("span",{parentName:"p",className:"math math-inline"},(0,m.kt)("span",{parentName:"span",className:"katex"},(0,m.kt)("span",{parentName:"span",className:"katex-mathml"},(0,m.kt)("math",{parentName:"span",xmlns:"http://www.w3.org/1998/Math/MathML"},(0,m.kt)("semantics",{parentName:"math"},(0,m.kt)("mrow",{parentName:"semantics"},(0,m.kt)("mi",{parentName:"mrow"},"i")),(0,m.kt)("annotation",{parentName:"semantics",encoding:"application/x-tex"},"i")))),(0,m.kt)("span",{parentName:"span",className:"katex-html","aria-hidden":"true"},(0,m.kt)("span",{parentName:"span",className:"base"},(0,m.kt)("span",{parentName:"span",className:"strut",style:{height:"0.6595em"}}),(0,m.kt)("span",{parentName:"span",className:"mord mathnormal"},"i"))))),". "),(0,m.kt)("p",null,"For example, we calculate ",(0,m.kt)("em",{parentName:"p"},"adjusted")," cosine between ",(0,m.kt)("em",{parentName:"p"},"Item 1")," and ",(0,m.kt)("em",{parentName:"p"},"Item 3")," in the small sample dataset above as follows:"),(0,m.kt)("p",null,"$$ \\mathrm{AdjustedCosine}(1,3) = \\frac{1.5 ",(0,m.kt)("em",{parentName:"p"}," 1.5 + (-1.5) ")," (-0.5) + (-1) ",(0,m.kt)("em",{parentName:"p"}," (-1)}{\\sqrt{1.5^2 + (-1.5)^2 + (-1)^2} ")," \\sqrt{1.5^2 + (-0.5)^2 + (-1)^2}} = 0.912 $$"),(0,m.kt)("p",null,"For prediction, we use the same form of prediction function as in user-based methods but aggregate the user's ratings on neighboring items:"),(0,m.kt)("p",null,"$$ \\hat{r}",(0,m.kt)("em",{parentName:"p"},"{ut} = \\mu_u + \\frac{\\Sigma"),"{j \\in Q",(0,m.kt)("em",{parentName:"p"},"t(u)} \\mathrm{Sim}(j,t) * (r"),"{uj} - \\mu",(0,m.kt)("em",{parentName:"p"},"u)}{\\Sigma"),"{j \\in Q_t(u)} |\\mathrm{Sim}(j,t)|} $$"),(0,m.kt)("p",null,"For example, below we predict the ratings that ",(0,m.kt)("em",{parentName:"p"},"User 3")," would give to ",(0,m.kt)("em",{parentName:"p"},"Item 1")," and ",(0,m.kt)("em",{parentName:"p"},"Item 6"),". The rating for ",(0,m.kt)("em",{parentName:"p"},"Item 1")," is based on two nearest neighbors ",(0,m.kt)("em",{parentName:"p"},"Item 2")," and ",(0,m.kt)("em",{parentName:"p"},"Item 3"),", while the rating for ",(0,m.kt)("em",{parentName:"p"},"Item 6")," is based on ",(0,m.kt)("em",{parentName:"p"},"Item 4")," and ",(0,m.kt)("em",{parentName:"p"},"Item 5"),"."),(0,m.kt)("p",null,"\\begin{align",(0,m.kt)("em",{parentName:"p"},"}\n\\hat{r}_{31} &= 2 + \\frac{1"),"0.735 + 1",(0,m.kt)("em",{parentName:"p"},"0.912}{0.735 + 0.912} = 3 ","\\","\n\\hat{r}_{36} &= 2 + \\frac{(-1)"),"0.829 + (-1)",(0,m.kt)("em",{parentName:"p"},"0.730}{0.829 + 0.730} = 1\n\\end{align"),"}"))}k.isMDXComponent=!0}}]);
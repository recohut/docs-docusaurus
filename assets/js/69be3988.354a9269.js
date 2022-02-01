"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4946],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return c}});var r=n(7294);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,s=function(e,t){if(null==e)return{};var n,r,s={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(s[n]=e[n]);return s}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(s[n]=e[n])}return s}var m=r.createContext({}),l=function(e){var t=r.useContext(m),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},d=function(e){var t=l(e.components);return r.createElement(m.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},p=r.forwardRef((function(e,t){var n=e.components,s=e.mdxType,i=e.originalType,m=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),p=l(n),c=s,f=p["".concat(m,".").concat(c)]||p[c]||u[c]||i;return n?r.createElement(f,a(a({ref:t},d),{},{components:n})):r.createElement(f,a({ref:t},d))}));function c(e,t){var n=arguments,s=t&&t.mdxType;if("string"==typeof e||s){var i=n.length,a=new Array(i);a[0]=p;var o={};for(var m in t)hasOwnProperty.call(t,m)&&(o[m]=t[m]);o.originalType=e,o.mdxType="string"==typeof e?e:s,a[1]=o;for(var l=2;l<i;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}p.displayName="MDXCreateElement"},4076:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return o},contentTitle:function(){return m},metadata:function(){return l},toc:function(){return d},default:function(){return p}});var r=n(7462),s=n(3366),i=(n(7294),n(3905)),a=["components"],o={},m="AttRec",l={unversionedId:"models/attrec",id:"models/attrec",title:"AttRec",description:"AttRec stands for Self-Attentive Sequential Recommendation.",source:"@site/docs/models/attrec.md",sourceDirName:"models",slug:"/models/attrec",permalink:"/docs/models/attrec",editUrl:"https://github.com/recohut/docs/docs/docs/models/attrec.md",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"ASMG",permalink:"/docs/models/asmg"},next:{title:"AutoInt",permalink:"/docs/models/autoint"}},d=[{value:"Architecture",id:"architecture",children:[],level:2},{value:"Implementations",id:"implementations",children:[{value:"Tensorflow 2.5",id:"tensorflow-25",children:[],level:3}],level:2}],u={toc:d};function p(e){var t=e.components,n=(0,s.Z)(e,a);return(0,i.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"attrec"},"AttRec"),(0,i.kt)("p",null,"AttRec stands for Self-Attentive Sequential Recommendation."),(0,i.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"research paper")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},(0,i.kt)("a",{parentName:"p",href:"https://arxiv.org/abs/1808.06414"},"Shuai Zhang, Yi Tay, Lina Yao, and Aixin Sun, \u201c",(0,i.kt)("em",{parentName:"a"},"Next Item Recommendation with Self-Attention"),"\u201d. arXiv, 2018.")),(0,i.kt)("blockquote",{parentName:"div"},(0,i.kt)("p",{parentName:"blockquote"},"In this paper, we propose a novel sequence-aware recommendation model. Our model utilizes self-attention mechanism to infer the item-item relationship from user's historical interactions. With self-attention, it is able to estimate the relative weights of each item in user interaction trajectories to learn better representations for user's transient interests. The model is finally trained in a metric learning framework, taking both short-term and long-term intentions into consideration. Experiments on a wide range of datasets on different domains demonstrate that our approach outperforms the state-of-the-art by a wide margin.")))),(0,i.kt)("h2",{id:"architecture"},"Architecture"),(0,i.kt)("p",null,(0,i.kt)("img",{parentName:"p",src:"https://github.com/recohut/reco-static/raw/master/media/diagrams/AttRec.svg",alt:"https://github.com/recohut/reco-static/raw/master/media/diagrams/AttRec.svg"})),(0,i.kt)("h2",{id:"implementations"},"Implementations"),(0,i.kt)("h3",{id:"tensorflow-25"},"Tensorflow 2.5"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-python"},"class AttRec(Model):\n    def __init__(self, feature_columns, maxlen=40, mode='inner', gamma=0.5, w=0.5, embed_reg=1e-6, **kwargs):\n        \"\"\"\n        AttRec\n        :param feature_columns: A feature columns list. user + seq\n        :param maxlen: A scalar. In the paper, maxlen is L, the number of latest items.\n        :param gamma: A scalar. if mode == 'dist', gamma is the margin.\n        :param mode: A string. inner or dist.\n        :param w: A scalar. The weight of short interest.\n        :param embed_reg: A scalar. The regularizer of embedding.\n        \"\"\"\n        super(AttRec, self).__init__(**kwargs)\n        # maxlen\n        self.maxlen = maxlen\n        # w\n        self.w = w\n        self.gamma = gamma\n        self.mode = mode\n        # feature columns\n        self.user_fea_col, self.item_fea_col = feature_columns\n        # embed_dim\n        self.embed_dim = self.item_fea_col['embed_dim']\n        # user embedding\n        self.user_embedding = Embedding(input_dim=self.user_fea_col['feat_num'],\n                                        input_length=1,\n                                        output_dim=self.user_fea_col['embed_dim'],\n                                        mask_zero=False,\n                                        embeddings_initializer='random_normal',\n                                        embeddings_regularizer=l2(embed_reg))\n        # item embedding\n        self.item_embedding = Embedding(input_dim=self.item_fea_col['feat_num'],\n                                        input_length=1,\n                                        output_dim=self.item_fea_col['embed_dim'],\n                                        mask_zero=True,\n                                        embeddings_initializer='random_normal',\n                                        embeddings_regularizer=l2(embed_reg))\n        # item2 embedding, not share embedding\n        self.item2_embedding = Embedding(input_dim=self.item_fea_col['feat_num'],\n                                        input_length=1,\n                                        output_dim=self.item_fea_col['embed_dim'],\n                                        mask_zero=True,\n                                        embeddings_initializer='random_normal',\n                                        embeddings_regularizer=l2(embed_reg))\n        # self-attention\n        self.self_attention = SelfAttention_Layer()\n\n    def call(self, inputs, **kwargs):\n        # input\n        user_inputs, seq_inputs, pos_inputs, neg_inputs = inputs\n        # mask\n        # mask = self.item_embedding.compute_mask(seq_inputs)\n        mask = tf.cast(tf.not_equal(seq_inputs, 0), dtype=tf.float32)  # (None, maxlen)\n        # user info\n        user_embed = self.user_embedding(tf.squeeze(user_inputs, axis=-1))  # (None, dim)\n        # seq info\n        seq_embed = self.item_embedding(seq_inputs)  # (None, maxlen, dim)\n        # item\n        pos_embed = self.item_embedding(tf.squeeze(pos_inputs, axis=-1))  # (None, dim)\n        neg_embed = self.item_embedding(tf.squeeze(neg_inputs, axis=-1))  # (None, dim)\n        # item2 embed\n        pos_embed2 = self.item2_embedding(tf.squeeze(pos_inputs, axis=-1))  # (None, dim)\n        neg_embed2 = self.item2_embedding(tf.squeeze(neg_inputs, axis=-1))  # (None, dim)\n\n        # short-term interest\n        short_interest = self.self_attention([seq_embed, seq_embed, seq_embed, mask])  # (None, dim)\n\n        # mode\n        if self.mode == 'inner':\n            # long-term interest, pos and neg\n            pos_long_interest = tf.multiply(user_embed, pos_embed2)\n            neg_long_interest = tf.multiply(user_embed, neg_embed2)\n            # combine\n            pos_scores = self.w * tf.reduce_sum(pos_long_interest, axis=-1, keepdims=True) \\\n                         + (1 - self.w) * tf.reduce_sum(tf.multiply(short_interest, pos_embed), axis=-1, keepdims=True)\n            neg_scores = self.w * tf.reduce_sum(neg_long_interest, axis=-1, keepdims=True) \\\n                         + (1 - self.w) * tf.reduce_sum(tf.multiply(short_interest, neg_embed), axis=-1, keepdims=True)\n            self.add_loss(tf.reduce_mean(-tf.math.log(tf.nn.sigmoid(pos_scores - neg_scores))))\n        else:\n            # clip by norm\n            user_embed = tf.clip_by_norm(user_embed, 1, -1)\n            pos_embed = tf.clip_by_norm(pos_embed, 1, -1)\n            neg_embed = tf.clip_by_norm(neg_embed, 1, -1)\n            pos_embed2 = tf.clip_by_norm(pos_embed2, 1, -1)\n            neg_embed2 = tf.clip_by_norm(neg_embed2, 1, -1)\n            # distance\n            # long-term interest, pos and neg\n            pos_long_interest = tf.square(user_embed - pos_embed2)  # (None, dim)\n            neg_long_interest = tf.square(user_embed - neg_embed2)  # (None, dim)\n            # combine. Here is a difference from the original paper.\n            pos_scores = self.w * tf.reduce_sum(pos_long_interest, axis=-1, keepdims=True) + \\\n                         (1 - self.w) * tf.reduce_sum(tf.square(short_interest - pos_embed), axis=-1, keepdims=True)\n            neg_scores = self.w * tf.reduce_sum(neg_long_interest, axis=-1, keepdims=True) + \\\n                         (1 - self.w) * tf.reduce_sum(tf.square(short_interest - neg_embed), axis=-1, keepdims=True)\n            # minimize loss\n            # self.add_loss(tf.reduce_sum(tf.maximum(pos_scores - neg_scores + self.gamma, 0)))\n            self.add_loss(tf.reduce_sum(tf.nn.relu(pos_scores - neg_scores + self.gamma)))\n        return pos_scores, neg_scores\n\n    def summary(self):\n        seq_inputs = Input(shape=(self.maxlen,), dtype=tf.int32)\n        user_inputs = Input(shape=(1, ), dtype=tf.int32)\n        pos_inputs = Input(shape=(1, ), dtype=tf.int32)\n        neg_inputs = Input(shape=(1, ), dtype=tf.int32)\n        Model(inputs=[user_inputs, seq_inputs, pos_inputs, neg_inputs], \n            outputs=self.call([user_inputs, seq_inputs, pos_inputs, neg_inputs])).summary()\n")))}p.isMDXComponent=!0}}]);
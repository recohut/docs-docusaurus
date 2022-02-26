"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4871],{3905:function(e,n,t){t.d(n,{Zo:function(){return u},kt:function(){return m}});var r=t(67294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function i(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)t=o[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=r.createContext({}),l=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):s(s({},n),e)),t},u=function(e){var n=l(e.components);return r.createElement(c.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},p=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),p=l(t),m=a,f=p["".concat(c,".").concat(m)]||p[m]||d[m]||o;return t?r.createElement(f,s(s({ref:n},u),{},{components:t})):r.createElement(f,s({ref:n},u))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,s=new Array(o);s[0]=p;var i={};for(var c in n)hasOwnProperty.call(n,c)&&(i[c]=n[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,s[1]=i;for(var l=2;l<o;l++)s[l]=t[l];return r.createElement.apply(null,s)}return r.createElement.apply(null,t)}p.displayName="MDXCreateElement"},23395:function(e,n,t){t.r(n),t.d(n,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return u},default:function(){return p}});var r=t(87462),a=t(63366),o=(t(67294),t(3905)),s=["components"],i={},c="Database Connections",l={unversionedId:"tutorials/database-conn",id:"tutorials/database-conn",title:"Database Connections",description:"Mongodb",source:"@site/docs/tutorials/database-conn.mdx",sourceDirName:"tutorials",slug:"/tutorials/database-conn",permalink:"/docs/tutorials/database-conn",editUrl:"https://github.com/recohut/docs/docs/docs/tutorials/database-conn.mdx",tags:[],version:"current",frontMatter:{},sidebar:"tutorialSidebar",previous:{title:"Amazon Personalize",permalink:"/docs/tutorials/amazon-personalize"},next:{title:"Email Classification",permalink:"/docs/tutorials/email-classification"}},u=[{value:"Mongodb",id:"mongodb",children:[],level:2},{value:"MongoDB to CSV conversion",id:"mongodb-to-csv-conversion",children:[],level:2},{value:"Cassendra",id:"cassendra",children:[],level:2},{value:"MS-SQL",id:"ms-sql",children:[],level:2}],d={toc:u};function p(e){var n=e.components,t=(0,a.Z)(e,s);return(0,o.kt)("wrapper",(0,r.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"database-connections"},"Database Connections"),(0,o.kt)("h2",{id:"mongodb"},"Mongodb"),(0,o.kt)("a",{href:"https://nbviewer.org/github/recohut/nbs/blob/main/2021-06-11-recostep-mongodb-listener.ipynb",alt:""}," ",(0,o.kt)("img",{src:"https://colab.research.google.com/assets/colab-badge.svg"})),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"!pip uninstall pymongo\n!pip install pymongo[srv]\n\nimport os\nimport pymongo\nfrom bson.json_util import dumps\n\nMONGODB_USER = 'kafka-demo'\nMONGODB_PASSWORD = '<your-pass>'\nMONGODB_CLUSTER = 'cluster0.ca4wh.mongodb.net'\nMONGODB_DATABASE = 'movielens'\n\nmongo_uri = f\"mongodb+srv://{MONGODB_USER}:{MONGODB_PASSWORD}@{MONGODB_CLUSTER}/{MONGODB_DATABASE}?retryWrites=true&w=majority\"\nclient = pymongo.MongoClient(mongo_uri)\n")),(0,o.kt)("h2",{id:"mongodb-to-csv-conversion"},"MongoDB to CSV conversion"),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Pull a noSQL data from MongoDB and convert into Pandas dataframe")),(0,o.kt)("a",{href:"https://nbviewer.org/github/recohut/nbs/blob/main/2020-06-20-mongodb-to-csv-conversion.ipynb",alt:""}," ",(0,o.kt)("img",{src:"https://colab.research.google.com/assets/colab-badge.svg"})),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"import pymongo as pm\nfrom pymongo import MongoClient\nimport numpy as np\nimport pandas as pd\nfrom pandas.io.json import json_normalize\n\ndef _connect_mongo(username, password, host, port, db):\n    mongo_uri = 'mongodb://%s:%s@%s:%s/%s' % (username, password, host, port, db)\n    conn = MongoClient(mongo_uri, serverSelectionTimeoutMS=5000, ssl=True)\n    return conn[db] \n\ndb = _connect_mongo('xxxx', 'xxxx', 'xxxx', xxxx, 'xxxx')\ncollection = db['xxxx']\ntest = pd.DataFrame(list(collection.find({}, {\"var1\":1, \"var2\":1})))\nprint(test.info())\n\n# Extracting Non-array data\nwith open('non_array_features.txt') as f:\n    content = f.readlines()\nnon_array_features = [x.strip() for x in content]\n\nquery = \"\"\nfor x in non_array_features:\n    query+='\"'+ x + '\":1, '\nquery = query[:-2]\n\nflat_df = json_normalize(list(collection.find({}, {<paste query string here without ''>})))\nflat_df.shape\n\n# Extracting Array data\ndef extract_array(feature, key, val):\n    n1 = pd.DataFrame(list(collection.aggregate([{\"$unwind\" : \"$\"+str(feature)}, \n                                        {\"$project\" : {'key' : \"$\"+str(feature) + \".\" + key,\n                                                       'value' : \"$\"+str(feature) + \".\" + val}}])))\n    n2 = n1[~n1['_id'].astype(str).str.contains('timestamp', regex=False)]\n    n3 = n2[~n2.set_index(['_id','key'])['value'].index.duplicated(keep='first')]\n    n4 = n3.set_index(['_id','key'])['value'].unstack().add_suffix('_').reset_index()\n    return n4\n\n\n'''https://stackoverflow.com/questions/51402430/concatenate-columns-with-same-id-pandas-dataframe'''\ndef collide_me(x):\n    x = x[~x['_id'].astype(str).str.contains('timestamp', regex=False)]\n    y = (x.set_index(['_id', x.groupby(['_id']).cumcount()]).unstack().sort_index(axis=1, level=1))\n    y.columns = ['{}_{}'.format(i, j) for i, j in y.columns]\n    y = y.reset_index()\n    return y\n\ndef extract_ndarray(df, key, value):\n    n1 = df[['_id', key, value]]\n    n2 = n1[~n1['_id'].astype(str).str.contains('timestamp', regex=False)]\n    n3 = n2[~n2.set_index(['_id',key])[value].index.duplicated(keep='first')]\n    n4 = n3.set_index(['_id',key])[value].unstack().add_prefix(key+'_').reset_index()\n    return n4\n\n# Key-value feature extraction\naf1 = extract_array('array_feature_1', 'key', 'value')\naf2 = extract_array('array_feature_2', 'key', 'value')\n\n# Key-multivalue feature extraction\naf3 = pd.DataFrame(list(collection.aggregate([{\"$unwind\" : \"$array_feature_3\"}, \n                                        {\"$project\" : {'featurename_31':'$array_feature_3.featurename_31',\n                                                       'featurename_32':'$array_feature_3.featurename_32',\n                                                       'featurename_33':'$array_feature_3.featurename_33'\n                                                      }}])))\naf3 = collide_me(af3)\n\n# Key-value multi-dimensional feature extraction\naf4 = json_normalize(list(collection.aggregate([{\"$unwind\": '$array_feature_4'},\n                                        {\"$project\" : {'feature41':'$array_feature_4.feature41'}}\n                                        ,{\"$unwind\": '$responses'}\n                                        ,{\"$project\" : {'feature41_key':'$feature41.key',\n                                                        'feature41_value':'$feature41.value'}}\n                                       ])))\n\naf4 = extract_ndarray(af4, 'feature41_key', 'feature41_value')\n\n# Joining and exporting data\ndf = pd.merge(flat_df, af1, on='_id', how='outer')\ndf = pd.merge(df, af2, on='_id', how='outer')\ndf = pd.merge(df, af3, on='_id', how='outer')\ndf = pd.merge(df, af4, on='_id', how='outer')\ndf.to_csv('mongoDB_to_CSV_converted.csv')\n")),(0,o.kt)("h2",{id:"cassendra"},"Cassendra"),(0,o.kt)("a",{href:"https://nbviewer.org/github/recohut/nbs/blob/main/2021-07-01-read-data-from-cassandra-into-pandas.ipynb",alt:""}," ",(0,o.kt)("img",{src:"https://colab.research.google.com/assets/colab-badge.svg"})),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"import os\nfrom cassandra.cqlengine.models import Model\nfrom cassandra.cqlengine import columns\nfrom datetime import datetime\nimport pandas as pd\nfrom datetime import datetime\n\nfrom cassandra.cqlengine.management import sync_table\nfrom cassandra.policies import TokenAwarePolicy\nfrom cassandra.auth import PlainTextAuthProvider\nfrom cassandra.cluster import (\n    Cluster,\n    DCAwareRoundRobinPolicy\n)\nfrom cassandra.cqlengine.connection import (\n    register_connection,\n    set_default_connection\n)\n\nCASSANDRA_USERNAME='cassandra'\nCASSANDRA_PASSWORD='cassandra'\nCASSANDRA_HOST='127.0.0.1'\nCASSANDRA_PORT=9042\nsession = None\ncluster = None\n\nauth_provider = PlainTextAuthProvider(username=CASSANDRA_USERNAME, password=CASSANDRA_PASSWORD)\ncluster = Cluster([CASSANDRA_HOST],\nload_balancing_policy=TokenAwarePolicy(DCAwareRoundRobinPolicy()),\nport=CASSANDRA_PORT,\nauth_provider=auth_provider,\nexecutor_threads=2,\nprotocol_version=4,\n)           \n\nsession = cluster.connect()\nregister_connection(str(session), session=session)\nset_default_connection(str(session))\nrows = session.execute('select * from demo.click_stream;')\ndf = pd.DataFrame(list(rows))\ndf.head()\n")),(0,o.kt)("h2",{id:"ms-sql"},"MS-SQL"),(0,o.kt)("a",{href:"https://nbviewer.org/github/recohut/nbs/blob/main/2022-01-02-email-classification.ipynb",alt:""}," ",(0,o.kt)("img",{src:"https://colab.research.google.com/assets/colab-badge.svg"})),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-python"},"!apt install unixodbc-dev\n!pip install pyodbc\n\n%%sh\ncurl https://packages.microsoft.com/keys/microsoft.asc | apt-key add -\ncurl https://packages.microsoft.com/config/ubuntu/16.04/prod.list > /etc/apt/sources.list.d/mssql-release.list\nsudo apt-get update\nsudo ACCEPT_EULA=Y apt-get -q -y install msodbcsql17\n\nimport os\nimport pyodbc\nimport urllib\nimport pandas as pd\nfrom sqlalchemy import create_engine\n\ndriver = [item for item in pyodbc.drivers()][-1]\nconn_string = f'Driver={driver};Server=tcp:server.<domain>.com,<port>;Database=<db>;Uid=<userid>;Pwd=<pass>;Encrypt=yes;TrustServerCertificate=yes;Connection Timeout=30;'\nconn = pyodbc.connect(conn_string)\ncursor = conn.cursor()\n\n# params = urllib.parse.quote_plus(conn_string)\n# conn_str = 'mssql+pyodbc:///?odbc_connect={}'.format(params)\n# engine_feat = create_engine(conn_str, echo=True)\n# print(engine_feat.table_names())\n\ntname = 'tbl_Final_Lable_Data_18_n_19'\nquery = f'select count(*) from {tname}'\n\ncursor.execute(query)\ncursor.fetchall()\n\nquery = f'select top 5 * from {tname}'\ndf = pd.read_sql(query, conn)\ndf.info()\n")))}p.isMDXComponent=!0}}]);
---
jupyter:
  jupytext:
    text_representation:
      extension: .md
      format_name: markdown
      format_version: '1.3'
      jupytext_version: 1.13.7
  kernelspec:
    display_name: Python 3
    name: python3
---

```python id="BGgF7mbDpqo8" executionInfo={"status": "ok", "timestamp": 1630019691592, "user_tz": -330, "elapsed": 1039, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}}
import os
project_name = "reco-tut-mve"; branch = "main"; account = "sparsh-ai"
project_path = os.path.join('/content', project_name)
```

```python id="gLlY3Kntpldf" colab={"base_uri": "https://localhost:8080/"} executionInfo={"status": "ok", "timestamp": 1630019693580, "user_tz": -330, "elapsed": 13, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="fb15aa30-d2a1-47f6-9b4b-7aea7519c8a8"
if not os.path.exists(project_path):
    !cp /content/drive/MyDrive/mykeys.py /content
    import mykeys
    !rm /content/mykeys.py
    path = "/content/" + project_name; 
    !mkdir "{path}"
    %cd "{path}"
    import sys; sys.path.append(path)
    !git config --global user.email "recotut@recohut.com"
    !git config --global user.name  "reco-tut"
    !git init
    !git remote add origin https://"{mykeys.git_token}":x-oauth-basic@github.com/"{account}"/"{project_name}".git
    !git pull origin "{branch}"
    !git checkout main
else:
    %cd "{project_path}"
```

```python id="Y0k-sht3pldj" colab={"base_uri": "https://localhost:8080/"} executionInfo={"status": "ok", "timestamp": 1630020855183, "user_tz": -330, "elapsed": 793, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="606a9d15-e3a9-4218-9228-3ae4c199a3b5"
!git status
```

```python colab={"base_uri": "https://localhost:8080/"} id="vceeBfALqf3U" executionInfo={"status": "ok", "timestamp": 1630020861463, "user_tz": -330, "elapsed": 1603, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="ea6d98e4-868f-4298-a373-209690658fb2"
!git pull --rebase origin "{branch}"
```

```python id="zbD-LYR9pldj" colab={"base_uri": "https://localhost:8080/"} executionInfo={"status": "ok", "timestamp": 1630020871407, "user_tz": -330, "elapsed": 4824, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="f6c3d124-0d90-4a98-ea0e-a72175b78403"
!git add . && git commit -m 'commit' && git push origin "{branch}"
```

<!-- #region id="eDqQmJHjp4-w" -->
---
<!-- #endregion -->

<!-- #region id="8GKtSg3_uBX_" -->
## Web Scraping Script
<!-- #endregion -->

```python colab={"base_uri": "https://localhost:8080/"} cellView="form" id="LIT9rfXfp43X" executionInfo={"status": "ok", "timestamp": 1630018529668, "user_tz": -330, "elapsed": 731, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="143773c0-467f-4e12-b78b-c10ec75f64cb"
#@title
%%writefile ./code/imdb_scraping.py
import pandas as pd
import numpy as np
import requests
from bs4 import BeautifulSoup


headers = ({'User-Agent':
            'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36',
           'Accept-Language': 'en-US, en;q=0.5'})


movie_name = []
year = []
time=[]
rating=[]
metascore =[]
director=[]
votes = []
gross = []
description = []
genre=[]
cast=[]

pages = np.arange(1,1000,50)
#https://www.imdb.com/search/title/?title_type=feature&primary_language=en
#https://www.imdb.com/search/title/?title_type=feature&primary_language=en&start=51&ref_=adv_nxt
for page in pages:
   
    page = requests.get("https://www.imdb.com/search/title/?title_type=feature&primary_language=en&start="+str(page)+"&ref_=adv_nxt")
    soup = BeautifulSoup(page.text, 'html.parser')
    movie_data = soup.findAll('div', attrs = {'class': 'lister-item mode-advanced'})
    for store in movie_data:
        name = store.h3.a.text
        movie_name.append(name)
        
        year_of_release = store.h3.find('span', class_ = "lister-item-year text-muted unbold").text.replace('(', '')
        year_of_release=year_of_release.replace(')','')
        year.append(year_of_release)
        
        runtime = store.p.find("span", class_ = 'runtime').text if store.find('span', class_ = "runtime") else "NA"
        time.append(runtime)
        
        gen = store.p.find("span", class_ = 'genre').text
        genre.append(gen)
        
        rate = store.find('div', class_ = "inline-block ratings-imdb-rating").text.replace('\n', '') if store.find('div', class_ = "inline-block ratings-imdb-rating") else "NA"
        rating.append(rate)
        #rate = store.find('div', class_ = "ratings-bar").find('strong').text.replace('\n', '')
        #rating.append(rate)
        
        meta = store.find('span', class_ = "metascore").text if store.find('span', class_ = "metascore") else "NA"#if meta score not present then *
        
        metascore.append(meta)
        
        #dire=store.find('p',class_ = "metascore")
        dire=store.find('p',class_='').find_all('a')[0].text
        
        director.append(dire)
        cas=store.find('p',class_='').find_all('a')[1].text
        cas1=store.find('p',class_='').find_all('a')[2].text
        cas2=store.find('p',class_='').find_all('a')[3].text
        cas3=cas+','+cas1+','+cas2
        cast.append(cas3)
        
        
        value = store.find_all('span', attrs = {'name':'nv'}) if store.find_all('span', attrs = {'name':'nv'}) else 'NA'
        vote = value[0].text if store.find_all('span', attrs = {'name':'nv'}) else 'NA'

        #vote = value[0].text if len(value)>1 else 'NA'
        votes.append(vote)
        
        #grosses = value[1].text if len(value)>1 else 'NA'
        #gross.append(grosses)
        
      
        describe = store.find_all('p', class_ = 'text-muted')
        description_ = describe[1].text.replace('\n', '') if len(describe) >1 else 'NA'
        description.append(description_)
        
#dataframe
movie_list = pd.DataFrame({ "Movie Name": movie_name, "Year of Release" : year, "Watch Time": time,"Genre":genre,"Movie Rating": rating, "Metascore of movie": metascore,"Director":director,"Cast":cast,"Votes" : votes,"Description": description})
movie_list.to_excel("../data/bronze/imdb_scraped.xlsx")
```

<!-- #region id="aumUNXHjrh8R" -->
## Content-based Recommender Model
<!-- #endregion -->

```python id="aSziQo7Lrher" executionInfo={"status": "ok", "timestamp": 1630018622343, "user_tz": -330, "elapsed": 1649, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}}
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
import pickle
```

```python colab={"base_uri": "https://localhost:8080/"} id="XHwB8pRTrpyx" executionInfo={"status": "ok", "timestamp": 1630019022738, "user_tz": -330, "elapsed": 1322, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="4a54692b-c4db-493b-e8fc-4e19d7b485b9"
data = pd.read_excel("./data/bronze/imdb_scraped.xlsx")
data.info()
```

```python colab={"base_uri": "https://localhost:8080/"} id="1EiCQRcpr3Xp" executionInfo={"status": "ok", "timestamp": 1630019023457, "user_tz": -330, "elapsed": 19, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="f1773067-31b3-41b4-db9f-b21a6d5dbf34"
data.rename(columns={'Unnamed: 0': 'movie_id'}, inplace=True)
columns=['movie_id','Cast','Director','Genre','Movie Name','Description']
data = data[columns]
data.isnull().values.any()
```

```python colab={"base_uri": "https://localhost:8080/", "height": 374} id="WFcmwUFmsSfB" executionInfo={"status": "ok", "timestamp": 1630019023459, "user_tz": -330, "elapsed": 16, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="aaa0b5ad-ae02-4263-98ad-5f7351f08b12"
def get_important_features(data):
    important_features=[]
    for i in range (0,data.shape[0]):
        important_features.append(data['Movie Name'][i]+' '+data['Director'][i]+' '+data['Genre'][i]+' '+data['Description'][i])
    return important_features

#creating a column to hold the combined strings
data['important_features'] = get_important_features(data)
data.head()
```

```python colab={"base_uri": "https://localhost:8080/"} id="PFaRcjqXsw-G" executionInfo={"status": "ok", "timestamp": 1630019028049, "user_tz": -330, "elapsed": 5, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="9d686d3a-75b8-4a3e-90b5-cdb0cfb1dcb4"
tfidf = TfidfVectorizer(stop_words='english')
#data['Description'] = data['Description'].fillna('')
tfidf_matrix = tfidf.fit_transform(data['important_features'])
tfidf_matrix.shape
```

```python id="TrUd15_ss0GK" executionInfo={"status": "ok", "timestamp": 1630019028859, "user_tz": -330, "elapsed": 5, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}}
cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

indices = pd.Series(data.index, index=data['Movie Name']).drop_duplicates()
#indices['Stillwater']
#sim_scores = list(enumerate(cosine_sim[indices['Stillwater']]))
```

```python id="W24iL9Fhs8R4" executionInfo={"status": "ok", "timestamp": 1630019029543, "user_tz": -330, "elapsed": 3, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}}
def get_recommendations(title, cosine_sim=cosine_sim):
    idx = indices[title]
    # Get the pairwsie similarity scores of all movies with that movie
    sim_scores = list(enumerate(cosine_sim[idx]))
    # Sort the movies based on the similarity score
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:6]
    movie_indices = [i[0] for i in sim_scores]
    # Return the top 5 most similar movies
    movies=data['Movie Name'].iloc[movie_indices]
    id=data['movie_id'].iloc[movie_indices]
    dict={"Movies":movies,"id":id}
    final_df=pd.DataFrame(dict)
    final_df.reset_index(drop=True,inplace=True)
    return final_df
```

```python colab={"base_uri": "https://localhost:8080/", "height": 204} id="-bYfnUiIs_WT" executionInfo={"status": "ok", "timestamp": 1630019030163, "user_tz": -330, "elapsed": 9, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="4d57a25e-9ec5-4818-bea7-83e05c899b09"
get_recommendations('Spider-Man: Far from Home')
```

```python colab={"base_uri": "https://localhost:8080/", "height": 204} id="QTDi3hDrtAnF" executionInfo={"status": "ok", "timestamp": 1630019037275, "user_tz": -330, "elapsed": 724, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="87386069-820d-4e2b-ccda-3375496beaec"
get_recommendations('Stillwater')
```

```python id="67x4JXXDrOMS" executionInfo={"status": "ok", "timestamp": 1630019177624, "user_tz": -330, "elapsed": 3114, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}}
pickle.dump(data, open('./artifacts/imdb_movie_list.pkl','wb'))
pickle.dump(cosine_sim, open('./artifacts/imdb_cosine_similarity.pkl','wb'))
```

<!-- #region id="oICbvFPTtl4f" -->
## Creating a frontend streamlit app for model serving
<!-- #endregion -->

```python id="_EzPxs2zu9l8" executionInfo={"status": "ok", "timestamp": 1630019519735, "user_tz": -330, "elapsed": 12, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}}
!mkdir -p ./apps
```

```python colab={"base_uri": "https://localhost:8080/"} id="otbXLcBntvDd" executionInfo={"status": "ok", "timestamp": 1630019546388, "user_tz": -330, "elapsed": 630, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="c1599731-f11c-4260-de32-af1e0ac85f83"
%%writefile ./apps/imdb_streamlit.py
import pickle
import streamlit as st

def recommend(movie):
    index = movies[movies['Movie Name'] == movie].index[0]
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    recommended_movie_names = []
    for i in distances[1:6]:
        recommended_movie_names.append(movies.iloc[i[0]]['Movie Name'])

    return recommended_movie_names

page_bg_img = '''
<style>
.stApp {
  background-image: url("https://payload.cargocollective.com/1/11/367710/13568488/MOVIECLASSICSerikweb_2500_800.jpg");
  background-size: cover;
}
</style>
'''

# st.markdown(page_bg_img, unsafe_allow_html=True)
# st.markdown(unsafe_allow_html=True)


st.header('Movie Recommendation System')
movies = pickle.load(open('./artifacts/imdb_movie_list.pkl','rb'))
similarity = pickle.load(open('./artifacts/imdb_cosine_similarity.pkl','rb'))

movie_list = movies['Movie Name'].values
selected_movie = st.selectbox(
    "Type or select a movie from the dropdown",
    movie_list
)


if st.button('Show Recommendation'):
    recommended_movie_names = recommend(selected_movie)
    for i in recommended_movie_names:
        st.write(i)
```

<!-- #region id="clc4K2TIw1bp" -->
Local testing
<!-- #endregion -->

```python id="AJ4EkzVGvoId"
!pip install -q streamlit
!pip install -q colab-everything
```

```python id="jpMhhQ7PvkPh" executionInfo={"status": "ok", "timestamp": 1630019706726, "user_tz": -330, "elapsed": 1910, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}}
import streamlit as st
from colab_everything import ColabStreamlit
```

```python colab={"base_uri": "https://localhost:8080/", "height": 1000} id="lCSgNM1tvI0R" executionInfo={"status": "error", "timestamp": 1630019989121, "user_tz": -330, "elapsed": 278401, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="c5503baf-1d86-4231-b725-2c358f6c9436"
ColabStreamlit('./apps/imdb_streamlit.py')
```

<!-- #region id="EnoUKmVpwvkd" -->
![image.png](data:image/png;base64,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)
<!-- #endregion -->

<!-- #region id="PhdjDsYkvuai" -->
## Packaging
<!-- #endregion -->

<!-- #region id="fYf7eNnpxI9A" -->
Dockerization
<!-- #endregion -->

```python id="9YWo4vz9xU2q" executionInfo={"status": "ok", "timestamp": 1630020493281, "user_tz": -330, "elapsed": 732, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}}
!mkdir -p ./apps/imdb/v1_1/artifacts
!cp ./artifacts/imdb_cosine_similarity.pkl ./apps/imdb/v1_1/artifacts
!cp ./artifacts/imdb_movie_list.pkl ./apps/imdb/v1_1/artifacts
```

```python colab={"base_uri": "https://localhost:8080/"} id="epfyVmPzy8Ta" executionInfo={"status": "ok", "timestamp": 1630020580540, "user_tz": -330, "elapsed": 738, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="9eb0c2c3-835d-4a7b-d967-502f3711595e"
%%writefile ./apps/imdb/v1_1/requirements.txt
Jinja2==2.11.3
jinja2-time==0.2.0
joblib==1.0.1
matplotlib-inline==0.1.2
numpy==1.19.1
numpydoc==1.1.0
pandas==1.1.3
pickleshare==0.7.5
Pillow==8.3.1
pip==21.0.1
ptyprocess==0.7.0
pyaml==19.4.1
PyYAML==5.4.1
requests==2.25.1
requests-aws4auth==0.9
scikit-learn==0.24.2
scipy==1.7.1
streamlit==0.81.1
urllib3==1.26.6
xlrd==1.2.0
yapf==0.31.0
zipp==3.5.0
```

```python colab={"base_uri": "https://localhost:8080/"} id="mKq2OR5fxmhU" executionInfo={"status": "ok", "timestamp": 1630020502808, "user_tz": -330, "elapsed": 917, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="bcb25402-7f03-43bc-c12c-dc61c4dc9934"
%%writefile ./apps/imdb/v1_1/app.py
import pickle
import streamlit as st

def recommend(movie):
    index = movies[movies['Movie Name'] == movie].index[0]
    distances = sorted(list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    recommended_movie_names = []
    for i in distances[1:6]:
        recommended_movie_names.append(movies.iloc[i[0]]['Movie Name'])

    return recommended_movie_names


st.header('Movie Recommendation System')
movies = pickle.load(open('./artifacts/imdb_movie_list.pkl','rb'))
similarity = pickle.load(open('./artifacts/imdb_cosine_similarity.pkl','rb'))

movie_list = movies['Movie Name'].values
selected_movie = st.selectbox(
    "Type or select a movie from the dropdown",
    movie_list
)


if st.button('Show Recommendation'):
    recommended_movie_names = recommend(selected_movie)
    for i in recommended_movie_names:
        st.write(i)
```

```python colab={"base_uri": "https://localhost:8080/"} id="xJjPYBUcxL2z" executionInfo={"status": "ok", "timestamp": 1630020639101, "user_tz": -330, "elapsed": 9, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="a669c0ee-263b-4777-84ad-49f99b07ef97"
%%writefile ./apps/imdb/v1_1/Dockerfile
  
# lightweight python
FROM python:3.7-slim

RUN apt-get update

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . ./

RUN ls -la $APP_HOME/

# Install dependencies
RUN pip install -r requirements.txt

# Run the streamlit on container startup
CMD [ "streamlit", "run","--server.enableCORS","false","app.py" ]
```

```python colab={"base_uri": "https://localhost:8080/"} id="5BrbgQizzFRz" executionInfo={"status": "ok", "timestamp": 1630020757578, "user_tz": -330, "elapsed": 1028, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="34bb4b0d-0ec2-4b97-a76f-0e8f4bcb6111"
%%writefile ./apps/imdb/v1_1/deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: movierecommendation
spec:
  replicas: 1
  selector:
    matchLabels:
      app: movie
  template:
    metadata:
      labels:
        app: movie
    spec:
      containers:
      - name: mveimdb
        image: sparshai/mveimdb
        ports:
        - containerPort: 8501
```

```python colab={"base_uri": "https://localhost:8080/"} id="onJa-7khzuAR" executionInfo={"status": "ok", "timestamp": 1630020787245, "user_tz": -330, "elapsed": 778, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "", "userId": "13037694610922482904"}} outputId="90dfc039-51ec-4fe9-8319-11454facb930"
%%writefile ./apps/imdb/v1_1/service.yaml
apiVersion: v1
kind: Service
metadata:
  name: movie
spec:
  type: LoadBalancer
  selector:
    app: movie
  ports:
  - port: 80
    targetPort: 8501
```

<!-- #region id="j1cMjK9j11Yc" -->
## Deployment
<!-- #endregion -->

<!-- #region id="PVaQkEo212nj" -->
Commands
<!-- #endregion -->

```python id="QSi2Iyo8146G"
!docker build -t mveimdb .
!docker tag mveimdb:latest sparshai/mveimdb:latest
!docker push sparshai/mveimdb

!kubectl apply -f deployment.yaml
!kubectl apply -f service.yaml

!kubectl describe pods
!kubectl get services
```
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

<!-- #region id="V9SYHOEILWHU" -->
# Amazon Personalize POC in a box
> In this workshop you will build your very own recommendation model that will recommend movies to users based on their past preferences. You will further improve the recommendation model to take into account a user’s interactions with movie items to provide accurate recommendations. This workshop will use the publicly available movie lens dataset.

- toc: true
- badges: false
- comments: true
- categories: [Amazon Personalize]
- image:
<!-- #endregion -->

<!-- #region id="akDs3c4iOWM0" -->
## Introduction
<!-- #endregion -->

<!-- #region id="HTirS0ajOWKQ" -->
### What you'll learn?

In this workshop you will build your very own recommendation model that will recommend movies to users based on their past preferences. You will further improve the recommendation model to take into account a user’s interactions with movie items to provide accurate recommendations. This workshop will use the publicly available movie lens dataset.

### Why is this important?

Amazon Personalize is an advanced tool for building recommender systems, that supports AutoML and Real-time.

### How it will work?

1. Setup the environment using CloudFormation template
2. Open the SageMaker Jupyter Lab instance
3. Extract, Transform & Load
4. Train the recommender model and build the campaign
5. Evaluate solution versions
6. Deploy campaigns
7. Create filters
8. Interact with the campaigns
9. Clean the environment by deleting all the resources

### Who is this for?

- People who are new in deep learning
- People looking to use tensorflow keras to build deep recommender models

### Important resources

- [Notebooks](https://nbviewer.jupyter.org/github/recohut/reco-amazon-personalize/tree/master/next_steps/workshops/POC_in_a_box/completed/)

<!---------------------------->

## Setup the environment with CloudFormation

The first step is to deploy a CloudFormation template that will perform much of the initial setup work for you. In another browser window or tab, log in to your AWS account. Once you have done that, open [this](https://console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/template?stackName=PersonalizePOC&templateURL=https://chriskingpartnershare.s3.amazonaws.com/PersonalizePOC.yaml) link in a new tab to start the process of deploying the items you need via CloudFormation.

<!---------------------------->

## ETL for Interaction data

### Extract

Download from official MovieLens source. The head will look like this:
<!-- #endregion -->

<!-- #region id="_gSEIE3POWHv" -->
![image.png](data:image/png;base64,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)
<!-- #endregion -->

<!-- #region id="xxvCrQ7tOWFX" -->
### Transform

**Convert the datetime format**

The int64 format is clearly suitable for userId and movieId. However, we need to dive deeper to understand the timestamps in the data. To use Amazon Personalize, you need to save timestamps in Unix Epoch format. We will use the below python code to transform:

```python
print(arb_time_stamp)
print(datetime.utcfromtimestamp(arb_time_stamp).strftime('%Y-%m-%d %H:%M:%S'))

Output::
964982681.0
2000-07-30 18:44:41
```

**Convert explicit to implicit**

Our dataset has an additional column, rating, which can be dropped from the dataset after we have leveraged it to focus on positive interactions. Since this is an explicit feedback movie rating dataset, it includes movies rated from 1 to 5, we want to include only moves that weree "liked" by the users, and simulate a implicit dataset that is more like what data would be gathered by a VOD platform. For that so we will filter out all interactions under 2 out of 5, and create an EVENT_Type of "click" and an EVENT_Type of "watch". We will then assign all movies rated 2 and above as "click" and movies above 4 and above as "click" and "watch".

```python
watched_df = original_data.copy()
watched_df = watched_df[watched_df['rating'] > 3]
watched_df = watched_df[['userId', 'movieId', 'timestamp']]
watched_df['EVENT_TYPE']='watch'

clicked_df = original_data.copy()
clicked_df = clicked_df[clicked_df['rating'] > 1]
clicked_df = clicked_df[['userId', 'movieId', 'timestamp']]
clicked_df['EVENT_TYPE']='click'
```

**Change column names**

Amazon Personalize has default column names for users, items, and timestamp. These default column names are USER_ID, ITEM_ID, AND TIMESTAMP.

```python
interactions_df.rename(columns = {'userId':'USER_ID', 'movieId':'ITEM_ID', 
                              'timestamp':'TIMESTAMP'}, inplace = True)
```

**Create the dataset group**

The highest level of isolation and abstraction with Amazon Personalize is a dataset group. Information stored within one of these dataset groups has no impact on any other dataset group or models created from one - they are completely isolated. The following cell will create a new dataset group with the name `personalize-poc-movielens`.

```python
create_dataset_group_response = personalize.create_dataset_group(name="personalize-poc-movielens")
```

**Create the dataset**

First, define a schema to tell Amazon Personalize what type of dataset you are uploading. There are several reserved and mandatory keywords required in the schema, based on the type of dataset.

```python
interactions_schema = schema = {
    "type": "record",
    "name": "Interactions",
    "namespace": "com.amazonaws.personalize.schema",
    "fields": [
        {
            "name": "USER_ID",
            "type": "string"
        },
        {
            "name": "ITEM_ID",
            "type": "string"
        },
        {
            "name": "EVENT_TYPE",
            "type": "string"
        },
        {
            "name": "TIMESTAMP",
            "type": "long"
        }
    ],
    "version": "1.0"
}

create_schema_response = personalize.create_schema(
    name = "personalize-poc-movielens-interactions",
    schema = json.dumps(interactions_schema)
)
```

With a schema created, you can create a dataset within the dataset group.

```python
dataset_type = "INTERACTIONS"
create_dataset_response = personalize.create_dataset(
    name = "personalize-poc-movielens-ints",
    datasetType = dataset_type,
    datasetGroupArn = dataset_group_arn,
    schemaArn = interaction_schema_arn
)
```

### Load

So far, we have downloaded, manipulated, and saved the data onto the Amazon EBS instance attached to the instance running this Jupyter notebook. However, Amazon Personalize will need an S3 bucket to act as the source of your data, as well as IAM roles for accessing that bucket. 

```python
s3 = boto3.client('s3')
account_id = boto3.client('sts').get_caller_identity().get('Account')
bucket_name = account_id + "-" + region + "-" + "personalizepocvod"
print(bucket_name)
if region == "us-east-1":
    s3.create_bucket(Bucket=bucket_name)
else:
    s3.create_bucket(
        Bucket=bucket_name,
        CreateBucketConfiguration={'LocationConstraint': region}
        )
```

Now that your Amazon S3 bucket has been created, upload the CSV file of our user-item-interaction data.

```python
interactions_file_path = data_dir + "/" + interactions_filename
boto3.Session().resource('s3').Bucket(bucket_name).Object(interactions_filename).upload_file(interactions_file_path)
interactions_s3DataPath = "s3://"+bucket_name+"/"+interactions_filename
```

<!---------------------------->

## ETL for Item metadata

Duration: 10

### Extract

Download from official MovieLens source. The head will look like this:
<!-- #endregion -->

<!-- #region id="33lzxkKqOWDJ" -->
![image.png](data:image/png;base64,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)
<!-- #endregion -->

<!-- #region id="kKEa6luvOWBT" -->
### Transform

**Create the movie release year column**

The title includes the year of the movies release. Let's make that another column of metadata:

```python
original_data['year'] =original_data['title'].str.extract('.*\((.*)\).*',expand = False)
```

**Remove the title column**

From an item metadata perspective, we only want to include information that is relevant to training a model and/or filtering resulte, so we will drop the title, retaining the genre information.

**Changing column names**

Amazon Personalize has a default column for ITEM_ID that will map to our movieId, and now we can flesh out more information by specifying GENRE as well.

```python
itemmetadata_df.rename(columns = {'genres':'GENRE', 'movieId':'ITEM_ID', 'year':'YEAR'}, inplace = True)
```

**Creating the dataset and loading to S3**

```python
itemmetadata_schema = {
    "type": "record",
    "name": "Items",
    "namespace": "com.amazonaws.personalize.schema",
    "fields": [
        {
            "name": "ITEM_ID",
            "type": "string"
        },
        {
            "name": "GENRE",
            "type": "string",
            "categorical": True
        },{
            "name": "YEAR",
            "type": "int",
        },
        
    ],
    "version": "1.0"
}

create_schema_response = personalize.create_schema(
    name = "personalize-poc-movielens-item",
    schema = json.dumps(itemmetadata_schema)
)
```

```python
dataset_type = "ITEMS"
create_dataset_response = personalize.create_dataset(
    name = "personalize-poc-movielens-items",
    datasetType = dataset_type,
    datasetGroupArn = dataset_group_arn,
    schemaArn = itemmetadataschema_arn
)
```

```python
itemmetadata_file_path = data_dir + "/" + itemmetadata_filename
boto3.Session().resource('s3').Bucket(bucket_name).Object(itemmetadata_filename).upload_file(itemmetadata_file_path)
interactions_s3DataPath = "s3://"+bucket_name+"/"+itemmetadata_filename
```

<!---------------------------->

## Import the dataset

Duration: 5

Earlier you created the dataset group and dataset to house your information, so now you will execute an import job that will load the data from the S3 bucket into the Amazon Personalize dataset.

### Import interaction dataset

```python
create_dataset_import_job_response = personalize.create_dataset_import_job(
    jobName = "personalize-poc-import1",
    datasetArn = interactions_dataset_arn,
    dataSource = {
        "dataLocation": "s3://{}/{}".format(bucket_name, interactions_filename)
    },
    roleArn = role_arn
)
```

### Import item meta dataset

```python
create_dataset_import_job_response = personalize.create_dataset_import_job(
    jobName = "personalize-poc-item-import1",
    datasetArn = items_dataset_arn,
    dataSource = {
        "dataLocation": "s3://{}/{}".format(bucket_name, itemmetadata_filename)
    },
    roleArn = role_arn
)
```

<!---------------------------->

## Create the solution

Duration: 10

We will build 3 solutons:

1. User Personalization - what items are most relevant to a specific user.
2. Similar Items - given an item, what items are similar to it.
3. Personalized Ranking - given a user and a collection of items, in what order are they most releveant.

### User Personalization

The User-Personalization (aws-user-personalization) recipe is optimized for all USER_PERSONALIZATION recommendation scenarios. When recommending items, it uses automatic item exploration.

With automatic exploration, Amazon Personalize automatically tests different item recommendations, learns from how users interact with these recommended items, and boosts recommendations for items that drive better engagement and conversion. This improves item discovery and engagement when you have a fast-changing catalog, or when new items, such as news articles or promotions, are more relevant to users when fresh.

You can balance how much to explore (where items with less interactions data or relevance are recommended more frequently) against how much to exploit (where recommendations are based on what we know or relevance). Amazon Personalize automatically adjusts future recommendations based on implicit user feedback.

```python
# create the solution
user_personalization_create_solution_response = personalize.create_solution(
    name = "personalize-poc-userpersonalization",
    datasetGroupArn = dataset_group_arn,
    recipeArn = user_personalization_recipe_arn
)
user_personalization_solution_arn = user_personalization_create_solution_response['solutionArn']

# create the solution version
userpersonalization_create_solution_version_response = personalize.create_solution_version(
    solutionArn = user_personalization_solution_arn
)
userpersonalization_solution_version_arn = userpersonalization_create_solution_version_response['solutionVersionArn']
```

### S**IMS**

SIMS is one of the oldest algorithms used within Amazon for recommendation systems. A core use case for it is when you have one item and you want to recommend items that have been interacted with in similar ways over your entire user base. This means the result is not personalized per user. Sometimes this leads to recommending mostly popular items, so there is a hyperparameter that can be tweaked which will reduce the popular items in your results.

For our use case, using the Movielens data, let's assume we pick a particular movie. We can then use SIMS to recommend other movies based on the interaction behavior of the entire user base. The results are not personalized per user, but instead, differ depending on the movie we chose as our input.

```python
# create the solution
sims_create_solution_response = personalize.create_solution(
    name = "personalize-poc-sims",
    datasetGroupArn = dataset_group_arn,
    recipeArn = SIMS_recipe_arn
)
sims_solution_arn = sims_create_solution_response['solutionArn']

# create the solution version
sims_create_solution_version_response = personalize.create_solution_version(
    solutionArn = sims_solution_arn
)
sims_solution_version_arn = sims_create_solution_version_response['solutionVersionArn']
```

### Personalized Ranking

Personalized Ranking is an interesting application of HRNN. Instead of just recommending what is most probable for the user in question, this algorithm takes in a user and a list of items as well. The items are then rendered back in the order of most probable relevance for the user. The use case here is for filtering on unique categories that you do not have item metadata to create a filter, or when you have a broad collection that you would like better ordered for a particular user.

For our use case, using the MovieLens data, we could imagine that a VOD application may want to create a shelf of comic book movies, or movies by a specific director. We most likely have these lists based title metadata we have. We would use personalized ranking to re-order the list of movies for each user, based on their previous tagging history.

```python
# create the solution
rerank_create_solution_response = personalize.create_solution(
    name = "personalize-poc-rerank",
    datasetGroupArn = dataset_group_arn,
    recipeArn = rerank_recipe_arn
)
rerank_solution_arn = rerank_create_solution_response['solutionArn']

# create the solution version
rerank_create_solution_version_response = personalize.create_solution_version(
    solutionArn = rerank_solution_arn
)
rerank_solution_version_arn = rerank_create_solution_version_response['solutionVersionArn']
```

<!---------------------------->

## Hyperparameter tuning

Duration: 5

Personalize offers the option of running hyperparameter tuning when creating a solution. Because of the additional computation required to perform hyperparameter tuning, this feature is turned off by default. Therefore, the solutions we created above, will simply use the default values of the hyperparameters for each recipe. For more information about hyperparameter tuning, see the [documentation](https://docs.aws.amazon.com/personalize/latest/dg/customizing-solution-config-hpo.html).

If you have settled on the correct recipe to use, and are ready to run hyperparameter tuning, the following code shows how you would do so, using SIMS as an example.

```python
sims_create_solution_response = personalize.create_solution(
    name = "personalize-poc-sims-hpo",
    datasetGroupArn = dataset_group_arn,
    recipeArn = SIMS_recipe_arn,
    performHPO=True
)

sims_solution_arn = sims_create_solution_response['solutionArn']
print(json.dumps(sims_create_solution_response, indent=2))
```

If you already know the values you want to use for a specific hyperparameter, you can also set this value when you create the solution. The code below shows how you could set the value for the `popularity_discount_factor` for the SIMS recipe.

```python
sims_create_solution_response = personalize.create_solution(
    name = "personalize-poc-sims-set-hp",
    datasetGroupArn = dataset_group_arn,
    recipeArn = SIMS_recipe_arn,
    solutionConfig = {
        'algorithmHyperParameters': {
            'popularity_discount_factor': '0.7'
        }
    }
)

sims_solution_arn = sims_create_solution_response['solutionArn']
print(json.dumps(sims_create_solution_response, indent=2))
```

<!---------------------------->

## Evaluating solution versions

Duration: 10

Let's take a look at the evaluation metrics for each of the solutions produced.

### Evaluation of User Personalization solution

```python
user_personalization_solution_metrics_response = personalize.get_solution_metrics(
    solutionVersionArn = userpersonalization_solution_version_arn
)

print(json.dumps(user_personalization_solution_metrics_response, indent=2))
```

```json
{
  "solutionVersionArn": "arn:aws:personalize:us-east-1:136455442858:solution/personalize-poc-userpersonalization/236f000b",
  "metrics": {
    "coverage": 0.0791,
    "mean_reciprocal_rank_at_25": 0.269,
    "normalized_discounted_cumulative_gain_at_10": 0.2687,
    "normalized_discounted_cumulative_gain_at_25": 0.3321,
    "normalized_discounted_cumulative_gain_at_5": 0.2279,
    "precision_at_10": 0.0571,
    "precision_at_25": 0.0379,
    "precision_at_5": 0.075
  },
  "ResponseMetadata": {
    "RequestId": "fa6f0e49-b87d-48ce-ab27-80e61a1ab395",
    "HTTPStatusCode": 200,
    "HTTPHeaders": {
      "content-type": "application/x-amz-json-1.1",
      "date": "Thu, 17 Sep 2020 00:41:11 GMT",
      "x-amzn-requestid": "fa6f0e49-b87d-48ce-ab27-80e61a1ab395",
      "content-length": "417",
      "connection": "keep-alive"
    },
    "RetryAttempts": 0
  }
}
```

The normalized discounted cumulative gain above tells us that at 5 items, we have less than a (38% for full 22% for small) chance in a recommendation being a part of a user's interaction history (in the hold out phase from training and validation). Around 13% of the recommended items are unique, and we have a precision of only (14% for full, 7.5% for small) in the top 5 recommended items.

This is clearly not a great model, but keep in mind that we had to use rating data for our interactions because Movielens is an explicit dataset based on ratings. The Timestamps also were from the time that the movie was rated, not watched, so the order is not the same as the order a viewer would watch movies.

### Evaluation of SIMS solution

```python
sims_solution_metrics_response = personalize.get_solution_metrics(
    solutionVersionArn = sims_solution_version_arn
)

print(json.dumps(sims_solution_metrics_response, indent=2))
```

```json
{
  "solutionVersionArn": "arn:aws:personalize:us-east-1:136455442858:solution/personalize-poc-sims/c1a33236",
  "metrics": {
    "coverage": 0.1861,
    "mean_reciprocal_rank_at_25": 0.1669,
    "normalized_discounted_cumulative_gain_at_10": 0.2234,
    "normalized_discounted_cumulative_gain_at_25": 0.2895,
    "normalized_discounted_cumulative_gain_at_5": 0.1889,
    "precision_at_10": 0.0588,
    "precision_at_25": 0.0418,
    "precision_at_5": 0.0824
  },
  "ResponseMetadata": {
    "RequestId": "662598d1-86f0-49a1-98a9-1c3924882f4b",
    "HTTPStatusCode": 200,
    "HTTPHeaders": {
      "content-type": "application/x-amz-json-1.1",
      "date": "Thu, 17 Sep 2020 00:41:11 GMT",
      "x-amzn-requestid": "662598d1-86f0-49a1-98a9-1c3924882f4b",
      "content-length": "404",
      "connection": "keep-alive"
    },
    "RetryAttempts": 0
  }
}
```

In this example we are seeing a slightly elevated precision at 5 items, a little over (4.5% for full, 6.4% for small) this time. Effectively this is probably within the margin of error, but given that no effort was made to mask popularity, it may just be returning super popular results that a large volume of users have interacted with in some way.

### Evaluation of Personalized Ranking solution

```python
rerank_solution_metrics_response = personalize.get_solution_metrics(
    solutionVersionArn = rerank_solution_version_arn
)

print(json.dumps(rerank_solution_metrics_response, indent=2))
```

```json
{
  "solutionVersionArn": "arn:aws:personalize:us-east-1:136455442858:solution/personalize-poc-rerank/eae37049",
  "metrics": {
    "coverage": 0.0038,
    "mean_reciprocal_rank_at_25": 0.0537,
    "normalized_discounted_cumulative_gain_at_10": 0.0707,
    "normalized_discounted_cumulative_gain_at_25": 0.0956,
    "normalized_discounted_cumulative_gain_at_5": 0.0578,
    "precision_at_10": 0.0132,
    "precision_at_25": 0.0113,
    "precision_at_5": 0.0189
  },
  "ResponseMetadata": {
    "RequestId": "01f86e05-9408-4456-97d3-2548d2cc998e",
    "HTTPStatusCode": 200,
    "HTTPHeaders": {
      "content-type": "application/x-amz-json-1.1",
      "date": "Thu, 17 Sep 2020 00:41:11 GMT",
      "x-amzn-requestid": "01f86e05-9408-4456-97d3-2548d2cc998e",
      "content-length": "406",
      "connection": "keep-alive"
    },
    "RetryAttempts": 0
  }
}
```

Just a quick comment on this one, here we see again a precision of near (2.7% for full, 2.2% for small), as this is based on User Personalization, that is to be expected. However the sample items are not the same for validaiton, thus the low scoring.

<!---------------------------->

## Deploying campaigns

Duration: 5

At this point, you should have several solutions and at least one solution version for each. Once a solution version is created, it is possible to get recommendations from them, and to get a feel for their overall behavior. We will be deploying each of the solution versions into individual campaigns. Once they are active, there are resources for querying the recommendations, and helper functions to digest the output into something more human-readable.

### Deploy User Personalization campaign

```python
userpersonalization_create_campaign_response = personalize.create_campaign(
    name = "personalize-poc-userpersonalization",
    solutionVersionArn = userpersonalization_solution_version_arn,
    minProvisionedTPS = 1
)

userpersonalization_campaign_arn = userpersonalization_create_campaign_response['campaignArn']
```

### Deploy SIMS campaign

```python
sims_create_campaign_response = personalize.create_campaign(
    name = "personalize-poc-SIMS",
    solutionVersionArn = sims_solution_version_arn,
    minProvisionedTPS = 1
)

sims_campaign_arn = sims_create_campaign_response['campaignArn']
```

### Deploy Personalized Ranking campaign

```python
rerank_create_campaign_response = personalize.create_campaign(
    name = "personalize-poc-rerank",
    solutionVersionArn = rerank_solution_version_arn,
    minProvisionedTPS = 1
)

rerank_campaign_arn = rerank_create_campaign_response['campaignArn']
```

<!---------------------------->

## Create filters

Duration: 5

Now that all campaigns are deployed and active, we can create filters. Filters can be created for both Items and Events. A few common use cases for filters in Video On Demand are:

Categorical filters based on Item Metadata - Often your item metadata will have information about thee title such as Genre, Keyword, Year, Decade etc. Filtering on these can provide recommendations within that data, such as action movies.

Events - you may want to filter out certain events and provide results based on those events, such as moving a title from a "suggestions to watch" recommendation to a "watch again" recommendations.

```python
# Create a list for the filters:
meta_filter_arns = []

# Iterate through Genres
for genre in genres_to_filter:
    # Start by creating a filter
    try:
        createfilter_response = personalize.create_filter(
            name=genre,
            datasetGroupArn=dataset_group_arn,
            filterExpression='INCLUDE ItemID WHERE Items.GENRE IN ("'+ genre +'")'
        )
        # Add the ARN to the list
        meta_filter_arns.append(createfilter_response['filterArn'])
        print("Creating: " + createfilter_response['filterArn'])
    
    # If this fails, wait a bit
    except ClientError as error:
        # Here we only care about raising if it isnt the throttling issue
        if error.response['Error']['Code'] != 'LimitExceededException':
            print(error)
        else:    
            time.sleep(120)
            createfilter_response = personalize.create_filter(
                name=genre,
                datasetGroupArn=dataset_group_arn,
                filterExpression='INCLUDE ItemID WHERE Items.GENRE IN ("'+ genre +'")'
            )
            # Add the ARN to the list
            meta_filter_arns.append(createfilter_response['filterArn'])
            print("Creating: " + createfilter_response['filterArn'])
```

Lets also create 2 event filters for watched and unwatched content

```python
createwatchedfilter_response = personalize.create_filter(name='watched',
    datasetGroupArn=dataset_group_arn,
    filterExpression='INCLUDE ItemID WHERE Interactions.event_type IN ("watch")'
    )

createunwatchedfilter_response = personalize.create_filter(name='unwatched',
    datasetGroupArn=dataset_group_arn,
    filterExpression='EXCLUDE ItemID WHERE Interactions.event_type IN ("watch")'
    )

interaction_filter_arns = [createwatchedfilter_response['filterArn'], createunwatchedfilter_response['filterArn']]
```

Finally since we now have the year available in our item metadata, lets create a decade filter to recommend only moviees releaseed in a given decade, for this workshop we will choosee 1970s cinema.

```python
createdecadefilter_response = personalize.create_filter(name='1970s',
    datasetGroupArn=dataset_group_arn,
    filterExpression='INCLUDE ItemID WHERE Items.YEAR >= 1970 AND Items.YEAR < 1980'
    )

decade_filter_arns = [createdecadefilter_response['filterArn']]
```

<!---------------------------->

## Interacting with the campaigns

Duration: 5

SIMS requires just an item as input, and it will return items which users interact with in similar ways to their interaction with the input item. In this particular case the item is a movie.

The cells below will handle getting recommendations from SIMS and rendering the results. Let's see what the recommendations are for the first item we looked at earlier in this notebook (Terminator 2: Judgment Day).

```python
get_recommendations_response = personalize_runtime.get_recommendations(
    campaignArn = sims_campaign_arn,
    itemId = str(589),
)

item_list = get_recommendations_response['itemList']
for item in item_list:
    print(get_movie_by_id(movie_id=item['itemId']))
```

HRNN is one of the more advanced algorithms provided by Amazon Personalize. It supports the personalization of the items for a specific user based on their past behavior and can intake real-time events in order to alter recommendations for a user without retraining.

You can see the recommendations for movies within a given genre. Within a VOD application you could create Shelves (also known as rails or carosels) easily by using these filters. Depending on the information you have about your items, You could also filter on additional information such as keyword, year/decade etc.

```python
recommendations_df_shelves = pd.DataFrame()
for filter_arn in meta_filter_arns:
    recommendations_df_shelves = get_new_recommendations_df_by_filter(recommendations_df_shelves, user, filter_arn)
for filter_arn in decade_filter_arns:
    recommendations_df_shelves = get_new_recommendations_df_by_filter(recommendations_df_shelves, user, filter_arn)

recommendations_df_shelves
```
<!-- #endregion -->

<!-- #region id="lPTJw7LfOV_o" -->
![image.png](data:image/png;base64,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RIAIEAEiQASIABEgAkRggoC8PRsL39owF83ybS9/vtuXq8p33xz7k7nwN/h1jCJzXGhjq/Exi+YxLrxKBIgAESACRIAIEAEiQASIABEgArsgcMROcx4vv26dz6G9FtuTPxvgTjMAxUMiQASIABEgAkSACBABIkAEiAARuC8Epn9TnHeaw7l9qRfuEK8VxvPXtu1XS+KXg23HhzvN27FiSyJABIgAESACRIAIEAEiQASIABE4BQHZIR7tAoci2QTj69m5z7wwtgJ7XBif9+XKLJpPMTj7EAEiQASIABEgAkSACBABIkAEiMARCKy8on2ElFOanvNqtozHovkU1NmHCBABIkAEiAARIAJEgAgQASJABI5DQHaV8eekjut9WusdxmTRfBr07EUEiAARIAJEgAgQASJABIgAESACL4AAi+YXMDKnSASIABEgAkSACBABIkAEiAARIAKnIcCi+TTc2IsIEAEiQASIABEgAkSACBABIkAEXgABFs0vYGROkQgQASJABIgAESACRIAIEAEiQAROQ4BF82m4sRcRIAJEYEcE5GcQ3pfv/zWR4fcHBz/DsOPAFEUEiAARIAJEgAgQASJwAAEWzQcA4m0iQASIABEgAkSACBABIkAEiAAReF0EWDS/ru05cyJABIgAESACRIAIEAEiQASIABE4gACL5gMA8TYRIAJEgAgQASJABIgAESACRIAIvC4CLJpf1/acOREgAkSACBABIkAEiAARIAJEgAgcQIBF8wGAeJsIEAEiQASIABEgAkSACBABIkAEXhcBFs2va3vOnAgQASJABIgAESACRIAIEAEiQAQOIMCi+QBAvE0EiAARIAJEgAgQASJABIgAESACr4sAi+bXtT1nTgSIABEgAkSACBABIkAEiAARIAIHEGDRfAAg3iYCRIAIEAEiQASIABEgAkSACBCB10VgtWj+9evXwn/EgBwgB8gBcoAcIAfIAXKAHCAHyAFy4Jk5sPZIgEUzHwzwwQg5QA6QA+QAOUAOkAPkADlADpADL80BFs10gJd2gGd+Isa58YkvOUAOkAPkADlADpAD5AA5cD4HWDSzaGbRTA6QA+QAOUAOkAPkADlADpAD5AA5MOEAi+YJMHwic/4TGWJIDMkBcoAcIAfIAXKAHCAHyAFy4NE5wKKZRTOfKJED5AA5QA6QA+QAOUAOkAPkADlADkw4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E2NtXUNLnz6PKjfCGptzp/PWQxbNaDAe3yUC4hjDxOQMbfvEci4sF7HzlrzzzAhcgodb8GJCvQWle28Ti7Jrakv+bER7lsht7H56s/OSuNPHZU8iQASIwC0QeNz1kEXzLfjCMY9EYIekIjx5emu7vwc00eKau3wHUHqV2zvw8FiohLeww3Vsd7a/IwRuYctbjHlHkB+ryi0ejN1izGNxYXsiQASIwK4I3GJt2mFMFs27soDCiAARIAJEgAgQASJABIgAESACROCZEGDR/EzW5FyIABEgAkSACBABIkAEiAARIAJEYFcEWDTvCieFEQEiQASIABEgAkSACBABIkAEiMAzIcCi+ZmsybkQASJABIgAESACRIAIEAEiQASIwK4IsGjeFU4KIwJEgAgQASJABIgAESACRIAIEIFnQoBF8zNZk3N5fATk2/3eym9F6++Dym+Hyrc2t9+erpPUtv47wfm36GorHhABIkAEiAARIAJEgAgQASJwBgIsms8Aj12JwO4IlEL4/c9/VbT95JUUzsuy6L1yvFghHdrxp4l2NwcFEgEiQASIABEgAkSACBABFs3kABG4JwRCYbws//75vrz9/rNoKIUyFtCwu5z63dOUqAsRIAJEgAgQASJABIgAEXhkBFg0P7L1qPvzIaDFbyuGp0Xz35/L21trt+jOs+9CPx8snBERIAJEgAgQASJABIgAEbgVAiyab4U8xyUCIwS2Fs2pXXx1eySY14gAESACRIAIEAEiQASIABE4BQEWzaegxj5E4FIIpGJ4utPMv2m+lAUolwgQASJABIgAESACRIAIBARYNAc4eEIEbozA5qLZvxhs8O3ZQQb8HfSS/0b6xnPl8ESACBABIkAEiAARIAJE4AEQYNH8AEaiikSACBABIkAEiAARIAJEgAgQASJwGwRYNN8Gd45KBIgAESACRIAIEAEiQASIABEgAg+AAIvmBzASVSQCRIAIEAEiQASIABEgAkSACBCB2yDAovk2uHNUIkAEiAARIAJEgAgQASJABIgAEXgABFg0P4CRqCIRIAJEgAgQASJABIgAESACRIAI3AYBFs23wZ2jEgEiQASIABEgAkSACBABIkAEiMADIMCi+QGMRBWJABEgAkSACBABIkAEiAARIAJE4DYIsGi+De4clQgQASJABIgAESACRIAIEAEiQAQeAAEWzQ9gJKpI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IbgJQRugDdAGaAO0AdoAbYA2QBugDWzZAJtmNs1smmkDtAHaAG2ANkAboA3QBmgDtAHaAG1gYQNsmhfAbO008B53omgDtAHaAG2ANkAboA3QBmgDtAHawHPYAJtmNs3cUaIN0AZoA7QB2gBtgDZAG6AN0AZoA7SBhQ2waV4Aw12j59g1op6pZ9oAbYA2QBugDdAGaAO0AdoAbWDLBj7cNG9N5D0iQASIABEgAkSACBABIkAEiAARIAKfHYGXz75Aro8IEAEiQASIABEgAkSACBABIkAEiMBHEWDT/FHkOI8IEAEiQASIABEgAkSACBABIkAEPj0CbJo/vYq5QCJABIgAESACRIAIEAEiQASIABH4KAJsmj+KHOcRASJABIgAESACRIAIEAEiQASIwKdHgE3zp1cxF0gEiAARIAJEgAgQASJABIgAESACH0WATfNHkeM8IkAEiAARIAJEgAgQASJABIgAEfj0CLBp/vQq5gKJABEgAkSACBABIkAEiAARIAJE4KMIsGn+KHKcRwSIABEgAkSACBABIkAEnhSB//71unt5eWn/Xv/6b0NC73371c4/cvDr28sOae7+82P3+jK79rr78Z+PcOAcInA4AmyaD8eKI4kAESACRIAIEAEiQASIwNMjYA3z+663xb9279DQnqNpHmj8ft+9fH3dvX79sWvtuV6D86fXDAG4FAJsmi+FLOkSASJABIgAESACRIAIEIFPiIA8BX4pT5K1yZWGVhrZeAIdY/Day8vu/beBok+Tv9oT6/RUWW7rk+XemMvY99/SnPcny8Iz5in/4AtjBh7+xNpkzLTqmj6h6rikDyLApvmDwHEaESACRIAIEAEiQASIABF4SgSiCcanvgBEekqsTWppTn2eNt8LGrvdf3c/vsa8fmzNszCTa96Aqzy5wY4GOPOAOUJC5kVjD/LzkAhUBNg0V0R4TgSIABEgAkSACBABIkAEiMAeBKwBbU+VoflNTXOlIo0qNs0bTas+JZa/lZbGO+i3RleeOvdGGdkgf22aG4/SNOMkHhOBDQTYNG+Aw1tEgAgQASJABIgAESACRIAI7EcAm1NsWmWm3muvTr+kpjler55yiAb593t7Dbs10NhI+1Pn1sALL2+UW+PdGNjfX9vYedPdhvKACDgCbJppCkSACBABIkAEiAARIAJEgAgciIA8rY3XpmEKPEFO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)
<!-- #endregion -->

<!-- #region id="kGRU1irAN_er" -->
## Cleaning up

Duration: 5

### Clean up campiagns

Start by cleaning up the campaigns. You need to delete campaigns before you can delete the solution versions upon which they are based.

The code below will delete the Campaigns you created.

```python
personalize.delete_campaign(
    campaignArn = userpersonalization_campaign_arn
)
personalize.delete_campaign(
    campaignArn = sims_campaign_arn
)
personalize.delete_campaign(
    campaignArn = rerank_campaign_arn
)
```

### **Clean up event trackers**

Next, clean up any event trackers. The code below will delete your event tracker.

```python
personalize.delete_event_tracker(
    eventTrackerArn = event_tracker_arn
)
```

### **Clean up Filters**

Next, clean up any filters. The code below iterate over all filters you created and delete them. Note, if you get an error about a campaign, that is fine, wait for 2 minutes then try the cell below again.

Note: You will not be able to delete the filters until the campaign deletion completes, which may take a few minutes

```python
**for** filter_arn **in** meta_filter_arns:
    personalize.delete_filter(
        filterArn = filter_arn
    )
**for** filter_arn **in** interaction_filter_arns:
    personalize.delete_filter(
        filterArn = filter_arn
    )
**for** filter_arn **in** decade_filter_arns:
    personalize.delete_filter(
        filterArn = filter_arn
    )
```

### **Clean up solutions**

Next, clean up the solutions. The code below will delete the solutions that were created.

```python
personalize.delete_solution(
    solutionArn = user_personalization_solution_arn
)
personalize.delete_solution(
    solutionArn = sims_solution_arn
)
personalize.delete_solution(
    solutionArn = rerank_solution_arn
)
```

### **Clean up datasets**

Next, clean up the datasets. The code below will delete the item and interactions datasets.

```python
personalize.delete_dataset(
    datasetArn = items_dataset_arn
)
personalize.delete_dataset(
    datasetArn = interactions_dataset_arn
)
```

### **Clean up the schemas**

Next, clean up the schemas. You create an interaction and item schema, delete them.

```python
personalize.delete_schema(
    schemaArn = interaction_schema_arn
)
personalize.delete_schema(
    schemaArn = itemmetadataschema_arn
)
```

### **Clean up the dataset groups**

Finally, clean up the dataset group:

```python
personalize.delete_dataset_group(
    datasetGroupArn = dataset_group_arn
)
```

### **Clean up the S3 bucket and IAM role**

Start by deleting the role, then empty the bucket, then delete the bucket.

```python
iam = boto3.client('iam')
```

Identify the name of the role you want to delete.

You cannot delete an IAM role which still has policies attached to it. So after you have identified the relevant role, let's list the attached policies of that role.

```python
iam.list_attached_role_policies(
    RoleName = role_name
)
```

You need to detach the policies in the result above using the code below. Repeat for each attached policy.

```python
iam.detach_role_policy(
    RoleName = role_name,
    PolicyArn = "arn:aws:iam::aws:policy/service-role/AmazonPersonalizeFullAccess"
)
```

```python
iam.detach_role_policy(
    RoleName = role_name,
    PolicyArn = 'arn:aws:iam::aws:policy/AmazonS3FullAccess'
)
```

Finally, you should be able to delete the IAM role.

```python
iam.delete_role(
    RoleName = role_name
)
```

To delete an S3 bucket, it first needs to be empty. The easiest way to delete an S3 bucket, is just to navigate to S3 in the AWS console, delete the objects in the bucket, and then delete the S3 bucket itself.

<!---------------------------->

## Conclusion

Duration: 2

Congratulations!

### What we've covered

1. Setup the environment using CloudFormation template
2. Open the SageMaker Jupyter Lab instance
3. Extract, Transform & Load
4. Train the recommender model and build the campaign
5. Evaluate solution versions
6. Deploy campaigns
7. Create filters
8. Interact with the campaigns
9. Clean the environment by deleting all the resources

### Links and References

1. [https://github.com/aws-samples/amazon-personalize-samples/tree/master/next_steps/workshops/POC_in_a_box](https://github.com/aws-samples/amazon-personalize-samples/tree/master/next_steps/workshops/POC_in_a_box)
2. [https://github.com/apac-ml-tfc/personalize-poc](https://github.com/apac-ml-tfc/personalize-poc)
3. [https://github.com/lmorri/vodpocinabox](https://github.com/lmorri/vodpocinabox)
<!-- #endregion -->
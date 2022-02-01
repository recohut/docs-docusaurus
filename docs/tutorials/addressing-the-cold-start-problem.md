# Addressing the Cold-Start Problem

![/img/content-tutorials-raw-addressing-the-cold-start-problem-untitled.png](/img/content-tutorials-raw-addressing-the-cold-start-problem-untitled.png)

## Introduction

One long-standing challenge for Collaborative Filtering (CF) based recommendation methods is the cold start problem, i.e., to provide recommendations for new users or items who have no historical interaction record. The cold start problem is common in real world applications. For example, 500 hours of new videos are uploaded to YouTube every minute, 500,000 new users register in Facebook every day, and web/mobile apps face the daily challenge of onboarding new users and subscribers. To provide recommendations for these new users and items, many content-based methods and heuristic methods have been deployed, e.g., recommending popular items or geographically near items. However, recent research efforts that tackle the cold start problem from the perspective of machine learning have made promising strides.

Cold start happens when new users or new items arrive in e-commerce platforms. Classic recommender systems like collaborative filtering assumes that each user or item has some ratings so that we can infer ratings of similar users/items even if those ratings are unavailable. However, for new users/items, this becomes hard because we have no browse, click or purchase data for them. As a result, we cannot “fill in the blank” using typical matrix factorization techniques.

Recommender systems can be generally classified as collaborative filter-based, content-based, or hybrid systems. Collaborative filter-based systems estimate user responses by collecting preference information from numerous users. The predictions are built upon the existing ratings of other users who have similar ratings as the target user. However, such systems cannot handle new users (user cold-start) and new items (item cold-start) because of the lack of user-item interactions. Content-based systems are introduced to solve the cold-start problem. Such systems use user profile information (e.g., gender, nationality, religion, and political stance) and the contents of the items to make recommendations. The systems might have a limitation suggesting the same items to the users who have similar contents regardless of items that user already rated. Hybrid systems, which are based on a collaborative filter and utilize content information, are widely used in various applications. However, these systems are unfit for a recommendation when the user-item interaction data are sparse. Moreover, due to privacy issues, collecting personal information is challenging, which might result in the user cold-start problem. To avoid the user cold-start problem due to privacy issues, many web-based systems, such as Netflix, recommend items based on only minimal user information. Netflix initially presents popular movies and television programs to new users: we call these videos the evidence candidates. Then, the user chooses the videos that he/she likes among the candidates. Afterward, the system recommends some programs based on the videos selected by the user. Recently, to improve performance, the recommendations have been made using deep learning methods; however, the cold-start problem remains for new users who rate only a few items.

Matrix completion is a classic problem underlying recommender systems. It is traditionally tackled with matrix factorization. Recently, deep learning based methods, especially graph neural networks, have made impressive progress on this problem. Despite their effectiveness, existing methods focus on modeling the user-item interaction graph. The inherent drawback of such methods is that their performance is bound to the density of the interactions, which is however usually of high sparsity. More importantly, for a cold start user/item that does not have any interactions, such methods are unable to learn the preference embedding of the user/item since there is no link to this user/item in the graph.

### Item cold-start

- Find similar items using item features
- Another approach is to randomly recommend these items to users until enough interaction data is available
- [Treating cold start in product search by priors](https://www.amazon.science/publications/treating-cold-start-in-product-search-by-priors) - New products in e-commerce platforms suffer from cold start, both in recommendation and search. In this study, we present experiments to deal with cold start in search by predicting priors for behavioral features in learning to rank set up. The offline results show that our technique generates priors for behavioral features that closely track posterior values. The online A/B test on 140MM queries shows that treatment with priors improves new products impressions and increased customers engagement pointing to their relevance and quality.

### User cold-start

- Find similar users, but it requires user information. So if we do not have this information, e.g. in case of session-based recommenders, we will not be able to use this technique.
- Another approach is to ask about interests using surveys. It works pretty well.
- One more approach is to recommend popular items until enough interaction data is available for that user and then gradually switch to personalized recommendations.

## Approaches

### Representative approaches for cold-start recommendations

`TL;DR` use subset of items and users that represents the population

If we do not have enough information about users and items, we can rely more on those who “represent” the set of items and users. That’s the philosophy behind representative based methods. Representatives can be users whose linear combinations of preferences accurately approximate other users’.

**Random Strategy**

A naive method to choose the representatives is simply to randomly select a subset of users or items. This strategy corresponds to the assumption that users or items are indifferent in terms of their predictive power on other users’ and items’ ratings and therefore there would be no gain in strategically choosing which users and items to elicit ratings from.

**Most Ratings Strategy**

Another simple method to select the representative is to choose the k users or k items which had the most observed ratings. This strategy is also easy to calculate. However, popularity in many cases are not equivalent to informativeness. For example, the most popular movies tend to be widely liked by almost any user and a rating on such movies would provide little information regarding the new user’s unique preferences. Similarly, a very active user may be someone who frequently watches randomly selected movies and may not serve as a good user prototype.

**K-Medoids Strategy**

The previous two methods do not consider the correlation between the selected representatives and could potentially choose multiple highly similar users or items. To avoid such redundancy problem, we also consider another more complicated strategy based on k-medoids clustering. k-medoids tries to group data objects into k clusters. Each cluster is represented by an actual data object, i.e. the representative. The other instances are clustered with the representative to which it is most similar to.

A famous representative based method, *[Representative Based Matrix Factorization (RBMF)](https://dl.acm.org/doi/10.1145/2043932.2043943)* is an extension of MF methods with an additional constraint that **m** items should be represented by a linear combination of **k** items, as can be seen from the objective function below:

$$
\min_{U,V} ||R-UV||_F^2 + \alpha||V||_F^2\ s.t.\ U \in \mathbb{R}^{n \times k}\ and\ U \sub_{n,k}\mathbb{R}, V \sub \mathbb{R}^{k \times m}
$$

Here, we have the reconstruction error similar to standard MF methods, with this additional constraint. When a new user joins the platform, we can ask the new users to rate these $k$ items, and use that to infer the ratings of other $m − k$ items. This way, with a small additional cost on users of rating some items, we can improve the recommendations for new users.

:::note

In most real world systems, new items and new users would be added to the system constantly. A recommender system should be able to adjust its model rapidly in order to be able to make recommendations regarding new users and new items as soon as possible. This require techniques for learning the parameters associated with new users and new items based on an increment of new data without the need to retrain the whole model entirely. This type of techniques have also been known as ***folding in***. Using the RBMF model, folding in is effortless. In particular, we only need to obtain ratings from the $k$ representative users for a new item in order to recommend it to other users. Similarly, we only need to ask a new user to rate $k$ representative items to recommend other items to him.

:::

There have been improvements on RBMF proposed in [this](https://dl.acm.org/doi/10.1145/3108148) paper, where we can interview only a subset of users instead of all the new users to decrease the burden on the new users. The advantage of this approach is that there is more interpretability, because new users can be expressed in terms of few representative items. Also, If you’re using MF methods already, this can be a simple extension to handle cold start. Possible disadvantage is that might be a need to change UI and front end logic to ask the users to rate the representative items.

### Auxiliary information transformation

`TL;DR` utilizes auxiliary information.

ML-based models combine user-item interactions from existing warm start users and items (as in CF-based methods) with auxiliary information from both warm and cold users and items (as in content-based methods). This auxiliary information – be it from user profiles, item descriptions, reviews, and other sources – is often readily available even in the absence of user-item interactions.

There are various kinds of auxiliary information could be exploited to improve cold-start recommendation performance, e.g., user attributes, item attributes, knowledge graphs, samples in an auxiliary domain, etc.

![(a) setup of cold start recommendation problem, where both warm and cold users and items have auxiliary representations (such as user profiles and item content); and (b) the main idea of existing cold start recommendation algorithms: learn transformation functions to transform auxiliary representations to CF representations.](/img/content-tutorials-raw-addressing-the-cold-start-problem-untitled-1.png)

(a) setup of cold start recommendation problem, where both warm and cold users and items have auxiliary representations (such as user profiles and item content); and (b) the main idea of existing cold start recommendation algorithms: learn transformation functions to transform auxiliary representations to CF representations.

The key insight is to learn two transformation functions – one for users and one for items – to transform the auxiliary representations of these new users and items into the CF space. The learned transformation functions are then applied on auxiliary representations of cold start users and items to predict preference scores at inference time. Hence, the fundamental challenge is how to generate effective transformation functions based on the given auxiliary information and user-item interactions.

Recent ML-based approaches have made promising strides versus traditional methods. These ML approaches typically combine both user-item interaction data of existing warm start users and items (as in CF-based methods) with auxiliary information of users and items such as user profiles and item content information (as in content-based methods). However, such approaches face key drawbacks including the error superimposition issue that the auxiliary-to-CF transformation error increases the final recommendation error; the ineffective learning issue that long distance from transformation functions to model output layer leads to ineffective model learning; and the unified transformation issue that applying the same transformation function for different users and items results in poor transformation.

Recommender systems have been widely deployed in various online services, such as E-commerce platforms and news portals, to address the issue of information overload for users. At their core, they typically adopt collaborative filtering, aiming to estimate the likelihood of a user adopting an item based on the interaction history like past purchases and clicks. However, the interaction data of new users or new items are often very sparse, leading to the so-called cold-start scenarios in which it becomes challenging to learn effective user or item representations.

![Untitled](/img/content-tutorials-raw-addressing-the-cold-start-problem-untitled-2.png)

### Bandits

`TL;DR` designing a decision making strategy. consider the exploration vs exploitation tradeoffs in new items.

When a new user joins the system it initially has no knowledge of the preferences of the user and so would like to quickly learn these. The recommender system therefore initially starts in an “exploration” phase where the first few items that it asks the new user to rate are chosen with the aim of discovering the user’s preferences. Cold-start problem can also be naturally modeled as a CMAB problem. Multi-armed bandit problem (MAB) which derives from the gamble game is a simplified setting of reinforcement learning. In order to earn the maximal sum of rewards, the gambler has two choices, one is trying to play some new arms of the multi-armed bandit which may have higher reward (exploration), while the other is sticking on playing the arm (exploitation) given the high reward so far.

In particular, upper confidence bound (UCB) is an effective method to solve CMAB, which suggests an arm with maximal confidence upper bound. LinUCB extends UCB by considering contextual information about the arm. To recommend diversified items, suggests a batch of items (called super arm) to each user with an entropy regularization.

### Cross-domain transfer

`TL;DR` few-shot meta-learners. 

A common challenge for most current recommender systems is the cold-start problem. Due to the lack of user-item interactions, the fine-tuned recommender systems are unable to handle situations with new users or new items. Recently, some works introduce the meta-optimization idea into the recommendation scenarios, i.e. predicting the user preference by only a few of past interacted items. The core idea is learning a global sharing initialization parameter for all users and then learning the local parameters for each user separately. However, most meta-learning based recommendation approaches adopt model-agnostic meta-learning for parameter initialization, where the global sharing parameter may lead the model into local optima for some users.

Although recommendation systems have been proved to play a significant role in a variety of applications, there are two long-standing obstacles that greatly limit the performance of recommendation systems. On the one hand, the number of user-item interaction records often tends to be small and is insufficient to mine user interests well, which is called the data sparsity problem. On the other hand, for any service, there are constantly new users joining, for whom there are no historical interaction records. Traditional recommendation systems cannot make recommendations to these users, which is called the cold-start problem.

As more and more users begin to interact with more than one domains (e.g., music and book), it increases opportunities of leveraging information collected from other domains to alleviate the two problems (i.e., data sparsity and cold-start problems) in one domain. This idea leads to Cross-Domain Recommendation (CDR) which has attracted increasing attention in recent years.

There are two core issues for cross-domain recommendation, namely, what to transfer and how to transfer. What to transfer is how to mine useful knowledge in each domain, and how to transfer focuses on how to establish linkages between domains and realize the transfer of knowledge.

Cold-start problems are enormous challenges in practical recommender systems. One promising solution for this problem is cross-domain recommendation (CDR) which leverages rich information from an auxiliary (source) domain to improve the performance of recommender system in the target domain. In these CDR approaches, the family of Embedding and Mapping methods for CDR (EMCDR) is very effective, which explicitly learn a mapping function from source embeddings to target embeddings with overlapping users.

With the help of the auxiliary (source) domain, cross-domain recommendation (CDR) is a promising solution to alleviate data sparsity and the cold-start problem in the target domain. The core task of  CDR is preference transfer. For instance, If I like *Song A* and *Song B* (music domain), how much I like *Movie X* (movie domain)? 

![Existing workflow in cross-domain recommendation for cold-start users.](/img/content-tutorials-raw-addressing-the-cold-start-problem-untitled-3.png)

Existing workflow in cross-domain recommendation for cold-start users.

**Domain overlapping**

![[source](https://arxiv.org/pdf/2108.03357.pdf)](/img/content-tutorials-raw-addressing-the-cold-start-problem-untitled-4.png)

[source](https://arxiv.org/pdf/2108.03357.pdf)

**Recommendation scenarios**

![[source](https://arxiv.org/pdf/2108.03357.pdf)](/img/content-tutorials-raw-addressing-the-cold-start-problem-untitled-5.png)

[source](https://arxiv.org/pdf/2108.03357.pdf)

At the very beginning, CMF assumes a shared global user embedding matrix for all domains, and it factorizes matrices from multiple domains simultaneously. CST utilizes the user embedding in the source domain to initialize the embedding in the target domain and restricts them from being closed. In recent years, researchers proposed many deep learning-based models to enhance knowledge transfer. CoNet transfers and combines the knowledge by using cross-connections between feedforward neural networks. MINDTL combines the CF information of the target-domain with the rating patterns extracted from a cluster-level rating matrix in the source-domain. DDTCDR develops a novel latent orthogonal mapping to extract user preferences over multiple domains while preserving relations between users across different latent spaces. Similar to multi-task methods, these methods focus on proposing a well-designed deep structure that can effectively train the source and target domains together.

Another group of CDR methods focus on bridging user preferences in different domains, which is the most related work. CST utilizes the user embedding learned in the source domain to initialize the user embedding in the target domain and restricts them to being closed. Some methods explicitly model the preference bridge.

**CMF** is a simple and well-known method for cross-domain recommendation by sharing the user factors and factorizing joint rating matrix across domains.

**EMCDR** is the first to propose the three-step optimization paradigm by training matrix factorization in both domains successively then utilizing multi-layer perceptrons to map the user latent factors.

**CDLFM** modifies matrix factorization by fusing three kinds of user similarities as a regularization term based on their rating behaviors. A neighborhood-based mapping approach is used to replace the previous multi-layer perceptrons, by considering similar users and the gradient boosting trees (GBT) based ensemble learning method.

![The workflow diagram for our proposed model CDLFM.](/img/content-tutorials-raw-addressing-the-cold-start-problem-untitled-6.png)

The workflow diagram for our proposed model CDLFM.

### Meta Learning

Meta learning covers a wide range of topics and has contributed to a booming study trend. Few-shot learning is one of successful branches of meta learning. We retrospect some representative meta-learning models with strong connections to our work.

They can be divided into the following common types.

1. Memory-based approaches: combining deep neural networks (DNNs) with the memory mechanism to enhance the capability of storing and querying meta-knowledge.
2. Optimization-based approaches: a meta-learner, e.g. recurrent neural networks (RNNs) is trained to optimize target models.
3. Metric-based approaches: learning an effective similarity metric between new examples and other examples in the training set.
4. Gradient-based approaches: learning an shared initialization where the model parameters can be trained via a few gradient updates on new tasks. Most meta-learning models follow an episodic learning manner. Among them, MAML is one of the most popular frameworks, which falls into the fourth type. Some MAML-based works consider that the sequence of tasks may originate from different task distributions, and try various task-specific adaptations to improve model capability.

It is also named learning to learn, aiming to improve novel tasks’ performance by training on similar tasks. There are various meta learning methods, e.g., metric-based methods, gradient-based methods, and parameter-generating based methods.

This line of research aims to learn a model which can adapt and generalize to new tasks and new environments with a few training samples. To achieve the goal of “learning-to-learn”, there are three types of different approaches. Metric-based methods are based on a similar idea to the nearest neighbors algorithm with a well-designed metric or distance function, prototypical networks or Siamese Neural Network. Model-based methods usually perform a rapid parameter update with an internal architecture or are controlled by another meta-learner model. As for the optimization-based approaches, by adjusting the optimization algorithm, the models can be efficiently updated with a few examples.

Inspired by the huge progress on few-shot learning and meta learning, there emerge some promising works on solving cold-start problems from the perspective of meta learning, where making recommendations for one user is regarded as a single task.

In the training phase, they try to derive the global knowledge across different tasks as a strong generalization prior. When a cold-start user comes in the test phase, the personalized recommendation for her/him can be predicted with only a few interacted items are available, but does so by using the global knowledge already learned.

Most meta-learning recommenders are built upon the well-known framework of model-agnostic meta learning (MAML), aiming to learn a parameter initialization where a few steps of gradient updates will lead to good performances on the new tasks. A typical assumption here is the recommendations of different users are highly relevant. However, this assumption does not necessarily hold in actual scenarios. When the users exhibit different purchase intentions, the task relevance among them is actually very weak, which makes it problematic to find a shared parameter initialization optimal for all users. As shown in the image below:

![An illustration of the relevance of different tasks. The purchase intentions of user 𝑎, 𝑏 and 𝑐 are manifested by the corresponding user-item interactions. It shows that tasks 𝑎, 𝑐 are closely relevant but task 𝑏 is largely different from them. Each task owns the user-specific support set and query set.](/img/content-tutorials-raw-addressing-the-cold-start-problem-untitled-7.png)

An illustration of the relevance of different tasks. The purchase intentions of user 𝑎, 𝑏 and 𝑐 are manifested by the corresponding user-item interactions. It shows that tasks 𝑎, 𝑐 are closely relevant but task 𝑏 is largely different from them. Each task owns the user-specific support set and query set.

Inspired by the significant improvements of meta learning, the pioneering work of [Vartak et. al.](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/46346.pdf) provides a meta-learning strategy to solve cold-start problems. It uses a task-dependent way to generate the varying biases of decision layers for different tasks, but it is prone to underfitting and is not flexible enough to handle various recommendation scenarios. [MeLU](https://arxiv.org/abs/1908.00413) adopts the framework of MAML. Specifically, it divides the model parameters into two groups, i.e., the personalized parameter and the embedding parameter. The personalized parameter is characterized as a fully-connected DNN to estimate user preferences. The embedding parameter is referred as the embeddings of users and items learned from side-information. An inner-outer loop is used to update these two groups of parameters. In the inner loop, the personalized parameter is locally updated via the prediction loss of support set in current task. In the outer loop, these parameters are globally updated according to the prediction loss of query sets in multiple tasks. Through the fashion of local-global update, MeLU can provide a shared initialization for different tasks. The later work [MetaCS](https://www.semanticscholar.org/paper/Meta-Learning-for-User-Cold-Start-Recommendation-Bharadhwaj/f3135b553f592dc42d4202c90739c99486103fc3) is much similar to MeLU, and the main difference is that the local-global update involves all parameters from input embedding to model prediction. To generalize well for different tasks, [MetaHIN](https://www.kdd.org/kdd2020/accepted-papers/view/meta-learning-on-heterogeneous-information-networks-for-cold-start-recommen) and [MAMO](https://arxiv.org/abs/2007.03183) propose different task-specific adaptation strategies. In particular, MetaHIN incorporates heterogeneous information networks (HINs) into MAML to capture rich semantics of meta-paths. MAMO introduces two memory matrices based on user profiles: a feature-specific memory that provides a specific bias term for the shared parameter initialization; a task-specific memory that guides the model for predictions. However, these two gradient-based meta-learning models may still suffer from potential training issues in MAML, and the model-level innovations of them are closely related with side-information, which limits their application scenarios.

### Cold-start Sequential Models

Though quite a few cold-start recommendation methods have been proposed, most require side information or knowledge from other domains during training, and commonly treat the user-item interactions in a static way. In contrast, cold-start sequential recommendation targets a setting where no additional auxiliary knowledge can be accessed due to privacy issues, and more importantly, the user-item interactions are sequentially dependent. A user’s preferences and tastes may change over time and such dynamics are of great significance in sequential recommendation. Hence, it is necessary to develop a new sequential recommendation framework that can distill short-range item transitional dynamics, and make fast adaptation to those cold-start users with limited user-item interactions.

### Interactive Dialogue

Traditional recommendation systems produce static rather than interactive recommendations invariant to a user’s specific requests, clarifications, or current mood, and can suffer from the cold-start problem if their tastes are unknown. These issues can be alleviated by treating recommendation as an interactive dialogue task instead, where an expert recommender can sequentially ask about someone’s preferences, react to their requests, and recommend more appropriate items.

### Hybrid

It is indeed the most common approach because of the flexibility and performance. In this approach, we simply combine different cold-start approaches. E.g. Using bandit exploration-exploitation approach but use meta-learning model to select exploration recommendation (instead of random choice). 

## Models

### MetaTL

A fundamental challenge for sequential recommenders is to capture the sequential patterns of users toward modeling how users transit among items. In many practical scenarios, however, there are a great number of cold-start users with only minimal logged interactions. As a result, existing sequential recommendation models will lose their predictive power due to the difficulties in learning sequential patterns over users with only limited interactions. In this work, we aim to improve sequential recommendation for cold-start users with a novel framework named MetaTL, which learns to model the transition patterns of users through meta-learning.

Specifically, the proposed MetaTL:

1. formulates sequential recommendation for cold-start users as a few-shot learning problem;
2. extracts the dynamic transition patterns among users with a translation-based architecture; and
3. adopts meta transitional learning to enable fast learning for cold-start users with only limited interactions, leading to accurate inference of sequential interactions.

**Background**

One of the first approaches for sequential recommendation is the use of Markov Chains to model the transitions of users among items. More recently, TransRec embeds items in a “transition space” and learns a translation vector for each user. With the advance in neural networks, many different neural structures including Recurrent Neural Networks, Convolutional Neural Networks, Transformers and Graph Neural Networks, have been adopted to model the dynamic preferences of users over their behavior sequences. While these methods aim to improve the overall performance via representation learning for sequences, they suffer from weak prediction power for cold-start users with short behavior sequences.

This line of research aims to learn a model which can adapt and generalize to new tasks and new environments with a few training samples. To achieve the goal of “learning-to-learn”, there are three types of different approaches. Metric-based methods are based on a similar idea to the nearest neighbors algorithm with a well-designed metric or distance function, prototypical networks or Siamese Neural Network. Model-based methods usually perform a rapid parameter update with an internal architecture or are controlled by another meta-learner model. As for the optimization-based approaches, by adjusting the optimization algorithm, the models can be efficiently updated with a few examples.

MetaRec proposes a meta-learning strategy to learn user-specific logistic regression. There are also methods including MetaCF, Warm-up and MeLU, adopting Model-Agnostic Meta-Learning (MAML) methods to learn a model to achieve fast adaptation for cold-start users.

cold-start sequential recommendation targets a setting where no additional auxiliary knowledge can be accessed due to privacy issues, and more importantly, the user-item interactions are sequentially dependent. A user’s preferences and tastes may change over time and such dynamics are of great significance in sequential recommendation. Hence, it is necessary to develop a new sequential recommendation framework that can distill short-range item transitional dynamics, and make fast adaptation to those cold-start users with limited user-item interactions.

**Model**

Let $I = \{𝑖_1,𝑖_2, \dots,𝑖_𝑃\}$ and $U = \{u_1,u_2, \dots,u_G\}$ represent the item set and user set in the platform respectively. Each item is mapped to a trainable embedding associated with its ID. There is no auxiliary information for users or items. In sequential recommendation, given the sequence of items ${𝑆𝑒𝑞}_𝑢 = (𝑖_{𝑢,1},𝑖_{𝑢,2}, \dots,𝑖_{𝑢,𝑛})$ that user 𝑢 has interacted with in chronological order, the model aims to infer the next interesting item $𝑖_{𝑢,𝑛+1}$. That is to say, we need to predict the preference score for each candidate item based on ${𝑆𝑒𝑞}_𝑢$ and thus recommend the top-N items with the highest scores.

In our task, we train the model on $U_{𝑡𝑟𝑎𝑖𝑛}$, which contains users with various numbers of logged interactions. Then given 𝑢 in a separate test set $U_{𝑡𝑒𝑠𝑡},\ U_{𝑡𝑟𝑎𝑖𝑛} ∩ U_{𝑡𝑒𝑠𝑡} = \phi$, the model can quickly learn user transition patterns according to the 𝐾 initial interactions and thus infer the sequential interactions. Note that the size of a user’s initial interactions (i.e., 𝐾) is assumed to be a small number (e.g., 2, 3 or 4) considering the cold-start scenario.

![Untitled](/img/content-tutorials-raw-addressing-the-cold-start-problem-untitled-8.png)

Meta-learning aims to learn a model which can adapt to new tasks (i.e., new users) with a few training samples. To enable meta-learning in sequential recommendation for cold-start users, we formulate training a sequential recommender as solving a new few-shot learning problem (i.e., meta-testing task) by training on many sampled similar tasks (i.e., the meta-training tasks). Each task includes a 𝑠𝑢𝑝𝑝𝑜𝑟𝑡 set S and a 𝑞𝑢𝑒𝑟𝑦 set Q, which can be regarded as the “training” set and “testing” set of the task. For example, while constructing a task $T_𝑛$, given user $𝑢_𝑗$ with initial interactions in sequence (e.g., $𝑖_𝐴 \rightarrow_{u_j} i_B \rightarrow_{u_j} i_C$), we will have the a set of transition pairs $\{ 𝑖_𝐴 \rightarrow_{u_j} i_B, i_B \rightarrow_{u_j} i_C \}$ as support and predict for the query $i_C \rightarrow_{u_j} ?$.

When testing on a new user $𝑢_{𝑡𝑒𝑠𝑡}$, we will firstly construct the support set $S_{𝑡𝑒𝑠𝑡}$ based on the user’s initial interactions. The model $𝑓_\theta$ is fine-tuned with all the transition pairs in $S_{𝑡𝑒𝑠𝑡}$ and updated to $𝑓_{\theta_{𝑡𝑒𝑠𝑡}'}$ , which can be used to generate the updated $tr_{𝑡𝑒𝑠𝑡}$. Given the test query $𝑖_𝑜 \rightarrow_{u_{test}}?$, the preference score for item $𝑖_𝑝$ (as the next interaction) is calculated as −$∥i_𝑜 + tr_{𝑡𝑒𝑠𝑡} − i_𝑝 ∥^2$.

### TaNP

Recent studies seek to address this challenge from the perspective of meta learning, and most of them follow a manner of parameter initialization, where the model parameters can be learned by a few steps of gradient updates. While these gradient-based meta-learning models achieve promising performances to some extent, a fundamental problem of them is how to adapt the global knowledge learned from previous tasks for the recommendations of cold-start users more effectively.

TaNP directly maps the observed interactions of each user to a predictive distribution, sidestepping some training issues in gradient-based meta-learning models. More importantly, to balance the trade-off between model capacity and adaptation reliability, TaNP uses a novel task-adaptive mechanism. It enables this model to learn the relevance of different tasks and customize the global knowledge to the task-related decoder parameters for estimating user preferences.

**Background**

Inspired by the huge progress on few-shot learning and meta learning, there emerge some promising works on solving cold-start problems from the perspective of meta learning, where making recommendations for one user is regarded as a single task.

In the training phase, they try to derive the global knowledge across different tasks as a strong generalization prior. When a cold-start user comes in the test phase, the personalized recommendation for her/him can be predicted with only a few interacted items are available, but does so by using the global knowledge already learned.

**Model**

As shown in the above figure, tasks 𝑎 and 𝑐 share the transferable knowledge of recommendations, since user 𝑎 and user 𝑐 express similar purchase intentions, while task 𝑏 is largely different from them. Therefore, learning the relevance of different tasks is an important step in adapting the global knowledge for the recommendations of cold-start users more effectively.

TaNP includes the encoder $ℎ_\theta$, the customization module (task identity network $𝑚_\phi$ and global pool 𝑨) and the adaptive decoder $𝑔_{\omega𝑖}$. Both of $𝑆_𝑖$ and $\tau_𝑖$ are encoded by $ℎ_\theta$ to generate the variational prior and posterior, respectively. The final task embedding $𝒐_𝑖$ learned from the customized module is used to modulate the model parameters of $𝑔_{\omega𝑖} \cdot 𝒛_𝑖$ sampled from $𝑞(𝒛_𝑖|\tau_𝑖)$ is concatenated with $𝒙_{𝑖,𝑗}$ to predict $\hat{𝑦}_{𝑖,𝑗}$ via $𝑔_{\omega𝑖}$.

![The framework of TaNP in the training phase.](/img/content-tutorials-raw-addressing-the-cold-start-problem-untitled-9.png)

The framework of TaNP in the training phase.

A meta-learning recommender is first learned on each support set (learning procedure) and is then updated according to the prediction loss over multiple query sets (learning-to-learn procedure). Through the guide of the second procedure in many iterations, this meta-learning model can derive the global knowledge across different tasks and adapts such knowledge well for a new task $\tau_𝑖$ with only $𝑆_𝑖$ available.

![Untitled](/img/content-tutorials-raw-addressing-the-cold-start-problem-untitled-10.png)

### AGNN

![Untitled](/img/content-tutorials-raw-addressing-the-cold-start-problem-untitled-11.png)

We first design an input layer to build the user (item) attribute graph $\mathcal{A}_u$ ($\mathcal{A}_i$). We calculate two kinds of proximity scores between the nodes - preference proximity and attribute proximity (can be calculated with cosine similarity).

- The preference proximity measures the historical preference similarity between two nodes. If two users have similar rating record list (or two items have similar rated record list), they will have a high preference proximity. Note we cannot calculate preference proximity for the cold start nodes as they do not have the historical ratings.
- The attribute proximity measures the similarity between the attributes of two nodes. If two users have similar user profiles, e.g., gender, occupation (or two items have similar properties, e.g., category), they will have a high attribute proximity.

After calculating the overall proximity between two nodes, it becomes a natural choice to build a k-NN graph as adopted in (Monti, Bronstein, and Bresson 2017). Such a method will keep a fixed number of neighbors once the graph is constructed.

In the constructed attribute graph $\mathcal{A}_u$ and $\mathcal{A}_i$, each nodes has an attached multi-hot attribute encoding and a unique one-hot representation denoting its identity. Due to the huge number of users and items in the web-scale recommender systems, the dimensionality of nodes’ one-hot representation is extremely high. Moreover, the multi-hot attribute representation simply combines multiple types of attributes into one long vector without considering their interactive relations. The goal of interaction layer is to reduce the dimensionality for one-hot identity representation and learn the high-order attribute interactions for multi-hot attribute representation. To this end, we first set up a lookup table to transform a node’s one-hot representation into the low-dimensional dense vector. The lookup layers correspond to two parameter matrices $M \in \mathbb{R}^{M×D}$ and $N \in \mathbb{R}^{ N×D}$. Each entry $m_u \in \mathbb{R}^D$ and $n_i \in \mathbb{R}^D$ encodes the user $u$’s preference and the item $i$’s property, respectively. Note that $m_u$ and $n_i$ for cold start nodes are meaningless, since no interaction is observed to train their preference embedding. Inspired by (He and Chua 2017), we capture the high-order attribute interactions with a ***Bi-Interactive pooling operation***, in addition to the linear combination operation.

Intuitively, different neighbors have different relations to a node. Furthermore, one neighbor usually has multiple attributes. For example, in a social network, a user’s neighborhood may consist of classmates, family members, colleagues, and so on, and each neighbor may have several attributes such as age, gender, and occupation. Since all these attributes (along with the preferences) are now encoded in the node’s embedding, it is necessary to pay different attentions to different dimensions of the neighbor node’s embedding. However, existing GCN (Kipf and Welling 2017) or GAT (Veliˇckovi´c et al. 2018) structures cannot do this because they are at the coarse granularity. GCN treats all neighbors equally and GAT differentiates the importance of neighbors at the node level. To solve this problem, we design a gated-GNN structure to aggregate the fine-grained neighbor information.

Given a user $u$’s final representation $\tilde{p}_u$ and an item $i$’s final representation $\tilde{q}_i$ after the gated-GNN layer, we model the predicted rating of the user $u$ to the item $i$ as:

$$
\hat{R}_{u,i} = MLP([\tilde{p}_u; \tilde{q}_i]) + \tilde{p}_u\tilde{q}_i^T + b_u + b_i + \mu,
$$

where the MLP function is the multilayer perceptron implemented with one hidden layer, and $b_u$, $b_i$ , and $\mu$ denotes user bias, item bias, and global bias, respectively. The second term is inner product interaction function (Koren, Bell, and Volinsky 2009), and we add the first term to capture the complicated nonlinear interaction between the user and the item.

The cold start problem is caused by the lack of historical interactions for cold start nodes. We view this as a missing preference problem, and solve it by employing the variational autoencoder structure to reconstruct the preference from the attribute distribution.

![The eVAE structure to generate preference embedding from attribute distribution.](/img/content-tutorials-raw-addressing-the-cold-start-problem-untitled-12.png)

The eVAE structure to generate preference embedding from attribute distribution.

For the rating prediction loss, we employ the square loss as the objective function:

$$
L_{pred} = \sum_{u,i \in \mathcal{T}} (\hat{R}_{u,i} - R_{u,i})^2,
$$

where $\mathcal{T}$ denotes the set of instances for training, i.e., $\mathcal{T} = {(u, i, r_{u,i}, a_u, a_i)}$, $R_{u,i}$ is ground truth rating in the training set $\mathcal{T}$ , and $\hat{R}_{u,i}$ is the predicted rating.

The reconstruction loss function in eVAE is defined as follows:

$$
L_{recon} = − KL(q_\phi(z_u|x_u)||p(z_u)) + \mathbb{E}_{q_\phi}(z_u|x_u)[\log p_θ(x'_u|z_u)] + ||x'_u − m_u||_2,
$$

where the first two terms are same as those in standard VAE, and the last one is our extension for the approximation part.

The overall loss function then becomes:

$$
L = L_{pred} + L_{recon},
$$

where $L_{pred}$ is the task-specific rating prediction loss, and $L_{recon}$ is the reconstruction loss.

### DaRE

Assume two datasets, $𝐷^𝑠$ and $𝐷^𝑡$, be the information from the source and target domains, respectively. Each dataset consists of tuples, $(𝑢,𝑖,𝑦_{𝑢,𝑖}, 𝑟_{𝑢,𝑖})$ which represents an individual review $𝑟_{𝑢,𝑖}$ written by a user 𝑢 for item 𝑖 with a rating $𝑦_{𝑢,𝑖}$. The two datasets take the form of $D^s = (𝑢^s,𝑖^s,𝑦^s_{𝑢,𝑖}, 𝑟^s_{𝑢,𝑖})$ and $D^t = (𝑢^t,𝑖^t,𝑦^t_{𝑢,𝑖}, 𝑟^t_{𝑢,𝑖})$, respectively. The goal of our task is to predict an accurate rating score $y^t_{u,i}$ using $𝐷^𝑠$ and a partial set of $𝐷^t$.

![Untitled](/img/content-tutorials-raw-addressing-the-cold-start-problem-untitled-13.png)

The training phase starts with review embedding layers followed by three types of feature extractors, ${𝐹𝐸}^𝑠$, ${𝐹𝐸}^c$, and ${𝐹𝐸}^t$, named source, common, and target, for the separation of domain-specific, domain-common knowledge. Integrated with domain discriminator, three FEs are trained independently for the parallel extraction of domain-specific $𝑂^𝑠$, $𝑂^𝑡$ and domain-common knowledge $𝑂^{𝑐,𝑠}$, $𝑂^{𝑐,𝑡}$.

![The architecture of a single review feature extractor. DaRE has three parallel review feature extractors of the same architecture with different inputs and parameters.](/img/content-tutorials-raw-addressing-the-cold-start-problem-untitled-14.png)

The architecture of a single review feature extractor. DaRE has three parallel review feature extractors of the same architecture with different inputs and parameters.

![Untitled](/img/content-tutorials-raw-addressing-the-cold-start-problem-untitled-15.png)

Then, for each domain, the review encoder generates a single vector $𝐸^𝑠$, $𝐸^𝑡$ with extracted features 𝑂 by aligning them with individual review $𝐼^𝑠$, $𝐼^𝑡$. Finally, the regressor predicts an accurate rating that the user will give on an item. Here, shared parameters across two domains are common FE and a domain discriminator.

## Tutorials

### Attribute to Feature Mappings for Cold-Start Recommendations

[Jupyter notebook](https://nbviewer.org/gist/sparsh-ai/36460a4db478066b45c61250b5b4deb3). In this tutorial, we are learning the attribute to latent feature mapping with three different mapping functions - KNN, linear, and BPT-OPT. Also comparing with 2 baselines - CBF-KNN, and Random. We are using sample dataset but it can be extended to movielens dataset also.

### LightFM Cold-start on MovieLens 10m dataset

[Jupyter notebook](https://nbviewer.org/gist/sparsh-ai/44345fac02a3f5b4bf3f57d161c6208c). In this tutorial, we are training a hybrid recommender model on movielens 10m dataset. We are using Movie tags from tags-genome dataset as movie attributes. We are using LightFM library to implement the hybrid model.

### EMCDR on MovieLens-Netflix dataset

[Jupyter notebook](https://nbviewer.org/gist/sparsh-ai/7ffd0110dc674aab0a0e354e1a7ba417). In this tutorial, we are training the EMCDR cross-domain recommender model on movielens-netflix dataset.

### HERS Cold-start Recommendations on LastFM dataset

[Jupyter notebook](https://nbviewer.org/gist/sparsh-ai/8b5004cfb3c791b41b8a7973638430f0). In this tutorial, we are training the HERS (Heterogeneous Relations for Sparse and Cold-start Recommendation) model to recommend music items to cold-start  users. The implementation is in Tensorflow 1x.

### Collective Matrix Factorization on MovieLens 1m dataset

[Jupyter notebook](https://nbviewer.org/gist/sparsh-ai/3a83fd0e7f2e8ea7e7ffcdfa47a99a9e). In this tutorial, we are training CMF model on MovieLens 1m. Our experiments focus on two tasks: (i) predicting whether a user rated a particular movie: *israted*; and (ii) predicting the value of a rating for a particular movie: *rating*. There is a significant difference in the amount of data for the two tasks. In the israted problem we know whether or not a user rated a movie for all combinations of users and movies, so the ratings matrix has no missing values. In the rating problem we observe the relation only when a user rated a movie—unobserved combinations of users and movies have their data weight set to zero.

### Double-Domain Recommendations on MovieLens 1m dataset

[Jupyter notebook](https://nbviewer.org/gist/sparsh-ai/014eb81100b97cbaef512b7b4fb20097). In this tutorial, we are training DCDCSR model on MovieLens 1m dataset. Data has been divided into four parts D1,D2,D3 and D4. D1 and D2 have users common. D1 and D3 have items common. D1 and D4 have no user and no item in common. We test the model on the testing part of the dataset i.e., testing set from 10% dataset of D1 and calculated the MAE, RMSD, Precision and Recall values. Same is repeated with every dataset. Case 1 :- cross domain recommendation D1 is Target Domain and D4 is Source Domain. Case 2 :- cross domain recommendation D2 is Target Domain and D3 is Source Domain. Case 3 :- cross domain recommendation D3 is Target Domain and D2 is Source Domain. Case 4 :- cross domain recommendation D4 is Target Domain and D1 is Source Domain.

### DropoutNet Cold-start Recommendation on CiteULike dataset

[Jupyter notebook](https://nbviewer.org/gist/sparsh-ai/f50a60ef75bde14e89fd4759772dc641). In this tutorial, we are training DropoutNet model on CiteuLike dataset to recommend citation items to cold-start users.

### MetaTL for Cold-start Recommendations on Amazon Electronics dataset

[Jupyter notebook](https://nbviewer.org/gist/sparsh-ai/c3fdad23f56c698903fd153d14e2fa1c). In this tutorial, we are training MetaTL model on amazon electronics dataset to predict the next best item for a new cold-start user with 3 interactions (K=3).

### TaNP Cold-start Recommender on LastFM dataset

[Jupyter notebook](https://nbviewer.org/gist/sparsh-ai/5a6cdd6efc4caf59526f18d4d860e354). In this tutorial, we are training TaNP model to recommend music items to cold-start users. LastFM dataset division ratio of training, validation and test sets is 7:1:2. We only keep the users whose item-consumption history length is between 40 and 200. To generalize well with only a few samples, we set the number of interactions in support set as a small value (20/15/10), and remaining interactions are set as the query set. We only predict the score of each item in the query set for each user.

### AGGN Cold-start Recommendation on MovieLens 100k

[Jupyter notebook](https://nbviewer.org/gist/sparsh-ai/abd505f5d300d785457ed9f0f378a00e). In this tutorial, we are using attributed GNN model (AGNN) to predict the ratings a new user would give to a movie.

### DaRE Cross-domain Recommender on Amazon Reviews dataset

[Jupyter notebook](https://nbviewer.org/gist/sparsh-ai/cb1aeb25f5fae730e886522f59e08c87). In this tutorial, we are training DaRE model on Amazon reviews dataset. We are using Amazon reviews' *Musical_Instruments* dataset as the source domain and *Patio_Lawn_and_Garden* as the target domain. We are also using GloVe word-embeddings to convert reviews' text into vectors.

## References

1. Wisdom of the better few: cold start recommendation via representative based rating elicitation. Nathan N. Liu, Xiangrui Meng, Chao Liu, Qiang Yang. 2011. RecSys. [https://dl.acm.org/doi/10.1145/2043932.2043943](https://dl.acm.org/doi/10.1145/2043932.2043943)
2. Local Representative-Based Matrix Factorization for Cold-Start Recommendation. Lei Shi, Wayne Xin Zhao, Yi-Dong Shen. 2017. arXiv. [https://dl.acm.org/doi/10.1145/3108148](https://dl.acm.org/doi/10.1145/3108148)
3. Fairness among New Items in Cold Start Recommender Systems. Ziwei Zhu , Jingu Kim , Trung Nguyen , Aish Fenton , James Caverlee. 2021. SIGIR. [https://dl.acm.org/doi/abs/10.1145/3404835.3462948](https://dl.acm.org/doi/abs/10.1145/3404835.3462948)
4. Personalized Transfer of User Preferences for Cross-domain Recommendation. Yongchun Zhu, Zhenwei Tang, Yudan Liu, Fuzhen Zhuang, Ruobing Xie, Xu Zhang, Leyu Lin, Qing He. 2021. arXiv. [https://arxiv.org/abs/2110.11154v2](https://arxiv.org/abs/2110.11154v2)
5. Recommendation for New Users and New Items via Randomized Training and Mixture-of-Experts Transformation. Zhu et. al.. 2020. SIGIR. [https://people.engr.tamu.edu/caverlee/pubs/zhu20cold.pdf](https://people.engr.tamu.edu/caverlee/pubs/zhu20cold.pdf)
6. Learning Attribute to Feature Mappings for Cold-Start Recommendations. Lucas Drumond, Christoph Freudenthaler, Steffen Rendle, Lars Schmidt-Thieme. 2010. ICDM. [https://bit.ly/3Eh4NEK](https://bit.ly/3Eh4NEK)
7. Meta-learning on Heterogeneous Information Networks for Cold-start Recommendation. Lu et. al.. 2020. KDD. [https://yuanfulu.github.io/publication/KDD-MetaHIN.pdf](https://yuanfulu.github.io/publication/KDD-MetaHIN.pdf)
8. MAMO: Memory-Augmented Meta-Optimization for Cold-start Recommendation. Manqing Dong, Feng Yuan, Lina Yao, Xiwei Xu, Liming Zhu. 2020. arXiv. [https://arxiv.org/abs/2007.03183](https://arxiv.org/abs/2007.03183)
9. Methods and Metrics for Cold-Start Recommendations. Schein et al.. 2002. SIGIR. [https://repository.upenn.edu/cgi/viewcontent.cgi?article=1141&context=cis_papers](https://repository.upenn.edu/cgi/viewcontent.cgi?article=1141&context=cis_papers)
10. Pairwise Preference Regression for Cold-start Recommendation. Seung-Taek et al.. 2009. RecSys. [http://www.gatsby.ucl.ac.uk/~chuwei/paper/p21-park.pdf](http://www.gatsby.ucl.ac.uk/~chuwei/paper/p21-park.pdf)
11. LARA: Attribute-to-feature Adversarial Learning for New-item Recommendation. Changfeng Sun , Han Liu , Meng Liu , Zhaochun Ren , Tian Gan , Liqiang Nie. 2020. WSDM. [https://dl.acm.org/doi/abs/10.1145/3336191.3371805](https://dl.acm.org/doi/abs/10.1145/3336191.3371805)
12. Internal and Contextual Attention Network for Cold-start Multi-channel Matching in Recommendation.  2020. IJCAI. [https://www.ijcai.org/proceedings/2020/0379.pdf](https://www.ijcai.org/proceedings/2020/0379.pdf)
13. Task-adaptive Neural Process for User Cold-Start Recommendation. Xixun Lin, Jia Wu, Chuan Zhou, Shirui Pan, Yanan Cao, Bin Wang. 2021. arXiv. [https://arxiv.org/abs/2103.06137](https://arxiv.org/abs/2103.06137)
14. Content-aware Neural Hashing for Cold-start Recommendation. Casper Hansen, Christian Hansen, Jakob Grue Simonsen, Stephen Alstrup, Christina Lioma. 2020. arXiv. [https://arxiv.org/abs/2006.00617](https://arxiv.org/abs/2006.00617)
15. Learning Attribute-to-Feature Mappings for Cold-Start Recommendations. Zeno Gantner, Lucas Drumond, Christoph Freudenthaler, Steffen Rendle, Lars Schmidt-Thieme. 2010. IEEE. [https://ieeexplore.ieee.org/document/5693971](https://ieeexplore.ieee.org/document/5693971)
16. HERS: Modeling Influential Contexts with Heterogeneous Relations for Sparse and Cold-Start Recommendation. Hu et. al.. 2019. arXiv. [https://ojs.aaai.org//index.php/AAAI/article/view/4270](https://ojs.aaai.org//index.php/AAAI/article/view/4270)
17. CATN: Cross-Domain Recommendation for Cold-Start Users via Aspect Transfer Network. Cheng Zhao, Chenliang Li, Rong Xiao, Hongbo Deng, Aixin Sun. 2020. arXiv. [https://arxiv.org/abs/2005.10549](https://arxiv.org/abs/2005.10549)
18. Improved Cold-Start Recommendation via Two-Level Bandit Algorithms. Rodrigues et. al.. 2017. arXiv. [https://bit.ly/3jLtb9H](https://bit.ly/3jLtb9H)
19. DropoutNet: Addressing Cold Start in Recommender Systems. Maksims Volkovs, Guangwei Yu, Tomi Poutanen. 2017. arXiv. [https://www.cs.toronto.edu/~mvolkovs/nips2017_deepcf.pdf](https://www.cs.toronto.edu/~mvolkovs/nips2017_deepcf.pdf)
20. Alleviating Cold-Start Problems in Recommendation through Pseudo-Labelling over Knowledge Graph. Riku Togashi, Mayu Otani, Shin'ichi Satoh. 2020. arXiv. [https://arxiv.org/abs/2011.05061](https://arxiv.org/abs/2011.05061)
21. Sequential Recommendation for Cold-start Users with Meta Transitional Learning. Jianling Wang, Kaize Ding, James Caverlee. 2021. SIGIR. [https://arxiv.org/abs/2107.06427](https://arxiv.org/abs/2107.06427)
22. Social Collaborative Filtering for Cold-start Recommendations. Sedhain et. al.. 2014. RecSys. [https://ssanner.github.io/papers/anu/recsys14.pdf](https://ssanner.github.io/papers/anu/recsys14.pdf)
23. Addressing cold start in recommender systems: A semi-supervised co-training algorithm. Zhang et. al.. 2014. SIGIR. [https://keg.cs.tsinghua.edu.cn/jietang/publications/SIGIR14-Zhang-et-al-cold-start-recommendation.pdf](https://keg.cs.tsinghua.edu.cn/jietang/publications/SIGIR14-Zhang-et-al-cold-start-recommendation.pdf)
24. Metadata Embeddings for User and Item Cold-start Recommendations. Maciej Kula. 2015. arXiv. [https://arxiv.org/abs/1507.08439](https://arxiv.org/abs/1507.08439)
25. Low-rank Linear Cold-Start Recommendation from Social Data. Sedhain et. al.. 2017. AAAI. [https://mesuvash.github.io/assets/pdf/papers/loco-paper.pdf](https://mesuvash.github.io/assets/pdf/papers/loco-paper.pdf)
26. Cross-domain recommendation: an embedding and mapping approach. Man et al.. 2017. IJCAI. [https://www.ijcai.org/proceedings/2017/0343.pdf](https://www.ijcai.org/proceedings/2017/0343.pdf)
27. Expediting Exploration by Attribute-to-Feature Mapping for Cold-Start Recommendations. Cohen et al.. 2017. RecSys. [https://research.yahoo.com/mobstor/publication_attachments/Expediting Exploration by Atribute-to-Feature Mapping for Cold-Start Recommendations.pdf](https://research.yahoo.com/mobstor/publication_attachments/Expediting%20Exploration%20by%20Atribute-to-Feature%20Mapping%20for%20Cold-Start%20Recommendations.pdf)
28. Handling Cold-Start Collaborative Filtering with Reinforcement Learning. Hima Varsha Dureddy, Zachary Kaden. 2018. arXiv. [https://arxiv.org/abs/1806.06192](https://arxiv.org/abs/1806.06192)
29. Deeply Fusing Reviews and Contents for Cold Start Users in Cross-Domain Recommendation Systems. Fu et. al.. 2019. AAAI. [https://ojs.aaai.org//index.php/AAAI/article/view/3773](https://ojs.aaai.org//index.php/AAAI/article/view/3773)
30. Zero-Shot Learning to Cold-Start Recommendation. Jingjing Li, Mengmeng Jing, Ke Lu, Lei Zhu, Yang Yang, Zi Huang. 2019. AAAI. [https://arxiv.org/abs/1906.08511](https://arxiv.org/abs/1906.08511)
31. MeLU: Meta-Learned User Preference Estimator for Cold-Start Recommendation. Hoyeop Lee, Jinbae Im, Seongwon Jang, Hyunsouk Cho, Sehee Chung. 2019. KDD. [https://arxiv.org/abs/1908.00413](https://arxiv.org/abs/1908.00413)
32. Relational Learning via Collective Matrix Factorization. Singh et. al.. 2008. KDD. [http://www.cs.cmu.edu/~ggordon/singh-gordon-kdd-factorization.pdf](http://www.cs.cmu.edu/~ggordon/singh-gordon-kdd-factorization.pdf)
33. Cross-Domain Recommendation for Cold-Start Users via Neighborhood Based Feature Mapping. Xinghua Wang, Zhaohui Peng, Senzhang Wang, Philip S. Yu, Wenjing Fu, Xiaoguang Hong. 2018. arXiv. [https://arxiv.org/abs/1803.01617](https://arxiv.org/abs/1803.01617)
34. A Deep Framework for Cross-Domain and Cross-System Recommendations. Feng Zhu, Yan Wang, Chaochao Chen, Guanfeng Liu, Mehmet Orgun, Jia Wu. 2018. IJCAI. [https://www.ijcai.org/proceedings/2018/0516.pdf](https://www.ijcai.org/proceedings/2018/0516.pdf)
35. Semi-Supervised Learning for Cross-Domain Recommendation to Cold-Start Users. SeongKu Kang , Junyoung Hwang , Dongha Lee , Hwanjo Yu. 2019. CIKM. [https://dl.acm.org/doi/10.1145/3357384.3357914](https://dl.acm.org/doi/10.1145/3357384.3357914)
36. Transfer-Meta Framework for Cross-domain Recommendation to Cold-Start Users. Yongchun Zhu, Kaikai Ge, Fuzhen Zhuang, Ruobing Xie, Dongbo Xi, Xu Zhang, Leyu Lin, Qing He. 2021. SIGIR. [https://arxiv.org/abs/2105.04785](https://arxiv.org/abs/2105.04785)
37. ANR: Aspect-based Neural Recommender. Jin Yao Chin, Kaiqi Zhao, Shafiq Joty, Gao Cong. 2018. CIKM. [https://dl.acm.org/doi/10.1145/3269206.3271810](https://dl.acm.org/doi/10.1145/3269206.3271810)
38. A Survey on Cross-domain Recommendation: Taxonomies, Methods, and Future Directions. Tianzi Zang, Yanmin Zhu, Haobing Liu, Ruohan Zhang, Jiadi Yu. 2021. arXiv. [https://arxiv.org/abs/2108.03357](https://arxiv.org/abs/2108.03357)
39. Cross-Domain Recommendation: Challenges, Progress, and Prospects. Feng Zhu, Yan Wang, Chaochao Chen, Jun Zhou, Longfei Li, Guanfeng Liu. 2021. arXiv. [https://arxiv.org/abs/2103.01696](https://arxiv.org/abs/2103.01696)
40. CMML: Contextual Modulation Meta Learning for Cold-Start Recommendation. Xidong Feng, Chen Chen, Dong Li, Mengchen Zhao, Jianye Hao, Jun Wang. 2021. arXiv. [https://arxiv.org/abs/2108.10511v4](https://arxiv.org/abs/2108.10511v4)
41. [Tackling the Cold Start Problem in Recommender Systems](https://kojinoshiba.com/recsys-cold-start/)
42. [In-session Recommendation in eCommerce notebook](https://nb.recohut.com/coldstart/session/sequential/retail/coveo/prod2vec/annoy/keras/embedding/visualization/tsne/search/queryscoping/2021/07/19/session-based-prod2vec-coveo.html#Improving-low-count-vectors)
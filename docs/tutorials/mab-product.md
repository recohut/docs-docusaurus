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
# How to build Multi-Armed Bandit Product Recommender
> In e-commerce and other digital domains, companies frequently want to offer personalised product recommendations to users. This is hard when you don’t yet know a lot about the customer, or you don’t understand what features of a product are pertinent. Thinking about it as a multi-armed bandit problem is a useful way to get around this. In this tutorial, we will learn how multi-armed bandit algorithms can be applied to the challenge of product recommendation and then explain how to solve it in code.

- toc: true
- badges: false
- comments: true
- categories: [MultiArmedBandit, Retail]
- image:
<!-- #endregion -->

<!-- #region id="gmXuWjH0TdpK" -->
## Introduction

Duration: 5

In e-commerce and other digital domains, companies frequently want to offer personalised product recommendations to users. This is hard when you don’t yet know a lot about the customer, or you don’t understand what features of a product are pertinent. Thinking about it as a multi-armed bandit problem is a useful way to get around this. In this tutorial, we will learn how multi-armed bandit algorithms can be applied to the challenge of product recommendation and then explain how to solve it in code.

Multi-armed bandit algorithms can:

- recommend products with the highest expected value while still exploring other products.
- do not suffer from the cold-start problem and therefore don’t require customer preferences or information about products.
- take into account the limitations of how much data you have as well as the cost of gathering data (the opportunity cost of sub-optimal recommendations).

### What you'll learn?

- Build multi-armed bandit models in python
- Compare the model performance

### Why is this important?

- Infuse intelligence in recommender models
- Automatically adapt to the changing environment

### How it will work?

### Who is this for?

- People who are interested in applying reinforcement learning techniques in recommender systems

### Important resources

- [Colab notebook](https://colab.research.google.com/gist/sparsh-ai/86c0daeeb4449c1325577fcbae4c4342/recostep-tutorial-multi-armed-bandit-product-recommender.ipynb)

<!-- ------------------------ -->

## Bandit class

Duration: 2

First of all, we define the base class. In this, we initialize with pay-off probabilities in a list format and define a sample method that will provide the reward for the action taken. The agent do not know these pay-off values and the goal for that agent is to find these pay-offs by exploring and exploiting the environment. For example, if pay-off probability is 90%, we will get a reward of 1 most often and in this manner, the agent will get an idea of this secret pay-off. 

```python
class Bandit:
    """A useful class containing the multi-armed bandit and all its actions.
    
    Attributes:
        actions The actions that can be performed, numbered automatically 0, 1, 2...
        payoff_probs    The underlying pay-off probabilities for each action.
    """

    def __init__(self, payoff_probs):
        self.actions = range(len(payoff_probs))
        self.pay_offs = payoff_probs

    def sample(self, action):
        """Sample from the multi-armed by performing an action.
        
        Args:
            action (int): The action performed on the multi-armed bandit.

        Returns:
            int: It returns a reward based on that arm's pay-off probability.
        """
        selector = random.random()
        return 1 if selector <= self.pay_offs[action] else 0
```

<!-- ------------------------ -->

## Random agent

Duration: 2

Random agent is our baseline. This agnt will randomly pick an action and get the reward for that action. Our hypothesis is that, this will be the worst performing agent.

```python
def random_agent(bandit, iterations):
    """Randomly select an action and reward."""

    for i in range(iterations):
        a = random.choice(bandit.actions)
        r = bandit.sample(a)
        yield a, r
```

<!-- ------------------------ -->

## Optimal agent

Duration: 2

This one is out benchmark. In this, we will expose the hidden pay-off values so that the agent will always take the best possible action and get the maximum probable reward.

```python
def optimal_agent(bandit, iterations):
    """Select the best action by taking a sneak-peek at the bandit's probabilities."""

    for i in range(iterations):
        a = bandit.pay_offs.index(max(bandit.pay_offs))
        r = bandit.sample(a)
        yield a, r
```

<!-- ------------------------ -->

## Explore than exploit agent

Duration: 2

This agent first explore the environment for N rounds and then start taking the action which gave maximum reward during exploration. 

```python
def initial_explore_agent(bandit, iterations, initial_rounds = 10):
    """Initially explore initial_rounds times and then stick to the best action."""
    pay_offs = dict()
    best_action = -1

    for i in range(iterations):
        # for the initial rounds pick a random action
        if i < initial_rounds:
            a = random.choice(bandit.actions)
            r = bandit.sample(a)

            #update rewards
            if a in pay_offs:
                pay_offs[a].append(r)
            else:
                pay_offs[a] = [r]
        # otherwise pick the best one thus far
        else:
            if (best_action == -1):
                # check for the lever with the best average payoff
                mean_dict = {}
                for key,val in pay_offs.items():
                    mean_dict[key] = np.mean(val) 
                best_action = max(mean_dict, key=mean_dict.get)
            a = best_action

            r = bandit.sample(a)
        
        yield a, r
```

<!-- ------------------------ -->

## Epsilon greedy agent

Duration: 2

This agent always explore the environment with a probability of epsilon, which is 20% in our case. This means, out of 5, this agent will recommend the highest-probability reward product 4 times and recommend a random product 1 time. 

```python
def epsilon_greedy_agent(bandit, iterations, epsilon = 0.2, initial_rounds = 1):
    """Use the epsilon-greedy algorithm by performing the action with the best average
    pay-off with the probability (1-epsilon), otherwise pick a random action to keep exploring."""

    pay_offs = dict()

    for i in range(iterations):
        # sometimes randomly pick an action to explore
        if random.random() < epsilon or i < initial_rounds:
            a = random.choice(bandit.actions)
        # otherwise pick the best one thus far
        else:
            # check for the lever with the best average payoff
            new_dict = {}
            for key,val in pay_offs.items():
                new_dict[key] = np.mean(val) 
            a = max(new_dict, key=new_dict.get)

        r = bandit.sample(a)

        #update rewards
        if a in pay_offs:
            pay_offs[a].append(r)
        else:
            pay_offs[a] = [r]
        
        yield a, r
```

<!-- ------------------------ -->

## Decaying epsilon greedy agent

Duration: 2

This agent will initially take random actions with epsilon probability but this epsilon keep decaying so that, at the begininng, agent wil recommend 1 random product out of 5, but over time, this will ultimately become zero, and agent will recommend all 5 products with highest possible reward probability.

```python
def decaying_epsilon_greedy_agent(bandit, iterations, epsilon = 0.2, initial_rounds = 1, decay = 0.999):

    pay_offs = dict()

    for i in range(iterations):
        # sometimes randomly pick an action
        if random.random() < epsilon or i < initial_rounds:
            a = random.choice(bandit.actions)
        # otherwise pick the best one thus far
        else:
            # check for the lever with the best average payoff
            new_dict = {}
            for key,val in pay_offs.items():
                new_dict[key] = np.mean(val) 
            a = max(new_dict, key=new_dict.get)

        r = bandit.sample(a)

        #update rewards
        if a in pay_offs:
            pay_offs[a].append(r)
        else:
            pay_offs[a] = [r]
        
        epsilon *= decay

        yield a, r
```

<!-- ------------------------ -->

## Simulation

Duration: 2

We are creating 7 arms. These arms can be compared to 7 products in recommendation domain. These pay-offs represent the buying probability let's say. That means, there is a 25% probability that custom will buy first product and 50% probability of buying third product. And interestingly, no chance of buying last product.

1000 trials is just to smoothen-out the results. 200 iterations means we will recommend the given 7 items to that customer 200 times. The selection of this item-to-be-recommended would depend on the agent.

```python
random.seed(200) #used for reproducibility

pay_offs = [0.25, 0.3, 0.5, 0.1, 0.3, 0.25, 0]
bandit = Bandit(pay_offs)

methods = [random_agent, initial_explore_agent, epsilon_greedy_agent, decaying_epsilon_greedy_agent, optimal_agent]

number_of_iterations = 200
number_of_trials = 1000

for m in range(len(methods)):
    method = methods[m]
    total_rewards = []

    list_of_cumulative_rewards = []
    fan = []

    for trial in range(number_of_trials):
        total_reward = 0
        cumulative_reward = []

        for a, r in method(bandit, number_of_iterations):
            total_reward += r
            cumulative_reward.append(total_reward)

        #plt.plot(cumulative_reward, alpha=.02, color=colors[m])
        total_rewards.append(total_reward)

        if trial == 0:
            fan = pd.DataFrame(cumulative_reward, columns=['y'])
            fan['x'] = fan.index+1
        else:
            fan2 = pd.DataFrame(cumulative_reward, columns=['y'])
            fan2['x'] = fan2.index+1

            fan = fan.append(fan2, ignore_index=True)

        list_of_cumulative_rewards.append(cumulative_reward)

    sns.lineplot(x='x', y='y', data=fan)  #default is to use bootstrap to calculate confidence interval     
    
    print(method.__name__, ":", np.mean(total_rewards))

plt.title("Cumulative reward for each algorithm over {} iterations with {} trials.".format(number_of_iterations, number_of_trials))
plt.ylabel("Cumulative reward")
plt.xlabel("Iterations")
plt.legend([method.__name__ for method in methods])

f.savefig("Iterations.pdf", bbox_inches='tight')
f.savefig("Iterations.svg", bbox_inches='tight')

plt.show()
```

As expected, random agent performed worst and optimal agent performed best. Epsilon greedy and its decaying version performed equally well and it is better than explore-than-exploit method.
<!-- #endregion -->

<!-- #region id="WVYnazOzTr3L" -->
![image.png](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAdAAAAEWCAYAAADW7MapAAAgAElEQVR4Aex9B3yVRdb+2V23/Pf7vl1dd9ddd9dVd9cuYlfsYu9dLFjAAtjbgoIiKoqoKCBNmvQqHaQlJCEkIZAQ0khIARISAiGBFBISEp7/75n3nZuX67037Sa5N5nz+9371pl35kx55pyZOUfEkOGA4YDhgOGA4YDhgOGA4YDhgOGA4YDhgOGA4YDhgOGA4YDhgOGA4YDhgOGA4YDhgOGA4YDhgOGA4YDhgOGA4YDhgOGA4YDhgOGA4YDhgOGA4YDhgOGA4YDhgOGA4YDhgOGA4YAbBz4Ukelu9xpzmSIi1zcmQJC/+72IfOIjD3y2X0QKfLzT1o/qy0Nj0ufPuNy/+4SIrHa/6bhmvdvtuDanjedAW7ffU0SkXER+0fikt3iIH0XkaR9facm67+OzrfKovrbnTERzMcQZV4PPHxeRzXbl2SMiLKyrGxzafy82JvPtucI0lKO+eMDOoFJE/tzQyNroPV95aGyS/BlXfd+GiPzb8VJ7BdA7RSRSRA7aA7EJIvJ/jnz/WkQmiUip/fxNxzOedhWRNBGpEJF1IvJPt+feLhvTF3iLo777O0XkpvpeCsDnz9hl4kxaY+v+dyKSLiJHRYTxudMbdnmyXFm+LGdNp9plyTJl2brz0FdYHQePjIft6DjnzWaet0a9OSaJrPD7ROQBEfkfEfmliNwtIl8c81brXDQm842tMP7KgT8LuzFp8jQq9sUDDoCaKhG1Zh595aEx/OG7/ozL+W1P/GiPAOopnxxc3yYivxWRE+zB9VgHcz4TkfX2s7PtTpfvk/4oIiUi8rCI/MbuU2LsZ/UdGtMXeIrLU17c3+vIAPqSPbih4OQOoLeKyF4ROdcu1zARGeJgXrSIDBOR/yciD9qDqz/Zz+sL64imQQDakHJ0xtnceuOMq97z39tSJyu4N3LvlNxH2qyE74hIoogcEpGJInKS3dDKRGStXQiM3z0s7zkrsXvm59kNko0wwi5QhnlBRI6ISLWd/qV24nVcJ9vS1x/s+zxcaKszOUAg9RCRbSJyQERW+RgZ61FSTxHJsdPhK/wgERlpfUINRsgTPRhhhTssIjpd3vLH4OT7GBFZYfOVozzmIV5EyNc5IjLbiwqX71L65OiSKinGRbpHRKgmozTBRsEOTxN519cuxyovo8KzRGSNiBTbo9dHdGARoaSyxZZEckWEZekkAnqU/W0+142WaRslIsvtfG0UkX85A7qd18czp0r7vyJCjUq+iDxnj3a11Mi6P1VECkVkl4gMEJGf299i2jaIyNciUmTzmPcoiZFYFwmgLFvy91FH3X7LHpDyu8/a7/PAfI622wXDMP6/iMg3dh3kSJ7l6426iMgmG5B45DWJ32Yn6CRKAEvsG5QcvrTrLjtFgh/rIUm3R5Y71fzT7Pu+DhxoJzleIG9vcVx/bNdL3mI7ZZlr4gCd9ZL1yBPp9ksAZttmGyevttovs8zYv5C3eXa56IGlpzJjPQq1y5BTGTNE5Hg7LuaV7YPp4TdYV3Rb1502+xHykfU9U0SedySa9XuuXYfYHtmuLnE8J0+ZRj6jpEdJ3J1Os9uDrnfj7bqj32MaX7cv2F5Zh9lm2YfU2ulmWyY1th3ZwVSd1m1R35spIp/qCzvtehroDBFh/+DUQnAA1ct+31dYR5TqlP0p2xH5z9+Vdr/gq+0x4HARYR9C6ThORK5xROzEEA7aOCXINkw+sd0Qm/xGrKg1XjpL/REWjLNT0o1OP2el56iSCfubXQHYybMzYAZYgQfaL7uH5W3daHjuzDyvCXIsKHYC7GgS7Hh4cE8X7znj4nedFZ4gpkfO99oNgpWRjYWdp7OhOz7jalTsbNkBsPPxFf5GRwfDTi5LRAgKJD7TnQGv68sfBw5X2R377+yOnp0jBwEP2R2Ms2ysr1j/7rxmxWeHf7Mdnh0GO4Vf2YHIO/L3H44O1hkf885KS1Agz/SA5Bz7JX7vfDutnewR7H32M6rt2JE8Zn/7RBHpbD9jObKCX2bHy06OAwNvVB/PND9Yt9noOYqm9MSG5JQaWZ6L7frFjnO7iHCQRGKHwnbxip0mlrkTQPmOMy5eM/8M85GdxztstSWlNhLzyU78Yke72CEiT9lzbkw3VZyeiAMuDvS62+khH3lNPjJv5O1/HAHZUXSzrzkIIAgwDrYlDjYpNZJ0mj+325gGVvuxxwPboS4f5o18cHZKrJcaYNnRcRDopGRbanHe0+fO9uveF/CdhSIyzm6HnJqIFZEX7cCeyoyDJdZ39h+UkDjwYfo1Ob/He+4Ayvc56GE/xvrKwRbbMInpI5CxnAni5KmWrs+02woBmMR4vQ0KCSKsEyQCbbZjYMtnelClAZTvuddF3mtsO1IftAeFjM9J7KM4MNNETQLLmfXtflvw0M94/NYhNPgK6wzDc3d+856ncnTP75N2WtgPccDKds4yIjnrDesG6zvbCMuIfGY/6jfi5KweWXiL1B2o3DtmVkLGo+kHt0bDTmiR/dA9LG87K7Ez8zo+feTIkYXIUSjJPV2854yLozWCKOlndoW+1r7mHK/uLHmLI0Dq8z3Nz+hCPt0Oy4Ov8OyE2LBY2fqJyHu2KvV/RYTS6QhHPM5TT/ljJ6+Jaedon3nRRNDXgKHv6aM7r9+3R8z6OfPMETLfI5F3BCdvxAbFkaaT2JnpwZHzPs/ZUbHzJr1rd3725TEHliPn1TSxQ6I01hDyxDPND87baKBgXOxMNeixMVHC0eDP52xs7KRIbLDsvJzk3oh1XPod8pHSjJZeeJ9TI1fYLzCflDA0sV1QA6KJgw8tTeh7+kjgJFg4iWo0ponEwcEH9jmBlIDKToN1hYMmZ+fNUT6Bm8Q0kw+687Fvez0QjAjcHIyRONgiH5zh+Q7rEonSolP1x3uULnS6rbfq/p3t170vIEhT8nGCPAcSetDhqczqYrbOOKCjlkST83u8p9s6y5B5o5TnlLRYn1iOJKaP2jVNrEssfxLrGsuemiCt8bIf/eRAKZPTaNRGEECH2tKcu3TaEABtSjuiVsW9PDjo12p4Jph5YDmTP6yLeqCgMzPYwRdfYfX7+ujkt77nqRx5T2t/9HvOI+vkBfYNZ71hf8Y+kgP6FiF/SaDOSWQ2ZmZCE4FMVzT3Tp3vOCuxM/Ps5Nj4WCAU1dm5sBB1Z1AfgHJ0zAr9VxG5zpbeNPikOtQfjJc/vqvVYjrtPOpCdjaE+sKzsKnqovqVEiRVPZwbYCPgnAGpIfljxdREiYKShZNmNQJAKQloVbKOgw1BD35YDuz8vBElVna2ml88Uu2iJYzL7c6Mo3RKzhxEaJUgR/FUI3oi93L0VEd0uIbwTAPoShHpowPaUogGPXbGPKdUrYltIcO+YINlR+8k90as49LveEq3s26755PtQgM242CnSwnWE1EdSNW1kygF9rdvcNChwZgDGs13SmlMp7PMWDYsNxLTzEFUQ4gDAZatUxWpJVDnQjXWb6cEyrJ3Ep/pNuC8z3Mnv5x9AZ9RQ0GVqzMv7BeoOiV5KjOWM/nEPPJd5ptaFE3O7/GebusEUNZn5tdJVFNyCoPknj5nWD7n3DH7AXbuTIOWRq3Qdf+sB9QQcDqEAyyWJds186Onpvh2QwBU132+76k+1n217swTgFKKdE7PUBhgPdISKPs/J3HKSk9b+QrrDMNzd57xnqdydG97b9v1nXWZ9YH1QtdLZ7mwz2Z7YHopfHBw4uzH3dPT6GtKcxyhUu3ijTg/xQljTezInYtT3CuhLwC91J5P0HGxQ+T3NQA7M8+RDjsFjsQIfFraYEdDmuwBPNzTQhUd5xAoKVFNpYlznho49D1vR0+FXF94Ah/VGpyroYqUE/bkIaVcPdleX/7cO1wOAtwlUHbyzkbjzIN7A3KXQMlTdwlUl4MzHn3O0b7uPPQ955EDHaqXtTRCCZR1gVSfBOrMg3u67SjUoTE8Y/1wzuPUJ4Fyvk4DmnuD5cfd77UmgDLf7hIoR9ZME4mdAtXDVDNSer/dvq81K5xa8US+eO18n2pESlRcXOhOrJPOgRdV2FrFS546ByIcsLAN1DcHym+w49P1h9ccCLtL+M60uJcPn1ECJhjpNQeUQJ19FyVxZ513tnVPEijrE9slydlX8doZ1nrD+qfKkGnQgxrnM55TY0CQ5UCDqkm+T+0H6y+BQpMTQLmdxV0ic+8vGlq2ngCU85jOwTvV1lpTSe0DB8dOyZyqbuccqLewOi/6SI0f25FTa+OpHJ33ON/JuqinixgX+afL0b1c9LdYPgRSp+ZRP2vWkTpkLi5g5aLah42RDZBoTeI8IhslKyHVDJRanJXQHbR8ASgBmw2IC0706ICjbk+Zp/TAOTlWKDY8VjBnp0XplAXtJPe0UO3I+VjOsWkRn+9Tj8+5GM6PkZgubwupPDWM+sJzUQVHvCF2/PyOc7TM2/Xlz71BEIjZsF6zeUcJl4ssnOBjf04d3BsQ52U4WOFIjbxn4+R8i3MOVJeDMx59zgbDxTbszBmePw6I9EIkVmq9T43SAq91B8gtNVQrclTLxsKRrHMO1JkH93Tr7/PYGJ6xDnMAw/SxXk9xqz9MG+fUmC82ZNZxSgMkZ4O1b/3kHjsU5+IZT+l21kf38myMBEp+caRNqYb8Y73mNeemNFETwAEO+e7skDgPSQ2IlhIJptSGkDyl2X7kOpxn9w/OOTHXQ1tLFG4vFCQwkuda/cfBIqUESpwcWHEQ667+c8bl5Bc7ZHbueoEN3+OAmPlhn8D71EZxYEnyVGbMN6U6DtSZb4K5s+9iWgjymtzbOqcsOBBm2vW8vm4j7h21MyzbGkGHc69sX5xOYP3zRhyEsH8gaJOoaeI125cmJ4CSv+SVbrt8x71+1Ve2DMt8kSfs43muec34Wb+plqbgwqkwpyqefKNGiWHYF7IuasGgvrA6PzyyXVJNrqcEeM9TOTrvUUInv4hFzAOnLhiHp3K5wQZalj/xi9Kxc2GfMy3NOqc0xpV87GDJOK6I1OpMMokrPlmgXGlLKcNZCZ2VnonwBaCaQWxkbOjsxJ3hnZWSc4ZsMOx42XFzsYUTQDlyI8Cy8PQcqzMufovzJQyv1TxOJhEIqE5ivqjWYSX3RM6G4XzuKzzTTnDT84OU9phfre5kPPXlz71BMAxX+XEOh3limfDnBB9n+jw1IFZ2jsLYqbHT0wMIhnPnnTMufc6OgXWDqi0OStiwNBBSi8FyYtqW2R2PBlCG58iRi6k0vzXYuufTU7r19xvLM0q+rM9scL3t+qM7KaofmT7mheXPhqg7EGeD1d92v8cOnvWY9Y8DA0/pdvLUPZ+NAVCmgauYueKQZcej+z5t8pftgxojJ7H9UnLiYIm8p1bnVfsFT2l2huU5JSG9mpsqUP6c7YkgwbbDuDkQ53yek9ixcXBC6ZEgwPbkjZz84qCBAErpgoNgEge6bEPsf8gHtgW9WMq9fPg+6zd5xTSzr6Cw4Oy7uBiQg1KWIfsi97b+d7sucxUuNSxaymLczr6K186wBFtqDNgWGJbtwZsKl2Epoep5aV4TnBiWHb8mJ4ASONgOGTc1DyT3+lVf2TI+1hfnj2E0sRxZnixX1gGWsybmleFZppy31eCln/sKq9/RR2os2AZZBpwm8FSOznvkia5vbH+cWnLWG2e5UGvG9BHXmBeuP9GDSy4o1YtKdVrM0XDAcMALByiJcqSqG5CX18xtwwHDAcMBwwHDAcMBStwcOVPa5EINrakwnDEcMBwwHDAcMBwwHPDBAa7EpaqPqi7Od3IhiiHDAcMBwwHDAcMBwwHDAcMBwwHDAcMBwwHDAcMBwwHDAcMBw4HA4sCJJ56Iiy++2PwMD0wdMHXA1IFG1AEPxiQCq3M3qWl5DhA8DRkOGA4YDhgONI4DHhwVtHyHbb4QWBwwANq4RmPeNhwwHDAcIAcMgAYWlrVJagyAms7AcMBwwHCg8RwwANomkBVYHzUA2viGY0IYDhgOGA4YAA0sLGuT1HgC0OrqamRnZyM1NdX8DA86dB1gO2B7MGQ44M4BA6BtAlmB9VFPAMpOo7CwEEePHnWvM+bacKDDcID1n+2A7cGQ4YA7BwyABhaWtUlqPAEoJU8Dnu7NxVx3RA6wHbA9GDIccOeAAdA2gaxGfZSW9emphO7FNNH1DF0z0cExj7RlSqJXE1rUz7Q9w1xk3/d58Aag7pXFXBsOdFQOGADtqCXvO98GQH1CS0A8vFZECIROAKUv0n526njUzrDpC+5HG0jp+obuseolA6C+G4l5ajhgANTUAU8cMABaL7wExAv0L+cEUPpw04a/eeQ1aZyI0MebJud7+t5PjgZAPTUNc89woI4DBkDreNFezjLj9mLBV3E4XNH0BWIGQH8CJwF5wx1A6VxVE9W2+pqOaZ2OhENsJ9P6XY/HjgKg//znP9WCkGDtANatW4cNGzYEa/KDOt0GQIO6+I5JfMn+CiwevgXfvhiC7/tFojC39JjnjbkwAOoRUgLupi8AZWLplZ7UGAB9wS78zaeccspP6kygdRhcyFFbW/uTdDbmRrAD6MCBA/HFF180JsvmXT9xINDag5+y1aGiqampRezybIx5eR3GvBSKkKmpyN66D1WVR5rMBwOgNvIE+MEdQJ2q2RZX4X64JBmPjI3y649x1kc7duzAGWecge7du+Occ87BM888owxd8/yDDz5wBScw8vrCCy/Eeeedh23btqln+/fvx80336zC9uzZExwocEsC6auvvsK5556rfl9//bW6x++deeaZePrpp/Gf//wHjz/+ONasWYMuXbrg3//+NzZu3Kje8/THZ1dccQU6d+6MK6+8Emlpaeq1Q4cO4eGHH8bZZ5+N++67D5dddhk2bdqknq1atUqFYbofeughlJWVqfue8sO0nXTSSTj55JNxwQUXICIiwlMyzL0W4oAB0BZibCtFuzu9GNPfj1JS57whm5ASmYeCHQdRVdF08GTSDYAGOHLayXMH0C/cFhFxURHpTrdFRLH2fZ+H+lS4bQmgP/vZzxAdHa2aWVFRkTrW1NTguuuuw9atW9U1AWfEiBHqfNSoUSBYkl555RUMGjRInS9btoyVXQHo5s2bFdCWl5cr0CIgx8fHgyD1i1/8AomJiUraveiii/Dss8+q7TyLFi3Cvffeq+Ly9FdSUoIjR6zGSNB94IEH1GuUGF944QV1npSUpOIngBLIr7nmGjANpCFDhrjS6i0/RgJVrGqTPwOgbcL2Zn+0orQKqycmK+Cc8FYENi7Jxq6U/SgrrvTLNj0DoD6hJSAezhKRPSJyRER2i0hPETlRRDi/yW0sa0WE21pInA8dJSJZIpLUkPlPBqoPQJtdi5sYAQHt1FNPdYUeM2aMkjLPP/98/PGPf8SsWbPUMwLO7t271XlMTAy6du2qzimpZWVlucKfcMIJCri++eYbvP/++677AwYMwPDhwxWAUtLURMl3+vTp6pLxMD5vlJOToyRMSrWUginJkgi6oaGhrmCUNgmgS5cuBd3IMU7+KKH26NFDvectPwZAXWxs9RMDoK3O8mZ/MD12D8a/EY5RvULw47hEZGwuwL5dpThSVdPsuHUEBkAV7nTsv0AGUAISiZZg/vWvf6G4uFhdU806efJkdU7A0apZghOlU1JTAFR/j+H5jXnz5qm4CObOZ+qm44/vEoRJfJdpInkD0CVLlqBbt27qHfc/b/kxAOrOqda7NgDaerxu7pcqy6qxYkyikjqnvR+FxLAc5KUfQGV501fbekuTAdCOjZ0q98EAoAkJCejUqZNSrRYUFODPf/5zvQBKFe7HH3+s6v6KFStcKty4uDhQiuX8JFWoBEatwnWCZGMAlPOb8+fPV98i0GkAHTp0KHr16qXup6Sk4LjjjlMS6L59+/CPf/wDGRkZ6hnTkZ6ers69AeiXX355zNyvetn8tQoHDIC2Cpub9REuNNwWnY8Jb4ZjVO9QrJmUrBYJFe8tR21ty5gkNQBqADSgVbjugMbFPTfeeCPuv//+egHUuYjoueeea9AiIvfvNVQCjYqKUguPuIiof//+LgAlMD744INKRcs0Uyrevn276ihCQkJwySWXKDAnoC9evFjd9wagBFi+xzjMIqJm9bWNDmwAtNEsa9UABwrK8cMXm11SZ0JIDvZkHWzWCtuGZMAAqAHQgAXQhlTgQH+HC54qKytVMjMzM9WcblVVVaAn26TPjQMGQN0YEiCXtdyasjQbo/uEYuwr6xA2Iw07EgtRUlSJoy0kdTqzbgDUAKgBUGeL8PN5aWmp2npD9TOlR6qSDQUfBwyABl6ZcUHQzEExSuqc//kmpb4t2FGCaj8uEqov1wZADYAaAK2vlTieT5o0SalQqUbVvz59+jjeMKftkQMGQAOnVGuqa7HhhwyM6h2C714PR9TCTORuK0JFWZVftqY0JqcGQA2AGgBtTIsx73ZIDhgADYxi35N5ANMGWAYRFg6LA7eq7N9dipojzbNS1tTcGQA1AGoAtKmtx4TrMBwwANq2RU1ze5zf/LZXCCyDCFnITSsCt6y0JRkANQBqALQtW6D5dlBwwABo2xUTFwVN7rtezXUuGbkF2zcVoLigHFxA1NZkANQAqAHQtm6F5vsBzwEDoK1fRJzT/HFckgJOek2JW7UTtGnbEgYRmpo7A6AGQA2ANrX1mHAdhgMGQFuvqGkQITUqzzLD1zsUqyYkITN+b8BInU5OGAA1ABqwAEqvJvURDcfTwg9p8ODBx7zekPD/8z//c0yYlrpore+0VPppnnDGjBktFX3Ax2sAtHWKqKSwAguHxSupc/oH0UgMy0VexoFme01pqdQbADUAGrAA2thK3xSQakqYxqaL7zfmO9qrS1O+01Jh6Mz7zjvvbKnoAz5eA6AtW0Q0erBlzS5lDIG+OkOnpWJnUiEIqC1lhs8fOTIAagC0fgBd0ReYdId/f4yzHtKgw86bBuJpEo9eTuink2oeEu/TgHzfvn3x85//XO3N5HOSDk8/mzT/p/2F0jWZJv2OvnY/0patNrenfZAuWLBAxcc05OfnKxN+e/bsUaYF77nnHpUmenX58MMPXdHp7zDM22+/rezv0mvL7Nmz1TvM49VXX427775bxUcLRnxPf3vs2LGuuNxPfOXvo48+Uj5Vr7rqKmW8XjvkplWkW2+9FXTZxu9qH6q0/0sbwpTeTzvtNJcx/csvvxy/+93vFH+HDRvmnoR2f20AtOWKuDi/HHM/jVVS5+xPNiI1Mg9FeWXgfs9AJwOgBkCDAkDZeefm5ipj8nRcvX79etW2NIDyQoOUbnT6mhId/XWS6LWFXl00AOt3dBjnkQ6vn3/+efVubW2tksDCw8PVK0888QRGjhyp7s2cOVPdo3eYv/zlL6AN3oqKCgWSBHeS/g4Nzt90000gQNIoPg3KE4QJoL/97W+V1xm+P27cOJch/MOHDytrRvRI44m85S82NlYBHk0J0iISQV0DKAcU2iYvXcDdcMMNKmoCKJ17M79UjZNXJCOBpnpivbnXDA7U0AzfMtsM36thWD8nHTmp+wNqkVB92TMAagC0fgCtrxa10HMNOuy8CTqa6N1k2rRp6rIhAFpdXY2XXnrJZYj9N7/5DSgxkvQ3dNzO41tvvaWMwmuLQwSTCRMmqFfoVu3kk092Oc7mTQIofYhqos/Rr7/+Wl3q77z++uuYOHGifgVPPvmkMiLPPF5//fWu+5S2aThff5t+UQnonshb/vhtLTUz3BtvvKEAlBIreaDj5vGss85SURNAtQ9U3vjf//1fdd8AqAFQVRH89Ld3ZwlmfnisGT4ldQbA1pTGZNEAqAHQoABQ5/wbwVD7Am0IgPLdRx55BAQaEr2dcFEMSQObunD7e/PNN+FNdZqYmIi///3voGqU0hqJ33nqqadcsRBA6bybpL/jC0CdeXzggQewcuVKV1y+TrzlzxuAUhqnpOyJnC7c+Fyn2wCoAVBP9aWx945U1yBy3nbl5Hq8MsOXobamcMtKMJIBUAOg7QZAjz/+eBdIsjHqzp8g9vLLL6v2GRoaqvyCNgRAKfFddtlloMRG2r17N/bu3QuqTDk3STUy3aRptSiB7K9//SuKioqUCpfG491VuD/88ANuueUWpcKlT9BTTjlFScPuAEUVLp1xa9CnKzO6RvNE3vJHFS7nfanCZR4o0eq0co5z7ty5Kjqqs+lvleQNQDdv3oxrr73W0+c7xD0zB9r8YqbloCnvbVBznYu/icf22D3W1pRW8JrS/NR7jsEAqAHQdgOg//3vf5Uq0n0REec9OW/KRTvPPPOMeqchAMomQ3BiOP4YBxffDBo0SKlD+Zxzi1zYxA6WAErQoyq2KYuInBIopdp3331XfZc+ShnnwYMHPbZiX/mjc28CJxcKUar97rvvVBycT+UiInqJOfvss1We+MAbgBLIOU/K980iIo/FYG564UBVxRGETElVwDnx7QjELs9Wxt8PlR72EiJ4bhsANQAasAAaPM3ISikBlOrlQCItPR86dEgtRIqLiwuk5AVNWowE2rSiykrYh0nvWGb4lo/eiozNlhk+LiBqD2QA1ACoAVA/teRABNDHHntMLRailPzpp5/6KacdLxoDoI0rc8sMX6KSOmmGL37VTuzJOggahW9PZADUAGiHB1AuCHKuSOU55z4DjYIlnYHGN3+kxwBow7jI+fRtMfm2Gb4QrBqfhOyt+1BWXOnaOtawmILjLQOgBkA7PIAGR1M1qWxLDhgArZ/7BMnFw7coqXPa+1HYui4HBTsO4khVTf2Bg/QNA6AGQA2ABmnjNcluPQ4YAPXOa5rhS1yXq8zwjX4pFCFTLTN8ZUXtU+p0csIAqAFQA6DOFmHODQc8cMAAqAemADhQcAjzP9+kpM5ZH8UgKWI39uWUtmup08kJA6AGQA2AOluEOTcc8MABA6DHMoXOrDetyAYNv499ZR3CZ6VjV8p+HCoJ/q0px+bU9wZIzPUAACAASURBVJUBUAOgBkB9txHz1HBA7fM1bLA4sI9m+AZZZvjmfb4J26LzldQZDMbf/V2GBkANgLZbAF28eDE+++wz1WZoUEBb4fF3I2rJ+NwtFLXktxob98KFC12+WBsbNtjeNxIooMzwzc9QZvi+ez0cGxZkKKmzI8x1equvBkANgLZbAHVW+rYCUHpdaQ4FMoC6Wy1qTj4DPWxHB9C87cWY2t8yw7fo63ik0wzfnnJQlduRyQCoAdB6AXTIxiF45sdn/PpjnPURPa5ceumlao/mCy+8oOzH0r4tDbKfc845yicn7cmShg8frkzS0f7so48+qu45DRs4AXTLli2gf0u+e99994GeVUg0TE9zgPwmzd9FRESo+57+aNnn4YcfVt9kHNw36rR7S0P0NHtHe7me8sE4aWuX5gFpr5YuxLTVoB9//FGZB+R9+uakiT+a9qN5QJ1fXtM7jL52T+OSJUtUmjp37oyuXbsq12l8h+/Tsw3517NnT2WLl6YASd7SSZ6/9957Kj/kG92wbdiwASeccALoJYb7ZmnisD1TRwVQSp0Rc9JdZvg2Ls1CXvqBoHI51pL10gCoAdCABFB2WHfddZfLmHrv3r0xZcoUZQheu9uiTVptOo9G3Ok3k3TgwAF19AagBM6wsDD1Dj2mvPbaa+qcAErgIy1fvlwBj7rw8Ed1MEGdlJSUhF/84hcuABURzJkzRz3zlg+C1jXXXOMyED9kyBBlj5aG3+nlhb46uSmdIK1t5NJBt3aPRvClbVtvxEGB9nk6fvx4V77IL22RiEDNtDIt3tLJ+PkOAZn0zjvvuPyUGgnUG/fbx/2CHSXgfs5vXwzBkhFbkBlXgOK9Rup0lq4BUAOg9QKos8K01jmdVRMUtYWgM844A5Qif/7znytvKExHVlaWes5zGkanD01KUVqS8wSgNMhOJ9aaKDlR0iMRQCMjI9U5pSztTFq/6zzSaDw9u2hiHFoCJZhq1a23fCxduhQnnniiK3806N6jRw9QOiawauI8rgbQnJwcV1opZTMOb0SrRTfffLMyRk/ekT8k8tPpmJtSJAHUWzoZ5le/+pULjGfPnq0kV943AKpY2u7+aPhg/VzL5diENyMQS6kz4wAOV7QvM3z+KDgDoMENoG+ISIqIJIvILBH5jYicJiIbRSRTROaIyK/qy+LFF1/8k7rU1iqrESNGoF+/fj9JlzuAUkVJImAR0Og0ms6h6XKsKQCqQZCgQr+h3sgXgGo3agzrLR+U6Lp16/aT6H0BKF++7bbbEBISgtNOO80F0j+JxB4MEHxJnEfl4IDkDUC9pZNhnPmZN2+eAk7eNwCqWNqu/nJS92PKuw6XYxv3WFJnELsca8kCMgBaH7oE7vO/icgOEfl/dhLnisgzIsJjN/veWBHpXV8WAhFAU1JS1Jwf/W+S6GNz586dSp04a9Ysde/jjz9Wfj45H6jdk9HtFiVXqnE9ASgDcm5Sz29SquWcKokg01AAHTp0KHr16qXCMa3HHXecK6wTcLzlg3ORlIQzMjJUHPT1SZ+fVOHyvp5TJMhqCZQvzp8/X+WPc7W+iAML+vAk0YWbBtA+ffqA6mIS1cBahestnXzPmR8ngNLH6qRJk1Rc7f2vrQeULc3fyvJqrJ6UotS19J6yafkOS+o8ZDmhb+nvB2v8BkDrQ5fAfU4AzRWRP4jIcSKyTERuFZH99jVTfqWIrKovC4EIoGxQVBdSYuKc5UUXXYTo6GjVmVPKpI9M+qckEBE0r7rqKpfvTL11xRuAOhcRUZJ0LiJqKIAS8Kgypur1/vvvV+nkvCXJCTje8sH7lCTpmJv5409LjM5FRK+++uoxAMq8/t///R+2bdumvuXtb9GiRUpKJd/efvttF4ByQHLjjTcq/tEZ+F/+8hfX3LEnfjN+Z36cAEp1N/NPsNaA7y09wX6/PQPo9tgCTHgrQm1PWTE2EXRBVkIzfEbqrLfaGgCtD10C+/lrIlIuIoUiMkNE/mirbnWq/2Grd/W18/iCXfibTznllJ9UlEDtMJyd+U8S3Yo3qDKmtEgieHA1alVVVYungABP59hNJS60onqbFBUVpYC/qXF1pHCB2h6aUwZlxYfV4iAuEuIWlYS1uywzfNXN23rVnDQFW1gDoE5ICa7zE0QkVET+JCK/FJFFIvJkIwDUldtAlUA9NaZAAdDS0lLloJrqYEqPK1as8JRcv96jZM3BDrfGNJUoJVNiZLop/cbGxjY1qg4Vrj0BqDb+Pu7VMIzuE4o1k1OwM3k/yg8edi0W61CF24zMGgB1wUjQnTwsIhMdqX5KRMa0JxVuM+q134KuXLlSSWl6NTCP3PcZKPTJJ5/8JH28Z8i/HGgvAErjB/OG2MbfB8UgOWI3ivLKUXOkYxtEaGptMQDqQKAgO73cXoH7WxH5mYhMEZFXRGSe2yKiPvXlK5gk0KZWdBPOcKA5HAh2AK2pqUXs0mwlcY59NQzhs9LAFbdcPGSo6RwwAFofugT280EikmbPc04TkV+LyOkiEmurcgmmvOeTDIA2vQGZkB2DA8EMoDSIMONDy/j7/KGblfH3onwjdfqj5hoA9QktHeOhAVB/NCUTR3vmQDACKA0iKDN8vUIw/o1wRC3MwO70Yhw2W1P8VlUNgHYMjPSZSwOgfmtPJqJ2yoFgA9Bdqfvx/buRal8njb9nbC7Awb2HOrzxd39XTwOgPqGlYzw0AOrvZmXia28cCBYApbm9td8faxBhT9ZBVFUaM3wtUScNgHYMjPSZy2AAUKc3lZZoCDrOK6+8Up8G1JGeU2gtiEQTgzQ1GGwUyKb/Bg8e7JOdwQCgmVv2YuLbEfi2VwiWj96KrIRClBUbgwi+CvZwzWHUHm36CmQDoD6hpWM8NADqq4kF3rO2AFBtfKE53AhkAK1vf3EgA+ihkiqsGJOo1LW0Yxu/eif27SpVDrCbU17tOWxVTRUSChLw+cbPUVJV0uSsGgDtGBjpM5f1AeiewYOx88nufv0xzvqI+xnpl5Nm+mgTli7EaPWHnkVooo4WebRJO3pP4f5MGgjgj/4qSTTVx3fp/3LcuHHq3sSJE10uzHjju+++c9nD1R2pNsBOc31nnnkmHn/8cdcmc7o64z3Gq/11qog9/NHk37PPPqt8jNKAAU3skWhm8J577lEm9ujnk67KSHz/jjvuUHmguUKa1yM57fQ6AfSrr75SZvn4rnZ1RrvANKhPU33MN72yVFRUqHg8/dGYAo1BcI8rzf4xLhLTePfddyuTiddee61Km6e80CoTw2mzhGPHjlXh6U6N7tPoDYY+SW+//XbQFCBNGLJcNK1evdrn3lraHGYdZV4++OADHUy5nPNUDr54TrOLrD/kOV2zkfr27au8/DD/LGdPFIgASv6mRuXhu9fDMap3KFZNSMLOpEJjEMFTAdr3CJwZBzLQL6IfLp52Mc7//nyk7EnwEcL3IwOgPqGlYzwMRAClIfTzzjsPdFxdUlKiXIsRQGnHVducjYmJUZ07q/gjjzziAhB26HRbRqIRehIBhMCwf/9+5e7s9NNPd/kapdqW7r9ITgD93e9+h9zcXOXMmo6vaQFI++vULsHcjb2rSBx/7777rnKxxls0cM8BATt4ghPt0DI9Om0000dj8QQ+TTofngBU84jx0YUbASY+Pl4Z1qdLNdr8JdGnKN28eSPyhWb9SAQTJ4D+7W9/c/HQW144MKFhfxJNBbI+kT8//PCDct7N8sjLy8Pvf/97BaDs+Al82hn4Y4895vI3qiJx+9NlyHjIh61bt/osB2/pJM/pxYY8ZTnSqhNdxJF0ubt92nUZaABaWlQJLg6iGb7pH0QjcV0OCneXGoMIrhI79qSmtgbbi7dj4IaBuHzG5Tjv+/PQ9+s7Efn0vSjel3vsy424MgDaMTDSZy7rA9BG1Ce/vUppis6uNdGAPDvp3/zmN8dY3qGkRfrjH//oMoquw/DIuVMtlRIQaZCeRJBasGCBkmApOWnSHSkl0JtuuknfVp5XCEIEJUpjmpz+OvU955G8JSBpS0b0tMLOmJ159+7dXa8yr8wzPbJQwqS3Fe0xhi95AtBvvvnmGB4NGDAAw4cPVwBKCUsTva9ogNP39JGg7rSFTHByAig9uWjylhdK6RwY6DzSLjA9vdBROaV9TZT+KIGSqF0YNmyYGlTwfV8q4jFjxig/qJSSWc70xuOrHLylkzx3Dk7oGk6bRdTlrtPqfgwUAKUZvoS1ORj7yjqMeSkUIVNTkZOyHxVlLW+H2Z0nwXB9pPYIdpfuxpexX+LqWVcr4Ow19g7EdLsTKWedheTOnVGUYHktakp+DID6hBa/PEwSkUQfP798pDmRBAuADho0SEltniq6JwAlCFL9SymWRBDiPRKlV6pQCVSjRo1S9/inO1K+53QjRlUkO2BfHbcrEscJ1bxpaWmOO9Yp43rqqadc9wmgBEQSJS6CNYGaeSY1FkA1CDIsJXcOJDxRfQDKfGvylpcHHngANHnoTr4AlBIp4xs9erRLleoenteUZOnYXHvM4TxqfeXgLZ0M58wPy1fXB13untLAe4EAoDR+MPezWCV1zv54I1Ii8ywzfDVNXwTjLb/Bfp8Lg/aW78XwuOG4cc6NCjgfn3gLwp97ACnnnqt+ya+9iPylC1BTYuZAm4MfLR32nyLC31D7d76I8DfE/rX09+uNPxABNC4uTs3LUb1Jw+2UqAgEVLfOnTtXtW+qAhMSrPmLRx999CcqXM433nXXXepdzpX++te/dnWYvHnhhRfi73//u6tz5j3dkXoDUKaHYbT/Uc6ZOYFWfczxR3UiO22mlUQVK4mdOf2WEiwZJ6UrqnAJLNrLy9KlS11zhZ4AVPOIAwSqcQmaWoXbUABlWvguBxQkpleHdQccb3mhCpdzmnS1RqIUzfRQhXvLLbcox9/5+fk4/vjjXRIo32PZnHzyyT7BieVLDQJ9vnKe+89//rPina9y8JZO9/w4AZRp0+lXmXD7a0sApRm+jUuzlBk+GoCPmJ2OvAxjEMGtiNQl29m+8n2YmDgRt82/TQHnPVO6YtVrjyClc2cldSY90w35q5aiPC4OpaHrDIDWixCB8cIWD8mI93Cv1W8FIoCyNTgXEXGejABKiYSLQNip0helltDYuVKi5LwpVYmc0+N8HNV0VPOyg3dKoIyf3k0IvE6qD0D57pIlS1yLiF588UWvC0/4Ljv6F154QaWLc5QabNmZM03XX3+9GhzoRUSU5PSCHqqWtX9STwDK+L0tItIgyHd8SaB8TvDU36T/0S5duvC2AiqnxOYtLwQ3ghZ5z+8yT5xnZGfG8FxERHW4XkSkIgeUKvbyyy/Xl16PlDqpIub8N9XA5B3JWzl4S6cvAKUmgvUk0BYR7aUZvoHRSuqc//kmpG3MR8n+CuOr00NtKa0qxeKMxXhw8YMKOLtOuwYL+3VDyuWXIvXMs5D04N3IXzjPAs7wCJTHxKB6717X4NZDlPXeMirc1oOrBBG5yvG5LiLCe21OgQqg9dbeZr5AMFu7dm2jY+GCHRIBonfv3mour7GRuHfmjQ3vz/d1fhgnBxUE0dYgguuECROa/Cmd7uaUQ0M/3toSqDbDN0qb4VuQgYIdB1F92PjqdC+zQ9WHEJkbiR4re6hVtVdOvQxTPn4cyddebQHnLTcie/IYlG6JQ1lEBMqjoi3grGk+Lw2Ath58XSQiW0Vkp/0jePJem1NHA1C9Gvahhx5yb4sNuubiF0q5lIApseg51gYFtl8KJADlVhnmh9Ijt9Do1bGNyU9j3+U85TXXXONx4VdD4/JHOTT0W60JoLnbijDlvQ1K6uRK2+2bC1BWVNksSamh+Qym97iyNrkwGa+vex2dp3bGhVM6Y9iwbki8rasCzuRruiB75Fc4GG8BZ9n69ajatQtHbYfy/sirAdDWga9fiMgb9qd+LyL8BQx1NAD1R8Nxj2PSpEmuVah6NWqfPn3cX2vTa6ZHp00fme5Aocsuu+wn6dPbi9o6ja0BoFU0wzelzgxf7LJsFOaWgtKooToOEDizD2bjg8gPcMm0S5TU+d6oBxD/4B0WcF56MdIGD8DBTbEoi9yAsvAIVOXk4Kg9R18XU/PPDIC2HozRxVhAkgHQ5jckE0P75kBLA2hWfJ0ZvmWjtiI7YZ8yiNC+udq43FFVv6dsD4ZsHIIuM7uoec6Xx9+Djd3vQ8rZZyOlUyek9n0N+6MjURYVjdLwCFRmZqLWhxGRxqXgp28bAG09SPtaRL4VkWts1S3Vt0aF+9M6ae4YDgQcB1oKQCtKq7B8zFalrqX3lC2rd0H56qw2W1OclaC4shijt4zG9XOuV8D5xNQ7EPHiw0g57zyknHMOUvv0RGHYWpRFx6B0XRgqkpNRa29fc8bj73MDoK0HoOtExP0X2nqf9/4lI4H6u1mZ+NobB/wNoJSmUqPyjzHDl5taZHx1ulWc0sOlmJE6A7f/cLu1JWXGLVj11uNIubCzUtcmdn8Ee1cuQ1nMRpSFhaEiKRk1paVusbTcpQFQ77jSYZ4YAG25BmZibh8c8CeAOs3wTXs/CklhuZavzlprr3D74FjzclF5pBJLM5fi/kX3W1tSZlyLhe8/iZTLL7OA8747kDVnMkriNimJ81BCAmrs1fHN+3LjQhsAbV2YvFNE/isiHzh+rZsCD18zANq4RmPe7ngc8AeAWmb4dtWZ4ZuSiryMA8ZXp6M6VddWI3J3JJ5c/qQCzi7Tr8CUz7oj+TprS0rizTcgY+IolGyJB1fVlm3Y0Oy9nI7PN/rUAKgHQGmhW2NFZKqI5IrIQBGhib+JLfStRkXbHgCUdmSd20m4aZ/bVZpL7haJmhtfU8IzDdq7TFPCmzDN50BzAbR4TznmDdmk5jpnfRyDlA15xiCCo1hoszZxXyJeXPOiWlV76bRLMPKb7kiyt6QkXX0ltg8fgoPxmxVolkWsR9XOnTha1bY2gA2ANgpqmvUy7eGS9PF/RWS9fa9ND/UBaMScdCz4Ms6vP8bpT3K6+PJnvIEAoK3lTNyffGtvcTUVQGmGb9Oy7GPM8OVnHjAGEewKQpu16UXpeHPdm2ovZ+cpnTF43JNIeODOY7akFMdGoywyEqXh4ahMT0ft4cMBUcUMgLYedG20PxUjIieLyK9FJLP1Pu/9S4EKoO5m6mh/VvvmpNk1egGh1EkPJL/85S+VKTmakSNpQNVhtDk4Gj5Ys2aNMldH+7obN25U7/NIl2X02Ul7u9oAfH0A6i0c00U3YjS2QD+l3OOozfLRUwm/RVu8NOagLeowzfR3yfs0i0f7vUz/SSedpGzGcu+m00NLQPQgHSQRTQFQOrWeOShGSZ3zaIYvJh8lhcYMH6sMF1HlluYes5ez7/ePIe7JB5By1tlIuaATUvu9jsIoS03LvZyHs7L8u7K26hBwIAc40nQwNgDqHVf8/eR9ETleRB4UkQIR2SMiH/n7I02Jrz4AbYs+0puvSxFBZGSkShKdO9POK0kDpk6rviYA0TcmN+TTZist4DAcGzCNzWvHzvQ5ql1qEWDpYYRUH4B6C8d00QYuKSkpSaWBAFpYWKgs8NDYOomuxrQ9X6Z5xIgR6j49xPTs2VOdGwlUsaFN/xoDoDR8EDlvO7QZvg0LMkCps6rySJvmIRA+TokzvywfQ2OH4sqZV6p5zl4zHkL0i92Qcq61JSXppR7YG74a5bHWAqHKtDT/7eWsqQYO7gZ2RQPbVwPblgMVTZ/qMQDaFMRpfhhKnwFjjSgQAdSbr0v609QUEhLiAkANmPqZviaAOn1j0gfn9OnT1WtZWVnK8g0v6FiZkiLN2VH6o6RLqg9AvYUjMIeGhqo4+EepkgBKDysnnniiy+IOJdQePXqo95jm3bt3q3MaeO/atas6NwCq2NCmfw0F0F0p+11m+BYOi8P22D1G6rRLbt+hfRgRN8K1l/OxGXci7PUn6rykPPUo9vy4BGUxMSgLC8eh+PhmeUpxVZjaWuBQEVCQAmSEWMC5Yz0QORyYco/1zPVy404MgDYfDBsaQ6SIDBaR20Tk/xoaqDXeCyYAdTp/JoAS9EgaMHX119cEUKdnEqpytVNn5zPepyqYxPsMT6oPQL2F8wag9CDSrVs3Fbf7n04z7xNs6YGFZADUnVOtf10fgNKh9aoJyUpdO+md9YhdmoU9WQeN1AmgvKocM7fNdLkXu2vmzVjx3lNIvszykpL4wF3ImT8DZbGxlhGEpCQcKS7GUQJfc6jyILA/G8heD2xfBWSFAekrgaWvA0NPBwb+Dvj8dGBPYpO/YgC0NRDK+sZpIvKUiIy3V+BuFhFaJ2pzCkQA9ebrkipcuiojUcX55ZdfqnNKjXR1pkmDkRMk+cwbgBKI58+fr4ITsBoKoN7CDR06FL169VLxpaSk4LjjjlOgSEPtlKIzMjLUM6py6T+TpNPMcyeAMo+cGzXUdhzwBqCcCtgWlY/xb4RjVO8QrBibiB2JhSg/YIy/VxypwJLMJa69nDfOvA5zP3nG5SUl+dau2DVlPEpjN6I0LAyHNm9GjR9WzoPAS+BMXwVkhgA7o4DNk4Ep9wIfnmAB5/iuwIaRQNpKo8JtcwRqeAL+KiLdRGSUiKSKyMqGB225NwMRQNlVeltE9MQTTyjfjZyn1FtXOHdIv5OeFhE1RAIlKNPnJBcR9e/fv8EA6i0cgZGLnKiipQ9LLgDavn27QgBKzvT1SR+c/C1evFjd9wagBFjtr9MsImobEPUEoFwQtHBYvJI6aRBha0gO9u8uRU0HN8PHLSnrc9fjieVPqDnOq2Z0waRveiLplhvVytqUa65C7ugRKN+yRa2qLY+NtSRO2+l8k0uY85ule4AdkXUS5+oPgG86WaA5+GRg/nNA6hIgL976bV9jALTloMWvMWeJCFfivmbbwP25X2NvRmSBCqDuDcldmnR/HkjXNTU1qKysVEnKzMzEqaeeiqo23rMWSPwJtrQ4AVQZRAjJwdiX12HMy+sQMjUVuWlFqCyvDrZs+TW9BM4tBVvw4uq6vZxfj+uBxPv1lpRLsGPIYBAwlREE7uXMzcXR5vrlrK4A9qUDBEP+EmYBc7oDn5xkAefIS4DQwcCuqDrg3B1Xp9KlqreJZFS4zQCeRgYlcM4TEW5j+V5EnhWRfzUyjhZ53QBoE1uPj2ClpaUgXzt16qSkxxUrVvh42zwKdA5oAD1QcMhhEGEjUjfkgUYSamuaOV8X6AzwkT66F8ssznTt5aRfzkGTn8aWJ+q2pKS/+xYOREe5HFoTOJu1l/NwmSVtEgjTV1u/9cOAsddaoPnRicCMh4EtM+pAk1Jnbqy1kIjq3YJkawFRMyRfA6AtAkk+I6UBhVdEZJeI1Pp8s5UeBguA+mjDLf4oGPx9tjgTOvAHOI+9eeUOjHkpVJniC5uVhrwOvjWF8785JTkYEDnA5ZfzrZlPIvZ5e0vKueci/dXeKA4PQynN7kVEWNaDmuPQmmravamWipbS5rZlwNI3gKH/soDzyzOA5e8AWevqgDNnI5Cx1lp9y/v7MwHuAfUDGQBtJZASka9sFW6KvZDoaRE5vfU+7/1L3gCUDcSQ4UBH50DV4SPYFLVFzXXO/TQW26LzO7wZvqKKIny16SvXXs7n5z2GyDeeRsoFFyDlrLOQ9mx3FK1epRxa0y+nMoLQHOtBen4zc50FhlvnANMfBgadaAHndzdYi4JyNx0LnNzrmRUOFO0AKkugFhj5sUIbAPWOK/5+8pCInOTnSGmYYb6IpInINhG5UkT+ICJrRCTDPp5Q3zc9AShXtHLTvwFRP7Y2E1VQcYBznaVFFchMzcG6pZuwft72Di91lhwuwbiEca69nI/OvReh/Z9DymWXqAVC2x5+AIWLFyq/nGXrwtAsIwi1NUDZPoCgSCDkFhTu3Rx3nQWaH/8ZmPMUkLywDjR3bwayw633M0MtownN3Q7jo9YaAK0PXfz3nIuGnhQRWiQinSIil9nnTT1MEZHn7MC/si0dDRWRfvY9Hj+vL3JPAFpdXa22hXDux/wMDzpaHUjamozYqC2IiYhH1JotSIvt2MbfuZdzesp03Dr/VrWy9q65t2HZZ72QfE0Xy2btbTcjb/r3dX45k5vhl5PAWZIPZEdYqlqqX9d+BHx9vgWc3MNJNS2BUq+mVXObtpo2fytQXggwnhYmA6D1oYv/no+xt69QUiRRMtxknzflQEtGO0TkZ26B00WE22VIPPLaJ3kC0BaudyZ6w4GA5EBVxRGETtum1LUT345AzOJM0KYtzfN1ROJezmVZy3DfovsUcHadfSNmj3wZyTffYG1JufZq5I79FuXx8dZezq2JTXdozXlJqlqVwYPV1naThb2AT/9uAeeIi4CwIQDnNAmcXEC0gyC7GqC0yb2fzbBr25TyNQDqE1r8+jDejm2LI9atjvPGnnYWkVh7RS/jnCAi/yMiBx0REVyd145H8oJd+Jud1n2aUolMGMOB9sCB7K37MOm/6xV4Lh2ZgKwte1FW3DENInBLSnhueN1ezpldMOG7l5B4962WxHnZJdgx9FOUbdxo7eXcsAFV+flNm/I5XAoUcGHQamsbyiZt9OB44MPjgcl3ApsmWYDpXEnL9wmiNNPXgmpaX3XbAKgTUlr2nHtAfyEiGkj/JCJOMG3s1y8RkRoRudwOOFxEPvYAmAfqi9hIoL6aiHnW3jlwqKQKP45LVMD5fb9IxK3cgcLcUhyp7phSZ+r+VMdezkvxzaRe2PrgXZbEedGFyB7YHwejN7iMIFRzrURj93IeqQJK8oBdGy2LQTTqvnYQ8O2llrQ5+K/AD88BacuPVdNyy4qSNrmS1nLI0Jb10wBofejiv+dPiMgSEdlt28SlavXhZkT/FxHZ6Qh/jYgst1W2RoXblq3KfDsoOHCsGb5QBaK7UgpBu7YdjciLnSU78U7YO6BPTu7l/HjKs9jy+P1qVS3di2W++zZKo6OsLSnrQrRIBAAAIABJREFU11sSZ2MlPxo94DYSzmtyLyZN7M16vM7oAa0GrX4f2BlZB5w5MXVq2gO5rTK32dDyNwDqQKAWPOUCoi4icpaIvCQiL4vI2X74Hh1yn2nH86GIfGH/nIuIuKjIJxkJtKHNxbzXXjhQsr8Ci762zPBN/yAKW0NzULy34xlEoHsxtZdzfd1ezrdndcem5x5FyjnnIuXcc7HttV7YHx6Csg0b4PLL2ZgtKdwOx9W0VL9SgkxdCqx6H+CcJg26f/QnYMYjQNxUNzWtvSiIxuAP7AK4lSXAyACoT2jx68PmqGu9JYTzoDRKnygii+yFSSeKSIi9jWWtva3FW3h13wBogLVKk5wW40Bt7VFsWbNLGUOgGb61U1KxO60Yhw8FXufcYkywIy48VIghG4fgyhmWX84X5j+GDa/X7eVM7/k0itasURIn93JWbt/eOL+cXAVbvh/YFWNtQUmYDcx9Bvjkr/aioAsB2qr1tJqWalouKKLEGsBkANQntPj14Ze2M233VbN+/UhTIjMAGsAt1CTNbxwoyivHnE9j1Vzn7E82IiUyr0NKnWVVZRibMBbXzb5OraztNv8BhHzwApLtvZypD9+PfdzLSYkzwjaCYNt1blBhVFda4EcQ5N7NiK8Aej+htDnoD8C0B4D4aXXSJiXTnRtsA/C0FJQFcI40CMgAaFMQp2lhykTkqIhUi0ipiPCaxzYnA6BB0FJNEpvMgZojtYhZnIXRvUMx7rUwRMxOR34HNMNH4ORezlvm3aKA8+65t2P5Z72RfNUVaoHQtttvRcHMaSiP3aT8ciojCI1R1dLSj15Nm7wIWPFf4MuzLOCk30364cxYUze3yb2bWaHW/CYNvau9m8FlU9gAaJvDV9snwABok/tmEzDAOUCn1tM/iFZS5/yhm5EeW4CyokrQylBHocojlfhh+w+4e8HdCjhvmn0j5n3zEpJuuFYBZ+oN12HP+HEo2xirVtYeio9vnF/OimKAFoC4rUQvCqKVIEqcY66yJFCCpdqCssny0an3bu5Ls9yJBanZUAOgbY9fbZ4CA6AdpSvtOPmsqjwCGnz/9sUQTHgrAlELM1Gwo6RDGUSorqnGqh2r8PCShxVwXjvrWkwd8xISb+1qbUm56krkDB+Gsk2blcR5KH5Lw/1yUsVKiZFGDdJ+tAwcuDyh/BGY2Q2gvVqCJn8EWK68pQS6bztAF2KNXcEbgNXXAGibw1fbJ8AAaAC2TJOkJnNgZ/J+TO4XqcBz8fAtHc4gAo0gRO+ORvcV3RVwcpHQmIkvYes9t1nAedml2PX5p8ovZ2l4uDpW79vXMCMIyvdmmiVtJs4HFr8CDP23JW1+8Z+fekIhcHIulBInfXa2sqWgJleiBgY0ANr2+NXmKTAA2sDWYl4LaA5UllVj9cRkBZyT+0Zi04psFOWVoaY6uObVmspk+uWM3xuP51c/j/O/P1+5GBs26QUkPHS3BZwXXYhdH32gVLVcHFQeFYXqvXtxtD5JkM8rDtTNb8aMs3xt0ucm1bTfXQ9sGGEZfVfSZlydQXdKnXu3BYTRg6by1Vc4A6CtC19X2460+VVaIjqtdT/v+WsGQH01EfMsGDiQsbkAE96MwKjeIVg+eit2JhWisrzjbE3JPpiN10NfxwVTLsCFUy/ERzOeR/yTtkPrTucjq+/brlW1ZZGRqMrJwdHqevjDbSilewDuw1SWgj4ERl1hgabyhNIdSF5Qp6al8QP66ORez/wEgHOjrWDQvS3rpwFQz5jSEncHishSEdluR36yiGxoiQ81Nk4DoG3ZBM23m8MBmuEjYHKuc2r/DdgSsgtF+eWoqekYUmd+WT4GrB+Ai6ZehE5TOqHf7GexqSeNIJyjjCBkvfYyDq4LVdtRytbbwFlVzxYR2qbl4p6MEGsec9FLwJBTLeD86mxg5XuWEXentEmrQlwoRPN83MbSQcgAaGPRpunvJ9ieU5wGFWgAoc3JAGgHae3tKJvKDF90Psa/Ho7RfUKxcnwSctOLcbjiSDvKpfesFBwqwODowbh0+qVqnvOVuU8i+qUnkHL++Ug5+2xs7/UcDqxZUwecubn1S5zchpK3BUhbCUSPBqbeZ+3bpJp2ws1A9BhrMRCBk9tOtq+yJE4adOeioA5IBkBbD77oOYWkjcnTc4oB0A7Y6EyWm8eBsuLDWDJii5I6p71vmeE7uO8QaGWovVPp4VIM2zwMXWZ2UcDZc/6jWP/mM0i54AI1z5n+9JPYv3w5KG2W0V5tfaramiOWmT2upt22zLJDO/ISS9qkxaB5PSy3YgRN/nast4CThg9KCwCG78BkANRGtVY4vC0i40QkW0SeF5FoEXmlFb5b7yeMBNqBe4AgyjqlzuSI3coYwuiXQrFmcgrytheDPjzbO9Gh9fit4+usB827HyEDeiL5kosUcKY98iD203pQVLRlr3bHDtT6UtVyYRDnNzPXAVtmAvOfAz77hwWcNOi+ZmCdQXeupOX8Juc2aZaP7sOCdN+mv+uJAdB64cWvL9xsG3unWT+eBwQZAPV3szLx+ZsDB/dVYMGXcUrqnDEwGkkRuSgprGj3BhGqjlRhzrY5uHnezUrivHvuHVjx0QtIvuIyBZyp99yJwjmzURYdg7KwMFQkJ/u2V+uyFhQCRAwDJt9h+dxUfjfvAGIn1JnY45wm923yl7sJOJDTLvZu+rNuGgBtPQh7U0T+1nqfa/iXDID6s0mZuPzJAapl49fsAg2/j315HUKnbUNeBzDDRyMIizIW4c4FdyrgvHl2VywY+iKSru5iAectNyH/+0kojYpWRhAqkpJQU1rqmfWUNmn0gCCYshj4sR/wzQWWtPnp34EFLwJpK2yDB44tKNy/Wbyz3e3d9Mykpt01ANpwnGnum1yFmyIidEFGd2YnNTdCf4U3ANq0xmNCtSwHaPx9rsP4e+qGPNANWXs2w1ddW421O9fiwcUPKuC8fta1mDG8NxJvtM3uXX8t8seOtvZyrgtDZUoKakpKPBeEVtNyGwpdhc19Ghh8sgWcdCUW8gmwK9oCTiVt2u7DuAVF2aXtmA7FPTPT810DoP5CoYbH08l2qJ0mInQ31uZkANRz4zB324YD3IISuyxbra6l8ffw2Wnt3vg7rQetz12Px5c9roCzy4wrMX5cbyTefpMlcXa5Eru/HmbNcYaF4dDmzZ6Bk3OTXBFLp9VZYUD4UGsF7cDfAx+eAEy5F4ibUqemVatpV1v2afdnd6gtKP6o3QZAWx++/mIvHuIeULMK1x+12MTRbjiwd2cJZg6KUXOd84ZsQnrsnnZt/J3WgzYXbMazK59VwHnZ9EsxYuIL2Hrf7Qo4Uy69BDmffYKyyA2Wofcttr1aSpfuxMU9XB2bsghY9iYw7BxL2hzyT2Dxy9bqWa6kzYmx5jVpXo8S6MHdQeM+zD3LbX1tALT1ALSPiITZatwPReSc1vu07y8ZCbStm6H5/pGqGmyYv11ZEhr/Rjgi52/Hvl2l7db4O1cUJ+1LwourX1Rm9y6edjE+n/oitjx6jwWcF3bGzoH9URqx3jL0vnWr8pDCcMeQclptz2/GTgJmPwF8cpIFnKMuB8I+twBTbUGhpaBVQHYEcGBXwDurPiaffr5QK7p3H8So0AzUNGP7kwFQ39jiz6efiUhnf0bor7gMgPq5dZroGsWBvO0HMLV/lJI6F3wVh8y4vSg/UNkw4+aN+lLbv8yOO7M4E2+se8M2u9cZA2c9j81PPagMINAQQtY7b6I0IgKlYeE4FBeHmoMejBTQKDsX+NDWbOinwLjrLNAcdCIw/SFra4reu0k1LR1bcwtK+f4Ou5KWQBmdWYgBC5Nw5adr8c++y3Bqv2VIzfcyh9yA6mIA1F8o5D2e39mP/iAinn7eQ7bSEwOgDWgp5hW/c4Aux9ZN36aAc+LbEdi4JAuFuaXt1vh7TkkO+ob3VbZqaXav77ye2Pj8o8rkXsq55yL71ZdRGrpOqWppr7a6oOCnht45v1mQAiQtsNSyX55hAedQOqx+w5rLJHCquc01lheUHZGWsQR36dXvJRp4EVZU1eDHpHy8PDMOnT5cpUDz9HeX464R6zFwURIWxe9GaWU9NoF9ZMsAaMuD1DL7EztsIwo86h+NKrQ5GQD10ULMoxbhgHI51tdyOUarQjuS94HeVNojFVUW4dOYT5XZPXpJeWX+04h67WnL7N5ZZyPz+Z4oWb0apeERKI+ORtWePTh6xGEcgtJm2T5r4c/G7ywJ86M/WcA59hpg/TDLDi1N6mWHW6DJlbe0FHS4rMMZPSgqr8Ks2F14auJGnNF/hQLNs97/EY+Oi8LnP27Diq35iMnaj137y5sFnqyrBkDbHL7aPgEGQNtjtx2YeaKHFKfLsc0/7sDBve3TDB+tB30b/63L7F6PHx5DxH97ILmzZXYvo/uTOLBsKUrXr7fM7hE4axxbRwicXE1L9euaQcDoLhZoEjxnPQYkzrX3bto+N2nQXW1B6Xhq2p37yzEmLAP3fRuJ0/otU6DZedAqPDtpI0aEbMea5D3YtKMIu4sPofywY3DSzGZiALT18CvEw6c83fPwWsveMgDazFZkgjeIA8rl2FuWy7EVY7YiZ1tRuzTDd6j6ECYkTnCZ3Xt03n1YO+A5JF9smd3b/shDKF6wUBl6L9+wAVW7dqH28OE6HiprQclA4jxgYS9g6L8s4KS6dsV/re0pVNNyxa12H9aOfW7WMabujHPJCTkH8NmKVNz45ToFmJzTvHpICF6eEY9JkdkI3VaAhJxi7C2pBFW5LUEGQFsWmxj7b+y5z60icoJjHvRUEeFe0DYnA6At0bRMnJoD5QcP17kce28DEtbuQns0/n645jCmpU5D17ld1ZaUe+bdieWDe7nM7qXdfScKZ860PaSsRxU9pGhVrbYWRKPu2hOKy2H1DcCGkZYlIa2mpbTJRUEl+R1mNW3VkVqEbtuLd+Yl4JKPVyvQ5CKgW78OR995WzF3Uw7C0/chafdBBZqHj7QMaOp6zaMB0JaHr9fsOc8qtzlQAiotErU5GQB1Nglz7i8OUEqg9aDvXgtTRhFWTUjCbhp/r/SfCs1faW1OPDS7Nz9tPm6bf5sCztvn3IKFX/RB0tVXqi0p226+CXu/n4zSyEgFnpQ4j2pD71TTckvJ9rXAqgHAt5dZ0ia3osx5CkheWGcpiKb1uA2FLsforLoDLAoqqazGgrhcPD9lE85+/0cFmv/pvwIPjNqAj5amYElCngLNtD0lOHCoCkda2Q+sAdDWg6+A8LziKbsGQJvTfZqwnjhAQ++Lvo5XK2ynfxCNxPD2Z/z9SM0RLM1cirsW3KWA86bZN2LuV72QdP3VFnDecD0Kxo5BKY0ghIWjMj0dtZW2s2m1mjYZSJgNzO8J0NgB/W7S+MGq/nUOq7X7sKx1wL7t1qIgTwxvR/fyD1ZgwvosPDI2Cv96d7kCzfMHrsSTE2IwbHU6ViXtQVRmITL3lrUJaDpZbQDUE6K03L3zROQREXnK8Wu5rzUwZgOgziZhzpvDAdqpTQjJwdhX1ikD8GunpCI/6wCqD7e8Oq056W5M2Nqjtcpe7QOLH1DAed2sazF9ZB8kdr1OAWfqNVcjf+QIywhCeDgqt21DTVk5UFNtuRDbGQ1EjgAm32mZ16OZvYm3ADG2w2qnXVqqdNu5+zBqKrbtKcFXq9KUOpZzmfxdNngNXpy6GePCMxGSWoCtuQeQf6BCLQJimEAgA6ANBBk/vEZj8utEZK+ITBaRAhGZ74d4mx2FAdBAaIrBn4ai/HLQ/N63L4Zg1scblfq2rKj9GESg2T0aen9oyUMKOK+aeRUmjXsJibd1tYDzyiuQ++UXajtKKYGTEmd5uTVHSTuz25ZbnlBoyJ3S5uC/WtJn6pI6NS3N62WE2NKmF+8qwV9VlKo1KsM2avCZZdSAoMkFQW/O2YIZMTuxfvs+pBeUgttSqltZNdtQFhsAbTb8NDiCJBH5uYhw7pNEbyxr7PM2PRgAbWhzMe954sAxxt9fDUPYzDTQpi3N87UHInCG7grFI0sesYGzC8ZNfBkJd9+igDPlskuRM+RTpaZVwJmWZgFnxQFrW0n8DGDuMwBdhxE4lcPqDy0n1couLb2g0O9mCFC0E6hpX3PEug4cqjqCZVvz8PKMOFAlS8CkipZGDWgdaGF8rgs0Dx6qBl3ZBToZAG096Iq1PxUnIrRO9DOzCjfQm4dJX30ccBp/n//5JqRv3NNuzPC5gHOpBZxdZnbB6O9fxhbb0HvqJRcj95OPXPZqqaqtPXTIWuCTEwtEfgNMus3hsPpOYNNEyyCCshS0CsgKB4p2ANy60g6Bk9Lj9Jidav7yP+9ZRg24GMgyapCKFUl1Rg0OVgQHaDrbhAHQ1gPQ0SJyvIj0EpEMEdliq3JbLwVevmQkUGeTMOcN4UB1VQ0i523HqF4hoPH3qB8yULi7FEeqg1/q5BxneE44Hl36qJI4r5xxJUbOeA1bHrnbUtVeeCFyB35gSZx0LZaQgJri/ZblHy76WfkeMPxCS9r89G91Dqs5t6lW0q629nDSUpAnryoNKYAAfofzlN+FZ+HB0RtcRg0u/Gg1ekyOxbehGViTukfNZxYcrACl0mAmA6BeQKWFb3MPKP2CBgQZAA3mJtz6ac9NK8bU/hvUXCdX2mbGtw8zfFyYEpkbiceWPeYCzuGzXseWx+5DyllnIfWCC7DrvXePBc79hThKCXLrPGBeD+CzU+rUtGsHWUBJl2HOuU2uwA2QRTD+qj07CsswfO123PFNhFLNUj17xadr0XvaZkyOzEZE+j5k7C1FcQDPZzaFFwZAWx7CLhIRX7/mpuAXtjSrbe6eJiIbRSRTROaIyK/q+4AB0KY0nY4X5nDFEYRMTVXAOemd9di4NAtFeWWoOeLBN2WQsSd2Tyy6r+iugPPyGZfjq/lvIK675SEl9bzzseudt1GyNgSltjPr6rydOLo3DYgeY62mHfQHQK2mvRWgvdrczXV2aWkx6GBeu1LRcrCRkncQQ1duQ1eHJaBrPw/F67PjMT16J2Kz9yPXNp0XKKtm/V0tDYDWhy7Nf86Vt95+oc2PXt4UkZkiogF0roh0s+MdKyK96/uGAVB/N6v2F192wj4QNL/tFYJl3yZgR1Jh0Bt/Z6e+ac8mPPuj5cyawPn54rew6fluSDnnHKSeey52vfE6SlauUlLnofgtqMnLxlF6N1n9AfDtpZa0+clfgHnPAlxN61LT2nZpuZConUibXNRDUHx/URK62CtnT+27DF2/DFPWgWgJiPszdxaWo8yP9mYDuTUZAK0PXQL7+d9FhPZ0b7QBlAuT9ovIcXayrxSRVfVlwQBoIDfRtk3boZIq/Dg2UUmdU97dgPjVO4PeDB+BM25PnAs4L51+KT5b9g42vfI0Us47D6lnn4Odffrg4KrVlsQZH4eanG1A6lJrPvPz0yzg/Ops2+jBestpdfpqa45zXxpwuH1sQaE5vJBte/HmnATQODtVs3QHdufwCHvl7G4FqnnFFS1mb7ZtW4DvrxsArQ9d/PfcaTzBed6cL3Af6cUicr0NoH+0Vbc6zn+ISLK+8HY0AOq7kXTEpwSZbdH5aoHQ6N6hWPldEvK2Fwe9QYSkfUl4ftXzoFuxS6Zdgo9XvI1NbzyHlE7nq3nO7J49cWDJUpSFhaM8KgLV6ZtxNHIkMPkOgM6quQ3luxuAqG8taZPuw2iXlqtpD+4GaoN/ERXN5/0Ql4ue38firAGW+bwzbfN5g5elYFliHuJ3FSujBsG+CKi5bdsAqDdU8f/9kSKif+Ntu7jNMaRwl4hwZS+pKQD6gl34m0855ZTm1iMTvh1xgGb4Fn/jMMMXlouS/RWglaFgpZTCFPRe01sB58XTLsZHi1/DxteeRUqnTmplbSZdiy1chNLQUByKCceR+CU4uuR1YNi5tpr2r9ZezuQFwO7N1p5NLgzK3wqUFwb9alp6LOFin0fdzOd1nxCDb9akYW1qgZrzLCw7jNYw0h4s9cwAqI1AbXDglpaVzfjuZyKyW0R22laNKkRkhlHhBkvTC7x0co4rYa3DDN/3KUFtho9SdHJhsgs4L5p6EQYtehUbX+puqWrPOhvZTz2F4h8WoDRkLQ6FLkPN+gnAjEeBj0+ygHPkJUDIxwDnPZVdWloKWgvQfVi1bdc28IqyQSniqthv1qTjjuF1K2cv/WSNMtxO83l65SyNGtQE8eCpQcxo4ksGQJuBYM0M+ksRSW9mHDq4lkB5Pc9tEVEf/ZK3o1HhNrH1tKNgRXnlmPtZrJrrnO00wxeEHacGzj5r+qDTlE64cOqFGLjo5WOAc8dzzylVLYGzfOUCHFn6AY6OucYCTa6onfYgsGWGpaYlYFJNS1dilDaD1OABB0hxO4sxaEkKrvk81LXd5LqhoXhtlrVydmNWoVo5y0VA5KMh3xwwAOoNVfx/f6mILLF/XDGbLSJD/PQZJ4CeLiK0esRtLATTX9f3DQOgvhtJe37KLSjcjjK6TyjGvRaG8JnpQW2GL2V/CpzAOWBhH8S88lSdxNmzBw4sWoyy1StQvux71Mx6Hke/OMMCzs9PB5a+bkmYlDi5KIjm9fZnAlWHgrIaWD40C/D23ARc9JHlQ/P0fstx29fhePeHRMzfnINNO4qwa3950Bs1aIsCMgBaH7r47/l1IqJ/V4kIV9AGBBkAbYum1/bf3JN9EDMGRiupc/7QzUiP3QM6vw5GySOjOAMvh7zskjgHLH4Z0a89jZTzz0cqVbU9eqB44UKUrlqKisVfo3bSfTj68Z8t4BzdBYj4EqB5PS1tcjsKLQUFobRJ6XHRlt3Kk4nTh+b9oyLxCRcBbc1TloA472nmM5vXDg2Atj6E0Q7uHxy/1k+B2xcNgDavEQVbaLoWi5idrvZ0TngzAlELM4LWIMKukl14O+xtF3D2X/oKot941gWcWc88g+If5qN02TwcnvE2jo68wgLNj0605jq3zraAkypamtmjVaEglDb3lR7GlKgdeHx8tMuH5nkDV+KJ8dHKhyYXAaXml4CLgCiVGvIPBwyAuoFJC15y1StdmHHRD9W3O+xjC36yYVEbAPVPYwqGWHal7Mf3/SKV1Lnom3hkby1EZXl1MCT9mDQSOPtF9FPzmxdMuQB9F/dG1Ns91XaU1DPPQtbTT6N43hyULv4e1RO74yjVs9yCMvTfwLK3LLDkFpTtqxx2aYNrC0r2vjKMDNmOu0esBw0acI/mxR+vRs/JsRi9LgPhafuwvcAyn2cWAR1Tffx2YQC0YRjjj7doQJ77NAOODID6rT0FbESVZdVYPTFZAefk/65H3Mqd4HaVYHAZ5WRq9oFsvBP2DjpP7aykzjcX9MSGN5+pA87uT6J45lSUzxyMIyNuwlG9d3PstZZ3FNqlpZqWW1DytgSVs2qq1hNyivHp8lRc/0XdIqCrh4TglZlxmBq1A9GZhdhRWA56NglGVbyzrIPh3ABo68EZt6z8tvU+1/AvGQANhqbatDSyE+Xc5oS3IjCqdwhWjElEfuYB0JtKMFHWgSy8se4NdJ5iAec7PzyHDa92rwPOJx9H8bRxqBjfGzVfXKCkzaMf/QmY9QSQNN/yvUnQzFoXVGpaOpKO2L4P/X7Yiks+WaOkzFP7LcPNw8LQd/5WzN2co0CVnk0qgqxMg6n+eUurAdCG40xz37xQRBJEZJyIjHD8mhtvs8MbAPXWPIL7fllxJZaMTFBS59T+UUhclxt0i4RyS3OVxEk1LX/9fngB0S8/6VpVm9X9CRR/9zkOj7wPtZ/8wwLOL88EfuxrgSVX0RI4d8UEjcEDLgJavGW38mRyzgeWJSD60rzv20h8uCQZSxPykLT7IDjvaRYBtW0bNQDabPhpcATcWjJMRJ4VkacdvwZH0FIvGgBt20bo76/TYhDBctyrYRj9UijWTE5BYW5pUHlNyS/LR//1/ZWqlsDZf85ziOn9OFLOPddaVftMdxwc+V9Uf3UNjn54ggWc391omdij9xO1mnY1sC8dOFzmbxb7Pb49Byvx/YYdeOy7ukVA536wEt3GRWPoyjSsTM5X5vMoaRrQ9Dv7mxyhAdCWQqWfxksH2gFJBkCb3H4CLuCBgkPglpRvXwzBzEEx2BaVH1SLhHaX7saAyAFqcRCNILw7tTtinqFbsXOUkffsHt1R+tVTqPnsHAs0aTFo7tNAykLLUhBX02avB4p3BvRqWqrWucBn2Op03Pp1uMuoAdW0dDzNRUBhafuQXlCKonbmQzPgGk0zEmQAtPUg7VMR4Urcvzq2sHA7S5uTAdBmtKAACVpTU4tNy3coiXPsK+sQNisNRXvKUFsTHFsWckpyXKtqCZwDJj6OjU/ei5SzzkbquedhZ49HUP7Z7aj96GRbTWt7QskKs1bUEjhzN1mLgmoDM89csEUj7NyLyYU/XDXLn7YENC16JzZk7FPuwGjQPdgWeAVIU2jVZBgAbT344rYV9x+3s7Q5GQBt1Tbn94/t3VmipE1KnXM/24TMuL2g8+tgIM5x9gvv51pVO2jcY9j00O3KwHvq+ecjp+e9qPjoChwdeDyODvw9jn53ExAzBsgMsczrce9mALsP457LdWl78c68rcdYAqLU+e6CRCyIy1WLgPYcrFA+NM3K2WCotXVpNADa5vDV9gkwAFrXIILpjCtp18/bjlG9QpTbsagFGUHjqzOvNA/vRrzrWlU7eFQ3bL73Zgs4O1+AvJ63omqgZWLv6Md/wdG5PYCURXVbUAqSATqrDkBps7SyGksS8tB7+mac8761COiM/itAS0AfLUlWloBS8g5if9lhcJWtoeDlgAHQ1sMvpw9Q53nrpcDLlwyABl8Dzt1WhCnvbVBznQuHxWNX6v6g8NXJOc731r9nAef35+Ozkd0Qd9dNFnBe1Bl7enTBkQGWib3aL89D7aqB1mparqRVdmmzA9ILyt7SSkyP2Yknxsfg3+/s9t9cAAAgAElEQVQtV6pZWgLioqCvVqVhTYrlDowrZw1oBl9785ZiA6BeQKUFbmtfoDz6wx+o35JoANRb8wi8+4cPVWPtlBQFnJPeWY9NK3agrKgy4DfN7zy4E30j+qqtKBd83wlDv3kU8bffqIBz28WdsO/p81Hb//dqRW3Nd3fgaMxES01L4OSiIDqrrgksi0nZheUYsy4T934b6bIEdMnH9iKgUC4C2qvM5xWXVxl3YIHXlPySIgOgfoOhRkfUXH+gjf6gtwAGQP3Sllo8ksz4vZj4doRS2S4fvRV524sD3iACTe7RcpDax/l9J3z55cOIv+U6BZxpF5+P/U/9C7UDfqf2cB6Z9SKOJi+29m0SOAtSgMqDQIC41eL85NbcAxiyYhtu+GKdaxEQXYP1mR6HSZHZiEjfC/rZPPD/2zsP8Kqqbd+P++67933vvXvvu/V4yjsWQEkhCChSFAseERUVy8GCHkUPoIiCoBIQlCLSi0gPJUAgBFAgEEJCekIIEEJ6QkhIgfTee/73G2uvzdlus3eyw27JHvP78u29V5lrzt9ac/0z5xxzjHoRTYs3CDu4gAioIVWx/HZzxgO9o9KKgNpBSzRSBI6QwoLJRkI8bJsQkmf3DhFyq3IxL1zT4xzq+SA2rPozrj49RiOcD7ui/N0/KsLZtsoNrScWoj0tUGMUxGs4ubfZ0mCEiPV28XBrZEYpFvyciEdUT0D3uZ/GuA3hmHskHkcu5SImqww3SmsV93liOWu9e2MPVxIBvSPpMelkS8YDNakg+geLgNpDU/x1GbjHkxKVj52zw5R4nezLtji7yq4dImRXZWNu2Fylx8nC+cOK1xD/xGhFODOGu6Di3d+hfdG/onXjk2gN3oyODNUvrXYJih30NuuaWnEmsQAzD10Bz2PyUhP2BPTSj5FYdCIRvlfzlRiaNyvqJYbmrx9bh9oiAqqvJpb7rY0Fyp8SD9Shmpnpla0qqcfxdVeUXufBxReQHJmP+uom0zOy0hmZlZmYEzpHcfA+zPNBbPnuNSSMGakI5/VHBqLqvbvQ/u1daN76CpojDqAjPUAzVMvWtI3VViql4cuwRaz3xVz8ZfdFRSxZNNkT0KTt0cqQbWBKoeI+j2NoNrb0Lj/Chmste+6UgAio5QRTm/MAVTC1v7WfLKL9tT9s+Sk90DttRuY7nx0fxAXkYtvMULBDhBCvNJTcrLbbXmdmRSZmh8xWhPPhvUOwbcmrSBg9XBHOzBH3o3rKb9C2rB+a9kxFS/RhdKSd1Tg+YE9Brbb9hyC3rB7bwzIxcUsUeFiWRXPY0kC8t/uiEiYsJE1jBMSegFpluYn5HvI+lJMIqOWV6zQRuXVyGd7Gw7o2TyKg9tGi2V/t4e8uKr3OI99fUqKo2GuszusV1/FZyGdw83QDC+fObyYiacRQRTizRvRH9Ye/QcvqYWj0+gotF4+hI/0swL3N+nKgzTZOHnhInJ2wr/ZPw9Prwm4bAT26Mlhx3M5GQOwJSJnPrG8Ry1n7aBZ2XQoRUMvL12Ujl0gyss9qu0RAbdtGW1vaEH08E1s+DsHO2eGKc4SyfPt0w5deno6ZwTMV4XxkzxDsXvAikh92U4Tzxqh+qJn2OzRtfBaNvuvQFu+LjoxzQFmmzdZucs/xfGYpFp1IwojlQYpocjgwFtA5PlfhcykPsdkVyCuvF09Atm0GvfLqIqCWlykOpG0oZRraYc3tIqC2a7v5GZU4sCha6XX+vO4KeKmKPfY6U8tSMSNohiKcI3cPxb4vxyNlmKsinNmP9kP1J/3RsO0d1J/cjLZYduweZbO1mxwX82xyIWZ5x8FNNQJi5wYTNkVi4fFEnIy/pfRES2ubwK72JAmBnhIQAbW8UnkT0dROLvNXIvLpZLvVN4mA9rT59Py85oZWhHqlKcLJaztjfDNRUVhnd87fk0qS8FHgR4pwjt41FF6zxiJ1iLMinDlj7kPVnIdQt3s2Gvx2oS3uBDoK2SjI+ms3eZ7yyOU8TNl7Cew2j+cznRf54/Vt5/G9XyoCkgtui6Z4Aur5cytn/pKACKjl5eouIoomojAiWqf+hRPRBSL6reUv3/UVREB/2Sgs/etGQin2fBWpiOepH+ORnVgK9jBkTymhJAFTA6ZikOcgPLZrGHw+HoW0wQM1wvlEf1Qu+BNqDyxF49k9aEsKACpvWt0oiIddPSKy8NrW87eNgIYuCcA7u2Kw8dw1RGRonBqwJyARTXt6uvpOWURAu9YXcx3xFBF9qv6NNVem5shHBNQ6Dbq+uhlndyYpwuk5PwpxgbmoLmsAB8C2lxRfHI+/BvxVEc6x24bhxJRhSBv0gEY4nx6IyiWTUOO9VhHO9oxIoK4UaLfOsg5lXWx+teJbdtz6v8XQHLUiCFP3XYZHRCYuZJYit6xO5jPt5YHq4+UQATWHAvXyPERALdvK+cWfdqFAiZjChkIsooVZlWhtto7wdKd2sUWxmOI/RRHO8ZuH4Mybg5DmovY4xw9GxcppqD20AU1hh9CeE6cZpu1Oxnd4TFt7h+LpZ7FvMkav0MTQvHfeaYxdG6rMcR6MyVGcGuRXNIhTgztkLaebTkAEtJeLnzmKLwJqesPp7hnVpQ04uTFO6XV6fRONpPBbqKu0D+fvLOzhN8Mx2W+yIpwvbxiMoFcGItV5IFKdBiJn4iMo3/glar03oCn8CNqLsqzi0J0dFXD0EraSfXBJgDKf2X++H57/IQLzf0rAiau3wOHA2AhInBp090mU4yxBQATUHArUy/MQATV/02KfqPFBeYozBHaKELwvFYU3qsBLVmyd2jva4Zflh4knJirC+dYqN0Q8P0ARTRbPnLeeQvnWJaj12YTmS2fQXp5v8bib7Hz9pys38aHnJQxcqDECclror8xvLj2VjLPJBUgvrAbPZ4pTA1s/QXJ9LQER0F4ufuYovgiotjmY55PXcB5ZcUnpdbJjBB6+tYdeZ0tbCw6nHca4o+MU4fxgxSDEjOuvzG+mDXJCzpQJqNi5HLU+P6IpNgjttRXmAWIgl/zKBuyNuqG4y+vnromh+eDiACWm5rrAdISkFSGjSCKbGMAnm+2AgAioORSol+chAmqeltjW0o6Yk1mK4/cds8IQ4XMNZfk1NnfDV99Sj92Ju/GE9xhFOGcsd0LsuH4a4Rzsgpzpk1C1awXqfPeiJTsNHc2WcbHHQ8bphTWKhez4jX8zAhrxfZDS89wRnomYLI0RUHVjCySyiXmeS8nFcgREQHu5+Jmj+CKgd97A8q9XwuubC0qv8+e1sbh+xfYOEaqaqrDxykaM8hqOQXtd8fXC+xE/ViOcqW6uyJn+Fqp2r0J9qC9aC3LR0Wb+4WU2ArqcXY6lp1Lw2EqNERCv0XxidQg+846D1wWNEVBBZYPMZ975Yyg5WJmACKg5FKiX5yEC2vNW19TQirCD6YpwKg4RTtreIUJhXSG+O78Ew/cNgdteV6z5YgCSxgxQepypQ9yQO+NdVO3fhPqoILSVlfa88gbOZMOe4LQifHk0HkOXBipGQP3m+4F7ne6KEdBNXCuqAUdAaWo1v2gbKJZsFgJmJyAC2svFzxzFFwHtWbvKulqCvfMiseWjYJzaEo/shBKbOkTgkGLzzs3EUE83POThAo8Z/ZEyQrOGM3X4UNyaOxXVR/ei/nwYWkpLwUOq5kpVDS2KdexHB2IVD0Dcy2RjoFe2RGGJagR0vbgGVfUyNGsu5pKP7QmIgJpDgWyTxx+JKJSIUokohYhmqcX4dyI6R0Tsg5c//62r4omAmtYQ66qa4L8jUel17ltwHnEBOagotp0bvuSSJHzq+xYG7x2ER7e5wOf9/kgZ6qSZ4xwzEvkLZqLmlA/qL11Ca3m52YSzsKoR+y/k4K2dF8A9TBbNwYsD8LbHBawJSENIehFySusg85mmPV9ydO8hIALalbrY7/7fEdEwtXj/TEQZRORCRKuJyF3dzp+ruqqCCGj3Giz32FKi8pWIKVtnhCBgVxJuplWgudH64bm4LBfywvCBj8aidvwPzjj9xgCkDNL4qb323FiUrP4W1WdPoTE9He11dd2rZBdHcS9yc0gGJmyKUASTRfOR784pRkDbQjNxIasU2apomrOH20WxZLcQsAkBEdCu1KX37D9JRM8Q0TUiYnHlxJ/822gSAe267VUW1eP4uitKr/PQkhgkhd9EdXmj1d3w8RrOwCQvvHlglGJRO2m1E4InDkSKsxNSnZyQ+ecJKNv+A2pDzqEpKwvt9fVdV87IEWwJeyW3QnHIzoY/LJj8x99nHryCfdHZuJJTDjECMgJRdvVZAiKgRqWl1+y8l4jyiOhfiKhKp9R/p/dbZxdNU29+7N13391nH/A7rVhbWzti/bPBzhC2fxaK0INpKMyqsrobvpa2ZpyI/A4v7x2iWNRO/9YJUc+5KMO0Ka6uuPHeG6g86Im66Gg0FxSgo7m5x1XnEF+h6cWYdywBw5apRkDufnh2Qzi+OhqvODzQegISI6AeY5YT+wABEVBdSemd3/+JiK4Q0atq8XUFlDdVdlUt6YF23pKLc6rhveyi0us8tuoyrl0qAs9/WnNosrqmADt9p2DsHlcM3uOKhXOdcOmJQapF7WDkzJyKyhM/oT4hAa0VFeho71l8y5rGFvjG5+Njr1i4fOOv9DI5LNjEzVFY4puMM4kF4OFb9hjES1MkCQEhAIiAdqUu9r3/H4gogIjm6BRThnDvsGW3NLUh8miGYl3rMScc0T9fB3sX4t6otVJ9QTy2HJ6AEXtcMHyHKzZPc0b8cE0A67RRj+DWwq9Q7X8GDUnJaKuu7lGximsacTAmF+94xIB9zfLQ7KBvzypGQWvPpiM8vUSJbMLias1/GnpUGTlJCNiAgAiojvL0sq88PLufiDbqlXuNnhERGxUZTdID/VvLy00pw77555Ve58kf4nDjajF4radVUns7ShO9sXHPSIze7Ywnf3CF12RXJLlphmrTxz+NwnWrUB0aqhgGtdWabhiUVVKLbWGZeHlzFDiqCYvmw8vOKYGot4VdR1xuBYqqGtBgR5FirMJeLiIEekBABNSotNj1zseIiIcQEokoXv17noj+g4iC1WUsQUTEy1qMJhFQoLG2Bef2pCjCuXdeFGLPZlsvVmdDJXKCv8Hi7S4YtscVE5e74PjEQUhxckKKkzMyJr2C0j27URsVhabsbLQ3Nna7qStO7fMqsdI/DU+tCVUEk0VzzKoQfKIaASXerFQim/DcpyQhIAS6T0AE1Ki0OMZORxZQHpq8drEQu+ZGYMvHwcr6zlvXKtBijR5YYRLijryJWVsHYPBuF0xzd0Hw024aw6DBbsicNgXlx46h7tIltBQXo6O1ez3hlrZ2RGSU4OufEzH8u3OKaN7nfhrj1ofhi6PxOBabp4QDY09AfKwkISAEekZABNQxNNJoLR1VQKvLGuC76arS6/RaFI3EsJuWNxJqa0V7whGc83gU72y/Hw/tdMXXn7jg4giNYVDKyOHIdv8Clf7+mvnNyspuGQbVNbXCL7EAnx6Kg+s3ZxXRvH/BGby0ORKLTyYjMKlQWZ/JnoDECKhnL0s5SwjoExABNSotjrHT0QRUGdYM/luszpD9qSjKrgJHU7FYqi1BY9BS+GwaiBc8BuLxTa7Y+J4r4h/UzG+mPvMUbq1egerQsG7Pb3JAae+LufjL7otgseShWRbPN3ZEY83ZdEReK0F+RQPqm7vXc7VY3SVjIdBHCYiAOoZGGq2lIwlo2S2O1XlZ6XX6LL+I9IuFaKxrsVzzvhmLSp/J2LbxHjy+2xkTVrrC6zU3JDtr5jevvT4Rxbs8UBsZpXF80NBgtCw5ZXXYGZ6l+JjVGgE9tCwQ7++5iC2h15XIJ4VVEtnEKETZKQTMREAE1Ki0OMZORxDQ1pY2JVbnlo9DsHN2mLJMpaygFu2WmANsbQKuHkLe9lH4btM9GL7bBe8udIHfs+r8ptsgZEydgrKjR1B/+TJaSkoMzm/yHG3SrSqsC0jHn9aF3TYCenRlsLJmkz0BJd+qEiMgM70QJRshYAoBEVDH0EijtezrAlqQWXU7Vie748uKL0GzJZam1BSiI/BbxKzvj0+39MMwDxd8PtsFkY+qwjn8Idz44nNlfpP90/L6zc7WV7Jhz/nrpVh0Igkjlgcponmv+2k8w0ZAR+JxNDZPCQdWUdeMVkv8A2DKG0SOFQIOTEAE1Ki0OMbOviqg7BAhwucaNn8UDI7Veen0DdSw/1ozhvEC55V3EU2HJ+OntX/AqzsewFMbXbH2fVdcGapxfJD61OPIW74M1cEhaLpxA+1NTb965fA8pX9SIWZ5X4XbtxojoAEL/PDij5H49mQSziQVaIyAGiQc2K/gyQYhYCMCIqCOoZFGa9kXBfRmWjk41Njm6cE4tTkeuanl5vVf29IAxHqieOsIbNrwRzy+yxmTF7ngyAS32+s30155CQVbN6P2wgXFP227nn/a8rpm+FzOU5wYsNs8NgJyXuSPSdujsco/DZHXNUZAbGFrVtG30ctGLisE+hoBEVCj0uIYO/uSgLLXoBCvNI1DhK8iEReYqyxNMVvDLc8CznyF5DX3YN7m+zB6qwvcZ7ggcpS6DGXYUGR+PB1lPx1TlqHo+6fNK6/HrsgbeH3befDaTBbNoUtVI6CQ60jIqwSvzxSnBma7Y5KRELAYARFQx9BIo7XsKwKak1QG9iLEQ7Z+2xLADhHMsjSlvQ1I90er50s4u+q3eHf7/XhxpSu2/dkFCa6a+Jsp48Yid+liVAcFoTEz8xfxNzNLavFjcIYSzYQFk/9Gr9AYAXlG3UB6YbU4abfYK04yFgKWIyACalRaHGNnbxdQXoaidcPnOT8K8cF55ul11pcDEetRtcEFe9b/AeO3O+PjuS44PVYzt5kyaBDS3nkThXt3oS4mBs23boGHaXmd6dW8yl9Zzj65JhRzfa7iaOxNxUl7VYM4NbDcq01yFgKWJyAC6hgaabSWvVlAs+JKFAMhdsN31iNJidXZdqc+XW9dAY79FVnf34Vlm+7Bsxtdsfx9Z1weqnF6kDx6JDK/mI1yv9NoTEtDW1UVGptbEZRapAgkD8lyL5MtZ3npCcfVPB2fL04NLP8+kysIAasSEAE1Ki2OsbM3CijH5fTfkajMde5fGI3k8Jt35hChrQVIPIqOHY/j/Mrf4KOt92PyNy448IIzkhWn7k5InfgCcjesQQ0Hrc7PR3V1HU4lcAzNK4rxD4um00J/ZX7zu9MpCEotVERTIptY9Z0mFxMCViMgAuoYGmm0lr1JQDvaO5AccUtxhrB1RgjO7U1BSV51zx0i1JUCYavQsGYAfNb+Hm9sdsa8GS4IHamZ20waNgTXpn2AksOHUJ+YhJL8Yhy5lKtYzmrd5/GyE46pyfOcibcqwda1YgRktXeYXEgI2IyACKhRaXGMnb1FQCsK6/Dzmlil1+m9NAZp0fk9j9VZmAj8/BFuLb8L6zbejTdXuOLHSc6Id3VSoqEk/elJZH47HxWBgciJT4Nn2DW8ueMC+rlrAk/zMO2Hey/BIyIL6YU1YgRks1eYXFgI2I6ACKhjaKTRWtq7gPKc5mW/G9j2SQh2fBamOEcoZzd87R2mtRy2pk31RfvuZ5Rh2s82DcCMuS44MVbtbQ5yRfJbr+GmxzakBEdj6+mrePnHCGU+k4dn2SvQx16x2B+djaySGlQ3tsj6TNPugBwtBPoUARFQo9LiGDvtWUALs6pwaEmM0uv8aU0sMuOK0dxoYnSRhgogcgNq1jvDa93vMW25Mza86YzYwZreZsKo4Uj//BPEHD2JtUdiMG5tyG3R5MDTs7zj4HMpT7GcrRWnBn3qBSiVEQJ3QkAE1DE00mgt7VFAWSTDvVU3fHMjcPFUFqpLG0zr8ZWkA6dmI33l77F89T1wn+kCv8fVIVpXFyS89iLCVqzDkr0hGLNCE3iaI5yw5eyXR+Nx8uotFFQ2QIyA7uQVI+cKgb5LQATUqLQ4xk57E9AbCaUahwjTg3F6SwJyUsq674avvR24FoAWzxdxZtVvsXDBA9j5ijPiXTTCefmJkTj7ySzMX/8THlmq8TnL85rPbYzAwuOJCEguQJGEA+u7bzypmRAwIwERUMfQSKO1tBcB1SxNSVKGa9mPreIQobKxe497Uw0Qsx1FPwzGzmV3Y+WHzggdoRHNq4Nd4fv6nzHnqy1wWqDxBHT/12fw8uYofHcqBeHXiiUcWPcoy1FCQAjoEBABNSotjrHT1gLKjtJTIvOxc3Y4tEtTCrOr0C2HCAUJaDk5E4Gr7sG62QPg9bxm3WbqQCf4jx0D9ymL8MAXx5U5zSGLA/Denov4Iega4nLLIeHAdN4E8lUICAGTCYiAOoZGGq2lLQW0sqgeP6+9ovQ62Vgo7UJB17E6m+uBOC+k7XwMO9zvxfZJTrisGgRFDxuMFa++j5EzPRXRfGJlED7zjsPBCznIKa1TLGdNtt41uVnJCUJACDgCARFQo9LiGDttIaCapSnZytKU7Z+FIfJIBqqK6sGOEgym0uuo8puDI8v648cpDyBopDpE6+qMHeNfwMtT1mHAPF9MWB+Cb48n4GxSoTKfKUZABonKDiEgBO6AgAioY2ik0VpaW0ALb/xyaUrW1RK0trR1/hi3taIt1RdRO8Zi+yf9cewZjWjyEO2RJx7Dh2+7Y/Dco3hlQxC+901EZEaJ4gmota298/xkqxAQAkLATAREQI1Ki2PstJaAKktTDmuWpuyaG6E4R6ivbu78Ua4tQU7gQhxwd4HnK06IG6QRzpDhD8L9tQ8wZtY+vLE+AOtPJSI2p1zxBCSi2TlK2SoEhIBlCIiAOoZGGq2lNQQ0O6EUnu5Rylyn39YE5F+v/LX/2o4O1GeFwW/TeOx+5wFEPKwRzVg3Z6yf8CJenb4e764/jS1+8Ui6WQEOBybzmZZ5MUiuQkAIdE1ABNSotDjGTksKKPcwOczY5unB4KUpiWE3f+VJqKO5HnG+C7HvYzecelIjmklOTjj0p9GY/v48TF19FB5+V5CZX4m6JhO9EHXdBuQIISAEhECPCIiAOoZGGq2lJQRUWZoSlQ+PzzVLU4I8U1B2q/a2JyHen3z5GA7NGgPfp52QPFAjnEGj3bD4rcmYs9QD+wMuIreoUjwB9ahpy0lCQAhYmoAIqFFpcYyd5hZQXppyfL1maQpHTUmPKURLU5sinskpYdj/5Ys49bTzbdEMHeWMLW8+jYULlsPbPxL5xRVoajVgVGTpFiH5CwEhIAS6SUAE1DE00mgtzSWgbW3tiPXXLE3hqClRRzNQWVyHpMRg7Js7AaeedrktmuGjB+LgW49g/fxPcco/EAVFZWgRy9luNls5TAgIAXsgIAJqVFocY6c5BLToRjW4t8lznT+vu4LgE6ew7/PnfiWax94egsPuk3D+zCGUlxbfHtK1h8YgZRACQkAImEJABLRvauR4IrpGRJlE5N5VFe9EQHlpSoSPZmnK9lnn4DFjxi+GZ8NGD8SRt4fCe8EbiAvyQU15kSnPpxwrBISAELBbAiKgXalL79v/90SURUT9iOgfiSiBiFyMVaOnApqdWIqdswOxeVoQDkz6BokuQ8AODsJGO+Hw5IdwaNFkJF7wRV11hd02ACmYEBACQqCnBERAjSlL79w3iogCdIo+n4j4z2DqiYCyyz2P9/Zi7zteuDD8OQQ84QSvvzwM78V/Qcalc2iqr+3pMynnCQEhIAR6BQERUIOy0mt3vE5Eu3RK/y4Rbdb5rf06Tb35sXfffXePHtb9H70Ij6mP4sCq6ciMj0JrU1OP8pGThIAQEAK9kYAIqFZO+s5ndwX0do170gPtjQ+7lFkICAEhYE4CIqC3ZaTPfLHKEK45H0LJSwgIASHQGwmIgPYZ3bxdkf9JRDeI6D4dIyLX23s7+SI90N7YdKXMQkAI2JqACGgngtIHNj1PRBmqNe7XXdVHBNTWzVCuLwSEQG8kIALalbo4wH4R0N7YdKXMQkAI2JqACKgDCGRXVRQBtXUzlOsLASHQGwmIgHalLg6wXwS0NzZdKbMQEAK2JiAC6gAC2VUVRUBt3Qzl+kJACPRGAiKgXamLA+wXAe2NTVfKLASEgK0JiIA6gEB2o4ql6oMQa8JnjgnHmpKvOY6117JJuYhMub/2yovrYK9lk3JZ9xnjd6ckIWAyAX6J2Guy17JJuUx7YuyVF9fCXssm5eo7z5hpNZGjexUBe22oDNFeyyblMu0Rt1de8oyZdh+Fl+m85Iw+TkBebqbfYHtlJuWSe2k6AdPOkGfMNF5ydB8nwNFc7DXZa9mkXKY9MfbKi2thr2WTcvWdZ8y0msjRQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBITAnRIYT0TXiCiTiNzvNLM7OP+PRBRKRKlElEJEs9S8FhNRPhHFq38cncbaidfjJanX1xpQ/DsRnSOi6+rnv1m7UEQ0UIcL86khotlEZAtme4iohIiSdTgYYvR3RLRJfeYSiWiYzjnm/tpZudYQUToR8bWPE9G/qhe9l4gadZhuN3dhdPLrrFzG7tt8lRe31Wd18rHE187K5qPDhdsDP2+crMnM0DvCHp4zFYd8OBKBv1fDpPXTiTfqYiMAv9N5kf6zGsKNy8IvlS9sVCbtZfmF8Z/aH+rnap1/OPgfj1V6+639k+9lERHdYyNmj6v3T1dADTHif4L8iYiFdCQRXbQgrM7KNY6IONYuJ75v2nvHYqBbfvUQi3x0Vi5Dzzq3gwQi+l9qbOAsIuL7banUWdl0r7WOiL5RN1iTmaF3hD08Z7p85LuDEBhFRAE6deX/cvnPHtJJInrGRmKgX//OBJR7AtygOfEn/7ZlYlE4rxbA0IvY0uXTf5kaYrSDiN7SKYzucTqbzfZVv1y6Gb9CRAfVDcaO0z3HXN/1r2fovum3S26z3HYtmfTLpr0W/9Nzk4juVxhoPx4AAAWwSURBVDcYOk57vCU/te8I3edHty1a+zmzZF0lbzsk8DoR7dIp17tEtFnnt62+cqPMI6J/UQWUBYyH23hoyRZDpdlEFEdEV3SWPFTpwOGXiu5vnV1W+8psZqpX4xexLZjpv0x1megyOk1Ej+mQCSaih3V+m/urfrl08z9FRO+oG/i4eiK6SkThRDRG90ALfNcvl6H7xm1SW0Yuxm4i4rZryaRfNu21uHeqncbgbdZmpi0HX1f7jrCX50xbNvl0EAL2KKD/pArVq+o9uEsdrvofRLRcFVFr354/qBf8jTqUxi8R3UbLuyutXSid6/0jEZUREbPiZCtm+i9dQ4zsRUC/VudAWdw58RDpf6jfH1J7WvxPnKWSPi9D982eBHQbEc3VAWJtZnxp/XeEvTxnOljkqyMQsLch3H9Qh5TnGICv/8IxcJhFN2uH2QwNG1n04gYyf5mIAg3ssyYz/WsZYmTtoTX9cjGq94noAhH9HwPceHOYDXvGumW2lyFcnjcuJqL/b0Nmnb0j7OU5M4JFdvVFAtwgbqiGCdyLYUMFVxtVlHsB+4loo971tfOMvPlzIjqst9/SP/8vEbFREyf+Hk1EbLnMlpxaq2X+ZEMGWyVmMkXn4rZipvvS5+IYYvSCnhHRJZ2yW+Krfrn4/rG193/pXYx/a41z2LCOrb/ZwtNSSb9chu4bt0ldIyJus9pyWqtsfB3mxkPbusmazAy9I+zlOdPlIt8dhABbRGao1rg8pGWrxHNiUOc6dZesHFCXkPAcqK+O4Y61yskvUn558R8vr9Ey4qE+nrvjZSxBFn7RGqsri3o5Ef0/nYNswcybiAqJqJWIbhHRh+pwaGeM+EW4RX3meHmQJec/OysXL9liQxjtc6ZdrvKaeo95O895v6jD1NxfOyuXsfvGzx1b33Jv6zlzF0Yvv87Kxod4EtFHesdak5mhd4ShtmjN50wPi/wUAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIAS6JlCnHsJrFN/u+nCTjligdzSvqZUkBISAEBACQqBPENAK6JNExC73TEnaCCeGztHmbWi/bBcCQkAICAEh0GsJaEUuhoiqVWcD7AGKPd+wx5fLqrOL6WoNWWgjVScX7JCD0wnVnzE7npimbltJRO1qftroJ9pr8YJ3zptDibFjhTfUczhvdqd3TI3fyefxsZw4P/YmxA421qrb5EMICAEhIASEgM0IaEVNvwfKQrhQLRU7EOeIHPcRER/HEUz4uzZp3d/9b1UUtQ7atXlrj9P+Zm82HJycRZodqnOUDXZrx3mziLPvVQ4mwL5r2RsN58ceebRiqg2Irc1XPoWAEBACQkAIWJ2AVtT0BZR7gdzD1Lq/4xBvHIOUjwvVKyU73Ne6P2QB5KDZnLR5qz9v/95ARB9oNxIRu7R7Sc2bhVWbOBIIh/XioWLOn0O4cdQe9uMsSQgIASEgBISATQloRU5fQH8iomc7KZn+cfw7SifKCQ/B8jZO2rzVn7d/GxNQ3XlYDuvFUVQ4cS+Y/TiziIao2+RDCAgBISAEhIDNCGhFjuNh6kbe4CFcntvkcFKcHlCj0+gLKIdW4yDVnJyIqElHQDlmqvZ83q+9FvciA9QhXI7ukUtEv1XP60xAOR4kx2blxE702Zm+JCEgBISAEBACNiWgFTUWOu7Z8VApGxHxHOT3qpEPG/vwsC2Ll76Acs/Qn4jSVMHV7YGuUrebYkTUmYDy/CiHQGMDIjY6es+mxOTiQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBISAEhIAQEAJCQAgIASEgBISAEBACQkAICAEhIASEgBAQAkJACAgBCxH4b97l23+TscURAAAAAElFTkSuQmCC)
<!-- #endregion -->

<!-- #region id="q_yscaMITmrO" -->
## Conclusion

Duration: 2

Congratulations!

### What we've covered

- Built various MAB models: random, optimal, explore-than-exploit, epsilon-greedy, decaying-epsilon-greedy
- Simulation and plotting

### Next steps

- Learn the methods in depth
- Tune hyperparameters
- Thompson sampling method

### Links and References

- [How to Build a Product Recommender Using Multi-Armed Bandit Algorithms](https://www.offerzen.com/blog/how-to-build-a-product-recommender-using-multi-armed-bandit-algorithms)
<!-- #endregion -->
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

<!-- #region id="bmIy05Cqwt3X" -->
# Training RL Agent in Mountain Car Environment with  Policy gradient method
<!-- #endregion -->

```python id="qCl7x_aFuhxe" executionInfo={"status": "ok", "timestamp": 1638445319722, "user_tz": -330, "elapsed": 2432, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "https://lh3.googleusercontent.com/a/default-user=s64", "userId": "13037694610922482904"}}
import tensorflow as tf
import tensorflow_probability as tfp
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np
import gym
```

```python id="2dlmJ4BAu76v" executionInfo={"status": "ok", "timestamp": 1638445391601, "user_tz": -330, "elapsed": 767, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "https://lh3.googleusercontent.com/a/default-user=s64", "userId": "13037694610922482904"}}
class PolicyNet(keras.Model):
    def __init__(self, action_dim=1):
        super(PolicyNet, self).__init__()
        self.fc1 = layers.Dense(24, activation="relu")
        self.fc2 = layers.Dense(36, activation="relu")
        self.fc3 = layers.Dense(action_dim, activation="softmax")

    def call(self, x):
        x = self.fc1(x)
        x = self.fc2(x)
        x = self.fc3(x)
        return x

    def process(self, observations):
        # Process batch observations using `call(x)` behind-the-scenes
        action_probabilities = self.predict_on_batch(observations)
        return action_probabilities
```

```python id="6ecXS55wu-r6" executionInfo={"status": "ok", "timestamp": 1638445392328, "user_tz": -330, "elapsed": 10, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "https://lh3.googleusercontent.com/a/default-user=s64", "userId": "13037694610922482904"}}
class Agent(object):
    def __init__(self, action_dim=1):
        """Agent with a neural-network brain powered policy

        Args:
            action_dim (int): Action dimension
        """
        self.policy_net = PolicyNet(action_dim=action_dim)
        self.optimizer = tf.keras.optimizers.Adam(learning_rate=1e-3)
        self.gamma = 0.99

    def policy(self, observation):
        observation = observation.reshape(1, -1)
        observation = tf.convert_to_tensor(observation, dtype=tf.float32)
        action_logits = self.policy_net(observation)
        action = tf.random.categorical(tf.math.log(action_logits), num_samples=1)
        return action

    def get_action(self, observation):
        action = self.policy(observation).numpy()
        return action.squeeze()

    def learn(self, states, rewards, actions):
        discounted_reward = 0
        discounted_rewards = []
        rewards.reverse()
        for r in rewards:
            discounted_reward = r + self.gamma * discounted_reward
            discounted_rewards.append(discounted_reward)
        discounted_rewards.reverse()

        for state, reward, action in zip(states, discounted_rewards, actions):
            with tf.GradientTape() as tape:
                action_probabilities = self.policy_net(np.array([state]), training=True)
                loss = self.loss(action_probabilities, action, reward)
            grads = tape.gradient(loss, self.policy_net.trainable_variables)
            self.optimizer.apply_gradients(
                zip(grads, self.policy_net.trainable_variables)
            )

    def loss(self, action_probabilities, action, reward):
        dist = tfp.distributions.Categorical(
            probs=action_probabilities, dtype=tf.float32
        )
        log_prob = dist.log_prob(action)
        loss = -log_prob * reward
        return loss
```

```python id="YIynMUi9xY_S" executionInfo={"status": "ok", "timestamp": 1638445402431, "user_tz": -330, "elapsed": 487, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "https://lh3.googleusercontent.com/a/default-user=s64", "userId": "13037694610922482904"}}
def train(agent: Agent, env: gym.Env, episodes: int, render=True):
    """Train `agent` in `env` for `episodes`

    Args:
        agent (Agent): Agent to train
        env (gym.Env): Environment to train the agent
        episodes (int): Number of episodes to train
        render (bool): True=Enable/False=Disable rendering; Default=True
    """

    for episode in range(episodes):
        done = False
        state = env.reset()
        total_reward = 0
        rewards = []
        states = []
        actions = []
        while not done:
            action = agent.get_action(state)
            next_state, reward, done, _ = env.step(action)
            rewards.append(reward)
            states.append(state)
            actions.append(action)
            state = next_state
            total_reward += reward
            if render:
                env.render()
            if done:
                agent.learn(states, rewards, actions)
                print("\n")
            print(f"Episode#:{episode} ep_reward:{total_reward}", end="\r")
```

```python colab={"base_uri": "https://localhost:8080/"} id="gp4KDquT9OAt" executionInfo={"status": "ok", "timestamp": 1638445434255, "user_tz": -330, "elapsed": 4454, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "https://lh3.googleusercontent.com/a/default-user=s64", "userId": "13037694610922482904"}} outputId="0e09fb27-6011-48a0-b616-677eb8bb8e92"
if __name__ == "__main__":
    agent = Agent()
    episodes = 2  #  Increase number of episodes to train
    env = gym.make("MountainCar-v0")
    # Set render=True to visualize Agent's actions in the env
    train(agent, env, episodes, render=False)
    env.close()
```

<!-- #region id="6F1CvviNvf0U" -->
---
<!-- #endregion -->

```python colab={"base_uri": "https://localhost:8080/"} id="eY5_ri7ovC5d" executionInfo={"status": "ok", "timestamp": 1638445444675, "user_tz": -330, "elapsed": 3603, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "https://lh3.googleusercontent.com/a/default-user=s64", "userId": "13037694610922482904"}} outputId="6f833b45-d2b2-4a03-9d14-9d779006793a"
!pip install -q watermark
%reload_ext watermark
%watermark -a "Sparsh A." -m -iv -u -t -d
```

<!-- #region id="eQZmkNqovgsp" -->
---
<!-- #endregion -->

<!-- #region id="Jpw59lINviPG" -->
**END**
<!-- #endregion -->
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

<!-- #region id="4TKk8aKOc-zR" -->
# Training Stock Trading RL Agent using SAC and Deploying  as a Service
<!-- #endregion -->

```python id="Mi3_RmfZFKCA"
import functools
import random
from collections import deque

import numpy as np
import tensorflow as tf
import tensorflow_probability as tfp
from tensorflow.keras.layers import Concatenate, Dense, Input
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

import functools
from collections import deque
```

```python id="lIB0PD0OFO6Q"
tf.keras.backend.set_floatx("float64")
```

<!-- #region id="8seA5Hb_IMDQ" -->
## Implementing the RL agent’s runtime components
<!-- #endregion -->

```python id="mruDbPR2FO3v"
def actor(state_shape, action_shape, units=(512, 256, 64)):
    state_shape_flattened = functools.reduce(lambda x, y: x * y, state_shape)
    state = Input(shape=state_shape_flattened)
    x = Dense(units[0], name="L0", activation="relu")(state)
    for index in range(1, len(units)):
        x = Dense(units[index], name="L{}".format(index), activation="relu")(x)

    actions_mean = Dense(action_shape[0], name="Out_mean")(x)
    actions_std = Dense(action_shape[0], name="Out_std")(x)

    model = Model(inputs=state, outputs=[actions_mean, actions_std])

    return model
```

```python id="f9n4iEqjFO1W"
def critic(state_shape, action_shape, units=(512, 256, 64)):
    state_shape_flattened = functools.reduce(lambda x, y: x * y, state_shape)
    inputs = [Input(shape=state_shape_flattened), Input(shape=action_shape)]
    concat = Concatenate(axis=-1)(inputs)
    x = Dense(units[0], name="Hidden0", activation="relu")(concat)
    for index in range(1, len(units)):
        x = Dense(units[index], name="Hidden{}".format(index), activation="relu")(x)

    output = Dense(1, name="Out_QVal")(x)
    model = Model(inputs=inputs, outputs=output)

    return model
```

```python id="4knlOHw_FU9e"
def update_target_weights(model, target_model, tau=0.005):
    weights = model.get_weights()
    target_weights = target_model.get_weights()
    for i in range(len(target_weights)):  # set tau% of target model to be new weights
        target_weights[i] = weights[i] * tau + target_weights[i] * (1 - tau)
    target_model.set_weights(target_weights)
```

```python id="tuhIY539FXyt"
# class SAC(object):
#     def __init__(
#         self,
#         observation_shape,
#         action_space,
#         lr_actor=3e-5,
#         lr_critic=3e-4,
#         actor_units=(64, 64),
#         critic_units=(64, 64),
#         auto_alpha=True,
#         alpha=0.2,
#         tau=0.005,
#         gamma=0.99,
#         batch_size=128,
#         memory_cap=100000,
#     ):
#         self.state_shape = observation_shape  # shape of observations
#         self.action_shape = action_space.shape  # number of actions
#         self.action_bound = (action_space.high - action_space.low) / 2
#         self.action_shift = (action_space.high + action_space.low) / 2
#         self.memory = deque(maxlen=int(memory_cap))

#         # Define and initialize actor network
#         self.actor = actor(self.state_shape, self.action_shape, actor_units)
#         self.actor_optimizer = Adam(learning_rate=lr_actor)
#         self.log_std_min = -20
#         self.log_std_max = 2
#         print(self.actor.summary())

#         # Define and initialize critic networks
#         self.critic_1 = critic(self.state_shape, self.action_shape, critic_units)
#         self.critic_target_1 = critic(self.state_shape, self.action_shape, critic_units)
#         self.critic_optimizer_1 = Adam(learning_rate=lr_critic)
#         update_target_weights(self.critic_1, self.critic_target_1, tau=1.0)

#         self.critic_2 = critic(self.state_shape, self.action_shape, critic_units)
#         self.critic_target_2 = critic(self.state_shape, self.action_shape, critic_units)
#         self.critic_optimizer_2 = Adam(learning_rate=lr_critic)
#         update_target_weights(self.critic_2, self.critic_target_2, tau=1.0)

#         print(self.critic_1.summary())

#         # Define and initialize temperature alpha and target entropy
#         self.auto_alpha = auto_alpha
#         if auto_alpha:
#             self.target_entropy = -np.prod(self.action_shape)
#             self.log_alpha = tf.Variable(0.0, dtype=tf.float64)
#             self.alpha = tf.Variable(0.0, dtype=tf.float64)
#             self.alpha.assign(tf.exp(self.log_alpha))
#             self.alpha_optimizer = Adam(learning_rate=lr_actor)
#         else:
#             self.alpha = tf.Variable(alpha, dtype=tf.float64)

#         # Set hyperparameters
#         self.gamma = gamma  # discount factor
#         self.tau = tau  # target model update
#         self.batch_size = batch_size

#         # Tensorboard
#         self.summaries = {}

#     def process_actions(self, mean, log_std, test=False, eps=1e-6):
#         std = tf.math.exp(log_std)
#         raw_actions = mean

#         if not test:
#             raw_actions += tf.random.normal(shape=mean.shape, dtype=tf.float64) * std

#         log_prob_u = tfp.distributions.Normal(loc=mean, scale=std).log_prob(raw_actions)
#         actions = tf.math.tanh(raw_actions)

#         log_prob = tf.reduce_sum(log_prob_u - tf.math.log(1 - actions ** 2 + eps))

#         actions = actions * self.action_bound + self.action_shift

#         return actions, log_prob

#     def act(self, state, test=False, use_random=False):
#         state = state.reshape(-1)  # Flatten state
#         state = np.expand_dims(state, axis=0).astype(np.float64)

#         if use_random:
#             a = tf.random.uniform(
#                 shape=(1, self.action_shape[0]), minval=-1, maxval=1, dtype=tf.float64
#             )
#         else:
#             means, log_stds = self.actor.predict(state)
#             log_stds = tf.clip_by_value(log_stds, self.log_std_min, self.log_std_max)

#             a, log_prob = self.process_actions(means, log_stds, test=test)

#         q1 = self.critic_1.predict([state, a])[0][0]
#         q2 = self.critic_2.predict([state, a])[0][0]
#         self.summaries["q_min"] = tf.math.minimum(q1, q2)
#         self.summaries["q_mean"] = np.mean([q1, q2])

#         return a

#     def load_actor(self, a_fn):
#         self.actor.load_weights(a_fn)
#         print(self.actor.summary())

#     def load_critic(self, c_fn):
#         self.critic_1.load_weights(c_fn)
#         self.critic_target_1.load_weights(c_fn)
#         self.critic_2.load_weights(c_fn)
#         self.critic_target_2.load_weights(c_fn)
#         print(self.critic_1.summary())
```

<!-- #region id="TOHIrXBRGDxo" -->
we implemented the essential runtime components for the SAC agent. The runtime components include the actor and critic model definitions, a mechanism to load weights from previously trained agent models, and an agent interface to generate actions given states using the actor’s prediction and to process the prediction to generate an executable action.

The runtime components for other actor-critic-based RL agent algorithms, such as A2C, A3C, and DDPG, as well as their extensions and variants, will be very similar, if not the same.
<!-- #endregion -->

<!-- #region id="POMp4qjeSrKe" -->
SAC Agent Base
<!-- #endregion -->

```python id="vEJqAWaYSpmM"
class SAC(object):
    def __init__(
        self,
        observation_shape,
        action_space,
        lr_actor=3e-5,
        lr_critic=3e-4,
        actor_units=(64, 64),
        critic_units=(64, 64),
        auto_alpha=True,
        alpha=0.2,
        tau=0.005,
        gamma=0.99,
        batch_size=128,
        memory_cap=100000,
    ):
        self.state_shape = observation_shape  # shape of observations
        self.action_shape = action_space.shape  # number of actions
        self.action_bound = (action_space.high - action_space.low) / 2
        self.action_shift = (action_space.high + action_space.low) / 2
        self.memory = deque(maxlen=int(memory_cap))

        # Define and initialize actor network
        self.actor = actor(self.state_shape, self.action_shape, actor_units)
        self.actor_optimizer = Adam(learning_rate=lr_actor)
        self.log_std_min = -20
        self.log_std_max = 2
        print(self.actor.summary())

        # Define and initialize critic networks
        self.critic_1 = critic(self.state_shape, self.action_shape, critic_units)
        self.critic_target_1 = critic(self.state_shape, self.action_shape, critic_units)
        self.critic_optimizer_1 = Adam(learning_rate=lr_critic)
        update_target_weights(self.critic_1, self.critic_target_1, tau=1.0)

        self.critic_2 = critic(self.state_shape, self.action_shape, critic_units)
        self.critic_target_2 = critic(self.state_shape, self.action_shape, critic_units)
        self.critic_optimizer_2 = Adam(learning_rate=lr_critic)
        update_target_weights(self.critic_2, self.critic_target_2, tau=1.0)

        print(self.critic_1.summary())

        # Define and initialize temperature alpha and target entropy
        self.auto_alpha = auto_alpha
        if auto_alpha:
            self.target_entropy = -np.prod(self.action_shape)
            self.log_alpha = tf.Variable(0.0, dtype=tf.float64)
            self.alpha = tf.Variable(0.0, dtype=tf.float64)
            self.alpha.assign(tf.exp(self.log_alpha))
            self.alpha_optimizer = Adam(learning_rate=lr_actor)
        else:
            self.alpha = tf.Variable(alpha, dtype=tf.float64)

        # Set hyperparameters
        self.gamma = gamma  # discount factor
        self.tau = tau  # target model update
        self.batch_size = batch_size

        # Tensorboard
        self.summaries = {}

    def process_actions(self, mean, log_std, test=False, eps=1e-6):
        std = tf.math.exp(log_std)
        raw_actions = mean

        if not test:
            raw_actions += tf.random.normal(shape=mean.shape, dtype=tf.float64) * std

        log_prob_u = tfp.distributions.Normal(loc=mean, scale=std).log_prob(raw_actions)
        actions = tf.math.tanh(raw_actions)

        log_prob = tf.reduce_sum(log_prob_u - tf.math.log(1 - actions ** 2 + eps))

        actions = actions * self.action_bound + self.action_shift

        return actions, log_prob

    def act(self, state, test=False, use_random=False):
        state = state.reshape(-1)  # Flatten state
        state = np.expand_dims(state, axis=0).astype(np.float64)

        if use_random and len(self.memory) > self.batch_size:
            a = tf.random.uniform(
                shape=(1, self.action_shape[0]), minval=-1, maxval=1, dtype=tf.float64
            )
        else:
            means, log_stds = self.actor.predict(state)
            log_stds = tf.clip_by_value(log_stds, self.log_std_min, self.log_std_max)

            a, log_prob = self.process_actions(means, log_stds, test=test)

        q1 = self.critic_1.predict([state, a])[0][0]
        q2 = self.critic_2.predict([state, a])[0][0]
        self.summaries["q_min"] = tf.math.minimum(q1, q2)
        self.summaries["q_mean"] = np.mean([q1, q2])

        return a

    def save_model(self, a_fn, c_fn):
        self.actor.save(a_fn)
        self.critic_1.save(c_fn)

    def load_actor(self, a_fn):
        self.actor.load_weights(a_fn)
        print(self.actor.summary())

    def load_critic(self, c_fn):
        self.critic_1.load_weights(c_fn)
        self.critic_target_1.load_weights(c_fn)
        self.critic_2.load_weights(c_fn)
        self.critic_target_2.load_weights(c_fn)
        print(self.critic_1.summary())

    def remember(self, state, action, reward, next_state, done):
        state = state.reshape(-1)  # Flatten state
        state = np.expand_dims(state, axis=0)
        next_state = next_state.reshape(-1)  # Flatten next-state
        next_state = np.expand_dims(next_state, axis=0)
        self.memory.append([state, action, reward, next_state, done])

    def replay(self):
        if len(self.memory) < self.batch_size:
            return

        samples = random.sample(self.memory, self.batch_size)
        s = np.array(samples).T
        states, actions, rewards, next_states, dones = [
            np.vstack(s[i, :]).astype(np.float) for i in range(5)
        ]

        with tf.GradientTape(persistent=True) as tape:
            # next state action log probs
            means, log_stds = self.actor(next_states)
            log_stds = tf.clip_by_value(log_stds, self.log_std_min, self.log_std_max)
            next_actions, log_probs = self.process_actions(means, log_stds)

            # critics loss
            current_q_1 = self.critic_1([states, actions])
            current_q_2 = self.critic_2([states, actions])
            next_q_1 = self.critic_target_1([next_states, next_actions])
            next_q_2 = self.critic_target_2([next_states, next_actions])
            next_q_min = tf.math.minimum(next_q_1, next_q_2)
            state_values = next_q_min - self.alpha * log_probs
            target_qs = tf.stop_gradient(
                rewards + state_values * self.gamma * (1.0 - dones)
            )
            critic_loss_1 = tf.reduce_mean(
                0.5 * tf.math.square(current_q_1 - target_qs)
            )
            critic_loss_2 = tf.reduce_mean(
                0.5 * tf.math.square(current_q_2 - target_qs)
            )

            # current state action log probs
            means, log_stds = self.actor(states)
            log_stds = tf.clip_by_value(log_stds, self.log_std_min, self.log_std_max)
            actions, log_probs = self.process_actions(means, log_stds)

            # actor loss
            current_q_1 = self.critic_1([states, actions])
            current_q_2 = self.critic_2([states, actions])
            current_q_min = tf.math.minimum(current_q_1, current_q_2)
            actor_loss = tf.reduce_mean(self.alpha * log_probs - current_q_min)

            # temperature loss
            if self.auto_alpha:
                alpha_loss = -tf.reduce_mean(
                    (self.log_alpha * tf.stop_gradient(log_probs + self.target_entropy))
                )

        critic_grad = tape.gradient(
            critic_loss_1, self.critic_1.trainable_variables
        )  # compute actor gradient
        self.critic_optimizer_1.apply_gradients(
            zip(critic_grad, self.critic_1.trainable_variables)
        )

        critic_grad = tape.gradient(
            critic_loss_2, self.critic_2.trainable_variables
        )  # compute actor gradient
        self.critic_optimizer_2.apply_gradients(
            zip(critic_grad, self.critic_2.trainable_variables)
        )

        actor_grad = tape.gradient(
            actor_loss, self.actor.trainable_variables
        )  # compute actor gradient
        self.actor_optimizer.apply_gradients(
            zip(actor_grad, self.actor.trainable_variables)
        )

        # tensorboard info
        self.summaries["q1_loss"] = critic_loss_1
        self.summaries["q2_loss"] = critic_loss_2
        self.summaries["actor_loss"] = actor_loss

        if self.auto_alpha:
            # optimize temperature
            alpha_grad = tape.gradient(alpha_loss, [self.log_alpha])
            self.alpha_optimizer.apply_gradients(zip(alpha_grad, [self.log_alpha]))
            self.alpha.assign(tf.exp(self.log_alpha))
            # tensorboard info
            self.summaries["alpha_loss"] = alpha_loss

    def train(self, cur_state, action, reward, next_state, done):
        self.remember(cur_state, action, reward, next_state, done)  # add to memory
        self.replay()  # train models through memory replay
        update_target_weights(
            self.critic_1, self.critic_target_1, tau=self.tau
        )  # iterates target model
        update_target_weights(self.critic_2, self.critic_target_2, tau=self.tau)

    def update_memory(self, xp_store):
        for (cur_state, action, reward, next_state, done) in zip(
            xp_store["cur_states"],
            xp_store["actions"],
            xp_store["rewards"],
            xp_store["next_states"],
            xp_store["dones"],
        ):
            self.remember(cur_state, action, reward, next_state, done)  # add to memory

    def train_with_distributed_replay_memory(self, new_experiences):
        self.update_memory(new_experiences)
        self.replay()  # train models through memory replay
        update_target_weights(
            self.critic_1, self.critic_target_1, tau=self.tau
        )  # iterates target model
        update_target_weights(self.critic_2, self.critic_target_2, tau=self.tau)

    def log_status(self, summary_writer, episode_num, reward):
        """Write training stats using TF `summary_writer`"""
        with summary_writer.as_default():
            if len(self.memory) > self.batch_size:
                tf.summary.scalar(
                    "Loss/actor_loss", self.summaries["actor_loss"], step=episode_num
                )
                tf.summary.scalar(
                    "Loss/q1_loss", self.summaries["q1_loss"], step=episode_num
                )
                tf.summary.scalar(
                    "Loss/q2_loss", self.summaries["q2_loss"], step=episode_num
                )
                if self.auto_alpha:
                    tf.summary.scalar(
                        "Loss/alpha_loss",
                        self.summaries["alpha_loss"],
                        step=episode_num,
                    )

            tf.summary.scalar("Stats/alpha", self.alpha, step=episode_num)
            if self.auto_alpha:
                tf.summary.scalar("Stats/log_alpha", self.log_alpha, step=episode_num)
            tf.summary.scalar("Stats/q_min", self.summaries["q_min"], step=episode_num)
            tf.summary.scalar(
                "Stats/q_mean", self.summaries["q_mean"], step=episode_num
            )
            tf.summary.scalar("Main/step_reward", reward, step=episode_num)
```

<!-- #region id="vH8PiR47GPEc" -->
## Building RL environment simulators as a service
<!-- #endregion -->

<!-- #region id="sPkSUD8SIZOg" -->
Our implementation will contain two core modules – the tradegym server and the tradegym client, which are built based on the OpenAI Gym HTTP API. The recipe will focus on the customizations and the core components of the HTTP service interface. We will first define a minimum set of custom environments exposed as part of the tradegym library and then build the server and client modules.
<!-- #endregion -->

```python id="EAyj6BrDJPh0"
!pip install -U flask
```

```python id="-NwnKpqOIZvs"
!wget -q --show-progress https://github.com/RecoHut-Projects/drl-recsys/raw/S990517/tools/tradegym.zip
!unzip tradegym.zip
```

```python colab={"base_uri": "https://localhost:8080/"} id="XoGuSTIfMkS6" executionInfo={"status": "ok", "timestamp": 1638516648019, "user_tz": -330, "elapsed": 617, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "https://lh3.googleusercontent.com/a/default-user=s64", "userId": "13037694610922482904"}} outputId="3a666787-75a5-4f4e-8880-568ba57065b9"
%%writefile tradegym_server.py
import argparse
import json
import logging
import os
import sys
import uuid

import numpy as np
import six
from flask import Flask, jsonify, request

import gym
import tradegym


logger = logging.getLogger("tradegym")
logger.setLevel(logging.ERROR)


########## Container for environments ##########
class Envs(object):
    """
    Container and manager for the environments instantiated
    on this server.
    When a new environment is created, such as with
    envs.create('CartPole-v0'), it is stored under a short
    identifier (such as '3c657dbc'). Future API calls make
    use of this instance_id to identify which environment
    should be manipulated.
    """

    def __init__(self):
        self.envs = {}
        self.id_len = 8

    def _lookup_env(self, instance_id):
        try:
            return self.envs[instance_id]
        except KeyError:
            raise InvalidUsage("Instance_id {} unknown".format(instance_id))

    def _remove_env(self, instance_id):
        try:
            del self.envs[instance_id]
        except KeyError:
            raise InvalidUsage("Instance_id {} unknown".format(instance_id))

    def create(self, env_id, seed=None):
        try:
            env = gym.make(env_id)
            if seed:
                env.seed(seed)
        except gym.error.Error:
            raise InvalidUsage(
                "Attempted to look up malformed environment ID '{}'".format(env_id)
            )

        instance_id = str(uuid.uuid4().hex)[: self.id_len]
        self.envs[instance_id] = env
        return instance_id

    def list_all(self):
        return dict(
            [(instance_id, env.spec.id) for (instance_id, env) in self.envs.items()]
        )

    def reset(self, instance_id):
        env = self._lookup_env(instance_id)
        obs = env.reset()
        return env.observation_space.to_jsonable(obs)

    def step(self, instance_id, action, render):
        env = self._lookup_env(instance_id)
        if isinstance(action, six.integer_types):
            nice_action = action
        else:
            nice_action = np.array(action)
        if render:
            env.render()
        [observation, reward, done, info] = env.step(nice_action)
        obs_jsonable = env.observation_space.to_jsonable(observation)
        return [obs_jsonable, reward, done, info]

    def get_action_space_contains(self, instance_id, x):
        env = self._lookup_env(instance_id)
        return env.action_space.contains(int(x))

    def get_action_space_info(self, instance_id):
        env = self._lookup_env(instance_id)
        return self._get_space_properties(env.action_space)

    def get_action_space_sample(self, instance_id):
        env = self._lookup_env(instance_id)
        action = env.action_space.sample()
        if isinstance(action, (list, tuple)) or ("numpy" in str(type(action))):
            try:
                action = action.tolist()
            except TypeError:
                print(type(action))
                print("TypeError")
        return action

    def get_observation_space_contains(self, instance_id, j):
        env = self._lookup_env(instance_id)
        info = self._get_space_properties(env.observation_space)
        for key, value in j.items():
            # Convert both values to json for comparibility
            if json.dumps(info[key]) != json.dumps(value):
                print(
                    'Values for "{}" do not match. Passed "{}", Observed "{}".'.format(
                        key, value, info[key]
                    )
                )
                return False
        return True

    def get_observation_space_info(self, instance_id):
        env = self._lookup_env(instance_id)
        return self._get_space_properties(env.observation_space)

    def _get_space_properties(self, space):
        info = {}
        info["name"] = space.__class__.__name__
        if info["name"] == "Discrete":
            info["n"] = space.n
        elif info["name"] == "Box":
            info["shape"] = space.shape
            # It's not JSON compliant to have Infinity, -Infinity, NaN.
            # Many newer JSON parsers allow it, but many don't. Notably python json
            # module can read and write such floats. So we only here fix "export version",
            # also make it flat.
            info["low"] = [
                (x if x != -np.inf else -1e100) for x in np.array(space.low).flatten()
            ]
            info["high"] = [
                (x if x != +np.inf else +1e100) for x in np.array(space.high).flatten()
            ]
        elif info["name"] == "HighLow":
            info["num_rows"] = space.num_rows
            info["matrix"] = [
                ((float(x) if x != -np.inf else -1e100) if x != +np.inf else +1e100)
                for x in np.array(space.matrix).flatten()
            ]
        return info

    def monitor_start(self, instance_id, directory, force, resume, video_callable):
        env = self._lookup_env(instance_id)
        if video_callable == False:
            v_c = lambda count: False
        else:
            v_c = lambda count: count % video_callable == 0
        self.envs[instance_id] = gym.wrappers.Monitor(
            env, directory, force=force, resume=resume, video_callable=v_c
        )

    def monitor_close(self, instance_id):
        env = self._lookup_env(instance_id)
        env.close()

    def env_close(self, instance_id):
        env = self._lookup_env(instance_id)
        env.close()
        self._remove_env(instance_id)


app = Flask(__name__)
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = False
envs = Envs()


class InvalidUsage(Exception):
    status_code = 400

    def __init__(self, message, status_code=None, payload=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
        self.payload = payload

    def to_dict(self):
        rv = dict(self.payload or ())
        rv["message"] = self.message
        return rv


def get_required_param(json, param):
    if json is None:
        logger.info("Request is not a valid json")
        raise InvalidUsage("Request is not a valid json")
    value = json.get(param, None)
    if (value is None) or (value == "") or (value == []):
        logger.info(
            "A required request parameter '{}' had value {}".format(param, value)
        )
        raise InvalidUsage(
            "A required request parameter '{}' was not provided".format(param)
        )
    return value


def get_optional_param(json, param, default):
    if json is None:
        logger.info("Request is not a valid json")
        raise InvalidUsage("Request is not a valid json")
    value = json.get(param, None)
    if (value is None) or (value == "") or (value == []):
        logger.info(
            "An optional request parameter '{}' had value {} and was replaced with default value {}".format(
                param, value, default
            )
        )
        value = default
    return value


@app.errorhandler(InvalidUsage)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response


########## API route definitions ##########
@app.route("/v1/envs/", methods=["POST"])
def env_create():
    """
    Create an instance of the specified environment
    Parameters:
        - env_id: gym environment ID string, such as 'CartPole-v0'
        - seed: set the seed for this env's random number generator(s).
    Returns:
        - instance_id: a short identifier (such as '3c657dbc')
        for the created environment instance. The instance_id is
        used in future API calls to identify the environment to be
        manipulated
    """
    env_id = get_required_param(request.get_json(), "env_id")
    seed = get_optional_param(request.get_json(), "seed", None)
    instance_id = envs.create(env_id, seed)
    return jsonify(instance_id=instance_id)


@app.route("/v1/envs/", methods=["GET"])
def env_list_all():
    """
    List all environments running on the server
    Returns:
        - envs: dict mapping instance_id to env_id
        (e.g. {'3c657dbc': 'CartPole-v0'}) for every env
        on the server
    """
    all_envs = envs.list_all()
    return jsonify(all_envs=all_envs)


@app.route("/v1/envs/<instance_id>/reset/", methods=["POST"])
def env_reset(instance_id):
    """
    Reset the state of the environment and return an initial
    observation.
    Parameters:
        - instance_id: a short identifier (such as '3c657dbc')
        for the environment instance
    Returns:
        - observation: the initial observation of the space
    """
    observation = envs.reset(instance_id)
    if np.isscalar(observation):
        observation = observation.item()
    return jsonify(observation=observation)


@app.route("/v1/envs/<instance_id>/step/", methods=["POST"])
def env_step(instance_id):
    """
    Run one timestep of the environment's dynamics.
    Parameters:
        - instance_id: a short identifier (such as '3c657dbc')
        for the environment instance
        - action: an action to take in the environment
    Returns:
        - observation: agent's observation of the current
        environment
        - reward: amount of reward returned after previous action
        - done: whether the episode has ended
        - info: a dict containing auxiliary diagnostic information
    """
    json = request.get_json()
    action = get_required_param(json, "action")
    render = get_optional_param(json, "render", False)
    [obs_jsonable, reward, done, info] = envs.step(instance_id, action, render)
    return jsonify(observation=obs_jsonable, reward=reward, done=done, info=info)


@app.route("/v1/envs/<instance_id>/action_space/", methods=["GET"])
def env_action_space_info(instance_id):
    """
    Get information (name and dimensions/bounds) of the env's
    action_space
    Parameters:
        - instance_id: a short identifier (such as '3c657dbc')
        for the environment instance
    Returns:
    - info: a dict containing 'name' (such as 'Discrete'), and
    additional dimensional info (such as 'n') which varies from
    space to space
    """
    info = envs.get_action_space_info(instance_id)
    return jsonify(info=info)


@app.route("/v1/envs/<instance_id>/action_space/sample", methods=["GET"])
def env_action_space_sample(instance_id):
    """
    Get a sample from the env's action_space
    Parameters:
        - instance_id: a short identifier (such as '3c657dbc')
        for the environment instance
    Returns:
        - action: a randomly sampled element belonging to the action_space
    """
    action = envs.get_action_space_sample(instance_id)
    return jsonify(action=action)


@app.route("/v1/envs/<instance_id>/action_space/contains/<x>", methods=["GET"])
def env_action_space_contains(instance_id, x):
    """
    Assess that value is a member of the env's action_space
    Parameters:
        - instance_id: a short identifier (such as '3c657dbc')
        for the environment instance
            - x: the value to be checked as member
    Returns:
        - member: whether the value passed as parameter belongs to the action_space
    """

    member = envs.get_action_space_contains(instance_id, x)
    return jsonify(member=member)


@app.route("/v1/envs/<instance_id>/observation_space/contains", methods=["POST"])
def env_observation_space_contains(instance_id):
    """
    Assess that the parameters are members of the env's observation_space
    Parameters:
        - instance_id: a short identifier (such as '3c657dbc')
        for the environment instance
    Returns:
        - member: whether all the values passed belong to the observation_space
    """
    j = request.get_json()
    member = envs.get_observation_space_contains(instance_id, j)
    return jsonify(member=member)


@app.route("/v1/envs/<instance_id>/observation_space/", methods=["GET"])
def env_observation_space_info(instance_id):
    """
    Get information (name and dimensions/bounds) of the env's
    observation_space
    Parameters:
        - instance_id: a short identifier (such as '3c657dbc')
        for the environment instance
    Returns:
        - info: a dict containing 'name' (such as 'Discrete'),
        and additional dimensional info (such as 'n') which
        varies from space to space
    """
    info = envs.get_observation_space_info(instance_id)
    return jsonify(info=info)


@app.route("/v1/envs/<instance_id>/monitor/start/", methods=["POST"])
def env_monitor_start(instance_id):
    """
    Start monitoring.
    Parameters:
        - instance_id: a short identifier (such as '3c657dbc')
        for the environment instance
        - force (default=False): Clear out existing training
        data from this directory (by deleting every file
        prefixed with "openaigym.")
        - resume (default=False): Retain the training data
        already in this directory, which will be merged with
        our new data
    """
    j = request.get_json()

    directory = get_required_param(j, "directory")
    force = get_optional_param(j, "force", False)
    resume = get_optional_param(j, "resume", False)
    video_callable = get_optional_param(j, "video_callable", False)
    envs.monitor_start(instance_id, directory, force, resume, video_callable)
    return ("", 204)


@app.route("/v1/envs/<instance_id>/monitor/close/", methods=["POST"])
def env_monitor_close(instance_id):
    """
    Flush all monitor data to disk.
    Parameters:
        - instance_id: a short identifier (such as '3c657dbc')
          for the environment instance
    """
    envs.monitor_close(instance_id)
    return ("", 204)


@app.route("/v1/envs/<instance_id>/close/", methods=["POST"])
def env_close(instance_id):
    """
    Manually close an environment
    Parameters:
        - instance_id: a short identifier (such as '3c657dbc')
          for the environment instance
    """
    envs.env_close(instance_id)
    return ("", 204)


@app.route("/v1/upload/", methods=["POST"])
def upload():
    """
    Upload the results of training (as automatically recorded by
    your env's monitor) to OpenAI Gym.
    Parameters:
        - training_dir: A directory containing the results of a
        training run.
        - api_key: Your OpenAI API key
        - algorithm_id (default=None): An arbitrary string
        indicating the paricular version of the algorithm
        (including choices of parameters) you are running.
    """
    j = request.get_json()
    training_dir = get_required_param(j, "training_dir")
    api_key = get_required_param(j, "api_key")
    algorithm_id = get_optional_param(j, "algorithm_id", None)

    try:
        gym.upload(
            training_dir,
            algorithm_id,
            writeup=None,
            api_key=api_key,
            ignore_open_monitors=False,
        )
        return ("", 204)
    except gym.error.AuthenticationError:
        raise InvalidUsage("You must provide an OpenAI Gym API key")


@app.route("/v1/shutdown/", methods=["POST"])
def shutdown():
    """ Request a server shutdown - currently used by the integration tests to repeatedly create and destroy fresh copies of the server running in a separate thread"""
    f = request.environ.get("werkzeug.server.shutdown")
    f()
    return "Server shutting down"


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Start a Gym HTTP API server")
    parser.add_argument(
        "-l", "--listen", help="interface to listen to", default="0.0.0.0"
    )
    parser.add_argument("-p", "--port", default=6666, type=int, help="port to bind to")

    args = parser.parse_args()
    print("Server starting at: " + "http://{}:{}".format(args.listen, args.port))
    app.run(host=args.listen, port=args.port, debug=True)
```

```python id="Q8K9EYdCIk0a"
!sudo nohup python tradegym_server.py > log.txt 2>&1 &
```

```python colab={"base_uri": "https://localhost:8080/"} id="DWOW3gWdIoEJ" executionInfo={"status": "ok", "timestamp": 1638516672900, "user_tz": -330, "elapsed": 627, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "https://lh3.googleusercontent.com/a/default-user=s64", "userId": "13037694610922482904"}} outputId="23027dd4-daf0-4a03-e417-f1af6272ff69"
!head log.txt
```

<!-- #region id="ZqZOCOK3QMjG" -->
Client
<!-- #endregion -->

```python id="GObnTQTYQIUy"
!pip install mplfinance
```

```python id="9nRRmT-JQTBl"
import warnings
warnings.filterwarnings('ignore')
```

```python id="8kkdOzdvP-bd"
import os
import sys
import requests
import json
import logging
import six.moves.urllib.parse as urlparse

import gym
import tradegym
```

```python id="Afb6Qt4OIvII"
# host_ip = "0.0.0.0"
# host_port = 6666
# endpoint = "v1/act"
# env = gym.make("StockTradingContinuousEnv-v0")
```

```python id="8yXMsA3ZIwgh"
# Create an App-level child logger
logger = logging.getLogger("TFRL-tradegym-client")
# Set handler for this logger to handle messages
logger.addHandler(logging.StreamHandler())
# Set logging-level for this logger's handler
logger.setLevel(logging.DEBUG)
```

```python id="yE3Ug10AI5eI"
class Client(object):
    """
    Gym client to interface with gym_http_server
    """

    def __init__(self, remote_base):
        self.remote_base = remote_base
        self.session = requests.Session()
        self.session.headers.update({"Content-type": "application/json"})

    def _parse_server_error_or_raise_for_status(self, resp):
        j = {}
        try:
            j = resp.json()
        except:
            # Most likely json parse failed because of network error, not server error (server
            # sends its errors in json). Don't let parse exception go up, but rather raise default
            # error.
            resp.raise_for_status()
        if (
            resp.status_code != 200 and "message" in j
        ):  # descriptive message from server side
            raise ServerError(message=j["message"], status_code=resp.status_code)
        resp.raise_for_status()
        return j

    def _post_request(self, route, data):
        url = urlparse.urljoin(self.remote_base, route)
        # logger.info("POST {}\n{}".format(url, json.dumps(data)))
        resp = self.session.post(
            urlparse.urljoin(self.remote_base, route), data=json.dumps(data)
        )
        return self._parse_server_error_or_raise_for_status(resp)

    def _get_request(self, route):
        url = urlparse.urljoin(self.remote_base, route)
        # logger.info("GET {}".format(url))
        resp = self.session.get(url)
        return self._parse_server_error_or_raise_for_status(resp)

    def env_create(self, env_id):
        route = "/v1/envs/"
        data = {"env_id": env_id}
        resp = self._post_request(route, data)
        instance_id = resp["instance_id"]
        return instance_id

    def env_list_all(self):
        route = "/v1/envs/"
        resp = self._get_request(route)
        all_envs = resp["all_envs"]
        return all_envs

    def env_reset(self, instance_id):
        route = "/v1/envs/{}/reset/".format(instance_id)
        resp = self._post_request(route, None)
        observation = resp["observation"]
        return observation

    def env_step(self, instance_id, action, render=False):
        route = "/v1/envs/{}/step/".format(instance_id)
        data = {"action": action, "render": render}
        resp = self._post_request(route, data)
        observation = resp["observation"]
        reward = resp["reward"]
        done = resp["done"]
        info = resp["info"]
        return [observation, reward, done, info]

    def env_action_space_info(self, instance_id):
        route = "/v1/envs/{}/action_space/".format(instance_id)
        resp = self._get_request(route)
        info = resp["info"]
        return info

    def env_action_space_sample(self, instance_id):
        route = "/v1/envs/{}/action_space/sample".format(instance_id)
        resp = self._get_request(route)
        action = resp["action"]
        return action

    def env_action_space_contains(self, instance_id, x):
        route = "/v1/envs/{}/action_space/contains/{}".format(instance_id, x)
        resp = self._get_request(route)
        member = resp["member"]
        return member

    def env_observation_space_info(self, instance_id):
        route = "/v1/envs/{}/observation_space/".format(instance_id)
        resp = self._get_request(route)
        info = resp["info"]
        return info

    def env_observation_space_contains(self, instance_id, params):
        route = "/v1/envs/{}/observation_space/contains".format(instance_id)
        resp = self._post_request(route, params)
        member = resp["member"]
        return member

    def env_monitor_start(
        self, instance_id, directory, force=False, resume=False, video_callable=False
    ):
        route = "/v1/envs/{}/monitor/start/".format(instance_id)
        data = {
            "directory": directory,
            "force": force,
            "resume": resume,
            "video_callable": video_callable,
        }
        self._post_request(route, data)

    def env_monitor_close(self, instance_id):
        route = "/v1/envs/{}/monitor/close/".format(instance_id)
        self._post_request(route, None)

    def env_close(self, instance_id):
        route = "/v1/envs/{}/close/".format(instance_id)
        self._post_request(route, None)

    def upload(self, training_dir, algorithm_id=None, api_key=None):
        if not api_key:
            api_key = os.environ.get("OPENAI_GYM_API_KEY")

        route = "/v1/upload/"
        data = {
            "training_dir": training_dir,
            "algorithm_id": algorithm_id,
            "api_key": api_key,
        }
        self._post_request(route, data)

    def shutdown_server(self):
        route = "/v1/shutdown/"
        self._post_request(route, None)
```

```python id="MdHg1t6BOOzi"
class ServerError(Exception):
    def __init__(self, message, status_code=None):
        Exception.__init__(self)
        self.message = message
        if status_code is not None:
            self.status_code = status_code
```

```python colab={"base_uri": "https://localhost:8080/"} id="ga_fvsUyONaR" executionInfo={"status": "ok", "timestamp": 1638517822470, "user_tz": -330, "elapsed": 1339, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "https://lh3.googleusercontent.com/a/default-user=s64", "userId": "13037694610922482904"}} outputId="808b2f8d-a5dc-411a-c53e-4cf505ef9c65"
if __name__ == "__main__":
    remote_base = "http://0.0.0.0:6666"
    client = Client(remote_base)

    # Create environment
    env_id = "StockTradingContinuousEnv-v0"
    # env_id = "CartPole-v0"
    instance_id = client.env_create(env_id)

    # Check properties
    all_envs = client.env_list_all()
    logger.info(f"all_envs:{all_envs}")
    action_info = client.env_action_space_info(instance_id)
    logger.info(f"action_info:{action_info}")
    obs_info = client.env_observation_space_info(instance_id)
    # logger.info(f"obs_info:{obs_info}")

    # Run a single step
    init_obs = client.env_reset(instance_id)
    [observation, reward, done, info] = client.env_step(instance_id, 1, True)
    logger.info(f"reward:{reward} done:{done} info:{info}")
```

```python id="kMX09dT9MMF1"
# !kill -9 $(lsof -t -i:6666)
```

<!-- #region id="U9i6mgMDLauI" -->
## Training Deep RL agents using remote simulators
<!-- #endregion -->

```python id="lyOmMj2ASwvO"
import datetime
import os
import sys
import logging

import gym.spaces
import numpy as np
import tensorflow as tf
```

```python colab={"base_uri": "https://localhost:8080/"} id="k2YXu28ySBuN" executionInfo={"status": "ok", "timestamp": 1638518748902, "user_tz": -330, "elapsed": 109431, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "https://lh3.googleusercontent.com/a/default-user=s64", "userId": "13037694610922482904"}} outputId="4adf83a0-0e44-4638-dcb2-61da7914ec1b"
# Create an App-level child logger
logger = logging.getLogger("TFRL-training-with-sim-server")
# Set handler for this logger to handle messages
logger.addHandler(logging.StreamHandler())
# Set logging-level for this logger's handler
logger.setLevel(logging.DEBUG)

current_time = datetime.datetime.now().strftime("%Y%m%d-%H%M%S")
train_log_dir = os.path.join("logs", "TFRL-SAC", current_time)
summary_writer = tf.summary.create_file_writer(train_log_dir)


if __name__ == "__main__":

    # Set up client to connect to sim server
    sim_service_address = "http://0.0.0.0:6666"
    client = Client(sim_service_address)

    # Set up training environment
    env_id = "StockTradingContinuousEnv-v0"
    instance_id = client.env_create(env_id)

    # Set up agent
    observation_space_info = client.env_observation_space_info(instance_id)
    observation_shape = observation_space_info.get("shape")
    action_space_info = client.env_action_space_info(instance_id)
    action_space = gym.spaces.Box(
        np.array(action_space_info.get("low")),
        np.array(action_space_info.get("high")),
        action_space_info.get("shape"),
    )
    agent = SAC(observation_shape, action_space)

    # Configure training
    max_epochs = 500 # 30000
    random_epochs = 0.6 * max_epochs
    max_steps = 100
    save_freq = 100 # 500
    reward = 0
    done = False

    done, use_random, episode, steps, epoch, episode_reward = (
        False,
        True,
        0,
        0,
        0,
        0,
    )
    cur_state = client.env_reset(instance_id)

    # Start training
    while epoch < max_epochs:
        if steps > max_steps:
            done = True

        if done:
            episode += 1
            logger.info(
                f"episode:{episode} cumulative_reward:{episode_reward} steps:{steps} epochs:{epoch}"
            )
            with summary_writer.as_default():
                tf.summary.scalar("Main/episode_reward", episode_reward, step=episode)
                tf.summary.scalar("Main/episode_steps", steps, step=episode)
            summary_writer.flush()

            done, cur_state, steps, episode_reward = (
                False,
                client.env_reset(instance_id),
                0,
                0,
            )
            if episode % save_freq == 0:
                agent.save_model(
                    f"sac_actor_episode{episode}_{env_id}.h5",
                    f"sac_critic_episode{episode}_{env_id}.h5",
                )

        if epoch > random_epochs:
            use_random = False

        action = agent.act(np.array(cur_state), use_random=use_random)
        next_state, reward, done, _ = client.env_step(
            instance_id, action.numpy().tolist()
        )
        agent.train(np.array(cur_state), action, reward, np.array(next_state), done)

        cur_state = next_state
        episode_reward += reward
        steps += 1
        epoch += 1

        # Update Tensorboard with Agent's training status
        agent.log_status(summary_writer, epoch, reward)
        summary_writer.flush()

    agent.save_model(
        f"sac_actor_final_episode_{env_id}.h5", f"sac_critic_final_episode_{env_id}.h5"
    )
```

<!-- #region id="vsP4OKmBUX0P" -->
## Evaluating deep RL agents
<!-- #endregion -->

<!-- #region id="hGaHZJUOTu8B" -->
Let’s assume that you have trained the SAC agent in one of the trading environments using the training script (previous recipe) and that you have several versions of the trained agent models, each with different policy network architectures or hyperparameters or your own tweaks and customizations to improve its performance. When you want to deploy an agent, you want to make sure that you pick the best performing agent, don’t you?
<!-- #endregion -->

<!-- #region id="73tLkCZAUV_e" -->
We will build a lean script to evaluate a given pre-trained agent model locally so that you can get a quantitative performance assessment and compare several trained models before choosing the right agent model for deployment. Specifically, we will use the tradegym module and the sac_agent_runtime module that we built earlier in this chapter to evaluate the agent models that we train.
<!-- #endregion -->

```python id="kLMILht6Uw0P"
import os
import sys

from argparse import ArgumentParser
import imageio
import gym

import tradegym

parser = ArgumentParser(prog="TFRL-Evaluating-RL-Agents")
parser.add_argument("--agent", default="SAC", help="Name of Agent. Default=SAC")
parser.add_argument(
    "--env",
    default="StockTradingContinuousEnv-v0",
    help="Name of Gym env. Default=StockTradingContinuousEnv-v0",
)
parser.add_argument(
    "--num-episodes",
    default=10,
    help="Number of episodes to evaluate the agent. Default=100",
)
parser.add_argument(
    "--trained-models-dir",
    default="/content",
    help="Directory contained trained models.",
)
parser.add_argument(
    "--model-version",
    default="final_episode_StockTradingContinuousEnv-v0",
    help="Trained model version",
)
parser.add_argument(
    "--render",
    type=bool,
    help="Render environment and write to file? (True/False). Default=True",
)
args = parser.parse_args([])


if __name__ == "__main__":
    # Create an instance of the evaluation environment
    env = gym.make(args.env)
    if args.agent != "SAC":
        print(f"Unsupported Agent: {args.agent}. Using SAC Agent")
        args.agent = "SAC"
    # Create an instance of the Soft Actor-Critic Agent
    agent = SAC(env.observation_space.shape, env.action_space)
    # Load trained Agent model/brain
    model_version = args.model_version
    agent.load_actor(
        os.path.join(args.trained_models_dir, f"sac_actor_{model_version}.h5")
    )
    agent.load_critic(
        os.path.join(args.trained_models_dir, f"sac_critic_{model_version}.h5")
    )
    print(f"Loaded {args.agent} agent with trained model version:{model_version}")
    render = args.render
    # Evaluate/Test/Rollout Agent with trained model/brain
    video = imageio.get_writer("/content/agent_eval_video.mp4", fps=30)
    avg_reward = 0
    for i in range(args.num_episodes):
        cur_state, done, rewards = env.reset(), False, 0
        while not done:
            action = agent.act(cur_state, test=True)
            next_state, reward, done, _ = env.step(action[0])
            cur_state = next_state
            rewards += reward
            if render:
                video.append_data(env.render(mode="rgb_array"))
        print(f"Episode#:{i} cumulative_reward:{rewards}")
        avg_reward += rewards
    avg_reward /= args.num_episodes
    video.close()
    print(f"Average rewards over {args.num_episodes} episodes: {avg_reward}")
```

```python id="R3FOPry1VBCc"
%load_ext tensorboard
```

```python id="RYVrmJidWRhE"
%tensorboard --logdir /content/logs/TFRL-SAC
```

<!-- #region id="K3mvMj_nXE_p" -->
![image.png](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABOYAAAI8CAYAAABViaRZAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAP+lSURBVHhe7N0HfBP1+wfwJ927ZU/ZGwRF2SIKTnAgIio4wIU/FRdu8S8I7i3g3oobnIio4AARUQGVvfcqo3u3+efz5K69hrRN2ibp+Lxfr5Dkcrm7XJKj98nz/X5tffv2tQsRERERERERERH5VZBxTURERERERERERH7EYI6IiIiIiIiIiCgAGMwREREREREREREFAIM5IiIiIiIiIiKiAChx8Id5Jy41bhEREREREREREVFFnf1XX+OWEyvmiIiIiIiIiIiIAoDBHBERERERERERUQAwmCMiIiIiIiIiIgoABnNEREREREREREQBwGCOiIiIiIiIiIgoABjMERERERERERERBQCDOSIiIiIiIiIiogBgMEdERERERERERBQADOaIiIiIiIiIiIgCgMEcERERERERERFRADCYIyIiIiIiIiIiCgAGc0RERERERERERAHAYI6IiIiIiIiIiCgAGMwREREREREREREFAIM5IiIiIiIiIiKiAGAwR0REREREREREFAAM5oiIiIiIiIiIiAKAwRwREREREREREVEAMJgjIiIiIiIiIiIKAAZzREREREREREREAcBgjoiIiIiIiIhqpZibf5K4yVuNe0T+Z+vbt6/duF3MvBOXGreIiIiIiIiIiGoWhHIh7U/R2wWHtknK5NZ6m8oW1mesRF32lnHPKeP9cZLzx9vGvcDBe6qXdoP0Gu9t3qafpeDwdsnb+LNeAunsv/oat5wYzBERERERERFRrWIN5UwM5zyHUA7hnBUCr7QXTjXu+V9Q3Va6Xa7vqyu8z9jOgsPbjCn+VeWCuaD2IySkToRxrwwZayVn1QrjTvUU3G20BEcZd6yq9GubKDFPPCUhkSL2DXdI8vSnjelEREREREREVVvCdLexh8eSJtiMW/6BgCms71i3FV85S98uFighiEKlmr+h+W9QvVbGPadABnMRQydLxNkP6m3sr5xl7xRWx2F/Yj9ie8N6X6nX5jxZ307W5/hTlQvmwicckcgOCca9Mux/Q5KmXWPcqZ6iJtklrJFxx1VBkuSve0OyXrpDco1JVQODOSIiIiIiIqqeqlMwZw2Y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k9bcISkvOV5fg6ck9t6JRtWcsV8s80HBqjGS8soHpWzfUImePFdCzcIj19foUNOCOSIiIiIiIqrZygrmUh5sreETAh7X/tTAH8EcmEERIGjCoHJmQOe6ff4Kk8zAsCIQmPmqDzdrUOluPSUFc9YAFvuxpCDUF1yDuerVlNWhYMEQSfvsA8lPc95HaKTBUUGS5C+7SdKmP+xlH3NPS9pLN0nO3iQNsoIadZbgJs5Qzn5ooWTPQiiH+bZK9vTBkvXPWg2rJNRYr4POh2q2dXq33OxpayVv0U1FoRysukbSZ82UPHRKiqANr1dDOuP1IpSDxDsk/XNjEAsH53xZUrBhjuQZ+yqoweAy3vBvJX3mHZJ7yGjSarxG+46ZkluRJrpEREREREREVRSCHYQ07kI5f0KwZPaxZwZi2DbX7cM8/qrwQtCFi1byObYPIWZp/QDiMcyDeRF24eKrUA6szZWxv1z73EMg5xrKYR4zlMP2+jOUc6fqVcx5o8VQCWuc4Pj0rpWcVSuMiRVxvIRqs88sKdg6xzlqjlsYLrufBCH4KnW+Subh6w3uNlqCoyq2bVq2XSdC7Ps+kNwdxkQiIiIiIiKiaqasirmy+KtizoQqMFR0YQAKc/ACBFAY7MCXTVe9gWAL22jlryo+V9hfYX3HFgaXCBHzNiEUPLriUEeJNZrmIpQLxP6s+k1ZiYiIiIiIiIh8xNo3mVWggqXqyF0wh8o4s3otEEp6X10huMP7XNKAEL5W7ZuyEhERERERERGVl9n80dqEkaGcd3L+eMe4VQQVaoFkvq94H3FtNsHVCjrH+2s2AcZIrYEK5dxhxRwRERERERER1TpmhRUwlCN/YcUcEREREREREdV61gorokBhMEdEREREREREtVJVatJItRObshIREREREVG1UNHRNalm8PcoqUSViaOyEhERERERERERBQD7mCMiIiIiIiIiIqoCGMwREREREREREREFAIM5IiIiIiIiIiKiAGAwR0REREREREREFAAM5oiIiIiIiIiIiAKAwRwREREREREREVEAMJgjIiIiIiIiIiIKAAZzREREREREREREAcBgjoiIiIiIiIiIKAAYzBEREREREREREQUAgzkiIiIiIiIiIqIAYDBHREREREREREQUAAzmiIiIiIiIiIiIAoDBHBERERERERERUQAwmCMiIiIiIiIiIgoAW9++fe3G7WLmnbjUuEVUtSVMd/sRpgpImmAzbhERERERERFRZTn7r77GLSdWzBEREREREREREQVAiRVzDRs2NG4RERERERERERHVbu+//75xq/zOOOMM45ZTicFcgwYNjFtERERERERERES126xZs4xb5edxMFevXj3jFhERERERERERUe324YcfGrfKz+NgLi4uzrhFRERERERERERUu3322WfGrfLzOJiLiooybhEREREREREREdVuX3zxhXGr/DwO5kJDQ41bREREREREREREtds333xj3Cq/M88807jlVGIwFxwcbNwiIiIiIiIiIiKq3b799lvjVvl5HMwFBQUZt4iIiIiIiIiIiGq3efPmGbfc++qrr+S8884z7rnnGswxfSMiIiIiIiIiIqoAhHLWa08xmCMiIiIiIiIiIion1zDOm3COwRwREREREREREVE5lBTCeRrOsY85IiIiIiIiIiKiMpTVx5wn2MccERERERERERFRFcBgjoiIiIiIiIiIKAAYzBEREREREREREQUAgzkiIiIiIiIiIqIAYDBHREREREREREQUAByVlYiIiIiIiIiIqAzmqKwrV67Ua28cd9xxes1RWYmIiIiIiIiIiKoABnNEREREREREREQBwGCOiIiIiIiIiIgoABjMERF5oUmTJnL11VfL9OnT5bPPPtPL/fffr9OJiIiIiIiIvMFgjojIQwjkEMRdddVV0rNnTw3jcBk6dKgGdXicfKtevXpywQUXSGxsrDGFiCpb586d5eyzz5bg4GBjChERERH5SnDz5s0nG7eLsdlsxi0iIkLohkAO3nzzTXnjjTf0+pNPPpG0tDQ5+eST5fjjj9dj54oVK3S+smD+Ll26SOvWrY+65OTkSHZ2tpx22mkSEREhiYmJGgJOmDBBGjVqJGvXrjWWUnvUqVNHLrvsMt0vq1atkvz8fOMR/6vt70V5Yb+deuqpcujQIcnMzDSmUlVw4YUX6ghhq1evloKCAj2m4f1at26dMQcRERER4XwE9u3bp9feaNy4sV6///77em1ixRwRURkQoJmh3E033aShHMK3vXv36gX3R44cqY+jygTze+KEE06QQYMGSd++fY+6HHPMMVK3bl1d1oknnmg8o7jIyEg9mT7ppJOMKZULy8XysZ5AQ+B51llnaRj31VdfaXBJ1U/btm3189y+fXtjClWE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DroRNrnbfnfPL+s57qBzaJy4ljR/eZZZmcp6D9BvGwI3hJVmaOqqrNfoT9heDEyBILO6ndQRERERERER1TS+6GOOwRwREREREREREVEZakUwh6aEqLyqCFRDoRkgERERERERERFRZagVo7Kir7KSmhl6As9lB95ERERERERERFTVVbmKOSKiqsBsFk9ERERERES1j7su0mpFU1YiIiIiIiIiIqKqplY0ZSUiIiIiIiIiIqoNGMwREREREREREREFAIM5IiIiIiIiIiKiAGAwR0REREREREREFAAM5oiIiIiIiIiIiAKAwRwREREREREREVEAMJgjIiIiIiIiIiIKAAZzREREREREREREAWDr27ev3bhdTFBQYDK7nj17yplnnilRUVHGFO9kZGTI/PnzZfny5cYUIiIiIiIiIiKiipk3b55er1y5Uq+9cdxxx+k1Mi+rKlcxV5FQDvBc1xdJRERERERERERU1VS5YK4ioZypMpZR2zRs2FBOO+006dy5szGl5qiprw2f81NOOUVOOOEEYwoRERERERERVSc1po+5sLAwiY6ONu555pFHHpHnnnuuRoZR3kIT4rvvvlvOP/98vf/UU0/JRx995LfQ55577pHPP/9czjnnHGNK5XF9bTUFPre33nqrXHHFFXof+w77EPuSfMtms/HCCy+88MILL7zwwgsvvPBSzS9VQY0I5hDK9ejRQy/ehHMtWrSQVq1a1coKu9dff10vJUFffZmZmZKVlWVM8a3U1FTJycnR6+qkrP3oT9V1H1ZFrgdr9Llpvbg+zgsvvPDCCy+88MILL7zwwkv1u5R1rucPVW7wh6lTpxq3PGOGcrGxsZKSkiL//POP5ObmygMPPGDMUbL3339fYmJidJ1///23MbV2wGuHyy67TK/POussmThxoixYsEAee+wxnVZT+PK1ue5Hf0I1Iz7n27dvl1tuucWYShVhHnitB2B304iIiIiIiKhmsdud8Zh5Da7TfDH4Q5UP5kJDQzVoc6ekUA7KE8yhKeC1114r9erV08c3b94sdevWld9++00Dneeff17atGkje/fu1WaE2EeHDh2SV199Vb755ht9DnbwuHHjpHnz5noij+qlTz75RN588019HOuMi4vT27jG/Q8++EDuvPNOOfnkkyUiIkJfw6JFi+TRRx/VyjVXxx9/vNx0003SoUMH3QZU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qL5VGQ60uJgVcxilFk1Z0cdgSQO2EBERERERUc2HwRyTk5O1KSsG+qw1TVmJiPyFwRwRERERERG5469gjukbERERERERERFRADCYIyIiIiIiIiIiCgAGc0RERERERERERAHAYI6IiIiIiIiIiCgAGMwREREREREREREFAIM5IiIiIiIiIiKiAGAwR0REREREREREFAAM5oiIKlnv3r1l/vz58sorrxhTiIiIiIiIap/zzz9fL1QyBnNERERERERERFSpunbtKi1btjTueef000+XPn36GPdqNgZzRERERERERERUaeLj46VHjx5y8OBBY4rnEMp17txZg7naEM4xmCMiCpAHH3xQVqxYUXhxbfqK+yU9PmzYMFm8eHHhY7iNaURERERERIF2yimnyK5duyQ9Pd2Y4hkzlDPVhnCOwRwRUQAgZEOQ9tprr8nxxx9feG2GbwjtUPo9adKkwsdx/4YbbtA+7G6++WZZvXq1PobL/v375aqrrtLnEhERERERBUqLFi0kLCxMli1bZkzxjDWUmzNnjvzwww96u6aHcwzmiIj8DMFaq1attNLtxRdf1Gm4xn1Mx+NNmzbV6SY8ftJJJ+l1gwYNJDo62njE6cILL9QLERERERFRoERERGiI9scff0hWVpYxtWyuoRyq7dauXVsrwjkGc0REfmYGa3v27DGmOP3zzz/6yxIe/+qrr3TatGnTjmrGOnfuXK2WQ4DHZqxERERERFRVNGzYUOrXry/Dhw/XVj4Y/AGX0kZmdRfKmWpDOMdgjoioikAgFxoaqrcRvqFCDs1UUQJuhnBmQDd+/Hh9DE1dAQEeAzoiIiIiIgqkHTt2yEsvvSQvvPCCXrZv366XL7/80pjjaCkpKXrtGsqZrOGcOW9NwmCOiMjPEhMTtRNU1+aquI/peNzKDOEQ0JlNXU1mgGcGdCeeeKJeExERERERVQdo9vr222+7DeVMCOcwD65rGgZzRER+hoBt27ZtGrZhMAfANe5jOh5HZZy1As7slw6Po7IOj1mbt5qB3F9//aXXREREREREgYZKudKq5UyeVMLVxGo5sPXt29du3C4mKIiZHRHVbDabTS843oWEhGhHpej7LT4+vkIBF0K0qVOnav8Krg4cOCAPPPCAhm8YeRV9L5gwDdVxptmzZ0ubNm2MeyJbtmwpHOABQd7YsWMLm77m5ubqL0jmYBJERERERERUfih+SE5O1lZNGMgiLy9Pvv76a31s5cqVeu2N4447Tq/PPPNMvTYxmCOiWstXwRwRERERERFVb/4K5pi+ERERERERERERBQCDOSIiIiIiIiIiogBgMEdERERERERERBQADOaIiIiIiIiIiIgCgMEcERERERERERFRADCYIyIiIiIiIiIiCgAGc0RERERERERERAHAYI6oEvXv319OOeUUiYqKMqYQEREREREREbnHYI7IxfPPPy9ffPGFnHDCCcaUsvXt21dmz54tTz75pNx///1y8sknG49UzD333CM///yzXHPNNcYUIiIiIiIiIqopGMwRVYJLL71U6tatKx9++KFcddVV8uuvvxqPVC5U5L366qu6Dqo4u91u3HJyvU9ERERERES1m6/PE2tdMHfBBRdosIFr8h8ESjNnzqy0/d65c2d57rnnqkxAVa9ePUlOTpbff/9ddu7cKRkZGcYjlSsuLk5at24tDRs2NKaQLzCgIyIiIiIiqt38dV5Y5YK5999/X3777Te3lx9++EHOOussY87yQYCCYAPXgMAIF9Ozzz4r8+bNk8GDBxtTAqdVq1Zy2mmn6bXp3Xfflc8++0yDqaoM24dtNwMkM1Ay93tFoQ837JfKCKhQ7Yaw9s0335Trr79ebDab8UiRPn36yNNPPy3vvPOOPPLII3ofunbtKnfddZfExsZKRESEDB8+XMaMGaOPwXnnnSczZszQ5+H55vNg4MCBct9998nQoUONKSLHHHOM3HLLLcWWYcK2DRo0SEJCQqRNmza6XqyfKhcOvgzmiIiIiIiIajd/nRtWuWDuxRdflKlTp+rl33//lUOHDmllFO4//vjjsnz5cmPOynHDDTfoxfT1119rc8SlS5caUwIHwdbdd9+t16Y5c+bIxx9/LGvXrjWmVE3nn3++bnvPnj2NKVUT+nD73//+Jy1btpSwsDCt6OvWrZvxqBOq8qZNmyZdunSRoKAg6dWrlzz00EMawsXHx0u7du0kMjJSn4/wsVmzZvq8SZMmyR133CHNmzfX53Xv3r3wedCxY0c544wzdLoJQeOpp54qvXv3NqYUadGihW4nltWgQQNdL9ZPFWc94Prr4EtERERERERVl7/OE4ObN28+2bhdjLuqIX9AM8BNmzbpBaEFgocvv/xSFi1aJFu2bJH09HStlrrssstk/Pjx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HVddR2icNWuWpKenaxNJBIx4PWh2ylCOiIiIiIiIiCjwWDFHROQGK+aIiIiIiIhqJ1bMERERERERERER1XAM5oiIiIiIiIiIiAKAwRwREREREREREVEAsI85qrWmTp1q3KKq6oEHHjBu+R/7mCMiIiIiIqqd/NnHHIM5IiI3GMwRERERERHVThz8gYiIiIiIiIiIqIZjMEdERERERERERBQADOaIiIiIiIiIiIgCgMEcERERERERERFRADCYIyIiIiIiIiIiCgAGc0RERERERERERAHAYI6IiIiIiIiIiCgAGMwREREREREREREFAIM5IiKqcp5++mm9EBHVBN4c0yZNmuST4x+Pq0RERFUTgzkiIj/p3bu3zJ8/X1555RVjiv8NGDBA5s2bJzfffLMxpXyio6NlyJAh+pp8oVWrVnohInKnuh1PvTmmHXPMMT45/vG4SkREVDUxmCMiqkVOOeUUyc/Pl59++smYUj5du3aVu+66S66++mpjChFR7VJZx1MiIiKq3YKbN28+2bhdjM1mM24REdU+I0aMkI8//ti4VzmaNWsmgwcPlqSkJPnmm2+MqcUde+yxcv3112vghduHDx+WAwcOGI+KDBs2TG688UYZNWqUNGrUSNatWye5ubn6WFnPRZXb//73P33OBx98oNOwjBtuuEGuu+466devn2RkZMjOnTv1McD23nTTTXLJJZcUrg9VItiONm3a6P8VLVq0kN27d0tycrJceumlOv8555wjsbGxsmrVKl0Otueqq66Spk2b6jZ07txZfv/9d33MnYsvvlivP/nkE7325X4houqnuh1Prcc0BHo4ptavX1+uvfZavR0VFVV4vDz33HP1fnBwsB5PTzvtNL29ceNGfRxK2/aSuB5X8RrGjRunyzn11FO9WkdZ+4eIiKi6w/+bc+bMMe4Vueyyy/R63759eu2Nxo0b6/X777+v1yYGc0REbgQimMNJ0OTJk6Vt27aSnZ0t3bp10/m3bt2qJ3c4QcNJUnh4uISGhsqgQYOkR48eWq2BZl3Tpk3TZkp5eXlHPRcuuOAC6d+/v8ydO1dWr16tARv6G0L1G06oOnXqJGeeeaZuH07AcIJ566236slbUFCQDBw4UNdz6NAh6dOnj55U4kTObrfLypUr5f7775eRI0fq/x8I5dDUtWXLlrp9vXr10hPAk046SerUqSNH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QkHsp7LgWF7SMbqk1/3888+7nY7tJCIiouJsffv2ddvRBka5IiKqrXBih75xfAH99WA0QIRIgL539u7dq1UMJpyYoV81jD6IEe1w4omTnClTphhzeM8cwc/a9xCg8gJNqnDyZW6TCf0ioXNzbBs68/7f//6nHY3Pnz/fmKMITnJxwum6DCjpNWLd1u1xN58V3hfXzsNxgoiTPlcVfb1EVPXVxuMpgsSzzz5bR0pF89rSjpmusC+aNGlS2Hz2zDPP1MEvXPubQx93GLDHVUnH6JJed2n7g4iIqCrDoEfuzjHmzZun19auKDyF/0cB//9aMZgjInLDl8GcJzDiIE78UFlmNst64okn3J7AERFRyWra8dQazKGSj4iIiCqfP4M5pm9ERFXQvffeq02m0LE4mlHdfffdDOWIiMqhph1P16xZo01eWdlLRERUM7BijojIjUBXzBEREREREVFgsGKOiIiIiIiIiIiohmMwR0REREREREREFAAM5sqhTp06cvHFF0vLli2NKURERERERERERN6pksEcAq9bb71VHnroIR1xatKkSTJ06FDttDcQwsLCdHh5XENERIQcc8wxEh8fr/ddde3aVbcZw+ITERERERERERG5U+WCOVSjXXjhhZKamipPPvmk/N///Z989913csIJJ8jgwYONufyrU6dOcvXVV+u1JzZu3ChfffWV/Pvvv8YUIiIiIiIiIiKi4qpcMIdKNFSk/fnnnxrO2e12+euvv2THjh3Srl07CQ0NleOPP146duwo3bt3l9GjR2tgFxUVpRVsqKy75JJLtGrNZrMZSxV9fODAgTqqBq5x36qkx7Ge9u3ba7UernHfFBISovNifb179y6s6IuNjZW4uDiJjIzU++b2YpvQBBYjcFir7fA8zIPlYHlt27bV5eG1EhERERERERFRzRTcvHnzycbtYqyhlj9hvccee6yEh4fLli1bJDc3V6f/888/GtAVFBTIOeecI3369JGGDRvq/J07d9ZhZ3v27KnNTRGM9erVS7Kzs2XXrl3SpEkTGTdunDaRxTQz1NuwYYNkZWWV+nirVq00KMMysa60tDQ5cuSIrgtBXUJCgm4r1h8dHa3PwfTTTz9d9u3bJ/v379ftRdCGZWH7ETBiHatXr5a8vDwZPny4nHzyyZKfn6/bgiaweG3//fef5OTk6OsnIv8aMWKEfPzx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yZMnG0tERERERETUVHz22Wdy3XXXGUtlvv32W2Ou+i688EJjzqreBeaIiOoDBuaIiIiIiIiaJncG5hh9IyIiIiIiIiIiqgMMzBEREREREREREdUBBuaIiIiIiIiIiIjqAANzREREREREREREdYCBOSIiIiIiIiIiojrAwBwREdWqqVOnyrvvvquPRERUfbyeEhERNX4MzBERucmQIUNk2bJl8sYbbxhr3G/kyJFa4vvOO+801lSuWbNmMn36dPnggw/kyy+/1GM4k/DwcImJidFHIiJXaGjXU1xLH330Ufnjjz9k06ZNsnHjRvnss890H5Xh9ZSIiKjxY2COiKgJOeecc6SoqEh+/vlnY03Fzj33XFm6dKnccccdEh0dLb6+vsYWIiKqyvX0pptukgkTJmgwcdSoUfLss89Kq1at5MYbbzSeQURERE0VA3NERPVInz59NKsCXZfwiGVbF198sbz44ouyaNEimTlzpmZhmM70Wjx3wIABsn37dtm2bZuuQybGQw89pPu7//779SYRgTjIzMzUjI6rr75adu7cqeuqa8SIEfLMM8/IO++8o+1EREQYW6ymTZsmr7/+uk6Yt1XZMRMRVaQ+XU979eolaWlp8sUXX0hWVpZ89NFHsnv3bgkNDdXtVcHrKRERUePCwBwRUT2BG6b/9//+n2aq+fv76yOyKsyuTrfffrvMmTNHb/6aN2+uN33PP/+83ljhOXju6NGjHb4WsH+8Dl2oAPt5+umn5ZJLLpHg4GAZM2aMzJo1S7NAYO3atfKvf/1L4uPjdbm6kCnyz3/+UwYOHKjv9bLLLpNXXnlF24f58+fLXXfdJa1bt5bIyEidxzqo7JiJiCpS366nt956q4wfP770+R06dNDuqampqbrsLF5PiYiIGh8G5oiI6onJkydLcXGx3jhdeeWV+ujp6ak3TzBs2DA5evSoZkBMmTJFli9frl1MBw8erBkUgYGB8tprr+lrX331VfHy8tJtJnSfOn78uHz99de6jOe1b99e3nrrLR1Y/KqrrqpxZpw93HxOnDhR3zduTNHOSy+9JG3atJFbbrlFunbtKv3795etW7fq8eMmc8uWLdKjRw/dVtkxExFVpL5fT2+++WbtyvrDDz8Ya86M11MiIqLGiYE5IqJ6ANkPbdu2lT///FNWrVql6/C4f/9+XY/te/fulaioKM0CQfdS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)
<!-- #endregion -->

<!-- #region id="c0vq9jqtYGRq" -->
## Packaging deep RL agents for cloud deployments
<!-- #endregion -->

```python id="vbasjLj1YTHc"
%%writefile sac_runtime_components.py
import functools
from collections import deque

import numpy as np
import tensorflow as tf
import tensorflow_probability as tfp
from tensorflow.keras.layers import Concatenate, Dense, Input
from tensorflow.keras.models import Model
from tensorflow.keras.optimizers import Adam

tf.keras.backend.set_floatx("float64")


def actor(state_shape, action_shape, units=(512, 256, 64)):
    state_shape_flattened = functools.reduce(lambda x, y: x * y, state_shape)
    state = Input(shape=state_shape_flattened)
    x = Dense(units[0], name="L0", activation="relu")(state)
    for index in range(1, len(units)):
        x = Dense(units[index], name="L{}".format(index), activation="relu")(x)

    actions_mean = Dense(action_shape[0], name="Out_mean")(x)
    actions_std = Dense(action_shape[0], name="Out_std")(x)

    model = Model(inputs=state, outputs=[actions_mean, actions_std])

    return model


def critic(state_shape, action_shape, units=(512, 256, 64)):
    state_shape_flattened = functools.reduce(lambda x, y: x * y, state_shape)
    inputs = [Input(shape=state_shape_flattened), Input(shape=action_shape)]
    concat = Concatenate(axis=-1)(inputs)
    x = Dense(units[0], name="Hidden0", activation="relu")(concat)
    for index in range(1, len(units)):
        x = Dense(units[index], name="Hidden{}".format(index), activation="relu")(x)

    output = Dense(1, name="Out_QVal")(x)
    model = Model(inputs=inputs, outputs=output)

    return model


def update_target_weights(model, target_model, tau=0.005):
    weights = model.get_weights()
    target_weights = target_model.get_weights()
    for i in range(len(target_weights)):  # set tau% of target model to be new weights
        target_weights[i] = weights[i] * tau + target_weights[i] * (1 - tau)
    target_model.set_weights(target_weights)


class SAC(object):
    def __init__(
        self,
        observation_shape,
        action_space,
        lr_actor=3e-5,
        lr_critic=3e-4,
        actor_units=(64, 64),
        critic_units=(64, 64),
        auto_alpha=True,
        alpha=0.2,
        tau=0.005,
        gamma=0.99,
        batch_size=128,
        memory_cap=100000,
    ):
        self.state_shape = observation_shape  # shape of observations
        self.action_shape = action_space.shape  # number of actions
        self.action_bound = (action_space.high - action_space.low) / 2
        self.action_shift = (action_space.high + action_space.low) / 2
        self.memory = deque(maxlen=int(memory_cap))

        # Define and initialize actor network
        self.actor = actor(self.state_shape, self.action_shape, actor_units)
        self.actor_optimizer = Adam(learning_rate=lr_actor)
        self.log_std_min = -20
        self.log_std_max = 2
        print(self.actor.summary())

        # Define and initialize critic networks
        self.critic_1 = critic(self.state_shape, self.action_shape, critic_units)
        self.critic_target_1 = critic(self.state_shape, self.action_shape, critic_units)
        self.critic_optimizer_1 = Adam(learning_rate=lr_critic)
        update_target_weights(self.critic_1, self.critic_target_1, tau=1.0)

        self.critic_2 = critic(self.state_shape, self.action_shape, critic_units)
        self.critic_target_2 = critic(self.state_shape, self.action_shape, critic_units)
        self.critic_optimizer_2 = Adam(learning_rate=lr_critic)
        update_target_weights(self.critic_2, self.critic_target_2, tau=1.0)

        print(self.critic_1.summary())

        # Define and initialize temperature alpha and target entropy
        self.auto_alpha = auto_alpha
        if auto_alpha:
            self.target_entropy = -np.prod(self.action_shape)
            self.log_alpha = tf.Variable(0.0, dtype=tf.float64)
            self.alpha = tf.Variable(0.0, dtype=tf.float64)
            self.alpha.assign(tf.exp(self.log_alpha))
            self.alpha_optimizer = Adam(learning_rate=lr_actor)
        else:
            self.alpha = tf.Variable(alpha, dtype=tf.float64)

        # Set hyperparameters
        self.gamma = gamma  # discount factor
        self.tau = tau  # target model update
        self.batch_size = batch_size

        # Tensorboard
        self.summaries = {}

    def process_actions(self, mean, log_std, test=False, eps=1e-6):
        std = tf.math.exp(log_std)
        raw_actions = mean

        if not test:
            raw_actions += tf.random.normal(shape=mean.shape, dtype=tf.float64) * std

        log_prob_u = tfp.distributions.Normal(loc=mean, scale=std).log_prob(raw_actions)
        actions = tf.math.tanh(raw_actions)

        log_prob = tf.reduce_sum(log_prob_u - tf.math.log(1 - actions ** 2 + eps))

        actions = actions * self.action_bound + self.action_shift

        return actions, log_prob

    def act(self, state, test=False, use_random=False):
        state = state.reshape(-1)  # Flatten state
        state = np.expand_dims(state, axis=0).astype(np.float64)

        if use_random:
            a = tf.random.uniform(
                shape=(1, self.action_shape[0]), minval=-1, maxval=1, dtype=tf.float64
            )
        else:
            means, log_stds = self.actor.predict(state)
            log_stds = tf.clip_by_value(log_stds, self.log_std_min, self.log_std_max)

            a, log_prob = self.process_actions(means, log_stds, test=test)

        q1 = self.critic_1.predict([state, a])[0][0]
        q2 = self.critic_2.predict([state, a])[0][0]
        self.summaries["q_min"] = tf.math.minimum(q1, q2)
        self.summaries["q_mean"] = np.mean([q1, q2])

        return a

    def load_actor(self, a_fn):
        self.actor.load_weights(a_fn)
        print(self.actor.summary())

    def load_critic(self, c_fn):
        self.critic_1.load_weights(c_fn)
        self.critic_target_1.load_weights(c_fn)
        self.critic_2.load_weights(c_fn)
        self.critic_target_2.load_weights(c_fn)
        print(self.critic_1.summary())
```

```python colab={"base_uri": "https://localhost:8080/"} id="T6YFCS2rYG9B" executionInfo={"status": "ok", "timestamp": 1638519872409, "user_tz": -330, "elapsed": 498, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "https://lh3.googleusercontent.com/a/default-user=s64", "userId": "13037694610922482904"}} outputId="7b6bce9d-fe95-4c80-87d1-8cf8d9d058cc"
%%writefile trading_agent.py
import os
import sys
from argparse import ArgumentParser

import gym.spaces
from flask import Flask, request
import numpy as np

from sac_runtime_components import SAC


parser = ArgumentParser(
    prog="TFRL-Packaging-RL-Agents-For-Cloud-Deployments"
)

parser.add_argument("--agent", default="SAC", help="Name of Agent. Default=SAC")
parser.add_argument(
    "--host-ip",
    default="0.0.0.0",
    help="IP Address of the host server where Agent service is run. Default=127.0.0.1",
)
parser.add_argument(
    "--host-port",
    default="5555",
    help="Port on the host server to use for Agent service. Default=5555",
)
parser.add_argument(
    "--trained-models-dir",
    default="/content",
    help="Directory contained trained models. Default=content",
)
parser.add_argument(
    "--config",
    default="runtime_config.json",
    help="Runtime config parameters for the Agent. Default=runtime_config.json",
)
parser.add_argument(
    "--observation-shape",
    default=(6, 31),
    help="Shape of observations. Default=(6, 31)",
)
parser.add_argument(
    "--action-space-low", default=[-1], help="Low value of action space. Default=[-1]"
)
parser.add_argument(
    "--action-space-high", default=[1], help="High value of action space. Default=[1]"
)
parser.add_argument(
    "--action-shape", default=(1,), help="Shape of actions. Default=(1,)"
)
parser.add_argument(
    "--model-version",
    default="final_episode_StockTradingContinuousEnv-v0",
    help="Trained model version",
)
args = parser.parse_args()


if __name__ == "__main__":
    if args.agent != "SAC":
        print(f"Unsupported Agent: {args.agent}. Using SAC Agent")
        args.agent = "SAC"
    # Set Agent's runtime configs
    observation_shape = args.observation_shape
    action_space = gym.spaces.Box(
        np.array(args.action_space_low),
        np.array(args.action_space_high),
        args.action_shape,
    )

    # Create an instance of the Agent
    agent = SAC(observation_shape, action_space)
    # Load trained Agent model/brain
    model_version = args.model_version
    agent.load_actor(
        os.path.join(args.trained_models_dir, f"sac_actor_{model_version}.h5")
    )
    agent.load_critic(
        os.path.join(args.trained_models_dir, f"sac_critic_{model_version}.h5")
    )
    print(f"Loaded {args.agent} agent with trained model version:{model_version}")

    # Setup Agent (http) service
    app = Flask(__name__)

    @app.route("/v1/act", methods=["POST"])
    def get_action():
        data = request.get_json()
        action = agent.act(np.array(data.get("observation")), test=True)
        return {"action": action.numpy().tolist()}

    # Launch/Run the Agent (http) service
    app.run(host=args.host_ip, port=args.host_port, debug=True)
```

```python id="X8VGTqOYZRkG"
!sudo nohup python trading_agent.py > log_trading_agent.txt 2>&1 &
```

```python colab={"base_uri": "https://localhost:8080/"} id="6uy4LrGHZRkG" executionInfo={"status": "ok", "timestamp": 1638520234396, "user_tz": -330, "elapsed": 436, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "https://lh3.googleusercontent.com/a/default-user=s64", "userId": "13037694610922482904"}} outputId="6097a6d5-2864-4d1d-e28d-db4f587174a4"
!head log_trading_agent.txt
```

<!-- #region id="sflc0BYJZWgq" -->
## Simple test for the deployed Trading Bot-as-a-Service
<!-- #endregion -->

```python colab={"base_uri": "https://localhost:8080/"} id="ANaCrnOGauZk" executionInfo={"status": "ok", "timestamp": 1638520309028, "user_tz": -330, "elapsed": 950, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "https://lh3.googleusercontent.com/a/default-user=s64", "userId": "13037694610922482904"}} outputId="a2e88932-0e52-4239-b60c-9ef130567c19"
import os
import sys

import gym
import requests

import tradegym  # Register tradegym envs with OpenAI Gym registry

host_ip = "127.0.0.1"
host_port = 5555
endpoint = "v1/act"
env = gym.make("StockTradingContinuousEnv-v0")

post_data = {"observation": env.observation_space.sample().tolist()}
res = requests.post(f"http://{host_ip}:{host_port}/{endpoint}", json=post_data)
if res.ok:
    print(f"Received Agent action:{res.json()}")
```

<!-- #region id="ZZZGrJ1lbsox" -->
---
<!-- #endregion -->

```python colab={"base_uri": "https://localhost:8080/"} id="7vSyzqg4bsoy" executionInfo={"status": "ok", "timestamp": 1638520570638, "user_tz": -330, "elapsed": 7178, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "https://lh3.googleusercontent.com/a/default-user=s64", "userId": "13037694610922482904"}} outputId="bc9bfb31-31ee-488a-8f26-441e61f2f903"
!apt-get -qq install tree
!rm -r sample_data
```

```python colab={"base_uri": "https://localhost:8080/"} id="h_e9ZLORbsoy" executionInfo={"status": "ok", "timestamp": 1638520570639, "user_tz": -330, "elapsed": 22, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "https://lh3.googleusercontent.com/a/default-user=s64", "userId": "13037694610922482904"}} outputId="f5358163-3101-41fb-972a-60d145ca9fb4"
!tree -h --du .
```

```python colab={"base_uri": "https://localhost:8080/"} id="z777BEW9bsoz" executionInfo={"status": "ok", "timestamp": 1638520664655, "user_tz": -330, "elapsed": 6813, "user": {"displayName": "Sparsh Agarwal", "photoUrl": "https://lh3.googleusercontent.com/a/default-user=s64", "userId": "13037694610922482904"}} outputId="835c2920-60e8-4d3e-f4fa-1a72851c7d58"
!pip install -q watermark
%reload_ext watermark
%watermark -a "Sparsh A." -m -iv -u -t -d -p numpy,tensorflow,flask
```

<!-- #region id="cXAMfLf9bsoz" -->
---
<!-- #endregion -->

<!-- #region id="qYeBkCjDbso0" -->
**END**
<!-- #endregion -->
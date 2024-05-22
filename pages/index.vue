<template>
  <div class="item">
    <h2>Получение списка всех постов</h2>
    <NuxtLink to="/posts/test">Test</NuxtLink>
    <div class="page-top">
      <template v-if="!isUserSelected">
        <el-button
          v-if="$store.state.curPage < 5"
          class="button"
          type="primary"
          @click="$store.dispatch('changeNextPageVuex')"
        >
        Следующая страница
        </el-button>
        <el-button
          v-if="$store.state.curPage > 1"
          class="button"
          type="primary"
          @click="$store.dispatch('changePrevPageVuex')"
        >
          Предыдущая страница
        </el-button>
      </template>

      <el-select
        class="select"
        placeholder="Select"
        v-model="$store.state.options.id"
        size="large"
        :clearable="true"
        @change="handleFilter"
      >
        <el-option
          v-for="item in $store.state.options"
          :key="item.value"
          :label="item.username"
          :value="item.id"
        />
      </el-select>
    </div>
      <div class="wrapper" v-if="$store.state.isLoading === true">
        <el-skeleton class="post" v-for="el in POSTS_PER_PAGE" :key="el"/>
      </div>
      <div class="wrapper">
      <NuxtLink
        class="post"
        v-for="post in $store.state.curPots"
        :key="post.id"
        :to="`/posts/${post.id}`"
      >
        <div><strong>{{ post.title }}</strong></div>
        <div>{{ post.body }}</div>
        <div class="positionId">user: {{ post.userId }}</div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { API_BASE_URL, POSTS_PER_PAGE } from '/helpers/constants.js';
const store = useStore();
store.dispatch('fetchPosts');
store.dispatch('fetchUsers');

//store.commit('post');




/*const changePage = async (page) => {
  try {
    isLoading.value = true;
    const response = await $fetch(`${API_BASE_URL}posts`, {
      params: {
        _page: page,
        _limit: POSTS_PER_PAGE,
      }
    });
    posts.value = response
    $store.state.curPage = page;
  } catch {
  } finally {
    isLoading.value = false;
  }
}
changePage(1);*/








/*const filterUsers = async (userId) => {
  try {
    isLoading.value = true
    const response = await $fetch(`${API_BASE_URL}posts?userId=${userId}`);
    posts.value = response
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
}*/
</script>

<style scoped>
.item {
  position: relative;
  width: 1000px;
  margin: 0 auto;
}
.page-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.button {
  height: 40px;
}
.select {
  width: 240px;
  margin-left: auto;
}

.wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
}
.post {
  position: relative;
  box-sizing: border-box;
  width: 490px;
  height: 186px;
  border: 2px solid #AAAAAA;
  padding: 17px;
  color: black;
}
.post:hover {
  color: black;
  border: 2px solid black;
  box-shadow: 0px 2px 8px 0px #63636333;
}
.positionId {
  position: absolute;
  bottom: 17px;
  right: 20px;
}

</style>

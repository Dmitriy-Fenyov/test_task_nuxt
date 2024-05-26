<template>
  <div class="post">
    <h2 class="post__title"> Детальная страница поста № {{ route.params.id }}</h2>
    <el-skeleton v-if="$store.state.isLoading === true" />
    <template v-else>
      <div class="post__postTitle"><strong>{{ $store.state.post.title }}</strong></div>
      <div class="post__postBody">{{ $store.state.post.body }}</div>
      <div class="flexWrapper">
        <div>user id: {{ $store.state.post.userId }}</div>
        <div>post id: {{ $store.state.post.id }}</div>
      </div>  
      <NuxtLink class="post__link" to='/'> Вернуться назад</NuxtLink>

      <el-button type="primary" @click="$store.dispatch('toggleEdit')">
        Редактировать
      </el-button>
      <div v-if="$store.state.isEditMode" class="post__form">
        <el-input v-model="$store.state.postEdited.title"/>
        <el-input v-model="$store.state.postEdited.body"/>
        <el-button class="post__button" type="success" @click="$store.dispatch('updatePost', postNum)">
          Сохранить изменения
        </el-button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();

const route = useRoute()
const postNum = route.params.id

store.dispatch('fetchPost', postNum);

</script>

<style scoped>
.post {
  width: 1000px;
  margin: 0 auto;
}
.post__title {
  font-size: 32px;
  font-weight: 700;
  line-height: 36px;
}
.post__postTitle{
  font-size: 21px;
  font-weight: 700;
  line-height: 26px;
}
.post__postBody{
  margin-top: 15px;
  font-size: 20px;
  font-weight: 400;
  line-height: 24px;
}
.flexWrapper {
  display: flex;
  justify-content: space-between;
  margin-right: 15px;
  margin-top: 15px;
  font-family: Arial;
  font-size: 16px;
  line-height: 18px;
}
.post__link {
  display: block;
  margin-bottom: 20px;
  margin-top: 20px;
  text-decoration: none;
}
.post__form {
  margin-top: 20px;
}
.post__button {
  margin-top: 20px;
}
</style>

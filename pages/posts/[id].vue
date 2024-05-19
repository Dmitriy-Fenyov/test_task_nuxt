<template>
  <div class="post">
    <h2 class="post__title"> Детальная страница поста № {{ route.params.id }}</h2>
    <el-skeleton v-if="isLoading === true" />

    <div class="post__postTitle"><strong>{{ post.title }}</strong></div>
    <div class="post__postBody">{{ post.body }}</div>
    <div class="flexWrapper">
      <div>user id: {{ post.userId }}</div>
      <div>post id: {{ post.id }}</div>
    </div>  
    <NuxtLink class="post__link" to='/'> Вернуться назад</NuxtLink>

    <el-button type="primary" @click="toggleEdit">
      Редактировать
    </el-button>
    <div v-if="isEditMode" class="post__form">
      <el-input v-model="postEdited.title"/>
      <el-input v-model="postEdited.body"/>
      <el-button class="post__button" type="success" @click="updatePost">
        Сохранить изменения
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { API_BASE_URL } from '/helpers/constants.js';

const route = useRoute()
const isLoading= ref(false);
const post = ref({
  id: null,
  title: '',
  body: '',
});
const fetchPosts = async () => {
  try {
    isLoading.value = true
    const response = await $fetch(`${API_BASE_URL}posts/` + route.params.id)
    post.value = response
    console.log(post.value)
  } catch (e) {
    alert('Erorr')
  } finally {
    isLoading.value= false
  }
}
fetchPosts();

const router = useRouter();
const isEditMode = ref(false);
const postEdited = ref({});
const toggleEdit = () => {
  isEditMode.value = !isEditMode.value;
  if (isEditMode.value) {
    postEdited.value = { ...post.value }
  }
}
const updatePost = async () => {
  try {
    await $fetch(`${API_BASE_URL}posts/${post.value.id}`, {
      method: 'PATCH',
      body: {
        title: postEdited.value.title,
        body: postEdited.value.body,
      }
    })
    navigateTo('/');
  } catch (error) {}
}
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

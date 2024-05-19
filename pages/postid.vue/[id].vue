<template>
    <div class="postId_wrapper">
      <h2 class="postId_title"> Детальная страница поста № {{ route.params.id }}</h2>
      <el-skeleton v-if="loading===false" />
      <div class="postId_postTitle"><strong>{{ post.title }}</strong></div> 
      <div class="postId-postBody">{{ post.body }}</div>
      <div class="positionId">post id:{{ post.id }}</div>
    </div>
  </template>
  
<script setup>
const route = useRoute()

const loading= ref(false);
const post = ref([]);
const fetchPosts = async () => {
  try {
    loading.value= false
    const response = await $fetch(`https://jsonplaceholder.typicode.com/posts/` + route.params.id  )
    post.value = response
    loading.value= true
    console.log(post.value)
    
  } catch (e) {
    alert('Erorr')
  } 
}

fetchPosts()

  </script>
  
  <style scoped>
  
  .postId_wrapper {
    width: 1000px;
    margin: 0 auto;
  }
  .postId_title {
    font-size: 32px;
    font-weight: 700;
    line-height: 36px;
  }
  .postId_postTitle{
    font-size: 21px;
    font-weight: 700;
    line-height: 26px;
  }
  .postId_postBody{
    margin-top: 15px;
    font-size: 20px;
    font-weight: 400;
    line-height: 24px;
  }
  .positionId {
    text-align: end;
    margin-right: 15px;
    margin-top: 15px;
    font-family: Arial;
    font-size: 16px;
    line-height: 18px;
  
  }
  </style>
  
  
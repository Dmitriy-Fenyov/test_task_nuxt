<template>
    <div class="postId-wrapper">
      <h2 class="postId-title"> Детальная страница поста № {{ $route.params.id }}</h2>
      <el-skeleton v-if="load===false" />
      <div class="postId-postTitle"><strong>{{ post.title }}</strong></div> 
      <div class="postId-postBody">{{ post.body }}</div>
      <div class="positionId">post id:{{ post.id }}</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        post: [],
        load: false
      }
    },
    methods: {
      async fetchPosts() {
        try {
          this.load= false
          const response = await $fetch(`https://jsonplaceholder.typicode.com/posts/` +  this.$route.params.id  )
          this.post = response.data
          this.load= true
          
        } catch (e) {
          alert('Erorr')
        } 
      }
    },
    mounted() {
      this.fetchPosts()
    }
  }
  </script>
  
  <style scoped>
  
  .postId-wrapper {
    width: 1000px;
    margin: 0 auto;
  }
  .postId-title {
    font-size: 32px;
    font-weight: 700;
    line-height: 36px;
  }
  .postId-postTitle{
    font-size: 21px;
    font-weight: 700;
    line-height: 26px;
  }
  .postId-postBody{
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
  
  
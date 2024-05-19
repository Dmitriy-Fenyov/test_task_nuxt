<template>
    <div class="item">
        <h2>Получение списка всех постов</h2>
        <el-button 
        v-if="page<5"
        class="button" 
        type="primary" 
        @click="nextPage(page,limit)"
      >
      Следующая страница
      </el-button>
        <el-button 
        v-if="page>1"
        class="button" 
        type="primary"
        @click="prevPage(page,limit)"
      >
        Предыдущая страница
      </el-button>

        <div class="wrapper" v-if="loading===false"> 
            <el-skeleton class="post" v-for="lim in limit" />
        </div>
        <div class="wrapper">
        <NuxtLink 
            to="`/postid/${post.id}`"
            class="post" 
            v-for="post in posts" 
            :key="post.id"
            :posts="posts"
        >
          <div><strong>{{ post.title }}</strong></div> 
          <div>{{ post.body }}</div>
          <div class="positionId">user: {{ post.userId }}</div>
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup>

      const posts = ref([]);
      const page= ref(1);
      const limit= ref(20);
      const loading= ref(false);
      const fetchPosts = async () => {
        try {
          loading.value= false
          const response = await $fetch('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: page.value,
              _limit: limit.value
            }
          } )
          posts.value = response
          loading.value= true
          
        } catch (e) {
          alert('Erorr')
        } 
      };
      const nextPage = async () => {
        try {
          loading.value= false
          page.value +=1
          const response = await $fetch('https://jsonplaceholder.typicode.com/posts',
          { params: {
            _page: page.value,
            _limit: limit.value
        }
          })
          posts.value = response
          loading.value= true
          } 
          catch (e) {
              alert('ошибка')
          } 
      }
          const prevPage = async () => {
            try {
                      page.value -=1
                      const response = await $fetch('https://jsonplaceholder.typicode.com/posts',
                          { params: {
                            _page: page.value,
                            _limit: limit.value
                          }
                  })
                  posts.value = response
                  } 
                  catch (e) {
                      alert('ошибка')
                  } 
              }
          fetchPosts();
  </script>
  
  <style >
  
.item {
width: 1000px;
margin: 0 auto;
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
.button {
  display: inline-block;
  margin: 20px auto;
  width: 171px;
  height: 40px;
}
  </style>
  
  
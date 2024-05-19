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

    <el-select v-model="options.id" placeholder="Select" size="large" style="width: 240px" class="select">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.username"
        :value="item.id"
      />
    </el-select>
      <div class="wrapper" v-if="loading===false"> 
        <el-skeleton class="post" v-for="lim in limit" />
      </div>
      <div class="wrapper">
      <NuxtLink 
      :to="'/postid/' + post.id"
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
const options = ref([]);

const fetchUsers = async () => {
  try {
    const response = await $fetch('https://jsonplaceholder.typicode.com/users')
    options.value = response.map(({ username, id }) => ({ username, id }));  
  } catch (e) {
    alert('Erorr')
  } 
};

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

const filteredposts = () => {
  return posts.filter(post => options.includes(post.id))};


fetchPosts();
fetchUsers();

</script>

<style >

.item {
  position: relative;
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
.select {
  position: absolute;
  right: 0;
  margin-top: 20px;
}
</style>

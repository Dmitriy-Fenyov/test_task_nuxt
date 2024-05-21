<template>
    <div style="margin: 50px 20px;">
        <button @click="$store.dispatch('changeNextPageVuex')">changeNextPageVuex</button>
        <button @click="$store.dispatch('changePrevPageVuex')">changePrevPageVuex</button>
        <div
            class="post"
            v-for="post in $store.state.posts"
            :key="post.id"
            :to="`/posts/${post.id}`"
        >
            <div><strong>{{ post.title }}</strong></div>
            <div>{{ post.body }}</div>
            <div class="positionId">user: {{ post.userId }}</div>
        </div>
    </div>
</template>

<script>

</script>
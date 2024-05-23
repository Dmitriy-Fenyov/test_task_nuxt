import { createStore } from "vuex";
import { API_BASE_URL, POSTS_PER_PAGE } from '/helpers/constants.js';


const store = createStore({
    state() {
        return {
        posts: [],
        options: [],
        curPosts: [],
        curPage: 1,
        limit: 20,
        isLoading: false,
        isUserSelected:false,
        };
    },
    mutations: {
        post(state) {
            state.curPosts = state.posts.slice(0, state.limit);
        },
    },
    actions: {
        async fetchPosts({ state }) {
            state.isLoading = true;
            try {
            const response = await $fetch(`${API_BASE_URL}posts`);
            state.posts = response;
            store.commit('post');
            } catch {
                console.log('fetchPosts error')
            }  finally {
                state.isLoading = false;
            }
        },
        async fetchUsers({ state}) {
            try {
                const response = await $fetch(`${API_BASE_URL}users`)
                state.options = response.map(({ username, id }) => ({ username, id }));
            } catch (e) {
                alert('Erorr')
            }
        },
        filterUsers({ state},userId) {
            state.isLoading = true
            state.curPosts = state.posts.filter(post => post.userId === userId)
            state.curPage = 1;
            state.isLoading = false;
        },
        changeNextPageVuex({ state }) {
            const curlim = state.curPage * state.limit
            state.curPage++
            state.isLoading = true;
            state.curPosts = state.posts.slice(curlim, state.curPage*state.limit);
            state.isLoading = false;
        },
        changePrevPageVuex({ state }) {
            state.curPage--
            const curlim = state.curPage * state.limit-state.limit
            state.isLoading = true;
            state.curPosts = state.posts.slice(curlim, state.curPage*state.limit );
            state.isLoading = false;
        },
    }
});


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
  // Install the store instance as a plugin
});
import { createStore } from "vuex";
import { API_BASE_URL, POSTS_PER_PAGE } from '/helpers/constants.js';


const store = createStore({
    state() {
        return {
        posts: [],
        options: [],
        curPage: 1,
        isLoading: false,
        post:{
            id: null,
            title: '',
            body: '',
        },
        isEditMode: false,
        postEdited: {},
        };
    },
    mutation: {
        changePage (state, response) {
            state.posts = response;
        }
    },
    actions: {
        async changePage({ state,commit }, page) {
            state.isLoading = true;
            try {
                const response = await $fetch(`${API_BASE_URL}posts`, {
                    params: {
                        _page: page,
                        _limit: POSTS_PER_PAGE,
                    }
                });
                state.posts = response;
                state.curPage = page;
            } catch {
                console.log('changePage error')
            }  finally {
                state.isLoading = false;
            }
        },
        async fetchUsers({state}) {
            try {
                const response = await $fetch(`${API_BASE_URL}users`)
                state.options = response.map(({ username, id }) => ({ username, id }));
            } catch (e) {
                alert('Erorr')
            }
        },
        async filterUsers({ state}, userId) {
            try {
                state.isLoading = true;
                const response = await $fetch(`${API_BASE_URL}posts?userId=${userId}`);
                state.posts = response
                state.curPage = 1;
            } catch (error) {
                console.log('filterUsers error')
            } finally {
                state.isLoading = false;
            }
        },
        async fetchPost({ state}, postNum) {
            try {
                state.isLoading = true;
                const response = await $fetch(`${API_BASE_URL}posts/` + postNum)
                state.post = response
                state.curPage = 1;
            } catch (error) {
                console.log('fetchPost error')
            } finally {
                state.isLoading = false;
            }
        },
    }
});


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
  // Install the store instance as a plugin
});
import { createStore } from "vuex";
import { API_BASE_URL, POSTS_PER_PAGE } from '/helpers/constants.js';


const store = createStore({
    state() {
        return {
        count: 0,
        posts: [],
        options: [],
        curPage: 1,
        isLoading: false,
        isUserSelected:false,
        };
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        async changePage(state) {
            try {
                this.isLoading = true;
            const response = await $fetch(`${API_BASE_URL}posts`, {
                params: {
                _page: page,
                _limit: POSTS_PER_PAGE,
                }
            });
            this.posts = response.data
            this.curPage = page;
            } catch {
            } finally {
                this.isLoading= false;
            }
        },
        async filterUsers(state, {userId}) {
            try {
                state.isLoading= true
                const response = await $fetch(`${API_BASE_URL}posts?userId=${userId}`);
                state.posts = response
                state.curPage = 1;
            } catch (error) {
            } finally {
                state.isLoading = false;
            }
        },
        async fetchUsers(state) {
            try {
                const response = await $fetch(`${API_BASE_URL}users`)
                state.options = response.map(({ username, id }) => ({ username, id }));
            } catch (e) {
                alert('Erorr')
            }
        },
    },
    actions: {
        handleFilter(state, {userId}) {
            if (userId) {
                state.isUserSelected = true;
                filterUsers(userId);
                return
            }
            state.isUserSelected = false;
            changePage(1);
        }
    }
});


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
  // Install the store instance as a plugin
});
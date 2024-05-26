import { createStore } from "vuex";
import { API_BASE_URL, POSTS_PER_PAGE } from '/helpers/constants.js';


const store = createStore({
    state() {
        return {
        posts: [],
        options: [],
        curPage: 1,
        isLoading: false,
        isUserSelected: false,
        post:{
            id: null,
            title: '',
            body: '',
        },
        isEditMode: false,
        postEdited: {},
        };
    },
    mutations: {
        changePage (state, response) {
            state.posts = response;
        },
        toggleIsLoading(state) {
            state.isLoading =!state.isLoading;
        },
        toggleIsUserSelected(state) {
            state.isUserSelected =!state.isUserSelected
        },
        curPage(state, page){
            state.curPage = page;
        },
        changePost (state, response) {
            state.post = response;
        },
        changeOptions (state, response) {
            state.options = response.map(({ username, id }) => ({ username, id }));
        },
        toggleEdit (state) {
            state.isEditMode = !state.isEditMode;
        },
        postEdited (state) {
            state.postEdited = { ...state.post }
        },
    },
    actions: {
        async changePage({ commit }, page) {
            commit('toggleIsLoading')
            try {
                const response = await $fetch(`${API_BASE_URL}posts`, {
                    params: {
                        _page: page,
                        _limit: POSTS_PER_PAGE,
                    }
                });
                commit('changePage',response)
                commit('curPage', page)
            } catch {
                console.log('changePage error')
            }  finally {
                commit('toggleIsLoading')
            }
        },
        async fetchUsers({commit}) {
            try {
                const response = await $fetch(`${API_BASE_URL}users`)
                commit('changeOptions',response)
            } catch (e) {
                alert('Erorr')
            }
        },
        async filterUsers({ commit }, userId) {
            try {
                commit('toggleIsLoading')
                const response = await $fetch(`${API_BASE_URL}posts?userId=${userId}`);
                commit('changePage',response)
                commit('curPage', 1)
            } catch (error) {
                console.log('filterUsers error')
            } finally {
                commit('toggleIsLoading')
            }
        },
        async fetchPost({ state, commit }, postNum) {
            try {
                if(state.isEditMode) {
                    commit('toggleEdit')
                }
                commit('toggleIsLoading')
                const response = await $fetch(`${API_BASE_URL}posts/` + postNum)
                commit('changePost',response)
                commit('curPage', 1)
            } catch (error) {
                console.log('fetchPost error')
            } finally {
                commit('toggleIsLoading')
                commit('postEdited')
                if(state.isUserSelected) {
                    commit('toggleIsUserSelected')
                }
            }
        },
        async updatePost({ state, commit }, postNum) {
            try {
                await $fetch(`${API_BASE_URL}posts/${postNum}`, {
                    method: 'PATCH',
                    body: {
                        title: state.postEdited.title,
                        body: state.postEdited.body,
                    }
                })
                commit('postEdited')
                navigateTo('/');
                commit('toggleEdit')
                } catch (error) {
                    console.log('updatePost error')
                }
        },
        handleFilter({ state,commit, dispatch }, userId) {
            if (userId) {
                if(!state.isUserSelected) {
                    commit('toggleIsUserSelected')
                }
                dispatch('filterUsers', userId);
                return
            }
            commit('toggleIsUserSelected')
            dispatch('changePage', 1);
        },
        toggleEdit({ commit }) {
            commit('toggleEdit')
        },
    }
});


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
  // Install the store instance as a plugin
});
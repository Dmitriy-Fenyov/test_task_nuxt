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
        // перезаписывает посты для главной страницы 
        changePage (state, response) {
            state.posts = response;
        },
        // переключает значение isLoading, для отображения el-skeleton
        toggleIsLoading(state) {
            state.isLoading =!state.isLoading;
        },
        // переключает значение IsUserSelected, для отображения кнопок переключения страниц
        toggleIsUserSelected(state) {
            state.isUserSelected =!state.isUserSelected
        },
        // перезаписывает номер страницы с постами
        curPage(state, page){
            state.curPage = page;
        },
        // перезаписывает данные поста на странице [id].vue
        changePost (state, response) {
            state.post = response;
        },
        // перезаписывает данные пользователей для вывода в el-select
        changeOptions (state, response) {
            state.options = response.map(({ username, id }) => ({ username, id }));
        },
        // переключает значение isEditMode, 
        // для отображения полей при изменении данных поста на странице [id].vue
        toggleEdit (state) {
            state.isEditMode = !state.isEditMode;
        },
        // записывает данные поста для вывода в el-input, дальнейшего редактирования и отправки запроса на изменени на сервер
        postEdited (state) {
            state.postEdited = { ...state.post }
        },
    },
    actions: {

        // Загружает с сервера посты для страницы
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

        // Загружает с сервера username и id пользователей 
        async fetchUsers({commit}) {
            try {
                const response = await $fetch(`${API_BASE_URL}users`)
                commit('changeOptions',response)
            } catch (e) {
                alert('Erorr')
            }
        },

        // Загружает все посты выбранного пользователя
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

        // Загружает данные выбранного поста для страницы [id].vue
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

        // Отправляет запрос на изменение title и body выбранного поста на странице [id].vue
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
        // данная ручка нужна для скрытия/показа кнопок переключения страниц, загрузки постов выбранного пользователя
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
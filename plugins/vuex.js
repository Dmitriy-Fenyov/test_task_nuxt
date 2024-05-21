import { createStore } from "vuex";
import { API_BASE_URL, POSTS_PER_PAGE } from '/helpers/constants.js';


const store = createStore({
    state() {
        return {
        posts: [  {
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
          },
          {
            "userId": 1,
            "id": 2,
            "title": "qui est esse",
            "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
          },
          {
            "userId": 1,
            "id": 3,
            "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
            "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
          },
          {
            "userId": 1,
            "id": 4,
            "title": "eum et est occaecati",
            "body": "ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
          },
          {
            "userId": 1,
            "id": 5,
            "title": "nesciunt quas odio",
            "body": "repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque"
          },],
        options: [],
        curPage: 1,
        isLoading: false,
        isUserSelected:false,
        };
    },
    mutations: {
        fetchposts(state,response) {
            console.log(state.curPage)
            state.posts = response;
        },
    },
    actions: {
        async changeNextPageVuex({ state, context }) {
            state.isLoading = true;
            state.curPage++
            try {
            const response = await $fetch(`${API_BASE_URL}posts`, {
                params: {
                _page: state.curPage,
                _limit: POSTS_PER_PAGE,
                }
            });
            console.log('changePageVuex log 2',state.posts, response )
            state.posts = response;
            console.log('changePageVuex log 3- выполнено', state.posts, state.curPage)
            } catch {
                console.log('changePageVuex error')
            }  finally {
                state.isLoading = false;
            }
        },
        async changePrevPageVuex({ state, context }) {
            state.isLoading = true
            state.curPage--
            console.log('changePageVuex log 1')
            try {
            const response = await $fetch(`${API_BASE_URL}posts`, {
                params: {
                _page: state.curPage,
                _limit: POSTS_PER_PAGE,
                }
            });
            state.posts = response;
            } catch {
                console.log('changePageVuex error')
            }  finally {
                state.isLoading = false;
            }
        },
    }
});


export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(store);
  // Install the store instance as a plugin
});
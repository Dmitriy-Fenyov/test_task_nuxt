import { createStore } from 'vuex'
const state = {
    posts: ref([]),
    page: ref(1),
    limit: ref(20),
    loading: ref(false),
}

const mutations = {
    async fetchPosts(state) {
        try {
            state.loading= false
        const response = await $fetch('https://jsonplaceholder.typicode.com/posts', {
            params: {
            _page: state.page,
            _limit: state.limit
            }
        } )
        state.posts = response
        state.loading = true
        } catch (e) {
        alert('Erorr')
        } 
    },
    async nextPage(state) {
        try {
            state.loading= false
            state.page +=1
                const response = await $fetch('https://jsonplaceholder.typicode.com/posts',
                    { params: {
                        _page: state.page,
                        _limit: state.limit
                    }
            })
            state.posts = response
            state.loading = true
            } 
            catch (e) {
                alert('ошибка')
            } 
        },
        async prevPage(state) {
            try {
                state.loading= false
                state.page -=1
                    const response = await $fetch('https://jsonplaceholder.typicode.com/posts',
                        { params: {
                            _page: state.page,
                            _limit: state.limit
                        }
                })
                state.posts = response
                state.loading = true
                } 
                catch (e) {
                    alert('ошибка')
                } 
            }
}

export default createStore({
state,
mutations
})
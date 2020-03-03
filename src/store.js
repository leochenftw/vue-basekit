import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state       :   {
        error       :   false,
        site_data   :   null,
        is_loading  :   true,
        is_mobile   :   false,
        width       :   window.innerWidth,
        offset      :   0
    },
    mutations   :   {
        clear_error(state)
        {
            state.error     =   false;
        },
        set_error(state, data)
        {
            state.error     =   data;
        },
        update_data(state, data)
        {
            state.site_data     =   data;
            if (!data) {
                state.is_loading    =   true;
            } else {
                setTimeout(function () {
                    state.is_loading    =   false;
                }, 100);
            }

        },
        toggle_loading(state, loading)
        {
            state.is_loading    =   loading;
        }
    },
    actions     :   {
        get_page_data({ commit }, path)
        {
            commit('update_data', null);
            return new Promise((resolve, reject) => {
                axios.get(base_url + path.ltrim('/')).then((resp) => {
                    commit('update_data', resp.data);
                    resolve();
                }).catch((error) => {
                    // if (error && error.response && error.response.status) {
                    //     me.$router.push('/' + error.response.status);
                    // }
                });
            });
        }
    }
});
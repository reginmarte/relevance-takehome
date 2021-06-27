import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: () => ({
      // options
      collections: [],
      textFields: [],
      vectorFields: [],
      // user input
      selectedCollection: "",
      selectedTextFields: [],
      selectedVectorFields: [],
      query: "",
      // result
      results: []
    }),
    mutations: {
      setState(state, {key, value}) {
        state[key] = value;
        console.log(state[key])
      },

    },
    actions: {
      getCollections() {
      }
    },
    watch: {
      selectedCollection: () => {
      }
    }
  });
};

export default createStore;

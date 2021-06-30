import Vuex from 'vuex'
import axios from 'axios'

const store = () => {
  return new Vuex.Store({
    state: () => ({
      // user options
      collections: [],
      fields: [],
      // user input
      selectedCollection: "",
      selectedFields: [],
      weight: 0.0625,    // translates to 50%
      query: "",
      // result
      results: [],
      // other
      status: {
        loadingFields: false,
        loadingResults: false,
        showWelcome: true,
        showNoResults: false,
      }
    }),
    mutations: {
      // todo: fix - separate into own mutations?
      setState(state, {key, value}) {
        state[key] = value;
      },
      clearFilters(state) {
        state.fields = [];
        state.selectedFields = [];
        state.results = [];
      },
      clearResults(state) {
        state.results = [];
      },
      setStatus(state, {key, status}) {
        state.status[key] = status;
      }
    },
    actions: {
      setCollection({commit, dispatch}, collection) {
        // Get collection schema
        commit('setStatus', {key: 'loadingFields', status: true});
        axios.get(
          "https://vectorai-production-api.azurewebsites.net/project/collection_schema",
          {
            params: {
              username: "dummy-collections",
              api_key: "UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw",
              collection_name: collection
            }
          }
        ).then(({data}) => {
          // Set field options
          dispatch('setFields', data)
        });
      },
      setFields({commit}, fields) {
        let fieldOptions = [];
        for (const [key, value] of Object.entries(fields)) {
          // Cleaning attempt
          let display = key.replace(/[-_]/g, ' ').trim();
          display = display.replace(/\./g, ' - ');
          display = display[0].toUpperCase() + display.slice(1);
          // Extract text, vector fields
          if (value === 'text') {
            fieldOptions.push({
              type: 'text',
              value: key,
              display
            })
          } else if (typeof value === 'object') {
            if (value['vector'] && value['vector'] === 512) {
              fieldOptions.push({
                type: 'vector',
                value: key,
                display
              })
            }
          }
        }
        commit('setState', {key: 'fields', value: fieldOptions});
        commit('setStatus', {key: 'loadingFields', status: false});
      },
      sendSearchRequest({state, commit, dispatch}, {vector, textFields, vectorFields}) {
        const {query, selectedCollection, weight} = state;
        axios.post(
          "https://vectorai-production-api.azurewebsites.net/collection/advanced_hybrid_search", {
            username: "dummy-collections",
            api_key: "UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw",
            collection_name: selectedCollection,
            min_score: 0.1,
            text: query,
            text_fields: textFields,
            multivector_query: {
              query: {
                vector: vector,
                fields: vectorFields
              }
            },
            traditional_weight: weight
          }).then(({data}) => {
          // Set results and results display
          let results = data && data['results'];
          if (results && results.length > 0) {
            dispatch('createResultDisplay', results);
          } else {
            commit('setStatus', {key: 'loadingResults', status: false});
            commit('setStatus', {key: 'showNoResults', status: true})
          }
        });
      },
      async createResultDisplay({state, commit, dispatch}, results) {
        const {selectedFields} = state;
        let resultDisplay = [];

        let textSelected = await dispatch('checkTextFieldSelected');
        if (textSelected) {
          // Selected fields includes text fields
          results.map((result) => {
            let entry = {};
            selectedFields.forEach(({type, value}) => {
              // Extract the values of the selected fields from the result
              if (type === 'text') {
                if (value in result) {
                  if (value.includes('.')) {
                    // If selected field is from a dict, split into 2 keys to extract value
                    let keys = value.split('.');
                    entry[value] = result[keys[0]] && result[keys[0]][keys[1]];
                  } else {
                    entry[value] = result[value];
                  }
                }
              }
            });
            resultDisplay.push(entry)
          });
          commit('setState', {key: 'results', value: resultDisplay});
        } else {
          commit('setStatus', {key: 'showNoResults', status: true});
        }
        commit('setStatus', {key: 'loadingResults', status: false});
      },
      checkTextFieldSelected({state}) {
        const {selectedFields} = state;
        return selectedFields.some(({type}) => type === "text")
      }
    }
  });
};

export default store;

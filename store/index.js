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
        commit('setStatus', {key: 'loadingFields', status: true})
        // axios.get(
        //   "https://vectorai-production-api.azurewebsites.net/project/collection_schema",
        //   {
        //     params: {
        //       username: "dummy-collections",
        //       api_key: "UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw",
        //       collection_name: collection
        //     }
        //   }
        // ).then(({data}) => {
        //   // Set field options
        //   dispatch('setFields', data)
        // });

        let data = {
          "advertiser": "text",
          "all_images_vector_": {vector: 2048},
          "vector": 2048,
          "hasFloorplan": "bool",
          "headline": "text",
          "id": "numeric",
          "image_text_vector_": {vector: 512},
          "vector": 512,
          "image_url": "text",
          "image_url_2": "text",
          "image_url_2_vector_": {vector: 2048},
          "vector": 2048,
          "image_url_4": "text",
          "image_url_4_vector_": {vector: 2048},
          "vector": 2048,
          "image_url_5": "text",
          "image_url_5_vector_": {vector: 2048},
          "vector": 2048,
          "image_url_vector_": {vector: 2048},
          "vector": 2048,
          "insert_date_": "date",
          "labels": "text",
          "listingSlug": "text",
          "listingType": "text",
          "priceDetails": "dict",
          "priceDetails.displayPrice": "text",
          "priceDetails.price": "numeric",
          "priceDetails.priceFrom": "numeric",
          "priceDetails.priceTo": "numeric",
          "propertyDetails": "dict",
          "propertyDetails.allPropertyTypes": "text",
          "propertyDetails.area": "text",
          "propertyDetails.bathrooms": "numeric",
          "propertyDetails.bedrooms": "numeric",
          "propertyDetails.buildingArea": "numeric",
          "propertyDetails.carspaces": "numeric",
          "propertyDetails.displayableAddress": "text",
          "propertyDetails.features": "text",
          "propertyDetails.landArea": "numeric",
          "propertyDetails.latitude": "numeric",
          "propertyDetails.longitude": "numeric",
          "propertyDetails.postcode": "text",
          "propertyDetails.propertyType": "text",
          "propertyDetails.region": "text",
          "propertyDetails.state": "text",
          "propertyDetails.street": "text",
          "propertyDetails.streetNumber": "text",
          "propertyDetails.suburb": "text",
          "propertyDetails.unitNumber": "text",
          "summaryDescription": "text"
        };
        dispatch('setFields', data)

      },
      setFields({commit}, fields) {
        let fieldOptions = [];
        // Extract text, vector fields
        for (const [key, value] of Object.entries(fields)) {
          // Cleaning attempt
          let display = key.replace(/[-_]/g, ' ').trim();
          display = display[0].toUpperCase() + display.slice(1);

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
      sendSearchRequest({state, commit}, {vector, textFields, vectorFields}) {
        const {query, selectedCollection, weight} = state;
        // axios.post(
        //   "https://vectorai-production-api.azurewebsites.net/collection/advanced_hybrid_search", {
        //     username: "dummy-collections",
        //     api_key: "UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw",
        //     collection_name: selectedCollection,
        //     min_score: 0.1,
        //     text: query,
        //     text_fields: textFields,
        //     multivector_query: {
        //       query: {
        //         vector: vector,
        //         fields: vectorFields
        //       }
        //     },
        //     traditional_weight: weight
        //   }).then(({data}) => {
        //   commit('setState', {key: 'results', value: data && data['results'] ? data['results'] : []});
        // });

        let data = [];
        commit('setState', {
          key: 'results', value: data
        });
        if (data && !data['results']) {
          commit('setStatus', {key: 'showNoResults', status: true})
        }

        commit('setStatus', {key: 'loadingResults', status: false});
      },
    }
  });
};

export default store;

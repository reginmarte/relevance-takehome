# Relevance AI Take Home Assessment (Frontend)

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Nuxt

This repo is set up with the Nuxt framework. For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

One important feature of Nuxt that is worth noting: you don't have to import components. It auto-detects components based on their name (and folder structure). So if you have a component called `BaseButton` in the root components folder, use `<base-button>`. If you have a component called `ContentCard` inside a `components/home` folder, use `home-content-card`.

## Brief

In the Qualitative Cloud, we're building out "deployables" - think widgets - that allow users to perform a specific AI powered function through a user interface. For example, we have deployables for "Image Search" and "Cluster Analysis"; visual layers on top of core API features.

You are tasked with creating a new deployable: "Text Search".

## Criteria/Evaluation

#### Experience design, not interface design

In this assessment, we're not looking for beautiful UI design. That being said, we're very interested in good UX. Layout will have a huge influence on the user journey you build. We're looking for developers with empathy for the user and an ability to solve their problems through the frontend.

#### Use of data and state

One thing we're very interested in is how you fetch, store and retrieve data within local state. We don't think there are "right or wrong" ways to do this, but we think it will demonstrate a lot about how you approach systems.

Note: look at the `store` folder for information on how Vuex is integrated into Nuxt. That being said, you have no requirement to use Vuex.

#### Your code

Vue may be new to you, and we will not judge your use of Vue. However, your implementation of HTML, Tailwind/CSS and Javascript is very important. It should be clean, readable, performant and maintainable. It doesn't need to be heavily commented, but comments used where code doesn't speak for itself.

Feel free to use any libraries that you see fit.

## Instructions

There are three key components to this task.

#### Selecting the current collection

Collections are the name for datasets in the Vector AI API (note that we are rebranding to Relevance AI, but API is currently still on our old name). This Text Search widget should work, as best as possible, no matter which collection the user has selected.

There will need to be a way for the user to change what the current collection is while using this widget.

Here's the API request for retrieving the list of all user collections, using Axios:

```
this.$axios.$get('https://vectorai-production-api.azurewebsites.net/project/list_collections', {
  params: {
    username: "dummy-collections",
    api_key: "UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw"
  }
});
```

As the Text Search deployable will require you to identify which fields in the collection are of type text, you will also have to retrieve the schema for the selected collection:

```
this.$axios.$get('https://vectorai-production-api.azurewebsites.net/project/collection_schema, {
  params: {
    username: "dummy-collections",
    api_key: "UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw",
    collection_name: "" // add current collection name
  }
});
```

The result will look something like this, depending on the collection:

```
{
  "insert_date_": "date",
  "text": "text",
  "text_en_vector_": {
    "vector": 512
  },
  "text_vector_": {
    "vector": 512
  }
}
```

The number for `vector` is the length of the vector.

See [documentation](https://vectorai-production-api.azurewebsites.net/documentation) for all Vector AI endpoints.

#### Performing the Text Search

Our API allows for something called "hybrid" text search. This means that its performing two types of search at once.

The first type of search is traditional text search and searches against text fields in the collection. The second type is vector search and searches against vectors in the collection.

The API allows you also to set a weight for each type to tweak the results you get based on preference.

The request for performing hybrid search looks like this:

```
this.$axios.$post('https://vectorai-production-api.azurewebsites.net/collection/advanced_hybrid_search, {
    username: "dummy-collections",
    api_key: "UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw",
    collection_name: "" // add current collection name,
    min_score: 0.1,
    text: "" // add search query,
    text_fields: [] // add text fields user has selected to search,
    multivector_query: {
      query: {
        vector: [] // insert vector here,
        fields: [] // add vector fields user has selected to search
      }
    },
    traditional_weight: 50 // how much to weight traditional search vs. vector search
});
```

You'll notice that there needs to be a vector! To do that, hit this endpoint first:

```
this.$axios.$get('https://vectorai-production-api.azurewebsites.net/collection/encode_text, {
  params: {
    username: "dummy-collections",
    api_key: "UzdYRktIY0JxNmlvb1NpOFNsenU6VGdTU0s4UjhUR0NsaDdnQTVwUkpKZw",
    collection_name: "" // add current collection name,
    text: "" // add search query to turn into a vector
  }
});
```

Note: a vector is a large array of numbers.

#### The user interace

There are a few key UI elements needed in this project.

Firstly, there needs to be some sort of way for the user to view and change the active collection from their list of collections.

There will also need to be a search bar.

There will need to be an interface for them to configure key parts of the hybrid search request. For example, the text fields to search, the vector fields to search and the traditional search weight.

Note that you can identify the text and vector fields in the collection by looking at the schema.

Also, only allow them to select vector fields that have a length of `512` (see schema). This is because vectors can only be searched against vectors of the same length, and our `encode_text` endpoint returns a `512` number long vector.

#### Any questions?

If you have any questions, or need help, please reach out to me: daniel.palmer@vctr.ai

Understanding our API and vectors can be confusing at first! This is not a test on how well you understand vectors, so do not hesitate to ask if anything isn't clear. Asking is a good thing!

<template>
  <div class="w-full h-screen flex flex-col md:flex-row">

    <!-- Search Form -->
    <div class="p-6 md:w-1/3 md:h-max md:sticky md:top-0 bg-white shadow">
      <div class="py-3">
        <h1 class="text-2xl md:text-3xl font-bold text-blue-600">
          Text Search
        </h1>
        <!--        <label class="text-md md:text-lg font-light font-semi">-->
        <!--          What would you like to search for?-->
        <!--        </label>-->
      </div>
      <input-form/>
    </div>

    <!-- Results -->
    <div class="md:w-full bg-blue-50">
      <div v-if="this.$store.state.status.loadingResults" class="h-screen flex flex-col items-center justify-center">
        <div>
          <svg class="animate-spin h-6 w-6" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke="gray" stroke-width="5"
                    stroke-dasharray="180"
                    stroke-dashoffset="75"></circle>
          </svg>
        </div>
        <span class="text-gray-500">Loading results ...</span>
      </div>
      <div v-else>
        <result-grid/>
      </div>
    </div>
  </div>
</template>

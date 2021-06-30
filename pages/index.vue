<template>
  <!--  <div-->
  <!--    class="w-full h-screen flex flex-col items-center justify-center p-6 bg-blue-50 text-center">-->
  <!--    <h1 class="text-3xl md:text-4xl font-bold text-blue-600 max-w-prose">-->
  <!--      Take Home Assessment (Frontend)-->
  <!--    </h1>-->

  <!--    <p class="mt-4 max-w-prose md:text-xl text-gray-700 font-light">-->
  <!--      Best of luck. Remember to reach out if you need help!-->
  <!--    </p>-->

  <!--    <div-->
  <!--      class="mt-10 p-4 bg-blue-100 border border-blue-200 rounded-lg flex flex-col space-y-4">-->
  <!--      <base-button>Example of BaseButton</base-button>-->
  <!--      <base-button disabled>Example of BaseButton (Disabled)</base-button>-->
  <!--      <base-button loading>Example of BaseButton (Loading)</base-button>-->
  <!--    </div>-->
  <!--  </div>-->

  <div class="w-full h-screen flex flex-col md:flex-row">
    <!-- Search Form -->
    <div class="p-6 md:w-1/3 md:h-max md:sticky md:top-0 bg-white shadow">
      <div class="py-3">
        <h1 class="text-2xl md:text-3xl font-bold text-blue-600">
          Text Search
        </h1>
      </div>
      <input-form/>
    </div>
    <!-- Results -->
    <div class="md:w-full bg-blue-50 md:overflow-auto">
      <a id="top"></a>
      <div v-if="this.$store.state.status.loadingResults" class="h-screen flex flex-col items-center justify-center">
        <div>
          <svg class="animate-spin h-6 w-6" viewBox="0 0 50 50">
            <circle class="path" cx="25" cy="25" r="20" fill="none" stroke="gray" stroke-width="5"
                    stroke-dasharray="180" stroke-dashoffset="75"></circle>
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

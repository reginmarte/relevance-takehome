<template>
  <div class="w-full h-full flex flex-col md:flex-row bg-blue-50">

    <!-- Search Form -->
    <div class="p-6 md:w-1/3 md:h-screen md:sticky md:top-0 bg-white">
      <div class="p-3">
        <h1 class="text-2xl md:text-3xl font-bold text-blue-600">
          Text Search
        </h1>
        <!-- <p class="mt-1 md:text-xl text-gray-700 font-light">-->
        <!-- What are you looking for today?-->
        <!-- </p>-->
        <!-- <hr class="border-0 bg-gray-300 h-px">-->
      </div>
      <input-form/>
    </div>

    <!-- Results -->
    <div class="mt-3 md:w-full md:h-screen flex flex-col items-center justify-center p-8">
      <result-grid/>
    </div>

  </div>
</template>

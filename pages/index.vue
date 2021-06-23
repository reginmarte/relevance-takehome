<template>
  <div
    class="w-full h-screen flex flex-col items-center justify-center p-6 bg-blue-50 text-center"
  >
    <h1 class="text-3xl md:text-4xl font-bold text-blue-600 max-w-prose">
      Take Home Assessment (Frontend)
    </h1>

    <p class="mt-4 max-w-prose md:text-xl text-gray-700 font-light">
      Best of luck. Remember to reach out if you need help!
    </p>

    <div
      class="mt-10 p-4 bg-blue-100 border border-blue-200 rounded-lg flex flex-col space-y-4"
    >
      <base-button>Example of BaseButton</base-button>
      <base-button disabled>Example of BaseButton (Disabled)</base-button>
      <base-button loading>Example of BaseButton (Loading)</base-button>
    </div>
  </div>
</template>

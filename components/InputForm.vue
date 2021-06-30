<template>
  <div class="px-1 flex flex-col space-y-3 md:space-y-6">

    <!-- Input-->
    <div>
      <search-bar/>
      <selection-box/>
    </div>

    <!-- Fields-->
    <div>
      <label class="text-sm md:text-lg font-light font-semi">
        Fields
      </label>
      <p class="text-xs md:text-sm text-gray-500">
        Select fields you'd like to include in your search
      </p>
      <multiple-checkbox/>
    </div>

    <!-- Search Weight-->
    <slider minVal="25" maxVal="100"/>

  </div>
</template>


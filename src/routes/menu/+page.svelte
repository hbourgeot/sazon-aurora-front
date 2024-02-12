<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<!-- write html code for a e-commerce products responsive grid view with sveltekit and tailwind css-->
<div
  class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <div class="bg-white shadow-md rounded-lg p-4">
    <div class="flex justify-center">
      <img
        src="https://via.placeholder.com/150"
        alt="product"
        class="h-48 w-48 object-cover object-center" />
    </div>
    <div class="mt-4">
      <h2 class="text-xl font-semibold">Product Title</h2>
      <p class="mt-2 text-gray-600">Product Description</p>
      <div class="mt-4 flex justify-between items-center">
        <h3 class="text-xl font-bold text-gray-900">$100</h3>
        <button class="px-3 py-1 bg-blue-500 text-white font-semibold rounded">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  <div class="bg-white shadow-md rounded-lg p-4">
    <div class="flex justify-center">
      <img
        src="https://via.placeholder.com/150"
        alt="product"
        class="h-48 w-48 object-cover object-center" />
    </div>
    <div class="mt-4">
      <h2 class="text-xl font-semibold">Product Title</h2>
      <p class="mt-2 text-gray-600">Product Description</p>
      <div class="mt-4 flex justify-between items-center">
        <h3 class="text-xl font-bold text-gray-900">$100</h3>
        <button class="px-3 py-1 bg-blue-500 text-white font-semibold rounded">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
  <div class="bg-white shadow-md rounded-lg p-4">
    <div class="flex justify-center">
      <img
        src="https://via.placeholder.com/150"
        alt="product"
        class="h-48 w-48 object-cover object-center" />
    </div>
    <div class="mt-4">
      <h2 class="text-xl font-semibold">Product Title</h2>
      <p class="mt-2 text-gray-600">Product Description</p>
      <div class="mt-4 flex justify-between items-center">
        <h3 class="text-xl font-bold text-gray-900">$100</h3>
        <button class="px-3 py-1 bg-blue-500 text-white font-semibold rounded">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
</div>

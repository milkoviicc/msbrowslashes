<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { motion } from "motion-v";
import { computed } from "vue";
// ---------- YOUR SERVICES ----------
const services = ref([
  {
    serviceName: "Trajna šminka",
    description: [
      { shortTitle: "obrve", longTitle: "Puder obrve", price: 200 },
      { shortTitle: "obrve", longTitle: "Microblading obrva", price: 200 },
      { shortTitle: "obrve", longTitle: "Microblading + puder obrve", price: 250 },
      { shortTitle: "usne", longTitle: "Trajna šminka usana", price: 200 },
      { shortTitle: "eyeliner", longTitle: "Lash liner (zona trepavica)", price: 150 },
      { shortTitle: "eyeliner", longTitle: "Klasični eyeliner", price: 180 },
      { shortTitle: "eyeliner", longTitle: "Sjenčani eyeliner", price: 180 },
      { shortTitle: "uklanjanje", longTitle: "Uklanjanje otopinom", price: 50 },
    ],
    bgImgUrl: "/images/permanent-makeup-bg.png",
    image: "/images/permanent-makeup.png",
    gallery: [
      "/images/services-gallery/tattoo1.png",
      "/images/services-gallery/tattoo2.jpg",
      "/images/services-gallery/tattoo3.jpg",
      "/images/services-gallery/tattoo4.jpg",
      "/images/services-gallery/tattoo5.jpg",
      "/images/services-gallery/tattoo6.jpg",
      "/images/services-gallery/tattoo7.jpg",
      "/images/services-gallery/tattoo8.jpg",
    ],
  },
  {
    serviceName: "Korekcije",
    description: [
      { shortTitle: "do 6 tjedana", longTitle: "Korekcije do 6 tjedana od 1. tretmana", price: 50 },
      { shortTitle: "2-8 mjeseci", longTitle: "Korekcija 2 - 8 mjeseci", price: 90 },
      { shortTitle: "9-12 mjeseci", longTitle: "Korekcija 9 - 12 mjeseci", price: 120 },
      { shortTitle: "12-18 mjeseci", longTitle: "Korekcija 12 - 18 mjeseci", price: 150 },
    ],
    bgImgUrl: "/images/corrections-bg.png",
    image: "/images/corrections.png",
    gallery: [
      "/images/services-gallery/tattoo1.png",
      "/images/services-gallery/tattoo2.jpg",
      "/images/services-gallery/tattoo3.jpg",
      "/images/services-gallery/tattoo4.jpg",
      "/images/services-gallery/tattoo5.jpg",
      "/images/services-gallery/tattoo6.jpg",
      "/images/services-gallery/tattoo7.jpg",
      "/images/services-gallery/tattoo8.jpg",
    ],
  },
  {
    serviceName: "Tanke tetovaže",
    description: [
      { shortTitle: "veličina S", longTitle: "Mini fine line tattoo S", price: 50 },
      { shortTitle: "veličina M", longTitle: "Mini fine line tattoo M", price: 80 },
      { shortTitle: "veličina L", longTitle: "Mini fine line tattoo L", price: 100 },
      { shortTitle: "veličina XL", longTitle: "Mini fine line tattoo XL", price: 150 },
    ],
    bgImgUrl: "/images/tattoos-bg.png",
    image: "/images/tattoos.png",
    gallery: [
      "/images/services-gallery/tattoo1.png",
      "/images/services-gallery/tattoo2.jpg",
      "/images/services-gallery/tattoo3.jpg",
      "/images/services-gallery/tattoo4.jpg",
      "/images/services-gallery/tattoo5.jpg",
      "/images/services-gallery/tattoo6.jpg",
      "/images/services-gallery/tattoo7.jpg",
      "/images/services-gallery/tattoo8.jpg",
    ],
  },
  {
    serviceName: "Trepavice",
    description: [
      { shortTitle: "ugradnja", longTitle: "Ugradnja volumenskih trepavica", price: 60 },
      { shortTitle: "nadogradnja", longTitle: "Nadogradnja volumenskih do 4 tjedna", price: 50 },
      { shortTitle: "ugradnja", longTitle: "Ugradnja klasičnih ekstenzija", price: 50 },
      { shortTitle: "nadogradnja", longTitle: "Nadogradnja klasičnih do 4 tjedna", price: 40 },
      { shortTitle: "uklanjanje", longTitle: "Skidanje ekstenzija", price: 10 },
    ],
    bgImgUrl: "/images/trepavice-bg.png",
    image: "/images/trepavice.png",
    gallery: [
      "/images/services-gallery/tattoo1.png",
      "/images/services-gallery/tattoo2.jpg",
      "/images/services-gallery/tattoo3.jpg",
      "/images/services-gallery/tattoo4.jpg",
      "/images/services-gallery/tattoo5.jpg",
      "/images/services-gallery/tattoo6.jpg",
      "/images/services-gallery/tattoo7.jpg",
      "/images/services-gallery/tattoo8.jpg",
    ],
  },
]);

/* ----------------------------------- */

const selectedService = ref<number | null>(null);
const selectedServiceImg = ref(0);
const sectionRef = ref(null);
const galleryItems = computed<string[]>(() => {
  if (selectedService.value === null) return [];
  return services.value[selectedService.value]?.gallery || [];
});

type ImageItem = {
  url: string;
  style: string;
};

const images = ref<ImageItem[]>([]);

const loadImages = (gallery: string[]) => {
  images.value = []; // reset
  const imgUrls = gallery.length ? gallery : [services.value[selectedServiceImg.value].image];

  imgUrls.forEach((url) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      const aspectRatio = img.width / img.height;
      const style =
        aspectRatio > 1
          ? "grid-column: span 2; grid-row: span 1;" // horizontal
          : "grid-column: span 1; grid-row: span 2;"; // vertical
      images.value.push({ url, style });
    };
  });
};

// Load images initially
onMounted(() => loadImages(services.value[selectedServiceImg.value].gallery));

// Optional: watch for selected changes
watch(selectedServiceImg, (newVal) => {
  loadImages(services.value[newVal].gallery);
});

const closeBtn = ref<HTMLButtonElement | null>(null);

function open(i: number) {
  selectedService.value = i;
  // lock body scroll
  document.body.style.overflow = "hidden";
  // focus close button for accessibility
  nextTick(() => {
    if (closeBtn.value) closeBtn.value?.focus();
  });
}

function close() {
  selectedService.value = null;
  document.body.style.overflow = "";
}

/* close with Escape key */
function onKey(e: KeyboardEvent) {
  if (e.key === "Escape" && selectedService.value !== null) close();
}

onMounted(() => {
  window.addEventListener("keydown", onKey);
});
onUnmounted(() => {
  window.removeEventListener("keydown", onKey);
  document.body.style.overflow = "";
});
</script>

<template>
  <section class="py-24 relative" ref="sectionRef" aria-labelledby="services-serviceName">
    <div class="w-fit px-4 sm:px-8 md:px-16 mb-12">
      <h1 id="services-serviceName" class="font-light text-5xl text-[#E9E9E9]">Vrste usluga</h1>
      <div class="bg-[#868686] h-[1px] mt-4 w-[110%]"></div>
    </div>

    <!-- cards row -->
    <div class="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-8 px-8 md:px-16">
      <motion.div
        v-for="(service, i) in services"
        :key="i"
        class="relative max-w-full 2xl:max-w-[400px] md:h-[400px] pb-4 w-auto flex flex-col flex-1 items-center rounded justify-between hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
        :initial="{ opacity: 0, y: 10 }"
        :while-in-view="{ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.08 } }"
        :in-view-options="{ once: true }"
        @click="open(i)"
        :class="{ 'opacity-40 pointer-events-none': selectedService !== null }"
        role="button"
        :aria-pressed="selectedService === i"
        tabindex="0"
        @keydown.enter="open(i)"
      >
        <div
          class="absolute inset-0 bg-bg-opacity rounded"
          :style="`background-image: url(${service.bgImgUrl}); background-size: cover; background-position: center;`"
          aria-hidden="true"
        ></div>

        <div class="absolute inset-0 z-30 bg-bg-opacity rounded" aria-hidden="true"></div>

        <div class="absolute -top-6 left-1/2 transform -translate-x-1/2 z-40 w-fit">
          <div class="relative w-40 h-40 rounded-full">
            <img
              :src="service.image"
              :alt="service.serviceName + ' thumbnail'"
              class="w-40 h-40 object-cover rounded-full"
            />
            <img
              src="/images/service-overlay.png"
              alt=""
              class="absolute top-0 left-1 z-30 w-40 h-40 object-cover rounded-full pointer-events-none"
            />
            <img
              src="/images/service-overlay.png"
              alt=""
              class="absolute top-1 -left-1 z-30 w-40 h-40 object-cover rounded-full pointer-events-none"
            />
          </div>
        </div>

        <div class="px-4 lg:px-2 xl:px-4 pt-42 pb-6 z-40 text-center w-full h-full">
          <h2 class="text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-cinzel uppercase">
            {{ service.serviceName }}
          </h2>
          <div class="flex flex-col h-full justify-center">
            <ul
              class="list-disc list-inside text-[#989898] text-left mt-2 px-4 max-h-[130px] h-full flex flex-col justify-center"
            >
              <li
                v-for="(item, j) in [...new Set(service.description.map((i) => i.shortTitle))]"
                :key="j"
                class="text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl font-segoe font-light"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>

    <!-- Expanded overlay (shows when a service is selected) -->
    <motion.div
      v-if="selectedService !== null"
      class="fixed inset-0 z-50 w-full"
      :initial="{ opacity: 0, y: 16 }"
      :animate="{ opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } }"
      :exit="{ opacity: 0, y: 8 }"
      aria-modal="true"
      role="dialog"
      :aria-label="`Detalji usluge ${services[selectedService].serviceName}`"
    >
      <!-- backdrop -->
      <div class="absolute inset-0 bg-black/55" @click.self="close"></div>

      <!-- content panel -->
      <div
        class="relative my-2 mt-[70px] md:mt-0 bg-transparent rounded-xl w-full shadow-2xl h-full md:h-[calc(100%-30px)] flex flex-col md:flex-row overflow-auto"
      >
        <div class="overflow-y-auto h-full hidden lg:block">
          <masonry-wall :items="galleryItems" :max-columns="2" :column-width="250" :gap="16">
            <template #default="{ item }">
              <img
                :src="item"
                alt="Service image"
                class="h-[350px] md:min-h-full md:h-full w-full object-cover rounded-lg"
              />
            </template>
          </masonry-wall>
        </div>
        <div class="overflow-y-auto h-full block lg:hidden">
          <masonry-wall :items="galleryItems" :max-columns="1" :column-width="250" :gap="16">
            <template #default="{ item }">
              <img
                :src="item"
                alt="Service image"
                class="h-[350px] md:min-h-full md:h-full w-full object-cover rounded-lg"
              />
            </template>
          </masonry-wall>
        </div>

        <!-- right: content -->
        <div
          class="w-full h-full py-4 md:py-8 px-4 xl:p-12 bg-[#151919] text-[#e9e9e9] flex flex-col overflow-auto"
        >
          <button @click="close" class="absolute top-4 right-4 text-4xl hidden md:block">X</button>
          <div class="sticky top-0 md:mt-20 flex flex-col h-full pb-4">
            <div class="flex items-start justify-between gap-4 mb-4">
              <div class="h-full">
                <h2 class="text-3xl xl:text-4xl font-cinzel uppercase mb-2">
                  {{ services[selectedService].serviceName }}
                </h2>
                <p class="text-sm md:text-base lg:text-xl xl:text-2xl text-[#bdbdbd]">
                  Detaljan pregled usluge i opcija.
                </p>
              </div>
              <button @click="close" class="absolute top-0 right-4 text-4xl block md:hidden">
                X
              </button>
            </div>

            <hr class="text-brand-accent py-3" />
            <ul class="text-[#cfcfcf] space-y-3 pb-6 overflow-auto">
              <li
                v-for="(item, idx) in services[selectedService].description"
                :key="idx"
                class="text-lg flex justify-between"
              >
                <p>{{ item.longTitle }}</p>
                <p>{{ item.price }} €</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
</template>

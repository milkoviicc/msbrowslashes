<template>
  <section class="py-24 relative" ref="sectionRef" aria-labelledby="services-serviceName">
    <div class="w-fit px-16 mb-12">
      <h1 id="services-serviceName" class="font-light text-5xl text-[#E9E9E9]">Vrste usluga</h1>
      <div class="bg-[#868686] h-[1px] mt-4 w-[110%]"></div>
    </div>

    <!-- cards row -->
    <div class="py-8 flex flex-wrap gap-8 pl-16">
      <motion.div
        v-for="(service, i) in services"
        :key="i"
        class="relative max-w-[315px] w-auto flex-1 flex flex-col items-center rounded justify-between hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
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

        <div class="absolute -top-6 left-18 z-40 w-full">
          <img
            :src="service.image"
            :alt="service.serviceName + ' thumbnail'"
            class="w-40 h-40 object-cover rounded-full"
          />
          <img
            src="../assets/images/service-overlay.png"
            alt=""
            class="absolute top-0 left-1 z-30 w-40 h-40 object-fit rounded-full pointer-events-none"
          />
          <img
            src="../assets/images/service-overlay.png"
            alt=""
            class="absolute top-1 -left-1 z-30 w-40 h-40 object-fit rounded-full pointer-events-none"
          />
        </div>

        <div class="px-4 pt-42 pb-6 z-40 text-center w-full h-full">
          <h2 class="text-3xl font-cinzel uppercase">{{ service.serviceName }}</h2>
          <div class="flex flex-col h-full">
            <ul
              class="list-disc list-inside text-[#989898] text-left mt-2 px-4 max-h-[130px] h-full flex flex-col justify-center"
            >
              <li
                v-for="(item, j) in service.smallDescription"
                :key="j"
                class="text-2xl font-segoe font-light"
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
        class="relative my-2 bg-transparent rounded-xl shadow-2xl h-[calc(100%-30px)] flex flex-col md:flex-row"
      >
        <div class="overflow-auto">
          <masonry-wall :items="galleryItems" :max-columns="2" :column-width="250" :gap="16">
            <template #default="{ item }">
              <img :src="item" alt="Service image" />
            </template>
          </masonry-wall>
        </div>

        <!-- right: content -->
        <div class="w-full p-8 md:p-12 bg-[#151919] text-[#e9e9e9] overflow-auto flex flex-col">
          <div class="sticky top-0 flex flex-col h-full">
            <div class="flex items-start justify-between mb-4">
              <div>
                <h2 class="text-3xl md:text-4xl font-cinzel uppercase mb-2">
                  {{ services[selectedService].serviceName }}
                </h2>
                <p class="text-sm md:text-base text-[#bdbdbd]">
                  <!-- you can customize this line or add a shortIntro in your data -->
                  Detaljan pregled usluge i opcija.
                </p>
              </div>

              <!-- close -->
              <ShimmerButton ref="closeBtn" @click="close" aria-label="Zatvori detalje usluge"
                >Zatvori</ShimmerButton
              >
            </div>

            <hr class="text-brand-accent py-3" />
            <!-- description list -->
            <ul class="text-[#cfcfcf] space-y-3 mb-6">
              <li
                v-for="(item, idx) in services[selectedService].fullDescription"
                :key="idx"
                class="text-lg flex justify-between"
              >
                <p>{{ item.title }}</p>
                <p>{{ item.price }} €</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from "vue";
import { motion } from "motion-v";
import { computed } from "vue";
import ShimmerButton from "./ui/shimmer-button/ShimmerButton.vue";
/* ---------- YOUR SERVICES ---------- npm install -D @inspira-ui/plugins clsx tailwind-merge class-variance-authority tailwindcss-animate --legacy-peer-dep */
const services = ref([
  {
    serviceName: "Trajna šminka",
    smallDescription: ["obrve", "usne", "eyeliner", "uklanjanje"],
    fullDescription: [
      {
        title: "Puder obrve",
        price: 200,
      },
      {
        title: "Microblading obrva",
        price: 200,
      },
      {
        title: "Microblading + puder obrve",
        price: 250,
      },
      {
        title: "Trajna šminka usana",
        price: 200,
      },
      {
        title: "Lash liner (zona trepavica)",
        price: 150,
      },
      {
        title: "Klasični eyeliner",
        price: 180,
      },
      {
        title: "Sjenčani eyeliner",
        price: 180,
      },
      {
        title: "Uklanjanje otopinom",
        price: 50,
      },
    ],
    bgImgUrl: "/src/assets/images/permanent-makeup-bg.png",
    image: "/src/assets/images/permanent-makeup.png",
    gallery: [
      "/src/assets/images/services-gallery/tattoo1.png",
      "/src/assets/images/services-gallery/tattoo2.jpg",
      "/src/assets/images/services-gallery/tattoo3.jpg",
      "/src/assets/images/services-gallery/tattoo4.jpg",
      "/src/assets/images/services-gallery/tattoo5.jpg",
      "/src/assets/images/services-gallery/tattoo6.jpg",
      "/src/assets/images/services-gallery/tattoo7.jpg",
      "/src/assets/images/services-gallery/tattoo8.jpg",
    ],
  },
  {
    serviceName: "Korekcije",
    smallDescription: ["do 6 tjedana", "2-8 mjeseci", "9-12 mjeseci", "12-18 mjeseci"],
    fullDescription: [
      {
        title: "Korekcije do 6 tjedana od 1. tretmana",
        price: 50,
      },
      {
        title: "Korekcija 2 - 8 mjeseci",
        price: 90,
      },
      {
        title: "Korekcija 9 - 12 mjeseci",
        price: 120,
      },
      {
        title: "Korekcija 12 - 8 mjeseci",
        price: 150,
      },
    ],
    bgImgUrl: "/src/assets/images/corrections-bg.png",
    image: "/src/assets/images/corrections.png",
    gallery: [
      "/src/assets/images/services-gallery/tattoo1.png",
      "/src/assets/images/services-gallery/tattoo5.jpg",
      "/src/assets/images/services-gallery/tattoo3.jpg",
      "/src/assets/images/services-gallery/tattoo4.jpg",
      "/src/assets/images/services-gallery/tattoo2.jpg",
      "/src/assets/images/services-gallery/tattoo6.jpg",
      "/src/assets/images/services-gallery/tattoo7.jpg",
      "/src/assets/images/services-gallery/tattoo8.jpg",
    ],
  },
  {
    serviceName: "Tanke tetovaže",
    smallDescription: ["veličina S", "veličina M", "veličina L", "veličina XL"],
    fullDescription: [
      {
        title: "Mini fine line tattoo S",
        price: 50,
      },
      {
        title: "Mini fine line tattoo M",
        price: 80,
      },
      {
        title: "Mini fine line tattoo L",
        price: 100,
      },
      {
        title: "Mini fine line tattoo XL",
        price: 150,
      },
    ],
    bgImgUrl: "/src/assets/images/tattoos-bg.png",
    image: "/src/assets/images/tattoos.png",
    gallery: [
      "/src/assets/images/services-gallery/tattoo1.png",
      "/src/assets/images/services-gallery/tattoo2.jpg",
      "/src/assets/images/services-gallery/tattoo3.jpg",
      "/src/assets/images/services-gallery/tattoo4.jpg",
      "/src/assets/images/services-gallery/tattoo5.jpg",
      "/src/assets/images/services-gallery/tattoo6.jpg",
      "/src/assets/images/services-gallery/tattoo7.jpg",
      "/src/assets/images/services-gallery/tattoo8.jpg",
    ],
  },
  {
    serviceName: "Trepavice",
    smallDescription: ["ugradnja", "nadogradnja", "uklanjanje"],
    fullDescription: [
      {
        title: "Ugradnja volumenskih trepavica",
        price: 60,
      },
      {
        title: "Nadogradnja volumenskih do 4 tjedna",
        price: 50,
      },
      {
        title: "Ugradnja klasičnih ekstenzija",
        price: 50,
      },
      {
        title: "Nadogradnja klasičnih do 4 tjedna",
        price: 40,
      },
      {
        title: "Skidanje ekstenzija",
        price: 10,
      },
    ],
    bgImgUrl: "/src/assets/images/trepavice-bg.png",
    image: "/src/assets/images/trepavice.png",
    gallery: [
      "/src/assets/images/services-gallery/tattoo1.png",
      "/src/assets/images/services-gallery/tattoo2.jpg",
      "/src/assets/images/services-gallery/tattoo3.jpg",
      "/src/assets/images/services-gallery/tattoo4.jpg",
      "/src/assets/images/services-gallery/tattoo5.jpg",
      "/src/assets/images/services-gallery/tattoo6.jpg",
      "/src/assets/images/services-gallery/tattoo7.jpg",
      "/src/assets/images/services-gallery/tattoo8.jpg",
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

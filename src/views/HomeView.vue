<script setup lang="ts">
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { nextTick, onMounted, ref, watch } from "vue";
import { motion, useScroll } from "motion-v";
import ServiceComponent from "../components/ServiceComponent.vue";
import { Menu } from "lucide-vue-next";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import TinselBackground from "@/components/TinselBackground.vue";

gsap.registerPlugin(SplitText);

const scrollPosition = ref(0);
const heroText = ref("MS BROWS & LASHES");
const heroMobileTextTop = ref("MS BROWS");
const heroMobileTextBottom = ref("& LASHES");
const mobileView = ref(false);
const mobileMenuOpened = ref(false);

const closeMobileMenu = () => {
  mobileMenuOpened.value = !mobileMenuOpened.value;
};

onMounted(() => {
  mobileView.value = window.innerWidth < 768;
});

const { scrollYProgress } = useScroll();

window.addEventListener("scroll", () => {
  scrollPosition.value = window.scrollY;
  if (mobileMenuOpened.value) {
    closeMobileMenu();
  }
});

const scrollIndicator = {
  scaleX: scrollYProgress,
  position: "fixed",
  top: 30,
  left: 0,
  right: 0,
  height: "1px",
  originX: 0,
  zIndex: 110,
  backgroundColor: "#FFD798",
};

const showMobileMenu = () => {
  mobileMenuOpened.value = !mobileMenuOpened.value;
};

watch(
  () => mobileMenuOpened.value,
  async (open) => {
    if (open) {
      await nextTick();

      const navbarItem = SplitText.create("#navbar-item", { type: "chars" });
      gsap.fromTo(
        navbarItem.chars,
        {
          y: 115,
          ease: "power4.inOut",
        },
        {
          y: 0,
          stagger: 0.01,
          delay: 0.2,
          duration: 0.2,
        }
      );
    }
  }
);
</script>

<template>
  <div class="w-full h-screen">
    <div
      style="
        background: url(&quot;/images/bg3.png&quot;) center/cover no-repeat;
        background-size: cover;
        background-position: center;
      "
      :class="`bg-[${'/src/assets/images/hero.png'}]`"
      class="relative w-full h-screen bg-cover bg-center flex flex-col"
    >
      <motion.div id="scroll-indicator" :style="scrollIndicator"></motion.div>
      <motion.div
        v-if="!mobileView"
        :initial="{ opacity: 0 }"
        :while-in-view="{ opacity: 1, transition: { duration: 1.5, delay: 1 } }"
        :in-view-options="{ once: true }"
        class="fixed top-0 w-full h-[65px] 2xl:h-[80px] flex justify-between items-center px-8 text-brand-gray font-nunito text-xl 2xl:text-3xl z-20 transition-all duration-300 ease-in-out"
        :class="{ 'bg-[#021515] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] z-[60]': scrollPosition > 0 }"
      >
        <div>
          <a href="#" class="hover:text-[#fff] transition duration-300 ease-in-out">Početna</a>
        </div>
        <div class="flex space-x-8 2xl:space-x-12">
          <a href="#about" class="hover:text-[#fff] transition duration-300 ease-in-out">O meni</a>
          <RouterLink to="/" class="hover:text-[#fff] transition duration-300 ease-in-out"
            >Cjenik</RouterLink
          >
          <RouterLink to="/reviews" class="hover:text-[#fff] transition duration-300 ease-in-out"
            >Recenzije</RouterLink
          >
          <a href="#services" class="hover:text-[#fff] transition duration-300 ease-in-out"
            >Usluge</a
          >
        </div>
        <div>
          <RouterLink to="/contact" class="hover:text-[#fff] transition duration-300 ease-in-out"
            >Kontakt</RouterLink
          >
        </div>
      </motion.div>
      <motion.div
        v-if="mobileView"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 1.2, delay: 0.1 }"
        class="fixed top-0 right-0 w-full z-[100] pointer-events-auto"
        :class="{ 'bg-[#021515] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] z-20': scrollPosition > 0 }"
      >
        <!-- HEADER: always transparent and on top (z-100) -->
        <div
          class="w-full flex relative justify-between items-center h-[65px] px-8 text-brand-gray font-nunito text-xl bg-transparent z-[100]"
          role="banner"
        >
          <a href="#" class="hover:text-white transition duration-200 ease-in-out">Početna</a>

          <button @click="showMobileMenu()" aria-label="Toggle menu" class="focus:outline-none">
            <Menu :size="32" />
          </button>
        </div>

        <!-- ANIMATED OVERLAY: comes from top, z-90 (under header) -->
        <motion.div
          class="fixed left-0 right-0 top-0 bottom-0 z-[90] origin-top"
          :initial="{ y: '-100%', opacity: 0 }"
          :animate="mobileMenuOpened ? { y: '0%', opacity: 1 } : { y: '-100%', opacity: 0 }"
          :transition="{ type: 'tween', duration: 0.35, ease: 'easeInOut' }"
          aria-hidden="true"
        >
          <!-- actual background color block (fills whole viewport) -->
          <div class="w-full h-full bg-[#021515]"></div>
        </motion.div>

        <!-- MENU CONTENT: above overlay (z-95) so links are visible, header stays on z-100 -->
        <motion.div
          class="fixed left-0 right-0 top-0 bottom-0 z-[95] flex flex-col justify-center items-center"
          :initial="{ opacity: 0 }"
          :animate="mobileMenuOpened ? { opacity: 1 } : { opacity: 0 }"
          :transition="{ duration: 0.18 }"
          v-show="mobileMenuOpened"
        >
          <nav class="flex flex-col space-y-12 text-5xl items-center">
            <!-- single-item stagger: each item animates slightly after the overlay for nicer effect -->
            <a
              href="#about"
              class="hover:text-white transition duration-200 ease-in-out w-fit"
              id="navbar-item"
            >
              O meni
            </a>

            <a
              href="/"
              class="hover:text-white transition duration-200 ease-in-out w-fit"
              id="navbar-item"
            >
              Cjenik
            </a>

            <a
              href="/reviews"
              class="hover:text-white transition duration-200 ease-in-out w-fit"
              id="navbar-item"
            >
              Recenzije
            </a>

            <a
              href="#services"
              class="hover:text-white transition duration-200 ease-in-out w-fit"
              id="navbar-item"
            >
              Usluge
            </a>

            <a
              href="/contact"
              class="hover:text-white transition duration-200 ease-in-out w-fit"
              id="navbar-item"
            >
              Kontakt
            </a>
          </nav>
        </motion.div>
      </motion.div>
      <div class="relative flex-1 flex flex-col items-center justify-center space-y-4 w-full">
        <div class="flex flex-col space-y-4 justify-center items-center">
          <motion.h3
            class="text-brand-accent text-xl md:text-3xl 2xl:text-5xl font-nunito font-extralight"
            :initial="{ opacity: 0, y: -20 }"
            :animate="{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.7 } }"
            >obrt za uljepšavanje</motion.h3
          >
          <div class="flex gap-2" v-if="!mobileView">
            <motion.h1
              v-for="(char, i) in heroText.split('')"
              :key="i"
              :initial="{ opacity: 0 }"
              :animate="{ opacity: 1, transition: { delay: i * 0.04 } }"
              class="font-cinzel text-white text-5xl lg:text-6xl xl:text-7xl 2xl:text-9xl -tracking-widest inline-block"
              >{{ char === " " ? "\u00A0" : char }}</motion.h1
            >
          </div>
          <div class="flex flex-col justify-center items-center gap-2 pb-2" v-else>
            <div class="flex justify-center gap-2 pb-2">
              <template v-for="(char, i) in heroMobileTextTop.split('')" :key="i">
                <motion.h1
                  :initial="{ opacity: 0 }"
                  :animate="{ opacity: 1, transition: { delay: i * 0.04 } }"
                  class="font-cinzel text-white text-5xl -tracking-widest leading-8"
                >
                  {{ char === " " ? "\u00A0" : char }}
                </motion.h1>
              </template>
            </div>
            <div class="flex justify-center gap-2 pb-2">
              <template v-for="(char, i) in heroMobileTextBottom.split('')" :key="i">
                <motion.h1
                  :initial="{ opacity: 0 }"
                  :animate="{ opacity: 1, transition: { delay: i * 0.04 } }"
                  class="font-cinzel text-white text-5xl -tracking-widest leading-8"
                >
                  {{ char === " " ? "\u00A0" : char }}
                </motion.h1>
              </template>
            </div>
          </div>
        </div>
        <motion.p
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.7 } }"
          class="text-lighter-white font-light text-xl md:text-2xl 2xl:text-4xl text-center px-4 hidden min-[420px]:block"
          >Pomažem ženama da imaju savršene obrve,<br />
          senzualne usne i zavodljive oči.</motion.p
        >
        <motion.p
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.7 } }"
          class="text-lighter-white font-light text-xl md:text-2xl 2xl:text-4xl text-center px-4 hidden max-[420px]:block"
          >Pomažem ženama da imaju savršene obrve, senzualne usne i zavodljive oči.</motion.p
        >
        <motion.p
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.7 } }"
          class="flex gap-1 text-white items-center font-light text-xl 2xl:text-3xl md:mt-4"
          ><FontAwesomeIcon :icon="faLocationDot" class="location-icon" /> Slatina 50, 44250
          Petrinja</motion.p
        >
      </div>
    </div>
    <div class="background relative">
      <TinselBackground />
      <div class="pt-20 pb-16 px-4 sm:px-8 md:px-16 flex flex-col gap-8 xl:flex-row" id="about">
        <motion.div
          class="flex flex-col w-full xl:w-1/2 space-y-2 justify-center"
          :initial="{ filter: 'blur(2px)', opacity: 0 }"
          :while-in-view="{ filter: 'blur(0px)', opacity: 1, transition: { duration: 1 } }"
          :in-view-options="{ once: true }"
        >
          <div class="w-fit">
            <h2 class="text-2xl md:text-5xl 2xl:text-6xl font-[400] font-montserrat">
              <span class="text-brand-accent">Marina Šimunić,<br /></span>Beauty Expert & Educator
            </h2>
            <div class="w-[75%] h-[1px] mt-4 bg-[#919191]"></div>
          </div>
          <p
            class="font-extralight text-lg md:text-2xl 2xl:text-4xl leading-7 2xl:leading-10 my-2 max-[420px]:hidden"
          >
            MS Beauty & Brows se od 2020. godine<br />
            specijalizirao za vrhunske tretmane microbladinga,<br />
            trajne šminke, tetoviranja i trepavica.
          </p>
          <p class="font-extralight text-lg my-2 min-[420px]:hidden">
            MS Beauty & Brows se od 2020. godine specijalizirao za vrhunske tretmane microbladinga,
            trajne šminke, tetoviranja i trepavica.
          </p>
          <div class="flex flex-col space-y-4 mt-12 text-base md:text-xl 2xl:text-3xl">
            <p class="flex items-center gap-2">
              <img
                src="../assets/icons/podium.png"
                alt="1st Place Podium"
                class="mr-4 w-[36px] h-[36px] lg:w-[50px] lg:h-[50px]"
              />
              Prvi plasman - microblading 2025
            </p>
            <p class="flex items-center gap-2">
              <img
                src="../assets/icons/people.png"
                alt="Education"
                class="mr-4 w-[36px] h-[28px] lg:w-[48px] lg:h-[40px]"
              />
              150+ Zadovoljnih klijenata
            </p>
            <p class="flex items-center gap-2">
              <img
                src="../assets/icons/education.png"
                alt="Clients"
                class="mr-4 w-[36px] h-[36px] lg:w-[50px] lg:h-[50px]"
              />
              10+ Održanih edukacija
            </p>
          </div>
        </motion.div>
        <motion.div
          :initial="{ filter: 'blur(2px)', opacity: 0 }"
          :while-in-view="{ filter: 'blur(0px)', opacity: 1, transition: { duration: 1 } }"
          :in-view-options="{ once: true }"
          class="flex flex-1 flex-col items-center justify-between gap-4 z-50"
        >
          <img
            src="/images/marina-about.png"
            alt="Marina Šimunić"
            class="max-w-[300px] md:max-w-[500px] 2xl:max-w-[600px] w-auto"
          />
          <p
            class="text-2xl md:text-3xl 2xl:text-4xl text-[#A5A5A5] font-crimson-text tracking-wide"
          >
            mag. med. techn.
          </p>
        </motion.div>
      </div>
      <ServiceComponent />
    </div>
  </div>
</template>

<style scoped>
#navbar-item {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0% 100%);
}

.location-icon {
  color: #8d3535;
  font-size: 1.875rem; /* 3xl */
}
</style>

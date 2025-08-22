<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue';
import { motion, useScroll } from 'motion-v';
import ServiceComponent from '../components/ServiceComponent.vue';

const scrollPosition = ref(0);
const heroText = ref('MS BROWS & LASHES');

const { scrollYProgress } = useScroll();

window.addEventListener('scroll', () => {
    scrollPosition.value = window.scrollY;
});

const scrollIndicator = {
    scaleX: scrollYProgress,
    position: "fixed",
    top: 30,
    left: 0,
    right: 0,
    height: "1px",
    originX: 0,
    zIndex: 30,
    backgroundColor: "#FFD798",
}
</script>

<template>
    <div class="w-full h-screen">
        <div style="background-image: url('/src/assets/images/hero.png')" class="relative w-full h-screen bg-cover bg-center flex flex-col ">
            <div class="absolute inset-0 bg-bg-opacity"></div>
            <motion.div id="scroll-indicator" :style="scrollIndicator"></motion.div>
            <motion.div :initial="{opacity: 0}" :while-in-view="{opacity: 1, transition: {duration: 1.5}}" :in-view-options="{once: true}" class="fixed top-0 w-full h-[65px] flex justify-between items-center px-8 text-brand-gray font-nunito text-xl z-20 transition-all duration-300 ease-in-out" :class="{'bg-[#021515] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] z-20': scrollPosition > 0}">
                <div>
                    <RouterLink to="/">Početna</RouterLink>
                </div>
                <div class="flex space-x-8">
                    <RouterLink to="/about">O meni</RouterLink>
                    <RouterLink to="/pricing">Cjenik</RouterLink>
                    <RouterLink to="/reviews">Recenzije</RouterLink>
                    <RouterLink to="/services">Usluge</RouterLink>
                </div>
                <div>
                    <RouterLink to="/contact">Kontakt</RouterLink>
                </div>
            </motion.div>
            <div class="relative flex-1 flex flex-col items-center justify-center space-y-4 w-full">
                <div class="flex flex-col space-y-8 justify-center items-center">
                    <motion.h3 class="font-nunito font-extralight text-brand-accent text-3xl" :initial="{opacity: 0, y: -20}" :animate="{opacity: 1, y:0, transition: {duration: 0.5, delay: 0.5}}">obrt za uljepšavanje</motion.h3>
                    <div class="flex gap-2">
                        <motion.h1 v-for="(char, i) in heroText.split('')" :key="i" :initial="{ opacity: 0 }" :animate="{ opacity: 1, transition: { delay: i * 0.04 } }" class="font-cinzel text-white text-8xl inline-block">{{ char === ' ' ? '\u00A0' : char }}</motion.h1>
                    </div>
                </div>
                <motion.p :initial="{opacity: 0, y: 20}" :animate="{opacity: 1, y: 0, transition: {duration: 0.5, delay: 0.5}}" class="font-nunito text-lighter-white font-light text-2xl w-1/3 text-center">Pomažem ženama da imaju savršene obrve, senzualne usne i zavodljive oči.</motion.p>
                <motion.p :initial="{opacity: 0, y: 20}" :animate="{opacity: 1, y: 0, transition: {duration: 0.5, delay: 0.5}}" class="flex gap-1 text-lighter-white items-center text-xl"><FontAwesomeIcon :icon="faLocationDot" class="text-[#8D3535] text-2xl" /> Slatina 50, 44250 Petrinja</motion.p>
                
            </div>
        </div>
        <div class="bg-[#151919] p-8 flex">
            <motion.div class="flex flex-col w-1/2 space-y-2 justify-center" :initial="{ filter: 'blur(5px)', opacity: 0}" :while-in-view="{ filter: 'blur(0px)', opacity: 1, transition: {duration: 1}}" :in-view-options="{once: true}">
                <div class="w-fit">
                    <h2 class="text-6xl"><span class="text-brand-accent">Marina Šimunić,<br/></span>Beauty Expert & Educator</h2>
                    <div class="w-full h-[1px] mt-4 bg-white"></div>
                </div>
                <p class="font-light w-[80%] text-2xl">MS Beauty & Brows se od 2020. godine specijalizirao za vrhunske tretmane microbladinga, trajne šminke, tetoviranja i trepavica.</p>
                <div class="flex flex-col space-y-8 mt-8 text-2xl">
                    <p class="flex items-center gap-2"><img src="../assets/icons/podium.png" alt="1st Place Podium" width="48"/> Browista 2025 - Microblading</p>
                    <p class="flex items-center gap-2"><img src="../assets/icons/education.png" alt="Education" width="48"/> 150+ Zadovoljnih klijenata</p>
                    <p class="flex items-center gap-2"><img src="../assets/icons/people.png" alt="Clients" width="48"/> 10+ Održanih edukacija</p>
                </div>
            </motion.div>
            <motion.div :initial="{ filter: 'blur(5px)', opacity: 0}" :while-in-view="{ filter: 'blur(0px)', opacity: 1, transition: {duration: 1}}" :in-view-options="{once: true}" class="flex flex-1 flex-col items-center justify-between gap-4" >
                <img  src="../assets/images/marina-about.png" alt="Marina Šimunić" width="550" />
                <p class="text-xl text-[#D9D9D9]">mag. med. tehn.</p>
            </motion.div>
        </div>
        <ServiceComponent />
    </div>
</template>

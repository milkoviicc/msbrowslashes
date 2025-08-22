<script setup lang="ts">
import { ref } from 'vue';

    const services = ref([
        {
            title: 'Trajna šminka',
            description: ['obrve', 'usne', 'eyeliner', 'uklanjanje'],
            bgImgUrl: '/src/assets/images/permanent-makeup-bg.png',
            image: '/src/assets/images/permanent-makeup.png',
        },
        {
            title: 'Korekcije',
            description: ['do 6 tjedana', '2-8 mjeseci', '9-12 mjeseci', '12-18 mjeseci'],
            bgImgUrl: '/src/assets/images/corrections-bg.png',
            image: '/src/assets/images/corrections.png',
        },
        {
            title: 'Tanke tetovaže',
            description: ['veličina S', 'veličina M', 'veličina L', 'veličina XL'],
            bgImgUrl: '/src/assets/images/tattoos-bg.png',
            image: '/src/assets/images/tattoos.png',
        },
        {
            title: 'Trepavice',
            description: ['ugradnja', 'nadogradnja', 'uklanjanje'],
            bgImgUrl: '/src/assets/images/trepavice-bg.png',
            image: '/src/assets/images/trepavice.png',
        },
    ])
</script>

<template>
    <div class="py-32 flex space-x-8 justify-center">
        <div v-for="(service, i) in services" :key="i" class="relative max-w-[250px] w-full flex flex-col rounded-2xl justify-between" :style="`background-image: url(${service.bgImgUrl}); background-size: cover; background-position: center;`">
            <div class="absolute inset-0 bg-bg-opacity rounded-2xl"></div>
            <div class="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
                <img :src="service.image" alt="Service Image" class="w-32 h-32 object-cover rounded-full" />
            </div>
            <div class="px-4 pt-32 pb-8 z-20">
                <h2 class="text-2xl text-center font-cinzel mb-2 uppercase">{{ service.title }}</h2>
                <div class="flex flex-col space-y-2 ">
                    <ul class="list-disc list-inside text-[#989898]">
                        <li v-for="(item, j) in service.description" :key="j" class="text-xl ">
                            {{ item }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
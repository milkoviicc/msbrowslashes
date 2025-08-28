<template>
  <div class="tinsel-container" ref="containerRef">
    <div
      v-for="(tinsel, index) in tinsels"
      :key="index"
      class="tinsel"
      ref="el => tinselRefs.value[index] = el"
      :style="{ left: `${tinsel.startX}px`, top: `${tinsel.startY}px` }"
    ></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

interface Tinsel {
  startX: number;
  startY: number;
}

const numberOfTinsels = 50;
const tinsels = ref<Tinsel[]>([]);
const tinselRefs = ref<HTMLDivElement[]>([]);
const containerRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
  const container = containerRef.value;
  if (!container) return;

  const rect = container.getBoundingClientRect();

  // Initialize tinsel positions randomly inside container
  for (let i = 0; i < numberOfTinsels; i++) {
    tinsels.value.push({
      startX: Math.random() * rect.width,
      startY: Math.random() * rect.height,
    });
  }

  const moveTinsels = (e: MouseEvent) => {
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    tinselRefs.value.forEach((el, i) => {
      if (!el) return;

      gsap.to(el, {
        x: mouseX + (Math.random() * 50 - 25) - tinsels.value[i].startX,
        y: mouseY + (Math.random() * 50 - 25) - tinsels.value[i].startY,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  };

  container.addEventListener("mousemove", moveTinsels);
});
</script>

<style scoped>
.tinsel-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none; /* allows clicks through */
  overflow: hidden;
  z-index: 20;
}

.tinsel {
  position: absolute;
  width: 2px;
  height: 3px;
  background: #ffd8982d;
}
</style>

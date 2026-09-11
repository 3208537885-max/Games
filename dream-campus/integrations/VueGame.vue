<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue';

type RunEnd = { won: boolean; score: number; inspiration: number; seed: string; seconds: number };
const props = withDefaults(defineProps<{ src?: string; height?: string }>(), {
  src: '/games/dream-campus/index.html',
  height: 'calc(100dvh - 72px)',
});
const emit = defineEmits<{ (event: 'run-end', result: RunEnd): void }>();
const frame = ref<HTMLIFrameElement | null>(null);
function connect() {
  try {
    const child = frame.value?.contentWindow as (Window & { DREAM_CAMPUS_CONFIG?: { parentOrigin?: string } }) | null;
    if (child?.DREAM_CAMPUS_CONFIG && location.origin !== 'null') child.DREAM_CAMPUS_CONFIG.parentOrigin = location.origin;
  } catch { /* Cross-origin embedding needs explicit config.js parentOrigin. */ }
}
function receive(event: MessageEvent) {
  if (event.source !== frame.value?.contentWindow || event.origin !== new URL(props.src, location.href).origin) return;
  const d = event.data;
  if (d?.game !== 'dream-campus' || d.event !== 'run:end') return;
  const r = d.payload;
  if (r && typeof r.won === 'boolean' && Number.isFinite(r.score)
    && Number.isFinite(r.inspiration) && Number.isFinite(r.seconds) && typeof r.seed === 'string') emit('run-end', r);
}
onMounted(() => window.addEventListener('message', receive));
onBeforeUnmount(() => window.removeEventListener('message', receive));
</script>

<template>
  <iframe ref="frame" :src="props.src" title="水课梦魇 · 校园梦境冒险"
    allow="autoplay" referrerpolicy="same-origin" @load="connect"
    :style="{ display: 'block', width: '100%', height: props.height, minHeight: '420px', border: '0' }" />
</template>

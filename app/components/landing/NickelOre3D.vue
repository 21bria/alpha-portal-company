<template>
  <div class="relative h-[520px] w-full">
    <ClientOnly>
      <TresCanvas clear-color="transparent" window-size>
        <TresPerspectiveCamera :position="[0, 0, 6]" :fov="45" />

        <TresAmbientLight :intensity="0.7" />
        <TresDirectionalLight :position="[4, 4, 4]" :intensity="2.4" color="#f59e0b" />
        <TresDirectionalLight :position="[-4, -2, 3]" :intensity="1.5" color="#22d3ee" />

        <TresMesh ref="oreRef" :rotation="[0.45, 0.25, 0]">
          <TresIcosahedronGeometry :args="[1.7, 2]" />
          <TresMeshStandardMaterial
            color="#151515"
            :metalness="0.85"
            :roughness="0.28"
            emissive="#2a1600"
            :emissive-intensity="0.25"
          />
        </TresMesh>

        <TresMesh ref="ringRef" :rotation="[1.25, 0.2, 0.6]">
          <TresTorusGeometry :args="[2.45, 0.006, 16, 180]" />
          <TresMeshBasicMaterial color="#f59e0b" transparent :opacity="0.35" />
        </TresMesh>

        <TresMesh ref="ringRef2" :rotation="[0.65, 1.1, 0.2]">
          <TresTorusGeometry :args="[2.75, 0.005, 16, 180]" />
          <TresMeshBasicMaterial color="#22d3ee" transparent :opacity="0.22" />
        </TresMesh>
      </TresCanvas>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const oreRef = shallowRef()
const ringRef = shallowRef()
const ringRef2 = shallowRef()

function animate() {
  requestAnimationFrame(animate)

  if (oreRef.value) {
    oreRef.value.rotation.y += 0.006
    oreRef.value.rotation.x += 0.002
  }

  if (ringRef.value) {
    ringRef.value.rotation.z += 0.003
  }

  if (ringRef2.value) {
    ringRef2.value.rotation.z -= 0.002
  }
}

onMounted(() => {
  animate()
})
</script>
<template>
    <q-carousel
      color="white"
      quick-nav
      height="300px"
    >
      <q-carousel-slide class="text-white bg-primary row flex-center">
        <div class="q-display-2">First Slide</div>
      </q-carousel-slide>
      <q-carousel-slide class="text-white bg-secondary row flex-center">
        <div class="q-display-2">Second Slide</div>
      </q-carousel-slide>

      <q-carousel-control slot="control-nav" slot-scope="carousel" :offset="[18, 52]">
        <q-btn
          @click="carousel.previous"
          :disable="!carousel.canGoToPrevious"
          color="amber" text-color="black"
          icon="keyboard_arrow_left"
          round dense
          class="q-mr-sm"
        />
        <q-btn
          @click="carousel.next"
          :disable="!carousel.canGoToNext"
          color="amber" text-color="black"
          icon="keyboard_arrow_right"
          round dense
        />
      </q-carousel-control>

      <q-btn
        slot="quick-nav"
        slot-scope="props"
        color="white"
        flat
        dense
        :label="`${props.slide + 1}`"
        @click="props.goToSlide()"
        :class="{inactive: !props.current}"
      />
    </q-carousel>
</template>

<script>
  export default {}
</script>

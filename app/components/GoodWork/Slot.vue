<!--
  GoodWork/Slot — one photograph place on the homepage. With a `src` it is a
  still (and, with a `video`, an ambient loop over it that useGoodWorkMotion
  plays only while it is in view). Without one it is `.gw-slot--empty`, a
  gradient drawn for that place in good-work.css, so the page is finished
  before the shoot is. The places and the shot list: data/good-work.ts ·
  photos, and the mockup README.
-->
<template>
	<div class="gw-slot" :class="{ 'gw-slot--empty': !photo.src }" :data-slot="name" aria-hidden="true">
		<img v-if="photo.src" :src="photo.src" :alt="photo.alt" :loading="eager ? 'eager' : 'lazy'" decoding="async" />
		<video v-if="photo.src && photo.video" data-ambient muted loop playsinline preload="none" :poster="photo.src">
			<source :src="photo.video" type="video/mp4" />
		</video>
	</div>
</template>

<script setup lang="ts">
import type { PhotoSlot } from '~/data/good-work';

defineProps<{ name: string; photo: PhotoSlot; eager?: boolean }>();
</script>

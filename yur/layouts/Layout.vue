<script setup>
  import { pageData } from '@vuepress/client';

  import ITab from '@/yur/components/ITab.vue';
  import View from '@/yur/components/View.vue';

  import { useScrollPromise } from '@/yur/hooks/useScrollBehavior';

  const scrollPromise = useScrollPromise();
  const onBeforeEnter = scrollPromise.resolve;
  const onBeforeLeave = scrollPromise.pending;
</script>

<template>
  <ITab>
    <template #view>
      <Transition
        name="scroll-y"
        mode="out-in"
        @before-enter="onBeforeEnter"
        @before-leave="onBeforeLeave"
      >
        <View :key="pageData.path" />
      </Transition>
    </template>
  </ITab>
</template>

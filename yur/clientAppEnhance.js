import { defineClientAppEnhance } from '@vuepress/client';

import 'tailwindcss/tailwind.css';

import { useScrollPromise } from './hooks/useScrollBehavior';

import './styles/index.less';

export default defineClientAppEnhance(({ app, router, siteData }) => {
  const scrollBehavior = router.options.scrollBehavior;
  router.options.scrollBehavior = async (...args) => {
    await useScrollPromise().wait();
    return scrollBehavior(...args);
  };
});

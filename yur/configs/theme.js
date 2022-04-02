import WallpaperJpg from '@/yur/assets/img/wallpaper.jpg';
import Logo64Png from '@/yur/assets/img/logo64.png';
import WallpaperWebm from '@/yur/assets/video/wallpaper.webm';

/**
 * @description 主题配置
 * @returns {{}}
 */
export const config = () => {
  return {
    // 主题/壁纸
    theme: {
      // 深色模式
      darkMode: false,
      // 跟随系统
      autoMode: false,
      // 主题色
      primaryColor: '#7546c9',
      // 壁纸
      wallpaper: {
        // 图片/视频封面
        img: WallpaperJpg,
        // 视频
        video: WallpaperWebm,
        // 遮罩
        blur: '0px',
        // 模糊
        opacity: 1,
      },
    },
    // 侧边栏
    sidebar: {
      logo: Logo64Png,
      // 宽度
      width: '50px',
    },
  };
};

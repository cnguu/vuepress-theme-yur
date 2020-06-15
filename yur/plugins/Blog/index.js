import { getCategoryText, hasOwn } from "@theme/utils";

export default function blog(Vue) {
  Vue.mixin({
    created() {
      const {
        postCover = [
          "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/banners/1039d85f155ebe572ff56f90a626b7a1.jpg",
          "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/banners/56e0e59e0ab812163e669e6ed52f7fa3.jpg",
          "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/banners/bae275e9f50a46e61498e227df586eb9.jpg",
          "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/banners/fb03a35ac8a7ca43a69b89c298b2165a.jpg",
          "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/banners/766bb99cdfea168a5611d5ed3ee87e6a.jpg",
          "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/banners/abea283e65f3460e6f33383dceec550b.jpg",
          "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/banners/b49fa49c69ff125aff9a08b177f94cec.jpg",
          "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/banners/bc8cd22dd19d42b85dfa8abc871215bf.jpg",
          "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/banners/6f6ca5b0cb3bc43e5895911cc40a343d.jpg",
          "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/banners/259d10ede304468d1c12df2f49ed2afd.jpg",
          "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/banners/d4650c2a40868b84eda513bca9d13513.jpg",
          "https://cdn.jsdelivr.net/gh/cnguu/pic@master/20171231/banners/eb92164f38952ef26315499f112b963a.jpg"
        ],
        menuCategories
      } = this.$themeConfig;
      if (!this._posts) {
        const today = new Date().toLocaleDateString();
        const { pages } = this.$site;
        let posts = {};
        let postsByUpdated = {};
        if (pages && pages.length) {
          posts = pages.filter(page => {
            const {
              frontmatter: { created }
            } = page;
            return !(created === undefined);
          });
          for (const post of posts) {
            const {
              frontmatter: { created, updated, banner }
            } = post;
            if (banner) {
              post.frontmatter.banner = this.$withBase(banner);
            } else {
              const postCoverLength = postCover.length;
              if (postCoverLength) {
                post.frontmatter.banner = this.$withBase(
                  postCover[Math.floor(Math.random() * postCoverLength)]
                );
              }
            }
            if (created) {
              post.frontmatter.created = new Date(created).toLocaleDateString();
            } else {
              post.frontmatter.created = today;
            }
            if (updated) {
              post.frontmatter.updated = new Date(updated).toLocaleDateString();
            } else {
              post.frontmatter.updated = today;
            }
            post.categoryText = getCategoryText(menuCategories, post.id);
          }
          postsByUpdated = JSON.parse(JSON.stringify(posts));
          postsByUpdated.sort((a, b) => {
            return (
              new Date(b.frontmatter.updated).getTime() -
              new Date(a.frontmatter.updated).getTime()
            );
          });
          posts.sort((a, b) => {
            return (
              new Date(b.frontmatter.created).getTime() -
              new Date(a.frontmatter.created).getTime()
            );
          });
        }
        Vue.prototype._postsByUpdated = postsByUpdated;
        Vue.prototype._posts = posts;
      }

      if (!this._categories) {
        const categories = {};
        if (menuCategories && menuCategories.length) {
          menuCategories.forEach(menuCategory => {
            categories[menuCategory.link] = [];
          });
          Vue.prototype._menuCategories = menuCategories;

          if (this._posts.length) {
            this._posts.forEach(post => {
              const { id } = post;
              if (id && hasOwn(categories, id)) {
                categories[id].push(post);
              }
            });
          }
        }
        Vue.prototype._categories = categories;
      }
    }
  });
}

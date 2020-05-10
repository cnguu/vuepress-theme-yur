import { getCategoryText, hasOwn } from "@theme/utils";

export default function blog(Vue) {
  Vue.mixin({
    created() {
      const { postCover, menuCategories } = this.$themeConfig;
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
              if (postCover && postCover.length) {
                post.frontmatter.banner = this.$withBase(
                  postCover[Math.floor(Math.random() * postCover.length)]
                );
              } else {
                post.frontmatter.banner = require(`@theme/assets/post/${Math.floor(
                  Math.random() * 20
                ) + 1}.svg`);
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

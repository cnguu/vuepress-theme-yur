const links = require("./links");

module.exports = {
  lang: "zh-CN",
  logo: "/logo64.png",
  nameplate: {
    title: "Yur",
    width: "36px",
    height: "26px"
  },
  about: true,
  menuCategories: [
    {
      text: "编程技术",
      link: "program"
    },
    {
      text: "其它",
      link: "other"
    }
  ],
  // postCover: [],
  cdn: true,
  beiAn: "粤 ICP 备 17075980 号 - 4",
  hostname: "https://blog.cnguu.cn",
  reward: [
    "https://static.xmt.cn/ca717dde8ae14ea7ab3c8c74b8711414.png",
    "https://static.xmt.cn/acc7d3d02b0c4a35a3735268cbb2cce0.png"
  ],
  links,
  baiDu: {
    // tongJi: "",
    autoPush: true
  }
};

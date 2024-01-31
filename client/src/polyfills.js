// 解决emo表情包导致全局报错
if (typeof window.global === "undefined") {
  window.global = window;
}

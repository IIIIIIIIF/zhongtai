<!--
 描述: 登录界面背景图动画
 作者: 邢世宽
 日期: 2020-07-07
-->

<template>
  <ul class="slide-box">
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
</template>

<script>

export default {
  name: "bgAnimation",
  data(){
    return {}
  }
}
</script>

<style lang="scss">
.slide-box {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 134, 179, .5);
  top: 0;
  left: 0;
  z-index: 0;
  li {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    color: transparent;
    background-size: cover;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    opacity: 0;
    z-index: 0;
    -webkit-backface-visibility: hidden;
    animation: imgAnimation 48s linear infinite 0s;

    &:nth-child(1) {
      background-image: url(../../assets/font/login/bg-4.jpg);
    }
    &:nth-child(2) {
      background-image: url(../../assets/font/login/bg-5.jpg);
      animation-delay: 12s;
    }
    &:nth-child(3) {
      background-image: url(../../assets/font/login/bg-2.jpg);
      animation-delay: 24s;
    }
    &:nth-child(4) {
      background-image: url(../../assets/font/login/bg-4.jpg);
      animation-delay: 36s;
    }
  }
}
@-webkit-keyframes imgAnimation {
  0% {
    opacity: 0;
    -webkit-animation-timing-function: ease-in;
  }
  8% {
    opacity: 1;
    -webkit-transform: scale(1.1);
    -webkit-animation-timing-function: ease-out;
  }
  17% {
    opacity: 1;
    -webkit-transform: scale(1.2);
  }
  25% {
    opacity: 0;
    -webkit-transform: scale(1.3);
  }
  100% {
    opacity: 0;
  }
}
@keyframes imgAnimation {
  0% {
    opacity: 0;
    animation-timing-function: ease-in;
  }
  8% {
    opacity: 1;
    transform: scale(1.1);
    animation-timing-function: ease-out;
  }
  17% {
    opacity: 1;
    transform: scale(1.2);
  }
  25% {
    opacity: 0;
    transform: scale(1.3);
  }
  100% {
    opacity: 0;
  }
}
</style>

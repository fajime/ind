<script src="./dl-ui-ripple.js" />
<template src="./dl-ui-ripple.html" />
<style>
.ripple {
  border-radius: 100%;
  position: absolute;
  transform: translate(-50%, -50%);
  pointer-events: none;
  visibility: hidden;
}

.ripple.active {
  transition: width 0.8s, height 0.8s, opacity 0.8s ease-in;
  visibility: visible;
  opacity: 0;
}
</style>

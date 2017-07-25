import { addToLoop, removeFromLoop } from './loop';

export default
window.requestAnimationFrame ||
window.webkitRequestAnimationFrame ||
window.mozRequestAnimationFrame ||
(exec => {
  const func = () => {
    exec();
    removeFromLoop(func);
  };
  addToLoop(func);
});

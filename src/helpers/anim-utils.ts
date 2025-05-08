export const triggerBlinkSequence = (setBlinking: (value: boolean) => void) => {
  setBlinking(true);
  setTimeout(() => {
    setBlinking(false);

    if (Math.random() < 0.2) {
      setTimeout(() => {
        setBlinking(true);
        setTimeout(() => setBlinking(false), 200);
      }, 200);
    }
  }, 200);
};

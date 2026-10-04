import { useState, useEffect } from 'react';

export function useFooterDetection() {
  const [isNearFooter, setIsNearFooter] = useState(false);

  useEffect(() => {
    let ticking = false;

    const checkFooter = () => {
      const footer = document.getElementById('footer');
      if (!footer) {
        setIsNearFooter(false);
        return;
      }

      const rect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Detects when the footer has scrolled into the viewport
      if (rect.top <= windowHeight - 20) {
        setIsNearFooter(true);
      } else {
        setIsNearFooter(false);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(checkFooter);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    checkFooter();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return { isNearFooter };
}

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { SplitText } from 'gsap/all';
import { useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    // --- TEXT ANIMATIONS ---
    const heroSplit = new SplitText('.title', { type: 'chars, words' });
    const paragraphSplit = new SplitText('.subtitle', { type: 'lines' });

    // Add gradient class cho từng char trước khi animate
    heroSplit.chars.forEach((char) => char.classList.add('text-gradient'));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: 'expo.out',
      stagger: 0.06,
      delay: 1,
    });

    // --- HERO LEAVES + ARROW ---
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
      .to('.right-leaf', { y: 200 }, 0)
      .to('.left-leaf', { y: -200 }, 0)
      .to('.arrow', { y: 100 }, 0);

    // --- VIDEO ANIMATION ---
    const video = videoRef.current;
    if (!video) return;

    const startValue = isMobile ? 'top 50%' : 'center 60%';
    const endValue = isMobile ? '120% top' : 'bottom top';

    const initVideoAnimation = () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: video,
            start: startValue,
            end: endValue,
            scrub: true,
            pin: true,
          },
        })
        .to(video, {
          currentTime: video.duration || 1, // fallback nếu duration = 0
          ease: 'none', // giữ mượt, sync scroll <-> video
        });
    };

    // Nếu metadata đã sẵn sàng → chạy luôn
    if (video.readyState >= 1) {
      initVideoAnimation();
    } else {
      // Nếu chưa, chờ load xong mới init
      video.onloadedmetadata = () => {
        initVideoAnimation();
      };
    }
  }, []);

  return (
    <>
      <section id='hero' className='noisy'>
        <h1 className='title'>MOJITO</h1>

        <img
          src='/images/hero-left-leaf.png'
          alt='left-leaf'
          className='left-leaf'
        />
        <img
          src='/images/hero-right-leaf.png'
          alt='right-leaf'
          className='right-leaf'
        />

        <div className='body'>
          {/* <img src="/images/arrow.png" alt="arrow" className="arrow" /> */}

          <div className='content'>
            <div className='space-y-5 hidden md:block'>
              <p>Cool. Crisp. Classic.</p>
              <p className='subtitle'>
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className='view-cocktails'>
              <p className='subtitle'>
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses.
              </p>
              <a href='#cocktails'>View cocktails</a>
            </div>
          </div>
        </div>
      </section>

      <div className='video absolute inset-0'>
        <video
          ref={videoRef}
          muted
          playsInline
          preload='auto'
          src='/videos/optimized.mp4'
        />
      </div>
    </>
  );
};

export default Hero;

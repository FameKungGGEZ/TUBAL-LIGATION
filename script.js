window.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Progress Bar
  ScrollTrigger.create({
    trigger: "body", start: "top top", end: "bottom bottom",
    onUpdate: (self) => {
      document.getElementById('navProgressFill').style.width = (self.progress * 100) + '%';
    }
  });

  // 2. Hero Entry
  const tlHero = gsap.timeline();
  tlHero.to('#heroEyebrow', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
        .to('#heroTitle', { opacity: 1, duration: 1.2, ease: 'power4.out' }, '-=0.7')
        .to('#heroSubtitle', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
        .to('#heroCta', { opacity: 0.7, duration: 0.8 }, '-=0.5');

  // 3. Navbar Chapter Indicator
  const chapters = [
    { id: '#scene-hero', name: 'บทนำ' },
    { id: '#scene-journey', name: 'กายวิภาค' },
    { id: '#scene-micro', name: 'นิยาม' },
    { id: '#scene-turn', name: 'กลไก' },
    { id: '#scene-methods', name: 'รูปแบบการทำหมัน' },
    { id: '#scene-outcome', name: 'ข้อดีและข้อจำกัด' },
    { id: '#scene-timeline', name: 'ขั้นตอนการรักษา' },
    { id: '#scene-reflection', name: 'การดูแลตนเอง' },
    { id: '#scene-finale', name: 'บทสรุป' }
  ];
  chapters.forEach(ch => {
    ScrollTrigger.create({
      trigger: ch.id, start: 'top center', end: 'bottom center',
      onEnter: () => document.getElementById('navChapter').innerText = ch.name,
      onEnterBack: () => document.getElementById('navChapter').innerText = ch.name
    });
  });

  // 4. Responsive Check
  const isMobile = window.innerWidth <= 900;

  if (!isMobile) {
    // DESKTOP MODE
    gsap.to('#journeyText', { scrollTrigger: { trigger: '#scene-journey', start: 'top center' }, opacity: 1, x: 0, duration: 1 });
    gsap.to('#microContent', { scrollTrigger: { trigger: '#scene-micro', start: 'top center' }, opacity: 1, transform: 'translateY(0)', duration: 1 });

    // Split Panel
    const tlTurn = gsap.timeline({ scrollTrigger: { trigger: '#scene-turn', start: 'top top', end: '+=100%', pin: true, scrub: 1 } });
    tlTurn.to('#turnDivide', { scaleY: 1, duration: 1 })
          .to(['#turnLabelLeft', '#turnHeadLeft', '#turnBodyLeft'], { opacity: 1, y: 0, stagger: 0.2 }, '-=0.5')
          .to(['#turnLabelRight', '#turnHeadRight', '#turnBodyRight'], { opacity: 1, y: 0, stagger: 0.2 }, '-=0.3');

    // Method Cards
    gsap.to('#methodsIntro', { scrollTrigger: { trigger: '#scene-methods', start: 'top 70%' }, opacity: 1, duration: 0.8 });
    gsap.to(['#methodCard1', '#methodCard2'], { scrollTrigger: { trigger: '.methods-track', start: 'top 70%' }, opacity: 1, y: 0, duration: 1, stagger: 0.3 });

    // Outcome Grid
    gsap.to('#outcomeHeadline', { scrollTrigger: { trigger: '#scene-outcome', start: 'top 70%' }, opacity: 1, duration: 0.8 });
    gsap.to(['#outcomePros', '#outcomeCons'], { scrollTrigger: { trigger: '.outcome-grid-box', start: 'top 70%' }, opacity: 1, y: 0, duration: 1, stagger: 0.2 });

    // Horizontal Timeline Scroll
    const track = document.getElementById('timelineTrack');
    const totalScroll = track.scrollWidth - window.innerWidth + 160;
    const tlTimeline = gsap.timeline({ scrollTrigger: { trigger: '#scene-timeline', start: 'top top', end: `+=${totalScroll}`, pin: true, scrub: 1, invalidateOnRefresh: true } });
    tlTimeline.to('#timelineHeader', { opacity: 1, duration: 0.2 })
              .to(track, { x: () => -totalScroll, ease: 'none' })
              .to('#timelineCue', { opacity: 1, duration: 0.3 }, '-=0.5');

    // Post-op Recovery
    gsap.to('#reflectionQuote', { scrollTrigger: { trigger: '#scene-reflection', start: 'top 70%' }, opacity: 1, y: 0, duration: 0.8 });
    gsap.to(['#reflectCard1', '#reflectCard2'], { scrollTrigger: { trigger: '.reflection-testimonials', start: 'top 75%' }, opacity: 1, y: 0, duration: 0.8, stagger: 0.2 });
  } else {
    // MOBILE MODE
    gsap.set(['#journeyText', '#microContent', '#turnLabelLeft', '#turnHeadLeft', '#turnBodyLeft', '#turnLabelRight', '#turnHeadRight', '#turnBodyRight', '#methodsIntro', '#methodCard1', '#methodCard2', '#outcomeHeadline', '#outcomePros', '#outcomeCons', '#timelineHeader', '#reflectionQuote', '#reflectCard1', '#reflectCard2'], { opacity: 1, y: 0, x: 0, scaleY: 1 });
  }

  // Finale Section
  const tlFinale = gsap.timeline({ scrollTrigger: { trigger: '#scene-finale', start: 'top 60%' } });
  tlFinale.to('#finaleEyebrow', { opacity: 1, duration: 0.5 })
          .to('#finaleTitle', { opacity: 1, duration: 0.6 }, '-=0.2')
          .to('#finaleSub', { opacity: 1, duration: 0.6 }, '-=0.3')
          .to('#finaleBtn', { opacity: 1, duration: 0.5 }, '-=0.2');
});

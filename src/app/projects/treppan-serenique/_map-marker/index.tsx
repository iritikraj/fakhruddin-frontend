"use client";

import { useRef, useEffect } from "react";

// Map marker data
const MAP_MAIN = { x: 41.1, y: 21.8 };

const MAP_LOCATIONS = [
  { id: 1, name: 'Sea Point Hotels', drive: 6, pin: { x: 58.3, y: 4 }, img: 'https://images.unsplash.com/photo-1650435331525-b97ee2590c3a', alt: 'Sea Point Hotels' },
  { id: 2, name: 'Khoori Special Kabab Restaurant', drive: 5, pin: { x: 81, y: 5 }, img: 'https://img.freepik.com/premium-photo/metro-railway-glass-skyscrapers-dubai-traffic-street-dubai-museum-future-dubai-cityscape-skyline-urban-background_1045819-891.jpg', alt: 'Khoori Restaurant' },
  { id: 3, name: 'Waterfront Market', drive: 9, pin: { x: 65, y: 47 }, img: 'https://s7g10.scene7.com/is/image/barcelo/stopover-in-dubai_dubai-frame', alt: 'Waterfront Market' },
  { id: 4, name: 'Dubai Hospital', drive: 12, pin: { x: 63, y: 62 }, img: 'https://upload.wikimedia.org/wikipedia/commons/0/06/Dubai_Hospital.jpg', alt: 'Dubai Hospital' },
  { id: 5, name: 'ABU HAIL', drive: 8, pin: { x: 70, y: 58 }, img: 'https://saishishirtours.in/wp-content/uploads/2024/12/dubai-famous-architecture.webp', alt: 'Abu Hail' },
  { id: 6, name: 'Century Mall', drive: 14, pin: { x: 89.2, y: 50.5 }, img: 'https://www.viessmann.com.au/content/dam/public-brands/master/references/palm-islands-dubai/Palm-Islands-Dubai-Haeder-16-9-1920x1080px.jpg', alt: 'Century Mall' },
  { id: 7, name: 'Al Hamriya Port', drive: 11, pin: { x: 76.5, y: 27 }, img: 'https://www.shutterstock.com/image-photo/dubai-uae-26012025-wide-angle-600nw-2578467897.jpg', alt: 'Al Hamriya Port' },
  { id: 8, name: 'FRONT', drive: 15, pin: { x: 50, y: 47 }, img: 'https://storage.googleapis.com/images.alltrippers.com/202461204828_jbr-beach-dubai-marina.jpg', alt: 'FRONT' },
  { id: 9, name: 'Al Ittihad Private School', drive: 10, pin: { x: 86.3, y: 26 }, img: 'https://wp-global-media.s3.eu-central-1.amazonaws.com/wp-content/uploads/sites/2/2019/11/saudi-german-hospital-dubai-1633593908468.jpg', alt: 'Al Ittihad School' }
];

const PIN_ICON = `<svg class="pin-icon" viewBox="0 0 16 16" fill="none">
  <path d="M11.5 4.5C11.5 3.83 11.31 3.17 10.94 2.61 10.58 2.04 10.06 1.6 9.45 1.32 8.84 1.04 8.17.94 7.5 1.04 6.84 1.13 6.22 1.41 5.71 1.85 5.2 2.29 4.83 2.87 4.64 3.51 4.45 4.16 4.45 4.84 4.64 5.48 4.83 6.13 5.2 6.7 5.71 7.14 6.21 7.58 6.84 7.87 7.5 7.96V14.5C7.5 14.63 7.55 14.76 7.65 14.85 7.74 14.95 7.87 15 8 15c.13 0 .26-.05.35-.15.1-.09.15-.22.15-.35V7.96c.83-.12 1.59-.53 2.14-1.17C11.2 6.15 11.5 5.34 11.5 4.5zM8 7C7.51 7 7.02 6.85 6.61 6.58 6.2 6.3 5.88 5.91 5.69 5.46 5.5 5 5.45 4.5 5.55 4.01 5.64 3.53 5.88 3.08 6.23 2.73 6.58 2.38 7.03 2.14 7.51 2.05 8 1.95 8.5 2 8.96 2.19 9.41 2.38 9.8 2.7 10.08 3.11 10.35 3.52 10.5 4.01 10.5 4.5c0 .66-.26 1.3-.73 1.77C9.3 6.74 8.66 7 8 7z"/>
</svg>`;

export function MapMarker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const routesSvgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mainLogoRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef<number | null>(null);
  const animationRef = useRef<number | null>(null);
  const routePathsRef = useRef<Map<number, { path: SVGPathElement; length: number }>>(new Map());

  // Helper: calculate bezier curve length
  const getBezierLength = (p0x: number, p0y: number, p1x: number, p1y: number, p2x: number, p2y: number) => {
    let length = 0;
    let px = p0x, py = p0y;
    for (let i = 1; i <= 30; i++) {
      const t = i / 30;
      const mt = 1 - t;
      const x = mt * mt * p0x + 2 * mt * t * p1x + t * t * p2x;
      const y = mt * mt * p0y + 2 * mt * t * p1y + t * t * p2y;
      const dx = x - px, dy = y - py;
      length += Math.hypot(dx, dy);
      px = x; py = y;
    }
    return length;
  };

  // Animation function
  const animateDrawing = (path: SVGPathElement, length: number, duration: number = 1800) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    path.setAttribute('stroke-dashoffset', String(length));
    path.style.strokeDashoffset = String(length);
    
    const startTime = performance.now();
    
    const update = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      let progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 1.5);
      const newOffset = length - (length * eased);
      path.setAttribute('stroke-dashoffset', String(newOffset));
      path.style.strokeDashoffset = String(newOffset);
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(update);
      } else {
        path.setAttribute('stroke-dashoffset', '0');
        path.style.strokeDashoffset = '0';
        animationRef.current = null;
      }
    };
    
    animationRef.current = requestAnimationFrame(update);
  };

  const activateLocation = (id: number) => {
    if (activeIdRef.current === id) return;
    
    // Remove previous highlight
    if (activeIdRef.current !== null) {
      const oldPin = document.querySelector(`.pin[data-id="${activeIdRef.current}"]`);
      if (oldPin) oldPin.classList.remove('hovered');
      const oldSlide = document.querySelector(`.slide[data-id="${activeIdRef.current}"]`);
      if (oldSlide) oldSlide.classList.remove('hovered');
      
      const oldRoute = routePathsRef.current.get(activeIdRef.current);
      if (oldRoute) {
        oldRoute.path.classList.remove('visible');
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
      }
    }
    
    activeIdRef.current = id;
    
    // Highlight new pin
    const pin = document.querySelector(`.pin[data-id="${id}"]`);
    if (pin) pin.classList.add('hovered');
    
    // Highlight new slide
    const slide = document.querySelector(`.slide[data-id="${id}"]`);
    if (slide) {
      slide.classList.add('hovered');
      slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
    
    // Draw route
    const route = routePathsRef.current.get(id);
    if (route) {
      const { path, length } = route;
      path.classList.add('visible');
      animateDrawing(path, length, 1800);
    }
  };

  const deactivateLocation = () => {
    if (activeIdRef.current === null) return;
    
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    const pin = document.querySelector(`.pin[data-id="${activeIdRef.current}"]`);
    if (pin) pin.classList.remove('hovered');
    
    const slide = document.querySelector(`.slide[data-id="${activeIdRef.current}"]`);
    if (slide) slide.classList.remove('hovered');
    
    const route = routePathsRef.current.get(activeIdRef.current);
    if (route) {
      route.path.classList.remove('visible');
    }
    
    activeIdRef.current = null;
  };

  // Initialize everything on mount
  useEffect(() => {
    const container = containerRef.current;
    const svg = routesSvgRef.current;
    const track = trackRef.current;
    
    if (!container || !svg || !track) return;
    
    // Position main logo
    if (mainLogoRef.current) {
      mainLogoRef.current.style.left = MAP_MAIN.x + '%';
      mainLogoRef.current.style.top = MAP_MAIN.y + '%';
    }
    
    // Clear and rebuild
    svg.innerHTML = '';
    track.innerHTML = '';
    routePathsRef.current.clear();
    
    // Create pins and routes
    MAP_LOCATIONS.forEach(loc => {
      // Create pin
      const pin = document.createElement('div');
      pin.className = 'pin';
      pin.setAttribute('data-id', String(loc.id));
      pin.style.left = loc.pin.x + '%';
      pin.style.top = loc.pin.y + '%';
      pin.innerHTML = `<div class="pin-ring">${PIN_ICON}</div>`;
      container.appendChild(pin);
      
      // Create route path
      const midX = (MAP_MAIN.x + loc.pin.x) / 2 + (loc.pin.x > MAP_MAIN.x ? 1.8 : -1.5);
      const midY = Math.min(MAP_MAIN.y, loc.pin.y) - 5.5;
      const d = `M${MAP_MAIN.x} ${MAP_MAIN.y} Q${midX} ${midY} ${loc.pin.x} ${loc.pin.y}`;
      const pathLength = getBezierLength(MAP_MAIN.x, MAP_MAIN.y, midX, midY, loc.pin.x, loc.pin.y);
      
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('class', 'route-line');
      path.setAttribute('d', d);
      path.setAttribute('stroke-dasharray', String(pathLength));
      path.setAttribute('stroke-dashoffset', String(pathLength));
      
      svg.appendChild(path);
      routePathsRef.current.set(loc.id, { path, length: pathLength });
    });
    
    // Create carousel slides
    MAP_LOCATIONS.forEach(loc => {
      const slide = document.createElement('div');
      slide.className = 'slide';
      slide.setAttribute('data-id', String(loc.id));
      slide.innerHTML = `
        <div class="slide-photo">
          <img src="${loc.img}" alt="${loc.alt}" loading="lazy"/>
          <div class="slide-cover"></div>
        </div>
        <div class="slide-body">
          <div class="slide-drive">
            <span class="slide-drive-num">${loc.drive}</span>
            <span class="slide-drive-unit">min by car</span>
          </div>
          <div class="slide-name">${loc.name}</div>
        </div>
      `;
      track.appendChild(slide);
    });
    
    // Add event listeners to pins
    document.querySelectorAll('.pin').forEach(pin => {
      const id = parseInt(pin.getAttribute('data-id') || '0');
      pin.addEventListener('mouseenter', () => activateLocation(id));
      pin.addEventListener('mouseleave', () => {
        setTimeout(() => {
          if (!document.querySelector('.pin:hover') && !document.querySelector('.slide:hover')) {
            deactivateLocation();
          }
        }, 30);
      });
    });
    
    // Add event listeners to slides
    document.querySelectorAll('.slide').forEach(slide => {
      const id = parseInt(slide.getAttribute('data-id') || '0');
      slide.addEventListener('mouseenter', () => activateLocation(id));
      slide.addEventListener('mouseleave', () => {
        setTimeout(() => {
          if (!document.querySelector('.pin:hover') && !document.querySelector('.slide:hover')) {
            deactivateLocation();
          }
        }, 30);
      });
    });
    
    // Carousel drag scroll
    const trackWrap = document.querySelector('.carousel-track-wrap') as HTMLElement;
    if (trackWrap) {
      let drag = false, startX = 0, startT = 0;
      const SLIDE_W = 210;
      let slideIdx = 0;
      
      const getMaxIdx = () => Math.max(0, MAP_LOCATIONS.length - Math.floor(trackWrap.offsetWidth / SLIDE_W));
      const goTo = (i: number) => {
        slideIdx = Math.max(0, Math.min(i, getMaxIdx()));
        track.style.transform = `translateX(-${slideIdx * SLIDE_W}px)`;
      };
      
      const onMouseDown = (e: MouseEvent) => {
        drag = true;
        startX = e.clientX;
        const match = track.style.transform.match(/-?\d+(\.\d+)?/);
        startT = match ? parseFloat(match[0]) : 0;
        track.style.transition = 'none';
      };
      
      const onMouseMove = (e: MouseEvent) => {
        if (!drag) return;
        const newT = Math.min(0, Math.max(startT + e.clientX - startX, -(getMaxIdx() * SLIDE_W)));
        track.style.transform = `translateX(${newT}px)`;
      };
      
      const onMouseUp = () => {
        if (!drag) return;
        drag = false;
        track.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
        const match = track.style.transform.match(/-?\d+(\.\d+)?/);
        goTo(Math.round(Math.abs(match ? parseFloat(match[0]) : 0) / SLIDE_W));
      };
      
      trackWrap.addEventListener('mousedown', onMouseDown);
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      
      return () => {
        trackWrap.removeEventListener('mousedown', onMouseDown);
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="infra" ref={containerRef}>
      {/* Map Image */}
      <img className="map-img" src="/images/dubai-map.png" alt="Dubai Infrastructure Map" />
      
      {/* SVG Routes */}
      <svg className="routes-svg" ref={routesSvgRef} viewBox="0 0 100 100" preserveAspectRatio="none"></svg>
      
      {/* Main Property Logo */}
      <div className="main-logo" ref={mainLogoRef}>
        <div className="main-pulse"></div>
        <div className="main-pin-marker">
          <svg viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="20" fill="#2c3e35" stroke="#e8c88a" strokeWidth="2.5"/>
            <path d="M24 10 L24 38 M10 24 L38 24" stroke="#e8c88a" strokeWidth="2.5" strokeLinecap="round"/>
            <circle cx="24" cy="24" r="6" fill="#e8c88a" stroke="#1e2a25" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="main-label">TREPPAN SERENIQUE</div>
      </div>
      
      {/* Carousel Overlay */}
      <div className="carousel-overlay">
        <div className="carousel-track-wrap">
          <div className="carousel-track" ref={trackRef}></div>
        </div>
      </div>
    </div>
  );
}
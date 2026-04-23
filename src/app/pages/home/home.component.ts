import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit } from '@angular/core';

interface InviteEvent {
  day: string;
  title: string;
  time: string;
  venue: string;
  accent: string;
  note: string;
}

interface HighlightMoment {
  title: string;
  note: string;
}

interface PhotoMoment {
  title: string;
  note: string;
  imageUrl: string;
  stamp: string;
}

interface HeartParticle {
  id: number;
  x: number;
  y: number;
  driftX: number;
  driftY: number;
  rotate: number;
  scale: number;
  duration: number;
  delay: number;
  hue: string;
  size: number;
}

interface GuestExperience {
  title: string;
  note: string;
  accent: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  couple = {
    bride: 'Swati',
    groom: 'Shripad',
    familyLine: 'With the blessings of the Almighty and our beloved elders',
    inviteLine: 'we joyfully invite you to witness the beginning of our forever',
    weddingDate: '2026-05-14T12:24:00+05:30',
    dateLabel: 'Thursday, 14 May 2026',
    locationLabel: 'Kaluthi Kalyan Mantappa, Jamkhandi',
    address: 'Maigur Road, Jamkhandi - 587 301',
    rsvpPhone1: '+91 8884555711',
    rsvpPhone2: '+91 8105440054',
    groomParents: 'Son of Mr. Ishwar & Mrs. Basamma',
    brideParents: 'Daughter of Mr. Gurupad & Mrs. Vishalakshi'
  };

  countdown = [
    { label: 'Days', value: '00' },
    { label: 'Hours', value: '00' },
    { label: 'Minutes', value: '00' },
    { label: 'Seconds', value: '00' }
  ];

  events: InviteEvent[] = [
    {
      day: '13 May',
      title: 'Engagement, Sangeet & Haldi Ceremony',
      time: '6:30 PM onwards',
      venue: 'Kaluthi Kalyan Mantappa',
      accent: 'blush',
      note: 'An evening of music, blessings, and joyful family celebrations.'
    },
    {
      day: '14 May',
      title: 'Muhurtham',
      time: '9:00 AM onwards',
      venue: 'Kaluthi Kalyan Mantappa',
      accent: 'evergreen',
      note: 'The sacred wedding ceremony in the presence of family and friends.'
    },
    {
      day: '14 May',
      title: 'Reception Lunch',
      time: '12:00 Noon onwards',
      venue: 'Kaluthi Kalyan Mantappa',
      accent: 'twilight',
      note: 'A warm gathering to share blessings, joy, and a celebratory meal.'
    }
  ];

  moments: HighlightMoment[] = [
    {
      title: 'The Beginning',
      note: 'From a simple friend request to a lifelong promise — our journey started with a chat that changed everything.'
    },
    {
      title: 'The Proposal',
      note: 'Under a sky full of stars, with hearts full of love, the question was asked… and forever began.'
    },
    {
      title: 'Celebrations Ahead',
      note: 'Join us as we celebrate our union with Haldi, Mehendi, Sangeet, and a beautiful wedding ceremony filled with love and traditions.'
    },
    {
      title: 'Our Big Day',
      note: 'On this special day, surrounded by family and friends, we take our vows and begin a new chapter together.'
    },
    {
      title: 'Memories in the Making',
      note: 'Every smile, every moment, every blessing — we can\'t wait to create unforgettable memories with you.'
    }
  ];

  photoMoments: PhotoMoment[] = [
    {
      title: 'A Walk That Became Forever',
      note: 'Walking side by side, smiling through the little things, we didn\'t just create memories — we built a journey that now leads us to forever.',
      imageUrl: 'assets/Traditional.jpg',
      stamp: 'The Beginning'
    },
    {
      title: 'In Every Glance, A Promise',
      note: 'Some promises were never spoken aloud—they lived quietly in every glance, every smile, and every moment we chose each other without hesitation.',
      imageUrl: 'assets/Garden.jpg',
      stamp: 'Unspoken Vows'
    },
    {
      title: 'Through Every Season',
      note: 'Through every phase, every challenge, and every decision, we stood by each other — laughing, holding on, and never letting go. What we built over the years wasn\'t just love… it was trust, patience, and forever.',
      imageUrl: 'assets/Falls.jpg',
      stamp: 'Still Choosing You'
    },
    {
      title: 'Hands Held, Hearts Certain',
      note: 'What began with a simple hand to hold became the comfort of always knowing we were never walking alone, but toward a shared forever.',
      imageUrl: 'assets/Hand.jpg',
      stamp: 'Together Always'
    },
    {
      title: 'The Life We Dreamed Of',
      note: 'From simple days filled with laughter to dreams we dared to chase together, we turned years of love into a promise for a lifetime. With the blessings of our families, we now celebrate not just our union — but the journey that made it possible.',
      imageUrl: 'assets/Lake.jpg',
      stamp: 'From Then to Now'
    },
    {
      title: 'Step by Step, Side by Side',
      note: 'Through every season, every challenge, and every celebration, we kept choosing the same path—one filled with trust, laughter, and a lifetime ahead.',
      imageUrl: 'assets/Step.jpg',
      stamp: 'Our Journey'
    }
  ];

  hearts: HeartParticle[] = [];
  activePhotoIndex = 0;
  audioEnabled = false;
  audioHint = 'Tap anywhere to start the soothing audio';
  scrollProgress = 0;
  selectedExperienceIndex = 0;
  interactionTitle = 'How will you arrive at the celebration?';
  interactionNote = 'Pick the mood that feels most like you, and we will set the page to match it.';
  copiedPhone = '';
  currentBlessing = 'We are saving a warm place for you in our happiest memories.';

  guestExperiences: GuestExperience[] = [
    {
      title: 'Arrive with family',
      note: 'Set a calm, graceful mood with softer motion and a timeless welcome.',
      accent: 'family'
    },
    {
      title: 'Bring the festive energy',
      note: 'Turn the page a little brighter with a more playful, celebratory feel.',
      accent: 'festive'
    },
    {
      title: 'Send your blessings',
      note: 'Keep the experience gentle and heartfelt, centered on the ceremony itself.',
      accent: 'blessing'
    }
  ];

  blessingMessages = [
    'May your day be filled with sacred vows, warm laughter, and blessings that linger for years.',
    'May every ritual lead to joy, every smile become a memory, and every blessing stay with you always.',
    'Wishing the couple a lifetime of calm mornings, meaningful traditions, and love that only grows deeper.',
    'May this wedding day be the start of a home filled with grace, kindness, and beautiful togetherness.'
  ];

  private timerId?: ReturnType<typeof setInterval>;
  private audioContext?: AudioContext;
  private audioLoopId?: ReturnType<typeof setInterval>;
  // ── Gallery: faster at 3 seconds ──────────────────────────────────────────
  private readonly GALLERY_INTERVAL_MS = 3000;
  private galleryAutoPlayId?: ReturnType<typeof setInterval>;
  private masterGain?: GainNode;
  private lastScrollBurstAt = 0;
  private heartId = 0;
  private revealObserver?: IntersectionObserver;

  // Touch tracking (general document-level trail)
  private touchStartX = 0;
  private touchStartY = 0;
  private lastTouchTrailAt = 0;
  private lastTouchX = 0;
  private lastTouchY = 0;
  private lastMouseTrailAt = 0;
  private isPointerDown = false;

  // ── Gallery swipe tracking ────────────────────────────────────────────────
  private gallerySwipeStartX = 0;
  private gallerySwipeStartY = 0;
  private galleryIsSwiping = false;

  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    this.updateCountdown();
    this.updateScrollProgress();
    this.timerId = setInterval(() => this.updateCountdown(), 1000);
    this.startGalleryAutoPlay();
  }

  ngAfterViewInit(): void {
    this.setupRevealObserver();
    this.setupGallerySwipe();
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    if (this.audioLoopId) {
      clearInterval(this.audioLoopId);
    }

    if (this.galleryAutoPlayId) {
      clearInterval(this.galleryAutoPlayId);
    }

    if (this.revealObserver) {
      this.revealObserver.disconnect();
    }

    if (this.audioContext) {
      this.audioContext.close();
    }
  }

  trackByTitle(_: number, item: InviteEvent | HighlightMoment | PhotoMoment): string {
    return item.title;
  }

  trackByHeart(_: number, heart: HeartParticle): number {
    return heart.id;
  }

  toggleAudio(): void {
    if (this.audioEnabled) {
      this.stopAudio();
      return;
    }
    this.startAudio();
  }

  nextPhoto(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.activePhotoIndex = (this.activePhotoIndex + 1) % this.photoMoments.length;
    this.restartGalleryAutoPlay();
  }

  previousPhoto(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.activePhotoIndex = (this.activePhotoIndex - 1 + this.photoMoments.length) % this.photoMoments.length;
    this.restartGalleryAutoPlay();
  }

  setPhoto(index: number, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.activePhotoIndex = index;
    this.restartGalleryAutoPlay();
  }

  selectExperience(index: number, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.selectedExperienceIndex = index;

    if (index === 0) {
      this.interactionTitle = 'A graceful arrival suits this celebration beautifully.';
      this.interactionNote = 'We softened the mood a little for guests who want a more traditional, intimate feel.';
    } else if (index === 1) {
      this.interactionTitle = 'The page is ready for a joyful entrance.';
      this.interactionNote = 'A brighter celebratory mood pairs perfectly with sangeet smiles and big family energy.';
      this.createHeartBurst(window.innerWidth * 0.5, window.innerHeight * 0.45, 18);
    } else {
      this.interactionTitle = 'Your blessings are the most beautiful part of the day.';
      this.interactionNote = 'This mode keeps the focus on warmth, love, and the promise of the ceremony ahead.';
    }
  }

  surpriseBlessing(event?: Event): void {
    var blessingIndex = Math.floor(Math.random() * this.blessingMessages.length);
    this.currentBlessing = this.blessingMessages[blessingIndex];
    this.createHeartBurst(window.innerWidth * 0.5, window.innerHeight * 0.35, 14);
  }

  copyPhone(phone: string, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      this.copiedPhone = 'Copy is not supported on this browser';
      return;
    }

    navigator.clipboard.writeText(phone).then(() => {
      this.copiedPhone = 'Copied ' + phone;
    }).catch(() => {
      this.copiedPhone = 'Unable to copy right now';
    });
  }

  pauseGalleryAutoPlay(): void {
    if (!this.galleryAutoPlayId) {
      return;
    }
    clearInterval(this.galleryAutoPlayId);
    this.galleryAutoPlayId = undefined;
  }

  resumeGalleryAutoPlay(): void {
    this.startGalleryAutoPlay();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateScrollProgress();
    this.emitScrollHearts();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.startAudio();
    this.createHeartBurst(event.clientX, event.clientY, 8, 'tap');
  }

  @HostListener('document:mousedown')
  onMouseDown(): void {
    this.isPointerDown = true;
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    this.isPointerDown = false;
  }

  @HostListener('document:mouseleave')
  onMouseLeave(): void {
    this.isPointerDown = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    var now = Date.now();
    if (!this.isPointerDown || now - this.lastMouseTrailAt < 40) {
      return;
    }
    this.lastMouseTrailAt = now;
    this.createHeartBurst(event.clientX, event.clientY, 2, 'trail');
  }

  @HostListener('document:touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    if (!event.touches.length) {
      return;
    }
    var touch = event.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;
    this.lastTouchX = touch.clientX;
    this.lastTouchY = touch.clientY;
    this.lastTouchTrailAt = Date.now();
    this.startAudio();
    this.createHeartBurst(touch.clientX, touch.clientY, 6, 'tap');
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event: TouchEvent): void {
    if (!event.touches.length) {
      return;
    }
    var touch = event.touches[0];
    var now = Date.now();
    if (now - this.lastTouchTrailAt < 50) {
      this.lastTouchX = touch.clientX;
      this.lastTouchY = touch.clientY;
      return;
    }
    this.lastTouchTrailAt = now;
    this.createHeartTrail(this.lastTouchX, this.lastTouchY, touch.clientX, touch.clientY, 4);
    this.lastTouchX = touch.clientX;
    this.lastTouchY = touch.clientY;
  }

  @HostListener('document:touchend', ['$event'])
  onTouchEnd(): void {
    var deltaX = this.lastTouchX - this.touchStartX;
    var deltaY = this.lastTouchY - this.touchStartY;
    var distance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY));

    if (distance < 30) {
      return;
    }
    this.createSwipeHearts(this.touchStartX, this.touchStartY, this.lastTouchX, this.lastTouchY);
  }

  // ── Gallery swipe setup (native touch on the gallery element) ─────────────
  private setupGallerySwipe(): void {
    var galleryEl = this.elementRef.nativeElement.querySelector('.gallery-stage');
    if (!galleryEl) {
      return;
    }

    galleryEl.addEventListener('touchstart', (e: Event) => {
      var te = e as TouchEvent;
      if (!te.touches.length) { return; }
      this.gallerySwipeStartX = te.touches[0].clientX;
      this.gallerySwipeStartY = te.touches[0].clientY;
      this.galleryIsSwiping = true;
      this.pauseGalleryAutoPlay();
    }, { passive: true });

    galleryEl.addEventListener('touchmove', (e: Event) => {
      // Prevent vertical scroll only when clearly swiping horizontally
      var te = e as TouchEvent;
      if (!this.galleryIsSwiping || !te.touches.length) { return; }
      var dx = Math.abs(te.touches[0].clientX - this.gallerySwipeStartX);
      var dy = Math.abs(te.touches[0].clientY - this.gallerySwipeStartY);
      if (dx > dy && dx > 10) {
        e.stopPropagation();
      }
    }, { passive: true });

    galleryEl.addEventListener('touchend', (e: Event) => {
      if (!this.galleryIsSwiping) { return; }
      var te = e as TouchEvent;
      var endX = te.changedTouches.length ? te.changedTouches[0].clientX : this.gallerySwipeStartX;
      var dx = endX - this.gallerySwipeStartX;
      var threshold = 50;

      if (Math.abs(dx) >= threshold) {
        if (dx < 0) {
          this.nextPhoto();
        } else {
          this.previousPhoto();
        }
      }

      this.galleryIsSwiping = false;
      this.startGalleryAutoPlay();
    }, { passive: true });
  }

  private updateCountdown(): void {
    var target = new Date(this.couple.weddingDate).getTime();
    var difference = target - Date.now();

    if (difference < 0) {
      this.countdown = [
        { label: 'Days', value: '00' },
        { label: 'Hours', value: '00' },
        { label: 'Minutes', value: '00' },
        { label: 'Seconds', value: '00' }
      ];
      return;
    }

    var days = Math.floor(difference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    var minutes = Math.floor((difference / (1000 * 60)) % 60);
    var seconds = Math.floor((difference / 1000) % 60);

    this.countdown = [
      { label: 'Days', value: this.padValue(days) },
      { label: 'Hours', value: this.padValue(hours) },
      { label: 'Minutes', value: this.padValue(minutes) },
      { label: 'Seconds', value: this.padValue(seconds) }
    ];
  }

  private updateScrollProgress(): void {
    var scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) {
      this.scrollProgress = 0;
      return;
    }
    this.scrollProgress = Math.min(window.scrollY / scrollHeight, 1);
  }

  private padValue(value: number): string {
    return value.toString().padStart(2, '0');
  }

  private createHeartBurst(x: number, y: number, count: number, mode: 'burst' | 'tap' | 'trail' = 'burst'): void {
    for (var index = 0; index < count; index += 1) {
      var isTrail = mode === 'trail';
      var isTap = mode === 'tap';
      var particle: HeartParticle = {
        id: this.heartId++,
        x: x,
        y: y,
        driftX: isTrail ? this.randomBetween(-14, 14) : isTap ? this.randomBetween(-26, 26) : this.randomBetween(-70, 70),
        driftY: isTrail ? this.randomBetween(-24, 10) : isTap ? this.randomBetween(-40, -6) : this.randomBetween(-120, -28),
        rotate: this.randomBetween(-25, 25),
        scale: isTrail ? this.randomBetween(0.62, 0.88) : isTap ? this.randomBetween(0.72, 1.02) : this.randomBetween(0.78, 1.14),
        duration: isTrail ? this.randomBetween(520, 860) : isTap ? this.randomBetween(680, 980) : this.randomBetween(900, 1450),
        delay: this.randomBetween(0, isTrail ? 60 : 120),
        hue: this.pickHeartColor(),
        size: isTrail ? this.randomBetween(0.42, 0.58) : isTap ? this.randomBetween(0.5, 0.68) : this.randomBetween(0.56, 0.74)
      };

      this.hearts = this.hearts.concat(particle);
      this.clearHeartLater(particle.id, particle.duration + particle.delay + 120);
    }
  }

  private createHeartTrail(startX: number, startY: number, endX: number, endY: number, count: number): void {
    for (var index = 0; index < count; index += 1) {
      var progress = count === 1 ? 1 : index / (count - 1);
      var x = startX + ((endX - startX) * progress);
      var y = startY + ((endY - startY) * progress);
      this.createHeartBurst(x, y, 1, 'trail');
    }
  }

  private createSwipeHearts(startX: number, startY: number, endX: number, endY: number): void {
    var steps = 8;
    for (var index = 0; index < steps; index += 1) {
      var progress = index / (steps - 1);
      var x = startX + ((endX - startX) * progress);
      var y = startY + ((endY - startY) * progress);
      this.createHeartBurst(x, y, 2, 'trail');
    }
    this.createHeartBurst(endX, endY, 8, 'tap');
  }

  private clearHeartLater(id: number, duration: number): void {
    setTimeout(() => {
      this.hearts = this.hearts.filter((heart) => heart.id !== id);
    }, duration);
  }

  private emitScrollHearts(): void {
    var now = Date.now();
    if (now - this.lastScrollBurstAt < 320) {
      return;
    }
    this.lastScrollBurstAt = now;
    this.createHeartBurst(window.innerWidth * 0.82, window.innerHeight * 0.82, 3, 'trail');
  }

  private startGalleryAutoPlay(): void {
    if (this.galleryAutoPlayId || this.photoMoments.length < 2) {
      return;
    }
    // ── Faster: 3 seconds ───────────────────────────────────────────────────
    this.galleryAutoPlayId = setInterval(() => this.nextPhoto(), this.GALLERY_INTERVAL_MS);
  }

  private restartGalleryAutoPlay(): void {
    this.pauseGalleryAutoPlay();
    this.startGalleryAutoPlay();
  }

  private setupRevealObserver(): void {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      return;
    }

    var elements = this.elementRef.nativeElement.querySelectorAll('.reveal-on-scroll');
    this.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          this.revealObserver?.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px'
    });

    elements.forEach((element) => this.revealObserver?.observe(element));
  }

  private startAudio(): void {
    var AudioContextCtor = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextCtor) {
      this.audioHint = 'Ambient audio is not supported on this browser';
      return;
    }

    if (!this.audioContext) {
      this.audioContext = new AudioContextCtor();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = 0.028;
      this.masterGain.connect(this.audioContext.destination);
      this.startAudioLoop();
    }

    this.audioContext.resume().then(() => {
      this.audioEnabled = true;
      this.audioHint = 'Ambient audio is on';
    }).catch(() => {
      this.audioHint = 'Tap the page once to allow ambient audio';
    });
  }

  private stopAudio(): void {
    if (!this.audioContext) {
      return;
    }
    this.audioContext.suspend().then(() => {
      this.audioEnabled = false;
      this.audioHint = 'Ambient audio is paused';
    });
  }

  private startAudioLoop(): void {
    if (!this.audioContext || !this.masterGain || this.audioLoopId) {
      return;
    }
    this.playAmbientChord();
    this.audioLoopId = setInterval(() => this.playAmbientChord(), 2600);
  }

  private playAmbientChord(): void {
    if (!this.audioContext || !this.masterGain) {
      return;
    }
    var notes = [220, 261.63, 329.63, 392, 440, 523.25];
    var root = notes[Math.floor(Math.random() * notes.length)];
    var now = this.audioContext.currentTime;
    this.playTone(root, now, 2.6, 0.022, 'sine');
    this.playTone(root * 1.5, now + 0.12, 2.1, 0.012, 'triangle');
    this.playTone(root / 2, now, 2.8, 0.009, 'sine');
  }

  private playTone(
    frequency: number,
    startAt: number,
    duration: number,
    volume: number,
    type: OscillatorType
  ): void {
    // if (!this.audioContext || !this.masterGain) {
    //   return;
    // }
    // var oscillator = this.audioContext.createOscillator();
    // var gain = this.audioContext.createGain();
    // oscillator.type = type;
    // oscillator.frequency.setValueAtTime(frequency, startAt);
    // gain.gain.setValueAtTime(0.0001, startAt);
    // gain.gain.linearRampToValueAtTime(volume, startAt + 0.45);
    // gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
    // oscillator.connect(gain);
    // gain.connect(this.masterGain);
    // oscillator.start(startAt);
    // oscillator.stop(startAt + duration);
  }

  private randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  // ── Reddish/crimson hearts instead of purple ──────────────────────────────
  private pickHeartColor(): string {
    var colors = [
      '#c0392b',  // crimson
      '#e74c3c',  // bright red
      '#a93226',  // deep red
      '#e8556d',  // warm rose-red
      '#b03a4b',  // muted red
      '#d44e6a'   // rose-red
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}
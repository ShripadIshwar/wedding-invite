import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

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
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
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
    note: 'Every smile, every moment, every blessing — we can’t wait to create unforgettable memories with you.'
  }
];

  photoMoments: PhotoMoment[] = [
    {
      title: 'A Walk That Became Forever',
      note: 'Walking side by side, smiling through the little things, we didn’t just create memories — we built a journey that now leads us to forever.',
      imageUrl: 'assets/Traditional.jpg',
      stamp: 'The Beginning'
    },
    {
      title: 'Through Every Season',
      note: 'Through every phase, every challenge, and every decision, we stood by each other — laughing, holding on, and never letting go. What we built over the years wasn’t just love… it was trust, patience, and forever.',
      imageUrl: 'assets/Falls.jpg',
      stamp: 'Still Choosing You'
    },
    {
      title: 'The Life We Dreamed Of',
      note: 'From simple days filled with laughter to dreams we dared to chase together, we turned years of love into a promise for a lifetime. With the blessings of our families, we now celebrate not just our union — but the journey that made it possible.',
      imageUrl: 'assets/Lake.jpg',
      stamp: 'From Then to Now'
    }
  ];

  hearts: HeartParticle[] = [];
  activePhotoIndex = 0;
  audioEnabled = false;
  audioHint = 'Tap anywhere to start the soothing audio';

  private timerId?: ReturnType<typeof setInterval>;
  private audioContext?: AudioContext;
  private audioLoopId?: ReturnType<typeof setInterval>;
  private masterGain?: GainNode;
  private lastScrollBurstAt = 0;
  private heartId = 0;

  ngOnInit(): void {
    this.updateCountdown();
    this.timerId = setInterval(() => this.updateCountdown(), 1000);
    setTimeout(() => this.startAudio(), 400);
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }

    if (this.audioLoopId) {
      clearInterval(this.audioLoopId);
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
  }

  previousPhoto(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.activePhotoIndex = (this.activePhotoIndex - 1 + this.photoMoments.length) % this.photoMoments.length;
  }

  setPhoto(index: number, event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    this.activePhotoIndex = index;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.emitScrollHearts();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    this.startAudio();
    this.createHeartBurst(event.clientX, event.clientY, 10);
  }

  @HostListener('document:touchstart', ['$event'])
  onTouchStart(event: TouchEvent): void {
    if (!event.touches.length) {
      return;
    }

    var touch = event.touches[0];
    this.startAudio();
    this.createHeartBurst(touch.clientX, touch.clientY, 10);
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

  private padValue(value: number): string {
    return value.toString().padStart(2, '0');
  }

  private createHeartBurst(x: number, y: number, count: number): void {
    for (var index = 0; index < count; index += 1) {
      var particle: HeartParticle = {
        id: this.heartId++,
        x: x,
        y: y,
        driftX: this.randomBetween(-90, 90),
        driftY: this.randomBetween(-140, -40),
        rotate: this.randomBetween(-35, 35),
        scale: this.randomBetween(0.8, 1.5),
        duration: this.randomBetween(900, 1600),
        delay: this.randomBetween(0, 140),
        hue: this.pickHeartColor()
      };

      this.hearts = this.hearts.concat(particle);
      this.clearHeartLater(particle.id, particle.duration + particle.delay + 120);
    }
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
    this.createHeartBurst(window.innerWidth * 0.82, window.innerHeight * 0.82, 4);
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
    if (!this.audioContext || !this.masterGain) {
      return;
    }

    var oscillator = this.audioContext.createOscillator();
    var gain = this.audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, startAt);
    gain.gain.setValueAtTime(0.0001, startAt);
    gain.gain.linearRampToValueAtTime(volume, startAt + 0.45);
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);

    oscillator.connect(gain);
    gain.connect(this.masterGain);
    oscillator.start(startAt);
    oscillator.stop(startAt + duration);
  }

  private randomBetween(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }

  private pickHeartColor(): string {
    var colors = ['#f08aa0', '#ec6f8f', '#f6ad7b', '#f4c56a', '#d57d9f'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

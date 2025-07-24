# DESIGN SYSTEM CONTEXT - QURANIC ETYMOLOGY EXPLORER

## DESIGN PHILOSOPHY

### Core Principles
```yaml
Academic Credibility:
  - Clean, professional aesthetic
  - Scholarly color palette
  - High-quality typography
  - Academic citation standards

Cultural Sensitivity:
  - Respectful Arabic typography
  - Islamic design patterns (geometric)
  - Appropriate color symbolism
  - Conservative visual approach

User Experience:
  - Accessibility-first design
  - Mobile-responsive layouts
  - Clear information hierarchy
  - Intuitive navigation patterns

Educational Focus:
  - Learning-oriented interactions
  - Progress visualization
  - Knowledge building patterns
  - Research transparency
```

## COLOR SYSTEM

### Primary Palette
```css
:root {
  /* Primary Blues - Academic & Trustworthy */
  --primary-50: #eff6ff;
  --primary-100: #dbeafe;
  --primary-200: #bfdbfe;
  --primary-300: #93c5fd;
  --primary-400: #60a5fa;
  --primary-500: #3b82f6;  /* Main brand color */
  --primary-600: #2563eb;
  --primary-700: #1d4ed8;  /* Dark accents */
  --primary-800: #1e40af;
  --primary-900: #1e3a8a;

  /* Academic Gold - Highlights & Success */
  --accent-50: #fffbeb;
  --accent-100: #fef3c7;
  --accent-200: #fde68a;
  --accent-300: #fcd34d;
  --accent-400: #fbbf24;
  --accent-500: #f59e0b;   /* Main accent */
  --accent-600: #d97706;
  --accent-700: #b45309;
  --accent-800: #92400e;
  --accent-900: #78350f;

  /* Neutral Grays - Text & Backgrounds */
  --gray-50: #f9fafb;
  --gray-100: #f3f4f6;
  --gray-200: #e5e7eb;
  --gray-300: #d1d5db;
  --gray-400: #9ca3af;
  --gray-500: #6b7280;
  --gray-600: #4b5563;     /* Body text */
  --gray-700: #374151;     /* Headings */
  --gray-800: #1f2937;
  --gray-900: #111827;     /* Dark text */
}
```

### Semantic Colors
```css
:root {
  /* Success - Research completed */
  --success-50: #ecfdf5;
  --success-500: #10b981;
  --success-700: #047857;

  /* Warning - Confidence levels */
  --warning-50: #fffbeb;
  --warning-500: #f59e0b;
  --warning-700: #b45309;

  /* Error - Failed operations */
  --error-50: #fef2f2;
  --error-500: #ef4444;
  --error-700: #b91c1c;

  /* Info - Additional context */
  --info-50: #eff6ff;
  --info-500: #3b82f6;
  --info-700: #1d4ed8;
}
```

### Cultural Color Considerations
```css
/* Islamic Color Symbolism */
:root {
  --islamic-green: #0d7f3e;    /* Traditional Islamic green */
  --arabic-gold: #d4af37;      /* Classical Arabic manuscripts */
  --calligraphy-black: #2c2c2c; /* Traditional ink color */
  --manuscript-cream: #f8f6f0;  /* Aged paper background */
}
```

## TYPOGRAPHY SYSTEM

### Font Families
```css
:root {
  /* English Text */
  --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-serif: 'Crimson Text', Georgia, serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Arabic Text */
  --font-arabic-modern: 'Noto Sans Arabic', 'Helvetica Neue', sans-serif;
  --font-arabic-traditional: 'Amiri', 'Times New Roman', serif;
  --font-arabic-calligraphy: 'Scheherazade New', 'Amiri', serif;

  /* Specialized */
  --font-academic: 'Crimson Text', Georgia, serif;    /* Citations & formal text */
  --font-ui: 'Inter', system-ui, sans-serif;          /* Interface elements */
}
```

### Type Scale
```css
:root {
  /* Font Sizes */
  --text-xs: 0.75rem;      /* 12px - Captions */
  --text-sm: 0.875rem;     /* 14px - Small text */
  --text-base: 1rem;       /* 16px - Body text */
  --text-lg: 1.125rem;     /* 18px - Large body */
  --text-xl: 1.25rem;      /* 20px - Small headings */
  --text-2xl: 1.5rem;      /* 24px - Section headings */
  --text-3xl: 1.875rem;    /* 30px - Page headings */
  --text-4xl: 2.25rem;     /* 36px - Hero headings */
  --text-5xl: 3rem;        /* 48px - Display headings */

  /* Arabic Text Scaling (larger for readability) */
  --arabic-sm: 1rem;       /* 16px */
  --arabic-base: 1.25rem;  /* 20px */
  --arabic-lg: 1.5rem;     /* 24px */
  --arabic-xl: 2rem;       /* 32px */
  --arabic-2xl: 2.5rem;    /* 40px */
  --arabic-3xl: 3rem;      /* 48px */

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* Letter Spacing */
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
}
```

### Typography Components
```css
/* Heading Styles */
.heading-1 {
  font-family: var(--font-serif);
  font-size: var(--text-4xl);
  font-weight: 700;
  line-height: var(--leading-tight);
  color: var(--gray-900);
}

.heading-2 {
  font-family: var(--font-serif);
  font-size: var(--text-3xl);
  font-weight: 600;
  line-height: var(--leading-snug);
  color: var(--gray-800);
}

.heading-3 {
  font-family: var(--font-sans);
  font-size: var(--text-2xl);
  font-weight: 600;
  line-height: var(--leading-snug);
  color: var(--gray-700);
}

/* Arabic Text Styles */
.arabic-primary {
  font-family: var(--font-arabic-modern);
  font-size: var(--arabic-xl);
  font-weight: 400;
  line-height: var(--leading-relaxed);
  direction: rtl;
  text-align: right;
}

.arabic-calligraphy {
  font-family: var(--font-arabic-calligraphy);
  font-size: var(--arabic-2xl);
  font-weight: 400;
  line-height: var(--leading-loose);
  direction: rtl;
  text-align: center;
  color: var(--calligraphy-black);
}

/* Body Text */
.body-text {
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: 400;
  line-height: var(--leading-relaxed);
  color: var(--gray-600);
}

.body-text-large {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: 400;
  line-height: var(--leading-relaxed);
  color: var(--gray-600);
}

/* Academic Citations */
.citation {
  font-family: var(--font-academic);
  font-size: var(--text-sm);
  font-style: italic;
  color: var(--gray-500);
}
```

## SPACING SYSTEM

### Spacing Scale
```css
:root {
  /* Base spacing unit: 4px */
  --space-px: 1px;
  --space-0: 0;
  --space-0-5: 0.125rem;  /* 2px */
  --space-1: 0.25rem;     /* 4px */
  --space-1-5: 0.375rem;  /* 6px */
  --space-2: 0.5rem;      /* 8px */
  --space-2-5: 0.625rem;  /* 10px */
  --space-3: 0.75rem;     /* 12px */
  --space-3-5: 0.875rem;  /* 14px */
  --space-4: 1rem;        /* 16px */
  --space-5: 1.25rem;     /* 20px */
  --space-6: 1.5rem;      /* 24px */
  --space-7: 1.75rem;     /* 28px */
  --space-8: 2rem;        /* 32px */
  --space-9: 2.25rem;     /* 36px */
  --space-10: 2.5rem;     /* 40px */
  --space-11: 2.75rem;    /* 44px */
  --space-12: 3rem;       /* 48px */
  --space-14: 3.5rem;     /* 56px */
  --space-16: 4rem;       /* 64px */
  --space-20: 5rem;       /* 80px */
  --space-24: 6rem;       /* 96px */
  --space-28: 7rem;       /* 112px */
  --space-32: 8rem;       /* 128px */
}
```

### Layout Spacing
```css
:root {
  /* Component spacing */
  --component-padding-sm: var(--space-3);
  --component-padding-md: var(--space-4);
  --component-padding-lg: var(--space-6);
  --component-padding-xl: var(--space-8);

  /* Section spacing */
  --section-margin-sm: var(--space-8);
  --section-margin-md: var(--space-12);
  --section-margin-lg: var(--space-16);
  --section-margin-xl: var(--space-24);

  /* Container spacing */
  --container-padding: var(--space-4);
  --container-margin: var(--space-6);
}
```

## COMPONENT DESIGN TOKENS

### Border Radius
```css
:root {
  --radius-none: 0;
  --radius-sm: 0.125rem;    /* 2px */
  --radius-base: 0.25rem;   /* 4px */
  --radius-md: 0.375rem;    /* 6px */
  --radius-lg: 0.5rem;      /* 8px */
  --radius-xl: 0.75rem;     /* 12px */
  --radius-2xl: 1rem;       /* 16px */
  --radius-3xl: 1.5rem;     /* 24px */
  --radius-full: 9999px;    /* Fully rounded */
}
```

### Shadows
```css
:root {
  /* Card shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
  --shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

  /* Inner shadows */
  --shadow-inner: inset 0 2px 4px 0 rgb(0 0 0 / 0.05);

  /* Colored shadows */
  --shadow-primary: 0 4px 14px 0 rgb(59 130 246 / 0.25);
  --shadow-accent: 0 4px 14px 0 rgb(245 158 11 / 0.25);
}
```

### Transitions
```css
:root {
  /* Duration */
  --duration-75: 75ms;
  --duration-100: 100ms;
  --duration-150: 150ms;
  --duration-200: 200ms;
  --duration-300: 300ms;
  --duration-500: 500ms;
  --duration-700: 700ms;
  --duration-1000: 1000ms;

  /* Easing */
  --ease-linear: linear;
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);

  /* Common transitions */
  --transition-colors: color var(--duration-150) var(--ease-in-out),
                       background-color var(--duration-150) var(--ease-in-out),
                       border-color var(--duration-150) var(--ease-in-out);
  --transition-opacity: opacity var(--duration-150) var(--ease-in-out);
  --transition-transform: transform var(--duration-150) var(--ease-in-out);
  --transition-all: all var(--duration-150) var(--ease-in-out);
}
```

## UI COMPONENT PATTERNS

### Button Variants
```css
/* Primary Button */
.btn-primary {
  background-color: var(--primary-600);
  color: white;
  border: 1px solid var(--primary-600);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: var(--transition-colors);
}

.btn-primary:hover {
  background-color: var(--primary-700);
  border-color: var(--primary-700);
}

.btn-primary:focus {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Secondary Button */
.btn-secondary {
  background-color: var(--gray-100);
  color: var(--gray-700);
  border: 1px solid var(--gray-300);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: var(--transition-colors);
}

.btn-secondary:hover {
  background-color: var(--gray-200);
  border-color: var(--gray-400);
}

/* Outline Button */
.btn-outline {
  background-color: transparent;
  color: var(--primary-600);
  border: 1px solid var(--primary-600);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: var(--transition-colors);
}

.btn-outline:hover {
  background-color: var(--primary-50);
}
```

### Card Components
```css
/* Base Card */
.card {
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-base);
  padding: var(--space-6);
  transition: var(--transition-all);
}

.card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-1px);
}

/* Word Card */
.word-card {
  background: linear-gradient(135deg, var(--gray-50) 0%, white 100%);
  border: 1px solid var(--gray-200);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  transition: var(--transition-all);
  position: relative;
  overflow: hidden;
}

.word-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-500), var(--accent-500));
}

/* Video Card */
.video-card {
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-base);
  overflow: hidden;
  transition: var(--transition-all);
}

.video-card:hover {
  box-shadow: var(--shadow-lg);
  transform: scale(1.02);
}
```

### Form Elements
```css
/* Input Fields */
.input {
  width: 100%;
  padding: var(--space-3) var(--space-4);
  border: 1px solid var(--gray-300);
  border-radius: var(--radius-md);
  font-size: var(--text-base);
  transition: var(--transition-colors);
  background-color: white;
}

.input:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgb(59 130 246 / 0.1);
}

.input:disabled {
  background-color: var(--gray-50);
  color: var(--gray-400);
  cursor: not-allowed;
}

/* Arabic Input */
.input-arabic {
  font-family: var(--font-arabic-modern);
  font-size: var(--arabic-base);
  direction: rtl;
  text-align: right;
}

/* Select Dropdown */
.select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
  background-position: right var(--space-3) center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: var(--space-10);
}
```

## RESPONSIVE DESIGN SYSTEM

### Breakpoint Utilities
```css
/* Mobile First Approach */
.mobile-only {
  display: block;
}

@media (min-width: 768px) {
  .mobile-only {
    display: none;
  }
  
  .tablet-up {
    display: block;
  }
}

@media (min-width: 1024px) {
  .desktop-up {
    display: block;
  }
}

/* Container Sizes */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-4);
  padding-right: var(--space-4);
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    padding-left: var(--space-6);
    padding-right: var(--space-6);
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
```

### Grid System
```css
/* Flexible Grid */
.grid {
  display: grid;
  gap: var(--space-6);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }

/* Responsive Grid */
@media (min-width: 768px) {
  .md\\:grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
  .md\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
}

@media (min-width: 1024px) {
  .lg\\:grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
  .lg\\:grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
}
```

## ACCESSIBILITY DESIGN PATTERNS

### Focus Management
```css
/* Focus Styles */
.focus-ring {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus-ring:focus {
  outline: 2px solid var(--primary-500);
  outline-offset: 2px;
}

/* Skip Links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: var(--primary-600);
  color: white;
  padding: 8px;
  border-radius: 4px;
  text-decoration: none;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

### Color Contrast
```css
/* High Contrast Mode */
@media (prefers-contrast: high) {
  :root {
    --primary-500: #0066cc;
    --gray-600: #000000;
    --gray-500: #333333;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## LAYOUT PATTERNS

### Page Layouts
```css
/* Main Layout */
.main-layout {
  min-height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header"
    "main"
    "footer";
}

.main-header {
  grid-area: header;
  position: sticky;
  top: 0;
  z-index: 40;
  background-color: white;
  border-bottom: 1px solid var(--gray-200);
}

.main-content {
  grid-area: main;
  container-type: inline-size;
}

.main-footer {
  grid-area: footer;
  background-color: var(--gray-50);
  border-top: 1px solid var(--gray-200);
}

/* Sidebar Layout */
.sidebar-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 1024px) {
  .sidebar-layout {
    grid-template-columns: 256px 1fr;
  }
}
```

### Content Layouts
```css
/* Two-Column Content */
.content-two-column {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
}

@media (min-width: 768px) {
  .content-two-column {
    grid-template-columns: 2fr 1fr;
    gap: var(--space-12);
  }
}

/* Three-Column Content */
.content-three-column {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
}

@media (min-width: 768px) {
  .content-three-column {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .content-three-column {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

This design system provides a comprehensive foundation for creating consistent, accessible, and culturally appropriate user interfaces for the Quranic Etymology Explorer project.
# FRONTEND COMPONENTS CONTEXT - QURANIC ETYMOLOGY EXPLORER

## LOVABLE DEVELOPMENT SPECIFICATIONS

### PROJECT STRUCTURE
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── Layout.tsx
│   ├── search/
│   │   ├── SearchBar.tsx
│   │   ├── SearchFilters.tsx
│   │   ├── SearchResults.tsx
│   │   └── SemanticSearch.tsx
│   ├── word/
│   │   ├── WordCard.tsx
│   │   ├── WordDetail.tsx
│   │   ├── EtymologyTree.tsx
│   │   ├── FrequencyChart.tsx
│   │   └── OccurrencesList.tsx
│   ├── video/
│   │   ├── VideoPlayer.tsx
│   │   ├── VideoGallery.tsx
│   │   ├── VideoCard.tsx
│   │   └── VideoMetadata.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   ├── Tabs.tsx
│   │   └── Loading.tsx
│   └── arabic/
│       ├── ArabicText.tsx
│       ├── RootHighlighter.tsx
│       ├── PronunciationGuide.tsx
│       └── CalligraphyDisplay.tsx
├── hooks/
│   ├── useSupabase.ts
│   ├── useWordData.ts
│   ├── useSearch.ts
│   └── useAnalytics.ts
├── utils/
│   ├── arabic.ts
│   ├── formatting.ts
│   └── analytics.ts
└── types/
    ├── word.ts
    ├── video.ts
    └── api.ts
```

## CORE COMPONENT SPECIFICATIONS

### 1. LAYOUT COMPONENTS

#### Header Component
```typescript
interface HeaderProps {
  currentPath?: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

Features:
  - Responsive navigation menu
  - Integrated search bar with Arabic support
  - Language toggle (Arabic/English)
  - User authentication state
  - Breadcrumb navigation
  - Mobile hamburger menu

Responsive Breakpoints:
  - Mobile: < 768px (stacked navigation)
  - Tablet: 768px - 1024px (condensed navigation)
  - Desktop: > 1024px (full navigation)

Accessibility:
  - Skip navigation links
  - Keyboard navigation support
  - Screen reader announcements
  - High contrast mode support
```

#### Footer Component
```typescript
interface FooterProps {
  showNewsletter?: boolean;
  showSocialLinks?: boolean;
}

Content Sections:
  - About the project
  - Academic resources
  - Contact information
  - Privacy policy
  - Terms of service
  - Social media links
  - Newsletter signup

Features:
  - Newsletter subscription
  - Social media integration
  - Sitemap links
  - Academic citations
  - Copyright information
```

### 2. SEARCH COMPONENTS

#### Advanced Search Bar
```typescript
interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string, filters?: SearchFilters) => void;
  suggestions?: string[];
  autoComplete?: boolean;
  arabicKeyboard?: boolean;
}

Features:
  - Auto-suggestions dropdown
  - Arabic keyboard toggle
  - Voice search (Web Speech API)
  - Recent searches history
  - Quick filters (word type, frequency)
  - Search syntax hints

States:
  - Idle: Ready for input
  - Typing: Shows suggestions
  - Searching: Loading indicator
  - Results: Display results count
  - Error: Show error message

Arabic Support:
  - RTL text direction
  - Arabic font rendering
  - Diacritics handling
  - Keyboard layout switching
```

#### Search Filters Component
```typescript
interface SearchFiltersProps {
  onFilterChange: (filters: SearchFilters) => void;
  initialFilters?: SearchFilters;
  availableFilters: FilterOption[];
}

Filter Categories:
  - Word Type: noun, verb, particle, etc.
  - Frequency: unique, rare, common, frequent
  - Root Letters: 3-letter combinations
  - Semantic Field: theology, nature, social, etc.
  - Surah: dropdown with all 114 chapters
  - Revelation Period: Meccan, Medinan

Features:
  - Multi-select checkboxes
  - Range sliders for frequency
  - Tag-based filter display
  - Clear all filters
  - Save filter presets
  - Filter result counts
```

### 3. WORD ANALYSIS COMPONENTS

#### Word Detail Component
```typescript
interface WordDetailProps {
  wordId: string;
  autoPlay?: boolean;
  showRelated?: boolean;
}

Layout Structure:
  - Header: Arabic word + pronunciation
  - Statistics: frequency, occurrences, confidence
  - Tabbed Content:
    1. Etymology & Origins
    2. Quranic Usage
    3. Related Words
    4. Learning Resources

Interactive Features:
  - Bookmark functionality
  - Progress tracking
  - Personal notes
  - Social sharing
  - Print version
  - Download as PDF

Data Integration:
  - Real-time Supabase updates
  - YouTube video embedding
  - Cross-reference linking
  - Analytics tracking
```

#### Etymology Tree Component
```typescript
interface EtymologyTreeProps {
  wordData: WordWithEtymology;
  interactive?: boolean;
  zoomable?: boolean;
}

Visualization:
  - Interactive tree diagram
  - Language family connections
  - Historical timeline
  - Confidence indicators
  - Academic sources

Libraries:
  - D3.js for tree visualization
  - React-flow for interactive nodes
  - Framer Motion for animations

Features:
  - Zoom and pan controls
  - Node click interactions
  - Tooltip information
  - Export as image
  - Mobile-friendly gestures
```

#### Frequency Chart Component
```typescript
interface FrequencyChartProps {
  wordId: string;
  chartType?: 'bar' | 'line' | 'pie';
  timeRange?: 'all' | 'meccan' | 'medinan';
}

Chart Types:
  - Distribution by Surah
  - Frequency over revelation order
  - Contextual usage patterns
  - Comparative analysis

Libraries:
  - Chart.js or Recharts
  - Custom Islamic calendar
  - Responsive design
  - Accessibility compliance

Features:
  - Interactive data points
  - Drill-down capabilities
  - Export functionality
  - Print-friendly version
```

### 4. VIDEO COMPONENTS

#### Video Player Component
```typescript
interface VideoPlayerProps {
  videoId: string;
  autoPlay?: boolean;
  showControls?: boolean;
  onProgress?: (progress: number) => void;
}

Features:
  - YouTube embed with privacy mode
  - Custom controls overlay
  - Progress tracking
  - Playback speed control
  - Subtitle support
  - Full-screen mode

Analytics:
  - Watch time tracking
  - Engagement metrics
  - Drop-off analysis
  - User preferences

Accessibility:
  - Keyboard controls
  - Screen reader support
  - Closed captions
  - Audio descriptions
```

#### Video Gallery Component
```typescript
interface VideoGalleryProps {
  videos: VideoContent[];
  layout?: 'grid' | 'list' | 'masonry';
  filters?: VideoFilters;
  pagination?: PaginationOptions;
}

Features:
  - Responsive grid layout
  - Lazy loading thumbnails
  - Infinite scroll or pagination
  - Sort and filter options
  - Search within videos
  - Playlist creation

Performance:
  - Virtual scrolling
  - Image optimization
  - Progressive loading
  - Caching strategies
```

### 5. ARABIC TEXT COMPONENTS

#### Arabic Text Renderer
```typescript
interface ArabicTextProps {
  text: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  font?: 'noto' | 'amiri' | 'scheherazade';
  direction?: 'rtl' | 'ltr' | 'auto';
  highlightRoots?: boolean;
}

Features:
  - Multiple Arabic fonts
  - Proper RTL rendering
  - Diacritics handling
  - Root letter highlighting
  - Responsive sizing
  - Print optimization

Typography:
  - Noto Sans Arabic (modern)
  - Amiri (traditional)
  - Scheherazade (calligraphic)
  - Proper line spacing
  - Contextual alternates
```

#### Root Highlighter Component
```typescript
interface RootHighlighterProps {
  arabicText: string;
  rootLetters: string;
  colorScheme?: 'default' | 'academic' | 'accessible';
}

Features:
  - Intelligent root detection
  - Color-coded highlighting
  - Morphological analysis
  - Interactive tooltips
  - Accessibility compliance

Colors:
  - Root 1: Blue (#3B82F6)
  - Root 2: Green (#10B981)  
  - Root 3: Orange (#F59E0B)
  - Additional: Purple (#8B5CF6)
```

### 6. UI FOUNDATION COMPONENTS

#### Button Component
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}

Variants:
  - Primary: Blue background, white text
  - Secondary: Gray background, dark text
  - Outline: Border only, transparent background
  - Ghost: No background, minimal styling

States:
  - Default: Normal state
  - Hover: Slight color change
  - Active: Pressed state
  - Loading: Spinner animation
  - Disabled: Reduced opacity
```

#### Modal Component
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: ReactNode;
}

Features:
  - Backdrop blur effect
  - Focus management
  - Escape key handling
  - Mobile-friendly design
  - Animation transitions
  - Portal rendering

Accessibility:
  - Focus trap
  - ARIA labels
  - Screen reader announcements
  - Keyboard navigation
```

## RESPONSIVE DESIGN PATTERNS

### Breakpoint System
```typescript
const breakpoints = {
  sm: '640px',   // Mobile landscape
  md: '768px',   // Tablet portrait
  lg: '1024px',  // Tablet landscape
  xl: '1280px',  // Desktop
  '2xl': '1536px' // Large desktop
}

Layout Patterns:
  - Mobile: Single column, stacked navigation
  - Tablet: Two columns, condensed navigation
  - Desktop: Three columns, full navigation
  - Large: Four columns, extended sidebar
```

### Arabic Layout Considerations
```css
/* RTL Support */
[dir="rtl"] {
  text-align: right;
  font-family: "Noto Sans Arabic", sans-serif;
}

/* Mixed Content */
.mixed-content {
  unicode-bidi: embed;
  direction: ltr;
}

.arabic-text {
  unicode-bidi: embed;
  direction: rtl;
}
```

## DATA INTEGRATION PATTERNS

### Supabase Hooks
```typescript
// Word data fetching
const useWordData = (wordId: string) => {
  const [data, setData] = useState<WordData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const { data, error } = await supabase
          .from('words_master')
          .select(`
            *,
            etymological_data(*),
            word_occurrences(*,quran_verses(*)),
            video_content(*)
          `)
          .eq('id', wordId)
          .single();

        if (error) throw error;
        setData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWord();
  }, [wordId]);

  return { data, loading, error };
};
```

### Real-time Updates
```typescript
// Subscribe to video content updates
const useVideoUpdates = () => {
  useEffect(() => {
    const subscription = supabase
      .channel('video-updates')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'video_content',
        filter: 'status=eq.published'
      }, (payload) => {
        // Handle new video notification
        toast.success('New video published!');
      })
      .subscribe();

    return () => subscription.unsubscribe();
  }, []);
};
```

## PERFORMANCE OPTIMIZATION

### Code Splitting
```typescript
// Lazy load heavy components
const EtymologyTree = lazy(() => import('./components/word/EtymologyTree'));
const VideoPlayer = lazy(() => import('./components/video/VideoPlayer'));

// Component-level splitting
const WordDetail = lazy(() => 
  import('./components/word/WordDetail').then(module => ({
    default: module.WordDetail
  }))
);
```

### Image Optimization
```typescript
// Optimized image component
const OptimizedImage = ({ src, alt, ...props }) => {
  return (
    <Image
      src={src}
      alt={alt}
      loading="lazy"
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
      {...props}
    />
  );
};
```

### Caching Strategies
```typescript
// React Query for API caching
const useWordQuery = (wordId: string) => {
  return useQuery({
    queryKey: ['word', wordId],
    queryFn: () => fetchWordData(wordId),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
  });
};
```

## ACCESSIBILITY REQUIREMENTS

### WCAG 2.1 Compliance
```typescript
// Semantic HTML structure
const WordCard = ({ word }) => (
  <article 
    role="article"
    aria-labelledby={`word-${word.id}-title`}
    aria-describedby={`word-${word.id}-description`}
  >
    <h3 id={`word-${word.id}-title`}>
      {word.arabic_word}
    </h3>
    <p id={`word-${word.id}-description`}>
      {word.primary_meaning}
    </p>
  </article>
);
```

### Keyboard Navigation
```typescript
// Focus management
const useFocusManagement = () => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      // Custom tab navigation logic
    }
    if (event.key === 'Escape') {
      // Close modals/dropdowns
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);
};
```

This context provides comprehensive component specifications for building a professional, accessible, and performant Lovable frontend.
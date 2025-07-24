# PROMPTS LIBRARY - QURANIC ETYMOLOGY EXPLORER

## 🎨 LOVABLE FRONTEND DEVELOPMENT PROMPTS

### MASTER FRONTEND PROMPT TEMPLATE
```
CONTEXT: Quranic Etymology Explorer - Educational platform for Arabic word analysis
PLATFORM: Lovable (React/Next.js with Tailwind CSS)
PROJECT TYPE: Academic content platform with YouTube integration
DESIGN: Modern, scholarly, accessible, Arabic-English bilingual

COMPONENT: {COMPONENT_NAME}
PURPOSE: {SPECIFIC_FUNCTIONALITY}
INTEGRATION: Supabase backend, YouTube Data API v3

REQUIREMENTS:
- Mobile-first responsive design
- Arabic text support (RTL when needed)
- WCAG 2.1 AA accessibility compliance
- SEO optimization built-in
- Performance optimized (Core Web Vitals)
- Professional academic aesthetic

DESIGN SYSTEM:
- Colors: Deep blues (#1e3a8a), golds (#f59e0b), whites (#ffffff)
- Typography: Inter for English, Noto Sans Arabic for Arabic
- Spacing: Tailwind default scale
- Components: Clean, modern, scholarly feel

TECHNICAL SPECS:
- React hooks for state management
- Supabase client for data fetching
- Error boundaries and loading states
- TypeScript for type safety
- Optimistic updates where appropriate

Please generate complete, production-ready Lovable code that I can copy-paste directly.
```

### SPECIFIC COMPONENT PROMPTS

#### 1. HOMEPAGE COMPONENT
```
Using the Master Frontend Prompt Template above, create the main homepage component:

HERO SECTION:
- Compelling headline: "Discover the Deep Meanings Behind Every Quranic Word"
- Subtitle explaining etymology and frequency analysis
- Large search bar with Arabic text support
- "Word of the Day" featured prominently
- Call-to-action buttons for latest videos

FEATURES SHOWCASE:
- Three-column grid showing:
  1. Etymology Analysis (with language tree icon)
  2. Frequency Insights (with chart icon)  
  3. Video Learning (with play icon)
- Statistics display: "X words analyzed, Y videos created"
- Academic credibility indicators

CONTENT PREVIEW:
- Latest video thumbnails carousel (YouTube integration)
- Popular word analyses grid
- Recent research highlights
- Educational blog post links

TECHNICAL REQUIREMENTS:
- Responsive design for mobile/tablet/desktop
- YouTube Data API integration for latest videos
- Supabase real-time data for statistics
- Search functionality with Arabic input support
- Loading skeletons for all dynamic content
- Meta tags for SEO optimization

Include proper TypeScript interfaces and comprehensive error handling.
```

#### 2. WORD ANALYSIS DETAIL PAGE
```
Using the Master Frontend Prompt Template above, create a comprehensive word detail page:

HEADER SECTION:
- Large Arabic word display with beautiful typography
- Phonetic pronunciation guide with audio button
- Root letters highlighted in different colors
- Basic statistics card (frequency, first/last occurrence)

TABBED CONTENT SECTIONS:
1. Etymology & Origins:
   - Interactive language family tree visualization
   - Historical timeline of word evolution
   - Connections to Hebrew, Aramaic, Phoenician
   - Academic confidence scores with explanations

2. Quranic Usage:
   - All occurrences with verse context
   - Surah and verse references with translations
   - Contextual meaning variations
   - Thematic categorization with tags

3. Related Words:
   - Same root family members
   - Semantic connections network
   - Morphological variations
   - Suggested next explorations

4. Learning Resources:
   - Embedded YouTube video player
   - Downloadable study materials
   - Academic references and citations
   - Interactive quiz elements

INTERACTIVE FEATURES:
- Bookmark/save functionality
- Social sharing with proper meta tags
- Progress tracking for learning journey
- Personal notes system (local storage)
- Print-friendly version

TECHNICAL REQUIREMENTS:
- Dynamic routing with word ID parameter
- Supabase data fetching with proper caching
- YouTube embed with privacy-enhanced mode
- Arabic text rendering with proper fonts
- Loading states for each content section
- Error boundaries with fallback UI
- Breadcrumb navigation
- Related words recommendations

Include accessibility features like skip links, proper heading hierarchy, and screen reader support.
```

#### 3. SEARCH INTERFACE COMPONENT
```
Using the Master Frontend Prompt Template above, create an advanced search interface:

SEARCH INPUT:
- Large, prominent search bar
- Arabic keyboard support toggle
- Auto-suggestions dropdown
- Search history (local storage)
- Voice search capability (Web Speech API)

SEARCH FILTERS:
- Filter by word type (noun, verb, particle)
- Filter by frequency range (common, rare, unique)
- Filter by semantic field (theology, nature, social)
- Filter by root letters
- Filter by Surah (dropdown with all 114)

RESULTS DISPLAY:
- Search results grid with word cards
- Each card shows: Arabic word, meaning, frequency, video thumbnail
- Pagination or infinite scroll
- Sort options: relevance, frequency, alphabetical
- View toggle: grid vs list

ADVANCED FEATURES:
- Semantic search using vector embeddings
- Similar words suggestions
- Search analytics tracking
- Export search results
- Save search queries

TECHNICAL REQUIREMENTS:
- Debounced search input for performance
- Supabase full-text search integration
- Vector similarity search for semantic queries
- URL state management for shareable searches
- Loading skeletons during search
- Empty state with helpful suggestions
- Search analytics tracking to Supabase

Include comprehensive TypeScript types and error handling for all search scenarios.
```

#### 4. VIDEO GALLERY COMPONENT
```
Using the Master Frontend Prompt Template above, create a video gallery interface:

LAYOUT:
- Masonry grid layout for video thumbnails
- Responsive design (1-4 columns based on screen size)
- Category filters (recent, popular, by topic)
- Search functionality within videos

VIDEO CARDS:
- YouTube thumbnail with play overlay
- Video title and description preview
- Word being analyzed (Arabic + transliteration)
- Duration and view count
- Upload date
- Quick action buttons (bookmark, share)

FEATURES:
- YouTube player modal for inline viewing
- Progress tracking for watched videos
- Playlist creation and management
- Video recommendations based on viewing history
- Export playlist to YouTube

PERFORMANCE:
- Lazy loading for thumbnails
- Intersection Observer for infinite scroll
- YouTube API quota optimization
- Image optimization and caching
- Virtual scrolling for large lists

TECHNICAL REQUIREMENTS:
- YouTube Data API v3 integration
- Supabase for user preferences and progress
- Modal component for video playback
- Local storage for user settings
- Social sharing functionality
- Analytics tracking for video engagement

Include proper error handling for YouTube API failures and offline support.
```

#### 5. ANALYTICS DASHBOARD COMPONENT
```
Using the Master Frontend Prompt Template above, create an analytics dashboard:

OVERVIEW METRICS:
- Total words analyzed
- Videos published
- User engagement statistics
- Popular content highlights

CHARTS AND VISUALIZATIONS:
- Word frequency distribution chart
- Etymology network visualization
- User engagement trends over time
- Geographic user distribution
- Popular search terms word cloud

INTERACTIVE FEATURES:
- Date range selector
- Metric comparison tools
- Drill-down capabilities
- Export functionality (PDF, CSV)
- Real-time updates

TECHNICAL REQUIREMENTS:
- Chart.js or Recharts for visualizations
- Supabase analytics queries
- Real-time data subscriptions
- Responsive chart design
- Performance optimization for large datasets
- Caching strategy for expensive queries

Include proper loading states and error handling for all chart components.
```

---

## 🔧 N8N WORKFLOW DEVELOPMENT PROMPTS

### MASTER N8N WORKFLOW PROMPT TEMPLATE
```
CONTEXT: Quranic Etymology Explorer automation workflows
PLATFORM: n8n Pro (Local deployment)
GOAL: Production-ready workflow with comprehensive error handling
INTEGRATIONS: Supabase, Claude AI (Anthropic), YouTube Data API v3

WORKFLOW: {WORKFLOW_NAME}
TRIGGER: {TRIGGER_TYPE}
DATA FLOW: {INPUT} → {PROCESSING_STEPS} → {OUTPUT}

REQUIREMENTS:
- Comprehensive error handling and retry logic
- Data validation at each processing step
- Logging and monitoring for all operations
- Rate limiting compliance for all APIs
- Rollback capabilities where applicable
- Performance optimization
- Security best practices

AUTHENTICATION:
- Supabase: Service role key with RLS bypass
- Claude AI: API key with proper rate limiting
- YouTube: OAuth2 with refresh token handling
- Webhook security with signature validation

Please generate complete n8n workflow JSON configuration that I can import directly.
```

### SPECIFIC WORKFLOW PROMPTS

#### 1. ETYMOLOGY RESEARCH WORKFLOW
```
Using the Master N8N Workflow Prompt Template above, create the core etymology research workflow:

TRIGGER: 
- Daily cron schedule (6:00 AM UTC)
- Manual webhook for immediate processing
- Queue-based trigger when new words added

PROCESSING STEPS:
1. QUEUE MANAGEMENT:
   - Fetch next priority word from content_queue
   - Validate word data and prerequisites
   - Update status to 'in_progress'

2. DATA GATHERING:
   - Fetch word details from words_master
   - Get all occurrences from word_occurrences
   - Retrieve existing research (if any)

3. CLAUDE AI RESEARCH (Parallel Processing):
   a) Frequency Analysis:
      - Count occurrences across all verses
      - Analyze distribution patterns
      - Identify contextual variations
   
   b) Etymology Research:
      - Root letter analysis
      - Cross-linguistic connections (Hebrew, Aramaic, Phoenician)
      - Historical usage patterns
      - Academic source verification
   
   c) Semantic Analysis:
      - Meaning variations across contexts
      - Thematic categorization
      - Related concept identification
   
   d) Quality Validation:
      - Fact-checking against academic sources
      - Confidence score calculation
      - Uncertainty factor identification

4. DATA PROCESSING:
   - Merge and validate all research results
   - Calculate overall confidence scores
   - Structure data for database storage
   - Generate research summary

5. DATABASE UPDATES:
   - Store etymology data in etymological_data table
   - Update word statistics in words_master
   - Update queue status to 'completed'
   - Log research metadata

6. TRIGGER NEXT PHASE:
   - Send webhook to content generation workflow
   - Update analytics and monitoring
   - Schedule social media announcements

ERROR HANDLING:
- Claude AI rate limiting with exponential backoff
- Database connection failures with retry logic
- Invalid research data with validation checks
- Partial failure recovery with checkpoint system
- Comprehensive logging for debugging

MONITORING:
- Success/failure notifications
- Performance metrics tracking
- Research quality assessment
- Resource usage monitoring

CONFIGURATION:
- Configurable retry attempts (default: 3)
- Adjustable timeout values
- Rate limiting compliance
- Data validation schemas
- Quality thresholds

Generate complete n8n workflow with all node configurations, connections, and error handling.
```

#### 2. VIDEO SCRIPT GENERATION WORKFLOW
```
Using the Master N8N Workflow Prompt Template above, create the video script generation workflow:

TRIGGER:
- Webhook from etymology research completion
- Manual trigger for script regeneration
- Scheduled batch processing

INPUT DATA:
- Word ID and basic information
- Complete etymology research data
- Video requirements and constraints
- Target audience parameters

PROCESSING STEPS:
1. DATA PREPARATION:
   - Fetch word details and etymology research
   - Validate data completeness and quality
   - Gather additional context (related words, themes)

2. SCRIPT STRUCTURE GENERATION:
   Using Claude AI, generate structured script with:
   - Hook (0-15 seconds): Engaging opening
   - Frequency Analysis (15-60 seconds): Statistics with visual cues
   - Etymology Deep Dive (60-210 seconds): Historical connections
   - Quranic Context (210-270 seconds): Usage examples
   - Conclusion (270-300 seconds): Summary and next episode

3. VISUAL ELEMENTS PLANNING:
   - Chart specifications for frequency data
   - Language family tree diagrams
   - Timeline graphics for historical evolution
   - Arabic calligraphy requirements
   - Infographic layouts

4. METADATA GENERATION:
   - SEO-optimized YouTube title (under 60 characters)
   - Comprehensive description (up to 5000 characters)
   - Relevant tags for discoverability
   - Thumbnail text suggestions
   - Category and language settings

5. QUALITY VALIDATION:
   - Script length and timing validation
   - Academic accuracy verification
   - Accessibility compliance check
   - SEO optimization scoring

6. DATABASE STORAGE:
   - Save complete script to video_content table
   - Update content queue status
   - Store metadata and visual requirements
   - Log generation metrics

7. NOTIFICATION AND NEXT STEPS:
   - Notify video production system
   - Update project dashboard
   - Schedule social media teasers

ERROR HANDLING:
- Invalid or incomplete research data
- Claude AI generation failures
- Script quality validation failures
- Database storage errors
- Webhook delivery failures

CUSTOMIZATION OPTIONS:
- Script length variations (3-min, 5-min, 10-min)
- Target audience level (beginner, intermediate, advanced)
- Language preferences (Arabic emphasis vs English)
- Visual style preferences
- Academic rigor level

Generate complete workflow with proper Claude AI prompts, data validation, and error recovery.
```

#### 3. YOUTUBE PUBLISHING PIPELINE
```
Using the Master N8N Workflow Prompt Template above, create the YouTube publishing workflow:

TRIGGER:
- Webhook from video production completion
- Scheduled publishing for optimal timing
- Manual publishing trigger

PRE-PUBLISHING VALIDATION:
- Video file quality and format validation
- Metadata completeness check
- Thumbnail quality assessment
- SEO optimization verification
- Compliance with YouTube policies

UPLOAD PROCESS:
1. VIDEO PREPARATION:
   - Download processed video file
   - Validate file size and format
   - Generate multiple thumbnail options
   - Prepare closed captions (if available)

2. YOUTUBE API INTERACTION:
   - Authenticate with OAuth2 tokens
   - Upload video with resumable upload
   - Set video metadata (title, description, tags)
   - Upload custom thumbnail
   - Configure video settings (privacy, category, etc.)

3. PLAYLIST MANAGEMENT:
   - Add video to appropriate playlists
   - Update playlist descriptions
   - Organize by word categories or themes

4. OPTIMIZATION:
   - Add end screens and cards
   - Set up video chapters
   - Configure monetization settings
   - Enable community contributions

5. DATABASE UPDATES:
   - Store YouTube video ID and URL
   - Update video_content status to 'published'
   - Record publishing timestamp
   - Initialize analytics tracking

6. NOTIFICATIONS:
   - Update website with new video
   - Send notifications to subscribers
   - Post to social media platforms
   - Update content calendar

POST-PUBLISHING MONITORING:
- Track initial video performance
- Monitor for policy violations
- Check upload processing status
- Verify video discoverability

ERROR HANDLING:
- Upload failures with retry logic
- YouTube API quota exceeded
- Policy violation detection
- Metadata validation errors
- Thumbnail upload failures

SCHEDULING FEATURES:
- Optimal publishing time calculation
- Batch publishing capabilities
- Release coordination with website updates
- Social media synchronization

Generate complete workflow with YouTube API integration, error handling, and monitoring capabilities.
```

#### 4. WEBSITE CONTENT SYNC WORKFLOW
```
Using the Master N8N Workflow Prompt Template above, create the website content synchronization workflow:

TRIGGER:
- Database changes (new videos, updated research)
- Scheduled content refreshes
- Manual sync triggers

CONTENT SYNCHRONIZATION:
1. CHANGE DETECTION:
   - Monitor Supabase database for updates
   - Identify new or modified content
   - Determine sync priorities

2. STATIC SITE GENERATION:
   - Generate updated pages for new words
   - Update search indexes
   - Refresh analytics data
   - Optimize images and assets

3. SEO OPTIMIZATION:
   - Generate meta tags for new content
   - Update sitemap.xml
   - Create structured data markup
   - Optimize for search engines

4. DEPLOYMENT:
   - Deploy to Hostinger hosting
   - Update CDN cache
   - Verify deployment success
   - Test critical functionality

5. CACHE MANAGEMENT:
   - Invalidate relevant cache entries
   - Warm up new content
   - Optimize cache strategies

PERFORMANCE OPTIMIZATION:
- Image optimization and compression
- Code splitting for large pages
- Lazy loading implementation
- Critical CSS inlining

MONITORING:
- Page load speed testing
- Core Web Vitals monitoring
- Error tracking and alerting
- User experience metrics

Generate complete workflow with deployment automation and performance optimization.
```

---

## 🔍 CLAUDE AI RESEARCH PROMPTS

### ETYMOLOGY RESEARCH PROMPT TEMPLATE
```
ROLE: Expert etymology researcher specializing in Semitic languages
TASK: Comprehensive analysis of Arabic word from Quranic text
METHODOLOGY: Academic rigor with confidence scoring

WORD TO ANALYZE: {ARABIC_WORD}
ROOT LETTERS: {ROOT_LETTERS}
FREQUENCY DATA: {OCCURRENCE_COUNT} times in {UNIQUE_VERSES} verses

RESEARCH REQUIREMENTS:

1. FREQUENCY ANALYSIS:
   - Distribution across Meccan vs Medinan revelations
   - Usage patterns by Surah
   - Contextual meaning variations
   - Statistical significance of usage

2. ETYMOLOGY AND ROOTS:
   - Arabic root analysis (ج-ذ-ر pattern analysis)
   - Proto-Semitic reconstruction
   - Cross-linguistic connections:
     * Hebrew cognates and meanings
     * Aramaic equivalents
     * Phoenician parallels
     * Akkadian relationships
   - Historical attestations in pre-Islamic Arabic

3. SEMANTIC EVOLUTION:
   - Meaning development over time
   - Cultural and theological implications
   - Metaphorical and literal usage patterns
   - Intertextual relationships

4. ACADEMIC VERIFICATION:
   - Cross-reference with standard etymological dictionaries
   - Cite relevant academic sources
   - Note areas of scholarly disagreement
   - Provide confidence scores (0.0-1.0) for each claim

OUTPUT FORMAT:
Structured JSON with sections for frequency, etymology, semantics, and sources.
Include confidence scores and uncertainty factors.
Provide academic citations where applicable.

QUALITY STANDARDS:
- Verifiable claims only
- Clear distinction between established facts and theories
- Transparent about limitations and uncertainties
- Academic source references required
```

### VIDEO SCRIPT GENERATION PROMPT
```
ROLE: Educational content creator for Islamic studies
AUDIENCE: Educated adults interested in Quranic studies
PLATFORM: YouTube (5-minute educational video)
TONE: Academic yet accessible, respectful, engaging

WORD DATA:
- Arabic Word: {ARABIC_WORD}
- Meaning: {PRIMARY_MEANING}
- Frequency: {TOTAL_OCCURRENCES} occurrences
- Etymology: {ETYMOLOGY_SUMMARY}

SCRIPT STRUCTURE:

HOOK (0-15 seconds):
Create compelling opening that:
- Introduces the word with beautiful visual
- Poses intriguing question about its deeper meaning
- Promises valuable insights

FREQUENCY INSIGHTS (15-60 seconds):
Present statistics with:
- Total occurrences and distribution
- Most significant usage contexts
- Visual cue markers for charts/graphics
- Surprising or noteworthy patterns

ETYMOLOGY DEEP DIVE (60-210 seconds):
Detailed analysis including:
- Root letter breakdown with visual aids
- Cross-linguistic connections (Hebrew, Aramaic)
- Historical evolution of meaning
- Cultural and theological significance
- Academic sources and confidence levels

QURANIC CONTEXT (210-270 seconds):
Practical application with:
- Key verse examples with translations
- Contextual meaning variations
- Thematic connections across Quran
- Scholarly interpretations

CONCLUSION (270-300 seconds):
Memorable ending with:
- Key insights summary
- Broader implications for understanding
- Next episode preview
- Call to action (subscribe, comments)

TECHNICAL REQUIREMENTS:
- [VISUAL: description] markers for graphics
- Pronunciation guides in parentheses
- Academic citations where appropriate
- Smooth transitions between sections
- Engaging language throughout

Generate complete script ready for video production.
```

---

## 🎯 PRODUCTIVITY OPTIMIZATION PROMPTS

### DAILY WORKFLOW STARTER
```
MCP SESSION INITIALIZATION - Quranic Etymology Explorer

CONTEXT LOADING:
- Project Master Context ✓
- Current development phase: {CURRENT_PHASE}
- Today's priority: {DAILY_FOCUS}
- Blocking issues: {ISSUES_LIST}

DEVELOPMENT ENVIRONMENT:
- Lovable project: {PROJECT_STATUS}
- n8n workflows: {WORKFLOW_STATUS}
- Supabase database: {DB_STATUS}
- YouTube integration: {YT_STATUS}

SESSION GOALS:
1. {PRIMARY_GOAL}
2. {SECONDARY_GOAL}
3. {TERTIARY_GOAL}

CONTEXT-AWARE ASSISTANCE:
Ready to provide specialized prompts based on today's focus area.
All project context loaded and cross-referenced.
Quality standards and architectural decisions available.

How can I help you achieve today's development goals?
```

### INTEGRATION TESTING PROMPT
```
COMPREHENSIVE INTEGRATION TEST - Component/Workflow

TESTING SCOPE: {COMPONENT_OR_WORKFLOW_NAME}
INTEGRATION POINTS:
- Frontend ↔ Supabase
- n8n ↔ External APIs
- YouTube ↔ Website
- Claude AI ↔ Research Pipeline

TEST SCENARIOS:
1. Happy path end-to-end flow
2. Error conditions and recovery
3. Performance under load
4. Data consistency validation
5. Security and authentication
6. Mobile and accessibility

GENERATE:
- Test cases with expected outcomes
- Mock data for all scenarios
- Performance benchmarks
- Error handling validation
- User acceptance criteria

Include both automated tests and manual verification steps.
Provide specific test data and expected results.
```

This comprehensive prompts library provides copy-paste ready prompts for every aspect of your project development, optimized for maximum productivity with Claude Desktop's MCP system.
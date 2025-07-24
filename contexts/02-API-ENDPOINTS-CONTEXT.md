# API ENDPOINTS CONTEXT - QURANIC ETYMOLOGY EXPLORER

## SUPABASE API ENDPOINTS

### BASE CONFIGURATION
```yaml
URL: https://your-project.supabase.co
API KEY: your-anon-key (public operations)
SERVICE KEY: your-service-key (admin operations - n8n only)
```

### AUTHENTICATION PATTERNS
```typescript
// Public read access (no auth required)
const { data, error } = await supabase
  .from('words_master')
  .select('*')

// Admin operations (for n8n workflows)
const supabaseAdmin = createClient(url, serviceKey)
```

## CORE API ENDPOINTS

### 1. WORDS API
```yaml
# Get all words with pagination
GET /rest/v1/words_master
Query Parameters:
  - select: columns to return
  - limit: number of records (default 20)
  - offset: pagination offset
  - order: sorting (frequency_rank.desc)
  - filter: where conditions

# Get specific word details
GET /rest/v1/words_master?id=eq.123
Returns: Complete word information with metadata

# Get word with all related data
GET /rest/v1/words_master?id=eq.123&select=*,word_occurrences(*,quran_verses(*)),etymological_data(*),video_content(*)

# Search words
GET /rest/v1/words_master?arabic_word=ilike.*حياة*
GET /rest/v1/words_master?or=(arabic_word.ilike.*life*,primary_meaning.ilike.*life*)

# Get words by root
GET /rest/v1/words_master?root_letters=eq.ح-ي-ا

# Get high-priority words for research
GET /rest/v1/words_master?research_status=eq.pending&order=research_priority.desc&limit=10
```

### 2. WORD OCCURRENCES API
```yaml
# Get all occurrences of a word
GET /rest/v1/word_occurrences?word_id=eq.123&select=*,quran_verses(surah_number,verse_number,arabic_text,english_translation)

# Get occurrences with context
GET /rest/v1/word_occurrences?word_id=eq.123&select=word_position,contextual_meaning,word_form,quran_verses(surah_number,verse_number,arabic_text,english_translation)

# Get word distribution by Surah
GET /rest/v1/rpc/word_distribution_by_surah
POST Body: { "word_id": 123 }
```

### 3. ETYMOLOGY DATA API
```yaml
# Get etymology for specific word
GET /rest/v1/etymological_data?word_id=eq.123

# Get words with completed etymology research
GET /rest/v1/etymological_data?research_confidence=gte.0.8&select=*,words_master(arabic_word,primary_meaning)

# Search by cross-linguistic connections
GET /rest/v1/etymological_data?hebrew_equivalent=ilike.*חיים*
```

### 4. VIDEO CONTENT API
```yaml
# Get published videos
GET /rest/v1/video_content?status=eq.published&order=publish_date.desc

# Get video by word
GET /rest/v1/video_content?word_id=eq.123&status=eq.published

# Get video with word details
GET /rest/v1/video_content?status=eq.published&select=*,words_master(arabic_word,primary_meaning,total_occurrences)

# Get latest videos for homepage
GET /rest/v1/video_content?status=eq.published&order=publish_date.desc&limit=6
```

### 5. CONTENT QUEUE API (Admin Only)
```yaml
# Get next word for research
GET /rest/v1/content_queue?research_status=eq.pending&order=priority_score.desc&limit=1

# Update research status
PATCH /rest/v1/content_queue?id=eq.123
Body: { "research_status": "in_progress" }

# Get queue statistics
GET /rest/v1/rpc/queue_statistics
Returns: { pending: 150, in_progress: 5, completed: 300 }
```

### 6. ANALYTICS API
```yaml
# Track user interaction
POST /rest/v1/user_interactions
Body: {
  "session_id": "uuid",
  "word_id": 123,
  "interaction_type": "view",
  "timestamp": "2025-01-01T12:00:00Z"
}

# Get popular words
GET /rest/v1/rpc/popular_words
Query: { "time_period": "week", "limit": 10 }

# Get engagement metrics
GET /rest/v1/rpc/engagement_metrics
Query: { "word_id": 123 }
```

## CUSTOM RPC FUNCTIONS

### 1. Search Functions
```sql
-- Full-text search across words and meanings
CREATE OR REPLACE FUNCTION search_words(search_term TEXT)
RETURNS TABLE (
    id INTEGER,
    arabic_word TEXT,
    primary_meaning TEXT,
    total_occurrences INTEGER,
    relevance_score FLOAT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        w.id,
        w.arabic_word,
        w.primary_meaning,
        w.total_occurrences,
        ts_rank(
            to_tsvector('arabic', w.arabic_word || ' ' || w.primary_meaning),
            plainto_tsquery('arabic', search_term)
        ) as relevance_score
    FROM words_master w
    WHERE to_tsvector('arabic', w.arabic_word || ' ' || w.primary_meaning) 
          @@ plainto_tsquery('arabic', search_term)
    ORDER BY relevance_score DESC;
END;
$$ LANGUAGE plpgsql;
```

### 2. Analytics Functions
```sql
-- Get word frequency distribution
CREATE OR REPLACE FUNCTION word_frequency_stats()
RETURNS TABLE (
    frequency_range TEXT,
    word_count INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        CASE 
            WHEN total_occurrences = 1 THEN 'Unique (1)'
            WHEN total_occurrences BETWEEN 2 AND 5 THEN 'Rare (2-5)'
            WHEN total_occurrences BETWEEN 6 AND 20 THEN 'Uncommon (6-20)'
            WHEN total_occurrences BETWEEN 21 AND 50 THEN 'Common (21-50)'
            ELSE 'Very Common (50+)'
        END as frequency_range,
        COUNT(*)::INTEGER as word_count
    FROM words_master
    GROUP BY 1
    ORDER BY MIN(total_occurrences);
END;
$$ LANGUAGE plpgsql;
```

### 3. Queue Management Functions
```sql
-- Calculate research priority scores
CREATE OR REPLACE FUNCTION calculate_priority_scores()
RETURNS VOID AS $$
BEGIN
    UPDATE content_queue 
    SET priority_score = (
        -- Frequency weight (40%)
        (SELECT (total_occurrences::FLOAT / MAX(total_occurrences) OVER ()) * 0.4
         FROM words_master WHERE id = content_queue.word_id) +
        
        -- Linguistic interest (30%) - based on cross-linguistic connections
        (SELECT CASE 
            WHEN etymology_notes IS NOT NULL THEN 0.3
            WHEN hebrew_equivalent IS NOT NULL OR aramaic_equivalent IS NOT NULL THEN 0.2
            ELSE 0.1
         END
         FROM etymological_data WHERE word_id = content_queue.word_id) +
        
        -- User requests (20%)
        (user_requests::FLOAT / GREATEST(MAX(user_requests) OVER (), 1)) * 0.2 +
        
        -- Academic importance (10%) - based on semantic field
        (SELECT CASE 
            WHEN semantic_field IN ('theology', 'worship') THEN 0.1
            WHEN semantic_field IN ('ethics', 'law') THEN 0.08
            ELSE 0.05
         END
         FROM words_master WHERE id = content_queue.word_id)
    );
END;
$$ LANGUAGE plpgsql;
```

## REAL-TIME SUBSCRIPTIONS

### 1. Video Content Updates
```typescript
// Subscribe to new video publications
const subscription = supabase
  .channel('video-updates')
  .on('postgres_changes', {
    event: 'UPDATE',
    schema: 'public',
    table: 'video_content',
    filter: 'status=eq.published'
  }, (payload) => {
    // Update UI with new video
    handleNewVideo(payload.new)
  })
  .subscribe()
```

### 2. Research Progress Updates
```typescript
// Subscribe to research completion
const subscription = supabase
  .channel('research-updates')
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'etymological_data'
  }, (payload) => {
    // Notify of new research completion
    handleResearchComplete(payload.new)
  })
  .subscribe()
```

## YOUTUBE DATA API v3 INTEGRATION

### 1. Channel Management
```yaml
# Get channel statistics
GET https://www.googleapis.com/youtube/v3/channels
Parameters:
  - part: statistics,snippet
  - id: UCyour-channel-id
  - key: your-api-key

# Get channel videos
GET https://www.googleapis.com/youtube/v3/search
Parameters:
  - part: snippet
  - channelId: UCyour-channel-id
  - order: date
  - type: video
  - maxResults: 50
```

### 2. Video Operations
```yaml
# Upload video (OAuth required)
POST https://www.googleapis.com/upload/youtube/v3/videos
Headers:
  - Authorization: Bearer access-token
  - Content-Type: video/mp4
Body: video file + metadata

# Update video metadata
PUT https://www.googleapis.com/youtube/v3/videos
Headers:
  - Authorization: Bearer access-token
Body: {
  "id": "video-id",
  "snippet": {
    "title": "New Title",
    "description": "Updated description",
    "tags": ["tag1", "tag2"]
  }
}

# Get video statistics
GET https://www.googleapis.com/youtube/v3/videos
Parameters:
  - part: statistics,snippet
  - id: video-id
  - key: your-api-key
```

### 3. Playlist Management
```yaml
# Create playlist
POST https://www.googleapis.com/youtube/v3/playlists
Headers:
  - Authorization: Bearer access-token
Body: {
  "snippet": {
    "title": "Etymology Series",
    "description": "Deep word analysis"
  },
  "status": {
    "privacyStatus": "public"
  }
}

# Add video to playlist
POST https://www.googleapis.com/youtube/v3/playlistItems
Headers:
  - Authorization: Bearer access-token
Body: {
  "snippet": {
    "playlistId": "playlist-id",
    "resourceId": {
      "kind": "youtube#video",
      "videoId": "video-id"
    }
  }
}
```

## CLAUDE AI API INTEGRATION

### 1. Research Requests
```yaml
POST https://api.anthropic.com/v1/messages
Headers:
  - x-api-key: your-claude-key
  - content-type: application/json
  - anthropic-version: 2023-06-01
Body: {
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 4000,
  "messages": [
    {
      "role": "user",
      "content": "Research etymology of Arabic word: {word}"
    }
  ]
}
```

### 2. Rate Limiting
```yaml
Limits:
  - 1000 requests per minute
  - 40,000 tokens per minute
  - Implement exponential backoff
  - Monitor usage quotas
```

## ERROR HANDLING PATTERNS

### 1. Supabase Errors
```typescript
const handleSupabaseError = (error: PostgrestError) => {
  if (error.code === 'PGRST116') {
    // No rows found
    return { data: [], error: null }
  }
  if (error.code === '23505') {
    // Unique constraint violation
    throw new Error('Duplicate entry')
  }
  // Log and rethrow unknown errors
  console.error('Supabase error:', error)
  throw error
}
```

### 2. YouTube API Errors
```typescript
const handleYouTubeError = (error: any) => {
  if (error.code === 403) {
    // Quota exceeded
    throw new Error('YouTube API quota exceeded')
  }
  if (error.code === 400) {
    // Invalid request
    throw new Error('Invalid YouTube API request')
  }
  throw error
}
```

### 3. Rate Limiting Implementation
```typescript
const rateLimiter = {
  supabase: new Map(),
  youtube: new Map(),
  claude: new Map(),
  
  checkLimit(service: string, limit: number, window: number) {
    const now = Date.now()
    const requests = this[service] || new Map()
    
    // Clean old requests
    for (const [timestamp] of requests) {
      if (now - timestamp > window) {
        requests.delete(timestamp)
      }
    }
    
    if (requests.size >= limit) {
      throw new Error(`Rate limit exceeded for ${service}`)
    }
    
    requests.set(now, true)
    this[service] = requests
  }
}
```

This context provides all API specifications needed for both frontend Lovable development and n8n workflow automation.
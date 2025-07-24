# SUPABASE DATABASE SCHEMA CONTEXT

## COMPLETE DATABASE ARCHITECTURE

### CORE TABLES

#### 1. QURAN_VERSES
```sql
CREATE TABLE quran_verses (
    id SERIAL PRIMARY KEY,
    surah_number INTEGER NOT NULL CHECK (surah_number BETWEEN 1 AND 114),
    verse_number INTEGER NOT NULL CHECK (verse_number > 0),
    arabic_text TEXT NOT NULL,
    arabic_simple TEXT NOT NULL, -- Simplified without diacritics
    transliteration TEXT,
    english_translation TEXT,
    translation_source VARCHAR(100) DEFAULT 'Sahih International',
    word_count INTEGER,
    character_count INTEGER,
    revelation_type VARCHAR(10) CHECK (revelation_type IN ('Meccan', 'Medinan')),
    juz_number INTEGER CHECK (juz_number BETWEEN 1 AND 30),
    hizb_number INTEGER CHECK (hizb_number BETWEEN 1 AND 60),
    page_number INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(surah_number, verse_number)
);

-- Indexes for performance
CREATE INDEX idx_quran_verses_surah ON quran_verses(surah_number);
CREATE INDEX idx_quran_verses_arabic_text ON quran_verses USING gin(to_tsvector('arabic', arabic_text));
CREATE INDEX idx_quran_verses_simple ON quran_verses USING gin(to_tsvector('simple', arabic_simple));
```

#### 2. WORDS_MASTER
```sql
CREATE TABLE words_master (
    id SERIAL PRIMARY KEY,
    arabic_word TEXT UNIQUE NOT NULL,
    arabic_simple TEXT NOT NULL, -- Without diacritics
    root_letters TEXT, -- Usually 3-4 letters
    word_pattern TEXT, -- Morphological pattern
    word_type VARCHAR(50), -- noun, verb, particle, etc.
    primary_meaning TEXT,
    semantic_field VARCHAR(100), -- e.g., 'theology', 'nature', 'social'
    total_occurrences INTEGER DEFAULT 0,
    unique_verse_count INTEGER DEFAULT 0,
    first_revelation_order INTEGER,
    last_revelation_order INTEGER,
    frequency_rank INTEGER,
    research_priority FLOAT DEFAULT 0.0,
    research_status VARCHAR(20) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_words_arabic ON words_master(arabic_word);
CREATE INDEX idx_words_simple ON words_master(arabic_simple);
CREATE INDEX idx_words_root ON words_master(root_letters);
CREATE INDEX idx_words_frequency ON words_master(frequency_rank);
CREATE INDEX idx_words_priority ON words_master(research_priority DESC);
```

#### 3. WORD_OCCURRENCES
```sql
CREATE TABLE word_occurrences (
    id SERIAL PRIMARY KEY,
    word_id INTEGER REFERENCES words_master(id) ON DELETE CASCADE,
    verse_id INTEGER REFERENCES quran_verses(id) ON DELETE CASCADE,
    word_position INTEGER NOT NULL, -- Position within verse
    word_form TEXT, -- Actual form in verse (with inflections)
    contextual_meaning TEXT,
    grammatical_role VARCHAR(50), -- subject, object, modifier, etc.
    morphological_analysis JSONB, -- Detailed grammar analysis
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(word_id, verse_id, word_position)
);

-- Indexes
CREATE INDEX idx_word_occurrences_word ON word_occurrences(word_id);
CREATE INDEX idx_word_occurrences_verse ON word_occurrences(verse_id);
CREATE INDEX idx_word_occurrences_position ON word_occurrences(word_position);
```

#### 4. ETYMOLOGICAL_DATA
```sql
CREATE TABLE etymological_data (
    id SERIAL PRIMARY KEY,
    word_id INTEGER REFERENCES words_master(id) ON DELETE CASCADE,
    
    -- Cross-linguistic connections
    hebrew_equivalent TEXT,
    hebrew_meaning TEXT,
    aramaic_equivalent TEXT,
    aramaic_meaning TEXT,
    phoenician_equivalent TEXT,
    phoenician_meaning TEXT,
    akkadian_equivalent TEXT,
    akkadian_meaning TEXT,
    
    -- Historical analysis
    proto_semitic_root TEXT,
    ancient_arabic_usage TEXT,
    pre_islamic_attestations TEXT[],
    
    -- Research metadata
    etymology_notes TEXT,
    research_confidence FLOAT CHECK (research_confidence BETWEEN 0 AND 1),
    uncertainty_factors TEXT[],
    academic_sources TEXT[],
    peer_review_status VARCHAR(20) DEFAULT 'pending',
    
    -- AI research data
    ai_research_date TIMESTAMP WITH TIME ZONE,
    ai_model_version VARCHAR(50),
    ai_confidence_score FLOAT,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(word_id)
);

-- Indexes
CREATE INDEX idx_etymological_word ON etymological_data(word_id);
CREATE INDEX idx_etymological_confidence ON etymological_data(research_confidence DESC);
```

#### 5. VIDEO_CONTENT
```sql
CREATE TABLE video_content (
    id SERIAL PRIMARY KEY,
    word_id INTEGER REFERENCES words_master(id) ON DELETE CASCADE,
    
    -- Content data
    video_title TEXT NOT NULL,
    video_description TEXT,
    script_content TEXT,
    script_sections JSONB, -- Structured script with timings
    
    -- Video metadata
    duration_seconds INTEGER,
    thumbnail_url TEXT,
    youtube_video_id VARCHAR(20) UNIQUE,
    youtube_url TEXT,
    youtube_playlist_id VARCHAR(50),
    
    -- Production data
    visual_elements JSONB, -- Charts, images, animations
    audio_narration_url TEXT,
    video_assets JSONB, -- All video components
    
    -- Publishing
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'script_ready', 'production', 'review', 'published', 'archived')),
    publish_date TIMESTAMP WITH TIME ZONE,
    scheduled_date TIMESTAMP WITH TIME ZONE,
    
    -- Analytics
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    engagement_rate FLOAT,
    watch_time_seconds INTEGER,
    
    -- SEO and metadata
    seo_tags TEXT[],
    target_keywords TEXT[],
    video_category VARCHAR(50) DEFAULT 'Education',
    language_code VARCHAR(5) DEFAULT 'en',
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_video_word ON video_content(word_id);
CREATE INDEX idx_video_status ON video_content(status);
CREATE INDEX idx_video_publish_date ON video_content(publish_date DESC);
CREATE INDEX idx_video_youtube ON video_content(youtube_video_id);
```

#### 6. CONTENT_QUEUE
```sql
CREATE TABLE content_queue (
    id SERIAL PRIMARY KEY,
    word_id INTEGER REFERENCES words_master(id) ON DELETE CASCADE,
    
    -- Priority calculation
    priority_score FLOAT NOT NULL DEFAULT 0.0,
    frequency_weight FLOAT DEFAULT 0.0,
    linguistic_interest FLOAT DEFAULT 0.0,
    user_requests INTEGER DEFAULT 0,
    academic_importance FLOAT DEFAULT 0.0,
    
    -- Status tracking
    research_status VARCHAR(20) DEFAULT 'pending' CHECK (research_status IN ('pending', 'in_progress', 'completed', 'failed', 'skipped')),
    content_status VARCHAR(20) DEFAULT 'not_started' CHECK (content_status IN ('not_started', 'script_generation', 'video_production', 'completed')),
    
    -- Scheduling
    assigned_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    target_completion_date TIMESTAMP WITH TIME ZONE,
    actual_completion_date TIMESTAMP WITH TIME ZONE,
    
    -- Metadata
    notes TEXT,
    blocking_issues TEXT[],
    dependencies INTEGER[], -- Other word IDs that should be completed first
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(word_id)
);

-- Indexes
CREATE INDEX idx_content_queue_priority ON content_queue(priority_score DESC);
CREATE INDEX idx_content_queue_research_status ON content_queue(research_status);
CREATE INDEX idx_content_queue_assigned_date ON content_queue(assigned_date);
```

#### 7. USER_INTERACTIONS
```sql
CREATE TABLE user_interactions (
    id SERIAL PRIMARY KEY,
    
    -- User identification (anonymous tracking)
    session_id UUID,
    user_agent TEXT,
    ip_address INET,
    country_code VARCHAR(2),
    
    -- Interaction data
    word_id INTEGER REFERENCES words_master(id),
    video_id INTEGER REFERENCES video_content(id),
    interaction_type VARCHAR(50) NOT NULL, -- 'view', 'search', 'bookmark', 'share', 'comment'
    interaction_value TEXT, -- Additional data (search term, comment, etc.)
    
    -- Timing
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    session_duration INTEGER, -- Seconds
    page_views INTEGER DEFAULT 1,
    
    -- Analytics
    referrer TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_user_interactions_word ON user_interactions(word_id);
CREATE INDEX idx_user_interactions_type ON user_interactions(interaction_type);
CREATE INDEX idx_user_interactions_timestamp ON user_interactions(timestamp DESC);
CREATE INDEX idx_user_interactions_session ON user_interactions(session_id);
```

### ADVANCED FEATURES

#### 8. VECTOR EMBEDDINGS (For Semantic Search)
```sql
-- Enable pgvector extension
CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE word_embeddings (
    id SERIAL PRIMARY KEY,
    word_id INTEGER REFERENCES words_master(id) ON DELETE CASCADE,
    
    -- Vector embeddings
    arabic_embedding VECTOR(1536), -- OpenAI ada-002 dimensions
    meaning_embedding VECTOR(1536),
    context_embedding VECTOR(1536),
    
    -- Metadata
    embedding_model VARCHAR(50) DEFAULT 'text-embedding-ada-002',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(word_id)
);

-- Vector similarity indexes
CREATE INDEX idx_word_embeddings_arabic ON word_embeddings USING ivfflat (arabic_embedding vector_cosine_ops);
CREATE INDEX idx_word_embeddings_meaning ON word_embeddings USING ivfflat (meaning_embedding vector_cosine_ops);
```

#### 9. ANALYTICS AGGREGATIONS
```sql
CREATE TABLE analytics_daily (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    
    -- Content metrics
    total_words_analyzed INTEGER DEFAULT 0,
    videos_published INTEGER DEFAULT 0,
    research_completed INTEGER DEFAULT 0,
    
    -- User metrics
    unique_visitors INTEGER DEFAULT 0,
    page_views INTEGER DEFAULT 0,
    avg_session_duration FLOAT DEFAULT 0.0,
    bounce_rate FLOAT DEFAULT 0.0,
    
    -- Popular content
    top_searched_words INTEGER[],
    top_viewed_videos INTEGER[],
    trending_etymologies INTEGER[],
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(date)
);
```

### ROW LEVEL SECURITY (RLS)

```sql
-- Enable RLS on all tables
ALTER TABLE quran_verses ENABLE ROW LEVEL SECURITY;
ALTER TABLE words_master ENABLE ROW LEVEL SECURITY;
ALTER TABLE word_occurrences ENABLE ROW LEVEL SECURITY;
ALTER TABLE etymological_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;

-- Public read access for core content
CREATE POLICY "Public read access" ON quran_verses FOR SELECT USING (true);
CREATE POLICY "Public read access" ON words_master FOR SELECT USING (true);
CREATE POLICY "Public read access" ON word_occurrences FOR SELECT USING (true);
CREATE POLICY "Public read access" ON etymological_data FOR SELECT USING (true);
CREATE POLICY "Public read access" ON video_content FOR SELECT USING (status = 'published');

-- Admin write access (for n8n automation)
CREATE POLICY "Admin write access" ON words_master FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin write access" ON etymological_data FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin write access" ON video_content FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
CREATE POLICY "Admin write access" ON content_queue FOR ALL USING (auth.jwt() ->> 'role' = 'admin');
```

### FUNCTIONS AND TRIGGERS

#### Auto-update timestamps
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply to all tables with updated_at
CREATE TRIGGER update_words_master_updated_at BEFORE UPDATE ON words_master FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_etymological_data_updated_at BEFORE UPDATE ON etymological_data FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_video_content_updated_at BEFORE UPDATE ON video_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

#### Update word statistics
```sql
CREATE OR REPLACE FUNCTION update_word_statistics()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE words_master 
        SET 
            total_occurrences = (
                SELECT COUNT(*) 
                FROM word_occurrences 
                WHERE word_id = NEW.word_id
            ),
            unique_verse_count = (
                SELECT COUNT(DISTINCT verse_id) 
                FROM word_occurrences 
                WHERE word_id = NEW.word_id
            ),
            updated_at = NOW()
        WHERE id = NEW.word_id;
        RETURN NEW;
    END IF;
    
    IF TG_OP = 'DELETE' THEN
        UPDATE words_master 
        SET 
            total_occurrences = (
                SELECT COUNT(*) 
                FROM word_occurrences 
                WHERE word_id = OLD.word_id
            ),
            unique_verse_count = (
                SELECT COUNT(DISTINCT verse_id) 
                FROM word_occurrences 
                WHERE word_id = OLD.word_id
            ),
            updated_at = NOW()
        WHERE id = OLD.word_id;
        RETURN OLD;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_word_statistics
    AFTER INSERT OR UPDATE OR DELETE ON word_occurrences
    FOR EACH ROW EXECUTE FUNCTION update_word_statistics();
```

### API ENDPOINTS PATTERN

#### RESTful API Structure
```yaml
Words:
  GET /api/words - List all words with pagination
  GET /api/words/{id} - Get specific word details
  GET /api/words/{id}/occurrences - Get word occurrences
  GET /api/words/{id}/etymology - Get etymology data
  GET /api/words/{id}/videos - Get related videos
  POST /api/words - Create new word (admin)

Search:
  GET /api/search?q={query} - Full-text search
  GET /api/search/semantic?q={query} - Vector similarity search
  GET /api/search/root?root={letters} - Search by root

Videos:
  GET /api/videos - List published videos
  GET /api/videos/{id} - Get video details
  POST /api/videos - Create new video (admin)
  PUT /api/videos/{id} - Update video (admin)

Analytics:
  POST /api/analytics/track - Track user interaction
  GET /api/analytics/popular - Get popular content
  GET /api/analytics/trends - Get trending words
```

### DATA IMPORT STRATEGY

#### Initial Data Population
```sql
-- Import Quran verses (6,236 total)
-- Import word frequency analysis
-- Create initial content queue with priority scores
-- Generate initial embeddings for semantic search

-- Priority calculation example
UPDATE content_queue 
SET priority_score = (
    frequency_weight * 0.4 + 
    linguistic_interest * 0.3 + 
    academic_importance * 0.2 + 
    (user_requests * 0.1)
);
```

This schema supports the complete project requirements with scalability, performance, and data integrity built-in.
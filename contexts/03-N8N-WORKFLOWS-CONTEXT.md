# N8N WORKFLOWS CONTEXT - QURANIC ETYMOLOGY EXPLORER

## WORKFLOW ARCHITECTURE OVERVIEW

### EXECUTION ENVIRONMENT
```yaml
Platform: n8n Pro (Local deployment)
Version: Latest stable
Execution Mode: Queue mode for reliability
Database: PostgreSQL (embedded)
Timezone: UTC for all scheduling
```

### CREDENTIAL CONFIGURATION
```yaml
Required Credentials:
  - supabase_api: Service role key with RLS bypass
  - anthropic_claude: API key with rate limiting awareness
  - youtube_oauth2: Channel management permissions
  - webhook_security: HMAC signature validation
  - hostinger_ftp: Website deployment access
```

## CORE WORKFLOW CONFIGURATIONS

### 1. ETYMOLOGY RESEARCH WORKFLOW
```json
{
  "name": "Etymology Research Pipeline",
  "id": "etymology_research_v1",
  "execution_order": "queue",
  "settings": {
    "timezone": "UTC",
    "saveExecutionProgress": true,
    "errorWorkflow": "error_handler_workflow"
  },
  "nodes": [
    {
      "name": "Daily Research Trigger",
      "type": "n8n-nodes-base.cron",
      "parameters": {
        "rule": {
          "hour": 6,
          "minute": 0,
          "dayOfWeek": -1
        }
      },
      "position": [100, 300],
      "id": "cron_trigger"
    },
    {
      "name": "Get Priority Word",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "getAll",
        "tableId": "content_queue",
        "filterType": "manual",
        "filter": "research_status=eq.pending",
        "sort": "priority_score.desc",
        "limit": 1,
        "credentials": "supabase_service"
      },
      "position": [300, 300],
      "id": "get_priority_word"
    },
    {
      "name": "Validate Word Data",
      "type": "n8n-nodes-base.code",
      "parameters": {
        "jsCode": "// Validate that we have a word to process\nconst items = $input.all();\n\nif (!items.length || !items[0].json.word_id) {\n  throw new Error('No words in queue for processing');\n}\n\nconst wordData = items[0].json;\n\n// Validate required fields\nif (!wordData.word_id || !wordData.priority_score) {\n  throw new Error('Invalid word data in queue');\n}\n\nreturn {\n  word_id: wordData.word_id,\n  priority_score: wordData.priority_score,\n  processing_timestamp: new Date().toISOString()\n};"
      },
      "position": [500, 300],
      "id": "validate_word"
    },
    {
      "name": "Update Status In Progress",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "update",
        "tableId": "content_queue",
        "filterType": "manual",
        "filter": "word_id=eq.{{$node['Validate Word Data'].json['word_id']}}",
        "fieldsUi": {
          "values": [
            {
              "fieldId": "research_status",
              "fieldValue": "in_progress"
            },
            {
              "fieldId": "assigned_date",
              "fieldValue": "={{new Date().toISOString()}}"
            }
          ]
        }
      },
      "position": [700, 300],
      "id": "update_status_progress"
    },
    {
      "name": "Fetch Word Details",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "get",
        "tableId": "words_master",
        "id": "={{$node['Validate Word Data'].json['word_id']}}",
        "select": "id,arabic_word,arabic_simple,root_letters,primary_meaning,total_occurrences,semantic_field"
      },
      "position": [900, 200],
      "id": "fetch_word_details"
    },
    {
      "name": "Fetch Word Occurrences",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "getAll",
        "tableId": "word_occurrences",
        "filterType": "manual",
        "filter": "word_id=eq.{{$node['Validate Word Data'].json['word_id']}}",
        "select": "word_form,contextual_meaning,quran_verses(surah_number,verse_number,arabic_text,english_translation)",
        "limit": 100
      },
      "position": [900, 400],
      "id": "fetch_occurrences"
    },
    {
      "name": "Claude Etymology Research",
      "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
      "parameters": {
        "model": "claude-3-5-sonnet-20241022",
        "maxTokens": 4000,
        "messages": {
          "values": [
            {
              "role": "user",
              "content": "ETYMOLOGY RESEARCH TASK\n\nWord: {{$node['Fetch Word Details'].json['arabic_word']}}\nRoot: {{$node['Fetch Word Details'].json['root_letters']}}\nOccurrences: {{$node['Fetch Word Details'].json['total_occurrences']}}\nContexts: {{JSON.stringify($node['Fetch Word Occurrences'].json)}}\n\nProvide comprehensive etymology analysis in JSON format:\n{\n  \"frequency_analysis\": {\n    \"distribution_pattern\": \"\",\n    \"contextual_variations\": [],\n    \"significance_score\": 0.0\n  },\n  \"etymology\": {\n    \"root_analysis\": \"\",\n    \"proto_semitic_root\": \"\",\n    \"hebrew_cognate\": \"\",\n    \"aramaic_cognate\": \"\",\n    \"phoenician_cognate\": \"\",\n    \"evolution_notes\": \"\"\n  },\n  \"semantic_analysis\": {\n    \"core_meaning\": \"\",\n    \"metaphorical_usage\": \"\",\n    \"theological_significance\": \"\"\n  },\n  \"confidence_scores\": {\n    \"etymology_confidence\": 0.0,\n    \"frequency_confidence\": 0.0,\n    \"semantic_confidence\": 0.0\n  },\n  \"academic_sources\": [],\n  \"uncertainty_factors\": []\n}\n\nResearch standards: Academic rigor, verifiable claims only, confidence scoring."
            }
          ]
        },
        "credentials": "anthropic_claude"
      },
      "position": [1100, 300],
      "id": "claude_research",
      "retryOnFail": true,
      "maxTries": 3,
      "waitBetween": 5000
    },
    {
      "name": "Parse Research Results",
      "type": "n8n-nodes-base.code",
      "parameters": {
        "jsCode": "// Parse and validate Claude's research response\nconst research = $input.first().json;\nlet researchData;\n\ntry {\n  // Extract JSON from Claude's response\n  const responseText = research.response || research.text || '';\n  const jsonMatch = responseText.match(/{[\\s\\S]*}/);\n  \n  if (!jsonMatch) {\n    throw new Error('No valid JSON found in Claude response');\n  }\n  \n  researchData = JSON.parse(jsonMatch[0]);\n  \n  // Validate required fields\n  if (!researchData.etymology || !researchData.confidence_scores) {\n    throw new Error('Invalid research data structure');\n  }\n  \n  // Calculate overall confidence\n  const confidenceScores = researchData.confidence_scores;\n  const overallConfidence = (\n    (confidenceScores.etymology_confidence || 0) +\n    (confidenceScores.frequency_confidence || 0) +\n    (confidenceScores.semantic_confidence || 0)\n  ) / 3;\n  \n  return {\n    word_id: $node['Validate Word Data'].json.word_id,\n    research_data: researchData,\n    overall_confidence: overallConfidence,\n    research_timestamp: new Date().toISOString(),\n    ai_model_version: 'claude-3-5-sonnet-20241022'\n  };\n  \n} catch (error) {\n  console.error('Research parsing error:', error);\n  throw new Error(`Failed to parse research data: ${error.message}`);\n}"
      },
      "position": [1300, 300],
      "id": "parse_research"
    },
    {
      "name": "Store Etymology Data",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "upsert",
        "tableId": "etymological_data",
        "fieldsUi": {
          "values": [
            {
              "fieldId": "word_id",
              "fieldValue": "={{$node['Parse Research Results'].json['word_id']}}"
            },
            {
              "fieldId": "hebrew_equivalent",
              "fieldValue": "={{$node['Parse Research Results'].json['research_data']['etymology']['hebrew_cognate']}}"
            },
            {
              "fieldId": "aramaic_equivalent", 
              "fieldValue": "={{$node['Parse Research Results'].json['research_data']['etymology']['aramaic_cognate']}}"
            },
            {
              "fieldId": "phoenician_equivalent",
              "fieldValue": "={{$node['Parse Research Results'].json['research_data']['etymology']['phoenician_cognate']}}"
            },
            {
              "fieldId": "proto_semitic_root",
              "fieldValue": "={{$node['Parse Research Results'].json['research_data']['etymology']['proto_semitic_root']}}"
            },
            {
              "fieldId": "etymology_notes",
              "fieldValue": "={{JSON.stringify($node['Parse Research Results'].json['research_data'])}}"
            },
            {
              "fieldId": "research_confidence",
              "fieldValue": "={{$node['Parse Research Results'].json['overall_confidence']}}"
            },
            {
              "fieldId": "ai_research_date",
              "fieldValue": "={{$node['Parse Research Results'].json['research_timestamp']}}"
            },
            {
              "fieldId": "ai_model_version",
              "fieldValue": "={{$node['Parse Research Results'].json['ai_model_version']}}"
            }
          ]
        }
      },
      "position": [1500, 300],
      "id": "store_etymology"
    },
    {
      "name": "Update Queue Completed",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "update",
        "tableId": "content_queue",
        "filterType": "manual",
        "filter": "word_id=eq.{{$node['Parse Research Results'].json['word_id']}}",
        "fieldsUi": {
          "values": [
            {
              "fieldId": "research_status",
              "fieldValue": "completed"
            },
            {
              "fieldId": "actual_completion_date",
              "fieldValue": "={{new Date().toISOString()}}"
            }
          ]
        }
      },
      "position": [1700, 300],
      "id": "update_queue_completed"
    },
    {
      "name": "Trigger Content Generation",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "http://localhost:5678/webhook/generate-content",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "word_id",
              "value": "={{$node['Parse Research Results'].json['word_id']}}"
            },
            {
              "name": "research_confidence",
              "value": "={{$node['Parse Research Results'].json['overall_confidence']}}"
            },
            {
              "name": "trigger_source", 
              "value": "etymology_research_completed"
            }
          ]
        }
      },
      "position": [1900, 300],
      "id": "trigger_content_generation"
    }
  ],
  "connections": {
    "Daily Research Trigger": {
      "main": [[{"node": "Get Priority Word", "type": "main", "index": 0}]]
    },
    "Get Priority Word": {
      "main": [[{"node": "Validate Word Data", "type": "main", "index": 0}]]
    },
    "Validate Word Data": {
      "main": [[{"node": "Update Status In Progress", "type": "main", "index": 0}]]
    },
    "Update Status In Progress": {
      "main": [
        [
          {"node": "Fetch Word Details", "type": "main", "index": 0},
          {"node": "Fetch Word Occurrences", "type": "main", "index": 0}
        ]
      ]
    },
    "Fetch Word Details": {
      "main": [[{"node": "Claude Etymology Research", "type": "main", "index": 0}]]
    },
    "Fetch Word Occurrences": {
      "main": [[{"node": "Claude Etymology Research", "type": "main", "index": 0}]]
    },
    "Claude Etymology Research": {
      "main": [[{"node": "Parse Research Results", "type": "main", "index": 0}]]
    },
    "Parse Research Results": {
      "main": [[{"node": "Store Etymology Data", "type": "main", "index": 0}]]
    },
    "Store Etymology Data": {
      "main": [[{"node": "Update Queue Completed", "type": "main", "index": 0}]]
    },
    "Update Queue Completed": {
      "main": [[{"node": "Trigger Content Generation", "type": "main", "index": 0}]]
    }
  },
  "errorWorkflow": "error_handler_workflow"
}
```

### 2. VIDEO SCRIPT GENERATION WORKFLOW
```json
{
  "name": "Video Script Generation Pipeline",
  "id": "script_generation_v1",
  "execution_order": "queue",
  "nodes": [
    {
      "name": "Content Generation Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "generate-content",
        "httpMethod": "POST",
        "responseMode": "responseNode",
        "authentication": "headerAuth",
        "options": {
          "rawBody": false,
          "allowedOrigins": "http://localhost:5678"
        }
      },
      "position": [100, 300],
      "id": "webhook_trigger"
    },
    {
      "name": "Validate Content Request",
      "type": "n8n-nodes-base.code",
      "parameters": {
        "jsCode": "// Validate incoming webhook data\nconst body = $input.first().json.body;\n\nif (!body.word_id) {\n  throw new Error('Missing word_id in request');\n}\n\nif (!body.research_confidence || body.research_confidence < 0.7) {\n  throw new Error('Research confidence too low for content generation');\n}\n\nreturn {\n  word_id: body.word_id,\n  research_confidence: body.research_confidence,\n  request_timestamp: new Date().toISOString()\n};"
      },
      "position": [300, 300],
      "id": "validate_request"
    },
    {
      "name": "Fetch Complete Word Data",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "getAll",
        "tableId": "words_master",
        "filterType": "manual",
        "filter": "id=eq.{{$node['Validate Content Request'].json['word_id']}}",
        "select": "*,etymological_data(*),word_occurrences(word_form,contextual_meaning,quran_verses(surah_number,verse_number,arabic_text,english_translation))"
      },
      "position": [500, 300],
      "id": "fetch_complete_data"
    },
    {
      "name": "Generate Video Script",
      "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
      "parameters": {
        "model": "claude-3-5-sonnet-20241022",
        "maxTokens": 4000,
        "messages": {
          "values": [
            {
              "role": "user",
              "content": "VIDEO SCRIPT GENERATION\n\nWord Data: {{JSON.stringify($node['Fetch Complete Word Data'].json[0])}}\n\nCreate a professional 5-minute YouTube video script following this structure:\n\n1. HOOK (0-15s): Engaging opening with the Arabic word\n2. FREQUENCY (15-60s): Usage statistics and patterns\n3. ETYMOLOGY (60-210s): Deep linguistic analysis\n4. CONTEXT (210-270s): Quranic usage examples\n5. CONCLUSION (270-300s): Summary and next episode\n\nInclude:\n- [VISUAL: description] markers for graphics\n- Pronunciation guides\n- Academic citations\n- Smooth transitions\n- Call-to-action elements\n\nTone: Academic yet accessible, respectful, engaging\nAudience: Educated adults interested in Quranic studies\n\nGenerate complete script ready for video production."
            }
          ]
        }
      },
      "position": [700, 200],
      "id": "generate_script"
    },
    {
      "name": "Generate Video Metadata",
      "type": "@n8n/n8n-nodes-langchain.lmChatAnthropic",
      "parameters": {
        "model": "claude-3-5-haiku-20241022",
        "maxTokens": 2000,
        "messages": {
          "values": [
            {
              "role": "user",
              "content": "YOUTUBE METADATA GENERATION\n\nWord: {{$node['Fetch Complete Word Data'].json[0]['arabic_word']}}\nMeaning: {{$node['Fetch Complete Word Data'].json[0]['primary_meaning']}}\nFrequency: {{$node['Fetch Complete Word Data'].json[0]['total_occurrences']}}\n\nGenerate JSON metadata:\n{\n  \"title\": \"SEO-optimized title (max 60 chars)\",\n  \"description\": \"Compelling description (max 5000 chars)\",\n  \"tags\": [\"10 relevant tags\"],\n  \"thumbnail_text\": \"Text for thumbnail\",\n  \"category\": \"Education\",\n  \"language\": \"en\",\n  \"keywords\": [\"SEO keywords\"]\n}\n\nFocus: Islamic studies, Arabic etymology, Quranic analysis"
            }
          ]
        }
      },
      "position": [700, 400],
      "id": "generate_metadata"
    },
    {
      "name": "Save Video Content",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "create",
        "tableId": "video_content",
        "fieldsUi": {
          "values": [
            {
              "fieldId": "word_id",
              "fieldValue": "={{$node['Validate Content Request'].json['word_id']}}"
            },
            {
              "fieldId": "script_content",
              "fieldValue": "={{$node['Generate Video Script'].json['response']}}"
            },
            {
              "fieldId": "video_title",
              "fieldValue": "={{JSON.parse($node['Generate Video Metadata'].json['response']).title}}"
            },
            {
              "fieldId": "video_description",
              "fieldValue": "={{JSON.parse($node['Generate Video Metadata'].json['response']).description}}"
            },
            {
              "fieldId": "seo_tags",
              "fieldValue": "={{JSON.parse($node['Generate Video Metadata'].json['response']).tags}}"
            },
            {
              "fieldId": "status",
              "fieldValue": "script_ready"
            }
          ]
        }
      },
      "position": [900, 300],
      "id": "save_video_content"
    },
    {
      "name": "Webhook Response",
      "type": "n8n-nodes-base.respondToWebhook",
      "parameters": {
        "respondWith": "json",
        "responseBody": "{\n  \"status\": \"success\",\n  \"video_id\": {{$node['Save Video Content'].json['id']}},\n  \"word\": \"{{$node['Fetch Complete Word Data'].json[0]['arabic_word']}}\",\n  \"script_length\": {{$node['Generate Video Script'].json['response'].length}}\n}"
      },
      "position": [1100, 300],
      "id": "webhook_response"
    }
  ]
}
```

### 3. YOUTUBE PUBLISHING WORKFLOW
```json
{
  "name": "YouTube Publishing Pipeline",
  "id": "youtube_publish_v1",
  "execution_order": "queue",
  "nodes": [
    {
      "name": "Publishing Webhook",
      "type": "n8n-nodes-base.webhook",
      "parameters": {
        "path": "publish-video",
        "httpMethod": "POST"
      },
      "position": [100, 300],
      "id": "publish_webhook"
    },
    {
      "name": "Get Video Content",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "get",
        "tableId": "video_content",
        "id": "={{$node['Publishing Webhook'].json['body']['video_id']}}",
        "select": "*,words_master(arabic_word,primary_meaning)"
      },
      "position": [300, 300],
      "id": "get_video_content"
    },
    {
      "name": "Upload to YouTube",
      "type": "n8n-nodes-base.youTube",
      "parameters": {
        "resource": "video",
        "operation": "upload",
        "title": "={{$node['Get Video Content'].json['video_title']}}",
        "description": "={{$node['Get Video Content'].json['video_description']}}",
        "tags": "={{$node['Get Video Content'].json['seo_tags']}}",
        "categoryId": "27",
        "privacyStatus": "public",
        "binaryProperty": "video_file"
      },
      "position": [500, 300],
      "id": "upload_youtube",
      "retryOnFail": true,
      "maxTries": 3
    },
    {
      "name": "Update Video Status",
      "type": "n8n-nodes-base.supabase",
      "parameters": {
        "operation": "update",
        "tableId": "video_content",
        "id": "={{$node['Get Video Content'].json['id']}}",
        "fieldsUi": {
          "values": [
            {
              "fieldId": "youtube_video_id",
              "fieldValue": "={{$node['Upload to YouTube'].json['id']}}"
            },
            {
              "fieldId": "youtube_url",
              "fieldValue": "=https://youtube.com/watch?v={{$node['Upload to YouTube'].json['id']}}"
            },
            {
              "fieldId": "status",
              "fieldValue": "published"
            },
            {
              "fieldId": "publish_date",
              "fieldValue": "={{new Date().toISOString()}}"
            }
          ]
        }
      },
      "position": [700, 300],
      "id": "update_status"
    }
  ]
}
```

## ERROR HANDLING WORKFLOWS

### Global Error Handler
```json
{
  "name": "Global Error Handler",
  "id": "error_handler_workflow",
  "nodes": [
    {
      "name": "Error Notification",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "method": "POST",
        "url": "http://localhost:5678/webhook/error-notification",
        "sendBody": true,
        "bodyParameters": {
          "parameters": [
            {
              "name": "workflow_id",
              "value": "={{$workflow.id}}"
            },
            {
              "name": "error_message",
              "value": "={{$json.error.message}}"
            },
            {
              "name": "timestamp",
              "value": "={{new Date().toISOString()}}"
            }
          ]
        }
      }
    }
  ]
}
```

## MONITORING AND ANALYTICS

### Workflow Monitoring
```yaml
Metrics to Track:
  - Execution success rates
  - Processing times per workflow
  - Claude AI API usage and costs
  - YouTube API quota consumption
  - Database performance metrics
  - Error frequencies and types

Alerting Rules:
  - Workflow failure rate > 5%
  - Claude API errors > 10 per hour
  - YouTube quota usage > 80%
  - Database response time > 2 seconds
  - Queue backlog > 50 items
```

### Performance Optimization
```yaml
Optimization Strategies:
  - Parallel processing where possible
  - Batch operations for database updates
  - Caching for repeated API calls
  - Queue management for high-volume periods
  - Rate limiting compliance
  - Resource cleanup after execution
```

## DEPLOYMENT AND SCALING

### Local Deployment
```yaml
Setup:
  - n8n Pro license activation
  - Database initialization
  - Credential configuration
  - Workflow import and activation
  - Health check validation

Backup Strategy:
  - Daily workflow exports
  - Database backups
  - Credential encryption
  - Execution history retention
```

### Scaling Considerations
```yaml
Horizontal Scaling:
  - Multiple n8n instances for high load
  - Load balancing for webhooks
  - Database connection pooling
  - Queue distribution strategies

Vertical Scaling:
  - Memory allocation for large datasets
  - CPU optimization for parallel processing
  - Storage management for execution data
  - Network bandwidth for API calls
```

This context provides complete workflow specifications for reliable, production-ready automation.
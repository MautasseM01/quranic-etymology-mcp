# Quranic Etymology Explorer - MCP Context Server

## Overview
AI-powered educational platform for deep Quranic word analysis through etymology, frequency patterns, and cross-linguistic research. This MCP server provides complete project context for AI-assisted development.

## Features
- **Complete Project Context**: Full project specifications and requirements
- **Database Schema**: Comprehensive Supabase PostgreSQL schema
- **API Endpoints**: Complete REST API and real-time subscriptions
- **N8N Workflows**: Automation templates for research and content generation
- **Frontend Components**: Lovable/React component specifications
- **Design System**: Complete UI/UX design tokens and patterns
- **Prompts Library**: Ready-to-use AI prompts for development tasks

## Tech Stack
- **Frontend**: Lovable (React/Next.js) + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Vector Store)
- **Automation**: n8n Pro (Local deployment)
- **AI**: Claude Sonnet 4 (MCP integrated)
- **Hosting**: Hostinger Pro
- **Video**: YouTube Data API v3

## MCP Integration

### Installation
Add to your Claude Desktop MCP configuration:

```json
{
  "mcpServers": {
    "quranic-etymology-context": {
      "command": "npx",
      "args": ["mcp-remote", "https://gitmcp.io/YOUR_USERNAME/quranic-etymology-mcp"]
    }
  }
}
```

### Available Tools
- `load_project_context` - Load complete project context
- `get_lovable_prompts` - Get frontend development prompts
- `get_n8n_workflows` - Get workflow automation templates
- `get_supabase_schema` - Get database schema specifications

### Usage Examples

**Load Full Project Context:**
```
Use the load_project_context tool to load all Quranic Etymology Explorer project specifications.
```

**Generate Frontend Component:**
```
Using the Master Frontend Prompt Template, create a homepage component for Lovable platform.
```

**Create N8N Workflow:**
```
Generate an etymology research workflow using the n8n templates provided.
```

## Project Structure

```
quranic-etymology-mcp/
├── README.md                           # This file
├── mcp.json                           # MCP server configuration
├── contexts/                          # Project context files
│   ├── 00-PROJECT-MASTER-CONTEXT.md
│   ├── 01-DATABASE-SCHEMA-CONTEXT.md
│   ├── 02-API-ENDPOINTS-CONTEXT.md
│   ├── 03-N8N-WORKFLOWS-CONTEXT.md
│   ├── 04-FRONTEND-COMPONENTS-CONTEXT.md
│   ├── 05-DESIGN-SYSTEM-CONTEXT.md
│   ├── 06-CONTENT-STRATEGY-CONTEXT.md
│   ├── 07-RESEARCH-METHODOLOGY-CONTEXT.md
│   ├── 08-DEPLOYMENT-CONTEXT.md
│   ├── 09-TESTING-STRATEGY-CONTEXT.md
│   └── 10-PROMPTS-LIBRARY-CONTEXT.md
└── tools/
    └── context-loader.js              # MCP server implementation
```

## Development Workflow

1. **Load Context**: Start each session by loading project context
2. **Select Focus**: Choose specific context area (frontend, backend, workflows)
3. **Use Prompts**: Apply specialized prompts from the library
4. **Iterate**: Build upon previous context for continuous development

## Quality Standards
- **Research Accuracy**: 90%+ verified against academic sources
- **Automation Success**: 95%+ workflow completion rate
- **User Engagement**: 5%+ target engagement rate
- **Performance**: <2 hours total video generation time
- **Accessibility**: WCAG 2.1 AA compliance

## Contributing
This MCP server is part of the Quranic Etymology Explorer project. Context files are continuously updated based on project evolution and AI development best practices.

## License
Educational use - Academic and research purposes

## Contact
For questions about this MCP context server or the Quranic Etymology Explorer project, please refer to the project documentation in the context files.
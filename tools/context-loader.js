#!/usr/bin/env node

/**
 * Quranic Etymology Explorer - MCP Context Server
 * Compatible with MCP SDK v1.12.0+ and gitmcp.io
 * Provides complete project context for AI-assisted development
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Server configuration
const server = new Server(
  {
    name: "quranic-etymology-context",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Context file mappings - Updated with correct filename
const CONTEXT_FILES = {
  master: '00-PROJECT-MASTER-CONTEXT.md',
  database: '01-DATABASE-SCHEMA-CONTEXT.md',
  api: '02-API-ENDPOINTS-CONTEXT.md',
  workflows: '03-N8N-WORKFLOWS-CONTEXT.md',
  frontend: '04-FRONTEND-COMPONENTS-CONTEXT.md',
  design: '05-DESIGN-SYSTEM-CONTEXT.md',
  content: '06-CONTENT-STRATEGY-CONTEXT.md',
  research: '07-RESEARCH-METHODOLOGY-CONTEXT.md',
  deployment: '08-DEPLOYMENT-CONTEXT.md',
  testing: '09-TESTING-STRATEGY-CONTEXT.md',
  prompts: '10-PROMPTS-LIBRARY-CONTEXT.md',
  'ai-acceleration': '11-AI-ACCELERATION-STRATEGIES.md'
};

// Helper function to read context file
function readContextFile(filename) {
  try {
    const filePath = path.join(__dirname, '..', 'contexts', filename);
    if (fs.existsSync(filePath)) {
      return fs.readFileSync(filePath, 'utf8');
    } else {
      return `# Context file ${filename} not found\n\nExpected path: ${filePath}\n\nAvailable files: ${Object.values(CONTEXT_FILES).join(', ')}`;
    }
  } catch (error) {
    return `# Error reading ${filename}\n\nError: ${error.message}`;
  }
}

// Helper function to get multiple context files
function getContextFiles(sections = ['all']) {
  let content = '# QURANIC ETYMOLOGY EXPLORER - PROJECT CONTEXT\n\n';
  
  if (sections.includes('all')) {
    // Load all context files
    Object.entries(CONTEXT_FILES).forEach(([key, filename]) => {
      content += `\n## === ${key.toUpperCase().replace('-', ' ')} CONTEXT ===\n\n`;
      content += readContextFile(filename);
      content += '\n\n---\n';
    });
  } else {
    // Load specific sections
    sections.forEach(section => {
      if (CONTEXT_FILES[section]) {
        const filename = CONTEXT_FILES[section];
        content += `\n## === ${section.toUpperCase().replace('-', ' ')} CONTEXT ===\n\n`;
        content += readContextFile(filename);
        content += '\n\n---\n';
      } else {
        content += `\n## ERROR: Unknown section '${section}'\n\nAvailable sections: ${Object.keys(CONTEXT_FILES).join(', ')}\n\n`;
      }
    });
  }
  
  return content;
}

// Register tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "load_project_context",
        description: "Load Quranic Etymology Explorer project context files including database schema and AI acceleration strategies",
        inputSchema: {
          type: "object",
          properties: {
            sections: {
              type: "array",
              items: {
                type: "string",
                enum: [...Object.keys(CONTEXT_FILES), "all"]
              },
              description: "Context sections to load. Use 'database' for schema, 'ai-acceleration' for AI strategies, or 'all' for everything.",
              default: ["all"]
            }
          }
        }
      },
      {
        name: "get_database_schema",
        description: "Get complete Supabase database schema and API specifications",
        inputSchema: {
          type: "object",
          properties: {
            include_api: {
              type: "boolean",
              description: "Include API endpoints documentation",
              default: true
            }
          }
        }
      },
      {
        name: "get_ai_acceleration_strategies",
        description: "Get AI acceleration strategies for rapid development",
        inputSchema: {
          type: "object",
          properties: {}
        }
      },
      {
        name: "get_n8n_workflows",
        description: "Get n8n workflow templates and configurations",
        inputSchema: {
          type: "object",
          properties: {
            workflow_type: {
              type: "string",
              enum: ["research", "content-generation", "publishing", "all"],
              description: "Specific workflow templates to retrieve",
              default: "all"
            }
          }
        }
      }
    ]
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  
  try {
    switch (name) {
      case 'load_project_context': {
        const sections = args?.sections || ['all'];
        const content = getContextFiles(sections);
        
        return {
          content: [
            {
              type: "text",
              text: content
            }
          ]
        };
      }
      
      case 'get_database_schema': {
        const databaseContent = readContextFile(CONTEXT_FILES.database);
        const includeApi = args?.include_api !== false;
        
        let content = `# SUPABASE DATABASE SCHEMA\n\n${databaseContent}`;
        
        if (includeApi) {
          const apiContent = readContextFile(CONTEXT_FILES.api);
          content += `\n\n# API ENDPOINTS\n\n${apiContent}`;
        }
        
        return {
          content: [
            {
              type: "text",
              text: content
            }
          ]
        };
      }
      
      case 'get_ai_acceleration_strategies': {
        const aiAccelerationContent = readContextFile(CONTEXT_FILES['ai-acceleration']);
        
        return {
          content: [
            {
              type: "text",
              text: `# AI ACCELERATION STRATEGIES\n\n${aiAccelerationContent}`
            }
          ]
        };
      }
      
      case 'get_n8n_workflows': {
        const workflowsContent = readContextFile(CONTEXT_FILES.workflows);
        const workflowType = args?.workflow_type || 'all';
        
        let filteredContent = workflowsContent;
        if (workflowType !== 'all') {
          // Extract specific workflow type
          const sections = workflowsContent.split('###');
          const targetSection = sections.find(section => 
            section.toLowerCase().includes(workflowType)
          );
          if (targetSection) {
            filteredContent = `###${targetSection}`;
          }
        }
        
        return {
          content: [
            {
              type: "text",
              text: `# N8N WORKFLOW TEMPLATES\n\n${filteredContent}`
            }
          ]
        };
      }
      
      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: `Error executing tool ${name}: ${error.message}`
        }
      ],
      isError: true
    };
  }
});

// Start the server
async function main() {
  try {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    
    // Log successful start to stderr (won't interfere with MCP protocol)
    console.error('Quranic Etymology Context MCP Server started successfully');
  } catch (error) {
    console.error('Failed to start MCP server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.error('Received SIGINT, shutting down gracefully');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.error('Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

// Start the server if this file is run directly
main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
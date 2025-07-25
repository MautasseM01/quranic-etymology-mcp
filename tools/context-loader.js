#!/usr/bin/env node

/**
 * Quranic Etymology Explorer - MCP Context Server
 * Compatible with MCP SDK v1.12.0+
 * Provides complete project context for AI-assisted development
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
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

// Context file mappings
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
      return `# ERROR: Context file ${filename} not found\n\nFile path: ${filePath}`;
    }
  } catch (error) {
    return `# ERROR: Failed to read ${filename}\n\nError: ${error.message}`;
  }
}

// Helper function to get multiple context files
function getContextFiles(sections = ['all']) {
  let content = '# QURANIC ETYMOLOGY EXPLORER - PROJECT CONTEXT\n\n';
  
  if (sections.includes('all')) {
    // Load all context files
    Object.entries(CONTEXT_FILES).forEach(([key, filename]) => {
      content += `\n## === ${filename.replace('.md', '').replace(/-/g, ' ').toUpperCase()} ===\n\n`;
      content += readContextFile(filename);
      content += '\n\n---\n';
    });
  } else {
    // Load specific sections
    sections.forEach(section => {
      if (CONTEXT_FILES[section]) {
        const filename = CONTEXT_FILES[section];
        content += `\n## === ${filename.replace('.md', '').replace(/-/g, ' ').toUpperCase()} ===\n\n`;
        content += readContextFile(filename);
        content += '\n\n---\n';
      } else {
        content += `\n## ERROR: Unknown section '${section}'\n\nAvailable sections: ${Object.keys(CONTEXT_FILES).join(', ')}\n\n`;
      }
    });
  }
  
  return content;
}

// Input schemas
const LoadProjectContextSchema = z.object({
  sections: z.array(z.enum([...Object.keys(CONTEXT_FILES), "all"])).optional().default(["all"])
});

const GetLovablePromptsSchema = z.object({
  component_type: z.enum(["homepage", "search", "word-detail", "video-gallery", "all"]).optional().default("all")
});

const GetN8nWorkflowsSchema = z.object({
  workflow_type: z.enum(["research", "content-generation", "publishing", "all"]).optional().default("all")
});

const GetSupabaseSchemaSchema = z.object({
  include_examples: z.boolean().optional().default(true)
});

const GetDesignSystemSchema = z.object({
  category: z.enum(["colors", "typography", "spacing", "components", "all"]).optional().default("all")
});

// Register tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "load_project_context",
        description: "Load Quranic Etymology Explorer project context files",
        inputSchema: {
          type: "object",
          properties: {
            sections: {
              type: "array",
              items: {
                type: "string",
                enum: [...Object.keys(CONTEXT_FILES), "all"]
              },
              description: "Context sections to load (default: all)",
              default: ["all"]
            }
          }
        }
      },
      {
        name: "get_lovable_prompts",
        description: "Get Lovable frontend development prompts and templates",
        inputSchema: {
          type: "object",
          properties: {
            component_type: {
              type: "string",
              enum: ["homepage", "search", "word-detail", "video-gallery", "all"],
              description: "Specific component prompts to retrieve",
              default: "all"
            }
          }
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
      },
      {
        name: "get_supabase_schema",
        description: "Get complete Supabase database schema and API specifications",
        inputSchema: {
          type: "object",
          properties: {
            include_examples: {
              type: "boolean",
              description: "Include API usage examples",
              default: true
            }
          }
        }
      },
      {
        name: "get_design_system",
        description: "Get complete design system tokens and component specifications",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              enum: ["colors", "typography", "spacing", "components", "all"],
              description: "Design system category to retrieve",
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
        const validatedArgs = LoadProjectContextSchema.parse(args);
        const content = getContextFiles(validatedArgs.sections);
        
        return {
          content: [
            {
              type: "text",
              text: content
            }
          ]
        };
      }
      
      case 'get_lovable_prompts': {
        const validatedArgs = GetLovablePromptsSchema.parse(args);
        const promptsContent = readContextFile(CONTEXT_FILES.prompts);
        const componentType = validatedArgs.component_type;
        
        let filteredContent = promptsContent;
        if (componentType !== 'all') {
          // Extract specific component prompts
          const lines = promptsContent.split('\n');
          const startIndex = lines.findIndex(line => 
            line.toLowerCase().includes(componentType.replace('-', ' '))
          );
          if (startIndex !== -1) {
            const endIndex = lines.findIndex((line, idx) => 
              idx > startIndex && line.startsWith('####')
            );
            filteredContent = lines.slice(startIndex, endIndex !== -1 ? endIndex : undefined).join('\n');
          }
        }
        
        return {
          content: [
            {
              type: "text",
              text: `# LOVABLE FRONTEND PROMPTS\n\n${filteredContent}`
            }
          ]
        };
      }
      
      case 'get_n8n_workflows': {
        const validatedArgs = GetN8nWorkflowsSchema.parse(args);
        const workflowsContent = readContextFile(CONTEXT_FILES.workflows);
        const workflowType = validatedArgs.workflow_type;
        
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
      
      case 'get_supabase_schema': {
        const validatedArgs = GetSupabaseSchemaSchema.parse(args);
        const databaseContent = readContextFile(CONTEXT_FILES.database);
        const apiContent = readContextFile(CONTEXT_FILES.api);
        const includeExamples = validatedArgs.include_examples;
        
        let content = `# SUPABASE DATABASE SCHEMA & API\n\n${databaseContent}`;
        
        if (includeExamples) {
          content += `\n\n# API ENDPOINTS & EXAMPLES\n\n${apiContent}`;
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
      
      case 'get_design_system': {
        const validatedArgs = GetDesignSystemSchema.parse(args);
        const designContent = readContextFile(CONTEXT_FILES.design);
        const category = validatedArgs.category;
        
        let filteredContent = designContent;
        if (category !== 'all') {
          // Extract specific design category
          const lines = designContent.split('\n');
          const startIndex = lines.findIndex(line => 
            line.toLowerCase().includes(category.toLowerCase()) && line.startsWith('#')
          );
          if (startIndex !== -1) {
            const endIndex = lines.findIndex((line, idx) => 
              idx > startIndex && line.startsWith('#') && !line.toLowerCase().includes(category.toLowerCase())
            );
            filteredContent = lines.slice(startIndex, endIndex !== -1 ? endIndex : undefined).join('\n');
          }
        }
        
        return {
          content: [
            {
              type: "text",
              text: `# DESIGN SYSTEM - ${category.toUpperCase()}\n\n${filteredContent}`
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

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}
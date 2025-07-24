#!/usr/bin/env node

/**
 * Quranic Etymology Explorer - MCP Context Server
 * Provides complete project context for AI-assisted development
 */

const { Server } = require('@modelcontextprotocol/sdk/server/index.js');
const { StdioServerTransport } = require('@modelcontextprotocol/sdk/server/stdio.js');
const fs = require('fs');
const path = require('path');

// Server configuration
const server = new Server(
  {
    name: "quranic-etymology-context",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
      resources: {},
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
  prompts: '10-PROMPTS-LIBRARY-CONTEXT.md'
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

// Register tools
server.setRequestHandler('tools/list', async () => {
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
server.setRequestHandler('tools/call', async (request) => {
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
      
      case 'get_lovable_prompts': {
        const promptsContent = readContextFile(CONTEXT_FILES.prompts);
        const componentType = args?.component_type || 'all';
        
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
      
      case 'get_supabase_schema': {
        const databaseContent = readContextFile(CONTEXT_FILES.database);
        const apiContent = readContextFile(CONTEXT_FILES.api);
        const includeExamples = args?.include_examples !== false;
        
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
        const designContent = readContextFile(CONTEXT_FILES.design);
        const category = args?.category || 'all';
        
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

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { server };
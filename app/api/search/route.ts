import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Define the search result interface
interface SearchResult {
  title: string;
  path: string;
  excerpt: string;
  relevance: number;
}

// Function to read and parse MDX files
async function getMdxFiles(dir: string): Promise<SearchResult[]> {
  const results: SearchResult[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      // Recursively search subdirectories
      results.push(...await getMdxFiles(fullPath));
    } else if (entry.name.endsWith('.mdx')) {
      try {
        // Read and parse the MDX file
        const fileContent = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContent);
        
        // Create the URL path
        let urlPath = fullPath
          .replace(/^.*?\/contents\//, '/')
          .replace(/\/index\.mdx$/, '')
          .replace(/\.mdx$/, '');
        
        // Add to results
        results.push({
          title: data.title || entry.name.replace('.mdx', ''),
          path: urlPath,
          excerpt: content.substring(0, 150).replace(/\n/g, ' ').trim() + '...',
          relevance: 0 // Will be calculated during search
        });
      } catch (error) {
        console.error(`Error processing ${fullPath}:`, error);
      }
    }
  }

  return results;
}

// Cache for search index
let searchIndex: SearchResult[] | null = null;

// Calculate relevance score for a search result
function calculateRelevance(item: SearchResult, query: string): number {
  const lowerQuery = query.toLowerCase();
  const lowerTitle = item.title.toLowerCase();
  const lowerExcerpt = item.excerpt.toLowerCase();
  
  let score = 0;
  
  // Title matches are more important
  if (lowerTitle === lowerQuery) {
    score += 100; // Exact title match
  } else if (lowerTitle.includes(lowerQuery)) {
    score += 50; // Partial title match
    
    // Bonus for title starting with query
    if (lowerTitle.startsWith(lowerQuery)) {
      score += 25;
    }
  }
  
  // Content matches
  if (lowerExcerpt.includes(lowerQuery)) {
    score += 30;
    
    // Count occurrences in excerpt for additional relevance
    const occurrences = (lowerExcerpt.match(new RegExp(lowerQuery, 'g')) || []).length;
    score += occurrences * 5;
  }
  
  // Penalize very short or generic titles
  if (item.title.length < 5) {
    score -= 10;
  }
  
  // Bonus for docs (likely more important than blogs)
  if (item.path.startsWith('/docs')) {
    score += 10;
  }
  
  return score;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    // Build or use cached search index
    if (!searchIndex) {
      const contentDir = path.join(process.cwd(), 'contents');
      searchIndex = await getMdxFiles(contentDir);
    }

    // Perform search with relevance scoring
    const lowerQuery = query.toLowerCase();
    
    // Filter and score results
    const scoredResults = searchIndex
      .filter(item => 
        item.title.toLowerCase().includes(lowerQuery) || 
        item.excerpt.toLowerCase().includes(lowerQuery)
      )
      .map(item => {
        // Calculate relevance score
        const relevance = calculateRelevance(item, query);
        return { ...item, relevance };
      })
      // Only include results with positive relevance
      .filter(item => item.relevance > 0);
    
    // Deduplicate results by path
    const uniquePaths = new Set<string>();
    const uniqueResults = scoredResults.filter(item => {
      if (uniquePaths.has(item.path)) {
        return false;
      }
      uniquePaths.add(item.path);
      return true;
    });
    
    // Sort by relevance score (highest first)
    const sortedResults = uniqueResults.sort((a, b) => b.relevance - a.relevance);
    
    return NextResponse.json(sortedResults.slice(0, 10));
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}

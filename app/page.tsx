"use client";

import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import { DatabaseIcon, GitBranchIcon, UsersIcon, GithubIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { Stepper, StepperItem } from "@/components/markdown/stepper";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Commit {
  sha: string;
  message: string;
  date: string;
  author: string;
  avatar: string;
  url: string;
}

interface Contributor {
  name: string;
  avatar: string;
  contributions: number;
  role: string;
  url: string;
}

// GitHub API types
interface GitHubCommit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  } | null;
  html_url: string;
}

interface GitHubContributor {
  login: string;
  avatar_url: string;
  contributions: number;
  html_url: string;
}

// Default roles based on contribution count
const getRoleByContributions = (count: number): string => {
  if (count > 30) return "Project Lead";
  if (count > 20) return "Core Contributor";
  if (count > 10) return "Regular Contributor";
  if (count > 5) return "Contributor";
  return "New Contributor";
};

// Format date to YYYY-MM-DD
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
};

// Get first 7 characters of SHA
const shortenSha = (sha: string): string => {
  return sha.substring(0, 7);
};

// Get initials from name
const getInitials = (name: string): string => {
  return name.split(' ')
    .map(part => part.charAt(0))
    .join('')
    .substring(0, 2)
    .toUpperCase();
};

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
    
    const fetchGitHubData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch commits
        const commitsResponse = await fetch('https://api.github.com/repos/FrederickStempfle/PenDocs/commits?per_page=5');
        
        if (!commitsResponse.ok) {
          throw new Error(`GitHub API error: ${commitsResponse.status}`);
        }
        
        const commitsData: GitHubCommit[] = await commitsResponse.json();
        
        const formattedCommits: Commit[] = commitsData.map(commit => ({
          sha: commit.sha,
          message: commit.commit.message.split('\n')[0], // Get first line of commit message
          date: formatDate(commit.commit.author.date),
          author: commit.author?.login || commit.commit.author.name,
          avatar: commit.author?.avatar_url || `https://github.com/identicons/${commit.commit.author.name}`,
          url: commit.html_url
        }));
        
        setCommits(formattedCommits);
        
        // Fetch contributors
        const contributorsResponse = await fetch('https://api.github.com/repos/FrederickStempfle/PenDocs/contributors?per_page=5');
        
        if (!contributorsResponse.ok) {
          throw new Error(`GitHub API error: ${contributorsResponse.status}`);
        }
        
        const contributorsData: GitHubContributor[] = await contributorsResponse.json();
        
        const formattedContributors: Contributor[] = contributorsData.map(contributor => ({
          name: contributor.login,
          avatar: contributor.avatar_url,
          contributions: contributor.contributions,
          role: getRoleByContributions(contributor.contributions),
          url: contributor.html_url
        }));
        
        setContributors(formattedContributors);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError('Failed to load GitHub data. Using fallback data.');
        
        // Fallback data in case of API failure
        setCommits([
          {
            sha: "a1b2c3d",
            message: "Update SQLMap vulnerability detection documentation",
            date: "2025-08-29",
            author: "FrederickStempfle",
            avatar: "https://github.com/identicons/app/oauth_app/1234",
            url: "#"
          },
          {
            sha: "e5f6g7h",
            message: "Add new examples for advanced SQL injection techniques",
            date: "2025-08-27",
            author: "contributor1",
            avatar: "https://github.com/identicons/app/oauth_app/5678",
            url: "#"
          },
          {
            sha: "i9j0k1l",
            message: "Fix code formatting in database enumeration section",
            date: "2025-08-25",
            author: "contributor2",
            avatar: "https://github.com/identicons/app/oauth_app/9012",
            url: "#"
          },
          {
            sha: "m2n3o4p",
            message: "Implement custom search functionality",
            date: "2025-08-23",
            author: "FrederickStempfle",
            avatar: "https://github.com/identicons/app/oauth_app/1234",
            url: "#"
          },
          {
            sha: "q5r6s7t",
            message: "Initial documentation structure",
            date: "2025-08-20",
            author: "FrederickStempfle",
            avatar: "https://github.com/identicons/app/oauth_app/1234",
            url: "#"
          }
        ]);
        
        setContributors([
          {
            name: "FrederickStempfle",
            avatar: "https://github.com/identicons/app/oauth_app/1234",
            contributions: 47,
            role: "Project Lead",
            url: "https://github.com/FrederickStempfle"
          },
          {
            name: "contributor1",
            avatar: "https://github.com/identicons/app/oauth_app/5678",
            contributions: 23,
            role: "Documentation",
            url: "#"
          },
          {
            name: "contributor2",
            avatar: "https://github.com/identicons/app/oauth_app/9012",
            contributions: 15,
            role: "Developer",
            url: "#"
          },
          {
            name: "contributor3",
            avatar: "https://github.com/identicons/app/oauth_app/3456",
            contributions: 8,
            role: "Reviewer",
            url: "#"
          },
          {
            name: "contributor4",
            avatar: "https://github.com/identicons/app/oauth_app/7890",
            contributions: 5,
            role: "Contributor",
            url: "#"
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGitHubData();
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col items-center justify-center text-center px-4">
        <div className="mb-8">
          <DatabaseIcon className="w-16 h-16 mx-auto mb-4 text-primary" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4 max-w-3xl">
          PenDocs: Penetration Testing Documentation
        </h1>
        <p className="mb-8 text-lg md:text-xl max-w-[800px] text-muted-foreground">
          A comprehensive open-source documentation platform for security tools and penetration testing techniques.
          Learn everything from basic usage to advanced exploitation methods for authorized security testing.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <Link
            href={`/docs${page_routes[0].href}`}
            className={buttonVariants({ className: "px-8", size: "lg" })}
          >
            Get Started
          </Link>
          <Link
            href="/docs/sqlmap/introduction"
            className={buttonVariants({
              variant: "outline",
              className: "px-8",
              size: "lg",
            })}
          >
            Browse Docs
          </Link>
        </div>
      </section>


      {/* GitHub Activity Section */}
      <section className="w-full py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-12">
            <GitBranchIcon className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold text-center">Recent Updates</h2>
          </div>
          
          {isClient && (
            <div className="max-w-[800px] mx-auto">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                  <p className="text-muted-foreground">Loading commit history...</p>
                </div>
              ) : error ? (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">{error}</p>
                </div>
              ) : (
                <Stepper>
                  {commits.map((commit) => (
                    <StepperItem key={commit.sha} title={commit.message}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={commit.avatar} alt={commit.author} />
                            <AvatarFallback>{commit.author.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{commit.author}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{commit.date}</span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <code className="text-xs bg-muted px-1 py-0.5 rounded">{shortenSha(commit.sha)}</code>
                        <Link 
                          href={commit.url}
                          target="_blank"
                          className="text-xs text-primary hover:underline"
                        >
                          View commit
                        </Link>
                      </div>
                    </StepperItem>
                  ))}
                </Stepper>
              )}
              <div className="flex justify-center mt-8">
                <Link 
                  href="https://github.com/FrederickStempfle/PenDocs" 
                  target="_blank"
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                    className: "flex items-center gap-2"
                  })}
                >
                  <GithubIcon className="w-4 h-4" />
                  View on GitHub
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Contributors Section */}
      <section className="w-full py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 mb-12">
            <UsersIcon className="w-6 h-6 text-primary" />
            <h2 className="text-3xl font-bold text-center">Contributors</h2>
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
              <p className="text-muted-foreground">Loading contributors...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-[1200px] mx-auto">
              {contributors.map((contributor) => (
                <Card key={contributor.name} className="overflow-hidden hover:border-primary transition-colors">
                  <Link href={contributor.url} target="_blank" className="block">
                    <CardHeader className="p-4">
                      <div className="flex flex-col items-center">
                        <Avatar className="h-16 w-16 mb-2">
                          <AvatarImage src={contributor.avatar} alt={contributor.name} />
                          <AvatarFallback>{getInitials(contributor.name)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-center text-base">{contributor.name}</CardTitle>
                        <p className="text-center text-sm text-muted-foreground">{contributor.role}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0 flex justify-center">
                      <span className="text-sm font-medium">
                        {contributor.contributions} contributions
                      </span>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">Want to contribute to PenDocs?</p>
            <Link 
              href="/blog/contributing" 
              className={buttonVariants({
                className: "flex items-center gap-2 mx-auto"
              })}
            >
              Join Our Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

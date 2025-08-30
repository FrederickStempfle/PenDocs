// for page navigation & to sort on leftbar

export type EachRoute = {
  title: string;
  href: string;
  noLink?: true; // noLink will create a route segment (section) but cannot be navigated
  items?: EachRoute[];
  tag?: string;
};

export const ROUTES: EachRoute[] = [
  {
    title: "Burp Suite Guide",
    href: "/burp-suite",
    noLink: true,
    items: [
      { title: "Introduction", href: "/introduction" },
      {
        title: "Core Features",
        href: "/core-features",
        items: [
          { title: "Free Edition", href: "/free-edition" },
          { title: "Professional Edition", href: "/professional-edition" }
        ]
      },
      {
        title: "Tools",
        href: "/tools",
        items: [
          { title: "Proxy", href: "/proxy" },
          { title: "Scanner", href: "/scanner" },
          { title: "Intruder", href: "/intruder" },
          { title: "Repeater", href: "/repeater" },
          { title: "Decoder", href: "/decoder" },
          { title: "Comparer", href: "/comparer" },
          { title: "Sequencer", href: "/sequencer" },
          { title: "Target", href: "/target" },
          { title: "Extender", href: "/extender" },
          { title: "Options", href: "/options" }
        ]
      },
      { title: "Advanced Techniques", href: "/advanced-techniques" }
    ]
  },
  {
    title: "XSS Guide",
    href: "/xss",
    noLink: true,
    items: [
      { title: "Introduction", href: "/introduction" },
      { title: "Fundamentals", href: "/fundamentals" },
      {
        title: "Attack Techniques",
        href: "/attack-techniques",
        items: [
          { title: "Identification Techniques", href: "/identification-techniques" },
          { title: "Exploitation Strategies", href: "/exploitation-strategies" },
          { title: "Evasion Techniques", href: "/evasion-techniques" },
        ]
      },
      { title: "Defense and Mitigation", href: "/defense-mitigation" }
    ]
  },
  {
    title: "SQLMap Guide",
    href: "/sqlmap",
    noLink: true,
    items: [
      { title: "Introduction", href: "/introduction" },
      {
        title: "Core Operations",
        href: "/core-operations",
        items: [
          { title: "Basic Syntax", href: "/basic-syntax" },
          { title: "Request Customization", href: "/request-customization" },
          { title: "Session Management", href: "/session-management" },
        ],
      },
      {
        title: "Vulnerability Detection",
        href: "/vulnerability-detection",
        items: [
          { title: "Test Intensity", href: "/test-intensity" },
          { title: "Injection Techniques", href: "/injection-techniques" },
          { title: "Optimizing Detection", href: "/optimizing-detection" },
        ],
      },
      {
        title: "Database Enumeration",
        href: "/database-enumeration",
        items: [
          { title: "Database Structure", href: "/database-structure" },
          { title: "Data Extraction", href: "/data-extraction" },
          { title: "File System Access", href: "/file-system-access" },
        ],
      },
      {
        title: "Advanced Techniques",
        href: "/advanced-techniques",
        items: [
          { title: "OS Command Execution", href: "/os-command-execution" },
          { title: "Privilege Escalation", href: "/privilege-escalation" },
          { title: "Maintaining Access", href: "/maintaining-access" },
        ],
      },
      {
        title: "Evasion Techniques",
        href: "/evasion-techniques",
        items: [
          { title: "WAF Detection", href: "/waf-detection" },
          { title: "Tamper Scripts", href: "/tamper-scripts" },
          { title: "Other Evasion Methods", href: "/other-evasion-methods" },
        ],
      },
    ],
  },
  {
    title: "Reverse Shells Guide",
    href: "/reverse-shells",
    noLink: true,
    items: [
      { title: "Introduction", href: "/introduction" },
      { title: "Core Concepts", href: "/core-concepts" },
      { title: "Types of Reverse Shells", href: "/types" },
      { title: "Advanced Techniques", href: "/advanced-techniques" },
      { title: "Evasion Techniques", href: "/evasion-techniques" },
      { title: "Best Practices", href: "/best-practices" }
    ]
  },
  {
    title: "John the Ripper Guide",
    href: "/john-the-ripper",
    noLink: true,
    items: [
      { title: "Introduction", href: "/introduction" },
      {
        title: "Core Operations",
        href: "/core-operations",
        items: [
          { title: "Basic Usage", href: "/basic-usage" },
          { title: "Command Line Options", href: "/command-line-options" },
          { title: "Hash Formats", href: "/hash-formats" },
        ],
      },
      {
        title: "Password Cracking Techniques",
        href: "/password-cracking-techniques",
        items: [
          { title: "Dictionary Attacks", href: "/dictionary-attacks" },
          { title: "Rule-Based Attacks", href: "/rule-based-attacks" },
          { title: "Brute Force Attacks", href: "/brute-force-attacks" },
        ],
      },
      {
        title: "Advanced Techniques",
        href: "/advanced-techniques",
        items: [
          { title: "Extracting Hashes", href: "/extracting-hashes" },
          { title: "Custom Rules Creation", href: "/custom-rules-creation" },
          { title: "Cracking Protected Files", href: "/cracking-protected-files" },
        ],
      },
      {
        title: "Penetration Testing Workflow",
        href: "/penetration-testing-workflow",
        items: [
          { title: "Pre-Engagement", href: "/pre-engagement" },
          { title: "Reconnaissance", href: "/reconnaissance" },
          { title: "Vulnerability Analysis", href: "/vulnerability-analysis" },
          { title: "Exploitation", href: "/exploitation" },
          { title: "Post-Exploitation", href: "/post-exploitation" },
        ],
      },
      {
        title: "Optimization Best Practices",
        href: "/optimization-best-practices",
        items: [
          { title: "Best Practices", href: "/best-practices" },
        ],
      },
    ],
  },
  {
    title: "Nmap Guide",
    href: "/nmap",
    noLink: true,
    items: [
      { title: "Introduction", href: "/introduction" },
      {
        title: "Core Operations",
        href: "/core-operations",
        items: [
          { title: "Basic Syntax", href: "/basic-syntax" },
          { title: "Scan Types", href: "/scan-types" },
          { title: "Target Selection", href: "/target-selection" },
        ],
      },
      {
        title: "Advanced Techniques",
        href: "/advanced-techniques",
        items: [
          { title: "Service Detection", href: "/service-detection" },
          { title: "OS Detection", href: "/os-detection" },
          { title: "Timing and Performance", href: "/timing-performance" },
          { title: "Scripting Engine", href: "/scripting-engine" },
        ],
      },
      {
        title: "Practical Applications",
        href: "/practical-applications",
        items: [
          { title: "Network Inventory", href: "/network-inventory" },
          { title: "Vulnerability Assessment", href: "/vulnerability-assessment" },
          { title: "Firewall Evasion", href: "/firewall-evasion" },
        ],
      },
      { title: "Best Practices", href: "/best-practices" },
    ],
  },
];

type Page = { title: string; href: string };

function getRecursiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecursiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecursiveAllLinks(it)).flat();

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
    title: "SQLMap Guide",
    href: "/sqlmap",
    noLink: true,
    tag: "New",
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
];

type Page = { title: string; href: string };

function getRecurrsiveAllLinks(node: EachRoute) {
  const ans: Page[] = [];
  if (!node.noLink) {
    ans.push({ title: node.title, href: node.href });
  }
  node.items?.forEach((subNode) => {
    const temp = { ...subNode, href: `${node.href}${subNode.href}` };
    ans.push(...getRecurrsiveAllLinks(temp));
  });
  return ans;
}

export const page_routes = ROUTES.map((it) => getRecurrsiveAllLinks(it)).flat();

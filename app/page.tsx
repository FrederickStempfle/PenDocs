import { buttonVariants } from "@/components/ui/button";
import { page_routes } from "@/lib/routes-config";
import { DatabaseIcon, BookOpenIcon, ShieldIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex sm:min-h-[87.5vh] min-h-[82vh] flex-col sm:items-center justify-center text-center sm:py-8 py-14">
      <div className="mb-8">
        <DatabaseIcon className="w-16 h-16 mx-auto mb-4 text-primary" />
      </div>
      <h1 className="text-[2rem] leading-8 sm:px-8 md:leading-[4.5rem] font-bold mb-4 sm:text-6xl text-center">
        SQL Docs
      </h1>
      <h2 className="text-xl sm:text-2xl mb-6 text-center">
        Made by Frederick Stempfle
      </h2>
      <p className="mb-8 md:text-lg text-base max-w-[900px] text-muted-foreground text-center">
        A comprehensive guide to SQLMap - the powerful SQL injection and database exploitation tool.
        Learn everything from basic syntax to advanced techniques for authorized security testing.
      </p>
      
      <div className="grid sm:grid-cols-3 grid-cols-1 gap-6 mb-12 max-w-[1000px]">
        <div className="border rounded-lg p-6 flex flex-col items-center text-center hover:border-primary transition-colors">
          <BookOpenIcon className="w-10 h-10 mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">Comprehensive Guide</h3>
          <p className="text-muted-foreground">Detailed documentation covering all aspects of SQLMap from basic to advanced usage</p>
        </div>
        
        <div className="border rounded-lg p-6 flex flex-col items-center text-center hover:border-primary transition-colors">
          <ShieldIcon className="w-10 h-10 mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">Security Focus</h3>
          <p className="text-muted-foreground">Learn ethical hacking techniques with a strong emphasis on responsible security testing</p>
        </div>
        
        <div className="border rounded-lg p-6 flex flex-col items-center text-center hover:border-primary transition-colors">
          <DatabaseIcon className="w-10 h-10 mb-4 text-primary" />
          <h3 className="text-lg font-semibold mb-2">Database Expertise</h3>
          <p className="text-muted-foreground">Explore database enumeration, data extraction, and advanced exploitation techniques</p>
        </div>
      </div>
      
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
          SQLMap Guide
        </Link>
      </div>
    </div>
  );
}

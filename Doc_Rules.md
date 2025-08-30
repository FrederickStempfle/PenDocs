# PenDocs Documentation Structure Guidelines

This document outlines the standard structure for creating documentation posts for PenDocs. Following these guidelines ensures consistency across all tool documentation.

## Frontmatter Requirements

Every documentation MDX file must begin with frontmatter:

---
title: The Expert's [Tool Name] Guide
description: A comprehensive guide to [specific purpose] with [Tool Name]
---

## Document Structure

### 1. Introduction

Start with a comprehensive introduction that provides an overview of the tool. This should be 2-3 paragraphs explaining what the tool is, its purpose, and why it's valuable for penetration testing.

Example:
> Welcome to the comprehensive SQLMap guide. This documentation provides detailed instructions on using SQLMap, one of the most powerful and versatile SQL injection tools available for penetration testing.

### 2. Overview Tabs

After the introduction, include tabs with the following sections:
- **Overview**: A detailed explanation of what the tool does
- **Key Features**: Bulleted list of the tool's main capabilities
- **Version History**: Brief timeline of major versions and their improvements

Example content for Key Features tab:
- **Fully automated SQL injection tool**
- **Support for multiple database systems**: MySQL, Oracle, PostgreSQL, Microsoft SQL Server, etc.
- **Six SQL injection techniques**: boolean-based blind, time-based blind, error-based, UNION query, stacked queries, and out-of-band

### 3. Why Use This Tool?

Create a section with a heading "Why Use [Tool Name]?" followed by a bulleted list of benefits, with each item formatted as:
- **Benefit Name**: Detailed explanation of the benefit

Example:
- **Automation**: Automates the process of detecting and exploiting SQL injection vulnerabilities
- **Comprehensive**: Supports multiple database management systems

### 4. Getting Started Section

Include a "Getting Started with [Tool Name]" section that provides step-by-step instructions for:
1. Installation
2. Verification
3. Basic usage

Present these as numbered steps with clear titles and concise instructions.

### 5. Guide Structure

Include a section outlining how the rest of the documentation is organized. This should be a numbered list of the main sections that follow, with brief descriptions of what each covers.

Example:
1. **Core Operations and Targeting**: Basic syntax, targeting methods, and request customization
2. **Vulnerability Detection and Analysis**: Controlling test intensity, specifying injection techniques

### 6. Main Content Sections

Organize the main content with clear hierarchical headings:

#### Core Concepts and Basic Usage
- Fundamental principles
- Basic command syntax
- Common operations

#### Advanced Techniques
- More complex usage scenarios
- Specialized features

#### Best Practices
- Optimization tips
- Security considerations
- Recommended workflows

#### Troubleshooting
- Common issues and solutions
- Error messages and their meaning

### 7. Reference Section

End with a reference section that includes:
- Command reference
- Configuration options
- Additional resources and links

## Content Formatting Guidelines

### Headings

- Use title case for main headings (## Heading)
- Use sentence case for subheadings (### Subheading)
- Maintain a clear hierarchy (don't skip levels)

### Text Emphasis

- Use **bold** for tool options, commands, and important terms
- Use *italics* sparingly for emphasis
- Use `code formatting` for command syntax, file paths, and configuration values

### Lists

- Use bulleted lists for features, benefits, and unordered items
- Use numbered lists for sequential steps or prioritized items
- Format list items consistently (start with capital letter, use similar grammatical structure)

### Callouts

Use callouts for important information:
- Info callouts for additional context
- Warning callouts for potential issues
- Tip callouts for best practices

### Examples

Provide clear, practical examples that show:
- Real-world usage scenarios
- Expected output or results
- Common variations

## Final Checklist

Before submitting documentation, ensure:

- [ ] Title follows the "The Expert's [Tool Name] Guide" format
- [ ] Introduction clearly explains the tool's purpose
- [ ] All required sections are included and properly ordered
- [ ] Examples are practical and accurate
- [ ] Content is technically accurate and up-to-date
- [ ] Spelling and grammar are correct
- [ ] Formatting is consistent with these guidelines

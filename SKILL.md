---
name: web-page-loader
description: Load a web page from a given URL and return its full text content as context for the LLM to process. Use when the user provides a URL and asks to load, read, fetch, analyze, or summarize a web page.
---

# Web Page Loader

This skill fetches the complete content of a web page from a provided URL and returns it as clean text for further analysis, summarization, or Q&A.

## Examples

- "Load this page: https://en.wikipedia.org/wiki/Switzerland"
- "Read the content of https://example.com and summarize it"
- "What does this article say? https://news.example.com/article"

## Instructions

Call the run_js tool with the following exact parameters:
- data: A JSON string with the following fields
  - url: the full URL of the web page to load (e.g., "https://example.com/article").

DO NOT use any other tool, DO NOT call run_intent.

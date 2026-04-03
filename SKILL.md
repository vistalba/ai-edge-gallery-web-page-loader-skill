---
name: web-page-loader
description: Loads a web page from a given URL and returns its full text content as context for the LLM to process.
---

# Web Page Loader

## Purpose
This skill fetches the complete content of a web page from a provided URL and returns it as clean text for further analysis, summarization, or Q&A.

## Instructions
When the user provides a URL or asks to load/read/analyze a web page, call the `run_js` tool with the following exact parameters:

- script name: index.html
- data: A JSON string with the following field:
  - url: String. The full URL of the web page to load (e.g. "https://example.com/article").

After receiving the result, use the returned text content as context to answer the user's follow-up questions, summarize the page, or perform any requested analysis.

## Example Usage
- "Load this page: https://en.wikipedia.org/wiki/Switzerland"
- "Read the content of https://example.com and summarize it"
- "What does this article say? https://news.example.com/article"
- "Summarize the article of this web page https://news.example.com/article"

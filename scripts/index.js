window['ai_edge_gallery_get_result'] = async (dataStr) => {
  try {
    const jsonData = JSON.parse(dataStr || '{}');
    const url = jsonData.url;

    if (!url) {
      return JSON.stringify({ error: "No URL provided." });
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.8'
      }
    });

    if (!response.ok) {
      return JSON.stringify({
        error: `Failed to fetch URL. HTTP ${response.status} ${response.statusText}`
      });
    }

    const html = await response.text();

    // Parse HTML and extract clean text
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    // Remove non-content elements
    const removeSelectors = [
      'script', 'style', 'noscript', 'iframe',
      'nav', 'footer', 'header',
      '[role="navigation"]', '[role="banner"]',
      '.sidebar', '.advertisement', '.ads', '.cookie-banner',
      '.popup', '.modal'
    ];
    removeSelectors.forEach(selector => {
      doc.querySelectorAll(selector).forEach(el => el.remove());
    });

    // Extract metadata
    const title = doc.querySelector('title')?.textContent?.trim() || 'No title';
    const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';

    // Prefer main content area
    let textContent = '';
    const mainContent = doc.querySelector('main, article, [role="main"], .content, #content');
    if (mainContent) {
      textContent = mainContent.innerText || mainContent.textContent;
    } else {
      textContent = doc.body?.innerText || doc.body?.textContent || '';
    }

    // Clean up whitespace
    textContent = textContent
      .replace(/\t/g, ' ')
      .replace(/[ ]{2,}/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();

    // Truncate if too long
    const MAX_CHARS = 100000;
    let truncated = false;
    if (textContent.length > MAX_CHARS) {
      textContent = textContent.substring(0, MAX_CHARS);
      truncated = true;
    }

    const result = [
      `Page Title: ${title}`,
      metaDesc ? `Description: ${metaDesc}` : '',
      `URL: ${url}`,
      `Content Length: ${textContent.length} chars${truncated ? ' (truncated)' : ''}`,
      '',
      '---',
      '',
      textContent
    ].filter(line => line !== '').join('\n');

    return JSON.stringify({ result: result });

  } catch (e) {
    console.error(e);
    return JSON.stringify({
      error: `Failed to load web page: ${e.message}`
    });
  }
};

/**
 * site-nav.js — Shared Navigation Component for now.ufmastery.com
 * 
 * Auto-injects navigation elements into cinematic essay pages.
 * Reads from siteConfig (loaded via site-config.js).
 * 
 * ┌─────────────────────────────────────────────────┐
 *  INTEGRATION (add to any cinematic piece):
 * 
 *   <body data-piece-id="the-first-realization">
 *     ...your cinematic HTML content...
 *     <script src="/site-config.js"></script>
 *     <script src="/site-nav.js"></script>
 *   </body>
 * 
 *  That's it. Two script tags, one data attribute.
 * └─────────────────────────────────────────────────┘
 * 
 * What gets injected:
 *   1. Return bar — subtle fixed element at top: wordmark + return to gateway
 *   2. Series nav — only for series pieces: compact progress bar (P 1 2 3 4 5 6 7)
 *   3. End block — after your content:
 *      - Recommended next piece
 *      - Related reads (2–4 pieces)
 *      - Subscribe link
 *      - Return to gateway
 * 
 * The component injects its own CSS. It will not conflict with
 * your existing page styles because all selectors are prefixed with .ufm-nav.
 */

(function() {
  'use strict';

  // ─── Guard ────────────────────────────────────────────────────────
  if (typeof siteConfig === 'undefined') {
    console.warn('site-nav.js: siteConfig not found. Load site-config.js first.');
    return;
  }

  const pieceId = document.body.getAttribute('data-piece-id');
  if (!pieceId) {
    console.warn('site-nav.js: No data-piece-id found on <body>.');
    return;
  }

  // ─── Helpers ──────────────────────────────────────────────────────
  function getPiece(id) {
    return siteConfig.pieces.find(p => p.id === id) || null;
  }

  function pieceUrl(piece) {
    return siteConfig.site.baseUrl + piece.slug;
  }

  function getSeries(seriesId) {
    return siteConfig.series ? siteConfig.series.find(s => s.id === seriesId) : null;
  }

  function getSeriesPieces(seriesId) {
    const series = getSeries(seriesId);
    if (!series || !series.readingOrder) return [];
    return series.readingOrder
      .map(id => getPiece(id))
      .filter(p => p && p.status === 'published');
  }

  function getSeriesHub(seriesId) {
    const series = getSeries(seriesId);
    if (!series || !series.hubId) return null;
    return getPiece(series.hubId);
  }

  const currentPiece = getPiece(pieceId);
  if (!currentPiece) {
    console.warn('site-nav.js: Piece "' + pieceId + '" not found in config.');
    return;
  }

  // ─── Inject CSS ───────────────────────────────────────────────────
  const css = `
    /* ─── site-nav.js injected styles ─────────────────────────────── */
    /* All selectors prefixed .ufm-nav to avoid conflicts */

    .ufm-nav-return-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.9rem clamp(1.5rem, 5vw, 4rem);
      background: linear-gradient(to bottom, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.0) 100%);
      pointer-events: none;
      opacity: 0;
      transform: translateY(-4px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .ufm-nav-return-bar.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .ufm-nav-return-bar a,
    .ufm-nav-return-bar span {
      pointer-events: auto;
    }

    .ufm-nav-wordmark {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.68rem;
      font-weight: 400;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: rgba(160, 133, 53, 0.6);
      text-decoration: none;
      transition: color 0.35s ease;
    }
    .ufm-nav-wordmark:hover {
      color: rgba(201, 168, 76, 0.9);
    }

    .ufm-nav-return-link {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.78rem;
      font-style: italic;
      color: rgba(154, 149, 140, 0.5);
      text-decoration: none;
      transition: color 0.35s ease;
    }
    .ufm-nav-return-link:hover {
      color: rgba(201, 168, 76, 0.8);
    }

    /* ─── Series nav bar ──────────────────────────────────────────── */
    .ufm-nav-series-bar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1001;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0;
      padding: 0.7rem 1rem;
      background: rgba(10,10,10,0.95);
      border-bottom: 1px solid rgba(201, 168, 76, 0.08);
      opacity: 0;
      transform: translateY(-4px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    .ufm-nav-series-bar.visible {
      opacity: 1;
      transform: translateY(0);
    }

    .ufm-nav-series-back {
      position: absolute;
      left: clamp(1rem, 4vw, 3rem);
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.75rem;
      font-style: italic;
      color: rgba(154, 149, 140, 0.45);
      text-decoration: none;
      transition: color 0.35s ease;
    }
    .ufm-nav-series-back:hover {
      color: rgba(201, 168, 76, 0.8);
    }

    .ufm-nav-series-items {
      display: flex;
      align-items: center;
      gap: 0;
    }

    .ufm-nav-series-item {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.72rem;
      font-weight: 400;
      letter-spacing: 0.04em;
      color: rgba(154, 149, 140, 0.4);
      text-decoration: none;
      padding: 0.35rem 0.55rem;
      border-radius: 2px;
      transition: color 0.3s ease, background 0.3s ease;
      white-space: nowrap;
    }
    .ufm-nav-series-item:hover {
      color: rgba(201, 168, 76, 0.8);
    }
    .ufm-nav-series-item.current {
      color: rgba(201, 168, 76, 0.9);
      background: rgba(201, 168, 76, 0.08);
    }

    /* When series bar is present, push return bar down */
    .ufm-nav-has-series .ufm-nav-return-bar {
      top: 2.6rem;
    }

    /* ─── End block ───────────────────────────────────────────────── */
    .ufm-nav-end {
      max-width: 740px;
      margin: 0 auto;
      padding: clamp(5rem, 10vh, 8rem) clamp(1.5rem, 5vw, 4rem) 3rem;
    }

    .ufm-nav-end-divider {
      width: 36px;
      height: 1px;
      background: rgba(160, 133, 53, 0.4);
      margin: 0 auto 4rem;
    }

    /* Recommended next */
    .ufm-nav-next-label {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.68rem;
      font-weight: 400;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: rgba(160, 133, 53, 0.6);
      margin-bottom: 1rem;
    }

    .ufm-nav-next-card {
      display: block;
      padding: 2rem 1.8rem;
      background: rgba(20, 20, 19, 1);
      border: 1px solid rgba(201, 168, 76, 0.10);
      border-radius: 2px;
      text-decoration: none;
      position: relative;
      transition: border-color 0.5s ease, background 0.5s ease, transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    }
    .ufm-nav-next-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(160,133,53,0.4), transparent);
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    .ufm-nav-next-card:hover {
      border-color: rgba(201, 168, 76, 0.22);
      background: rgba(26, 25, 24, 1);
      transform: translateY(-2px);
    }
    .ufm-nav-next-card:hover::before {
      opacity: 1;
    }

    .ufm-nav-next-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(1.15rem, 2vw, 1.4rem);
      font-weight: 400;
      color: #e8e4dc;
      line-height: 1.35;
      margin-bottom: 0.4rem;
    }

    .ufm-nav-next-detail {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.9rem;
      color: #9a958c;
      line-height: 1.6;
      margin-bottom: 0.6rem;
    }

    .ufm-nav-next-meta {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.75rem;
      color: #6b665e;
      letter-spacing: 0.05em;
    }

    /* Related reads */
    .ufm-nav-related {
      margin-top: 3rem;
    }

    .ufm-nav-related-label {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.68rem;
      font-weight: 400;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      color: rgba(160, 133, 53, 0.5);
      margin-bottom: 1rem;
    }

    .ufm-nav-related-grid {
      display: grid;
      gap: 0.75rem;
    }

    .ufm-nav-related-link {
      display: block;
      padding: 1.1rem 1.4rem;
      background: rgba(20, 20, 19, 0.6);
      border: 1px solid rgba(201, 168, 76, 0.07);
      border-radius: 2px;
      text-decoration: none;
      transition: border-color 0.4s ease, background 0.4s ease;
    }
    .ufm-nav-related-link:hover {
      border-color: rgba(201, 168, 76, 0.18);
      background: rgba(26, 25, 24, 0.8);
    }

    .ufm-nav-related-title {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(0.95rem, 1.5vw, 1.1rem);
      font-weight: 400;
      color: #e8e4dc;
      line-height: 1.35;
      margin-bottom: 0.2rem;
    }

    .ufm-nav-related-summary {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.82rem;
      color: rgba(154, 149, 140, 0.7);
      line-height: 1.55;
    }

    /* Subscribe + return */
    .ufm-nav-footer {
      margin-top: 4rem;
      padding-top: 3rem;
      border-top: 1px solid rgba(201, 168, 76, 0.06);
      text-align: center;
    }

    .ufm-nav-subscribe-heading {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: clamp(1.1rem, 2vw, 1.35rem);
      font-weight: 300;
      color: #e8e4dc;
      margin-bottom: 0.4rem;
    }

    .ufm-nav-subscribe-sub {
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.88rem;
      font-style: italic;
      color: #9a958c;
      margin-bottom: 1.5rem;
    }

    .ufm-nav-subscribe-link {
      display: inline-block;
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.88rem;
      color: rgba(160, 133, 53, 0.7);
      padding: 0.7rem 1.6rem;
      border: 1px solid rgba(201, 168, 76, 0.10);
      border-radius: 2px;
      text-decoration: none;
      transition: border-color 0.4s ease, color 0.4s ease, background 0.4s ease;
    }
    .ufm-nav-subscribe-link:hover {
      border-color: rgba(201, 168, 76, 0.22);
      color: #c9a84c;
      background: rgba(201, 168, 76, 0.06);
    }

    .ufm-nav-gateway-return {
      display: block;
      margin-top: 2.5rem;
      font-family: 'Cormorant Garamond', Georgia, serif;
      font-size: 0.82rem;
      font-style: italic;
      color: rgba(154, 149, 140, 0.45);
      text-decoration: none;
      transition: color 0.35s ease;
    }
    .ufm-nav-gateway-return:hover {
      color: rgba(201, 168, 76, 0.7);
    }

    /* ─── Responsive ──────────────────────────────────────────────── */
    @media (max-width: 600px) {
      .ufm-nav-series-back {
        display: none;
      }
      .ufm-nav-series-item {
        padding: 0.3rem 0.4rem;
        font-size: 0.68rem;
      }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);


  // ─── Build: Return bar ────────────────────────────────────────────
  // (Only shown for non-series pieces. Series pieces get the series bar instead.)
  const isSeriesPiece = currentPiece.series && currentPiece.seriesOrder !== null && currentPiece.seriesOrder !== undefined;
  const isHub = currentPiece.role === 'hub';

  if (!isSeriesPiece) {
    const returnBar = document.createElement('div');
    returnBar.className = 'ufm-nav-return-bar';
    returnBar.innerHTML = `
      <a href="${siteConfig.site.baseUrl}/" class="ufm-nav-wordmark">${siteConfig.site.name}</a>
      <a href="${siteConfig.site.baseUrl}/" class="ufm-nav-return-link">&larr; Library</a>
    `;
    document.body.prepend(returnBar);

    // Show after a short scroll
    let returnBarShown = false;
    window.addEventListener('scroll', function() {
      if (!returnBarShown && window.scrollY > 120) {
        returnBar.classList.add('visible');
        returnBarShown = true;
      }
    }, { passive: true });
  }


  // ─── Build: Series nav bar ────────────────────────────────────────
  if (isSeriesPiece || isHub) {
    const seriesId = currentPiece.series;
    const series = getSeries(seriesId);
    const hub = getSeriesHub(seriesId);
    const seriesPieces = getSeriesPieces(seriesId);

    if (series && seriesPieces.length > 0) {
      document.body.classList.add('ufm-nav-has-series');

      const seriesBar = document.createElement('div');
      seriesBar.className = 'ufm-nav-series-bar';

      // Back link to hub or gateway
      const backTarget = hub ? pieceUrl(hub) : siteConfig.site.baseUrl + '/';
      const backLabel = hub ? '&larr; Series' : '&larr; Library';

      let itemsHtml = '';

      // For series with a premise (seriesOrder 0), show "P" for premise
      seriesPieces.forEach(p => {
        const isCurrent = p.id === currentPiece.id;
        const label = p.seriesOrder === 0 ? 'P' : p.seriesOrder;
        itemsHtml += `<a href="${pieceUrl(p)}" class="ufm-nav-series-item ${isCurrent ? 'current' : ''}" title="${p.title}">${label}</a>`;
      });

      // If current piece is the hub, highlight nothing in the items
      const hubIsCurrent = isHub;

      seriesBar.innerHTML = `
        <a href="${backTarget}" class="ufm-nav-series-back">${backLabel}</a>
        <div class="ufm-nav-series-items">
          ${itemsHtml}
        </div>
      `;

      document.body.prepend(seriesBar);

      // Also add a return bar beneath the series bar
      const returnBar = document.createElement('div');
      returnBar.className = 'ufm-nav-return-bar';
      returnBar.innerHTML = `
        <a href="${siteConfig.site.baseUrl}/" class="ufm-nav-wordmark">${siteConfig.site.name}</a>
        <a href="${siteConfig.site.baseUrl}/" class="ufm-nav-return-link">&larr; Library</a>
      `;
      document.body.prepend(seriesBar); // re-prepend to keep order: series bar on top
      seriesBar.after(returnBar);

      // Show both after scroll
      let barsShown = false;
      window.addEventListener('scroll', function() {
        if (!barsShown && window.scrollY > 120) {
          seriesBar.classList.add('visible');
          returnBar.classList.add('visible');
          barsShown = true;
        }
      }, { passive: true });
    }
  }


  // ─── Build: End block ─────────────────────────────────────────────
  const endBlock = document.createElement('div');
  endBlock.className = 'ufm-nav-end';

  let endHtml = '<div class="ufm-nav-end-divider"></div>';

  // Recommended next
  if (currentPiece.recommendedNext) {
    const nextPiece = getPiece(currentPiece.recommendedNext);
    if (nextPiece && nextPiece.status === 'published') {
      const detail = nextPiece.subtitle || nextPiece.summary;
      const meta = nextPiece.readTime ? '~' + nextPiece.readTime + ' min read' : '';
      endHtml += `
        <div class="ufm-nav-next-label">Continue</div>
        <a href="${pieceUrl(nextPiece)}" class="ufm-nav-next-card">
          <div class="ufm-nav-next-title">${nextPiece.title}</div>
          ${detail ? '<div class="ufm-nav-next-detail">' + detail + '</div>' : ''}
          ${meta ? '<div class="ufm-nav-next-meta">' + meta + '</div>' : ''}
        </a>
      `;
    }
  }

  // Related reads
  if (currentPiece.relatedPieces && currentPiece.relatedPieces.length > 0) {
    const related = currentPiece.relatedPieces
      .map(id => getPiece(id))
      .filter(p => p && p.status === 'published' && p.id !== currentPiece.recommendedNext)
      .slice(0, 4);

    if (related.length > 0) {
      endHtml += `
        <div class="ufm-nav-related">
          <div class="ufm-nav-related-label">Related</div>
          <div class="ufm-nav-related-grid">
            ${related.map(p => `
              <a href="${pieceUrl(p)}" class="ufm-nav-related-link">
                <div class="ufm-nav-related-title">${p.title}</div>
                ${p.summary ? '<div class="ufm-nav-related-summary">' + p.summary + '</div>' : ''}
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }
  }

  // Subscribe + return to gateway
  const subscribeUrl = siteConfig.site.email ? siteConfig.site.email.url : siteConfig.site.cmsUrl + '/subscribe';

  endHtml += `
    <div class="ufm-nav-footer">
      <div class="ufm-nav-subscribe-heading">Stay in this work</div>
      <div class="ufm-nav-subscribe-sub">Occasional writing on identity, structure, and freedom. Quietly sent.</div>
      <a href="${subscribeUrl}" class="ufm-nav-subscribe-link">Subscribe &rarr;</a>
      <a href="${siteConfig.site.baseUrl}/" class="ufm-nav-gateway-return">&larr; Return to the library</a>
    </div>
  `;

  endBlock.innerHTML = endHtml;
  document.body.appendChild(endBlock);

})();

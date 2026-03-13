/**
 * now.ufmastery.com — Site Configuration
 * 
 * This is the single source of truth for all cinematic pieces.
 * The gateway homepage, navigation, related reads, and cross-links
 * all read from this file.
 *
 * To add a new piece:
 *   1. Create the HTML file
 *   2. Add an entry here
 *   3. Everything else updates automatically
 *
 * Fields:
 *   id            — unique identifier, used for cross-referencing
 *   title         — display title
 *   subtitle      — short descriptor shown beneath the title (optional)
 *   slug          — URL path relative to now.ufmastery.com
 *   summary       — one sentence for navigation contexts
 *   cluster       — thematic territory: identity | stability | love | freedom
 *   role          — function: threshold | deep-dive | bridge | interactive | hub
 *   series        — series ID if part of a series, null otherwise
 *   seriesOrder   — position within a series (0 = premise, 1–7 = essays), null if standalone
 *   featured      — appears on the gateway homepage
 *   featuredOrder  — controls homepage placement within its pathway section (lower = higher); only set on featured items
 *   recommendedNext — one piece ID; the single strongest next step
 *   relatedPieces — array of piece IDs; the wider neighborhood
 *   status        — published | draft | archived
 *   publishDate   — ISO date string
 *   readTime      — approximate read time in minutes
 */

const siteConfig = {

  // ─── Site-level metadata ───────────────────────────────────────────
  site: {
    name: "Ultimate Freedom Mastery",
    tagline: "A cinematic library for seeing the deeper structures beneath human experience",
    baseUrl: "https://now.ufmastery.com",
    cmsUrl: "https://ufmastery.com",
    cta: {
      label: "Begin a diagnostic conversation",
      url: "https://ufmastery.com/diagnostic"  // update when live
    },
    email: {
      label: "Stay in this work",
      url: "https://ufmastery.com/subscribe"  // update when live
    }
  },

  // ─── Cluster definitions ───────────────────────────────────────────
  // Used by the homepage to generate pathway sections.
  // Order here = display order on the gateway homepage.
  clusters: [
    {
      id: "identity",
      label: "Seeing the game",
      description: "How identity shapes what seems true, feels real, and becomes possible"
    },
    {
      id: "stability",
      label: "Holding structure under pressure",
      description: "What happens when identity activates — and what allows coherence to remain"
    },
    {
      id: "love",
      label: "Love, conflict, and care",
      description: "How identity shapes relationship, compassion, and moral clarity"
    },
    {
      id: "freedom",
      label: "What freedom actually is",
      description: "Beyond recognition — what it takes for architecture to change"
    }
  ],

  // ─── Series definitions ────────────────────────────────────────────
  series: [
    {
      id: "identity-architecture",
      title: "The Identity Architecture Series",
      subtitle: "An ongoing investigation",
      hubId: "ias-hub",
      readingOrder: [
        "ias-premise",
        "ias-the-pattern",
        "ias-the-hidden-architecture",
        "ias-what-identity-is-trying-to-produce",
        "ias-being",
        "ias-architecture",
        "ias-instrument",
        "ias-the-upgrade"
      ]
    },
    {
      id: "ultimate-freedom",
      title: "Ultimate Freedom",
      subtitle: "After Identity Architecture",
      hubId: "uf-hub",
      readingOrder: [
        "uf-the-question-that-follows",
        "uf-the-redesign-environment",
        "uf-the-architecture-of-freedom",
        "uf-the-movement"
      ]
    }
  ],

  // ─── All pieces ────────────────────────────────────────────────────
  pieces: [

    // ═══════════════════════════════════════════════════════════════════
    //  STANDALONE PIECES
    // ═══════════════════════════════════════════════════════════════════

    {
      id: "the-first-realization",
      title: "The First Realization",
      subtitle: "On the moment your experience stops looking like reality and starts looking like architecture",
      slug: "/the-first-realization/",
      summary: "The moment you notice that your experience is being produced by something other than what happened.",
      cluster: "identity",
      role: "threshold",
      series: null,
      seriesOrder: null,
      featured: true,
      featuredOrder: 1,
      recommendedNext: "ias-hub",
      relatedPieces: ["ias-the-pattern", "ias-the-hidden-architecture", "recalculating"],
      status: "published",
      publishDate: "2024-01-01",  // approximate — update with actual date
      readTime: 6
    },

    {
      id: "recalculating",
      title: "Recalculating",
      subtitle: "On knowing where you stand",
      slug: "/recalculating/",
      summary: "A recognition that the navigation system you've been following may not know where you actually are.",
      cluster: "identity",
      role: "threshold",
      series: null,
      seriesOrder: null,
      featured: true,
      featuredOrder: 2,
      recommendedNext: "the-first-realization",
      relatedPieces: ["the-crack-in-the-script", "ias-hub"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 5
    },

    {
      id: "the-crack-in-the-script",
      title: "The Crack in the Script",
      subtitle: null,  // update when accessible
      slug: "/the-crack-in-the-script/",
      summary: "When the story you've been living inside starts to show its edges.",
      cluster: "identity",
      role: "threshold",
      series: null,
      seriesOrder: null,
      featured: true,
      featuredOrder: 3,
      recommendedNext: "the-first-realization",
      relatedPieces: ["recalculating", "ias-the-pattern"],
      status: "published",  // NOTE: returned 404 on fetch — verify URL
      publishDate: "2024-01-01",
      readTime: null  // update when accessible
    },

    {
      id: "the-layer-beneath-mindset",
      title: "The Layer Beneath Mindset",
      subtitle: "Why high-functioning adults still destabilize under pressure — and the structural layer no one is addressing",
      slug: "/the-layer-beneath-mindset/",
      summary: "Introduces orientation as the structural layer beneath mindset that existing disciplines don't address.",
      cluster: "stability",
      role: "bridge",
      series: null,
      seriesOrder: null,
      featured: true,
      featuredOrder: 1,
      recommendedNext: "stability-under-activation",
      relatedPieces: ["ias-hub", "the-interrupt", "ias-architecture"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 10
    },

    {
      id: "stability-under-activation",
      title: "Stability Under Activation",
      subtitle: "Identity, Recovery, and the Discipline of Sovereignty",
      slug: "/stability-under-activation/",
      summary: "What happens when identity activates under pressure — and the discipline required to hold structure.",
      cluster: "stability",
      role: "deep-dive",
      series: null,
      seriesOrder: null,
      featured: true,
      featuredOrder: 2,
      recommendedNext: "uf-hub",
      relatedPieces: ["the-layer-beneath-mindset", "the-interrupt", "ias-the-pattern"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 15
    },

    {
      id: "the-interrupt",
      title: "The Interrupt",
      subtitle: null,
      slug: "/the-interrupt/",
      summary: "An interactive experience designed to produce self-awareness through pause rather than explanation.",
      cluster: "stability",
      role: "interactive",
      series: null,
      seriesOrder: null,
      featured: true,
      featuredOrder: 3,
      recommendedNext: "the-first-realization",
      relatedPieces: ["the-layer-beneath-mindset", "stability-under-activation"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 3
    },

    {
      id: "the-circle-of-love",
      title: "The Circle of Love",
      subtitle: null,  // update when accessible
      slug: "/the-circle-of-love/",
      summary: "How identity shapes love, conflict, and the capacity for genuine care.",
      cluster: "love",
      role: "deep-dive",
      series: null,
      seriesOrder: null,
      featured: true,
      featuredOrder: 1,
      recommendedNext: "uf-hub",
      relatedPieces: ["ias-what-identity-is-trying-to-produce", "uf-the-architecture-of-freedom"],
      status: "published",  // NOTE: returned 404 on fetch — verify URL
      publishDate: "2024-01-01",
      readTime: null  // update when accessible
    },

    {
      id: "the-return-to-life",
      title: "The Return to Life",
      subtitle: "What freedom becomes when it matures",
      slug: "/the-return-to-life/",
      summary: "Why relief is not yet embodiment — and what it means for freedom to enter the body of a life.",
      cluster: "freedom",
      role: "deep-dive",
      series: null,
      seriesOrder: null,
      featured: true,
      featuredOrder: 2,
      recommendedNext: "the-circle-of-love",
      relatedPieces: ["uf-the-movement", "uf-the-architecture-of-freedom", "stability-under-activation"],
      status: "published",
      publishDate: "2025-03-12",
      readTime: 20
    },

    {
      id: "ultimate-freedom-flagship",
      title: "Ultimate Freedom",
      subtitle: "The hidden structure beneath human striving",
      slug: "/ultimate-freedom-flagship/",
      summary: "Every visible pursuit is chasing the same three experiential states — and they were never somewhere else.",
      cluster: "freedom",
      role: "deep-dive",
      series: null,
      seriesOrder: null,
      featured: true,
      featuredOrder: 3,
      recommendedNext: "the-return-to-life",
      relatedPieces: ["uf-the-architecture-of-freedom", "ias-what-identity-is-trying-to-produce", "the-circle-of-love"],
      status: "published",
      publishDate: "2025-03-12",
      readTime: 18
    },

    // ═══════════════════════════════════════════════════════════════════
    //  IDENTITY ARCHITECTURE SERIES
    // ═══════════════════════════════════════════════════════════════════

    {
      id: "ias-hub",
      title: "Collected Essays on Identity Architecture",
      subtitle: "An ongoing investigation",
      slug: "/identity-architecture/",
      summary: "A philosophical investigation into how perception, experience, and behavior are produced by identity.",
      cluster: "identity",
      role: "hub",
      series: "identity-architecture",
      seriesOrder: null,
      featured: true,
      featuredOrder: 4,
      recommendedNext: "ias-premise",
      relatedPieces: ["the-first-realization", "uf-hub"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 35  // full series
    },

    {
      id: "ias-premise",
      title: "The Upgrade We Forgot to Make",
      subtitle: "An essay on the gap between what humanity built and what humanity became",
      slug: "/identity-architecture/premise/",
      summary: "The civilizational argument: humanity upgraded its technology faster than its consciousness.",
      cluster: "identity",
      role: "bridge",
      series: "identity-architecture",
      seriesOrder: 0,
      featured: false,
      featuredOrder: null,
      recommendedNext: "ias-the-pattern",
      relatedPieces: ["the-first-realization", "the-layer-beneath-mindset"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 8
    },

    {
      id: "ias-the-pattern",
      title: "The Pattern",
      subtitle: "On the structure beneath reaction",
      slug: "/identity-architecture/the-pattern/",
      summary: "Why intelligent people repeat behaviors they understand — and what that reveals about the structure producing them.",
      cluster: "identity",
      role: "deep-dive",
      series: "identity-architecture",
      seriesOrder: 1,
      featured: false,
      featuredOrder: null,
      recommendedNext: "ias-the-hidden-architecture",
      relatedPieces: ["stability-under-activation", "the-first-realization"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 4
    },

    {
      id: "ias-the-hidden-architecture",
      title: "The Hidden Architecture",
      subtitle: "On the structure that produces experience",
      slug: "/identity-architecture/the-hidden-architecture/",
      summary: "Same situation, completely different experiences — because something else is determining what each person perceives.",
      cluster: "identity",
      role: "deep-dive",
      series: "identity-architecture",
      seriesOrder: 2,
      featured: false,
      featuredOrder: null,
      recommendedNext: "ias-what-identity-is-trying-to-produce",
      relatedPieces: ["the-first-realization", "ias-the-pattern"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 5
    },

    {
      id: "ias-what-identity-is-trying-to-produce",
      title: "What Identity Is Trying to Produce",
      subtitle: "On the invisible pursuit beneath every visible one",
      slug: "/identity-architecture/what-identity-is-trying-to-produce/",
      summary: "Every visible pursuit — achievement, security, approval, control — is chasing the same invisible experiential state.",
      cluster: "identity",
      role: "deep-dive",
      series: "identity-architecture",
      seriesOrder: 3,
      featured: false,
      featuredOrder: null,
      recommendedNext: "ias-being",
      relatedPieces: ["the-circle-of-love", "uf-the-architecture-of-freedom"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 5
    },

    {
      id: "ias-being",
      title: "Being",
      subtitle: "On the one who notices",
      slug: "/identity-architecture/being/",
      summary: "If identity shapes experience, the next question: who is aware of identity?",
      cluster: "identity",
      role: "deep-dive",
      series: "identity-architecture",
      seriesOrder: 4,
      featured: false,
      featuredOrder: null,
      recommendedNext: "ias-architecture",
      relatedPieces: ["uf-the-question-that-follows", "the-interrupt"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 5
    },

    {
      id: "ias-architecture",
      title: "Architecture",
      subtitle: "On seeing the structure — and choosing how to move within it",
      slug: "/identity-architecture/architecture/",
      summary: "Once identity becomes visible as structure rather than self, it becomes something that can be worked with.",
      cluster: "identity",
      role: "deep-dive",
      series: "identity-architecture",
      seriesOrder: 5,
      featured: false,
      featuredOrder: null,
      recommendedNext: "ias-instrument",
      relatedPieces: ["stability-under-activation", "the-layer-beneath-mindset"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 5
    },

    {
      id: "ias-instrument",
      title: "Instrument",
      subtitle: "On what identity becomes when it is no longer mistaken for the self",
      slug: "/identity-architecture/instrument/",
      summary: "Identity was never the self — it was always the instrument. And instruments can be chosen.",
      cluster: "identity",
      role: "deep-dive",
      series: "identity-architecture",
      seriesOrder: 6,
      featured: false,
      featuredOrder: null,
      recommendedNext: "ias-the-upgrade",
      relatedPieces: ["uf-the-redesign-environment", "ias-being"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 5
    },

    {
      id: "ias-the-upgrade",
      title: "The Upgrade",
      subtitle: "On what was always present",
      slug: "/identity-architecture/the-upgrade/",
      summary: "The final essay reveals that the awareness observing the entire sequence was the discovery all along.",
      cluster: "identity",
      role: "deep-dive",
      series: "identity-architecture",
      seriesOrder: 7,
      featured: false,
      featuredOrder: null,
      recommendedNext: "uf-hub",
      relatedPieces: ["ias-being", "uf-the-question-that-follows"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 5
    },

    // ═══════════════════════════════════════════════════════════════════
    //  ULTIMATE FREEDOM SERIES
    // ═══════════════════════════════════════════════════════════════════

    {
      id: "uf-hub",
      title: "Ultimate Freedom",
      subtitle: "After Identity Architecture",
      slug: "/ultimate-freedom/",
      summary: "Why seeing the structure is not yet the same as being free of it — and what freedom actually requires.",
      cluster: "freedom",
      role: "hub",
      series: "ultimate-freedom",
      seriesOrder: null,
      featured: true,
      featuredOrder: 1,
      recommendedNext: "uf-the-question-that-follows",
      relatedPieces: ["ias-hub", "ias-the-upgrade"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 25  // full series
    },

    {
      id: "uf-the-question-that-follows",
      title: "The Question That Follows",
      subtitle: "On why seeing the structure is not yet the same as being free of it",
      slug: "/ultimate-freedom/the-question-that-follows/",
      summary: "The pattern is visible — but the old momentum remains. Recognition alone does not produce freedom.",
      cluster: "freedom",
      role: "deep-dive",
      series: "ultimate-freedom",
      seriesOrder: 1,
      featured: false,
      featuredOrder: null,
      recommendedNext: "uf-the-redesign-environment",
      relatedPieces: ["ias-the-upgrade", "stability-under-activation"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 6
    },

    {
      id: "uf-the-redesign-environment",
      title: "The Redesign Environment",
      subtitle: "On the difference between seeing the structure and being able to work with it",
      slug: "/ultimate-freedom/the-redesign-environment/",
      summary: "What is being lived as reality is difficult to redesign as architecture. Fusion must be interrupted first.",
      cluster: "freedom",
      role: "deep-dive",
      series: "ultimate-freedom",
      seriesOrder: 2,
      featured: false,
      featuredOrder: null,
      recommendedNext: "uf-the-architecture-of-freedom",
      relatedPieces: ["ias-instrument", "the-interrupt"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 6
    },

    {
      id: "uf-the-architecture-of-freedom",
      title: "The Architecture of Freedom",
      subtitle: "On what human striving has been trying to produce — and the structure that makes it reliable",
      slug: "/ultimate-freedom/the-architecture-of-freedom/",
      summary: "Beneath the infinite variety of human pursuit, the same three experiential states keep appearing: peace, love, happiness.",
      cluster: "freedom",
      role: "deep-dive",
      series: "ultimate-freedom",
      seriesOrder: 3,
      featured: false,
      featuredOrder: null,
      recommendedNext: "uf-the-movement",
      relatedPieces: ["the-circle-of-love", "ias-what-identity-is-trying-to-produce"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 7
    },

    {
      id: "uf-the-movement",
      title: "The Movement",
      subtitle: "On how freedom becomes lived",
      slug: "/ultimate-freedom/the-movement/",
      summary: "Freedom enters time, action, and relationship — or it remains a beautiful interruption.",
      cluster: "freedom",
      role: "deep-dive",
      series: "ultimate-freedom",
      seriesOrder: 4,
      featured: false,
      featuredOrder: null,
      recommendedNext: "the-return-to-life",  // the natural continuation after the UF series
      relatedPieces: ["the-circle-of-love", "stability-under-activation", "the-interrupt"],
      status: "published",
      publishDate: "2024-01-01",
      readTime: 7
    }
  ]
};


// ─── Helper functions ──────────────────────────────────────────────
// These can be used by the homepage template and individual piece templates.

/**
 * Get all published pieces.
 */
function getPublishedPieces() {
  return siteConfig.pieces.filter(p => p.status === "published");
}

/**
 * Get a piece by its ID.
 */
function getPiece(id) {
  return siteConfig.pieces.find(p => p.id === id) || null;
}

/**
 * Get all featured pieces for the homepage, sorted by featuredOrder within each cluster.
 */
function getFeaturedByCluster(clusterId) {
  return getPublishedPieces()
    .filter(p => p.cluster === clusterId && p.featured)
    .sort((a, b) => (a.featuredOrder || 99) - (b.featuredOrder || 99));
}

/**
 * Get the recommended next piece object for a given piece.
 */
function getRecommendedNext(pieceId) {
  const piece = getPiece(pieceId);
  if (!piece || !piece.recommendedNext) return null;
  return getPiece(piece.recommendedNext);
}

/**
 * Get related piece objects for a given piece.
 */
function getRelatedPieces(pieceId) {
  const piece = getPiece(pieceId);
  if (!piece) return [];
  return piece.relatedPieces
    .map(id => getPiece(id))
    .filter(p => p && p.status === "published");
}

/**
 * Get all pieces in a series, in reading order.
 */
function getSeriesPieces(seriesId) {
  const series = siteConfig.series.find(s => s.id === seriesId);
  if (!series) return [];
  return series.readingOrder
    .map(id => getPiece(id))
    .filter(p => p && p.status === "published");
}

/**
 * Get the full URL for a piece.
 */
function getPieceUrl(pieceId) {
  const piece = getPiece(pieceId);
  if (!piece) return "#";
  return siteConfig.site.baseUrl + piece.slug;
}

/**
 * Get cluster metadata.
 */
function getCluster(clusterId) {
  return siteConfig.clusters.find(c => c.id === clusterId) || null;
}

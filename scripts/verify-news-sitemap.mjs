import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { ModuleKind, ScriptTarget, transpileModule } from "typescript";

// Execute the same pure helpers as the route without needing a dev server or
// depending on Node's version-specific TypeScript loader.
async function loadHelper(relativePath) {
    const source = readFileSync(new URL(relativePath, import.meta.url), "utf8");
    const { outputText } = transpileModule(source, {
        compilerOptions: { module: ModuleKind.ESNext, target: ScriptTarget.ES2020 },
    });
    return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

const { getRecentNewsArticles } = await loadHelper("../src/lib/news-sitemap.ts");
const { escapeXml } = await loadHelper("../src/lib/xml.ts");
const now = Date.parse("2026-09-15T12:00:00Z");
const windowMs = 48 * 60 * 60 * 1000;
const article = (slug, publishedAt, newsEligible = true) => ({
    slug,
    publishedAt,
    newsEligible,
    updatedAt: new Date(now).toISOString(),
});
const fixtures = [
    article("just-published", new Date(now).toISOString()),
    article("still-recent", new Date(now - windowMs + 1).toISOString()),
    article("at-cutoff", new Date(now - windowMs).toISOString()),
    article("old-but-edited-today", "2026-06-23T09:00:00+02:00"),
    article("scheduled", new Date(now + 1).toISOString()),
    article("invalid-date", "invalid"),
    article("not-news", new Date(now).toISOString(), false),
    article("timezone-offset", "2026-09-15T14:00:00+02:00"),
];

assert.deepEqual(
    getRecentNewsArticles(fixtures, now).map(({ slug }) => slug),
    ["just-published", "still-recent", "timezone-offset"],
    "News sitemaps must only contain opted-in articles published within the last 48 hours.",
);
assert.deepEqual(getRecentNewsArticles(fixtures, now + windowMs + 1), []);
assert.deepEqual(getRecentNewsArticles([], now), []);
assert.equal(
    escapeXml('Rheinbach & Bonn <heute> "fair" \'direkt\''),
    "Rheinbach &amp; Bonn &lt;heute&gt; &quot;fair&quot; &apos;direkt&apos;",
);

console.log("News sitemap verification passed: publication window, future dates, edits, opt-in, timezones and XML escaping.");

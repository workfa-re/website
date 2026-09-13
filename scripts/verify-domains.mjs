import assert from "node:assert/strict";
import { request as httpRequest } from "node:http";

// Run against a locally started production build; never follow a redirect during these checks.
const origin = new URL(process.argv[2] ?? "http://127.0.0.1:3100");
assert(["localhost", "127.0.0.1", "[::1]"].includes(origin.hostname), "Use a local production server");
assert.equal(origin.protocol, "http:", "Use the local HTTP production server");

function request(path, host, method = "GET") {
  return new Promise((resolve, reject) => {
    // Node's fetch may replace Host; the HTTP client keeps the explicit host under test.
    const req = httpRequest(new URL(path, origin), { method, headers: { host } }, (res) => {
      let text = "";
      res.setEncoding("utf8");
      res.on("data", (chunk) => { text += chunk; });
      res.on("end", () => resolve({ status: res.statusCode, location: res.headers.location, text }));
      res.on("error", reject);
    });
    req.setTimeout(15000, () => req.destroy(new Error(`Timeout: ${host}${path}`)));
    req.on("error", reject);
    req.end();
  });
}

let checked = 0;
const paths = [
  "/",
  "/kontakt?utm_source=old-domain&tag=one&tag=two",
  "/team/tobias-rohm",
  "/einblicke/a%2Fb?value=a%2Bb&next=https%3A%2F%2Fexample.com",
  "/sitemap.xml",
  "/robots.txt",
  "/og-image.png",
];

for (const host of ["jobbridge.app", "www.jobbridge.app", "www.workfa.re"]) {
  for (const path of paths) {
    const response = await request(path, host);
    assert.equal(response.status, 308, `${host}${path}: permanent redirect`);
    const location = new URL(response.location);
    const expected = new URL(path, "https://workfa.re");
    assert.equal(location.origin, expected.origin, `${host}${path}: fixed HTTPS destination`);
    assert.equal(location.pathname, expected.pathname, `${host}${path}: preserve path`);
    assert.deepEqual([...location.searchParams], [...expected.searchParams], `${host}${path}: preserve query`);
    checked++;
  }
}

for (const host of ["workfa.re", "localhost", "app.jobbridge.app", "jobbridgeXapp", "jobbridge.app.example.com"]) {
  const response = await request("/", host);
  assert.equal(response.status, 200, `${host}: must not match website aliases`);
  assert.equal(response.location, undefined, `${host}: no redirect loop or broad host match`);
  const html = response.text;
  assert.match(html, /rel="canonical" href="https:\/\/workfa\.re\/?"/, `${host}: canonical domain`);
  checked++;
}

const post = await request("/kontakt?source=legacy", "jobbridge.app", "POST");
assert.equal(post.status, 308, "POST: use a method-preserving permanent redirect");
assert.equal(post.location, "https://workfa.re/kontakt?source=legacy");
checked++;

for (const path of ["/robots.txt", "/sitemap.xml", "/news-sitemap.xml", "/feed.xml"]) {
  const response = await request(path, "workfa.re");
  assert.equal(response.status, 200, `${path}: available`);
  const content = response.text;
  // The news sitemap is legitimately empty when no article was published in the last two days.
  if (path !== "/news-sitemap.xml" || content.includes("<url>")) {
    assert(content.includes("https://workfa.re"), `${path}: uses the new website domain`);
  } else {
    assert.match(content, /<urlset\b/, "Empty news sitemap remains valid XML");
  }
  assert(!/https?:\/\/(?:www\.)?jobbridge\.app(?:[\/\s<"]|$)/i.test(content), `${path}: no old website URLs`);
  checked++;
}

console.log(`Domain checks passed: ${checked} redirect, host, canonical and discovery checks.`);

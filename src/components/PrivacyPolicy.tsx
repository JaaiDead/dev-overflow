import { useEffect } from "react";
import { GMAIL_COMPOSE_URL } from "../data";

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | Jaai";
  }, []);

  return (
    <div className="min-h-screen bg-bg px-6 py-10 text-text-primary dark:bg-dark-bg dark:text-dark-text-primary">
      <main className="mx-auto max-w-2xl">
        <a
          href="/"
          className="glass inline-flex rounded-full px-4 py-2 font-mono text-xs text-primary transition-colors hover:text-primary-dim dark:text-dark-primary dark:hover:text-dark-primary-dim"
        >
          back to site
        </a>

        <header className="mb-10 mt-16">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-primary dark:text-dark-primary">
            // privacy
          </p>
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-3 font-mono text-xs text-text-dim dark:text-dark-text-dim">
            Last updated: September 14, 2026
          </p>
        </header>

        <div className="glass rounded-3xl p-6 font-body text-sm leading-relaxed text-text-dim dark:text-dark-text-dim md:p-8">
          <p className="mb-6">
            This is a static portfolio site with no user accounts or site-operated backend. The site
            is hosted on GitHub Pages and proxied through Cloudflare, which provides Web Analytics.
            Cloudflare reports aggregate page views, visits, performance metrics including Core Web
            Vitals, and related breakdowns such as URL, browser, operating system, and country. The
            site does not use its own advertising or analytics service.
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-primary dark:text-dark-primary">
                Local storage
              </h2>
              <p>
                When no theme has been selected, the site reads your device's system color
                preference to choose light or dark mode. The selected theme and portfolio profile
                are saved in your browser localStorage so they persist between visits. This
                information stays on your device.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-primary dark:text-dark-primary">
                Third-party services
              </h2>
              <p>
                GitHub Pages hosts the site, and Cloudflare proxies traffic to it and processes Web
                Analytics data. See the{" "}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline dark:text-dark-primary"
                >
                  Cloudflare Privacy Policy
                </a>
                . The site also fetches public project data from the Modrinth API and links to
                GitHub, Modrinth, CurseForge, Discord, and Gmail. Those services have their own
                privacy policies and handle visits outside this site.
              </p>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-primary dark:text-dark-primary">
                Contact
              </h2>
              <p>
                Email links open a prefilled Gmail compose window. No message is sent until you
                review and send it yourself.
              </p>
              <a
                href={GMAIL_COMPOSE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-primary hover:underline dark:text-dark-primary"
              >
                arcticquests.dev@gmail.com
              </a>
            </section>

            <section>
              <h2 className="mb-2 font-mono text-xs uppercase tracking-widest text-primary dark:text-dark-primary">
                Changes
              </h2>
              <p>
                This policy may change as the site changes. The date above shows when it was last
                updated.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

import Hero from "@/components/sections/hero";
import Layout from "@/components/layout/layout";
import { fetchGitHubContributions } from "@/lib/github";
import { buildMetadata } from "@/lib/metadata";
import { siteConfig } from "@/site.config";

export const revalidate = 3600;

export const metadata = buildMetadata({ path: "/" });

export default async function About() {
  const { contributions, lifetimeTotal } = await fetchGitHubContributions(
    siteConfig.socials.github.username
  );

  return (
    <div className="overflow-x-hidden">
      <Layout>
        <Hero contributionData={contributions} lifetimeTotal={lifetimeTotal} />
      </Layout>
    </div>
  );
}

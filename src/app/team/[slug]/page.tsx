import { notFound } from "next/navigation";
import { getTeamMemberByProfileSlug, getTeamProfileSlug, teamMembers } from "@/content/team";
import { TeamProfile, createTeamProfileMetadata } from "@/components/team/TeamProfile";

type TeamProfileRouteProps = { params: Promise<{ slug: string }> };
const customTeamSlugs = new Set(["rezan", "resan-yalcin", "rezan-yalcin", "tim-lohmeier", "tobias-rohm"]);

export const dynamicParams = false;

export function generateStaticParams() {
    return teamMembers
        .map((member) => getTeamProfileSlug(member))
        .filter((slug) => !customTeamSlugs.has(slug))
        .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: TeamProfileRouteProps) {
    const { slug } = await params;
    const member = getTeamMemberByProfileSlug(slug);
    if (!member || customTeamSlugs.has(slug)) return {};
    return createTeamProfileMetadata(member);
}

export default async function TeamProfilePage({ params }: TeamProfileRouteProps) {
    const { slug } = await params;
    const member = getTeamMemberByProfileSlug(slug);
    if (!member || customTeamSlugs.has(slug)) notFound();
    return <TeamProfile member={member} />;
}

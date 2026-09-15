import { notFound } from "next/navigation";
import { getTeamMember } from "@/content/team";
import { TeamProfile, createTeamProfileMetadata } from "@/components/team/TeamProfile";

const member = getTeamMember("tim-lohmeier");

export const metadata = member ? createTeamProfileMetadata(member) : {};

export default function TimLohmeierProfilePage() {
    if (!member) notFound();
    return <TeamProfile member={member} />;
}

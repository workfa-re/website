import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { teamMembers, type TeamMember } from "@/content/team";
import { ProfilePortraitPlaceholder } from "./ProfilePortraitPlaceholder";
import styles from "@/components/about/AboutPage.module.css";

const members: readonly TeamMember[] = teamMembers;

export function TeamOverviewSection() {
    return (
        <section id="team" className={styles.teamSection} aria-labelledby="team-heading">
            <div className={styles.sectionHeading}>
                <h2 id="team-heading">Das Team</h2>
                <p>Die Menschen hinter Workfare.</p>
            </div>
            <ul className={styles.teamGrid}>
                {members.map((member) => (
                    <li key={member.slug}>
                        <Link href={member.profilePath} className={`content-panel ${styles.memberCard}`}>
                            <span className={styles.portrait}>
                                {member.profileImage ? (
                                    <Image
                                        src={member.profileImage.src}
                                        alt={member.profileImage.alt}
                                        fill
                                        sizes="80px"
                                        className={styles.portraitImage}
                                        style={{ objectPosition: member.profileImage.position ?? "center" }}
                                    />
                                ) : (
                                    <ProfilePortraitPlaceholder compact />
                                )}
                            </span>
                            <span className={styles.memberInfo}>
                                <span className={styles.memberName}>{member.displayName}</span>
                                <span className={styles.memberRole}>{member.role}</span>
                                <span className={styles.profileLink}>
                                    Profil ansehen
                                    <ArrowUpRight size={15} aria-hidden="true" />
                                </span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

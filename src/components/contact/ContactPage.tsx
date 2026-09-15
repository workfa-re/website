import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Footer } from "@/components/Footer";
import { PixelShaderBackdrop } from "@/components/PixelShaderBackdrop";
import { SiteHeader } from "@/components/SiteHeader";
import { teamMembers, type TeamMember } from "@/content/team";
import { ProfilePortraitPlaceholder } from "@/components/team/ProfilePortraitPlaceholder";
import { CopyEmailButton } from "./CopyEmailButton";
import styles from "./ContactPage.module.css";

export type ContactDepartment = {
    id: string;
    title: string;
    description: string;
    email: string;
};

const members: readonly TeamMember[] = teamMembers;

function EmailAddress({ email }: { email: string }) {
    return (
        <div className={styles.emailRow}>
            <a href={`mailto:${email}`} className={styles.emailLink}>
                {email}
            </a>
            <CopyEmailButton email={email} />
        </div>
    );
}

export function ContactPage({ departments }: { departments: readonly ContactDepartment[] }) {
    return (
        <main className={styles.page}>
            <div className={styles.container}>
                <SiteHeader />

                <header className={styles.hero}>
                    <div className={styles.heroBackdrop} aria-hidden="true">
                        <PixelShaderBackdrop variant="quiet" />
                    </div>
                    <div className={styles.heroTitle}>
                        <h1>Kontakt zu <span>Workfare.</span></h1>
                    </div>
                    <div className={styles.heroIntro}>
                        <p>Eine Frage, eine Idee oder etwas, das nicht funktioniert? Hier findest du den richtigen Kontakt.</p>
                        <a href="#teamkontakte" className={styles.textLink}>
                            Direkt zum Team <ArrowDown size={16} aria-hidden="true" />
                        </a>
                    </div>
                </header>

                <section className={styles.departments} aria-label="Kontakt nach Anliegen">
                    <ul className={styles.departmentGrid}>
                        {departments.map((department, index) => (
                            <li
                                key={department.id}
                                className={styles.departmentCard}
                                style={{ "--entrance-delay": `${100 + index * 90}ms` } as CSSProperties}
                            >
                                <div className={styles.departmentHeading}>
                                    <h2>{department.title}</h2>
                                </div>
                                <p>{department.description}</p>
                                <EmailAddress email={department.email} />
                            </li>
                        ))}
                    </ul>
                    <p className={styles.emailHint}>Ein Klick auf die Adresse öffnet dein E-Mail-Programm.</p>
                </section>

                <section id="teamkontakte" className={styles.teamSection} aria-labelledby="contact-team-heading">
                    <div className={styles.teamIntro}>
                        <div>
                            <h2 id="contact-team-heading">Direkt zu uns.</h2>
                            <p>Du weißt schon, wen du erreichen möchtest?</p>
                        </div>
                        <Link href="/einblicke/ueber-uns" className={styles.textLink}>
                            Über unser Team <ArrowUpRight size={16} aria-hidden="true" />
                        </Link>
                    </div>

                    <ul className={styles.teamList}>
                        {members.map((member) => {
                            const emails = member.contactLinks.filter((contact) => contact.kind === "direct-email");

                            return (
                                <li key={member.slug} className={styles.member}>
                                    <Link href={member.profilePath} className={styles.personLink}>
                                        <span className={styles.avatar} aria-hidden="true">
                                            {member.profileImage ? (
                                                <Image
                                                    src={member.profileImage.src}
                                                    alt=""
                                                    fill
                                                    sizes="56px"
                                                    className={styles.avatarImage}
                                                    style={{ objectPosition: member.profileImage.position ?? "center" }}
                                                />
                                            ) : (
                                                <ProfilePortraitPlaceholder compact />
                                            )}
                                        </span>
                                        <span className={styles.memberIdentity}>
                                            <span className={styles.memberName}>{member.displayName}</span>
                                            <span className={styles.memberRole}>{member.role}</span>
                                        </span>
                                    </Link>
                                    <div className={styles.memberEmails}>
                                        {emails.length ? emails.map((contact) => (
                                            <EmailAddress key={contact.href} email={contact.value} />
                                        )) : <span className={styles.noEmail}>Kontakt über das Team</span>}
                                    </div>
                                    <Link href={member.profilePath} className={`glass-button ${styles.profileLink}`} aria-label={`Profil von ${member.displayName} ansehen`}>
                                        Profil <ArrowUpRight size={15} aria-hidden="true" />
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            </div>
            <Footer showChat={false} />
        </main>
    );
}

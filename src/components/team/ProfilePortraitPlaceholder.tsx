import { UserRound } from "lucide-react";
import styles from "./ProfilePortraitPlaceholder.module.css";

export function ProfilePortraitPlaceholder({
    compact = false,
}: {
    compact?: boolean;
}) {
    return (
        <span
            className={`${styles.placeholder} ${compact ? styles.compact : ""}`}
            aria-hidden="true"
        >
            <UserRound className={styles.symbol} strokeWidth={1.25} />
        </span>
    );
}

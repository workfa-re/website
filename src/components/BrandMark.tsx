import Image from "next/image";

export function BrandMark({ className = "" }: { className?: string }) {
    return (
        <Image
            src="/jobbridge-bridge-logo-white.png"
            alt=""
            width={29}
            height={18}
            className={`relative -top-px object-contain ${className}`}
        />
    );
}

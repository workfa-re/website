import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { brandLogo, socialPreview } from "@/config/brand";

export const dynamic = "force-static";

export async function GET() {
    const logo = await readFile(path.join(process.cwd(), "public", brandLogo.url));

    return new ImageResponse(
        (
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                    background: "#fff",
                }}
            >
                {/* The supplied logo stays unchanged; only its display size is scaled. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={`data:image/png;base64,${logo.toString("base64")}`}
                    alt={brandLogo.alt}
                    width={brandLogo.width * 2}
                    height={brandLogo.height * 2}
                />
            </div>
        ),
        { width: socialPreview.width, height: socialPreview.height },
    );
}

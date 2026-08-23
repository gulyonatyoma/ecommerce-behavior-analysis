import { constants, sign } from "node:crypto";
import { readFile } from "node:fs/promises";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

function encodeJson(value: object) {
  return Buffer.from(JSON.stringify(value)).toString("base64url");
}

export async function GET() {
  const embedId = process.env.DATALENS_EMBED_ID?.trim();
  const privateKeyBase64 = process.env.DATALENS_PRIVATE_KEY_BASE64?.trim();
  const privateKeyPath = process.env.DATALENS_PRIVATE_KEY_PATH?.trim();

  if (!embedId || (!privateKeyBase64 && !privateKeyPath)) {
    return NextResponse.json(
      { error: "DataLens secure embedding is not configured" },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }

  try {
    const privateKey = privateKeyBase64
      ? Buffer.from(privateKeyBase64, "base64").toString("utf8")
      : await readFile(privateKeyPath!, "utf8");
    const issuedAt = Math.floor(Date.now() / 1000);
    const expiresAt = issuedAt + 360;
    const header = encodeJson({ alg: "PS256", typ: "JWT" });
    const payload = encodeJson({
      embedId,
      dlEmbedService: "YC_DATALENS_EMBEDDING_SERVICE_MARK",
      iat: issuedAt,
      exp: expiresAt,
    });
    const signingInput = `${header}.${payload}`;
    const signature = sign("sha256", Buffer.from(signingInput), {
      key: privateKey,
      padding: constants.RSA_PKCS1_PSS_PADDING,
      saltLength: 32,
    }).toString("base64url");

    return NextResponse.json(
      { token: `${signingInput}.${signature}`, expiresAt },
      { headers: { "Cache-Control": "private, no-store, max-age=0" } },
    );
  } catch (error) {
    console.error("Failed to create a DataLens embed token", error);
    return NextResponse.json(
      { error: "Could not create a DataLens embed token" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}

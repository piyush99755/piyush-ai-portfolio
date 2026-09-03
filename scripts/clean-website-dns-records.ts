import fs from "fs";
import path from "path";

interface DnsRecord {
  id: string;
  name: string;
  type: string;
  content: string;
}

async function cleanWebsiteDns() {
  const configPath = path.resolve(
    process.env.USERPROFILE || process.env.HOME || "",
    "AppData/Roaming/xdg.config/.wrangler/config/default.toml"
  );

  if (!fs.existsSync(configPath)) {
    console.error("Wrangler config file not found at:", configPath);
    process.exit(1);
  }

  const configText = fs.readFileSync(configPath, "utf8");
  const tokenMatch = configText.match(/oauth_token\s*=\s*"([^"]+)"/);
  if (!tokenMatch) {
    console.error("OAuth token not found in Wrangler config.");
    process.exit(1);
  }

  const token = tokenMatch[1];
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  // 1. Get Zone ID for piyushtadvi.co.uk
  console.log("Fetching Cloudflare zone ID for piyushtadvi.co.uk...");
  const zonesRes = await fetch("https://api.cloudflare.com/client/v4/zones?name=piyushtadvi.co.uk", { headers });
  const zonesData = (await zonesRes.json()) as { success: boolean; result: Array<{ id: string }>; errors: unknown[] };

  if (!zonesData.success || !zonesData.result.length) {
    console.error("Failed to find zone for piyushtadvi.co.uk:", zonesData.errors);
    process.exit(1);
  }

  const zoneId = zonesData.result[0].id;
  console.log(`Found Zone ID: ${zoneId}`);

  // 2. Fetch all DNS records in zone
  console.log("Fetching DNS records for zone...");
  const dnsRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, { headers });
  const dnsData = (await dnsRes.json()) as { success: boolean; result: DnsRecord[]; errors: unknown[] };

  if (!dnsData.success) {
    console.error("Failed to fetch DNS records:", dnsData.errors);
    process.exit(1);
  }

  const records = dnsData.result;
  console.log(`Total DNS Records Found: ${records.length}\n`);

  records.forEach((r: DnsRecord) => {
    console.log(`- [${r.type}] ${r.name} -> ${r.content} (ID: ${r.id})`);
  });

  // 3. Identify website records vs email records
  const websiteRecordTypes = new Set(["A", "AAAA", "CNAME"]);
  const targetNames = new Set(["piyushtadvi.co.uk", "www.piyushtadvi.co.uk"]);

  const websiteRecordsToDelete = records.filter(
    (r: DnsRecord) => websiteRecordTypes.has(r.type) && targetNames.has(r.name)
  );

  const emailRecordsToPreserve = records.filter(
    (r: DnsRecord) => r.type === "MX" || r.type === "TXT" || r.name.includes("mail") || r.name.includes("spf")
  );

  console.log("\n----------------------------------------------------");
  console.log(`EMAIL RECORDS PRESERVED (${emailRecordsToPreserve.length}):`);
  emailRecordsToPreserve.forEach((r: DnsRecord) => console.log(`  ✓ [${r.type}] ${r.name} -> ${r.content}`));

  console.log(`\nWEBSITE RECORDS TO REMOVE (${websiteRecordsToDelete.length}):`);
  websiteRecordsToDelete.forEach((r: DnsRecord) => console.log(`  ✗ [${r.type}] ${r.name} -> ${r.content} (ID: ${r.id})`));
  console.log("----------------------------------------------------\n");

  // 4. Delete conflicting website records
  for (const rec of websiteRecordsToDelete) {
    console.log(`Deleting website DNS record: [${rec.type}] ${rec.name} (${rec.id})...`);
    const delRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${rec.id}`, {
      method: "DELETE",
      headers,
    });
    const delData = (await delRes.json()) as { success: boolean; errors: unknown[] };
    if (delData.success) {
      console.log(`  ✓ Successfully deleted record ${rec.id}`);
    } else {
      console.error(`  ✕ Failed to delete record ${rec.id}:`, delData.errors);
    }
  }

  console.log("\nDNS cleaning complete. Ready for Worker Custom Domain attachment!");
}

cleanWebsiteDns().catch(console.error);

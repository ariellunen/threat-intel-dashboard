import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

function isValidIP(ip) {
  const ipv4Regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  const ipv6Regex = /^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
  return ipv4Regex.test(ip) || ipv6Regex.test(ip);
}

async function fetchWithRateLimit(url, options, serviceName) {
  const res = await fetch(url, options);

  if (res.status === 429) {
    throw new Error(`Rate limit reached for ${serviceName}, try again later.`);
  }

  if (!res.ok) {
    throw new Error(`${serviceName} request failed with status ${res.status}`);
  }

  return res.json();
}

app.get("/api/intel", async (req, res) => {
  const { ip } = req.query;

  if (!ip || !isValidIP(ip)) {
    return res.status(400).json({ error: "Invalid or missing IP address" });
  }

  try {
    // AbuseIPDB
    const abuseRes = await fetch(
      `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}&maxAgeInDays=90`,
      {
        headers: {
          Accept: "application/json",
          Key: process.env.ABUSEIPDB_API_KEY,
        },
      }
    );

    if (abuseRes.status === 429) {
      return res.status(429).json({ error: "Rate limit exceeded" });
    }

    const abuseData = await abuseRes.json();

    // ProxyCheck.io
    const proxyRes = await fetch(
      `https://proxycheck.io/v2/${ip}?vpn=1&asn=1&risk=1&port=1&seen=1`
    );
    const proxyData = await proxyRes.json();
    const ipInfo = proxyData[ip] || {};

    if (proxyRes.status === 429) {
      return res.status(429).json({ error: "Rate limit exceeded" });
    }

    // VirusTotal
    const vtRes = await fetch(
      `https://www.virustotal.com/api/v3/ip_addresses/${ip}`,
      {
        headers: { "x-apikey": process.env.VirusTotal_API_KEY },
      }
    );
    const vtData = await vtRes.json();

    if (vtRes.status === 429) {
      return res.status(429).json({ error: "Rate limit exceeded" });
    }

    const aggregated = {
      ip,
      hostname: vtData.data?.attributes?.network || ipInfo.range || "N/A",
      isp:
        ipInfo.provider ||
        ipInfo.organisation ||
        `AS${vtData.data?.attributes?.asn}` ||
        "N/A",
      country: ipInfo.country || vtData.data?.attributes?.country || "N/A",
      city: ipInfo.city || "N/A",
      abuseScore: abuseData.data?.abuseConfidenceScore || 0,
      recentReports: abuseData.data?.totalReports || 0,
      vpnOrProxy: ipInfo.proxy === "yes",
      threatScore: vtData.data?.attributes?.reputation || 0,
    };

    res.json(aggregated);
  } catch (err) {
    console.error("Error fetching intel:", err);
    res.status(500).json({ error: "Failed to fetch IP intel" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

export default app;

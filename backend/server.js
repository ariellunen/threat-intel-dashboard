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

app.get("/api/intel", async (req, res) => {
  const { ip } = req.query;

  if (!ip || !isValidIP(ip)) {
    return res.status(400).json({ error: "Invalid or missing IP address" });
  }

  try {
    const [abuseRes, proxyRes, vtRes] = await Promise.allSettled([
      fetch(
        `https://api.abuseipdb.com/api/v2/check?ipAddress=${ip}&maxAgeInDays=90`,
        {
          headers: {
            Accept: "application/json",
            Key: process.env.ABUSEIPDB_API_KEY,
          },
        }
      ),
      fetch(`https://proxycheck.io/v2/${ip}?vpn=1&asn=1&risk=1&port=1&seen=1`),
      fetch(`https://www.virustotal.com/api/v3/ip_addresses/${ip}`, {
        headers: { "x-apikey": process.env.VIRUSTOTAL_API_KEY },
      }),
    ]);

    if (abuseRes.status === "fulfilled" && abuseRes.value.status === 429) {
      return res.status(429).json({ error: "Rate limit exceeded" });
    }
    if (proxyRes.status === "fulfilled" && proxyRes.value.status === 429) {
      return res.status(429).json({ error: "Rate limit exceeded" });
    }
    if (vtRes.status === "fulfilled" && vtRes.value.status === 429) {
      return res.status(429).json({ error: "Rate limit exceeded" });
    }

    // Extract data with fallbacks for failed requests
    const abuseData =
      abuseRes.status === "fulfilled" && abuseRes.value.ok
        ? await abuseRes.value.json()
        : { data: { abuseConfidenceScore: 0, totalReports: 0 } };

    const proxyData =
      proxyRes.status === "fulfilled" && proxyRes.value.ok
        ? await proxyRes.value.json()
        : { [ip]: {} };

    const vtData =
      vtRes.status === "fulfilled" && vtRes.value.ok
        ? await vtRes.value.json()
        : { data: { attributes: { reputation: 0, network: null } } };

    const ipInfo = proxyData[ip] || {};

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

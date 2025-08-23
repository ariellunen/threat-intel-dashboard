import { render, screen } from "@testing-library/react";
import DataTable from "./DataTable";

test("renders table with data rows", () => {
  const mockData = [
    {
      ip: "1.1.1.1",
      hostname: "cloudflare-dns",
      isp: "Cloudflare",
      country: "AU",
      city: "Sydney",
      abuseScore: 0,
      recentReports: 10,
      vpnOrProxy: false,
      threatScore: 0,
    },
  ];

  render(<DataTable data={mockData} />);

  expect(screen.getByText("1.1.1.1")).toBeInTheDocument();
  expect(screen.getByText("Cloudflare")).toBeInTheDocument();
  expect(screen.getByText("Sydney")).toBeInTheDocument();
});

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";

export default function DataTable({ data }) {
  const rows = Array.isArray(data) ? data : [];

  function getRiskLevel(row) {
    if (row.abuseScore >= 70 || row.threatScore >= 70) {
      return { level: "High", color: "red" };
    }

    if (row.abuseScore >= 30 || row.threatScore >= 30 || row.vpnOrProxy) {
      return { level: "Medium", color: "orange" };
    }

    return { level: "Low", color: "green" };
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>IP</TableCell>
            <TableCell>Hostname</TableCell>
            <TableCell>ISP</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Recent Reports</TableCell>
            <TableCell>Risk Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            const risk = getRiskLevel(row);
            return (
              <TableRow key={i}>
                <TableCell>{row.ip || "N/A"}</TableCell>
                <TableCell>{row.hostname || "N/A"}</TableCell>
                <TableCell>{row.isp || "N/A"}</TableCell>
                <TableCell>{row.country || "N/A"}</TableCell>
                <TableCell>{row.city || "N/A"}</TableCell>
                <TableCell>{row.recentReports ?? "N/A"}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      fontWeight: "bold",
                      color: risk.color,
                    }}
                  >
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        backgroundColor: risk.color,
                        borderRadius: "50%",
                        marginRight: 1,
                      }}
                    />
                    {risk.level}
                  </Box>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

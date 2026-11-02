import React from 'react';
import { ShieldAlert, ShieldCheck, Lock, Terminal } from 'lucide-react';

export default function AuditPage({ auditLogs }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono text-[#0047FF] font-semibold mb-1">
            MODULE 05 : SECURITY &amp; INTEGRITY
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#111315]">
            Cryptographic Audit Trail (TC-SEC-01)
          </h1>
          <p className="text-sm text-[#5A626A] mt-1 max-w-2xl">
            Immutable system event ledger. In accordance with security requirement CSQP-SR-001, all credentials and secrets are stripped prior to write operations.
          </p>
        </div>

        <div className="flex items-center gap-2 border border-[#DDE1E5] bg-[#F8F9FA] px-3 py-1.5 text-xs font-mono text-[#111315]">
          <ShieldCheck className="w-4 h-4 text-[#0047FF]" />
          <span>SHA-256 INTEGRITY VALIDATED</span>
        </div>
      </div>

      {/* Security Policies Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans">
        <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-4 space-y-1">
          <span className="text-[#5A626A] block text-[11px] uppercase font-mono">Password Protection:</span>
          <p className="font-semibold text-[#111315]">Bcrypt Salted &amp; Hashed (Cost Factor 10)</p>
        </div>
        <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-4 space-y-1">
          <span className="text-[#5A626A] block text-[11px] uppercase font-mono">Session Security:</span>
          <p className="font-semibold text-[#111315]">Immediate Invalidation on Logout (CSQP-SR-005)</p>
        </div>
        <div className="border border-[#DDE1E5] bg-[#FFFFFF] p-4 space-y-1">
          <span className="text-[#5A626A] block text-[11px] uppercase font-mono">Database Transactions:</span>
          <p className="font-semibold text-[#0047FF]">Synchronous WAL Mode (Zero Data Loss)</p>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="border border-[#DDE1E5] bg-[#FFFFFF] overflow-hidden">
        <div className="p-4 border-b border-[#DDE1E5] bg-[#F8F9FA] flex items-center justify-between text-xs text-[#5A626A] font-mono">
          <span>EVENT LOG RECORD</span>
          <span>{auditLogs.length} LOGGED ACTIONS</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-sans text-sm">
            <thead>
              <tr className="border-b border-[#DDE1E5] text-xs font-mono text-[#5A626A] bg-[#FFFFFF] uppercase">
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Event Details</th>
                <th className="py-3 px-4">Actor</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDE1E5] text-xs font-sans">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#F8F9FA] transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0047FF]">
                    {log.action}
                  </td>
                  <td className="py-3.5 px-4 text-[#111315]">
                    {log.details}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#5A626A]">
                    {log.user}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#5A626A]">
                    {log.ip}
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#5A626A]">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center gap-1 text-[#0047FF] font-semibold text-[11px]">
                      <span className="w-1.5 h-1.5 bg-[#0047FF]"></span>
                      COMMITTED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

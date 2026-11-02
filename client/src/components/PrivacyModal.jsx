import React, { useEffect } from 'react';
import { X, Shield, Lock, EyeOff } from 'lucide-react';

export default function PrivacyModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80">
      <div className="w-full max-w-2xl bg-[#13171F] border border-[#262C36] flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#262C36] bg-[#0D1015]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#FF5500]" />
            <h3 className="text-sm font-heading font-bold text-[#E6E9EE]">
              SYSTEM PRIVACY & CRYPTOGRAPHIC SECURITY POLICY
            </h3>
          </div>
          <button onClick={onClose} className="text-[#8B949E] hover:text-[#E6E9EE] p-1">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 overflow-y-auto font-mono text-xs text-[#E6E9EE] leading-relaxed">
          <div className="border border-[#262C36] bg-[#0D1015] p-3 text-[11px] text-[#8B949E]">
            <span className="text-[#FF5500] font-bold block mb-1">SECURITY ASSURANCE LEVEL: HIGH</span>
            Verified Compliance: CSQP-SR-001, CSQP-SR-002, CSQP-SR-004, CSQP-SR-005, CSQP-SR-006
          </div>

          <div>
            <h4 className="text-sm font-heading font-bold text-[#E6E9EE] mb-1 text-[#FF5500]">
              1. Credential Security & Password Hashing (CSQP-SR-001)
            </h4>
            <p className="text-[#8B949E]">
              Zero plaintext credentials are ever stored in the database or reflected in error messages. Passwords are salted and hashed utilizing the industry-standard bcrypt algorithm with a minimum cost factor of 10. Audit logs deliberately strip all credential tokens.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-heading font-bold text-[#E6E9EE] mb-1 text-[#FF5500]">
              2. Session Invalidation & Token Storage (CSQP-SR-005)
            </h4>
            <p className="text-[#8B949E]">
              Upon user logout, the active authentication session token is immediately revoked both in client state and on the server session store. Sessions expire automatically after 24 hours of inactivity.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-heading font-bold text-[#E6E9EE] mb-1 text-[#FF5500]">
              3. HTTP Security Headers (CSQP-SR-002, CSQP-SR-004)
            </h4>
            <p className="text-[#8B949E]">
              All HTTP responses are injected with security headers to mitigate cross-site scripting (XSS), clickjacking, and MIME sniffing attacks:
              <br />
              <code className="text-[#E6E9EE] mt-1 block bg-[#0D1015] p-2 border border-[#262C36]">
                X-Content-Type-Options: nosniff<br />
                X-Frame-Options: DENY<br />
                X-XSS-Protection: 1; mode=block
              </code>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-heading font-bold text-[#E6E9EE] mb-1 text-[#FF5500]">
              4. Server-Side Automated Assessment Isolation (CSQP-SR-006)
            </h4>
            <p className="text-[#8B949E]">
              Answer keys for all quiz questions remain strictly on the backend database. Client browsers receive questions stripped of answers. All score calculations and rankings occur exclusively on the server.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#262C36] bg-[#0D1015] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#FF5500] text-[#0D1015] font-mono text-xs font-bold hover:bg-[#E04B00]"
          >
            CONFIRM POLICY UNDERSTANDING
          </button>
        </div>
      </div>
    </div>
  );
}

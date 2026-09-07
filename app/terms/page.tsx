import React from 'react';
import type { Metadata } from 'next';
import { Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Use | EVChargeCurve',
  description: 'Terms of service and liability disclaimers for EVChargeCurve.',
  alternates: {
    canonical: 'https://evchargecurve.com/terms',
  },
};

export default function TermsOfUsePage() {
  return (
    <div className="w-full bg-[#0B0F17] min-h-screen pb-24 text-slate-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <Scale className="w-4 h-4" />
          <span>Legal Disclaimer</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">Terms of Use</h1>
        
        <div className="space-y-8 text-sm md:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using EVChargeCurve (&quot;the Application&quot;), you agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please refrain from using our calculators and tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Educational &amp; Estimation Purposes Only</h2>
            <p>
              The charging curves, range loss calculations, and battery health telemetry provided by EVChargeCurve are based on aggregated real-world data and thermodynamic modeling. They are designed for <strong>educational and estimation purposes only</strong>. 
            </p>
            <p className="mt-2 text-amber-400/90 font-medium">
              We do not guarantee the exact accuracy of these models. Actual vehicle performance varies significantly based on environmental conditions, individual driving habits, battery age, and precise manufacturer software (BMS) updates.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Limitation of Liability</h2>
            <p>
              EVChargeCurve and its parent entity, Medhastone, shall not be held liable for any damages, stranded vehicles, missed appointments, hardware degradation, or financial losses resulting from reliance on the estimations provided by this application. You assume full responsibility for your travel planning and vehicle operation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Intellectual Property &amp; Affiliations</h2>
            <p>
              All mathematical models, source code, and UI designs are the intellectual property of Medhastone. 
            </p>
            <p className="mt-2">
              <strong>Trademark Disclaimer:</strong> EVChargeCurve is an independent engineering project. We are not affiliated with, endorsed by, or sponsored by Tesla, Ford, Hyundai, General Motors, or any other automotive manufacturer. All vehicle names, models, and trademarks belong to their respective owners and are used here purely for identification and descriptive purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Third-Party Advertisements (Google AdSense)</h2>
            <p>
              EVChargeCurve utilizes third-party advertising services, such as Google AdSense, to display ads. These third-party vendors may use cookies, including the DART cookie, to serve ads based on your prior visits to our website or other websites on the internet.
            </p>
            <p className="mt-2">
              By using our site, you acknowledge that we do not endorse the products or services advertised by third parties. We are not responsible for the content of these advertisements or the privacy practices of the advertisers. Your interactions with any advertisers found on or through the Application are solely between you and such advertiser.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Acceptable Use and User Conduct</h2>
            <p>
              When using EVChargeCurve, you agree not to:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400 text-sm">
              <li>Use the Application for any unlawful purpose or in violation of any local, state, national, or international law.</li>
              <li>Attempt to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Application.</li>
              <li>Take any action that imposes, or may impose at our sole discretion, an unreasonable or disproportionately large load on our infrastructure.</li>
              <li>Use automated systems, such as robots, spiders, or offline readers, to access the Application in a manner that sends more request messages than a human can reasonably produce.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the jurisdiction in which Medhastone operates, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Modifications to the Service</h2>
            <p>
              We reserve the right to modify, update, or discontinue the Application (or any part thereof) without prior notice. We continuously tune our battery models as new EV firmware is released, which may alter past calculations.
            </p>
            <p className="mt-4 text-slate-500 font-medium">
              Last Updated: September 2026
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | EVChargeCurve',
  description: 'Our commitment to zero-server privacy and client-side computing.',
  alternates: {
    canonical: 'https://evchargecurve.com/privacy',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full bg-[#0B0F17] min-h-screen pb-24 text-slate-300">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-24">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/30 border border-emerald-900/50 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <ShieldCheck className="w-4 h-4" />
          <span>100% Client-Side Privacy</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">Privacy Policy</h1>
        
        <div className="space-y-8 text-sm md:text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Zero-Server Architecture</h2>
            <p>
              At EVChargeCurve, our core engineering philosophy is built around data privacy. All mathematical models, battery degradation calculations, and charging curve simulations are executed <strong>entirely within your web browser</strong>. We do not transmit, process, or store your personal vehicle inputs on any external servers.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Data Collection &amp; Telemetry</h2>
            <p>
              We do <strong>not</strong> collect personal information, vehicle identification numbers (VINs), location data, or individual charging habits. Because our tools operate client-side, your battery metrics and journey planning data remain strictly on your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Log Data &amp; Analytics</h2>
            <p>
              Like many websites, we may automatically collect standard log data when you visit EVChargeCurve. This data may include your IP address, browser type, browser version, the pages of our site that you visit, the time and date of your visit, and the time spent on those pages. This information is used strictly for analyzing traffic and improving the user experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Cookies and Web Beacons</h2>
            <p>
              EVChargeCurve uses &quot;cookies&quot; to store information about visitors&apos; preferences and to record user-specific information on which pages the site visitor accesses or visits. This allows us to optimize the user&apos;s experience by customizing our web page content based on visitors&apos; browser type and other information.
            </p>
            <p className="mt-2">
              <strong>Google AdSense and the DoubleClick DART Cookie:</strong>
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2 text-slate-400">
              <li>Google, as a third-party vendor, uses cookies to serve ads on EVChargeCurve.</li>
              <li>Google&apos;s use of the DART cookie enables it to serve ads to our site&apos;s visitors based upon their visit to EVChargeCurve and other sites on the internet.</li>
              <li>Users may opt out of the use of the DART cookie by visiting the Google ad and content network privacy policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">https://policies.google.com/technologies/ads</a>.</li>
            </ul>
            <p className="mt-2 text-sm text-slate-400">
              Some of our advertising partners (such as Google AdSense) may use cookies and web beacons on our site. These third-party ad servers or ad networks use technology in their respective advertisements and links that appear on EVChargeCurve and which are sent directly to your browser. They automatically receive your IP address when this occurs. Other technologies (such as cookies, JavaScript, or Web Beacons) may also be used by our site&apos;s third-party ad networks to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on the site.
            </p>
            <p className="mt-2 text-sm text-slate-400">
              EVChargeCurve has no access to or control over these cookies that are used by third-party advertisers. You should consult the respective privacy policies of these third-party ad servers for more detailed information on their practices as well as for instructions about how to opt-out of certain practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. CCPA and GDPR Privacy Rights</h2>
            <p>
              Depending on your location, you may have specific data protection rights under regulations like the California Consumer Privacy Act (CCPA) or the General Data Protection Regulation (GDPR). 
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-400 text-sm">
              <li>The right to request copies of your personal data.</li>
              <li>The right to request that we correct any information you believe is inaccurate.</li>
              <li>The right to request that we erase your personal data, under certain conditions.</li>
              <li>The right to opt-out of the sale of personal information (Note: EVChargeCurve does not sell personal data).</li>
            </ul>
            <p className="mt-2 text-sm">
              If you would like to exercise any of these rights, please contact us at <a href="mailto:medhastone@gmail.com" className="text-emerald-400 hover:underline">medhastone@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Third-Party Links</h2>
            <p>
              Our website contains links to our creator&apos;s portfolio and sister applications developed by Medhastone. We encourage you to review the privacy policies of any external sites you visit, as we do not control their content or practices.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Changes to this Policy</h2>
            <p>
              We may update our Privacy Policy from time to time to comply with legal requirements or reflect changes in our advertising partnerships. We advise you to review this page periodically for any changes.
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

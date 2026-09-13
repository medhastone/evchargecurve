import re

# Update Footer.tsx
with open('/app/applet/components/Footer.tsx', 'r') as f:
    footer_content = f.read()

# Add Solar Array Sizer to Footer if not there
if 'Solar Array Sizer' not in footer_content:
    replacement = """              <li>
                <Link href="/solar-to-ev" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Solar Array Sizer
                </Link>
              </li>
              <li>
                <Link href="/carbon-offset\""""
    footer_content = footer_content.replace('<li>\n                <Link href="/carbon-offset"', replacement)
    
    with open('/app/applet/components/Footer.tsx', 'w') as f:
        f.write(footer_content)

# Update page.tsx
with open('/app/applet/app/solar-to-ev/page.tsx', 'r') as f:
    page_content = f.read()

trusted_resources_html = """              {/* Trusted Resources */}
              <div className="space-y-6 pt-8 border-t border-slate-800">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
                  Trusted & Related Resources
                </h2>
                <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <Globe className="w-5 h-5 text-emerald-400" /> External Authorities
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li><a href="https://pvwatts.nrel.gov/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3" /> NREL PVWatts Calculator</a></li>
                        <li><a href="https://www.epa.gov/greenvehicles" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3" /> EPA Green Vehicle Guide</a></li>
                        <li><a href="https://www.energy.gov/eere/solar/homeowners-guide-going-solar" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3" /> DOE Guide to Going Solar</a></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                        <Settings className="w-5 h-5 text-blue-400" /> Internal Tools
                      </h3>
                      <ul className="space-y-2 text-sm text-slate-400">
                        <li><Link href="/home-charging" className="hover:text-blue-400 transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3" /> Home Charging Economics</Link></li>
                        <li><Link href="/battery-health" className="hover:text-blue-400 transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3" /> Battery Health & Degradation</Link></li>
                        <li><Link href="/carbon-offset" className="hover:text-blue-400 transition-colors flex items-center gap-1"><ArrowRight className="w-3 h-3" /> Carbon Offset Matrix</Link></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

"""

if "Trusted Resources" not in page_content:
    page_content = page_content.replace('{/* FAQ Accordion */}', trusted_resources_html + '              {/* FAQ Accordion */}')
    
    with open('/app/applet/app/solar-to-ev/page.tsx', 'w') as f:
        f.write(page_content)


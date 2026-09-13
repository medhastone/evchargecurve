# Update Navbar
with open('/app/applet/components/Navbar.tsx', 'r') as f:
    nav_content = f.read()

if "path: '/ev-charging-cost'" not in nav_content:
    nav_replacement = """  { name: 'Home Charging', path: '/home-charging' },
  { name: 'EV Charging Cost', path: '/ev-charging-cost' },"""
    nav_content = nav_content.replace("  { name: 'Home Charging', path: '/home-charging' },", nav_replacement)
    with open('/app/applet/components/Navbar.tsx', 'w') as f:
        f.write(nav_content)

# Update Footer
with open('/app/applet/components/Footer.tsx', 'r') as f:
    footer_content = f.read()

if "href=\"/ev-charging-cost\"" not in footer_content:
    footer_replacement = """              <li>
                <Link href="/home-charging" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  Home Charging Economics
                </Link>
              </li>
              <li>
                <Link href="/ev-charging-cost" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">
                  EV Charging Cost & Savings
                </Link>
              </li>"""
    footer_content = footer_content.replace('              <li>\n                <Link href="/home-charging" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">\n                  Home Charging Economics\n                </Link>\n              </li>', footer_replacement)
    with open('/app/applet/components/Footer.tsx', 'w') as f:
        f.write(footer_content)

print("Linked correctly!")

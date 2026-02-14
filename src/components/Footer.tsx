import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border mt-20">
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="brand-name text-lg font-semibold mb-4">Dotted</h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            Premium essentials. Thoughtfully crafted. Sustainably made.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-medium tracking-widest uppercase mb-4">Navigate</h4>
          <div className="flex flex-col gap-2">
            {[
              { to: "/shop", label: "Shop" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-medium tracking-widest uppercase mb-4">Info</h4>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>Free shipping over $100</span>
            <span>30-day returns</span>
            <span>hello@dotted.com</span>
          </div>
        </div>
      </div>
      <div className="border-t border-border mt-10 pt-6 text-center">
        <p className="text-xs text-muted-foreground">© 2026 Dotted. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;

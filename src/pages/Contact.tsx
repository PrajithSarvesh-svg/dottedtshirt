import { Mail, MapPin } from "lucide-react";

const Contact = () => (
  <main className="container mx-auto px-4 lg:px-8 py-20 max-w-2xl">
    <h1 className="section-heading text-3xl font-semibold mb-8">Contact</h1>
    <p className="text-muted-foreground leading-relaxed mb-10">
      Have a question or need help with an order? We'd love to hear from you.
    </p>
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <Mail className="h-5 w-5 mt-0.5 text-muted-foreground" />
        <div>
          <h3 className="text-sm font-medium mb-1">Email</h3>
          <p className="text-sm text-muted-foreground">hello@dotted.com</p>
        </div>
      </div>
      <div className="flex items-start gap-4">
        <MapPin className="h-5 w-5 mt-0.5 text-muted-foreground" />
        <div>
          <h3 className="text-sm font-medium mb-1">Studio</h3>
          <p className="text-sm text-muted-foreground">44/4, District Fund Rd, behind Big Bazaar, Kottapalya, Jayanagara</p>
        </div>
      </div>
    </div>
  </main>
);

export default Contact;

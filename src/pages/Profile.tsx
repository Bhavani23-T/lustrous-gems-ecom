import { User, Mail, Phone, MapPin } from "lucide-react";

const Profile = () => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="font-display text-2xl md:text-3xl font-bold mb-8">My Profile</h1>
    <div className="max-w-2xl">
      <div className="bg-card border border-border rounded-lg p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
            <User size={28} className="text-accent-foreground" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-lg">Priya Sharma</h2>
            <p className="text-sm text-muted-foreground">Member since Jan 2025</p>
          </div>
        </div>
        <div className="space-y-4">
          {[
            { icon: Mail, label: "Email", value: "priya.sharma@email.com" },
            { icon: Phone, label: "Phone", value: "+91 98765 43210" },
            { icon: MapPin, label: "Address", value: "123, Rose Garden, Mumbai, MH 400001" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <item.icon size={18} className="text-muted-foreground mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium text-sm">Edit Profile</button>
    </div>
  </div>
);

export default Profile;

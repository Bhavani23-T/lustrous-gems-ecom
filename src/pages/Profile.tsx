import { useState } from "react";
import { User, Mail, Phone, MapPin, Edit2, Save, X, Camera } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { BackButton } from "@/components/ui/BackButton";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    address: "123, Rose Garden, Mumbai, MH 400001",
    memberSince: "Jan 2025"
  });

  const [formState, setFormState] = useState({ ...userData });

  const handleSave = () => {
    setUserData({ ...formState });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormState({ ...userData });
    setIsEditing(false);
  };

  return (
    <div className="container mx-auto px-4 py-4 md:py-8">
      <div className="max-w-3xl mx-auto">
        <BackButton />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="font-display text-3xl md:text-5xl font-black mb-2">My Profile</h1>
            <p className="text-muted-foreground font-medium">Manage your personal information and settings</p>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/20 hover:opacity-90 transition-all active:scale-95"
            >
              <Edit2 size={16} /> Edit Profile
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {/* Sidebar / Avatar */}
          <div className="md:col-span-4">
            <div className="bg-card border border-border rounded-[32px] p-8 text-center shadow-sm">
              <div className="relative inline-block mb-6 group">
                <div className="w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center border-4 border-background ring-2 ring-primary/20 overflow-hidden">
                  <User size={64} className="text-primary" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2.5 bg-primary text-primary-foreground rounded-full shadow-lg border-4 border-card hover:scale-110 transition-transform">
                    <Camera size={16} />
                  </button>
                )}
              </div>
              <h2 className="font-display font-black text-xl mb-1">{userData.name}</h2>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Member Since {userData.memberSince}</p>
            </div>
          </div>

          {/* Main Details Area */}
          <div className="md:col-span-8">
            <AnimatePresence mode="wait">
              {!isEditing ? (
                <motion.div
                  key="view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-card border border-border rounded-[32px] p-8 shadow-sm space-y-8"
                >
                  <div className="grid gap-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center shrink-0">
                        <Mail size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Email Address</p>
                        <p className="font-bold text-lg">{userData.email}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center shrink-0">
                        <Phone size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Mobile Number</p>
                        <p className="font-bold text-lg">{userData.phone}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-secondary/50 flex items-center justify-center shrink-0">
                        <MapPin size={20} className="text-primary" />
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black mb-1">Delivery Address</p>
                        <p className="font-bold text-lg leading-relaxed">{userData.address}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="edit"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-card border border-border rounded-[32px] p-8 shadow-sm"
                >
                  <div className="space-y-6">
                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-black block mb-2 px-1">Full Name</label>
                      <input
                        type="text"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-secondary/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-2xl px-5 py-4 font-bold transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-black block mb-2 px-1">Email Address</label>
                      <input
                        type="email"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-secondary/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-2xl px-5 py-4 font-bold transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-black block mb-2 px-1">Mobile Number</label>
                      <input
                        type="text"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full bg-secondary/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-2xl px-5 py-4 font-bold transition-all outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-muted-foreground uppercase tracking-widest font-black block mb-2 px-1">Delivery Address</label>
                      <textarea
                        rows={3}
                        value={formState.address}
                        onChange={(e) => setFormState({ ...formState, address: e.target.value })}
                        className="w-full bg-secondary/30 border-2 border-transparent focus:border-primary/50 focus:bg-background rounded-2xl px-5 py-4 font-bold transition-all outline-none resize-none"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        onClick={handleSave}
                        className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground py-4 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/10 hover:opacity-90 transition-all active:scale-95"
                      >
                        <Save size={18} /> Save Changes
                      </button>
                      <button
                        onClick={handleCancel}
                        className="flex-1 flex items-center justify-center gap-2 bg-secondary text-foreground py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-muted transition-all active:scale-95"
                      >
                        <X size={18} /> Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

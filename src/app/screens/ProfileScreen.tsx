import { motion } from 'motion/react';
import { ChevronRight, Package, MapPin, LogOut, User as UserIcon } from 'lucide-react';

export function ProfileScreen() {
  const user = {
    name: 'Rahul Sharma',
    email: 'rahul.sharma@email.com',
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200',
  };

  const menuItems = [
    { icon: Package, label: 'My Orders', badge: '3' },
    { icon: MapPin, label: 'Saved Addresses', badge: null },
    { icon: UserIcon, label: 'Edit Profile', badge: null },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-primary text-primary-foreground px-4 py-6">
        <h1 className="text-xl mb-6">My Profile</h1>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card/10 backdrop-blur rounded-2xl p-4 flex items-center gap-4"
        >
          <div className="w-16 h-16 rounded-full overflow-hidden bg-card">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-lg">{user.name}</h2>
            <p className="text-sm text-primary-foreground/70">{user.email}</p>
          </div>
        </motion.div>
      </div>

      {/* Menu Items */}
      <div className="p-4 space-y-3">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-card rounded-2xl p-4 flex items-center justify-between"
              style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span>{item.label}</span>
              </div>
              <div className="flex items-center gap-2">
                {item.badge && (
                  <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-xs">
                    {item.badge}
                  </div>
                )}
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Settings Section */}
      <div className="p-4 space-y-3 mt-4">
        <h3 className="text-sm text-muted-foreground px-2">Settings</h3>
        
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full bg-card rounded-2xl p-4 flex items-center gap-3"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            <span className="text-xl">🔔</span>
          </div>
          <span>Notifications</span>
          <div className="ml-auto">
            <div className="w-12 h-6 bg-primary rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5" />
            </div>
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full bg-card rounded-2xl p-4 flex items-center gap-3"
          style={{
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
            <span className="text-xl">🌙</span>
          </div>
          <span>Dark Mode</span>
          <div className="ml-auto">
            <div className="w-12 h-6 bg-muted rounded-full relative">
              <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5" />
            </div>
          </div>
        </motion.button>
      </div>

      {/* Logout Button */}
      <div className="p-4 mt-4">
        <motion.button
          whileTap={{ scale: 0.98 }}
          className="w-full bg-destructive/10 text-destructive rounded-2xl p-4 flex items-center justify-center gap-3"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </motion.button>
      </div>
    </div>
  );
}

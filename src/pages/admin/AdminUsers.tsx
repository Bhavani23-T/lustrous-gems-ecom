const users = [
  { id: "1", name: "Priya Sharma", email: "priya@email.com", orders: 5, joined: "2025-01-10" },
  { id: "2", name: "Anita Mehta", email: "anita@email.com", orders: 3, joined: "2025-03-15" },
  { id: "3", name: "Ritu Kapoor", email: "ritu@email.com", orders: 8, joined: "2024-11-20" },
  { id: "4", name: "Sneha Patel", email: "sneha@email.com", orders: 2, joined: "2025-06-01" },
];

const AdminUsers = () => (
  <div>
    <h1 className="font-display text-2xl font-bold mb-6">Users</h1>
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary">
            <tr>
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium">Email</th>
              <th className="text-left p-3 font-medium">Orders</th>
              <th className="text-left p-3 font-medium">Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-border">
                <td className="p-3 font-medium">{u.name}</td>
                <td className="p-3 text-muted-foreground">{u.email}</td>
                <td className="p-3">{u.orders}</td>
                <td className="p-3 text-muted-foreground">{u.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default AdminUsers;

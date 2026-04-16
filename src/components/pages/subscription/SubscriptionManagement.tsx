import React from "react";
import {
  TrendingDown,
  Users,
  Search,
  Filter,
  MoreVertical,
  History,
  Wallet,
  UserMinus,
} from "lucide-react";

// --- Interfaces ---
interface StatCardProps {
  title: string;
  value: string;
  trend: string;
  icon: React.ReactNode;
  type: "revenue" | "mrr" | "churn" | "subs";
  goal?: string;
}

interface Customer {
  name: string;
  email: string;
  plan: "Pro" | "Premium" | "Free";
  status: "Active" | "Expiring";
  cycle: "Monthly" | "Annual";
  date: string;
  avatar: string;
}

const Dashboard: React.FC = () => {
  const stats: StatCardProps[] = [
    {
      title: "TOTAL REVENUE",
      value: "$124,500",
      trend: "+12%",
      icon: <Wallet size={18} />,
      type: "revenue",
    },
    {
      title: "MONTHLY MRR",
      value: "$38,240",
      trend: "+8.4%",
      icon: <History size={18} />,
      type: "mrr",
      goal: "72%",
    },
    {
      title: "CHURN RATE",
      value: "2.4%",
      trend: "-0.4%",
      icon: <UserMinus size={18} />,
      type: "churn",
    },
    {
      title: "ACTIVE SUBS",
      value: "12,842",
      trend: "+342",
      icon: <Users size={18} />,
      type: "subs",
    },
  ];

  const customers: Customer[] = [
    {
      name: "Alex Rivera",
      email: "alex@rivera.tech",
      plan: "Pro",
      status: "Active",
      cycle: "Monthly",
      date: "Oct 12, 2023",
      avatar: "https://i.pravatar.cc/150?u=1",
    },
    {
      name: "Sarah Chen",
      email: "s.chen@global.co",
      plan: "Premium",
      status: "Active",
      cycle: "Annual",
      date: "Aug 05, 2023",
      avatar: "https://i.pravatar.cc/150?u=2",
    },
    {
      name: "Jordan Smith",
      email: "j.smith@design.io",
      plan: "Free",
      status: "Expiring",
      cycle: "Monthly",
      date: "Sep 28, 2023",
      avatar: "https://i.pravatar.cc/150?u=3",
    },
  ];

  return (
    <main className="flex-1 p-4 lg:p-9 w-full bg-[#f7eccd] min-h-screen">
      <div className="space-y-10 w-full">
        {/* 1. Metrics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`p-4 rounded-3xl relative transition-all duration-300 bg-white scale-105 z-10"

              }`}
            >
              <div className="flex justify-between items-start mb-6 ">
                <div
                  className={
                    "w-12 h-12 rounded-2xl flex items-center justify-center bg-blue-600 text-white "
                  }
                >
                  {stat.icon}
                </div>
                <span
                  className={`text-xs font-bold flex items-center gap-1 ${
                    stat.type === "churn" ? "text-red-500" : "text-blue-500"
                  }`}
                >
                  {stat.trend}{" "}
                  {stat.type !== "subs" && <TrendingDown size={14} />}
                </span>
              </div>
              <p className="text-[11px] uppercase tracking-widest font-black text-slate-400 mb-1">
                {stat.title}
              </p>
              <p className="text-3xl font-black text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* 2. Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Revenue Growth Chart */}
          <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-50">
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-sm font-black uppercase tracking-widest">
                Revenue Growth
              </h3>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-600"></div>
                  <span className="text-xs font-bold text-slate-500">
                    New Subscriptions
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-100"></div>
                  <span className="text-xs font-bold text-slate-500">
                    Renewals
                  </span>
                </div>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-4 px-2">
              {[45, 55, 40, 75, 65, 85].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 flex flex-col gap-1 h-full justify-end group cursor-pointer"
                >
                  <div
                    className="w-full bg-blue-50 rounded-t-lg relative transition-all"
                    style={{ height: `${h + 10}%` }}
                  >
                    <div
                      className="absolute bottom-0 w-full bg-blue-600 rounded-t-lg transition-all group-hover:bg-blue-700"
                      style={{ height: `${h}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6 px-2 text-[10px] font-black text-slate-400 tracking-tighter">
              {["JAN", "FEB", "MAR", "APR", "MAY", "JUN"].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>

          {/* Churn Analysis Chart */}
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-50">
            <h3 className="text-sm font-black uppercase tracking-widest mb-10">
              Churn Analysis
            </h3>
            <div className="relative flex justify-center items-center py-4">
              <div className="w-44 h-44 rounded-full border-[16px] border-slate-50 border-t-blue-600 border-r-blue-200"></div>
              <div className="absolute flex flex-col items-center">
                <span className="text-3xl font-black">2.4%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">
                  Average
                </span>
              </div>
            </div>
            <div className="mt-10 space-y-4">
              <ChurnRow
                label="Pricing reasons"
                value="42%"
                color="bg-blue-600"
              />
              <ChurnRow
                label="Missing features"
                value="28%"
                color="bg-blue-200"
              />
              <ChurnRow
                label="Other reasons"
                value="30%"
                color="bg-slate-100"
              />
            </div>
          </div>
        </div>

        {/* 3. Table Section */}
        <section className="bg-white rounded-[2rem] shadow-sm border border-slate-50 overflow-hidden">
          <div className="p-8 flex justify-between items-center">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">
              Subscribed Users
            </h3>
            <div className="flex gap-3">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  className="pl-12 pr-6 py-3 bg-slate-50 rounded-2xl border-none text-xs w-72 focus:ring-2 focus:ring-blue-600 outline-none font-medium"
                  placeholder="Search customers..."
                />
              </div>
              <button className="flex items-center gap-2 px-5 py-3 bg-slate-50 text-slate-600 rounded-2xl text-xs font-black hover:bg-slate-100 transition-all">
                <Filter size={16} /> FILTERS
              </button>
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left">
              <thead className="bg-slate-50/50">
                <tr className="border-b border-slate-50">
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-slate-400 tracking-wider">
                    User
                  </th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-slate-400 tracking-wider">
                    Plan
                  </th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-slate-400 tracking-wider">
                    Status
                  </th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-slate-400 tracking-wider">
                    Billing Cycle
                  </th>
                  <th className="px-8 py-5 text-[11px] font-black uppercase text-slate-400 tracking-wider">
                    Join Date
                  </th>
                  <th className="px-8 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {customers.map((c, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/30 transition-colors group"
                  >
                    <td className="px-8 py-6 flex items-center gap-4">
                      <img
                        src={c.avatar}
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                        alt=""
                      />
                      <div>
                        <p className="text-sm font-black text-slate-900">
                          {c.name}
                        </p>
                        <p className="text-[11px] text-slate-400 font-bold">
                          {c.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                          c.plan === "Pro"
                            ? "bg-blue-600 text-white"
                            : c.plan === "Premium"
                              ? "bg-slate-900 text-white"
                              : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {c.plan}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2 text-blue-600">
                        <div
                          className={`w-2 h-2 rounded-full ${c.status === "Active" ? "bg-blue-600" : "bg-orange-500"}`}
                        ></div>
                        <span
                          className={`text-xs font-black ${c.status === "Active" ? "text-blue-600" : "text-orange-500"}`}
                        >
                          {c.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-xs font-bold text-slate-500">
                      {c.cycle}
                    </td>
                    <td className="px-8 py-6 text-xs font-bold text-slate-500">
                      {c.date}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button className="text-slate-300 hover:text-slate-900 opacity-0 group-hover:opacity-100 transition-all">
                        <MoreVertical size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
};

const ChurnRow = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${color}`}></div>
      <span className="text-xs font-bold text-slate-500">{label}</span>
    </div>
    <span className="text-xs font-black text-slate-900">{value}</span>
  </div>
);

export default Dashboard;

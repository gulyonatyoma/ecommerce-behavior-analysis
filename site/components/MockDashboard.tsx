"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Activity, Database, PackageSearch, ShoppingCart, Users } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const funnelTrend = [
  { month: "Oct", vc: 1.813, vp: 0.89 },
  { month: "Nov", vc: 3.881, vp: 1.589 },
  { month: "Dec", vc: 4.134, vp: 1.918 },
  { month: "Jan", vc: 3.638, vp: 1.629 },
  { month: "Feb", vc: 3.558, vp: 1.742 },
  { month: "Mar", vc: 4.185, vp: 2.09 },
  { month: "Apr", vc: 4.038, vp: 1.823 },
];

const marchBrands = [
  { name: "Apple", value: 141.32 },
  { name: "Samsung", value: 65.44 },
  { name: "Xiaomi", value: 12.56 },
  { name: "Acer", value: 6.43 },
  { name: "Huawei", value: 5.87 },
];

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name?: string; value?: number | string; unit?: string }>; label?: string | number }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs shadow-xl">
      <p className="font-bold text-slate-900">{label}</p>
      <div className="mt-1 space-y-1">
        {payload.map((item) => (
          <p key={`${item.name}-${item.value}`} className="text-slate-600">
            <span className="font-semibold">{item.name}:</span> {item.value}{item.unit ?? ""}
          </p>
        ))}
      </div>
    </div>
  );
}

const kpiIcons = [Database, Users, PackageSearch, ShoppingCart];

export function MockDashboard() {
  const { t, locale } = useLanguage();
  const monthLabels = locale === "ru"
    ? { Oct: "Окт", Nov: "Ноя", Dec: "Дек", Jan: "Янв", Feb: "Фев", Mar: "Мар", Apr: "Апр" }
    : { Oct: "Қаз", Nov: "Қар", Dec: "Жел", Jan: "Қаң", Feb: "Ақп", Mar: "Нау", Apr: "Сәу" };

  const localizedTrend = funnelTrend.map((row) => ({ ...row, month: monthLabels[row.month as keyof typeof monthLabels] }));
  const kpis = [
    { value: "410.17M", label: t.dashboard.cleanEventsKpi, note: t.dashboard.cleanEventsNote },
    { value: "15.63M", label: t.dashboard.usersKpi, note: t.dashboard.usersNote },
    { value: "386.3K", label: t.dashboard.productsKpi, note: t.dashboard.productsNote },
    { value: "6.70M", label: t.dashboard.purchaseEventsKpi, note: t.dashboard.purchaseEventsNote },
  ];

  return (
    <div className="grid gap-4 bg-slate-50/70 p-4 sm:p-5 lg:grid-cols-12">
      {kpis.map((item, index) => {
        const Icon = kpiIcons[index];
        return (
          <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-kazakh-sky/10 text-kazakh-sky">
              <Icon className="h-[18px] w-[18px]" />
            </div>
            <p className="mt-5 text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">{item.label}</p>
            <p className="mt-1 text-3xl font-black text-slate-950">{item.value}</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">{item.note}</p>
          </div>
        );
      })}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-7">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h4 className="text-sm font-extrabold text-slate-900">{t.dashboard.trendTitle}</h4>
            <p className="mt-1 text-xs text-slate-400">{t.dashboard.trendSubtitle}</p>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">1d</span>
        </div>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={localizedTrend} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} unit="%" domain={[0, 5]} />
              <Tooltip content={<ChartTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11 }} />
              <Line type="monotone" dataKey="vc" name={t.dashboard.vcLegend} unit="%" stroke="#00AFCA" strokeWidth={2.5} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="vp" name={t.dashboard.vpLegend} unit="%" stroke="#E5A910" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-5">
        <div className="flex items-center gap-2">
          <Activity className="h-4 w-4 text-kazakh-sky" />
          <h4 className="text-sm font-extrabold text-slate-900">{t.dashboard.repeatTitle}</h4>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {t.dashboard.repeatStats.map((item) => (
            <div key={item.label} className="rounded-2xl bg-slate-50 p-4">
              <p className="text-2xl font-black text-slate-950">{item.value}</p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs leading-5 text-slate-400">{t.dashboard.repeatNote}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-7">
        <h4 className="text-sm font-extrabold text-slate-900">{t.dashboard.brandTitle}</h4>
        <p className="mt-1 text-xs text-slate-400">{t.dashboard.brandSubtitle}</p>
        <div className="mt-3 h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marchBrands} layout="vertical" margin={{ top: 5, right: 18, left: 18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#94A3B8" }} axisLine={false} tickLine={false} unit="M" />
              <YAxis dataKey="name" type="category" width={70} tick={{ fontSize: 10, fill: "#64748B" }} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} />
              <Bar dataKey="value" name={t.dashboard.valueLegend} unit="M" fill="#E5A910" radius={[0, 7, 7, 0]} barSize={14} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-950 p-5 text-white shadow-sm lg:col-span-5">
        <h4 className="text-sm font-extrabold">{t.dashboard.dqTitle}</h4>
        <p className="mt-1 text-xs leading-5 text-slate-400">{t.dashboard.dqSubtitle}</p>
        <div className="mt-5 space-y-3">
          {t.dashboard.dqStats.map((item) => (
            <div key={item.label} className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.045] px-4 py-3">
              <span className="text-xs leading-5 text-slate-400">{item.label}</span>
              <span className="shrink-0 text-sm font-black text-kazakh-sun">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

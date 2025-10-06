import React, { useMemo, useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, CartesianGrid, Legend } from 'recharts'

// Lightweight icons using emoji to avoid library deps
const IconSearch = () => <span role="img" aria-label="search">🔎</span>
const IconRefresh = () => <span role="img" aria-label="refresh">🔄</span>

// ------- Integrations list (CRMs only) -------
const INTEGRATIONS = [
  { id: 'salesforce_cti', name: 'Salesforce CTI', category: 'CRM' },
  { id: 'salesforce_sidebar', name: 'Salesforce Sidebar', category: 'CRM' },
  { id: 'hubspot', name: 'HubSpot (All Variants)', category: 'CRM' },
  { id: 'zoho', name: 'Zoho (All Variants)', category: 'CRM' },
  { id: 'dynamics', name: 'MS Dynamics', category: 'CRM' },
  { id: 'copper', name: 'Copper', category: 'CRM' },
  { id: 'bullhorn', name: 'Bullhorn', category: 'CRM' },
] as const

// ------- Static KPI seed (Tableau-based where known) -------
const KPI: Record<string, any> = {
  salesforce_cti: {
    summary: {
      events12m: 15670000,
      events90d: 4800000,
      companies: 864,
      mau: 14300,
      wau: 7400,
      active30Rate: 0.75,
      avgCallsPerActive30: 38,
      arr: 64800000,
      sourceSplit: [
        { key: 'cti', pct: 0.886 },
        { key: 'sidebar', pct: 0.104 },
      ],
    },
    funnels: {
      monthly: [
        { step: 'load record', value: 100 },
        { step: 'record matched', value: 83 },
        { step: 'save note', value: 42 },
        { step: 'create task', value: 28 },
        { step: 'view record externally', value: 17 },
      ],
    },
    reliability: [
      { key: 'wrong match', value: 3.2 },
      { key: 'rematch loop', value: 1.4 },
      { key: 'creation failed', value: 0.9 },
    ],
    timeSeries: [
      { m: 'Sep 24', events: 1450000 },
      { m: 'Oct 24', events: 1520000 },
      { m: 'Nov 24', events: 1610000 },
      { m: 'Dec 24', events: 1480000 },
      { m: 'Jan 25', events: 1560000 },
      { m: 'Feb 25', events: 1430000 },
      { m: 'Mar 25', events: 1380000 },
      { m: 'Apr 25', events: 1330000 },
      { m: 'May 25', events: 1410000 },
      { m: 'Jun 25', events: 1520000 },
      { m: 'Jul 25', events: 1620000 },
      { m: 'Aug 25', events: 1780000 },
      { m: 'Sep 25', events: 3000000 },
      { m: 'Oct 25', events: 1670000 },
    ],
  },
  salesforce_sidebar: {
    summary: {
      events12m: 1830000,
      events90d: 500000,
      companies: 864,
      mau: 14000,
      wau: null,
      active30Rate: 0.75,
      avgCallsPerActive30: 210,
      arr: 64800000,
      sourceSplit: [{ key: 'sidebar', pct: 1.0 }],
    },
    funnels: {
      monthly: [
        { step: 'load record', value: 100 },
        { step: 'record matched', value: 88 },
        { step: 'save note', value: 55 },
        { step: 'create task', value: 31 },
        { step: 'view record externally', value: 22 },
      ],
    },
    reliability: [
      { key: 'wrong match', value: 2.1 },
      { key: 'rematch loop', value: 1.2 },
      { key: 'creation failed', value: 0.7 },
    ],
    timeSeries: [],
  },
  // Other CRMs will show a friendly empty state until wired
}

export default function App() {
  const [q, setQ] = useState('')
  const [activeId, setActiveId] = useState<typeof INTEGRATIONS[number]['id']>('salesforce_cti')

  const filtered = useMemo(() => INTEGRATIONS.filter(i => i.name.toLowerCase().includes(q.toLowerCase())), [q])
  const data = KPI[activeId]
  const summary = data?.summary
  const funnel = data?.funnels?.monthly ?? []
  const reliability = data?.reliability ?? []

  return (
    <div className="h-screen w-full grid grid-cols-[300px_1fr] bg-slate-50 text-slate-900">
      <div className="border-r bg-white p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <IconSearch />
          <Input placeholder="Search integrations" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="text-xs uppercase tracking-wider text-slate-500 mt-2">CRM Integrations</div>
        <div className="flex-1 overflow-auto">
          {filtered.map((i) => (
            <button
              key={i.id}
              onClick={() => setActiveId(i.id)}
              className={`w-full text-left px-3 py-2 rounded-xl mb-1 flex items-center justify-between ${
                activeId === i.id ? 'bg-slate-900 text-white' : 'hover:bg-slate-100'
              }`}
            >
              <span className="font-medium">{i.name}</span>
              <span className="opacity-60">›</span>
            </button>
          ))}
        </div>
        <div className="text-xs text-slate-500">Data: Tableau‑validated. Amplitude pending.</div>
      </div>

      <div className="p-6 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">{INTEGRATIONS.find(i => i.id === activeId)?.name}</h1>
          <Button variant="outline" className="gap-2"><IconRefresh /> Refresh</Button>
        </div>

        {!summary ? (
          <Card className="mb-6">
            <CardContent className="p-4 text-sm">
              <div className="font-medium mb-1">No data wired for this integration</div>
              <div className="text-slate-600">Upload Summary/Monthly files to enable charts and KPIs.</div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Stat title="12‑mo events" value={fmt(summary.events12m)} sub="Tableau" />
              <Stat title="90‑day events" value={fmt(summary.events90d)} sub="Tableau" />
              <Stat title="Companies" value={fmt(summary.companies)} sub="Enabled" />
              <Stat title="MAU" value={fmt(summary.mau)} sub="30‑day active" />
              <Stat title="WAU" value={summary.wau ? fmt(summary.wau) : '—'} sub="7‑day active" />
              <Stat title="Active rate (30d)" value={summary.active30Rate ? (summary.active30Rate * 100).toFixed(0) + '%' : '—'} sub="Users active / month" />
              <Stat title="Avg calls / active (30d)" value={fmt(summary.avgCallsPerActive30)} sub="Per user" />
              <Stat title="ARR" value={summary.arr ? '$' + fmt(summary.arr) : '—'} sub="Annual" />
            </div>

            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">Events over time</div>
                  <Badge variant="secondary">Sep 2024 – Oct 2025</Badge>
                </div>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data?.timeSeries?.length ? data.timeSeries : [
                      { m: '12m', events: summary.events12m },
                      { m: '90d', events: summary.events90d },
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="m" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="events" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium">Funnel: load → match → note → task → external</div>
                    <Badge>Sidebar/CTI</Badge>
                  </div>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={funnel && funnel.length ? funnel : []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="step" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="value" name="% of loads" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="font-medium">Reliability signals</div>
                    <Badge variant="secondary">Rates</Badge>
                  </div>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={reliability && reliability.length ? reliability : []}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="key" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" name="% of sessions" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-medium">Event families (sample)</div>
                  <Badge variant="secondary">Sidebar schema; CTI once instrumented</Badge>
                </div>
                <div className="overflow-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left text-slate-500">
                      <tr>
                        <th className="py-2">Family</th>
                        <th>Events</th>
                        <th>Metric</th>
                        <th>Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      <Row family="Record access" metric="Match‑rate 83%" note="Boost confidence & top‑match UI" events={["load record","record matched","view contact","view record externally"]} />
                      <Row family="Creation flow" metric="Fail‑rate 0.7–0.9%" note="Inline validation, recovery" events={["click create record","initiate record creation","record created","creation failed"]} />
                      <Row family="Productivity" metric="Notes 42% • Tasks 28%" note="One‑tap templates" events={["save note","create task","click log note","click log task"]} />
                      <Row family="Match quality" metric="Wrong 3.2% • Rematch 1.4%" note="Explain why matched" events={["connect match","view contact match","wrong match","rematch","unmatch contact"]} />
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  )
}

function Stat({ title, value, sub }: { title: string; value: React.ReactNode; sub?: string }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="text-xs text-slate-500">{title}</div>
        <div className="text-2xl font-semibold mt-1">{value}</div>
        {sub && <div className="text-xs text-slate-500 mt-1">{sub}</div>}
      </CardContent>
    </Card>
  )
}

function Row({ family, events, metric, note }: { family: string; events: string[]; metric: string; note: string }) {
  return (
    <tr className="border-t">
      <td className="py-2 font-medium">{family}</td>
      <td className="py-2">{events.join(', ')}</td>
      <td className="py-2">{metric}</td>
      <td className="py-2 text-slate-600">{note}</td>
    </tr>
  )
}

function fmt(n: number | null | undefined): string {
  if (n == null || Number.isNaN(n as any)) return '—'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'K'
  return String(n)
}

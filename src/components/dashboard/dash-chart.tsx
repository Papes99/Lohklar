import { useEffect, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { DashView, SeriesPoint } from "@/lib/domain/usage";

const PETROL = "#245c4a";
const MUTED = "#5c6661";

export function DashChart({
  view,
  series,
  showAll = false,
  onSelect,
}: {
  view: DashView;
  series: SeriesPoint[];
  showAll?: boolean;
  onSelect: (key: string) => void;
}) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
        {showAll ? (
          <li className="flex items-center gap-1.5">
            <span className="inline-block h-px w-3 bg-primary" aria-hidden="true" />
            Alle
          </li>
        ) : null}
        <li className="flex items-center gap-1.5">
          <span className="inline-block h-px w-3 bg-primary/40" aria-hidden="true" />
          Ich
        </li>
        <li className="flex items-center gap-1.5">
          <span className="inline-block h-px w-3 bg-primary/30" aria-hidden="true" />
          Häuser neu
        </li>
      </ul>
      <div className="mt-3 min-h-0 flex-1">
        {ready ? (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={series}
              margin={{ top: 6, right: 4, left: -12, bottom: 0 }}
              onClick={(state) => {
                const key = (state?.activePayload?.[0]?.payload as SeriesPoint | undefined)?.key;
                if (key && view !== "day") onSelect(key);
              }}
            >
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: MUTED }}
                axisLine={false}
                tickLine={false}
                interval={view === "month" ? 1 : 0}
              />
              <YAxis
                yAxisId="usage"
                allowDecimals={false}
                width={28}
                tick={{ fontSize: 11, fill: MUTED }}
                tickFormatter={(value: number) => (Number.isInteger(value) ? String(value) : "")}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="houses"
                orientation="right"
                allowDecimals={false}
                width={28}
                tick={{ fontSize: 11, fill: MUTED }}
                tickFormatter={(value: number) => (Number.isInteger(value) ? String(value) : "")}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                cursor={{ stroke: PETROL, strokeOpacity: 0.15 }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const row = payload[0]?.payload as SeriesPoint | undefined;
                  if (!row) return null;
                  return (
                    <div className="rounded-[var(--radius-sm)] bg-surface px-2 py-1.5 text-xs text-ink shadow-[var(--shadow-border)]">
                      <p className="text-ink-muted">{row.label}</p>
                      <p className="tabular-nums">
                        {showAll ? (
                          <>
                            Alle {row.all}
                            <span className="text-ink-muted"> · </span>
                          </>
                        ) : null}
                        Ich {row.me}
                        <span className="text-ink-muted"> · </span>
                        Häuser {row.houses}
                      </p>
                    </div>
                  );
                }}
              />
              {showAll ? (
                <Line
                  yAxisId="usage"
                  type="monotone"
                  dataKey="all"
                  stroke={PETROL}
                  strokeWidth={1.75}
                  dot={false}
                  activeDot={{ r: 3, fill: PETROL, strokeWidth: 0 }}
                  isAnimationActive={false}
                />
              ) : null}
              <Line
                yAxisId="usage"
                type="monotone"
                dataKey="me"
                stroke={PETROL}
                strokeWidth={showAll ? 1.25 : 1.75}
                strokeOpacity={showAll ? 0.4 : 1}
                dot={false}
                activeDot={{ r: 3, fill: PETROL, strokeWidth: 0 }}
                isAnimationActive={false}
              />
              <Line
                yAxisId="houses"
                type="monotone"
                dataKey="houses"
                stroke={PETROL}
                strokeWidth={1}
                strokeDasharray="3 3"
                strokeOpacity={0.35}
                dot={false}
                activeDot={false}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : null}
      </div>
    </div>
  );
}

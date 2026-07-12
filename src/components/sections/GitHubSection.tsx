'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Github, Flame, Trophy, GitCommit } from 'lucide-react'

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface GitHubStats {
  total: number
  currentStreak: number
  longestStreak: number
  contributions: ContributionDay[]
}

// Neon green intensity scale on the near-black theme
const LEVEL_COLORS = ['#1a1a1a', '#0d3d2a', '#1a8f5c', '#00ff88', '#00ff88']

function buildWeeks(days: ContributionDay[]): (ContributionDay | null)[][] {
  const cells: (ContributionDay | null)[] = []
  if (days.length > 0) {
    // Pad so each column starts on Sunday
    const firstDow = new Date(days[0].date).getDay()
    for (let i = 0; i < firstDow; i++) cells.push(null)
  }
  cells.push(...days)
  const weeks: (ContributionDay | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }
  return weeks
}

function StatChip({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-cyber-green/5 border border-cyber-green/20">
      <span className="text-cyber-green">{icon}</span>
      <div>
        <p className="text-white font-mono font-bold leading-tight">{value}</p>
        <p className="text-gray-500 text-xs">{label}</p>
      </div>
    </div>
  )
}

export default function GitHubSection() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    fetch('/api/github-stats')
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then(setStats)
      .catch(() => setFailed(true))
  }, [])

  const weeks = stats ? buildWeeks(stats.contributions) : []

  return (
    <section id="github" className="relative py-20 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Content sits right of center — the 3D character is parked on the
            left between the hero and experience sections */}
        <div className="w-full md:max-w-3xl md:ml-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-2 mb-4">
              <Github className="w-6 h-6 text-cyber-green" />
              <span className="text-cyber-green font-mono text-sm">./github --stats</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">GitHub</span>
              <span className="text-gradient"> Activity</span>
            </h2>
            <p className="text-gray-400 font-mono text-sm">
              {'// A year of commits at a glance'}
            </p>
          </motion.div>

          {failed && (
            <p className="text-gray-500 font-mono text-sm">
              {'> stats unavailable — check '}
              <a
                href="https://github.com/yoockh"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyber-green hover:underline"
              >
                github.com/yoockh
              </a>
            </p>
          )}

          {!failed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Stats row */}
              <div className="flex flex-wrap gap-4 mb-8">
                <StatChip
                  icon={<GitCommit className="w-5 h-5" />}
                  label="contributions this year"
                  value={stats ? String(stats.total) : '…'}
                />
                <StatChip
                  icon={<Flame className="w-5 h-5" />}
                  label="current streak"
                  value={stats ? `${stats.currentStreak} days` : '…'}
                />
                <StatChip
                  icon={<Trophy className="w-5 h-5" />}
                  label="longest streak"
                  value={stats ? `${stats.longestStreak} days` : '…'}
                />
              </div>

              {/* Contribution heatmap: weeks as columns, days as rows */}
              <div className="glass-card p-4 border border-cyber-green/10 overflow-x-auto">
                {stats ? (
                  <div className="flex gap-[2px] w-max">
                    {weeks.map((week, wi) => (
                      <div key={wi} className="flex flex-col gap-[2px]">
                        {week.map((day, di) =>
                          day ? (
                            <div
                              key={day.date}
                              title={`${day.date}: ${day.count} contribution${day.count === 1 ? '' : 's'}`}
                              className="w-2.5 h-2.5 rounded-[2px]"
                              style={{
                                backgroundColor: LEVEL_COLORS[Math.min(day.level, 4)],
                                boxShadow:
                                  day.level >= 4
                                    ? '0 0 4px rgba(0,255,136,0.6)'
                                    : undefined,
                              }}
                            />
                          ) : (
                            <div key={`pad-${wi}-${di}`} className="w-2.5 h-2.5" />
                          )
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[86px] flex items-center justify-center">
                    <span className="text-gray-500 font-mono text-sm animate-pulse">
                      {'> fetching contribution graph…'}
                    </span>
                  </div>
                )}

                {/* Legend */}
                <div className="flex items-center justify-end gap-1.5 mt-3 text-[10px] text-gray-500 font-mono">
                  less
                  {LEVEL_COLORS.slice(0, 4).map((color) => (
                    <span
                      key={color}
                      className="w-2.5 h-2.5 rounded-[2px] inline-block"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  more
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

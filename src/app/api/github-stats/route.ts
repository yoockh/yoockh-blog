import { NextResponse } from 'next/server'

// Fetched server-side so any future switch to the authenticated GitHub
// GraphQL API can keep its token off the client. The public wrapper
// mirrors contributionsCollection.contributionCalendar without auth.
const UPSTREAM = 'https://github-contributions-api.jogruber.de/v4/yoockh?y=last'

// Don't prerender at build time; cache upstream responses for an hour.
export const dynamic = 'force-dynamic'

interface ContributionDay {
  date: string
  count: number
  level: number
}

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, { next: { revalidate: 3600 } })
    if (!res.ok) {
      return NextResponse.json({ error: 'upstream error' }, { status: 502 })
    }
    const data: {
      total: Record<string, number>
      contributions: ContributionDay[]
    } = await res.json()

    const days = data.contributions

    let longestStreak = 0
    let run = 0
    for (const day of days) {
      run = day.count > 0 ? run + 1 : 0
      longestStreak = Math.max(longestStreak, run)
    }

    // Current streak counts back from the latest day; a zero on the latest
    // day (today, likely not over yet) doesn't break the streak.
    let currentStreak = 0
    for (let i = days.length - 1; i >= 0; i--) {
      if (days[i].count > 0) currentStreak++
      else if (i === days.length - 1) continue
      else break
    }

    return NextResponse.json({
      total: data.total.lastYear ?? 0,
      currentStreak,
      longestStreak,
      contributions: days,
    })
  } catch {
    return NextResponse.json({ error: 'fetch failed' }, { status: 502 })
  }
}

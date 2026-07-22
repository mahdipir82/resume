import { skillGroups } from '../../data/skills'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

export function Skills() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-6" id="skills">
      <SectionHeading
        eyebrow="مهارت‌ها"
        title="ابزارهایی که با آن‌ها پروژه می‌سازم و یادگیری‌ام را جلو می‌برم."
        description="برای نمایش مهارت‌ها از درصدهای غیرواقعی استفاده نکرده‌ام؛ وضعیت هر مهارت با سطح عملی و قابل ویرایش مشخص شده است."
      />

      <div className="grid gap-5 md:grid-cols-2">
        {skillGroups.map((group) => {
          const Icon = group.icon
          return (
            <Card className="p-6" key={group.title}>
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-cyan-200">
                  <Icon aria-hidden="true" size={22} />
                </span>
                <h3 className="text-xl font-bold text-white" dir="ltr">
                  {group.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span
                    className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-slate-950/45 px-3 py-2 text-sm text-slate-200"
                    key={skill.name}
                  >
                    <strong className="font-semibold text-white">{skill.name}</strong>
                    <span className="h-1 w-1 rounded-full bg-cyan-300" />
                    <span className="text-xs text-slate-400">{skill.level}</span>
                  </span>
                ))}
              </div>
            </Card>
          )
        })}
      </div>
    </section>
  )
}

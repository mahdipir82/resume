import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'

const defaultDescription = 'بخشی از مسیر یادگیری و تمرین عملی برای ساخت پروژه‌های وب.'

export function Timeline({ isLoading = false, timelineItems }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-6" id="timeline">
      <SectionHeading
        eyebrow="مسیر یادگیری"
        title="نقشه‌ای کوتاه از چیزهایی که یاد گرفته‌ام و در حال عمیق‌تر کردنشان هستم."
        description="این بخش تجربه کاری غیرواقعی را القا نمی‌کند؛ فقط روند یادگیری و آماده‌سازی حرفه‌ای را نشان می‌دهد."
      />

      {isLoading ? (
        <p className="mb-5 rounded-lg border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">
          در حال خواندن مسیر یادگیری از بک‌اند...
        </p>
      ) : null}

      <div className="relative">
        <div className="absolute right-4 top-0 hidden h-full w-px bg-cyan-300/25 md:block" />
        <div className="grid gap-4">
          {timelineItems.map((item, index) => (
            <Card className="relative p-5 md:mr-10" key={item.id ?? item.title}>
              <span className="absolute -right-[2.85rem] top-6 hidden h-4 w-4 rounded-full border-4 border-slate-950 bg-cyan-300 shadow-lg shadow-cyan-400/30 md:block" />
              <div className="flex items-start gap-4">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 text-sm font-bold text-cyan-100">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    {item.description || defaultDescription}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

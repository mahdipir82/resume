import { KeyRound, LogOut, RotateCcw, Save, Settings, ShieldCheck, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

const passwordStorageKey = 'mahdi-portfolio-admin-password'
const sessionStorageKey = 'mahdi-portfolio-admin-session'

const fields = [
  { key: 'fullName', label: 'نام کامل' },
  { key: 'initials', label: 'لوگوی متنی' },
  { key: 'role', label: 'عنوان شغلی' },
  { key: 'heroSubtitle', label: 'توضیح کوتاه زیر نام' },
  { key: 'heroDescription', label: 'متن معرفی Hero', multiline: true },
  { key: 'aboutTitle', label: 'تیتر درباره من' },
  { key: 'aboutDescription', label: 'توضیح کوتاه درباره من', multiline: true },
  { key: 'aboutPrimary', label: 'متن اول درباره من', multiline: true },
  { key: 'aboutSecondary', label: 'متن دوم درباره من', multiline: true },
  { key: 'location', label: 'موقعیت' },
  { key: 'education', label: 'تحصیلات' },
  { key: 'focus', label: 'تمرکز/علاقه' },
  { key: 'availability', label: 'وضعیت همکاری' },
  { key: 'email', label: 'ایمیل', dir: 'ltr' },
  { key: 'phone', label: 'شماره تماس', dir: 'ltr' },
  { key: 'githubUrl', label: 'لینک GitHub', dir: 'ltr' },
  { key: 'githubLabel', label: 'متن GitHub', dir: 'ltr' },
  { key: 'linkedinUrl', label: 'لینک LinkedIn', dir: 'ltr' },
  { key: 'linkedinLabel', label: 'متن LinkedIn', dir: 'ltr' },
  { key: 'contactTitle', label: 'تیتر تماس' },
  { key: 'contactDescription', label: 'توضیح تماس', multiline: true },
]

async function hashPassword(password) {
  const encodedPassword = new TextEncoder().encode(password)
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', encodedPassword)

  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export function AdminPanel({ content, onReset, onSave }) {
  const [isOpen, setIsOpen] = useState(false)
  const [draft, setDraft] = useState(content)
  const [status, setStatus] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [hasPassword, setHasPassword] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setDraft(content)
  }, [content])

  useEffect(() => {
    setHasPassword(Boolean(window.localStorage.getItem(passwordStorageKey)))
    setIsAuthenticated(window.sessionStorage.getItem(sessionStorageKey) === 'true')
  }, [isOpen])

  const updateDraft = (key, value) => {
    setDraft((current) => ({ ...current, [key]: value }))
    setStatus('')
  }

  const saveDraft = (event) => {
    event.preventDefault()
    onSave(draft)
    setStatus('تغییرات ذخیره شد.')
  }

  const resetDraft = () => {
    onReset()
    setStatus('محتوا به حالت اولیه برگشت.')
  }

  const createPassword = async (event) => {
    event.preventDefault()
    setAuthError('')

    if (password.length < 8) {
      setAuthError('رمز باید حداقل ۸ کاراکتر باشد.')
      return
    }

    if (password !== confirmPassword) {
      setAuthError('تکرار رمز با رمز اصلی یکی نیست.')
      return
    }

    const passwordHash = await hashPassword(password)
    window.localStorage.setItem(passwordStorageKey, passwordHash)
    window.sessionStorage.setItem(sessionStorageKey, 'true')
    setHasPassword(true)
    setIsAuthenticated(true)
    setPassword('')
    setConfirmPassword('')
    setStatus('رمز پنل مدیریت ساخته شد.')
  }

  const login = async (event) => {
    event.preventDefault()
    setAuthError('')

    const savedHash = window.localStorage.getItem(passwordStorageKey)
    const passwordHash = await hashPassword(password)

    if (passwordHash !== savedHash) {
      setAuthError('رمز واردشده درست نیست.')
      return
    }

    window.sessionStorage.setItem(sessionStorageKey, 'true')
    setIsAuthenticated(true)
    setPassword('')
  }

  const logout = () => {
    window.sessionStorage.removeItem(sessionStorageKey)
    setIsAuthenticated(false)
    setStatus('از پنل خارج شدید.')
  }

  const resetPassword = () => {
    window.localStorage.removeItem(passwordStorageKey)
    window.sessionStorage.removeItem(sessionStorageKey)
    setHasPassword(false)
    setIsAuthenticated(false)
    setPassword('')
    setConfirmPassword('')
    setAuthError('')
  }

  const renderAuth = () => (
    <form className="mx-auto grid max-w-xl gap-4" onSubmit={hasPassword ? login : createPassword}>
      <div className="rounded-lg border border-cyan-300/20 bg-cyan-300/10 p-4 text-sm leading-7 text-cyan-50">
        <ShieldCheck aria-hidden="true" className="mb-3 text-cyan-200" size={22} />
        {hasPassword
          ? 'برای ورود به پنل مدیریت رمز را وارد کنید.'
          : 'برای اولین استفاده، یک رمز محلی برای پنل مدیریت بسازید. این رمز داخل کد یا GitHub ذخیره نمی‌شود.'}
      </div>
      <label className="block">
        <span className="text-sm font-semibold text-slate-200">رمز پنل مدیریت</span>
        <input
          autoComplete={hasPassword ? 'current-password' : 'new-password'}
          className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
          dir="ltr"
          onChange={(event) => setPassword(event.target.value)}
          type="password"
          value={password}
        />
      </label>
      {!hasPassword ? (
        <label className="block">
          <span className="text-sm font-semibold text-slate-200">تکرار رمز</span>
          <input
            autoComplete="new-password"
            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
            dir="ltr"
            onChange={(event) => setConfirmPassword(event.target.value)}
            type="password"
            value={confirmPassword}
          />
        </label>
      ) : null}
      {authError ? <p className="text-sm text-rose-300">{authError}</p> : null}
      <div className="flex flex-wrap gap-3">
        <Button as="button" icon={null} type="submit">
          <KeyRound aria-hidden="true" size={18} />
          {hasPassword ? 'ورود به پنل' : 'ساخت رمز و ورود'}
        </Button>
        {hasPassword ? (
          <Button as="button" icon={null} onClick={resetPassword} type="button" variant="ghost">
            فراموشی رمز
          </Button>
        ) : null}
      </div>
    </form>
  )

  return (
    <>
      <button
        className="fixed bottom-5 left-5 z-[75] inline-flex h-12 w-12 items-center justify-center rounded-lg border border-cyan-300/30 bg-slate-950/80 text-cyan-100 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl transition hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
        onClick={() => setIsOpen(true)}
        type="button"
      >
        <span className="sr-only">باز کردن پنل مدیریت</span>
        <Settings aria-hidden="true" size={21} />
      </button>

      {isOpen ? (
        <div
          aria-labelledby="admin-panel-title"
          aria-modal="true"
          className="fixed inset-0 z-[90] overflow-y-auto bg-slate-950/82 p-4 backdrop-blur-md"
          role="dialog"
        >
          <div className="mx-auto min-h-full max-w-5xl py-6">
            <Card className="p-5 md:p-7">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-cyan-300">پنل ادمین</p>
                  <h2 className="mt-2 text-2xl font-bold text-white" id="admin-panel-title">
                    ویرایش محتوای سایت
                  </h2>
                  <p className="mt-2 text-sm leading-7 text-slate-400">
                    پنل با رمز محلی محافظت می‌شود و تغییرات روی همین مرورگر ذخیره می‌ماند.
                  </p>
                </div>
                <button
                  aria-label="بستن پنل مدیریت"
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white transition hover:border-cyan-300/40 hover:bg-cyan-300/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300"
                  onClick={() => setIsOpen(false)}
                  type="button"
                >
                  <X aria-hidden="true" size={20} />
                </button>
              </div>

              {!isAuthenticated ? (
                renderAuth()
              ) : (
                <form className="grid gap-5" onSubmit={saveDraft}>
                  <div className="flex justify-end">
                    <Button as="button" icon={null} onClick={logout} type="button" variant="ghost">
                      <LogOut aria-hidden="true" size={18} />
                      خروج از پنل
                    </Button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    {fields.map((field) => (
                      <label
                        className={field.multiline ? 'block md:col-span-2' : 'block'}
                        key={field.key}
                      >
                        <span className="text-sm font-semibold text-slate-200">{field.label}</span>
                        {field.multiline ? (
                          <textarea
                            className="mt-2 min-h-28 w-full resize-y rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 leading-8 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
                            dir={field.dir ?? 'rtl'}
                            onChange={(event) => updateDraft(field.key, event.target.value)}
                            value={draft[field.key] ?? ''}
                          />
                        ) : (
                          <input
                            className="mt-2 w-full rounded-lg border border-white/10 bg-slate-950/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/60 focus:ring-4 focus:ring-cyan-300/10"
                            dir={field.dir ?? 'rtl'}
                            onChange={(event) => updateDraft(field.key, event.target.value)}
                            value={draft[field.key] ?? ''}
                          />
                        )}
                      </label>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                    <Button as="button" icon={null} type="submit">
                      <Save aria-hidden="true" size={18} />
                      ذخیره تغییرات
                    </Button>
                    <Button
                      as="button"
                      icon={null}
                      onClick={resetDraft}
                      type="button"
                      variant="secondary"
                    >
                      <RotateCcw aria-hidden="true" size={18} />
                      بازگشت به حالت اولیه
                    </Button>
                    {status ? <p className="text-sm text-cyan-200">{status}</p> : null}
                  </div>
                </form>
              )}
            </Card>
          </div>
        </div>
      ) : null}
    </>
  )
}

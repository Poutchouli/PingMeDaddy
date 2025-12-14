import { useTranslation } from '../../i18n/LanguageProvider'

const LOG_VISIBLE_ROWS = 8
const LOG_ROW_HEIGHT_PX = 40
const LOGS_MAX_HEIGHT = `${LOG_VISIBLE_ROWS * LOG_ROW_HEIGHT_PX}px`

function LogsTable({ logs }) {
  const { t } = useTranslation()
  if (!logs.length) {
    return (
      <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
        {t('logs.empty')}
      </div>
    )
  }

  return (
    <div className="overflow-y-auto flex-1" style={{ maxHeight: LOGS_MAX_HEIGHT }}>
      <table className="w-full text-left text-xs">
        <thead className="bg-white sticky top-0 z-10 text-slate-500 font-semibold border-b border-slate-100">
          <tr>
            <th className="px-4 py-2">{t('logs.headers.time')}</th>
            <th className="px-4 py-2">{t('logs.headers.latency')}</th>
            <th className="px-4 py-2 text-right">{t('logs.headers.status')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {logs.map((log) => {
            const time = new Date(log.time).toLocaleTimeString()
            if (log.packet_loss) {
              return (
                <tr key={log.time} className="bg-red-50/60">
                  <td className="px-4 py-2 font-mono text-red-400 text-xs">{time}</td>
                  <td className="px-4 py-2 text-red-400 italic text-xs">{t('logs.timeout')}</td>
                  <td className="px-4 py-2 text-right">
                    <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                  </td>
                </tr>
              )
            }
            return (
              <tr key={log.time} className="hover:bg-slate-50">
                <td className="px-4 py-2 font-mono text-slate-500 text-xs">{time}</td>
                <td className="px-4 py-2 font-medium text-slate-700">
                  {typeof log.latency_ms === 'number' ? `${log.latency_ms.toFixed(1)} ms` : '--'}
                </td>
                <td className="px-4 py-2 text-right">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default LogsTable

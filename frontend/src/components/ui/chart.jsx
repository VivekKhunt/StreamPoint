import * as React from 'react'
import * as RechartsPrimitive from 'recharts'
import { cn } from '../../lib/utils'

const THEMES = { light: '', dark: '.dark' }
const ChartContext = React.createContext(null)

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error('useChart must be used within a <ChartContainer />')
  }
  return context
}

function ChartContainer({ id, className, children, config, ...props }) {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "[&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 flex aspect-video justify-center text-xs",
          className,
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(([, c]) => c.theme || c.color)
  if (!colorConfig.length) return null

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(([theme, prefix]) => `
            ${prefix} [data-chart=${id}] {
              ${colorConfig.map(([key, item]) => {
                const color = item.theme?.[theme] || item.color
                return color ? `--color-${key}: ${color};` : null
              }).join('\n')}
            }
          `).join('\n'),
      }}
    />
  )
}

const ChartTooltip = RechartsPrimitive.Tooltip

function ChartTooltipContent({ active, payload, className, indicator = 'dot', hideLabel = false, label, labelFormatter, config: customConfig }) {
  const { config } = useChart()
  const actualConfig = customConfig || config

  if (!active || !payload?.length) return null

  return (
    <div className={cn('border-border/50 bg-background rounded-lg border px-2.5 py-1.5 text-xs shadow-xl', className)}>
      {payload.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
           <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
           <span>{item.name}: {item.value}</span>
        </div>
      ))}
    </div>
  )
}

export { ChartContainer, ChartTooltip, ChartTooltipContent, ChartStyle }
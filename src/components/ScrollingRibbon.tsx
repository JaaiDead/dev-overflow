interface RibbonItem {
  icon: string
  text: string
}

interface ScrollingRibbonProps {
  items: RibbonItem[]
  speed?: number // seconds for one full scroll
}

export default function ScrollingRibbon({ items, speed = 30 }: ScrollingRibbonProps) {
  if (items.length === 0) return null

  // Duplicate items to create seamless loop
  const duplicatedItems = [...items, ...items, ...items]

  return (
    <div className="w-full overflow-hidden py-6 glass-clay border-y border-accent/20 dark:border-accent/10">
      <div 
        className="flex gap-12 animate-scroll-right whitespace-nowrap"
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 shrink-0"
          >
            <span className="text-3xl">{item.icon}</span>
            <span className="font-mono text-base text-text-primary dark:text-dark-text-primary font-medium">
              {item.text}
            </span>
            {index < duplicatedItems.length - 1 && (
              <span className="text-accent text-2xl mx-6">•</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

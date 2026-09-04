import { Info, AlertTriangle, Lightbulb, AlertCircle } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'danger';
  title?: string;
  children: React.ReactNode;
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
  danger: AlertCircle,
};

const styles = {
  info: {
    container: 'bg-blue-50/50 border-blue-500 dark:bg-blue-950/20',
    icon: 'text-blue-500',
    title: 'text-blue-700 dark:text-blue-400',
  },
  warning: {
    container: 'bg-amber-50/50 border-amber-500 dark:bg-amber-950/20',
    icon: 'text-amber-500',
    title: 'text-amber-700 dark:text-amber-400',
  },
  tip: {
    container: 'bg-green-50/50 border-green-500 dark:bg-green-950/20',
    icon: 'text-green-500',
    title: 'text-green-700 dark:text-green-400',
  },
  danger: {
    container: 'bg-red-50/50 border-red-500 dark:bg-red-950/20',
    icon: 'text-red-500',
    title: 'text-red-700 dark:text-red-400',
  },
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const Icon = icons[type];
  const style = styles[type];

  return (
    <div className={`callout ${style.container} my-6 min-w-0 rounded-xl border-l-4 p-4 sm:p-5`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${style.icon}`} />
        <div className="min-w-0 flex-1">
          {title && (
            <p className={`font-semibold text-sm mb-1 ${style.title}`}>
              {title}
            </p>
          )}
          <div className="text-sm text-foreground/90 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

// Hint component (alias for tip)
export function Hint({ children }: { children: React.ReactNode }) {
  return (
    <Callout type="tip" title="Hint">
      {children}
    </Callout>
  );
}

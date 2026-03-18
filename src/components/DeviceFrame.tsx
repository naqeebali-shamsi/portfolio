import clsx from 'clsx';

interface DeviceFrameProps {
  children: React.ReactNode;
  className?: string;
}

export function DeviceFrame({ children, className }: DeviceFrameProps) {
  return (
    <div className={clsx('relative mx-auto', className)} style={{ maxWidth: 280 }}>
      {/* Phone bezel */}
      <div className="rounded-[2.5rem] border-[8px] border-bg-dark bg-bg-dark p-1 shadow-xl">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-bg-dark rounded-b-2xl z-10" />
        {/* Screen area */}
        <div className="rounded-[2rem] overflow-hidden bg-white aspect-[9/19.5]">
          {children}
        </div>
      </div>
    </div>
  );
}

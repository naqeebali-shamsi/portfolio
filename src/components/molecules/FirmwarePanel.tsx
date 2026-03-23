import './FirmwarePanel.css';

interface FirmwarePanelProps {
  version?: string;
  statements: readonly string[] | string[];
  className?: string;
}

export default function FirmwarePanel({
  version = '1.0',
  statements,
  className = '',
}: FirmwarePanelProps) {
  return (
    <div className={`firmware-panel ${className}`}>
      <div className="firmware-panel__header">
        <span className="firmware-panel__title">FIRMWARE v{version}</span>
        <span className="firmware-panel__badge">[READONLY]</span>
      </div>

      <div className="firmware-panel__divider" />

      <div className="firmware-panel__body">
        {statements.map((statement, index) => (
          <div key={index} className="firmware-panel__entry">
            <span className="firmware-panel__number">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="firmware-panel__text">{statement}</span>
          </div>
        ))}
      </div>

      <div className="firmware-panel__divider" />

      <div className="firmware-panel__footer">
        <span className="firmware-panel__checksum">[CHECKSUM VALID]</span>
        <span className="firmware-panel__status">
          <span className="firmware-panel__status-dot" />
          RUNNING
        </span>
      </div>
    </div>
  );
}

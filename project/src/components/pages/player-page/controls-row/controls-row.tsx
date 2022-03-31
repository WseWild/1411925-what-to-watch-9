import { memo } from 'react';
import { Time } from '../../../../const';
import { formatRemainingTime } from '../../../../utils';
import type { ProgressBarProps } from './type';

const getTImePercent = ({duration, currentTime}: ProgressBarProps): number =>
  duration ? (100 / duration * currentTime) : Time.Zero;

function ControlsRow({duration, currentTime}: ProgressBarProps): JSX.Element {
  return (
    <div className="player__controls-row">
      <div className="player__time">
        <progress
          className="player__progress"
          value={currentTime}
          max={duration}
        />
        <div className="player__toggler" style={{left: `${getTImePercent({duration, currentTime})}%`}}>Toggler</div>
      </div>
      <div className="player__time-value">
        {formatRemainingTime(duration - currentTime)}
      </div>
    </div>
  );
}

export default memo(ControlsRow);

import React from 'react';
import { getWeaponImg } from '../lib/assets';

export default function MemoryTile({ item, onSelect, isUnlocked = true }) {
    const info = item.data;

    const handleClick = () => {
        onSelect(item, isUnlocked);
    };

    return (
        <div className="tile-card" onClick={handleClick}>
            <div className="tile-visual">
                {isUnlocked ? (
                    <img
                        src={getWeaponImg(info.id)}
                        alt={info.name}
                        className="tile-image"
                        loading="lazy"
                    />
                ) : (
                    <span className="tile-placeholder">{info.id}</span>
                )}
            </div>

            <div className="tile-label">
                {isUnlocked ? info.name : 'Unknown'}
            </div>
        </div>
    );
}

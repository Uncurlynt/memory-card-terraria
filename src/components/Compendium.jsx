import { useState, useMemo } from 'react';
import { weaponData } from '../data/weapons';
import { VIEW_MODES } from '../config/settings';
import MemoryTile from './MemoryTile';

const PAGE_SIZE = 30;
const STORAGE_KEY = 'collectedCards';

export default function Compendium({ onNavigate }) {
    // Загружаем сохранённые карты из localStorage
    const savedIds = useMemo(() => {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }, []);

    const [page, setPage] = useState(1);
    const [selectedItem, setSelectedItem] = useState(null);

    const totalPages = Math.ceil(weaponData.length / PAGE_SIZE);

    // Определяем плитку для текущей страницы
    const visibleItems = useMemo(() => {
        const start = (page - 1) * PAGE_SIZE;
        return weaponData.slice(start, start + PAGE_SIZE);
    }, [page]);


    const changePage = (delta) => {
        setPage(prev => {
            let next = prev + delta;
            if (next > totalPages) next = 1;
            if (next < 1) next = totalPages;
            return next;
        });
    };

    const openDetails = (item, isUnlocked) => {
        if(isUnlocked) setSelectedItem(item);
    };

    return (
        <div className="compendium-view">
            <div className="top-bar">
                <button onClick={() => onNavigate(VIEW_MODES.HOME)}>Return</button>
                <span>Progress: {savedIds.length} / {weaponData.length}</span>
            </div>

            <div className="grid-area">
                {visibleItems.map(w => (
                    <MemoryTile
                        key={w.data.id}
                        item={w}
                        onSelect={openDetails}
                        isUnlocked={savedIds.includes(w.data.id)}
                    />
                ))}
            </div>

            <div className="pagination-bar">
                <button onClick={() => changePage(-1)}>Prev</button>
                <span>{page} / {totalPages}</span>
                <button onClick={() => changePage(1)}>Next</button>
            </div>

            {selectedItem && (
                <div className="modal-overlay" onClick={() => setSelectedItem(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{selectedItem.data.name}</h3>
                            <button onClick={() => setSelectedItem(null)}>X</button>
                        </div>
                        <div className="modal-body">
                            <MemoryTile item={selectedItem} onSelect={() => {}} />
                            <div className="stats-block">
                                <div>DMG: {selectedItem.data.damage} ({selectedItem.data.damageType})</div>
                                <div>Knockback: {selectedItem.data.knockback}</div>
                                {selectedItem.data.tooltip && (
                                    <div className="tooltip-text">
                                        {selectedItem.data.tooltip.join(' ')}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
import React from 'react';
import { positionsData } from '../data/positions';

export function PositionsOfResponsibility() {
  return (
    <section className="positions-section section-padding" id="positions">
      <div className="container">
        
        <div className="section-eyebrow">/* positions.log */</div>
        <h2 className="section-title">Positions of Responsibility</h2>
        <p className="section-subtitle">Leadership roles held across placement cells, ambassador clubs, and departmental organizations.</p>

        <div className="positions-grid">
          {positionsData.map((item, index) => (
            <div
              key={item.id}
              className={`position-card scroll-reveal ${index % 3 === 1 ? 'delay-1' : index % 3 === 2 ? 'delay-2' : ''}`}
            >
              <span className="pos-icon">{item.icon}</span>
              <div className="pos-details">
                <h3 className="pos-title">{item.title}</h3>
                <span className="pos-org">{item.organization}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

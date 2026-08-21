import React, { useState, useEffect } from 'react';
import { fetchAchievements } from '../services/api';
import { achievementsData as fallbackAchievements } from '../data/achievements';

export function Achievements() {
  const [achievements, setAchievements] = useState(fallbackAchievements);

  useEffect(() => {
    let isMounted = true;

    async function loadAchievements() {
      try {
        const data = await fetchAchievements();
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setAchievements(data);
        }
      } catch (err) {
        console.warn('Using fallback achievements data:', err);
      }
    }

    loadAchievements();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="achievements-section section-padding" id="achievements">
      <div className="container">
        
        <div className="section-eyebrow">/* wins.txt (Served via Express API) */</div>
        <h2 className="section-title">Achievements &amp; Honors</h2>
        <p className="section-subtitle">Recognition for hackathon wins, project innovation, and competitive technical showcases.</p>

        <div className="achievements-grid">
          {achievements.map((item, index) => (
            <div
              key={item._id || item.id || index}
              className={`achievement-card ${item.cardClass || 'gold-badge'} scroll-reveal ${index % 3 === 1 ? 'delay-1' : index % 3 === 2 ? 'delay-2' : ''}`}
            >
              <div className={`badge-ribbon ${item.ribbonClass || 'gold'}`}>{item.ribbon || '🥇 1st Prize'}</div>
              <div className="achievement-icon">{item.icon || '🏆'}</div>
              <h3 className="achievement-title">{item.title}</h3>
              <div className="achievement-event">{item.event || item.organization}</div>
              <p className="achievement-desc">{item.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

'use client';

import { useState, useEffect } from 'react';

type FormState = 'idle' | 'loading' | 'success' | 'error';

async function submitWaitlist(email: string) {
  const res = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return { ok: res.ok, status: res.status };
}

function HomePhone() {
  return (
    <div className="phone">
      <div className="notch"></div>
      <div className="home-top">
        <span className="home-greeting">Good morning</span>
        <span className="streak-pill">🔥 7 day streak</span>
      </div>
      <div className="home-heading">Today&apos;s challenges</div>
      <div className="home-sub">Pick one and hit record</div>
      <div className="challenge-card">
        <div className="card-type">Free speak</div>
        <div className="card-title">Party starter</div>
        <div className="card-desc">You are at a party and don&apos;t know anyone. Speak freely.</div>
      </div>
      <div className="challenge-card">
        <div className="card-type">Specific task</div>
        <div className="card-title">New coworker</div>
        <div className="card-desc">Introduce yourself and make them feel welcome.</div>
      </div>
      <div className="challenge-card">
        <div className="card-type">Direct question</div>
        <div className="card-title">What do you do?</div>
        <div className="card-desc">Someone at a networking event asks. Make it interesting.</div>
      </div>
      <button className="primary-btn">Start a challenge</button>
    </div>
  );
}

function RecordingPhone() {
  return (
    <div className="phone">
      <div className="notch"></div>
      <div className="rec-top">
        <span className="back-btn">&#8592;</span>
        <span className="rec-screen-title">Your challenge</span>
      </div>
      <div className="challenge-box">
        <div className="challenge-box-type">Direct question</div>
        <div className="challenge-box-title">What do you do?</div>
        <div className="challenge-box-text">Someone at a networking event asks what you do. Make it sound interesting.</div>
      </div>
      <div className="rec-center">
        <div className="timer">0:42</div>
        <div className="timer-label">seconds remaining</div>
        <div className="mic-btn">
          <svg className="mic-icon" viewBox="0 0 24 24">
            <path d="M12 1a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V5a4 4 0 0 1 4-4zm-1 17.93V21h-2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2h-2v-2.07A8 8 0 0 0 20 11a1 1 0 0 0-2 0 6 6 0 0 1-12 0 1 1 0 0 0-2 0 8 8 0 0 0 7 7.93z" />
          </svg>
        </div>
        <div className="waveform">
          {[5, 11, 15, 9, 14, 7, 12, 16, 8].map((h, i) => (
            <div key={i} className="wave-bar" style={{ height: `${h}px` }} />
          ))}
        </div>
        <div className="rec-hint">Tap mic to stop early</div>
      </div>
    </div>
  );
}

function FeedbackPhone() {
  return (
    <div className="phone">
      <div className="notch"></div>
      <div className="fb-top">
        <span className="fb-title">Your feedback</span>
        <span className="replay-btn">Replay</span>
      </div>
      <div className="score-section">
        <div>
          <span className="score-num">73</span>
          <span className="score-max">/100</span>
        </div>
        <span className="score-level-pill">Steady</span>
      </div>
      <div className="score-bar-wrap">
        <div className="score-bar"></div>
      </div>
      <div className="section-title-sm">Breakdown</div>
      <div className="breakdown-wrap">
        <div className="breakdown-row">
          <span className="breakdown-label">Filler words</span>
          <span className="breakdown-val">6 detected</span>
        </div>
        <div className="breakdown-row">
          <span className="breakdown-label">Pace</span>
          <span className="breakdown-val">Too fast</span>
        </div>
        <div className="breakdown-row">
          <span className="breakdown-label">Clarity</span>
          <span className="breakdown-val">Good</span>
        </div>
      </div>
      <div className="two-col">
        <div className="col-box green">
          <div className="col-title green">Went well</div>
          <div className="col-item">
            <div className="col-dot green"></div>
            <div className="col-text">Kept a strong structure</div>
          </div>
          <div className="col-item">
            <div className="col-dot green"></div>
            <div className="col-text">Answered directly</div>
          </div>
        </div>
        <div className="col-box red">
          <div className="col-title red">Needs work</div>
          <div className="col-item">
            <div className="col-dot red"></div>
            <div className="col-text">Said &quot;um&quot; 6 times</div>
          </div>
          <div className="col-item">
            <div className="col-dot red"></div>
            <div className="col-text">Pace too fast</div>
          </div>
        </div>
      </div>
      <div className="focus-box">
        <div className="focus-label">Focus tomorrow</div>
        <div className="focus-text">Replace filler words with a pause. It fixes your pace and helps maintain a steady flow.</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [heroEmail, setHeroEmail] = useState('');
  const [heroState, setHeroState] = useState<FormState>('idle');

  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistState, setWaitlistState] = useState<FormState>('idle');

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  function scrollToWaitlist() {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
  }

  async function handleHeroSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!heroEmail) {
      scrollToWaitlist();
      return;
    }
    setHeroState('loading');
    const result = await submitWaitlist(heroEmail);
    if (result.ok) setHeroState('success');
    else setHeroState('error');
  }

  async function handleWaitlistSubmit(e: React.FormEvent) {
    e.preventDefault();
    setWaitlistState('loading');
    const result = await submitWaitlist(waitlistEmail);
    if (result.ok) setWaitlistState('success');
    else setWaitlistState('error');
  }

  const heroSuccess = heroState === 'success';
  const waitlistSuccess = waitlistState === 'success';

  return (
    <>
      {/* NAV */}
      <nav>
        <a className="nav-logo" href="#">
          Small <span>Tok</span>
        </a>
        <button className="nav-cta" onClick={scrollToWaitlist}>
          Join the waitlist
        </button>
      </nav>

      {/* HERO */}
      <div className="hero">
        <div className="hero-left">
          <div className="hero-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            Coming soon to the App Store
          </div>
          <h1 className="hero-h1">
            Speak with <em>confidence</em> and clarity.
          </h1>
          <p className="hero-sub">
            Small Tok gives you a 60-second speaking challenge every day and feedback that
            actually helps.
          </p>
          <form className="hero-form" onSubmit={handleHeroSubmit}>
            <div className="hero-form-fields">
              <input
                className="hero-input"
                type="email"
                placeholder="Your email address"
                value={heroEmail}
                onChange={(e) => setHeroEmail(e.target.value)}
                required
              />
            </div>
            <button
              className="hero-btn"
              type="submit"
              disabled={heroState === 'loading' || heroSuccess}
              style={heroSuccess ? { background: '#22c55e' } : {}}
            >
              {heroSuccess
                ? "You're on the list!"
                : heroState === 'loading'
                ? 'Joining...'
                : 'Join the waitlist'}
            </button>
            {heroState === 'error' && (
              <p style={{ color: '#ef4444', fontSize: '13px' }}>
                Something went wrong. Please try again.
              </p>
            )}
          </form>
          <p className="hero-note">No spam. We&apos;ll only email you when we launch.</p>
        </div>

        <div className="hero-right">
          <div className="phone-stack">
            <div className="phone-wrap">
              <HomePhone />
            </div>
            <div className="phone-wrap">
              <RecordingPhone />
            </div>
            <div className="phone-wrap">
              <FeedbackPhone />
            </div>
          </div>
        </div>
      </div>

      {/* PROBLEM */}
      <section className="problem-section">
        <div className="section-inner">
          <div className="problem-label reveal">The problem</div>
          <h2 className="problem-heading reveal">You know the feeling.</h2>
          <div className="problem-lines">
            <div className="problem-line reveal">
              You meet someone new and your mind goes blank.
            </div>
            <div className="problem-line reveal">
              You think of the perfect thing to say 10 minutes later.
            </div>
            <div className="problem-line reveal">
              You come across totally different to how you feel inside.
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="section-inner wide">
          <div className="how-row reveal">
            <div className="how-text">
              <div className="how-label">How it works</div>
              <h2 className="how-heading">Three steps. Sixty seconds.</h2>
              <div className="step-num">Step 01</div>
              <div className="step-title">Pick your challenge</div>
              <div className="step-desc">
                Three challenges every day. Free speak, a specific task, or a direct question. You
                choose the one that pushes you.
              </div>
            </div>
            <div className="how-phone-wrap">
              <HomePhone />
            </div>
          </div>

          <div className="how-row how-row-reverse reveal">
            <div className="how-text">
              <div className="step-num">Step 02</div>
              <div className="step-title">Record 60 seconds</div>
              <div className="step-desc">
                Hit record, speak, stop. No retakes, no editing. Just you talking like you would in
                real life.
              </div>
            </div>
            <div className="how-phone-wrap">
              <RecordingPhone />
            </div>
          </div>

          <div className="how-row how-row-last reveal">
            <div className="how-text">
              <div className="step-num">Step 03</div>
              <div className="step-title">Get feedback</div>
              <div className="step-desc">
                Your score, a full breakdown, what went well, what needs work, and one thing to
                focus on tomorrow.
              </div>
            </div>
            <div className="how-phone-wrap">
              <FeedbackPhone />
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHT */}
      <section className="insight-section">
        <div className="insight-inner">
          <h2 className="insight-quote reveal">
            Talking is a skill. <em>Not a personality trait.</em>
          </h2>
          <div className="insight-divider reveal"></div>
          <p className="insight-body reveal">
            Confidence in conversation is trainable, just like a language or an instrument. This
            isn&apos;t about who you are. It&apos;s about what you practice.
          </p>
        </div>
      </section>

      {/* WAITLIST */}
      <section className="waitlist-section" id="waitlist">
        <div className="waitlist-inner">
          <h2 className="waitlist-heading reveal">Get early access.</h2>
          <p className="waitlist-sub reveal">
            Be the first to know when we launch. We&apos;re building Small Tok for people who are
            done overthinking conversations.
          </p>
          <form className="waitlist-form reveal" onSubmit={handleWaitlistSubmit}>
            <input
              className="form-input"
              type="email"
              placeholder="Your email address"
              value={waitlistEmail}
              onChange={(e) => setWaitlistEmail(e.target.value)}
              required
            />
            <button
              className="form-btn"
              type="submit"
              disabled={waitlistState === 'loading' || waitlistSuccess}
              style={waitlistSuccess ? { background: '#22c55e' } : {}}
            >
              {waitlistSuccess
                ? "You're on the list!"
                : waitlistState === 'loading'
                ? 'Joining...'
                : 'Join the waitlist'}
            </button>
            {waitlistState === 'error' && (
              <p style={{ color: '#ef4444', fontSize: '13px', textAlign: 'center' }}>
                Something went wrong. Please try again.
              </p>
            )}
            <p className="form-note">No spam. We&apos;ll only email you when we launch.</p>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-logo">
          Small <span>Tok</span>
        </div>
        <div className="footer-note">© Newbury AI LLC</div>
      </footer>
    </>
  );
}

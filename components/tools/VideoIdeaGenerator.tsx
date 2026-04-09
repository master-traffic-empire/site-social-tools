'use client';

import { useState } from 'react';
import { Video, RefreshCw, Copy, Check, Bookmark } from 'lucide-react';

interface IdeaData {
  title: string;
  hook: string;
  format: string;
  tips: string;
}

const ideaDB: Record<string, IdeaData[]> = {
  fitness: [
    { title: 'What I Eat in a Day (Honest Version)', hook: 'Everyone shows their perfect meals. Here\'s what I ACTUALLY eat...', format: 'Day-in-my-life vlog', tips: 'Film everything as you go, don\'t stage meals. Raw honesty gets engagement.' },
    { title: '3 Exercises You\'re Doing Wrong', hook: 'Stop doing [exercise] like this. Here\'s why you\'re not seeing results...', format: 'Tutorial / correction', tips: 'Show the wrong way first, then the correct form. Side-by-side works great.' },
    { title: 'I Tried [Celebrity]\'s Workout for 7 Days', hook: 'Day 1: This is going to be easy. Day 7: I can\'t move.', format: 'Challenge / transformation', tips: 'Document daily progress. End with honest review and results.' },
    { title: '5 Home Exercises That Replace the Gym', hook: 'Gym membership? Save your money. You only need a floor.', format: 'Listicle / tutorial', tips: 'Quick transitions between exercises. Keep each demo under 10 seconds.' },
    { title: 'Gym Fails to Watch Out For', hook: 'POV: You\'re a personal trainer watching people at the gym', format: 'POV / comedy', tips: 'Keep it educational, not mean-spirited. Show corrections too.' },
  ],
  food: [
    { title: '$5 vs $50 Version of [Dish]', hook: 'Can a $5 budget beat a $50 meal? Let\'s find out...', format: 'Comparison / challenge', tips: 'Show both cooking processes. Blind taste test at the end.' },
    { title: '3-Ingredient Recipes That Slap', hook: 'Gourmet taste. Three ingredients. No excuses.', format: 'Recipe tutorial', tips: 'Overhead shots, fast cuts, satisfying plating at the end.' },
    { title: 'Foods from [Country] You Need to Try', hook: 'Everyone knows [common dish]. But have you tried THIS?', format: 'Educational / review', tips: 'Show authentic preparations. Include where to find ingredients.' },
    { title: 'I Made [Viral Recipe] and Here\'s What Happened', hook: 'This recipe has 50M views. Is it actually good?', format: 'Review / recreation', tips: 'Follow the original recipe exactly, then give honest review.' },
    { title: 'What $10 Gets You for Lunch Around the World', hook: 'In NYC: a sad sandwich. In Bangkok: a FEAST.', format: 'Comparison / educational', tips: 'Use real prices. Stock footage or personal travel clips work.' },
  ],
  beauty: [
    { title: 'Get Ready With Me (No Filter)', hook: 'Real skin. Real routine. Zero filters.', format: 'GRWM', tips: 'Good lighting is key. Talk through each product and why you use it.' },
    { title: 'Drugstore vs High-End: Can You Tell?', hook: 'One side: $8 foundation. Other side: $60. Which is which?', format: 'Comparison', tips: 'Apply each on half the face. Get someone else to guess.' },
    { title: 'Skincare Ingredients You Should NEVER Mix', hook: 'If you\'re using retinol and [ingredient] together... stop.', format: 'Educational', tips: 'Quick graphics showing the combos. Back up with brief explanations.' },
    { title: '5-Minute Makeup for [Occasion]', hook: 'Running late? This 5-minute face will save you.', format: 'Speed tutorial', tips: 'Actually time yourself. Real-time with a visible timer.' },
    { title: 'Products I Regret Buying', hook: 'I spent $200 on these. Here\'s my honest review.', format: 'Review / rant', tips: 'Show the products, demonstrate the issues. Be specific about why.' },
  ],
  tech: [
    { title: 'Settings You Need to Change RIGHT NOW', hook: 'Your [device] has this setting turned on and it\'s [consequence].', format: 'Tutorial / tips', tips: 'Screen record the steps. Clear, concise narration.' },
    { title: 'I Built [Project] in 24 Hours', hook: 'Can I build a full [project] in just one day? Challenge accepted.', format: 'Build challenge', tips: 'Time-lapse coding, show milestones, dramatic reveal at end.' },
    { title: 'Tech Everyone Needs Under $30', hook: 'Number 3 literally changed my daily routine.', format: 'Product roundup', tips: 'Quick demos of each product in use. Link everything.' },
    { title: 'AI Tools That Feel Illegal to Know', hook: 'These free AI tools will save you hours every week.', format: 'Listicle', tips: 'Screen record each tool. Show a real use case, not just the homepage.' },
    { title: 'What Tech Companies Don\'t Want You to Know', hook: 'That "delete" button? Yeah, it doesn\'t actually delete anything.', format: 'Educational / exposé', tips: 'Back up claims with sources. Keep it factual, not conspiracy.' },
  ],
  business: [
    { title: 'How I Made $X This Month (Full Breakdown)', hook: 'Total transparency. Here\'s every dollar in and out.', format: 'Income report', tips: 'Show real numbers. Break down by revenue stream.' },
    { title: 'Day in My Life as a [Role]', hook: '5AM alarm. Here\'s what building a business actually looks like.', format: 'Day-in-my-life', tips: 'Show the unglamorous parts too. Authenticity wins.' },
    { title: 'Business Ideas That Cost $0 to Start', hook: 'No capital? No problem. These businesses need zero investment.', format: 'Listicle', tips: 'Give specific, actionable ideas with brief execution plans.' },
    { title: 'Mistakes I Made in My First Year', hook: 'Mistake #3 cost me $10,000. Don\'t make the same ones.', format: 'Storytime / advice', tips: 'Be vulnerable. Share specific numbers and lessons learned.' },
    { title: 'The Side Hustle That Replaced My Salary', hook: 'Month 1: $200. Month 12: More than my 9-5.', format: 'Journey / transformation', tips: 'Show the progression with real timestamps and milestones.' },
  ],
  lifestyle: [
    { title: 'Things That Changed My Life This Year', hook: 'One of these cost $3. And it changed EVERYTHING.', format: 'Listicle', tips: 'Mix products, habits, and mindset shifts. Not just Amazon finds.' },
    { title: 'My Morning Routine (Realistic Edition)', hook: 'No, I don\'t wake up at 4AM and meditate for an hour.', format: 'Routine / GRWM', tips: 'Keep it real. Include the messy, imperfect parts.' },
    { title: 'How I Organize My Entire Life', hook: 'From chaos to calm. Here\'s my system for everything.', format: 'Tutorial / organization', tips: 'Show before/after. Walk through your actual system.' },
    { title: 'Unpopular Opinions That Are Actually True', hook: 'I\'m about to make some enemies with this one...', format: 'Hot takes / discussion', tips: 'Be bold but not offensive. Encourage debate in comments.' },
    { title: 'What I Stopped Buying (and Don\'t Miss)', hook: 'I cut these from my life 6 months ago. Zero regrets.', format: 'Minimalism / review', tips: 'Explain what you replaced them with (if anything).' },
  ],
};

const defaultIdeas: IdeaData[] = [
  { title: 'Day in My Life as a [Your Niche]', hook: 'People always ask what I actually do all day. Let me show you.', format: 'Day-in-my-life vlog', tips: 'Start with something unexpected or funny to grab attention in the first second.' },
  { title: 'Things I Wish I Knew Before Starting [Topic]', hook: 'If I could go back and tell myself one thing...', format: 'Storytime / advice', tips: 'Number your points. Keep each one under 15 seconds.' },
  { title: 'Beginner vs Pro at [Your Skill]', hook: 'This is what [skill] looks like at year 1 vs year 5.', format: 'Comparison / progression', tips: 'Side-by-side or before/after format. Show real improvement.' },
  { title: 'Responding to My Most Hated Comment', hook: 'Someone said [controversial comment]. Let me address this.', format: 'Response / storytime', tips: 'Stay calm and professional. Use humor if appropriate.' },
  { title: 'POV: You Just Discovered [Your Niche]', hook: 'Welcome to the rabbit hole. There\'s no going back.', format: 'POV / comedy', tips: 'Use trending sounds. Act out the scenario convincingly.' },
];

const allNiches = [...Object.keys(ideaDB), 'gaming', 'fashion', 'travel', 'music', 'pets', 'education'];

const s = {
  container: { maxWidth: 700, margin: '0 auto' },
  inputWrap: { position: 'relative' as const, marginBottom: 16 },
  input: {
    width: '100%', padding: '14px 16px 14px 48px', background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', color: 'var(--text-primary)', fontSize: 15, outline: 'none',
  },
  icon: { position: 'absolute' as const, left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' },
  niches: { display: 'flex', flexWrap: 'wrap' as const, gap: 8, marginBottom: 24 },
  nicheBtn: {
    padding: '6px 14px', borderRadius: 16, border: '1px solid var(--border)', background: 'transparent',
    color: 'var(--text-secondary)', fontSize: 13, cursor: 'pointer',
  },
  btn: {
    display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 'var(--radius-sm)',
    border: 'none', background: '#00f2ea', color: '#000', fontWeight: 600, fontSize: 15, cursor: 'pointer', marginBottom: 32,
  },
  card: {
    padding: 24, background: 'var(--bg-secondary)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius)', marginBottom: 16,
  },
  cardTitle: { fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 },
  field: { marginBottom: 12 },
  fieldLabel: { fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' as const, letterSpacing: 0.5, marginBottom: 4 },
  fieldValue: { fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.6 },
  actions: { display: 'flex', gap: 8, marginTop: 12 },
  actionBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 'var(--radius-sm)',
    border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-secondary)', fontSize: 12, cursor: 'pointer',
  },
};

export default function VideoIdeaGenerator() {
  const [niche, setNiche] = useState('');
  const [ideas, setIdeas] = useState<IdeaData[]>([]);
  const [copied, setCopied] = useState(-1);

  const generate = () => {
    const q = niche.toLowerCase().trim();
    let pool: IdeaData[] = [];

    for (const [key, ideas] of Object.entries(ideaDB)) {
      if (key.includes(q) || q.includes(key)) {
        pool = [...ideas];
        break;
      }
    }

    if (pool.length === 0) pool = [...defaultIdeas];
    const shuffled = pool.sort(() => Math.random() - 0.5);
    setIdeas(shuffled.slice(0, 4));
  };

  const copyIdea = (idea: IdeaData, idx: number) => {
    navigator.clipboard.writeText(`Title: ${idea.title}\nHook: ${idea.hook}\nFormat: ${idea.format}\nTips: ${idea.tips}`);
    setCopied(idx);
    setTimeout(() => setCopied(-1), 2000);
  };

  return (
    <div style={s.container}>
      <div style={s.inputWrap}>
        <Video size={18} style={s.icon} />
        <input
          style={s.input}
          placeholder="Enter your niche (e.g., fitness, food, tech)..."
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && generate()}
        />
      </div>

      <div style={s.niches}>
        {allNiches.map((n) => (
          <button key={n} style={s.nicheBtn} onClick={() => { setNiche(n); }}>
            {n}
          </button>
        ))}
      </div>

      <button style={{ ...s.btn, opacity: niche.trim() ? 1 : 0.5 }} onClick={generate} disabled={!niche.trim()}>
        <RefreshCw size={18} />
        Generate Ideas
      </button>

      {ideas.map((idea, i) => (
        <div key={i} style={s.card}>
          <div style={s.cardTitle}>{idea.title}</div>
          <div style={s.field}>
            <div style={s.fieldLabel}>Opening Hook</div>
            <div style={s.fieldValue}>&ldquo;{idea.hook}&rdquo;</div>
          </div>
          <div style={s.field}>
            <div style={s.fieldLabel}>Format</div>
            <div style={s.fieldValue}>{idea.format}</div>
          </div>
          <div style={s.field}>
            <div style={s.fieldLabel}>Pro Tips</div>
            <div style={s.fieldValue}>{idea.tips}</div>
          </div>
          <div style={s.actions}>
            <button style={s.actionBtn} onClick={() => copyIdea(idea, i)}>
              {copied === i ? <Check size={14} /> : <Copy size={14} />}
              {copied === i ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

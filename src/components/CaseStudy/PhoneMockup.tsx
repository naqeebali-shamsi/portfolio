import {
  Home,
  MessageCircle,
  Receipt,
  User,
  Plus,
  ChevronLeft,
  Hotel,
  UtensilsCrossed,
  Ticket,
  Wifi,
  Battery,
  Signal,
} from 'lucide-react';
import './PhoneMockup.css';

/* ---- Status bar icons (tiny) ---- */

function StatusBar() {
  return (
    <div className="phone-frame__status">
      <span>9:41</span>
      <div className="phone-frame__status-right">
        <Signal size={9} strokeWidth={2.5} />
        <Wifi size={9} strokeWidth={2.5} />
        <Battery size={11} strokeWidth={2.5} />
      </div>
    </div>
  );
}

/* ---- Bottom Navigation ---- */

function BottomNav({ active = 'home' }: { active?: string }) {
  const items = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'chat', icon: MessageCircle, label: 'Chat' },
    { id: 'expenses', icon: Receipt, label: 'Expenses' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="phone-nav">
      {items.map((item) => (
        <div
          key={item.id}
          className={`phone-nav__item${item.id === active ? ' phone-nav__item--active' : ''}`}
        >
          <item.icon size={14} strokeWidth={item.id === active ? 2.2 : 1.8} />
          <span>{item.label}</span>
        </div>
      ))}
    </nav>
  );
}

/* ---- Screen 1: Trip List ---- */

function TripListScreen() {
  const trips = [
    {
      name: 'London Adventure',
      dates: 'Mar 12 - 18',
      members: 4,
      status: 'active' as const,
      emoji: '🇬🇧',
      bg: 'rgba(112, 171, 175, 0.10)',
    },
    {
      name: 'NYC Weekend',
      dates: 'Apr 5 - 8',
      members: 2,
      status: 'planning' as const,
      emoji: '🗽',
      bg: 'rgba(50, 41, 47, 0.05)',
    },
    {
      name: 'Dubai Meetup',
      dates: 'May 20 - 25',
      members: 6,
      status: 'upcoming' as const,
      emoji: '🏜️',
      bg: 'rgba(50, 41, 47, 0.04)',
    },
  ];

  return (
    <div className="phone-screen">
      <div className="phone-header">
        <span className="phone-header__title">My Trips</span>
        <Plus size={16} strokeWidth={2} style={{ color: 'var(--primary)' }} />
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        {trips.map((trip) => (
          <div key={trip.name} className="trip-card">
            <div className="trip-card__icon" style={{ background: trip.bg }}>
              {trip.emoji}
            </div>
            <div className="trip-card__info">
              <div className="trip-card__name">{trip.name}</div>
              <div className="trip-card__meta">
                {trip.dates} &middot; {trip.members} members
              </div>
            </div>
            <span className={`trip-card__badge trip-card__badge--${trip.status}`}>
              {trip.status}
            </span>
          </div>
        ))}
      </div>

      <BottomNav active="home" />
    </div>
  );
}

/* ---- Screen 2: Expense Split ---- */

function ExpenseSplitScreen() {
  const expenses = [
    {
      name: 'Hotel - The Langham',
      amount: '$1,200',
      split: 'Split 4 ways',
      icon: Hotel,
    },
    {
      name: 'Dinner at Dishoom',
      amount: '$180',
      split: 'Split 4 ways',
      icon: UtensilsCrossed,
    },
    {
      name: 'Museum tickets',
      amount: '$60',
      split: 'Split 2 ways',
      icon: Ticket,
    },
  ];

  return (
    <div className="phone-screen">
      <div className="phone-header">
        <div className="phone-header__left">
          <ChevronLeft size={16} strokeWidth={2} style={{ color: 'var(--text-secondary)' }} />
          <span className="phone-header__title">London Adventure</span>
        </div>
      </div>

      <div className="expense-total">
        <div className="expense-total__label">Total Expenses</div>
        <div className="expense-total__amount">$2,450.00</div>
      </div>

      <div style={{ flex: 1, overflow: 'hidden' }}>
        {expenses.map((exp) => (
          <div key={exp.name} className="expense-item">
            <div className="expense-item__icon">
              <exp.icon size={14} strokeWidth={1.8} style={{ color: 'var(--primary)' }} />
            </div>
            <div className="expense-item__info">
              <div className="expense-item__name">{exp.name}</div>
              <div className="expense-item__detail">{exp.split}</div>
            </div>
            <span className="expense-item__amount">{exp.amount}</span>
          </div>
        ))}
      </div>

      <div className="phone-cta">You owe: $285.00</div>
      <BottomNav active="expenses" />
    </div>
  );
}

/* ---- Phone Frame wrapper ---- */

interface PhoneMockupProps {
  screen: 1 | 2;
  className?: string;
  rotation?: 'left' | 'right' | 'none';
}

export default function PhoneMockup({ screen, className = '', rotation = 'none' }: PhoneMockupProps) {
  const rotClass =
    rotation === 'left'
      ? 'phone-frame--left'
      : rotation === 'right'
        ? 'phone-frame--right'
        : '';

  return (
    <div className={`phone-frame ${rotClass} ${className}`}>
      <div className="phone-frame__bezel">
        <div className="phone-frame__screen">
          <div className="phone-frame__island" />
          <StatusBar />
          {screen === 1 ? <TripListScreen /> : <ExpenseSplitScreen />}
          <div className="phone-frame__home-indicator" />
        </div>
      </div>
    </div>
  );
}

interface TabSwitchItem {
  id: string;
  label: string;
}

interface TabSwitchProps {
  items: TabSwitchItem[];
  activeItem: string;
  onChange: (id: string) => void;
}

export const TabSwitch = ({ items, activeItem, onChange }: TabSwitchProps): JSX.Element => {
  return (
    <div className="rounded-full bg-accent-light/60 p-1">
      <div className="grid grid-cols-3 gap-1 sm:flex sm:gap-1">
        {items.map((item) => {
          const isActive = item.id === activeItem;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChange(item.id)}
                className={`flex-1 rounded-full px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
                  isActive
                  ? 'bg-white text-brand shadow'
                  : 'text-slate-600 hover:bg-white/80 hover:text-brand'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

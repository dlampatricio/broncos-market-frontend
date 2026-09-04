import { cn } from '@/lib/utils'

interface IconButtonProps {
  onClick: () => void;
  icon: React.ReactElement;
  className?: string;
  ariaLabel?: string;
}

const IconButton = ({ onClick, icon, className, ariaLabel }: IconButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center bg-white border shadow-md p-2.5 hover:scale-110 transition cursor-pointer",
        className
      )}
      aria-label={ariaLabel}
    >
      {icon}
    </button>
  );
};

export default IconButton;

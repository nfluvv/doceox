import { Loader2 } from 'lucide-react';

interface LoaderProps {
  className?: string;
  size?: number;
}

export const Loader = ({ className = '', size = 24 }: LoaderProps) => {
  return (
    <div className={`flex items-center justify-center w-full h-full ${className}`}>
      <Loader2 
        size={size} 
        className="animate-spin text-primary" 
      />
    </div>
  );
};

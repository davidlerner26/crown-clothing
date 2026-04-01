import { type ReactNode, useEffect, useRef } from 'react';

type ClickOutsideProps = {
  children: ReactNode;
  onClickOutside: () => void;
};

export const ClickOutside = ({
  children,
  onClickOutside,
}: ClickOutsideProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent | TouchEvent) {
      const target = event.target as Node;

      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        onClickOutside();
      }
    }

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [onClickOutside]);

  return <div ref={wrapperRef}>{children}</div>;
};

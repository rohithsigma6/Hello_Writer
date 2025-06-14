import React, { useEffect, useState } from 'react';

interface LoaderProps {
  isLoading: boolean;
  title: string;
  description: string;
}

const Loader = ({ isLoading, title, description }: LoaderProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (!isLoading) {
      timeoutId = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    } else {
      setIsVisible(true);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isLoading]);

  const classnames = isLoading ? 'progress' : 'ready';

  return isVisible ? (
    <div className="grid h-screen min-w-screen place-content-center">
      <div className="flex flex-row gap-4 items-center">
        <svg
          id="check"
          version="1.1"
          viewBox="0 0 100 100"
          className={classnames}
          style={{ width: '100px', height: '100px' }}
        >
          <circle id="circle" cx="50" cy="50" r="46" fill="transparent" />
          <polyline id="tick" points="25,55 45,70 75,33" fill="transparent" />
        </svg>
        <div>
          <h1 className="text-3xl">{title}</h1>
          <h1 className="text-md">{description}</h1>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Loader;

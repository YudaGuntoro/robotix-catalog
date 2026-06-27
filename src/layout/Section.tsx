// components/layout/Section.tsx
import type { ReactNode } from 'react';

type ISectionProps = {
  title?: string;
  description?: ReactNode; // sudah ReactNode
  yPadding?: string;
  children: ReactNode;
};

const Section = ({
  title,
  description,
  yPadding = 'py-16',
  children,
}: ISectionProps) => (
  <div className={yPadding}>
    <div className="mx-auto max-w-screen-xl px-3">
      {(title || description) && (
        <div className="text-center">
          {title && <h2 className="text-3xl font-bold">{title}</h2>}

          {description &&
            (typeof description === 'string' ? (
              <p className="mx-auto mt-2 max-w-2xl text-gray-600">
                {description}
              </p>
            ) : (
              <div className="mx-auto mt-2 max-w-2xl text-gray-600">
                {description}
              </div>
            ))}
        </div>
      )}

      <div className="mt-6">{children}</div>
    </div>
  </div>
);

export { Section };

import type { ReactNode } from 'react';

type IHeroOneButtonProps = {
  title: ReactNode;
  description: ReactNode;
  button: ReactNode;
};

const HeroOneButton = (props: IHeroOneButtonProps) => (
  <header>
    {props.title}
    <div className="mt-6">{props.description}</div>
    <div className="mt-8">{props.button}</div>
  </header>
);

export { HeroOneButton };

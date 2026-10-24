import { useState, useRef } from 'react';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { IngredientsCategory } from '../../ingredients-category/ingredients-category';
import styles from './burger-ingredients.module.css';
import type { TIngredient } from '@utils-types';

type TBurgerIngredientsUIProps = {
  buns: TIngredient[];
  sauces: TIngredient[];
  mains: TIngredient[];
  ingredientsCounters: Record<string, number>;
};

export const BurgerIngredientsUI = ({
  buns,
  sauces,
  mains,
  ingredientsCounters,
}: TBurgerIngredientsUIProps): React.JSX.Element => {
  const [currentTab, setCurrentTab] = useState('bun');
  const bunsRef = useRef<HTMLHeadingElement>(null);
  const saucesRef = useRef<HTMLHeadingElement>(null);
  const mainsRef = useRef<HTMLHeadingElement>(null);

  const handleTabClick = (tab: string) => {
    setCurrentTab(tab);
    if (tab === 'bun') bunsRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce') saucesRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main') mainsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab value="bun" active={currentTab === 'bun'} onClick={() => handleTabClick('bun')}>
            Булки
          </Tab>
          <Tab value="main" active={currentTab === 'main'} onClick={() => handleTabClick('main')}>
            Начинки
          </Tab>
          <Tab value="sauce" active={currentTab === 'sauce'} onClick={() => handleTabClick('sauce')}>
            Соусы
          </Tab>
        </ul>
      </nav>
      <div className={styles.content}>
        <IngredientsCategory title="Булки" titleId="bun" titleRef={bunsRef} ingredients={buns} ingredientsCounters={ingredientsCounters} />
        <IngredientsCategory title="Начинки" titleId="main" titleRef={mainsRef} ingredients={mains} ingredientsCounters={ingredientsCounters} />
        <IngredientsCategory title="Соусы" titleId="sauce" titleRef={saucesRef} ingredients={sauces} ingredientsCounters={ingredientsCounters} />
      </div>
    </section>
  );
};
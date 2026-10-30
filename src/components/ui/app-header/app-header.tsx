import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import styles from './app-header.module.css';

type TAppHeaderUIProps = {
  userName: string | undefined;
};

export const AppHeaderUI = ({ userName }: TAppHeaderUIProps): React.JSX.Element => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <NavLink to="/" className={({ isActive }) => `${styles.link} ${isActive ? styles.link_active : ''}`}>
          {({ isActive }) => (
            <>
              {/* Передаем type={isActive ? 'primary' : 'secondary'} в иконку */}
              <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default ml-2">Конструктор</p>
            </>
          )}
        </NavLink>
        <NavLink to="/feed" className={({ isActive }) => `${styles.link} ${isActive ? styles.link_active : ''} ml-10`}>
          {({ isActive }) => (
            <>
              <ListIcon type={isActive ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default ml-2">Лента заказов</p>
            </>
          )}
        </NavLink>
      </div>
      <div className={styles.logo}>
        <Logo />
      </div>
      <div className={styles.link_position_last}>
        <NavLink to="/profile" className={({ isActive }) => `${styles.link} ${isActive ? styles.link_active : ''}`}>
          {({ isActive }) => (
            <>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default ml-2">
                {userName || 'Личный кабинет'}
              </p>
            </>
          )}
        </NavLink>
      </div>
    </nav>
  </header>
);
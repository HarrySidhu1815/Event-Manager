import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink className={({isActive}) => (isActive ? classes.active : null)} end to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink className={({isActive}) => (isActive ? classes.active : null)} to='/events'>Events</NavLink>
          </li>
          <li>
            <NavLink className={({isActive}) => (isActive ? classes.active : null)} to='/newsletter'>Newsletter</NavLink>
          </li>
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;

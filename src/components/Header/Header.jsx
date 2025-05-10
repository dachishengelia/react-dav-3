import { useRef } from 'react';
import Icon from '../shared/Icon/Icon';
import { useTheme } from 'styled-components';
import { StyledHeader, Logo, ThemeToggle, Profile } from './HeaderStyles';
import { useGlobalContext } from '../App/context';
import './Header.css'; 

const Header = () => {
    const { colors } = useTheme();
    const { theme, toggleTheme, discard } = useGlobalContext();
    const isClickable = useRef(true);

    const handleClick = (event) => {
        if (!isClickable.current) {
            event.preventDefault();
        } else {
            isClickable.current = false;
            setTimeout(() => (isClickable.current = true), 1000);
            discard();
        }
    };

    return (
        <StyledHeader>
            <Logo aria-label="Home Page" to="/" onClick={handleClick} />
            <ThemeToggle aria-label="Theme toggle" onClick={toggleTheme}>
                <Icon
                    name={theme === 'light' ? 'moon' : 'sun'}
                    size={20}
                    color={colors.btnTheme}
                    customStyle={{ transition: 'color 350ms ease-in-out' }}
                />
            </ThemeToggle>
            <Profile />
        </StyledHeader>
    );
};

export default Header;

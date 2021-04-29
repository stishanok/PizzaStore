import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Button from './Button';

function Header() {
    const {totalPrice, totalCount} = useSelector(({basket}) => basket);

    return (
        <div className="header">
            <div className="container container__header">
                <Link to="/">
                    <div className="header__logo">
                        <div>
                            <h1>Pizza & Pizza</h1>
                        </div>
                    </div>
                </Link>

                <div className="header__cart">
                    <Link to="/basket">
                        <Button className="button--cart">
                            <span>{totalPrice} руб</span>
                            <div className="button__delimiter"></div>
                            <span>{totalCount} шт</span>
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Header;

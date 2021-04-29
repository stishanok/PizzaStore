import React from 'react';
import BasketItem from '../components/BasketItem';
import {useDispatch, useSelector} from 'react-redux';
import {clearBasket, removeBasketItem, addItem, removeItem} from '../redux/actions/basket';
import {Link} from 'react-router-dom';
import {Button} from '../components';
import basketEmptyImage from '../assets/img/empty-cart.png';

function Basket() {
    const dispatch = useDispatch();
    const {totalPrice, totalCount, items} = useSelector(({basket}) => basket);

    const addedPizzas = Object.keys(items).map((key) => {
        return items[key].items[0];
    });

    const onClearBasket = () => {
        dispatch(clearBasket());
    };

    const onRemoveItem = (id) => {
        dispatch(removeBasketItem(id));
    };

    const onAddItem = (id) => {
        dispatch(addItem(id));
    };

    const onDeleteItem = (id) => {
        dispatch(removeItem(id));
    };

    const onClickOrder = () => {
        console.log('Заказ', items);
    };

    return (
        <div className="content">
            <div className="container container--cart">
                {totalCount ? (
                    <div className="cart">
                        <div className="cart__top">
                            <h2 className="content__title">Корзина</h2>
                            <div className="cart__clear">
                                <svg
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M2.5 5H4.16667H17.5"
                                        stroke="#B6B6B6"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M6.66663 5.00001V3.33334C6.66663 2.89131 6.84222 2.46739 7.15478 2.15483C7.46734 1.84227 7.89127 1.66667 8.33329 1.66667H11.6666C12.1087 1.66667 12.5326 1.84227 12.8451 2.15483C13.1577 2.46739 13.3333 2.89131 13.3333 3.33334V5.00001M15.8333 5.00001V16.6667C15.8333 17.1087 15.6577 17.5326 15.3451 17.8452C15.0326 18.1577 14.6087 18.3333 14.1666 18.3333H5.83329C5.39127 18.3333 4.96734 18.1577 4.65478 17.8452C4.34222 17.5326 4.16663 17.1087 4.16663 16.6667V5.00001H15.8333Z"
                                        stroke="#B6B6B6"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M8.33337 9.16667V14.1667"
                                        stroke="#B6B6B6"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M11.6666 9.16667V14.1667"
                                        stroke="#B6B6B6"
                                        strokeWidth="1.2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <span onClick={onClearBasket}>Очистить корзину</span>
                            </div>
                        </div>
                        <div className="basket__items">
                            {addedPizzas.map((obj) => (
                                <BasketItem
                                    key={obj.id}
                                    id={obj.id}
                                    name={obj.name}
                                    type={obj.type}
                                    size={obj.size}
                                    totalPrice={items[obj.id].totalPrice}
                                    totalCount={items[obj.id].items.length}
                                    onRemove={onRemoveItem}
                                    onPlus={onAddItem}
                                    onMinus={onDeleteItem}
                                    imageUrl={obj.imageUrl}
                                />
                            ))}
                        </div>
                        <div className="cart__bottom">
                            <div className="cart__bottom-details">
                <span className="card__all__pizzas">
                  Всего пицц: <b>{totalCount} шт</b>
                </span>
                <span>
                  Сумма заказа: <b>{totalPrice} руб</b>
                </span>
                            </div>
                            <div className="cart__bottom-buttons">
                                <Link to="/" className="button button--outline button--add go-back-btn">
                                    <span className="button__back">Вернуться</span>
                                </Link>
                                <Button onClick={onClickOrder} className="pay-btn">
                                    <span>Оплатить</span>
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="cart cart--empty">
                        <h2>Корзина пустая</h2>
                        <p>Для того, чтобы заказать пиццу, перейди на главную страницу.</p>
                        <img src={basketEmptyImage} alt="Empty cart"/>
                        <Link to="/" className="button button--black">
                            <span>На главную</span>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Basket;

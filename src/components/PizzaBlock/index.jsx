import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import classNames from 'classnames';

function PizzaBlock({id, name, imageUrl, price, types, sizes, onClickAddPizza, addedCount}) {
    const availableNames = ['тонкое', 'традиционное'];
    const availableSizes = [26, 30, 40];
    const [activeType, setActiveType] = React.useState(types[0]);
    const [activeSize, setActiveSize] = React.useState(0);

    const onSelectType = (index) => {
        setActiveType(index);
    };

    const onSelectSize = (index) => {
        setActiveSize(index);
    };

    const onAddPizza = () => {
        const obj = {
            id,
            name,
            imageUrl,
            price: price[activeSize],
            size: availableSizes[activeSize],
            type: availableNames[activeType],
        };
        onClickAddPizza(obj);
    };

    return (
        <div className="pizza-block">
            <img className="pizza-block__image" src={imageUrl} alt="Pizza"/>
            <h4 className="pizza-block__title">{name}</h4>
            <div className="pizza-block__selector">
                <ul>
                    {availableNames.map((type, index) => (
                        <li
                            key={type}
                            onClick={() => onSelectType(index)}
                            className={classNames({
                                active: activeType === index,
                                disabled: !types.includes(index),
                            })}>
                            {type}
                        </li>
                    ))}
                </ul>
                <ul>
                    {availableSizes.map((size, index) => (
                        <li
                            key={size}
                            onClick={() => onSelectSize(index)}
                            className={classNames({
                                active: activeSize === index,
                                disabled: !sizes.includes(size),
                            })}>
                            {size} см
                        </li>
                    ))}
                </ul>
            </div>
            <div className="pizza-block__bottom">
                <div className="pizza-block__price">{price[activeSize]} руб</div>
                <Button onClick={onAddPizza} className="button--add" outline>
                    <span>Добавить </span>
                    {addedCount && <i>{addedCount}</i>}
                </Button>
            </div>
        </div>
    );
}

PizzaBlock.propTypes = {
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    price: PropTypes.arrayOf(PropTypes.number).isRequired,
    types: PropTypes.arrayOf(PropTypes.number).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.number).isRequired,
    onClickAddPizza: PropTypes.func.isRequired,
    addedCount: PropTypes.number,
};

PizzaBlock.defaultProps = {
    name: '---',
    imageUrl: '/images/2ffc31bb-132c-4c99-b894-53f7107a1441.jpg',
    price: 0,
    types: [],
    sizes: [],
};

export default PizzaBlock;

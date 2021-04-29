import React from 'react';
import {Categories, SortPopup, PizzaBlock, PizzaLoadingBlock} from '../components';
import {useSelector, useDispatch} from 'react-redux';
import {setCategoryBy, setSortBy} from '../redux/actions/filters';
import {fetchPizzas} from '../redux/actions/pizzas';

const categoryNames = ['Классические', 'Любимые', 'Премиум', 'Легенды'];
const sortItems = [
    {name: 'популярности', type: 'popular', order: 'desc'},
    {name: 'цене', type: 'price', order: 'asc'},
    {name: 'алфавиту', type: 'name', order: 'asc'},
];

function Home() {
    const dispatch = useDispatch();
    const items = useSelector(({pizzas}) => pizzas.items);
    const basketItems = useSelector(({basket}) => basket.items);
    const isLoaded = useSelector(({pizzas}) => pizzas.isLoaded);
    const {category, sortBy} = useSelector(({filters}) => filters);

    React.useEffect(() => {
        dispatch(fetchPizzas(sortBy, category));
    }, [category, sortBy]);

    const onSelectCategory = React.useCallback((index) => {
        dispatch(setCategoryBy(index));
    }, []);

    const onSelectSortType = React.useCallback((type) => {
        dispatch(setSortBy(type));
    }, []);

    const handleAddPizzaToBasket = (obj) => {
        dispatch({
            type: 'ADD_PIZZA_BASKET',
            payload: obj,
        });
    };

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    activeCategory={category}
                    onClickCategory={onSelectCategory}
                    items={categoryNames}
                />
                <SortPopup
                    activeSortType={sortBy.type}
                    ocClickSortType={onSelectSortType}
                    items={sortItems}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoaded
                    ? items.map((obj) => (
                        <PizzaBlock
                            onClickAddPizza={handleAddPizzaToBasket}
                            key={obj.id}
                            addedCount={basketItems[obj.id] && basketItems[obj.id].items.length}
                            {...obj}
                        />
                    ))
                    : Array(10)
                        .fill(0)
                        .map((_, index) => <PizzaLoadingBlock key={index}/>)}
            </div>
        </div>
    );
}

export default Home;

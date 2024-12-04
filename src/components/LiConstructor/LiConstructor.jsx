import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './LiConstructor.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { delIngredients, updateSortIngredients } from '../../services/actions/currentIngredients';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { IngredientType } from '../../utils/types';

LiConstructor.propTypes = {
    index: PropTypes.number,
    currentEl: (PropTypes.shape(IngredientType))
}

function LiConstructor({ currentEl, index }) {
    const dispatch = useDispatch()
    const choiceIngredients = useSelector(state => state.currentIngredients.ingredients);

    const ref = useRef(null);

    function deleteIng(id) {
        dispatch(delIngredients(id))
    }

    const [, dragEl] = useDrag({
        type: 'mainsouse',
        item: { id: currentEl.id, index }
    })

    const [, dropEl] = useDrop({
        accept: 'mainsouse',
        hover(item) {
            if (!ref.current) {
                return;
            }

            const dragIndex = item.index;
            const hoverIndex = index;

            if (dragIndex === hoverIndex) {
                return;
            }
            moveCard(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    })

    const moveCard = (dragIndex, hoverIndex) => {
        const updatedCards = [...choiceIngredients];
        const [removed] = updatedCards.splice(dragIndex, 1);
        updatedCards.splice(hoverIndex, 0, removed);
        dispatch(updateSortIngredients(updatedCards))
    };

    dragEl(dropEl(ref))
    return (
        <li ref={currentEl.type === 'bun' ? null : ref} key={currentEl.id} className={`${styles.item} pb-4`}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={currentEl.name}
                price={currentEl.price}
                thumbnail={currentEl.image_mobile}
                handleClose={() => deleteIng(currentEl.id)}
            />
        </li>
    )
}

export default LiConstructor;
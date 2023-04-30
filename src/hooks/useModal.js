import React from 'react';
import { useDispatch } from 'react-redux';
import { clearIngredientPreview } from '../services/actions/burger';

// кастомные хуки всегда должны начинаться с глагола `use`, чтобы реакт понял, что это хук. Он следит за их вызовами
export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const dispatch = useDispatch();

  // `useCallback` нужен для того, чтобы зафиксировать ссылку на функцию. Таким образом уменьшится кол-во перерисовок компонента, куда будет передана эта функция
  const openModal = React.useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = React.useCallback(() => {
    setIsModalOpen(false);
    setTimeout(()=>{dispatch(clearIngredientPreview())},"200");
  }, []);

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};
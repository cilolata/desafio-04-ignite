import {  createRef, useCallback, useRef, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import Modal, { IModalProps } from '../Modal';
import Input from '../Input';
import { IFood } from '../Food';
import { FormHandles } from '@unform/core';


interface IModalEditProps {
  handleUpdateFood: (data: IFood) => void
  editingFood: IFood
  setIsOpen: () => void
  isOpen: boolean
}

const ModalEditFood = ({ handleUpdateFood, isOpen, setIsOpen, editingFood }: IModalEditProps) => {
  const formRef = useRef<FormHandles>(null)

 
  const handleSubmit = useCallback(async (data) => {
    handleUpdateFood(data);
    setIsOpen();
  },[]);

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" icon={undefined} />

          <Input name="name" placeholder="Ex: Moda Italiana" icon={undefined} />
          <Input name="price" placeholder="Ex: 19.90" icon={undefined} />

          <Input name="description" placeholder="Descrição" icon={undefined} />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  }

export default ModalEditFood;

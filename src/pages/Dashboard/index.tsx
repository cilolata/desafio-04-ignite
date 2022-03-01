import React from 'react';
import Header from '../../components/Header';
import api from '../../services/api';
import Food, { IFood } from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

export interface IDashboardProps {
  modalOpen: boolean
  editModalOpen: boolean
}


const Dashboard = ():JSX.Element =>  {
  const[foods, setFoods] = React.useState<IFood[]>([])
  const[editingFood, setEditingFood] = React.useState<IFood>({} as IFood)
  const[modalOpen, setModalOpen] = React.useState(false)
  const[editModalOpen, setEditModalOpen] = React.useState(false)

  console.log(modalOpen)
 
 React.useEffect(() => {
   async function loadFoods() {
    const response = await api.get('/foods');
    setFoods(response.data);
   }

   loadFoods()
  },[])

  const handleAddFood = async (food: Omit<IFood, 'id' | 'available'>) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      setFoods([...foods, response.data]);
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food: IFood) => {    
    try {
      const editingFoodId = foods.find(item => item.id === food.id) 
      const foodUpdated = await api.put(
        `/foods/${editingFoodId}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      setFoods(foodsUpdated);
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id: number) => {

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter(food => food.id !== id);

    setFoods(foodsFiltered);
  }

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const toggleEditModal = () => {
    setEditModalOpen(!editModalOpen);
  }

  const handleEditFood = (food:IFood) => {
    setEditingFood(food);
    setEditModalOpen(true)
  }

    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          handleAddFood={handleAddFood}
          />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(food => (
              <Food
                key={food.id}
                food={food}
                handleDelete={handleDeleteFood}
                handleEditFood={handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
  }

export default Dashboard;


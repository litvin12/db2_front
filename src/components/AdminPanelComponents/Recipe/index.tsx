import React from 'react';
import styles from './styles.module.scss';
import { useGetRecipeQuery, useEditRecipeMutation, useAddRecipeMutation } from '../../../redux/api';
import { ModalComponents } from '../ModalComponents';

export const Recipe = () => {
    const [showModalComponents, setShowModalComponents] = React.useState(false);
    const [showEditModal, setShowEditModal] = React.useState(false);
    const [showAddModal, setShowAddModal] = React.useState(false);
    const { data } = useGetRecipeQuery();
    const [editRecipe] = useEditRecipeMutation();
    const [addRecipe] = useAddRecipeMutation();
    const [recipeId, setRecipeId] = React.useState<number | null>(null);
    const [editForm, setEditForm] = React.useState({
        title: '',
        technology: '',
        preparationTime: ''
    });
    const [addForm, setAddForm] = React.useState({
        title: '',
        technology: '',
        preparationTime: '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });

    const handleClick = (id: number) => {
        setRecipeId(id);
        setShowModalComponents(true);
    }

    const handleEditClick = (recipe: any) => {
        setRecipeId(recipe.id);
        setEditForm({
            title: recipe.title,
            technology: recipe.technology,
            preparationTime: recipe.preparationTime
        });
        setShowEditModal(true);
    }

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (recipeId) {
            await editRecipe({
                editRecipe: editForm,
                id: recipeId
            });
            setShowEditModal(false);
        }
    }

    const handleAddSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addRecipe(addForm);
        setShowAddModal(false);
        setAddForm({
            title: '',
            technology: '',
            preparationTime: '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
    }

    return (
        <div className={styles.content}>
            <div className={styles.header}>
                <h2>Рецепты</h2>
                <button onClick={() => setShowAddModal(true)} className={styles.addButton}>
                    Добавить рецепт
                </button>
            </div>
            {data?.map(recipe => (
                <div key={recipe.id} className={styles.component}>
                    <div className={styles.title}>
                        <span>Название:</span>
                        <span>{recipe.title}</span>
                    </div>
                    <div className={styles.preparationTime}>
                        <span>Время приготовления:</span>
                        <span>{recipe.preparationTime}</span>
                    </div>
                    <div className={styles.technology}>
                        <span>Технология приготовления:</span>
                        <span>{recipe.technology}</span>
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={() => handleClick(recipe.id)} style={{ marginLeft: '0' }}>Компоненты</button>
                        <button onClick={() => handleEditClick(recipe)}>Редактировать</button>
                    </div>
                </div>
            ))}
            {showModalComponents && <ModalComponents
                onClickClose={() => setShowModalComponents(false)}
                recipeId={recipeId}
            />}
            {showEditModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Редактирование рецепта</h2>
                        <form onSubmit={handleEditSubmit}>
                            <div>
                                <label>Название:</label>
                                <input
                                    type="text"
                                    value={editForm.title}
                                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Технология:</label>
                                <textarea
                                    value={editForm.technology}
                                    onChange={(e) => setEditForm({ ...editForm, technology: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Время приготовления:</label>
                                <input
                                    type="text"
                                    value={editForm.preparationTime}
                                    onChange={(e) => setEditForm({ ...editForm, preparationTime: e.target.value })}
                                />
                            </div>
                            <div className={styles.modalButtons}>
                                <button type="submit">Сохранить</button>
                                <button type="button" onClick={() => setShowEditModal(false)}>Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showAddModal && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h2>Добавление рецепта</h2>
                        <form onSubmit={handleAddSubmit}>
                            <div>
                                <label>Название:</label>
                                <input
                                    type="text"
                                    value={addForm.title}
                                    onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Технология:</label>
                                <textarea
                                    value={addForm.technology}
                                    onChange={(e) => setAddForm({ ...addForm, technology: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label>Время приготовления:</label>
                                <input
                                    type="text"
                                    value={addForm.preparationTime}
                                    onChange={(e) => setAddForm({ ...addForm, preparationTime: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.modalButtons}>
                                <button type="submit">Добавить</button>
                                <button type="button" onClick={() => setShowAddModal(false)}>Отмена</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

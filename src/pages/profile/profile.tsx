import { ProfileUI } from '@ui-pages';
import { type SyntheticEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { updateUserProfile } from '../../services/slices/userSlice';

export const Profile = (): React.JSX.Element => {
  const dispatch = useDispatch();

  // 1. Берем реальные данные пользователя из Redux-хранилища
  const { user } = useSelector((state) => state.user);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });

  // Синхронизируем форму, когда данные пользователя загружаются или меняются в сторе
  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || '',
      password: '', // Пароль всегда сбрасываем после сохранения
    }));
  }, [user]);

  // Константа отслеживания изменений (автоматически управляет кнопками)
  const isFormChanged =
    formValue.name !== (user?.name || '') ||
    formValue.email !== (user?.email || '') ||
    !!formValue.password;

  // 2. Отправка измененных данных на сервер при клике на «Сохранить»
  const handleSubmit = (e: SyntheticEvent): void => {
    e.preventDefault();
    if (!isFormChanged) return;

    // Собираем только измененные поля, чтобы отправить на сервер
    const updatedData: Record<string, string> = {};
    if (formValue.name !== user?.name) updatedData.name = formValue.name;
    if (formValue.email !== user?.email) updatedData.email = formValue.email;
    if (formValue.password) updatedData.password = formValue.password;

void dispatch(updateUserProfile(updatedData));
  };

  // Клик по кнопке «Отмена» возвращает поля в исходное состояние
  const handleCancel = (e: SyntheticEvent): void => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};

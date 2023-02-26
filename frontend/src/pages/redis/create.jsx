import React, { useState } from 'react';

const Create = () => {
    const [student_card_num, setStudent_card_num] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [patronymic, setPatronymic] = useState('');

    const form_model = {
        student_card_num: student_card_num,
        firstname: firstname,
        lastname: lastname,
        patronymic: patronymic
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form_model)
    };
    let handleSubmit = (event) => {
        fetch('http://localhost:8080/redis/create', requestOptions)
            .then(res => res.json())
        event.preventDefault();
    }

    return (
        <div>
            <h2>Добавить студента</h2>
            <div className={"create_info"}>
                <form onSubmit={handleSubmit}>
                    <label>Имя</label>
                    <input type={'text'} value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                    <label>Фамилия</label>
                    <input type={'text'} value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                    <label>Отчество</label>
                    <input type={'text'} value={patronymic} onChange={(e) => setPatronymic(e.target.value)}/>
                    <label>Номер зачетной книжки</label>
                    <input type={'text'} value={student_card_num} onChange={(e) => setStudent_card_num(e.target.value)}/>
                    <input type={'button'} value={'Очистить поля'} className={'clear_btn'}/>
                    <input type={'submit'} value={'Добавить'} className={'button_submit'}/>
                </form>
            </div>
        </div>
    );
};

export default Create;
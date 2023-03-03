import React, { useState } from 'react';

const Create = () => {
    const [course, setCourse] = useState('');
    const [group, setGroup] = useState('');
    const [student_card_num, setStudent_card_num] = useState('');

    const form_model = {
        course: course,
        group: group,
        student_card_num: student_card_num
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form_model)
    };
    let handleSubmit = (event) => {
        fetch('http://localhost:8080/neo4j/create', requestOptions)
            .then(res => res.json())
        event.preventDefault();
    }

    return (
        <div>
            <h2>Добавить связь</h2>
            <div className={"create_info"}>
                <form onSubmit={handleSubmit}>
                    <label>Курс</label>
                    <input type={'text'} value={course} onChange={(e) => setCourse(e.target.value)}/>
                    <label>Группа</label>
                    <input type={'text'} value={group} onChange={(e) => setGroup(e.target.value)}/>
                    <label>Номер студента</label>
                    <input type={'text'} value={student_card_num} onChange={(e) => setStudent_card_num(e.target.value)}/>
                    <input type={'button'} value={'Очистить поля'} className={'clear_btn'}/>
                    <input type={'submit'} value={'Добавить'} className={'button_submit'}/>
                </form>
            </div>
        </div>
    );
};

export default Create;
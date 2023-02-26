import React, { useCallback, useEffect, useState } from 'react';

import './mongo.css'

const Create = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [groupname, setGroupname] = useState('');
    const [studentnumber, setStudentnumber] = useState('');
    const [educationbegindate, setEducationbegindate] = useState('');

    const form_model = {
        firstname: firstname,
        lastname: lastname,
        patronymic: patronymic,
        groupname: groupname,
        studentnumber: studentnumber,
        educationbegindate: educationbegindate
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form_model)
    };
    let handleSubmit = (event) => {
        fetch('http://localhost:8080/mongo/create', requestOptions)
            .then(res => res.json())
            // .then(data => setFirstname(firstname))

        event.preventDefault();
    }

    let mes = '';
    const suc = () => {
        if (handleSubmit) {
            return mes = 'Saving!'
        }
    }

    const clear_fields = () => {
        this.setState({
            firstname: '',
            lastname: '',
            patronymic: '',
            groupname: '',
            studentnumber: '',
            educationbegindate: ''
        })
    }

    return (
        <div>
            <h2>Добавить студента</h2>
            <div className={"create_info"}>
                <form onSubmit={handleSubmit}>
                    <label>Имя</label><input type={'text'} value={firstname} onChange={(e) => setFirstname(e.target.value)}/>
                    <label>Фамилия</label><input type={'text'} value={lastname} onChange={(e) => setLastname(e.target.value)}/>
                    <label>Отчество</label><input type={'text'} value={patronymic} onChange={(e) => setPatronymic(e.target.value)}/>
                    <label>Номер группы</label><input type={'text'} value={groupname} onChange={(e) => setGroupname(e.target.value)}/>
                    <label>Номер студента</label><input type={'text'} value={studentnumber} onChange={(e) => setStudentnumber(e.target.value)}/>
                    <label>Дата зачисления</label><input type={'date'} value={educationbegindate} onChange={(e) => setEducationbegindate(e.target.value)}/>
                    <input type={'button'} value={'Очистить поля'} className={'clear_btn'} onClick={clear_fields}/>
                    <input type={'submit'} value={'Добавить'} className={'button_submit'}/>
                    <p>{suc}</p>
                </form>
            </div>
        </div>
    );
};

export default Create;
import React, { useEffect, useState } from 'react';
import './pages.css';
const Lab1 = () => {
    const [course, setCourse] = useState('');
    const [beginWeek, setBeginWeek] = useState('');
    const [endWeek, setEndWeek] = useState('');
    const [data, setData] = useState([]);

    let handleSubmit = (event) => {
        fetch('http://localhost:8080/labs/lab_1', requestOptions)
            .then(res => res.json())
        event.preventDefault();
    }

    useEffect(() => {
        fetch('http://localhost:8080/labs/lab_1')
            .then(res => res.json())
            .then(res => {
                setData(res)
            })
    }, []);

    //TODO: Перенаправлять на другую страницу!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    const DisplayData = data.map(
        item => {
            return(
                <tr>
                    <td>{item.groupname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.firstname}</td>
                    <td>{item.patronymic}</td>
                    <td>{item.studentnumber}</td>
                    <td>{item.educationbegindate}</td>
                    <td>{item.percent} %</td>
                </tr>
            )
        }
    )
    const DisplayInfoPost = data.map(
        item => {
            return(
                <div>
                    <p>{item.coursename}</p>
                    {/*<p>{item.}</p>*/}
                    {/*<p>{}</p>*/}
                </div>
            )
        }
    )

    const search_data = {
        course: course,
        beginWeek: beginWeek,
        endWeek: endWeek
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(search_data)
    };

    function refreshPage(){
        window.location.reload();
    }

    return (
        <div className={'read_info'}>
            <div className={'search_students'}>
                <form onSubmit={handleSubmit}>
                    <p>Введите курс</p>
                    <input type="text" value={course} onChange={(e) => setCourse(e.target.value)}/>

                    <p>Введите период</p>
                    <div className={'period'}>
                        {/*<select>*/}
                        {/*    <option value={beginWeek}>1</option>*/}
                        {/*    <option value={beginWeek}>2</option>*/}
                        {/*</select>*/}
                        <label>С</label><input type="text" value={beginWeek} onChange={(e) => setBeginWeek(e.target.value)}/>
                        <label>по</label><input type="text" value={endWeek} onChange={(e) => setEndWeek(e.target.value)}/>
                    </div>
                    <input type={'submit'} value={'Найти'} className={'button'} onClick={refreshPage}/>
                </form>
                <div className={'post_info'}>
                    <p>{course}</p>
                </div>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Группа</th>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th>Номер зач. книги</th>
                    <th>Дата зачисления</th>
                    <th>Процент посещений</th>
                </tr>
                </thead>
                <tbody>
                {DisplayData}
                </tbody>
            </table>
        </div>
    )
};

export default Lab1;

import React, { useEffect, useState } from 'react';

const Read = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/postgres/read')
            .then(res => res.json())
            .then(res => {
                setData(res)
            })
    }, []);

    const DisplayData = data.map(
        item => {
            return(
                <tr>
                    <td>{item.number_week}</td>
                    <td>{item.course_name}</td>
                    <td>{item.group}</td>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.patronymic}</td>
                    <td>{item.visited}</td>
                </tr>
            )
        }
    )

    return (
        <div className={'read_info'}>
            <table>
                <thead>
                    <tr className={'read_info_tr'}>
                        <th>Номер недели</th>
                        <th>Курс</th>
                        <th>Группа</th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>Отчество</th>
                        <th>Посещение</th>
                    </tr>
                </thead>
                <tbody>
                {DisplayData}
                </tbody>
            </table>
        </div>
    )
};

export default Read;
import React, { useEffect, useState } from 'react';

const Delete = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/mongo/read')
            .then(res => res.json())
            .then(res => {
                setData(res)
            })
    }, []);

    const DisplayData = data.map(
        item => {
            return(
                <tr>
                    <td>{item.firstname}</td>
                    <td>{item.lastname}</td>
                    <td>{item.patronymic}</td>
                    <td>{item.groupname}</td>
                    <td>{item.studentnumber}</td>
                    <td>{item.educationbegindate}</td>
                </tr>
            )
        }
    )

    return (
        <div className={'delete_info'}>
            <table>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Отчество</th>
                    <th>Группа</th>
                    <th>Номер студента</th>
                    <th>Дата зачисления</th>
                    {/*<th className={'th_ed_del'}>Изменить / Удалить</th>*/}
                </tr>
                </thead>
                <tbody>
                {DisplayData}
                </tbody>
            </table>
        </div>
    )
};

export default Delete;
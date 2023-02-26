import React, { useEffect, useState } from 'react';

import './mongo.css';
const Read = () => {
    // const [data, setData] = useState([]);
    //
    // useEffect(() => {
    //     fetch('http://localhost:8080/mongo/read')
    //         .then(res => res.json())
    //         .then(res => { setData(res) })
    // }, []);
    //
    //
    // const DisplayData = data.map(
    //     item => {
    //         return(
    //             <tr>
    //                 <td>{item.user}</td>
    //                 <td>{item.password}</td>
    //             </tr>
    //         )
    //     }
    // )
    //
    // return (
    //     <div className={'read_info'}>
    //         <table>
    //             <thead>
    //             <tr>
    //                 <th>User</th>
    //                 <th>Password</th>
    //             </tr>
    //             </thead>
    //             <tbody>
    //             {DisplayData}
    //             </tbody>
    //         </table>
    //     </div>
    // )

    const [data, setData] = useState([]);

    // useEffect(() => {
    //     axios.get('/mongo/read').then().then(res => setData(res))
    // }, []);
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
                    <td id={item._id}>{item.firstname}</td>
                    <td id={item._id}>{item.lastname}</td>
                    <td id={item._id}>{item.patronymic}</td>
                    <td id={item._id}>{item.groupname}</td>
                    <td id={item._id}>{item.studentnumber}</td>
                    <td id={item._id}>{item.educationbegindate}</td>
                    {/*<td id={item._id} className={'td_ed_del'}>*/}
                    {/*    <a className={'edit_row'} Link={}>E</a>*/}
                    {/*    <a className={'delete_row'}>D</a>*/}
                    {/*</td>*/}
                </tr>
            )
        }
    )

    return (
        <div className={'read_info'}>
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
}

export default Read;
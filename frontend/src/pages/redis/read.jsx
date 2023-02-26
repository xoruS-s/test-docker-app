import React, { useEffect, useState } from 'react';

import './redis.css'

const Read = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/redis/read')
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
                    <td>{item.student_card_num}</td>
                </tr>
            )
        }
    )

    // const display = Object.keys(data).map(
    //     item => {
    //         return(
    //             <tr>
    //                 <td>{item['student_card_num']}</td>
    //             </tr>
    //         )
    //     }
    // )

    // const all_data = {
    //     student_card_num: '19Б0075',
    //     student_info: {
    //         firstname: 'Даниил',
    //         lastname: 'Хачатуров',
    //         patronymic: 'Семнович'
    //     }
    // };
    // const display = Object.keys(all_data).map(
    //     item => {
    //         console.log(all_data[item]);
    //         console.log(all_data[item].firstname);
    //     }
    // );

    return (
        <div className={'read_info'}>
            <table>
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Отчество</th>
                    <th>Номер зачетной книжки</th>
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
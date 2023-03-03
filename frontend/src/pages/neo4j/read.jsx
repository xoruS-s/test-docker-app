import React, { useEffect, useState } from 'react';

const Read = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/neo4j/read')
            .then(res => res.json())
            .then(res => {
                setData(res)
            })
    }, []);

    const DisplayData = data.map(
        item => {
            return(
                <tr>
                    <td>{item.course}</td>
                    <td>{item.group}</td>
                    <td>{item.student_card_num}</td>
                </tr>
            )
        }
    )

    return (
        <div className={'read_info'}>
            <table>
                <thead>
                <tr>
                    <th>Курс</th>
                    <th>Группа</th>
                    <th>Номер студента</th>
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
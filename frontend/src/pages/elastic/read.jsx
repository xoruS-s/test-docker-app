import React, { useEffect, useState } from 'react';

const Read = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/elastic/read')
            .then(res => res.json())
            .then(res => {
                setData(res)
            })
    }, []);

    const DisplayData = data.map(
        item => {
            return(
                <tr>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
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
                    <th>Описание</th>
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
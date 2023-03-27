import React, { useEffect, useState } from 'react';

const Lab2 = () => {
    const [groupname, setGroupname] = useState('');
    const [data, setData] = useState([]);
    // const [descCourse, setDescCourse] = useState([]);

    let handleSubmit = (event) => {
        fetch('http://localhost:8080/labs/lab_2', requestOptions)
            .then(res => res.json())
        event.preventDefault();
    }

    useEffect(() => {
        fetch('http://localhost:8080/labs/lab_2')
            .then(res => res.json())
            .then(res => {
                setData(res)
            })
    }, []);

    const DisplayData = data.map(
        item => {
            return(
                <tr>
                    {/*<td>{item.descriptioncourse}</td>*/}
                    <td>{item.coursename}</td>
                    <td>{item.studentnumber}</td>
                    <td>{item.lastname}</td>
                    <td>{item.firstname}</td>
                    <td>{item.patronymic}</td>
                    <td>{item.educationbegindate}</td>
                    <td>{item.allhours}</td>
                    <td>{item.visitedhours}</td>
                </tr>
            )
        }
    )

    const display_desc_course = [];
    let desc_course_filtered = [];
    for (const dkey in data) {
        let obj = {
            coursename: data[dkey].coursename,
            descriptioncourse: data[dkey].descriptioncourse
        }
        display_desc_course.push(JSON.stringify(obj))
    }
    const findDuplicates = (arr) => {
        const filtered = arr.filter((item, index) => {
            return arr.indexOf(item) === index
        });
        return [...new Set(filtered)];
    }
    let tmp = findDuplicates(display_desc_course);
    for (const key in tmp) {
        desc_course_filtered.push(JSON.parse(tmp[key]))
    }

    const display_description = desc_course_filtered.map(
        item => {
            return (
                <div>
                    <h2>{item.coursename}</h2>
                    <p>{item.descriptioncourse}</p>
                </div>
            )
        }
    )



    const search_data = {
        groupname: groupname
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
                    <p>Введите группу</p>
                    <input type="text" value={groupname} onChange={(e) => setGroupname(e.target.value)}/>
                    <input type={'submit'} value={'Найти'} className={'button'} onClick={refreshPage}/>
                </form>
                <div>
                    {display_description}
                </div>
            </div>

            <table>
                <thead>
                <tr>
                    {/*<th>Группа</th>*/}
                    <th>Название курса</th>
                    <th>Номер студента</th>
                    <th>Фамилия</th>
                    <th>Имя</th>
                    <th>Отчество</th>
                    <th>Дата зачисления</th>
                    <th>Общее количество часов</th>
                    <th>Количество часов посещений</th>
                </tr>
                </thead>
                <tbody>
                {DisplayData}
                </tbody>
            </table>
        </div>
    )
};

export default Lab2;
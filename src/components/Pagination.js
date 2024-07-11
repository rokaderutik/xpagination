import './Pagination.css';
import { useState, useEffect, useMemo } from 'react';

const Pagination = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentList, setCurrentList] = useState([]);
    const maxRows = 10;
    const maxPages = Math.ceil(employeeList.length/10);

    useEffect(() => {
        const start = (currentPage - 1) * maxRows;
        const end = currentPage * maxRows;

        const currentList = employeeList.slice(start, end);
        setCurrentList(currentList);
    }, [currentPage, employeeList]);

    useEffect(() => {
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then(res => res.json())
        .then(data => setEmployeeList(data))
        .catch(error => alert("failed to fetch data"))
    }, []);

    const handleNext = () => {
        if(currentPage === maxPages) {
            return;
        }
        setCurrentPage(prev => prev + 1);
    }

    const handlePrev = () => {
        if(currentPage === 1) {
            return;
        }
        setCurrentPage(prev => prev - 1);
    }

    return (
        <div>
            <h1 className='heading'>Employee Data Table</h1>
            <table className='table'>
                <thead>
                    <tr className='header'>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                {
                    currentList.map((employee) => {
                        return (
                            <tr>
                                <td>{employee.id}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>{employee.role}</td>
                            </tr>
                        )
                    })
                }
                </tbody>   
            </table>
            <div className='pagination_div'>
                <button onClick={handlePrev} disabled={currentPage === 1 ? true : false}>
                    Previous
                </button>
                <div>{currentPage}</div>
                <button onClick={handleNext} disabled={currentPage === maxPages ? true : false}>
                    Next
                </button>
            </div> 
        </div>
    );
};

export default Pagination;
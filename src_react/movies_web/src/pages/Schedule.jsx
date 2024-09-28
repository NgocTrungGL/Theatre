import React, {useState, useEffect} from 'react';
import './schedule.css';

function Schedule(){
    const [data, setData] = useState([])
    const [movies, setMovies] = useState([])
    return (
        <section id="schedule" className='schedule'>
            <div className='container-fluid' >
                <div className='row' >
                   <h4 className='section-title'>Opening this week </h4> 
                </div>
                <div className='row'>
                    <div className='filters'>
                        <p>Filters</p>
                    </div>
                </div>
                <div className="row mt-5">

                </div>
            </div>
        </section>
    );
}

export default Schedule;
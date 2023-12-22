import React, { useEffect, useState } from 'react';

const LinearProgress = ({ color = 'blue', progress = 20 }) => {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setWidth(progress);
    }, [progress]);

    return (
        <div className="linear-progress">
            <div className={`progress-bar ${color}`} style={{ width: `${width}%` }}></div>
        </div>
    );
};

export default LinearProgress;

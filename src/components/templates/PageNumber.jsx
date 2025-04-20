import React from 'react';

const PageNumber = ({ data }) => {

    const pageNumberHandler = (event) => {
        event.preventDefault();
        console.log(event.target.value)
    };

    return (
        <div>
            <button value="1" onClick={pageNumberHandler}>1</button>
            <button>2</button>
            <button>3</button>
        </div>
    );
};

export default PageNumber;
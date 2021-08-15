import React from 'react'

function Job({title, salary, loc, id, navigate}) {
    const k = id;

    return (
        <div className="bg-gray-100 px-4 py-2 rounded-2xl mb-4 md:w-1/2 w-full" onClick={() => navigate(k)}>
        <div className="flex justify-between">
            <p className="text-lg font-medium">{title}</p>
            <p className="text-darkpurple">${salary}</p>

        </div>
        <p className="text-darkpurple font-semibold">{loc}</p>
    </div>
    )
}

export default Job

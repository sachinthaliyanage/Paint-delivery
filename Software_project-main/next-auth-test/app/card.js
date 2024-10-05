import React from "react";

function Card({title, para, logo}){
    return (
        <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 p-6" style={{backgroundColor:"#ABF6D5", margin:"15px"}}>
            <div class="flex items-center mb-4">
                {logo && (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6 text-slate-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d={logo} />
                    </svg>
                )}
                <h5 class="ml-3 text-slate-800 text-xl font-semibold" style={{marginBottom:"5px"}}>
                {title}
                </h5>
            </div>
            <p class="block text-slate-600 leading-normal font-light mb-4">
                {para}
            </p>
        </div>
    )
}

export default Card;
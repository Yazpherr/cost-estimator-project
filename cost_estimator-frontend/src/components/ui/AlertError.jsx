import React from 'react'

export const AlertError = ({ titulo, descripcion, otraLinea }) => {
    return (
        <div className="bg-red-50 border-s-4 border-red-500 p-4 rounded-[12px]" role="alert">
            <div className="flex">
                <div className="flex-shrink-0">
                    {/* Icon */}
                    <span className="inline-flex justify-center items-center size-8 rounded-full border-4 border-red-100 bg-red-200 text-red-800 ">
                        <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </span>
                    {/* End Icon */}
                </div>
                <div className="ms-3">
                    <h3 className="text-negro font-semibold ">
                        {titulo}
                    </h3>
                    <p className="text-sm text-negro ">
                        {descripcion}
                    </p>
                    <p className="text-sm text-negro ">
                        {otraLinea}
                    </p>
                </div>
            </div>
        </div>
    )
}

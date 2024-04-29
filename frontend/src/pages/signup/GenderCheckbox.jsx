import React from 'react'

const GenderCheckbox = ({ onRadioChange, selectedGender }) => {
    return (
        <div className='flex gap-3 my-2'>
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer `}>
                    <input type="radio" className='radio border-slate-200' name='gender' checked={selectedGender === "male"} onChange={() => onRadioChange("male")} />
                    <span className="label-text text-white">Male</span>
                </label>
            </div>
            <div className="form-control">
                <label className={`label gap-2 cursor-pointer `}>
                    <input type="radio" className='radio border-slate-200' name='gender' checked={selectedGender === "female"} onChange={() => onRadioChange("female")} />
                    <span className="label-text text-white">Female</span> 
                </label>
            </div>
        </div>
    )
}

export default GenderCheckbox
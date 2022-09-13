import React from 'react'

export default function ConfirmRemoveCompoment({handleDeleteEle,hideModal}) {
    return (
        <div>
            <h2>Are you sure?</h2>
            <button className = "btn btn-primary btn-sm" onClick={handleDeleteEle}>Yes</button>
            <button className = "btn btn-primary btn-sm" onClick={hideModal}>No</button>
        </div>
    )
}

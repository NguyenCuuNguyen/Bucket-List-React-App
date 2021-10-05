import React from 'react'

export default function Droplet({ droplet, toggleDroplets }) {
    function handleDropletClick(){
        toggleDroplets(droplet.id)
    }
    return (
        <div>
            <label>
                <input type="checkbox" checked={droplet.complete} onChange={handleDropletClick}/>
                {droplet.name}
            </label>
            
        </div>
    )
}

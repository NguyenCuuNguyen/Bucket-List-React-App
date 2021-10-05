//with plugin, type rfc to create function component automatically
import React from 'react'
import Droplet from './Droplet'

export default function BucketList({ dropletList, toggleDroplets }) {
    return (
        dropletList.map(droplet => {
            return <Droplet key={droplet.id} toggleDroplets={toggleDroplets} droplet={droplet}/> //use key to rerender element that changes
        })
    )
}

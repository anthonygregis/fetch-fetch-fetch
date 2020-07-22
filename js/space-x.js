const spaceXCapsules= "https://api.spacexdata.com/v3/capsules"

const container = document.querySelector('.container')

fetch(spaceXCapsules).then(response => {
    if (response.ok) {
        return response.json()
    }
})
    .then(capsules => {
        capsules.forEach(capsule => {
            const obj = {
                capsuleSerial: capsule.capsule_serial,
                details: capsule.details,
                landings: capsule.landings,

            }
            console.log(obj)

            const capsuleID = document.createElement('p')
            capsuleID.textContent = obj.capsuleSerial

            container.appendChild(capsuleID)
        })
    })
    .catch(err => {
        console.log(err)
    })
const bitToBoolean = (bit) => {
    if(parseInt(bit) === 0){
        return false
    } else{
        return true
    }
}

module.exports = bitToBoolean